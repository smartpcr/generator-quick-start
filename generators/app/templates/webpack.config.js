var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin("main.css");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "build/"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: extractCSS.extract({
                    use: ["css-loader", "sass-loader"]
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: "url-loader",
                options: { limit: 25000 }
            },
            {
                test: /\.tsx?$/,
                include: /src/,
                loader: "ts-loader",
                options: { silent: true, transpileOnly: true }
            },
            
            // These packages contain their own source map links which
            // should be removed before they are put into our bundle
            {
                test: /\.js$/,
                include: /office-ui-fabric-react/,
                loader: "source-map-loader",
                enforce: "pre"
            },
            {
                test: /\.js$/,
                include: /load-themed-styles/,
                loader: "source-map-loader",
                enforce: "pre"
            },
            {
                test: /\.js$/,
                include: /glamor/,
                loader: "source-map-loader",
                enforce: "pre"
            }
        ]
    },
    plugins: [
        extractCSS
    ],
    resolve: {
        modules: [path.resolve("./src"), "node_modules"],
        extensions: [".js", ".ts", ".tsx", ".jsx"]
    }
};
