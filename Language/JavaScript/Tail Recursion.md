# Tail Recursion

* Iterative
  ```JavaScript
  function repeat(func) {
      while (func() !== undefined) {
    }
  }
  ```
  
* Recursive

  ```JavaScript
  function repeat(func) {
      if (func() !== undefined) {
          return repeat(func);
      }
  }
  ```
  
  Note: 
  
  ​	In ES5, `while loop`  runs much faster
  
  ​	In ES6, `tail recursion` and `while loop` have the same performance

