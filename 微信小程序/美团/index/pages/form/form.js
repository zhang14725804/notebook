function t(t) {
    if (Array.isArray(t)) {
        for (var n = 0, e = Array(t.length); n < t.length; n++) e[n] = t[n];
        return e;
    }
    return Array.from(t);
}

function n(t, n) {
    var e = {};
    for (var o in t) n.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
    return e;
}

var e = Object.assign || function(t) {
    for (var n = 1; n < arguments.length; n++) {
        var e = arguments[n];
        for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
    }
    return t;
}, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, r = require("../../../npm/@mtfe/mt-weapp-url/stringify.js"), i = require("../../../utils/util.js"), a = require("../../../utils/lx.js"), s = getApp(), c = s.loginSdk, l = c.utils.request, u = {
    wxMobileLogin: "wxMobileLogin",
    wxLogin: "wxLogin"
};

Page({
    data: {
        LOGIN_TYPE: u,
        show: !1,
        go: {},
        noticeList: [],
        isFormShow: !1
    },
    btnConfig: {},
    errMsg: "",
    shareParam: {
        title: "分享",
        path: "/index/pages/mt/mt"
    },
    getLoginCode: function() {
        var t = this;
        return this.applyActions(this.data.go.actions), c.utils.getLoginCode().then(function(n) {
            t.loginCode = n;
        });
    },
    loginSuccess: function(t) {
        t && s.saveLoginData(t), this.applyActions(this.data.afterLogin);
    },
    wxMobileLogin: function(t) {
        var n = this, e = t.detail;
        null != e.iv ? (a.moduleClick("b_mqguky8z", {
            feedback: "允许"
        }), c.wxMobileLogin(e, this.loginCode, !0).then(function(t) {
            t && n.loginSuccess(t);
        })) : a.moduleClick("b_mqguky8z", {
            feedback: "不允许"
        });
    },
    getConfig: function(t) {
        return l("https://portal-portm.meituan.com/weapp/group/activity?type=" + t);
    },
    getUserInfo: function() {
        return new Promise(function(t, n) {
            wx.getUserInfo({
                success: function(n) {
                    t(n.userInfo), a.moduleClick("b_mo0l5bzo", {
                        feedback: "允许"
                    });
                },
                fail: function() {
                    n(), a.moduleClick("b_mo0l5bzo", {
                        feedback: "不允许"
                    });
                }
            });
        });
    },
    postFormId: i.postFormId,
    getVar: function(t) {
        var n = t.split("."), e = n[0], o = this[e] || s.globalData[e];
        return o ? n.length > 1 ? n.slice(1).reduce(function(t, n) {
            return t ? t[n] : null;
        }, o) || "" : o : "";
    },
    resolveVar: function(t) {
        var n = t.type, e = t.value;
        return "var" === n ? this.getVar(e) : e;
    },
    resolveVars: function(t) {
        var n = this;
        return null == t ? null : "object" !== (void 0 === t ? "undefined" : o(t)) ? t : Object.keys(t).reduce(function(e, o) {
            var r = t[o];
            return r && r.type && null != r.value ? e[o] = n.resolveVar(r) : e[o] = n.resolveVars(r), 
            e;
        }, {});
    },
    extractQuery: function(t, n) {
        return n ? t + (t.indexOf("?") > 0 ? "&" : "?") + (0, r.stringify)(this.resolveVars(n)) : t;
    },
    shareActionHandler: function(t) {
        var o = this, r = t.path, i = t.query, a = t.callback, s = n(t, [ "path", "query", "callback" ]);
        this.shareParam = e({}, s, {
            path: this.extractQuery(r, i),
            success: function() {
                o.applyActions(a);
            }
        });
    },
    wxActionHandler: function(t) {
        var n = t.api, e = t.args, o = wx[n];
        o && (e ? o.call(wx, this.resolveVars(e) || {}) : o.call(wx));
    },
    requestActionHandler: function(t) {
        var n = this, e = t.url, o = t.query, r = t.data, i = t.body, a = t.type, s = t.method, c = t.header, u = t.callback;
        return l(e, {
            method: s,
            type: a,
            header: c,
            query: this.resolveVars(o),
            data: this.resolveVars(r || i)
        }).then(function(t) {
            return u ? (wx.hideLoading(), console.log("请求", t), n.applyActions(u, t)) : null;
        });
    },
    setVarActionHandler: function(t) {
        var n = t.src;
        this[t.name] = this.resolveVar(n);
    },
    customActionHandler: function(t) {
        for (var n = t.name, e = this.getVar(n), o = arguments.length, r = Array(o > 1 ? o - 1 : 0), i = 1; i < o; i++) r[i - 1] = arguments[i];
        return "function" == typeof e ? e.apply(this, r) : null;
    },
    appActionHandler: function(t) {
        for (var n = this, e = arguments.length, o = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) o[r - 1] = arguments[r];
        var i = t.name, a = t.type, c = s[i];
        return "function" == typeof c ? a && "callback" === a ? new Promise(function(t) {
            c.call.apply(c, [ n, t ].concat(o));
        }) : c.apply(this, o) : null;
    },
    lxActionHandler: function(t) {
        var n = this, e = t.method, o = t.val_bid, r = t.val_cid, i = t.val_lab, s = a[e];
        "function" == typeof s && setTimeout(function() {
            s.call(a, n.resolveVars(o || r), n.resolveVars(i));
        }, 0);
    },
    portmActionHandler: function(n) {
        for (var e = this, o = arguments.length, r = Array(o > 1 ? o - 1 : 0), i = 1; i < o; i++) r[i - 1] = arguments[i];
        var a = n.url, s = n.type, c = void 0 === s ? "json" : s, u = n.method, h = void 0 === u ? "POST" : u, p = n.data, f = void 0 === p ? r[0] : p;
        return l(a, {
            method: h,
            type: c,
            data: f
        }).then(function(n) {
            if (n) {
                var o = n.actions, r = n._args, i = void 0 === r ? [] : r;
                return e.applyActions.apply(e, [ o ].concat(t(i)));
            }
            return null;
        });
    },
    applyAction: function(t) {
        for (var n = t.param, e = arguments.length, o = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) o[r - 1] = arguments[r];
        switch (t.type) {
          case "set-share":
            return this.shareActionHandler(n);

          case "wx":
            return this.wxActionHandler(n);

          case "request":
            return this.requestActionHandler(n);

          case "set-var":
            return this.setVarActionHandler(n);

          case "custom":
            return this.customActionHandler.apply(this, [ n ].concat(o));

          case "portm":
            return this.portmActionHandler.apply(this, [ n ].concat(o));

          case "app":
            return this.appActionHandler.apply(this, [ n ].concat(o));

          case "lx":
            return this.lxActionHandler(n);
        }
        return function() {};
    },
    applyActions: function(t) {
        for (var n = this, e = arguments.length, o = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) o[r - 1] = arguments[r];
        var i = Promise.resolve();
        return Array.isArray(t) ? t.reduce(function(t, e) {
            return e ? t.then(function() {
                return n.applyAction.apply(n, [ e ].concat(o));
            }) : t;
        }, i) : i;
    },
    onShareAppMessage: function() {
        return this.shareParam;
    },
    formSubmit: function(t) {
        var n = this, e = t.detail.formId;
        this.formId = e, "abnormal" === this.data.go.type && wx.showToast({
            title: this.errMsg,
            icon: "none"
        }), this.postFormId(e, "pingtai", function() {
            return n.applyActions(n.data.go.actions);
        });
    },
    onShow: function() {
        this.data.onShow && this.applyActions(this.data.onShow);
    },
    wxLogin: function() {
        var t = this;
        s.login().then(function(n) {
            return t.loginSuccess(n);
        }, function() {
            return wx.navigateBack();
        });
    },
    loadLoginHandler: function(t) {
        var n = this;
        s.getAuthInfo().then(function() {
            s.globalData.userId ? n.loginSuccess() : n.setData({
                isFormShow: !0
            });
        });
    },
    switchButton: function(t) {
        if (this.data.go.index !== t) if (this.btnConfig[t]) this.setData({
            go: this.btnConfig[t]
        }); else {
            var o = this.data.button, r = o.subs, i = o.style, a = void 0 === i ? "" : i, s = o.actions, c = void 0 === s ? [] : s, l = n(o, [ "subs", "style", "actions" ]), u = e({
                style: a
            }, l), h = r && r[t];
            if (h) {
                var p = h.style, f = h.actions, d = n(h, [ "style", "actions" ]);
                p && (u.style += p), f && f.length && (u.actions = c.concat(f)), Object.assign(u, d);
            }
            this.setData({
                go: this.btnConfig[t] = u
            });
        }
    },
    onLoad: function(t) {
        var n = this;
        wx.showLoading({
            title: "加载中..."
        }), this.options || (this.options = t);
        var e = t.type, o = t.scene, r = e || o;
        this.type = decodeURIComponent(r), this.options.type = this.type, this.getConfig(r).then(function(t) {
            var e = t.onLoad, o = t.login, r = t.button, i = t.title, a = t.lib;
            t.swiper, t.userPhoto;
            n.title = i, wx.setNavigationBarTitle({
                title: i
            }), n.extendLib = a ? require(a) : {}, Object.assign(n, n.extendLib), n.applyActions(e), 
            n.setData(t), r && n.switchButton(0), n.data.go.loginType === u.wxMobileLogin && n.getLoginCode(), 
            n.loadLoginHandler(o), n.getUserInfo().then(function(e) {
                var o = e.avatarUrl;
                e.nickName && (n.shareParam.title = e.nickName + n.shareParam.title), Object.assign(t.userPhoto, {
                    avatarUrl: o
                }), n.setData({
                    userPhoto: t.userPhoto
                });
            });
        });
    }
});