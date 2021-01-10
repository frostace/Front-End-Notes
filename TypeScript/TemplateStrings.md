# Template Strings

`Template Strings`: strings that use backticks (i.e. `` `) instead of single (`'`) or double (`"`) quotes.

Motivations:

- String Interpolation
- Multiline Strings
- Tagged Templates

## String Interpolation

```js
var lyrics = 'Never gonna give you up';
var html = '<div>' + lyrics + '</div>';
```

```js
var lyrics = 'Never gonna give you up';
var html = `<div>${lyrics}</div>`;
```

placeholder inside the interpolation `${` and `}` is treated as a JavaScript expression:

```js
console.log(`1 and 1 make ${1 + 1}`);
```

## Multiline Literals

with string literals we will have to add:

- Escape character `\`
- Newline character `\n`

```js
var lyrics = "Never gonna give you up \
\nNever gonna let you down";
```

Now with `template string`

```typescript
var lyrics = `Never gonna give you up
Never gonna let you down`;
```

## Tagged Templates

You can place a function (called a `tag`) before the template string and it gets the opportunity to pre process the template string literals plus the values of all the placeholder expressions and return a result. A few notes:

- All the static literals are passed in as an array for the first argument.
- All the values of the placeholders expressions are passed in as the remaining arguments. Most commonly you would just use rest parameters to convert these into an array as well.

Purpose is to turn some content in the placeholder expressions into Unicode so that they won't conclict with HTML tags.

```typescript
var say = "a bird in hand > two in the bush";
var html = htmlEscape`<div> I would just like to say : ${say}</div>`;

// a sample tag function
function htmlEscape(literals: TemplateStringsArray, ...placeholders: string[]) {
    let result = "";

    // interleave the literals with the placeholders
    for (let i = 0; i < placeholders.length; i++) {
        result += literals[i];
        result += placeholders[i]
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
		}

    // add the last literal
    result += literals[literals.length - 1];
    return result;
}

console.log(html);
```

