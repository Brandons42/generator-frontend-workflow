const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: <%
      const array = entry.split(',');
      if (array.length == 1) {
        %>path.resolve(__dirname, <%- '\'' + array + '\'' %>)<%
      }
      else {
        %>[
        path.resolve(__dirname, <%- '\'' + array[0] + '\'' %>)<%
        for (let q = 1; q < array.length; q++) { %>,
        path.resolve(__dirname, <%- '\'' + array[q] + '\'' %>)<%
      }%>
    ]<% } %>
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
