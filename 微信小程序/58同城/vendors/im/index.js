var e = require("./sdk/index"), t = require("./utils/util"), s = (require("./utils/encrypt"), 
require("./utils/extend")), i = require("./global/config"), n = null, r = null, o = 0, u = {}, a = {}, c = "", d = null, g = !1, p = function(e, t) {
    switch (e) {
      case "redirectTo":
        wx.redirectTo({
            url: t
        });
        break;

      case "navigateBack":
        wx.navigateBack({
            url: t
        });
        break;

      case "switchTab":
        wx.switchTab({
            url: t
        });
        break;

      case "reLaunch":
        wx.reLaunch({
            url: t
        });
        break;

      case "navigateTo":
      default:
        wx.navigateTo({
            url: t
        });
    }
}, l = function(e) {
    var t = {
        code: e
    };
    switch (e) {
      case 1:
        t.msg = "未登录";
        break;

      case 2:
        t.msg = "参数错误";
        break;

      case 3:
        t.msg = "im-token非法";
        break;

      case 4:
        t.msg = "接口调起异常";
        break;

      case 5:
        t.msg = "im未初始化";
        break;

      case 6:
        t.msg = "登录账户切换";
        break;

      default:
        t.msg = "其他错误", t.code = 0;
    }
    return console.log("发送错误", t), t;
}, f = function(e) {
    return e + "" == "null" || e + "" == "undefined" || "" === e;
}, k = function(e) {
    if (!a || !a.options || !a.options.initOpts) return a.error && a.error(l(2)), !1;
    if (!_()) return !1;
    var t = r ? r.user_id + "@" + r.user_source : null, s = a.options, i = s.initOpts && s.initOpts.sdk && s.initOpts.sdk.user_id && s.initOpts.sdk.source ? s.initOpts.sdk.user_id + "@" + s.initOpts.sdk.source : null;
    return !(!t || !i || t !== i) || (this.init(a.options.initOpts), a.success && a.success(), 
    !0);
}, _ = function() {
    var e = !1, t = a.options.initOpts;
    if (a.options && a.options.loginStatusKey) {
        var s = wx.getStorageSync(a.options.loginStatusKey);
        f(s) || (e = !0);
    } else f(t) || f(t.sdk) || f(t.sdk.user_id) || f(t.sdk.source) || f(t.sdk.im_token) || (e = !0);
    return e;
}, m = function() {
    if (a.options && a.options.loginStatusKey) {
        var e = wx.getStorageSync(a.options.loginStatusKey);
        if (!f(e)) {
            var t = e.split("&")[0].split("UID=")[1] ? e.split("&")[0].split("UID=")[1] : e;
            g = !(!d || d === t), d = t;
        }
    }
    return g;
}, h = function(e) {
    var t = e.options, s = t.initOpts && t.initOpts.sdk && t.initOpts.sdk.getNewToken ? t.initOpts.sdk.getNewToken : null;
    s && (t.initOpts.sdk.getNewToken = function(n) {
        e.error && e.error(l(3)), s(function(e) {
            if (n(e), c + "" != e + "" && t.pageName + "" == "sessions") {
                var s = i.get("im-absolute-path") + "/pages/sessions/sessions";
                p("reLaunch", s), c = e;
            }
        });
    });
};

module.exports = {
    init: function(t) {
        if (!n || !t.sdk || r.user_id + "@" + r.user_source != t.sdk.user_id + "@" + t.sdk.source) {
            h(a);
            var o = t.sdk, u = t.ui, c = {
                user_id: "",
                source: "",
                client_version: "",
                im_token: "",
                device_id: "",
                appid: "",
                ws: "",
                api: "",
                getNewToken: function(e) {
                    e("todo");
                }
            };
            s(c, o), i.set(u), n = null, (n = new e(c)).start(), r = {
                user_id: c.user_id,
                user_source: c.source
            };
            n.listen("unreadChanged", function() {
                if (n) {
                    var e = n.getAllUnreadAmount(), t = 0;
                    for (var s in e) t += e[s];
                    i.get("on-unreadMsgChanged")(t);
                }
            }), n.listen("referChanged", function(e) {
                i.get("on-referChanged")(e);
            });
        }
    },
    sdk: function() {
        return n;
    },
    me: function() {
        return r;
    },
    getChatViewHeight: function() {
        return o || (wx.getSystemInfo({
            success: function(e) {
                o = e.windowHeight;
            }
        }), o);
    },
    gotoSessions: function(e, t, s) {
        var n = e ? e.router_type : "navigateTo", r = i.get("im-absolute-path") + "/pages/sessions/sessions";
        p(n, r), t && t();
    },
    goToChat: function(e, t, s) {
        if (f(e) || f(e.user_id) || f(e.user_source)) return s && s(l(2));
        n && !f(e.refer) && n.setRefer(e.user_id, e.user_source, e.refer);
        var r = i.get("im-absolute-path") + "/pages/chat/chat?userid=" + e.user_id + "&usersource=" + e.user_source;
        p(e.router_type, r), t && t();
    },
    setTopic: function(e, t, s) {
        if (s) {
            u[e + "@" + t] = s;
            var i = getCurrentPages(), n = i[i.length - 1], r = n.immeta;
            r && "chat" === r.name && n.setTopic({
                user_id: e,
                user_source: t
            }, s);
        }
    },
    getTopic: function(e) {
        return u[e.user_id + "@" + e.user_source];
    },
    gotoIM: function(e, t, s) {
        a = {
            options: e,
            success: t,
            error: s
        };
        var n = e.initOpts && e.initOpts.ui ? e.initOpts.ui : null;
        n && i.set(n), i.set(n), e.pageName + "" == "chat" ? this.goToChat(e.pageOpts, t, s) : e.pageName + "" == "sessions" && this.gotoSessions(e.pageOpts, t, s);
    },
    getUnreceviedMsgNum: function(e, s, i) {
        if (n) {
            !function(e, t) {
                n.getUnreceviedMsgNum(function(t) {
                    e && e(t);
                }, function(e) {
                    e && e(l(4));
                });
            }(s);
        } else {
            if (f(e) || f(e.im_token)) return i && i(l(1));
            !function(e, s, i) {
                var n = e.api + "/msg/get_total_unread_msg_count", r = wx.getSystemInfoSync(), o = {
                    user_id: e.user_id,
                    source: e.source,
                    client_version: "1.4.4.0",
                    os_type: r.model,
                    os_version: r.system,
                    sdk_version: 4630,
                    device_id: "",
                    im_token: e.im_token,
                    appid: e.appid,
                    client_type: "weapp"
                }, u = n + "?" + t.param(o, !1);
                wx.request({
                    url: u,
                    method: "GET",
                    dataType: "json",
                    success: function(e) {
                        switch ((e = e.data).error_code) {
                          case 0:
                            s && s(e.data);
                            break;

                          default:
                            i && i(e);
                        }
                    },
                    fail: function(e) {
                        i && i(e);
                    }
                });
            }(e, s, i);
        }
    },
    initTabBarIMOptions: function(e, t, s) {
        var n = e.initOpts && e.initOpts.ui ? e.initOpts.ui : null;
        n && i.set(n), a = {
            options: e,
            success: t,
            error: s
        };
    },
    checkInit: function(e) {
        var t = {};
        return t.isNeedRefreshPage = m(), g ? (a.error && a.error(l(6)), i.get("on-loginUserChanged")(), 
        t) : (t.isShowLogoutBtn = !_(), t.isInited = k.call(this, e), t);
    },
    handleLogin: function() {
        a.error && a.error(l(1)), i.get("on-notlogin")();
    }
};