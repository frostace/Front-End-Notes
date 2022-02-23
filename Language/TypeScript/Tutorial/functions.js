function getSum(num1, num2) {
    return num1 + num2;
}
console.log(getSum(1, 4));
function mySum(num1, num2) {
    num1 = typeof num1 === "string" ? parseInt(num1) : num1;
    num2 = typeof num2 === "string" ? parseInt(num2) : num2;
    return num1 + num2;
}
// console.log(mySum("3", 5));
// ? denotes optional argument
function getName(firstName, lastName) {
    if (lastName === undefined)
        return firstName;
    return firstName + " " + lastName;
}
console.log(getName("John", "Doe"));
console.log(getName("John"));
function myVoid() {
    return;
}
