/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  AppConfig,
  appConfigLoader,
  FrameworkProvider,
  GenericAppConfig,
  Token,
} from '@tessellation/core';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

export const APP_CONFIG_TOKEN = new Token<AppConfig<Config>>('app-config');

export interface Config extends GenericAppConfig {
  customConfigValue: string;
}

export const AppConfigProvider: FrameworkProvider<AppConfig<Config>> = {
  provide: APP_CONFIG_TOKEN,
  useValue: () => {
    const environment = process.env.ENVIRONMENT ?? 'dev';

    if (environment === 'dev') {
      const path = join(process.cwd(), 'config', 'example', 'config.yaml');

      return appConfigLoader<Config>(
        parse(readFileSync(path, 'utf-8')) as Config,
      );
    }

    return appConfigLoader<Config>({
      environment,
    } as Partial<Config> as unknown as Config);
  },
};
