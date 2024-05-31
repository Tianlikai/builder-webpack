const commonConfig = require("./webpack.common");
const path = require("path");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(commonConfig, {
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: path.join(process.cwd(), "./src"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            /** 提取css文件 */
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
      chunkFilename: "[id].[chunkhash:8].css",
    }),
  ],
  mode: "production",
  output: {
    filename: "[name].[chunkhash:8].js",
    chunkFilename: "[name].[chunkhash:8].chunk.js",
    publicPath: "",
    /** 自动清理dist目录 */
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      /** css压缩 */
      new CssMinimizerPlugin(),
      /** js压缩 */
      new TerserPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          /** react、react-dom 提取到 vendors */
          test: /[\\/]node_modules[\\/](react|react-dom)/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
});
