const path = require('path');

module.exports = {
  mode: 'development',
  entry: '/src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 's-hotchpotch.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: ['style-loader'](/loaders/style-loader) },
          {
            loader: ['css-loader'](/loaders/css-loader),
            options: {
              modules: true
            }
          },
          { loader: ['sass-loader'](/loaders/sass-loader) }
        ]
      }
    ]
  }
};