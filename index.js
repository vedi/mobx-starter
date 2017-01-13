/**
 * Bootstrap our server
 */
require('app-module-path').addPath(__dirname);
require('config/init')();

require('isomorphic-fetch');
require('core/helpers/logger');
require('core/helpers/polyfills');

// Compile files on DEV server
if (process.env.NODE_ENV !== 'production') {
  process.env.DEV = true;
  require('core/webpack/webpack.dev.js');
}

require('babel-register');
require('src/server/server');
