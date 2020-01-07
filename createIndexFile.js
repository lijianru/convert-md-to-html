const path = require('path')
const fs = require('fs')

const folder = 'src/'
const filePath = path.resolve(__dirname, `./${folder}`)
const filesPath = []

// 获取目标目录下的所有md文件
function getFiles(filePath) {
  fs.readdirSync(filePath).forEach(filename => {
    const fileDir = path.join(filePath, filename)
    const stat = fs.statSync(fileDir)
    if (stat.isFile()) {
      if (/\.md$/.test(filename)) {
        filesPath.push({
          path: fileDir.replace(/\\/g, '/').split(folder)[1],
          name: filename
        })
      }
    } else if (stat.isDirectory()) {
      getFiles(fileDir)
    }
  })
}

// 组装内容
function assemblyContent(filesPath) {
  const requireList = []
  const contentList = []
  filesPath.forEach(({name, path}) => {
    const requireVariate = name.replace(/\./, '') + new Date().getTime()
    const requireItem = `const ${requireVariate} = require('./${folder}${path}');\n`
    const contentItem = '<h1>' + name + '</h1>\n<div>' + '${' + requireVariate + '}' + '</div><hr />\n'
    requireList.push(requireItem)
    contentList.push(contentItem)
  })
  const requireFiles = requireList.join('')
  const content = `\`${contentList.join('')}\``
  const body = [requireFiles, "const root = document.getElementById('root');\n", `root.innerHTML = ${content}`].join('')
  createFile(body)
}

// 创建文件并写入内容
function createFile(body) {
  fs.writeFile('index.js', body, 'utf8', (error) => {
    if (error) {
      console.error(error)
    }
    console.log('文件已经创建成功！！！！！！')
  })
}

getFiles(filePath)
assemblyContent(filesPath)
