##js钩子

前两个栗子都是有进入和离开的过渡，但是如果一些场景只需要进入过渡然后就结束了，那么这时就可以使用JavaScript钩子结合CSS transitions/animations来实现，当然也可以单独使用

```

	<template>
	    <div class="app">
	        <div class="gun" @click="launch($event)"></div>
	        <div class="shells-wrapper">
	          <transition v-for="(shell,index) in shells" :key="index" name="launch-shell" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
	            <div class="shell" v-show="shell.show">
	              <div class="inner"></div>
	            </div>
	          </transition>
	        </div>
	        <div class="goal"></div>
	    </div>
	</template>
	
	<script type="text/ecmascript-6">
	    export default {
	        data () {
	            return {
	                shells: [
	                    {
	                        show: false
	                    },
	                    {
	                        show: false
	                    },
	                    {
	                        show: false
	                    }
	                ],
	                dropBalls: [],
	            };
	        },
	        methods: {
	            launch (event) {
	                
	                for (let i = 0; i < this.shells.length; i++) {
	                  let shell = this.shells[i];
	                  if (!shell.show) {
	                    shell.show = true;
	                    shell.target = event.target;
	                    this.dropBalls.push(shell);
	                    return;
	                  }
	                }
	            },
	            beforeEnter (el) {
	                let count = this.shells.length;
	                while (count--) {
	                    let shell = this.shells[count];
	                    if (shell.show) {
	                        let rect = shell.target.getBoundingClientRect();
	                        let left = rect.left - 32;
	                        let top = -(window.innerHeight - rect.top - 15);
	                        el.style.display = '';
	                        
	                        el.style.webkitTransform = `translate3d(0,${top}px,0)`;
	                        el.style.transform = `translate3d(0,${top}px,0)`;
	                        let inner = el.getElementsByClassName('inner')[0];
	                        inner.style.webkitTransform = `translate3d(${left}px,0,0)`;
	                        inner.style.transform = `translate3d(${left}px,0,0)`;
	                    }
	                }
	            },
	            enter (el, done) {
	                /* eslint-disable no-unused-vars */
	                let refresh = el.offsetHeight;
	                this.$nextTick(() => {
	                    el.style.webkitTransform = 'translate3d(0,0,0)';
	                    el.style.transform = 'translate3d(0,0,0)';
	                    let inner = el.getElementsByClassName('inner')[0];
	                    inner.style.webkitTransform = 'translate3d(0,0,0)';
	                    inner.style.transform = 'translate3d(0,0,0)';
	                    el.addEventListener('transitionend', done);
	                });
	            },
	            afterEnter (el) {
	              let ball = this.dropBalls.shift();
	              if (ball) {
	                ball.show = false;
	                el.style.display = 'none';
	              }
	                // let ball = this.shells[0];
	                // ball.show = false;
	                // el.style.display = 'none';
	            }
	        }
	    };
	</script>
	<style lang="stylus" rel="stylesheet/stylus">
	
	  .app
	    .shells-wrapper
	      .shell
	          position: fixed
	          left: 32px
	          bottom: 15px
	          z-index: 200
	          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
	          .inner
	            width: 16px
	            height: 16px
	            border-radius: 50%
	            background: rgb(0, 160, 220)
	            transition: all 0.4s linear
	    .gun
	      position:absolute
	      bottom:0
	      right:0
	      background-color:#000000
	      width:50px
	      height:50px
	      border-top-left-radius:100%
	    .goal
	      position:absolute
	      bottom:0
	      left :0
	      background-color:green
	      width:100px
	      height:50px
	      border-top-right-radius :50px
	</style>


```