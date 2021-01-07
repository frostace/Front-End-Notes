# Arrow Functions

Also called `lambda` function, `fat arrow`, etc.

## Motivation

1. You don't need to keep typing `function`
2. Lexically captures the meaning of `this`
3. Lexically captures the meaning of `arguments`

### this

```js
function Person(age) {
    this.age = age;
    this.growOld = function() {
        this.age++;
    };
}
var person = new Person(1);
setTimeout(person.growOld, 1000); // `this` points at `window`

setTimeout(function() { console.log(person.age); }, 2000); // 1, should have been 2
```

```js
function Person(age) {
    this.age = age;
    this.growOld = function() {
        this.age++;
    };
  	this.growOld(); // if called here, `this` points at `Person`
}
var person = new Person(1);

setTimeout(function() { console.log(person.age); }, 2000); // 2
```

Arrow Function version:

```js
function Person(age) {
    this.age = age;
    this.growOld = () => {
        this.age++;
    }
}
var person = new Person(1);
setTimeout(person.growOld, 1000); // `this` points at `Person`

setTimeout(function() { console.log(person.age); }, 2000); // 2
```

Equivalent to this JS code:

```js
function Person(age) {
    this.age = age;
    var _this = this;  // capture this
    this.growOld = function() {
        _this.age++;   // use the captured this
    }
}
var person = new Person(1);
setTimeout(person.growOld, 1000);

setTimeout(function() { console.log(person.age); }, 2000); // 2
```

TypeScript version:

```typescript
class Person {
    constructor(public age: number) {}
    growOld = () => {
        this.age++;
    }
}
var person = new Person(1);
setTimeout(person.growOld, 1000);

setTimeout(function() { console.log(person.age); }, 2000); // 2
```

## Arrow Function Danger

Avoid using `Arrow Functions` when we want `this` and `arguments` to be of the calling context

```js
// jquery.each uses `this` to pass the object that it is currectly iterating over
let _self = this;
something.each(function() {
    console.log(_self); // the lexically scoped value
    console.log(this); 	// the library passed value
});
```

## Arrow Function and Inheritance

```js
class Adder {
    constructor(public a: number) {}
    add = (b: number): number => {
        return this.a + b;
    }
}
class Child extends Adder {
    callAdd(b: number) {
        return this.add(b);
    }
}
// Demo to show it works
const child = new Child(123);
console.log(child.callAdd(123)); // 246
```

Arrow functions don't work with the `super` keyword when you try to override the function in a child class. Properties go on `this`. Since there is only one `this` such functions cannot participate in a call to `super` (`super` only works on prototype members). You can easily get around it by creating a copy of the method before overriding it in the child.

Note: I found that this block of buzzwords is extremely hard to understand, so I looked up the specs of `super`:

- A super call invokes the constructor of the base class on the instance referenced by `this`.  (i.e. sets up properties on the derived class)
- A super call is processed as a function call (section [4.15](https://github.com/microsoft/TypeScript/blob/master/doc/spec-ARCHIVED.md#4.15)) using the construct signatures of the base class constructor function type as the initial set of candidate signatures for overload resolution. 
- Type arguments cannot be explicitly specified in a super call. 
- If the base class is a generic class, the type arguments used to process a super call are always those specified in the `extends` clause that references the base class.

Several definitions:

- Property Signature:

   A property signature declares the name and type of a property member.

   *PropertySignature:*
        *PropertyName* `?`$_{opt}$ *TypeAnnotation*$_{opt}$  

   *TypeAnnotation:*
        `:` *Type*

- Overload Resolution:

   The purpose of overload resolution in a function call is to ensure that at least one signature is applicable, to provide contextual types for the arguments, and to determine the result type of the function call, which could differ between the multiple applicable signatures.

   Overload resolution has no impact on the run-time behavior of a function call. Since JavaScript doesn't support function overloading, all that matters at run-time is the name of the function.

   For example:

   ```typescript
   let suits = ["hearts", "spades", "clubs", "diamonds"];
   
   function pickCard(x: { suit: string; card: number }[]): number;
   function pickCard(x: number): { suit: string; card: number };
   function pickCard(x: any): any {
     // Check to see if we're working with an object/array
     // if so, they gave us the deck and we'll pick the card
     if (typeof x == "object") {
       let pickedCard = Math.floor(Math.random() * x.length);
       return pickedCard;
     }
     // Otherwise just let them pick the card
     else if (typeof x == "number") {
       let pickedSuit = Math.floor(x / 13);
       return { suit: suits[pickedSuit], card: x % 13 };
     }
   }
   
   let myDeck = [
     { suit: "diamonds", card: 2 },
     { suit: "spades", card: 10 },
     { suit: "hearts", card: 4 },
   ];
   
   let pickedCard1 = myDeck[pickCard(myDeck)];
   alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);
   
   let pickedCard2 = pickCard(15);
   alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
   ```

Note: What does it mean by `cannot participate in a call to super`?

### Experiments

Because the code below works well:

```typescript
class Adder {
    constructor(public a: number) {}
    add = (b: number): number => {
        return this.a + b;
    }
}
class Child extends Adder {
  	constructor(a: number) {
      	super(a);
    }
    callAdd(b: number) {
        return this.add(b);
    }
}
// Demo to show it works
const child = new Child(123);
console.log(child.callAdd(123)); // 246
```

However, this code below will result in an cyclic call:

```typescript
class Adder {
    constructor(public a: number) {}
    // This function is now safe to pass around
    add = (b: number): number => {
        return this.a + b;
    }
}

class Child extends Adder {
    // Create our override
    add = (b: number): number => {
        return this.add(b);
    }
}

let child = new Child(123);
console.log(child.add(123));
```

Add this line to get around cyclic call:

```typescript
class Adder {
    constructor(public a: number) {}
    // This function is now safe to pass around
    add = (b: number): number => {
        return this.a + b;
    }
}

class Child extends Adder {
    // Create a copy of parent before creating our own
    superAdd = this.add;
    // Now create our override
    add = (b: number): number => {
        return this.superAdd(b);
    }
}

let child = new Child(123);
console.log(child.add(123));
```

But this actually has nothing to do with `super`.

## Reference

`super` keyword: https://github.com/microsoft/TypeScript/blob/master/doc/spec-ARCHIVED.md#4.9

overloads: https://www.typescriptlang.org/docs/handbook/functions.html#overloads