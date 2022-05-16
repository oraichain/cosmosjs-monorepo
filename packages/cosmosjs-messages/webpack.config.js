const path = require('path');

const commonConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { compact: false }
      }
    ]
  },
  // maximum 20 MB
  performance: {
    hints: false,
    maxEntrypointSize: 40480000,
    maxAssetSize: 40480000
  }
}

const nodeConfig = {
  mode: 'production',
  entry: './src/index.js',
  target: 'node',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    globalObject: 'this',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.json'],
    // fallback: { "fs": false },
  },
  ...commonConfig
};

const webConfig = {
  mode: 'production',
  entry: './src/index.js',
  target: 'web',
  output: {
    path: path.resolve('dist'),
    filename: 'index.web.js',
    globalObject: 'this',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.json'],
    //fallback: { "buffer": false }
  },
  // Oraichain cosmosjs requires fs lib, workaround to build for web
  externals: {
    'fs': 'commonjs2 fs'
  },
  ...commonConfig
};

module.exports = [nodeConfig, webConfig];
