/** 抓取记录 **/

<template>
  <div class="user-history" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <mt-loadmore :topMethod="loadTop" :bottomMethod="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul v-if="list && list.length>0" class="user-history-list">
        <li class="history-item" v-for="item in list" :key="item.playId">
          <div class="icon-avatar">
            <img v-bind:src="item.user && item.user.headImg" alt="">
          </div>
          <div class="wawa-info">
            <div class="wawa-name">
              <label>{{item.user && item.user.nickName}}</label>
            </div>
            <div class="wawa-time">
              <label>{{item.recordTimeDesc}}</label>
            </div>
          </div>
        </li>
        <div v-if="!nextPage" class="data-tip-text">
            <label>没有更多数据了!</label>
        </div>
      </ul>
      <nothing-data v-else :message="'暂无大神抓中，快去试试吧'"></nothing-data>
    </mt-loadmore>
  </div>
</template>

<script>
  import {
    Indicator,
    Toast,
    Loadmore
  } from 'mint-ui';
  import store from 'store';
  import NothingData from "../../components/NothingData.vue";
  export default {
    components: {
      NothingData,
      'mt-loadmore': Loadmore
    },
    data() {
      return {
        groupId: '',
        allLoaded: true, // false为可以上拉
        scrollMode: 'auto',
        avatar: '', // 用户头像
        userName: '', // 用户名称
        dataTotal: 0, // 总条数
        nextPage: false, // 是否还有下一页
        pageTotal: 0, // 总页码
        pageSize: 20, // 没次显示多少条
        pageNum: 0, // 当前页码
        list: []
      }
    },
    mounted() {
      var that = this
      that.groupId = this.$route.params.id
      that.fetch()
    },
    methods: {
      fetch: function() {
        var that = this,
          user = store.get('user') || null
        that.allLoaded = true
        that.pageNum = parseInt(that.pageNum + 1)
        this.$ajax.post('playRecord/getPlayRecordList', {
          groupId: that.groupId,
          pageNum: that.pageNum,
          pageSize: that.pageSize,
          result: 1
        }).then(res => {
          if (res && res.data) {
            that.loading = false
            that.dataTotal = res.data.resBody.dataTotal
            that.nextPage = res.data.resBody.nextPage
            that.pageTotal = res.data.resBody.pageTotal
            that.pageSize = res.data.resBody.pageSize
            if (that.pageNum == 1) {
              that.list = res.data.resBody.pageData
            } else {
              that.list = that.list.concat(res.data.resBody.pageData)
            }
            // 返回是否还有数据，如果有数据返回true，但是组件需要为false时代表可以进行下一次拉取刷新
            that.allLoaded = !res.data.resBody.nextPage
            that.scrollMode = "touch"
          }
        })
      },
      // 下拉加载
      loadTop: function() {
        var that = this
        that.dataTotal = 0
        that.nextPage = false
        that.pageTotal = 0
        that.pageNum = 0
        this.fetch()
        this.$refs.loadmore.onTopLoaded()
      },
      // 上拉加载
      loadBottom: function() {
        this.fetch()
        this.$refs.loadmore.onBottomLoaded()
      }
    }
  }
</script>

<style scoped lang="scss">
  .user-history {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;

    .user-history-list {
      position: relative;
      min-height: 100vh;
      overflow-x: hidden;
      overflow-y: auto;

      .history-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        background: white;
        border: 1px solid #F4F5F7;
        border-radius: 10px;
        padding: 1rem 0.5rem;
        margin: 1rem 0.5rem;

        .icon-avatar {
          width: 50px;
          border: 0;
          outline: 0;
          border-radius: 50%;
          img {
            width: 40px;
            height: 40px;
            border: 0;
            outline: 0;
            border-radius: 50%;
          }
        }

        .wawa-info {
          -webkit-flex: 1;
          -moz-flex: 1;
          -ms-flex: 1;
          -o-flex: 1;
          flex: 1;
          text-align: left;
          padding-left: 5px;
          overflow: hidden;
          .wawa-name {
            font-size: 1.2rem;
            color: #444;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .wawa-time {
            font-size: 1rem;
            color: #666;
          }
        }
        .wawa-state {
          width: 6rem;
          line-height: 3.5rem;
          font-size: 1.4rem;
        }

        .success {
          color: #FA5838;
        }
      }
    }
  }
</style>
