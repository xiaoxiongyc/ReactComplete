/**
 * Created by koguma on 2017/5/13.
 */
var webpack = require('webpack');
var path = require('path');
var WebpackDevServer = require("webpack-dev-server");

module.exports = {
    context:  __dirname + "/src",
    entry: "./js/root.js",
    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015','react']
                }
            },
            //下面是使用 ant-design 的配置文件 不再使用 ?modules 因为样式是全局的 不再需要局部样式
            {
                test: /\.css$/,
                //modules  模块化配置
                loader: 'style-loader!css-loader'
            },
        ]
    },
    output: {
        path:   __dirname + '/src/',
        filename: 'bundle.js'
    },
};
