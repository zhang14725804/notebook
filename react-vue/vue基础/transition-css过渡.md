##css过渡栗子
```

	<template>
	    <div class="app">
	        <button @click="showMenu" class="btn">{{text}}</button>
	        <transition name="move">
	            <div class="menu" v-show="show">
	                <div class="inner inner-1">1</div>
	                <div class="inner inner-2">2</div>
	                <div class="inner inner-3">3</div>
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
	            showMenu () {
	                this.show = !this.show;
	            }
	        },
	        computed: {
	            text () {
	                return this.show ? '收' : '开';
	            }
	        }
	    };
	</script>
	<style lang="stylus" rel="stylesheet/stylus">
	    .app
	        .btn
	            position: fixed
	            bottom: 50px
	            right: 10px
	            z-index: 10
	            width: 50px
	            height: 50px
	            line-height: 50px
	            border-radius: 50%
	            border: none
	            outline: none
	            color: #fff
	            font-size: 18px
	            background: blue
	        .menu
	            position: fixed
	            bottom: 50px
	            right: 10px
	            width: 50px
	            height: 50px
	            border-radius: 50%
	            transition: all .7s ease-in
	            &.move-enter-active
	                .inner
	                    transform: translate3d(0, 0, 0)
	                    transition-timing-function: cubic-bezier(0, .57, .44, 1.97)
	                .inner-1
	                    transition-delay: .1s
	                .inner-2
	                    transition-delay: .2s
	                .inner-3
	                    transition-delay: .3s
	            &.move-enter, &.move-leave-active
	                .inner
	                    transition-timing-function: ease-in-out
	                .inner-1
	                    transform: translate3d(0, 60px, 0)
	                    transition-delay: .3s
	                .inner-2
	                    transform: translate3d(40px, 40px, 0)
	                    transition-delay: .2s
	                .inner-3
	                    transform: translate3d(60px, 0, 0)
	                    transition-delay: .1s
	            .inner
	                display: inline-block
	                position: absolute
	                width: 30px
	                height: 30px
	                line-height: 30px
	                border-radius: 50%
	                background: red
	                text-align: center
	                color: #fff
	                transition: all .4s
	            .inner-1
	                top: -50px
	                left: 10px
	            .inner-2
	                left: -30px
	                top: -30px
	            .inner-3
	                left: -50px
	                top: 10px
	</style>
```
