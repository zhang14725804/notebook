/** 消费记录 **/

<template>
  <div class="user-consumption" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <mt-loadmore :topMethod="loadTop" :bottomMethod="loadBottom" :auto-fill="false" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul v-if="list.length>0" class="user-consumption-list">
        <li class="consumption-item" v-for="item in list" :key="item.currentId">
          <div class="consumption-info">
            <div class="consumption-name">{{item.currentTypeName}}</div>
            <div class="consumption-text">{{item.details}}</div>
            <div class="consumption-time">{{item.createTime}}</div>
          </div>
          <div class="consumption-state" v-bind:class="{success : item.expendOrIncome == '1'}">
            <label>{{item.expendOrIncome == '1' ? '+' : ''}}{{item.lqbAmount}}</label>
          </div>
        </li>
        <div v-if="!nextPage" class="data-tip-text">
          <label>没有更多数据了!</label>
        </div>
      </ul>
      <nothing-data v-else></nothing-data>
    </mt-loadmore>
  </div>
</template>

<script>
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
        allLoaded: true, // false为可以上拉
        scrollMode: 'auto',
        pageNum: 0,
        pageSize: 10,
        dataTotal: 0, // 总条数
        nextPage: false, // 是否还有下一页
        pageTotal: 0, // 总页码
        list: []
      }
    },
    filters: {
      consumptionType: function(value) {
        // 0:游戏消费(-);1:微信充值(+);2:充值奖励(+);3:首充奖励(+);
        // 4:活动奖励(+);5:虚拟充值;6:支付宝充值(+);7:苹果充值(+);8:邀请奖励(+)
        var consumptionText = ''
        console.log(value);
        switch (value) {
          case 0:
            consumptionText = '游戏消费'
            break;
          case 1:
            consumptionText = '微信充值'
            break;
          case 2:
            consumptionText = '充值奖励'
            break;
          case 3:
            consumptionText = '首充奖励'
            break;
          case 4:
            consumptionText = '活动奖励'
            break;
          case 5:
            consumptionText = '虚拟充值'
            break;
          case 6:
            consumptionText = '支付宝充值'
            break;
          case 7:
            consumptionText = '苹果充值'
            break;
          case 8:
            consumptionText = '邀请奖励'
            break;
          case 11:
            consumptionText = '商品兑换游戏币'
            break;
          default:
            consumptionText = '其它'
            break;
        }
        return consumptionText
      }
    },
    mounted() {
      Indicator.open({
        spinnerType: 'snake'
      })
      this.getCoinRecords()
    },
    activated() {},
    methods: {
      // 获取用户消费记录
      getCoinRecords: function() {
        var that = this
        that.pageNum = parseInt(that.pageNum + 1)
        this.allLoaded = true
        this.$ajax.post('user/getCoinRecords', {
          pageNum: that.pageNum,
          pageSize: that.pageSize
        }).then(res => {
          if (res && res.data) {
            Indicator.close()
            that.dataTotal = res.data.resBody.dataTotal
            that.nextPage = res.data.resBody.nextPage
            that.pageTotal = res.data.resBody.pageTotal
            that.pageSize = res.data.resBody.pageSize
            if (that.pageNum == 1) {
              that.list = res.data.resBody.pageData
            } else {
              that.list = that.list.concat(res.data.resBody.pageData)
            }
            // 返回是否还有数据，如果有数据返回true，但是组件需要为false时代表可以进行下一次拉取刷新
            that.allLoaded = !res.data.resBody.nextPage
            that.scrollMode = "touch"
          }
        })
      },
      // 下拉加载
      loadTop: function() {
        var that = this
        that.dataTotal = 0
        that.nextPage = false
        that.pageTotal = 0
        that.pageNum = 0
        this.getCoinRecords()
        this.$refs.loadmore.onTopLoaded()
      },
      // 上拉加载
      loadBottom: function() {
        this.getCoinRecords()
        this.$refs.loadmore.onBottomLoaded()
      }
    }
  }
</script>

<style scoped lang="scss">
  .user-consumption {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f9f9f9;
    overflow-x: hidden;
    overflow-y: auto;

    .user-consumption-list {
      position: relative;
      min-height: 100vh;
      overflow-x: hidden;
      overflow-y: auto;

      .consumption-item {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        background: white;
        border: 1px solid #e6e6e6;
        border-radius: 10px;
        padding: 1rem 0.5rem;
        margin: 1rem 0.5rem;
      }

      .consumption-info {
        -webkit-flex: 1;
        -moz-flex: 1;
        -ms-flex: 1;
        -o-flex: 1;
        flex: 1;
        text-align: left;
        padding-left: 5px;
        overflow: hidden;

        .consumption-name {
          font-size: 1.2rem;
          color: #333;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .consumption-text {
          font-size: 1rem;
          color: #444;
        }

        .consumption-time {
          font-size: 12px;
          color: #666;
        }
      }

      .consumption-state {
        width: 6rem;
        line-height: 4rem;
        font-size: 1.2rem;
        text-align: right;
        padding-right: 10px;
        font-weight: bold;
      }

      .success {
        color: #FA5838;
      }
    }
  }
</style>
