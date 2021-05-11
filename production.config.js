const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    popup: './src/script/popup.tsx'
  },
  output: {
    clean: true,
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/script')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css']
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: '..'
        }
      ]
    })
  ],
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.cache'),
    buildDependencies: {config: [__filename]}
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: false,
          mangle: false
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader']
      }
    ]
  }
};
