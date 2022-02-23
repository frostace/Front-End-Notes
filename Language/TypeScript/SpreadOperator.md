# Spread Operator

The main objective of the spread operator (`...` ) is to spread the elements of an array or object.

## Spread an `array` into the function `arguments` 

`Function.prototype.apply`:

```js
function foo(x, y, z) { }
var args = [0, 1, 2];
foo.apply(null, args);
```

`...`:

```js
function foo(x, y, z) { }
var args = [0, 1, 2];
foo(...args);
```

## Array Assignment

```js
var list = [1, 2];
list = [...list, 3, 4];
console.log(list); // [1, 2, 3, 4]
```

## Object Spread

```js
const point2D = {x: 1, y: 2};
/** Create a new object by using all the point2D props along with z */
const point3D = {...point2D, z: 3};
```

Note: The order of the spread matters!

```js
const point2D = {x: 1, y: 2};
const anotherPoint3D = {x: 5, z: 4, ...point2D};
console.log(anotherPoint3D); // {x: 1, y: 2, z: 4}
const yetAnotherPoint3D = {...point2D, x: 5, z: 4}
console.log(yetAnotherPoint3D); // {x: 5, y: 2, z: 4}
```

Shallow Extend:

```js
const foo = {a: 1, b: 2, c: 0};
const bar = {c: 1, d: 2};
/** Merge foo and bar */
const fooBar = {...foo, ...bar};
// fooBar is now {a: 1, b: 2, c: 1, d: 2}
```

## Rest Parameters

denoted by `...argumentName`

```js
function iTakeItAll(first, second, ...allOthers) {
    console.log(allOthers);
}
iTakeItAll('foo', 'bar'); // []
iTakeItAll('foo', 'bar', 'bas', 'qux'); // ['bas','qux']
```

