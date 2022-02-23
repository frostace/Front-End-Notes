# Classes in TypeScript

See Also: [Classes in JavaScript](../JavaScript/Classes.md)

## Class Emit

See [here](./ClassEmit.md) for details.

```typescript
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    add(point: Point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}

var p1 = new Point(0, 10);
var p2 = new Point(10, 20);
var p3 = p1.add(p2); // {x: 10, y: 30}
```

This class generates the following JavaScript on ES5 emit:
```js
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.add = function (point) {
        return new Point(this.x + point.x, this.y + point.y);
    };
    return Point;
})();
```


## Inheritance

### `extends`

```typescript
class Point3D extends Point {
    z: number;
    constructor(x: number, y: number, z: number) {
        super(x, y); // call the parent constructor
        this.z = z;
    }
    add(point: Point3D) {
        var point2D = super.add(point);
        return new Point3D(point2D.x, point2D.y, this.z + point.z);
    }
}
```

## Statics

`static` properties are shared by all instances of the `class`, they can only be accessed with the `abstract` object instead of instances (i.e. `Something` in the example below)

```js
class Something {
    static instances = 0;
    constructor() {
        Something.instances++;
    }
}

var s1 = new Something();
var s2 = new Something();
console.log(Something.instances); // 2
```

Note: You can have `static` members as well as `static` functions

Q: Difference between `static` functions and `non-static` member functions of a `class`?

`static` v.s. `non-static` members

```js
class Circle {
    static pi = 3.14;
    pi = 3;
}

console.log(Circle.pi); // returns 3.14

let circleObj = new Circle();
console.log(circleObj.pi); // returns 3
```

```js
class Circle {
    static pi = 3.14;
    // pi = 3;
}

console.log(Circle.pi); // returns 3.14

let circleObj = new Circle();
console.log(circleObj.pi); // returns undefined
```

`static` v.s. `non-static` methods

```typescript
class Circle {
    static pi = 3.14;

    static calculateArea(radius: number) {
        return this.pi * radius * radius;
    }

    calculateCircumference(radius: number): number { 
        return 2 * Circle.pi * radius;
    }
}

console.log(Circle.calculateArea(5)); // returns 78.5

let circleObj = new Circle();
console.log(circleObj.calculateCircumference(5)); // returns 31.4000000
// circleObj.calculateArea(); <-- cannot call this
```

Note:

- `static` methods can access `static` members with `this.someMember`
- `non-static` methods can access `static` members with `someObject.someMember`

## Access Modifier

|`accessible on`|`public`<br />(default)|`protected`|`private`|
|---|---|---|---|
|class|yes|yes|yes|
|class children|yes|yes|no|
|class instances|yes|no|no|

Incorrect use would have no warnings at `runtime`, but would generate `compile` time errors in `typescript`:

```typescript
class FooBase {
    public x: number;
    protected y: number;
    private z: number;
}

// EFFECT ON CHILD CLASSES
class FooChild extends FooBase {
    constructor() {
      	super();
        this.x; // okay
        this.y; // okay
        this.z; // ERROR: private
    }
}

// EFFECT ON INSTANCES
var foo = new FooBase();
foo.x; // okay
foo.y; // ERROR : protected
foo.z; // ERROR : private
```

## Abstract

`abstract` 

- `abstract` **classes** cannot be directly instantiated. Instead the user must create some `class` that inherits from the `abstract class`.

  ```typescript
  abstract class FooCommand {}

  class BarCommand extends FooCommand {}

  const fooCommand: FooCommand = new FooCommand(); // Cannot create an instance of an abstract class.

  const barCommand = new BarCommand(); // You can create an instance of a class that inherits from an abstract class.
  ```

- `abstract` **members** cannot be directly accessed and a child class must provide the functionality.

  ```typescript
  abstract class FooCommand {
    	abstract execute(): string;
  }
  
  class BarErrorCommand  extends FooCommand {} // 'BarErrorCommand' needs to implement abstract member 'execute'.
  
  class BarCommand extends FooCommand {
      execute() {
        	return `Command Bar executed`;
      }
  }
  
  const barCommand = new BarCommand();
  
  barCommand.execute(); // Command Bar executed
  ```

## Defining using `constructor`

```typescript
class Foo {
    x: number;
    constructor(x:number) {
        this.x = x;
    }
}
```

is equal to the following shorthand:

```typescript
class Foo {
    constructor(public x:number) {
    }
}
```

## Property Initializer

supported by ES7

```typescript
class Foo {
    members = [];  // Initialize directly
    add(x) {
        this.members.push(x);
    }
}
```



## Reference

`static` : https://www.tutorialsteacher.com/typescript/typescript-static

