# ByteDance

## 1st Round

### Coding

1. implement findMax() function to find maximum value from an array

   Followup: findSecondMax()

   Followup: findKthMax()

2. implement add() function such that:

   ```JavaScript
   add(2,3,4) // 9
   add(2,3)(4) // 9
   add(2)(3)(4) // 9
   ```

### Knowledge

1. principle of i18n

   how to do i18n for a text like: "我们用4种语言翻译了50篇文章"

2. difference between `for ... of` and `for ... in`

3. promise

   when will the 4 callbacks be executed

   ```JavaScript
   ajax().then(() => {
     // a
   }, () => {
     // b
   }).catch(() => {
     // c
   }).then(() => {
     // d
   })
   ```

4. css

   ```html
   <div class="box box1">1</div>
   <div class="box box2">2</div>
   ```

   ```css
   .box {
     background-color: red;
     width: 100px;
     height: 100px;
     padding: 20px 30px 40px;
     margin: 10px 20px 30px;
   }
   ```

   how will the 2 boxes be displayed? inline? or in different lines?

   what is the area of each box?

   what is the vertical margin within 2 boxes?

5. How to implement a layout like this

   ```
   | HEADER                    |
   | C1  |  C2           | C3  |
   | FOOTER                    |
   ```

6. articulate the process after we enter a URL in a browser

7. vue

   how does a `computed` property capture the update of its dependencies?

   ```jsx
   data() {
   		return {
         	a: 1,
         	b: 2,
       }
   },
   computed: {
     	sum() {
         	return this.a + this.b;
       }
   }
   
   // somewhere else
   this.a = 10;
   this.b = 5;
   ```

   

## 2nd Round

### Project

* UI Component Library
* Snow Visualization

### Coding

* Leetcode 121. Best Time to Buy and Sell Stock
  
  * I did it directly in O(n) right after articulating the O(n ** 2) solution
  
* Articulate principle of Qsort, and analyze time complexity

* JavaScript

  ```js
  // implement a function
  function singlePipe(promiseFunc) {
  		// TODO
  }
  
  function promiseFunc(data) {
    	return new Promise((resolve) => {
        	setTimeout((data) => {
            	resolve(data);
          }, 1000);
      });
  }
  
  let request = singlePipe(promiseFunc);
  request(1).then((data) => {console.log(data)}); // 1
  request(2).then((data) => {console.log(data)}); // nothing
  setTimeout(() => {
    	request(3).then((data) => {console.log(data)});
  }, 1000);																			 // 3
  ```


### CSS

* `transition` vs `animation` -> simple vs complex
* how to add a displacement to an element
  * Diff: `transform` vs `left`, why? -> browser rendering process
* how to center an element -> flex / margin

### js

* how to add an event to an element in js ? -> dom.addEventListener('event', handler) / dom.onclick = handler / eventbus

  * Difference? -> override
    * Any more? -> don't know

* Asynchronicity
  ```js
  // problem 1
  console.log(111);
  (async () => {
  		console.log(222);
  		resolve();
  		console.log(333);
  })();
  console.log(444);
  
  // problem 2
  console.log(111);
  setTimeout(() => {
    	console.log(555);
  }, 0);
  (async () => {
  		console.log(222);
  		await resolve();
  		console.log(333);
  })();
  console.log(444);
  
  // problem 3
  console.log(111);
  setTimeout(() => {
    	console.log(555);
  }, 0);
  throw new Error('');
  (async () => {
  		console.log(222);
  		resolve();
  		console.log(333);
  })();
  console.log(444);
  ```

* js event loop?

  * `microtask` vs `macrotask`

* this 
  ```js
  function O (age) {
  		this.age = age;
  }
  
  var o = new O(1);
  var age = 3;
  setTimeout(() => {
  		age = 4;
  		O(5);
  		console.log(o.age, age); // 1, 5
  })
  ```

