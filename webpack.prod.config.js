var webpack = require('webpack');
var ignore = new webpack.IgnorePlugin(/\.svg$/);
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: false,
  entry: {
    vendor: [
      'classnames',
      'isomorphic-fetch',
      'js-cookie',
      'lodash',
      'moment',
      'normalizr',
      'react',
      'react-dom',
      "react-motion",
      "react-redux",
      'redux',
      'redux-thunk',
      'soundcloud',
    ],
    main: './scripts/main.js',
  },
  output: {
    publicPath: 'http://localhost:8080/',
    filename: './server/public/js/[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['style'], ['css', 'postcss', 'sass']),
      },
    ]
  },
  plugins: [
    ignore,
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new ExtractTextPlugin('./server/public/css/main.css'),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
  ],
}
