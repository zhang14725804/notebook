##v-model

在vue中，通过{{}}或v-text的方式，可以将数据源中的数据渲染到DOM元素中

在Vue中，可以使用v-model指令在表单控件元素上创建**双向数据绑定**。它会根据控制类型自动选取正确的方法来更新元素。尽管有些神奇，但v-model本质上不过是语法糖，它负责监听用户的输入事件以更新数据，并特别处理一些极端的例子



> 注意：v-model会忽略所有表单元素的value、checked、selected特性的初始值。因为它会选择Vue实例数据来作为具体的值。你应该通过JavaScript在组件的data选项中声明初始值

###单行文本输入
input上通过v-model绑定Vue的数据源的值

这里的data可以是object或者function，但组件的data只能是function，这是因为组件内各自拥有自己的data，而非共用的关系

###多行文本域
多行文本域textarea和input非常的类似

**小结一下**：当使用文本input(包括email，number等)或textarea时，v-model="varName"等价于:value="varName" @input="e => varName = e.target.value"。这意味着每次输入完成后的varName将被更新为输入的值，然后输入的值被设置为varName。正常的select元素也会像这样，尽管multiple多项选择有所不同

> 在文本区域插值 textarea 并不会生效，应用 v-model 来代替。

###复选框
```

	<input type="checkbox" id="jack" value="Jack" v-model="checkedNames"> 
    <label for="jack">Jack</label> 
    <input type="checkbox" id="john" value="John" v-model="checkedNames"> 
    <label for="john">John</label> 
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames"> 
    <label for="mike">Mike</label>

    <div>选中的值：{{checkedNames}}</div>

	data::checkedNames:[]
```
###单选按钮
###选择框（select option）


###v-model修饰符


> .lazy
 
> .trim

> .number