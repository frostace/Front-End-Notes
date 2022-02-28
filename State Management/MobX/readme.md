# INTRO

3 main concepts:

-   State
    -   The data that drives your application.
        -   Domain specific state
        -   View state
-   Actions
    -   Any piece of code that changes the state. (user events, backend data pushes, scheduled events)
-   Derivations
    -   Anything that can be derived from the state without any further intersection.
    -   Classification:
        -   Computed values, which can always be derived from the current observable state using a pure function
        -   Reactions, side effects that need to happen automatically when the state changes (bridge between imperative and reactive programming)
    -   Example:
        -   The user interface
        -   Derived data, such as the number of remaining `todos`
        -   Backend integrations, e.g. sending changes to the server

# GIST 
<img src="./action-state-view.png" alt="action-state-view" />

## `observable`

TODO: divide `gist` into 2 parts: framework agnostic part and framework specific part(mobx-react)


1. make sure that all properties you want to change over time are marked as `observable` so `MobX` can track them.
```js
import * as React from "react";

import { makeObservable, observable, action } from "mobx";
import { observer } from "mobx-react-lite";

class Todo {
  id = Math.random();
  title = "";
  finished = false;

  constructor(title) {
    makeObservable(this, {
      title: observable,
      finished: observable, // comment this line to make `finished` untrackable
      toggle: action
    });
    this.title = title;
  }

  toggle() {
    this.finished = !this.finished;
  }
}

const TodoView = observer(({ todo }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => todo.toggle()}
    />
    {todo.title}/{String(todo.finished)}
  </li>
));

const store = new Todo("Get Coffee");

const App = () => <TodoView todo={store} />;
export default App;

```
2. recommended that you mark any piece of code that changes observable's as an action. That way MobX can automatically apply transactions for effortless optimal performance.
question is: how does mobx `track` those states that are marked as `observable`, and what does it mean by optimal performance?



3. `markObservable` vs `markAutoObservable`
`makeAutoObservable` would mark all properties as `observable`, all methods as `action`
```js
class Todo {
  id = Math.random();
  title = "";
  finished = false;

  constructor(title) {
    // see the difference
    makeAutoObservable(this);
    this.title = title;
  }

  toggle() {
    this.finished = !this.finished;
  }
}
```

## `computed`
```js
class Todo {
  id = Math.random();
  title = "";
  finished = false;
  get unfinished() {
    return !this.finished;
  }

  constructor(title) {
    makeObservable(this, {
      title: observable,
      finished: observable,
      toggle: action,
      unfinished: computed
    });
    this.title = title;
  }

  toggle() {
    this.finished = !this.finished;
  }
}
```

## `observer`
wrap a component with `observer` can make it reactive to `observable` states
`observer` converts React component into derivations of the data they render.

```js
// remove the `observer` wrapper to disable reactivity 
const TodoView = observer(({ todo }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onClick={() => todo.toggle()}
    />
    {todo.title}/{String(todo.finished)}/{String(todo.unfinished)}
  </li>
));
```

diff b.t. `smart` and `dumb` component?

## custom reactions
rarely needed.
`autorun`
```js
constructor(title) {
    makeObservable(this, {
      title: observable,
      finished: observable,
      toggle: action,
      unfinished: computed
    });
    autorun(() => {
      console.log(this.unfinished);
    });

    this.title = title;
  }
```

`reaction`
```js

```

`when`
when observes and runs the given predicate function until it returns true. Once that happens, the given effect function is executed and the autorunner is disposed.

```ts
declare function when(
    predicate: () => boolean, 
    effect: Lambda,
    opts: IWhenOptions,
): IReactionDisposer
```
```js
import { when, observable } from "mobx";
import _ from "lodash";

var person = observable({
  firstName: "Matt",
  lastName: "Ruby",
  age: 10
});

// you can call the disposer() to kill off the when early.
var disposer = when(
  () => {
    console.log("Age: " + person.age);
    return person.age >= 20;
  },
  () => {
    console.log("You're too old now.  I'm done watching.");
  }
);
```

# From decorator to annotation
```js
import { makeObservable, observable, computed, action } from "mobx"

class Todo {
    id = Math.random()
    @observable title = ""
    @observable finished = false

    constructor() {
        makeObservable(this)
    }

    @action
    toggle() {
        this.finished = !finished
    }
}

class TodoList {
    @observable todos = []

    @computed
    get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length
    }

    constructor() {
        makeObservable(this)
    }
}
```

# REFERENCE

1. official doc: https://mobx.js.org/the-gist-of-mobx.html
2. official sandbox: https://codesandbox.io/s/concepts-principles-il8lt?file=/src/index.js
3. my sandbox: https://codesandbox.io/s/mobx-react-demo-xhcfer
