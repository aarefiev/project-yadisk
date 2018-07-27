import path from 'path';
import webpack from 'webpack';

export default () => ({
  entry: {
    app: ['babel-polyfill', './app/index.jsx'],
  },
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'dist', 'assets'),
    filename: 'application.js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});
