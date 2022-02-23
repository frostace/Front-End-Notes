const leftDerivation = (input) => {
    const stack = [];
    const output = [];
    let i = 0;
    let current = input[i];
    while (current) {
        if (current === "(") {
            stack.push(current);
        } else if (current === ")") {
            while (stack[stack.length - 1] !== "(") {
                output.push(stack.pop());
            }
            stack.pop();
        } else if (
            current === "+" ||
            current === "-" ||
            current === "*" ||
            current === "/"
        ) {
            while (
                stack.length > 0 &&
                stack[stack.length - 1] !== "(" &&
                precedence(current) <= precedence(stack[stack.length - 1])
            ) {
                output.push(stack.pop());
            }
            stack.push(current);
        } else {
            output.push(current);
        }
        i++;
        current = input[i];
    }
    while (stack.length > 0) {
        output.push(stack.pop());
    }
    return output;
};

console.log(leftDerivation("(1+2)*3"));
