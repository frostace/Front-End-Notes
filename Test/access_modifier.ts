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