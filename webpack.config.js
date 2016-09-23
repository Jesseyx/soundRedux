var webpack = require('webpack');
var ignore = new webpack.IgnorePlugin(/\.svg$/);

module.exports = {
  devtool: 'source-map',
  entry: {
    main: [
      './scripts/main.js'
    ],
  },
  output: {
    publicPath: 'http://localhost:8080/',
    filename: '/js/[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass'],
      },
    ]
  },
  plugins: [
    ignore,
  ],
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api/*': 'http://localhost:8081'
    },
  },
}
