What does `in` do in `TypeScript`?

-   The `in` keyword is used there as part of the syntax to iterate over all the items in a union of keys.
-   The `in` operator also acts as a type guard.

```ts
// iterator
type Keys = "option1" | "option2";
type Flags = { [K in Keys]: boolean };
type Flags = {
    option1: boolean;
    option2: boolean;
};
```

```ts
// type guard
interface A {
    x: number;
}
interface B {
    y: string;
}

let p: any = {};
let q: A | B = p;
if ("x" in q) {
    // q: A
} else {
    // q: B
}
```
