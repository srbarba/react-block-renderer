const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  devtool: 'source-map',

  module: {
    rules: [{ test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/ }],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ]
};