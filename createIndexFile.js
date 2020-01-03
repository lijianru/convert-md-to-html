const path = require('path')
const fs = require('fs')

const filePath = path.resolve(__dirname, './src')

let requireList = []
let requireNameList = []

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
              const requireFile = fileDir.replace(/\\/g, '/').split('src')[1]
              const requireName = filename.replace(/\./, '')
              requireList.push(`const ${requireName} = require('./src${requireFile}');\n`)
              requireNameList.push(requireName)
              writeFile(requireList, requireNameList)
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

function writeFile(requireList, requireNameList) {
  const content = requireNameList.map(name => {
    return '<div> ' + '${' + name + '}' + ' </div><hr />'
  })
  const innerHTML = `\`${content.join('')}\``
  const body = [...requireList, "const root = document.getElementById('root');\n", `root.innerHTML = ${innerHTML}`].join('')
  fs.writeFile('index.js', body, 'utf8', (error) => {
    if (error) {
      console.error(error)
    }
    console.log('文件已经创建成功！！！！！！')
  })
}
