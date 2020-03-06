const path = require("path")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const Webpack = require("webpack")
module.exports ={
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: "./dist",
        hot: true,
        open: true
    },
    // 模式
    mode: "development",
    // 打包入口
    entry: "./src/main.js",
    // 打包出口
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname,"dist")
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test: /\.(jpg|jpeg|png|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            },
            {
                test: /\.styl(us)?$/,
                use: ["vue-style-loader","css-loader","postcss-loader","stylus-loader"]
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new Webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            'vue':'vue/dist/vue.js'
        }
    }
}