/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { FrameworkProvider } from '@tessellation/core';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse } from 'yaml';

import { CONFIG_SERVICE_TOKEN } from './config-service.token';

/**
 * @param serviceName
 */
export function ConfigServiceProvider(
  serviceName: string,
): FrameworkProvider<string> {
  let environment = process.env.ENVIRONMENT ?? 'dev';

  if (environment === 'dev') {
    const path = join(process.cwd(), 'config', 'local.yaml');

    const local = parse(readFileSync(path, 'utf-8')) as Record<
      string,
      string | undefined
    >;

    environment = local[serviceName] ?? environment;
  }

  return {
    provide: CONFIG_SERVICE_TOKEN,
    useValue: (): string => {
      const configServiceUrl = new URL(
        process.env.CONFIG_SERVICE_URL ??
          'https://config-service.competence.one/',
      );

      configServiceUrl.pathname = `/api/config/${serviceName}/${environment}`;

      return configServiceUrl.toString();
    },
  };
}
