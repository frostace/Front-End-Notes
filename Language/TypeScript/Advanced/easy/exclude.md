Implement the built-in Exclude<T, U>

Exclude from T those types that are assignable to U

```ts
type MyExclude<T, U> = any;
```

# solution

```ts
type MyExclude<T, U> = T extends U ? never : T;
```
