# Truthy

|Variable Type|`falsy`|`truthy`|
|---|---|---|
|`boolean`|`false`|`true`|
|`string`|''|any other string|
|`number`|`0`, `NaN`|any other number|
|`null`|always||
|`undefined`|always||
|Any other `Object` including empty ones like {}, []||always|

## Explicit Casting

```jsx
// Direct variables
const hasName = !!name;

// As members of objects
const someObj = {
  hasName: !!name
}

// e.g. in ReactJS JSX
{!!someName && <div>{someName}</div>}
```

## Reference

https://basarat.gitbook.io/typescript/recap/truthy