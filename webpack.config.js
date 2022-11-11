import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const outputDirPath = path.join(path.resolve(), './dist');

const devServerConfig = (isDev) =>
  isDev
    ? {
        devServer: {
          open: true,
          port: 3030,
          hot: true,
          watchFiles: ['./src/**/*'],
        },
      }
    : {};

export default ({ develop }) => ({
  mode: develop ? 'development' : 'production',
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './styles/main.css',
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: outputDirPath,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  ...devServerConfig(develop),
});
