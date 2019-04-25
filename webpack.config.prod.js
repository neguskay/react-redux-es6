const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

//Add plugin to minify our css
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
//Add plugin to analyze my bundle and give a handy report
const webpackBundleAnalyzer = require("webpack-bundle-analyzer")

//Set the Environment
//Prod mode will eliminate certain features like proptypes and also minify certain files for budle size to be smaller
process.env.NODE_ENV = "production"

//Production build settings
module.exports = {
  mode: "production",
  target: "web",
  devtool: "source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js"
  },
  plugins: [
    // Display bundle stats
    //Atomatically display a report of what's in out bundle for when the build is completed
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({ analyzerMode: "static" }),

    //Minify our css and extract to a separate file
    //Add 'hash' in the naming to change file name only when the file content changes
    //Support far-expires headers on webserver, allow fo users to only have to reload when the content changes
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),

    new webpack.DefinePlugin({
      // This global makes sure React is built in prod mode.
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    }),

    //Generates our index.html
    //Adds references to the js bundle and css bundle into the index.html for us
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",

      //Minify to keep html file as small as possible
      minify: {
        // see https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /(\.css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          //the mini css extract plugin will extract css to a separate file using the css-loader
          //Will also generate a source map for debugging purposes
          //Will also use post-css and nano plugin within that to minify our css bundle
          //Loaders run from bottom up
          //i.e. post css first athen css loader will take over
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("cssnano")],
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}
