var t = require("../../utils/util"), e = require("../../index"), a = require("../../utils/timeFormat.js"), n = t.convertUrl, s = require("../../global/config"), o = void 0, i = !0, r = 0, u = 15, c = void 0, d = function(t) {
    var e = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/gi;
    return t.replace(/&nbsp;/g, " ").replace(/<br>/g, " ").replace(/\s/g, " ").replace(e, function() {
        return "[链接]";
    });
}, l = function(t) {
    var e = t.msg.content || {
        type: "text"
    }, a = "";
    switch (t.msg.status || "SUCCESS") {
      case "IMAGE_UPLOADING":
      case "SENDING":
        t.status = "sending";
        break;

      case "IMAGE_FAIL":
      case "FAIL":
        t.status = "fail";
    }
    switch (e.type) {
      case "text":
        a += d(e.msg) || "";
        break;

      case "tip":
        a += e.text;
        break;

      case "image":
        a += "[图片]";
        break;

      case "location":
        a += "[位置]";
        break;

      case "audio":
        a += "[语音]";
        break;

      case "call_audio":
        a += "[语音聊天]";
        break;

      case "call_video":
        a += "[视频聊天]";
        break;

      case "card":
      case "minicard":
        a += "[帖子]";
        break;

      default:
        a += "[消息格式暂不支持，请在客户端查看]";
    }
    t.lastMsg = a;
}, g = void 0, f = function() {
    i = !0, r = 0, u = 15, o && o.remove("sessionChanged", g), o && o.remove("unreadChanged", g);
};

Page({
    data: {
        sessionList: [],
        loadStatus: {
            showLoading: !0,
            loadInfo: ""
        },
        loginStatus: {
            isShow: !1,
            loginInfo: ""
        },
        imCount: 0
    },
    onLoad: function() {
        this.getImCount();
    },
    onShow: function() {
        var t = this, d = e.checkInit("sessions");
        if (d.isNeedRefreshPage) return f(), void wx.reLaunch({
            url: "sessions"
        });
        d.isShowLogoutBtn ? this.setData({
            loadStatus: {
                showLoading: !1
            },
            loginStatus: {
                isShow: !0,
                loginInfo: s.get("notloginInfo")
            }
        }) : this.setData({
            loginStatus: {
                isShow: !1
            }
        }), d.isInited && (o = e.sdk(), g = function() {
            var e = o.getAllSessions();
            0 !== e.length ? s.get("sessions-converter")(e, function(e) {
                r = e.length;
                var d = o.getAllUnreadAmount(), g = e.map(function(t) {
                    return {
                        user_id: t.user.user_id,
                        user_source: t.user.user_source
                    };
                });
                o.getContact(g, function(o) {
                    e.forEach(function(t) {
                        var e = t.user, i = e.user_id + "@" + e.user_source;
                        t.contact = o[i] || {}, t.unread = d[i] ? d[i] : 0;
                        var r = t.contact, u = r.avatar;
                        r.avatar = n(u ? u : s.get("default-avatar")), t.msg && t.msg.send_time || (t.msg = {
                            send_time: new Date().getTime()
                        });
                        var c = t.msg;
                        c.send_time = a.formatRecentTime(c.send_time), l(t);
                    }), t.setData({
                        sessionList: e,
                        loadStatus: {
                            showLoading: !1,
                            loadInfo: "加载成功！"
                        }
                    }), u > r && i && c(function(t) {
                        return i = t;
                    });
                });
            }) : t.setData({
                loadStatus: {
                    showLoading: !0,
                    loadInfo: "暂无会话列表~"
                }
            });
        }, o.listen("sessionChanged", g), o.listen("unreadChanged", g), c = function(e, a) {
            o.getSessions({}, function(t, a) {
                i = a, e && e(a);
            }, function() {
                t.setData({
                    loadStatus: {
                        showLoading: !0,
                        loadInfo: "加载失败,请重试~"
                    }
                }), a && a();
            });
        }, i && c(function(e) {
            setTimeout(function() {
                0 === t.data.sessionList.length && (e ? console.error("sessions查询接口未返回数据，但have_more为1") : t.setData({
                    loadStatus: {
                        showLoading: !0,
                        loadInfo: "暂无会话列表~"
                    }
                }));
            }, 5e3);
        }), o.getAllSessions().length > 0 && g());
    },
    onUnload: function() {
        f();
    },
    onReachBottom: function() {
        i && (this.setData({
            loadStatus: {
                showLoading: !0,
                loadInfo: ""
            }
        }), c(function(t) {
            return i = t;
        }));
    },
    onGoLogin: function() {
        e.handleLogin();
    },
    onGoChat: function(t) {
        wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    goToFriend: function(t) {
        wx.navigateTo({
            url: t.currentTarget.dataset.url
        }), this.setData({
            imCount: 0
        });
    },
    getImCount: function() {
        var t = this;
        wx.request({
            url: "https://imwx.58.com/im/message/new/count",
            data: {
                thirdKey: wx.getStorageSync("wxThirdKey").thirdKey,
                callback: "callback"
            },
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log("默契匹配msg", e);
                var a = e.data;
                t.setData({
                    imCount: parseInt(a.substring(a.indexOf("data") + 6, a.indexOf(",")))
                });
            }
        });
    }
});