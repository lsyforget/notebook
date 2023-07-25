const fs = require('fs')
const path = require('path')

// open
// fs.open(path.resolve('index.md'), 'r', (err, res) => {
//   console.log(res)
// })

// close
fs.open('index.md', 'r', (err, fd) => {
  console.log(fd)
  fs.close(fd, err => {
    console.log('文件关闭成功')
  })
})