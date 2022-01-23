/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Container, Token } from '@tessellation/core';

export interface BannerEntry {
  key: string;
  value: string;
}

export const BANNER_ENTRY_TOKEN = new Token<Array<BannerEntry>>(
  'banner-entry-token',
);
Container.set(BANNER_ENTRY_TOKEN, []);
