const path = require('path')
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
              console.log('./src' + fileDir.replace(/\\/g, '/').split('src')[1])
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
