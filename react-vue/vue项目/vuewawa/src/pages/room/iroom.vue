/** 直播间 **/

<template>
  <div class="view-room-root" ref="videoView">
    <!-- 返回按钮 -->
    <div class="room-back" v-on:click="bindTap('quit')"></div>
    <!-- 在线人数 -->
    <div class="user-online">
      <ul class="user-online-icon">
        <li v-for="item in userInfo.list">
          <img :src="item.headImg == null || item.headImg == '' ? '/static/images/app-logo.png' : item.headImg" alt="">
        </li>
      </ul>
      <span class="user-online-text">
        <label>{{userInfo.userNum}}人在线</label>
      </span>
    </div>
    <!-- 房间Id -->
    <div class="room-view-id">
      <span>房间ID: {{room.roomId}}</span>
    </div>
    <!--左边-->
    <div class="bianbian bianbian-left"></div>
    <!--右边-->
    <div class="bianbian bianbian-right"></div>
    <!-- 消息 -->
    <tip-message  :type="'room'"></tip-message>
    <!-- 直播 -->
    <div class="room-live">
      <div class="room-video">
        <!-- 观看模式 -->
        <div v-show="!game.control" class="flex-item guest-game-video main-video">
          <div class="video-content" id="videoContent"></div>
        </div>
        <!-- 上机模式 -->
        <div style="height: 100vh;margin-top: -60px;" v-show="game.control">
          <div class="flex-item play-game-video">
            <div class="video-content" style="width: 100%; height: 100%;" v-show="game.show">
              <canvas ref="canvasVideo" class="video-item"></canvas>
            </div>
          </div>
          <!-- 摄像头转换区域 -->
          <div class="camera-control" v-on:click="camera">
            <img src="/static/images/room/room-icon-camera.png" alt="">
          </div>
        </div>
        
        <!-- 玩家资料区域 -->
        <router-link tag="div" :to="{name: 'guest', params: {gid: game.groupId, uid: userInfo.user.userId} }" class="user-info" v-if="userInfo.user && userInfo.user != null">
          <div class="user-name">
            <label>{{userInfo.user.nickName}}</label>
          </div>
          <div class="user-photo">
            <img :src="userInfo.user.headImg == null || userInfo.user.headImg == '' ? '/static/images/app-logo.png' : userInfo.user.headImg" alt="">
          </div>
        </router-link>
        <!-- 倒计时提示 -->
        <div class="time-out" v-if="game.can">
          <label v-bind:class="{'time-out-emphasize' : game.time_out <= 5}">{{game.time_out}}s</label>
        </div>
        <!-- 等待结果时的文字提示 -->
        <div class="result-tip" v-if="game.result == -1">
          <label>正在等待游戏结果...</label>
        </div>
        <!-- 音乐 -->
        <div class="audio-area" v-on:click="playStop">
          <!-- 音乐图标 -->
          <img v-if="room.audio" src="/static/images/room/audio-icon-play.png" alt="">
          <img v-else src="/static/images/room/audio-icon-pause.png" alt="">
          <!-- 背景 -->
          <audio src="/static/music/music.mp3" ref="audio" loop v-show="false"></audio>
          <!-- ready -->
          <audio src="/static/music/ready.mp3" ref="audioReady" v-show="false"></audio>
          <!-- 倒计时 -->
          <audio src="/static/music/time.mp3" ref="audioTime" v-show="false"></audio>
          <!-- 控制按钮 -->
          <audio src="/static/music/move.mp3" ref="audioMove" v-show="false"></audio>
          <audio src="/static/music/catch.mp3" ref="audioCatch" v-show="false"></audio>
          <!-- 结果 -->
          <audio src="/static/music/success.mp3" ref="audioSuccess" v-show="false"></audio>
          <audio src="/static/music/fail.mp3" ref="audioFail" v-show="false"></audio>
        </div>
      </div>
      <!-- 控制区域 -->
      <div class="control-button-area">
        <!-- 准备按钮  开始抓取按钮-->
        <div class="control-ready" v-if="!game.control">
          <div v-if="game.ready" class="my-begin-catch  begin-catch"  v-on:click="startGame">
            <div class="catch-cash">
              <label>{{room.gamePrice}}币/次</label>
            </div>
          </div>
          <!-- begin-catch-disabled如何表示 -->
          <div v-if="!game.ready" class="my-begin-catch begin-catch " >
            <div class="catch-cash">
              <label>{{room.gamePrice}}币/次</label>
            </div>
          </div>
          <!-- 个人金币 -->
          <div v-on:click="bindTap('cash')" class="user-cash">
            <div class="user-cash-value">
              <label>{{userInfo.balance}}</label>
            </div>
          </div>
          <!--抓中幸运儿-->
          <a class="user-of-lucky" @click='jumpTo("user-of-lucky")'></a>
          <!--宝贝详情-->
          <a class="user-wawa-detail" @click='jumpTo("wawa-xiagnqing")'></a>
        </div>
        <!-- 按钮 -->
        <div class="control-area" v-else>
          <!-- 可以控制按钮 -->
          <div class="control-button-item" v-if="game.can">
            <div class="control-button-list">
              <div class="control-item control-item-up" v-on:click="dominate('down')">
                <img src="/static/images/room/liveroom_click_on.png" alt="">
              </div>
              <div class="control-item control-item-right" v-on:click="dominate('right')">
                <img src="/static/images/room/liveroom_click_right.png" alt="">
              </div>
              <div class="control-item control-item-down" v-on:click="dominate('up')">
                <img src="/static/images/room/liveroom_click_under.png" alt="">
              </div>
              <div class="control-item control-item-left" v-on:click="dominate('left')">
                <img src="/static/images/room/liveroom_click_left.png" alt="">
              </div>
            </div>
            <div class="control-button-catch" v-on:click="dominate('catch')">
              <img src="/static/images/room/liveroom_click_catch.png" alt="">
            </div>
          </div>
          <!-- 不可控制按钮 -->
          <div class="control-button-item" v-else>
            <div class="control-button-list">
              <div class="control-item control-item-up">
                <img src="/static/images/room/liveroom_onclick_on.png" alt="">
              </div>
              <div class="control-item control-item-right">
                <img src="/static/images/room/liveroom_onclick_right.png" alt="">
              </div>
              <div class="control-item control-item-down">
                <img src="/static/images/room/liveroom_onclick_under.png" alt="">
              </div>
              <div class="control-item control-item-left">
                <img src="/static/images/room/liveroom_onclick_left.png" alt="">
              </div>
            </div>
            <div class="control-button-catch">
              <img src="/static/images/room/liveroom_onclick_catch.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结果弹窗 -->
    <mt-popup v-model="game.popupVisible" class="new-window room-window live-ro om-result" :class="( game.result == 1 ? 'liveroom_ok_selected' : 'liveroom_ok_unchecked')" popup-transition="popup-fade" :closeOnClickModal="false">
      <img :src="('/static/images/room/'+( game.result == 1?'sucess':'fail')+'.png')" alt="" class="resuleImg">
      <!-- 结果内容 -->
      <div class="room-live-tip user-popup-tip" v-if="game.result== 1">
        <div class="user-new-tip">
          <label>恭喜你抓到一个宝贝</label>
        </div>
        <span>您还有<b>{{lqbBalance}}</b>枚娃娃币,是否再来一局</span>
        <span>(为您保留<b>{{game.time_priority}}</b>s)</span>
      </div>
      <div class="room-live-tip" v-else>
        <div class="user-new-tip">
          <label>很遗憾，没有抓到哦～</label>
        </div>
        <small>抓的次数越多，成功率越高</small>
      </div>
      <!-- 按钮  -->
      <div class="button-area">
        <button type="button" name="button-cancel" class="button-item wawa-button-primary" v-on:click="closeWindow(false)">稍后再试</button>
        <button type="button" name="button-game" class="button-item wawa-button-danger" v-on:click="bindTap('game')">再来一局</button>
      </div>
    </mt-popup>
    <!-- 游戏币不足弹窗 -->

    <mt-popup v-model="userInfo.popupVisible" class="room-window" popup-transition="popup-fade" :closeOnClickModal="false" style="height:9rem">
      <div class="user-new-close" v-on:click="closePopup('userInfo')"></div>
      <!-- 结果内容 -->
      <div class="room-live-tip user-popup-tip">
        <label>哎呦，游戏币不足了，快去充点吧。</label>
      </div>
      <!-- 按钮  -->
      <div class="button-area" style="margin-top:1rem">
        <button type="button" name="button-cancel" class="button-item wawa-button-primary" v-on:click="bindTap('award')">分享赚取游戏币</button>
        <button type="button" name="button-game" class="button-item wawa-button-danger" v-on:click="bindTap('cash')">立即充值</button>
      </div>
    </mt-popup>
    <!-- 退出房间的提示 -->

    <mt-popup v-model="room.popupVisible" class="room-window" popup-transition="popup-fade" :closeOnClickModal="false" style="height:9rem">
      <div class="user-new-close" v-on:click="closePopup('room')"></div>
      <!-- 结果内容 -->
      <div class="room-live-tip user-popup-tip">
        <label>您正在游戏中，确定要退出房间吗？</label>
      </div>
      <!-- 按钮  -->
      <div class="button-area" style="margin-top:1rem">
        <button type="button" name="button-cancel" class="button-item button-cancel" v-on:click="closePopup('room')">取消</button>
        <button type="button" name="button-game" class="button-item wawa-button-danger" v-on:click="quitRoom">确定</button>
      </div>
    </mt-popup>
    <!-- 故障上报 -->

    <mt-popup v-model="fault.popupVisible" class="room-window" popup-transition="popup-fade" :closeOnClickModal="false" style="height:13rem">
      <!-- 内容 -->
      <div class="room-live-tip user-popup-tip">
        <div class="tip-title">房间维护中</div>
        <small>请退出选择其它房间继续游戏，或上报房间问题给我们。</small>
      </div>
      <!-- 按钮  -->
      <div class="button-area" style="margin-top:1rem">
        <button type="button" name="button-cancel" class="button-item" v-on:click="bindTap('quit')">退出房间</button>
        <button type="button" name="button-game" class="button-item wawa-button-danger" v-on:click="uploadFault">上报故障</button>
      </div>
    </mt-popup>
    <!-- 附加信息 -->
    <additional :id="game.groupId" ref="additional"></additional>
  </div>
</template>

<script>
  import store from 'store'
  import axios from 'axios'
  import Additional from "./additional"
  //引入TipMessage
  import TipMessage from "../../components/TipMessage"
  import {
    Toast
  } from 'mint-ui'
  export default {
    components: {
      Additional,
      TipMessage
    },
    data() {
      return {
        timeResult: null, // 游戏结果等待时长
        timeResultOut: 20,
        // 用户定时
        timeUser: null,
        // 游戏定时
        timeGame: null,
        // 房间定时
        timeRoom: null,
        // 用户信息
        userInfo: {
          userId: '', // 个人用户Id
          balance: 0, // 个人的金币
          popupVisible: false, // 游戏币不足时的弹窗
          userNum: 0, // 当前在线人数
          user: null, // 当前游戏玩家信息
          list: [] // 在线人数列表
        },
        // 故障
        fault: {
          popupVisible: false,
          type: 0, // 0 ：机器故障
          content: ''
        },
        // 直播间
        room: {
          roomId: '', // 房间编码
          roomName: '', // 房间名称
          gamePrice: 0,
          audio: true,
          popupVisible: false,
          // 用户进入房间时间
          beginTime: new Date(),
          endTime: null,
          front: false, // 正面:true、侧面：false
          vid: '', // 正、侧面视频ID
          video_list: [],
          // 强制退出游戏
          quit: false
        },
        // 游戏控制
        game: {
          show: false,
          gameId: '', // 游戏编号
          groupId: '', // 房间号
          ready: false, // 出现“开始抓取”按钮
          front: true, // 正面:true、侧面：false
          control: false, // 出现控制按钮（不可操作）
          can: false, // 出现控制按钮（可操作）
          time_out: 30, // 开始游戏后的倒计时
          result: -2, // 游戏结果；抓取成功： 1； 抓取失败： 0 ； 等待返回结果 -1;  隐藏显示： -2
          popupVisible: false, // 游戏结束后，显示/隐藏结果弹窗
          time_priority: 10, // 游戏结束后，优先权的倒计时
          player: null
        },
        bgmusic:[
          '/static/bgmusic/first.mp3',
          '/static/bgmusic/second.mp3',
          '/static/bgmusic/third.mp3',
          '/static/bgmusic/fifth.mp3',
          '/static/bgmusic/sixth.mp3',
          '/static/bgmusic/seven.mp3',
          '/static/bgmusic/eigth.mp3'
        ]
      }
    },
    watch: {},
    beforeRouteUpdate(to, from, next) {
      this.timeUser && clearInterval(this.timeUser)
      this.timeRoom && clearInterval(this.timeRoom)
      this.timeGame && clearInterval(this.timeGame)
      next()
      window.location.reload()
    },
    beforeMount: function() {
      this.game.groupId = this.$route.params.id
    },
    created() {
      var index = Math.floor((Math.random()*this.bgmusic.length));


      document.getElementById('audio').src = this.bgmusic[index];
    },
    mounted() {
      var that = this
      that.initRoom()
      setTimeout(function() {
        // 初始化分享
        that.$share.code('room', that.game.groupId)
      }, 2000)

      this.$refs.videoView.addEventListener('scroll', this.handleScroll)
    },
    // 页面销毁之前
    beforeRouteLeave(to, from, next) {
      if (this.room.quit) {
        next()
      } else {
        // 正在游戏中时，二次弹窗提醒
        if (this.game.control) {
          this.room.popupVisible = true
        } else {
          next()
        }
      }
    },
    // 监听页面销毁 - 离开页面
    destroyed() {
      var that = this
      $("#div_video").hide()
      document.getElementById('audio').pause()
      that.timeUser && clearInterval(that.timeUser)
      that.timeRoom && clearInterval(that.timeRoom)
      that.timeGame && clearInterval(that.timeGame)

      that.game.player && that.game.player.destroy()
      that.game.player = null
    },
    methods: {
      jumpTo(itemId){
        this.$refs.additional.scroll(itemId)
      },
      handleScroll: function() {
        var scrollTop = this.$refs.videoView.pageYOffset ||
          this.$refs.videoView.scrollTop ||
          this.$refs.videoView.scrollTop

        $("#div_video").css({
          "top": -scrollTop
        })
      },
      // 初始化房间信息
      initRoom: function(options) {
        var that = this,
          isWeixin = this.GLOBAL.isWeixn(),
          user = store.get('user') || null
        // 房间Id
        that.game.groupId = this.$route.params.id
        console.log(123)
        if (user) {
          that.loadRoomData() // 获取当前房间的详细信息
          that.userInfo.userId = user && user.userId
          that.loadCash() // 获取个人金币
        } else {
          Toast({
            message: '用户信息未同步',
            duration: 1000
          })
          setTimeout(function() {
            that.$router.replace({
              name: 'home'
            })
          }, 1000)
        }
      },
      // 页面按钮点击事件
      bindTap: function(name) {
        var that = this
        // 再来一局
        if (name === 'game') {
          that.againGame()
        } else if (name === 'quit') {
          this.$router.replace({
            name: 'home'
          })
        } else {
          that.timeUser && clearInterval(that.timeUser)
          that.timeRoom && clearInterval(that.timeRoom)
          that.timeGame && clearInterval(that.timeGame)
          // 进入目标页面
          // award : 分享
          // cash : 充值
          that.room.quit = true
          if (name == 'cash') {
            var main_url = window.origin == null || '' ? this.GLOBAL.MAIN_URL : window.origin.replace("/undefined", "")
            window.location.href = main_url + '/user/cash'
          } else {
            this.$router.replace({
              name: name
            })
          }
        }
      },
      // 加载直播间基础数据
      loadRoomData: function() {
        var that = this,
          list = store.get('roomlist') || [],
          room = list.find((x) => {
            return x.groupId === that.game.groupId
          }) || null

        if (!room) {
          Toast({
            message: '房间信息未同步',
            duration: 1000
          })
          setTimeout(function() {
            that.$router.replace({
              name: 'home'
            })
          }, 1000)
          return
        }

        that.room.gamePrice = room.gamePrice
        that.room.roomId = room.roomId
        that.room.roomName = room.roomName

        function isExistFile(url) {
          var xmlHttp = new XMLHttpRequest(),
            state = false;
          xmlHttp.open("post", url, false);
          xmlHttp.send()
          if (xmlHttp.readyState && xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) state = true
            else if (xmlHttp.status == 404) state = false
            else return false
          } else {
            if (xmlHttp.status == 200) state = true
            else if (xmlHttp.status == 404) state = false
            else return false
          }
          return state
        }
        if (room.frontPullHlsUrl) {
          that.room.video_list.push({
            videoId: room.frontPushId,
            url: room.frontPullHlsUrl
          })
          document.getElementById('lvb_video').src = room.frontPullHlsUrl
          that.room.vid = room.frontPushId
          that.room.front = true
          // 创建直播流
          that.getLiveUrl()
        }
        // 获取当前房间状态来决定按钮的状态
        that.$ajax.post("live/room/getRoomStateById", {
          roomId: that.room.roomId
        }).then(res => {
          if (res && res.data) {
            // 开始抓取按钮点亮
            that.game.ready = res.data.resBody.roomState == 0 ? true : false
            // 背景音乐
            that.music('audio')
            // 获取房间状态信息
            that.getRoomState()
            // 加入房间
            that.addUserRoom()
          }
        })
      },
      // 获取直播地址
      getLiveUrl: function() {
        var that = this
        if (that.room.video_list.length > 0) {
          var m3u8Url = that.room.video_list[0].url
          if ($("#lvb_video").attr("src") == '') {
            $("#lvb_video").attr("src", m3u8Url)
          }
          $("#div_video").css({
            top: 58
          }).show()
        }
      },
      // 获取个人金币信息
      loadCash: function() {
        var that = this
        this.$ajax.post("user/getUserBalance", {}).then(response => {
          that.userInfo.balance = response && response.data.resBody.balance || 0
        })
      },
      // 获取房间状态
      getRoomState: function() {
        var that = this
        that.timeRoom && clearInterval(that.timeRoom)
        that.timeRoom = setInterval(function() {
          that.$ajax.post("live/room/getRoomStateById", {
            roomId: that.room.roomId
          }).then(res => {
            if (res && res.data) {
              that.game.ready = res.data.resBody.roomState == 0 ? true : false
            }
          })
        }, 1500)
      },
      // 播放、暂停背景音乐
      playStop: function() {
        var that = this
        if (!that.room.audio) {
          document.getElementById('audio').play()
        } else {
          document.getElementById('audio').pause()
        }
        that.room.audio = !that.room.audio
        store.set("audio", that.room.audio ? 1 : 0)
      },
      // 调度背景音乐
      music: function(cmd) {
        function audioAutoPlay(obj) {
          if (document.readyState == "complete") {
            var audioObj = obj,
              play = function() {
                audioObj.play();
                document.removeEventListener("touchstart", play, false);
              };
            audioObj.play();
            document.addEventListener("touchstart", play, false);
          }
          var isAppInside = /micromessenger/i.test(navigator.userAgent.toLowerCase()) || /yixin/i.test(navigator.userAgent.toLowerCase());
          if (!isAppInside) {
            audioAutoPlay(obj)
          }
        }

        var that = this,
          audio = store.get("audio") == undefined ? 1 : store.get("audio")
        if (audio == 1) {
          store.set("audio", 1)
          that.room.audio = true
          document.getElementById('audio').play()
        } else {
          that.room.audio = false
          if (that.$refs.audio) {
            document.getElementById('audio').pause()
          }
        }

        // 如果用户开启了音乐
        if (that.room.audio) {
          switch (cmd) {
            // 背景音乐
            case "audio":
              document.getElementById('audio').play()
              break;
              // 准备音效
            case "ready":
              that.$refs.audioReady.play()

              that.$refs.audioTime.play()
              that.$refs.audioTime.pause()
              break;
              // 按钮音效
            case "up":
            case "right":
            case "down":
            case "left":
              that.$refs.audioMove.play()
              break;
              // 下抓音效
            case "catch":
              that.$refs.audioCatch.play()

              that.$refs.audioSuccess.play()
              that.$refs.audioSuccess.pause()
              that.$refs.audioFail.play()
              that.$refs.audioFail.pause()
              break;
              // 游戏成功
            case "success":
              that.$refs.audioSuccess.volume = 1
              that.$refs.audioSuccess.load()
              that.$refs.audioSuccess.play()
              break;
              // 游戏失败
            case "fail":
              that.$refs.audioFail.volume = 1
              that.$refs.audioFail.load()
              that.$refs.audioFail.play()
              break;
              // 倒计时提醒
            case "time":
              that.$refs.audioTime.volume = 1
              that.$refs.audioTime.load()
              that.$refs.audioTime.play()
              break;
          }
        }
      },
      // 申请开始游戏
      startGame: function() {
        var that = this
        that.room.quit = false

        // 判断游戏币余额
        if (that.room.gamePrice > that.userInfo.balance) {
          that.userInfo.popupVisible = true
          that.game.ready = true
          that.game.control = false
          that.game.can = false
          return
        }

        that.game.control = true
        that.$ajax.post("live/room/applyBeginGameFromMDD", {
          groupId: that.game.groupId
        }).then(res => {
          if (res && res.data) {
            if (res.data.resBody.success == 1) {
              // 等待游戏结果的时长
              that.timeResult && clearInterval(that.timeResult)
              that.timeResultOut = 20
              // 抢到游戏时的提示音
              that.music('ready')
              // 清除轮询房间状态的定时
              that.timeRoom && clearInterval(that.timeRoom)
              // 更新个人金币信息
              that.loadCash()
              // 用户可以控制游戏
              that.game.can = true
              that.game.gameId = res.data.resBody.resData.gameId
              that.game.groupId = res.data.resBody.resData.groupId
              // 用户上机画面
              that.createGameVideo()
              // 立即更新玩家数据
              that.getLiveRoomUser()
              // 开始游戏倒计时
              that.game.time_out = 30
              that.timeGame && clearInterval(that.timeGame)
              that.timeGame = setInterval(function() {
                that.game.time_out = that.game.time_out - 1
                // 倒计时结束的提醒
                if (that.game.time_out > 0 && that.game.time_out < 6) {
                  that.music('time')
                }
                if (that.game.time_out <= 0) {
                  that.game.can = false
                  that.timeGame && clearInterval(that.timeGame)
                  that.dominate('catch')
                }
              }, 1000)
            } else {
              Toast({
                message: res.data.resBody.alertMsg,
                position: 'bottom',
                duration: 1000
              })
            }
          }
        })
      },
      // 方向控制
      dominate: function(dir) {
        var that = this
        // 侧面摄像头
        if (!that.game.front) {
          if (dir == 'down') dir = 'left'
          else if (dir == 'up') dir = 'right'
          else if (dir == 'left') dir = 'up'
          else if (dir == 'right') dir = 'down'
        }
        // 下抓
        if (dir == "catch") {
          that.game.result = -1 //  结果赋值为等待中
          that.timeGame && clearInterval(that.timeGame) // 结束游戏30s倒计时
          // 按钮置灰
          that.game.can = false
        }
        // 音效
        that.music(dir)
        // 执行动作
        that.move(dir)
      },
      // 执行控制命令
      move: function(cmd) {
        var that = this
        that.room.quit = false
        that.$ajax.post("live/room/playGeme", {
          gameId: that.game.gameId,
          groupId: that.game.groupId,
          oper: cmd
        }).then(res => {
          // 如果是下抓命令
          if (cmd == 'catch') {
            that.getGameResult() // 开启轮询获取游戏结果
            that.timeResult = setInterval(function() {
              that.timeResultOut = that.timeResultOut - 1;
              if (that.timeResultOut < 0) {
                that.timeResultOut = 20
                that.game.result = -2
                that.timeGame && clearInterval(that.timeGame)
                that.timeResult && clearInterval(that.timeResult)
                that.game.control = false
                that.game.ready = true
              }
            }, 1000)
          }
        })
      },
      // 再来一局
      againGame: function() {
        // 关闭窗口 & 重置状态
        this.closeWindow(true)
        // 开始游戏
        this.startGame()
      },
      // 退出房间
      quitRoom: function() {
        var that = this
        that.room.quit = true
        that.timeUser && clearInterval(that.timeUser)
        that.timeRoom && clearInterval(that.timeRoom)
        that.timeGame && clearInterval(that.timeGame)
        this.$router.replace({
          name: 'home'
        })
      },
      // 关闭信息提醒弹窗
      closePopup: function(type) {
        this.room.quit = false
        this[type].popupVisible = false
      },
      // 关闭游戏结果的弹窗
      closeWindow: function(again) {
        var that = this
        // 关闭弹窗
        that.game.popupVisible = false
        // 重置优先权倒计时
        that.game.time_priority = 10
        // 清除优先权定时器
        that.timeGame && clearInterval(that.timeGame)
        // 再玩一局
        if (again) {
          that.room.quit = false
          that.timeRoom && clearInterval(that.timeRoom)
        } else {
          // 控制按钮显示、隐藏
          that.game.control = false
          that.game.can = false
          // 强制退出
          that.room.quit = true
          //that.initRoom()
          if (that.game.groupId && that.game.groupId != '') {
            // 结束游戏，释放控制权
            that.gameOver()
            // 轮询当前房间状态
            that.getRoomState()
          }
        }
      },
      // 观看模式摄像头切换
      cameraGuest: function() {
        var that = this
        that.room.video_list.every((item, index) => {
          if (item.videoId != that.room.vid) {
            that.room.vid = item.videoId
            return false
          }
          return true
        })
        that.room.front = !that.room.front
        $(".guest-game-video").toggleClass("sub-video main-video")
      },
      // 上机模式切换视角
      camera: function() {
        var that = this,
          front = that.game.front ? 'side' : 'front',
          url = "http://119.29.238.35:41003/switch/" + front + "/" + that.game.gameId

        axios.post(url, {})
          .then(response => {
            if (response && response.data == "TRUE") {
              that.game.front = !that.game.front
            }
          })
      },
      // 创建上机画面
      createGameVideo: function() {
        var that = this
        var canvasVideo = that.$refs.canvasVideo,
           url = "ws://119.29.238.35:41002/" + that.game.groupId + "/front/" + that.game.gameId

        if (!that.game.player) {
          $("#div_video").hide()
          that.game.show = true
          that.game.front = true
          that.game.player = new JSMpeg.Player(url, {
            canvas: canvasVideo,
            autoplay: true,
            poster: '/static/images/room/room-icon-thumb-cover.png'
          })
        }
      },
      // 结束游戏
      gameOver: function() {
        var that = this
        this.$ajax.post("live/room/gameover", {
          groupId: that.game.groupId
        }).then(res => {
          that.game.result = -2
          that.timeResult && clearInterval(that.timeResult)
          that.timeResultOut = 20

          $("#div_video").css({
            top: "58px"
          }).show()
          that.game.player && that.game.player.destroy()
          that.game.player = null
        })
      },
      // 进入房间
      addUserRoom: function() {
        var that = this
        this.$ajax.post("live/room/addUserForLiveRoom", {
          groupId: that.game.groupId
        }).then(res => {
          that.getLiveRoomUser()
          that.timeUser && clearInterval(that.timeUser)
          that.timeUser = setInterval(function() {
            that.getLiveRoomUser()
          }, 3000)
        })
      },
      // 离开房间
      removeUserRoom: function() {
        var that = this
        this.$ajax.post("live/room/removeUserForLiveRoom", {
          groupId: that.game.groupId
        }).then(res => {
          that.timeUser && clearInterval(that.timeUser)
        })
      },
      // 获取游戏结果
      getGameResult: function() {
        var that = this
        that.timeGame && clearInterval(that.timeGame)
        that.timeGame = setInterval(function() {
          that.$ajax.post("live/room/getMyGameResult", {
            gameId: that.game.gameId
          }).then(res => {
            if (res && res.data) {
              var result = res.data.resBody.resData.result
              if (result != -1) {
                that.timeGame && clearInterval(that.timeGame)
                that.timeResult && clearInterval(that.timeResult)
                that.timeResultOut = 20
                // 获取到游戏结果
                that.game.result = result
                // 游戏结束后，显示结果弹窗
                that.game.popupVisible = true
                that.game.time_priority = 10
                // 播放游戏结果的音乐
                if (result == 1) {
                  that.music('success')
                } else {
                  that.music('fail')
                }
                // 进入优先权倒计时
                that.timeGame = setInterval(function() {
                  that.game.time_priority = that.game.time_priority - 1
                  // 优先权的倒计时时间到
                  if (that.game.time_priority <= 0) {
                    that.closeWindow(false)
                  }
                }, 1000)
              }
            }
          })
        }, 1000)
      },
      // 获取房间在线情况
      getLiveRoomUser: function() {
        var that = this
        that.$ajax.post("live/room/getLiveRoomUser", {
          groupId: that.game.groupId
        }).then(res => {
          if (res && res.data) {
            var result = res.data.resBody.req
            that.userInfo.user = result.user
            that.userInfo.list = result.userList
            that.userInfo.userNum = result.userNum
          }
        })
      },
      // 上报故障
      uploadFault: function() {
        var that = this
        this.$ajax.post("terminal/fault/save", {
          type: that.fault.type,
          userId: that.userInfo.userId,
          roomId: that.room.roomId,
          roomName: that.room.roomName,
          groupId: that.game.groupId,
          content: that.fault.content
        }).then(res => {
          if (res && res.data) {
            if (res.data.resBody.success == 1) {
              Toast({
                message: '上报故障成功',
                position: 'bottom',
                duration: 2000
              })
              that.fault.popupVisible = false
              that.quitRoom()
            }
          }
        })
      },
      // 上报流
      uploadStream: function() {
        var that = this
        wx.getNetworkType({
          success: function(res) {
            // 返回网络类型2g，3g，4g，wifi
            var networkType = res.networkType
            that.$ajax.post("terminal/saveStreamRecord", {
              devices: navigator.userAgent,
              frontStreamTime: that.room.endTime - that.room.beginTime,
              groupId: that.game.groupId,
              network: networkType == 'wifi' ? 0 : 1,
              platform: 'H5',
              roomId: that.room.roomId,
              sideStreamTime: that.room.endTime - that.room.beginTime,
              userId: that.userInfo.userId,
              version: ''
            }).then(res => {})
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/sass/room.scss';
</style>
