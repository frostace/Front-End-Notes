What does `infer` do in `TypeScript`?

The `infer` keyword compliments `conditional types` and cannot be used outside an `extends` clause. Infer allows us to define a variable within our constraint to be referenced or returned.

Take the built-in TypeScript ReturnType utility, for example. It takes a function type and gives you its return type:

```ts
type a = ReturnType<() => void>; // void
type b = ReturnType<() => string | number>; // string | number
type c = ReturnType<() => any>; // any
```

It does that by first checking whether your type argument (T) is a function, and in the process of checking, the return type is made into a variable, infer R, and returned if the check succeeds:

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
```

As previously mentioned, this is mainly useful for accessing and using types that are not available to us.

Credits: https://blog.logrocket.com/understanding-infer-typescript/
