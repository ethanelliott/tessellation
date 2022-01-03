/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Token } from 'typedi';

import { BannerConfig } from './banner-config';

export const BANNER_CONFIG_TOKEN = new Token<BannerConfig>('banner-config');
