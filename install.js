/**
 * Bootstrap our server
 */
require('app-module-path').addPath(__dirname);
require('config/init')();

require('isomorphic-fetch');
require('core/helpers/logger');
require('core/helpers/polyfills');

// Compile files on PROD
if (process.env.NODE_ENV === 'production') {
  require('core/webpack/webpack.prod.js');
}
