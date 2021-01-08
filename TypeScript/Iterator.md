# Iterator

`Iterator` is a `Behavioral Design Pattern` common for OOPs.

It is, generally, an object which implements the following interface:

```typescript
interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}
```

where `IteratorResult` is simply a `value` + `done` pair:

```typescript
interface IteratorResult<T> {
    done: boolean;
    value: T;
}
```

Imagine that there is an object of some frame, which includes the list of components of which this frame consists. With `Iterator interface` it is possible to retrieve components from this frame object like below:

```typescript
class Component {
  	constructor (public name: string) {}
}

class Frame implements Iterator<Component> {

    private pointer = 0;

    constructor(public name: string, public components: Component[]) {}

    public next(): IteratorResult<Component> {
        if (this.pointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            }
        } else {
            return {
                done: true,
                value: null
            }
        }
    }
}

let frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
let iteratorResult1 = frame.next(); // { done: false, value: Component { name: 'top' } }
let iteratorResult2 = frame.next(); // { done: false, value: Component { name: 'bottom' } }
let iteratorResult3 = frame.next(); // { done: false, value: Component { name: 'left' } }
let iteratorResult4 = frame.next(); // { done: false, value: Component { name: 'right' } }
let iteratorResult5 = frame.next(); // { done: true, value: null }

// It is possible to access the value of iterator result via the value property:
let component = iteratorResult1.value; // Component { name: 'top' }
```

=> To make it more helpful, 

ES6 defines the *iterable protocol* which includes the [Symbol.iterator] `symbol` if the Iterable interface is implemented:

```typescript
//...
class Frame implements Iterable<Component> {

    constructor(public name: string, public components: Component[]) {}

    [Symbol.iterator]() {
        let pointer = 0;
        let components = this.components;

        return {
            next(): IteratorResult<Component> {
                if (pointer < components.length) {
                    return {
                        done: false,
                        value: components[pointer++]
                    }
                } else {
                    return {
                        done: true,
                        value: null
                    }
                }
            }
        }
    }
}

let frame = new Frame("Door", [new Component("top"), new Component("bottom"), new Component("left"), new Component("right")]);
for (let cmp of frame) {
  	console.log(cmp);
}
```

=> Now works fine with `for loop` but `frame.next()` won't work with this pattern.

=> Use `IterableIterator interface` to rescue:

```typescript
// ...
class Frame implements IterableIterator<Component> {
    private pointer = 0;

    constructor(public name: string, public components: Component[]) {}

    public next(): IteratorResult<Component> {
        if (this.pointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++],
            };
        } else {
            return {
                done: true,
                value: null,
            };
        }
    }

    [Symbol.iterator](): IterableIterator<Component> {
      	return this;
    }
}
// ...
```

Now both `frame.next()` and `for loop` work fine.

## Fibonacci Sequence

```typescript
class Fib implements IterableIterator<number> {

    protected fn1 = 0;
    protected fn2 = 1;

    constructor(protected maxValue?: number) {}

    public next(): IteratorResult<number> {
        var current = this.fn1;
        this.fn1 = this.fn2;
        this.fn2 = current + this.fn1;
        if (this.maxValue != null && current >= this.maxValue) {
            return {
                done: true,
                value: null
            } 
        } 
        return {
            done: false,
            value: current
        }
    }

    [Symbol.iterator](): IterableIterator<number> {
      	return this;
    }

}

let fib = new Fib();

fib.next() //{ done: false, value: 0 }
fib.next() //{ done: false, value: 1 }
fib.next() //{ done: false, value: 1 }
fib.next() //{ done: false, value: 2 }
fib.next() //{ done: false, value: 3 }
fib.next() //{ done: false, value: 5 }

let fibMax50 = new Fib(50);
console.log(Array.from(fibMax50)); // [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 ]

let fibMax21 = new Fib(21);
for (let num of fibMax21) {
  	console.log(num); // Prints fibonacci sequence 0 to 21
}
```

Environment Requirement:

- \>= ES6 target
- = ES5 target + target JS engine supports `Symbol.iterator`
  - e.g. ES5 target + ES6 lib (es6.d.ts)

should work in:

- node 4+
- Google Chrome and some other browsers