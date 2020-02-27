/** 抓取记录 **/

<template>
  <div class="user-guest" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <!-- 用户信息 -->
    <div class="user-info">
      <div class="user-icon">
        <img :src="avatar" alt="">
      </div>
      <div class="user-name">
        <div><label> {{userName}} </label></div>
        <small>ID:{{userId}}</small>
      </div>
    </div>
    <div class="list-title">
      <label>娃娃记录：（抓中<b>{{dataTotal}}</b>次）</label>
    </div>
    <!-- 抓中记录 -->
    <div class="list-view">
      <mt-loadmore :topMethod="loadTop"  :bottomMethod="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul v-if="list && list.length>0" class="room-list">
          <li class="room-item" v-for="item in list" :key="item.gameId">
            <div class="room-icon">
              <img :src="item.toyPicUrl" alt="">
            </div>
            <div class="room-info">
              <div class="room-name">
                <label>{{item.toyName}}</label>
              </div>
              <div class="wawa-time">
                <label>{{item.createTime}}</label>
              </div>
            </div>
          </li>
        </ul>
        <nothing-data v-else :message="'暂无抓取记录'"></nothing-data>
      </mt-loadmore>
    </div>
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
        count: 10,
        groupId: '',
        userId: '',
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
      that.groupId = this.$route.params.gid
      that.userId = this.$route.params.uid
      that.getUserInfo()
      that.fetch()
    },
    methods: {
      getUserInfo: function() {
        var that = this
        this.$ajax.post('user/getUserInfo', {
          userId: that.userId
        }).then(res => {
          if (res && res.data && res.data.resHead.code == 1) {
            that.userName = res.data.resBody.userInfo.nickName
            that.avatar = res.data.resBody.userInfo.headImg
          } else {
            console.log(res.data.resHead.msg)
            Toast({
              message: "获取信息失败",
              position: 'bottom',
              duration: 3000
            })
          }
        })
      },
      fetch: function() {
        var that = this
        that.allLoaded = true
        that.pageNum = parseInt(that.pageNum + 1)
        this.$ajax.post('playRecord/getPlayRecordList', {
          // groupId: that.groupId,
          pageNum: that.pageNum,
          pageSize: that.pageSize,
          userId: that.userId,
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
  .user-guest {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem;
    overflow-x: hidden;
    overflow-y: auto;
    .user-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0 auto;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-name {
      font-size: 1.4rem;
      font-weight: bold;
      padding: 1rem;
      small {
        font-weight: normal;
        font-size: 1rem;
      }
    }
    .list-title {
      text-align: left;
      padding: 1rem 0;
      b {
        color: #FC5A3A;
      }
    }
    .list-view {
      background-color: #FDC22D;
      border-radius: 8px;
      .room-list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;

        .room-item {
          width: 50%;
          padding: 10px 20px;
          box-sizing: border-box;
          position: relative;

          .room-icon {
            width: 100%;
            height: 140px;
            overflow: hidden;
            border-radius: 4px;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .room-info {
            margin-top: 5px;
            text-align: left;
            color: #222;
            .room-name {
              font-size: 16px;
            }

            .wawa-time {
              width: 100%;
              height: 30px;
              color: #464644;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
