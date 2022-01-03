/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable, Container, Token } from 'typedi';

import { GenericAppConfig } from './app-config';
import {
  dedupeArray,
  flattenDependencyTree,
  generateDependencyTree,
  Tree,
} from './dependency-tree.util';
import { FrameworkConfiguration } from './framework-configuration';
import { FrameworkLoader, FrameworkUnloaderFunction } from './loader';
import { FrameworkModule, ModuleWithProviders } from './module';
import {
  APP_CONFIG_TOKEN_SYMBOL,
  FrameworkProvider,
} from './provider/framework-provider';
import { FrameworkSettings } from './settings/framework-settings';

export class Framework {
  private _appConfig: Token<GenericAppConfig>;

  private readonly _modules: Array<FrameworkModule | ModuleWithProviders>;

  private readonly _providers: Array<FrameworkProvider<unknown>>;

  private readonly _loaders: Array<Constructable<FrameworkLoader>>;

  private readonly _unloaders: Array<FrameworkUnloaderFunction>;

  constructor() {
    this._modules = [];
    this._providers = [];
    this._loaders = [];
    this._unloaders = [];
  }

  async start(): Promise<void> {
    await Promise.resolve()
      .then(async () => await this._bootstrapModules())
      .then(async () => await this._bootstrapProviders())
      .then(async () => await this._bootstrapLoaders());
  }

  private _registerAppConfigToken(appConfig: Token<GenericAppConfig>): this {
    this._appConfig = appConfig;

    return this;
  }

  private _registerModules(
    modules: Array<FrameworkModule | ModuleWithProviders>,
  ): this {
    this._modules.push(...modules);

    return this;
  }

  private _registerProviders(
    providers: Array<FrameworkProvider<unknown>>,
  ): this {
    this._providers.push(...providers);

    return this;
  }

  private _registerLoaders(
    loaders: Array<Constructable<FrameworkLoader>>,
  ): this {
    this._loaders.push(...loaders);

    return this;
  }

  private _registerUnloaders(
    unloaders: Array<FrameworkUnloaderFunction>,
  ): this {
    this._unloaders.push(...unloaders);

    return this;
  }

  private _recursiveParseModule(
    modules: Array<FrameworkModule | ModuleWithProviders>,
  ): Array<CallableFunction> {
    return modules.flatMap(fModule => {
      if ('frameworkModule' in fModule) {
        this._registerProviders(
          fModule.providers as Array<FrameworkProvider<unknown>>,
        );

        return fModule.frameworkModule;
      }

      const childModules = (
        fModule.prototype as Record<
          string,
          Array<FrameworkModule | ModuleWithProviders> | undefined
        >
      ).modules;

      if (childModules !== undefined) {
        return [fModule, ...this._recursiveParseModule(childModules)];
      }

      return fModule;
    });
  }

  private async _bootstrapModules(): Promise<Framework> {
    const parsedModules = this._recursiveParseModule(this._modules);

    return await this._runInSequence(parsedModules, async fModule => {
      const fModuleData = fModule.prototype as Record<string, Array<unknown>>;
      const moduleProviders = fModuleData.providers as
        | Array<FrameworkProvider<unknown>>
        | undefined;
      const moduleLoaders = fModuleData.loaders as
        | Array<Constructable<FrameworkLoader>>
        | undefined;

      if (moduleProviders) {
        this._registerProviders(moduleProviders);
      }

      if (moduleLoaders) {
        this._registerLoaders(moduleLoaders);
      }

      return await Promise.resolve();
    }).then(() => this);
  }

  private async _bootstrapProviders(): Promise<Framework> {
    const sortedProviders = dedupeArray(
      this._providers.sort(
        (a, b) =>
          (Array.isArray(a.deps) ? a.deps.length : -1) -
          (Array.isArray(b.deps) ? b.deps.length : -1),
      ),
    );

    return await this._runInSequence(sortedProviders, async provider => {
      const toInject: Array<unknown> = [];

      if (Array.isArray(provider.deps) && provider.deps.length > 0) {
        toInject.push(
          ...provider.deps
            .map(dep =>
              dep === APP_CONFIG_TOKEN_SYMBOL ? this._appConfig : dep,
            )
            .map(toBeInjected => Container.get(toBeInjected)),
        );
      }

      return await Promise.resolve()
        .then(() => provider.useValue(...toInject))
        .then(value => Container.set(provider.provide, value));
    }).then(() => this);
  }

  private async _bootstrapLoaders(): Promise<Framework> {
    const settings = new FrameworkSettings();

    const loadersMap: Map<string, Constructable<FrameworkLoader>> = new Map<
      string,
      Constructable<FrameworkLoader>
    >();
    const sortedLoaders = this._loaders.sort(
      (a, b) => a.prototype.deps.length - b.prototype.deps.length,
    );

    const dependencyRelationships: Record<string, Array<string>> = {};

    sortedLoaders.forEach(loader => {
      const loaderName = loader.name;
      const dependencies = loader.prototype.deps as Array<
        Constructable<CallableFunction>
      >;

      loadersMap.set(loaderName, loader);

      dependencyRelationships[loaderName] = [];

      if (dependencies.length > 0) {
        dependencies.forEach(loaderDep => {
          const depArray = dependencyRelationships[loaderName]!;

          depArray.push(loaderDep.name);

          return (dependencyRelationships[loaderName] = depArray);
        });
      }
    });

    const dependencyTree: Tree = generateDependencyTree(
      dependencyRelationships,
    );

    const deduplicatedLoaders: Array<Constructable<FrameworkLoader>> =
      dedupeArray(flattenDependencyTree(dependencyTree)).map(loaderName => {
        if (loadersMap.has(loaderName)) {
          return loadersMap.get(loaderName);
        }
        throw new Error(`Cannot find loader '${loaderName}'`);
      }) as Array<Constructable<FrameworkLoader>>;

    return await this._runInSequence(deduplicatedLoaders, async loader => {
      const constructedLoader = new loader();

      if (typeof constructedLoader.unloader === 'function') {
        this._registerUnloaders([constructedLoader.unloader()]);
      }

      const loaderResult = constructedLoader.loader()(settings);

      return (
        loaderResult instanceof Promise
          ? await loaderResult
          : await Promise.resolve()
      ) as unknown;
    })
      .then(() => {
        const onTerminateHandler = (): void => {
          this._runInSequence(this._unloaders, async unloader => {
            await unloader(settings);
          }).catch(error =>
            console.error('Unable to shutdown gracefully.', error),
          );
        };

        process.on('SIGTERM', onTerminateHandler);
        process.on('SIGINT', onTerminateHandler);
      })
      .then(() => this);
  }

  private async _runInSequence<T, U>(
    collection: Array<T>,
    callback: (item: T) => Promise<U>,
  ): Promise<Array<U>> {
    const results: Array<U> = [];

    return await collection
      .reduce(
        async (promise, item) =>
          await promise
            .then(async () => await callback(item))
            .then(result => {
              results.push(result);
            }),
        Promise.resolve(),
      )
      .then(() => results);
  }

  static configure<T extends GenericAppConfig>(
    config: FrameworkConfiguration<T>,
  ): Framework {
    const framework: Framework = new Framework();

    if (config.appConfig) {
      framework._registerAppConfigToken(config.appConfig);
    }

    if (config.modules) {
      framework._registerModules(
        config.modules as Array<FrameworkModule | ModuleWithProviders>,
      );
    }

    if (config.providers) {
      framework._registerProviders(
        config.providers as Array<FrameworkProvider<unknown>>,
      );
    }

    if (config.loaders) {
      framework._registerLoaders(
        config.loaders as Array<Constructable<FrameworkLoader>>,
      );
    }

    return framework;
  }
}
