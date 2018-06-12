function e(e) {
    if (Array.isArray(e)) {
        for (var r = 0, t = Array(e.length); r < e.length; r++) t[r] = e[r];
        return t;
    }
    return Array.from(e);
}

function r() {
    return {
        wid: "",
        openid: "",
        unionid: "",
        pin: "",
        skey: "",
        wxNickName: "",
        wxAvatarUrl: "",
        avatarUrl: "",
        nickName: "",
        gender: 0,
        province: "",
        city: "",
        country: "",
        userAddressID: "1_72_2819_0",
        userAddress: "北京_朝阳区_三环到四环之间_",
        ou: "",
        isplus: !1,
        jdLevel: 0,
        jdLevelName: "",
        visitkey: "",
        definePin: 0
    };
}

function t(e) {
    Object.assign(c, e), h.set("gUserData", c).then(function(e) {
        p.info(e);
    }).catch(function(e) {
        p.error(e);
    });
}

function i() {
    var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i = r.split(/,/), n = 2 === i.length ? [ 1 ].concat(e(i)) : i, a = u(n, 3), o = a[0], d = void 0 === o ? 1 : o, s = a[1], c = void 0 === s ? "" : s, f = a[2], l = void 0 === f ? "" : f;
    c = c.trim(), l = l.trim();
    var m = c && l;
    return t ? m ? d + "," + c + "," + l : "" : m ? c + "," + l : "";
}

function n(e) {
    var r = "https://wq.jd.com/user/info/QueryJDUserInfo?_=" + Math.round(2147483647 * Math.random());
    m.get({
        url: r,
        data: {}
    }).then(function(r) {
        var i = r.body;
        r.header;
        if (13 != i.retcode) {
            if (0 != i.retcode) return g.umpBiz({
                bizid: "563",
                operation: 2,
                result: i.retcode,
                message: i.msg
            }), void e(i.retcode, {
                code: i.retcode
            });
            if (0 == i.retcode && i.base) {
                if (g.umpBiz({
                    bizid: "563",
                    operation: 2,
                    result: 0,
                    message: "ret:suc"
                }), 2 == i.definePin) return void j.goto("/pages/my_pages/account/account");
                c.nickName = i.base.nickname, c.pin = i.base.curPin, c.avatarUrl = i.base.headImageUrl, 
                c.jdLevel = i.base.userLevel, c.jdLevelName = i.base.levelName, c.definePin = i.definePin, 
                c.jdNum = i.base.jdNum, c.jvalue = 90 == c.jdLevel ? 0 : i.base.jvalue, c.pinlist = i.base.pinlist, 
                t(c), f.setCookie({
                    data: {
                        pin: i.base.curPin,
                        jdpin: i.base.curPin
                    },
                    defaultExpires: !0
                }), e && e(i.retcode || 0, i);
            }
        } else v().then(function() {
            n(e);
        }).catch(function(e) {
            p.error(e);
        });
    }).catch(function(r) {
        var t = r.code, i = r.message;
        g.umpBiz({
            bizid: "563",
            operation: 2,
            result: t,
            message: i
        }), e && e(t, {
            code: t
        });
    });
}

function a(e) {
    m.get({
        url: "https://wq.jd.com/vipplus/GetPlusVerifyStatusInfo",
        data: {
            type: 3,
            scene: "weixin",
            t: Math.round(2147483647 * Math.random())
        }
    }).then(function(r) {
        var i = r.body;
        r.header;
        {
            if (13 != i.retcode) return 0 != i.retcode ? (e(i.retcode, {
                code: i.retcode
            }), void g.umpBiz({
                bizid: "563",
                operation: 16,
                result: i.retcode,
                message: i.msg
            })) : void (0 == i.retcode && i.data && (c.isplus = !0, t({
                isplus: !0
            }), e && e(i.retcode || 0, i), g.umpBiz({
                bizid: "563",
                operation: 16,
                result: 0,
                message: "ret:suc"
            })));
            v().then(function() {
                a(e);
            }).catch(function(e) {
                p.error(e);
            });
        }
    }).catch(function(r) {
        var t = r.code, i = r.message;
        e && e(-1, {
            code: t
        }), g.umpBiz({
            bizid: "563",
            operation: 16,
            result: 999,
            message: i
        });
    });
}

function o(e) {
    p.info("getAccountInfo"), m.get({
        url: "https://wq.jd.com/pinbind/accountInfo",
        data: {}
    }).then(function(r) {
        var t = r.body;
        r.header;
        {
            if (13 != t.retcode) return 0 != t.retcode ? (e(t.retcode, {
                code: t.retcode
            }), void g.umpBiz({
                bizid: "563",
                operation: 17,
                result: t.retcode,
                message: t.errmsg
            })) : void (0 == t.retcode && (e && e(t.errcode || 0, t), g.umpBiz({
                bizid: "563",
                operation: 17,
                result: 0,
                message: "ret:suc"
            })));
            v().then(function() {
                o(e);
            }).catch(function(e) {
                p.error(e);
            });
        }
    }).catch(function(r) {
        var t = r.code, i = r.message;
        e && e(-1, {
            code: t
        }), g.umpBiz({
            bizid: "563",
            operation: 17,
            result: 999,
            message: i
        });
    });
}

function d(e) {
    p.info("getUserAllPinInfo"), m.get({
        url: "https://wq.jd.com/user/info/GetUserAllPinInfo",
        data: {}
    }).then(function(r) {
        var t = r.body;
        r.header;
        {
            if (13 != t.errcode) return 0 != t.errcode ? (e(t.errcode, {
                code: t.errcode
            }), void g.umpBiz({
                bizid: "558",
                operation: 2,
                result: t.errcode,
                message: t.msg
            })) : void (0 == t.errcode && t.userdata && (e && e(t.retcode || 0, t), g.umpBiz({
                bizid: "558",
                operation: 2,
                result: 0,
                message: "ret:suc"
            })));
            v().then(function() {
                d(e);
            }).catch(function(e) {
                p.error(e);
            });
        }
    }).catch(function(r) {
        var t = r.code, i = r.message;
        e && e(-1, {
            code: t
        }), g.umpBiz({
            bizid: "558",
            operation: 2,
            result: 999,
            message: "ret:error" + i
        });
    });
}

function s() {
    var e = r(), t = 0, n = e.userAddressID, a = e.userAddress, o = "", d = "116.468369,40.003948", s = f.getCookie("wq_addr"), c = s ? s.split(/\|/) : [];
    if (c.length) {
        var l = u(c, 5);
        t = l[0], n = l[1], a = l[2], o = l[3], d = l[4];
    }
    return {
        addressId: t,
        areaId: n,
        areaName: a,
        addressName: o,
        coordinate: i(d),
        coordinateWithType: i(d, !0)
    };
}

var u = function() {
    function e(e, r) {
        var t = [], i = !0, n = !1, a = void 0;
        try {
            for (var o, d = e[Symbol.iterator](); !(i = (o = d.next()).done) && (t.push(o.value), 
            !r || t.length !== r); i = !0) ;
        } catch (e) {
            n = !0, a = e;
        } finally {
            try {
                !i && d.return && d.return();
            } finally {
                if (n) throw a;
            }
        }
        return t;
    }
    return function(r, t) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return e(r, t);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), c = null, f = require("./cookie-v2/cookie.js"), l = require("./logger.js"), m = require("./request/request.js"), p = new l("userinfo"), g = require("./fe_report/usability.js"), v = require("./login/login.js").doLogin, h = require("./localStorage.js"), j = require("./navigator.js");

module.exports = {
    gUserData: function() {
        return c;
    },
    updateUserData: t,
    initUserData: function() {
        c || (c = h.getSync("gUserData") ? h.getSync("gUserData") : r());
    },
    getUserInfo: n,
    getUserAllPinInfo: d,
    getAccountInfo: o,
    getPlusUserInfo: a,
    getUserAddressID: function() {
        return s().areaId;
    },
    getUserAddressDes: function() {
        return s().areaName;
    },
    updateAddress: function(e) {
        (e.jdaddrname || e.jdaddrid) && p.error("请设置 wq_addr 值，字段jdaddrname 和 jdaddrid 已废弃，参见：http://git.jd.com/wxapp/wxapp/wikis/wq_addr_explain.md");
        var n = r(), a = n.userAddress, o = n.userAddressID, d = e.wq_addr ? e.wq_addr.split(/\|/) : [ e.addressId, e.areaId, e.areaName, e.addressName, e.coordinate ], s = u(d, 5), c = s[0], l = s[1], m = s[2], g = s[3], v = s[4], h = {
            wq_addr: [ c || 0, l || o, m || a, g || "", i(v) ].join("|")
        };
        e.jdaddrid && e.jdaddrname && Object.assign(h, {
            jdAddrId: e.jdaddrid,
            jdAddrName: e.jdaddrname
        }), f.setCookie({
            data: h,
            defaultExpires: !0
        }), t(h);
    },
    getAddress: s
};