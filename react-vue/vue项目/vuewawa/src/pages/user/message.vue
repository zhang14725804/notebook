/** 我的消息 **/

<template>
  <div class="user-messgae" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <mt-loadmore :topMethod="loadTop" :bottomMethod="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul v-if="list.length>0" class="user-messgae-list">
        <li class="message-item" v-for="item in list" :key="item.messageId">
          <div class="icon-avatar">
            <img src="/static/images/app-logo.png" alt="">
          </div>
          <div class="message-info">
            <div class="message-header">
              <div class="message-title">
                <label>萌多多抓娃娃</label>
              </div>
              <div class="message-type">
                <label>{{item.messageType==0?'系统消息':'未知'}}</label>
              </div>
              <div class="message-time">
                <label>{{item.createTime | filterTime}}</label>
              </div>
            </div>
            <div class="message-content">
              <label>{{item.messageContent}}</label>
            </div>
          </div>
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
  import store from 'store';
  import util from "../../assets/common/util";
  import NothingData from "../../components/NothingData.vue";
  import {
    Indicator,
    Toast,
    Loadmore
  } from 'mint-ui';
  export default {
    components: {
      NothingData,
      'mt-loadmore': Loadmore
    },
    data() {
      return {
        allLoaded: true, // false为可以上拉
        scrollMode: 'auto',
        avatar: '', // 用户头像
        dataTotal: 0, // 总条数
        nextPage: false, // 是否还有下一页
        pageTotal: 0, // 总页码
        pageSize: 20, // 没次显示多少条
        pageNum: 0, // 当前页码
        list: []
      }
    },
    filters: {
      filterTime: function(time) {
        return util.formatDateTime(time)
      }
    },
    mounted() {
      var that = this,
        userData = store.get('user') || null

      if (userData) {
        that.avatar = userData.userInfo.headImg
      }
      this.fetch()
    },
    activated() {},
    methods: {
      // 获取我的消息
      fetch: function() {
        var that = this
        that.allLoaded = true
        that.pageNum = parseInt(that.pageNum + 1)
        this.$ajax.post('message/getMyNotify', {
          pageNum: that.pageNum,
          pageSize: that.pageSize
        }).then(res => {
          if (res && res.data) {
            that.list = res.data.resBody.messageList || []
            // 如果获取到了消息
            if (that.list.length > 0) {
              // 修改消息状态
              that.changeNotifyState()
            }
            // 返回是否还有数据，如果有数据返回true，但是组件需要为false时代表可以进行下一次拉取刷新
            that.allLoaded = !res.data.resBody.nextPage
            that.scrollMode = "touch"
          }
        })
      },
      // 修改消息状态
      changeNotifyState: function() {
        var that = this
        this.$ajax.post('message/changeNotifyState', {
          changeAll: 0
        }).then(res => {
          if (res && res.data) {
            // 状态修改成功后需要修改消息提醒的状态，两种处理办法：
            // 1、既然传入的是修改全部消息状态，就没必要再去请求接口来读取未读的消息个数
            // 2、调用接口获取未读消息个数然后更新到缓存
            if (res.data.resHead.code == 1) {
              store.set("notifyNum", 0)
            }
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
  .user-messgae-list {
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    min-height: 100vh;
  }

  .message-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    background: white;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    padding: 1rem 0.2rem;
    margin: 1rem 0.5rem;
    .icon-avatar {
      width: 40px;
      border-radius: 50%;
      outline: 0;
      border: 0;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        outline: 0;
        border: 0;
      }
    }

    .message-info {
      flex: 1;
      text-align: left;
      padding-left: 5px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow: hidden;
      .message-content,
      .message-header {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        text-align: left;
      }

      .message-header {
        .message-title {
          -webkit-flex: 2;
          -moz-flex: 2;
          -ms-flex: 2;
          -o-flex: 2;
          flex: 2;
          height: 30px;
          line-height: 30px;
          font-size: 1.2rem;
          color: #222;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .message-type {
          font-size: 10px;
          -webkit-flex: 1;
          -moz-flex: 1;
          -ms-flex: 1;
          -o-flex: 1;
          flex: 1;
          min-width: 50px;
          line-height: 2rem;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .message-time {
          font-size: 10px;
          min-width: 140px;
          -webkit-flex: 1;
          -moz-flex: 1;
          -ms-flex: 1;
          -o-flex: 1;
          flex: 1;
          color: #666;
          padding-right: 4px;
          line-height: 2rem;
          text-align: right;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .message-content {
        color: #333;
        font-size: 12px;
        margin-top: 2px;
      }
    }
  }
</style>
