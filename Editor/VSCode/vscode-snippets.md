# VSCode Snippets

-   Snippets 的常用语法

    -   指定光标位置：$x
    -   多光标编辑：$x $x
    -   指定 placeholder 文本：${x:placeholder}
    -   指定多选值：${x|aaa,bbb,ccc|}
    -   取变量：$VariableName
    -   对变量做转换：${VariableName/正则/替换的文本/i}

-   其中我认为常用的变量

    -   文本相关：
        -   TM_SELECTED_TEXT: The currently selected text or the empty string
        -   TM_FILENAME: The filename of the current document
        -   TM_DIRECTORY: The directory of the current document
        -   CLIPBOARD: The contents of your clipboard
    -   时间相关：
        -   CURRENT_YEAR
        -   CURRENT_MONTH
        -   CURRENT_DATE
    -   数值类：
        -   RANDOM: 6 random Base-10 digits
        -   RANDOM_HEX: 6 random Base-16 digits
        -   UUID: A Version 4 UUID
    -   注释：
        -   BLOCK_COMMENT_START: Example output: in PHP /\* or in HTML &lt;!--
        -   BLOCK_COMMENT_END: Example output: in PHP \*/ or in HTML -->
        -   LINE_COMMENT: Example output: in PHP // - snippets 中正则技巧的梳理

-   思考：

    -   snippets 和领域有较强的关系，属于一种 DSL；它本身也支持将配置文件放在项目下/编辑器全局，在同一个配置文件中也支持通过 scope 字段来控制生效的文件后缀。方便开发者根据自己的个人编程风格、具体的项目来控制 snippets 生效的范围
    -   简单尝试了一下，snippets 生成的代码片段中，没办法再次利用 snippets 的前缀来推导更深层级的代码片段。如果想要实现代码片段嵌套的生成能力，目前可以想到的办法是：先生成一段一级 snippets，生成完毕后，再定位到具体的位置去，生成二级 snippets
    -   BLOCK_COMMENT_START 等变量中对注释的处理值得学习，把 language-specific 的注释语句，抽象出来，变为 language-agnostic 的变量。不过个人认为，在 scope 的场景下，对前端来说，这个应用场景不会特别大，可能对于全栈工程师来说，应用场景会大一些，因为他们可能会接触到很多跨语言、跨技术栈的开发项目。

## 实现：

代码结构：

-   /snippet
    -   /test
    -   snippet.md
    -   snippetController2.ts
    -   snippetParser.ts
    -   snippetSession.css
    -   snippetSession.ts
    -   snippetVariable.ts

### 内置的变量

先实现了一个 VariableResolver 基类，而后实现 RandomBasedVariableResolver、TimeBasedVariableResolver 等 Class 去继承 VariableResolver。
这样的实现逻辑按照变量的分类来区分实现细节，虽然子类的内部也存在不少 if-else 这样的判断，但整体的语义已经清晰了不少了。

#### CompositeSnippetVariableResolver

```ts
export class CompositeSnippetVariableResolver implements VariableResolver {
    // what does this `constructor` part do here?
    //
    constructor(private readonly _delegates: VariableResolver[]) {
        //
    }

    resolve(variable: Variable): string | undefined {
        for (const delegate of this._delegates) {
            let value = delegate.resolve(variable);
            if (value !== undefined) {
                return value;
            }
        }
        return undefined;
    }
}
```

#### RandomBasedVariableResolver

Nothing special in its implementation, except for the uuid generation part. Can take a look at it.

```ts
const _UUIDPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUUID(value: string): boolean {
    return _UUIDPattern.test(value);
}

// prep-work
const _data = new Uint8Array(16);
const _hex: string[] = []; // maintain 256 hex numbers from 00 -> ff
for (let i = 0; i < 256; i++) {
    _hex.push(i.toString(16).padStart(2, "0"));
}

// todo@jrieken - with node@15 crypto#getRandomBytes is available everywhere, https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues#browser_compatibility
let _fillRandomValues: (bucket: Uint8Array) => Uint8Array;

declare const crypto:
    | undefined
    | { getRandomValues(data: Uint8Array): Uint8Array };

if (
    typeof crypto === "object" &&
    typeof crypto.getRandomValues === "function"
) {
    // browser
    _fillRandomValues = crypto.getRandomValues.bind(crypto);
} else {
    _fillRandomValues = function (bucket: Uint8Array): Uint8Array {
        for (let i = 0; i < bucket.length; i++) {
            bucket[i] = Math.floor(Math.random() * 256);
        }
        return bucket;
    };
}

export function generateUuid(): string {
    // get data
    _fillRandomValues(_data);

    // set version bits
    _data[6] = (_data[6] & 0x0f) | 0x40;
    _data[8] = (_data[8] & 0x3f) | 0x80;

    // print as string
    let i = 0;
    let result = "";
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += "-";
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += "-";
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += "-";
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += "-";
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    result += _hex[_data[i++]];
    return result;
}
```

### Tab 定位

### Snippet 配置文件的 parser

## Reference:

神说要有光 zxg: https://mp.weixin.qq.com/s/-mWZxLRT8Z7aO_9bCe3eDQ
microsoft official doc: https://code.visualstudio.com/docs/editor/userdefinedsnippets
github 源码: https://github.com/microsoft/vscode/tree/main/src/vs/editor/contrib/snippet
