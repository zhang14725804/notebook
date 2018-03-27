import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    position: 0, // 房间列表滚动位置
    roomList: null // 房间列表
  }
})
