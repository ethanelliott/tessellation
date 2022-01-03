/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  FrameworkLoader,
  FrameworkLoaderFunction,
  Loader,
} from '@tessellation/core';
import { Container } from 'typedi';

import { Logger, LoggerLoader } from '../logger';
import { BANNER_CONFIG_TOKEN } from './banner-config.token';

@Loader({
  deps: [LoggerLoader],
})
export class BannerLoader implements FrameworkLoader {
  loader(): FrameworkLoaderFunction {
    return (): void => {
      const log = new Logger(__filename);
      const config = Container.get(BANNER_CONFIG_TOKEN);
      const line = '====================================================';

      log.info(line);
      log.info(`${config.name}`);
      log.info(line);
      log.info(`Environment  : ${config.environment}`);
      log.info(`Version      : ${config.version}`);
      log.info(`URL          : ${config.url.toString()}`);
      log.info(line);
    };
  }
}
