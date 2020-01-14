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
    const requireItem = `const ${requireVariate} = require('./${folder}${path}');`
    const contentItem = `<h1 id="${name}">${name}</h1><div>` + '${' + requireVariate + '}' + '</div><hr />'
    requireList.push(requireItem)
    contentList.push(contentItem)
  })
  const requireString = requireList.join('\n')
  const contentString = 'root.innerHTML = ' + `\`${contentList.join('\n')}\``
  createFile(requireString, contentString)
}

// 创建文件并写入内容
function createFile(requireString, contentString) {
  const data = fs.readFileSync('./template.js', 'utf8').split('\n')
  // 替换template.js中第一行的const md = require('./README.md')
  data[0] = requireString
  // 替换template.js中倒数第二行中的root.innerHTML = md
  data[data.length - 2] = contentString
  fs.writeFile('index.js', data.join('\n'), 'utf8', (error) => {
    if (error) {
      console.error(error)
    }
    console.log('文件已经创建成功！！！！！！')
  })
}

getFiles(filePath)
assemblyContent(filesPath)
