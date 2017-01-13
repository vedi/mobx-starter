
import config from 'config/config';
import { storesCreator } from '../../client/stores';

/**
 * Middleware for creating the context
 * @param ctx
 * @param next
 */
export default async (ctx, next) => {
  ctx.accessToken = ctx.cookies.get('accessToken');

  // Create the context with params and hostname for SSR
  const state = {
    common: {
      hostname: ctx.headers.host,
      backend: config.backend,
      clientId: config.client.clientId,
      clientSecret: config.client.clientSecret,
    },
  };

  // Finally initialize state. This should come last
  ctx.stores = storesCreator(state, ctx.accessToken);
  await next();
};
