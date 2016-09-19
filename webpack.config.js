var webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: {
        main: [
            './scripts/main.js'
        ]
    },
    output: {
        publicPath: 'http://localhost:8080/',
        filename: '/js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'autoprefixer', 'sass']
            }
        ]
    },
    plugins: [
        new webpack.IgnorePlugin(/\.svg$/)
    ],
    devServer: {
        host: '0.0.0.0',
        proxy: {
            '/api/*': 'http://localhost:8081'
        }
    }
}
