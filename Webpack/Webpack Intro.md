# Webpack

### Install

```shell
$ npm install -g webpack

// to use the dev server
$ npm install Webpack-dev-server
```

## 0. What is Webpack

* Module Bundler
* Custom Files or NPM Installed
* Generates Static Assets
* Extend with Plugins & Loaders

Let's first take a quick look at the `webpack.config.js` file:

```JavaScript
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: "./src/index.js",
        print: "./src/print.js",
    },
  	module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Webpack Intro",
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
};
```

We have `mode`, `entry`, `plugin`, `module`, `rule`, ...

What are these things? And what are their relationships?







Useful Plugins and Loaders:

||name|Description|
|---|---|---|
|Plugins|[`mini-css-extract-plugin`](https://webpack.js.org/plugins/mini-css-extract-plugin)|Useful for splitting CSS out from the main application.|
|Loaders|[`bundle-loader`](https://webpack.js.org/loaders/bundle-loader)|Used to split code and lazy load the resulting bundles.|
||[`promise-loader`](https://github.com/gaearon/promise-loader)|Similar to the `bundle-loader` but uses promises.|

### Bundler

* reads the entry point and analyze its dependencies, its dependencies' dependencies, and so on
* bundles the entry point and all its dependencies into a single file

### Module

* Discrete chunk of funcitonality
* Abstraction
* Encapsulation
* Usually a single task or responsibility
* Reusable

## 1. Why Webpack

* Loaders (CSS, SASS, JSX, etc)
* Plugins
* Code Splitting
* Clever Parsing (require("./template/" + name + ".jade"))

### 1.1 Loaders

CSS & Style， Sass & Less， JSX (React)， Babel， Coffee， TypeScript， EJS, Pug, Handlebars， json

#### CSS, Style Loader

```shell
$ npm install --save-dev style-loader css-loader
```

```JavaScript
// webpack.config.js
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
+		module: {
+       rules: [
+           {
+               test: /\.css$/,
+               use: ["style-loader", "css-loader"],
+           },
+ 			]
+ 	}
}
```

#### Image Loader

```shell
$ npm install --save-dev file-loader
```

```JavaScript
// webpack.config.js
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
+           {
+               test: /\.(png|svg|jpg|gif)$/,
+               use: ["file-loader"],
+           },
        ],
    },
};
```

#### Font Loader


```JavaScript
// webpack.config.js
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
            },
+       		{
+         			test: /\.(woff|woff2|eot|ttf|otf)$/,
+         			use: ['file-loader'],
+       		},
  			],
    },
};
```

#### Data Loader

```shell
$ npm install --save-dev csv-loader xml-loader
```

```JavaScript
// webpack.config.js
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"],
            },
+          	{
+              	test: /\.(csv|tsv)$/,
+              	use: ["csv-loader"],
+           },
+          	{
+              	test: /\.xml$/,
+              	use: ["xml-loader"],
+           },
        ],
    },
};
```

### 1.2 Plugin

#### [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)

This is used to help us dynamically generate an `index.html` file when running `npm run build`, so that if we modified the names of our entry scripts, this plugin will handle the change in the `index.html` file automatically for us.

```JavaScript
// webpack.config.js
const path = require("path");
+ const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/index.js",
        print: "./src/print.js",
    },
+   plugins: [
+       new HtmlWebpackPlugin({
+           title: "Output Management",
+       }),
+   ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
};
```

#### [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)

This plugin helps clear the /dist folder every time before building the project, so that only used files will be kept inside the folder.

```JavaScript
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
+ const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: {
        app: "./src/index.js",
        print: "./src/print.js",
    },
    plugins: [
      	new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Output Management",
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
};
```





### 1.3 Code Splitting

* Entry Point: Manually split code using `entry` configuration
* Prevent Duplication: Use the `SplitChunksPlugin` to dedupe and split chunks
* Dynamic Imports: Split code via inline function calls within modules

||Pros|Cons|
|---|---|---|
|Entry Point|Easiest and most intuitive.|If there are any duplicated modules between entry chunks they will be included in both bundles.<br />It isn't as flexible and can't be used to dynamically split code with the core application logic.|
|Prevent Duplication|||
||||

#### 1.3.1 Entry Point:

```JavaScript
// index.js
import _ from "lodash";

function component() {
    const element = document.createElement("div");
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(["Hello", "webpack"], " ");

    return element;
}

document.body.appendChild(component());
```



```JavaScript
// another-module.js
import _ from 'lodash';

console.log(
  _.join(['Another', 'module', 'loaded!'], ' ')
);
```

```diff
// webpack.config.js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
      	index: './src/index.js',
+   		another: './src/another-module.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
```

#### 1.3.2 Prevent Duplication:

##### Use Entry Dependencies

```diff
// webpack.config.js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
-     	index: './src/index.js',
-     	another: './src/another-module.js',
+     	index: { import: './src/index.js', dependOn: 'shared' },
+     	another: { import: './src/another-module.js', dependOn: 'shared' },
+     	shared: 'lodash',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
```

##### Use SplitChunksPlugin

```diff
// webpack.config.js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
    index: './src/index.js',
    another: './src/another-module.js',
    },
    output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    },
+   optimization: {
+     	splitChunks: {
+       		chunks: 'all',
+     	},
+   },
};
```

#### 1.3.3 Dynamic Imports

##### Use Import()

```diff
// index.js
- import _ from 'lodash';
-
- function component() {
+ function getComponent() {
-   	const element = document.createElement('div');
-
-   	// Lodash, now imported by this script
-   	element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   	return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
+     		const element = document.createElement('div');
+
+     		element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+
+     		return element;
+
+   	}).catch(error => 'An error occurred while loading the component');
  }

- document.body.appendChild(component());
+ getComponent().then(component => {
+   	document.body.appendChild(component);
+ })
```



```diff
// webpack.config.js
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
      	index: './src/index.js',
-     	another: './src/another-module.js',
    },
    output: {
        filename: '[name].bundle.js',
+     	chunkFilename: '[name].bundle.js',
      	publicPath: 'dist/',
      	path: path.resolve(__dirname, 'dist'),
    },
-   optimization: {
-     	splitChunks: {
-       		chunks: 'all',
-     	},
-   },
};
```

### 1.4 Parsing





## Development

* Watch Mode

You can instruct webpack to "watch" all files within your dependency graph for changes. If one of these files is updated, the code will be recompiled so you don't have to run the full build manually.

```json
// package.json
{
    "name": "webpack_app",
    "version": "1.0.0",
    "private": true,
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
+     	"watch": "webpack --watch",
        "build": "webpack"
    },
    "author": "frostace",
    "license": "MIT",
    "devDependencies": {
        "clean-webpack-plugin": "^3.0.0",
        "css-loader": "^3.6.0",
        "file-loader": "^6.0.0",
        "html-webpack-plugin": "^4.3.0",
        "style-loader": "^1.2.1",
        "webpack": "^4.43.0",
        "webpack-cli": "^3.3.12"
    },
    "dependencies": {
        "lodash": "^4.17.15"
    },
    "keywords": [],
    "description": ""
}
```

Setup the CleanWebpackPlugin so that it will not remove `index.html` after incremental build triggered by watch.

```JavaScript
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        app: "./src/index.js",
        print: "./src/print.js",
    },
    devtool: "inline-source-map",
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: "Webpack Intro",
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
};
```

Now run the following command to enable watch mode.

```shell
$ npm run watch
```





### Reference

https://www.youtube.com/watch?v=lziuNMk_8eQ