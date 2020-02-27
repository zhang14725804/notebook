var sdkLog = new function() {
  var TAG = "ILiveSDK : ";
  this._debugLogOpen = true;
  this.openDebugLog = function() {
    this._debugLogOpen = true;
  };
  this.closeDebugLog = function() {
    this._debugLogOpen = false;
  };
  this.error = function(msg) {
    console.error(TAG + msg);
  };
  this.debug = function(msg) {
    if (!this._debugLogOpen) {
      return;
    }
    console.log(TAG + msg);
  }
};

var IM_CustomCmd = {
  AVIMCMD_None: 0, // 无事件：0
  AVIMCMD_EnterLive: 1, // 用户加入直播, Group消息 ： 1
  AVIMCMD_ExitLive: 2, // 用户退出直播, Group消息 ： 2
  AVIMCMD_Praise: 3, // 点赞消息, Demo中使用Group消息 ： 3
  AVIMCMD_Host_Leave: 4, // 主播或互动观众离开, Group消息 ： 4
  AVIMCMD_Host_Back: 5, // 主播或互动观众回来, Group消息 ： 5
  AVIMCMD_Multi: 2048, // 多人互动消息类型 ： 2048
  AVIMCMD_Multi_Host_Invite: 2049, // 多人主播发送邀请消息, C2C消息 ： 2049
  AVIMCMD_Multi_CancelInteract: 2050, // 已进入互动时，断开互动，Group消息，带断开者的imUsreid参数 ： 2050
  AVIMCMD_Multi_Interact_Join: 2051, // 多人互动方收到AVIMCMD_Multi_Host_Invite多人邀请后，同意，C2C消息 ： 2051
  AVIMCMD_Multi_Interact_Refuse: 2052, // 多人互动方收到AVIMCMD_Multi_Invite多人邀请后，拒绝，C2C消息 ： 2052
  AVIMCMD_Multi_Apply_Interact: 2053, // 主动申请连麦
  AVIMCMD_Multi_Apply_Agree_Interact: 2054, // 同意连麦
  AVIMCMD_Multi_Apply_Reject_Interact: 2055, // 拒绝连麦
};

var ILiveSDK = {
  RoomNumber: null,
  Role: null,
  selSess: null,
  loginInfo: {
    'sdkAppId': null,
    'openid': null,
    'identifier': null,
    'userSig': null,
    'identifierNick': null,
    'headurl': null,
    'token': null,
    'closeLocalMedia': true
  },
  init: function(rtclistener, loginInfo) {
    /*
    loginInfo.sdkAppID = loginInfo.sdkAppId;
    loginInfo.identifier = loginInfo.openid;
    loginInfo.closeLocalMedia = true;
    this.loginInfo = loginInfo;
    return WebRTCAPI.init(rtclistener, loginInfo);
    */

    /*
    loginInfo.sdkAppID = "1400051630";
    loginInfo.identifier = "user_2";
    */
    loginInfo.closeLocalMedia = true;
    this.loginInfo = loginInfo;

    return WebRTCAPI.init(rtclistener, loginInfo);
  },

  changeRole: function(role) {
    WebRTCAPI.changeSpearRole(role)
  },

  logout: function() {
    this.loginInfo = {
      'identifier': null,
      'userSig': null,
      'identifierNick': null,
      'headurl': null,
      'token': null
    };
  },
  joinRoom: function(opts, succ, error) {
    var self = this;
    self.RoomNumber = opts.roomid;
    self.Role = opts.role;

    WebRTCAPI.createRoom({
      roomid: self.RoomNumber,
      role: self.Role
    }, function(result) {
      if (result !== 0) {
        sdkLog.error("create room failed!!!");
        return;
      }
      console.log("WebRTCAPI CreateRoom Succ:" + self.RoomNumber);
      if (succ) {
        succ(result);
      }
    });
  },
  quitRoom: function(cbOk, cbErr) {
    var self = this;
    WebRTCAPI.quit();
  },
  getOpenId: function(tid) {
    return WebRTCAPI.getOpenId(tid)
  },
  openCamera: function() {
    return WebRTCAPI.openVideo();
  },
  closeCamera: function() {
    return WebRTCAPI.closeVideo();
  },
  openMic: function() {
    return WebRTCAPI.openAudio();
  },
  closeMic: function() {
    return WebRTCAPI.closeAudio();
  },
  setConstraints: function(val) {
    return WebRTCAPI.setConstraints(val);
  }
};

module.exports = {
  ILiveSDK: ILiveSDK
}
