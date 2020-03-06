const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports={
    optimization: {// 优化项
        minimizer: [new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        }), new OptimizeCSSAssetsPlugin({})],
      },
    devServer:{// 开发服务器配置
        port: 3000,
        progress: true,
        contentBase: './dist',
        compress: true
    },
    mode: 'production',// 配置生产环境 production 、开发环境 development
    // 配置入口文件
    entry: './src/index.js',
    // 配置出口
    output: {
        filename: 'bundle.js',//出口文件
        path: path.resolve(__dirname,'dist')// 路径必须是一个绝对路径
    },
    plugins:[// 数组放着所有webpack插件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            favicon: path.resolve('favicon.ico'), // 在此处设置
            minify: {
                removeAttributeQuotes: true,// 删除双引号
                collapseBooleanAttributes: true //设置打包后成一行
            },
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    module:{// 模块
        rules: [// 规则 css-loader 集成@import这种语法  stype-loader 是把css插入到head标签中
            {
                test:/\.css$/,use:[
                    // {
                    //     loader:'style-loader',
                    //     options: {
                    //         insertAt: 'top'
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                          plugins: [
                            require("autoprefixer") /*在这里添加*/
                          ]
                        }
                     }]
            }
        ]

    }

}