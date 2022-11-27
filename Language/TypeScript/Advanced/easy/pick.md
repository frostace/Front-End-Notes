Implement the built-in Pick<T, K> generic without using it.

Constructs a type by picking the set of properties K from T

```ts
type MyPick = any;
```

[in-keyword](../../Basic/in.md)

# wrong answer 1

```ts
type MyPick<T, K> = {
    [P in K]: T[P];
};
```

error1: Type 'K' is not assignable to type 'string | number | symbol'.(2322)
error2: Type 'P' cannot be used to index type 'T'.(2536)

# wrong answer 2

```ts
type MyPick<T, K extends string | number | symbol> = {
    [P in K]: T[P];
};
```

error1: Type 'P' cannot be used to index type 'T'.(2536)

# solution

```ts
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

[extends-keyword](../../Basic/extends.md)
