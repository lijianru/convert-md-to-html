const path = require('path')
const fs = require('fs')

const filePath = path.resolve(__dirname, './src')

let requireList = []
let requireNameList = []

getFiles(filePath)
createFile(requireList, requireNameList)
function getFiles(filePath) {
  fs.readdirSync(filePath).forEach(filename => {
    const fileDir = path.join(filePath, filename)
    const stat = fs.statSync(fileDir)
    if (stat.isFile()) {
      const requireFile = fileDir.replace(/\\/g, '/').split('src')[1]
      const requireName = filename.replace(/\./, '')
      requireList.push(`const ${requireName} = require('./src${requireFile}');\n`)
      requireNameList.push(requireName)
    } else if (stat.isDirectory()) {
      getFiles(fileDir)
    }
  })
}

function createFile(requireList, requireNameList) {
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
