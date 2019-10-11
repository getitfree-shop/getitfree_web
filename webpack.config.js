const path = require("path")
const fs = require('fs-extra')
const webpack = require("webpack")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mode = process.env.mode
const isProduction = mode === 'production'
const resolve = pathname => path.resolve(__dirname, pathname)

if (isProduction) {
    fs.copySync(resolve('static'), resolve('dist'))
}

module.exports = {
    mode,
    devtool: !isProduction && 'source-map',
    entry: {
        index: resolve("src/index.tsx")
    },
    resolve: {
        alias: {
            "@": resolve('src')
        },
        extensions: ['.js', '.ts', '.tsx']
    },
    output: {
        path: resolve("dist")
    },
    module: {
        rules: [
            {
                test: /\.js|ts|tsx$/,
                loader: require.resolve("babel-loader")
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.jpg|png|gif$/,
                loader: require.resolve("url-loader"),
                options: {
                    limit: 10000,
                    name: "static/media/[name].[hash:8].[ext]"
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        new HtmlWebpackPlugin({
            template: resolve('index.html'),
            filename: 'index.html',
            chunks: ['index'],
            name: 'index',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            } 
        }),
        new webpack.DefinePlugin({
            isProduction: JSON.stringify(isProduction)
        })
    ]
}
