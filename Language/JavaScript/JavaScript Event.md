# JavaScript Events

* **Event**

  Events are actions or occurrences that happen in the system you are programming, which the system tells you about so you can respond to them in some way if desired. For example, if the user clicks a button on a webpage, you might want to respond to that action by displaying an information box.

  In the case of the Web, events are fired inside the browser window, and tend to be attached to a specific item that resides in it — this might be a single element, set of elements, the HTML document loaded in the current tab, or the entire browser window.

* **Event Handler**

  Each available event has an **event handler**, which is a block of code (usually a JavaScript function that you as a programmer create) that will be run when the event fires.

* **3 ways to register an event handler**

  1. Inline attribute `on---` (**not recommended**)
     ```jsx
     // index.html
     <button onclick="changeBkgColor()">Change Color</button>
     
     // index.js
     function random(number) {
       	return Math.floor(Math.random() * (number+1));
     }
     
     function changeBkgColor() {
         const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
         document.body.style.backgroundColor = rndCol;
     }
     ```
     
  2. Assign to element's corresponding property

     ```JavaScript
     const btn = document.querySelector('button');
     
     function random(number) {
       	return Math.floor(Math.random() * (number+1));
     }
     
     btn.onclick = function() {
         const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
         document.body.style.backgroundColor = rndCol;
     }
     ```
     
  3. addEventListener()

    ```JavaScript
    const btn = document.querySelector('button');
    
    function random(number) {
      	return Math.floor(Math.random() * (number+1));
    }
    
    function changeBkgColor() {
        const rndCol = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
        document.body.style.backgroundColor = rndCol;
    }
    btn.addEventListener('click', changeBkgColor, false);
    ```

* **Event Propagation**

  [Demo](https://mdn.github.io/learning-area/javascript/building-blocks/events/show-video-box.html)

  When an event is fired on an element that has parent elements (in this case, the [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) has the [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) as a parent), modern browsers run two different phases — the **capturing** phase and the **bubbling** phase.

  ```jsx
  // index.html
  <button>Display video</button>
  
  <div class="hidden">
      <video>
          <source src="rabbit320.mp4" type="video/mp4">
          <source src="rabbit320.webm" type="video/webm">
          <p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.mp4">link to the video</a> instead.</p>
      </video>
  </div>
  
  // index.js
  btn.onclick = function() {
    	videoBox.setAttribute('class', 'showing');
  }
  
  videoBox.onclick = function() {
    	videoBox.setAttribute('class', 'hidden');
  };
  
  video.onclick = function() {
    	video.play();
  };
  ```

   * **Event Capture**

     The browser checks to see if the element's outer-most ancestor ([`<html>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html)) has an `onclick` event handler registered on it for the capturing phase, and runs it if so.

     Then it moves on to the next element inside `<html>` and does the same thing, then the next one, and so on until it reaches the element that was actually clicked on.

   * **Event Bubbling**

     The browser checks to see if the element that was actually clicked on has an `onclick` event handler registered on it for the bubbling phase, and runs it if so.

     Then it moves on to the next immediate ancestor element and does the same thing, then the next one, and so on until it reaches the `<html>` element.

   Note: 

  1. Most modern browsers register event handlers in the **bubbling phase** by default.

  2. If both types of event handlers are present, capturing and bubbling, **capturing first, bubbling next**

     ```JavaScript
     // set the optional 3rd argument to be 'true' to register a capturing phase event
     element.addEventListener('event', callback, true)
     ```

* **Event Delegation**

  [Demo](https://codepen.io/frostace/pen/RwrZEpe)

  Bubbling also allows us to take advantage of **event delegation** — this concept relies on the fact that if you want some code to run when you click on any one of a large number of child elements, you can set the event listener on their parent and have events that happen on them bubble up to their parent rather than having to set the event listener on every child individually. Remember earlier that we said bubbling involves checking the element the event is fired on for an event handler first, then moving up to the element's parent, etc.?

  ```jsx
  <ul id="5">
    	<li id="1">option 1</li>
      <li id="2">option 2</li>
      <li id="3">option 3</li>
      <li id="4">option 4</li>
  </ul>
  
  function onClick(e) {
    	if (e.target.matches('UL')) return;
    	console.log(e.target.innerHTML);
  }
  
  // instead of:
  document.getElementById('1').addEventListener('click', onClick);
  document.getElementById('2').addEventListener('click', onClick);
  document.getElementById('3').addEventListener('click', onClick);
  document.getElementById('4').addEventListener('click', onClick);
  
  // we can do:
  document.getElementById('5').addEventListener('click', onClick);
  ```

**Aside**: 

1. Use `event.preventDefault()` to prevent default behavior of an event if it's triggered.
  
2. Use `event.stopPropagation()` to prevent the event bubbling up the chain so that only the exact handler residing on the element where the event is triggered will be run.
  
```JavaScript
    video.onclick = function(e) {
    e.stopPropagation();
    video.play();
    };
```

3. Use `event.stopImmediatePropagation()` to prevent event handlers other than the 1st handler to be triggered.

