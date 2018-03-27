/** 邀请函 **/

<template>
  <div class="user-invitation">
    <div class="invitation-background-top"></div>
    <div class="invitation-background-right"></div>
    <div class="invitation-background-bottom"></div>
    <div class="invitation-background-left"></div>
    <!-- logo -->
    <div class="user-invitation-logo">
      <img src="/static/images/user-icon-invitation-logo.png" alt="">
    </div>
    <!-- 邀请码 -->
    <ul class="user-invitcode-input border-input invitcode-tip-padding">
      <li class="input-item" v-for="item in invitcode">{{item}}</li>
    </ul>
    <!-- 文案 -->
    <div class="user-invitcode-text">
      <img src="/static/images/user-icon-invitation-text.png" alt="">
    </div>
    <!-- 视频 -->
    <div id="videoView" class="invitcode-video">
      <!-- x5-video-player-fullscreen="true"
      <video id="videoInvit" style="object-fit: fill" class="video-code"
        autoplay loop controls width="100%" height="100%"
        x-webkit-airplay="true" preload="none" x5-video-player-type="h5"
        src="http://www.city-game.cn/video/images/play.mp4"></video> -->
    </div>
    <!-- 按钮 -->
    <div class="user-button-area" v-on:click="download">
      <img src="/static/images/user-icon-invitation-btn.png"></img>
    </div>
    <!-- 提示 -->
    <div class="user-invitcode-tip">
      <router-link :to="{name:'home'}" tag="label">点这里开启网页端体验</router-link>
    </div>
  </div>
</template>

<script>
  import {
    Toast
  } from 'mint-ui';
  export default {
    data() {
      return {
        videoView: null,
        width: 0,
        height: 0,
        invitcode: ['', '', '', '', '', '']
      }
    },
    mounted() {
      var that = this,
        userId = this.$route.params.userid || null

      that.initVideo()
      if (userId) {
        that.fetch(userId)
      } else {
        Toast({
          message: "获取邀请码失败",
          position: 'bottom',
          duration: 3000
        })
      }
    },
    methods: {
      initVideo: function() {
        var that = this
        that.videoView = new TcPlayer("videoView", {
          "mp4": "http://www.city-game.cn/video/images/play.mp4",
          "live": false,
          "autoplay": true,
          "x5_fullscreen": false,
          "x5_type": "h5",
          "x5_player": true,
          "x5_orientation": 1,
          "controls": "system",
          "systemFullscreen": false,
          listener: function(res) {
            if (res.type == "load") {
              that.width = that.videoView.width
              that.height = that.videoView.height
            }
            if (!that.GLOBAL.IOS()) {
              if (res.type == 'playing') {
                $(".vcp-player,#videoView").css({
                  "width": '100vw',
                  "height": '100vh',
                  "position": "absolute",
                  "top": 0,
                  "right": 0,
                  "bottom": 0,
                  "left": 0,
                  "z-index": 999
                })
                $("#videoView").find("video").css({
                  'width': '100%',
                  "height": '100%',
                  "position": "absolute",
                  "top": 0,
                  "right": 0,
                  "bottom": 0,
                  "left": 0,
                  "z-index": 999
                })
                that.videoView.x5_fullscreen = true
                that.videoView.systemFullscreen = true
              }
              if (res.type == "pause" || res.type == "ended") {
                $("#videoView").css({
                  "z-index": 2,
                  "position": "absolute",
                  "top": "32vh",
                  "bottom": "14vh",
                  "left": "18vw",
                  "right": "17vw",
                  "width": that.width,
                  "height": that.height
                })
                $(".vcp-player").css({
                  width: that.width,
                  height: that.height
                })
                $("#videoView").find("video").css({
                  'width': that.width,
                  "height": that.height,
                  "position": "",
                  "z-index": 1
                })
                that.videoView.x5_fullscreen = false
                that.videoView.systemFullscreen = false
              }
            }
          }
        })
        $("#videoView").find("video").css({
          'object-fit': 'fill'
        })
        that.videoView.play()
      },
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
            Toast({
              message: "获取邀请码失败",
              position: 'bottom',
              duration: 3000
            })
          }
        })
      },
      playerVideo: function() {
        var that = this
        that.videoView.play()
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
    z-index: 1;
    overflow: hidden;
    width: 100%;
    height: 100vh;

    .invitation-background-top {
      width: 100vw;
      height: 36vh;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      z-index: 4;
      background-image: url('/static/images/icon-invitation-top.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      max-width: 100%;
      overflow: hidden;
    }
    .invitation-background-left {
      width: 24.6vw;
      position: absolute;
      bottom: 15.9vh;
      left: 0;
      top: 35.6vh;
      z-index: 4;
      background-image: url('/static/images/icon-invitation-left.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      max-width: 100%;
      overflow: hidden;
    }
    .invitation-background-right {
      width: 25.4vw;
      position: absolute;
      right: 0;
      bottom: 15.9vh;
      top: 35.8vh;
      z-index: 4;
      background-image: url('/static/images/icon-invitation-right.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      max-width: 100%;
      overflow: hidden;
    }

    .invitation-background-bottom {
      width: 100vw;
      height: 16vh;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 4;
      background-image: url('/static/images/icon-invitation-bottom.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      max-width: 100%;
      overflow: hidden;
    }

    .user-invitation-logo {
      width: 70%;
      height: 16vh;
      margin: 1vh auto;
      z-index: 9;
      position: absolute;
      left: 50%;
      box-sizing: border-box;
      transform: translateX(-50%);
      box-sizing: border-box;
      img {
        max-width: 100%;
        height: 100%
      }
    }

    .border-input {
      padding: 0.5rem;
      max-width: 16.8rem;
      height: 8vh;
      position: absolute;
      z-index: 9;
      left: 50%;
      top: 22vh;
      box-sizing: border-box;
      transform: translateX(-50%);
      .input-item {
        background-color: #774158;
        border-radius: 2px;
      }
    }

    .user-invitcode-text {
      width: 70%;
      left: 50%;
      transform: translateX(-50%);
      top: 26vh;
      position: absolute;
      z-index: 9;
      img {
        width: auto;
        height: auto;
        max-width: 100%;
      }
    }

    .invitcode-video {
      z-index: 2;
      position: absolute;
      top: 32vh;
      bottom: 14vh;
      left: 18vw;
      right: 17vw;
      overflow: hidden;
    }

    .user-button-area {
      height: 6vh;
      position: absolute;
      bottom: 2rem;
      z-index: 9;
      left: 50%;
      transform: translateX(-50%);

      img {
        width: auto;
        height: 2.4rem;
      }
    }

    .user-invitcode-tip {
      height: 1vh;
      position: absolute;
      bottom: 2px;
      text-align: center;
      z-index: 9;
      left: 50%;
      transform: translateX(-50%);
      color: #CC8BA6;
      font-size: 10px;
    }
  }
</style>
