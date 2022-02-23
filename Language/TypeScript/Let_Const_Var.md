# Let Const Var

## Let

### Replace `let` with `var`

```typescript
// ts
if (true) {
    let foo = 123;
}
```
```js
// generated js
if (true) {
    var foo = 123;
}
```

### Rename variables already taken

```typescript
// ts
var foo = '123';
if (true) {
    let foo = 123;
}
```

```js
// generated js
var foo = '123';
if (true) {
    var foo_1 = 123; // Renamed
}
```

### `let` in closure

```js
var funcs = [];
// create a bunch of functions
for (var i = 0; i < 3; i++) {
    funcs.push(function() {
        console.log(i);
    })
}
// call them
for (var j = 0; j < 3; j++) {
    funcs[j]();
}
// 3 3 3
```
Use `IIFE` to create a new variable scope to fix this issue:

```js
var funcs = [];
// create a bunch of functions
for (var i = 0; i < 3; i++) {
    (function() {
        var local = i;
        funcs.push(function() {
            console.log(local);
        })
    })();
}
// call them
for (var j = 0; j < 3; j++) {
    funcs[j]();
}
```

Or use `let` to fix it:

```js
var funcs = [];
// create a bunch of functions
for (let i = 0; i < 3; i++) { // Note the use of let
    funcs.push(function() {
        console.log(i);
    })
}
// call them
for (var j = 0; j < 3; j++) {
    funcs[j]();
}
```

## Const

### Init

```js
const foo; // ERROR: const declarations must be initialized
```

### Immutability

```js
const foo = 123;
foo = 456; // ERROR: Left-hand side of an assignment expression cannot be a constant
```

### Deep Immutability

```js
const foo = { bar: 123 };
foo.bar = 456; // Allowed!
console.log(foo); // { bar: 456 }
```



## Conclusion

<table>
    <thead>
        <tr>
            <th colspan=2></th>
          	<th>let</th>
            <th>const</th>
            <th>var</th>
        </tr>
    </thead>
    <tbody>
        <tr> <!-- row1 -->
            <td rowspan=3>Scope</td>
            <td>Block Scope</td>
            <td>✓</td>
          	<td>✓</td>
          	<td>x</td>
        </tr>
        <tr> <!-- row2 -->
            <td>Function Scope</td>
            <td>✓</td>
          	<td>✓</td>
          	<td>✓</td>
        </tr>
        <tr> <!-- row3 -->
            <td>Global Scope</td>
            <td>✓</td>
          	<td>✓</td>
          	<td>✓</td>
        </tr>
        <tr> <!-- row4 -->
            <td rowspan=2>Immutability</td>
          	<td>Shallow Immutability</td>
          	<td>x</td>
          	<td>✓</td>
          	<td>x</td>
        </tr>
      	<tr> <!-- row5 -->
            <td>Deep Immutability</td>
          	<td>x</td>
          	<td>x</td>
          	<td>x</td>
        </tr>
    </tbody>
</table>




