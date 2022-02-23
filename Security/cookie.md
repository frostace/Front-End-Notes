# DEFINITION
> An HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to a user's web browser. The browser may store the cookie and send it back to the same server with later requests. Typically, an HTTP cookie is used to tell if two requests come from the same browser—keeping a user logged in, for example. It remembers stateful information for the stateless HTTP protocol.

## Usage
- Session management
Logins, shopping carts, game scores, or anything else the server should remember

- Personalization
User preferences, themes, and other settings

- Tracking
Recording and analyzing user behavior

# OTHER approaches to storing data in the browser
1. Web storage API

# HOW to set cookie
1. Response Header returned from server side
```pre
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: cookie_name1=cookie_value1
Set-Cookie: cookie_name2=cookie_value2; expires=Sun, 16 Jul 3567 06:23:41 GMT

[content of the page here]
```

2. JavaScript Access
```js
document.cookie = "name=oeschger; SameSite=None; Secure";
```

# Security Issue


# Cookie Compliance


# REFERENCE
mdn cookie intro: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

troubleshoot "cannot set cookie" issue: https://juejin.cn/post/6844903748586700808
