请实现代码中的 `stringify` 方法，解决对象中存在循环引用时的序列化问题，并通过相应的测试用例。

```js
const assert = require("assert");

function stringify(obj) {
    // your implementation
    // maintain occurred obj
    let parents = new Set();

    const dfs = (o) => {
        // base case: primitive type
        if (typeof o !== "object") {
            return o.toString();
        }

        // mark as occurred
        parents.add(o);

        let output = [];
        let tempStr;
        for (let key in o) {
            tempStr = "";
            tempStr += '"' + key + '":';

            // check occurrence of circular reference
            if (parents.has(o[key])) {
                tempStr += '"[Circular]"';
                output.push(tempStr);
                continue;
            }
            tempStr += dfs(o[key]);

            output.push(tempStr);
        }

        // concatenate before return
        return "{" + output.join(",") + "}";
    };

    return dfs(obj);
}

const obj1 = {
    a: 1,
};

assert.equal(stringify(obj1), '{"a":1}');

const obj2 = {};
obj2.a = obj2;

assert.equal(stringify(obj2), '{"a":"[Circular]"}');

const obj3 = {
    a: {},
    b: {},
};
obj3.a.b = obj3.b;
obj3.b.a = obj3.a;

assert.equal(
    stringify(obj3),
    '{"a":{"b":{"a":"[Circular]"}},"b":"[Circular]"}'
);
```
