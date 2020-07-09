# Ajax

## What is Ajax

Ajax (Asynchronous JavaScript and XML) describes a new approach to using a number of existing technologies together, including HTML or XHTML, CSS, JavaScript, DOM, [XML](https://www.w3schools.com/xml/xml_whatis.asp), XSLT and most importantly the XMLHttpRequest object.

It can communicate with the server, exchange data, and update the page without having to refresh the page.

## Major features:

* Make requests to the server without reloading the page
* Receive and work with data from the server

## Promise

fetch / ajax / axios

* `ajax`

  ```JavaScript
  $.ajax({
      type: 'POST',
      url: url,
      data: data,
      dataType: dataType,
      success: function () {},
      error: function () {}
  });
  ```

  Cons:

  * Tend to be vulnerable to `CSRF` attacks and `XSS` attacks
  * Based on **XMLHttpRequest**, whose architecture design is kind of vague
  * jQuery project too large, but we only need ajax here, other resources are redundant

* `fetch`

  fetch发送post请求的时候，总是发送2次，第一次状态码是204，第二次才成功？

  原因很简单，因为你用fetch的post请求的时候，导致fetch第一次发送了一个Options请求，询问服务器是否支持修改的请求头，如果服务器支持，则在第二次中发送真正的请求。
  
  ```JavaScript
  try {
      let response = await fetch(url);
      let data = response.json();
      console.log(data);
  } catch(e) {
    	console.log("Oops, error", e);
  }
  ```
  
  Pros:
  
  * Much simpler than `ajax`
  * Not based on **XMLHttpRequest**
  * 符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里
  
  Cons:
  
  - fetch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理
  - fetch默认不会带cookie，需要添加配置项
  - fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了量的浪费
  - fetch没有办法原生监测请求的进度，而XHR可以。
  
* `axios`

  ```JavaScript
  // post request
  axios({
      method: 'post',
      url: 'https://jsonplaceholder.typicode.com/todos',
      data: {
          title: 'New Todo',
          completed: false
      }
  })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  
  // an easier way
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    	title: "New Todo",
    	completed: false
  })
  		.then(res => console.log(res))
      .catch(err => console.error(err));
  ```
  ```JavaScript
  // post request
  axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/todos',
      params: {
          _limit: 5
      }
  })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  
  // an easier way
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(res => console.log(res))
      .catch(err => console.error(err));
  
  // or: (since default method is 'get')
  axios('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(res => console.log(res))
      .catch(err => console.error(err));
  ```

  ```JavaScript
  // simultaneous requests
  function getData() {
    	axios.all([
        	axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        	axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
      ])
        .then(axios.spread((todos, posts) => console.log(posts)))
        .catch(err => console.error(err));
  }
  ```

  ```JavaScript
  // interceptors
  axios.interceptors.request.use(config => {
    	console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`)
  })
  ```

  ```JavaScript
  // custom header
  function customHeaders() {
    	const config = {
        	headers: {
            	'Content-Type': 'application/json',
            	Authorization: 'sometoken'
          }
      };
    
    	axios.post('https://jsonplaceholder.typicode.com/todos', {
        	title: 'New Todo',
        	completed: false
      }, config)
    		.then(res => console.log(res))
        .catch(err => console.error(err));
  }
  ```

  ```JavaScript
  // transform requests & responses
  function transformResponse() {
      const options = {
          method: 'post',
          url: 'https://jsonplaceholder.typicode.com/todos',
          data: {
            	title: 'Hello World'
          },
          transformResponse: axios.defaults.transformResponse.concat(data => {
              data.title = data.title.toUpperCase();
              return data;
          })
      };
  
    	axios(options).then(res => showOutput(res));
  }
  ```

  ```JavaScript
  // cancel requests
  function cancelToken() {
      const source = axios.CancelToken.source();
  
      axios
        	.get('https://jsonplaceholder.typicode.com/todos', {
          		cancelToken: source.token
        	})
        	.then(res => showOutput(res))
        	.catch(thrown => {
              if (axios.isCancel(thrown)) {
                	console.log('Request canceled', thrown.message);
              }
        	});
  		
    	// if somehow we want to cancle the request
      if (true) {
        	source.cancel('Request canceled!');
      }
  }
  ```

  

  Pros:

  - Supported Promise API
  - Provided interfaces to `simultaneous requests`
  - Provided `interceptors` to intercept requests and responses
  - Provided interface for `custom headers`
  - Transform requests and responses
  - Cancel requests
  - Set timeout for requests
  - Adaptivity:
    - Use XMLHttpRequests in browser
    - Use http request in node.js
  - Implemented defense of CSRF from client side
  - Implemented defense of SSRF from client side







### Reference

https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started

https://www.w3schools.com/xml/xml_whatis.asp

https://segmentfault.com/a/1190000012836882

https://zhuanlan.zhihu.com/p/58062212

https://github.com/bradtraversy/axios-crash/blob/master/main.js