##v-for指令

当 Vue.js 用 v-for 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。这个类似 Vue 1.x 的 track-by="$index" 。

这个默认的模式是高效的，但是只适用于**不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出。**

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 key 属性。理想的 key 值是每项都有的且唯一的 id。这个特殊的属性相当于 Vue 1.x 的 track-by ，但它的工作方式类似于一个属性，所以你需要用 v-bind 来绑定动态值

v-for的默认行为试着不改变整体，而是替换元素。迫使其重新排序的元素，你需要提供一个key的特殊属性

1、v-for遍历数组的时候，，可以在**computed**中处理数据



> js数组方法**push()、pop()、shift()、unshift()、splice()、sort()、reverse()**，会改变原数组


> js数组方法**filter()、concat()和slice()**返回新数组


2、v-for遍历对象（没用过）

3、有时候你可能需要为已有对象赋予多个新属性，比如使用Object.assign()或_.extend()。在这种情况下，应该用两个对象的属性创建一个新的对象。所以，如果你想添加新的响应式属性，不要像这样：
```

	Object.assign(this.obj, {
	    age: 27,
	    favoriteColor: 'Vue Green'
	})
	应该这样做：
	
	this.obj = Object.assign({}, this.obj, {
	    age: 27,
	    favoriteColor: 'Vue Green'
	})

```

4、v-for也可以取整数