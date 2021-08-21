const rules = require('./webpack.rules')
const plugins = require('./webpack.plugins')
// not working with webpack 5
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

// eslint-disable-next-line
const path = require('path')

rules.push(
  {
    test: /\.s[ac]ss$/i,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'sass-loader' },
    ],
  },

  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  },
)

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx'],

    // not working with webpack 5
    // plugins: [
    //   new TsconfigPathsPlugin({
    //     configFile: path.resolve(__dirname, 'packages/renderer/tsconfig.json'),
    //     logLevel: 'info',
    //     mainFields: ['browser', 'main'],
    //   }),
    // ],

    alias: {
      '@renderer': path.resolve(
        __dirname,
        './packages/renderer/src',
      ),
    },
  },
}
