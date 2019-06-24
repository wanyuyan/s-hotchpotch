const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const antTheme = require('./package.json').antTheme;

module.exports = {
  mode: 'production',
  entry: './src/app.jsx',
  output: {
    filename: '[name].[hash:8].bundle.js',
    chunkFilename: '[name].[contenthash:8].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.m?jsx|js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,                                     // Explicitly disable babelrc so we don't catch various config
            presets: [
              [
                "@babel/preset-env",
                {
                  "modules": false,                             // 模块使用 es6 modules,不使用 CommonJS 规范, 因为v2及以上的 webpack 的 treeshaking功能只对es6 modules的静态引用有效, https://blog.csdn.net/VhWfR2u02Q/article/details/81916786
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
          // 如果不做配置，我们的css是直接打包进js里面的，我们希望能单独生成css文件。 因为单独生成css,css可以和js并行下载，提高页面加载效率
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      // file-loader 解决css等文件中引入图片路径的问题，解析图片地址，把图片从源文件拷贝到目标文件并修改源文件名字
      // url-loader 在文件比较小时，直接转变成base64字符串内嵌到页面中
      {
        test: /\.(png|svg|jpg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: "/images",        // 图片输出路径
            limit: 5 * 1024
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "url-loader",
          options: {
            name: '[name]-[hash:5].min.[ext]',
            limit: 5000,        // fonts file size <= 5KB, use 'base64'; else, output svg file
            publicPath: 'fonts/',
            outputPath: 'fonts/'
          }
        }
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'HotChpotch',
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].css"
    }),
    new PurifyCSS({                 // 清除无用 css
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径文件
        path.resolve(__dirname, './src/*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
        path.resolve(__dirname, './src/*.js')
      ])
    })
  ],
  optimization: {
    runtimeChunk: "single",
    usedExports:true,                       // js treeshaking
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    extensions: [".js", ".jsx"],
    // alias: {
    //   pages: path.join(__dirname, "src/pages")
    // }
  }
};