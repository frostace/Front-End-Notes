package name: axios/utils

> https://github.com/axios/axios/blob/master/lib/utils.js

# WHAT FOR

"`utils` is a library of generic helper functions non-specific to axios."
I think similar functionalities can be found in `lodash`.
What are `helpers` then? Sounds the same thing.
"The modules found in helpers/ should be generic modules that are not specific to the domain logic of axios. These modules could theoretically be published to npm on their own and consumed by other modules or apps."

When I look deeper into the code, functions maintained in `utils` are all quite short, can be used as sugar. functions in `helpers` are really implementing some specific functionalities, and every function is maintained in a separate file.

# ANALYSIS

Every single function has a clear comment on its description, input and output, sweet!

-   `undefined`

```js
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
    return typeof val === "undefined";
}
```

`typeof val === 'undefined'` vs `val === undefined`:
the former works even if val is not declared

-   `Object`

```js
function isObject(val) {
    return val !== null && typeof val === "object";
}

function isPlainObject(val) {
    if (toString.call(val) !== "[object Object]") {
        return false;
    }

    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}
```

what is the diff. between `isObject` and `isPlainObject`?

`isPlainObject`: check if the value is an object created by the Object constructor or one with a [[Prototype]] of null.

`isObject`: check if the value is the language type of Object. (e.g. arrays, functions, objects, regexes, new Number(0), and new String(''))

We can tell that `Object` + `Null` is the superset of `PlainObject` here.

A set diagram here can illustrate the relationship better, but I don't have enough time.

-   `Buffer`

```js
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
    return (
        val !== null &&
        !isUndefined(val) &&
        val.constructor !== null &&
        !isUndefined(val.constructor) &&
        typeof val.constructor.isBuffer === "function" &&
        val.constructor.isBuffer(val)
    );
}
```

What on earth is a Buffer?

"Buffer objects are used to represent a fixed-length sequence of bytes. Many Node.js APIs support Buffers.

The Buffer class is a subclass of JavaScript's `Uint8Array` class and extends it with methods that cover additional use cases. Node.js APIs accept plain `Uint8Arrays` wherever Buffers are supported as well.

While the Buffer class is available within the global scope, it is still recommended to explicitly reference it via an import or require statement."

```js
// run this in node.js
Buffer.from([257, 257.5, -255, "1", 255]);
// the entries are all truncated using `(value & 255)` to fit into the range 0–255
// <Buffer 01 01 01 01 ff>
```

-   `file`

```js
function isFile(val) {
    return toString.call(val) === "[object File]";
}

function isBlob(val) {
    return toString.call(val) === "[object Blob]";
}
```

`File` is a subset of `Blob`. Checkout MDN for more details.

-   `stream`

```js
function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
}
```

What is Stream and when do we use it?

-   `browser`

```js
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
    if (
        typeof navigator !== "undefined" &&
        (navigator.product === "ReactNative" ||
            navigator.product === "NativeScript" ||
            navigator.product === "NS")
    ) {
        return false;
    }
    return typeof window !== "undefined" && typeof document !== "undefined";
}
```

-   `lodash-like`

```js
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === "undefined") {
        return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== "object") {
        /*eslint no-param-reassign:0*/
        obj = [obj];
    }

    if (isArray(obj)) {
        // Iterate over array values
        for (var i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        // Iterate over object keys
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}
```

````js
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
            result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
            result[key] = merge({}, val);
        } else if (isArray(val)) {
            result[key] = val.slice();
        } else {
            result[key] = val;
        }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
    }
    return result;
}
````

```js
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
            a[key] = bind(val, thisArg);
        } else {
            a[key] = val;
        }
    });
    return a;
}
```

# HORIZON

# REFERENCE

-   https://nodejs.org/api/buffer.html#buffer
-   https://developer.mozilla.org/en-US/docs/Web/API/File
-   https://developer.mozilla.org/en-US/docs/Web/API/Blob
