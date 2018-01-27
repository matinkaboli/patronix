/* eslint-disable */

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    client: './src/client/client.js',
    customer: './src/customer/customer.js'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['env', 'react'],
          plugins: ['add-module-exports', 'transform-decorators-legacy']
        }
      }, {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer];
              }
            }
          }
        ]
      }, {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
        use: [
          'url-loader'
        ]
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      cache: true
    })
  ]
};
