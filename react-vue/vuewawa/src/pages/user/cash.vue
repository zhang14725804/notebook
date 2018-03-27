/** 我的游戏币 **/

<template>
  <div class="user-cash">
    <!-- 我当前的游戏币 -->
    <div class="user-my-cash">
      <div class="cash-text-tip">
        <label> 我的娃娃币 </label>
      </div>
      <label class="cash-monery">{{cashMonery}}<b>枚</b></label>
      <div class="cash-text-tip cash-consumption">
        <router-link :to="{ name: 'consumption' }" tag="label">明细</router-link>
      </div>
    </div>
    <div class="vipTips">
      <div class="text">
        <span>充值金额 提升VIP等级</span>
        <span>什么是VIP等级?</span>
      </div>
    </div>
    <!-- 充值选项 -->
    <div class="cash-list-area">
      <span class="title">选择充值金额</span>
      <ul class="user-cash-list">
        <li v-for="(item,index) in list" :key="item.priceId" class="cash-item" v-on:click="checkItem(item.priceId, item.price)" :class="{'active':index+1== priceId}" >
          <div class="cash-monery-value">充￥{{item.price}}</div>
          <div class="cash-monery-tip">{{item.rewardExplain}}<span>{{item.ExplainNum}}</span></div>
          <div class="firstImg" v-if="item.first"></div>
          <!-- <img :src="('/static/images/cash/' + (first ? 'first' : 'second') + '/'+item.rewardNum + (priceId == item.priceId ? '_on' : '') +'.jpg')" alt=""> -->
        </li>
      </ul>
    </div>
    <!-- 充值按钮 -->
    <div class="user-cash-button">
      <span class="title">选择充值金额</span>
      <button class="wawa-button-danger button-size-normal cash-recharge" type="button" name="cash-ok" v-on:click="recharge">
        <!-- <img :src="wechat" alt=""> -->
        <label class="wechat">微信支付</label>
      </button>
      <div class="recharge-tip">
        <span class="recharge-tip-text"> 首充奖励，充越多送越多 </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    Indicator,
    Toast
  } from 'mint-ui';
  import store from 'store'
  export default {
    data() {
      return {
        isLoad: false,
        cashMonery: 0,
        priceId: 0,
        price: 0,
        first: false,
        list: [],
        // 首充价目表
        first_list: [{
          "priceId": 1,
          "iosProductId": null, //这个也没用？？
          "price": "10",
          "lqbNum": 100,
          "rewardNum": 10,
          "firstReward": 100,
          "rewardExplain": "获币100", //获得。。
          "ExplainNum":""
        }, {
          "priceId": 2,
          "iosProductId": null, //这个也没用？？
          "price": "30",
          "first":true,
          "lqbNum": 300,
          "rewardNum": 30,
          "firstReward": 300,
          "rewardExplain": "获币300", //获得。。
          "ExplainNum":"送300"
        }, {
          "priceId": 3,
          "iosProductId": null, //这个也没用？？
          "price": "50",
          "first":true,
          "lqbNum": 500,
          "rewardNum": 50,
          "firstReward": 500,
          "rewardExplain": "获币500", //获得。。
          "ExplainNum":"送500"
        }, {
          "priceId": 4,
          "iosProductId": null, //这个也没用？？
          "price": "100",
          "lqbNum": 1000,
          "first":true,
          "rewardNum": 100,
          "firstReward": 1000,
          "rewardExplain": "获币1000", //获得。。
          "ExplainNum":"送1000"
        }, {
          "priceId": 5,
          "iosProductId": null, //这个也没用？？
          "price": "200",
          "lqbNum": 2000,
          "rewardNum": 200,
          "firstReward": 2000,
          "rewardExplain": "获币2000", //获得。。
          "ExplainNum":"送400"
        }, {
          "priceId": 6,
          "iosProductId": null, //这个也没用？？
          "price": "500",
          "lqbNum": 5000,
          "rewardNum": 500,
          "firstReward": 5000,
          "rewardExplain": "获币5000", //获得。。
          "ExplainNum":"送1000"
        }],
        // 优惠充值价目表
        second_list: [{
          "priceId": 1,
          "iosProductId": null, //这个也没用？？
          "price": "10",  //充值（价格）
          "lqbNum": 100,  //这个也没用？？
          "rewardNum": 10,  //这个也没用？？
          "firstReward": 0,  //这个值没用？？
          "rewardExplain": "获币100", //获得。。
          "ExplainNum":""  //送。。

        }, {
          "priceId": 2,
          "iosProductId": null, //这个也没用？？
          "price": "30",
          "lqbNum": 300,
          "rewardNum": 30,
          "firstReward": 0,
          "rewardExplain": "获币300",
          "ExplainNum":"送30"

        }, {
          "priceId": 3,
          "iosProductId": null, //这个也没用？？
          "price": "50",
          "lqbNum": 500,
          "rewardNum": 50,
          "firstReward": 0,
          "rewardExplain": "获币500",
          "ExplainNum":"送65"

        }, {
          "priceId": 4,
          "iosProductId": null, //这个也没用？？
          "price": "100",
          "lqbNum": 1000,
          "rewardNum": 100,
          "firstReward": 0,
          "rewardExplain": "获币1000",
          "ExplainNum":"送150"

        }, {
          "priceId": 5,
          "iosProductId": null, //这个也没用？？
          "price": "200",
          "lqbNum": 2000,
          "rewardNum": 200,
          "firstReward": 0,
          "rewardExplain": "获币2000",
          "ExplainNum":"送400"

        }, {
          "priceId": 6,
          "iosProductId": null, //这个也没用？？
          "price": "500",
          "lqbNum": 5000,
          "rewardNum": 500,
          "firstReward": 0,
          "rewardExplain": "获币5000",
          "ExplainNum":"送1000"

        }]
      }
    },
    beforeRouteEnter(to, from, next) {
      next()
    },
    beforeRouteUpdate(to, from, next) {
      console.log(to)
    },
    mounted() {
      var that = this
      // 获取价目表 （放弃使用）
      // that.fetchPriceList()
      that.list = that.second_list
      // 获取当前用户是否是首充
      that.getFirstRecharge()
      // 获取当前游戏币余额
      that.fetchBalance()
    },
    methods: {
      // 选择充值金额
      checkItem: function(priceId, price) {
        this.priceId = priceId
        this.price = price
      },
      // 获取用户是否为首充
      getFirstRecharge: function() {
        var that = this,
          isFirst = store.get('isFirstRecharge') || null

        if (isFirst == undefined || isFirst == null) {
          Indicator.open({
            spinnerType: 'snake'
          })
          this.$ajax.post("recharge/isFirstRecharge", {}).then(res => {
            if (res && res.data) {
              Indicator.close()
              isFirst = res.data.resBody.isFirstRecharge == 1 ? true : false
              console.log(isFirst);

              if (isFirst) {
                store.set('isFirstRecharge', true)
                that.list = that.first_list
                that.first = true
              } else {
                store.set('isFirstRecharge', false)
                that.list = that.second_list
                that.first = false
              }
              that.priceId = that.list[0].priceId
              that.price = that.list[0].price
            }
          })
        } else {
          Indicator.close()
            if (isFirst == true) {
            that.list = that.first_list
            that.first = true
          } else {
            that.list = that.second_list
            that.first = false
          }
          that.priceId = that.list[0].priceId
          that.price = that.list[0].price
        }
      },
      // 获取用户的游戏币金额
      fetchBalance: function() {
        var that = this
        this.$ajax.post('user/getUserBalance', {}).then(res => {
          if (res && res.data) {
            that.cashMonery = res.data.resBody.balance
          }
        })
      },
      // 获取价目表
      fetchPriceList: function() {
        var that = this
        this.$ajax.post('recharge/getLqbPriceByPlatformType', {
          platformType: 0
        }).then(res => {
          if (res && res.data) {
            var result = res.data.resBody
            that.cashMonery = result.balance || 0
            if (result.lqbPriceList && result.lqbPriceList.length > 0) {
              that.list = result.lqbPriceList
              that.priceId = result.lqbPriceList[0].priceId
              that.price = result.lqbPriceList[0].price
            } else {
              Toast({
                message: '加载失败',
                position: 'bottom',
                duration: 500
              })
            }
          }
        })
      },
      //点击充值按钮 充值
      recharge: function() {
        // 获取签名，参数URL为JS安全认证配置且和当前访问的地址一致
        var that = this
        this.$ajax.post("user/account/getWechatShareSign", {
          url: encodeURIComponent(window.location.href.split("#")[0])
        }).then(res => {
          console.log(res)
          if (res.data.resHead.code === 1) {
            var options = res.data.resBody
            wx.config({
              debug: false,
              appId: options.appId, // 公众号的唯一标识
              timestamp: options.timestamp, // 生成签名的时间戳
              nonceStr: options.noncestr, // 生成签名的随机串
              signature: options.sign, // 签名
              jsApiList: ['checkJsApi', 'chooseWXPay']
            })
            
            wx.ready(function() {
              // 验证微信接口
              wx.checkJsApi({
                jsApiList: [
                  'getNetworkType',
                  'chooseWXPay'
                ],
                success: function(res) {}
              })

              // 支付请求接口
              that.$ajax.post('recharge/wechatPay', {
                priceId: that.priceId
              }).then(res => {
                if (res && res.data) {
                  if (res.data.resBody.success && res.data.resBody.success == 1) {
                    var result = res.data.resBody.wxSdkParams
                    console.log("result")
                    console.log(result)
                    wx.chooseWXPay({
                      timestamp: result.timeStamp,
                      nonceStr: result.nonceStr,
                      package: result.package,
                      signType: result.signType,
                      paySign: result.sign,
                      success: function(res) {
                        // 支付成功后的回调函数
                        Toast({
                          message: '充值成功',
                          iconClass: 'icon icon-success',
                          position: 'bottom',
                          duration: 1000
                        })
                        // 更新游戏币
                        that.fetchBalance()
                      },
                      fail: function(res) {
                        console.log("fail")
                        console.log(res)
                        Toast({
                          message: '充值失败',
                          iconClass: 'icon icon-success',
                          position: 'bottom',
                          duration: 1000
                        })
                      },
                      cancel: function() {
                        Toast({
                          message: ' 取消充值',
                          iconClass: 'icon icon-success',
                          position: 'bottom',
                          duration: 800
                        })
                      },
                      complete: function() {}
                    })
                  } else {
                    Indicator.close()
                    Toast({
                      message: '操作失败，请重试',
                      iconClass: 'icon icon-success',
                      duration: 800
                    })
                  }
                }
              })
            })
            wx.error(function(res) {
              console.log(res)
            })
          } else {
            console.log(res)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .wechat{
    padding-left: 1rem;
  }
  .wechat:before{
    content: "";
    position: absolute;
    width:1.7rem;
    height:1.7rem;
    left:30%;
    top:0.8rem;
    background-image: url(/static/images/cash/first/wechat.png);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .button-size-normal{
    width:95% !important;
    font-size: 1rem;
    height:4rem;
  }
  .wawa-button-danger{
    background-color: #ffffff;
    color: #dedede;
    box-shadow: none;
    border-radius:0.5rem;
    margin:0 auto;
    border:1px solid #dedede;
  }
  .cash-list-area .title,.user-cash-button .title{
    text-align: left;
    color: black;
    display: block;
    padding-top: 1rem;
    font-size:1.2rem;
    padding-left: 1rem;
    font-weight: bold;
    padding-bottom: 0.5rem;
  }
  .active{
    background-color: #fed74c;
  }
  .firstImg{
    width: 4rem;
  background-image: url(/static/images/cash/first/first.png);
  background-size: contain;
  height: 2rem;
  background-repeat: no-repeat;
  position: absolute;
  top:14%;
  right: 10%;

  }
  .vipTips{
    width: 100%;
    border-bottom: 1px solid #fef1c4;
    // background-image: url(/static/images/cash/first/bg.png);
    // background-size: cover;
    height: 4rem;
    background-repeat: no-repeat;
    .text{
      height: 4rem;
  padding: 0.5rem 12%;
  border: 1px solid #ffffff;
  margin: 0 auto;
  background-image: url(/static/images/cash/first/bg.png);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
      span{
        display: block;
        text-align: left;
        font-weight: bold;
        text-shadow: orange 0 1px 0;
        color: #ffffff;
      }
    }
  }
  .user-cash {
    // width: 95%;
    width: 100%;
    margin: 0 auto;

    .user-my-cash {
      padding: 2rem;
      position: relative;
      .cash-monery {
        color: #fed74c;
        font-size: 4rem;
        font-weight: bold;
        b{
          font-size:1rem;
          color: #999999;
        }
      }

      .cash-text-tip {
        font-size: 1.4rem;
      }

      .cash-consumption {
        margin: 1rem;
        font-size: 1.2rem;
        width: 4rem;
        color:#8E8F90;
        border: 1px solid #808080;
        text-align: center;
        position: absolute;
        top:0;
        right: 0;
        border-radius: 0.5rem;

      }

      .cash-consumption label {
        // position: relative;
        // margin-left: -12px;
      }

      // .cash-consumption label::after {
      //   content: " ";
      //   display: inline-block;
      //   height: 6px;
      //   width: 6px;
      //   border-width: 2px 2px 0 0;
      //   border-color: #c8c8cd;
      //   border-style: solid;
      //   -webkit-transform: matrix(.71, .71, -.71, .71, 0, 0);
      //   transform: matrix(.71, .71, -.71, .71, 0, 0);
      //   position: relative;
      //   top: -2px;
      //   position: absolute;
      //   top: 50%;
      //   margin-top: -4px;
      //   right: -12px;
      // }
    }

    .user-cash-list {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      .cash-item {
        padding: 0.8rem 0.4rem;
        border-radius: 10px;
        text-align: center;
        background-color: white;
        color: #292D35;
        margin: 5px 1%;
        position: relative;
        overflow: hidden;
        width:45%;
        flex-basis:45%;
        border:1px solid #dedede;
        box-sizing: border-box;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .cash-item.active {
        color: white;
        background-color: #fed74c;
        border:1px solid #fed74c;
        .cash-monery-value{
          color: #3b5264;
        }
      }

      .cash-monery-value {
        font-size: 1rem;
        // font-weight: 600;
        text-align:left;
        color: #99a3ac;
      }

      .cash-monery-tip {
        font-size: 10px;
        text-align: left;
        font-size: 1.2rem;
        color: #3b5264;
        span{
          color:#ff6766;
        }
      }
    }

    .user-cash-button {
      margin:1rem 0;
      padding: 1rem 0;

      .cash-recharge {
        padding: 0.4rem 1rem;
        color: black;
        font-size:1.4rem;
        font-weight: lighter;
        position: relative;
        .monery-tip {
          font-weight: normal;
          font-size: 1.2rem;
        }
      }
      .recharge-tip {
        width: 100%;
        margin: 1.5rem 0;
        height: 2rem;
        line-height: 2rem;
        color: #292D35;
        text-align: center;
        box-sizing: border-box;
        font-size: 1.2rem;
        .recharge-tip-text {
          position: relative;
        }
        .recharge-tip-text::before {
          content: "";
          position: absolute;
          left: -2rem;
          top: -0.5rem;
          width: 2rem;
          height: 2rem;
          background-image: url(/static/images/cash/first/icon.png);
          background-repeat: no-repeat;
          background-size: 26rem 10rem;
          background-size: cover;
/* background-position: -1rem -6.6rem; */
        }
      }
    }
  }
</style>
