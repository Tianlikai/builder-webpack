const path = require("path");
const environment = require("./util/env");
const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(commonConfig, {
  module: {
    rules: [
      /**
       * 解析样式
       */
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              /**
               * 支持css module
               */
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  mode: "development",
  devtool: "inline-cheap-module-source-map",
  output: {
    path: path.resolve(process.cwd(), "./dist"),
  },
  devServer: {
    static: path.resolve(process.cwd(), "./dist"),
    port: environment.PORT,
    hot: true,
  },
});
