/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  FrameworkLoader,
  FrameworkLoaderFunction,
  FrameworkSettings,
  Loader,
} from '@tessellation/core';
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { MetadataStorage as ClassTransformerMetadataStorage } from 'class-transformer/types/MetadataStorage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Application } from 'express';
import { PathItemObject, PathsObject } from 'openapi3-ts/src/model/OpenApi';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { serve, setup } from 'swagger-ui-express';
import { Container } from 'typedi';

import { addBannerEntry } from '../banner';
import { ExpressLoader } from '../express';
import { SWAGGER_CONFIG_TOKEN } from './swagger-config.token';

@Loader({
  deps: [ExpressLoader],
})
export class SwaggerLoader implements FrameworkLoader {
  loader(): FrameworkLoaderFunction {
    return (settings?: FrameworkSettings): void => {
      const config = Container.get(SWAGGER_CONFIG_TOKEN);

      if (settings && config.enabled) {
        const expressApp = settings.getValue<Application>('express_app');
        const schemas = validationMetadatasToSchemas({
          classTransformerMetadataStorage:
            defaultMetadataStorage as ClassTransformerMetadataStorage,
        });

        // replaces definitions with component references... this should happen in the validationMetadatasToSchemas
        const parsedSchemas = JSON.parse(
          JSON.stringify(schemas).replace(
            /#\/definitions/g,
            '#/components/schemas',
          ),
        ) as Record<string, never>;

        const swaggerFile = routingControllersToSpec(
          getMetadataArgsStorage(),
          {},
          {
            components: {
              schemas: parsedSchemas,
            },
          },
        );

        swaggerFile.info = {
          title: config.title,
          name: config.name,
          description: config.description,
          version: config.version,
        };

        const parsedPrefix = config.routePrefix.replace(/(^\/|\/$)/g, '');

        swaggerFile.paths = Object.fromEntries(
          Object.entries(swaggerFile.paths)
            .map(([key, value]) => [
              `/${parsedPrefix}${key}`,
              value as PathItemObject,
            ])
            .map(([key, value]) => [key, value]),
        ) as PathsObject;

        expressApp.use(
          '/swagger',
          (request, response, next: () => void) => next(),
          serve,
          setup(swaggerFile),
        );

        addBannerEntry('Swagger', '#{url}/swagger');
      }
    };
  }
}
