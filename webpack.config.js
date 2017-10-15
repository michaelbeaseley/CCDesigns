const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
  },
  entry: path.join(__dirname, 'app'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["es2015"],
            },
          },
        ],
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.png$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg/,
        use: ['svg-url-loader'],
      },
      {
        test: /\.(ttf|eot)$/,
        use: 'file-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ['raw-loader'],
        exclude: [/layout.html$/],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'app/index.html',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
  },
};