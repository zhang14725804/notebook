#vue中的computed（2）（计算属性）

vue中计算属性的使用场景：：

* 模板内的表达式
* v-bind绑定的表达式
* 指令中的表达式

当处理复杂的逻辑

	<div id="app">
	    <button @click="count++">{{count + '分'}}</button>
	    <div>
	        <input v-model="message" />
	    </div>
	    <p>{{ message.split(' ').reverse().join(' ') }}</p>
	</div>
	
	let app = new Vue({
	    el: '#app',
	    data () {
	        return {
	            count: 0,
	            message: ''
	        }
	    }
	})

###使用filter

* 优势：filter给我们用于计算和过滤一些模板表达式和v-bind属性表达式一些弊端的地方进行计算，他们会返回当前计算的值，可以进行传参在多地方共用这个过滤方法


* 劣势：如果我们要计算多个数据不同变化结合而成的地方，那么filter就比较难过滤到了，本质上filter就是一个一对一的行为，对单个数据进行过滤，可以进行传参，同方法，但不同参

```

	<div id="app">
	    <button @click="count++">{{count + '分'}}</button>
	    <div>
	        <input v-model="message" />
	    </div>
	    <p>{{ message | reverseString }}</p>
	</div>
	
	let app = new Vue({
	    el: '#app',
	    data () {
	        return {
	            count: 0,
	            message: ''
	        }
	    },
	    filters: {
	        reverseString (value) {
	            if (!value) return ''
	            value = value.split('').reverse().join('')
	            return value
	        }
	    }
	})


```

###computed

Vue中的computed其实规避了模板语法和filter两个所有的劣势，他的优势在于通过计算所有依赖的数据进行计算，然后返回一个值，**记住可以依赖方法里所有的数据，只要一个数据发生变化，则会重新计算，来更新视图的改变**

	//限制输入字数的例子
	<div id="app">
	    <div class="twitter">
	        <img :src="imgUrl" />
	        <div class="content">
	            <textarea v-model="content" :maxlength="totalcount">有什么新鲜事情？</textarea>
	            <p>您还可以输入{{ reduceCount }}字</p>
	        </div>
	    </div>
	</div>
	
	let app = new Vue({
	    el: '#app',
	    data () {
	        return {
	            imgUrl: '//pbs.twimg.com/profile_images/468783022687256577/eKHcWEIk_normal.jpeg',
	            totalcount: 140, // 总共只给输入140字
	            content: ''
	        }
	    },
	    computed: {
	        reduceCount () {
	            return this.totalcount - this.content.length
	        }
	    }
	})


###methods vs computed

在Vue中，使用methods可以做computed同样的事情，不同的是，computed可以进行缓存。

什么意思呢？

如果不想让计算属性进入缓存，请使用methods，但我个人更推荐使用computed，语义化会更好一点。毕竟是什么选项里就应该做什么事，methods里面就是应该来管事件的。

###computed vs watch

* computed和watch都可以做同一件事，就像跑步运动员都可以跑步，但是分100米和1000米，术业有专攻嘛，两个选项都是对数据进行时时监听，但是两个的适用场景就不一样了：

* computed前面说了是适用于对多数据变动进行监听，然后来维护一个状态，就是返回一个状态
wacth是对一个数据监听，在数据变化时，会返回两个值，一个是value(当前值)，二是oldvalue是变化前的值

> 虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的watcher。这是为什么Vue提供一个更通用的方法，使用wacth来响应数据的变化。当你想要在数据变化响应时，执行异步操作或开销较大的操作，这是很有用的。