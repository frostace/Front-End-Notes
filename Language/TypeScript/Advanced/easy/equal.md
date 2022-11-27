Given 2 types and check whether or not they are equal to each other.

# wrong answer

```ts
type Equal<A, B> = A extends B ? (B extends A ? true : false) : false;
let a: Includes<[{ a: "A" }], { readonly a: "A" }>; // true, expected to be false
```

# solution

```ts
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2)
    ? true
    : false;
```

This solution makes creative use of the assignability rule for conditional types, which requires that the types after extends be "identical" as that is defined by the checker
[assignability rule](../../Basic/assignability-rule.md)
