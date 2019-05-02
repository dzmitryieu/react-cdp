const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../../pages/index.html'),
  filename: './index.html',
});

const cssLoader = process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {
  target: 'web',
  entry: [
    path.resolve(__dirname, '../../pages/index.jsx'),
  ],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../../build'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [path.resolve(__dirname, '../../node_modules/')],
        use: {
          loader: 'babel-loader',
        },
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          cssLoader,
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['ie >= 8', 'last 4 version'],
                }),
              ],
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                // I have partials in this folder (colors, sizes, etc.)
                path.resolve(__dirname, '../../src'),
                path.resolve(__dirname, '../../pages'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../',
              context: 'src/',
              emitFile: true,
              name: 'assets/images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '../',
              context: 'src/',
              name: 'assets/fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    htmlPlugin,
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
  ],
};
