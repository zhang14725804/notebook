/** 邀请码兑换 **/

<template>
  <div class="user-invitcode">
    <!-- 提示框 -->
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" closeOnClickModal="false">
      <label>兑换码兑换成功，{{reward}}游戏币已放入您的账户，邀请好友可获得更多奖励。</label>
      <div class="button-area">
        <button type="button" name="button-cancel" class="button-item button-cancel" v-on:click="cancel">以后再说</button>
        <button type="button" name="button-invitation" class="button-item wawa-button-danger" v-on:click="share">立即邀请好友</button>
      </div>
    </mt-popup>
    <!-- 邀请码 -->
    <ul class="user-invitcode-input" v-if="!complete">
      <li class="input-item" v-on:click="focus(0)">
        <input type="text" maxlength="1" class="input-value" v-model="invitcode[0]" ref="index0" v-on:keyup.delete="del(0)"/>
      </li>
      <li class="input-item" v-on:click="focus(1)">
        <input type="text" maxlength="1" class="input-value" v-model="invitcode[1]" ref="index1" v-on:keyup.delete="del(1)"/>
      </li>
      <li class="input-item" v-on:click="focus(2)">
        <input type="text" maxlength="1" class="input-value" v-model="invitcode[2]" ref="index2" v-on:keyup.delete="del(2)"/>
      </li>
      <li class="input-item" v-on:click="focus(3)">
        <input type="text" maxlength="1" class="input-value" v-model="invitcode[3]" ref="index3" v-on:keyup.delete="del(3)"/>
      </li>
      <li class="input-item" v-on:click="focus(4)">
        <input type="text" maxlength="1" class="input-value" v-model="invitcode[4]" ref="index4" v-on:keyup.delete="del(4)" />
      </li>
      <li class="input-item" v-on:click="focus(5)">
        <input type="text" maxlength="1" class="input-value" v-model="invitcode[5]" ref="index5" v-on:keyup.delete="del(5)" />
      </li>
    </ul>
    <ul v-else class="user-invitcode-input user-invitcode-input-cover">
      <li class="input-item" v-for="(item, index) in invitcode">{{item}}</li>
    </ul>
    <!-- 文字提示 -->
    <div class="user-invitcode-tip invitcode-tip-padding">
      <label>输入好友的邀请码，即可获赠{{reward}}个游戏币。</label>
      <div v-if="complete" class="complete-text"><label> 已兑换 </label></div>
    </div>
    <!-- 按钮 -->
    <div class="user-invitcode-button">
      <button v-if="!complete" type="button" name="invitcode-button" class="wawa-button-danger button-size-normal" v-bind:class="{disabled : !ready}" v-on:click="exchange" :disabled="!ready">立即兑换</button>
      <button v-else type="button" name="share-button" class="wawa-button-danger button-size-normal" v-on:click="share">邀请好友获得更多奖励</button>
    </div>
    <share-cover ref="shareCover"></share-cover>
  </div>
</template>

<script>
  import store from 'store';
  import {
    Indicator,
    Toast
  } from 'mint-ui';
  import ShareCover from "../../components/ShareCover.vue";
  export default {
    components: {
      ShareCover
    },
    data() {
      return {
        invitcode: ['', '', '', '', '', ''],
        reward: this.GLOBAL.REWARD,
        // code是否输入完成
        ready: false,
        // 显示、隐藏弹出框
        popupVisible: false,
        // 兑换状态，默认未完成，调用接口，获取到状态后改变属性值
        complete: false
      }
    },
    watch: {
      'invitcode': {
        handler: function(a, b) {
          var that = this
          var count = 0;
          for (var i = 0; i < a.length; i++) {
            if (a[i] == "" && b[i] == "") {
              that.$refs['index' + i].focus()
              break
            }
            if (a[i] != '') {
              count++
            }
          }
          if (count == 6) that.ready = true
          else that.ready = false
        },
        deep: true
      }
    },
    mounted() {
      var that = this
      that.getInviteCode()
    },
    methods: {
      // 定位
      focus: function(index) {
        var that = this
        if (that.invitcode[index] != '') {
          for (var i = index + 1; i < 6;) {
            that.$refs['index' + i].focus()
            if (that.invitcode[i] != '') {
              i++;
              continue
            } else {
              break
            }
          }
        } else {
          for (var i = index; i > -1;) {
            if (that.invitcode[i - 1] != '') {
              break
            } else {
              i--;
              that.$refs['index' + i].focus()
              continue
            }
          }
        }
      },
      del: function(index) {
        var that = this
        if (that.invitcode[index] == '') {
          index = index - 1;
          if (index < 0) return
          that.$refs['index' + index].focus()
        }
      },
      // 兑换按钮事件
      exchange: function() {
        var that = this
        Indicator.open({
          text: '兑换中...',
          spinnerType: 'snake'
        })
        // 逻辑：调用接口，返回成功数据后修改兑换状态并显示弹窗
        this.$ajax.post('inviteAward/verifyInviteCode', {
          fromInviteCode: that.invitcode.join('')
        }).then(res => {
          setTimeout(function() {
            Indicator.close()
            if (res && res.data) {
              if (res.data.resHead.code == 1) {
                Toast({
                  message: '兑换成功',
                  iconClass: 'icon icon-success',
                  position: 'bottom',
                  duration: 800
                });
                that.complete = true
                that.popupVisible = true
                that.getInviteCode()
              } else {
                Toast({
                  message: res.data.resHead.msg || '邀请码兑换失败',
                  position: 'bottom',
                  duration: 2000
                });
                that.invitcode = ['', '', '', '', '', '']
              }
            }
          }, 500)
        })
      },
      cancel: function() {
        // 隐藏弹窗
        this.popupVisible = false
      },
      share: function() {
        this.$router.replace({
          name: 'award'
        })
      },
      // 获取获取用户兑换过的邀请码
      getInviteCode: function() {
        var that = this
        that.$ajax.post('inviteAward/getInviteCodeByUserId', {}).then(res => {
          if (res && res.data) {
            if (res.data.resBody.success == 1) {
              that.invitcode = res.data.resBody.inviteCode.split('')
              if (res.data.resBody.inviteCode != '') {
                that.complete = true
              }
            } else {
              that.complete = false
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .complete-text {
    color: #FB5837;
    text-align: center;
    font-size: 1.2rem;
    width: 100px;
    margin: 1rem auto;
    padding: 5px 0;
    border: 1px solid #FB5837;
    -webkit-transform: rotateZ(-45deg);
    transform: rotateZ(-45deg);
  }

  .input-code {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 16.8rem;
    height: 3rem;
    border: 0;
    outline: 0;
    z-index: 999;
    background: transparent;
    box-sizing: border-box;
    color: transparent;
    background-image: none;
  }

  .input-code:focus,
  .input-code:active,
  .input-code:checked,
  .input-code::selection,
  .input-code:invalid,
  .input-code:hover {
    border: 0;
    outline: 0;
    background: transparent;
    background-image: none;
  }

  .input-value {
    background: transparent;
    border: 0;
    width: 34px;
    height: 34px;
    text-align: center;
    color: #F07EA9;
    font-size: 18px;
    text-transform: uppercase;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    border-radius: 0;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
