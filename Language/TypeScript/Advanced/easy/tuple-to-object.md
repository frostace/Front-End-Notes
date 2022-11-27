Give an array, transform into an object type and the key/value must in the given array.

```ts
type TupleToObject<T extends readonly any[]> = any;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils";

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
const tupleNumber = [1, 2, 3, 4] as const;
const tupleMix = [1, "2", 3, "4"] as const;

type cases = [
    Expect<
        Equal<
            TupleToObject<typeof tuple>,
            {
                tesla: "tesla";
                "model 3": "model 3";
                "model X": "model X";
                "model Y": "model Y";
            }
        >
    >,
    Expect<
        Equal<TupleToObject<typeof tupleNumber>, { 1: 1; 2: 2; 3: 3; 4: 4 }>
    >,
    Expect<
        Equal<
            TupleToObject<typeof tupleMix>,
            { 1: 1; "2": "2"; 3: 3; "4": "4" }
        >
    >
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;
```

Example of indexing with an arbitrary type is using number to get the type of an array’s elements. We can combine this with typeof to conveniently capture the element type of an array literal:

```ts
const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
];

type Person = typeof MyArray[number];

// type Person = {
//     name: string;
//     age: number;
// }
```

# solution

```ts
type TupleToObject<T extends readonly (string | number)[]> = {
    [K in T[number]]: K;
};
```
