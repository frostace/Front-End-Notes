# Null vs. Undefined

-   null == undefined

    ```JavaScript
    console.log(null == null); 			    // true (of course)
    console.log(undefined == undefined); 	// true (of course)
    console.log(null == undefined); 		// true
    ```

-   Root level undefined

    ```JavaScript
    if (typeof someglobal !== 'undefined') {
        // someglobal is now safe to use
        console.log(someglobal);
    }
    ```

    Note: I think this is for safety reason

-   Limit Explicit use of `undefined`

    Better change this:

    ```JavaScript
    function foo() {
        // if Something
        return {a: 1, b: 2};
        // else
        return {a: 1, b: undefined};
    }
    ```

    to this:

    ```TypeScript
    function foo(): {a: number, b?: number} {
        // if Something
        return {a: 1, b: 2};
        // else
        return {a: 1};
    }
    ```

    Note: Personally don't understand the down side of `undefined`

-   Don't use `undefined` as a mean of denoting `validity`

    Awful function:

    ```TypeScript
    function toInt(str: string) {
      	return str ? parseInt(str) : undefined;
    }
    ```

    Better function:

    ```TypeScript
    function toInt(str: string): { valid: boolean, int?: number } {
        const int = parseInt(str);
        if (isNaN(int)) {
          	return { valid: false };
        }
        else {
          	return { valid: true, int };
        }
    }
    ```

    Note: Using `undefined` as a means of `validity` would produce an intertwined type (here, STRING and UNDEFINED), which is ambiguous for type checking.

-   JSON and Serialization

    JSON supports `null` but not `undefined`

    `null` attributes are encoded

    `undefined` attributes are excluded

    ```JavaScript
    JSON.stringify({willStay: null, willBeGone: undefined}); // {"willStay": null}
    ```

## `null` is a bad idea by `Douglas Crockford`

-   [youtube video](https://www.youtube.com/watch?v=PSGEjv3Tqo0&feature=youtu.be&t=9m21s)

Note: Because JavaScript itself uses `undefined` all the time, and it makes no sense to keep 2 values which denotes the same bottom value (empty), so Douglas decided to get rid of `null`.
