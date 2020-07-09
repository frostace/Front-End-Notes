# Debounce and Throttle

## Debounce

In the debouncing technique, no matter how many times the user fires the event, the attached function will be executed only after the specified time once the user stops firing the event.

[CodePen](https://codepen.io/frostace/pen/BajwKoo?editors=1111)

```html
<!-- index.html -->
<body>
  	<input class="user-name"/>
		<div class="tips">test</div>
</body>
```

```JavaScript
// no debounce
$('input.user-name').on('input', function () {
    $.ajax({
        url: `https://yesno.wtf/api`,
        method: 'post',
        data: {
            username: $(this).val(),
        },
        success(data) {
            if (data.isRegistered) {
                $('.tips').text('This username has been taken!');
            } else {
                $('.tips').text('Congrats! This username is valid!');
            }
        },
        error(error) {
            console.log(error);
        },
    });
});
```

```JavaScript
// debounce
function debounce(fn, interval = 300) {
    let timeout = null;
    return function () {
      	// no matter how many times the `fn` is triggered within 300ms interval, they will all be cleared
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, interval);
    };
}

$('input.user-name').on('input', debounce(function () {
    $.ajax({
        url: `https://yesno.wtf/api`,
        method: 'post',
        data: {
            username: $(this).val(),
        },
        success(data) {
            if (data.isRegistered) {
                $('.tips').text('This username has been taken!');
            } else {
                $('.tips').text('Congrats! This username is valid!');
            }
        },
        error(error) {
            console.log(error);
        },
    });
}));
```



## Throttle

Throttling is a technique in which, no matter how many times the user fires the event, the attached function will be executed only once in a given time interval.

[CodePen](https://codepen.io/frostace/pen/KKVXVON?editors=1111)

```JavaScript
// no throttle
$(window).on("scroll", function () {
    console.log("scroll");
    let pageHeight = $("body").height(),
        scrollTop = $(window).scrollTop(),
        winHeight = $(window).height(),
        thresold = pageHeight - scrollTop - winHeight;
    if (thresold > -100 && thresold <= 20) {
        console.log("end");
    }
});
// 102 scroll
// end
```
We can use `Closure` to maintain a mark telling us whether or not we can run this code block, once we started to run this code block, we set this mark as false and recover it after a certain time with a setTimout
```JavaScript
// throttle
function throttle(fn, interval = 300) {
    let canRun = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        fn.apply(this, arguments);
        setTimeout(() => {
            canRun = true;
        }, interval);
    };
}

$(window).on(
    "scroll",
    throttle(function () {
        console.log("scroll");
        let pageHeight = $("body").height(),
            scrollTop = $(window).scrollTop(),
            winHeight = $(window).height(),
            thresold = pageHeight - scrollTop - winHeight;
        if (thresold > -100 && thresold <= 20) {
            console.log("end");
        }
    })
);
```

## Difference between `Throttle` and `Debounce`

* Throttle

  Attempts that are not executed don't influence the time window at all

  Scenarios

  * Drag / Scroll / Resize
  * Animation

* Debounce

  Attemets that are not executed will refresh the start of the time window

  Scenarios:

  * Search Engine Autocomplete
  * Form Submission

<img src="./Debounce and Throttle.gif">

### Reference

https://zhuanlan.zhihu.com/p/107473482