let buf = Buffer.alloc(6)

// fill
// buf.fill('123')
// console.log(buf)
// console.log(buf.toString())

// write
// buf.write('123')
// console.log(buf)
// console.log(buf.toString())

// toString
// buf = Buffer.from('李思源')
// console.log(buf)
// console.log(buf.toString('utf-8', 6, 9))

// slice
// buf = Buffer.from('李思源')
// let b1 = buf.slice(-3)
// console.log(b1)
// console.log(b1.toString())

// indexOf
// buf = Buffer.from('lsy前端, lol, cod')
// console.log(buf)
// console.log(buf.indexOf('d'))

// copy
let b1 = Buffer.alloc(6)
let b2 = Buffer.from('lsy')
b2.copy(b1)
console.log(b1)
console.log(b2)
