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

## 5. LifeCycle Methods

### componentDidMount



## 6. React Router

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

## 7. React Hooks

### What are Hooks?

Hooks are functions that let us hook into react state and lifecycle features from a function component.

|Hook|Description|
|---|---|
|useState()|access state and mutate state|
|useEffect()|mimic lifecycle mthods|
|useContext()|manage global states instead of passing states as properties|
|useReducer()|redux-like reducer, take in dispatch actions|
|useRef()||

### 7.1 useState()

```jsx
/**
 * mimic state management in function components
 * @param {Dynamic} defaultValue 
 */
const useState = (defaultValue) => {
  	// ...
};
```



As long as we initialized a local state at the beginning of the function component, we can access states like local variables and mutate states as well.

##### Before

```jsx
import React, { Component } from "react";

export class Search extends Component {
    state = {
        stateName: "",
    };
		
 		...
    this.setState({ stateName: newStateValue });
		...
    
    render() {
        ...
    };
};

export default Search;
```

##### After

```jsx
import React, { useState } from "react";
const Component = () => {
  	// create a local state instance and method to mutate the corresponding state
  	const [stateName, setStateName] = useState("");
    
    ...
    setStateName(newStateValue);
  	...
    
    return (...);
};
```

### 7.2 useEffect()

```jsx
/**
 * mimic lifecycle methods
 * @param {Function} callback 
 * @param {Array} dependencies 
 */
const useEffect = (callback, dependencies) => {
  	// ...
};
```

The 1st param is a callback function.

useEffect() Hook is mimicing componentDidUpdate() by default, so if any of the props is updated, the callback function passed to it would be run.

The 2nd param is a dependency list, which specifies which props should the Hook watch so that once their values are mutated, callback function would be called.

If it's an empty array, then the Hook is going to watch nothing, but the callback will also be run just once.

##### Before

```jsx
componentDidUpdate() {
  	// doSomeThing
};
```

##### After

```jsx
// mimic componentDidUpdate()
useEffect(() => {
		// doSomeThing
});
```

Note that if the callback is updating the state itself, it will cause a dead loop.

However, useEffect() can also be used to mimic the componentDidMount() lifecycle method.

```jsx
// mimic componentDidMount()
useEffect(() => {
		// doSomeThing
}, []);
```

If we are taking use of some props inside the callback, but not adding them as a dependency in the dependency list, we shall get a warning in the browser:

```shell
webpackHotDevClient.js:138 ./src/components/users/User.js
  Line 11:8:  React Hook useEffect has missing dependencies: ...
```

One way to fix this is to: 

```jsx
// mimic componentDidMount()
useEffect(() => {
		// doSomeThing
  	// eslint-disable-next-line
}, []);
```

### 7.3 useReducer()

```jsx
/**
 * manage state transitions
 * @param {Function} reducer 
 * @param {Object} initialState 
 * @param {Function} initializer 
 */
const useReducer = (reducer, initialState, initializer) => {
  	// ...
};
```

```jsx
const mutateState1 = () => {
  	const [state, dispatch] = useReducer(reducer, initialCount, initializer);
  	
  	// access state1
  	console.log(state.state1);
  	// mutate state1
  	dispatch({type: "MUTATE_STATE1", payload: newState1});
}
```



### 7.4 useContext()

##### Prerequisite: Workflow with Context API

|Module|Description|
|---|---|
|types.js|Specify types of actions ( Get a state / Mutate a state / ... )|
|myContext.js|Initialize a context instance|
|myReducer.js|A Reducer is used to manage state transitions given a state and action|
|myState.js|A module used to manage states and dispatch actions|

```jsx
// types.js
export const MUTATE_STATE1 = "MUTATE_STATE1";
export const MUTATE_STATE2 = "MUTATE_STATE2";
```



```jsx
// myContext.js
import { createContext } from "react";

const myContext = createContext();

export default myContext;
```



```jsx
// myReducer.js
import {
    MUTATE_STATE1,
    MUTATE_STATE2,
} from "../types";

// basically a reducer is: (state, action) => newState
export default (state, action) => {
    switch (action.type) {
        case MUTATE_STATE1:
            return {
                ...state,
                myState1: action.payload,
            };
        case MUTATE_STATE2:
            return {
                ...state,
                myState2: action.payload,
            };
        default:
            return state;
    }
};
```



```jsx
// MyState.js
import React, { useReducer } from "react";
import axios from "axios";
import MyContext from "./myContext";
import MyReducer from "./myReducer";

import {
    MUTATE_STATE1,
    MUTATE_STATE2,
} from "../types";

const MyState = (props) => {
    const initialState = {
        state1: 0,
        state2: 0,
    };

    const [state, dispatch] = useReducer(MyReducer, initialState);

    // State 1
    const mutateState1 = async (username) => {
        dispatch({
            type: MUTATE_STATE1,
            payload: newState,
        });
    };
  	
  	// State 2
    const mutateState2 = async (username) => {
        dispatch({
            type: MUTATE_STATE2,
            payload: newState,
        });
    };

    return (
        <MyContext.Provider
            value={{
                state1: state.state1,
                state2: state.state2,
                mutateState1,
                mutateState2,
            }}
        >
            {props.children}
        </MyContext.Provider>
    );
};

export default GithubState;
```

##### How to work with useContext()

Since we have already setup the workflow of Context API above, we can just call useContext() to access the corresponding states maintained in a specific context instead of passing properties again and again.

```jsx
/**
 * manage global states like Redux
 * @param {Object} myContextInstance 
 */
const useContext = (myContextInstance) => {
  	// ...
}
```

```jsx
// myComponent.js
import MyContext from "../../context/myContext";
const myContext = useContext(MyContext);
const { state1, state2, mutataState1, mutateState2 } = myContext;
```



