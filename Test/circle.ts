class Circle {
    static pi = 3.14;

    static calculateArea(radius:number) {
        return this.pi * radius * radius;
    }

    calculateCircumference(radius:number):number { 
        return 2 * Circle.pi * radius;
    }
}

console.log(Circle.calculateArea(5)); // returns 78.5

let circleObj = new Circle();
console.log(circleObj.calculateCircumference(5)); // returns 31.4000000
//circleObj.calculateArea(); <-- cannot call this