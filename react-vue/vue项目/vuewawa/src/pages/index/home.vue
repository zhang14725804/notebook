<template>
  <div class="home-view" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <!-- <mt-loadmore :topMethod="loadTop" :auto-fill="true" ref="loadmore"> -->
    <!-- header -->
      <div class="heder">
      <div class="logo">
        <img :src="logo" alt="" class="logoImg">
      </div>
      <div class="userInfo">
        <div class="userImg">
          <div class="userImgHeader">
              <img :src="headImg"  alt="" class="avatar">
          </div>
        </div>
        <div class="money">
              {{lqbBalance}}
        </div>
      </div>
    </div>
      <!-- Banner -->
      <banner :type="'index'" ref="banner"></banner>
      <!-- 房间列表 -->
      <room-list :type="'index'" @turntablePg="turntablePg" @tasking="task" @rankinglist="rankinglist" v-on:group="group" v-on:fixed="isFixed" ref="roomlist"></room-list>
      
    <!-- </mt-loadmore> -->
    <!-- 首次注册弹窗提醒 -->
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" :closeOnClickModal="false">
      <div class="user-new-icon">
        <img src="/static/images/user-new-icon.png" alt="">
      </div>
      <div class="user-new-close" v-on:click="close"></div>
      <div class="user-new-tip">
        <label>新人奖励，获赠60游戏币，快去游戏吧。</label>
      </div>
      <div class="user-new-important-tip">
        <label>邀请好友获得更多游戏币。</label>
      </div>
      <div class="button-area">
        <button type="button" name="button-cancel" class="button-item wawa-button-primary" v-on:click="award">邀请好友</button>
        <button type="button" name="button-game" class="button-item wawa-button-danger" v-on:click="begin">开始游戏</button>
      </div>
    </mt-popup>

    <!-- 每日签到 -->
    <div class="sign" @touchmove.prevent v-if="everSign">
        <img :src="('../static/images/Signbg.png')" alt="" class="bg">
        <div class="signContentBg">
          <img :src="('../static/images/Sign.png')" alt="" class="">
          <div class="contentText">
              <span>已经连续签到</span>
              <span class="day">{{totalSgin}}<b>天</b></span>
              <span class="money">获得<b>{{totalAward}}</b>娃娃币</span>
              <ul>
                <li v-for="(item,indx) in sginList" :class="{'active':item.isSgin == 1}" >
                  <img :src="('../static/images/money.png')" alt="" class="moneyIcon">
                  <img :src="('../static/images/SignCheck.png')" alt="" class="finishSign" v-show="item.isSgin == 1">
                  <span class="num">X10</span>
                  <span class="time">{{item.day}}</span>
                </li>
              </ul>
          </div>
          <img :src="('../static/images/SignClose.png')" alt="" class="signClose" @click="signClose" >
          <div class="qiandao" @click="checkTask">
            签到
          </div>
        </div>

    </div>
    <!-- 每日任务 -->
    <div class="daytask" v-if="isShow">
        <div class="content">
            <img :src="('../static/images/daytaskBG.png')" alt="" class="daytaskBG">
            <div class="closeTask" v-on:click="closeTask">X</div>
            <div class="daytaskList">
              <div class="daytaskCard" v-for="(item,index) in taskList">
                <img :src="item.icon" alt="" class="icon">
                <div class="contentText">
                  <span>{{item.taskName}}</span>
                  <span>{{item.txt}}</span>
                </div>
                <div class="gotoFinish">
                  <img :src="('../static/images/finishBG.png')" alt="" @click="gotofinish(index)">
                </div>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import store from 'store';
  import user from "../../assets/common/user"
  import Banner from "../../components/Banner.vue";
  import RoomList from "../../components/RoomList.vue";
  import {
    Toast,
    Indicator,
    Loadmore
  } from 'mint-ui'
  export default {
    components: {
      Banner,
      RoomList,
      'mt-loadmore': Loadmore
    },
    data() {
      return {
        allLoaded: true, // false为可以上拉
        scrollMode: 'auto',
        popupVisible: false,
        groupId: '',
        headImg:'',
        isShow:false,
        taskType:false,
        taskList:[],
        sginList:[],
        totalSgin:'',
        totalAward:'',
        lqbBalance:'',
        everSign:false,
        logo:require('../../../static/images/logo.png')
      }
    },
    // 离开路由时把位置存起来
    beforeRouteLeave(to, from, next) {
      let position = window.scrollY || document.documentElement.scrollTop
      this.$storeVuex.state.position = position
      next()
    },
    updated() {},
    create(){
      var that = this;
      that.userInfo();
    },
    watch:{
      '$route'(to,from){
        var that = this;
        console.log(to,from)
        console.log(from.name == "turntable");
          if(from.name == "turntable"){
            that.userInfo();
          }
      }
    },
    activated() {
      var that = this
      that.amount()
      // 返回页面取出来
      this.$nextTick(function() {
        let position = this.$storeVuex.state.position
        window.scroll(0, position)
      })
      var userEntity = store.get('user') || null
      this.bindUserInfoToview(userEntity)
    },
    mounted(){
      var that = this,
        userEntity = store.get('user') || null,
        code = store.get('code') || ''
        console.log(userEntity)
      // 用户在微信端
      if (this.GLOBAL.isWeixn()) {
        if (userEntity) {
          if (userEntity.userInfo.firstLogin == undefined) {
            // 如果登录态不是最新的
            store.remove('user')
            store.remove('code')
            window.location.href = this.GLOBAL.Wechat.OAuth2
          } else {
            //老用户
            //任务列表显示
            that.taskType = !that.taskType;
            that.$refs.roomlist.toggletaskType(that.taskType);
            //每日任务签到
            that.checkTaskType();
            that.userInfo();
            store.remove('code');
          }
        } else {
          if (code) {
            user.login(code, function(res) {
              store.remove('code')
              // 首次注册，弹窗提醒
              if (res.data.resBody.userInfo.firstLogin == 0) {
                that.popupVisible = true
              }else{
                console.log('old');
              }
              return
            })
          } else {
            store.remove('user')
            store.remove('code')
            // 微信登录授权
            window.location.href = this.GLOBAL.Wechat.OAuth2
          }
        }
        if(that.$route.params.id != undefined){
          console.log(111);
          that.exchange(that.$route.params.id)
        }
        //登录奖励
        that.$ajax.post('user/task/everyday/loginSendScore',{}).then(res => {})
      }
      //剩余娃娃币
      console.log(that.$route.params.id);
      that.$ajax.post("user/getMyUserInfo", {}).then(res => {
        if (res && res.data) {
          if (res.data.resBody.success == 1) {
            that.lqbBalance = res.data.resBody.userInfo.lqbBalance;
            that.headImg = res.data.resBody.userInfo.headImg;
          }
        }
      })
    },
    methods: {
      //获取用户信息
      userInfo:function(){
        var that = this;
        that.$ajax.post("user/getMyUserInfo", {}).then(res => {
          console.log(res);
          if (res && res.data) {
            if (res.data.resBody.success == 1) {
              that.headImg = res.data.resBody.userInfo.headImg;
              window.sessionStorage.setItem("lqbBalance", JSON.stringify(res.data.resBody.userInfo.lqbBalance))
              that.lqbBalance = window.sessionStorage.getItem('lqbBalance');
              console.log(window.sessionStorage.getItem('lqbBalance'));
              console.log(res.data.resBody.userInfo.lqbBalance);
            }
          }
        })
      },
      signClose:function(){
          this.everSign=false;
      },
      //完成任务
      gotofinish(index){
        console.log(index);
        var that = this;
        switch (index) {
          case 0:
          this.$router.push('/user/cash');
          that.closeTask()
            break;
          case 1:
            this.$router.push('/user/award');
            that.closeTask()

              break;
              case 2:
                that.closeTask()
                  break;
                  case 3:
                  that.closeTask()
                      break;
                      case 4:
                        this.$router.push('/rankinglist');
                        that.closeTask()

                          break;
          default:

        }
      },
      //每日任务签到详情
      checkTaskType(){
        var that = this;
        that.$ajax.post('user/task/everyday/getUserSginInfo',{}).then(res => {
          if (res && res.data) {
            //判断是否需要签到
            if(res.data.resBody.isShow == 1 ){
              that.everSign = true;
            }
              that.sginList = res.data.resBody.sginList
              that.totalAward = res.data.resBody.totalAward;
              that.totalSgin = res.data.resBody.totalSgin;
          }
        })
      },
      //每日任务签到
      checkTask(){
        var that = this;
        console.log(1321);
        that.$ajax.post('user/task/everyday/sgin',{}).then(res => {
          if (res && res.data) {
            if (res.data.resBody.success == 0) {
              Toast({
                message: '签到成功',
                duration: 5000
              })
              that.checkTaskType();
              that.everSign=false;
            }else{
              // Toast({
              //   message: '签到失败',
              //   duration: 5000
              // })
            }
          }
        })
      },
      //兑换
      exchange: function(data) {
        console.log(data);
        var that = this
        // Indicator.open({
        //   text: '兑换中...',
        //   spinnerType: 'snake'
        // })
        // 逻辑：调用接口，返回成功数据后修改兑换状态并显示弹窗
        this.$ajax.post('inviteAward/verifyInviteCode', {
          fromInviteCode: data
        }).then(res => {
          setTimeout(function() {
            Indicator.close()
            if (res && res.data) {
              if (res.data.resHead.code == 1) {
                Toast({
                  message: '兑换成功',
                  iconClass: 'icon icon-success',
                  position: 'bottom',
                  duration: 800
                });
                that.complete = true
                that.popupVisible = true
                that.getInviteCode()
              } else {
                // Toast({
                //   message: res.data.resHead.msg || '邀请码兑换失败',
                //   position: 'bottom',
                //   duration: 2000
                // });
              }
            }
          }, 500)
        })
      },
      closeTask:function(){
        this.isShow = !this.isShow;
      },
      //用户头像
      bindUserInfoToview: function(userData) {
        var that = this
        if (userData) {
          that.headImg = userData.userInfo.headImg // 用户头像
        }
      },
      //大转盘
      turntablePg:function(){
        this.$router.push({
          name: 'turntable'
        })
      },
      //排行榜
      rankinglist:function(){
        this.$router.push({
          name: 'rankinglist'
        })
      },
      //每日任务
      task:function(){
        var that = this;
        this.isShow = !this.isShow;
        //每日任务列表
        this.$ajax.post('/user/task/everyday/getUserTaskInfo',{}).then(res => {
          if (res && res.data) {
            if (res.data.resBody.taskList.length > 0) {
              that.taskList = res.data.resBody.taskList;
            }
          }
        })
      },
      // 访问量
      amount: function() {
        var that = this,
          channelId = store.get("channelId") || null

        if (channelId) {
          // 访问
          this.$ajax.post("channel/addVisitNum", {
            channelId: channelId
          }).then(res => {})
          // 活跃
          this.$ajax.post("channel/addActive", {
            channelId: channelId
          }).then(res => {})
        }
      },
      close: function() {
        this.popupVisible = false
      },
      // 邀请好友
      award: function() {
        this.close()
        this.$router.push({
          name: 'award'
        })
      },
      isFixed: function(data) {
        if (data) {
          var mint_loadmore_content = getElementsClass("mint-loadmore-content")
          if (mint_loadmore_content.length > 0) {
            mint_loadmore_content[0].style = null
          }
        }

        // 通过class获取dom元素
        function getElementsClass(classnames) {
          var classobj = new Array();
          var classint = 0;
          var tags = document.getElementsByTagName("*")
          for (var i in tags) {
            // 判断节点类型
            if (tags[i].nodeType == 1) {
              // 判断包含需要匹配的CLASS名字，并组成一个数组
              if (tags[i].getAttribute("class")) {
                if (tags[i].getAttribute("class").indexOf(classnames) != -1) {
                  classobj[classint] = tags[i];
                  classint++;
                }
              }
            }
          }
          return classobj;
        }
      },
      group: function(data) {
        this.groupId = data
      },
      // 开始游戏
      begin: function() {
        var that = this,
          audio = store.get("audio") == undefined ? 1 : store.get("audio"),
          list = store.get('roomlist') || [],
          room = list.find((x) => {
            return x.groupId === that.groupId
          }) || null

        // 关闭弹窗
        that.close()

        if (!this.GLOBAL.isWeixn()) {
          this.$router.push({
            name: 'spread'
          })
          return
        }

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

        this.$router.push({
          name: 'room',
          params: {
            id: that.groupId
          }
        })
      },
      // 下拉加载
      loadTop: function() {
        var that = this
        this.$refs.banner.fetch('index')
        this.$refs.roomlist.updateRoomState()
        this.$refs.loadmore.onTopLoaded()
      }
    }
  }
</script>
<style scoped lang="scss">

// 关闭每日任务
.closeTask{
  position: absolute;
  top:0;
  right:16%;
  width:2.5rem;
  height:2.43rem;
  line-height:2.43rem;
  text-align:center;
  border:1px solid #ffffff;
  border-radius:50%;
  color:#ffffff;
}
/* 每日任务样式 */
.daytask .content .daytaskList .daytaskCard .contentText{
  height:4.6rem;
  position: absolute;
  top:0;
  left:3.5rem;
  padding-top: 1rem;
}
.daytask .content .daytaskList .daytaskCard .contentText span{
  display: block;
  text-align: left;
}
.daytask .content .daytaskList .daytaskCard .contentText span:first-child{
  font-weight: bolder;
}
.daytask .content .daytaskList .daytaskCard .contentText span:last-child{
  color: #fad04a;
}
.daytask .content .daytaskList .daytaskCard .gotoFinish{
  position: absolute;
  right:1rem;
  top:1.4rem;
  padding-top: 1rem;
}
.daytask .content .daytaskList .daytaskCard .gotoFinish span{
  text-align: right;
  display: block;
  color:#fad04a;
  text-align: center;
}
.daytask .content .daytaskList .daytaskCard .gotoFinish img{
  width:5rem;
}


.daytask .content .daytaskList .daytaskCard .icon{
  width:3.5rem;
  height:3.5rem;
  display: block;
  position: absolute;
  left:-1rem;
  top:0.5rem;
  box-shadow: 0 0 8px #ec91aa;
}
.daytask .content .daytaskList .daytaskCard{
  width: 99%;
  height: 4.3rem;
  background-color: #ffffff;
  border-radius: 0.5rem;
  margin-left: 1.5rem;
  position: relative;
  margin-bottom: 0.7rem;
}
.daytask .content .daytaskList{
  width: 83%;
  position: absolute;
  top: 17%;
  left: 50%;
  margin-left: -46%;
}
.daytask .content{
  width: 90%;
  position: relative;
  margin-left:5%;
  margin-top:3rem;
}
.daytask .content img{
  display: block;
  width: 100%;
}

.daytask{
  position: fixed;
  left:0;
  right:0;
  bottom:0;
  top:0;
  background-color: rgba(0,0,0,0.5);
  z-index: 99999;
}
/* 签到样式*/
  .signContentBg .contentText ul li{
    float: left;
    width:19%;
    height:3.5rem;
    background-color: #f1f2f4;
    border-radius: 0.5rem;
    margin-left: 0.9rem;
    position: relative;
  }
  .signContentBg .contentText ul li img.moneyIcon{
    display:block;
    width: 2rem;
    height: 2rem;
    margin: 0.2rem auto;
  }
  .signContentBg .contentText ul li span.time{
    position: relative;
    bottom:-0.6rem;
    font-size:10px;
  }
  .signContentBg .contentText ul li img.finishSign{
    position: absolute;
    top:-0.3rem;
    left:-0.3rem;
    width: 1rem;
    height: 1rem;
    display: block;
  }
  .signContentBg .contentText ul li:first-child,.signContentBg .contentText ul li:nth-child(2),.signContentBg .contentText ul li:nth-child(3){
    width: 24%;
    height: 4rem;
    margin-left:1.3rem;
    margin-bottom: 2rem;
    margin-top: 1rem;
  }
  .signContentBg .contentText span{
    font-size:1.2rem;
    display: block;
    color: #868b8f;
  }
  .signContentBg .contentText span.day{
    font-size: 1.7rem;
    color: #ffbf14;
    margin: 0.5rem 0;
  }
  .signContentBg .contentText span.day b{
    font-size: 1rem;
  }
  .signContentBg .contentText span.money b{
    color: #ffbf14;
  }
  .signContentBg .contentText ul li.active{
    background-color: #ffc31a;
  }
  .signContentBg .contentText ul li span.num{
    font-size: 10px;
  }
  .signContentBg .contentText ul li.active span.num{
    color: #ffffff;
  }
  .signContentBg  .signClose{
    position: absolute;
    left:50%;
    transform:translate(-50%);
    bottom:-3rem;
    padding:1rem;
    display: block;
    width:1rem !important;
    margin-left: -0.5rem;
  }
  .sign{
    position: fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background-color: rgba(0,0,0,0.5);
    z-index: 99999;
  }
  .sign .signContentBg{
    position:absolute;
    top:2rem;
    left:50%;
    width:64%;
    margin-left:-32%;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .sign img.bg,.sign .signContentBg img{
    width: 100%;
  }
  .signContentBg .contentText{
    width: 100%;
    height: 2rem;
    position: absolute;
    top:33%;
  }
  .userInfo .money{
    height:1.5rem;
    line-height:1.5rem;
    float: right;
    padding-left: 1.8rem;
    padding-top: 0.1rem;
    padding-right: 0.2rem;
    border-radius:1rem;
    color: #ffffff;
    font-size:1rem;
    font-weight: bold;
    margin-top: 0.5rem;
    margin-right: 0.1rem;
    background-image: url("../../../static/images/headerMoney.png");
    background-size: cover;
    background-repeat: no-repeat;
  }
  .userInfo .userImg .userImgHeader{
    width: 2rem;
    height:2rem;
    background-color: #ffffff;
    border-radius: 50%;
    margin: 0.22rem;
    overflow: hidden;
  }
  .userInfo .userImg .userImgHeader .avatar{
      width: 1.6rem;
      height: 1.6rem;
      border-radius:50%;
      display: block;
      margin-top: 0.15rem;
      margin-left: 0.15rem;
  }


  .userInfo .userImg{
    float: right;
    width: 2.5rem;
    height: 2.5rem;
    background-color:#e44f78;
    border-radius: 50%;
    margin-top: 0.1rem;
  }
  .userInfo{
    position: absolute;
    top:0rem;
    right:0.5rem;
    width:7.1rem;
    height: 3rem;
  }
  .heder{
    width: 100%;
    background-color: #FF5348;
    height:3rem;
    line-height:3rem;
    position: fixed;
    top:0;
    z-index: 9;
  }
  .heder .logo{
    width:10rem;
  }
  .heder .logo img{
    display: block;
    width:11rem;
    margin-left: 1rem;
  }
  .home-view {
    background-image: url('/static/images/home_bg.png');
    background-size: cover;
    overflow-x: hidden;
    overflow-y: auto;

    .user-new-icon {
      width: 15rem;
      height: 10rem;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .user-new-close {
      position: absolute;
      background-image: url('/static/images/user-icon-list.png');
      background-repeat: no-repeat;
      width: 2rem;
      height: 2rem;
      right: 1rem;
      top: 1rem;
      background-size: 25rem 10rem;
      background-position: -14.3rem -3.6rem;
    }

    .user-new-tip {
      padding: 1rem;
    }

    .user-new-important-tip {
      font-size: 1rem;
      color: #FB5837;
      text-align: center;
    }
  }
  .qiandao{
    width:5rem;
    height: 2.5rem;
    color: #ffffff;
    display: block;
    margin:0 auto;
    font-size:1.2rem;
    font-weight: bold;
    border-radius: 1rem;
    text-align: center;
    line-height:2.5rem;
    background-color:#ffbf14;
  }
</style>
