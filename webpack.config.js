const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [{
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist-cgdm'),
    clean: true,
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
      template: 'src/index-cgdm.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: "articles", to: "articles" },
        { from: "pages/cristolgdm", to: "pages" },
        {from: "config-cgdm.json", to: "config.json"}
      ],
    }),
  ]
}, {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist-pixel'),
    clean: true,
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
      title: 'PixelBreath',
      template: 'src/index-pixel.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: "articles", to: "articles" },
        { from: "pages/pixelbreath", to: "pages" },
        {from: "config-pixel.json", to: "config.json"}
      ],
    }),
  ]
}];