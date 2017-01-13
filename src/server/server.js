

import logger from 'debug';
import Koa from 'koa';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-better-body';
import favicon from 'koa-favicon';
import mount from 'koa-mount';
import serve from 'koa-static';
import convert from 'koa-convert';

import config from './config';
import context from './middleware/context';
import render from './middleware/render';

const app = new Koa();

app.use(koaLogger());

global.btoa = string => new Buffer(string).toString('base64');

// Middleware
app.use(async (ctx, next) => {
  // TODO: It's wrong code if you have several users... :)
  global.navigator = {
    userAgent: ctx.headers['user-agent'],
  };
  await next();
});

app.use(favicon(config.http.favicon));
app.use(convert(bodyParser({
  formLimit: '200kb',
  jsonLimit: '200kb',
  bufferLimit: '4mb',
})));

// Serve static files
config.http.static.forEach((staticRoute) => {
  logger('app:static')(staticRoute.path, staticRoute.url);
  app.use(mount(staticRoute.url, serve(staticRoute.path)));
});

// Needed for authentication
app.use(context);

app.use(render);

app.listen(config.http.port, () => {
  logger('app:start')(`Listening on port ${config.http.port}`);
});
