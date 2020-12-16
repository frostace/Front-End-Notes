# Frontend Performance Optimization

## HTTP

* Reduce Request Numbers
  * Minimize # HTTP requests
  * Merge remote resources so that one request can get multiple resources
  * Avoid redirecting
  * Caching
  
* Speed up Request Process

  * `dns-prefetch`

    When a browser requests a resource from a (third party) server, that [cross-origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)’s domain name must be resolved to an IP address before the browser can issue the request. This process is known as DNS resolution. While DNS caching can help to reduce this latency, DNS resolution can add significant latency to requests. For websites that open connections to many third parties, this latency can significantly reduce loading performance.

    ```html
    <link rel="dns-prefetch" href="https://fonts.gstatic.com/" >
    ```

    1. only for `cross-origin` domains, since same-site domains will have already been resolved by the time this hint is seen

    2. can specify `dns-prefetch` as HTTP header

       ```http
       ...
       Link: <https://fonts.gstatic.com/>; rel=dns-prefetch
       ```

    3. consider `dns-prefetch` with `preconnect` hint, which will establish the TCP connection (TLS handshake) as well

       ```html
       <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
       <link rel="dns-prefetch" href="https://fonts.gstatic.com/">
       ```
       
    
  * minimize domain numbers to minimize DNS lookups

## Static Assets

* Compression

  1. Any type 

     gzip:

  ```http
  GET https://jsonplaceholder.typicode.com/todos HTTP/1.0
  ...: ...
  Accept-Encoding: gzip, deflate
  ```

  ```http
  HTTP/1.0 200 OK
  ...: ...
  Content-Encoding: gzip
  
  // or 
  Content-Encoding: compress
  Content-Encoding: deflate
  ```

  2. JS code 

     minify / uglify

  ```JavaScript
  // original
  $(window).on(
      "scroll",
      throttle(function () {
          console.log("scroll");
          let pageHeight = $("body").height(),
              scrollTop = $(window).scrollTop(),
              winHeight = $(window).height(),
              thresold = pageHeight - scrollTop - winHeight;
          if (thresold > -100 && thresold <= 20) {
              console.log("end");
          }
      })
  );
  
  function throttle(fn, interval = 300) {
      let canRun = true;
      return function () {
          if (!canRun) return;
          canRun = false;
          fn.apply(this, arguments);
          setTimeout(() => {
              canRun = true;
          }, interval);
      };
  }
  ```

  ```JavaScript
  // uglified
  function throttle(o,t=300){let l=!0;return function(){l&&(l=!1,o.apply(this,arguments),setTimeout(()=>{l=!0},t))}}$(window).on("scroll",throttle(function(){console.log("scroll");let o=$("body").height()-$(window).scrollTop()-$(window).height();o>-100&&o<=20&&console.log("end")}));
  ```

  3. image

     * webp / Moz_JPEG

     * responsive image

       **Use `srcset` attribute**

       ```html
       <img srcset="elva-fairy-320w.jpg 320w,
                    elva-fairy-480w.jpg 480w,
                    elva-fairy-800w.jpg 800w"
            sizes="(max-width: 320px) 280px,
                   (max-width: 480px) 440px,
                   800px"
            src="elva-fairy-800w.jpg" 
            alt="Elva dressed as a fairy">
       ```

       1. Look at its device width.
       2. Work out which media condition in the `sizes` list is the first one to be true.
       3. Look at the slot size given to that media query.
       4. Load the image referenced in the `srcset` list that has the same size as the slot or, if there isn't one, the first image that is bigger than the chosen slot size.

       **Switch Resolution**

       ```html
       <img srcset="elva-fairy-320w.jpg,
                    elva-fairy-480w.jpg 1.5x,
                    elva-fairy-640w.jpg 2x"
            src="elva-fairy-640w.jpg"
            alt="Elva dressed as a fairy">
       ```

       **Use `picture` element**
       
       ```html
       <picture>
           <source media="(max-width: 799px)" srcset="elva-480w-close-portrait.jpg">
           <source media="(min-width: 800px)" srcset="elva-800w.jpg">
           <img src="elva-800w.jpg" alt="Chris standing up holding his daughter Elva">
       </picture>
       ```

* lazyload

  Mainly for images

  1. Set `data-src` attribute, when the viewport is scrolled down to the height of this image, substitute whatever is in `data-src` with `src`

     ```jsx
     <img src="images/loading.gif" data-src="images/1.png">
     <img src="images/loading.gif" data-src="images/2.png">
     <img src="images/loading.gif" data-src="images/3.png">
     <img src="images/loading.gif" data-src="images/4.png">
     ...
     
     {
         function lazyload() {
             let images = document.getElementsByTagName('img');
             let len    = images.length;
             let n      = 0;      // maintain idx of img loaded
             return function() {
                 let seeHeight = document.documentElement.clientHeight;
                 let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                 for (let i = n; i < len; i++) {
                     if (images[i].offsetTop < seeHeight + scrollTop) {
                         if (images[i].getAttribute('src') === 'images/loading.gif') {
                             images[i].src = images[i].getAttribute('data-src');
                         }
                         n = n + 1;
                     }
                 }
             }
         }
         let loadImages = lazyload();
         loadImages();          // load images within initial viewport
         window.addEventListener('scroll', loadImages, false);
     }
     ```

  2. add `throttle` for the `lazyload()` function

     ```jsx
     <img src="images/loading.gif" data-src="images/1.png">
     <img src="images/loading.gif" data-src="images/2.png">
     <img src="images/loading.gif" data-src="images/3.png">
     <img src="images/loading.gif" data-src="images/4.png">
     ...
     
     {
       	function throttle(fn, interval = 300) {
             let canRun = true;
             return function () {
                 if (!canRun) return;
                 canRun = false;
                 fn.apply(this, arguments);
                 setTimeout(() => {
                     canRun = true;
                 }, interval);
             };
         }
     
       	function lazyload() {
             let images = document.getElementsByTagName('img');
             let len    = images.length;
             let n      = 0;      // maintain idx of img loaded
             return function() {
                 let seeHeight = document.documentElement.clientHeight;
                 let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                 for (let i = n; i < len; i++) {
                     if(images[i].offsetTop < seeHeight + scrollTop) {
                         if (images[i].getAttribute('src') === 'images/loading.gif') {
                             images[i].src = images[i].getAttribute('data-src');
                         }
                         n = n + 1;
                     }
                 }
             }
         }
         let loadImages = lazyload();
         loadImages();          // load images within initial viewport
         window.addEventListener('scroll', throttle(loadImages, 300), false);
     }
     ```

* Caching

  * Use CDN service
  * HTTP caching
    * (`Expires`, `Cache-Control`)
    * (`Etag`, `If-None-Match`, `Last-Modified`, `If-Modified-Since` )

## Rendering

* CSS / JS optimization (see also: [Relayout and Repaint](./Browser/Reflow%20Repaint.md))

  * GPU boosting
  * requestAnimationFrame

* Server Side Rendering

* [Pipelining](https://zhuanlan.zhihu.com/p/61949898)

* Script Loading

  * priority

    Normally we should place our `<script>` tag at the end of the html file to prevent blocking

  * Asynchronous loading

    * `defer`: execute script after rendering finished
    * `async`: execute script right after downloading



### Reference

gzip: https://segmentfault.com/a/1190000012800222

minify: https://www.minifier.org/

uglify: https://skalman.github.io/UglifyJS-online/

responsive image: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

lazyload: https://zhuanlan.zhihu.com/p/25455672

HTTP caching: https://zhuanlan.zhihu.com/p/44789005, https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ

gpu pipelining: https://zhuanlan.zhihu.com/p/61949898

dns-prefetch: https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch, https://github.com/amandakelake/blog/issues/50