/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { AbstractConstructable, Constructable } from '../constructable';
import { CannotInstantiateValueError } from './cannot-instantiate-value.error';
import { Container } from './container';
import { EMPTY_VALUE } from './empty';
import { GenericIdentifier } from './generic-identifier';
import { ServiceIdentifier } from './service-identifier';
import { ServiceMetadata } from './service-metadata';
import { ServiceNotFoundError } from './service-not-found.error';
import { ServiceOptions } from './service-options';
import { Token } from './token';

interface ReflectType {
  getMetadata: (
    a: string,
    b: object,
    c?: GenericIdentifier,
  ) => Array<unknown> | unknown | undefined;
}

interface ResetOptions {
  strategy: 'resetServices' | 'resetValue';
}

export class ContainerInstance {
  readonly id: GenericIdentifier;

  private _services: Array<ServiceMetadata> = [];

  constructor(id: GenericIdentifier) {
    this.id = id;
  }

  has<T>(identifier: ServiceIdentifier<T>): boolean {
    return !!this._findService(identifier);
  }

  get<T>(identifier: ServiceIdentifier<T>): T {
    const globalContainer = Container.of(undefined);
    const globalService = globalContainer._findService(identifier);
    const scopedService = this._findService(identifier);

    if (globalService?.global === true) {
      return this._getServiceValue(globalService);
    }

    if (scopedService) {
      return this._getServiceValue(scopedService);
    }

    if (globalService && this !== globalContainer) {
      const clonedService = { ...globalService };

      clonedService.value = EMPTY_VALUE;

      this.set(clonedService);

      const value = this._getServiceValue(clonedService);

      this.set({ ...clonedService, value });

      return value as T;
    }

    if (globalService) {
      return this._getServiceValue(globalService);
    }

    throw new ServiceNotFoundError(identifier);
  }

  getMany<T>(identifier: ServiceIdentifier<T>): Array<T> {
    return this._findAllServices<T>(identifier).map(service =>
      this._getServiceValue<T>(service),
    );
  }

  set<T = unknown>(
    identifierOrServiceMetadata:
      | Array<ServiceOptions<T>>
      | ServiceIdentifier
      | ServiceOptions<T>,
    value?: T,
  ): this {
    if (Array.isArray(identifierOrServiceMetadata)) {
      identifierOrServiceMetadata.forEach(data => this.set(data));

      return this;
    }

    if (
      typeof identifierOrServiceMetadata === 'string' ||
      identifierOrServiceMetadata instanceof Token
    ) {
      return this.set({
        id: identifierOrServiceMetadata,
        type: null,
        value: value,
        factory: undefined,
        global: false,
        multiple: false,
        eager: false,
        transient: false,
      });
    }

    if (typeof identifierOrServiceMetadata === 'function') {
      return this.set({
        id: identifierOrServiceMetadata,
        type: identifierOrServiceMetadata as Constructable<unknown>,
        value: value,
        factory: undefined,
        global: false,
        multiple: false,
        eager: false,
        transient: false,
      });
    }

    const newService: ServiceMetadata<T> = {
      id: new Token('UNREACHABLE'),
      type: null,
      factory: undefined,
      value: EMPTY_VALUE,
      global: false,
      multiple: false,
      eager: false,
      transient: false,
      ...identifierOrServiceMetadata,
    };

    const service = this._findService(newService.id);

    if (service && !service.multiple) {
      Object.assign(service, newService);
    } else {
      this._services.push(newService);
    }

    if (newService.eager === true) {
      this.get(newService.id);
    }

    return this;
  }

  remove(
    identifierOrIdentifierArray: Array<ServiceIdentifier> | ServiceIdentifier,
  ): this {
    if (Array.isArray(identifierOrIdentifierArray)) {
      identifierOrIdentifierArray.forEach(id => this.remove(id));
    } else {
      this._services = this._services.filter(service => {
        if (service.id === identifierOrIdentifierArray) {
          this._destroyServiceInstance(service);

          return false;
        }

        return true;
      });
    }

    return this;
  }

  reset(
    options: ResetOptions = {
      strategy: 'resetValue',
    },
  ): this {
    switch (options.strategy) {
      case 'resetValue':
        this._services.forEach(service =>
          this._destroyServiceInstance(service),
        );
        break;

      case 'resetServices':
        this._services.forEach(service =>
          this._destroyServiceInstance(service),
        );
        this._services = [];
        break;

      default:
        throw new Error('Received invalid reset strategy.');
    }

    return this;
  }

  private _findAllServices<T>(
    identifier: ServiceIdentifier<T>,
  ): Array<ServiceMetadata> {
    return this._services.filter(service => service.id === identifier);
  }

  private _findService(
    identifier: ServiceIdentifier,
  ): ServiceMetadata | undefined {
    return this._services.find(service => service.id === identifier);
  }

  private _getServiceValue<T = unknown>(serviceMetadata: ServiceMetadata): T {
    let value: unknown = EMPTY_VALUE;

    if (serviceMetadata.value !== EMPTY_VALUE) {
      return serviceMetadata.value as T;
    }

    if (!serviceMetadata.factory && !serviceMetadata.type) {
      throw new CannotInstantiateValueError(serviceMetadata.id);
    }
    if (serviceMetadata.factory) {
      value = this._fromFactory<T>(serviceMetadata);
    }

    if (!serviceMetadata.factory && serviceMetadata.type) {
      const constructableTargetType: Constructable<unknown> =
        serviceMetadata.type;
      // setup constructor parameters for a newly initialized service
      const parameterTypes: Array<unknown> =
        ((Reflect as unknown as ReflectType).getMetadata(
          'design:paramtypes',
          constructableTargetType,
        ) as Array<unknown> | undefined) ?? [];
      const parameters = this._initializeParams(
        constructableTargetType,
        parameterTypes,
      );

      parameters.push(this);

      value = new constructableTargetType(...parameters);
    }

    if (!serviceMetadata.transient && value !== EMPTY_VALUE) {
      serviceMetadata.value = value;
    }

    if (value === EMPTY_VALUE) {
      throw new CannotInstantiateValueError(serviceMetadata.id);
    }

    if (serviceMetadata.type) {
      this._applyPropertyHandlers(
        serviceMetadata.type,
        value as Record<string, unknown>,
      );
    }

    return value as T;
  }

  private _fromFactory<T = unknown>(serviceMetadata: ServiceMetadata): T {
    if (Array.isArray(serviceMetadata.factory)) {
      let factoryInstance;

      try {
        factoryInstance = this.get<unknown>(serviceMetadata.factory[0]);
      } catch (error: unknown) {
        if (error instanceof ServiceNotFoundError) {
          factoryInstance = new serviceMetadata.factory[0]();
        } else {
          throw error;
        }
      }

      return (
        factoryInstance as Record<
          number | string | symbol,
          (c: ContainerInstance, s: ServiceIdentifier) => T
        >
      )[serviceMetadata.factory[1]](this, serviceMetadata.id);
    }

    return serviceMetadata.factory!(this, serviceMetadata.id) as T;
  }

  private _initializeParams(
    target: CallableFunction,
    parameterTypes: Array<unknown>,
  ): Array<unknown> {
    return parameterTypes.map(
      (parameterType: AbstractConstructable<unknown> | unknown, index) => {
        const parameterHandler = Container.handlers.find(
          handler =>
            (handler.object === target ||
              handler.object === Object.getPrototypeOf(target)) &&
            handler.index === index,
        );

        if (parameterHandler) return parameterHandler.value(this);

        if (
          (parameterType as AbstractConstructable<unknown>).name &&
          !this._isPrimitiveParamType(
            (parameterType as AbstractConstructable<unknown>).name,
          )
        ) {
          return this.get(parameterType as ServiceIdentifier);
        }

        return undefined;
      },
    );
  }

  private _isPrimitiveParamType(parameterTypeName: string): boolean {
    return ['string', 'boolean', 'number', 'object'].includes(
      parameterTypeName.toLowerCase(),
    );
  }

  private _applyPropertyHandlers(
    target: CallableFunction,
    instance: Record<string, unknown>,
  ): void {
    Container.handlers.forEach(handler => {
      if (typeof handler.index === 'number') return;
      if (
        handler.object.constructor !== target &&
        !(target.prototype instanceof handler.object.constructor)
      )
        return;

      if (handler.propertyName !== undefined) {
        instance[handler.propertyName] = handler.value(this);
      }
    });
  }

  private _destroyServiceInstance(
    serviceMetadata: ServiceMetadata,
    force = false,
  ): void {
    const shouldResetValue =
      force || !!serviceMetadata.type || !!serviceMetadata.factory;

    if (shouldResetValue) {
      if (
        typeof (serviceMetadata.value as Record<string, unknown>).destroy ===
        'function'
      ) {
        try {
          (serviceMetadata.value as { destroy: CallableFunction }).destroy();
        } catch {
          //  Ignore
        }
      }

      serviceMetadata.value = EMPTY_VALUE;
    }
  }
}
