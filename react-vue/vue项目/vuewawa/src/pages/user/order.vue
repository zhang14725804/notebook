/** 我的订单 **/

<template>
  <div class="user-order-view">
    <!--  用户地址 -->
    <div class="user-address">
      <router-link tag="div" :to="{ name: 'list' }" class="user-address-text">
        <div v-if="address!=-1" class="address">
          {{address.province}}{{address.city}}{{address.street}}
          <div class="address-info">
            <small>{{address.userName}}  {{address.phone}}</small>
          </div>
        </div>
        <label v-else>请先设置地址</label>
      </router-link>
      <div class="user-important-tip">
        <label>娃娃由商家统一发货，请填写有效地址</label>
      </div>
    </div>
    <!-- 类型切换 -->
    <div class="user-order-menu">
      <div class="user-order-menu-item" v-bind:class="{active:menu=='pending'}" v-on:click="checkMenu('pending')">
        <label>待发货</label>
      </div>
      <div class="user-order-menu-item" v-bind:class="{active:menu=='shipped'}" v-on:click="checkMenu('shipped')">
        <label>已发货</label>
      </div>
    </div>
    <!-- 订单列表 -->
    <div class="user-order">
    <!-- 待发货 -->
    <div v-show="menu=='pending'" class="user-order-list" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <mt-loadmore :topMethod="loadTop" :bottomMethod="loadBottom" :auto-fill="false" :bottom-all-loaded="pending.allLoaded" ref="loadmorePending">
        <ul v-if="pending.list.length>0" class="user-order-list">
          <li class="order-item" v-for="item in pending.list" :key="item.orderId">
            <div class="icon-avatar">
              <img :src="item.toyPicUrl" alt="">
            </div>
            <div class="wawa-info">
              <div class="wawa-name">
                <label>{{item.toyName}}</label>
              </div>
              <div class="wawa-count">
                <label>{{item.num}}个</label>
              </div>
            </div>
            <div class="wawa-state">
              <label>待发货</label>
            </div>
          </li>
          <div v-if="!pending.nextPage" class="data-tip-text">
              <label>没有更多数据了!</label>
          </div>
        </ul>
        <nothing-data v-else :type="'order'"></nothing-data>
      </mt-loadmore>
    </div>
    <!-- 已发货 -->
    <div v-show="menu=='shipped'" class="user-order-list" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <mt-loadmore :topMethod="loadTop" :bottomMethod="loadBottom" :auto-fill="false" :bottom-all-loaded="shipped.allLoaded" ref="loadmoreShipped">
        <ul v-if="shipped.list.length>0" class="user-order-list">
          <li class="order-item" v-for="item in shipped.list" :key="item.orderId">
            <div class="icon-avatar">
              <img :src="item.toyPicUrl" alt="">
            </div>
            <div class="wawa-info">
              <div class="wawa-name">{{item.toyName}}</div>
              <div class="wawa-count">{{item.num}}个</div>
            </div>
            <div class="wawa-state">
              <label>已发货</label>
            </div>
          </li>
          <div v-if="!shipped.nextPage" class="data-tip-text">
              <label>没有更多数据了!</label>
          </div>
        </ul>
        <nothing-data v-else :message="'还没任何娃娃，快去抓取娃娃吧'"></nothing-data>
      </mt-loadmore>
    </div>
  </div>
  </div>
</template>

<script>
  import store from 'store';
  import {
    Indicator,
    Toast,
    Loadmore
  } from 'mint-ui';
  import NothingData from "../../components/NothingData.vue";
  export default {
    components: {
      NothingData,
      'mt-loadmore': Loadmore
    },
    data() {
      return {
        address: {},
        scrollMode: 'auto',
        menu: 'pending',
        pending: {
          allLoaded: true, // false为可以上拉
          dataTotal: 0, // 总条数
          nextPage: false, // 是否还有下一页
          pageTotal: 0, // 总页码
          pageSize: 20, // 没次显示多少条
          pageNum: 0, // 当前页码
          list: []
        },
        shipped: {
          allLoaded: true, // false为可以上拉
          dataTotal: 0, // 总条数
          nextPage: false, // 是否还有下一页
          pageTotal: 0, // 总页码
          pageSize: 20, // 没次显示多少条
          pageNum: 0, // 当前页码
          list: []
        }
      }
    },
    mounted() {
      // 获取用户默认地址
      this.getDefaultAddress()
      this.loadTop()
    },
    activated() {},
    methods: {
      // 类型切换
      checkMenu: function(name) {
        var that = this
        this.menu = name
        if (name == 'pending') {
          that[name].pageNum = 0
          // 获取待发货订单
          this.getPendingList()
        } else if (name == 'shipped') {
          that[name].pageNum = 0
          // 获取已发货订单
          this.getShippedList()
        }
      },
      // 获取用户的默认地址
      getDefaultAddress: function() {
        var that = this
        this.$ajax.post('user/address/list', {}).then(res => {
          if (res && res.data) {
            if (res.data.resBody.addressList.length > 0) {
              that.address = res.data.resBody.addressList[0]
            } else {
              that.address = -1
            }
          }
        })
      },
      // 待发货
      getPendingList: function() {
        var that = this
        that.pending.pageNum = that.pending.pageNum + 1
        that.pending.allLoade = true
        this.$ajax.post('order/unsentProducts', {
          pageNum: that.pending.pageNum,
          pageSize: that.pending.pageSize
        }).then(res => {
          if (res && res.data) {
            that.pending.dataTotal = res.data.resBody.dataTotal
            that.pending.nextPage = res.data.resBody.nextPage
            that.pending.pageTotal = res.data.resBody.pageTotal
            that.pending.pageSize = res.data.resBody.pageSize
            that.pending.pendingList = res.data.resBody.pageData
            if (that.pending.pageNum == 1) {
              that.pending.list = res.data.resBody.pageData
            } else {
              that.pending.list = that.pending.list.concat(res.data.resBody.pageData)
            }

            // 返回是否还有数据，如果有数据返回true，但是组件需要为false时代表可以进行下一次拉取刷新
            that.pending.allLoaded = !res.data.resBody.nextPage
            that.scrollMode = "touch"
          }
        })
      },
      // 已发货
      getShippedList: function() {
        var that = this
        that.shipped.pageNum = that.shipped.pageNum + 1
        that.shipped.allLoade = true
        this.$ajax.post('order/sentedProducts', {
          pageNum: that.shipped.pageNum,
          pageSize: that.shipped.pageSize
        }).then(res => {
          if (res && res.data) {
            that.shipped.dataTotal = res.data.resBody.dataTotal
            that.shipped.nextPage = res.data.resBody.nextPage
            that.shipped.pageTotal = res.data.resBody.pageTotal
            that.shipped.pageSize = res.data.resBody.pageSize
            that.shipped.pendingList = res.data.resBody.pageData
            if (that.shipped.pageNum == 1) {
              that.shipped.list = res.data.resBody.pageData
            } else {
              that.shipped.list = that.shipped.list.concat(res.data.resBody.pageData)
            }

            // 返回是否还有数据，如果有数据返回true，但是组件需要为false时代表可以进行下一次拉取刷新
            that.shipped.allLoaded = !res.data.resBody.nextPage
            that.scrollMode = "touch"
          }
        })
      },
      // 下拉加载
      loadTop: function() {
        var that = this
        if (that.menu == 'pending') {
          that.pending.nextPage = false
          that.pending.pageNum = 0
          this.getPendingList()
          this.$refs.loadmorePending.onTopLoaded()
        } else {
          that.shipped.nextPage = false
          that.shipped.pageNum = 0
          this.getShippedList()
          this.$refs.loadmoreShipped.onTopLoaded()
        }
      },
      // 上拉加载
      loadBottom: function() {
        var that = this
        if (that.menu == 'pending') {
          this.getPendingList()
          this.$refs.loadmorePending.onBottomLoaded()
        } else {
          this.getShippedList()
          this.$refs.loadmoreShipped.onBottomLoaded()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .user-address-text {
    text-align: left;
    font-size: 1.2rem;
    margin-top: 1rem;
    padding: 1rem 2rem 1rem 3rem;
    min-height: 3rem;
    background-color: #F0F1F5;
    color: #d4d0d0;
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-address-text::before {
    content: "";
    position: absolute;
    left: 0.5rem;
    top: 50%;
    background-image: url('/static/images/user-icon-list.png');
    background-repeat: no-repeat;
    background-position: -4rem -3.2rem;
    background-size: 26rem 10rem;
    width: 2.4rem;
    height: 2.8rem;
    transform: translateY(-50%);
  }

  .user-address-text::after {
    content: "";
    display: inline-block;
    height: 10px;
    width: 10px;
    border-width: 2px 2px 0 0;
    border-color: #a9a9a9;
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

  .address {
    color: #333;
    padding: 0 1rem;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
  }
  /** 类别按钮  **/

  .user-order-menu {
    width: 80%;
    box-sizing: border-box;
    margin: 0 auto 2rem auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px solid #CD2927;
    border-radius: 10px;
    color: #333;
    background-color: white;
    font-size: 1.2rem;
    font-weight: bold;
    .user-order-menu-item {
      width: 40%;
      flex: 1;
      height: 3rem;
      line-height: 3rem;
    }
    .user-order-menu-item:first-child.active {
      background-color: #CD2927;
      color: white;
      border-radius: 8px 0 0 8px;
    }
    .user-order-menu-item:last-child.active {
      background-color: #CD2927;
      color: white;
      border-radius: 0 8px 8px 0;
    }
  }

  .user-order {
    position: relative;
    height: 100%;
  }

  .user-order-list {
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
  }
  /** 我的订单**/

  .order-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    background: white;
    border: 1px solid #F4F5F7;
    border-radius: 10px;
    padding: 1rem 0.5rem;
    margin: 1rem 0.5rem;
    .icon-avatar {
      width: 50px;
      img {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        margin-top: -3px;
      }
    }

    .wawa-info {
      -webkit-flex: 1;
      -moz-flex: 1;
      -ms-flex: 1;
      -o-flex: 1;
      flex: 1;
      text-align: left;
      padding-left: 10px;
      overflow: hidden;
      .wawa-name {
        font-size: 1.2rem;
        color: #444;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .wawa-count {
        font-size: 1.2rem;
        color: #FA5838;
      }
    }

    .wawa-state {
      width: 6rem;
      line-height: 3.5rem;
      font-size: 1.2rem;
      color: #444;
      font-weight: bold;
    }
  }
</style>
