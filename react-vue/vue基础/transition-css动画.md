##css动画栗子
```

	<template>
	    <div class="app">
	    	<button @click="showball" class="btn">show</button>
	        <transition name="move" type="animation">
	            <div class="ball" v-show="show">
	                <div class="inner"></div>
	            </div>
	        </transition>
	    </div>
	</template>
	
	<script type="text/ecmascript-6">
	    export default {
	        data () {
	            return {
	                show: false
	            };
	        },
	        methods: {
	            showball () {
	                this.show = !this.show;
	            }
	        }
	    };
	</script>
	
	<style lang="stylus" rel="stylesheet/stylus">
	    @keyframes shape-change {
	        0%, 100% {
	            border-radius: 50%
	            background: red
	        }
	        50% {
	            border-radius: 0
	            background: blue
	        }
	    }
	    
	    @keyframes moveball-in {
	        0% {
	            transform: translate3d(300px,-200px,0)
	        }
	        50% {
	            transform: translate3d(100px,-400px,0)
	        }
	        100% {
	            transform: translate3d(0,0,0)
	        }
	    }
	    @keyframes moveball-out {
	        0% {
	            transform: translate3d(0,0,0)
	        }
	        50% {
	            transform: translate3d(100px,-400px,0)
	        }
	        100% {
	            transform: translate3d(300px,-200px,0)
	        }
	    }
	    .app
	        .btn
	            width: 40px
	            height: 30px
	            margin-top: 40px
	            border: none
	            outline: none
	            background: red
	            color: #fff
	        .ball
	            position: absolute
	            bottom: 20px
	            left: 20px
	            width: 50px
	            height: 50px
	            transition: all 1s cubic-bezier(.22,-0.86,.97,.58)
	            &.move-enter-active
	                opacity: 1
	                animation: moveball-in 1s
	                .inner
	                    animation: shape-change 1s
	            &.move-leave-active
	                opacity: 0.8
	                animation: moveball-out 1s
	                .inner
	                    animation: shape-change 1s
	            .inner
	                display: inline-block
	                width: 30px
	                height: 30px
	                border-radius: 50%
	                background: red
	                transition: all 1s linear
	</style>
	
```
