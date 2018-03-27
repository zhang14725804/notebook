##v-text和v-html

###vue如何渲染

* Vue使用了基于HTML的模板语法（react是基于javascript？），允许开发者声明式地将DOM绑定至底层Vue实例的数据。所有Vue的模板都是合法的HTML，所以能被遵循规范的浏览器和HTML解析器解析。

* 在底层的实现上，Vue将模板编译成虚拟DOM渲染函数。结合响应系统，在应用状态改变时，Vue能够智能地计算出重新渲染组件的最小代价并应用到DOM操作上。

* 如果你熟悉虚拟DOM并且偏爱JavaScript的原始力量，你也可以不用模板，直接写渲染函数render，使用可选的JSX语法。

###插值{{}}

* 使用{{}}的形式来渲染文本。这种形式就是Mustache语法
* 使用v-once指令,你也能执行一次性地插值，当数据改变时，插值处的内容不会更新
* 插值弊端：：比如网速慢，或者数据加载失败的时候会在浏览器中直接渲染插值，比如{{name}}。或者说，当你的JavaScript报错，或者你的用户禁用页面所有JavaScript时，也会有类似现象
* 在这种情况之下，对用户的体验并不好，因为我们的用户并不知道{{xxx}}表示的是什么？不过，值得庆幸的是，在Vue中，除了使用{{}}这样的插值语法渲染数据之外，还提供了两个相关的指令

###javascript相关知识点

 在JavaScript中有textContent、innerHTML、innerText、outerText、outerHTML和nodeValue。这些属性都可以用来获取某个元素的内容，也可以将内容或标签插入到某个元素中。看上去和渲染内容有点相关

* innerHTML：获取从对象的起始位置到终止位置的全部内容，包括HTML标签。当内容都是文本的时候，可以把这个属性当做textContent属性来用
* innerText：获取从对象的起始位置到终止位置的内容，但它不会包括HTML标签
* outerHTML：除了包含innerHTML的全部内容外，还会包含对象标签本身
* textContent：设置或返回指定节点的文本内容，以及它的所有后代。有时候，此属性可用于取代nodeValue属性，但请记住此属性同时会返回所有子节点的文本。得到的结果跟innerText的结果是一样的。如果是设置，则原本的子元素会被同时替换掉
* nodeValue：和textContent很像，都是用来获取某个元素中的内容，不过nodeValue并不能直接操作某个DOM元素，它只能用来获取某段文本节点中的内容
* outerText：和outerHTML有同样的功能，它们都包括自身，不同的是outerText获取的是元素内容，而outerHTML获取到的内容包括元素

###v-text

在JavaScript中可以使用innerText或者textContent来操作元素中的纯文本。在Vue中，如前面的示例所展示的一样，使用{{}}Mustache语法操作元素中的纯文本。不过在Vue中，我们还可以使用v-text起到同等的作用。

v-text=""指令中的双引号并不是代表字符串，而是Vue自定义的划定界限的符号。如果我们里面输出字符串，就需要在里面再添加一对单引号。比如<h1 v-text="'用户名：' + name"></h1>。而且，在Vue中要想输出字符串，必须添加单引号，否则会报错。

###v-html

* 在Vue中，不能通过{{}}和v-text将HTML的元素插入到模板中
* 在Vue中，使用v-html动态渲染的任意HTML都可能会非常危险，因为它容易导致XSS攻击。这个和JavaScript中的innerHTML类似。所以在实际使用的时候，请只对可信内容使用HTML插值，绝不要对用户提供的内容使用插值。