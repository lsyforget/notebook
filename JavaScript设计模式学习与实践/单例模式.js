// 保证一个类仅有一个实例，并提供一个访问它的全局访问点

class Multiple {
  show() {
    console.log('我是一个多例类');
  }
}

const multiple1 = new Multiple();
const multiple2 = new Multiple();
multiple1 === multiple2  // false

class SingleDog {
  show() {
    console.log('我是一个单例对象');
  }
  // static getInstance() {
  //   if (!SingleDog.instance) {
  //     SingleDog.instance = new SingleDog();
  //   }
  //   return SingleDog.instance;
  // }
}

SingleDog.getInstance = (function() {
  let instance = null;
  return function() {
    if (!instance) {
      instance = new SingleDog();
    }
    return instance;
  }
})()

const single1 = SingleDog.getInstance();
const single2 = SingleDog.getInstance();
console.log(single1 === single2); // true

//实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。

class Storage {
  static getInstance () {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }
  setItem(key, value) {
    return localStorage.setItem(key, value)
  }
  getItem(key) {
    return localStorage.getItem(key)
  }
}

const s1 = Storage.getInstance();
const s2 = Storage.getInstance();
s1.setItem('name', 's1');
s2.getItem('name')