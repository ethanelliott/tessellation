/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { readFileSync } from 'fs';
import { join, parse } from 'path';

import { AppConfig } from './app-config';
import { AppConfigConstructor } from './app-config-constructor';
import { GenericAppConfig } from './generic-app-config';
import { PackageJSON } from './package-json';
import { URLComponents } from './url-components';

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
 * @param address
 */
function generateUrl(address?: URLComponents): URL {
  const x = new URL('http://localhost');

  x.protocol = address?.protocol ?? 'https';
  x.hostname = address?.hostname ?? 'localhost';
  x.port = address?.port?.toString(10) ?? '8443';

  return x;
}

/**
 * @param config
 */
export function appConfigLoader<T extends GenericAppConfig>(
  config: T,
): AppConfig<T> {
  if (config.app === undefined) {
    config.app = {} as never;
  }

  try {
    const cwd = parse(process.argv[1]);
    const packageJson: PackageJSON = JSON.parse(
      readFileSync(join(cwd.dir, './package.json'), 'utf-8'),
    ) as PackageJSON;

    config.app.name = config.app.name ?? packageJson.name;
    config.app.version = config.app.version ?? packageJson.version;
    config.app.description = config.app.description ?? packageJson.description;
  } catch (e: unknown) {
    console.error('Unable to locate package.json');
    config.app.name = config.app.name ?? '';
    config.app.version = config.app.version ?? '';
    config.app.description = config.app.description ?? '';
  }

  config.app.url = generateUrl(config.app.address);
  config.isProduction =
    getOsEnvironmentVariable('NODE_ENV', true) === 'production';

  return new AppConfigConstructor(config);
}
