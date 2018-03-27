/** 用户中心 **/

<template>
  <div class="user-info-view">
    <!-- 个人中心 -->
    <div class="newMess" v-on:click="toJump('message')">
    </div>
    <div class="user-section">
      <div class="user-avatar">
        <img src="/static/images/userImgBg.png" alt="" style="display:block;width:100%;height:100%;position:absolute">
        <div class="user-avatar-icon">
          <img :src="headImg" alt="">
        </div>
        <div class="user-name-text">
          <label> {{nickName}} </label>
          <div class="user-id-text">ID:{{userId}}</div>
        </div>
        <div v-on:click="toJump('cash')" class="go-pay">去充值</div>
        <div class="userInfo">
          <div class="userInfo-list" @click="moneydata">
            <div><span>{{lqbBalance}}</span><span class="desc">我的娃娃币</span></div>
            
          </div>
          <div class="userInfo-list" @click="expdata">
            <div><span>{{totalExp}}</span><span class="desc">我的会员</span></div>
            
          </div>
          <div class="userInfo-list" @click="jifendata">
            <div><span>{{totalScore}}</span><span class="desc">积分商城</span></div>
            
          </div>
        </div>
        <div class="vip">
          <img :src="vip" alt="">
          <span>{{vipLevel}}</span>
        </div>
      </div>

      <div class="user-operation-list">
        <ul class="user-list-area">
          <li class="user-list-item" v-on:click="toJump('cash')">
            <div class="user-item-text user-item-cash">充值娃娃币</div>
            <img :src="right" alt="">
          </li>
          <li class="user-list-item" v-on:click="toJump('rankinglist')">
            <div class="user-item-text user-item-rangklinglist">排行榜Top</div>
            <img :src="right" alt="">
          </li>
          <li class="user-list-item" v-on:click="toJump('integralshop')">
            <div class="user-item-text user-item-order user-item-shop">积分商城</div>
            <img :src="right" alt="">
          </li>
          <li class="user-list-item" v-on:click="toJump('turntable')">
            <div class="user-item-text user-item-order user-item-turntable">幸运大转盘</div>
            <img :src="right" alt="">
          </li>
          <li class="user-list-item" v-on:click="toJump('history')">
            <div class="user-item-text user-item-history">抓取记录</div>
            <img :src="right" alt="">
          </li>
          <li class="user-list-item" v-on:click="toJump('order')">
            <div class="user-item-text user-item-order">我的订单</div>
            <img :src="right" alt="">
          </li>
          <li class="user-list-item" v-on:click="toJump('award')">
            <div class="user-item-text user-item-award">邀请奖励</div>
            <img :src="right" alt="">
          </li>
          <li class="user-list-item" v-on:click="toJump('invitcode')">
            <div class="user-item-text user-item-invitcode">输入好友邀请码</div>
            <img :src="right" alt="">
          </li>
          <!-- <li class="user-list-item" v-on:click="toJump('invitUser')">
            <div class="user-item-text user-item-invitcode user-item-invuser">已邀请好友</div>
            <img :src="right" alt="">
          </li> -->
          <li class="user-list-item" v-on:click="toJump('usercash')">
            <div class="user-item-text user-item-invitcode user-item-usercash">好友充值</div>
            <img :src="right" alt="">
          </li>
          <!-- <li class="user-list-item" v-on:click="toJump('invitcode')">
            <div class="user-item-text user-item-invitcode">好友充值</div>
            <img :src="right" alt="">
          </li> -->
        </ul>
      </div>
    </div>
    <!-- 个人邀请 -->
    <!-- <div class="user-section">
      <div class="user-operation-list">
        <ul class="user-list-area">
          <li class="user-list-item" v-on:click="toJump('award')">
            <div class="user-item-text user-item-award">邀请奖励</div>
            <img :src="right" alt="">
          </li>
          <li class="user-list-item" v-on:click="toJump('invitcode')">
            <div class="user-item-text user-item-invitcode">邀请兑换码</div>
            <img :src="right" alt="">
          </li>
        </ul>
      </div>
    </div> -->
    <!-- 下载APP -->
    <div class="user-section">
      <button type="button" name="download-app" class="down-btn" v-on:click="download">下载APP</button>
    </div>
  </div>
</template>

<script>
  import store from 'store'
  import user from "../../assets/common/user"
  export default {
    data() {
      return {
        // 显示、隐藏提示框
        popupVisible: false,
        // 审核状态，0: 未申请， 1: 审核中，2: 审核完成
        auditState: 0,
        headImg: '',
        nickName: '',
        userId: '',
        notifyNum: 0,
        lqbBalance:'',
        totalScore:'',
        totalExp:'',
        vipLevel:'',
        weChat: this.GLOBAL.Wechat.Name,
        right:require('../../../static/images/right.png'),
        vip:require('../../../static/images/vip.png'),
        exp:require('../../../static/images/exp.png'),
        ji:require('../../../static/images/ji.png'),
        money:require('../../../static/images/money.png'),
        vip:require('../../../static/images/vip.png'),
        newMess:require('../../../static/images/user-icon-list.png')

      }
    },
    created() {
      var that = this;
      this.$ajax.post("user/getMyUserInfo", {}).then(res => {
        if (res && res.data) {
          if (res.data.resBody.success == 1) {
            console.log(res.data.resBody.userInfo.totalExp);
            that.lqbBalance = res.data.resBody.userInfo.lqbBalance;
            that.totalScore = res.data.resBody.userInfo.totalScore;
            that.totalExp = res.data.resBody.userInfo.totalExp;
            that.userId = res.data.resBody.userInfo.userId;
            that.vipLevel = res.data.resBody.userInfo.vipLevel;
            that.headImg = res.data.resBody.userInfo.headImg
            window.localStorage.setItem("totalExp",res.data.resBody.userInfo.totalExp);
            window.localStorage.setItem("totalScore",res.data.resBody.userInfo.totalScore)

          }
        }
      })


    },
    watch:{
      '$route'(to,from){
        var that = this;
          if(from.name == "turntable"){
            that.$ajax.post("user/getMyUserInfo", {}).then(res => {
              if (res && res.data) {
                if (res.data.resBody.success == 1) {
                  that.lqbBalance = res.data.resBody.userInfo.lqbBalance;
                  that.totalScore = res.data.resBody.userInfo.totalScore;
                  that.totalExp = res.data.resBody.userInfo.totalExp;
                  that.userId = res.data.resBody.userInfo.userId;
                  that.vipLevel = res.data.resBody.userInfo.vipLevel;
                  that.headImg = res.data.resBody.userInfo.headImg;
                }
              }
            })
          }
      }
    },
    activated() {
      var userEntity = store.get('user') || null
      console.log(userEntity);
      this.bindUserInfoToview(userEntity)
    },
    mounted() {
      var that = this,
        userEntity = store.get('user') || null,
        code = store.get('code') || ''
        
      // 用户在微信端
      if (this.GLOBAL.isWeixn()) {
        
        if (userEntity) {
          that.bindUserInfoToview(userEntity)
        } else {
          if (code) {
            user.login(code, function(res) {
              store.remove('code')
              userEntity = store.get('user') || null
              that.bindUserInfoToview(userEntity)
            })
          } else {
            store.remove('user')
            store.remove('code')
            window.location.href = this.GLOBAL.Wechat.OAuth2
          }
        }
      }
    },
    methods: {
      moneydata:function(){
        this.$router.push('/user/cash')
      },
      expdata:function(){
        this.$router.push('/user/exp')
      },
      jifendata:function(){
        this.$router.push('/user/jifen')
      },
      download: function() {
        if (this.GLOBAL.Android()) {
          window.location.href = this.GLOBAL.APP.Android
        } else if (this.GLOBAL.IOS()) {
          window.location.href = this.GLOBAL.APP.IOS
        }
      },
      clearUser: function() {
        store.remove('user')
        store.remove('code')
        this.$router.replace({
          path: '/'
        })
      },
      // 绑定用户信息到视图中
      bindUserInfoToview: function(userData) {
        var that = this,
          notifyNum = store.get('notifyNum') || 0

        if (userData) {
          that.headImg = userData.userInfo.headImg // 用户头像
          that.nickName = userData.userInfo.nickName
          that.userId = userData.userInfo.userId
          that.notifyNum = notifyNum // 是否有新消息>0代表有
        }
        this.$share.code('code')
      },
      // 成为合作伙伴
      bindPartner: function() {
        this.popupVisible = true
      },
      cancel: function() {
        this.popupVisible = false
      },
      // 跳转页面
      toJump: function(name) {
        console.log(name)
        if (this.GLOBAL.IOS()) {
          if (name == 'cash') {
            var main_url = window.origin == null || '' ? this.GLOBAL.MAIN_URL : window.origin.replace("/undefined", "")
            window.location.href = main_url + '/user/cash'
          } else {
            this.$router.push({
              name: name
            })
          }
        } else {
          this.$router.push({
            name: name
          })
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  .newMess{
      background-image: url(/static/images/lingdang.png);
      background-repeat: no-repeat;
      width: 2rem;
      height: 2rem;
      right:1rem;
      top:1rem;
      position: absolute;
      background-size: cover;
  }
  .vip{
    bottom: 3%;
    position: absolute;
  }
  .vip img{
        float: left;
        padding-left: 2rem;
        width: 2.5rem;
  }
  .vip span{
    float: left;
      line-height: 2.5rem;
      color: #ffffff;
  }
  .userInfo{
    overflow: hidden;
    height: 29%;
    position: absolute;
    width: 100%;
    top: 49%;
  }
  .userInfo .userInfo-list{
    width: 33%;
    float: left;
    text-align: center;
    border-right: 1px solid #dedede;
  }
  .userInfo .userInfo-list:last-child{
    border-right:none;
  }

  .userInfo .userInfo-list span{
    display: block;
  }
    .userInfo .userInfo-list .desc{
      color: #CBCBCB;
    }


  .user-info-view {
    padding: 3rem 2rem;
    padding-bottom: 6rem;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    background:linear-gradient( #FF7CAE 0%,#ffffff 20%);

    .user-section {
      position: relative;

      .user-avatar {
        flex-direction: row;
        justify-content: flex-start;
        text-overflow: ellipsis;
        white-space: nowrap;
        // background-image: url(/static/images/userImgBg.png);
        // background-size: cover;
        margin-top: 2rem;
        position: relative;
        // background-repeat: no-repeat;
        height: 16rem;
        .user-avatar-icon {
          width: 6rem;
          height: 6rem;
          display: block;
          margin: 0 auto;
          position: absolute;
          left: 7%;
          top:2.5rem;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 0;
            margin-top: -61%;
            box-shadow: 0 0 5px #e44f78;
          }
        }
        .go-pay{
          position: absolute;
          top:1rem;
          right:5%;
          background-color: #FFD35E;
          color: #84691B;
          height:1.5rem;
          line-height:1.5rem;
          padding: 0 0.6rem;
          border-radius: 1.5rem;
        }
        .user-name-text {
          text-align: left;
          position: absolute;
          top:1rem;
          left:38%;
          font-weight: bold;
          color: black;
          font-size: 1.3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .user-id-text {
            font-size: 1.2rem;
            font-weight: 400;
            color: #CBCBCB;
          }
        }
      }

      .user-operation-list {
        margin: 0rem 0 3rem 0;
        text-align: center;

        .user-list-area {
          width: 100%;

          .user-list-item {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            text-align: left;
            width: 100%;
            box-sizing: border-box;
            height: 3rem;
            line-height: 3rem;
            margin: 0.6rem 0;
            position: relative;
            border-bottom:1px solid #dedede;
            .user-item-icon {
              background-image: url('/static/images/user-icon-list.png');
              background-repeat: no-repeat;
              width: 2rem;
              height: 2rem;
              margin-top: 5px;
              background-size: 24rem 9rem;
            }
            img{
              display: block;
              width: 1.5rem;
              height: 1.5rem;
              margin-top:0.6rem;
            }
            .user-item-cash::before {
              content: "";
              background-position: -11.2rem 0;
            }
             .user-item-rangklinglist::before{
               content: "";
               position: absolute ;
                background-image: url(/static/images/user/rankinglist.png) !important;
                background-repeat: no-repeat;
                width: 2rem;
                height: 2rem;
                left: 0;
                top: 0.4rem;
                background-size: 80% !important;
                background-position:center !important;

             }
             .user-item-shop::before{
               content: "";
               position: absolute ;
               background-image: url(/static/images/user/shop.png) !important;
               background-repeat: no-repeat;
               width: 2rem;
               height: 2rem;
               left: 0;
               top: 0.4rem;
               background-size: 80% !important;
               background-position:center !important;

             }
             .user-item-turntable::before{
               content: "";
               position: absolute ;
               background-image: url(/static/images/user/turntable.png) !important;
               background-repeat: no-repeat;
               width: 2rem;
               height: 2rem;
               left: 0;
               top: 0.4rem;
               background-size: 80% !important;
               background-position:center !important;

             }
             .user-item-invuser::before{
               content: "";
               position: absolute ;
               background-image: url(/static/images/user/inuser.png) !important;
               background-repeat: no-repeat;
               width: 2rem;
               height: 2rem;
               left: 0;
               top: 0.4rem;
               background-size: 80% !important;
               background-position:center !important;

             }
             .user-item-usercash::before{
               content: "";
               position: absolute ;
               background-image: url(/static/images/user/usercash.png) !important;
               background-repeat: no-repeat;
               width: 2rem;
               height: 2rem;
               left: 0;
               top: 0.4rem;
               background-size: 80% !important;
               background-position:center !important;
             }
            .user-item-history::before {
              content: "";
              background-position: -4.7rem -0.1rem;
            }

            .user-item-order::before {
              content: "";
              background-position: -6.8rem 0;
            }

            .user-item-message::before {
              content: "";
              background-position: -9rem 0;
              position: relative;
            }

            .badge::after {
              position: absolute;
              content: "";
              left: 1.5rem;
              top: 0.4rem;
              background-color: #F2453D;
              width: 6px;
              height: 6px;
              border-radius: 50%;
            }

            .user-item-award::before {
              content: "";
              background-position: -2.5rem -0.1rem;
            }

            .user-item-invitcode::before {
              content: "";
              background-position: -0.7rem -0.1rem;
            }

            .user-item-income::before {
              content: "";
              background-position: -15.6rem 0;
            }

            .user-item-share::before {
              content: "";
              background-position: -9.8rem 0;
            }

            .user-item-partner::before {
              content: "";
              background-position: -13.4rem -0.1rem;
            }

            .user-item-text {
              flex: 1;
              padding-left: 1rem;
              font-size: 1.3rem;
              position: relative;
              padding-left: 3rem;
            }

            .user-item-text::before {
              content: "";
              position: absolute;
              background-image: url('/static/images/user-icon-list.png');
              background-repeat: no-repeat;
              width: 2rem;
              height: 2rem;
              left: 0;
              top: 0.4rem;
              background-size: 24rem 9rem;
            }
          }
        }
      }
    }

    // .user-section:not(:last-child)::after {
    //   content: "";
    //   position: absolute;
    //   height: 1rem;
    //   background-color: #F0F1F5;
    //   left: -4rem;
    //   right: -4rem;
    //   box-sizing: border-box;
    //   bottom: -2rem;
    // }

    .wechat-tip {
      text-align: center;
      margin: 1rem 0;
      big {
        color: #FB5837;
      }
    }
  }
  .userInfo-list .ji{
    width: 2.5rem !important;
  }
  .down-btn{
    width:90%;
    height:2.5rem;
    line-height: 2.5rem;
    border-radius:2rem;
    color:#ffffff;
    background-color: #F75D53;
  }
</style>
