/** 排行榜 **/

<template>
  <div class="rankinglist">
      <div class="rankinglistContent">
          <ul>
            <li v-for="(item,index) in tab" v-on:click="checkItem(index)">
              <img :src="('../../../static/images/rankinglist/'+item.name+(item.id == tabcheck?'on':'')+'.png')" alt="" >
            </li>
          </ul>
          <div class="listContent">
            <div class="titleMenu">
              <span>排名</span>
              <span>昵称</span>
              <span>{{type==1?'充值总金额':'抓中个数'}}</span>
              <span></span>
            </div>
            <div class="listUserInfo" v-for="(item,index) in rankingList">
              <span>
                <b v-if="item.ranking > 3">{{item.ranking}}</b>
                <img v-if="item.ranking < 4" :src="('../../../static/images/rankinglist/num'+item.ranking+'.png')" alt="">
              </span>
              <span class="name">{{item.nickName}}</span>
              <span>{{item.num}}</span>
              <span @click="worship(item.userId)">膜拜</span>
            </div>
          </div>
          <div class="rule">
            <span class="title">榜单规则</span>
            <p>每天统计一次</p>
            <p>每天可膜拜一次，膜拜人得5金币，被膜拜人金币+1</p>
            <p>系统每月会统计排行名单，进行礼品赠送，祝玩家玩的开心</p>
          </div>
      </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import store from 'store';
  export default {
    data() {
      return {
        tab:[{
          id:0,
          name:'tuhao'
        },{
          id:1,
          name:'shengshou'
        }],
        type:1,
        tabcheck:0,
        rankingList:[],
        userId:'',
        tlsSign:''
      }
    },
    mounted(){
      var that = this;
      this.initRankList();
      var userEntity = store.get('user') || null;
      var userId = this.$route.params.userid || null
      var tlsSign = this.$route.query.tlsSign || null
      if(userId ){
        that.userId = userId;
      }else{
        that.userId = userEntity.userId;
      }
      if(tlsSign!==''){
        that.tlsSign = tlsSign;
      }
    },
    methods:{
      //tab切换
      checkItem: function(index){
        var that = this;
        that.tabcheck = index;
        var that  = this;
        if(index == 1){
          that.type = 0
        }else{
          that.type = 1
        }
        that.initRankList();
      },
      //膜拜  worshipType: 0代表是土豪榜,1代表是神抓手(和that.type刚好相反)
      worship(data){
        var that = this;
        let worshipType = this.type===1?0:1
        if(that.tlsSign){
          console.log(that.tlsSign)
          store.set('user',{
            'userId':that.userId,
            'ticket':that.tlsSign
          })
        }  
        that.$ajax.post('user/task/everyday/worship',{worshipUserId:data,worshipType:worshipType}).then(res => {
          console.log(res);
          if (res && res.data) {
            if (res.data.resBody.success == 0) {
                // that.rankingList = res.data.resBody.rankingList
                Toast({
                  message: res.data.resBody.alertMsg,
                  duration: 5000
                })
            }else if(res.data.resBody.success == 1){
              Toast({
                message:'膜拜成功+5娃娃币',
                duration: 5000
              })
            }
          }
        })        
      },
      // 初始化排行榜数据
      initRankList:function(type){
        var that = this;
        that.$ajax.post('home/getRankingList',{type:that.type}).then(res => {
          console.log('getRankingList')
          console.log(res)
          if (res && res.data) {
            if (res.data.resBody.rankingList.length > 0) {
                that.rankingList = res.data.resBody.rankingList
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.rankinglist{
  padding-top:9rem;
  background-image: url(/static/images/rankinglist/ranklist_bg.png);
  background-size: contain; 
  background-repeat: no-repeat;
}
.rule{
  width: 98%;
  margin:2rem auto;
  position: relative;
  padding-bottom: 1rem;
  color: #6F6F6F;
  border-bottom:1px solid #E5E5E5;
}
.rule .title{
  display:block;
  position:relative;
  margin-bottom:2rem;
  color:#BFBFBF;
}
.rule .title:before, .rule .title:after {
  content: '';                
  position: absolute;      
  top: 52%;
  background: #E5E5E5;      
  width: 40%;
  height: 1px;
}
.rule .title:before{
    left:-1rem;
}
.rule .title:after {
    right: -1rem;
}
.rule p{
  font-size:10px;
  font-weight: bold;
  padding-left: 0.1rem;
  width:86%;
  margin:0 0 1rem 1.4rem;
  text-align: left;
  position: relative;
}
.rule p:before{
  content:"";
  width:1.5rem;
  height:1.5rem;
  display: block;
  position: absolute;
  top:0rem;
  left:-1.5rem;
  background-image: url('../../../static/images/rankinglist/ruleIcon.png');
  background-repeat: no-repeat;
  background-size: cover;
}

.listUserInfo{
  height: 2.2rem;
  width: 98%;
  margin:0 auto;
  border-bottom:1px solid #eeeeee;
  clear: both;
}
.listUserInfo:last-child{
  border-bottom: none;
}
.listUserInfo span{
  display: block;
  width:25%;
  float: left;
  text-align: center;
  line-height:2rem;
  font-weight: bold;
}
.listUserInfo span.name{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.listUserInfo span:last-child{
  color: #f6487b;
}

.listUserInfo span img{
  width: 2rem;
  height: 2rem;
}
.listUserInfo span:first-child b{
  color: #666666;
  font-weight: bold;
}
.listContent {
  width: 100%;
  background-color: #ffffff;
  padding-top: 0.5rem;
  padding-bottom: 2rem;
  border:1px solid #FFBCD6;
  border-top:none;
  border-bottom-left-radius:1rem;
  border-bottom-right-radius:1rem;
}
.listContent .titleMenu{
  width: 98%;
  margin:0.3rem auto;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: #eeeeee;
}
.listContent .titleMenu span{
  display: block;
  color: #656565;
  width:25%;
  float: left;
  font-weight: bold;
  text-align: center;
  line-height: 1.5rem;
}
.rankinglistContent ul{
  overflow: hidden;
}
.rankinglistContent ul li{
  width: 50%;
  float: left;
  border: 1px solid #FFBCD6;
  border-bottom: none;
}
.rankinglistContent ul li img{
  display: block;
  width: 100%;
}
.rankinglistContent{
  width:90%;
  margin:0 auto;
  overflow: hidden;
}
</style>
