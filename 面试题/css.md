

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


4、 css 伪元素 伪类

[总结伪元素和伪类](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)

伪类的操作对象是文档树中已有的元素，而伪元素则创建了一个文档数外的元素。因此，伪类与伪元素的区别在于：有没有创建一个文档树之外的元素。

伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过:hover 来描述这个元素的状态。虽然它和普通的 css 类相似，可以为已有的元素添加样式，但是它只有处于 **dom 树无法描述的状态下才能为元素添加样式**，所以将其称为伪类。

伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过:before 来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上**不在文档树中**。

