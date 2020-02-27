/** 邀请函 **/

<template>
  <div class="user-invitation">
    <div class="invitation-content">
      <!-- 用户头像 -->
      <div class="user-info-content">
        <div class="user-avatar" :style="{backgroundImage:`url(${avatar})`}"></div>
        <div class="user-text">
          <label>{{userName}}</label>
        </div>
      </div>
      <!-- logo -->
      <div class="user-invitation-logo">
        <img src="/static/images/wawa-icon-logo.png" alt="">
      </div>
      <!-- 邀请码 -->
      <ul class="user-invitcode-input border-input invitcode-tip-padding">
        <li class="input-item" v-for="item in invitcode">{{item}}</li>
      </ul>
      <!-- 提示 -->
      <div class="user-invitcode-tip">
        <label>输入邀请码额外获赠<b>{{reward}}</b>币</label>
      </div>
      <!-- 按钮 -->
      <div class="user-button-area">
        <button type="button" name="button" class="wawa-button-default button-size-normal">
          <div v-on:click="download">立即开启在线抓娃娃之旅</div>
        </button>
      </div>
      <!-- 提示 -->
      <div class="user-invitcode-tip">
        <router-link :to="{name:'home'}" tag="label"><b>点这里开启网页端体验</b></router-link>
      </div>
    </div>
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
    background-color: #CC2927;

    .invitation-content {
      position: relative;
      height: 100vh;
      z-index: 1;
      background-repeat: no-repeat;
      background-size: 100% 100%;

      .user-info-content {
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 99;
        text-align: center;
        box-sizing: border-box;
        .user-avatar {
          width: 5.5rem;
          height: 5.5rem;
          border-radius: 50%;
          margin: 0 auto;
          border: 0;
          outline: 0;
          background-color: #000;
          background-size: cover;
          background-repeat: no-repeat;
        }

        .user-text {
          font-weight: 600;
          color: #000;
          font-size: 1.4rem;
          width: 130px;
          margin: 2px auto;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }

      .user-invitation-logo {
        width: 100%;
        height: auto;
        margin-top: 2rem;
        margin-left: -1.15rem;
        z-index: 1;
        box-sizing: border-box;
        transform: scale(1.2);
        img {
          max-width: 100%;
          height: auto;
          max-height: 26rem;
        }
      }
      .user-invitcode-tip {
        text-align: center;
        color: black;
        font-size: 1.2rem;
      }

      .border-input {
        padding: 0.5rem;
        border-radius: 10px;
        max-width: 16.8rem;
        margin-top: 1rem;
      }
    }
  }
</style>
