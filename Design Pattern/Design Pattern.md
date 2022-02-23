# Design Pattern





## 1. Factory Pattern

**Factory method pattern** is a [creational pattern](https://en.wikipedia.org/wiki/Creational_pattern) that uses factory methods to deal with the problem of [creating objects](https://en.wikipedia.org/wiki/Object_creation) without having to specify the exact [class](https://en.wikipedia.org/wiki/Class_(computer_programming)) of the object that will be created.

Simulate a `new` operator

```JavaScript
// objectFactory(name, 'cxk', '18')
function objectFactory() {
    const obj = new object();
    const Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    const ret = Constructor.apply(obj, arguments);

    return typeof ret === "object" ? ret : obj;
}
```

## 2. Singleton Pattern

