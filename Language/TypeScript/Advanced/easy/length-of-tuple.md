For given a tuple, you need create a generic Length, pick the length of the tuple

For example:

```ts
type tesla = ["tesla", "model 3", "model X", "model Y"];
type spaceX = [
    "FALCON 9",
    "FALCON HEAVY",
    "DRAGON",
    "STARSHIP",
    "HUMAN SPACEFLIGHT"
];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5
```

```ts
type Length<T> = any;
```

# wrong answer 1

```ts
type Length<T extends any> = T["length"];
```

error1: Type '"length"' cannot be used to index type 'T'.(2536)

# wrong answer 2

```ts
type Length<T extends any[]> = T["length"];
let a: Length<[1]>; // pass
const tesla = ["tesla", "model 3", "model X", "model Y"] as const;
let b: Length<tesla>; // error
```

error1: Type 'readonly ["tesla", "model 3", "model X", "model Y"]' does not satisfy the constraint 'any[]'.
The type 'readonly ["tesla", "model 3", "model X", "model Y"]' is 'readonly' and cannot be assigned to the mutable type 'any[]'.(2344)

so the generic type T has to be readonly

# solution

```ts
type Length<T extends readonly any[]> = T["length"];
```
