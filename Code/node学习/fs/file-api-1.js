const fs = require('fs')
const path = require('path')

// fs.readFile(path.resolve('data.txt'), 'utf-8', (err, res) => {
//   console.log(err)
//   console.log(res)
// })

// readFile
// fs.readFile(path.resolve('前端面试总结.md'), 'utf-8', (err, res) => {
//   console.log(err)
//   console.log(res)
// })

// writeFile
// fs.writeFile('data.txt', '4', {
//   mode: 438,
//   flag: 'r+',
//   encoding: 'utf-8'
// }, (err) => {
//   if(!err) {
//     fs.readFile('data.txt', 'utf-8', (err, res) => {
//       console.log(res)
//     })
//   }
// })

// appendFile
// fs.appendFile('data.txt', 'hello NodeJs', (err, res) => {
//   console.log(res)
// })

// copyFile
// fs.copyFile('data.txt', 'data-bak.txt', () => {
//   console.log('拷贝完成')
// })

// watchFile
fs.watchFile('data.txt', {
  interval: 20
}, (curr, prev) => {
  if(curr.mtime !== prev.mtime) {
    fs.copyFile('data.txt', 'data-bak.txt', () => {
      console.log('拷贝完成')
    })
    fs.unwatchFile('data.txt')
    console.log('文件被修改了');
  }
})
