function Foo() {
	this.bar = 123;
}

// call with the new operator
var newFoo = new Foo();
console.log(newFoo.bar); // 123
newFoo.bar = 456;
console.log(newFoo.bar); // 456
