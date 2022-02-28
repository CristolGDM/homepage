const path = require('path');
const sharp = require('sharp');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const baseSetup = {
  entry: './src/index.js',
  watchOptions: {
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
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
    new CopyPlugin({
      patterns: [
        { 
          from: "articles",
          to: ({ context, absoluteFilename }) => {
            const noPng = absoluteFilename.replace(context, "").replace(".png", ".jpg");
            return `articles/${noPng}`
          },
          transform: async function(content, filepath) {
            if(!(filepath.endsWith('.jpg') || filepath.endsWith('.jpeg') || filepath.endsWith('.png'))) {
              return content;
            }
            const buffer = await sharp(filepath)
              .jpeg({quality: 80, progressive: true})
              .toBuffer();
            return buffer;
          }
        },
      ],
    })
  ]
}

module.exports = [{
  ...baseSetup,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist-cgdm'),
    clean: true,
  },
  plugins: [
    ...baseSetup.plugins,
    new HtmlWebpackPlugin({
      title: 'CristolGdm',
      template: 'src/index-cgdm.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: "pages/cristolgdm", to: "pages" },
        { from: "config-cgdm.json", to: "config.json" },
      ]
    })
  ]
}, {
  ...baseSetup,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist-pixel'),
    clean: true,
  },
  plugins: [
    ...baseSetup.plugins,
    new HtmlWebpackPlugin({
      title: 'PixelBreath',
      template: 'src/index-pixel.html',
      cache: false
    }),
    new CopyPlugin({
      patterns: [
        { from: "pages/pixelbreath", to: "pages" },
        { from: "config-pixel.json", to: "config.json" }
      ]
    })
  ]
}];