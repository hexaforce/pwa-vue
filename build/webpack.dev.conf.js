'use strict'

import { readFileSync } from 'fs';
import { join } from 'path';
import { styleLoaders } from './utils';
import { DefinePlugin, HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } from 'webpack';
import { dev } from '../config';
import merge from 'webpack-merge';
import baseWebpackConfig, { entry } from './webpack.base.conf';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';

// add hot-reload related code to entry chunks
Object.keys(entry).forEach(function (name) {
  entry[name] = ['./build/dev-client'].concat(entry[name])
})

export default merge(baseWebpackConfig, {
  module: {
    rules: styleLoaders({ sourceMap: dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new DefinePlugin({
      'process.env': dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      serviceWorkerLoader: `<script>${readFileSync(join(__dirname,
        './service-worker-dev.js'), 'utf-8')}</script>`
    }),
    new FriendlyErrorsPlugin()
  ]
})
