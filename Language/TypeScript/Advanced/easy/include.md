Implement the JavaScript Array.includes function in the type system. A type takes the two arguments. The output should be a boolean true or false.

For example:

```ts
type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`
```

# wrong answer

first extract the type of the array elements as union type,
then check if U extends this union type.
but `extends` is not strict enough to describe inclusion.

```ts
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false;
let a: Includes<[{}], { a: "A" }>; // true, expected to be false
let b: Includes<[boolean, 2, 3, 5, 6, 7], false>; // true, expected to be false
```

# solution

recursively check equality of each element within the array.

```ts
type Includes<T extends readonly any[], U> = T extends [
    infer First,
    ...infer Rest
]
    ? Equal<First, U> extends true
        ? true
        : Includes<Rest, U>
    : false;
```
