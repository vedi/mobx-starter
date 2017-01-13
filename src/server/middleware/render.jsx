import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ServerRouter } from 'react-router';
import createServerRenderContext from 'react-router/createServerRenderContext';
import preload from '../../client/preload';
import Html from '../../components/common/Html';

// Server-side render
export default async (ctx, next) => {
  const renderContext = createServerRenderContext();

  function renderComponent() {
    return (<ServerRouter location={ctx.url} context={renderContext}>
      <Html stores={ctx.stores} />
    </ServerRouter>);
  }

  try {
    await preload({ ...ctx.stores, serverRendering: true }, ctx.url);
  } catch (err) {
    console.info('Error in preloading', err);
  }
  let markup = renderComponent();
  const result = renderContext.getResult();

  // Handle redirects
  if (result.redirect) {
    ctx.status = 301;
    ctx.redirect(result.redirect.pathname);
    ctx.body = '<!DOCTYPE html>redirecting';
    return await next();
  }

  // 404 Route not found !
  if (result.missed) {
    markup = renderComponent();
    ctx.status = 404;
  }

  ctx.body = `<!DOCTYPE html>\n${renderToStaticMarkup(markup)}`;
};
