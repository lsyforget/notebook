const b1 = Buffer.alloc(10)
const b2 = Buffer.allocUnsafe(10)
const b3 = Buffer.from('你好')
const b4 = Buffer.from(['你'], 'utf8')

const b5 = Buffer.alloc(3)
const b6 = Buffer.from(b5)
const b7 = Buffer.alloc(3)
const b8 = Buffer.from(b7)
b7[0] = 1

console.log(b1)
console.log(b2)
console.log(b3)
console.log(b4)
console.log(b6)
console.log(b7)
console.log(b8)