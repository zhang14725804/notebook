/** jifen **/

<template>
  <div class="jifen">
    <div class="content">
      <div class="inCenter outfenji1">
        <div class="inCenter outfenji2">
          <div class="inCenter outfenji3">
            <div class="inCenter outfenji4">
              <div class="fenji inCenter">
                <span class="wspan inCenter">当前积分</br><span>{{totalScore}}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="details" @click="jifenDetails">明细</span>
      <span class="detailsShop" @click="shopDetails"><img :src='("../../../static/images/jifen/jifenshop.png")' width="100%" height="100%"/></span>
    </div>
    <div class="text">
      <span class="title">积分规则</span>
      <p>充值得积分，充值金额*10等于积分，</br>如充值10块获得100积分，每天登录一次送10积分，</br>积分可以在积分商城免费兑换礼品</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        totalScore:''
      }
    },
    mounted() {
      this.totalScore = localStorage.getItem('totalScore');
      console.log(this.vip);
    },
    methods: {
      jifenDetails:function(){
        this.$router.push('/user/jifenDetails')
      },
      shopDetails:function(){
        this.$router.push('/integralshop')
      }
    }
  }
</script>

<style scoped lang="scss">
.jifen{
  width:100%;
  height:163vw;
  background-color:#ffffff;
  position: relative;
}
.content{
  position:relative;
  height:20rem;
  margin-bottom:2rem;
}
.inCenter{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
.outfenji1{
  width: 18rem;
  height: 18rem;
  border-radius:50%;
  border:1px solid #FDFDFD;
}
.outfenji2{
  width: 15.8rem;
  height: 15.8rem;
  border-radius:50%;
  border:1px solid #F6F6F6;
}
.outfenji3{
  width: 14em;
  height: 14rem;
  border-radius:50%;
  border:1px solid #F3F3F3;
}
.outfenji4{
  width: 12.8rem;
  height: 12.8rem;
  border-radius:50%;
  border:1px solid #F2F2F2;
}
.fenji{
  background: radial-gradient(#F9951B,#FEB761);
  width: 12rem;
  height: 12rem;
  border-radius:50%;
  color: #ffffff;
  font-weight: bold;
}
.wspan span{
  font-size:2.5rem;
}
span.details{
  position:absolute;
  right:-0.2rem;
  top:1rem;
  width: 6rem;
  height: 2.2rem;
  line-height: 2.2rem;
  background:url("../../../static/images/jifen/details.png") no-repeat;
  background-size:1.2rem 1.2rem;
  background-position:15% 50%;
  text-align: center;
  color: #878787;
}
span.details img{
  display:inline-block;
  height:1rem;
  width:1rem;
}
.detailsShop{
  position:absolute;
  bottom:-1rem;
  left:50%;
  transform:translateX(-50%);
  width: 9rem;
  height: 2.2rem;
  border:1px solid #E7E7E7;
  border-radius:0.5rem;
}
.text{
  width: 96%;
  margin: 0 auto;
  padding:0.1rem 1rem 2rem 1rem;
  border-bottom:1px solid #E5E5E5;
}
.text .title{
  display:block;
  position:relative;
  margin-bottom:2rem;
  color:#BFBFBF;
}
.text .title:before, .text .title:after {
  content: '';                
  position: absolute;      
  top: 52%;
  background: #E5E5E5;      
  width: 40%;
  height: 1px;
}
.text .title:before{
    left:-1rem;
}
.text .title:after {
    right: -1rem;
}
.text p{
  color: #808080;
  text-align: left;
  width:100%;
  margin:0 auto;
  font-weight: bold;
}
</style>
