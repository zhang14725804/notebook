<template>
  <div ref="wrapper">
      <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: null
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        pullup: {
            type: Boolean,
            default: false
        },
        beforeScroll: {
            type: Boolean,
            default: false
        },
        refreshDelay: {
            type: Number,
            default: 20
        }
    },
    mounted () {
        // 初始化
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    methods: {
        _initScroll() {
            if (!this.$refs.wrapper) {
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            })
            if (this.listenScroll) {
                let me = this
                // 派发事件
                this.scroll.on('scroll', (pos) => {
                    me.$emit('scroll', pos)
                })
            }
            if (this.pullup) {
                // 监听滚动停止事件
                this.scroll.on('scrollEnd', () => {
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                        // 滚动到底部 派发事件
                        this.$emit('scrollToEnd')
                    }
                })
            }
            if (this.beforeScroll) {
                this.scroll.on('beforeScrollStart', () => {
                    // 对外派发事件
                    this.$emit('beforeScroll')
                })
            }
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            // 滚动到相应位置 （歌手列表快速入口用到）
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            // 滚动到相应位置 （歌手列表快速入口用到）
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh()
            }, this.refreshDelay)
        }
    }
}
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
</style>
