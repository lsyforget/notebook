// let b1 = Buffer.from('lsy')
// let b2 = Buffer.from('爱前端')
// let b = Buffer.concat([b1, b2])
// console.log(b);
// console.log(b.toString());

let a = [1, 2]
let b = Buffer.alloc(3)
console.log(Buffer.isBuffer(a))
console.log(Buffer.isBuffer(b))