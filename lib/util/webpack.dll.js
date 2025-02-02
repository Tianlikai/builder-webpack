const path = require("path");
const webpack = require("webpack");

/**
 * 每个dll包保持在244k以下
 */
module.exports = {
  mode: "production",
  entry: {
    stable: ["react", "react-dom"],
  },
  output: {
    path: path.resolve(__dirname, "../dll"),
    filename: "[name].[chunkhash:8].dll.js",
    library: "[name]_[chunkhash:8]_dll",
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]_[chunkhash:8]_dll",
      path: path.resolve(__dirname, "../dll", "[name].manifest.json"),
    }),
  ],
};
