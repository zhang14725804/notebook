<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" ref="sliderWrapper" class="slider-wrapper"> 
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>  
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="item in discList" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
 import Scroll from 'base/scroll/scroll'
 import Loading from 'base/loading/loading'
 import Slider from 'base/slider/slider'
 import {getRecommend, getDiscList} from 'api/recommend'
 import {ERR_OK} from 'api/config'
 import {playlistMixin} from 'common/js/mixin'
 import {mapMutations} from 'vuex'

 export default {
   mixins: [playlistMixin],
   data() {
     return {
       // 初始化空数组
       recommends: [],
       discList: []
     }
   },
   created () {
    this._getRecommend()
     this._getDiscList()
   },
   methods: {
     // 实现mixin里面的方法
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      // 路由跳转
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        // 写入state
        this.setDisc(item)
      },
     // 异步过程，数据可能没有
     _getRecommend() {
       getRecommend().then((res) => {
         if (res.code === ERR_OK) {
           this.recommends = res.data.slider
         }
       })
     },
     _getDiscList() {
       getDiscList().then((res) => {
         if (res.code === ERR_OK) {
           // 本地的json数据
           this.discList = res.lists
         }
       })
     },
     loadImage() {
       if (!this.checkLoaded) {
         this.$refs.scroll.refresh()
         this.checkLoaded = true
       }
     },
     ...mapMutations({
       setDisc: 'SET_DISC'
     })
   },
   components: {
     Slider,
     Scroll,
     Loading
   }
 }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>