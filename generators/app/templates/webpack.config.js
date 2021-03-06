'use strict';

const { resolve } = require('path');
const webpack = require("webpack");

// credits:
// https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.bgqss0jav
// https://webpack.js.org/configuration
// https://webpack.js.org/guides/hmr-react/
// https://webpack.js.org/guides/development/

module.exports = {

  entry: [
    '../public/javascripts/global.js',
    './index.js',
  ],

  output: {
    filename: 'main.bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: resolve(__dirname, 'src'),

  devtool: 'inline-source-map',

  devServer: {
    hot: false,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },

  resolve: {
    modules: [
      resolve(__dirname,
      "public/javascripts"), "node_modules"
    ]
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        // this actually bundles your CSS in with your bundled JavaScript,
        // and style-loader manually writes your styles to the <head>.
        // You’ve saved a header request—saving valuable time on some connections—and
        // if you’re loading your DOM with JavaScript anyway, this essentially eliminates FOUC on its own.
        // loaders are processed in reverse array order. That means css-loader will run before style-loader.
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ],
      },
      // Loaders for other file types can go here
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
};
