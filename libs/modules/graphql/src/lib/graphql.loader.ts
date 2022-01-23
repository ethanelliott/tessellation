/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import { addBannerEntry } from '@tessellation/banner';
import {
  Container,
  FrameworkLoader,
  FrameworkLoaderFunction,
  FrameworkSettings,
  Loader,
  NonEmptyArray,
} from '@tessellation/core';
import { ExpressLoader } from '@tessellation/express';
import { Logger } from '@tessellation/logger';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import { execute, subscribe } from 'graphql';
import { Server } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { buildSchema } from 'type-graphql';

import { GRAPHQL_CONFIG_TOKEN } from './graphql-config.token';
import { GRAPHQL_RESOLVER_TOKEN } from './graphql-resolver.token';

@Loader({
  deps: [ExpressLoader],
})
export class GraphqlLoader implements FrameworkLoader {
  loader(): FrameworkLoaderFunction {
    return async (settings?: FrameworkSettings): Promise<void> => {
      if (settings) {
        const log = new Logger(__filename, ['GRAPHQL']);
        const config = Container.get(GRAPHQL_CONFIG_TOKEN);

        const resolvers = Container.get(
          GRAPHQL_RESOLVER_TOKEN,
        ) as NonEmptyArray<CallableFunction>;

        log.info('Starting graphql');
        const app: Application = settings.getValue<Application>('express_app');

        const schema = await buildSchema({
          ...config.buildSchemaOptions,
          container: Container,
          resolvers,
          emitSchemaFile: false,
          validate: true,
          dateScalarMode: 'isoDate',
        });

        const apolloServer = new ApolloServer({
          schema,
          logger: log,
          plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
        });

        await apolloServer.start();

        apolloServer.applyMiddleware({
          app,
          path: `/${config.path}`,
        });

        const server = settings.getValue<Server>('server');
        const ss = new SubscriptionServer(
          {
            execute,
            subscribe,
            schema,
          },
          {
            server,
            path: `/${config.path}`,
          },
        );

        log.info(ss.server.path);

        addBannerEntry('graphql', `#{url}${config.path}`);
      }
    };
  }
}
