# Shallow Copy vs Deep Copy

```js
a = b
```

* primitive type passes value
* complex type passes address



The discussion is based on `Object` operations:


||Pass value|Shallow Copy|Deep Copy|
|---|---|---|---|
|Space Allocation|obj address -> stack<br />obj -> heap|obj address, 1st layer property address, 1st layer property value -> stack<br />>= 2nd layer property address, value -> heap|every address -> stack<br />every value -> heap|
|Scenario||||

## Shallow Copy

```js
// shallow copy
var obj2 = shallowCopy(obj1);
function shallowCopy(source) {
    var target = {};
    for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
          	target[prop] = source[prop];
        }
    }
    return target;
}
```

## Deep Copy

```js
// deep copy
var obj2 = JSON.parse(JSON.stringify(obj1));
```

Cons:

* Cannot handle `RegExp`, `Function`
* Will abandon `constructor` of the original object, new `constructor` will always be `Object`
* Will cause error when there is circular reference

In order to resolve these issues, we have to do the following:

* Create a type check function
* Extract `flags` from RegExp objects

```js
// type check 
const isType = (obj, type) => {
    if (typeof obj !== 'object') return false;
    const typeString = Object.prototype.toString.call(obj);
    let flag;
    switch (type) {
        case 'Array':
            flag = typeString === '[object Array]';
            break;
        case 'Date':
            flag = typeString === '[object Date]';
            break;
        case 'RegExp':
            flag = typeString === '[object RegExp]';
            break;
        default:
          	flag = false;
    }
    return flag;
};
```

```js
// extract flags
const getRegExp = re => {
    var flags = '';
    if (re.global) flags += 'g';
    if (re.ignoreCase) flags += 'i';
    if (re.multiline) flags += 'm';
    return flags;
};
```

Now we can do the implementation of `Deep Copy`

```js
/**
* deep clone
* @param  {[type]} parent object to be cloned
* @return {[type]} child object to return
*/
const clone = parent => {
    // 2 arrays to maintain circular reference
    const parents = [];
    const children = [];

    const _clone = parent => {
      	if (parent === null) return null;
      	if (typeof parent !== 'object') return parent;

      	let child, proto;

      	if (isType(parent, 'Array')) {
            // 对数组做特殊处理
            child = [];
      	} else if (isType(parent, 'RegExp')) {
        		// 对正则对象做特殊处理
        		child = new RegExp(parent.source, getRegExp(parent));
        		if (parent.lastIndex) child.lastIndex = parent.lastIndex;
      	} else if (isType(parent, 'Date')) {
        		// 对Date对象做特殊处理
        		child = new Date(parent.getTime());
      	} else {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent);
            // 利用Object.create切断原型链
            child = Object.create(proto);
      	}

        // 处理循环引用
        const index = parents.indexOf(parent);

        if (index != -1) {
            // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
            return children[index];
        }
        parents.push(parent);
        children.push(child);

        for (let i in parent) {
            // 递归
            child[i] = _clone(parent[i]);
        }

        return child;
    };
    return _clone(parent);
};
```



### Reference

https://juejin.im/post/59ac1c4ef265da248e75892b

https://juejin.im/post/5abb55ee6fb9a028e33b7e0a