# Destructure

- Object Destructuring
- Array Destructuring

## Object Destructuring

```js
var rect = { x: 0, y: 10, width: 15, height: 20 };

// Destructuring assignment
var {x, y, width, height} = rect;
console.log(x, y, width, height); // 0,10,15,20

rect.x = 10;
({x, y, width, height} = rect); 	// assign to existing variables using outer parentheses
console.log(x, y, width, height); // 10,10,15,20
```

To assign an extracted variable to a new variable name:

```js
// structure
const obj = {"some property": "some value"};

// destructure
const {"some property": someProperty} = obj;
console.log(someProperty === "some value"); // true
```

Get deep data:

```js
var foo = { bar: { bas: 123 } };
var {bar: {bas}} = foo; // Effectively `var bas = foo.bar.bas;`
```

Object Destructuring w./ `rest`:

```js
var {w, x, ...remaining} = {w: 1, x: 2, y: 3, z: 4};
console.log(w, x, remaining); // 1, 2, {y: 3, z: 4}
```

Common use case is to **ignore certain properties**:

```js
// Example function
function goto(point2D: {x: number, y: number}) {
    // Imagine some code that might break
    // if you pass in an object
    // with more items than desired
}
// Some point you get from somewhere
const point3D = {x: 1, y: 2, z: 3};
/** A nifty use of rest to remove extra properties */
const { z, ...point2D } = point3D;
goto(point2D);
```

## Array Destructuring

How to swap 2 variables without using a 3rd one?

```js
var x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2, 1
```

Array Destructuring w./ `rest`:

```js
var [x, y, ...remaining] = [1, 2, 3, 4];
console.log(x, y, remaining); // 1, 2, [3,4]
```

Array Destructuring w./ `ignores`:

```js
var [x, , ...remaining] = [1, 2, 3, 4];
console.log(x, remaining); // 1, [3,4]
```

JS Generation:

```typescript
// ts
var x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2,1
```

```js
// generated js
var x = 1, y = 2;
_a = [y,x], x = _a[0], y = _a[1];
console.log(x, y);
var _a;
```

