function e(e, t) {
    var n = {};
    for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
    return n;
}

var t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../utils/promise-6.1.0")), n = require("../../../npm/@mtfe/mt-weapp-url/stringify.js"), r = require("../../../utils/cat.js").page, o = require("../../../utils/util.js"), i = require("../../../utils/lx.js"), u = getApp(), s = u.loginSdk.utils, a = s.request, f = s.showTip, c = s.getUserInfo, d = s.getLoginCode, h = {
    required: "1",
    optional: "0"
}, l = function(e) {
    return "" + e === h.required;
}, p = function(e) {
    return "" + e === h.optional;
};

r({
    data: {
        url: "",
        showWebview: !1,
        canIUseWebView: (0, o.canIUse)("web-view", !1)
    },
    onLoad: function(e) {
        return e = Object.keys(e).reduce(function(t, n) {
            return t[n] = decodeURIComponent(e[n]), t;
        }, {}), this.options = e, wx.showToast({
            title: "加载中...",
            icon: "loading"
        }), this.updateConfig(e).catch(function(e) {
            console.error("mt-group parse error: ", e);
        }).then(function(t) {
            var n = {
                custom: {
                    url: t || e.portm_id || e.scene || "null"
                }
            };
            u.lxPvReport(o.getCid(), n);
        });
    },
    getPortmConfig: function(e) {
        var n = Object.assign({}, e), r = n.portm_id, o = n.scene, i = r || o;
        return i ? a("https://portal-portm.meituan.com/weapp/group/webview?portm_id=" + i).then(function(e) {
            return Object.assign(n, e);
        }) : t.default.resolve(n);
    },
    updateConfig: function(e) {
        var n = this, r = e.needForm, o = void 0 !== r && r;
        return (e.forceLogin ? u.login() : t.default.resolve()).then().then(function() {
            return n.getPortmConfig(e).then(function(e) {
                return n.parseConfig(e);
            }).then(function(e) {
                return n.setData({
                    needForm: o,
                    url: e,
                    showWebview: !o
                }), e;
            });
        });
    },
    onShareAppMessage: function() {
        return this.shareParam;
    },
    setShareParam: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.options || {}, n = Object.assign({}, e);
        n.path || (n.path = "/" + (this.route || this.__route__) + "?" + Object.keys(t).map(function(e) {
            return e + "=" + t[e];
        }).join("&")), n.title || (n.title = this.title), this.shareParam = n;
    },
    getWxUserInfo: function() {
        var e = this;
        return c({}, !0).catch(function() {
            return f("请您授权用户信息后访问。").then(function() {
                return e.getWxUserInfo();
            });
        });
    },
    parseConfig: function(r) {
        var o = r.title, s = r.share, a = r.weburl, f = r.f_token, c = r.f_openId, h = r.f_wxUserInfo, g = r.f_utm, I = r.f_code, m = r.f_userId, v = r.hash, w = e(r, [ "title", "share", "weburl", "f_token", "f_openId", "f_wxUserInfo", "f_utm", "f_code", "f_userId", "hash" ]);
        o && (this.title = o, wx.setNavigationBarTitle({
            title: o
        })), this.setShareParam(s);
        var b = a && -1 === a.indexOf("https://") ? decodeURIComponent(a) : a, _ = u.globalData, j = [], O = {};
        l(f) || l(m) ? j.push(u.login().then(function() {
            l(f) && (O.token = _.token), l(m) && (O.userId = _.userId), O.userid = _.userId, 
            O.uuid = _.uuid;
        })) : (p(f) || p(m)) && j.push(u.getAuthInfo().then(function() {
            p(f) && (O.token = _.token), p(m) && (O.userId = _.userId), O.userid = _.userId;
        })), l(c) ? (O.openId = _.openId, O.openId || j.push(new t.default(function(e, t) {
            u.getOpenId(function(t) {
                O.openId = t, e();
            }, t);
        }))) : p(c) && (O.openId = _.openId);
        var x = _.userInfo && _.userInfo.userInfo;
        if (l(h) ? x ? Object.assign(O, x) : j.push(this.getWxUserInfo().then(function(e) {
            Object.assign(O, e.userInfo);
        })) : p(h) && Object.assign(O, x), l(g)) {
            var y = i.get("utm");
            y && Object.assign(O, y);
        }
        return t.default.all(j).then(function() {
            if (l(I)) return d().then(function(e) {
                O.code = e;
            });
        }).then(function() {
            return Object.assign(O, w), b + (b.indexOf("?") >= 0 ? "&" : "?") + (0, n.stringify)(O) + (v ? "#" + v : "");
        });
    },
    formSubmit: function(e) {
        var t = this;
        o.postFormId(e.detail.formId, "pingtai", function() {
            t.setData({
                showWebview: !0
            });
        });
    },
    getMessage: function(e) {
        var t = e.detail.data;
        console.log(t);
        var n = !0, r = !1, o = void 0;
        try {
            for (var i, u = t[Symbol.iterator](); !(n = (i = u.next()).done); n = !0) {
                var s = i.value;
                "share" === s.type && (this.shareParam = s.data);
            }
        } catch (e) {
            r = !0, o = e;
        } finally {
            try {
                !n && u.return && u.return();
            } finally {
                if (r) throw o;
            }
        }
    }
});