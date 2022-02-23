# React Component LifeCycle

## 0. Prerequisites:

### What are Mount and Unmount

In applications with many components, it’s very important to free up resources taken by the components when they are destroyed.

We want to [set up a timer](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) whenever the `Clock` is rendered to the DOM for the first time. This is called “mounting” in React.

We also want to [clear that timer](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) whenever the DOM produced by the `Clock` is removed. This is called “unmounting” in React.

### What are lifecycle methods

Several methods can be declared on a component <strong>class</strong> to run some code when a component mounts and unmounts, these methods are called lifecycle methods. And there are also some other lifecycle stages besides "mount" and "unmount".

```jsx
// Clock.js
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
```



## 1. Lifecycle Methods

See the image below for the family of lifecycle methods:

<img src="./React%20Lifecycle%20Methods.jpeg">

### 1.1 Mounting

#### componentDidMount()

`componentDidMount()` is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

```jsx
componentDidMount() {
  	// ...
}
```

Note: calling setState() immediately in componentDidMount() will trigger an extra rendering happening before the browser updates the screen. So although the state changed twice, the user will only see the final state. However, it will cause performance issue so avoid using this pattern.

### 1.2 Updating

#### shouldComponentUpdate()

Use `shouldComponentUpdate()` to let React know if a component’s output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.

`shouldComponentUpdate()` is invoked before rendering when new props or state are being received. Defaults to `true`. This method is not called for the initial render or when `forceUpdate()` is used.

```jsx
shouldComponentUpdate(nextProps, nextState)
```

This method only exists as a **[performance optimization](https://reactjs.org/docs/optimizing-performance.html).** Do not rely on it to “prevent” a rendering, as this can lead to bugs. **Consider using the built-in [`PureComponent`](https://reactjs.org/docs/react-api.html#reactpurecomponent)** instead of writing `shouldComponentUpdate()` by hand. `PureComponent` performs a shallow comparison of props and state, and reduces the chance that you’ll skip a necessary update.

#### componentDidUpdate()

`componentDidUpdate()` is invoked immediately after updating occurs. This method is not called for the initial render.

Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).

```jsx
componentDidUpdate(prevProps, prevState, snapshot)
```

Caution: Avoid calling setState() immediately in componentDidUpdate() without a value check!

This may cause an infinite loop.

### 1.3 Unmounting

#### componentWillUnmount()

`componentWillUnmount()` is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in `componentDidMount()`.

```jsx
componentWillUnmount()
```

Caution: NEVER call setState() in componentWillUnmount() because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again.



### Reference

https://reactjs.org/docs/react-component.html
