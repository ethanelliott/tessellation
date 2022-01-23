/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  Container,
  FrameworkLoader,
  FrameworkLoaderFunction,
  FrameworkLoaderOrder,
  Loader,
} from '@tessellation/core';
import { Logger, LoggerLoader } from '@tessellation/logger';

import { BANNER_CONFIG_TOKEN } from './banner-config.token';
import { BANNER_ENTRY_TOKEN } from './banner-entry.token';

type ReplacerFunction = (value: string) => string;

const KEY_PADDING = 5;
const MAX_KEY_WIDTH = 20;
const VALUE_PADDING = 20;
const MAX_VALUE_WIDTH = 100;

/**
 * @param value
 */
function getVariables(value: string): Array<string> {
  return [...new Set([...value.matchAll(/#{(\S+)}/gm)].map(e => e[1]))];
}

/**
 * @param value
 */
function hasVariables(value: string): boolean {
  const variables = getVariables(value);

  return variables.length > 0;
}

/**
 * @param injectableVariables
 * @param value
 */
function parseVariables(
  injectableVariables: Map<string, ReplacerFunction>,
  value: string,
): string {
  const variables = getVariables(value);

  variables.forEach(v => {
    if (injectableVariables.has(v)) {
      value = injectableVariables.get(v)!(value);
    } else {
      throw new Error(`Cannot inject variable '${v}', no definition exists.`);
    }
  });

  return value;
}

@Loader({
  deps: [LoggerLoader],
  order: FrameworkLoaderOrder.LAST,
})
export class BannerLoader implements FrameworkLoader {
  loader(): FrameworkLoaderFunction {
    return (): void => {
      const log = new Logger(__filename);
      const config = Container.get(BANNER_CONFIG_TOKEN);

      const entries = Container.get(BANNER_ENTRY_TOKEN);

      const injectableVariables: Map<string, ReplacerFunction> = new Map<
        string,
        ReplacerFunction
      >();

      injectableVariables.set('url', (value: string) => {
        value = value.replaceAll('#{url}', '');

        const { url } = config;

        url.pathname = value;

        return url.toString();
      });

      entries.unshift(
        {
          key: 'Environment',
          value: config.environment,
        },
        {
          key: 'Version',
          value: config.version,
        },
        {
          key: 'URL',
          value: config.url.toString(),
        },
      );

      const maxLengthOfKeys = Math.min(
        entries.reduce((p, c) => Math.max(p, c.key.length), 0) + KEY_PADDING,
        MAX_KEY_WIDTH,
      );

      const maxLengthOfValues = Math.min(
        entries.reduce((p, c) => Math.max(p, c.value.length), 0) +
          VALUE_PADDING,
        MAX_VALUE_WIDTH,
      );
      const totalWidth = maxLengthOfKeys + maxLengthOfValues;

      const line = Array(totalWidth).fill('=').join('');

      log.info(line);
      log.info(`${config.name}`);
      log.info(line);
      entries.forEach(entry => {
        const keySpacing = Array(maxLengthOfKeys - entry.key.length)
          .fill(' ')
          .join('');
        const value = hasVariables(entry.value)
          ? parseVariables(injectableVariables, entry.value)
          : entry.value;

        log.info(`${entry.key.toLocaleUpperCase()}${keySpacing} : ${value}`);
      });
      log.info(line);
    };
  }
}
