/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  Container,
  FrameworkLoader,
  FrameworkLoaderFunction,
  FrameworkSettings,
  Loader,
} from '@tessellation/core';
import { Logger, LoggerLoader } from '@tessellation/logger';
import { useContainer as classValidatorUseContainer } from 'class-validator';
import { ConnectionOptions, createConnection, useContainer } from 'typeorm';

import { DATABASE_CONFIG_TOKEN } from './database-config.token';
import { DATABASE_ENTITY_TOKEN } from './database-entity.token';

@Loader({
  deps: [LoggerLoader],
})
export class DatabaseLoader implements FrameworkLoader {
  loader(): FrameworkLoaderFunction {
    classValidatorUseContainer(Container);
    useContainer(Container);

    return async (settings?: FrameworkSettings): Promise<void> => {
      if (settings) {
        const log = new Logger(__filename, ['ORM']);
        const config = Container.get(DATABASE_CONFIG_TOKEN);

        const entities = Container.get(DATABASE_ENTITY_TOKEN);

        log.info(
          `Loading TYPEORM with ${entities.length} entit${
            entities.length === 1 ? 'y' : 'ies'
          }`,
        );
        log.debug(
          `[${entities.map(entity => entity.name as string).join(', ')}]`,
        );

        const options: ConnectionOptions = {
          ...config,
          logging: ['schema', 'error', 'warn', 'info', 'log'],
          entities,
        };

        log.info('Connecting...');

        const connection = await createConnection(options);

        log.info('Connected.');

        settings.setValue('connection', connection);
      }
    };
  }
}
