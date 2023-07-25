const path = require('path')

console.log(__filename)

// 获取路径中的基本名称
/*
  返回的是路径当中的最后一部分
  第二个参数表示扩展名，没有设置则返回完整的文件名称带后缀
  第二个参数做后缀时，如果没有匹配到则忽略
  处理目录路径结尾处如果有路径分隔符，也会被忽略
*/ 
console.log(path.basename(__filename))
console.log(path.basename(__filename, '.js'))
console.log(path.basename(__filename, '.css'))
console.log(path.basename('a/b/c'))
console.log(path.basename('a/b/c/'))

// 获取路径中的目录名(路径)
console.log(path.dirname(__filename))
console.log(path.dirname('a/b/c'))
console.log(path.dirname('a/b/c/'))

// 获取路径的扩展名
console.log(path.extname(__filename))
console.log(path.extname('a/b'))
console.log(path.extname('a/b.min.css'))
console.log(path.extname('a/b.min.css.'))

// 解析路径
const obj = path.parse(__filename)
console.log(path.format(obj))

// 判断当前路径是否为绝对
console.log(path.isAbsolute('/foo'))

// 拼接路径
console.log(path.join('a/b', 'c', '../', 'index.html'))

// 规范化路径
console.log(path.normalize('a/b/c///d'))
console.log(path.normalize('a/b/c/../d'))

// 返回绝对路径
console.log(path.resolve())
console.log(path.resolve('a/b'))
console.log(path.resolve('../'))
console.log(path.resolve('/a'))