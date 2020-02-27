<template>
    <scroll class="listview" :probeType="probeType" ref="listview" :data="data" :listenScroll="listenScroll" @scroll="scroll">
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li @click="selectItem(item)" v-for="item in group.item" class="list-group-item">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut"
         @touchstart="onShortcutTouchStart"
          @touchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item, index) in shortcutlist" 
                class="item" :data-index="index"
                :class="{'current': currentIndex===index}">{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">
            <div class="fixed-title">{{fixedTitle}}</div>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
export default {
    props: { 
        data: {
            type: Array,
            default: []
        }
    },
    computed: {
        shortcutlist() {
            return this.data.map((group) => {
                return group.title.substr(0, 1)
            })
        },
        fixedTitle() {
            if (this.scrollY > 0) {
                return ''
            }
            // 这个也执行不了
            return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
        }
    },
    data() {
        return {
            scrollY: -1,
            currentIndex: 0,
            diff: -1
        }
    },
    created() {
        // 定义公共数据
        this.touch = {}
        this.listenScroll = true
        this.listHeight = []
        this.probeType = 3
    },
    methods: {
        selectItem(item) {
            
            this.$emit('select', item)
        },
        onShortcutTouchStart(e) {
            // anchorIndex字符串类型
            let anchorIndex = getData(e.target, 'index')
            let firstTouch = e.touches[0]
            this.touch.y1 = firstTouch.pageY
            this.touch.anchorIndex = anchorIndex
            this._scrollTo(anchorIndex)
        },
        onShortcutTouchMove(e) {
            // 根据滚动差值，决定滚动到哪里
            let firstTouch = e.touches[0]
            this.touch.y2 = firstTouch.pageY
            // 向下取整Math.floor
            let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
            let anchorIndex = parseInt(this.touch.anchorIndex) + delta
            this._scrollTo(anchorIndex)
        },
        refresh() {
            this.$refs.listview.refresh()
        },
        scroll(pos) {
            // scrollY拼写错误
            this.scrollY = pos.y
        },
        _calculateHeight() {
            this.listHeight = []
            const list = this.$refs.listGroup
            let height = 0
            this.listHeight.push(height)
            for (let i = 0; i < list.length; i++) {
                let item = list[i]
                height += item.clientHeight
                this.listHeight.push(height)
            }
        },
        _scrollTo(index) {
            // 点击的时候边界处理
            if (!index && index !== 0) {
                return
            }
            if (index < 0) {
                index = 0
                // this.listHeight.lenth
            } else if (index > this.listHeight.length - 2) {
                index = this.listHeight.length - 2
            }
            // 手动派发事件
            this.scrollY = -this.listHeight[index]
            // 第二个参数，是否需要缓动动画
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this._calculateHeight()
            }, 20)
        },
        scrollY(newY) {
            const listHeight = this.listHeight
            // 顶部
            if (newY > 0) {
                this.currentIndex = 0
                return
            }
            for (let i = 0; i < listHeight.length - 1; i++) {
                let height1 = listHeight[i]
                let height2 = listHeight[i + 1]
                // 这里有边界问题 正负值 超出边界
                if (-newY >= height1 && -newY < height2) {
                    this.currentIndex = i
                    this.diff = height2 + newY
                    return
                }
            }
            // 底部
            this.currentIndex = listHeight.length - 2
        },
        diff(newVal) {
            let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
            if (fixedTop === this.fixedTop) {
                return
            }
            this.fixedTop = fixedTop
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        }
    },
    components: {
        Scroll
    }
}
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
