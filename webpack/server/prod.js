/* eslint-disable */

const webpack = require('webpack');
const { resolve } = require('path');
var nodeExternals = require('webpack-node-externals')
const babelConfig = require('../babel.config.json');

module.exports = {
  entry: resovle(__dirname, '../../src/app.js'),
  output: {
    filename: 'app.js',
    path: resolve(__dirname, '../../dist')
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: babelConfig.presets,
          plugins: babelConfig.plugins
        }
      }
    ]
  },
  resolve: {
    alias: {
      Root: resolve(__dirname, '../../', 'src'),
    }
  },
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: false
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new UglifyJsPlugin({
      cache: true
    })
  ]
};
