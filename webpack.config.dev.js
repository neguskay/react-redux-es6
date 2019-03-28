//Some necessary imports
const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

//Node environment declaration
process.env.NODE_ENV = "development"

//Config as a js object
module.exports = {
  mode: "development", //run in dev mode, disable some prod-only featured
  target: "web", //can change to node to configure intead but we will be in browswer
  devtool: "cheap-module-source-map", //allow us see original code in browswer when debugging

  //Entry file
  entry: "./src/index",

  //dettermine the build paths
  output: {
    path: path.resolve(__dirname, "build"),
    // public url for output memory when refed from memory
    publicPath: "/",

    //html will reference this bundle being served from memory
    filename: "bundle.js"
  },

  //Configure the dev server
  devServer: {
    //reduce inofrmation to cli
    stats: "minimal",

    //overlay errors occuring in the browser
    overlay: true,

    //all request to be sent to index.html
    //allow for us to use one borwer router
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false
  },

  //Some plugings
  plugins: [
    //Define ENV variables
    //Wherever "process.env.API_URL" exists will be replaced with the URL in the stringify method
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    }),

    //Accepts an object
    //template and favicon set
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico"
    })
  ],

  //Declare the module
  //tell webpack what files it should handle via rules
  module: {
    rules: [
      {
        //Look for js pr jsx files
        //exclude: node modules
        //use: run files with the l=specified loaders
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"] //
      },
      {
        //Style rule
        //Allow us to import css
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      }
      // ],
      // rules: [
      //   {
      //     test: /\.(js|jsx)$/,
      //     exclude: /node_modules/,
      //     use: ["babel-loader", "eslint-loader"]
      //   },
      //   {
      //     test: /(\.css)$/,
      //     use: ["style-loader", "css-loader"]
      //   }
    ]
  }
}
