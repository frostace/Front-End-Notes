var Component = /** @class */ (function () {
    function Component(name) {
        this.name = name;
    }
    return Component;
}());
var Frame = /** @class */ (function () {
    function Frame(name, components) {
        this.name = name;
        this.components = components;
        this.pointer = 0;
    }
    Frame.prototype.next = function () {
        if (this.pointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            };
        }
        else {
            return {
                done: true,
                value: null
            };
        }
    };
    return Frame;
}());
var frame = new Frame("Door", [
    new Component("top"),
    new Component("bottom"),
    new Component("left"),
    new Component("right"),
]);
var iteratorResult1 = frame.next(); // { done: false, value: Component { name: 'top' } }
var iteratorResult2 = frame.next(); // { done: false, value: Component { name: 'bottom' } }
var iteratorResult3 = frame.next(); // { done: false, value: Component { name: 'left' } }
var iteratorResult4 = frame.next(); // { done: false, value: Component { name: 'right' } }
var iteratorResult5 = frame.next(); // { done: true, value: null }
// It is possible to access the value of iterator result via the value property:
var component = iteratorResult1.value; // Component { name: 'top' }
