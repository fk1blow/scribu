const rules = require("./webpack.rules")
const plugins = require("./webpack.plugins")

// eslint-disable-next-line
const path = require("path")

rules.push(
  {
    test: /\.s[ac]ss$/i,
    use: [
      { loader: "style-loader" },
      { loader: "css-loader" },
      { loader: "sass-loader" },
    ],
  },

  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: "asset/resource",
  }

  // {
  //   test: /\.(woff|woff2|eot|ttf|otf)$/i,
  //   use: {
  //     loader: "url-loader",
  //   },
  // }
)

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    alias: {
      "@renderer/lib": path.resolve(__dirname, "./packages/renderer/src/lib"),
      "@renderer/features": path.resolve(__dirname, "./packages/renderer/src/features"),
    },
  },
}
