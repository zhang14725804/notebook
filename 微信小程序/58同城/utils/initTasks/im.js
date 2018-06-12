var e = Object.assign || function(e) {
    for (var n = 1; n < arguments.length; n++) {
        var o = arguments[n];
        for (var t in o) Object.prototype.hasOwnProperty.call(o, t) && (e[t] = o[t]);
    }
    return e;
}, n = require("../../vendors/im/index"), o = void 0, t = {
    init: function(e) {
        (o = e).eventHandle.on([ "goto-chat" ], this.goToChatHandle.bind(this, !1)), o.eventHandle.on([ "init-session-tabbar" ], this.initSessionHandle.bind(this, !0));
    },
    _cacheToken: null,
    getToken: function(e) {
        return new Promise(function(n) {
            e && t._cacheToken ? n(t._cacheToken) : o.request("/chat/token").then(function(e) {
                if (!e.error) {
                    var o = e.data.token;
                    t._cacheToken = o, wx.setStorageSync("user-token", o), console.log("chat/token>>>>>", o), 
                    n(o);
                }
            });
        });
    },
    goToHandle: function(e, i, c) {
        var s = o.getUID();
        console.log("goToHandle>>uid>>", s);
        var a = {
            initOpts: {
                sdk: {
                    user_id: s,
                    source: 2,
                    appid: o.constData.imAppId,
                    im_token: c.token,
                    client_version: "1.0.0",
                    ws: o.weappEnv.isProd ? "wss://imgets.58.com/websocket" : "wss://integrateimgets.58.com/websocket",
                    api: o.weappEnv.isProd ? "https://im.58.com" : "https://integrateim.58.com",
                    getNewToken: function(e) {
                        t.getToken().then(function(n) {
                            e(n);
                        });
                    }
                },
                ui: {
                    "notlogin-img": "",
                    "im-absolute-path": "/vendors/im",
                    "on-notlogin": function() {
                        console.log("on-notlogin"), t.goToChatHandle(!0);
                    },
                    "on-loginUserChanged": function() {
                        console.log("change user.."), wx.removeStorageSync("user-token"), t.initSessionHandle(!0);
                    },
                    "on-msg-sent": function(e) {
                        var n = e.formId;
                        o.doLogClick({
                            pagePath: "im",
                            pageName: "im",
                            clickName: "sendMessage",
                            clickType: "im",
                            formId: n
                        });
                    },
                    "on-unreadMsgChanged": function(e) {
                        o.eventHandle.emit("chat-receive-msg", e);
                    },
                    notloginInfo: {
                        img: "https://img.58cdn.com.cn/weixin/img/wechat-app/no-login@2x.png?c=1",
                        tip: "登录聊天更顺畅"
                    }
                }
            },
            pageName: e ? "sessions" : "chat",
            pageOpts: {
                user_id: c.userId,
                user_source: 2
            },
            loginStatusKey: "ppu"
        };
        a.initOpts.sdk.getNewToken = i ? function(e) {
            c.token || wx.getStorageSync("user-token");
            t.getToken().then(function(n) {
                return e(n);
            });
        } : function(e) {
            t.getToken().then(e);
        };
        var r = [ a ];
        i ? c.resolve && c.reject && r.push(c.resolve, c.reject) : r.push(function() {
            console.log("已登录&已调用");
        }, function(e) {
            console.log("未登录，以及登录后的回调。。。。", e), t.goToChatHandle(!0);
        }), console.log("imArgs>>>>", r), n[i ? "gotoIM" : "initTabBarIMOptions"].apply(n, r);
    },
    goToChatHandle: function(n) {
        var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return console.log("goToChatHandle>>>>>", n, i), new Promise(function(e) {
            console.log("step1"), o.eventHandle.emit("check-login", function() {
                console.log("step2"), o.eventHandle.emit("check-setting", function() {
                    console.log("step3"), o.eventHandle.emit("check-ppu", e);
                });
            });
        }).then(function() {
            new Promise(function(c, s) {
                setTimeout(function() {
                    o.storage.setSync("pagetype", "");
                }, 1e3), t.getToken(!0).then(function(o) {
                    i = e({}, i, {
                        token: wx.getStorageSync("user-token"),
                        resolve: c,
                        reject: s
                    }), t.goToHandle(n, !0, i);
                });
            }).then(function() {
                console.log("进入了微聊");
            }).catch(function(e) {
                console.error("进入微聊发生错误", e);
            });
        });
    },
    initSessionHandle: function(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
            token: wx.getStorageSync("user-token")
        };
        return console.log("微聊初始化"), new Promise(function(i, c) {
            setTimeout(function() {
                o.storage.setSync("pagetype", "");
            }, 1e3), t.goToHandle(e, !1, n);
        }).then(function() {
            console.log("初始化完成");
        }).catch(function(e) {
            console.error("初始化发生错误", e);
        });
    }
};

module.exports = t;