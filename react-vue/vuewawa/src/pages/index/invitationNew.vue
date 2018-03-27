/** 邀请函 **/

<template>
  <div class="user-invitation">
    <div class="logo">
        <span class="first">在线抓娃娃  完美临场感</span>
        <span class="second">免费邮寄到家</span>
        <span class="third">抓不中  我们就送</span>
        <img src="/static/images/inv.png" alt="" class="inv">
    </div>
    <!-- <div class="ee" @click="to">
      点击
    </div> -->
    <!-- 邀请码 -->
      <div class="invitcodeNum">
          <span class="title">邀请码</span>
          <span class="num">{{invitcode}}</span>
          <p class="sumTile">下载APP并填写此邀请码</p>
          <!--二维码-->
          <qr-code :text="qsc"  size="126" class="qrc"></qr-code>
          <p class="sumTile">长按识别二维码下载</p>
      </div>
    <!-- 按钮 -->
    <!-- <div class="user-button-area" v-on:click="download"></div> -->
  </div>
</template>

<script>
  import store from 'store'
  import VueQRCodeComponent from 'vue-qrcode-component'

  import {
    Indicator,
    Toast
  } from 'mint-ui';
  export default {
  data() {
      return {
        avatar: '', // 用户头像
        userName: '', // 用户名称
        invitcode: '',
        qsc:'',
        reward: this.GLOBAL.REWARD || 20
      }
    },
  mounted() {
    var that = this,
      userId = this.$route.params.userid || null
    if (userId) {
      this.fetch(userId)
    } else {
      Toast({
        message: "获取邀请码失败",
        position: 'bottom',
        duration: 3000
      })
    }
  },
  components: {
    'qr-code': VueQRCodeComponent
  },
  methods: {
    to:function(){
      this.$router.push('/rankinglist/1000024')
    },
    fetch: function(userId) {
      var that = this
      this.$ajax.post('user/getUserInfo', {
        userId: userId
      }).then(res => {
        if (res && res.data && res.data.resHead.code == 1) {
          that.invitcode = res.data.resBody.userInfo.inviteCode
          that.userName = res.data.resBody.userInfo.nickName
          //二维码
          that.qsc = that.GLOBAL.MAIN_URL+'/home/'+res.data.resBody.userInfo.inviteCode
          that.avatar = res.data.resBody.userInfo.headImg
        } else {
          console.log(res.data.resHead.msg)
          Toast({
            message: "获取邀请码失败",
            position: 'bottom',
            duration: 3000
          })
        }
      })
    },
    download: function() {
      if (this.GLOBAL.Android()) {
        window.location.href = this.GLOBAL.APP.Android
      } else if (this.GLOBAL.IOS()) {
        window.location.href = this.GLOBAL.APP.IOS
      }
    }
  }
  }
</script>

<style scoped lang="scss">
  img.inv{
    display: block;
    width: 20rem;
    position: absolute;
    top:-4rem;
    left:1.8rem;
    z-index: 9;
  }
  .logo{
    width: 23rem;
    height:10rem;
    position: absolute;
    left: 50%;
    margin-left: -11.5rem;
    margin-top:10rem;
    span{
      color: #ffffff;
      display: inline-block;
      padding:0.2rem 0.5rem;
      border-radius:0.5rem;
      position: absolute;
    }
    span.first{
      background-color:#df38e0;
      top:-6rem;
      left:0;
    }
    span.second{
      background-color:#a102db;
      top:1rem;
      left:-1rem;
    }
    span.third{
      background-color:#833ae3;
      top:-3rem;
      right:-1rem;
    }
  }
  .invitcodeNum{
    position: absolute;
    width: 23rem;
    bottom: 1rem;
    height: 22rem;
    left: 50%;
    padding:0.5rem 0;
    background-color: #ff1657;
    border-radius: 0.5rem;
    margin-left: -11.5rem;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 1px 6px 6px 0px #bd2244;
    .title{
      color: yellow;
      font-size: 2rem;
    }
    .num{
      width: 15rem;
      height: 3.5rem;
      line-height:3.5rem;
      font-size:2.4rem;
      display: block;
      color: #fb337c;
      background-color: #ffffff;
      margin:0.5rem auto;
      border-radius: 0.5rem;
    }
    .sumTile{
      color: #ffffff;
      font-size:1.1rem;
    }
    .qrc{
      background-color: #ffffff;
      width:9rem;
      height:9rem;
      display: block;
      margin:0.5rem auto;
    }
  }
  .user-invitation {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    z-index: 1;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-image: url('/static/images/invitcode.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;

    .user-info-content {
      width: 100%;
      z-index: 99;
      text-align: center;
      box-sizing: border-box;
      position: relative;
      padding: 2rem 0 0;
      .user-avatar {
        width: 5.5rem;
        height: 5.5rem;
        border-radius: 50%;
        margin: 0 auto;
        border: 0;
        outline: 0;
        background-color: white;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;

        .user-crown {
          position: absolute;
          right: -18px;
          top: -14px;
          img {
            width: 30px;
            height: 30px;
          }
        }
      }

      .user-text {
        font-weight: 600;
        color: #4c4242;
        font-size: 1.2rem;
        margin: 2px auto;
        max-width: 80vw;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }

    .user-invitcode-tip {
      text-align: center;
      color: #000;
      margin: 8px auto;
      font-size: 1rem;
      b {
        color: #E62219;
        font-weight: bold;
      }
    }


    .border-input {
      border-radius: 10px;
      margin-top: 0.5rem;

      .input-item {
        border-radius: 4px;
        width: 34px;
        height: 34px;
        line-height: 34px;
        background: white;
        color: #333;
      }

      .input-item:first-child {
        border-left: 2px solid #403e3e;
        border-top: 1px solid #7b7171;
        border-bottom: 1px solid #7b7171;
      }

      .input-item:nth-child(2) {
        border-left: 2px solid #716f6f;
        border-top: 1px solid #a29898;
        border-bottom: 1px solid #a29898;
      }

      .input-item:nth-child(3) {
        border-left: 2px solid #b3abab;
        border-top: 1px solid #c7b8b8;
        border-bottom: 1px solid #c7b8b8;
      }

      .input-item:nth-child(4) {
        border-right: 2px solid #b3abab;
        border-top: 1px solid #c7b8b8;
        border-bottom: 1px solid #c7b8b8;
      }

      .input-item:nth-child(5) {
        border-right: 2px solid #716f6f;
        border-top: 1px solid #a29898;
        border-bottom: 1px solid #a29898;
      }

      .input-item:last-child {
        border-right: 2px solid #403e3e;
        border-top: 1px solid #7b7171;
        border-bottom: 1px solid #7b7171;
      }
    }

    .user-invitation-logo {
      width: 98%;
      flex: 1;
      margin: -2rem auto 0;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      img {
        width: auto;
        max-width: 100%;
        height: 100%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .user-button-area {
      width: 100%;
      position: fixed;
      bottom: 1rem;
      height: 5rem;
      z-index: 999;
    }
  }
</style>
