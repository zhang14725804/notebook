/**
 * 常用固定值和方法
 * config
 */
var CONFIG = {
  // 网站主域名
  MAIN_URL: "http://wwh5.91tmedia.com",
  // 接口地址
  BASE_URL: "https://wwapi.91tmedia.com/wawa_api/",
  // 119.29.238.35:8081
  //192.168.1.155:8080
  // https://wwapi.91tmedia.com/wawa_api/
  // 接口版本
  VERSION: "v1",
  // 兑换奖励多个币
  REWARD: 10,
  // 最多个人可被别人兑换获赠总额
  MAX_REWARD: 100,
  // 直播间
  SDKAPPID: 1400054324,
  ACCOUNT_TYPE: 20189,
  // 微信
  Wechat: {
    // 联系微信号码
    Name: "mddzhuawawa",
    // APPID
    AppId: "wx9b2b7febd513b087",
    // 微信登录授权
    OAuth2: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9b2b7febd513b087&redirect_uri=http://wwh5.91tmedia.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
  },
  // app下载地址
  APP: {
    Android: "https://www.pgyer.com/SG1i",
    IOS: "http://itunes.apple.com/cn/app/id1323966620?mt=8"
  },
  // Android
  Android: function() {
    return /Android/i.test(navigator.userAgent)
  },
  // IOS
  IOS: function() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent)
  },
  // 是否在微信
  isWeixn: function() {
    var ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true
    } else {
      return false
    }
  }
};

module.exports = CONFIG
