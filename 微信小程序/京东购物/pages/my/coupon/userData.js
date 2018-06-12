function n() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = getCurrentPages(), i = e[e.length - 1];
    return new c(function(e, c) {
        o.getLoginPromise().then(function() {
            r({
                url: "https://wq.jd.com/pinbind/getpinflw",
                data: {
                    rurl: "/" + i.route,
                    sceneid: t
                }
            }).then(function(r) {
                var i = r.body;
                0 == i.errcode ? e(i) : 1001 == i.errcode ? o.doLogin().then(function() {
                    n(t).then(function(n) {
                        e(n);
                    }).catch(function(n) {
                        c(n.errMsg || "网络请求失败，请稍后再试");
                    });
                }).catch(function(n, t) {
                    c(t || "登录出错，请稍后再试");
                }) : c(i.errMsg || "查询用户账户状态失败，请重试");
            }).catch(function(n) {
                c(n.errMsg || "网络请求失败，请稍后再试");
            });
        }).catch(function(n, t) {
            c(t || "登录出错，请稍后再试");
        });
    });
}

function t() {
    return new c(function(n, e) {
        o.getLoginPromise().then(function() {
            r({
                url: "https://wq.jd.com/vipplus/VerifyAuthUser"
            }).then(function(c) {
                var r = c.body;
                13 == r.retcode ? o.doLogin().then(function() {
                    t().then(function(t) {
                        n(t);
                    }).catch(function(n) {
                        e(n.errMsg || "网络请求失败，请稍后再试");
                    });
                }).catch(function(n, t) {
                    e(t || "登录出错，请稍后再试");
                }) : n(r);
            }).catch(function(n) {
                e(n.msg || "网络请求失败，请稍后再试");
            });
        }).catch(function(n, t) {
            e(t || "登录出错，请稍后再试");
        });
    });
}

function e(n) {
    var t = getCurrentPages(), i = t[t.length - 1];
    return new c(function(t, c) {
        o.getLoginPromise().then(function() {
            r({
                url: "https://wq.jd.com/vipplus/LoginBrigdeAuthName",
                data: {
                    scene: "weixin",
                    bussinessType: n || 533,
                    rurl: "/" + i.route
                }
            }).then(function(r) {
                var i = r.body;
                0 == i.retcode || 45 == i.retcode ? t(i) : 13 == i.retcode ? o.doLogin().then(function() {
                    e(n).then(function(n) {
                        t(n);
                    }).catch(function(n) {
                        c(n.errMsg || "网络请求失败，请稍后再试");
                    });
                }).catch(function(n, t) {
                    c(t || "登录出错，请稍后再试");
                }) : c("活动太火爆了，请稍后再试~");
            }).catch(function(n) {
                c(n.errMsg || "网络请求失败，请稍后再试");
            });
        }).catch(function(n, t) {
            c(t || "登录出错，请稍后再试");
        });
    });
}

var c = require("../../../libs/promise.min"), o = require("../../../common/login/login.js"), r = require("../../../common/request/request.js");

module.exports = {
    queryBindStatus: n,
    verifyAuthUser: t,
    loginBrigdeAuthName: e
};