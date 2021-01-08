# Loop

diff `for ... in` and `for ... of`:

`for ... in` gives keys (here indices)

```js
var someArray = [9, 2, 5];
for (var item in someArray) {
    console.log(item); // 0, 1, 2
}
```

`for ... of` gives elements

```js
// ts
var someArray = [9, 2, 5];
for (var item of someArray) {
    console.log(item); // 9, 2, 5
}
```

```js
// generated js
for (var _i = 0; _i < someArray.length; _i++) {
    var item = someArray[_i];
    console.log(item);
}
```

**Note**: If I replace `var` with `let` here, the `generated js` would remain the same as `ts`.

Iterate through a `string`

```js
let hello = "is it me you're looking for?";
for (let char of hello) {
    console.log(char); // is it me you're looking for?
}
```

## Limitations

only supported on `string` and `array`

If you are not targeting ES6 or above, the generated code assumes the property `length` exists on the object and that the object can be indexed via numbers e.g. `obj[2]`. So it is only supported on `string` and `array` for these legacy JS engines.

**Q**: what does it mean by **if you are not targeting ES6 or above**

**Q**: what is the diff. between `legacy JS` and `JS`

|                           | Pros                                           | Cons                                                         |
| ------------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| `Array.prototype.forEach` | syntax is simpler than the naive for loop way  | cannot break out of an ongoing loop                          |
| `for ... in`              | better syntax<br />can break out of the loop   | key is `string`<br />will iterate through manually added keys and keys on the prototype chain |
| `for ... of`              | key is `number`<br />can break out of the loop | /                                                            |
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