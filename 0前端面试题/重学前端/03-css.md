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