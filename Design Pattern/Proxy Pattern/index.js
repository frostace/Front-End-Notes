import { proxy } from "./xhr-proxy.js";

proxy({
    //请求发起前进入
    onRequest: (config, handler) => {
        console.log(config.url);
        handler.next(config);
    },
    //请求发生错误时进入，比如超时；注意，不包括http状态码错误，如404仍然会认为请求成功
    onError: (err, handler) => {
        console.log(err.type);
        handler.next(err);
    },
    //请求成功后进入
    onResponse: (response, handler) => {
        const headers = response.headers;
        if (headers["x-lsc-code"] === "100000") {
            window.onbeforeunload = null;
            window.location.href = "https://www.baidu.com";
        }
        console.log(response.response);
        handler.next(response);
    },
});
