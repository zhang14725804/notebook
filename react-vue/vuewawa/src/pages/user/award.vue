/** 邀请奖励 **/

<template>
  <div class="user-invitcode">
    <div class="title">
      <span>邀请奖励</span>
      <img :src="('../../../static/images/sharelogo.png')" alt="">
    </div>
    <p class="sumTitle">我的邀请码</p>
    <!-- 邀请码 -->
    <span class="invitcodeNum">{{invitcode}}</span>
    <!-- 按钮 -->
    <div class="invitButton">
      <span class="shareButton" v-on:click="shareCode">分享邀请码</span>
    </div>
    <!-- 文字提示 -->
    <div class="tips">
      <p>提示</p>
      <p>1.分享邀请码好友注册后，自动绑定上邀请码</p>
      <p>2.每邀请一位好友，可获得30娃娃币奖励</p>
      <p>3.邀请上限为100名，最高可获得3000币</p>
    </div>
    <div class="invTips">
      <span>邀请的好友</span>
      <div class="invitedWrapper">
        <div class="inviteHistory">共<span class="invitedCount">{{number}}</span>人，累计获得<span class="invitedCount">{{amount}}</span>娃娃币</div>
        <invit-user></invit-user>
      </div>
    </div>
    <share-cover ref="shareCover"></share-cover>
  </div>
</template>

<script>
  import store from 'store';
  import ShareCover from "../../components/ShareCover.vue";
  import InvitUser from "./invitUser.vue"
  export default {
    components: {
      ShareCover,
      InvitUser
    },
    data() {
      return {
        invitcode: ['', '', '', '', '', ''],
        reward: this.GLOBAL.REWARD,
        maxReward: this.GLOBAL.MAX_REWARD,
        number:0,
        amount:0
      }
    },
    mounted() {
      var that = this
      // 绑定邀请码
      that.bindCode()
      that._getInited()
    },
    methods: {
      _getInited(){
        let that = this
        this.$ajax.post("user/getMyInviteUserStatistical",{}).then((res)=>{
          if (res && res.data) {
            console.log(res);
            that.number=res.data.resBody.number
            that.amount=res.data.resBody.amount || 0
          }
        })
      },
      shareCode: function() {
        this.$refs.shareCover.open()
      },
      bindCode: function() {
        var that = this,
          userData = store.get('user') || null

        if (userData) {
          that.invitcode = userData.userInfo.inviteCode
          this.$share.code('code')
        }
      }
    }
  }
</script>
<style scoped>
  .invitedWrapper{
    position: relative;
    
  }
  .invitedWrapper .user-history{
    position: relative;
  }
  .inviteHistory{
    position: absolute;
    right:1rem;
    top:-2rem;
  }
  .invitedWrapper .invitedCount{
    display: inline-block;
    color: #EBBC46;
    font-size: 1rem;
    padding: 0;
  }
  .title{
    padding: 0 1rem;
    overflow: hidden;
    height:7rem;
  }
  .title span{
    font-size:1.5rem;
    line-height: 7rem;
    font-weight: bold;
    color: #646464;
    display: inline-block;
    float: left;
  }
  .title img{
    display: block;
    width: 5rem;
    float: right;
  }
  .sumTitle{
    font-size:1.5rem;
    color: #646464;
  }
  .invitcodeNum{
    color:#fed74b;
    font-size: 2rem;
    font-weight: bold;
    letter-spacing:0.2rem;
  }
  .invitButton{
    margin: 1rem 0;
  }
  .shareButton{
    width: 10rem;
    height: 3rem;
    line-height: 1rem;
    border-radius:0.5rem;
    color:#ffffff;
    background-color: #FED74C;
    display: block;
    padding: 1rem;
    margin: 0 auto;
  }
  .tips{
    border-bottom:1px solid #e5e5e5;
    padding-bottom: 1rem;
  }
  .tips p{
    text-align: left;
    padding-left: 1rem;
    color: #646464;
  }
  .invTips span{
    display: block;
    font-size:1.5rem;
    font-weight: bold;
    color: #646464;
    text-align: left;
    padding:1rem 1rem;
  }
  .invTips p{
    text-align: left;
    padding-left:1rem;
    color: #646464;

  }


</style>
