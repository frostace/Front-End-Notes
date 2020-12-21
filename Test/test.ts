import { Big } from "big.js";

export const foo = new Big("9007199254740991");
export const bar = foo.plus(new Big("1"));

// To get a number:
const x: number = Number(bar.toString()); // Loses the precision
console.log(x);