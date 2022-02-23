class LexicalAnalyzer {
    constructor(str) {
        this.str = str;
        this.charCache = [];
        this.tokens = [];
        this.EOF = Symbol("EOF");
    }

    start = () => {
        let state = this.waitingForNumber;
        for (const char of this.str) {
            state = state(char);
        }
        state(this.EOF);
    };

    end = () => {};

    waitingForNumber = (char) => {
        if (/[0-9]/.test(char)) {
            this.charCache.push(char);
            return this.inNumber;
        }
        if (["+", "-", "*", "/"].includes(char)) {
            this.emitToken(char, char);
            return this.waitingForNumber;
        }
        if ([" ", "\n", "\r"].includes(char)) {
            return this.waitingForNumber;
        }
    };

    inNumber = (char) => {
        // edge case: EOF
        if (char === this.EOF) {
            this.emitToken("Number", this.charCache.join(""));
            this.charCache = [];
            return this.end;
        }
        if (/[0-9]/.test(char)) {
            this.charCache.push(char);
            return this.inNumber;
        }
        this.emitToken("Number", this.charCache.join(""));
        this.charCache = [];
        return this.waitingForNumber(char); // put back char
    };

    emitToken = (type, value) => {
        this.tokens.push({
            type,
            value,
        });
    };
}

const la = new LexicalAnalyzer("3*300+2*256");
la.start();
console.log("tokens: ", la.tokens);
// [
//     { type: 'Number', value: '3' },
//     { type: '*', value: '*' },
//     { type: 'Number', value: '300' },
//     { type: '+', value: '+' },
//     { type: 'Number', value: '2' },
//     { type: '*', value: '*' },
//     { type: 'Number', value: '256' }
// ]

const generateAdditiveExpression = (source) => {
    // case 1: multiplicative expression
    if (source[0].type === "MultiplicativeExpression") {
        const node = {
            type: "AdditiveExpression",
            children: [source[0]],
        };
        source[0] = node;
        return node;
    }
    // case 2: additive expression + multiplicative expression
    if (source[0].type === "AdditiveExpression" && source[1].type === "+") {
        const node = {
            type: "AdditiveExpression",
            operator: "+",
            children: [
                source.shift(),
                source.shift(),
                generateMultiplicativeExpression(source),
            ],
        };
        source.unshift(node);
    }
    // case 3: additive expression - multiplicative expression
    if (source[0].type === "AdditiveExpression" && source[1].type === "-") {
        const node = {
            type: "AdditiveExpression",
            operator: "-",
            children: [
                source.shift(),
                source.shift(),
                generateMultiplicativeExpression(source),
            ],
        };
        source.unshift(node);
    }
};
const generateMultiplicativeExpression = (source) => {};

function Expression(source) {
    if (
        source[0].type === "AdditiveExpression" &&
        source[1] &&
        source[1].type === "EOF"
    ) {
        let node = {
            type: "Expression",
            children: [source.shift(), source.shift()],
        };
        source.unshift(node);
        return node;
    }
    const addedExp = AdditiveExpression(source);
    console.log("added exp: ", addedExp);
    console.log("source after added: ", source);
    const exp = Expression(source);
    console.log("exp: ", exp);
    console.log("source after exp: ", source);
    return exp;
}
function AdditiveExpression(source) {
    if (source[0].type === "MultiplicativeExpression") {
        let node = {
            type: "AdditiveExpression",
            children: [source[0]],
        };
        source[0] = node;
        return AdditiveExpression(source);
    }
    if (
        source[0].type === "AdditiveExpression" &&
        source[1] &&
        source[1].type === "+"
    ) {
        let node = {
            type: "AdditiveExpression",
            operator: "+",
            children: [],
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }
    if (
        source[0].type === "AdditiveExpression" &&
        source[1] &&
        source[1].type === "-"
    ) {
        let node = {
            type: "AdditiveExpression",
            operator: "-",
            children: [],
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }
    if (source[0].type === "AdditiveExpression") return source[0];
    MultiplicativeExpression(source);
    return AdditiveExpression(source);
}
function MultiplicativeExpression(source) {
    if (source[0].type === "Number") {
        let node = {
            type: "MultiplicativeExpression",
            children: [source[0]],
        };
        source[0] = node;
        return MultiplicativeExpression(source);
    }
    if (
        source[0].type === "MultiplicativeExpression" &&
        source[1] &&
        source[1].type === "*"
    ) {
        let node = {
            type: "MultiplicativeExpression",
            operator: "*",
            children: [],
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }
    if (
        source[0].type === "MultiplicativeExpression" &&
        source[1] &&
        source[1].type === "/"
    ) {
        let node = {
            type: "MultiplicativeExpression",
            operator: "/",
            children: [],
        };
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }
    if (source[0].type === "MultiplicativeExpression") return source[0];

    return MultiplicativeExpression(source);
}

var source = [
    {
        type: "Number",
        value: "3",
    },
    {
        type: "*",
        value: "*",
    },
    {
        type: "Number",
        value: "300",
    },
    {
        type: "+",
        value: "+",
    },
    {
        type: "Number",
        value: "2",
    },
    {
        type: "*",
        value: "*",
    },
    {
        type: "Number",
        value: "256",
    },
    {
        type: "EOF",
    },
];
var ast = Expression(source);

console.log("ast: ", JSON.stringify(ast, null, 2));

function evaluate(node) {
    if (node.type === "Expression") {
        return evaluate(node.children[0]);
    }
    if (node.type === "AdditiveExpression") {
        if (node.operator === "-") {
            return evaluate(node.children[0]) - evaluate(node.children[2]);
        }
        if (node.operator === "+") {
            return evaluate(node.children[0]) + evaluate(node.children[2]);
        }
        return evaluate(node.children[0]);
    }
    if (node.type === "MultiplicativeExpression") {
        if (node.operator === "*") {
            return evaluate(node.children[0]) * evaluate(node.children[2]);
        }
        if (node.operator === "/") {
            return evaluate(node.children[0]) / evaluate(node.children[2]);
        }
        return evaluate(node.children[0]);
    }
    if (node.type === "Number") {
        return Number(node.value);
    }
}
