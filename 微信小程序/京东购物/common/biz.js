function e(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

function t(e, t) {
    var n = {};
    return e.forEach(function(e) {
        var t = e.dwActId;
        e.area.forEach(function(e) {
            var o = t + "_" + e.dwAreaId;
            n[o] || (n[o] = []), n[o] = n[o].concat(e.list || []);
        });
    }), n;
}

function n(e) {
    var t = [];
    return e.forEach(function(e) {
        +e.dwWeChatPrice > 0 && +e.dwActMinPrice > 0 && t.push(e);
    }), t;
}

function o() {
    for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = [], n = []; e.length > 0; ) t.push(e.splice(0, 10));
    return t.forEach(function(e) {
        n.push(new f(function(t, n) {
            y.get("https://wq.jd.com/activeapi/queryjdshopfreecouponstatus", {
                rolekeys: e.join("|"),
                _t: new Date()
            }).then(function(e) {
                var o = e.body, r = (e.header, o.errorCode), i = o.errMsg, c = o.data;
                return 0 == r ? t({
                    code: r,
                    msg: i,
                    data: c
                }) : n({
                    code: r,
                    msg: i,
                    data: c
                });
            }).catch(function(e) {
                e.code, e.message;
                return n({
                    msg: "网络错误"
                });
            });
        }));
    }), f.all(n).then(function(e) {
        var t = {};
        return e.forEach(function(e) {
            t = Object.assign(t, e.data);
        }), t;
    });
}

function r() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    if (0 == e.length) return console.log("activeId为空"), f.resolve(null);
    var t = {}, n = [], o = [];
    e.forEach(function(e) {
        e in t || !e || (n.push(e), t[e] = 1);
    });
    for (var r = Math.min(n.length, 30), i = Math.ceil(n.length / 30), c = 0; c < i; c++) {
        var a = n.splice(0, r);
        o.push(y.get("https://wq.jd.com/active/queryprizesstatuslist", {
            activelist: a.join(",")
        }));
    }
    return new f(function(e, t) {
        f.all(o).then(function(n) {
            var o = {};
            n.forEach(function(n) {
                0 == n.body.retcode ? (n.body.result.forEach(function(e) {
                    o[e.active] = e, e._prizes = {}, e.prizes.forEach(function(t) {
                        e._prizes["level_" + t.Level] = t;
                    }), delete e.active;
                }), e(o)) : t({
                    message: "获取优惠券信息失败",
                    from: "queryprizesstatuslist"
                });
            });
        }).catch(function(e) {
            t(e);
        });
    });
}

function i() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    if (0 == e.length) return console.log("activelist为空"), f.resolve(null);
    var t = {}, n = [], o = [];
    e.forEach(function(e) {
        e in t || !e || (n.push(e), t[e] = 1);
    });
    for (var r = Math.min(n.length, 20), i = Math.ceil(n.length / 20), c = 0; c < i; c++) {
        var a = n.splice(0, r);
        o.push(y.get("https://wq.jd.com/active/querybingolist", {
            activelist: a.join(",")
        }));
    }
    var s = function e(t, n) {
        f.all(o).then(function(o) {
            var r = {};
            o.forEach(function(o) {
                0 == o.body.errorCode ? (o.body.result.forEach(function(e) {
                    r[e.active] = e, e._bingos = {}, e.bingos.forEach(function(t) {
                        e._bingos["level_" + t.level] = t;
                    }), delete e.active;
                }), t(r)) : 2 == o.body.errorCode ? k.querybingolist || (k.querybingolist = 1, g.doLogin().then(function() {
                    e(t, n);
                }).catch(function(e) {
                    n({
                        message: "登录失败",
                        from: "querybingolist"
                    });
                })) : n(o.body);
            });
        }).catch(function(e) {
            n(e);
        });
    };
    return g.getLoginPromise().then(function() {
        return new f(s);
    });
}

function c(e) {
    return g.getLoginPromise().then(function() {
        return a(e);
    }).catch(function(e) {
        return f.reject(e);
    });
}

function a(t) {
    return new f(function(n, o) {
        var r = [ t.skuId, "", t.buyNum || 1, t.skuId, "1,0,0" ], i = s().jdaddrid.split("_").slice(0, 3).join("-"), c = {
            scene: 2,
            reg: 1,
            type: 0,
            commlist: r.join(","),
            areaid: i,
            t: Math.random()
        };
        w.get("3c_shop", "").then(function(t) {
            var r = t.id || "";
            r && (c.shopid = r), y.get("https://wq.jd.com/deal/mshopcart/addcmdy", c).then(function(e) {
                var t = e.body;
                e.heder;
                n(t);
            }).catch(function(t) {
                var n, r = t.code, i = (t.message, n = {}, e(n, "" + m.RET_HTTP_RESPONSE_ERROR, m.Text_RET_HTTP_RESPONSE_ERROR), 
                e(n, "" + m.RET_HTTP_NETWORK_ERROR, m.Text_RET_HTTP_NETWORK_ERROR), e(n, "" + m.RET_WS_CONNECT_ERROR, m.Text_RET_WS_CONNECT_ERROR), 
                e(n, "" + m.RET_WS_REQUEST_TIMEOUT, m.Text_RET_WS_REQUEST_TIMEOUT), n);
                o(j(i[r] || "Network Error", r));
            });
        });
    }).then(function(e) {
        var n = e.errId, o = void 0;
        if ("0" === n) {
            var r = 1 * e.cart.mainSkuNum;
            return p.setUnpl(e.unplInfo), f.resolve(r);
        }
        if ("8968" === n) o = "商品数量最大超过200"; else if ("8969" === n) o = "添加商品失败，已超出购物车最大容量！"; else {
            if ("13" === n) return g.doLogin().then(function() {
                return c(t);
            }).catch(function(e, t) {
                return f.reject(j(t, e));
            });
            o = "添加失败，请稍后再试";
        }
        if (o) return f.reject(j(o, n));
    });
}

function s() {
    return v.getUserAddressDes().length > 0 && v.getUserAddressID().length > 0 ? {
        jdaddrname: v.getUserAddressDes(),
        jdaddrid: v.getUserAddressID()
    } : {
        jdaddrid: "1_72_4137_0",
        jdaddrname: "北京_朝阳区_管庄_"
    };
}

var u = function() {
    function e(e, t) {
        var n = [], o = !0, r = !1, i = void 0;
        try {
            for (var c, a = e[Symbol.iterator](); !(o = (c = a.next()).done) && (n.push(c.value), 
            !t || n.length !== t); o = !0) ;
        } catch (e) {
            r = !0, i = e;
        } finally {
            try {
                !o && a.return && a.return();
            } finally {
                if (r) throw i;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, f = require("../libs/promise.min.js"), g = require("./login/login.js"), h = require("../models/coupon/coupon_model.js"), v = require("user_info.js"), m = require("http_constant.js"), l = require("utils.js"), p = require("./pay_util/payUtil.js"), y = require("./request/request"), w = require("localStorage.js"), b = require("fe_report/usability.js"), j = require("./utils").genErrMsg, _ = "网络繁忙，请稍候再试", k = {}, q = {
    ANCHOR: "I",
    SEARCH: "CAN",
    SHOP: "DO",
    ITEM: "ALL",
    PROMOTE: "THINGS"
}, E = {
    PINGOU: 1,
    KANJIA: 2,
    SAM: 4,
    COSS: 8,
    PROMOMIAO: 16,
    FLASHPURCHASE: 32,
    ALL: 63
};

module.exports = {
    getSkuPrice: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return new f(function(t, n) {
            var o = e.join(",");
            y.get("https://pe.3.cn/prices/mgets", {
                skuids: o,
                origin: 5,
                source: "wxxcx"
            }).then(function(e) {
                var o = e.body;
                if (e.header, "object" == d(o[0])) {
                    var r = {};
                    o.forEach(function(e) {
                        r[e.id] = {
                            sku: e.id,
                            price: e.p,
                            delPrice: e.op,
                            mktPrice: e.m
                        };
                    }), t(r);
                } else n(j());
            }).catch(function(e) {
                e.code, e.message, n("getSkuPrice failed");
            });
        });
    },
    getMartData: function(e, o) {
        var r = e.actId, i = e.areaId, c = e.num;
        return new f(function(e, a) {
            var s = [ r, i, c ].join(":");
            y.get("https://wq.jd.com/mcoss/mmart/mshow", {
                pcs: s,
                gbyarea: 2,
                tpl: 7
            }).then(function(c) {
                c.header;
                var s = c.body;
                if (0 == s.errCode && s.data) {
                    var u = t(s.data)[r + "_" + i];
                    o && o.removeZeroPrice && u && (u = n(u)), e(u || []);
                } else a(j(s.msg, s.errCode));
            }).catch(function(e) {
                e.code, e.message, a(_);
            });
        });
    },
    parseUrl: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = void 0, n = {}, o = {
            ptag: /[\?&#]ptag=([\d\.]+)/i,
            sku: /[\?&#]sku=([\d\.]+)/i,
            anchor: /^#([^\?&=#]*)/,
            search: /(?:\.com)?\/search\/searchn\?.*?key=([^&#]+)/i,
            shop: /(?:\.com)?\/mshop\/gethomepage\?.*?venderId=(\d+)/i,
            item: /(?:\.com)?\/item\/view\?.*?sku=(\d+)/i
        };
        if (e.match(o.anchor)) t = e.match(o.anchor), n = {
            type: q.ANCHOR,
            id: t[1]
        }; else if (e.match(o.search)) {
            var r = (t = e.match(o.search))[1];
            try {
                r = decodeURIComponent(r);
            } catch (e) {
                console.error(e);
            }
            n = {
                type: q.SEARCH,
                keywords: r
            };
        } else e.match(o.shop) ? (t = e.match(o.shop), n = {
            type: q.SHOP,
            vid: t[1]
        }) : e.match(o.item) && (t = e.match(o.item), n = {
            type: q.ITEM,
            sku: t[1]
        });
        return e.match(o.ptag) && (t = e.match(o.ptag), n.ptag = t[1]), e.match(o.sku) && (t = e.match(o.sku), 
        n.sku = t[1]), n;
    },
    addCart: c,
    getAddressInfo: s,
    URL_TYPE: q,
    genErrMsg: j,
    queryCouponStatus: function(e, t) {
        if (e.length) {
            var n = e.filter(function(e) {
                return e.roleid && e.key;
            }).map(function(e) {
                return e.roleid + ":" + e.key;
            });
            g.afterLogin(o, n).then(function(n) {
                e.forEach(function(e) {
                    var t = n[e.roleid];
                    if (!t) return !1;
                    999 == t.resultCode ? e.status = 0 : 14 == t.resultCode || 15 == t.resultCode ? e.status = 1 : e.status = 2;
                }), t(null, e);
            }).catch(function(n) {
                var o = {
                    errId: n.code,
                    errMsg: n.msg
                };
                1 == n.code && (o.errId = -1001, o.errMsg = "未登录或登录失败"), t(o, e);
            });
        } else t(null, []);
    },
    getCoupon: function(e, t) {
        return new f(function(n, o) {
            h.getcoupon(e, t, function(e, t) {
                e ? o(e) : n(t);
            });
        });
    },
    getPPMS: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = (t.expire, 
        t.v), o = "https://wq.360buyimg.com/data/ppms/js/ppms.page" + (void 0 === n || n ? "v" : "") + e + ".jsonp";
        return new f(function(e, t) {
            y.get({
                url: o
            }).then(function(t) {
                var n = t.body;
                e(n.data);
            }, function(e) {
                t(e);
            });
        });
    },
    getMultiPPMS: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (!Array.isArray(e) || !e.length) return f.resolve({});
        var t = {}, n = "https://wqs.jd.com/j/=" + e.map(function(e) {
            var n = "/data/ppms/js/ppms.pagev" + e + ".json";
            return t[n] = e, n;
        }).join(",");
        return new f(function(o, r) {
            y.get({
                url: n
            }).then(function(r) {
                var i = {};
                (r.body.files || []).forEach(function(e) {
                    var n = t[e.filename];
                    n && (i[n] = e.content && e.content.data || []);
                });
                var c = [];
                e.forEach(function(e) {
                    i[e] || c.push(e);
                }), c.length ? b.umpBiz({
                    bizid: 777,
                    operation: 1,
                    result: 404,
                    message: "msg=" + c.join("+") + "&url=" + n.replace(/,/g, "+")
                }) : b.umpBiz({
                    bizid: 777,
                    operation: 1,
                    result: 0,
                    message: ""
                }), o(i);
            }, function(e) {
                var t = e.code, o = e.detail;
                b.umpBiz({
                    bizid: 777,
                    operation: 1,
                    result: ~~t,
                    message: "msg=" + o + "&url=" + n.replace(/,/g, "+")
                }), r(e);
            });
        });
    },
    FLAG_TYPE: E,
    getSkuFlag: function(e, t) {
        return y.get("https://wq.jd.com/bases/panflag/get", {
            sku: e.join(","),
            flagtype: t
        }).then(function(e) {
            var t = e.body;
            if (0 != t.errcode) return f.reject({
                code: t.errcode,
                message: t.msg
            });
            if (!t.data.skuFlag.length) return {};
            var n = {};
            return t.data.skuFlag.map(function(e) {
                n[e.skuId] = e;
            }), n;
        });
    },
    getPingouPrice: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return y.get("https://wq.jd.com/pingou_api/getskusprice", {
            skuids: e.join(","),
            origin: 5,
            area: v.getUserAddressID(),
            callback: "callback"
        }).then(function(e) {
            var t = e.body;
            if (!t.length) return {};
            var n = {};
            return t.map(function(e) {
                n[e.id] = e;
            }), n;
        });
    },
    getRankData: function(e) {
        var t = e.rankId, n = e.getnum, o = e.ranktype;
        return new f(function(e, r) {
            y.get("https://wq.jd.com/mcoss/ranklist/bshow", {
                rids: t,
                sn: n,
                st: o
            }).then(function(t) {
                t.header;
                var n = t.body;
                if (0 == n.retcode && n.rank) {
                    var o = n.rank;
                    e(o || []);
                } else r(j(n.errmsg, n.retcode));
            }).catch(function(e) {
                e.code, e.message, r(_);
            });
        });
    },
    queryCanUActiveCouponBySku: function(e) {
        var t = e.skuid, n = e.source, o = e.flag;
        return new f(function e(r, i) {
            g.getLoginPromise().then(function() {
                y.get("https://wq.jd.com/user/info/QueryCanUActiveCouponBySku", {
                    skuid: t,
                    source: n,
                    flag: o
                }).then(function(t) {
                    t.header;
                    var n = t.body;
                    if (13 != n.retcode && 102 != n.retcode || k.queryCanUActiveCouponBySku) if (0 == n.retcode && n.data) {
                        var o = n.data;
                        r(o || []);
                    } else i(j(n.msg, n.retcode)); else k.queryCanUActiveCouponBySku = 1, g.doLogin().then(function() {
                        e(r, i);
                    });
                }).catch(function(e) {
                    e.code, e.message, i(_);
                });
            });
        });
    },
    getSaleInfo: function(e) {
        var t = e.skuid;
        return new f(function(e, n) {
            y.get("https://wq.jd.com/commodity/promo/get", {
                skuid: t
            }).then(function(t) {
                t.header;
                var o = t.body;
                if (0 == o.errcode && o.data) {
                    var r = o.data;
                    e(r || []);
                } else n(j(o.msg, o.retcode));
            }).catch(function(e) {
                e.code, e.message, n(_);
            });
        });
    },
    getTmallData: function(e) {
        var t = e.aid, n = e.category, o = void 0 === n ? "" : n, r = e.matchclass, i = void 0 === r ? "" : r, c = e.filterclass, a = void 0 === c ? "" : c, s = e.sid, u = void 0 === s ? "" : s, d = e.filtercate, g = void 0 === d ? "" : d, h = e.pagesize, v = void 0 === h ? 5 : h;
        return new f(function(e, n) {
            y.get("https://wq.jd.com/mcoss/brandspecial/show", {
                aid: t,
                category: o,
                matchclass: i,
                filterclass: a,
                filtercate: g,
                sid: u,
                pagesize: v
            }).then(function(t) {
                t.header;
                var o = t.body;
                if (0 == o.errCode && o.gs) {
                    var r = o.gs;
                    e(r || []);
                } else n(j(o.msg || "网络错误", o.errCode));
            }).catch(function(e) {
                e.code, e.message, n(_);
            });
        });
    },
    getTmallMshowData: function(e) {
        var t = e.pcs;
        return new f(function(e, n) {
            y.get("https://wq.jd.com/mcoss/mmart/mshow", {
                pcs: t,
                tpl: 6
            }).then(function(t) {
                t.header;
                var o = t.body;
                if (0 == o.errCode && o.data) {
                    var r = o.data;
                    e(r || []);
                } else n(j(o.msg, o.errCode));
            }).catch(function(e) {
                e.code, e.message, n(_);
            });
        });
    },
    queryNewProductImage: function(e) {
        var t = e.ids;
        return new f(function(e, n) {
            y.get("https://yx.3.cn/service/info.action", {
                ids: t
            }).then(function(t) {
                t.header;
                var o = t.body;
                "object" == (void 0 === o ? "undefined" : d(o)) ? e(o) : n(j());
            }).catch(function(e) {
                e.code, e.message, n(_);
            });
        });
    },
    getRecLikeByPos: function(e) {
        var t = e.recpos, n = e.pc, o = void 0 === n ? 20 : n, r = e.pi, i = void 0 === r ? 1 : r;
        return new f(function(e, n) {
            y.get("https://wq.jd.com/mcoss/reclike/getrecinfo", {
                recpos: t,
                pc: o,
                pi: i
            }).then(function(t) {
                t.header;
                var o = t.body;
                o.success ? e(o) : n({
                    message: "获取数据失败，请稍后再试"
                });
            }).catch(function(e) {
                e.code, e.message, n(_);
            });
        });
    },
    getRecLikeByMid: function(e) {
        var t = e.mid;
        return new f(function(e, n) {
            y.get("https://wq.jd.com/mcoss/reclike/show", {
                mid: t,
                ec: "utf-8"
            }).then(function(t) {
                t.header;
                var o = t.body;
                0 == o.retcode ? e(o) : n({
                    message: "获取数据失败，请稍后再试"
                });
            }).catch(function(e) {
                e.code, e.message, n(_);
            });
        });
    },
    yuyueActive: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        if (!e) return f.reject({
            message: "预约活动的id为空"
        });
        var t = function t(n, o) {
            y.get("https://wq.jd.com/bases/yuyue/active", {
                activeId: e
            }).then(function(e) {
                e.header;
                var r = e.body;
                r.retCode ? 13 == r.retCode ? k.yuyue_active ? o({
                    code: 13,
                    message: "登录失败，请稍后再试吧"
                }) : (k.yuyue_active = 1, g.doLogin().then(function(e) {
                    t(n, o);
                }).catch(function(e) {
                    o({
                        code: 13,
                        message: "登录失败，请稍后再试吧"
                    });
                })) : o({
                    code: r.retCode,
                    message: r.retMsg || "预约出错，请稍后再试"
                }) : n(r);
            }).catch(function(e) {
                o(e);
            });
        };
        return g.getLoginPromise().then(function() {
            return new f(t);
        });
    },
    yuyueItem: function(e) {
        var t = e.skuId, n = void 0 === t ? "" : t, o = e.dataType, r = void 0 === o ? 1 : o, i = e.appid, c = void 0 === i ? "wx91d27dbf599dff74" : i;
        if (!n) return f.reject({
            message: "预约商品的id为空"
        });
        var a = function e(t, o) {
            y.get("https://wq.jd.com/bases/yuyue/item", {
                skuId: n,
                dataType: r,
                appid: c
            }).then(function(n) {
                n.header;
                var r = n.body;
                r.retCode ? 13 == r.retCode ? k.yuyue_item ? o({
                    code: 13,
                    message: "登录失败，请稍后再试吧"
                }) : (k.yuyue_item = 1, g.doLogin().then(function(n) {
                    e(t, o);
                }).catch(function(e) {
                    o({
                        code: 13,
                        message: "登录失败，请稍后再试吧"
                    });
                })) : o({
                    code: r.retCode,
                    message: r.retMsg || "预约出错，请稍后再试"
                }) : t(r);
            }).catch(function(e) {
                o(e);
            });
        };
        return g.getLoginPromise().then(function() {
            return new f(a);
        });
    },
    getActiveYuyueList: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        if (!e) return f.reject({
            message: "预约活动的id为空"
        });
        var t = function t(n, o) {
            y.get("https://wq.jd.com/bases/yuyue/activeResult", {
                activeId: e
            }).then(function(e) {
                e.header;
                var r = e.body;
                0 == r.retCode ? n(r) : 13 == r.retCode ? k.getActiveYuyueList ? o({
                    code: 13,
                    message: "登录失败，请稍后再试吧"
                }) : (k.getActiveYuyueList = 1, g.doLogin().then(function(e) {
                    t(n, o);
                }).catch(function(e) {
                    o({
                        code: 13,
                        message: "登录失败，请稍后再试吧"
                    });
                })) : o({
                    code: r.retCode,
                    message: r.retMsg || "获取预约状态有问题，请稍后再试"
                });
            }).catch(function(e) {
                o(e);
            });
        };
        return g.getLoginPromise().then(function() {
            return new f(t);
        });
    },
    getItemYuyueList: function(e) {
        var t = e.page, n = void 0 === t ? 1 : t, o = e.pagesize, r = void 0 === o ? 20 : o, i = function e(t, o) {
            y.get("https://wq.jd.com/bases/yuyuelist/getitemlist", {
                page: n,
                pagesize: r
            }).then(function(n) {
                n.header;
                var r = n.body;
                0 == r.errNo ? t(r) : 13 == r.errNo ? k.getItemYuyueList ? o({
                    code: 13,
                    message: "登录失败，请稍后再试吧"
                }) : (k.getItemYuyueList = 1, g.doLogin().then(function(n) {
                    e(t, o);
                }).catch(function(e) {
                    o({
                        code: 13,
                        message: "登录失败，请稍后再试吧"
                    });
                })) : o({
                    code: r.retCode,
                    message: r.retMsg || "获取预约状态有问题，请稍后再试"
                });
            }).catch(function(e) {
                o(e);
            });
        };
        return g.getLoginPromise().then(function() {
            return new f(i);
        });
    },
    queryPrizesList: r,
    queryBingoList: i,
    queryActiveCouponStatus: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = [];
        return e.forEach(function(e) {
            t.push(e.activeId);
        }), new f(function(n, o) {
            f.all([ r(t), i(t) ]).then(function(t) {
                var o = u(t, 2), r = o[0], i = o[1];
                e.forEach(function(e) {
                    var t = r[e.activeId]["level_" + e.activeLevel], n = l.canGetActiveCoupon(t) ? 0 : 2;
                    n = i[e.activeId]._bingos["level_" + e.activeLevel] && 2 == n ? 1 : n, e.status = n;
                }), n(e);
            }).catch(function(e) {
                o(e);
            });
        });
    },
    drawCoupon: function(e, t) {
        var n = {
            ext: "hj:x",
            active: e,
            level: t,
            t: new Date().getTime()
        }, o = function e(t, o) {
            y.get({
                url: "https://wq.jd.com/active/active_draw",
                data: n
            }).then(function(n) {
                var r = n.body;
                n.header, 0 == r.ret ? t(r) : 2 == r.ret ? k.active_draw ? o({
                    message: "登录失败",
                    form: "active_draw"
                }) : (k.active_draw = 1, g.doLogin().then(function() {
                    e(t, o);
                }).catch(function(e) {
                    o({
                        message: "登录失败",
                        form: "active_draw"
                    });
                })) : t(r);
            }).catch(function(e) {
                o(e);
            });
        };
        return g.getLoginPromise().then(function() {
            return new f(o);
        });
    },
    getMartv3Data: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 20;
        return new f(function(n, o) {
            y.get("https://wqcoss.jd.com/mcoss/martv3/show", {
                id: e,
                count: t
            }).then(function(e) {
                e.header;
                var t = e.body;
                0 == t.errcode ? n(t) : o({
                    code: t.errcode,
                    message: t.msg
                });
            });
        });
    },
    keywordsearch: function(e) {
        var t = e.ruleid, n = e.pi, o = void 0 === n ? 1 : n, r = e.pc, i = void 0 === r ? 10 : r, c = e.tpl, a = void 0 === c ? 1 : c;
        return new f(function(e, n) {
            y.get("https://wq.jd.com/mcoss/keyword/keywordsearch", {
                ruleid: t,
                pi: o,
                pc: i,
                tpl: a
            }).then(function(t) {
                t.header;
                var o = t.body;
                0 == o.errCode ? e(o) : n({
                    code: o.errCode,
                    message: o.msg
                });
            });
        });
    },
    getPingou: function(e) {
        var t = e.id, n = e.count, o = void 0 === n ? 10 : n, r = e.pretime, i = void 0 === r ? 0 : r;
        return new f(function(e, n) {
            y.get("https://wqcoss.jd.com/mcoss/pingou/show", {
                id: t,
                count: o,
                pretime: i
            }).then(function(t) {
                t.header;
                var o = t.body;
                0 == o.errcode ? e(o) : n({
                    code: o.errcode,
                    message: o.msg
                });
            });
        });
    },
    getPingouInfo: function(e) {
        var t = e.skuids, n = void 0 === t ? "" : t, o = e.callback, r = void 0 === o ? "wxacallback" : o;
        return new f(function(e, t) {
            y.get("https://wq.jd.com/pingou/getpingoubatactiveinfo", {
                skuids: n,
                callback: r
            }).then(function(n) {
                n.header;
                var o = n.body;
                0 == o.iRet ? e(o) : t({
                    code: o.iRet,
                    message: o.errmsg
                });
            }).catch(function(e) {
                t(e);
            });
        });
    },
    getCartMarginSku: function(e) {
        var t = e.type, n = void 0 === t ? 0 : t, o = e.cid1, r = void 0 === o ? "" : o, i = e.cid2, c = void 0 === i ? "" : i, a = e.cid3, s = void 0 === a ? "" : a;
        return new f(function(e, t) {
            y.get("https://wq.jd.com/deal/trademisc/getcartmarginsku", {
                type: n,
                cid1: r,
                cid2: c,
                cid3: s
            }).then(function(n) {
                n.header;
                var o = n.body;
                0 == o.errId ? e(o) : t({
                    code: o.errId,
                    message: o.errMsg
                });
            });
        });
    },
    getGroupInfo: function(e) {
        var t = e.groupId, n = void 0 === t ? "" : t;
        return new f(function(e, t) {
            y.get("https://wq.jd.com/group_show/GetGroupInfo", {
                groupId: n
            }).then(function(n) {
                n.header;
                var o = n.body;
                0 == o.ret ? e(o) : t({
                    code: o.ret,
                    message: o.retmsg
                });
            });
        });
    },
    getActiveFeeds: function(e) {
        var t = e.shareids, n = void 0 === t ? "" : t;
        return new f(function(e, t) {
            y.get("https://wq.jd.com/shopgroup_api_feed/GetActvieFeeds", {
                shareids: n
            }).then(function(n) {
                n.header;
                var o = n.body;
                0 == o.iRet ? e(o) : t({
                    code: o.iRet,
                    message: o.errmsg
                });
            });
        });
    },
    getTopicListPlus: function(e) {
        var t = e.tagid, n = void 0 === t ? "" : t, o = e.shareid, r = void 0 === o ? "" : o, i = e.pageno, c = void 0 === i ? 1 : i, a = e.pagesize, s = void 0 === a ? 5 : a, u = e.feedtype, d = void 0 === u ? 0 : u;
        return new f(function(e, t) {
            y.get("https://wq.jd.com/shopgroup_feed/GetTopicListPlus", {
                tagid: n,
                shareid: r,
                pageno: c,
                pagesize: s,
                feedtype: d
            }).then(function(n) {
                n.header;
                var o = n.body;
                0 == o.iRet ? e(o) : t({
                    code: o.iRet,
                    message: o.errmsg
                });
            });
        });
    },
    getCategoryFeedsPlus: function(e) {
        var t = e.cateid, n = void 0 === t ? "" : t, o = e.shareid, r = void 0 === o ? "" : o, i = e.pageno, c = void 0 === i ? 1 : i, a = e.pagesize, s = void 0 === a ? 5 : a, u = e.feedtype, d = void 0 === u ? 1 : u, g = e.type, h = void 0 === g ? 2 : g;
        return new f(function(e, t) {
            y.get("https://wq.jd.com/shopgroup_feed/GetCategoryFeedsPlus", {
                cateid: n,
                shareid: r,
                pageno: c,
                pagesize: s,
                feedtype: d,
                type: h
            }).then(function(n) {
                n.header;
                var o = n.body;
                0 == o.iRet ? e(o) : t({
                    code: o.iRet,
                    message: o.errmsg
                });
            });
        });
    },
    getYouhaohuoItemList: function(e) {
        var t = e.cateid, n = void 0 === t ? "" : t, o = e.pageno, r = void 0 === o ? 1 : o, i = e.pagesize, c = void 0 === i ? 5 : i, a = e.filter, s = void 0 === a ? 1 : a, u = e.source, d = void 0 === u ? "mpm" : u;
        return new f(function(e, t) {
            y.get("https://wq.jd.com/youhaohuo/GetItemList", {
                cateid: n,
                pageno: r,
                pagesize: c,
                filter: s,
                source: d
            }).then(function(n) {
                n.header;
                var o = n.body;
                0 == o.ret ? e(o) : t({
                    code: o.ret,
                    message: o.msg
                });
            });
        });
    },
    getSimicommodity: function(e) {
        var t = e.pcs, n = void 0 === t ? "" : t;
        return new f(function(e, t) {
            y.get("https://wqcoss.jd.com/mcoss/simicommodity/show", {
                pcs: n
            }).then(function(n) {
                n.header;
                var o = n.body;
                0 == o.retcode ? e(o) : t({
                    code: o.retcode,
                    message: o.errmsg
                });
            });
        });
    }
};