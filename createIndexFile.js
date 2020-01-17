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
  // 存储每一个require的变量
  const requireMarkdownNames = []
  filesPath.forEach(({name, path}) => {
    const requireMarkdownName = `md${name.replace(/\./, '')}`
    const requireItem = `import * as ${requireMarkdownName} from './${folder}${path}';`
    requireList.push(requireItem)
    requireMarkdownNames.push(requireMarkdownName)
  })
  const requireString = requireList.join('\n')
  // 获取模板文件
  const data = fs.readFileSync('./template.js', 'utf8').split('\n')
  // 替换template.js中的const md = require('./README.md')
  data[5] = requireString
  // 替换template.js中的<li><Link to="/readme">Home</Link></li>
  const links = requireMarkdownNames.map(requireMarkdownName => {
    const navigationName = requireMarkdownName.replace(/md/g, '')
    return `      <Menu.Item key="${navigationName}"><Link to="/${requireMarkdownName}">${navigationName}</Link></Menu.Item>`
  })
  data[16] = links.join('\n')
  // 替换template.js中的<Route path="/readme"><div dangerouslySetInnerHTML={{__html: readme.default}}></div></Route>
  const routers = requireMarkdownNames.map(requireMarkdownName => {
    return `      <Route path="/${requireMarkdownName}"><div dangerouslySetInnerHTML={{__html: ${requireMarkdownName}.default}}></div></Route>`
  })
  data[24] = routers.join('\n')
  createFile(data)
}

// 创建文件并写入内容
function createFile(data) {
  fs.writeFile('index.js', data.join('\n'), 'utf8', (error) => {
    if (error) {
      console.error(error)
    }
    console.log('文件已经创建成功！！！！！！')
  })
}

getFiles(filePath)
assemblyContent(filesPath)
