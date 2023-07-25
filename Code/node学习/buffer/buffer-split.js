// Buffer.prototype.split = function (sep) {
//   let len = Buffer.from(sep).length
//   let ret = []
//   let start = 0
//   let offset = 0

//   while(offset = this.indexOf(sep, start) !== -1) {
//     ret.push(this.slice(start, offset))
//     start = offset + len
//   }
//   ret.push(this.slice(start))
//   return ret
// }

Buffer.prototype.split=Buffer.prototype.split || function (spl) {//spl表示分隔符
  let arr=[];//定义数组接收分隔出来的内容
  let cur=0;//表示当前遍历的位置
  let n=0;//用来接收spl分隔符索引到的位置
  while((n=this.indexOf(spl,cur))!=-1){
  //如果索引值存在，即不为-1, 同时将索引到的位置赋值给n。
      arr.push(this.slice(cur,n));//切割从当前位置到索引位置，再将该段字符串存到数组中
      cur=n+spl.length;//当前位置向后进行遍历，寻找下一个分隔符
  }
  arr.push(this.slice(cur))
  return arr;
}



let buf = Buffer.from('lsy爱前端, 爱游戏,')
let bufArr = buf.split(',')
console.log(bufArr);