<template>
  <scroll class="suggest" 
        :data="result"
         :pullup="pullup" 
         @scrollToEnd="searchMore" 
         :beforeScroll="beforeScroll"
         @beforeScroll="listScroll"
         ref="suggest">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result" >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
        <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import NoResult from 'base/no-result/no-result'
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import {mapMutations, mapActions} from 'vuex'
  import Singer from 'common/js/singer'

  const TYPE_SINGER = 'singer'
  const perpage = 20

  export default {
    props: {
        query: {
            type: String,
            default: ''
        },
        showSinger: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            page: 1,
            result: [],
            pullup: true,
            hasMore: true,
            beforeScroll: true
        }
    },
    methods: {
        search() {
            // query变化的时候重置参数
            this.page = 1
            this.$refs.suggest.scrollTo(0, 0)
            this.hasMore = true
            search(this.query, this.page, this.showSinger, perpage).then((res) => {
                if (res.code === ERR_OK) {
                    this.result = this._getResult(res.data)
                    this._checkMore(res.data)
                }
            })
        },
        // 下拉刷新 本质上还是调用search
        searchMore() {
            if (!this.hasMore) {
                return
            }
            this.page ++
            search(this.query, this.page, this.showSinger, perpage).then((res) => {
                if (res.code === ERR_OK) {
                    // 数组拼接
                    this.result = this.result.concat(this._getResult(res.data))
                    this._checkMore(res.data)
                }
            })
        },
        getIconCls(item) {
            if (item.type === TYPE_SINGER) {
                return 'icon-mine'
            } else {
                return 'icon-music'
            }
        },
        getDisplayName(item) {
            if (item.type === TYPE_SINGER) {
                return item.singername
            } else {
                return `${item.name}-${item.singer}`
            }
        },
        selectItem(item) {
            // 路由跳转
            if (item.type === TYPE_SINGER) {
                const singer = new Singer({
                    id: item.singermid,
                    name: item.singername
                })
                // 修改路由
                this.$router.push({
                    path: `/search/${singer.id}`
                })
                // 写入state
                this.setSinger(singer)
            } else {
                this.insertSong(item)
            }
            // 派发事件用于存储搜索历史记录
            this.$emit('select')
        },
        refresh() {
            // 迷你播放器存在的时候，刷新列表
            this.$refs.suggest.refresh()
        },
        listScroll() {
            // 派发事件
            this.$emit('listScroll')
        },
        // 判断是否有更多
        _checkMore(data) {
            const song = data.song
            if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
                this.hasMore = false
            }
        },
        _getResult(data) {
            let ret = []
            if (data.zhida && data.zhida.singerid) {
                // 对象扩展运算符
                ret.push({...data.zhida, ...{type: TYPE_SINGER}})
            }
            if (data.song) {
                ret = ret.concat(this._normalizeSongs(data.song.list))
            }
            return ret
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((musicData) => {
                if (musicData.songid && musicData.albumid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        }),
        ...mapActions([
            'insertSong'
        ])
    },
    watch: {
        query() {
            this.search()
        }
    },
    components: {
        Scroll,
        Loading,
        NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>