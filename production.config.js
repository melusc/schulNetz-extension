const path = require( 'path' );
// const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = {
  mode: 'production',
  entry: './src/script/popup.jsx',
  output: {
    path: path.resolve(
      __dirname,
      'dist/script'
    ),
    filename: 'popup.js',
  },
  //  plugins: [ new CleanWebpackPlugin() ],
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(
      __dirname,
      '.cache'
    ),
    buildDependencies: { config: [ __filename ] },
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin( {
        terserOptions: {
          compress: false,
          mangle: false,
        },
      } ),
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-runtime',
                [
                  '@babel/plugin-transform-react-jsx',
                  {
                    pragma: 'h',
                    pragmaFrag: 'Fragment',
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
};
