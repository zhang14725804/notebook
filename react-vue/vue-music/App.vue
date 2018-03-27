<template>
  <div id="app">
    <m-header></m-header> 
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
// 为什么这里驼峰，html里面可以用中线
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'
export default {
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
</style>
