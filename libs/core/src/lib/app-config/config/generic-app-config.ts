/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { AppPackageInformation } from './app-package-information';
import { URLComponents } from './url-components';

export interface GenericAppConfig {
  isProduction: boolean;
  environment: string;
  app?: AppPackageInformation & {
    url: URL;
    address: URLComponents;
  };
}
