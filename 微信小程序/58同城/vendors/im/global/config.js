var n = {};

n["default-avatar"] = "https://pic1.58cdn.com.cn/p1/n_v1bkuymc2tsxlfo5wrgb7a.png", 
n["msg-show-converter"] = function(n) {
    return n;
}, n["msg-send-converter"] = function(n) {
    return n;
}, n["session-msg-converter"] = function(n) {
    return null;
}, n["msg-avatar"] = !0, n.stat = {
    appversion: "1.0",
    appid: "123",
    appkey: "abcdefg",
    cookiename: "wmda",
    pn: "demo",
    reportIntervalTime: 5,
    reportIntervalCount: 3
}, n["msg-sound"] = "https://wx.qq.com/zh_CN/htmledition/v2/sound/msg.mp3", n["default-card-img"] = "https://pic3.58cdn.com.cn/nowater/webim/big/n_v1bl2lwxtpeksfrr3aea3q.png", 
n.getUserinfo = function() {}, n["default-source"] = "", n["bind-cellphone"] = function() {}, 
n["on-contactchange"] = function(n, t) {}, n["on-chatwindowcreate"] = function(n, t) {}, 
n["sessions-converter"] = function(n, t) {
    t(n);
}, n["on-notlogin"] = function() {
    wx.redirectTo({
        url: "/passport/pages/login/login"
    });
}, n["im-absolute-path"] = "/im", n["on-topic-click"] = function(n) {}, n["on-msg-sent"] = function(n) {}, 
n.notloginInfo = {
    img: "https://pic3.58cdn.com.cn/nowater/webim/big/n_v1bl2lwxtpeksfrr3aea3q.png",
    tip: "登录聊天更顺畅"
}, n["on-loginUserChanged"] = function() {}, n["on-unreadMsgChanged"] = function(n) {}, 
n["on-referChanged"] = function() {}, module.exports = {
    set: function(t) {
        Object.assign(n, t);
    },
    get: function(t) {
        return n[t];
    }
};