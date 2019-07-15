const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');
const ManifestPlugin = require('webpack-manifest-plugin');
const antTheme = require('./package.json').antTheme;

const publicPath = "/";

module.exports = {
  mode: 'production',
  entry: ["./src/app.jsx", "./public/imgs/icons"],
  output: {
    filename: 'static/js/[name].[hash:8].bundle.js',
    chunkFilename: 'static/js/[name].[contenthash:8].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: publicPath,
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
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
        exclude: /node_modules/,
        use: [
          // 如果不做配置，我们的css是直接打包进js里面的，我们希望能单独生成css文件。 因为单独生成css,css可以和js并行下载，提高页面加载效率
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')()
              ]
            }
          },
          "sass-loader"
        ]
      },
      // file-loader 解决css等文件中引入图片路径的问题，解析图片地址，把图片从源文件拷贝到目标文件并修改源文件名字
      // url-loader 在文件比较小时，直接转变成base64字符串内嵌到页面中
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        exclude: path.resolve(__dirname, "public/imgs/icons"),
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path]/[name].[hash:7].[ext]',
              limit: 6000
            }
          },
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
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
      title: 'HotChpotch',
      hash: true,
      minify: {
        removeAttributeQuotes: true  // 压缩，去掉引号
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      filename: "/static/css/[name].[contenthash:8].css",
      chunkFilename: "/static/css/[name].[contenthash:8].css"
    }),
    new PurifyCSS({                 // 清除无用 css
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径文件
        path.resolve(__dirname, './src/*.html'), // 请注意，我们同样需要对 html 文件进行 tree shaking
        path.resolve(__dirname, './src/*.js')
      ])
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: publicPath,
      generate: (seed, files) => {
        const manifestFiles = files.reduce(function(manifest, file) {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);

        return {
          files: manifestFiles,
        };
      },
    }),
  ],
  optimization: {
    runtimeChunk: "single",
    usedExports:true,                       // js treeshaking
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css"],
    alias: {
      Components: path.resolve(__dirname, 'src/Components/'),
      Imgs: path.resolve(__dirname, "public/imgs"),
    }
  }
};