#v-bind

我们知道v-on可以实现事件绑定，v-model可以实现双向数据绑定。在Vue中除了这两个指令，还有一个v-bind指令。它可以往元素的属性中绑定数据，也可以动态地根据数据为元素绑定不同的样式。简单说，v-bind是用来**绑定HTML属性**。

##javascript给html标签指定属性



> Element.getAttribute()：获取元素上一个指定的属性值。如果指定的属性不存在，则返回null或""（空字符串）


> Element.setAttribute()：指定元素上的一个属性值。如果属性已经存在，则更新该值；否则将添加一个新的属性用指定的名称和值


> Element.removeAttribute()：从指定的元素中删除一个属性


```

	<div class="wrapper"> 
		<img src="//www.w3cplus.com/sites/default/files/blogs/2017/1709/meinv-1.jpg" alt="美女与野獸"> 
	</div> 
	<div class="action"> 
		<button id="btn">美女与野獸</button> 
	</div> 

	// JavaScript 
	let data = { 
		imgInfo: { 
			imgUrl: '//www.w3cplus.com/sites/default/files/blogs/2017/1709/yuesou.jpg', 
			alt: '野獸' 
		} 
	} 

	const imgEle = document.querySelector('.figure') 
	const btn = document.getElementById('btn') 
	btn.addEventListener('click', () => { 
		imgEle.setAttribute('src', data.imgInfo.imgUrl) 
		imgEle.setAttribute('alt', data.imgInfo.alt) 
	}, false)


```

##v-bind用法

```
	<!-- 绑定一个属性 -->
	<img v-bind:src="imgUrl" />
	
	<!-- 缩写 -->
	<img :src="imgUrl" />
	
	<!-- 内联字符串拼接 -->
	<img :src="'../images/' + fileName" />
	
	<!-- class 绑定 -->
	<div :class="{ red: isRed}"></div>
	<div :class="[classA, classB]"></div>
	<div :class="[classA, {classB: isB, classC: isC}]"></div>
	
	<!-- style绑定 -->
	<div :style="{fontSize: size + 'px'}"></div>
	<div :style="[styleObjectA, styleObjectB]"></div>
	
	<!-- 绑定一个有属性的对象 -->
	<div v-bind="{id:someProp, 'other-attr': otherProp}"></div>
	
	<!-- 通过prop绑定， prop必须在my-component中声明 -->
	<my-component :prop="someThing"></my-component>
	
	<!-- 通过 $props 将父组件的props 一起传递给子组件 -->
	<child-component v-bind="$props"></child-component>
	
	<!-- Xlink -->
	<svg><a :xlink:special="foo"></a></svg>

```


## class与style绑定

###绑定class类名

执行运算
执行函数
对象语法
数组语法
ES6扩展语法

```
	
	//执行运算

	<div id="app">
	    <button :class="classA + ' ' + classB">美女与野兽</button>
	</div>
	
	// JavaScript
	let app = new Vue({
	    el: '#app',
	    data: {
	        classA: 'button',
	        classB: 'large-button',
	        classC: 'primary-button'
	    }
	})


	
	//执行函数

	<!-- Template -->
	<div id="app">
	    <button :class="getClass()">美女与野兽</button>
	</div>
	
	// JavaScript
	let app = new Vue({
	    el: '#app',
	    data: {
	        getClass: function () {
	            return `button large-button primary-button`
	        }
	    }
	})


	
	//对象语法

	<!-- Template -->
	<div id="app">
	    <button :class="{button: isButton, 'large-button': isLarge, 'primary-button': isPrimary}">美女与野兽</button>
	</div>
	
	// JavaScript
	let app = new Vue({
	    el: '#app',
	    data: {
	        isButton: true,
	        isLarge: true,
	        isPrimary: true
	    }
	})

	//绑定返回对象的计算属性

	<!-- Template -->
	<div id="app">
	    <button :class="classObject">美女与野兽</button>
	</div>
	
	// JavaScript
	let app = new Vue({
	    el: '#app',
	    data: {
	        isButton: true,
	        isLarge: null,
	        isPrimary: true
	    },
	    computed: {
	        classObject: function () {
	            return {
	                button: this.isButton,
	                'large-button': this.isLarge  != false,
	                'primary-button': !this.isPrimary
	            }
	        }
	    }
	})



	//数组语法
	//我们可以把一个数组传给v-bind:class，以应用一个class列表：
	
	<!-- Template -->
	<div id="app">
	    <button :class="[classA, classB, classC]">美女与野兽</button>
	</div>
	
	// JavaScript
	let app = new Vue({
	    el: '#app',
	    data: {
	        classA: 'button',
	        classB: 'large-button',
	        classC: 'primary-button'
	    }
	})



	//ES6扩展语法
	//最前面我们看了表达式的方式来给button添加类名。如果使用ES6的特性，我们可以使用双撇号来替代+运算，比如：

	<div id="app">
	    <button :class="`${classA} ${classB} ${classC}`">美女与野兽</button>
	</div>
	
	// JavaScript
	let app = new Vue({
	    el: '#app',
	    data: {
	        classA: 'button',
	        classB: 'large-button',
	        classC: 'primary-button'
	    }
	})

```

###绑定内联样式

```
	
	v-bind:style的对象语法十分直观 —— 看着非常像CSS，其实它是一个JavaScript对象。

	CSS属性名需要用驼峰方式（camelCase）书写或者配合引号的短横分隔命名（kebab-case）：


	<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
	
	data: {
	    activeColor: 'red',
	    fontSize: 30
	}

	直接绑定到一个样式对象通常更好，让模松更清晰：
	

	<div v-bind:style="styleObject"></div>
	
	data: {
	    styleObject: {
	        color: 'red',
	        fontSize: '13px'
	    }
	}

```

##v-bind修饰符

v-bind修饰符
v-bind和v-model有点类似，也具有修饰符特性：

.

> prop：被用于绑定 DOM 属性 (property)。(差别在哪里？)


> camel：将 kebab-case 特性名转换为 camelCase。 (从 2.1.0 开始支持)
.

> sync：语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器