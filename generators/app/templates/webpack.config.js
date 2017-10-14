const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: [
      path.resolve(__dirname, 'scripts/styles.<%= scriptExt %>')
    ]
  },
  module: {
    rules: [
      {
        test: /\.<%= ppExt %>$/,
        exclude: /^node_modules$/,
        loaders: ['style-loader', 'css-loader'<%- ppLoader %>]
      },
      {
        test: /\.js$/,
        exclude: /^node_modules$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /^node_modules$/,
        use: ['file-loader']
      },
      {
        test: /(template|\.(woff|woff2|eot|ttf|otf))$/,
        exclude: /^node_modules$/,
        use: ['file-loader']
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'scripts')
  }
};
