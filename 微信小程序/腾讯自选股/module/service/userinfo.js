(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b, c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
        return typeof a;
    } : function(a) {
        return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
    }, d = require("../../utils/ppdog"), e = a(d), f = require("../../utils/regenerator-runtime"), g = a(f), h = require("../base/config"), i = h.USERSTATE, j = require("../base/util"), k = require("../base/login"), l = null, m = !0, n = function(a, b, c) {
        if ("boolean" == typeof a && (a = {
            force: a
        }), "function" == typeof a && (c = b, b = a, a = null), a = a || {
            showLoading: !1,
            force: !!a
        }, b = "function" == typeof b ? b : function() {}, c = "function" == typeof c ? c : function(a) {
            wx.showModal({
                content: a.retmsg,
                showCancel: !1,
                confirmText: "我知道了"
            });
        }, l && l.userstate === h.USERSTATE.VERIFYING) return b(l);
        if (a.force && (l = null), !l || a.force) {
            var d = k.getLoginInfo();
            wx.request({
                url: "https://" + h.DEALER.WZQ.DOMAIN + "/cgi-bin/userinfo.fcgi",
                data: {
                    detail: 1,
                    dealer: 1,
                    qluin: d.qluin,
                    qlskey: d.qlskey
                },
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "POST",
                success: function(a) {
                    var d = j.resCommonHandle(a);
                    if (!1 !== d.check) {
                        var e = d.json;
                        switch (e.retcode) {
                          case "0":
                            e.dealercode !== h.DEALER.CHINALIONS.CODE || e.dealerbranchname || (e.dealerbranchname = "拉萨柳梧新区察古大道营业部"), 
                            l = e, e.userstate === i.NOACCOUNT || e.userstate === i.VERIFYING ? wx.setTabBarItem({
                                index: 1,
                                text: "开户",
                                iconPath: "/v1/image/nav/kh1.png",
                                selectedIconPath: "/v1/image/nav/kh.png"
                            }) : wx.setTabBarItem({
                                index: 1,
                                text: "资产",
                                iconPath: "/v1/image/nav/zc1.png",
                                selectedIconPath: "/v1/image/nav/zc.png"
                            }), b(e);
                            break;

                          default:
                            c(e);
                        }
                        m = !1;
                    }
                },
                fail: function() {
                    var a = j.resCommonHandle(res);
                    !1 === a.check || m && (m = !1, c({
                        retcode: "EABORT",
                        retmsg: "获取用户信息失败"
                    }));
                }
            });
        } else b(l);
    };
    module.exports = {
        get: n,
        set: function(a, b) {
            if (l) if ("object" === ("undefined" == typeof a ? "undefined" : c(a))) for (var d in a) a.hasOwnProperty(d) && (l[d] = a[d]); else "string" == typeof a && (l[a] = b);
        },
        remove: function(a) {
            var b, c = l;
            if (c) {
                if ("[object Array]" === Object.prototype.toString.call(a)) for (b = 0; b < a.length; b++) delete c[a[b]]; else "string" == typeof a && delete c[a];
                l = c;
            }
        },
        getSync: function() {
            return l;
        },
        disableAutoUpdate: function() {
            clearInterval(b), b = null;
        },
        enableAutoUpdate: function() {
            clearInterval(b), b = setInterval(function() {
                n(!0);
            }, 18e4);
        },
        print: function() {
            console.log(l);
        },
        clean: function() {
            l = null;
        }
    };
})();