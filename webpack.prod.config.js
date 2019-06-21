const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [{
        test: /\.scss$/,
        use: [
            
            MiniCssExtractPlugin.loader,                 // fallback to style-loader in development
            "css-loader",
            "sass-loader"
        ]
    }]
  },
  plugins: [
      new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: "[name].css",
          chunkFilename: "[id].css"
      })
  ]
}