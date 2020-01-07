# 将markdown转换为HTML
## 灵感来源
在看webpack相关的知识的时候发现有一个特别有意思的[markdown-loader](https://github.com/peerigon/markdown-loader)，
于是打算用webpack来做一个将Markdown转为HTML项目的想法。

## 安装
```git
git clone https://github.com/lijianru/convert-md-to-html.git
yarn
```

## 使用方式
将需要转换的文件或者文件夹放在 `src` 目录下即可。

## 本地运行
```
yarn create
// 等到脚本运行结束并无报错的时候在执行以下命令
yarn start
// 或者
yarn server
```
注：在启动后，添加/删除/修改 `src` 下的 `Markdown` 的时候，只用运行 `yan create` 即可。

## build
```
yarn create
// 等到脚本运行结束并无报错的时候在执行以下命令
yarn build
```

## TODO
- [x] 将 `Markdown` 转换为 `HTML`，并提供本地启动和 `build` 方式
- [x] 提供最简单的导航方式（锚点导航）
- [ ] 将每一个 `Markdown` 文件生成一个单独的 `bundle` 
- [ ] 根据放入 `src` 下的文件目录生成对应的导航（一级导航，二级导航...对应文件），并提供导航
- [ ] 热更新，在添加/删除/修改 `src` 下的 `Markdown` 的时候不用重新运行 `yan create` 命令就可以
- [ ] 更加美观的样式
- [ ] CI、CD
