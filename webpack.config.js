const path = require("path");

module.exports = {
  entry: "./src/server.ts",
  target: "node",
  externalsPresets: { node: true },
  externals: [require("webpack-node-externals")()],
  resolve: {
    extensions: [".ts"],
  },
  module: {
    rules: [{ test: /\.ts$/, use: ["ts-loader"], exclude: /node_modules/ }],
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist"),
  },
};
