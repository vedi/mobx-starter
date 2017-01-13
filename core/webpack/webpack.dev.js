const path = require('path');
const _ = require('lodash');
const logger = require('debug');
const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const WebpackDevServer = require('webpack-dev-server');

const config = require('config/config');
const webpackBase = require('./webpack.base.js');

// Merge with base configuration
//-------------------------------
_.merge(webpackBase, {
  cache: true,
  devtool: 'source-map', // eval eval-cheap-module-source-map source-map
  entry: {
    bundle: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${config.devServer.port}`,
      'webpack/hot/only-dev-server',
      path.join(__dirname, '../../src/client/client.jsx'),
    ],
  },
  output: {
    publicPath: `http://localhost:${config.devServer.port}/build/`,
    libraryTarget: 'var',
    pathinfo: true,
  },
});

webpackBase.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.WatchIgnorePlugin([
    path.join(__dirname, '../../src/server'),
  ]),
  new webpack.DefinePlugin({
    'process.env.DEV': true,
    'process.env.BROWSER': true,
    'process.env.NODE_ENV': JSON.stringify('development'),
  })
);

// Run DEV server for hot-reloading
//---------------------------------
const compiler = webpack(webpackBase);
const port = config.devServer.port;

new WebpackDevServer(compiler, {
  publicPath: webpackBase.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap',
  },
  hot: true,
  historyApiFallback: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: false,
  },
  stats: {
    colors: true,
    hash: false,
    timings: false,
    version: false,
    chunks: false,
    modules: false,
    children: false,
    chunkModules: false,
  },
}).listen(port, '0.0.0.0', (err) => {
  if (err) return logger('webpack:error', err);

  logger('webpack:compiler')(`Running on port ${port}`);
});
