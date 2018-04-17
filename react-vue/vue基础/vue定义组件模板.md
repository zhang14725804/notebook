#vue定义组件模板的七种方式

在 Vue 中定义一个组件模板，至少有七种不同的方式（我一般用单文件方式）


> 字符串

> 模板字面量


> x-template


> 内联模板


> render 函数


> JSF


> 单文件组件

##（1）字符串
```

	Vue.component('my-checkbox', {
	    template: '<div class="checkbox-wrapper" @click="check"><div :class="{ checkbox: true, checked: checked }"></div><div class="title"></div></div>',
	    data() {
	        return {
	            checked: false,
	            title: 'Check me'
	        }
	    },
	    methods: {
	        check() {
	            this.checked = !this.checked; 
	        }
	    }
	});

```

##（2）模板字面量(和字符串有什么区别)

```
	
	Vue.component('my-checkbox', {
	    template: `
	        <div class="checkbox-wrapper" @click="check">
	            <div :class="{ checkbox: true, checked: checked }"></div>
	            <div class="title"></div>
	        </div>
	    `,
	    data() {
	        return {
	            checked: false,
	            title: 'Check me'
	        }
	    },
	    methods: {
	        check() {
	            this.checked = !this.checked;
	        }
	    }
	});

```

##（3）x-template

模板被定义在例如 index.html 文件中的 script 标签里。此 script 标签使用 text/x-template 标记，并由组件定义的 id 引用


```

	Vue.component('my-checkbox', {
	    template: '#checkbox-template',
	    data() {
	        return {
	            checked: false,
	            title: 'Check me'
	        }
	    },
	    methods: {
	        check() {
	            this.checked = !this.checked;
	        }
	    }
	});
	
	<script type="text/x-template" id="checkbox-template">
	    <div class="checkbox-wrapper" @click="check">
	        <div :class="{ checkbox: true, checked: checked }"></div>
	        <div class="title"></div>
	    </div>
	</script>

```

##（4）内联模板

```

	Vue.component('my-checkbox', {
	    data() {
	        return {
	            checked: false,
	            title: 'Check me'
	        }
	    },
	    methods: {
	        check() {
	            this.checked = !this.checked;
	        }
	    }
	});
	
	<my-checkbox inline-template>
	    <div class="checkbox-wrapper" @click="check">
	        <div :class="{ checkbox: true, checked: checked }"></div>
	        <div class="title"></div>
	    </div>
	</my-checkbox>

```

##（5）render函数

```

	Vue.component('my-checkbox', {
	    data() {
	        return {
	            checked: false,
	            title: 'Check me'
	        }
	    },
	    methods: {
	        check() {
	            this.checked = !this.checked;
	        }
	    },
	    render(createElement) {
	        return createElement(
	            'div',
	            {
	                attrs: {
	                    'class': 'checkbox-wrapper'
	                },
	                on: {
	                    click: this.check
	                }
	            },
	            [
	                createElement(
	                'div',
	                {
	                    'class': {
	                        checkbox: true,
	                        checked: this.checked
	                    }
	                }
	                ),
	                createElement(
	                'div',
	                {
	                    attrs: {
	                        'class': 'title'
	                    }
	                },
	                [ this.title ]
	                )
	            ]
	        );
	    }
	});


```

##（6）JSX

```

	Vue.component('my-checkbox', {
	    data() {
	        return {
	            checked: false,
	            title: 'Check me'
	        }
	    },
	    methods: {
	        check() {
	            this.checked = !this.checked;
	        }
	    },
	    render() {
	        return <div class="checkbox-wrapper" onClick={ this.check }>
	                <div class={{ checkbox: true, checked: this.checked }}></div>
	                <div class="title">{ this.title }</div>
	            </div>
	    }
	});

```

##（7）单文件