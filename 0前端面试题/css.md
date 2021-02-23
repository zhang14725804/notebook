

## css

1、flex属性

    容器属性：
    flex-direction
    flex-wrap
    flex-flow
    justify-content
    align-items
    align-content

    元素属性
    order
    flex-grow
    flex-shrink
    flex-basis
    flex
    align-self

2、盒模型（他么不知道对不对😅，还是看看张鑫旭的稳一点）

    盒子的宽高 = margin+border+padding+content
    标准盒模型：属性width,height只包含内容content，不包含border和padding
    IE盒模型：属性width,height包含border和padding，指的是content+padding+border

3、BFC

[BFC](https://www.w3cplus.com/css/understanding-css-layout-block-formatting-context.html)

4、css文字溢出点点点

    overflow:hidden; //超出的文本隐藏
    text-overflow:ellipsis; //溢出用省略号显示
    white-space:nowrap; //溢出不换行


5、 css 伪元素 伪类

[总结伪元素和伪类](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)

伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档数外的元素。因此，伪类与伪元素的区别在于：有没有创建一个文档树之外的元素。

伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过:hover 来描述这个元素的状态。虽然它和普通的 css 类相似，可以为已有的元素添加样式，但是它只有处于 **dom 树无法描述的状态下才能为元素添加样式**，所以将其称为伪类。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过:before 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上**不在文档树中**。

5、css3中的**形变（transform）、过渡（transition）、动画（animation）**

animation的子属性有:

    animation-delay
    设置延时，即从元素加载完成之后到动画序列开始执行的这段时间。
    animation-direction
    设置动画在每次运行完后是反向运行还是重新回到开始位置重复运行。
    animation-duration
    设置动画一个周期的时长。
    animation-iteration-count
    设置动画重复次数， 可以指定infinite无限次重复动画
    animation-name
    指定由@keyframes描述的关键帧名称。
    animation-play-state
    允许暂停和恢复动画。
    animation-timing-function
    设置动画速度， 即通过建立加速度曲线，设置动画在关键帧之间是如何变化。
    animation-fill-mode
    指定动画执行前后如何为目标元素应用样式。

transform的字属性有：

    matrix矩阵变形
    rotate旋转
    skew扭曲
    scale缩放
    translate移动

transition的子属性

    transition-property
    指定哪个或哪些 CSS 属性用于过渡。只有指定的属性才会在过渡中发生动画，其它属性仍如通常那样瞬间变化。
    transition-duration
    指定过渡的时长。或者为所有属性指定一个值，或者指定多个值，为每个属性指定不同的时长。
    transition-timing-function
    缓动函数 
    transition-delay
    指定延迟，即属性开始变化时与过渡开始发生时之间的时长。


6、position

    static、relative、absolute、fixed、sticky