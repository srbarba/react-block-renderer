const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const APP_PATH = path.resolve(__dirname, 'src');

module.exports = {
  entry: APP_PATH,

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [{ test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/ }],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ]
};