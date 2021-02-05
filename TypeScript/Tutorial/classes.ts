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
