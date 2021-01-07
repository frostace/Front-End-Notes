class Adder {
    constructor(public a: number) {}
    // This function is now safe to pass around
    add = (b: number): number => {
        return this.a + b;
    }
}

class Child extends Adder {
    // 
    superAdd = this.add;
    // Create our override
    add = (b: number): number => {
        return this.superAdd(b);
    }
}

let child = new Child(123);
console.log(child.add(123));