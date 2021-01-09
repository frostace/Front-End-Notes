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

## Limitations of `for ... of`

If you are not targeting ES6 or above, the generated code assumes the property `length` exists on the object and that the object can be indexed via numbers e.g. `obj[2]`. So it is only supported on `string` and `array` for these legacy DOM engines.

**Q**: what does it mean by **if you are not targeting ES6 or above**

**Q**: what is the diff. between `Legacy DOM` and `Modern DOM`

- `Legacy DOM`: (old / outdated DOM engine)

  ```js
  var table = document.getElementById("score");
  var groups = table.tBodies;
  var rows = null;
  var cells = [];

  for (var i = 0; i < groups.length; i++) {
      rows = groups[i].rows;
      for (var j = 0; j < rows.length; j++) {
        	cells.push(rows[j].cells[1]);
      }
  }
  ```

- `Modern DOM`:

  ```js
var cells = document.querySelectorAll("#score>tbody>tr>td:nth-of-type(2)");
  ```

  ||Speed|
  |---|---|
  |`getElementById`|0.00095s / query|
  |`querySelector`|0.00275 s / query|
  |`jQuery`|0.00340 s / query|
  
  Experiment
  
  ```html
  <div id="score">test</div>
  <div id="score1">test</div>
  <!-- ... -->
  ```
  
  ```js
  let totalTime = 0;
  for (let i = 0; i < 100; i++) {
  	let startTime = performance.now();
  	document.getElementById("score");
  	let endTime = performance.now();
  	totalTime += endTime - startTime;
  }
  console.log(totalTime / 100);
  // 0.0009499999941908754
  ```
  
  ```js
  let totalTime = 0;
  for (let i = 0; i < 100; i++) {
  	let startTime = performance.now();
  	document.querySelector("#score");
  	let endTime = performance.now();
  	totalTime += endTime - startTime;
  }
  console.log(totalTime / 100);
  // 0.002749999985098839
  ```
  
  ```js
  let totalTime = 0;
  for (let i = 0; i < 100; i++) {
  	let startTime = performance.now();
  	$("#score");
  	let endTime = performance.now();
  	totalTime += endTime - startTime;
  }
  console.log(totalTime / 100);
  // 0.0033999999868683517
  ```
  
  

## Conclusion

|                                                              | Pros                                           | Cons                                                         |
| ------------------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------ |
| `Array.prototype.forEach`                                    | syntax is simpler than the naive for loop way  | cannot break out of an ongoing loop                          |
| `for ... in`<br />Iterate over `enumerable properties`       | better syntax<br />can break out of the loop   | key is `string`<br />will iterate through manually added keys and keys on the prototype chain |
| `for ... of`<br />Iterate over `values` that the `iterable object` defines to be iterated over | key is `number`<br />can break out of the loop | /                                                            |
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

5. show difference

   ```js
   Object.prototype.objCustom = function() {};
   Array.prototype.arrCustom = function() {};
   
   const iterable = [3, 5, 7];
   iterable.foo = 'hello';
   
   for (const i in iterable) {
     	console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
   }
   
   for (const i in iterable) {
       if (iterable.hasOwnProperty(i)) {
         	console.log(i); // logs 0, 1, 2, "foo"
       }
   }
   
   for (const i of iterable) {
     	console.log(i); // logs 3, 5, 7
   }
   ```

   

## Reference

https://stackoverflow.com/questions/15338228/what-is-and-what-is-the-biggest-difference-between-legacy-javascript-and-javascr

https://stackoverflow.com/questions/21694002/legacy-javascript-dom-vs-modern-javascript-dom-vs-jquery-dom

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of