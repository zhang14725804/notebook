/** 无数据提示 **/

<template>
  <div  class="user-order-list-nothing">
    <div class="nothing-icon">
      <img src="/static/images/user-icon-order-nothing.png" alt="">
    </div>
    <div class="nothing-text">
      <!-- <label v-if="type=='order'">还没任何娃娃，快去抓取娃娃吧</label>
      <label v-else-if="type=='message'">没有消息数据</label>
      <label v-else-if="type=='address'">还没添加地址，快去添加新地址吧</label>
      <label v-else-if="type=='room'">暂无可玩的房间</label>
      <label v-else-if="type=='winuser'">暂无大神抓中，快去试试吧</label>
      <label v-else-if="type=='guest'">暂无抓取记录</label>
      <label v-else-if="type=='product'">暂无商品详情</label> -->
      <label v-html="message"></label>
    </div>
    <div class="button-area" v-if="message=='还没任何娃娃，快去抓取娃娃吧'">
      <button type="button" name="button" class="wawa-button-danger button-size-normal" v-on:click="toIndex">
        <label>前往抓取</label>
      </button>
    </div>
  </div>
</template>

<script>
  import store from 'store';
  export default {
    props: {
      message:{
        type:String,
        default:'暂无数据'
      }
    },
    data() {
      return {}
    },
    created() {},
    mounted() {},
    methods: {
      toIndex: function() {
        store.set("menu", "home")
        this.$router.replace({
          path: '/home'
        })
      }
    }
  };
</script>

<style scoped lang="scss">
  .user-order-list-nothing {
    width: 100%;
    box-sizing: border-box;
    padding: 3rem 0;
    .nothing-icon {
      width: 100%;
      box-sizing: border-box;
      img {
        min-width: 7.5rem;
        height: 12rem;
      }
    }
    .nothing-text {
      text-align: center;
      color: #DFDFE1;
      margin: 1rem;
    }
    .button-area {
      margin: 2rem 0;
    }
  }
</style>
