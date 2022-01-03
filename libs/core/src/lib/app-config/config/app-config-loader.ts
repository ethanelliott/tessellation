/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { readFileSync } from 'fs';
import { join } from 'path';

import { AppConfig } from './app-config';
import { AppConfigConstructor } from './app-config-constructor';
import { GenericAppConfig } from './generic-app-config';
import { URLComponents } from './url-components';

export interface PackageJSON {
  name: string;
  version: string;
  description: string;
  homepage: string;
  license: string;
  main: string;
  repository:
    | string
    | {
        type: string;
        url: string;
        directory: string;
      };
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

const getOsEnvironmentVariable = (
  key: string,
  optional?: boolean,
): string | undefined => {
  if (typeof process.env[key] === 'undefined') {
    if (optional !== undefined && optional) {
      return undefined;
    }
    throw new Error(`Environment variable ${key} is not set.`);
  }

  return process.env[key]!;
};

/**
 * @param appName
 * @param address
 */
function generateUrl(appName: string, address?: URLComponents): URL {
  const x = new URL('http://localhost');

  x.protocol = address?.protocol ?? 'https';
  x.hostname = address?.hostname ?? `${appName}.competence.one`;
  if (address?.port !== undefined) {
    x.port = address.port.toString(10);
  }
  x.pathname = address?.routePrefix ?? 'api';

  return x;
}

/**
 * @param config
 */
export function appConfigLoader<T extends GenericAppConfig>(
  config: T,
): AppConfig<T> {
  const packageJson: PackageJSON = JSON.parse(
    readFileSync(join(__dirname, './package.json'), 'utf-8'),
  ) as PackageJSON;

  if (config.app === undefined) {
    config.app = {} as never;
  }

  config.app.name = packageJson.name;
  config.app.version = packageJson.version;
  config.app.description = packageJson.description;
  config.app.url = generateUrl(config.app.name, config.app.address);
  config.isProduction =
    getOsEnvironmentVariable('NODE_ENV', true) === 'production';

  return new AppConfigConstructor(config);
}
