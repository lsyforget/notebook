# 前端面试
## Vue部分

### <font color="red">vue双向数据绑定原理</font>
实现vue的双向数据绑定，是采用数据劫持结合发布者和订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调



### <font color="red">虚拟DOM和diff算法</font>
**虚拟DOM**：用JavaScript对象描述DOM的层次结构。DOM中的一切属性都在虚拟DOM中有对应的属性
**diff算法**：

- diff是发生在虚拟DOM上的。

- 只有同一个虚拟节点，才进行diff。（选择器相同，key相同）

- 只进行同层比较，不进行跨层比较。

  

### <font color="red">选项式API(Vue2)和组合式API(Vue3)</font>

![选项式api和组合式api](./upload/选项式api和组合式api.webp)

Vue2选项式API(option api) 优点：简单，各选项各司其职；缺点：不方便功能复用；功能代码分散维护代码横跳

Vue3组合式API(composition api) 优点：功能代码组合维护, 不方便功能复用；



### <font color="red">v-if和v-show</font>

__当条件不成立时，v-if不会渲染dom元素，v-show只是操作css样式（display），且换当前dom显示和隐藏__
相同点：都是控制元素的显示和隐藏
不同点：

- v-show：
1.设置css属性中的display为none
2.会编译，只是初始值为false，所以将display设置为none
3.只编译一次，性能好一些
4.适用于频繁切换某节点时，切换性能消耗小，但是初始性能消耗大
- v-if：
1.dom树中添加或删除dom元素
2.如果初始值为false时不会编译
3.不停的创建和销毁，性能差一点
4.初始渲染开销小，但是切换开销大

__性能__
v-show只编译一次，后面其实就是控制css，而v-if不停的销毁和创建，故v-show性能更好一点。



## JS部分



### <font color="red">闭包</font>

可以在另一个作用域中调用一个函数的内部函数并访问到该函数的作用域中的成员

**闭包的本质：**函数在执行的时候会放到一个执行站上当函数执行完毕之后会从执行栈上一处，但是堆上的作用域成员因为被外部引用不能释放，因此内部函数依然可以访问外部函数的成员。

### <font color="red">ES5实现继承的方式</font>
```javascript
function Person(name, hobbies) {
    this.name = name
    this.hobbies = hobbies
    this.sayName = function () {
        console.log(this.name)
    }
}
Person.prototype.publicFn = function () {
    console.log('父类原型对象上的方法')
}
let p1 = new Person('lsy', ['打篮球', '玩游戏'])
console.log(p1);
p1.sayName()
p1.publicFn()
/*
原型链继承
    因为Child原型对象指向Person实例，所以当更改Person中的引用类型变量时会导致Child的实例上的引用类型变量统一改变，不具有唯一性
*/
function Child1() { }
Child1.prototype = new Person()
let child1 = new Child1()
child1.sayName()
console.log(child1);
child1.publicFn()
/*
构造函数继承
无法获取原型链上的方法
*/
function Child2(name,hobbies) {
Person.call(this,name,hobbies)
}
let child2 = new Child2('lsy2',['打篮球','玩游戏'])
console.log(child2);
//    child2.publicFn()
/*
组合式继承
每次创建子类实例都执行了两次构造函数
*/
function Child3(name,hobbies) {
Person.call(this,name,hobbies)
}
Child3.prototype = new Person()
let child3 = new Child3('lsy3',['打篮球','玩游戏'])
console.log(child3);
/*
寄生组合式继承
*/
function Child4 (name,hobbies) {
Person.call(this,name,hobbies)
}
function Fn() {}
Fn.prototype = new Person()
let fn = new Fn()
Child4.prototype = fn
let child4 = new Child4('lsy4',['打篮球','玩游戏'])
console.log(child4);

```


### <font color="red">this的指向</font>
**1.当函数作为构造函数，通过new xxx()调用时，this指向生成的实例**

```javascript
    function Cat(name,color){
        　　　　this.name=name;
        　　　　this.color=color;
        　　}
        let cat1 = new Cat("大毛","橘色");//this指向的cat1
        let cat2 = new Cat("二毛","黑色");//this指向的cat2
        console.log(cat1); 
        console.log(cat2); 
```

**2.当函数直接被调用时（通过 xxx()的方式调用）this指向window对象,严格模式下为undefined**

```javascript
    function Cat(name,color){
        　　　　this.name=name;
        　　　　this.color=color;
        　　}
       Cat("大毛","橘色");
       console.log(window.name)//大毛
       console.log(window.color)//橘色
```

**3.当函数被调用时，它是作为某个对象的方法（前面加了 点'.'）this指向这个对象（点'.'前面的对象）**(谁调用它，它就指向谁)

```javascript
    function setDetails(name,color){
            　　　　this.name=name;
            　　　　this.color=color;
            　　}
    let cat={};
    cat.setDetails=setDetails;
    cat.setDetails('大毛','橘色');
    console.log(cat.name)//大毛
    console.log(cat.color)//橘色
```



### <font color="red">实现call/apply/bind</font>


**1.实现call**
```javascript
let p = {}
function setDetails(name, age) {
    this.name = name
    this.age = age
    return console.log(this)
}
//实现call
Function.prototype.call2 = function (context) {
    let mySymbol = Symbol()
    context[mySymbol] = this
    let args = Array.from(arguments).slice(1)
    let result = context[mySymbol](...args)
    delete context[mySymbol]
    return result
}
// setDetails.call2(p,'lsy', 18)
//实现apply
Function.prototype.apply2 = function (context) {
    let mySymbol = Symbol()
    context[mySymbol] = this
    let argsArr = Array.from(arguments)[1] || []
    let result = context[mySymbol](...argsArr)
    delete context[mySymbol]
    return result
}
// setDetails.apply2(p,['lsy',18])
//实现bind
Function.prototype.bind2 = function (context) {
    let mySymbol = Symbol()
    context[mySymbol] = this
    let args = Array.from(arguments).slice(1);
    function fn() {
        let bindArgs = Array.from(arguments)
        return context[mySymbol].apply(this instanceof fn ? this /*作为构造函数调用*/ : context, args.concat(bindArgs))
    }
    fn.prototype = Object.create(this.prototype) //继承
    return fn
}
```



### <font color="red">原型链的理解</font>

![](./upload/原型链1.png)
两者的constructor即为构造函数
![](./upload/原型链2.png)

- 首先说好了的每一个实例都有__proto__，而这个就指向的是构造函数的对象原型，所以ldh.__proto__和Star.prototype是等价的，即ldh.proto`能够只会Star这个构造函数呢，本质上就是通过Star.prototype指回去的。
- 那么我们就会想到Star.prototype的__proto__指向的会是谁呢，一打印就能看的出指向的是Object.prototype，所以不用想也知道他的构造函数肯定是Object了
- 那Object.prototype还有没有__proto__，打印一看就知道是为null，所以我们知道原型的终点就是null

#### js的成员查找机制
- 当访问一个对象的属性或者方法的时候，首先查找这个对象自身有没有这个属性
- 如果没有就去找他的原型，也就是__proto__指向的prototype原型对象
- 如果还没有就去查找原型对象的原型，即Object的原型对象
- 以此类推一直找到null为止



### <font color="red">事件冒泡，事件捕获，事件委托</font>
#### 1.事件冒泡(event bubbling)

微软提出了名为事件冒泡的事件流。事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发。可以想象把一颗石头投入水中，泡泡会一直从水底冒出水面。也就是说，事件会从最内层的元素开始发生，一直向上传播，直到document对象。
#### 2.事件捕获(event capturing)

网景提出另一种事件流名为事件捕获。事件从最不精确的对象(document 对象)开始触发，然后到最精确(也可以在窗口级别捕获事件，不过必须由开发人员特别指定)，与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。同样形象的比喻一下可以想象成警察逮捕屋子内的小偷，就要从外面一层层的进入到房子内
#### 3.阻止事件冒泡

①e.stopPropagation()
#### 4.事件委托
事件冒泡机制
- 大量减少内存占用，减少事件注册。（原本需要对每个.li注册，现在只对上级元素注册）
- 新增元素实现动态绑定事件。 

**实现方式：**
**1.原生JS**
```javascript
// 给ul添加监听器
document.getElementById("ul").addEventListener("click",function(e) {
// e.target是被点击的元素!
// 筛选触发事件的子元素如果是li执行的事件
if(e.target && e.target.nodeName.toLowerCase() == "li") {
// 获取到具体事件触发的li，输出其id
console.log("List item ",e.target.id.replace("post-")," was clicked!");
}
});
```
**2.Jquery**
```javascript
$("#ul").on("click","li",function(){});
```



### <font color="red">实现new</font>

创建一个空对象继承构造函数的原型对象，然后更改this的指向，指向这个空对象

```javascript
function newFactory(constructor,...args) {
    let obj = Object.create(constructor.prototype)//obj.__proto__ = constructor.prototype
    let result = constructor.apply(obj,[...args])
    //当构造函数本身会返回一个非null的对象时，则通过`new`会返回这个对象，其他情况还是会返回新生成的对象
    return result instanceof Object ? result : obj
}
```



### <font color="red">防抖节流</font>

```javascript
//防抖
function debounce(fn, time) {
    let timer = null
    return function() {
        let args = arguments
        let context = this
        if(timer) {
            clearTimeout(timer)
            timer = null
        }
        timer = setTimeout(function(){
            fn.apply(context, args)
        }, time);
    }
}
function test (name) {
    console.log(name)
}
//实现节流
function throttle(fn, time) {
    let load = true
    return function () {
        if(load) {
            fn.apply(this,arguments)
            load = false
            setTimeout(function () {
                load = true
            },time)
        }
    }
}

```



### <font color="red">实现promise</font>

```javascript
let pendingSymbol = Symbol()
let fulfilledSymbol = Symbol()
let rejectedSymbol = Symbol()
class Promise2 {
    constructor(executor) {
        this.status = pendingSymbol
        this.value = null
        this.reason = null
        this.onFulfilledCallbacks = [] //成功的回调队列
        this.onRejectedCallbacks = [] //失败的回调队列
        const resolve = (value) => {
            if (value instanceof this.constructor) {
                value.then(resolve, reject)
                return
            }
            if (this.status === pendingSymbol) {
                this.value = value
                this.status = fulfilledSymbol
                setTimeout(() => {
                    this.onFulfilledCallbacks.forEach(callback => {
                        callback(this.value)
                    })
                })
            }
        }
        const reject = (reason) => {
            if (this.status === pendingSymbol) {
                this.reason = reason
                this.status = rejectedSymbol
                setTimeout(() => {
                    this.onRejectedCallbacks.forEach(callback => {
                        callback(this.value)
                    })
                })
            }
        }
        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }
    then(onFulfilled, onRejected) {
        const promise2 = new this.constructor((resolve, reject) => {
            if (this.status === fulfilledSymbol) {

                setTimeout(() => {
                    try {
                        let callbackValue = onFulfilled(this.value)
                        resolve(callbackValue)
                    } catch (e) {
                        reject(e)
                    }
                });
            }
            if (this.status === rejectedSymbol) {
                setTimeout(() => {
                    try {
                        let callbackValue = onRejected(this.reason)
                        resolve(callbackValue)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.status === pendingSymbol) {
                this.onFulfilledCallbacks.push(() => {
                    try {
                        let callbackValue = onFulfilled(this.value);
                        resolve(callbackValue);
                    } catch (error) {
                        reject(error)
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    try {
                        let callbackValue = onRejected(this.reason);
                        resolve(callbackValue);
                    } catch (error) {
                        reject(error);
                    }
                })
            }
        })
        return promise2
    }
}
```


### <font color="red">宏任务，微任务</font>

**宏任务**
(macro)task，可以理解是每次执行栈执行的代码就是一个宏任务

主线程上的执行栈中所有的代码块
- setTimeout
- setInterval
- Ajax
- 事件

**微任务**
微任务（microtask）是宏任务中的一个部分，它的执行时机是在同步代码执行之后，下一个宏任务执行之前。微任务可以往任务队列中添加微任务，一次循环要执行完所以微任务。执行完微任务之后只取一个宏任务进行下一轮循环。

总结起来，微任务有：

- Promise.then
- process.nextTick(Node.js 环境


JS优先执行同步任务，然后执行微任务，最后执行宏任务。



