/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

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
