Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../util/conf.js"), n = require("../util/util.js"), o = (require("../util/base64.js").Base64, 
{
    install: function(o) {
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        o.$http = function() {
            var t = o;
            return {
                post: function(n) {
                    var o = this;
                    return new Promise(function(i, c) {
                        var r = e.apiUrl, u = t.$http.concatCookie(n.cookie) || t.getCookie(n.url) + ";" + o.concatCookie(n.externalCookie || {});
                        n.config = n.config || {}, wx.request({
                            url: r + n.url,
                            method: n.method || "POST",
                            data: n.data || {},
                            header: Object.assign({
                                "content-type": "application/x-www-form-urlencoded",
                                cookie: u
                            }, n.config),
                            success: function(e) {
                                e.statusCode >= 200 && e.statusCode < 300 || 304 == e.statusCode ? i(e.data) : c(e);
                            },
                            fail: function(e) {
                                c(e), wx.redirectTo({
                                    url: "/pages/common/index"
                                });
                            }
                        });
                    });
                },
                concatCookie: function(e) {
                    var n = "";
                    for (var o in e) n += o + "=" + e[o] + ";";
                    return n;
                },
                checkSession: function() {
                    return new Promise(function(e, n) {
                        wx.checkSession({
                            success: function() {
                                e(!0);
                            },
                            fail: function() {
                                e(!1);
                            }
                        });
                    });
                },
                wxLogin: function() {
                    return new Promise(function(e, o) {
                        wx.login({
                            success: function(o) {
                                o.code ? e(o.code) : n.showTipsSwitchTab("用户授权失败", "/pages/index/index");
                            },
                            fail: function() {
                                wx.navigateTo({
                                    url: "/pages/common/authorize/index"
                                });
                            }
                        });
                    });
                },
                getWxUserInfo: function() {
                    return new Promise(function(e, n) {
                        wx.getUserInfo({
                            withCredentials: !0,
                            success: function(n) {
                                wx.setStorageSync("userInfo", n), e(n);
                            },
                            fail: function(n) {
                                e(null), wx.navigateTo({
                                    url: "/pages/common/authorize/index"
                                });
                            }
                        });
                    });
                }
            };
        }();
    }
});

exports.default = o;