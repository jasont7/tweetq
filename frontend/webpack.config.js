const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    historyApiFallback: true
  },
  entry: './src/index.js',
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, 'public')
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                {
                  'plugins': ['@babel/plugin-proposal-class-properties']
                }
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  // plugins: [
  //   new CopyWebpackPlugin({
  //     patterns: [
  //       { from: 'src/manifest.json', to: '[name].[ext]' },
  //       { from: 'src/*.png', to: '[name].[ext]' }
  //     ]
  //   }),
  //   new CleanWebpackPlugin()
  // ]
}