const path = require('path')
const fs = require('fs')

const mockTool = {
  parseUrl (url) {
    const paths = url.split('/')
    const len = paths.length

    if (!len || len === 0) {
      return {
        fileName: '',
        jsonFilePath: ''
      }
    }

    return {
      fileName: paths[len - 1],
      jsonFilePath: `mock${url.slice(0, url.lastIndexOf(paths[len - 1]))}`
    }
  }
}

module.exports = mockTool
