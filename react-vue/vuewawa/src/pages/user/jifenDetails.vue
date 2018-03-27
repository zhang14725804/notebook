/** 抓取记录 **/

<template>
    <div class="user-history" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <mt-loadmore :topMethod="loadTop" :bottomMethod="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="title">
          <span>积分值</span>
          <span>类型</span>
          <span>获得时间</span>
        </div>
        <ul v-if="list.length>0" class="user-history-list">
          <li class="history-item" v-for="item in list" :key="item.playId">
            <span>{{item.scoreNum}}</span>
            <span>{{item.scoreTypeName}}</span>
            <span>{{item.createTime}}</span>
          </li>
          <div v-if="!nextPage" class="data-tip-text">
            <label>没有更多数据了!</label>
          </div>
        </ul>
        <nothing-data v-else :message="'没有消息数据'"></nothing-data>
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
        allLoaded: true, // false为可以上拉
        scrollMode: 'auto',
        dataTotal: 0, // 总条数
        nextPage: false, // 是否还有下一页
        pageTotal: 0, // 总页码
        pageSize: 20, // 没次显示多少条
        pageNum: 0, // 当前页码
        list: []
      }
    },
    mounted() {
      this.fetch()
    },
    activated() {},
    methods: {
      fetch: function() {
        var that = this
        that.allLoaded = true
        that.pageNum = parseInt(that.pageNum + 1)
        this.$ajax.post('user/getMyScoreRecord', {
          pageNum: that.pageNum,
          pageSize: that.pageSize
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
  .title{
    width: 100%;
    height:3rem;
  }
  .title span{
    display: inline-block;
    width: 33%;
    float: left;
    line-height:3rem;
    text-align:center;
  }
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
        span{
          display: inline-block;
          width: 33%;
          text-align: center;
          line-height: 100%;
        }
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

        .user-info {
          -webkit-flex: 1;
          -moz-flex: 1;
          -ms-flex: 1;
          -o-flex: 1;
          flex: 1;
          text-align: left;
          padding-left: 5px;
          overflow: hidden;
          .user-name {
            font-size: 1.2rem;
            color: #444;
            font-weight: 400;
          }

          .user-time {
            font-size: 12px;
            color: #666;
          }
        }
        .user-state {
          width: 6rem;
          line-height: 3.5rem;
          font-size: 1.2rem;
          color: #555;
        }

        .success {
          color: #FA5838;
        }
      }
    }
  }
</style>
