#vue中的模板

Vue使用了基于HTML的模板语法，允许开发者声明式地将DOM绑定至底层Vue实例的数据。所有Vue的模板都是合法的HTML，所以能被遵循规范的浏览器和HTML解析器解析。

在底层的实现上，Vue将模板编译成虚拟DOM渲染函数。结合响应系统，在应用状态改变时，Vue能够智能地计算出重橷渲染组件的最小代价并应用到DOM操作上

###模板语法

（1）双大括号（Mustache）语法

	<div id="app">
	    <h1>未使用v-once指令：{{ age }}</h1>

		//使用v-once，数据变化时内容不会更新
	    <h1 v-once>使用v-once指令：{{ age }}</h1>
	</div>


###一个Vue的应用是如何运行起来的

模板通过编译生成AST，再由AST生成Vue的渲染函数，渲染函数结合数据生成Virtual DOM树，对Virtual DOM进行diff和patch后生成新的UI

* Vue的模板
* AST数据结构
* VNode数据结构
* Virtual DOM
* createElement函数
* render函数
* 观察者（Watcher）