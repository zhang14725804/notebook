function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getSubscribeData = function(e) {
    return new t.default(function(t, i) {
        var n = {
            appid: a.default.appid,
            qipuId: e
        };
        wx.request({
            url: u + "/apis/wechat/miniapp/subscribe_count",
            data: n,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var a = e.data;
                a && "A00000" == a.code ? t(a) : i(a);
            },
            fail: function(e) {
                i(e);
            }
        });
    });
}, exports.getWechatCode = function() {
    return new t.default(function(e, t) {
        i.default.wxLogin().then(function(i) {
            var n = {
                appid: a.default.appid,
                code: i.code
            };
            wx.request({
                url: u + "/apis/wechat/miniapp/login",
                data: n,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(i) {
                    var a = i.data;
                    a && "A00000" == a.code ? e(a) : t(a);
                },
                fail: function(e) {
                    t(e);
                }
            });
        }, function(e) {
            t(e);
        });
    });
}, exports.liveSubscribe = function(e) {
    return new t.default(function(t, i) {
        if ("program" == e.area) var n = e.aid, o = e.rfr; else var n = "", o = "wx_live";
        var c = {
            appid: a.default.appid,
            formid: e.formid,
            "3rd_session": e.key,
            qipuId: e.qipuId,
            type: e.sendType,
            playUrl: "pages/liveVideo/liveVideo?qipuId=" + e.qipuId + "&aid=" + n + "&rfr=" + o,
            subscribeType: e.subscribeType
        }, d = r.default.getAuthcookie();
        d && Object.assign(c, {
            authcookie: d
        }), wx.request({
            url: u + "/apis/wechat/miniapp/subscribe",
            data: c,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var a = e.data;
                a && "A00000" == a.code ? t(a) : i(a);
            },
            fail: function(e) {
                i(e);
            }
        });
    });
}, exports.checkIfSubscribe = function(e, i) {
    return new t.default(function(t, n) {
        var r = {
            appid: a.default.appid,
            qipuIds: e.toString(),
            "3rd_session": i
        };
        wx.request({
            url: u + "/apis/wechat/miniapp/is_subscribe_multi",
            data: r,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var i = e.data;
                i && "A00000" == i.code ? t(i) : n(i);
            },
            fail: function(e) {
                n(e);
            }
        });
    });
}, exports.refreshCount = function(e) {
    return new t.default(function(t, i) {
        wx.request({
            url: o + "/jp/pc/" + e + "/?src=d846d0c32d664d32b6b54ea48997a589",
            method: "GET",
            success: function(e) {
                if ("200" == e.statusCode) {
                    var a = e.data;
                    a ? t(a) : i(e);
                } else i(e);
            },
            fail: i
        });
    });
};

var t = e(require("../polyfill/promise")), i = e(require("../login/index")), a = e(require("../login/constant")), n = e(require("../login/config")), r = e(require("../user/user")), u = n.default.subscribeHost, o = "https://cache.video.iqiyi.com";