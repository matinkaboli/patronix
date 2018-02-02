/* eslint-disable */

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  output: {
    filename: 'client.js'
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
          plugins: ['add-module-exports', 'transform-decorators-legacy', 'transform-class-properties']
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
  resolve: {
    alias: {
      Shared: resolve(__dirname, '../../', 'src/client/shared'),
      Root: resolve(__dirname, '../../', 'src/client')
    }
  },
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
