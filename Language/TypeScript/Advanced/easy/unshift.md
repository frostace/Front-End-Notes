Implement the type version of Array.unshift

For example:

```ts
type Result = Unshift<[1, 2], 0>; // [0, 1, 2,]
```

# solution

```ts
type Unshift<T extends any[], U> = [U, ...T];
```
