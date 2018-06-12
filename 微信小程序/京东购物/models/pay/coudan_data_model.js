function e(e, i, n) {
    var o = {};
    o.url = e, o.data = i, s.get(o).then(function(e) {
        var i = e.body;
        return n.success(i);
    }, n.fail);
}

function i(e, n) {
    var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
    return new c(function(c, r) {
        t.getLoginPromise().then(function(a) {
            o.get(e, n, {
                success: function(o) {
                    if (o && 0 != Object.keys(o).length) if (13 == o.errId) {
                        if (s >= 1) return void r({
                            code: 77713,
                            message: "登录失败或用户未授权"
                        });
                        t.doLogin().then(function() {
                            c(i(e, n, ++s));
                        }, function(e) {
                            r({
                                code: e,
                                message: "登录失败或用户未授权"
                            });
                        });
                    } else c(o); else r({
                        code: -1,
                        message: "抱歉，请求数据出错"
                    });
                },
                fail: function(e) {
                    var i = e.code, n = e.message;
                    r({
                        code: i,
                        message: n
                    });
                }
            });
        }).catch(function(e) {
            var i = e.code, n = e.message;
            r({
                code: i,
                message: n
            });
        });
    });
}

var n = require("../../common/cookie-v2/cookie.js"), s = require("../../common/request/request.js"), o = require("./pay_request.js"), t = require("../../common/login/login.js"), c = require("../../libs/promise.min.js"), r = {
    cfp_item: "https://diviner.jd.com/diviner",
    cfp: "https://wq.jd.com/deal/massit/getcoudanfreightandprice"
};

module.exports = {
    loadCfpItems: function(i) {
        var s = {
            hi: JSON.stringify({
                max: i.max,
                min: i.min,
                area: i.area,
                wt: i.wt,
                fr: 0
            }),
            p: "635025",
            uuid: n.getCookie("visitkey") || -1,
            skus: i.skulist,
            lid: 1,
            ec: "utf-8",
            lim: "50",
            ro: "",
            sp: "",
            pin: "",
            c3: "",
            fe: "",
            fne: "",
            c2: "",
            t: Math.random()
        };
        return new c(function(i, n) {
            t.getLoginPromise().then(function(o) {
                e(r.cfp_item, s, {
                    success: function(e) {
                        e && 0 != Object.keys(e).length ? e.success ? i(e) : n({
                            code: -2,
                            message: e.error_msg
                        }) : n({
                            code: -1,
                            message: "抱歉，请求数据出错"
                        });
                    },
                    fail: function(e) {
                        var i = e.code, s = e.message;
                        n({
                            code: i,
                            message: s
                        });
                    }
                });
            }).catch(function(e) {
                var i = e.code, s = e.message;
                n({
                    code: i,
                    message: s
                });
            });
        });
    },
    getCoudanFreightAndPrice: function(e, n) {
        var s = {
            locationid: e.replace(/_/g, "-"),
            freightconfig: "0_0_" + n.join("^").replace(/_/g, ";"),
            userlevel: "",
            freightType: 0,
            reg: "1",
            r: Math.random()
        };
        return i(r.cfp, s);
    }
};