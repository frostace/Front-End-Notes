# TypeScript

## types

```tsx
// variable
let myString: string;
let myNum: number;
let myBool: boolean;
let myVar: any;
myString = "Hello";
myNum = 1;
myBool = false;
myVar = true;

// Array
let strArr: string[];
let numArr: number[];
let boolArr: boolean[];
/*
let strArr: Array<string>;
let numArr: Array<number>;
let boolArr: Array<boolean>;
*/
strArr = ["Hello", "World"];
numArr = [1, 2, 3];
boolArr = [true, false, true];

// tuple
let strNumTuple: [string, number];
strNumTuple = ["Hello", 3];

// void
let myVoid1: void = null;
let myVoid2: void = undefined;

// null / undefined
let myNull: null = undefined;
let myUndefined: undefined = null;
```

## functions

```typescript
function getSum(num1: number, num2: number): number {
    return num1 + num2;
}

console.log(getSum(1, 4));

function mySum(num1: any, num2: any): number {
    num1 = typeof num1 === "string" ? parseInt(num1) : num1;
    num2 = typeof num2 === "string" ? parseInt(num2) : num2;
    return num1 + num2;
}
// console.log(mySum("3", 5));

// ? denotes optional argument
function getName(firstName: string, lastName?: string): string {
    if (lastName === undefined) return firstName;
    return firstName + " " + lastName;
}
console.log(getName("John", "Doe"));
console.log(getName("John"));

function myVoid(): void {
    return;
}
```

## interfaces

```typescript
/*
function showTodo(todo: { title: string; text: string }) {
    console.log(todo.title + ": " + todo.text);
}

let myTodo = { title: "trash", text: "take out trash" };
showTodo(myTodo);
*/

interface Todo {
    title: string;
    text: string;
}

function showTodo(todo: Todo) {
    console.log(todo.title + ": " + todo.text);
}

let myTodo = { title: "trash", text: "take out trash" };
showTodo(myTodo);
```

## classes

```typescript
interface UserInterface {
    name: string;
    email: string;
    age: number;
    register(): void;
    payInvoice(): void;
}

class User implements UserInterface {
    // access modifier
    /*
        public: accessible everywhere
        protected: accessible inside the class and inside subClasses
        private: accessible only inside the class
    */
    public name: string;
    public email: string;
    public age: number;

    constructor(name: string, email: string, age: number) {
        this.name = name;
        this.email = email;
        this.age = age;

        console.log(`User Created: ${this.name}`);
    }

    register() {
        console.log(`${this.name} is now registered`);
    }
    payInvoice() {
        console.log(`${this.name} paid invoice`);
    }
}

let john = new User("John Doe", "jdoe@gmail.com", 34);

console.log(john.name);
john.register();

// inheritance
class Member extends User {
    id: number;

    constructor(id: number, name: string, email: string, age: number) {
        super(name, email, age);
        this.id = id;
    }

    payInvoice() {
        super.payInvoice();
    }
}

let mike: User = new Member(1, "Mike Smith", "mike@gmail.com", 33);
mike.payInvoice();
```

