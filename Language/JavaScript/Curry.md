# Curring

In mathematics and computer science, currying is the technique of translating the evaluation of a function that takes multiple arguments (or a tuple of arguments) into evaluating a sequence of functions, each with a single argument.

A curried function is a function which takes its arguments one at a time, returning a new function at each step. 

```JavaScript
// curried
function tripleSumCurried(a : number) : number => number => number {
    return function (b : number) : number => number {
        return function (c : number) : number {
          	return a + b + c;
        }
    }
}

let total = tripleSumCurried(1)(2)(3);
```

An uncurried function is a function which takes all of its arguments at once. For example, this is an uncurried function:

```JavaScript
// uncurried function
function tripleSum(a : number, b : number, c : number) : number {
  	return a + b + c;
}

let total = tripleSum(1, 2, 3);
```

## 1st Version


Here is a simple version of currying function:

```JavaScript
var curry = function (fn) {
    var args = [].slice.call(arguments, 1);
    // 'arguments' here refers to the arguments other than 'fn' passed into curry() function
    return function () {
        var newArgs = args.concat([].slice.call(arguments));
        // 'arguments' here refers to the arguments passed into addCurry() function
        return fn.apply(this, newArgs);
    };
};
```

```JavaScript
function add(a, b) {
    return a + b;
}

var addCurry = curry(add, 1, 2);
addCurry(); // 3
// or
var addCurry = curry(add, 1);
addCurry(2); // 3
// or
var addCurry = curry(add);
addCurry(1, 2); // 3
```

## 2nd Version

```JavaScript
function addRunner(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
      	// 'fn' here is always the add() function
      	// 'arguments' here refers to the arguments passed into addRunner() function
        return fn.apply(this, args.concat([].slice.call(arguments)));
    };
}

function curry(fn, length) {
    length = length || fn.length;
  	// 1st time: 
  	// fn = add(), length = 3
  	// 2nd time:
  	// fn = function() {return add.apply(this, ...)}, length = 1
    var slice = Array.prototype.slice;

    return function() {
      	// 1st time: called by curriedAdd("a", "b")
      	// arguments = ["a", "b"], combined = [add(), "a", "b"]
      	// 2nd time: called by curriedAdd("a", "b")("c")
      	// arguments = ["c"]
        if (arguments.length < length) {
            var combined = [fn].concat(slice.call(arguments));
            return curry(addRunner.apply(this, combined), length - arguments.length);
        } else {
            return fn.apply(this, arguments);
        }
    };
}

var curriedAdd = curry(function (a, b, c) {
    return [a, b, c];
});

curriedAdd("a", "b")("c"); // ["a", "b", "c"]
```

## 3rd Version

```JavaScript
function curry(fn, args) {
    var length = fn.length;
    args = args || [];
    return function (...arguments) {
        args = [...args, ...arguments];
      	// wait until length of args is enough to call the uncurrified function
      	// otherwise, call curry again
        return args.length < length
            ? curry.call(this, fn, args)
            : fn.apply(this, args);
    };
}
```

Looks nice and elegant, the problem is: 

Why do we have to pass `this` to the calls?



### Reference

https://medium.com/@JosephJnk/currying-and-uncurrying-in-javascript-and-flow-98877c8274ff

https://github.com/mqyqingfeng/Blog/issues/42