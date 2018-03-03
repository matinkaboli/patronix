/* eslint-disable */

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const { resolve } = require('path');
const babelConfig = require('../babel.config.json');

module.exports = {
  entry: resolve(__dirname, '../../src/client/client.js'),
  output: {
    filename: 'client.js',
    path: resolve(__dirname, '../../dist/statics')
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
      }, {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer];
              }
            }
          },
          'less-loader'
        ]
      }, {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
        use: [
          'url-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      Root: resolve(__dirname, '../../', 'src/client'),
    }
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
