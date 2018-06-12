(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, c = require("../../utils/ppdog"), d = a(c), e = require("../../utils/regenerator-runtime"), f = a(e);
    var g = require("../base/util"), h = require("../base/login"), i = require("./userinfo"), j = require("../base/promise"), k = require("../base/config"), l = wx.request, m = wx.showModal, n = 0, o = function(a) {
        var b = {
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        };
        return b = g.extend(b, a), "GET" === b.method && (b.header["Content-Type"] = "application/json"), 
        b;
    }, p = function(a) {
        var b;
        return b = !0 === a.isCrossReq ? h.getDealerLoginInfo() : h.getLoginInfo(), a.data ? (a.data.qluin = a.data.qluin || b.qluin, 
        a.data.qlskey = a.data.qlskey || b.qlskey) : a.data = {
            qluin: b.qluin,
            qlskey: b.qlskey
        }, a;
    }, q = function(a) {
        return new j(function(b, c) {
            wx.getSystemInfo({
                success: function(c) {
                    a.data.scenes = "ios" === c.platform ? 5 : 6, b(a);
                },
                fail: function(a) {
                    c(a);
                }
            });
        });
    }, r = function(a) {
        var b = i.getSync(), c = "";
        if (null === b || !0 !== a.isCrossReq) c = k.DEALER.WZQ.DOMAIN; else switch (parseInt(b.dealercode, 10).toString()) {
          case k.DEALER.CMSCHINA.CODE:
            c = k.DEALER.CMSCHINA.DOMAIN;
            break;

          case k.DEALER.CHINALIONS.CODE:
            c = k.DEALER.CHINALIONS.DOMAIN;
            break;

          case k.DEALER.CNHB.CODE:
            c = k.DEALER.CNHB.DOMAIN;
            break;

          default:
        }
        return /^\//.test(a.url) && (a.url = "https://" + c + a.url), a;
    }, s = function(a, b) {
        function c() {
            var a = d.shift();
            if (!a) return void (e = b);
            e--;
            var f = a[0], g = a[1], h = a[2];
            h.unshift(function() {
                e++, c.apply(this, arguments);
            }), setTimeout(function() {
                return f.apply(g, h);
            }, 0);
        }
        b = b || 1;
        var d = [], e = b;
        return function() {
            return d.push([ a, this, [].slice.call(arguments, 0) ]), e ? c() : void 0;
        };
    }(function(a, c) {
        var d = {};
        d = o(c), d = r(d), d = p(d), q(d).then(function(a) {
            d = a;
        }), d.success = function(a) {
            var d = g.resCommonHandle(a);
            if (!1 !== d.check) {
                var e = d.json, f = /^510010\d\d$/;
                return f.test(e.retcode) && 2 > n ? (n += 1, h.reLogin(function() {
                    s(b({}, c, {
                        success: function() {
                            c.success && c.success.apply(c, arguments), n = 0;
                        }
                    }));
                })) : void ("function" == typeof c.success && c.success(e));
            }
        }, d.fail = function(a) {
            var b = g.resCommonHandle(a);
            if (!1 !== b.check) {
                var d = b.json;
                "function" == typeof c.fail && c.fail(d);
            }
        }, d.complete = function(b) {
            a();
            var d = g.resCommonHandle(b);
            if (!1 !== d.check) {
                var e = d.json;
                "function" == typeof c.complete && c.complete(e);
            }
        }, l(d);
    }, 5);
    module.exports = {
        showModal: function(a) {
            g.isString(a) ? m({
                title: "",
                content: a,
                showCancel: !1,
                confirmText: "我知道了"
            }) : (a.title = a.title || "", m(a));
        },
        request: s,
        crossRequest: function(a) {
            i.get(function(b) {
                var c = b.dealercode, d = "https://wzq.tenpay.com/cgi-bin/wx_login.cgi";
                switch (parseInt(c, 10).toString()) {
                  case k.DEALER.CMSCHINA.CODE:
                    d = "https://wzq.newone.com.cn/cgi-bin/wx_login.cgi";
                    break;

                  case k.DEALER.CHINALIONS.CODE:
                    d = "https://wzq.chinalions.cn/cgi-bin/wx_login.cgi";
                    break;

                  case k.DEALER.CNHB.CODE:
                    d = "https://wzq.cnhbstock.com/cgi-bin/wx_login.cgi";
                    break;

                  default:
                }
                h.isDealerLogin() ? (a.isCrossReq = !0, s(a)) : h.getDealerLoginCode(c, function(b) {
                    h.goLogin({
                        url: d,
                        code: b.code,
                        loginType: 2,
                        success: function() {
                            a.isCrossReq = !0, s(a);
                        }
                    });
                });
            });
        }
    };
})();