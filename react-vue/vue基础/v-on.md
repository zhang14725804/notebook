##v-on

###引子
JavaScript在浏览器中以单线程模式运行，页面加载后，一旦页面上所有的JavaScript代码被执行完后，就只能依赖触发事件来执行JavaScript代码。浏览器在接收到用户的鼠标或键盘输入后，会自动在对应的DOM节点上触发相应的事件。如果该节点已经绑定了对应的JavaScript处理函数，该函数就会自动调用。

在我们平常经常能看到这样的一些例子：

* 当用户点击鼠标时
* 当页面加载时
* 当图像已加载时
* 当鼠标移动到元素上时
* 当输入字段被改变时
* 当提交HTML表单时
* 当用户触发按键时


###javascript中的事件

在JavaScript中任何一个DOM元素都有其自身存在的事件对象。事件对象代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置和鼠标按钮的状态等。事件通常与函数结合使用，函数不会在事件发生前被执行。

在JavaScript中常见的事件句柄（Event Handlers）主要有：

* onabort	图像的加载被中断	
* onblur	元素失去焦点
* onchange	域的内容被改变	
* onclick	当用户点击某个对象时调用的事件名柄
* ondblclick	当用户双击某个对象时调用的事件句柄	
* onerror	在加载文档或图像时发生错误
* onfocus	元素获得焦点	
* onkeydown	某个键盘按键被按下
* onkeypress	某个键盘按键被按下并松开	
* onkeyup	某个键盘按键被松开
* onload	一张页面或一幅图像完成加载	
* onmousemove	鼠标按钮被按下
* onmousemove	鼠标被移动	
* onmouseout	鼠标从某个元素移开
* onmouseover	鼠标移动到某元素之上	
* onmouseup	鼠标铵键被松开
* onreset	重置按钮被点击	
* onresize	窗口或框架被重新调整大小
* onselect	文本被选中	
* onsubmit	确认按钮被点击
* onunload	用户退出页面	 	
 

###vue中的v-on
 
```

	方法处理器
	<button v-on:click="clickMe"></button> 
	对象语法 （v2.4.0版本以上才支持
	<button v-on="{ mousedown: doThis, mouseup: doThat}"></button> 
	内联语句
	<button v-on:click="doThat('Hello', $event)"></button> 
	缩写 
	<button @click="doThis"></button> 
	停止冒泡 
	<button @click.stop="doThis"></button> 
	阻止默认行为 
	<button @click.prevent="doThis"></button> 
	 阻止默认行为， 没有表达式 
	<form @submit.prevent></form> 
	 串联修饰符 
	<button @click.stop.prevent="doThis"></button> 
	 键修饰符， 键别名
	<input @keyup.13="onEnter" /> 
	 点击回调只会触发一次(这个v-once)
	<button v-on:click.once="doThis"></button>

```

####v-on修饰符

* stop：调用event.stopPropagation()
* prevent：调用event.preventDefault()
* capture：添加事件侦听器时使用capture模式
* self：只当事件是从侦听器绑定的元素本身触发时才触发回调
* {keyCode | keyAlias}：只当事件是从特定键触发时才触发回调
* native：监听组件根元素的原生事件
* once：只触发一次回调
* left：只当点击鼠标左键时触发，（v2.2.0+ 才具有）
* right：只当点击鼠标右键时触发，（v2.2.0+ 才具有）
* middle：只当点击鼠标中键时触发，（v2.2.0+ 才具有）
* passive：以{passive: true}模式添加侦听器，（v2.3.0+ 才具有）


