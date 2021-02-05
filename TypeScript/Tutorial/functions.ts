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
