# Box Model

[Codepen](https://codepen.io/frostace/pen/QWyaMRX)

## Content Box

`Content Box` means that the box refers to the content area, so the `width` and the `height` are all set for the content area, not including padding.

```text
width = content width
background width = content width + padding width
```

```css
.box {
    background-color: red;
    border: solid 1px black;
    width: 100px;
    height: 100px;
    padding: 20px 30px 40px;
    margin: 10px 20px 30px;
}
```

![image-20200706182629773](./content-box.png)

## Border Box

`Border Box` means that the box refers to whatever is inside the `border` (inclusive), so the `width` and the `height` are set for `content width` + `padding width` + `border width`

```text
width = content width + padding width + border width
background width = content width + padding width
```

```css
.box {
    box-sizing: border-box;
    border: solid 1px black;
    background-color: yellow;
    width: 100px;
    height: 100px;
    padding: 20px 30px 40px;
    margin: 10px 20px 30px;
}
```

![image-20200706182812797](./border-box.png)

