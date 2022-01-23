/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { Module } from '@tessellation/core';

import { BannerLoader } from './banner.loader';
import { BannerProvider } from './banner.provider';

@Module({
  providers: [BannerProvider],
  loaders: [BannerLoader],
})
export class BannerModule {}
