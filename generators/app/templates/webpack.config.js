'use strict';

const webpack = require("webpack");
const path = require('path');

// credits:
// https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.bgqss0jav
// https://webpack.js.org/configuration
// https://webpack.js.org/guides/hmr-react/

module.exports = {
  context: __dirname + "/",
  entry: {
    global: [
        "./public/javascripts/global.js",
    ],
    indexComponent: [
        "./src/index.jsx",
    ],
    mainComponent: [
        "./src/components/main.jsx",
    ]
  },
  // entry: [
  //   "./public/javascripts/global.js",
  //   "./src/index.jsx",
  //   "./src/components/main.jsx",
  // ],
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js",
    publicPath: "/assets/",
  },
  devServer: {
    contentBase: __dirname + "/",
  },
  resolve: {
    modules: [
      path.resolve(__dirname,
      "public/javascripts"), "node_modules"
    ]
  },
  plugins: [
    // below plugin prevent warnings with React in development. Remove when debugging.
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     // 'NODE_ENV': JSON.stringify('production')
    //   }
    // })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: { presets: ["es2015", "react"] }
        }],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
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
  devtool: "cheap-eval-source-map",
};
