我一般会设置一个activeFlag，index变化的时候赋值给activeFlag，然后v-bind:class绑定样式

1、对象语法

```

	<div id="myApp"> 
		<nav aria-label="An example with pagination"> 
			<ul class="pagination"> 
				<li v-for="page in totalPages" v-bind:class="{'page-item':true, 'active':(page === currentPage)}"> 
					<a class="page-link" href="#">{{ page }}</a> 
				</li> 
			</ul> 
		</nav> 
	</div>


	var app = new Vue({ 
		el: '#myApp', 
		data: { 
			totalPages: 5, 
			currentPage: 3 
		} 
	});


```

2、数组语法

```

	<div id="myApp"> 
		<nav aria-label="An example with pagination"> 
			<ul class="pagination"> 
				<li v-for="page in totalPages" v-bind:class="[pageItemClass, (page === currentPage) ? activeClass : '']"> 
					<a class="page-link" href="#">{{ page }}</a> 
				</li> 
			</ul> 
		</nav> 
	</div>

	var app = new Vue({ 
		el: '#myApp', 
		data: { 
			totalPages: 5, 
			currentPage: 3, 
			pageItemClass: 'page-item', 
			activeClass: 'active' 
		} 
	});


```

