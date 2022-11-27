If we have a type which is wrapped type like Promise. How we can get a type which is inside the wrapped type?

For example: if we have Promise<ExampleType> how to get ExampleType?

```ts
type ExampleType = Promise<string>;

type Result = MyAwaited<ExampleType>; // string
```

# wrong answer

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U>
    ? U
    : never;
```

Base cases are met, but recursive cases are not.
We'll have to recursively go through U until it does not extends PromiseLike any more.

# solution

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U>
    ? U extends PromiseLike<any>
        ? MyAwaited<U>
        : U
    : never;
```
