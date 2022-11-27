What does `extends` do in `TypeScript`?

In TypeScript, constraints are expressed using the `extends` keyword. `T extends K` means that it’s safe to assume that a value of type `T` is also of type `K`, e.g., `0 extends number` because `var zero: number = 0` is type-safe.

`T extends K` = `T` is a subset of `K`

for example:

```ts
type StringFromType<T> = T extends string
    ? "string"
    : T extends boolean
    ? "boolean"
    : T extends Error
    ? "error"
    : never;

type lorem = StringFromType<"lorem ipsum">; // 'string'
type isActive = StringFromType<false>; // 'boolean'
type unassignable = StringFromType<TypeError>; // 'error'
```
