# 将 markdown 转换为 HTML

## 灵感来源

在看 webpack 相关的知识的时候发现有一个特别有意思的[markdown-loader](https://github.com/peerigon/markdown-loader)，
于是就萌生了用 webpack 来做一个将 Markdown 转为 HTML 项目的想法。

## 安装

```git
// 克隆项目到本地
git clone https://github.com/lijianru/convert-md-to-html.git
// 安装所需的依赖
yarn
```

## 使用方式

将需要转换的文件或者文件夹放在 `src` 目录下即可。

## 本地运行

```
// 读取src下的所有Markdown文件，并生成对这些Markdown的引用的index.js文件
yarn create
// 等到脚本运行结束并无报错的时候在执行以下命令
yarn start
// 或者
yarn server
```

注：在启动后，添加/删除/修改 `src` 下的 `Markdown` 的时候，只用运行无须运行 `yan create`。

## build

```
// 读取src下的所有Markdown文件，并生成对这些Markdown的引用的index.js文件
yarn create
// 等到脚本运行结束并无报错的时候在执行以下命令
yarn build
```

## TODO

- [x] 将 `Markdown` 转换为 `HTML`
- [x] 本地启动和 `build`
- [x] 路由
- [x] 热更新，在添加/删除 `src` 下的 `Markdown` 的时候不用重新运行 `yan create` 命令
- [ ] 更加美观的样式
- [ ] 根据放入 `src` 下的文件目录生成对应的目录（一级目录，二级目录...对应文件）
