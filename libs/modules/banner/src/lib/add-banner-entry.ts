/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Container } from '@tessellation/core';

import { BANNER_ENTRY_TOKEN } from './banner-entry.token';

/**
 * @param key
 * @param value
 */
export function addBannerEntry(key: string, value: string): void {
  const a = Container.get(BANNER_ENTRY_TOKEN);

  a.push({ key, value });

  Container.set(BANNER_ENTRY_TOKEN, a);
}
