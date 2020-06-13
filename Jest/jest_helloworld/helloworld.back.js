// test(description_of_test, callback)
const dabaojian = require("./helloworld.js");
const { baojian1, baojian2 } = dabaojian;

test("baojian1 - 300yuan", () => {
    expect(baojian1(300)).toBe("prime");
});

test("baojian1 - 2000yuan", () => {
    expect(baojian2(2000)).toBe("double");
});

// Unit Test
// Testing for a minimal testable unit => in Front End, it's a module

// Assembly Test
// Assemble all units together to be a sub-system, apply testing
