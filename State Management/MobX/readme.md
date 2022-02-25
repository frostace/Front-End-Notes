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

# CLARIFICATION

1. make sure that all properties you want to change over time are marked as `observable` so `MobX` can track them.
2. recommended that you mark any piece of code that changes observable's as an action. That way MobX can automatically apply transactions for effortless optimal performance.
3. `markObservable` vs `markAutoObservable`

# REFERENCE

1. official doc: https://mobx.js.org/the-gist-of-mobx.html
2. official sandbox: https://codesandbox.io/s/concepts-principles-il8lt?file=/src/index.js
3. my sandbox: https://codesandbox.io/s/mobx-react-demo-xhcfer
