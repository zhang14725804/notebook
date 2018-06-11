#vue中的computed（计算属性）

（在学习Vue的模板相关的知识的时候，知道在模板内可以使用表达式，而且模板内的表达式是非常的便利，但这种遍历是有一定的限制的，它们实际上是用于一些简单的运算。也就是说，如果在模板中放入太多的逻辑会让模板过重而且难以维护）
> 计算属性可用于快速计算视图（View）中显示的属性。这些计算将被缓存，并且只在需要时更新


	<div id="app">
	    <h1>{{ message.split('').reverse().join('') }}</h1>
	</div>

在Vue中有多种方法为视图设置值：

* 指令直接将数据值绑定到视图
* 表达式对内容进行简单的转换
* 过滤器对内容进行简单的转换
* 计算属性


###computed和methods



> 在Vue中计算属性是基于它们的依赖进行**缓存**的，而方法是不会基于它们的依赖进行缓存的。从而使用计算属性要比方法性能更好

这也同样意味着下面的计算属性将不再更新，因为 Date.now() 不是响应式依赖：

	computed: {
	    now: function () {
	        return Date.now()
	    }
	}

###计算属性的 setter

计算属性默认只有getter，不过在需要时你也可以提供一个setter：

	computed: {
	    fullName: {
	        // getter
	        get: function () {
	            return this.firstName + ' ' + this.lastName
	        },
	        // setter
	        set: function (newValue) {
	            var names = newValue.split(' ')
	            this.firstName = names[0]
	            this.lastName = names[names.length - 1]
	        }
	    }
	}


###观察者

虽然计算属性在大多数情况下更合适，但有时候也需要一个自定义的watcher。这是为什么Vue通过watch选项提供一个更通用的方法，来响应数据的变化。当你想要在数据变化响应时，执行异步操作或开销较大的操作，这是很有用的。

Vue确实提供了一种更通用的方式来观察和响应Vue实例上的数据变动：watch属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用watch。然而，通常更好的想法是使用计算属性而不是命令式的watch回调。

###在Vue中使用异步计算属性

> Vue中的计算属性非常好。它们允许你执行复杂的操作或数据格式，同时最大限度地执行依赖项计算的性能，只在依赖更改时更新视图。但遗憾的是，它们完全是同步的

	import Vue from 'vue';
	import AsyncComputed from 'vue-async-computed'
	import App from 'App.vue';
	
	Vue.use(AsyncComputed);
	
	new Vue({
	    el: '#app',
	    render: h => h(App)
	});


	<!-- MyComponent.vue -->
	<template>
	    <!-- 在一两秒后 myResolvedValue将变成"*Fancy* Resolved Value" -->
	    <h2>Asynchronous Property {{ myResolvedValue }}</h2>
	</template>
	
	<script>
	    function fancinessComesLater () {
	        return new Promise((resolve, reject) => {
	            setTimeout(() => resolve('*Fancy* Resolved Value!'), 1000)
	        })
	    }
	
	    export default {
	        asyncComputed: {
	            async myResolvedValue() {
	                return await fancinessComesLater()
	            }
	        }
	    }
	</script>