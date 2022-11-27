Implement the built-in Parameters generic without using it.

For example:

```ts
const foo = (arg1: string, arg2: number): void => {};

type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]
```

# solution

```ts
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;
```
