test("toBe Matcher1 - primitive types", () => {
    expect("primitive types").toBe("primitive types");
});

// test("toBe Matcher2 - primitive types", () => {
//     expect({ number: 1 }).toBe({ number: 1 });
// });

test("toEqual Matcher1 - primitive types", () => {
    expect("primitive types").toEqual("primitive types");
});

test("toEqual Matcher1 - complex types", () => {
    expect({ number: 1 }).toEqual({ number: 1 });
});

test("toBeNull Matcher", () => {
    const a = null;
    expect(a).toBeNull();
});

test("toBeUndefined Matcher", () => {
    const a = undefined;
    expect(a).toBeUndefined();
});

test("toBeDefined Matcher", () => {
    const a = 1; // any value that is not undefined
    expect(a).toBeDefined();
});

test("toBeTruthy Matcher", () => {
    const a = 1;
    expect(a).toBeTruthy();
});

test("toBeFalsy Matcher", () => {
    const a = 0;
    expect(a).toBeFalsy();
});

test("toBeGreaterThan Matcher", () => {
    expect(10).toBeGreaterThan(9);
});

test("toBeLessThan Matcher", () => {
    expect(8).toBeLessThan(9);
});

test("toBeGreaterThanOrEqual Matcher", () => {
    expect(10).toBeGreaterThanOrEqual(9);
});

test("toBeLessThanOrEqual Matcher", () => {
    expect(8).toBeLessThanOrEqual(9);
});

test("toBeCloseTo Matcher", () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3);
});

test("toMatch Matcher", () => {
    const str = "John, Mary, Peter";
    expect(str).toMatch("Peter");
});

test("toContain Matcher", () => {
    const arr = ["John", "Mary", "Peter"];
    expect(arr).toContain("Peter");
});

test("toContain Matcher", () => {
    const arr = ["John", "Mary", "Peter"];
    const data = new Set(arr);
    expect(data).toContain("Peter");
});

const throwNewErrorFunc = () => {
    throw new Error("this is an Error");
};
test("toThrow Matcher", () => {
    expect(throwNewErrorFunc).not.toThrow("this is a Error");
});
