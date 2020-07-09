一面：

1. 事件委托，怎么阻止事件冒泡  	✓
1. 怎么理解JS原型链  	✓
1. 怎么异步加载script脚本，defer和async的区别  	
1. 事件循环  	✓
1. PureComponent  	
1. 高阶组件  	
1. hooks  	
1. 你所了解的安全问题  	✓
1. 浏览器缓存  	✓
1. HTTPS，SSL，TSL握手  	
1. HTTP2.0      ✓

一面：

1. 常见数据结构 
（接上）是怎么使用的
（这个不知道该怎么回答，所以我说js数据储存是栈和堆 

1. 学过计算机网络吗    ✓
（学过一点，然后问了状态码，1xx-5xx都问了 

1. tcp三次握手     ✓

1. 重绘重排      ✓
（我说了回流重绘，然后问我改变一个div宽高会引起回流吗，改变最后一个元素的宽高会引起回流吗 

1. 事件流        ✓

1. 事件的委托    ✓
（不知道，害，还是学习不够深入 

1. flex布局.  ✓
（问实现水平居中，我：justify-content，面试官：那如果主轴设为column呢 

1. 如何实现一个盒子内左固定，右自适应      ✓

1. vue组件通信的方法（父子组件，兄弟组件 

1. vue实现双向绑定的原理，Object.defineProperty，用法（参数） ✓

1. this
（面试官手写了代码让我说输出)

1. call, apply, bind （参数，使用）   ✓

1. 闭包，手写一个         ✓

一面：

1. dubbo与http调用的区别 	
1. bind的作用与实现 	
1. 异步编程的题目 	
1. microtask和macrotask的区别 	✓
1. 为什么使用vue，vue和react的区别 	 
1. stream和同步方式处理文件有什么区别 	
1. promise的编程题 	 ✓

二面：

1. 聊项目

1. weex优缺点，有没有替代方案             ✘

1. dubbo的优点         ✘

1. 编程：按请求顺序尽可能快的打印所有response.         ✓

   ```js
   let makePromise = (value) => {
       console.log("sync", value);
       return new Promise((resolve) => {
           setTimeout(() => {
               console.log("async", value);
               resolve(value);
           }, Math.random() * 1000);
       });
   };
   
   let print = (value) => {
       console.log("print", value);
       return value;
   };
   
   let values = [1, 2, 3, 4];
   let promises = values.map((value) => makePromise(value)); // start async loading
   let parallelPromises = promises.reduce(
       (current, next) => current.then(() => next.then(print)),
       Promise.resolve() // initial value, 1st current = Promise.resolve(), it's an anonymous promise obj
   );
   parallelPromises
       .then(() => console.log("done"))
       .catch(() => console.log("failed"));
   
   ```

1. 关于setTimeout的几道编程题 	✓

1. vue响应式getter\setter原理 	✓

1. 判断Array类型有几种方法 	 ✓

   https://segmentfault.com/a/1190000006150186

   1. Array.isArray(arr)
   2. Object.prototype.toString.call(arr)

1. css：实现一个布局，item可以随着容器宽度作出如下变化（item的最小宽度为200px）      ✓  

   [Codepen](https://codepen.io/frostace/pen/xxZYzJX)

   ```css
   div.container {
       background-color: yellow;
       display: flex;
       flex-direction: row;
       justify-content: space-between;
       padding: 20px;
   }
   
   div.item {
       min-width: 200px;
       height: 100px;
       margin: 10px;
       background-color: coral;
       color: white;
       font-size: 50px;
       text-align: center;
       line-height: 100px;
   }
   
   @media screen and (max-width: 800px) {
       div.container {
           display: grid;
           grid-template-areas: 
             "item1 item2"
             "item3 item3";
           grid-template-columns: auto auto;
       }
       div.item1 {
           grid-area: "item1";
       }
       div.item2 {
           grid-area: "item2";
       }
       div.item3 {
           grid-area: "item3";
           grid-column: 1 / span 2;
       }
   }
   
   @media screen and (max-width: 600px) {
       div.container {
           display: flex;
           flex-direction: column;
       }
   }
   ```

   

![img](https://uploadfiles.nowcoder.com/images/20190326/712761_1553583540958_D2B5CA33BD970F64A6301FA75AE2EB22)

1. flex有哪些属性，分别代表什么意思          ✓

1. let const var区别 	✓

   https://juejin.im/post/5bdedd42e51d450d810a897c

1. 箭头函数与普通函数的区别            ✓

   https://juejin.im/post/5c979300e51d456f49110bf0

一面：

1. 0.1+0.2等于多少，精度丢失的原因 	✓

   https://medium.com/better-programming/why-is-0-1-0-2-not-equal-to-0-3-in-most-programming-languages-99432310d476

1. 对象继承的编程题 	

1. 异步编程的输出顺序 	✓

1. 浏览器事件循环 	✓

1. vue中nextTick有什么用，怎么实现 	✓

1. vue响应式原理 	✓

1. 为什么vue data是一个函数而不是一个对象 	

1. 知道的http头 	

1. 浏览器缓存，no-cache和no-store的区别 	 	✓

   no-store: not storing at all

   No-cache: stored locally, but not able to use it as cache

1. let const var区别 	 	✓

1. webpack.then原理 	

1. 箭头函数与普通函数的区别 	✓

1. 快排思路及时间复杂度，如果头尾指针每次相遇都在1/3处，其时间复杂度是多少（orz） 	✓

   O(n * log1.5(n)) 	

1. 编程题：输入任意数量的数组，输出它们的笛卡尔积

二面：

1. 为什么离职

1. 聊项目

1. TCP和UDP区别

   

1. DNS服务是做什么的，用TCP还是UDP实现	✓

   https://www.zhihu.com/question/310145373


二面：

1. 一些运用闭包的编程题 	
1. 盒子模型、border-box 	
1. 行内元素和内联元素 		✓
1. css: 图片自适应撑满容器，但不改变比例 		✓
1. css: 容器自适应宽高，但比例不变 	
1. 一个flex的场景，计算其伸缩后的宽度 	
1. 谈谈实现一个virtualList的思路 	
1. 介绍项目从开发到发布的所有流程 	
1. 介绍一下用node做健康检查 	
1. 一些node多进程场景分析 	         ✘

三面：

1. js中处理大数 	
1. cookie里的字段，httponly有什么用 		✓
1. 你们的node是怎么搜集日志、怎么做监控 	
1. xss是什么，怎么预防 		✓
1. 浏览器输入url全过程，越详细越好 		✓
1. 后续问题：
   1. dns查找过程	✓
   1. https与http区别及其过程	✓
   1. 为什么要三次握手	✓
   1. 浏览器强缓存和协商缓存	✓
   1. TCP重传的机制	✓
   1. 浏览器最多能同时发送多少个http请求 	

编程题：

​			找出两个有序数组中的重复项，分析时间和空间复杂度，然后就是不断优化优化优化。。 	

​			要是数组长度非常大会出现什么情况？



一面：

1. 自我介绍      
2. ​    项目难点      
3. ​    uni-app的底层实现原理（如何实现跨平台的）      	         ✘
4. ​    uni-app和flutter的区别      	         ✘
5. ​    提到的actions是做什么的      	         ✘
6. ​    为什么要用key      	         ✘
7. ​    key用index和id的区别      	         ✘
8. ​    原型链的了解      
9. ​    typeof判断数组结果是什么      	✓
10. ​    instanceof呢      	✓
11. ​    this指向的一些题打印结果      
12. ​    bind call apply      	✓
13. ​    异步处理方式      	✓
14. ​    事件循环原理      	✓
15. ​    数组的一些操作方法      	✓
16. ​    编程：     

- ​    最长不重复子串的长度      
- ​    每隔1s打印0~n（问原因和原理）

1. 自我介绍      

2. Axios的原理      

3. 原生ajax对XHR怎么做处理的      

4. 对Fetch有了解吗      

5. Fetch第一次请求之后返回什么（204）      	✓

6. Options请求有请求体吗      	✓

7. Http请求有哪些参数      	✓

8. Http有哪些请求方式      

9. Put和Post的区别      

10. 提交表单content-type是什么类型      

    https://blog.windrunner.me/programming/form-content-type.html

    https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data

    * multipart/form-data

      binary (non-alphanumeric) data (or a significantly sized payload) to transmit

    * application/x-www-form-urlencoded

      otherwise

      ```text
      var1=value1&var2=value2
      ```

11. 提交表单还有哪些类型      

12. 哪种更好更通用      

13. 上传文件content-type是什么类型      

    https://juejin.im/post/5db3998051882568eb7ea3df

14. 移动端自适应适配布局的实现方法      	✓

15. new期间发生了什么      	✓

16. vue组件通信方式      

17. 兄弟组件的通信方式      

18. vue3.0的新特性      

19. 说一下proxy的原理      

20. 说一下vue双向绑定的实现      	✓

21. 编程：     

- 检查回文字符串（英文大小不敏感）（忽略除英文以外的字符）      
- 抓石子问题（可能出现的情况）（可能性总数）（判断必胜情况）     

一面：

1. 自我介绍
2. 网络分层模型，协议，TCP与UDP，TCP三次握手，四次挥手
3. https，对称加密，非对称加密，怎么检测公钥
4. 浏览器缓存
5. ES6
6. Promise A+规范
7. 项目优化
8. 移动端适配，rem原理
9. Vue MVVM
10. 实现一个发布-订阅模式，事件触发机制
11. webpack实现代码拆分的方式有哪些

二面：

1. 自动化测试内容相关
 2. 项目相关，登录怎么实现的、轮播图
 3. 图片懒加载怎么实现，问的很详细
 4. 实现一个节流函数，要求可以在最后执行一次
 5. 项目里边为什么要用CDN     	✓
 6. 编程题 找出某个数字在一个有序数组中出现的索引范围      	✓
 7. 浏览器缓存，cookie, sessionStorage, localStorage, 缓存容量是对同一个站点的限制还是浏览器本身的限制？

三面：

三面是交叉面，问的主要是项目和个人经历，还会问最近看了什么书，会根据你看的内容进行考察，面试官挺随和，面试完了之后说HR会联系你的。。 

感觉考察的是个人的业务能力吧，最后写了一个寄生组合继承，而且要求子类会保留自身原型上定义的属性和方法

HR面

1. 个人经历
2. 项目
3. 优缺点
4. 介绍项目组
5. 反问环节

一面：

1. 判断链表有环（完全忘了，大三做过
2. vue响应式原理    	✓
3. http2.0（答的不好
4. 手撕观察者模式（写代码，撕出来了
5. 实现axios（不会
6. 实现深拷贝（之前复习没考虑symbol等es6属性，还有循环引用，所以答的不好
7. sessionStorage相关，不同标签页一起缓存（答错，从来没看到过以前有这个说法

一面：

1. vue3.0了解吗？有什么新特性？（答了Proxy、静态树、TS
2. 项目难点？做了什么？（这个竟然也扯了一个

一面：

1. 去抖和节流    	✓
2. 柯里化是什么以及实现    	✓

jd一面：

1. 自我介绍
2. 原型以及原型链    	✓
3. 闭包    	✓
4. 继承，最佳，寄生组合继承缺点（没答上，没get这个意思
5. promise的方法，规范（规范没看过，回答了原理，但是他也没叫我实现
6. 用了es6什么
7. async原理（说是generator的语法糖，返回的是promise，少说了自带执行器
8. sessionStroage的使用（项目相关
9. 响应式设计怎么做（项目相关    	✓
10. git命令（项目相关    	✓
11. vue响应式设计，vue3.0用proxy的原因
12. vue组件好处
13. 优化实践（一两个点，说了图片tiny、嵌套对象、vue-key、dom操作    	✓
14. 用过测试框架吗？（没有。没有？没有。感觉面试官有点失望    	✓

一面：

1. post打开新页面
2. axios用到什么设计模式
3. http缓存
4. 浏览器缓存
5. 闭包，执行上下文    	✓

一面：

两个栈实现队列（没答出来，因为想成始终维护成一个最外面的在栈底的类汉诺塔
webpack相关（答的不好
前端的最佳实践（因为简历上写了，然后他问最佳实践是什么实践、这个不会答

富途一面
1. 自我介绍
2. 项目讲解
3. h5适配方案
3. get post区别
4. hash 参数区别
5. content-type
6. Promise的使用和原理
6. js单线程
6. 浏览器缓存： cookie、sessionStorage、localStorage; http缓存
7. 算法题： 爬楼梯算法，洗牌算法，子集算法
8. http结构体
9. 性能优化
10. webpack
11. 前端安全

一面：

1. JWT（楼主简历有写，但是面试忘了。。。很尴尬，面试官人很好让我不要紧张发挥出正常水平）
1. 想不起来JWT我说那我说下token
1. cookie session机制原理 cookie存储
1. a.b.com和c.b.com可以共用cookie吗
1. 同源限制（应该是上一个问题答错了面试官在引导）
1. localStorage sessionStorage
1. vue双向数据绑定
1. es6了解多少
1. 箭头函数 普通函数
1. promise状态 API
1. 项目中的关键字搜索（后端怎么实现。。不知道）、
1. node.js 数据库了解吗。。不了解（可能是我项目说用到了这些后端技术栈。。但是其实只是用了 。。果断简历项目里删了）
1. 怎么学习计算机基础知识的
1. 研究生主要课程。。。很尴尬我是通信的专业课一多半竟然是数学。。
1. TCP三次握手 四次挥手
1. TCP报文结构（真的不知道。。。面试官一直引导。。就是答不出来）
1. node.js启动项目通过什么请求后端接口（蒙 请求都包含什么 url是域名还是ip+端口）
1. 域名解析（返回的只有ip地址吗 有端口号吗 端口号做什么的 太蠢了 面试官说我这块可以再思考一下这些概念性东西 挺重要的）
1. 死锁 解决方法
1. 常见排序算法（介绍一下桶排序。。 尴尬 忘了）
1. 快排（是因为我前面说的感觉我对快排很熟悉，面试官比较好只让我写了快排）

二面：

1. 编程题 sum(1)(2)(3).valueOf() 只写出了柯里化。。之前有面经有这道题 我没看过 后来面完才发现
1. 一道常见的事件轮询，直接说输出 再解释一下
1. 编程题 js并发什么异步 控制执行顺序。。。 直接被ko 看见并发就想到了后端
1. 编程题 一亿个数字找到最大的一千个（大顶堆。。我当时在迷什么哈希 面试官后来引导能不能用排序做 怎么改进 又凉一道）
1. 逻辑题 红蓝墨水
1. 编程题 深拷贝
1. 按照简历问项目 准备的太差
1. 有什么想问我的

一面：

1. 前端性能优化
2. https
3. Vue eventBus
4. 动画 animation
5. osi 七层模型
6. xss && csrf
7. 跨域解决方案
8. coding 题：
   将下列格式转换为另一种格式

```json
{
    HappyPack:1,
    UserName:1,
    CompleteData:{
      	PhoneNumber:132
    },
}
{
    happy_pack:1,
    user_name:1,
    complete_data:{
     	 	phone_number:132
    },
}
```

二面：

1. 项目介绍
2. coding 写一个 vue 计算器组件
3. coding 一段动画的实现
4. coding 题目忘了...

三面：

1. 项目介绍
2. 计算机网络
3. 圣杯布局、双飞翼布局
4. 手写 promise
5. 情景题：双十一抢购设计倒计时

一面：

1. osi7 层模型
1. http 报文内容
1. https http2.0
1. 非对称加密发生在什么时候
1. DNS 劫持
1. xss && csrf
1. 跨域解决方案
1. Promise 设计模式
1. node
1. coding 把驼峰转下划线

二面：

1. 项目介绍
1. coding 写一个 vue 父子组件双向绑定
1. coding 获取页面所有节点，并且输入 1-n 返回相应数量排序的节点，比如 div 数量最多，则输入 1，返回 div，如果不存在返回 null

三面：

做题：

```
实现方法，判定给定的任意5-7张牌中是否*含有*同花顺牌型。
什么是同花顺：5张牌，牌面数字连续，并且花色相同，即可构成同花顺
 
一副牌4种花色分别是♠, ♥, ♣, ♦，每个花色从A到K共13张牌，总共4*13=52张牌
 
要求：用0-51表示这52张牌，按照顺序，♠A-♠K为0-12，♥A-♥K为13-25，♣A-♣K为26-38，♦A-♦K为39-51
 
实现方法，对于给定的数组input，返回true或者false
function judge(input) {}
 
例如：
input [6,2,3,4,5] return true
input [11,21,31,41,51] return false
input [0,2,4,5,6,7,8] return true
```

1. webp png 区别
2. 懒加载
3. 动态表单
4. webpack

二面：

js:
主要是两道题目，需求会不断变化

1. 写一个字符串缩写函数
   example: internationalization => i18n
    alias => a3s
   如果字符长度<4，则输出全部字符
   num => num
   并且可能输入一个句子，字符内容是只包含 a-z A-Z,其他均为分隔符
   '-important-num-alias' => "-i6t-num-a3s"
2. debounce 防抖函数
   需求 1:常规防抖
   需求 2:要求在第一次调用时候，立即执行，后面调用的时候如果还在 wait 时间内，则不会调用，并且就算重复调用，也不会延时执行 2:要求在第一次调用时候，立即执行，后面调用的时候如果还在 wait 时间内，则不会调用，并且就算重复调用，也不会延时执行

example: debounce(func,wait) wait=500ms
0ms debounce 立即执行
100ms debouce 不执行
200ms debounce 不执行
700ms nothing happened
800ms debounce 立即执行

css：

1. position 有几个值以及作用
2. display:block | display:inline 区别以及作用
3. display:flex 相对于的值以及应用（主要是三栏布局然后问了下设置 flex-grow:1,flex-shrink:1，布局会发生什么变化）

web development:

1. cookie session 区别以及使用方式和场景
2. cors
3. 除了 cookie session 还有什么验证方法（我说可以用 token jwt，然后问我流程是怎么样的，怎么验证 token）
4. https 和 http 区别
5. 在 tls 不对称加密中的客户端是怎么验证证书的
6. https 怎么防止中间人攻击
7. if you are given a job: optimize the performance of a huge single page web app, it load 2MB of JS, 500KB of CSS, what will you do? what aspect do you think might be able to optimize?

三面：

1. xss && csrf
2. jwt
3. 设计验证方式
4. coding zombie game

```
Zombie Game
0: block, 1: healthy people, 2: zombie
Each zombie can infect adjacent healthy people in 4 adjacent cells (up, down, left, right) every day
How long does it take to infect all people?
Example 1:
Day 0    Day 1    Day 2    Day 3    Day 4
-----------------------------------------------
2 1 1    2 2 1    2 2 2    2 2 2    2 2 2
1 1 0 => 2 1 0 => 2 2 0 => 2 2 0 => 2 2 0
0 1 1    0 1 1    0 1 1    0 2 1    0 2 2
Return 4
 
Example 2:
Day 0
------
2 2 2
0 2 2
1 0 2
Return -1, because the left corner ppl won't be infected
 
Example 3:
Day 0
-----
0 2
Return 0, the starting state is all ppl got infected
```

一面：

1 小时内先做 5 道题目：

1.实现嵌套数组的扁平化，要求不能使用 JSON.stringify
 输入:[1,[2,3,[4,5],[6]]
 输出:[1,2,3,4,5,6]

1. 实现一个实数的堆栈，使得其 push pop max 方法的时间复杂度为 O(1)
2. 有一个整数二维数组，每行的元素个数不同，输出它的全排列，同一行的数互斥。要求不使用递归完成

4.实现一个函数，检查二叉树是否平衡。
平衡二叉树的定义如下：任意一个节点的左右子树高度差不超过 1。假设二叉树节点一共有 N 个节点，要求算法时间复杂度不超过 O(N)。
递归判断每个节点的左子树和右子树，遇到树深大于 1 的就算得到解。

1. 实现一个 Http 请求池，需要能够限制并发数

接下来在开始面试：

1. 项目介绍
2. xss csrf
3. eventLoop
4. 其他忘记了

二面：

也是一样，先做题：

1. 合并二叉树
2. 奇偶链表
3. 字串问题

开始面试：

1. 对之前算法题询问，看是否有更优解
2. ssr && csr
3. ssr 原理 ，如何实现
4. 做过的性能优化

三面：

1. react生命周期，虚拟dom，diff算法，keys，路由，setState原理（这个没答上来）
2. ajax实现原理，以及和fetch的区别
3. 数组，和大于等于n的连续最短子序列（一开始忽略了连续，方向错导致没写完，让说了思路）
4. 设计一个类似百度搜索框那样随输随搜的，有哪些注意点
5. 跨域
6. 项目难点，怎么解决的
7. 说一说前端体系



一面(1h)
1. 聊项目，项目的难点是什么？
1. 大文件按需切片上传？断点续传和秒传？(问的很细，hash值怎么取，md5怎么加密，大文件加密很慢怎么办？)
1. 如何改写webuploader源码支持按需切片而不是平均切片？
1. js数据类型？
	基本7种，复杂1种
1. 说到对象，写个深拷贝吧？
	递归写法，正则的拷贝没写出来😂(菜鸡本菜)
1. 跨域方式，复杂请求和简单请求，什么情况发复杂请求？options请求的作用
1. bfc的作用，触发条件
1. 水平垂直居中的方式(5种)？
1. 二叉树翻转


二面(50分钟)
1. 开始还是聊项目
1. 浏览器的渲染原理(问的很细，问到绘制指令的顺序和浏览器的进程和线程是如何工作的)
1. echarts和antv的区别，举个应用当中的例子？
1. 设计题:设计一个按要求fn函数合并A,B两对象的函数
1. function deepClone(A,B,fn)
1. 输出所有可能得ip  leetcode原题(复原ip)


三面(40分钟)
1. 三面就主要是设计题了，更注重技术的灵活应用
1. 写一个节流函数，但是还要执行节流时间内重复触发的最后一次行为
1. 写一个不断旋转的三角形
1. 鼠标跟随和鼠标拖拽功能如何实现？两者原理的区别？