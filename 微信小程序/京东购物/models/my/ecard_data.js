function e(r, n, c) {
    return o.getLoginPromise().then(function() {
        return new i(function(i, u) {
            var d = {
                pageNum: r,
                pageSize: n,
                validType: c,
                _t: Math.random()
            };
            t.get("http://wq.jd.com/user/info/GetGiftCardInfo", d, {
                success: function(r) {
                    s("getJDGiftCards.errorCode:" + r.errCode), s("getJDGiftCards.response:" + JSON.stringify(r)), 
                    13 != r.errCode ? 0 != r.errCode && 102 != r.errCode ? u(new Error("查询用户e卡信息失败")) : i(r) : o.doLogin().then(function() {
                        return e(d);
                    }).then(i, u);
                },
                fail: function(e) {
                    s("loadEcardData().fail: " + e), u(new Error("查询用户e卡信息失败"));
                }
            });
        });
    });
}

function r(e) {
    return o.getLoginPromise().then(function() {
        return new i(function(n, i) {
            var c = {
                key: e
            };
            t.get("//wq.jd.com/activeapi/batchjdgiftcard", c, {
                success: function(t) {
                    if (s("bindCard().errorCode: " + t.ret), 2 != t.ret) if (0 != t.ret) {
                        var c = {
                            5: "卡号有误",
                            6: "卡还未激活",
                            7: "该卡已绑定",
                            145: "操作频率过快，请晚点再试。"
                        }[t.ret];
                        n({
                            isSuccess: !1,
                            message: c || "绑定失败"
                        });
                    } else n({
                        isSuccess: !0,
                        message: ""
                    }); else o.doLogin().then(function() {
                        return r(e);
                    }).then(n, i);
                },
                fail: function(e) {
                    s("bindCard().errorCode: " + e), i(new Error("绑定京东e卡失败"));
                }
            });
        });
    });
}

function n(e) {
    var r = arguments;
    return o.getLoginPromise().then(function() {
        return new i(function(i, c) {
            var u = {
                sceneId: e
            };
            t.get("//wq.jd.com/pinbind/getpinflw", u, {
                success: function(e) {
                    if (s("getPinFlw().response.errorCode: " + e.errcode), 1001 === e.errcode) return o.doLogin().then(function() {
                        return n.apply(null, r);
                    }).then(i, c);
                    0 != e.errcode ? c(new Error("查询pin绑定状态失败，请重试")) : i(e);
                },
                fail: function(e) {
                    s("getPinFlw().fail.errorCode: " + e), c(new Error("查询pin绑定状态失败，请重试"));
                }
            });
        });
    });
}

var o = require("../../common/login/login.js"), t = require("../../common/http_json.js"), i = (require("../../common/log.js"), 
require("../../libs/promise.min.js")), s = getApp().debug("models/my/ecard");

module.exports = {
    getJDGiftCards: e,
    bindCard: r,
    getPinFlw: n
};