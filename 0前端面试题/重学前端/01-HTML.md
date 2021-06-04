
## HTML部分

### 标签分类

    文档元信息：通常是出现在head标签中的元素，包含了描述文档自身的一些信息；
    语义相关：扩展了纯文本，表达文章结构、不同语言要素的标签；
    链接：提供到文档内和文档外的链接；
    替换型标签：引入声音、图片、视频等外部元素替换自身的一类标签；
    表单：用于填写和提交信息的一类标签；
    表格：表头、表尾、单元格等表格的结构。

### html 语义标签

语义是我们说话表达的意思，多数的语义实际上都是由文字来承载的。语义类标签则是纯文字的补充，比如标题、自然段、章节、列表，这些内容都是纯文字无法表达的，我们需要依靠语义标签代为表达。

几种比较重要的语义标签使用场景

    作为自然语言延伸的语义类标签
    作为标题摘要的语义类标签
    作为整体结构的语义类标签


### HTML 元信息类标签

所谓元信息，是指【描述自身】的信息，元信息类标签，就是HTML用于描述文档自身的一类标签，它们通常出现在head标签中，一般都不会在页面被显示出来（与此相对，其它标签，如语义类标签，【描述业务】）。

    head：元信息的容器。
    title：文档标题。
    base：页面的基准URL。
    meta: 元信息通用标签。


### 浏览器DOM，你知道HTML的节点有哪几种吗？

- DOM（文档对象模型）

文档对象模型是用来描述文档，这里的文档，是特指HTML文档（也用于XML文档，但是本课不讨论XML）。同时它又是一个“对象模型”，这意味着它使用的是对象这样的概念来描述HTML文档。

DOM API大致会包含4个部分。

    节点：DOM树形结构中的节点相关API。
    事件：触发和监听事件相关API。
    Range：操作文字范围相关API。
    遍历：遍历DOM需要的API。


- Attribute和Property（😅😅😅）

对DOM而言，**Attribute和Property**是完全不同的含义


### HTML链接：除了a标签，还有哪些标签叫链接？

    a
    area
    link

![html-链接](./html-链接.png)


### css排版（块级格式化上下文 😅）

### 浏览器CSSOM：如何获取一个元素的准确位置

就像HTML和CSS分别承担了语义和表现的分工，DOM和CSSOM也有语义和表现的分工。

CSSOM是CSS的对象模型，在W3C标准中，它包含两个部分：描述样式表和规则等CSS的模型部分（CSSOM），和跟元素视图相关的View部分（CSSOM View）。


CSSOM View 这一部分的API，可以视为DOM API的扩展，它在原本的Element接口上，添加了显示相关的功能，这些功能，又可以分成三个部分：**窗口部分，滚动部分和布局部分**

- 窗口API用于操作浏览器窗口的位置、尺寸等

    moveTo(x, y) 窗口移动到屏幕的特定坐标；
    moveBy(x, y) 窗口移动特定距离；
    resizeTo(x, y) 改变窗口大小到特定尺寸；
    resizeBy(x, y) 改变窗口大小特定尺寸。

- 滚动 API

视口滚动API

    scrollX 是视口的属性，表示X方向上的当前滚动距离，有别名 pageXOffset；
    scrollY 是视口的属性，表示Y方向上的当前滚动距离，有别名 pageYOffset；
    scroll(x, y) 使得页面滚动到特定的位置，有别名scrollTo，支持传入配置型参数 {top, left}；
    scrollBy(x, y) 使得页面滚动特定的距离，支持传入配置型参数 {top, left}。

元素滚动API

    scrollTop 元素的属性，表示Y方向上的当前滚动距离。
    scrollLeft 元素的属性，表示X方向上的当前滚动距离。
    scrollWidth 元素的属性，表示元素内部的滚动内容的宽度，一般来说会大于等于元素宽度。
    scrollHeight 元素的属性，表示元素内部的滚动内容的高度，一般来说会大于等于元素高度。
    scroll(x, y) 使得元素滚动到特定的位置，有别名scrollTo，支持传入配置型参数 {top, left}。
    scrollBy(x, y) 使得元素滚动到特定的位置，支持传入配置型参数 {top, left}。
    scrollIntoView(arg) 滚动元素所在的父元素，使得元素滚动到可见区域，可以通过arg来指定滚到中间、开始或者就近。


- 布局API

全局尺寸信息

    window.innerHeight, window.innerWidth 这两个属性表示视口的大小。

    window.outerWidth, window.outerHeight 这两个属性表示浏览器窗口占据的大小，很多浏览器没有实现，一般来说这两个属性无关紧要。

    window.devicePixelRatio 这个属性非常重要，表示物理像素和CSS像素单位的倍率关系，Retina屏这个值是2，后来也出现了一些3倍的Android屏。

    window.screen.width, window.screen.height 设备的屏幕尺寸。

    window.screen.availWidth, window.screen.availHeight 设备屏幕的可渲染区域尺寸，一些Android机器会把屏幕的一部分预留做固定按钮，所以有这两个属性，实际上一般浏览器不会实现的这么细致。

    window.screen.colorDepth, window.screen.pixelDepth 这两个属性是固定值24，应该是为了以后预留。

元素的布局信息

    getClientRects();
    getBoundingClientRect()。