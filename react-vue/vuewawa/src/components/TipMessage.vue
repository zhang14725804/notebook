/** 抓中用户信息 - 消息弹窗 **/

<template>
  <div class="tip-message-view" v-bind:style="homeTipClass" v-bind:class="{'message-tip-fixed':this.type=='room'}">
    <!-- 抓中用户信息 -->
    <div class="win-user-message">
      <div class="message-tip" v-bind:class="{'show-block' : show}">{{messageText}}</div>
    </div>
    <div class="room-text" v-bind:class="{'show-block' : this.type=='index' && !show}">
      <label>一起来抓娃娃</label>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      type:{
        type:String,
        default:''
      },
      homeTipClass:{
        type:Object,
        default:null
      }
    },
    data() {
      return {
        winList: [],
        show: false,
        messageText: ''
      }
    },
    created() {},
    beforeMount() {},
    beforeRouteEnter() {},
    mounted() {
      var that = this;
      that.getWinUserInfo()
    },
    methods: {
      // 获取抓中记录
      getWinUserInfo: function() {
        var that = this
        that.$ajax.post("playRecord/getNewedPlayWinList", {}).then(res => {
          console.log(res);
          if (res && res.data) {
            that.winList = res.data.resBody.list
            that.showTip()
          }
        })
      },
      showTip: function() {
        var that = this,
          date = new Date(),
          hours = date.getHours(),
          howLong = 10000

        if (7 < hours < 21){
          howLong = 10000
        }else{ 
          howLong = 600000
        }

        setTimeout(function(){
          var index = Math.ceil(Math.random() * that.winList.length - 1)
          that.messageText = that.winList[index].text
          that.show = true
          setTimeout(function() {
            that.show = false
            that.showTip()
          }, 5000)
        }, howLong)
      }
    }
  }
</script>

<style scoped lang="scss">
  .tip-message-view {
    .win-user-message {
      margin:0 auto;
      top: 8px;
      max-width: 75%;
      .message-tip {
        text-align:center;
        max-width: 100%;
        padding: 0 10px;
        color: block;
        height: 26px;
        margin-left: 0px;
        line-height: 26px;
        font-size: 12px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        opacity: 0;
        transition: all 1s ease;
      }
      .show-block {
        opacity: 1;
        margin-left: 20px;
        transition: all 1.8s ease;
      }
    }
    .room-text {
      font-weight: bold;
      font-size: 1.2rem;
      opacity: 0;
      transition: all 1s ease;
    }

    .show-block {
      opacity: 1;
      margin-left: 15px;
      transition: all 1s ease;
    }
  }

  .message-tip-fixed {
    position: absolute;
    top: 48px;
    z-index: 9999;
    left: 50%;
    transform:translate(-50%);
    width: 80%;

    .win-user-message {
      .message-tip {
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
      }
      .show-block {
        margin-left: 10px;
      }
    }
  }
</style>
