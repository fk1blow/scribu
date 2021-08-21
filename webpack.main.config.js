// eslint-disable-next-line
const path = require("path")

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./packages/main/src/index.ts",

  // Put your normal webpack config below here
  module: {
    rules: require("./webpack.rules"),
  },
  externals: ["electron"],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    alias: {
      "@main": path.resolve(__dirname, "./packages/main/src"),
    },
  },
}
