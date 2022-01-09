/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Container, Token } from 'typedi';

export interface BannerEntry {
  key: string;
  value: string;
}

export const BANNER_ENTRY_TOKEN = new Token<Array<BannerEntry>>(
  'banner-entry-token',
);
Container.set(BANNER_ENTRY_TOKEN, []);

/**
 * @param key
 * @param value
 */
export function addBannerEntry(key: string, value: string): void {
  const a = Container.get(BANNER_ENTRY_TOKEN);

  a.push({ key, value });

  Container.set(BANNER_ENTRY_TOKEN, a);
}
