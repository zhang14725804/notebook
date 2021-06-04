## CSS（层叠样式表）

CSS的顶层样式表由两种规则组成的规则列表构成，一种被称为 at-rule，也就是at 规则，另一种是 qualified rule，也就是普通规则。

### at规则

    @charset ： https://www.w3.org/TR/css-syntax-3/
    @import ：https://www.w3.org/TR/css-cascade-4/
    @media ：https://www.w3.org/TR/css3-conditional/
    @page ： https://www.w3.org/TR/css-page-3/
    @counter-style ：https://www.w3.org/TR/css-counter-styles-3
    @keyframes ：https://www.w3.org/TR/css-animations-1/
    @fontface ：https://www.w3.org/TR/css-fonts-3/
    @supports ：https://www.w3.org/TR/css3-conditional/
    @namespace ：https://www.w3.org/TR/css-namespaces-3/


### 普通规则

CSS属性值可能是以下类型。

    CSS范围的关键字：initial，unset，inherit，任何属性都可以的关键字。
    字符串：比如content属性。
    URL：使用url() 函数的URL值。
    整数/实数：比如flex属性。
    维度：单位的整数/实数，比如width属性。
    百分比：大部分维度都支持。
    颜色：比如background-color属性。
    图片：比如background-image属性。
    2D位置：比如background-position属性。
    函数：来自函数的值，比如transform属性。


CSS支持一批特定的计算型函数：

    calc()
    max()
    min()
    clamp()
    toggle()
    attr()

### css选择器

svg和html中都有a元素，我们若要想区分选择svg中的a和html中的a，就必须用带命名空间的类型选择器。

```css
    @namespace svg url(http://www.w3.org/2000/svg);
    @namespace html url(http://www.w3.org/1999/xhtml);
    svg|a {
        stroke:blue;
        stroke-width:1;
    }

    html|a {
        font-size:40px
    }
```

- 选择器的基本意义是：根据一些特征，选中元素树上的一批元素。

    类型选择器和全体选择器
    id选择器与class选择器
    属性选择器
    伪类选择器
    树结构关系伪类选择器
    链接与行为伪类选择器
    逻辑伪类选择器

- 选择器的组合、选择器优先级

### css伪元素

    ::first-line
    ::first-letter
    ::before
    ::after