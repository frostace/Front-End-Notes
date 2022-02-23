## Async Programming

```js
const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
});
promise.then(() => {
    console.log(3);
});
console.log(4);

// 1
// 2
// 4
// 3
```

```js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
        reject('error')
    }, 1000)
})
promise.then((res) => {
  	console.log(res)
}, (err) => {
  	console.log(err)
})

// success
```

```js
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)

// 1
```

```js
setTimeout(()=>{
  	console.log('setTimeout')
})
let p1 = new Promise((resolve) => {
    console.log('Promise1')
    resolve('Promise2')
})
p1.then((res) => {
  	console.log(res)
})
console.log(1)

// Promise1
// 1
// Promise2
// setTimeout
```

```js
Promise.resolve(1)
    .then((res) => {
        console.log(res);
        return 2;
    })
    .catch((err) => {
        return 3;
    })
    .then((res) => {
        console.log(res);
    });

// 1
// 2
```

```js
const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
        console.log('开始');
        resolve('success');
    }, 5000);
});
 
const start = Date.now();
promise.then((res) => {
		console.log(res, Date.now() - start);
});
 
promise.then((res) => {
		console.log(res, Date.now() - start);
});

// 开始
// success, 5000
// success, 5000
```

```js
let p1 = new Promise((resolve, reject) => {
    let num = 6
    if (num < 5) {
        console.log('resolve1');
        resolve(num);
    } else {
        console.log('reject1');
        reject(num);
    }
})
p1.then((res) => {
    console.log('resolve2')
    console.log(res)
}, (rej) => {
    console.log('reject2')
    let p2 = new Promise((resolve, reject) => {
        if (rej * 2 > 10) {
            console.log('resolve3');
            resolve(rej * 2);
        } else {
            console.log('reject3');
            reject(rej * 2);
        }
    });
    return p2;
}).then((res) => {
    console.log('resolve4');
    console.log(res);
}, (rej) => {
    console.log('reject4');
    console.log(rej);
})

// reject1
// reject2
// resolve3
// resolve4
// 12
```

```js
// implement a custom promise object 
// 添加then方法
class MyPromise {
    constructor(handle) {
        if (!isFunction(handle)) {
            throw new Error("MyPromise must accept a function as a parameter");
        }
        // 添加状态
        this._status = PENDING;
        // 添加状态
        this._value = undefined;
        // 添加成功回调函数队列
        this._fulfilledQueues = [];
        // 添加失败回调函数队列
        this._rejectedQueues = [];
        // 执行handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this));
        } catch (err) {
            this._reject(err);
        }
    }

    // 添加resolve时执行的函数
    _resolve(val) {
        if (this._status !== PENDING) return;
        this._status = FULFILLED;
        this._value = val;
    }

    // 添加reject时执行的函数
    _reject(err) {
        if (this._status !== PENDING) return;
        this._status = REJECTED;
        this._value = err;
    }

    then(onFulfilled, onRejected) {
        const { _value, _status } = this;
        // 返回一个新的Promise对象
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            // 封装一个成功时执行的函数
            let fulfilled = (value) => {
                try {
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(value);
                    } else {
                        let res = onFulfilled(value);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res);
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err);
                }
            };
            // 封装一个失败时执行的函数
            let rejected = (error) => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(error);
                    } else {
                        let res = onRejected(error);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext);
                        } else {
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res);
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err);
                }
            };
            switch (_status) {
                // 当状态为pending时，将then方法回调函数加入执行队列等待执行
                case PENDING:
                    this._fulfilledQueues.push(fulfilled);
                    this._rejectedQueues.push(rejected);
                    break;
                // 当状态已经改变时，立即执行对应的回调函数
                case FULFILLED:
                    fulfilled(_value);
                    break;
                case REJECTED:
                    rejected(_value);
                    break;
            }
        });
    }
}
```

## this

```js
this.x = 9;
var module = {
  	x: 81,
  	getX: function() {return this.x;}
};

var retrieveX = module.getX;
retrieveX();	// 9

var boundGetX = retrieveX.bind(module);
boundGetX();  // 81
```

```js
document.getElementById('div1').onclick = function() {
  	console.log(this.id); 		// div1
  	var func = function() {
      	console.log(this.id); // undefined
    }
    func();
}

// correct version 1
document.getElementById('div1').onclick = function() {
  	console.log(this.id); 		// div1
  	var func = function() {
      	console.log(this.id); // div1
    }
    func.call(this);
}

// correct version 2
document.getElementById('div1').onclick = function() {
  	console.log(this.id); 		// div1
  	var func = () => {
      	console.log(this.id); // div1
    }
    func();
}
```

```js
function foo() {
  	console.log(this.a);
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo();						// 3
(p.foo = o.foo)();	// 2
```

```js
var A = function(name) {
  	this.name = name;
}
var B = function() {
  	A.apply(this, arguments);
}
B.prototype.getName = function() {
  	return this.name;
}
var b = new B("sven");
console.log(b.getName()); // sven
```

```js
function foo(el) {
  	console.log(el, this.id);
}
var obj = {
  	id: "awesome"
};
[1, 2, 3].forEach( foo, obj ); 
// 1 awesome 
// 2 awesome 
// 3 awesome
```

```js
function foo() {
  	console.log(this.a);
}
var obj1 = {
  	a: 2,
  	foo: foo
}
var obj2 = {
  	a: 3,
  	foo: foo
}
obj1.foo();	// 2
obj2.foo();	// 3

obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2
```

## Object Inheritance

```JavaScript
var A = function() {};
A.prototype.n = 1;
var b = new A();
A.prototype = {
    n: 2,
    m: 3
}
var c = new A();

console.log(b.n);		// 1
console.log(b.m);		// undefined

console.log(c.n);		// 2
console.log(c.m);		// 3
```

```JavaScript
var F = function() {};

Object.prototype.a = function() {
  	console.log('a');
};

Function.prototype.b = function() {
  	console.log('b');
}

var f = new F();

// f's constructor is F, its prototype is F.prototype
// so f.__proto__ = F.prototype, f.__proto__.__proto__ = Object.prototype
f.a();
f.b();

// F's constructor is Function, its prototype is Function.prototype
// so F.__proto__ = Function.prototype, F.__proto__.__proto__ = Object.prototype
F.a();
F.b();

// a
// Error
// (if no error: ) a
// (if no error: ) b
```

```JavaScript
function Person(name) {
    this.name = name
}
let p = new Person('Tom');
// 1. p.__proto__ is？
// 		Person.prototype
// 2. Person.__proto__ is？
// 		Function.prototype
```

```JavaScript
var foo = {},
    F = function(){};
Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

console.log(foo.a);
console.log(foo.b);

console.log(F.a);
console.log(F.b);

// foo.__proto__ = Object.prototype
// F.__proto__ = Function.prototype, F.__proto__.__proto__ = Object.prototype
// Answer:
// value a
// undefined
// value a
// value b
```

## Closure



### Reference

Promise: https://juejin.im/post/5b83cb5ae51d4538cc3ec354