function e(a, s) {
    var c = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
    return new i(function(i, p) {
        o.getLoginPromise().then(function(m) {
            var u = d[a] || 0;
            r.get({
                url: a,
                data: s
            }).then(function(r) {
                var d = r.body;
                r.header;
                if (d && 0 != Object.keys(d).length) if (13 == d.errId || 13 == d.retcode || 13 == d.errno) {
                    if (c >= 1) return t(u, 77713, "登录失败或用户未授权"), void p({
                        code: 77713,
                        message: "登录失败或用户未授权"
                    });
                    o.doLogin().then(function() {
                        i(e(a, s, ++c));
                    }, function(e) {
                        t(u, 77713, "登录失败或用户未授权"), p({
                            code: e,
                            message: "登录失败或用户未授权"
                        });
                    });
                } else 0 == d.errId || 0 == d.retcode || 0 == d.errno ? t(u, 0) : t(u, d.errId || d.retcode || d.errno, (d.errMsg || d.msg || "无错误消息(自定义)") + "(" + n.createURL(a, s) + ")"), 
                i(d); else t(u, -1, "抱歉，请求数据出错"), p({
                    code: -1,
                    message: "抱歉，请求数据出错"
                });
            }, function(e) {
                var r = e.code, o = e.message;
                t(u, r, o + "(" + n.createURL(a, s) + ")"), p({
                    code: r,
                    message: o
                });
            });
        }).catch(function(e) {
            var t = e.code, r = e.message;
            p({
                code: t,
                message: r
            });
        });
    });
}

function t(e, t, r) {
    if (0 != e) {
        var o = {
            operation: e,
            result: t,
            message: r,
            bizid: 700
        };
        s.umpBiz(o);
    }
}

var r = require("../../common/request/request.js"), o = require("../../common/login/login.js"), a = require("../../libs/md5.js"), n = require("../../common/url_utils.js"), s = require("../../common/fe_report/usability.js"), i = require("../../libs/promise.min.js"), c = {
    orderview: "https://wq.jd.com/miaov/orderview",
    userasset: "https://wq.jd.com/miao/userasset",
    pwdIsActive: "https://wq.jd.com/user/info/PwdIsActive",
    securityPwd: "https://wq.jd.com/user/info/SecurityPwd",
    setCouponlist: "https://wq.jd.com/miao/setcouponlist",
    setCardlist: "https://wq.jd.com/miao/setgiftcard",
    setJdbean: "https://wq.jd.com/miao/setbean",
    confirm: "https://wq.jd.com/miao/confirm",
    wxsapay: "https://wq.jd.com/jdpaygw/wxsapay",
    ppmsUrl: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev32614.jsonp",
    getrecvaddrV3: "https://wqdeal2.jd.com/deal/recvaddr/getrecvaddrV3"
}, d = {
    "https://wq.jd.com/miaov/orderview": 1,
    "https://wq.jd.com/miao/userasset": 2,
    "https://wq.jd.com/user/info/PwdIsActive": 3,
    "https://wq.jd.com/user/info/SecurityPwd": 4,
    "https://wq.jd.com/miao/setcouponlist": 5,
    "https://wqdeal2.jd.com/deal/recvaddr/getrecvaddrV3": 6,
    "https://wq.jd.com/miao/setgiftcard": 7,
    "https://wq.jd.com/miao/setbean": 8,
    "https://wq.jd.com/miao/confirm": 9,
    "https://wq.jd.com/jdpaygw/wxsapay": 10
};

module.exports = {
    loadOrderInfo: function(t, r, o) {
        var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "0", n = {
            src: t % 33,
            bid: "",
            addressid: o || "",
            addrType: o ? "1" : "",
            paytype: a,
            commlist: ",," + r + "," + t,
            scene: "jd",
            r: Math.random()
        };
        return e(c.orderview, n);
    },
    loadUserVisualAsset: function() {
        var t = {
            reg: 1,
            action: "",
            platprice: 0,
            r: Math.random()
        };
        return e(c.userasset, t);
    },
    loadPasswordInfo: function() {
        var t = {
            source: 5,
            r: Math.random()
        };
        return e(c.pwdIsActive, t);
    },
    requestToSetCoupon: function(t, r, o) {
        var a = {};
        return a.reg = "0", a.cancel = t ? "" : r + "|" + o, a.use = t ? r + "|" + o : "", 
        a.action = "", a.platprice = 0, a.t = Date.parse(new Date()), e(c.setCouponlist, a);
    },
    requestToSetCard: function(t, r) {
        var o = {
            use: r,
            cancel: t,
            action: 0,
            reg: "1",
            r: Math.random()
        };
        return e(c.setCardlist, o);
    },
    requestToSetJdbean: function(t, r) {
        var o = {
            use: t,
            action: "",
            platprice: "",
            reg: "0",
            seq: r
        };
        return e(c.setJdbean, o);
    },
    getSecurityPwdInfo: function() {
        var t = {
            source: 5,
            pwdflag: 4,
            oprtype: 1,
            rurl: "wxappReturnUrl"
        };
        return n.addCsrfToken(t), e(c.securityPwd, t);
    },
    confirmOrder: function(t) {
        var r = {};
        return r.seq = t.seq, r.paytype = t.paytype, r.paychannel = t.paychannel, r.cid = t.cid, 
        r.skuid = t.skuid, r.price = t.price, r.totalprice = t.totalprice, r.addrType = "1", 
        r.addressid = t.aid, r.invoicetype = t.invoicetype, r.invoicetitle = t.invoicetitle, 
        r.invoicecontent = t.invoicecontent, r.invoicebookcontent = "", r.invoicecompany = t.invoicecompany, 
        r.invoicecode = t.invoicecode, r.phone = t.phone || "", r.email = t.email || "", 
        r.delivdate = "-1", r.instdate = "-1", r.bid = "", r.src = t.skuid % 33, t.pwd && (r.pwd = "" + a.hexMD5(t.pwd)), 
        r.r = Math.random(), e(c.confirm, r);
    },
    wxPay: function(t) {
        var r = {
            dealId: t,
            appid: getApp().appId,
            t: Date.parse(new Date())
        };
        return new i(function(t, o) {
            e(c.wxsapay, r).then(function(e) {
                if (e && 0 == e.errno) {
                    var r = e.data;
                    wx.requestPayment({
                        timeStamp: r.timeStamp,
                        nonceStr: r.nonceStr,
                        package: r.package,
                        signType: r.signType,
                        paySign: r.paySign,
                        success: function(e) {
                            t(e);
                        },
                        fail: function(e) {
                            o({
                                code: -2,
                                message: e.errMsg
                            });
                        }
                    });
                } else o({
                    code: e.errno,
                    message: e.msg
                });
            }, function(e) {
                var t = e.code, r = e.message;
                o({
                    code: t,
                    message: r
                });
            });
        });
    },
    loadPpmsData: function() {
        return e(c.ppmsUrl, {});
    },
    getRecvAddrV3: function(t) {
        var r = {
            adid: t,
            reg: "1",
            type: "1",
            r: Math.random()
        };
        return e(c.getrecvaddrV3, r);
    }
};