/* eslint-disable */

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { resolve } = require('path');
var nodeExternals = require('webpack-node-externals')
const babelConfig = require('../babel.config.json');

module.exports = {
  entry: resolve(__dirname, '../../src/app.js'),
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
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
};
