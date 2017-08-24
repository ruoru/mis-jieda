# mis-jieda
luoyang jieda paper co., ltd management information service website.

## 从零配置一个React项目

创建一个 [React](https://ninghao.net/package/react) 项目的最小配置过程。React 官方为你提供了创建 React 项目的工具（[create-react-app](https://ninghao.net/blog/4506)），用它可以很简单创建 React 项目，基本不需要做任何的配置，直接就可以进入到开发过程。但这个过程太过神奇，我认为还是要理解一下，创建一个 React 项目，至少要做的一些配置。

### 创建项目

先为项目创建一个目录，并且进入该目录下面：

```
mkdir [项目文件夹名称]
cd [项目文件夹名称]
```

为项目创建一个 package.json 文件：

```
npm init -y
```

### 安装项目依赖

先安装 react 与 react-dom：

```
npm install react react-dom redux react-redux --save
```

### 安装项目开发依赖

安装打包工具 [webpack](https://ninghao.net/course/3443) 。[babel](https://ninghao.net/course/3432) 它可以转换我们写的 JavaScript，这样即使浏览器不支持，我们现在也可以使用 JavaScript 的一些新特性，因为 Babel 会为我们转换 JavaScript 代码，让浏览器能懂。

```
npm install babel-core babel-loader babel-preset-env babel-preset-latest babel-preset-react html-webpack-plugin webpack webpack-dev-server webpack-merge --save-dev
```

### 创建项目结构

创建一个 src（source）源目录，应用的代码都放在这个目录下面，在这个目录下创建一个 index.js 文件，它是一个入口文件。

```
mkdir src
touch src/app.jsx
```

为应用的公开资源创建一个目录，用户真正访问的就是这个目录下面的东西。

```
mkdir public
touch public/index.html
```

### 配置文件

为 webpack 创建一个配置文件，放在应用的根目录下面：

```
touch webpack.config.js
```

配置如下：

```
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/[name].bundle.[hash:6].js',
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
                    presets: ['latest'],
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
        new htmlWebpackPlugin({
            template: 'public/index.html',
            filename: 'index.html',
            inject: 'body',
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,    //启用所有服务的gzip压缩
        host: '0.0.0.0',
        port: 8001,
        
        //lazy: true,    //当lazy启用时，当它被请求的DEV-服务器将只编译软件包。这意味着webpack不会看到任何文件更改。我们称这个懒惰模式。
        //filename: "[name].bundle.js",    ///[name].bundle.js请求时才编译 。filename在没有延迟模式的情况下使用时不起作用。
    },
};
```

entry 就是入口，这里指定的是 src 下面的 app.jsx。 output 里面是打包输出的东西，生成一个 [name].bundle.[hash:6].js，放在 public/js 目录的下面。module 指定了要用的模块，这里用了 loaders ，在它里面测试文件是不是 js 文件，如果是就用一下 babel-loader 去转换 JavaScript 的代码。

在 scripts 区域里，start dev 都是自定义的命名。


### 应用的代码

打开 src/app.jsx，代码如下：

```
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  React.createElement('p', null, 'hello ~'),
  document.getElementById('root')
)

```

打开 public/index.html，代码如下：

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>React</title>
</head>
<body>
  <div id="root"></div>
  <script src="https://ninghao.net/bundle.js" charset="utf-8"></script>
</body>
</html>
```

### 执行打包应用的命令

在项目的根目录下，执行：

```
npm start
```

这样会把应用打个包，生成一个 bundle.js 文件，放在 public 目录的下面。

### 创建一个本地服务器

创建一个本地服务器，运行我们的 React 应用，方法非常多。我用 [browser-sync](https://ninghao.net/course/2672) 创建一个简单的本地服务器。
安装 browser-sync：

```
npm install browser-sync -g
```

创建一个本地服务器：

```
cd public
browser-sync start --server
```

会返回提示，告诉你服务器的地址，在浏览器上打开这个地址，你会在页面上看到一个用 p 标签包装的  “ hello ~ ” 。

## 项目结构
```
├── src                      # 程序源文件
│   ├── main.js              # 程序启动和渲染
│   ├── components           # 全局可复用的表现组件(Presentational Components)
│   ├── containers           # 全局可复用的容器组件
│   ├── layouts              # 主页结构
│   ├── store                # Redux指定块
│   │   ├── createStore.js   # 创建和使用redux store
│   │   └── reducers.js      # Reducer注册和注入
│   └── routes               # 主路由和异步分割点
│       ├── index.js         # 用store启动主程序路由
│       ├── Root.js          # 为上下文providers包住组件
│       └── Home             # 不规则路由
│           ├── index.js     # 路由定义和代码异步分割
│           ├── assets       # 组件引入的静态资源
│           ├── components   # 直观React组件
│           ├── container    # 连接actions和store
│           ├── modules      # reducers/constants/actions的集合
│           └── routes **    # 不规则子路由(** 可选择的)
```

react-starter-kit
```
.
├── bin                      # 启动脚本
├── blueprints               # redux-cli的蓝图
├── build                    # 所有打包配置项
│   └── webpack              # webpack的指定环境配置文件
├── config                   # 项目配置文件
├── server                   # Express 程序 (使用 webpack 中间件)
│   └── main.js              # 服务端程序入口文件
├── src                      # 程序源文件
│   ├── main.js              # 程序启动和渲染
│   ├── components           # 全局可复用的表现组件(Presentational Components)
│   ├── containers           # 全局可复用的容器组件
│   ├── layouts              # 主页结构
│   ├── static               # 静态文件(不要到处imported源文件)
│   ├── styles               # 程序样式
│   ├── store                # Redux指定块
│   │   ├── createStore.js   # 创建和使用redux store
│   │   └── reducers.js      # Reducer注册和注入
│   └── routes               # 主路由和异步分割点
│       ├── index.js         # 用store启动主程序路由
│       ├── Root.js          # 为上下文providers包住组件
│       └── Home             # 不规则路由
│           ├── index.js     # 路由定义和代码异步分割
│           ├── assets       # 组件引入的静态资源
│           ├── components   # 直观React组件
│           ├── container    # 连接actions和store
│           ├── modules      # reducers/constants/actions的集合
│           └── routes **    # 不规则子路由(** 可选择的)
└── tests                    # 单元测试
```