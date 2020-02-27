<template>
  <div class="share-cover" v-if="show" v-on:click="close">
    <div class="v-modal"></div>
    <img class="share-icon" src="/static/images/user-icon-share.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'ShareCover',
    data() {
      return {
        show: false
      }
    },
    created() {

    },
    mounted() {},
    methods: {
      open: function() {
        this.show = true
      },
      close: function() {
        this.show = false
      }
    }
  };
</script>

<style scoped lang="scss">
  .share-icon {
    width: 20rem;
    height: 20rem;
    position: fixed;
    top: 2rem;
    right: 2rem;
    z-index: 9999;
  }
</style>
