# Regexp



Parse URL params

```js
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
parseParams(url);

// expected:
// { 
//     user: 'anonymous',
//     id: [ 123, 456 ], 	// 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
//     city: '北京', 			 // 中文需解码
//     enabled: true, 		// 未指定值得 key 约定为 true
// }

function parseParams(url) {
    // find ?
    let startIdx = url.search(/\?/) + 1;
    // find &
    let paramStrs = url.slice(startIdx).split("&");
    let params = {};
    for (let paramStr of paramStrs) {
        // find =
        let pair = paramStr.split("=");
        // boolean
        if (pair.length === 1) {
            params[pair[0]] = true;
            continue;
        }

        // encapsulate as array
        let [key, val] = pair;
        val = decodeURI(val);
        if (!isNaN(Number(val))) val = Number(val); // try to parse number

        console.log(key, val);
        if (key in params) {
            params[key] = params[key].isArray
                ? [...params[key], val]
                : [params[key], val];
        } else {
            params[key] = val;
        }
    }

    return params;
}
```

Convert hyphen to CamelCase

```js
var s1 = "get-element-by-id"

// f(s1)
// getElementById

var f = function(s){
    return s.replace(/-\w/g, function(x){
      	return x.slice(1).toUpperCase();
    })
}
```

