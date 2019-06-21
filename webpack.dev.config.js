const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const antTheme = require('./package.json').antTheme;

module.exports = {
  mode: 'development',
  entry: './src/app.jsx',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',    // csdn url, prod
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,                                     // Explicitly disable babelrc so we don't catch various config
            presets: [
              [
                "@babel/preset-env",
                {
                  "modules": false,                             // 模块使用 es6 modules ，不使用 commonJS 规范, 因为v2及以上的webpack的 treeshaking功能只对es6 modules 有效
                  "useBuiltIns": 'usage',                       // 默认 false, 可选 entry , usage
                }
              ],
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-proposal-export-default-from",
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-syntax-dynamic-import",
              [
                "@babel/plugin-transform-runtime",              // disables automatic per-file runtime injection in Babel, insdead making all helper references use it
                {
                  "regenerator": false,                         // 通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime
                  "useESModules": true,                         // 使用 es modules helpers, 减少 commonJS 语法代码
                }
              ],
              ["import", {libraryName: "antd-mobile", style: true}],  // `style: true` 会加载 less 文件
              
            ],
            cacheDirectory: true                                 // Default false. When set, the given directory will be used to cache the results of the loader. Future webpack builds will attempt to read from the cache to avoid needing to run the potentially expensive Babel recompilation process on each run.
          }
        }
      },
      {
        test: /\.css$/,
        use:[
          {loader:'style-loader'},
          {loader:'css-loader'}
        ]
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
            'style-loader',
            'css-loader',
            {loader: 'less-loader', options: {modifyVars: antTheme}},
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',               // creates style nodes from JS strings
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',                 // translates CSS into CommonJS
            options: {
              modules: true,
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',                // compiles Sass to CSS, using Node Sass by default
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'file-loader'
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'HotChpotch',
      template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};