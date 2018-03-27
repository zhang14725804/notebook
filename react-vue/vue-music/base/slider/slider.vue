<template>
  <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
          <slot></slot>
      </div>
      <div class="dots">
          <span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex===index}"></span>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 4000
        }
    },
    data() {
        return {
            dots: [],
            currentPageIndex: 0
        }
    },
    mounted() {
        setTimeout(() => {
            this._setSliderWidth()
            this._initDots()
            this._initSlider()
            if (this.autoPlay) {
                this._play()
            }
        }, 20)
        // 页面放大缩小的时候相应变化
        window.addEventListener('resize', () => {
            if (!this.slider) {
                return
            }
            this._setSliderWidth(true)
            this.slider.refresh()
        })
    },
    destroyed() {
        // 组件销毁的时候注意销毁定时器，有利于内存释放
        clearTimeout(this.timer)
    },
    methods: {
        _setSliderWidth(isResize) {
            this.children = this.$refs.sliderGroup.children
            // 这里this.children.length 不对， 课程里面是5，我这里是7
            // 先执行_initSlider length=7
            // 先执行_setSliderWidth length=5
            // sliderWidth=375才行
            let width = 0
            let sliderWidth = this.$refs.slider.clientWidth
            for (let i = 0; i < this.children.length; i++) {
                let child = this.children[i]
                addClass(child, 'slider-item')
                // 缺了px单位，不行
                // 目前不是100%宽度
                child.style.width = sliderWidth + 'px'
                width += sliderWidth
            }
            // 左右克隆两个dom保证循环切换
            if (this.loop && !isResize) {
                // 上面的 this.children.length多出了两个，这里就不应该再加2，怪不得我的有空白
                width += 2 * sliderWidth
            }
            this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initDots() {
            this.dots = new Array(this.children.length)
        },
        _initSlider() {
            this.slider = new BScroll(this.$refs.slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: true,
                snapLoop: this.loop,
                snapThreshold: 0.3,
                snapSpeed: 400,
                // 新版本的better-scroll
                // snap: {
                //     loop: this.loop,
                //     threshold: 0.3,
                //     stepX: 400
                // },
                // click: this.click
                // 各个库的click 阻止默认的事件，然后自己派发，导致默认的click点击跳转无法进行
                click: false
            })
            // 自动播放
            this.slider.on('scrollEnd', () => {
                let pageIndex = this.slider.getCurrentPage().pageX
                if (this.loop) {
                    pageIndex -= 1
                }
                this.currentPageIndex = pageIndex
                if (this.autoPlay) {
                    clearTimeout(this.timer)
                    this._play()
                }
            })
        },
        _play() {
            let pageIndex = this.currentPageIndex + 1
            if (this.loop) {
                pageIndex += 1
            }
            this.timer = setTimeout(() => {
                // 0代表Y方向的
                this.slider.goToPage(pageIndex, 0, 400)
            }, this.interval)
        }
    }
}
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
