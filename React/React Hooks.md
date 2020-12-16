# React Hooks

[1. useState](###1. useState())

[2. useEffect](###2. useEffect())

[3. useReducer](###3. useReducer())

[4. useContext](###4. useContext())

[5. useRef](###5. useRef())

[6. useCallback](###6. useCallback())

[7. useMemo](###7. useMemo())



### What are Hooks?

Hooks are functions that let us hook into react state and lifecycle features from a function component.

| Hook         | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| useState()   | access state and mutate state                                |
| useEffect()  | mimic lifecycle mthods                                       |
| useReducer() | redux-like reducer, take in dispatch actions                 |
| useContext() | manage global states instead of passing states as properties |
| useRef()     | provides reference to a mutable object                       |

### 1. useState() 


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

### 2. useEffect()

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

### 3. useReducer()

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

### 4. useContext()

##### Prerequisite: Workflow with Context API

| Module       | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| types.js     | Specify types of actions ( Get a state / Mutate a state / ... ) |
| myContext.js | Initialize a context instance                                |
| myReducer.js | A Reducer is used to manage state transitions given a state and action |
| myState.js   | A module used to manage states and dispatch actions          |

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

##### 5. useRef()

`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component.

See the example below:

```jsx
// myComponent.js
import React, { useRef, Fragment } from "react";

function myComponent() {
    const inputEl = useRef(null);
    console.log(inputEl);
    // {current: null}
    const onButtonClick = () => {
        console.log(inputEl);
        // {current: input}
        inputEl.current.focus();
    };
    return (
        <div>
            <Fragment>
                <input ref={inputEl} type="text" />
                <button onClick={onButtonClick}>Focus the input</button>
            </Fragment>
        </div>
    );
}

export default myComponent;
```

The <input> element is gonna reference to the object "inputEl", which is initialized with {current: null} so that now inputEl.current is pointing at this <input> element

When the <button> is clicked, it's gonna access the <input> element with inputEl.current, and call .focus() method to make the <input> element under a focused status.

##### 6. useCallback()

Pass an inline callback and an array of dependencies. `useCallback` will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. `shouldComponentUpdate`).

```jsx
/**
 * dynamic update on change of dependencies
 * @param {Function} callback 
 * @param {Array} dependencies 
 */
const useCallback = (callback, dependencies) => {
  	// ...
};
```

```jsx
const memoizedCallback = useCallback(
    () => {
      	doSomething(a, b);
    },
    [a, b],
);
```

##### 7. useMemo()

Pass a “create” function and an array of dependencies. `useMemo` will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.

If no array is provided, a new value will be computed on every render.

```jsx
/**
 * mimic a computed property
 * @param {Function} callback 
 * @param {Array} dependencies 
 */
const useCallback = (callback, dependencies) => {
  	// ...
};
```

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Note: 

```jsx
useCallback(fn, deps)
//  is equivalent to 
useMemo(() => fn, deps).
```

