const path = require('path');

module.exports = {
    entry: {
        app: './src/index.jsx',
    },
    output: {
        path: path.join(__dirname, 'dist'),    //resolve
        filename: 'js/[name]-[hash:6].js',
    },
    module: {
        loaders: [
            //处理js文件
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: [/node_modules/],  //不通过该babel处理，提高打包速度。
                include: [/src/],           //指定打包范围
                query: {
                    presets: ['env', 'react'],    //指定最后一个版本
                },
            },
            //处理css文件
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader. 在css-loader之后，指定几个loader处理import的css
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                //require('autoprefixer')
                            ]
                        }
                    },
                ]
            },
            {
                test: /\.(jpg|png|jpeg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 100000,    //设定最小值，小于最小值可图片被打包成dataURL base64编码
                            name: 'image/[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    },
                ],
            },
        ],
    },
    plugins: [
    ],
    devServer: {
        open: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,    //启用所有服务的gzip压缩
        host: 'localhost',
        port: 8001,

        //lazy: true,    //当lazy启用时，当它被请求的DEV-服务器将只编译软件包。这意味着webpack不会看到任何文件更改。我们称这个懒惰模式。
        //filename: '[name].bundle.js',    ///[name].bundle.js请求时才编译 。filename在没有延迟模式的情况下使用时不起作用。
    },
};