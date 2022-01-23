/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { AppConfig, GenericAppConfig } from '../app-config';
import { ComponentTypes } from '../component-types.enum';
import { Container, Token } from '../di';
import {
  ConstructableFrameworkLoader,
  FrameworkLoaderOrder,
  FrameworkUnloaderFunction,
} from '../loader';
import {
  ConstructableFrameworkModule,
  FrameworkModulePrototype,
  ModuleWithProviders,
} from '../module';
import { APP_CONFIG_TOKEN_SYMBOL, GenericFrameworkProvider } from '../provider';
import { FrameworkSettings } from '../settings';
import {
  dedupeArray,
  flattenDependencyTree,
  generateDependencyTree,
  Tree,
} from './dependency-tree.util';
import { FrameworkConfiguration } from './framework-configuration';
import { runInOrder } from './run-in-order';

export class Framework {
  private _appConfig: Token<AppConfig<GenericAppConfig>>;

  private readonly _modules: Array<
    ConstructableFrameworkModule | ModuleWithProviders
  >;

  private readonly _providers: Array<GenericFrameworkProvider>;

  private readonly _loaders: Array<ConstructableFrameworkLoader>;

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

  private _registerAppConfigToken(
    appConfig: Token<AppConfig<GenericAppConfig>>,
  ): this {
    this._appConfig = appConfig;

    return this;
  }

  private _registerModules(
    modules: Array<ConstructableFrameworkModule | ModuleWithProviders>,
  ): this {
    modules.forEach(m => {
      if (
        !('frameworkModule' in m) &&
        (m.prototype.type as ComponentTypes) !== ComponentTypes.MODULE
      ) {
        throw new Error(`[${m.name}] is not of type module.`);
      }
    });
    this._modules.push(...modules);

    return this;
  }

  private _registerProviders(providers: Array<GenericFrameworkProvider>): this {
    this._providers.push(...providers);

    return this;
  }

  private _registerLoaders(loaders: Array<ConstructableFrameworkLoader>): this {
    loaders.forEach(l => {
      if ((l.prototype.type as ComponentTypes) !== ComponentTypes.LOADER) {
        throw new Error(`[${l.name}] is not a loader.`);
      }
    });

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
    modules: Array<ConstructableFrameworkModule | ModuleWithProviders>,
  ): Array<CallableFunction | ConstructableFrameworkModule> {
    return modules.flatMap(fModule => {
      if ('frameworkModule' in fModule) {
        this._registerProviders(
          fModule.providers as Array<GenericFrameworkProvider>,
        );

        return fModule.frameworkModule;
      }

      const childModules = fModule.prototype.modules as
        | Array<ConstructableFrameworkModule | ModuleWithProviders>
        | undefined;

      if (childModules !== undefined) {
        return [fModule, ...this._recursiveParseModule(childModules)];
      }

      return fModule;
    });
  }

  private async _bootstrapModules(): Promise<Framework> {
    const parsedModules = this._recursiveParseModule(this._modules);

    return await runInOrder(parsedModules, async fModule => {
      const fModuleData = fModule.prototype as FrameworkModulePrototype;
      const moduleProviders = fModuleData.providers as
        | Array<GenericFrameworkProvider>
        | undefined;
      const moduleLoaders = fModuleData.loaders as
        | Array<ConstructableFrameworkLoader>
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
    ).map(provider => {
      if (provider.provide === APP_CONFIG_TOKEN_SYMBOL) {
        provider.provide = this._appConfig;
      }

      return provider;
    });

    return await runInOrder(sortedProviders, async provider => {
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
        .then(value =>
          Container.set(provider.provide as Token<unknown>, value),
        );
    }).then(() => this);
  }

  private async _bootstrapLoaders(): Promise<Framework> {
    const settings = new FrameworkSettings();

    const loadersMap: Map<string, ConstructableFrameworkLoader> = new Map<
      string,
      ConstructableFrameworkLoader
    >();
    const sortedLoaders = this._loaders.sort(
      (a, b) =>
        (a.prototype.deps?.length ?? 0) - (b.prototype.deps?.length ?? 0),
    );

    const dependencyRelationships: Record<string, Array<string>> = {};

    sortedLoaders.forEach(loader => {
      const loaderName = loader.name;
      const dependencies = (loader.prototype.deps ??
        []) as Array<ConstructableFrameworkLoader>;

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

    const deduplicatedLoaders: Array<ConstructableFrameworkLoader> =
      dedupeArray(flattenDependencyTree(dependencyTree)).map(loaderName => {
        if (loadersMap.has(loaderName)) {
          return loadersMap.get(loaderName);
        }
        throw new Error(`Cannot find loader '${loaderName}'`);
      }) as Array<ConstructableFrameworkLoader>;

    const finalSortOrder = [
      ...deduplicatedLoaders.filter(
        e => e.prototype.order === FrameworkLoaderOrder.FIRST,
      ),
      ...deduplicatedLoaders.filter(
        e => e.prototype.order === FrameworkLoaderOrder.ANY,
      ),
      ...deduplicatedLoaders.filter(
        e => e.prototype.order === FrameworkLoaderOrder.LAST,
      ),
    ];

    return await runInOrder(finalSortOrder, async loader => {
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
          runInOrder(this._unloaders, async unloader => {
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

  static configure<T extends AppConfig<GenericAppConfig>>(
    config: FrameworkConfiguration<T>,
  ): Framework {
    const framework: Framework = new Framework();

    if (config.appConfig) {
      framework._registerAppConfigToken(config.appConfig);
    }

    if (config.modules) {
      framework._registerModules(
        config.modules as Array<
          ConstructableFrameworkModule | ModuleWithProviders
        >,
      );
    }

    if (config.providers) {
      framework._registerProviders(
        config.providers as Array<GenericFrameworkProvider>,
      );
    }

    if (config.loaders) {
      framework._registerLoaders(
        config.loaders as Array<ConstructableFrameworkLoader>,
      );
    }

    return framework;
  }
}
