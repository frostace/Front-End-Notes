# Closure

## 0. Prerequisite

### Scope

There are 2 kinds of scopes in JavaScript: Global Scope and Functional Scope

We can access global variables within a function

```JavaScript
var n = 999;

function f1() {
  	console.log(n);
}
f1() // 999
```

However, we cannot access local variables declared within a functional scope outside this function.

```JavaScript
function f1() {
  	var n = 999;
}

console.log(n)
// Uncaught ReferenceError: n is not defined(
```

### Chain Scope

Whenever we visit a variable inside a child object, it will go up generation by generation to search for the variable in all parent objects. That is to say, parent objects' variables are visible to children objects, but it does not hold the other way around.

So when we want to access local variable outside a function, we usually declare another function to access the variable for us.

```JavaScript
function f1() {
    var n = 999;
    function f2() {
      	console.log(n);
    }
    return f2;
}

var result = f1();
result(); // 999
```

## 1. What is Closure

We can simply consider closure as an internal function f2 of a function f1 which makes internal variables available outside function f1.

## 2. What do we use Closure for (Pros)

* To provide an interface to access internal variables of a function
* To maintain internal variables in RAM
* To encapsulate private properties and methods of an object

### 2.2 To maintain internal variables in RAM

We have demonstrated the 1st usage, what does it mean by the 2nd one?

```JavaScript
function createIncrementor(start) {
    return function () {
      	return start++;
    };
}

var inc = createIncrementor(5);

inc() // 5
inc() // 6
inc() // 7
```

Closure maintains the environment in which it was born. In this example, the closure is an anonymous function:

```JavaScript
function () {
  	return start++;
};
```

Value of the internal variable 'start' is maintained by closure so that in every call of the inc(), it remembers the value at the end of the previous call.

#### How is that possible?

Because the global variable inc is always maintained in RAM, and it's dependent on createIncrementor function, so it's maintained in RAM as well and it won't be cleared after the end of the call.

###2.3 To encapsulate private properties and methods of an object

```JavaScript
function Person(name) {
    var _age;
    function setAge(n) {
      	_age = n;
    }
    function getAge() {
      	return _age;
    }

    return {
        name: name,
        getAge: getAge,
        setAge: setAge
    };
}

var p1 = Person('John');
p1.setAge(25);
p1.getAge() // 25
```

This is similar to the second usage, we can get access of private properties and methods outside a function.

## Note:

<strong>Since every call of the outer function will create a new closure, and this closure will maintain internal variables, so the consumption of RAM is very high. Abuse of closures would lead to performance issue of a web application.</strong>

