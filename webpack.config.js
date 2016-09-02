const webpack = require('webpack')
const path = require('path')
const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  debug: DEBUG,
  devtool: DEBUG ? 'source-map' : '',
  // entry: DEBUG ? [
  //   // 'webpack-dev-server/client?http://localhost:3000/',
  //   // 'webpack/hot/only-dev-server',
  //   './src/libname.js'
  // ] : './src/libname.js',
  output: {
    library: 'libname',
    libraryTarget: 'umd',
    // 资源路径的前缀而已，便于更改cdn
    // publicPath: 'http://localhost:3000/',
    // // 所有 output 输出的绝对位置，js、jpg 等等
    // path: path.join(__dirname, 'dist'),
    // filename: "libname.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: DEBUG ? ['react-hot', 'babel'] : ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)/,
        loader: 'url-loader?limit=268192'
      },
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /\.css$/, loader: "style!css" }
    ]
  },
  // require 可以免掉后缀名
  resolve: {
    extensions: ['', '.js', '.json', '.scss', '.jsx'],
    // alias 设置别名
    alias: {
      'config': path.join(__dirname, 'config.js')
    }
  },
  plugins: DEBUG ? [
    new webpack.HotModuleReplacementPlugin()
  ] : [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
  ]
}
