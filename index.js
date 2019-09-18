const http = require('http')
const fs = require('fs')
const path = require('path')

const config = require('./config')
const mockTool = require('./mockTool/mockTool')

const server = http.createServer((req, res) => {
  try {
    if (config.mock && req.url) {
      const result = mockTool.parseUrl(req.url)
      const jsonFilePath = result.jsonFilePath
      const fileName = result.fileName
      const relativePath = path.join(process.cwd(), jsonFilePath)

      if (jsonFilePath !== '' && fs.existsSync(relativePath) && jsonFilePath !== 'mock/') {
        const file = fs.readFileSync(`${relativePath}/${fileName}.json`, 'utf8')

        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf8' })
        res.write(file)
        res.end()
        return
      } else {
        console.log('有接口本地不存在，请移步后端提供的接口')
      }
    }
  } catch (e) {
    console.log(e)
  }
}).listen(9090)

module.exports = server
