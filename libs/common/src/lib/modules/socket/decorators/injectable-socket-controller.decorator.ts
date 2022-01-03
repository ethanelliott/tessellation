/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { SocketController } from 'socket-controllers';
import { Constructable, Container, Service } from 'typedi';

import { SOCKET_CONTROLLERS_TOKEN } from '../socket-controllers.token';

/**
 * @param {...any} arguments_
 */
export function InjectableSocketController(
  ...arguments_: Parameters<typeof SocketController>
) {
  return (target: unknown): void => {
    Service()(target);
    SocketController(...arguments_)(target as never);

    const controllerArray = Container.get(SOCKET_CONTROLLERS_TOKEN);

    controllerArray.push(target as Constructable<CallableFunction>);

    Container.set(SOCKET_CONTROLLERS_TOKEN, controllerArray);
  };
}
