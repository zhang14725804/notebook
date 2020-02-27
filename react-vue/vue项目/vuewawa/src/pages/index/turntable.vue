/** 大转盘 **/

<template>
  <div class="turntable">
      <img :src="('../../../static/images/turntable/bg.jpg')" alt="" class="bg">
      <div class="turntableImg">

      <img :src="('../../../static/images/turntable/PrizeBG.png')" alt="" class="Prize" ref="Prize" :style="{transform:rotate_angle,transition:rotate_transition}">
      <img :src="('../../../static/images/turntable/turntable.png')" alt="" class="turntablebg" ref="turntablebg" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}" @click="rotate_handle()">
    </div>
    <!-- <img :src="('../../../static/images/turntable/text.png')"   alt="" class="text" ref="text"> -->
    <div class="toast" v-show="toast_control">
      <div class="toast-container">
        <div class="toast-title">
            {{toast_title}}
        </div>
        <div class="toast-btn">
            <div class="toast-cancel"  @click="close_toast">确定</div>
        </div>
      </div>
    </div>
    <div class="rule">
      <img src="../../../static/images/turntable/ruleBG.png" alt="">
      <span>活动规则</span>
      <div class="textDetails">
        <p>1.20币玩一次</p>
        <p>2.100%奖率，不玩套路，每盘中奖</p>
        <p>3.用户如果中游戏币立马到账</p>
        <p>4.实物奖品我们会在两个工作日内给玩家发货</p>
        <p>5.祝玩家喜获大奖，开心过年</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from 'store'
import { Toast } from 'mint-ui';


  export default {
    data() {
      return {
        toast_control: false, //抽奖结果弹出框控制器
        // toast_pictrue: require("../assets/img/congratulation.png"), //抽奖结果标题图片src
        toast_back: false, //抽奖结果toast中是否为确认按钮
        start_rotating_degree: 0, //初始旋转角度
        rotate_angle: 0, //将要旋转的角度
        start_rotating_degree_pointer: 0, //指针初始旋转角度
        rotate_angle_pointer: 0, //指针将要旋转的度数
        rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
        rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
        click_flag: true, //是否可以旋转抽奖
        toast_title:'',
        productId:'',
        userId:''
      }
    },
    mounted(){
      var that = this;
      var userEntity = store.get('user') || null;
      var userid = this.$route.params.userid;
      if(userid){
        that.userId = this.$route.params.userid
      }else{
        that.userId = userEntity.userId;
      }
    },
    methods:{
      rotate_handle(){
        this.rotating();
      },
      rotating(index){
        var that = this;
        if (!that.click_flag)
        return;
        that.$ajax.OOpost('dzp/go',{userId:that.userId}).then(res => {
          if (res && res.data.resBody.success == 1) {
            console.log(window.sessionStorage.getItem('lqbBalance'));
            this.rotate(res.data.resBody.id)
          }else{
            Toast({
              message: res.data.resBody.alertMsg,
              duration: 5000
            })
          }
        })
      },
    rotate(id){
      var that = this;
      if (!that.click_flag)
      return;
      var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
      var during_time = 5; // 默认为1s
      var random = Math.floor(Math.random()*7)
      var result_index = id - 1 ; // 最终要旋转到哪一块，对应prize_list的下标
      console.log(result_index);
      var result_angle = [-180,-130,-85,-280,-248,-350,-25]; //最终会旋转到下标的位置所需要的度数
      var rand_circle = 6; // 附加多转几圈，2-3
      that.click_flag = false; // 旋转结束前，不允许再次触发
      if (type == 0) {
        // 转动盘子
        var rotate_angle =
          that.start_rotating_degree +
          rand_circle * 360 +
          result_angle[result_index] -
          that.start_rotating_degree % 360;
          that.start_rotating_degree = rotate_angle;
          that.rotate_angle = "rotate(" + rotate_angle + "deg)";
        var that = this;
        // 旋转结束后，允许再次触发
        setTimeout(function() {
          switch(id){
            case 1:
            that.winning('恭喜你获得5个金币')
            break;
            case 2:
            that.winning('恭喜你获得30个金币')
            break;
            case 3:
            that.winning('恭喜你获得100个金币')
            break;
            case 4:
            that.winning('恭喜你获得公仔-咪咪兔')
            break;
            case 5:
            that.winning('恭喜你获得Hello-kety充电宝')
            break;
            case 6:
            that.winning('恭喜你获得Dior口红')
            break;
            case 7:
            that.winning('恭喜你获得IphoneX')
            break;
          }
          that.click_flag = true;
        }, during_time * 1200);
      } else {
        //
      }
    },
    //中奖函数，需传入中奖结果 string
    winning(result){
        this.toast_control = true;
        this.toast_title = result?result:this.toast_title;
        this.toast_back = true;
    },
      //关闭抽奖结果
    close_toast(){
        this.toast_control = false;
    }
    }
  }
</script>

<style scoped lang="scss">
.rule{
  display: block;
  width: 82%;
  position: relative;
  bottom: 12.5rem;
  z-index: 999999999;
  margin-left: -40%;
  left: 50%;
  /* overflow: hidden; */
  height: 11rem;
}
.rule img{
  display: block;
    position: absolute;
    width: 100%;
    height: 100%;
}
.rule span{
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
  padding-top: 1.4rem;
  display: block;
  position: absolute;
  width: 100%;
}
.rule div.textDetails{
  color: #ffffff;
  text-align: left;
  padding: 3% 6%;
  font-size: 10px;
  position: absolute;
  width: 100%;
  top: 2.5rem;
}
.turntable{
  position: relative;
  height: 100vw;
}
.turntableImg{
  position: absolute;
  display: block;
  width: 89%;
  left: 50%;
  top: 5rem;
  margin-left: -45%;
  // height: 23rem;
}
.Prize{
  // position: absolute;
  display: block;
  width: 100%;
  // height: 100%;
}
.turntablebg{
  position: absolute;
  display: block;
  width: 6rem;
  height: 6rem;
  left: 50%;
  top: 50%;
  margin-left: -3.1rem;
  margin-top: -3rem;
}
.text{
  position: absolute;
  display: block;
  width: 3rem;
  left: 50%;
  top: 16.6rem;
  margin-left: -1.5rem;
}
.turntable .bg{
  width: 100%;
  display: block;
  margin-top: -4rem;
}
.toast-mask {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
  width: 100%;
  height: 100%;
}
.toast {
  position: fixed;
  top: 30%;
  left: 50%;
  z-index: 20000;
  transform: translate(-50%, -32%);
  width: 15.4375rem;
  background: #fff;
  border-radius: 0.3125rem;
  padding: 0.3125rem;
  background-color: rgb(252, 244, 224);
}
.toast-container {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px dotted #fccc6e;
}
.toast-picture {
  position: absolute;
  top: -6.5rem;
  left: -1.5rem;
  width: 18.75rem;
  height: 8.5625rem;
}
.toast-pictrue-change{
    position: absolute;
    top: -1.5rem;
    left: -1.375rem;
    width: 17.5rem;
    height: 3.125rem;
}
.toast-title {
  padding: 2.8125rem 0;
  font-size: 18px;
  color: #fc7939;
  text-align: center;
}
.toast-btn{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: .9375rem;
}
.toast-btn div {
  background-image: -webkit-linear-gradient(
    -18deg,
    rgb(242, 148, 85) 0%,
    rgb(252, 124, 88) 51%,
    rgb(252, 124, 88) 99%
  );
  box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
  width: 4.6875rem;
  height: 1.875rem;
  border-radius: 1.875rem;
  text-align: center;
  line-height: 1.875rem;
  color: #fff;
}

</style>
