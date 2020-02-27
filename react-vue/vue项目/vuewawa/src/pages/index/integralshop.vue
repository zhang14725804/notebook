/** 积分商城 **/

<template>
  <div class="integralshop">
    <div class="header">
      <img :src="('../static/images/integralshop/top.png')" alt="">
      <div class="integral_count"><img height="100%" :src="('../static/images/integralshop/shop_logo.png')" alt=""><span>当前积分{{totalScore}}</span></div>
    </div>
    <div class="product-title"><span>兑换区</span></div>
    <div class="product">
      <ul>
        <li v-for="(item,index) in ProductList"  v-on:click="checkProduct(item.id,index)">
          <img :src="('../static/images/integralshop/product'+(changeRed == index?'1':'2')+'.png')" alt="" class="bg">
          <div class="icon">
            <img :src="('../static/images/integralshop/last'+(changeRed == index?'1':'2')+'.png')" alt="">
            <span>剩余{{item.stock}}</span>
          </div>
          <img :src="item.product.toyPicUrl" class="productImg" alt="">
          <div class="info">
              <div class="nameInfo">
                <span class="name">{{item.product.toyName}}</span><span :class="changeRed == index?'text':''">{{item.exchangeScore}}积分</span>
              </div>
          </div>
        </li>
        <div class="noproduct" v-show="noproduct">
          暂无可兑换商品
        </div>
      </ul>
    </div>
    <div class="sumbit" @click="sumbit()">
        <img :src="('../static/images/integralshop/sumbit.png')" alt="">
    </div>

  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import store from 'store'

  export default {
    data() {
      return {
        ProductList:[],
        //active:false,
        checkId:'1',
        changeRed:0,
        totalScore:'',
        userId:'',
        noproduct:false,
      }
    },
    created(){
      var that = this;
      this.$ajax.post("user/getMyUserInfo", {}).then(res => {
        console.log('res',res);
        if (res && res.data) {
          if (res.data.resBody.success == 1) {
            that.totalScore = res.data.resBody.userInfo.totalScore;
          }
        }
      })
      this.shopInit();
    },
    mounted(){
      var that = this;
      var userEntity = store.get('user') || null;
      console.log(userEntity);
      if(this.$route.params.userid ){
        that.userId = this.$route.params.userid
      }else{
        that.userId = userEntity.userId
      }
      this.shopInit();

    },
    methods:{
      shopInit:function(){
        var that = this;
        that.$ajax.Opost('scoreShop/getProductList',{userId:that.userId}).then(res => {
          console.log(res);
          if (res && res.data) {
            if (res.data.resBody.dataTotal > 0) {
                that.ProductList = res.data.resBody.pageData
                console.log(that.ProductList)
            }else{
                that.noproduct = true;
            }
          }
        })
      },
      //选择商品
      checkProduct:function(id,index){
        if(this.changeRed === index){
          return;
        }
        this.checkId = id;
        this.changeRed = index;
        // if(this.active){
        //   this.checkId = id;
        // }else{
        //   this.checkId = '';
        // }
        // this.changeRed = index;
      },
      //兑换商品
      sumbit:function(){
        var that = this;
        that.$ajax.Opost('scoreShop/exchangeProduct',{id:this.checkId}).then(res => {
          console.log("this.checkId"+this.checkId)
          console.log(res);
          if (res && res.data) {
            if (res.data.resBody.success ==  0) {
              Toast({
                message: res.data.resBody.alertMsg,
                duration: 3000
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
html,body{
  height: 100%
}
.header{
  position: fixed;
  width: 100%;
  height: 6rem;
  display: block;
  top: -2rem;
  z-index: 9;
}
.header > img{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height:100%;
}
.integral_count{
  position: absolute;
  top: 50%;
  left:1rem;
  height:1rem;
  text-align: top;
  line-height: 1rem;
  color: #ffffff;
}
.product-title{
  margin-top: 6rem;
  background-color: #ffffff;
  height: 3rem;
  line-height: 3rem;
  text-align: left;
  padding-left: 1.5rem;
}
.product-title span{
  padding-left: 0.5rem;
  border-left: 3px solid #F72C57;
  color: #838383;
}
.sumbit{
    width: 100%;
    background-color:#F75D53;
    position: fixed;
    bottom: 0;
    z-index: 9999;
}
.sumbit img{
  width:10rem;
  margin-top: 1rem;
}
.info{
  padding: 0 0.5rem;
}
.info .wawamoney{
  text-align: left;
}

.nameInfo{
  overflow: hidden;
  padding-top: 0.1rem;
}
.nameInfo span,.nameInfo img{
  display:block;
  // float:left;
  font-size:1rem;
}
.nameInfo span{
  // height: 3rem;
  // line-height: 3rem;
  color: #ffffff;
  text-align: left;
}
.nameInfo span.num{
  background-color:#982834;
  height: 1rem;
  color: #ffffff;
  line-height: 1rem;
  margin-top: 0.5rem;
  font-size:10px;
  width:1.4rem;
  margin-left: 0.3rem;
  border-radius: 0.5rem;
}
.nameInfo img{
  width:1.2rem;
  margin-top: 0.5rem;
  margin-left: 0.2rem;
}
.product{
  overflow: hidden;
  padding-bottom: 10rem;
  // padding-bottom: 3rem;
  background-color: #ffffed;
}
.product ul {
  display: block;
}
.product ul li{
  display: block;
  width:45%;
  background-color:#ffffff;
  height:14.7rem;
  float: left;
  margin-left:3%;
  margin-top: 0.3rem;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
}
.product ul li img.productImg{
  width:100%;
  height:80%;
  display: block;
  position: absolute;
}
.product ul li img.bg{
  display: block;
  position: absolute;
  top:0;
  width: 100%;
  height: 100%;
}
.product ul li div.icon{
  position: absolute;
  top: 0;
  right: -0.2rem;
  width: 5rem;
  height: 1.5rem;
  color: #ffffff;
  z-index:8;
}
.product ul li div.icon img{
    width: 100%;
    display: block;
}
.product ul li div.icon span{
  position: absolute;
  top:0;
  color: #ffffff;
  left:1rem;
}
.product ul li .info{
  position: absolute;
  width: 100%;
  left:0;
  bottom:0;
  height: 3rem;
}
.integralshop{
  background-color: #ffffed;
  width: 100%;
  height:41rem;
  margin-top: -2rem;
}
.noproduct{
  padding-top: 2rem;
  font-size: 2rem;
}
.text{
  color: #ffffff !important;
}
.nameInfo span:first-child{
  // width: 3.5rem;
  // overflow: hidden;
  // text-overflow:ellipsis;
  // white-space: nowrap;
}
.nameInfo span:last-child{
  color: red;
  font-weight: bold;
}
</style>
