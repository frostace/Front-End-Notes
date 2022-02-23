package: validate-npm-package-name:
author: https://github.com/zeke

> https://github.com/npm/validate-npm-package-name

# 解决什么问题

检测 npm 的包名是否合法，相当于一个校验器。
如果这个包在 npm 发包的过程中被使用到，那么很好理解，npm 作为包管理平台，需要对包名有一个统一的规范来约束。但它在 vue-cli/create-react-app 等这些外部项目中，都有用到，是为什么呢？看起来外部项目中，就不应该出现不符合 npm 规范的包名才对。

# 解决方案

整体思路就是用正则来表达包名的规则，对字符串做校验。
从黑盒视角看，输入 1 个`string`，输出 1 个`object`表示校验的结果，使用还是非常简单的，心智负担并不大。

```ts
type Validate = (packageName: string) => {
    /** 是否满足新规则 */
    validForNewPackages: boolean;
    /** 是否满足旧规则 */
    validForOldPackages: boolean;
    /** 包名未满足的新规则 */
    errors?: string[];
    /** 包名未满足的旧规则 */
    warnings?: string[];
};
```

API 设计上来看，是有一点冗余的。当我们看到 errors 不为空的时候，其实就已经知道了 validForNewPackages 必定为 false。但如果说要用 error messages 的这个字符串数组来同时表达是否满足规则的话，语义化就没有那么清晰了。我理解是一种妥协。另外，对使用者来说，可能他并不关心具体哪里出了错，只关心这个名字是否符合规范，那么就只使用 validForNewPackages 就足够了。

## 规则集合

新的包名规则

1. 新规则的时效？
   并没有搜到一个新规则生效的时间节点。看起来好像新规则不是一次性生效的，是随着一些提案逐步从旧规则中演进而来的。
2. scope 的命名是从什么时候开始支持的？
   Aug. 8, 2014: https://github.com/npm/npm/issues/5239

-   package name length should be greater than zero
-   all the characters in the package name must be lowercase i.e., no uppercase or mixed case names are allowed
-   package name can consist of hyphens
-   package name must not contain any non-url-safe characters (since name ends up being part of a URL)
-   package name should not start with . or \_
-   package name should not contain any leading or trailing spaces
-   package name should not contain any of the following characters: ~)('!\*
-   package name cannot be the same as a node.js/io.js core module nor a reserved/blacklisted name. For example, the following names are invalid:
    -   http
    -   stream
    -   node_modules
    -   favicon.ico
-   package name length cannot exceed 214

1. 规则中提到了一个点`non-url-safe`
2. 为什么命名规范选用的是 kebab-case
   参考：https://www.zhihu.com/question/335730315
   综合`kebab-case`,`PascalCase`,`camelCase`,`lowercase`,`snake_case`这几种来看，`kebab-case`在可读性和效率上，还是不错的

旧的包名规则
旧的规则是新规则的超集，所以不满足新规则的，一定不满足旧规则。但满足旧规则的，可能不满足新规则。
所以除了对最新规则的校验外，还需要兼容到旧规则的校验，对两种规则分别处理。

-   package name length should be greater than zero
-   package name can consist of hyphens
-   package name must not contain any non-url-safe characters (since name ends up being part of a URL)
-   package name should not start with . or \_
-   package name should not contain any leading or trailing spaces

# 实现原理

主要实现了 2 个函数：`validate`和`done`

```js
"use strict";

var scopedPackagePattern = new RegExp("^(?:@([^/]+?)[/])?([^/]+?)$");
var builtins = require("builtins");
var blacklist = ["node_modules", "favicon.ico"];

var validate = (module.exports = function (name) {
    var warnings = [];
    var errors = [];

    if (name === null) {
        errors.push("name cannot be null");
        return done(warnings, errors);
    }

    if (name === undefined) {
        errors.push("name cannot be undefined");
        return done(warnings, errors);
    }

    if (typeof name !== "string") {
        errors.push("name must be a string");
        return done(warnings, errors);
    }

    if (!name.length) {
        errors.push("name length must be greater than zero");
    }

    if (name.match(/^\./)) {
        errors.push("name cannot start with a period");
    }

    if (name.match(/^_/)) {
        errors.push("name cannot start with an underscore");
    }

    if (name.trim() !== name) {
        errors.push("name cannot contain leading or trailing spaces");
    }

    // No funny business
    blacklist.forEach(function (blacklistedName) {
        if (name.toLowerCase() === blacklistedName) {
            errors.push(blacklistedName + " is a blacklisted name");
        }
    });

    // Generate warnings for stuff that used to be allowed

    // core module names like http, events, util, etc
    builtins.forEach(function (builtin) {
        if (name.toLowerCase() === builtin) {
            warnings.push(builtin + " is a core module name");
        }
    });

    // really-long-package-names-------------------------------such--length-----many---wow
    // the thisisareallyreallylongpackagenameitshouldpublishdowenowhavealimittothelengthofpackagenames-poch.
    if (name.length > 214) {
        warnings.push("name can no longer contain more than 214 characters");
    }

    // mIxeD CaSe nAMEs
    if (name.toLowerCase() !== name) {
        warnings.push("name can no longer contain capital letters");
    }

    if (/[~'!()*]/.test(name.split("/").slice(-1)[0])) {
        warnings.push(
            'name can no longer contain special characters ("~\'!()*")'
        );
    }

    if (encodeURIComponent(name) !== name) {
        // Maybe it's a scoped package name, like @user/package
        var nameMatch = name.match(scopedPackagePattern);
        if (nameMatch) {
            var user = nameMatch[1];
            var pkg = nameMatch[2];
            if (
                encodeURIComponent(user) === user &&
                encodeURIComponent(pkg) === pkg
            ) {
                return done(warnings, errors);
            }
        }

        errors.push("name can only contain URL-friendly characters");
    }

    return done(warnings, errors);
});

validate.scopedPackagePattern = scopedPackagePattern;

var done = function (warnings, errors) {
    var result = {
        validForNewPackages: errors.length === 0 && warnings.length === 0,
        validForOldPackages: errors.length === 0,
        warnings: warnings,
        errors: errors,
    };
    if (!result.warnings.length) delete result.warnings;
    if (!result.errors.length) delete result.errors;
    return result;
};
```

## 分析

### `validate`

1. 为什么不符合有些规则的时候，就直接 return，而不符合另一些规则的时候，则是先将报错信息 push 进数组，最后再 return？
   我理解是，规则也是有分层的，有些规则是 edge-case，比如空值、非字符串，它们甚至都不可能是个 name，所以就没必要进入主流程，再做下一步的判断了。

```js
// edge case: 非字符串不进入主流程
// 前2个条件是第3个条件的真子集
if (name === null) {
    errors.push("name cannot be null");
    return done(warnings, errors);
}

if (name === undefined) {
    errors.push("name cannot be undefined");
    return done(warnings, errors);
}

if (typeof name !== "string") {
    errors.push("name must be a string");
    return done(warnings, errors);
}
```

2. 处理 `url-friendly` 规则的地方，看着有点奇怪

```js
if (encodeURIComponent(name) !== name) {
    // Maybe it's a scoped package name, like @user/package
    var nameMatch = name.match(scopedPackagePattern);
    if (nameMatch) {
        var user = nameMatch[1];
        var pkg = nameMatch[2];
        if (
            encodeURIComponent(user) === user &&
            encodeURIComponent(pkg) === pkg
        ) {
            return done(warnings, errors);
        }
    }

    errors.push("name can only contain URL-friendly characters");
}
```

最前面的地方的 3 个规则直接 return 是因为他们是 edge case，比较特殊，好理解。但这里，位于整个主流程马上要结束的地方，突然多出现一个 return 有一点反直觉。
这里的逻辑是说，只有 scoped package name 的写法，允许出现`@`和`/`这 2 个并不`url-friendly`的字符。可以认为是这个子流程中的一个 edge case，满足的话，就直接结束。但如果后续又有新的命名规范需要补充到`url-friendly` 规则的后面，这里就不能直接 return 了，因为还需要再对后续的规则做进一步判断。
个人理解，要么把这条 edge case 提前，要么这里不用 return，把条件反置一下，会更好理解一些。因为主流程的分支中有时出现 done，有时又不出现，在视觉上是不太统一的，会增加一些阅读者的心智负担。
String.prototype.match，scopedPackagePattern 这个规则命中的话，nameMatch[1]和 nameMatch[2]必定是合法的。
另外，搜索了一下 issues，这里还有一个奇怪的点，就是`_packagename`这个名称是不合法的，而`@scope/_packagename`却又变成合法的了。参考：https://github.com/npm/validate-npm-package-name/issues/10

### `done`

1. 结构很简单，对 validForNewPackages 和 validForOldPackages 的处理也基本符合推测。
2. 为什么要将 done 中的逻辑抽出来单独作为一个函数
   类似状态机的思路，主流程的所有分支结束后，都会收束到这个完成的状态来。那么就可以用一个 done 函数来表达这个完成态。

### 其他

1. `builtins` 是什么东西
   维护了 nodejs 的 core modules，其中出现的 module name，都不允许作为 package name
   https://www.npmjs.com/package/builtins

2. `validate.scopedPackagePattern = scopedPackagePattern;`是个什么操作
   把 validate 方法所用到的 scope package 的判断规则，暴露给外部。但对于没有类型的 lib 来说，这个感知本身就较弱，并且外部即使可以看到这个 pattern，也是无法修改的。本身这个 npm 命名规范是相对稳定的，更改的频率不会高，其中这个 scope package 的正则就更稳定了，几乎不会变动，感觉这里暴露出去，意义并不是很大。

```js
function validate(a) {
    console.log(a);
}

validate.pattern = new RegExp(/haha/);

validate.prototype;
/**
 *  {
 *      constructor: {
 *          pattern: /haha/
 *          length: 1
 *          name: 'validate'
 *          ...
 *      }
 *  }
 */
```

## 优化思考

1. 用元数据维护规则的序列，遍历一遍，得到 warnings/errors。

```ts
const builtins = require("builtins");
// validator的这个设计不知道能不能更优雅一些
type BaseValidator = (packageName: string) => string[];

interface Rule {
    validator: BaseValidator;
}

type Validate = (packageName: string) => {
    /** 是否满足新规则 */
    validForNewPackages: boolean;
    /** 是否满足旧规则 */
    validForOldPackages: boolean;
    /** 包名未满足的新规则 */
    errors?: string[];
    /** 包名未满足的旧规则 */
    warnings?: string[];
};

const blacklist = ["node_modules", "favicon.ico"];
var scopedPackagePattern = new RegExp("^(?:@([^/]+?)[/])?([^/]+?)$");

const edgeCases: Rule[] = [
    {
        validator: (name) =>
            [null, undefined].includes(name)
                ? [`name cannot be ${String(name)}`]
                : [],
    },
    {
        validator: (name) =>
            typeof name !== "string" ? ["name must be a string"] : [],
    },
];

const modernRules: Rule[] = [
    {
        validator: (name) =>
            !name.length ? ["name length must be greater than zero"] : [],
    },
    {
        validator: (name) =>
            name.match(/^\./) ? ["name cannot start with a period"] : [],
    },
    {
        validator: (name) =>
            name.match(/^_/) ? ["name cannot start with an underscore"] : [],
    },
    {
        validator: (name) =>
            name.trim() !== name
                ? ["name cannot contain leading or trailing spaces"]
                : [],
    },
    {
        validator: (name) => {
            const errors = [];
            blacklist.forEach(function (blacklistedName) {
                if (name.toLowerCase() === blacklistedName) {
                    errors.push(blacklistedName + " is a blacklisted name");
                }
            });
            return errors;
        },
    },
    {
        validator: (name) => {
            // Maybe it's a scoped package name, like @user/package
            const nameMatch = name.match(scopedPackagePattern);
            const scopeNotFriendly =
                nameMatch?.[1] &&
                encodeURIComponent(nameMatch[1]) !== nameMatch[1];
            const pkgNotFriendly =
                nameMatch?.[2] &&
                encodeURIComponent(nameMatch[2]) !== nameMatch[2];
            if (
                (!nameMatch && encodeURIComponent(name) !== name) ||
                scopeNotFriendly ||
                pkgNotFriendly
            ) {
                return ["name can only contain URL-friendly characters"];
            }
            return [];
        },
    },
];

const legacyRules: Rule[] = [
    {
        validator: (name) => {
            const warnings = [];
            builtins.forEach(function (builtin) {
                if (name.toLowerCase() === builtin) {
                    warnings.push(builtin + " is a core module name");
                }
            });
            return warnings;
        },
    },
    {
        validator: (name) =>
            name.length > 214
                ? ["name can no longer contain more than 214 characters"]
                : [],
    },
    {
        validator: (name) =>
            name.toLowerCase() !== name
                ? ["name can no longer contain capital letters"]
                : [],
    },
    {
        validator: (name) =>
            /[~'!()*]/.test(name.split("/").slice(-1)[0])
                ? [`name can no longer contain special characters ("~\'!()*")`]
                : [],
    },
];

const validate: Validate = (packageName: string) => {
    const errors = [];
    const warnings = [];
    // edge case
    edgeCases.forEach((rule) => errors.push(...rule.validator(packageName)));
    if (errors.length) {
        return done(warnings, errors);
    }

    // modern rules
    modernRules.forEach((rule) => errors.push(...rule.validator(packageName)));

    // legacy rules
    legacyRules.forEach((rule) =>
        warnings.push(...rule.validator(packageName))
    );

    return done(warnings, errors);
};

const done = (warnings: string[], errors: string[]) => {
    var result = {
        validForNewPackages: errors.length === 0 && warnings.length === 0,
        validForOldPackages: errors.length === 0,
        warnings: warnings,
        errors: errors,
    };
    if (!result.warnings.length) delete result.warnings;
    if (!result.errors.length) delete result.errors;
    return result;
};
```

经测试，可以 pass 仓库中的 22 条用例

2. 如果有 100 万个包名，要来检测是否合法，目前的实现，性能怎么样？和我的实现相比，时空间消耗怎么样
   不严谨地测试了下，2100 万包名
   |consumption|validate-npm-package-name|mine|
   |--- |---|---|
   |time |1068(ms)|1857(ms)|
   |memory |2.06(MB)|0.62(MB)|

测试结果会有波动，但大致的关系没有变化。
我的方案时间上消耗会大很多，可能是因为其中包含了很多的函数调用。但为什么空间上反而小了很多，暂时没有想明白。

```js
const validate = require("..");
gc();
const initialUsage = process.memoryUsage();

const start = new Date();

const names = [
    "some-package",
    "example.com",
    "under_score",
    "period.js",
    "123numeric",
    "crazy!",
    "@npm/thingy",
    "@npm-zors/money!time.js",
    "",
    ".start-with-period",
    "_start-with-underscore",
    "contain:colons",
    " leading-space",
    "trailing-space ",
    "s/l/a/s/h/e/s",
    "node_modules",
    "favicon.ico",
    "http",
    "ifyouwanttogetthesumoftwonumberswherethosetwonumbersarechosenbyfindingthelargestoftwooutofthreenumbersandsquaringthemwhichismultiplyingthembyitselfthenyoushouldinputthreenumbersintothisfunctionanditwilldothatforyou-",
    "ifyouwanttogetthesumoftwonumberswherethosetwonumbersarechosenbyfindingthelargestoftwooutofthreenumbersandsquaringthemwhichismultiplyingthembyitselfthenyoushouldinputthreenumbersintothisfunctionanditwilldothatforyou",
    "CAPITAL-LETTERS",
];

for (let i = 0; i <= 1000000; i += 1) {
    validate(names[i % 12]);
}

const end = new Date();
console.log("time: ", end - start);

const finalUsage = process.memoryUsage();
console.log(
    "memory: ",
    (finalUsage.heapUsed - initialUsage.heapUsed) / 1024 / 1024
);
```

## 拓展视野

1. react/vue 等项目为什么要用这个包，是怎么使用这个包的

-   vue create

```js
const result = validateProjectName(name);
if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`));
    result.errors &&
        result.errors.forEach((err) => {
            console.error(chalk.red.dim("Error: " + err));
        });
    result.warnings &&
        result.warnings.forEach((warn) => {
            console.error(chalk.red.dim("Warning: " + warn));
        });
    exit(1);
}
```

初始化一个 vue-app 的时候，会检查 app 的名称是否符合 npm 规范，感觉是合理的，因为以后这个应用很可能也会发到 npm 上去，在创建时就做检查，避免了以后再修改的麻烦。

-   create-react-app

```js
const validationResult = validateProjectName(appName);
if (!validationResult.validForNewPackages) {
    console.error(
        chalk.red(
            `Cannot create a project named ${chalk.green(
                `"${appName}"`
            )} because of npm naming restrictions:\n`
        )
    );
    [
        ...(validationResult.errors || []),
        ...(validationResult.warnings || []),
    ].forEach((error) => {
        console.error(chalk.red(`  * ${error}`));
    });
    console.error(chalk.red("\nPlease choose a different project name."));
    process.exit(1);
}
```

2. 其他人是怎么阅读这个包源码的

-   https://zhuanlan.zhihu.com/p/362147023

-   https://juejin.cn/post/7012047954995314701

这位奶爸分享的可视化正则表达式工具挺有意思：https://jex.im/regulex/#!flags=&re=%5E(a%7Cb)*%3F%24

~~工具作者：https://github.com/CJex，最后一次commit message 是 Suicide，惋惜。~~

# 总结

如何读源码

-   先了解一下这个包的目的，作者将它创造出来是为了解决什么问题
-   扫一眼 readme 的 outline，以及 changelog / commits 的内容，了解整体框架和提交历史中大版本的变更情况
-   了解源码的整体文件结构，从命名中 get 到一些领域划分的思路等
-   阅读源码细节时，可以结合 test case 来读

# 参考资料

-   https://github.com/npm/validate-npm-package-name
-   https://codesandbox.io/s/validate-npm-package-name-demo-eoxuz
-   https://www.zhihu.com/question/335730315
-   https://github.com/npm/validate-npm-package-name/issues/10
-   https://www.npmjs.com/package/builtins
-   https://github.com/facebook/create-react-app/blob/04482a6c2c6639c19deb330c48e4fa5573a1654e/packages/create-react-app/createReactApp.js#L48
-   https://github.com/vuejs/vue-cli/blob/HEAD/packages/@vue/cli/lib/create.js
-   https://zhuanlan.zhihu.com/p/362147023
-   https://juejin.cn/post/7012047954995314701
-   https://stackoverflow.com/questions/20018588/how-to-monitor-the-memory-usage-of-node-js/30087518
