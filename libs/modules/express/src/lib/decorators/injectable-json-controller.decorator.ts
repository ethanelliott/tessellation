/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Constructable, Container, Service } from '@tessellation/core';
import { JsonController } from 'routing-controllers';

import { EXPRESS_CONTROLLER_TOKEN } from '../express-controller.token';
import { GenericExpressObject } from '../generic-express-object';

/**
 * @param {...any} arguments_
 */
export function InjectableJsonController(
  ...arguments_: Parameters<typeof JsonController>
) {
  return (target: CallableFunction): void => {
    Service()(target);
    JsonController(...arguments_)(target as never);
    const controllerArray = Container.get(EXPRESS_CONTROLLER_TOKEN);

    controllerArray.push(target as Constructable<GenericExpressObject>);

    Container.set(EXPRESS_CONTROLLER_TOKEN, controllerArray);
  };
}
