const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

const fs = require('fs')

const filePath = path.resolve(__dirname, './src')

fileDisplay(filePath)

function fileDisplay(filePath) {
  fs.readdir(filePath, function (error, files) {
    if (error) {
      console.error(error)
    } else {
      files.forEach(function (filename) {
        const fileDir = path.join(filePath, filename)
        fs.stat(fileDir, function (error, stats) {
          if (error) {
            console.error(error)
          } else {
            const isFile = stats.isFile()
            const isDir = stats.isDirectory()
            if (isFile) {
              console.log('path: ', fileDir)
            }
            if (isDir) {
              fileDisplay(fileDir)
            }
          }
        })
      })
    }
  })
}

module.exports = {
  entry: {
    main: path.join(__dirname, './index.js')
  },
  mode: "development",
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: [
          'html-loader',
          'markdown-loader'
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './template.html'),
      favicon: path.join(__dirname, './favicon.ico')
    })
  ]
}
