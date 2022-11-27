Implement the generic version of Array.push

For example:

```ts
type Result = Push<[1, 2], "3">; // [1, 2, '3']
```

# solution

```ts
type Push<T extends any[], U> = [...T, U];
```
