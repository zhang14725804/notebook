<template>
  <div class="banner-header" ref="bh">
    <mt-swipe :auto="4000" :stopPropagation="true">
      <mt-swipe-item v-for="item in list" :key="item.bannerId" @click.native="jump(item.url)" :style="{backgroundImage:`url(${item.pictures})`}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  import store from 'store';
  import {
    Toast
  } from 'mint-ui';
  export default {
    name: 'swipe',
    props: ['type'],
    data() {
      return {
        list: [{
          bannerId: '',
          pictures: '/static/images/banner-icon-thumb.png',
          url: ''
        }]
      }
    },
    created() {},
    beforeMount() {},
    mounted() {
      this.$refs.bh.style.height = (document.body.clientWidth / 7 * 3.3) + 'px'
      this.fetch()
    },
    methods: {
      jump: function(url) {
        if (url && url != null && url != '') {
          window.location.href = url
        }
      },
      fetch(type) {
        var that = this
        this.$ajax.post('home/getBannerList', {}).then(res => {
          if (res && res.data) {
            if (res.data.resBody.bannerList.length > 0) {
              that.list = res.data.resBody.bannerList
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .banner-header {
    max-height: 200px;
    margin-top:2rem;
  }

  .mint-swipe {
    max-width: 100%;
    box-sizing: border-box;
    padding: 1rem 0.8rem;

    .mint-swipe-item {
      box-sizing: border-box;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      max-width: 100%;
      height: 100%;

      a,
      img {
        max-width: 100%;
        height: 100%;
        margin: 0 auto;
      }
    }
  }
</style>
