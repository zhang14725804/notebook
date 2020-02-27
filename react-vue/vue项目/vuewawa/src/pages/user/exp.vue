/** 抓取记录 **/

<template>
    <div class="exp">
      <div class="desc-wrapper"><p>充值越多经验越多，经验只能通过充值获得,比</br>例为1:1,后期会根据用户的经验进行更多的专属活动</p></div>
      <div class="expData">
        <div class="vip-wrapper">
          <span v-for="item in vipLen" :class="{'cYellow' : vip == item}" v-html='"vip"+item' ></span>
        </div>
        <ul>
          <li v-for="(item,index) in list" v-if="index<vip" :class="index<vip?'yellow':''"></li>
        </ul>
      </div>
      <div class="hrefBtn">
        <span class="details" @click="expDetails"><img :src='("../../../static/images/exp/details.png")' width="100%" height="100%" /></span>
        <span class="cash" @click="cash"><img :src='("../../../static/images/exp/cash.png")'  width="100%" height="100%"/></span>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        totalExp:'',
        vip:'0',
        list:['','','','','',''],
        vipLen:[1,2,3,4,5]
      }
    },
    create(){

    },
    mounted() {
      var vipdata = localStorage.getItem('totalExp');
      if(vipdata>=0&&vipdata<50){
        this.vip = 0
      }else if(vipdata>=50&&vipdata <= 100){
        this.vip = 1
      }else if(vipdata>=101&&vipdata <= 200){
        this.vip = 2
      }else if(vipdata>=201&&vipdata <= 300){
        this.vip = 3
      }else if(vipdata>=301&&vipdata <= 400){
        this.vip = 4
      }else if(vipdata>=401&&vipdata <= 500){
        this.vip = 5
      }
    },
    activated() {},
    methods: {
      expDetails:function(){
        this.$router.push('/user/expDetails')
      },
      cash:function(){
        this.$router.push('/user/cash')
      }
    }
  }
</script>

<style scoped lang="scss">
html,body{
  height: 100%;
}

.exp{
  width:100%;
  height:163vw;
  background-color:#F5F5F5;
  background-size:100%;
  position: relative;
}
.exp .desc-wrapper{
  background-color:#ffffff;
  padding:1rem 1.5rem;
}
.exp .desc-wrapper p{
  color: #7B7B7B;
  text-align: left;
  width: 96%;
  padding-top:2rem;
  padding-bottom:1.5rem;
  margin:0 auto;
  font-weight: bold;
  border-bottom:1px solid #EEEEEE;
}
.hrefBtn{
  margin-top:3rem;
}
.hrefBtn span{
  width: 6rem;
  height: 2.2rem;
  display: inline-block;
  text-align: center;
  line-height:2.2rem;
  border:1px solid #EAEAEA;
  color: #EAEAEA;
  border-radius:0.5rem;
}
span.details{
  margin-right:2rem;
}
.expData{
  padding-top:3rem;
  background-color:#ffffff;
  width: 100%;
  height:10rem;
  position: relative;
}
.vip-wrapper{
  margin:0 1.5rem;
  display:flex;
  justify-content:space-around;
}
.vip-wrapper span{
  color:#7B7B7B;
  flex:1;
  text-align:center;
}
.vip-wrapper span:after{
  content:'';
  border-right:1px solid #E0E0E0;
  position:relative;
  display:inline-block;
  height:0.5rem;
  top:1.3rem;
  left:1.4rem;
}
.vip-wrapper span:last-child:after{
  border:none;
}
.exp ul{
  width: 90%;
  height: 1rem;
  left:5%;
  top:5.4rem;
  background-color: #EBEBEB;
  position: absolute;
  border-radius:.8rem;
}
.exp ul li{
  float: left;
  height: 1rem;
  top:0;
  left:0;
  width:20%;
  border-right:none;
  background-color: #7B7B7B;
}
.exp ul li:last-child{
  border-top-right-radius:.8rem;
  border-bottom-right-radius:.8rem;
}
.exp ul li:first-child{
  border-top-left-radius:.8rem;
  border-bottom-left-radius:.8rem;
}
.yellow{
  background-color: #F8941C !important;
}
span.cYellow{
  color: #F8941C;
}
.vipContent{
  overflow: hidden;
  width: 90%;
  height: 2rem;
  margin:0 auto;
}
.vipContent span{
  float: left;
  display: block;
  font-size:1.3rem;
  color: #7B7B7B;
}
.vipContent span:first-child{
  margin-right: 0.5rem;
}
</style>
