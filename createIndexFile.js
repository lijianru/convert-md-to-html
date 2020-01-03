const path = require('path')
const fs = require('fs')

const filePath = path.resolve(__dirname, './src')

fileDisplay(filePath)

function fileDisplay(filePath) {
  let content =
`
const root = document.getElementById('root');
root.innerHTML = html;
`
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
              const requireFile = fileDir.replace(/\\/g, '/').split('src')[1]
              writeFile(`const html = require('./src${requireFile}');` + content)
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

function writeFile(content) {
  console.log('content', content)
  fs.writeFile('index.js', content, 'utf8', (error) => {
    if (error) {
      console.error(error)
    }
    console.log('文件已经创建成功！！！！！！')
  })
}
