# Number

## Core Type

JavaScript has only 1 number type: double-precision 64-bit `Number`

```JavaScript
console.log(0.1 + 0.2) // 0.30000000000000004
```

## Integer

Integer limits:

```JavaScript
console.log({max: Number.MAX_SAFE_INTEGER, min: Number.MIN_SAFE_INTEGER});
// {max: 9007199254740991, min: -9007199254740991}
```

`Safe` refers to the fact that the value cannot be the result of a rounding error.

```JavaScript
console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2); // true!
console.log(Number.MIN_SAFE_INTEGER - 1 === Number.MIN_SAFE_INTEGER - 2); // true!

console.log(Number.MAX_SAFE_INTEGER);      // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1);  // 9007199254740992 - Correct
console.log(Number.MAX_SAFE_INTEGER + 2);  // 9007199254740992 - Rounded!
console.log(Number.MAX_SAFE_INTEGER + 3);  // 9007199254740994 - Rounded - correct by luck
console.log(Number.MAX_SAFE_INTEGER + 4);  // 9007199254740996 - Rounded!
```

To check `safety`

```JavaScript
// Safe value
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true

// Unsafe value
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); // false

// Because it might have been rounded to it due to overflow
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 10)); // false
```

## Big Integer Solutions

* BigInt

  ```js
  let foo = BigInt(Number.MAX_SAFE_INTEGER));
  let bar = foo + BigInt(1);
  console.log(bar); // 9007199254740992n
  ```

  Note: Only work for `Integers`, not `floats`

* big.js

  Benefits:

  * Perfect decimal math
  * Safe out of bound integer values

  Installation:

  ```JavaScript
  npm install big.js @types/big.js
  ```

  Usage:

  ```js
  import { Big } from "big.js";
  
  export const foo = new Big("0.1");
  export const bar = foo.plus(new Big("0.2"));
  
  // To get a number:
  const x: number = Number(bar.toString()); // 0.3
  ```

  ```js
  import { Big } from "big.js";
  
  export const foo = new Big("9007199254740991");
  export const bar = foo.plus(new Big("1"));
  
  // To get a number:
  const x: number = Number(bar.toString()); // 9007199254740992
  ```

  

  ```JavaScript
  import { Big } from 'big.js';
  
  export const foo = new Big('111.11111111111111111111');
  export const bar = foo.plus(new Big('0.00000000000000000001'));
  
  console.log(bar);
  // Big {
  //     s: 1,
  //     e: 2,
  //     c: [
  //       1, 1, 1, 1, 1, 1, 1, 1,
  //       1, 1, 1, 1, 1, 1, 1, 1,
  //       1, 1, 1, 1, 1, 1, 2
  //     ],
  //     constructor: <ref *1> [Function: Big] {
  //       DP: 20,
  //       RM: 1,
  //       NE: -7,
  //       PE: 21,
  //       strict: false,
  //       Big: [Circular *1],
  //       default: [Circular *1]
  //     }
  //   }
  
  // To get a number:
  const x: number = Number(bar.toString()); // Loses the precision
  // 111.11111111111111
  ```

## NaN

`NaN` represents some number calculation not representable by a `valid real number`.

```JavaScript
console.log(Math.sqrt(-1)); // NaN
```

Note: Equality Check

```JavaScript
// Don't do this
console.log(NaN === NaN); // false!!

// Do this
console.log(Number.isNaN(NaN)); // true
```

## Infinity and Bounds

* Available `Number` within [ -Number.MAX_VALUE, Number.MAX_VALUE ] 

  ```JavaScript
  console.log(Number.MAX_VALUE);  // 1.7976931348623157e+308
  console.log(-Number.MAX_VALUE); // -1.7976931348623157e+308
  ```

* Values outside the range where precision isn't changed are clamped to these limits

  ```JavaScript
  console.log(Number.MAX_VALUE + 1 == Number.MAX_VALUE);   // true!
  console.log(-Number.MAX_VALUE - 1 == -Number.MAX_VALUE); // true!
  ```

  Note: what does it mean by `precision is changed`?

  Values outside the range where precision is changed resolve to special values `Infinity`, `-Infinity`

  ```JavaScript
  console.log(Number.MAX_VALUE + 10 ** 291);  // 1.7976931348623157e+308
  console.log(Number.MAX_VALUE - 10 ** 292);  // Infinity
  console.log(Number.MAX_VALUE + 10 ** 1000);  // Infinity
  console.log(-Number.MAX_VALUE - 10 ** 1000); // -Infinity
  ```

* `Infinitesimal`

  Smallest non-zero value: static `Number.MIN_VALUE`

  ```JavaScript
  console.log(Number.MIN_VALUE);  // 5e-324
  ```

  `Underflow values`

  ```js
  console.log(Number.MIN_VALUE / 10);  // 0
  ```

  

## Binary Floating Point vs. Decimal Floating Point

* Binary Floating Point

  Say, 64bits.

  All bits are used to represent the number

* Decimal Floating Point

| Coefficient | Exponent |
| ----------- | -------- |
| 64 bits     | 8 bits   |

Number = Coefficient * 10<sup>Exponent</sup>

## Reference 

https://basarat.gitbook.io/typescript/recap/number
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
https://github.com/douglascrockford/DEC64

