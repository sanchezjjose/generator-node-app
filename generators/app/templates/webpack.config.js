'use strict';

const webpack = require("webpack");
const path = require('path');

// credit: https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.bgqss0jav

module.exports = {
  context: __dirname + "/",
  entry: {
    app: "./public/javascripts/global.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js",
    publicPath: "/assets",
  },
  devServer: {
    contentBase: __dirname + "/",
  },
  resolve: {
    modules: [path.resolve(__dirname, "public/javascripts"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: "babel-loader",
          options: { presets: ["es2015"] }
        }],
      },
      {
        test: /\.less$/,
        // this actually bundles your CSS in with your bundled JavaScript,
        // and style-loader manually writes your styles to the <head>.
        // You’ve saved a header request—saving valuable time on some connections—and
        // if you’re loading your DOM with JavaScript anyway, this essentially eliminates FOUC on its own.
        // loaders are processed in reverse array order. That means css-loader will run before style-loader.
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // Loaders for other file types can go here
    ],
  },
};
