# React Bootcamp

## 1. Create Project and Run Server

```shell
$ npx create-react-app my-app
$ cd my-app
$ npm start
```

## 2. Function Component and Class Component

### Class Component

Usually used for components that have states.

```jsx
// App.js
class App extends Component {
    render() {
        return (
            <div className="root">
                <h1>Hello World!</h1>
            </div>
        );
    };
};

export default App;
```

### Function Component

Usually used when we don't have to maintain states in the component, but also, we can manage states in function components as well with React Hooks

```jsx
// App.js - traditional manner
function App(props) {
  	return (
      	<div className="root">
        		<h1>Hello World!</h1>
      	</div>
    )
};

export default App;
```

```jsx
// App.js - arrow function manner
const App = (props) => {
  	return (
      	<div className="root">
        		<h1>Hello World!</h1>
      	</div>
    )
};

export default App;
```

For function components, we specify their default props like this:

```jsx
const Navbar = (props) => {
    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={props.icon}></i> {props.title}
            </h1>
        </nav>
    )
};

Navbar.defaultProps = {
    title: "Github Finder",
    icon: "fab fa-github",
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};
```



## 3. Props of React Component

```JSX
// App.js
import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="root">
                <Navbar title="Github Finder" icon="fab fa-github" />
            </div>
        );
    };
};

export default App;

// Navbar.js
import React, { Component } from "react";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar bg-primary">
                <h1>
                    <i className={this.props.icon}></i> {this.props.title}
                </h1>
            </nav>
        );
    };
};

export default Navbar;
```

### Apply Type-check for Props and Set default props

```jsx
// Navbar.js
import React, { Component } from "react";
import PropTypes from "prop-types";

class Navbar extends Component {
  	// set default props
    static defaultProps = {
        title: "Github Finder",
        icon: "fab fa-github",
    };

  	// check prop types
    static propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
    };

    render() {
        ...
    };
};

export default Navbar;
```

## 4. State

```jsx
class Useritem extends Component {
    constructor() {
        super();
        this.state = {
            id: "id",
            login: "mojombo",
            avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
            html_url: "https://github.com/mojombo",
        };
    }
    // or...
    state = {
        id: "id",
        login: "mojombo",
        avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
        html_url: "https://github.com/mojombo",
    };

		render() {
        return (
            <div className="card text-center">
                <img
                    src={this.state.avatar_url}
                    alt=""
                    className="round-img"
                    style={{
                        width: "60px",
                    }}
                />
                <h3>{this.state.login}</h3>
                <div>
                    <a
                        href={this.state.html_url}
                        className="btn-dark btn-sm my-1"
                    >
                        More
                    </a>
                </div>
            </div>
        );
    };
};
```



