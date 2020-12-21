"use strict";
exports.__esModule = true;
exports.bar = exports.foo = void 0;
var big_js_1 = require("big.js");
exports.foo = new big_js_1.Big("9007199254740991");
exports.bar = exports.foo.plus(new big_js_1.Big("1"));
// To get a number:
var x = Number(exports.bar.toString()); // Loses the precision
console.log(x);
