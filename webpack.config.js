const path = require("path");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "webpack", "main"),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "assets/javascript"),
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "bower_components"),
        ],
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react"
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: [".json", ".js", ".jsx"],
  },
};
