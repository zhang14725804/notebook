function o(o, e, s, t, a) {
    var c = {
        operation: o,
        result: t,
        message: a,
        bizid: 619
    };
    if (d.umpBiz(c, void 0, !1), 0 !== e) {
        var r = {
            operation: e,
            result: t,
            message: 0 == t ? "" : "[" + o + "_" + s + "]" + a,
            bizid: 619
        };
        d.umpBiz(r, void 0, !1);
    }
}

function e(d, r, l, p) {
    var m = {};
    m.url = d, m.data = r;
    var i = a[d] ? a[d].o1 : c, h = a[d] ? a[d].o2 : c, w = d.substr(-20);
    99 == i && console.log("结算接口未监控:" + d), s.get(m).then(function(s) {
        var a = s.body, c = 7770;
        void 0 !== a.errId ? c = a.errId : void 0 !== a.errCode ? c = a.errCode : void 0 !== a.errcode ? c = a.errcode : void 0 !== a.errno ? c = a.errno : void 0 !== a.retcode ? c = a.retcode : void 0 !== a.ret && (c = a.ret);
        var m = a.errMsg || a.msg || a.retmsg;
        0 == c ? (o(i, h, w, 0), l && l.success && l.success(a)) : p || 13 != c ? (o(i, h, w, c || 1, "[yw]" + m), 
        l && l.success && l.success(a)) : t.doLogin().then(function() {
            e(d, r, l, !0);
        }, function(e) {
            o(i, h, w, 77713, "[yw]reLogin error."), l && l.success && l.success(a);
        });
    }, function(e) {
        e.errId = parseInt("777" + (e.code || 0), 10), e.errMsg = e.message, o(i, h, w, e.errId, "[wg]" + e.errMsg + "(" + e.code + ")"), 
        l && l.fail && l.fail(e);
    });
}

var d = require("../../common/fe_report/usability.js"), s = require("../../common/request/request.js"), t = require("../../common/login/login.js"), a = {
    "https://wqdeal2.jd.com/deal/minfo/orderinfo": {
        o1: 1,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/minfo/venderinfo": {
        o1: 2,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/mship/shipeffect": {
        o1: 3,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/masset/userasset": {
        o1: 4,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/massit/assitinfo": {
        o1: 5,
        o2: 0
    },
    "https://wq.jd.com/deal/recvaddr/getrecvaddrV3": {
        o1: 6,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/massit/getinvoicelist": {
        o1: 7,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/massit/saveinvoice": {
        o1: 8,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/chooseship": {
        o1: 9,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mshopcart/uncheckcmdy": {
        o1: 10,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mshopcart/rmvcmdy": {
        o1: 11,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/msubmit/confirm": {
        o1: 12,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/mship/setpayship": {
        o1: 13,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/masset/setbean": {
        o1: 14,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/masset/setbalance": {
        o1: 15,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/masset/setgiftcard": {
        o1: 16,
        o2: 99
    },
    "https://wq.jd.com/user/info/PwdIsActive": {
        o1: 17,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/masset/setcouponlist": {
        o1: 18,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/masset/optimalcoupon": {
        o1: 19,
        o2: 99
    },
    "https://wq.jd.com/deal/recvaddr/getrecvaddrlistV3": {
        o1: 20,
        o2: 99
    },
    "https://wq.jd.com/deal/recvaddr/delrecvaddr4jd": {
        o1: 21,
        o2: 99
    },
    "https://wq.jd.com/deal/recvaddr/addrecvaddr4jdv2": {
        o1: 22,
        o2: 99
    },
    "https://wq.jd.com/deal/recvaddr/modifyrecvaddr4jd": {
        o1: 23,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mshopcart/modifycmdypromo": {
        o1: 24,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mshopcart/addcmdy": {
        o1: 25,
        o2: 99
    },
    "https://wq.jd.com/jdpaygw/wxsapay": {
        o1: 27,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/setcouponlist": {
        o1: 28,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/setgbuyaut": {
        o1: 29,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/orderinfo": {
        o1: 30,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/venderinfo": {
        o1: 31,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/confirm": {
        o1: 32,
        o2: 0
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/shipeffect": {
        o1: 33,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/assitinfo": {
        o1: 34,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/chooseship": {
        o1: 35,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/setpayship": {
        o1: 36,
        o2: 99
    },
    "https://wq.jd.com/user/info/SecurityPwd": {
        o1: 37,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/getpicksitelist": {
        o1: 38,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/getcouponlist": {
        o1: 39,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/globalpurchase/getpicksitelist": {
        o1: 40,
        o2: 99
    },
    "https://wq.jd.com/deal/massit/getcoudanfreightandprice": {
        o1: 42,
        o2: 99
    },
    "https://wq.jd.com/deal/mshopcart/addcmdy": {
        o1: 43,
        o2: 99
    },
    "https://wq.jd.com/activepersistent/gwlb/querywxlborder": {
        o1: 44,
        o2: 99
    },
    "https://wq.jd.com/bases/daifu/view": {
        o1: 45,
        o2: 99
    },
    "https://wq.jd.com/bases/daifu/find": {
        o1: 46,
        o2: 99
    },
    "https://wq.jd.com/bases/daifu/confirm": {
        o1: 47,
        o2: 99
    },
    "https://wq.jd.com/dfpaygw/wxsapay": {
        o1: 48,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/selectbuyerfreightinsure": {
        o1: 50,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/vshipsvc": {
        o1: 100,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/vshipfee": {
        o1: 101,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/getitemchargelist": {
        o1: 102,
        o2: 99
    },
    "https://wqdeal2.jd.com/deal/mship/updateorderdelivery": {
        o1: 103,
        o2: 99
    },
    "https://wq.jd.com/wxpaymkt/GetOrderBonus": {
        o1: 104,
        o2: 99
    }
}, c = 99;

module.exports = {
    get: e
};