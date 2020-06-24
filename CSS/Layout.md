# CSS Layout Practice

## Problem 1:

实现一个左右布局，左边固定100PX，右边可伸缩，高度沾满整个屏幕.

右侧正中间有个长方形，长方形长宽比4：3，长是父元素的50%.

The main problem here is to maintain the ratio of the rectangle at 4:3 while keeping the width of the element 50% of the parent element.

### Solution 1:

We can center the rectangle using flex layout easily.

Percentage in padding property is computed with respect to the width of the parent element. We can set the original `height` of the rectangle to 0 and give it a correct percentage (37.5%) in `padding-bottom` / `padding-top` so that the actual height of the rectangle is taking is 3 / 4 of its own width.

```html
<div class="parent">
    <div class="child child1"></div>
    <div class="child child2">
      	<div class="rect"></div>
    </div>
</div>
```

```css
.rect {
    width: 50%;
    height: 0;
    padding-bottom: 37.5%;
}
```

Complete CSS code: [CodePen](https://codepen.io/frostace/pen/mdVwJVE)

```css
.parent {
    display: grid;
    grid-template-columns: 100px auto;
    width: 100vw;
    height: 100vh;
}

.child1 {
  	background-color: coral;
}
.child2 {
    background-color: violet;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.rect {
    background-color: white;
    width: 50%;
    height: 0;
    padding-bottom: 37.5%;
}
```

### Solution 2: 

Use `::before` pseudo-element to assign width and height with ratio. And we have to take use of the first trick `padding-bottom` as well.

```html
<div class="parent">
    <div class="child child1"></div>
    <div class="child child2"></div>
</div>
```
Complete CSS code: [CodePen](https://codepen.io/frostace/pen/VweWvLW)

```css
.parent {
    display: grid;
    grid-template-columns: 100px auto;
    width: 100vw;
    height: 100vh;
}

.child1 {
  	background-color: coral;
}
.child2 {
    background-color: violet;
    position: relative;
}
.child2::before {
    background-color: white;
    display: inline-block;
    content: "";
  	/* keep width-height ratio */
    width: 50%;
    height: 0;
    padding-top: 37.5%;
  	/* center the rectangle */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
}
```

