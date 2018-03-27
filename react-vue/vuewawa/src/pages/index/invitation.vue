/** 邀请函 **/

<template>
  <div class="user-invitation">
    <!-- 用户头像 -->
    <div class="user-info-content">
      <div class="user-avatar" :style="{backgroundImage:`url(${avatar})`}">
        <div class="user-crown">
          <img src="/static/images/user-invitation-crown.png" alt="">
        </div>
      </div>
      <div class="user-text">
        <label>{{userName}}</label>
      </div>
    </div>
    <!-- 邀请码 -->
    <ul class="user-invitcode-input border-input">
      <li class="input-item" v-for="item in invitcode">{{item}}</li>
    </ul>
    <!-- 提示 -->
    <div class="user-invitcode-tip">
      <label>输入邀请码额外获赠<b>{{reward}}</b>币</label>
    </div>
    <!-- logo -->
    <div class="user-invitation-logo">
      <img src="/static/images/user-invitation-qrcode.png" alt="">
    </div>
    <!-- 按钮 -->
    <div class="user-button-area" v-on:click="download"></div>
  </div>
</template>

<script>
  import store from 'store'
  import {
    Indicator,
    Toast
  } from 'mint-ui';
  export default {
    data() {
      return {
        avatar: '', // 用户头像
        userName: '', // 用户名称
        invitcode: ['', '', '', '', '', ''],
        reward: this.GLOBAL.REWARD || 20
      }
    },
    mounted() {
      var that = this,
        userId = this.$route.params.userid || null
        console.log(this.$route.params.userid);
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
    methods: {
      fetch: function(userId) {
        var that = this
        this.$ajax.post('user/getUserInfo', {
          userId: userId
        }).then(res => {
          if (res && res.data && res.data.resHead.code == 1) {
            that.invitcode = res.data.resBody.userInfo.inviteCode.split('')
            that.userName = res.data.resBody.userInfo.nickName
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
    background-image: url('/static/images/user-invitation-background.png');
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
