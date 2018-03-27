<template>
<div class="user-spread">
  <div class="user-spread-logo">
    <img class="user-spread-logo-img" src="/static/images/app-icon-logo.png" alt="">
    <div class="user-spread-tip" v-on:click="download">
      <img src="/static/images/app-icon-download.png" alt="">
    </div>
  </div>
  <div class="user-spread-wawa">
    <div class="user-spread-tip-footer">
      <img src="/static/images/wawa-icon-footer.png" alt="">
      <div>直播远程抓娃娃</div>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {},
    methods: {
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
  .user-spread {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #FDC22D;

    .user-spread-logo {
      width: 100%;
      margin: 0 auto;
      flex: 1;
      padding-top: 3rem;
      position: relative;

      .user-spread-logo-img {
        margin: 0 auto;
        height: auto;
        max-height: 26rem;
        max-width: 90%;
      }

      .user-spread-tip {
        width: 100%;
        box-sizing: border-box;
        padding: 2rem;
        font-size: 1rem;
        color: #333;
        text-align: center;
        font-weight: bold;
        img {
          max-height: 8rem;
          max-width: 96%;
        }
      }
    }

    .user-spread-wawa {
      height: 15rem;
      box-sizing: border-box;
      position: relative;

      .user-spread-tip-footer {
        padding: 1rem 0;
        box-sizing: border-box;
        font-size: 1rem;
        color: #eee;
        text-align: center;
        font-weight: bold;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        img {
          width: 6rem;
          max-height: 5rem;
        }
      }
    }
  }
</style>
