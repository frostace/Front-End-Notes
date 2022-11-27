Implement a generic First<T> that takes an Array T and returns its first element's type.

```ts
type First<T extends any[]> = any;
```

# wrong answer

```ts
type First<T extends any[]> = T[0];
```

cause it is expected to be never when an empty array is passed.

```ts
let a: First<[]>;
// a: undefined
```

[infer-keyword](../../Basic/infer.md)

# solution

```ts
type First<T extends any[]> = T extends [infer F, ...infer others] ? F : never;
```

[never-keyword](../../Basic/never.md)
