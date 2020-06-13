# Node

## 0. What is Node?

* JavaScript Runtime (NOT a language or a framework)
* Built on the V8 JavaScript engine (same as Google Chrome)
* Written in C++
* Essentially allows us to run JavaScript code on the server

## 1. Why Node?

* Fast, efficient and highly scalable
* Event driven, non-blocking I/O model
* Popular in the industry
* Same language on the front end and back end (JS)

### Non-Blocking I/O

* Works on a single thread using non-blocking I/O calls
* Supports tens of thousands concurrent connections
* Optimizes throughput & scalability in apps with many I/O operations
* All of this makes Node.js apps very fast & efficient

 ### Event Loop

* Single threaded
* Supports concurrency via events & callbacks
* EventEmitter class is used to bind events and listeners

![image-20200612192650667](/Users/frostace/Library/Application Support/typora-user-images/image-20200612192650667.png)

### Scenarios to use Node

* REST API & Microservices
* Real Time Services (Chat, Live Updates)
* CRUD Apps - Blogs, Shopping Carts, Social Networks
* Tools & Utilities

** Anything that is not CPU intensive **



## 2. Node Modules
### NPM - Node Package Manager

* Install 3rd party packages (frameworks, libraries, tools, etc.)
* Packages get stored in the "node_modules" folder
* All dependencies are listed in a "package.json" file
* NPM scripts can be created to run certain tasks such as run a server

### What are Node Modules

* Node core modules (path, fs, http, etc.)
* 3rd party modules/packages installed via NPM
* custom modules (files)

### Node module example

```JavaScript
const path = require('path');
const myFile = require('./myFile');
```

```JavaScript
// Module Wrapper Function - everything written inside a js script is implicitly wrapped inside a module wrapper function
/* (function (exports, require, module, __filename, __dirname) {
  	
}) */
```

```JavaScript
// person.js
console.log(__dirname, __filename); // this works

class Person {
  	constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greeting() {
        console.log(`My name is ${this.name} and I am ${this.age}`);
    }
}

module.exports = {
    Person,
};
```

```JavaScript
// index.js
const { Person } = require("./person"); // commonjs

const person1 = new Person("John Doe", 30);
person1.greeting();
```

### path module

```JavaScript
const path = require("path");

// base file name
console.log(path.basename(__filename));

// directory name
console.log(path.dirname(__filename));

// file extension
console.log(path.extname(__filename));

// create path object, access base (basename)
console.log(path.parse(__filename).base);

// concatenate paths
console.log(path.join(__dirname, "test", "hello.html"));
```

### fs Module

```JavaScript
const fs = require("fs");
const path = require("path");
```

```JavaScript
// create folder
fs.mkdir(path.join(__dirname, "/test"), {}, (err) => {
    if (err) throw err;
    console.log("Folder created...");
});
```

```JavaScript
// create and write to file
fs.writeFile(
    path.join(__dirname, "/test", "hello.txt"),
    "Hello World!",
    (err) => {
        if (err) throw err;
        console.log("File written to...");

        // file append
        fs.appendFile(
            path.join(__dirname, "/test", "hello.txt"),
            " I love Node.js",
            (err) => {
                if (err) throw err;
                console.log("File written to...");
            }
        );
    }
);
```

```JavaScript
// read file
fs.readFile(
    path.join(__dirname, "/test", "hello.txt"),
    "utf-8",
    (err, data) => {
        if (err) throw err;
        console.log(data);
    }
);
```

```JavaScript
// rename file
fs.rename(
    path.join(__dirname, "/test", "hello.txt"),
    path.join(__dirname, "/test", "helloworld.txt"),
    (err, data) => {
        if (err) throw err;
        console.log("File renamed...");
    }
);
```

### os Module

```JavaScript
const os = require("os");

// platform
console.log(os.platform());

// CPU Arch
console.log(os.arch());

// CPU Core Info
console.log(os.cpus());

// free memory
console.log(os.freemem());

// total memory
console.log(os.totalmem());

// home dir
console.log(os.homedir());

// uptime
console.log(os.uptime());
```

### url module

```JavaScript
const url = require("url");

const myUrl = new URL(
    "http://mywebsite.com:8000/hello.html?id=100&status=active"
);

// serialized URL
console.log(myUrl.href);
console.log(myUrl.toString()); // same thing

// host (root domain)
console.log(myUrl.host);

// hostname (does not include port)
console.log(myUrl.hostname);

// pathname
console.log(myUrl.pathname);

// serialized query
console.log(myUrl.search);

// params object
console.log(myUrl.searchParams);

// add param
myUrl.searchParams.append("abc", "123");
console.log(myUrl.searchParams);

// loop through params
myUrl.searchParams.forEach((value, name) => {
    console.log(`${name}: ${value}`);
});
// http://mywebsite.com:8000/hello.html?id=100&status=active
// http://mywebsite.com:8000/hello.html?id=100&status=active
// mywebsite.com:8000
// mywebsite.com
// /hello.html
// ?id=100&status=active
// URLSearchParams { 'id' => '100', 'status' => 'active' }
// URLSearchParams { 'id' => '100', 'status' => 'active', 'abc' => '123' }
// id: 100
// status: active
// abc: 123
```

## 3. Node Events

```JavaScript
const EventEmitter = require("events");

// create class
class MyEmitter extends EventEmitter {}

// init object
const myEmitter = new MyEmitter();

// event listener
myEmitter.on("event", () => {
    console.log("event fired!");
});

// init event
myEmitter.emit("event");
myEmitter.emit("event");
myEmitter.emit("event");
// event fired!
// event fired!
// event fired!
```

#### create an event logger with node events

```JavaScript
// logger.js
const EventEmitter = require("events");
const uuid = require("uuid");

console.log(uuid.v4());

class Logger extends EventEmitter {
    log(msg) {
        // call event
        this.emit("message", { id: uuid.v4(), msg });
    }
}

module.exports = {
    Logger,
};
```

```JavaScript
// index.js
const { Logger } = require("./logger");

const logger = new Logger();
logger.on("message", (data) => console.log(`called listener: `, data));

logger.log("Hello World");
logger.log("Hi");
logger.log("Hello");
// called listener:  { id: 'a8c49a67-f772-4d3c-9dc2-03feb198eefb', msg: 'Hello World' }
// called listener:  { id: 'e2ba41de-8867-4843-a0b5-b8c897fec75d', msg: 'Hi' }
// called listener:  { id: '4e250939-9413-457d-b314-776190b5823b', msg: 'Hello' }
```

## 4. http module

```JavaScript
// http_demo.js
const http = require("http");

// create a server object
http.createServer((request, response) => {
    response.write("Hello World");
    response.end();
}).listen(5000, () => {
    console.log("server running...");
});

// open localhost:5000 to see the website with plain text "Hello World"
```

Let's say we would like to handle requests for different paths:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome</title>
    </head>
    <body>
        <h1>Welcome to the homepage</h1>
    </body>
</html>
```

```html
<!-- about.html -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>About</title>
    </head>
    <body>
        <h1>About</h1>
    </body>
</html>
```

```html
<!-- 404.html -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Not Found</title>
    </head>
    <body>
        <h1>404 Not Found</h1>
    </body>
</html>
```

```JavaScript
// index.js
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        // this is the index page
        fs.readFile(
            path.join(__dirname, "public", "index.html"),
            (err, content) => {
                if (err) throw err;
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(content);
            }
        );
    }

    if (req.url === "/api/users") {
        // this is to handle json data request
        const users = [
            { name: "Bob Smith", age: 40 },
            { name: "John Doe", age: 30 },
        ];
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(users));
    }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
```



This is a hardcoded server handling requests, it would be more elegent if we can process the requests dynamically.

```JavaScript
// index.js
const http = require("http");
const path = require("path");
const fs = require("fs");
const extension2contentType = {
    ".html": "text/html",
    ".js": "text/javaScript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
};

const server = http.createServer((req, res) => {
    //  build file path
    let filePath = path.join(
        __dirname,
        "public",
        req.url === "/" ? "index.html" : req.url
    );

    // extension of file
    let extname = path.extname(filePath);

    // check extension and set content type
    let contentType = extension2contentType[extname];

    // read file
    fs.readFile(filePath, (err, content) => {
        console.log(filePath);
        if (err) {
            if (err.code === "ENOENT") {
                // page not found
                fs.readFile(
                    path.join(__dirname, "public", "404.html"),
                    (err, content) => {
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.end(content, "utf8");
                    }
                );
            } else {
                // some server error (e.g. 500)
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // success
            res.writeHead(200, { "Content-Type": contentType });
            res.end(content, "utf8");
        }
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

// visit localhost:5000 -> show index.html
// visit localhost:5000/about.html -> show about.html
// visit localhost:5000/undefined -> show 404.html
```

### Note: Setup for automatic server side reload

Everytime we modify the server code in "index.js", we have to terminate the running server with CTRL+C, which is inefficient.

In order to automaticize the process, we can add the following lines in package.json:

```json
{
    ...
    "scripts": {
        "start": "node index",
        "dev": "nodemon index"
    },
    ...
}
```

"dev": "nodemon index" makes it possible for auto reload everytime we modify the code in development environment, however, we don't want to enable this in production, so we have to add "start": "node index"

## 5. Deploy a node.js app with heroku

Login to heroku account

```shell
$ heroku login
```

Create an empty heroku repo

```shell
$ heroku create
```

Go to this website to see the latest repo we created: https://dashboard.heroku.com/apps

Go to "Deploy" section to copy the code so that we can clone the heroku repo into our git repo

```shell
$ heroku git:clone -a hidden-cove-76762
```

Then push whatever is in our git repository with the code:

```shell
$ git push heroku master
```

To see the deployed node.js app, run: 

```shell
$ heroku open
```

