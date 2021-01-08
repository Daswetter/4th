const path = require('path')
const HTMLWebpackPlugin=require('html-webpack-plugin')
const CopyWebpackPlugin =require('copy-webpack-plugin')
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const webpack = require('webpack');
// const { SourceMapDevToolPlugin } = require("webpack");

const isDev=process.env.NODE_ENV=='development'
const isProd=!isDev

module.exports = {
  context: path.resolve(__dirname,'src'),
  entry: './index.ts',
  output: {
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  resolve:{
    extensions:['.ts', '.js','.json','.png','.svg']
  },
  devServer:{
    port:4000,
    hot:isDev,
    open: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      template:'./preview/preview.pug',
      minify:{
        collapseWhitespace: isProd
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery':'jquery'
    }),
  ],
  module: {
    rules: [
      {
        test:  /\.ts/,
        use: 'ts-loader'
      },
      {
        test:/\.css$/,
        use:[{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr:true,
            reloadAll:true
          
          }
        },
        'css-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test:/\.sass|scss$/,
        use:[{
          loader: MiniCssExtractPlugin.loader,
        },
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ]
  }
}