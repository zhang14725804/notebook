/** 房间列表 - 用于首页和直播间 **/

<template>
  <div class="list-view" ref="roomListArea">
    <!-- 提示入口 -->
    <!-- <div class="sub"> -->
      <div class="room-tip" v-bind:class="{fixed:tipFixed}" v-if="type=='index'" ref="roomtip">
        <div class="sub">
          <div class="topImg"></div>
          <!-- 每日任务 大转盘 排行榜 -->
          <div v-show="taskType">
              <img :src="('../static/images/turntable.png')" class="meng" alt="" v-on:click="turntablePg">
              <img :src="('../static/images/task.png')" class="zhua" alt=""  v-on:click="tasking">
              <img :src="('../static/images/Ranking.png')" class="wa" alt="" v-on:click="rankinglist">
          </div>
          <!--<img :src="meng" alt="" class="meng">
          <img :src="zhua" alt="" class="zhua">
          <img :src="wa" alt="" class="wa">
          <img :src="wa2" alt="" class="wa2">-->
          <div class="operation-refresh" v-on:click="fetch()">
            <img :src="change" alt="" class="change">
          </div>
        </div>
        <!-- 消息 -->
        <tip-message  :type="'room'" :homeTipClass='homeTipClass'></tip-message>
      </div>
    <!-- </div> -->

    <!-- 列表 -->
    <div class="room-area" v-bind:class="{ paddingTop : tipFixed && type != 'room' }">
      <ul v-if="list && list.length > 0" class="room-list" >
        <li v-on:click="jump(item.groupId)" class="room-item" v-for="(item,index) in list" :key="item.roomId" :class="[(index+1)%3==1?'yellow-class':'',(index+1)%3==0?'red-class':'']">
          <div class="room-icon" :style="{backgroundImage:`url(${item.roomPicUrl})`}"></div>
          <div class="room-state">
            <mt-badge :type="item.roomState==0?'success':'error'" size="small">{{item.roomState==0?'空闲中':'游戏中'}}</mt-badge>
          </div>
          <div class="room-info">
            <div class="room-name">
              <label>{{item.roomName}}</label>
            </div>
            <div class="room-consume">
              <div class="room-cash">
                <label>{{item.gamePrice}}</label>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <nothing-data v-else :message="'暂无可玩的房间'"></nothing-data>
    </div>
  </div>
</template>

<script>
  import store from 'store'
  import NothingData from "./NothingData"
  //引入TipMessage
  import TipMessage from "./TipMessage"
  import {
    Indicator,
    Toast,
    Loadmore
  } from 'mint-ui';
  export default {
    name: 'roomlist',
    props: ['type'],
    components: {
      NothingData,
      TipMessage,
      'mt-loadmore': Loadmore
    },
    data() {
      return {
        allLoaded: true, // false为可以上拉
        scrollMode: 'auto',
        tipFixed: false,
        list: [],
        taskType:false,
        show: false,
        player: null,
        // meng:require('../../static/images/meng.png'),
        // zhua:require('../../static/images/zhua.png'),
        // wa:require('../../static/images/wa.png'),
        // wa2:require('../../static/images/wa2.png'),
        change:require('../../static/images/change.png'),
        homeTipClass:{
          position:'absolute',
          bottom:'0px',
          left:'50%',
          transform:'translate(-50%)',
          top:'50px'
        }
      }
    },
    watch: {
      tipFixed: function(a, b) {
        this.$emit("fixed", a)
      }
    },
    created() {},
    beforeMount() {},
    beforeRouteEnter() {},
    activated() {
      var that = this,
        list = store.get('roomlist') || null

      if (list != null) {
        that.list = list
        that.updateRoomState()
      } else {
        that.fetch()
      }
      window.addEventListener('scroll', this.handleScroll)
    },
    mounted() {
      var that = this
      var list = store.get('roomlist') || null
      if (list) {
        that.list = list
        that.updateRoomState()
      } else {
        that.fetch()
      }
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
      //派发事件 父组件调用
      toggletaskType(taskType){
        this.taskType=taskType;
      },
      //大转盘
      turntablePg(){
        this.$emit('turntablePg')
      },
      //每日任务
      tasking(){
        this.$emit('tasking')
      },
      //排行榜
      rankinglist(){
        this.$emit('rankinglist')
      },
      //跳到直播间
      jump: function(gid) {
        var that = this,
          audio = store.get("audio") == undefined ? 1 : store.get("audio"),
          list = store.get('roomlist') || [],
          room = list.find((x) => {
            return x.groupId === gid
          }) || null

        if (this.GLOBAL.IOS()) {
          $("#lvb_video").attr("src", room.frontPullHlsUrl)
          document.getElementById("lvb_video") && document.getElementById("lvb_video").play()

          if (audio == 1) {
            store.set("audio", 1)
            document.getElementById("audio") && document.getElementById("audio").load()
            document.getElementById("audio") && document.getElementById("audio").play()
          } else {
            if (that.$refs.audio) {
              document.getElementById("audio") && document.getElementById("audio").pause()
            }
          }
        }

        if (this.$router.currentRoute.name == 'home' ||
          this.$router.currentRoute.name == '' ||
          this.$router.currentRoute.name == null) {
          this.$router.push({
            name: 'room',
            params: {
              id: gid
            }
          })
        } else {
          this.$router.replace({
            name: 'room',
            params: {
              id: gid
            }
          })
        }
      },
      handleScroll: function() {
        var scrollTop = window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop

        if (scrollTop > $(".banner-header").height() + 10) {
          this.tipFixed = true
        } else {
          this.tipFixed = false
        }
      },
      // 更新房间状态
      updateRoomState: function() {
        var that = this,
          storeRoomList = store.get('roomlist') || [],
          roomList = []

        this.$ajax.post('live/room/getHomeRoomList', {
          reqPlatform: this.GLOBAL.IOS() ? 3 : ''
        }).then(res => {
          if (res && res.data) {
            var liveRoomList = res.data.resBody.liveRoomList
            // 更新了房间列表  有新房间
            if (liveRoomList.length > storeRoomList.length) {
              roomList = liveRoomList
            }
            // 减少了房间
            else if (liveRoomList.length < storeRoomList.length) {
              roomList = liveRoomList
            } else {
              // 更新原有房间数据状态
              if (storeRoomList.length > 0) {
                storeRoomList.every((item, index) => {
                  var room = liveRoomList.find((x) => {
                    return x.groupId == item.groupId
                  }) || null
                  if (room) {
                    item.roomState = room.roomState
                    item.gamePrice = room.gamePrice
                    item.roomPicUrl = room.roomPicUrl
                    item.roomName = room.roomName
                    roomList.push(item)
                  }
                  return true
                })
              } else {
                roomList = liveRoomList
              }
            }
            that.list = roomList
            store.set("roomlist", roomList)
            // 给父组件传递一个参数
            if (roomList && roomList.length > 0) {
              this.$emit("group", roomList[0].groupId)
            }
          }
        })
      },
      fetch: function(cb) {
        var that = this
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        })
        this.$ajax.post('live/room/getHomeRoomList', {
          reqPlatform: this.GLOBAL.IOS() ? 3 : ''
        }).then(res => {
          Indicator.close()
          if (res && res.data) {
            that.list = res.data.resBody.liveRoomList
            store.set('roomlist', that.list)
            // 给父组件传递一个参数
            if (that.list && that.list.length > 0) {
              this.$emit("group", that.list[0].groupId)
            }
            if (cb) cb()
          } else {
            Toast({
              message: '获取房间失败',
              position: 'bottom',
              duration: 1000
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">

  .mint-loadmore-content {
    transform: none;
  }

  .win-user-message {
    position: absolute;
    top: 8px;
    left: 10px;
    max-width: 75%;
    .message-tip {
      max-width: 100%;
      padding: 0 10px;
      color: white;
      height: 26px;
      line-height: 26px;
      font-size: 12px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 20px;
      text-align: left;
      opacity: 0;
      transition: opacity 1s ease;
    }
    .show-block {
      opacity: 1;
      transition: opacity 1s ease;
    }
  }

  .list-view {
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    .fixed {
      position: fixed !important;
      background-color: #fff;
      left: 0;
      right: 0;
      top:2.9rem;
      z-index: 999;
      margin: 1rem auto !important;
          background-color: #ec91aa;
      transform: translate3d(0, -1rem, 0px);
    }

    .room-tip {
      text-align: center;
      height: 4rem;
      line-height: 4rem;
      margin: 0rem auto 0rem auto;
      position: relative;
      width:100%;
      .sub{
        background-color: #ec91aa;
        width: 95%;
        overflow: hidden;
      }
      .topImg{
        width:95%;
        height: 2rem;
        position: absolute;
        bottom:0;
        left:0.63rem;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        background-color: #FFE3E0;
      }
      img{
        width:3em;
        height:3rem;
        z-index: 999;
        left:0;
        bottom:0.5rem;
        position: absolute;
      }
      img.meng{
        left:6%;
      }
      img.zhua{
        left:32%;
      }
      img.wa{
        left:60%;
      }
      img.wa2{
        left:65%;
      }

      .operation-refresh {
        position: absolute;
        font-size: 12px;
        // top:100%;
        // left:23rem;
        right:1rem;
        bottom:0;
        width:3rem;
        height:3rem;
        // transform: translateY(-50%);
      }
      img.change{
        right:0;
      }
      //
      // .operation-refresh::before {
      //   content: "";
      //   position: absolute;
      //   left: -1.8rem;
      //   top: 0.72rem;
      //   width: 20px;
      //   height: 20px;
      //   background-image: url('/static/images/user-icon-list.png');
      //   background-repeat: no-repeat;
      //   background-size: 19.5rem 7rem;
      //   background-position: -14.5rem -0.15rem;
      // }
    }

    .paddingTop {
      padding-top: 4.6rem;
    }

    .room-area {
      padding-bottom: 4rem;
      background:transparent;
      overflow: auto;
      -webkit-overflow-scrolling: touch;

      .room-list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: flex-start;
        align-self: flex-start;
        overflow: hidden;
        background-color:#FFE3E0;
        width: 95%;
        margin:0 auto;
        padding: 0 0.2rem;
        .room-item {
          width: 49%;
          flex-basis:49%;
          padding: 0 0.8rem;
          box-sizing: border-box;
          position: relative;
          border-radius:1rem;
          margin: 5px 0 4px 0;
          background-color: #ec91aa;
          /*
          flex-grow: 1;
          flex-shrink: 1;
          flex-basis: 0;
          flex: 1;
          -webkit-box-flex: 1;
          -webkit-flex: 1; */
          .room-icon {
            width: 100%;
            min-height: 12rem;
            max-height: 16rem;
            margin:0.5rem auto;
            overflow: hidden;
            background-color: white;
            background-repeat: no-repeat;
            background-size: 100% auto;
            background-position: center;
            border-radius: 10px;
            border: 1px solid #f7f9f7;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .room-state {
            position: absolute;
            top: 0.6rem;
            right: 1.2rem;
          }

          .room-info {
            margin-top: 5px;
            text-align: left;
            color: black;
            padding-left: 2px;
            position: relative;
            margin-bottom: .5rem;
            .room-name {
              padding-left: 2px;
              width: 8rem;
              border-radius: 1rem;
              background-color: rgba(255, 255, 255, 0.59);
              padding: 0.3rem;
            }
            .room-consume {
              position: absolute;
              top: 0;
              right:-0.5rem;
            }


            .room-cash {
              width: 100%;
              height:24px;
              line-height:24px;
              padding-left: 1.1rem;
              color: #FA4900;
              position: relative;
            }

            .room-cash::before {
              content: "";
              position: absolute;
              left: 0;
              top: 0.36rem;
              width: 1rem;
              height: 1rem;
              background-image: url(/static/images/money.png);
              background-repeat: no-repeat;
              background-size: contain;
            }
          }
        }
      }
    }
  }
  .yellow-class{
    background-color: #fed84c !important;
  }
  .red-class{
    background-color: #ffacc8 !important;
  }
</style>
