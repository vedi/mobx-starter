import {stores} from '../../client/stores'

/**
 * Middleware for creating the context
 * @param ctx
 * @param next
 */
export default async(ctx, next) => {
  // Create the context with params and hostname for SSR
  const state = {
    common: {
      hostname: ctx.headers.host,
      backend: 'http://localhost:1340',
      clientId: 'default',
      clientSecret: 'default'
    }
  };

  // Finally initialize state. This should come last
  ctx.stores = stores(state, ctx.token);
  await next()
}
