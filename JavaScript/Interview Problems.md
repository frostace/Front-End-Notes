1. js基本数据类型哪几个？引用类型有哪些？null和undefined的区别?（常考）        

2. JS中基本数据类型和引用类型在内存上有什么区别？                   

4. What on earch did `new` operator do?

   ```JavaScript
   var a = new A();
   
   // is the same as:
   
   // 1. init an empty object
   var o = new Object();
   // 2. assign the constructor prototype to the empty object's prototype
   o.__proto__ = A.prototype;
   // 3. alter the context of `this` inside the constructor, point it at the newly created object
   A.call(o);
   // 4. if the constructor returned an Object in it, then return the object
   // 		else return the newly created object `o` itself
   ```

5. Object.defineProperty实现双向绑定（考过）：https://www.cnblogs.com/leaf930814/p/6891254.html         
9. 正则表达式（考过简单的）

12. 如何判断一个变量是Array类型？如何判断一个变量是Number类型？（都不止一种，考过）

13. Object是引用类型嘛？引用类型和基本类型有什么区别？哪个是存在堆哪一个是存在栈上面的？

14. js 的作用域有几种？{}是不是作用域？（考过） 

    1. Closure, when and where to use, how to implement, pros and cons? 

15. `call` vs `apply` vs `bind`

    call, apply, bind are all used to alter the context of function call, or alter the `this` pointer.

    ||Call Immediately|Make copy of the function|Arguments|
    |---|---|---|---|
    |call()|Yes|No|[thisArg[, arg1, arg2, ...argN]]|
    |apply()|Yes|No|thisArg, [ argsArray]|
    |bind()|No|Yes|thisArg[, arg1[, arg2[, ...argN]]]|
* call()
```JavaScript
func.call([thisArg[, arg1, arg2, ...argN]])
```
* apply()

```JavaScript
func.apply(thisArg, [ argsArray])
```
* bind()

```JavaScript
let boundFunc = func.bind(thisArg[, arg1[, arg2[, ...argN]]])
```
​		We can implement bind() with apply():

```JavaScript
// Does not work with `new funcA.bind(thisArg, args)`
if (!Function.prototype.bind) (function(){
    var slice = Array.prototype.slice;
    Function.prototype.bind = function() {
        var thatFunc = this, thatArg = arguments[0];
        var args = slice.call(arguments, 1);
        if (typeof thatFunc !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - ' +
                   'what is trying to be bound is not callable');
        }
        return function(){
            var funcArgs = args.concat(slice.call(arguments))
            return thatFunc.apply(thatArg, funcArgs);
        };
    };
})();
```
17. 举例说明一个匿名函数的典型用例 

18. 箭头函数（这个其实是ES6，考过）

19. `attribute` vs `property`

20. `document load` vs `document DOMContentLoaded`

21. `==` vs `===` vs `object.is()`

    ||==|===|object.is()|
    |---|---|---|---|
    ||Equality operator|Identity Operator|determines whether two values are [the same value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)|
    |[]|false|false|false|
    |undefined|true|true|true|
    |NaN|false|false|true|
    |+0, -0|true|true|false|

26. 原生事件绑定（跨浏览器），dom0和dom2的区别？

27. 普通函数和构造函数的区别

28. 给定一个元素获取它相对于视图窗口的坐标

29. 如何实现图片滚动懒加载

27. DOM事件中target和currentTarget的区别        

28. touch event

    

29. `forEach` vs `for in` vs `for of`

    ||Pros|Cons|
    |---|---|---|
    |forEach|syntax is simpler than the naive for loop way|cannot break out of an ongoing loop|
    |for ... in|better syntax<br />can break out of the loop|key is string<br />will iterate through manually added keys and keys on the prototype chain|
    |for ... of|key is number|/|
    1. Naive for loop

    ```JavaScript
    let myArray = [1,2,3,4]
    for (var index = 0; index < myArray.length; index++) {
      	console.log(myArray[index]);
    }
    ```

    2. forEach()

    ```JavaScript
    myArray.forEach(function (value) {
        if (value > 2) return;
      	console.log(value);
    });
    // 1
    // 2
    // 3
    // 4
    // return command is not working for external context anymore, since it's just exiting the callback inside the forEach method, the successive callbacks will be called either way.
    // break command is illegal here, since the context is not essentially a loop.
    ```

    3. for ... in

    ```JavaScript
    for (let idx in myArray) {
      	// idx is of `string` type
        console.log(myArray[idx]);
    }
    ```
    4. for ... of
    ```JavaScript
    for (let idx of myArray) {
      	// idx is of `number` type
        console.log(myArray[idx]);
    }
    ```