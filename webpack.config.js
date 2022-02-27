const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization:{
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader', 
          'css-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CristolGdm',
      template: 'src/index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: "articles", to: "articles" },
        { from: "pages", to: "pages" },
      ],
    }),
  ]
};