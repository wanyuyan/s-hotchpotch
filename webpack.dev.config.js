const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const antTheme = require('./package.json').antTheme;

module.exports = {
  mode: 'development',
  entry: ["./src/app.jsx", "./public/imgs/icons"],
  output: {
    filename: '[name].[hash:8].file.js',
    chunkFilename: '[name].[contenthash:8].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/',
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: './dist',
    host: "localhost",    // 192.168.0.202
    port: 9090,
    hot: true,
    historyApiFallback:true,
    overlay: true,  // 代码出错弹出浮层
    // proxy: {
    //   // 代理到后端的服务地址，会拦截所有以api开头的请求地址
    //   "/api": "http://localhost:3000"
    // }
  },
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
                  "modules": false,                             // development模式下的tree shaking 不生效，方便调试
                  "useBuiltIns": 'usage',                       // 按需引入polyfill, 默认 false, 可选 entry , usage,
                }
              ],
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-proposal-export-default-from",
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-syntax-dynamic-import",
              ["@babel/plugin-syntax-decorators", {"decoratorsBeforeExport": true}],
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
        include: [/node_modules/, /public/],
        use:[
          {loader:'style-loader'},
          {loader:'css-loader'},
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: [
                require('autoprefixer')()
              ]
            }
          },
        ]
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        exclude: path.resolve(__dirname, "src"),
        use: [
          'style-loader',
          'css-loader',
          {loader: 'less-loader', options: {
            modifyVars: antTheme,
            javascriptEnabled: true
          }},
        ]
      },
      {
        test: /\.scss$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',               // creates style nodes from JS strings, 把css文件变成style标签插入head中
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',                 // translates CSS into CommonJS, 用来处理css中url的路径
            options: {
              // modules: true,
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: [
                require('autoprefixer')()
              ]
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
      // file-loader 解决css等文件中引入图片路径的问题，解析图片地址，把图片从源文件拷贝到目标文件并修改源文件名字
      // url-loader 在文件比较小时，直接转变成base64字符串内嵌到页面中
      // 当转换成base64字符串时，jsx 中不能直接通过<img src=...> 或 style={{background: url(...)}} 的形式引到图片，可以先import，所以图片加载优先写在css文件中
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: path.resolve(__dirname, "public/imgs/icons"),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 6000
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: path.resolve(__dirname, "public/imgs/icons")
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
      },
      {
        test: require.resolve("./public/external.js"),
        use: "imports-loader?this=>window"
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      title: 'HotChpotch',
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    namedModules: true,
    runtimeChunk: {
      name: "runtime"
    },
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
    extensions: [".js", ".jsx", ".scss", ".css"],
    alias: {
      Components: path.resolve(__dirname, 'src/Components/'),
      Imgs: path.resolve(__dirname, "public/imgs/")
    }
  }
};