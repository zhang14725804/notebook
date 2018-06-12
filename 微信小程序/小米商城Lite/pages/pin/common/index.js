function o(o) {
    return new Promise(function(e, i) {
        n.request("groupon/subscibe", {
            action: o.action
        }, function(n, r) {
            if (r) "query" !== o.action ? t.showError(r.desc || "服务异常请稍后再试,或下载小米商城APP") : i(); else if ("query" == o.action) e(n.data); else {
                n && n.data;
                e(n.data);
            }
        });
    });
}

var t = require("../../../util/util.js"), n = getApp();

module.exports = {
    wxPay: function(o) {
        o && (t.showLoading(), n.request("groupon/paybankgo", {
            order_id: o.orderId,
            pay_type: "weixin_little",
            quick_order: 1
        }, function(e, i) {
            var r = "../result/index?orderId=" + o.orderId + "&projectId=" + o.projectId + "&groupId=" + o.groupId, a = (o.goodsNum, 
            o.mode || "");
            t.hideLoading(), i ? wx.redirectTo({
                url: r + "&res=0&mode=" + a
            }) : wx.requestPayment({
                timeStamp: e.data.timeStamp + "",
                nonceStr: e.data.nonceStr,
                package: e.data.package,
                signType: "MD5",
                paySign: e.data.paySign,
                success: function(o) {
                    if (e.data.package) {
                        var t = e.data.package.replace("prepay_id=", "");
                        n.request("rebate/reportFormId", {
                            form_id: t,
                            origin: "pin",
                            types: "pay"
                        }, function(o, t) {});
                    }
                    wx.redirectTo({
                        url: r + "&res=1"
                    });
                },
                fail: function(o) {
                    wx.redirectTo({
                        url: r + "&res=0"
                    });
                }
            });
        }));
    },
    countdown: function(o) {
        var t = function() {};
        return t.prototype = {
            init: function(o, t, n, e) {
                var i = t || new Date().getTime() / 1e3, r = (o || 0) - i;
                r <= 0 || (this.countdownTimer = null, this.callback = n, this.timeupCallback = e, 
                this.timer(r));
            },
            numStr: function(o) {
                return o >= 10 ? o : "0" + o;
            },
            timer: function(t) {
                var n = this, e = void 0, i = void 0, r = void 0, a = void 0, c = void 0, u = {};
                t > 0 ? (e = Math.floor(t % 60 % 1 * 10), i = Math.floor(t % 60), r = Math.floor(t / 60 % 60), 
                a = Math.floor(t / 3600 % 24), (c = Math.floor(t / 86400) > 0 ? Math.ceil(t / 86400) : 0) > 1 && "floor" == o && (c = Math.floor(t / 86400), 
                a = Math.floor((t - 86400 * c) / 3600 % 24), r = Math.floor((t - 86400 * c - 3600 * a) / 60 % 60), 
                i = Math.floor((t - 86400 * c - 3600 * a - 60 * r) % 60), e = Math.floor((t - 86400 * c - 3600 * a - 60 * r - i) % 1 * 10)), 
                u = {
                    d: n.numStr(c),
                    h: n.numStr(a),
                    m: n.numStr(r),
                    s: n.numStr(i) + "." + e
                }, n.callback && n.callback(u, n.index), n.countdownTimer && clearTimeout(n.countdownTimer), 
                n.countdownTimer = setTimeout(function() {
                    t -= .1, n.timer(t);
                }, 100)) : (n.countdownTimer && clearTimeout(n.countdownTimer), n.timeupCallback && n.timeupCallback());
            },
            stop: function() {
                this.countdownTimer && clearTimeout(this.countdownTimer);
            }
        }, new t();
    },
    book: o,
    toggleBook: function(t) {
        return new Promise(function(n, e) {
            wx.showModal({
                title: t.bookInfo.title,
                content: t.bookInfo.sub_title,
                cancelText: t.bookInfo.button_default,
                cancelColor: "#ccc",
                confirmText: t.bookInfo.button_action,
                confirmColor: "#fd5c01",
                success: function(e) {
                    e.confirm ? "sub" != t.action && "unsub" != t.action || o(t).then(function(o) {
                        n({
                            bookInfo: o,
                            action: t.action
                        });
                    }) : e.cancel && n(null);
                }
            });
        });
    },
    goMicard: function(o) {
        function e() {
            t.showLoading(), n.ssoLogin(!0, function() {
                t.hideLoading();
            });
        }
        var i = n.storageData.vid || "";
        n.doLogin().then(function(r) {
            i ? e() : n.loginProxy({
                url: o,
                login: "m.mi.com"
            }, function(o, n) {
                n ? t.showError("服务异常，请稍后再试～") : o && o.location && wx.navigateTo({
                    url: "/pages/webview/index?url=" + encodeURIComponent(o.location)
                });
            });
        });
    },
    bannerGo: function(o) {
        if (o && o.path) {
            var e = t.getBannerUrl(o);
            e && n.$router.goTo(e);
        }
    }
};