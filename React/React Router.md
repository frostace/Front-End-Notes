# React Router

## Usage

```shell
$ npm i react-router-dom
```

```jsx
// App.js
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
...

class App extends Component {
		render() {
        return (
            <Router>
                <div className="root">
                    <Navbar />
                    <div className="container">
                        <Alert alert={this.state.alert} />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <Fragment>
                                        <Search
                                            searchUsers={this.searchUsers}
                                            clearUsers={this.clearUsers}
                                            showClear={
                                                this.state.users.length > 0
                                                    ? true
                                                    : false
                                            }
                                            setAlert={this.setAlert}
                                        />
                                        <Users
                                            loading={this.state.loading}
                                            users={this.state.users}
                                        />
                                    </Fragment>
                                )}
                            />
                            <Route exact path="/about" component={About} />
                        </Switch>
                    </div>
                </div>
            </Router>
};
```

Router-link

```jsx
// Navbar.js
import { Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <nav className="navbar bg-primary">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
};
```



## Principle

### Types of Routers

* [HistoryRouter with Vanilla JS](####1. HistoryRouter with Vanilla JS)
* [HashRouter with Vanilla JS](####2. HashRouter with Vanilla JS)
* [BrowserRouter in React](####3. BrowserRouter in React) (Browser Router in React is implemented with history API)
* [HashRouter in React](####4. HashRouter in React)



#### 1. HistoryRouter with Vanilla JS

What is HistoryRouter?

It is implemented with `history` API, we can use `history.pushState()` to update `location.pathname`, so that the routerView can be updated according to the pathname. 

Note that: `history.pushState()` won't cause a page routing directly, we have to update the page view manually after calling `history.pushState()`.

```html
<ul>
    <li><a href='/home'>home</a></li>
    <li><a href='/about'>about</a></li>
    <div id="routeView"></div>
</ul>
```

```JavaScript
window.addEventListener('DOMContentLoaded', onLoad)
window.addEventListener('popstate', changeView)

let routeView = ''

function onLoad() {
    routeView = document.getElementById('routeView')
    changeView()
    let event = document.getElementsByTagName('ul')[0]
    
    event.addEventListener('click', (e) => {
        if(e.target.nodeName === 'A'){
            e.preventDefault()
            history.pushState(null, "", e.target.getAttribute('href'))
            changeView()
        }
    })
}

function changeView() {
    switch (location.pathname) {
        case '/home':
            routeView.innerHTML = 'home'
            break;
        case '/about':
            routeView.innerHTML = 'about'
            break;
    }
}
```



#### 2. HashRouter with Vanilla JS

What is HashRouter?

It is a kind of router implemented with `location.hash` API, by listening to the `hashchange` event, we can update the view of the website inside the callback. 

```html
<ul>
    <li><a href='#/home'>home</a></li>
    <li><a href='#/about'>about</a></li>
    <div id="routeView"></div>
</ul>
```

```JavaScript
window.addEventListener('DOMContentLoaded', onLoad)

window.addEventListener('hashchange', changeView)

let routeView = ''

function onLoad() {

    routeView = document.getElementById('routeView')

    changeView()

}

function changeView() {
    switch (location.hash) {
        case '#/home':
            routeView.innerHTML = 'home'
            break;
        case '#/about':
            routeView.innerHTML = 'about'
            break;
    }

}
```



#### 3. BrowserRouter in React

`react-router-dom` implemented 2 kinds of Routers: BrowserRouter and HashRouter. Between them, BrowserRouter is implemented with `history` API.

We need 3 components to implement the BrowserRouter functionality:

|Component|Description|
|---|---|
|BrowserRouter|Pass current path down to the children components, listen to the `popstate` event|
|Route|Accept the value passed from BrowserRouter Component and compare it with its natural prop `path`, and determine whether or not to call the render function|
|Link|Accept its natural prop `to`, update routing status with `pushState()`, and refresh the routerView with the method `onChangeView` got from `BrowserRouter`|

Setups:

```jsx
// index.html
<div id="root"></div>
```

```jsx
// index.js
import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route, Link } from '../components/BrowserRouter'

function App() {
    return (
        <BrowserRouter>
            <Link to='/home'>home</Link>
            <Link to='/about'>about</Link>
            <Route path='/home' render={()=><div>home</div>}></Route>
            <Route path='/about' render={()=><div>about</div>}></Route>
        </BrowserRouter>
    )
}

ReactDom.render(<App></App>,document.getElementById('root'))
```

##### 3.1 BrowserRouter Component

```jsx
// BrowserRouter.js
import React, { Component, createContext, Children } from "react";
const { Consumer, Provider } = createContext();

export class BrowserRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: this.getParams(window.location.pathname),
        };
        this.onChangeView = this.onChangeView.bind(this);
    }

    onChangeView() {
        const currentPath = this.getParams(window.location.pathname);
        this.setState({ currentPath });
    }

    getParams(url) {
        return url;
    }

    componentDidMount() {
        window.addEventListener("popstate", this.onChangeView);
    }

    componentWillUnmount() {
        window.removeEventListener("popstate", this.onChangeView);
    }

    render() {
        return (
            <Provider
                value={{
                    currentPath: this.state.currentPath,
                    onChangeView: this.onChangeView,
                }}
            >
                <div>
                    {Children.map(this.props.children, function (child) {
                        return child;
                    })}
                </div>
            </Provider>
        );
    }
}
```

##### 3.2 Route Component

```jsx	
// Route Component
// import React, { Component, createContext } from "react";
// const { Consumer, Provider } = createContext();

export class Route extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { path, render } = this.props
        return (
            <Consumer>
                {({ currentPath }) => currentPath === path && render()}
            </Consumer>
        )
    }
}
```

##### 3.3 Link Component

```jsx
// Link Component
// import React, { Component, createContext } from "react";
// const { Consumer, Provider } = createContext();

export class Link extends Component {
    constructor(props){
        super(props)
    }

    render() {
        let { to, ...props } = this.props
        return (
            <Consumer>
                {({ onChangeView }) => (
                    <a
                        {...props}
                        onClick={e => {
                            e.preventDefault();
                            window.history.pushState(null, "", to);
                            onChangeView();
                        }}
                    />
                )}
            </Consumer>
        )
    }
}
```

##### Caution:

Note that we can only update the routerView by clicking the links here, if we try to refresh the page when we are at '/home' path, we might get an error. And this will be explained in a minute.



##### 4. HashRouter in React

Setup:

```jsx
// index.html
<div id="root"></div>
```

```jsx
// index.js
import React from 'react'
import ReactDom from 'react-dom'
import { HashRouter, Route, Link } from '../components/HashRouter'

function App() {
    return (
        <HashRouter>
            <Link to='/home'>home</Link>
            <Link to='/about'>about</Link>
            <Route path='/home' render={()=><div>home</div>}></Route>
            <Route path='/about' render={()=><div>about</div>}></Route>
        </HashRouter>
    )
}

ReactDom.render(<App></App>,document.getElementById('root'))
```

```jsx
// HashRouter Component
import React, { createContext, Component, Children } from "react";
let { Provider, Consumer } = createContext();

export class HashRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPath: this.getCurrentPath(window.location.href),
        };
        this.onChangeView = this.onChangeView.bind(this);
    }

    componentDidMount() {
        window.addEventListener("hashchange", this.onChangeView);
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange");
    }

    onChangeView(e) {
        let currentPath = this.getCurrentPath(window.location.href);
        this.setState({ currentPath });
    }

    getCurrentPath(url) {
        let hashRoute = url.split("#");
        return hashRoute[1];
    }

    render() {
        return (
            <Provider value={{ currentPath: this.state.currentPath }}>
                <div>
                    {Children.map(this.props.children, function (child) {
                        return child;
                    })}
                </div>
            </Provider>
        );
    }
}
```

```jsx
// Route Component
export class Route extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { path, render } = this.props;

        return (
            <Consumer>
                {(value) => {
                    console.log(value);
                    return value.currentPath === path && render();
                }}
            </Consumer>
        );
    }
}
```

```jsx
// Link Component
export class Link extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { to, ...props } = this.props;
        return <a href={"#" + to} {...props} />;
    }
}
```

#### 5. BrowserRouter v.s. HashRouter

The main difference between BrowserRouter and HashRouter is:

BrowserRouter is listening to `popstate` event while HashRouter is listening to `hashchange` event.

And the problem we discussed above is that, BrowserRouter cannot handle the routing when we are refreshing the page or entering the URL directly in the browser url input. 

The explanation can be concluded into:

* `history.pushState()` and `hashchange` event are both front-end routing, they won't send request to the server.
* When we refresh the webpage:
  * If we use HashRouter, the URL remains: `http://localhost:8080/#/about`, it's not sending any request to the back-end, and the hashchange event is not invoked either, so the original webpage is still showing, nothing happens.
  * If we use BrowserRouter with `history.pushState()`, refreshing the website or entering a URL in the browser input section will invoke a request to the server, but nothing is handling this request in our BrowserRouter implementation, so it will return an Error saying: `Cannot GET /about`



### React Router Composition

Now that we have had a basic understanding of how front-end routers work, let's dip into the structure of React Router:

* BrowserRouter / HashRouter
* Router
* Switch
* Link
* Redirect

| Component     | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| BrowserRouter | Pass current path down to the children components, <br />Provide methods to modify `url` and `state` for children components to call<br />Listen to the `popstate` event, it will be triggered by `history.pushState()` method |
|HashRouter|Pass current path down to the children components, <br />Provide methods to modify `url` and `state` for children components to call<br />Listen to the `hashchange` event, it will be triggered by the change of URL with hashtag|
|Switch|Wrap up `Route` components, it will be used as a filter and return only 1 `Route`. Without `Switch`, multiple `Route` components can be rendered in a single page.|
| Route         | Accept the value passed from `BrowserRouter` Component and compare it with its natural prop `path`, and determine whether or not to call the render function |
| Link          | Accept its natural prop `to`, update routing status with `pushState()`, and refresh the routerView with the method `onChangeView` got from `BrowserRouter` |
|withRoute|If we want to access `match`, `location`, `history` properties which are not available to components other than `Route` components, we can wrap our components with a `Route` components, so that we can access the properties inside.|

##### Switch

```jsx
import React from "react";
import { Consumer } from "./context";
import pathToRegExp from "path-to-regexp";
export default class Switch extends React.Component {
    render() {
        return (
            <Consumer>
                {(value) => {
                    // state.pathname in BrowserRouter is identical to browser URL
                    let pathname = value.location.pathname;

                    // Compare Route path with URL, return unique Route if succeed
                    React.Children.forEach(this.props.children, (child) => {
                        let { path = "/", exact = false } = child.props;
                        let reg = pathToRegExp(path, [], { end: exact });
                        if (reg.test(pathname)) {
                            return child;
                        }
                    });
                }}
            </Consumer>
        );
    }
}
```



##### Redirect

```jsx
export default class Redirect extends Component {
    render() {
        return (
            <Consumer>
                {({ history }) => {
                    // modify URL, re-render component
                    history.push(this.props.to);
                    return null;
                }}
            </Consumer>
        );
    }
}
```





### Reference

https://juejin.im/post/5e704729f265da571a39eb10

https://juejin.im/post/5bcdb66251882577102a3b21