/** 直播间内的附加信息展示 **/

<template>
  <div class="view-room-additional">
    <!-- 最近抓中的大神 -->
    <div class="view-room-user" id="user-of-lucky" v-if="list && list.length>0">
      <div class="title-tip"><label>最近抓中的大神</label></div>
      <router-link :to="{ name: 'winuser', params:{id: id} }" tag="ul" class="view-room-user-list">
        <router-link :to="{ name: 'guest', params:{gid: id, uid: item.user && item.user.userId} }" tag="li" v-for="item in list" :key="item.playId">
          <div class="user-avatar">
            <img v-bind:src="item.user && item.user.headImg" alt="">
          </div>
          <div class="user-name">
            <label>{{item.user && item.user.nickName}}</label>
          </div>
          <div class="user-time-desc">
            <label>{{item.recordTimeDesc}}</label>
          </div>
        </router-link>
      </router-link>
    </div>
    <!-- 房间列表 -->
    <div class="view-room-list" id="wawa-xiagnqing">
      <div class="menu-nav">
        <ul class="menu-tab">
          <li class="menu-item" v-bind:class="{'active' : menu == 'detail'}" v-on:click="switchMenu('detail')">商品详情</li>
          <li class="menu-item" v-bind:class="{'active' : menu == 'list'}" v-on:click="switchMenu('list')">更多娃娃机</li>
        </ul>
      </div>
      <div class="additional-content">
        <div class="wawa-detail" v-show="menu=='detail'">
          <div v-if="product.length > 0">
            <img v-for="(item, index) in product" :src="item" alt="">
          </div>
          <nothing-data v-else :message="'暂无商品详情'"></nothing-data>
        </div>
        <div class="wawa-list" v-show="menu=='list'">
          <room-list :type="'room'"></room-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from 'store'
  import RoomList from "../../components/RoomList"
  import NothingData from "../../components/NothingData.vue";
  export default {
    name: 'additional',
    props: ['id'],
    components: {
      RoomList,
      NothingData
    },
    data() {
      return {
        menu: 'detail',
        list: [],
        product: []
      }
    },
    mounted() {
      var that = this
      // 获取当前房间抓中的大神
      that.getPlayRecordList()
      // 获取商品详情
      that.getProductDetail()
    },
    methods: {
      switchMenu: function(val) {
        var that = this
        that.menu = val
      },
      // 当前房间抓到的用户
      getPlayRecordList: function() {
        var that = this,
          user = store.get('user') || null

        this.$ajax.post('playRecord/getPlayRecordList', {
          pageNum: 1,
          pageSize: 5,
          groupId: this.id,
          result: 1
        }).then(res => {
          if (res && res.data) {
            that.list = res.data.resBody.pageData
          }
        })
      },

      // 获取商品详情
      getProductDetail: function() {
        var that = this,
          list = store.get('roomlist') || [],
          room = list.find((x) => {
            return x.groupId === that.id
          }) || {}

        that.product = room.product.detailPics
      },
      scroll(itemId){
        let jump = document.querySelectorAll('#'+itemId)
        // 获取需要滚动的距离
        let total = jump[0].offsetTop
        // Chrome
        document.body.scrollTop = total
        // Firefox
        document.documentElement.scrollTop = total
        // Safari
        window.pageYOffset = total
      }
    }
  }
</script>

<style scoped lang="scss">
  .title-tip {
    margin: -1px 0 0 0;
    padding: 0.5rem 0;
    background-color: #FDC22D;
    color: #333;
    height: 40px;
    position: relative;
    text-align: center;
    width: 100%;

    label {
      z-index: 1;
      position: absolute;
      padding: 5px 8px;
      top: 50%;
      left: 50%;
      font-size: 1rem;
      transform: translate(-50%, -50%);
      background-color: #FDC22D;
    }
  }

  .title-tip::before {
    content: '';
    width: 80%;
    height: 1px;
    position: absolute;
    left: 10%;
    top: 50%;
    z-index: 0;
    transform: translateY(-50%);
    background-color: #a7a2a2;
  }

  .view-room-user-list {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin: 1rem;
    padding-right: 30px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    position: relative;
    margin-bottom: 2rem;
    li {
      /* flex: 1; */
      width: 20%;
      text-align: center;
      overflow: hidden;
      margin-right: 10px;
      .user-avatar,
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0 auto;
        background-color: #eee;
      }
      .user-name {
        font-size: 12px;
        position: relative;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        overflow: hidden;
      }
      .user-time-desc {
        font-size: 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    li:last-child {
      margin: 0;
    }
  }

  .view-room-user-list::after {
    content: "";
    display: inline-block;
    height: 10px;
    width: 10px;
    border-width: 2px 2px 0 0;
    border-color: #EEE;
    border-style: solid;
    -webkit-transform: matrix(.71, .71, -.71, .71, 0, 0);
    transform: matrix(.71, .71, -.71, .71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -5px;
    right: 0.8rem;
  }

  .view-room-list {
    background-color: white;
    width: 94%;
    margin: 1rem auto;
    border-radius: 10px;

    .menu-tab {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      border-bottom: 1px solid #efefef;

      .menu-item {
        flex: 1;
        padding: 1rem;
        flex-basis: 50%;
        color: #333;
        font-size: 1.2rem;
        position: relative;
      }

      .menu-item.active::after {
        content: "";
        width: 60%;
        height: 2px;
        background-color: #FDC22D;
        position: absolute;
        bottom: 0;
        left: 20%;
      }
    }

    .additional-content {
      padding: 1rem 0;

      .wawa-detail {
        overflow: hidden;
        position: relative;
        img {
          width: 96%;
          height: auto;
          margin: -2px auto;
        }
      }
    }
  }
</style>
