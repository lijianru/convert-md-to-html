const path = require('path')
const fs = require('fs')

// 需要读取的文件夹
const folder = 'src/'
// 需要读取文件夹的绝对路径
const filePath = path.resolve(__dirname, `./${folder}`)
// 存储读取结果，path：路径，name：文件名
const filesPath = []

/**
 * 获取目标目录下的所有md文件
 * @param filePath
 */
function getFiles(filePath) {
  // 同步读取文件
  fs.readdirSync(filePath).forEach(filename => {
    const fileDir = path.join(filePath, filename)
    const stat = fs.statSync(fileDir)
    // 是否为文件
    if (stat.isFile()) {
      // 是否为md文件
      if (/\.md$/.test(filename)) {
        filesPath.push({
          path: fileDir.replace(/\\/g, '/').split(folder)[1],
          name: filename
        })
      }
    // 如果是文件夹，递归读取该文件夹下文件
    } else if (stat.isDirectory()) {
      getFiles(fileDir)
    }
  })
}

// 组装内容
function assemblyContent(filesPath) {
  // 存储require语句
  const requireList = []
  // 存储每一个文件的内容
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
