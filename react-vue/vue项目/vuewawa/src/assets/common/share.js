// 'use strict'

import axios from './axios'
import store from 'store'
import GLOBAL from "./config"

export default {
  initScript: function() {
    var $script = document.createElement("script");
    $script.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
    document.body.appendChild($script)
  },

  code: function(type, code) {
    axios.post("user/account/getWechatShareSign", {
      url: encodeURIComponent(window.location.href.split("#")[0])
    }).then(res => {
      if (res.data.resHead.code == 1) {
        this.ready(res.data.resBody, type, code)
      }
    })
  },

  // 获取签名完成后进行wx.config验证
  ready: function(options, type, code) {
    var that = this
    wx.config({
      debug: false,
      appId: options.appId, // 公众号的唯一标识
      timestamp: options.timestamp, // 生成签名的时间戳
      nonceStr: options.noncestr, // 生成签名的随机串
      signature: options.sign, // 签名
      jsApiList: ['checkJsApi', 'showMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
    })
    // 验证成功
    wx.ready(function() {
      var user = store.get('user') || null,
        channelId = store.get('channelId') || '',
        userName = '',
        userId = ''
      if (user) {
        userName = user.userInfo.nickName
        userId = user.userInfo.userId
      }
      var content = {
        title: userName + "送您免费抓娃娃资格，现金红包等你来拆，快来一起挑战吧。",
        link: GLOBAL.MAIN_URL + "/invitationnew/" + userId + '?channelId=' + channelId,
        imgUrl: GLOBAL.MAIN_URL + "/static/images/app-icon-share.png",
        desc: "手机直播抓娃娃，随时随地想抓就抓。"
      }
      // 通过type来却分分享的邀请码页面还是直播间页面
      // type： code邀请码    room直播间
      if (type == 'room') {
        content.title = "萌多多抓娃娃，" + userName + "邀您一起在线直播抓娃娃，共同High起抓娃娃世界。"
        content.link = GLOBAL.MAIN_URL + '/room/' + code + '?channelId=' + channelId
      }
      that.wxShare(content)
    })

    // 验证失败
    wx.error(function(res) {
      console.log(res)
    })
  },

  wxShare: function(options) {
    // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
    wx.onMenuShareTimeline({
      title: options.title,
      link: options.link,
      imgUrl: options.imgUrl,
      success: function() {},
      cancel: function() {}
    })

    // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
    wx.onMenuShareAppMessage({
      title: options.title,
      link: options.link,
      imgUrl: options.imgUrl,
      desc: options.desc,
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function() {},
      cancel: function() {}
    })

    // 获取“分享到QQ” 按钮点击状态及自定义分享内容接口
    wx.onMenuShareQQ({
      title: options.title,
      link: options.link,
      imgUrl: options.imgUrl,
      desc: options.desc,
      success: function() {},
      cancel: function() {}
    })

    // 获取“分享到腾讯微博” 按钮点击状态及自定义分享内容接口
    wx.onMenuShareWeibo({
      title: options.title,
      link: options.link,
      imgUrl: options.imgUrl,
      desc: options.desc,
      success: function() {},
      cancel: function() {}
    })

    // 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
    wx.onMenuShareQZone({
      title: options.title,
      link: options.link,
      imgUrl: options.imgUrl,
      desc: options.desc,
      success: function() {},
      cancel: function() {}
    })
  }
}
