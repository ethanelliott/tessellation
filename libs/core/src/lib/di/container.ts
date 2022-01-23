/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { ContainerInstance } from './container-instance';
import { DEFAULT_CONTAINER_ID } from './default-container-id';
import { GenericIdentifier } from './generic-identifier';
import { Handler } from './handler';
import { ServiceIdentifier } from './service-identifier';
import { ServiceOptions } from './service-options';
import { Token } from './token';

export class Container {
  static readonly handlers: Array<Handler> = [];

  private static readonly _globalInstance: ContainerInstance =
    new ContainerInstance('default');

  private static readonly _instances: Array<ContainerInstance> = [];

  static of(
    containerId: GenericIdentifier = DEFAULT_CONTAINER_ID,
  ): ContainerInstance {
    if (containerId === DEFAULT_CONTAINER_ID) return this._globalInstance;

    let container = this._instances.find(
      instance => instance.id === containerId,
    );

    if (!container) {
      container = new ContainerInstance(containerId);
      this._instances.push(container);
    }

    return container;
  }

  static has<T>(identifier: ServiceIdentifier<T>): boolean {
    return this._globalInstance.has(identifier);
  }

  static get<T>(identifier: ServiceIdentifier<T>): T {
    return this._globalInstance.get(identifier);
  }

  static getMany<T>(id: Token<T> | string): Array<T> {
    return this._globalInstance.getMany(id);
  }

  static set<T = unknown>(
    identifierOrServiceMetadata:
      | Array<ServiceOptions<T>>
      | ServiceIdentifier<T>
      | ServiceOptions<T>,
    value?: unknown,
  ): Container {
    this._globalInstance.set(identifierOrServiceMetadata, value);

    return this;
  }

  static remove<T = unknown>(
    identifierOrIdentifierArray:
      | Array<ServiceIdentifier<T>>
      | ServiceIdentifier<T>,
  ): Container {
    this._globalInstance.remove(identifierOrIdentifierArray);

    return this;
  }

  static reset(
    containerId: GenericIdentifier = DEFAULT_CONTAINER_ID,
  ): Container {
    if (containerId === DEFAULT_CONTAINER_ID) {
      this._globalInstance.reset();
      this._instances.forEach(instance => instance.reset());
    } else {
      const instance = this._instances.find(item => item.id === containerId);

      if (instance) {
        instance.reset();
        this._instances.splice(this._instances.indexOf(instance), 1);
      }
    }

    return this;
  }

  static registerHandler(handler: Handler): Container {
    this.handlers.push(handler);

    return this;
  }

  static import(services: Array<CallableFunction>): Container {
    services.map(s => s);

    return this;
  }
}
