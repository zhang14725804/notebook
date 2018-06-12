function e(s, d) {
    var c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
    return new o(function(o, u) {
        i.getLoginPromise().then(function(f) {
            n.get(s, d, {
                success: function(n) {
                    if (n && 0 != Object.keys(n).length) if (13 == n.errCode || 13 == n.errno) {
                        if (c >= 1) return void u({
                            code: 77713,
                            message: "登录失败或用户未授权"
                        });
                        i.doLogin().then(function() {
                            o(e(s, d, ++c));
                        }, function(e) {
                            u({
                                code: e,
                                message: "登录失败或用户未授权"
                            });
                        });
                    } else {
                        if (s == r.find && 0 == n.errCode && !n.dfid) {
                            var f = {
                                operation: 46,
                                result: "666666",
                                message: "dfid为空(" + a.createURL(s, d) + ")",
                                bizid: 619
                            };
                            t.umpBiz(f, void 0, !1);
                        }
                        o(n);
                    } else u(-1, "抱歉，请求数据出错");
                },
                fail: function(e) {
                    var n = e.code, i = e.message;
                    u({
                        code: n,
                        message: i
                    });
                }
            });
        }).catch(function(e) {
            var n = e.code, i = e.message;
            u({
                code: n,
                message: i
            });
        });
    });
}

var n = require("./pay_request.js"), i = require("../../common/login/login.js"), t = require("../../common/fe_report/usability.js"), a = require("../../common/url_utils.js"), o = require("../../libs/promise.min.js"), r = {
    view: "https://wq.jd.com/bases/daifu/view",
    find: "https://wq.jd.com/bases/daifu/find",
    confirm: "https://wq.jd.com/bases/daifu/confirm",
    wxPay: "https://wq.jd.com/dfpaygw/wxsapay"
};

module.exports = {
    loadView: function(n) {
        var i = {
            dfid: n,
            t: Math.random()
        };
        return e(r.view, i);
    },
    getDfid: function(n) {
        var i = {
            did: n,
            t: Math.random()
        };
        return e(r.find, i);
    },
    confirmOrder: function(n) {
        var i = {
            dfid: n,
            t: Math.random()
        };
        return e(r.confirm, i);
    },
    wxPay: function(n) {
        var i = {
            dealId: n,
            appid: getApp().appId,
            t: new Date().getTime()
        };
        return new o(function(t, a) {
            e(r.wxPay, i).then(function(e) {
                0 == e.errno && e.data ? wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function(e) {
                        t(n);
                    },
                    fail: function(e) {
                        a({
                            code: -1,
                            message: e.errMsg
                        });
                    }
                }) : a({
                    code: e.errno,
                    message: e.msg
                });
            }, function(e) {
                var n = e.code, i = e.message;
                a({
                    code: n,
                    message: i
                });
            });
        });
    }
};