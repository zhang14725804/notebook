function e(e) {
    if (Array.isArray(e)) {
        for (var o = 0, t = Array(e.length); o < e.length; o++) t[o] = e[o];
        return t;
    }
    return Array.from(e);
}

function o(e) {
    return new y(function(t, n) {
        h.getLoginPromise().then(function() {
            g({
                url: "https://wq.jd.com/activeapi/queryjdcouponlistwithfinance",
                data: {
                    state: e,
                    wxadd: 1
                }
            }).then(function(r) {
                var i = r.body;
                if (1 == i.errorCode) h.doLogin().then(function() {
                    o(e).then(function(e) {
                        t(e);
                    }).catch(function(e) {
                        n(e || "获取优惠券列表出错，请稍后再试");
                    });
                }).catch(function(e, o) {
                    n(o || "登录出错，请稍后再试");
                }); else if (0 == i.errorCode) {
                    var c = i.coupon;
                    v.umpBiz({
                        bizid: "636",
                        operation: "3",
                        result: "0",
                        message: "ret: suc"
                    }), t(c);
                } else v.umpBiz({
                    bizid: "636",
                    operation: "3",
                    result: "1",
                    message: "ret:" + i.errMsg
                }), n(i.errMsg || "请求数据出错，请稍后再试");
            }).catch(function(e) {
                v.umpBiz({
                    bizid: "636",
                    operation: "3",
                    result: "1",
                    message: "fail:" + e.message
                }), n("网络出错，请稍后再试");
            });
        }).catch(function(e, o) {
            n(o || "登录出错，请稍后再试");
        });
    });
}

function t(e) {
    var o = [];
    return !(e instanceof Array) && (e = []), e.forEach(function(e) {
        var t = e.coupontype, n = e.couponStyle;
        e.couponTypeNum = 0 == n && 1 == t ? 1 : 3 == n && 1 == t ? 2 : 0 == n && 0 == t ? 3 : 2 == n && 2 == t ? 4 : 0, 
        1 != e.couponTypeNum && 2 != e.couponTypeNum && 3 != e.couponTypeNum && 4 != e.couponTypeNum || o.push(e);
    }), o;
}

function n(e) {
    var o = {
        0: "jing",
        1: "dong",
        2: "yun"
    };
    2 == e.couponTypeNum && e.discountInfo.info.sort(function(e, o) {
        var t = parseFloat(e.discountRate), n = parseFloat(o.discountRate);
        return t > n ? -1 : t == n ? 0 : 1;
    }), e.coupontypeStr = "", o[e.coupontype] && (e.coupontypeStr = o[e.coupontype]), 
    e.disabled = !0, e.conerStyle = "", e.conerStr = "", e.isShowGoods = !1, e.isShowDeleteBtn = !1, 
    e.isShowDeleteAnimate = !1, e.isShowOperaPanel = !0, e.tabIndex = 0, e.isFullPlayform = !0, 
    e.discountInfo.high *= 1;
    var t = [];
    2 != e.coupontype && 2 == e.isOverlay && t.push("可叠加"), e.platFormInfo.indexOf("全平台") > -1 ? t.push("全平台") : (t.push("限平台"), 
    e.isFullPlayform = !1), 2 == e.areaType && t.push("限区域"), e.attrTags = t;
    var n = "";
    1 == e.couponTypeNum || 2 == e.couponTypeNum ? (n = "东券", e.shopId > 0 && (n = "店铺" + n)) : 3 == e.couponTypeNum ? (n = "京券", 
    e.shopId > 0 && (n = "店铺" + n)) : 4 == e.couponTypeNum && (n = "运费券"), e.typeTag = n, 
    e.beginTime = parseInt(e.beginTime), e.endTime = parseInt(e.endTime), e.createTime = parseInt(e.createTime);
    var r = "YYYY.MM.DD";
    return 2 == e.hourCoupon && (r = "YYYY.MM.DD HH:mm:ss"), e.rangeDate = f(new Date(e.beginTime), r) + "-" + f(new Date(e.endTime), r), 
    e.quota = parseFloat(e.quota), e.discount = parseFloat(e.discount), e;
}

function r(e) {
    var o = [], t = [], n = [];
    return e.forEach(function(e, r) {
        1 == e.useableCouponStatus ? o.push(e) : 2 == e.useableCouponStatus ? t.push(e) : n.push(e);
    }), o.sort(function(e, o) {
        return o.createTime - e.createTime;
    }), t.sort(function(e, o) {
        return e.endTime - o.endTime;
    }), n.sort(function(e, o) {
        return o.createTime - e.createTime;
    }), [].concat(o, t, n);
}

function i(e, o, t) {
    return new y(function(n, r) {
        b.coupongoods(e, o, t, function(e, o) {
            null == e ? n(o) : r(e);
        });
    });
}

function c(e, o) {
    return new y(function(t, n) {
        h.getLoginPromise().then(function() {
            g({
                url: "https://wq.jd.com/activeapi/queryjdcouponshareinfo",
                data: {
                    couponid: e.couponid || ""
                }
            }).then(function(r) {
                var i = r.body;
                0 == i.errorCode ? t(i) : 2 == i.errorCode ? h.doLogin().then(function() {
                    c(e, o).then(function(e) {
                        t(e);
                    }).catch(function(e) {
                        n(e || "查询优惠券分享信息失败，请重试");
                    });
                }).catch(function(e, o) {
                    n(o || "登录出错，请稍后再试");
                }) : n(i.errMsg || "查询优惠券分享信息失败，请重试");
            }).catch(function(e) {
                n(e.errMsg || "网络请求失败，请稍后再试");
            });
        }).catch(function(e, o) {
            n(o || "登录出错，请稍后再试");
        });
    });
}

function u(e, o) {
    return new y(function(t, n) {
        h.getLoginPromise().then(function() {
            g({
                url: "https://wq.jd.com/activeapi/queryjdcouponshareinfov2",
                data: {
                    couponid: e.couponid || "",
                    cdkey: e.cdkey || "",
                    shareid: e.shareid || ""
                }
            }).then(function(r) {
                var i = r.body;
                0 == i.errorCode ? (t(i), v.umpBiz({
                    bizid: "636",
                    operation: "10",
                    result: "0",
                    message: "ret: suc"
                })) : 2 == i.errorCode ? h.doLogin().then(function() {
                    u(e, o).then(function(e) {
                        t(e);
                    }).catch(function(e) {
                        n(e.errMsg || "网络请求失败，请稍后再试");
                    });
                }).catch(function(e, o) {
                    n(o || "登录出错，请稍后再试");
                }) : (n({
                    errMsg: i.errMsg || "查询优惠券分享信息失败，请重试",
                    errorCode: i.errorCode
                }), v.umpBiz({
                    bizid: "636",
                    operation: "10",
                    result: "1",
                    message: "ret:" + i.errorCode
                }));
            }).catch(function(e) {
                n(e.errMsg || "网络请求失败，请稍后再试"), v.umpBiz({
                    bizid: "636",
                    operation: "10",
                    result: "1",
                    message: "fail:" + e.errMsg
                });
            });
        }).catch(function(e, o) {
            n(o || "登录出错，请稍后再试");
        });
    });
}

function a(e) {
    return new y(function(o, t) {
        h.getLoginPromise().then(function() {
            g({
                url: "https://wq.jd.com/activeapi/createjdcouponsharev2",
                data: {
                    couponid: e.couponid || "",
                    batchid: e.batchid || "",
                    discount: e.discount || "",
                    quota: e.quota || "",
                    cdkey: e.cdkey || ""
                }
            }).then(function(n) {
                var r = n.body;
                0 == r.errorCode ? (o(r), v.umpBiz({
                    bizid: "636",
                    operation: "6",
                    result: "0",
                    message: "ret: suc"
                })) : 2 == r.errorCode ? h.doLogin().then(function() {
                    a(e).then(function(e) {
                        o(e);
                    }).catch(function(e) {
                        t(e.errMsg || "网络请求失败，请稍后再试");
                    });
                }).catch(function(e, o) {
                    t(o || "登录出错，请稍后再试");
                }) : (t({
                    errMsg: r.errMsg || "赠送券的人有点多，请稍后再试",
                    errorCode: r.errorCode
                }), v.umpBiz({
                    bizid: "636",
                    operation: "6",
                    result: "1",
                    message: "ret:" + r.errorCode
                }));
            }).catch(function(e) {
                t(e.errMsg || "网络请求失败，请稍后再试"), v.umpBiz({
                    bizid: "636",
                    operation: "6",
                    result: "1",
                    message: "fail:" + e.errMsg
                });
            });
        }).catch(function(e, o) {
            t(o || "登录出错，请稍后再试");
        });
    });
}

function s(e) {
    return new y(function(o, t) {
        h.getLoginPromise().then(function() {
            g({
                url: "https://wq.jd.com/activeapi/deletejdcoupon",
                data: {
                    couponid: e.couponid || "",
                    batchid: e.batchid || "",
                    passkey: e.passKey || ""
                }
            }).then(function(n) {
                var r = n.body;
                0 == r.ret ? (v.umpBiz({
                    bizid: "636",
                    operation: "5",
                    result: "0",
                    message: "ret: suc"
                }), o(r)) : 2 == r.ret ? h.doLogin().then(function() {
                    s(e).then(function(e) {
                        o(e);
                    }).catch(function(e) {
                        t(e.message || "网络请求失败，请稍后再试");
                    });
                }).catch(function(e, o) {
                    t(o || "登录出错，请稍后再试");
                }) : (v.umpBiz({
                    bizid: "636",
                    operation: "5",
                    result: "1",
                    message: "ret:" + r.errMsg
                }), t({
                    errMsg: r.errMsg || "删除优惠券失败，请重试",
                    errorCode: r.errorCode
                }));
            }).catch(function(e) {
                v.umpBiz({
                    bizid: "636",
                    operation: "5",
                    result: "1",
                    message: "fail:" + e.message
                }), t(e.message || "网络请求失败，请稍后再试");
            });
        }).catch(function(e, o) {
            t(o || "登录出错，请稍后再试");
        });
    });
}

function p(e) {
    return new y(function(o, t) {
        h.getLoginPromise().then(function() {
            g({
                url: "https://wq.jd.com/activeapi/canceljdcouponsharev2",
                data: {
                    couponid: e.couponid || "",
                    batchid: e.batchid || "",
                    discount: e.discount || "",
                    quota: e.quota || ""
                }
            }).then(function(n) {
                var r = n.body;
                0 == r.errorCode ? (o(r), v.umpBiz({
                    bizid: "636",
                    operation: "7",
                    result: "0",
                    message: "ret: suc"
                })) : 2 == r.errorCode ? h.doLogin().then(function() {
                    p(e).then(function(e) {
                        o(e);
                    }).catch(function(e) {
                        t(e.errMsg || "网络请求失败，请稍后再试");
                    });
                }).catch(function(e, o) {
                    t(o || "登录出错，请稍后再试");
                }) : (t({
                    errMsg: r.errMsg || "取消优惠券分享失败，请重试",
                    errorCode: r.errorCode
                }), v.umpBiz({
                    bizid: "636",
                    operation: "7",
                    result: "1",
                    message: "ret:" + r.errorCode
                }));
            }).catch(function(e) {
                t(e.errMsg || "网络请求失败，请稍后再试"), v.umpBiz({
                    bizid: "636",
                    operation: "7",
                    result: "1",
                    message: "fail:" + e.errMsg
                });
            });
        }).catch(function(e, o) {
            t(o || "登录出错，请稍后再试");
        });
    });
}

function d(e) {
    return new y(function(o, t) {
        h.getLoginPromise().then(function() {
            g({
                url: "https://wq.jd.com/activeapi/receivejdcouponsharev2",
                data: {
                    couponid: e.couponid || "",
                    cdkey: e.cdkey || ""
                }
            }).then(function(n) {
                var r = n.body;
                0 == r.errorCode ? (o(r), v.umpBiz({
                    bizid: "636",
                    operation: "8",
                    result: "0",
                    message: "ret: suc"
                })) : 2 == r.errorCode ? h.doLogin().then(function() {
                    d(e).then(function(e) {
                        o(e);
                    }).catch(function(e) {
                        t(e.errMsg || "网络请求失败，请稍后再试");
                    });
                }).catch(function(e, o) {
                    t(o || "登录出错，请稍后再试");
                }) : (t({
                    errMsg: r.errMsg || "接受优惠券分享失败，请重试",
                    errorCode: r.errorCode
                }), v.umpBiz({
                    bizid: "636",
                    operation: "8",
                    result: "1",
                    message: "ret:" + r.errorCode
                }));
            }).catch(function(e) {
                t(e.errMsg || "网络请求失败，请稍后再试"), v.umpBiz({
                    bizid: "636",
                    operation: "8",
                    result: "1",
                    message: "fail:" + e.errMsg
                });
            });
        }).catch(function(e, o) {
            t(o || "登录出错，请稍后再试");
        });
    });
}

function l() {
    return new y(function(e, o) {
        h.getLoginPromise().then(function() {
            g({
                url: "https://wq.jd.com/activeapi/getcdkeycouponsharev2",
                data: {}
            }).then(function(t) {
                var n = t.body;
                0 == n.errorCode ? (e(n), v.umpBiz({
                    bizid: "636",
                    operation: "9",
                    result: "0",
                    message: "ret: suc"
                })) : 2 == n.errorCode ? h.doLogin().then(function() {
                    l().then(function(o) {
                        e(o);
                    }).catch(function(e) {
                        o(e.errMsg || "网络请求失败，请稍后再试");
                    });
                }).catch(function(e, t) {
                    o(t || "登录出错，请稍后再试");
                }) : (o({
                    errMsg: n.errMsg || "获取cdkey失败，请重试",
                    errorCode: n.errorCode
                }), v.umpBiz({
                    bizid: "636",
                    operation: "9",
                    result: "1",
                    message: "ret:" + n.errorCode
                }));
            }).catch(function(e) {
                o(e.errMsg || "网络请求失败，请稍后再试"), v.umpBiz({
                    bizid: "636",
                    operation: "9",
                    result: "1",
                    message: "fail:" + e.errMsg
                });
            });
        }).catch(function(e, t) {
            o(t || "登录出错，请稍后再试");
        });
    });
}

function f() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Date(), o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "YYYY-MM-DD HH:mm:ss", t = {
        YYYY: e.getFullYear(),
        MM: ("0" + (e.getMonth() + 1)).slice(-2),
        DD: ("0" + e.getDate()).slice(-2),
        HH: ("0" + e.getHours()).slice(-2),
        mm: ("0" + e.getMinutes()).slice(-2),
        ss: ("0" + e.getSeconds()).slice(-2),
        w: [ "日", "一", "二", "三", "四", "五", "六" ][e.getDay()],
        YY: ("" + e.getFullYear()).slice(-2),
        M: e.getMonth() + 1,
        D: e.getDate(),
        H: e.getHours(),
        m: e.getMinutes(),
        s: e.getSeconds()
    };
    return Object.keys(t).forEach(function(e) {
        o = o.replace(e, t[e]);
    }), o;
}

function m(e, o) {
    if (null == o || o < 1) return [];
    for (var t = [], n = 0, r = e.length; n < r; ) t.push(Array.prototype.slice.call(e, n, n += o));
    return t;
}

var h = require("../../../common/login/login.js"), g = require("../../../common/request/request.js"), y = require("../../../libs/promise.min"), b = require("../../../models/coupon/coupon_model"), v = require("../../../common/fe_report/usability.js"), S = require("../../../common/fe_helper.js"), T = {
    10: !0,
    11: !0,
    12: !0,
    13: !0,
    14: !0,
    15: !0
}, C = null;

module.exports = {
    getPPMS: function() {
        return new y(function(e, o) {
            C ? e(C) : g.get({
                url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev34398.jsonp"
            }).then(function(t) {
                var n = t.body;
                if (n.data && n.data.length) {
                    v.umpBiz({
                        bizid: "636",
                        operation: "11",
                        result: "0",
                        message: "ret: suc"
                    });
                    var r = -1;
                    if (n.data.some(function(e, o) {
                        return 3 == e.channel && 1 == e.scene && (r = o, !0);
                    }), -1 == r) return o(), !1;
                    var i = n.data[r], c = S.getServerTime() || new Date().getTime(), u = i.bdate ? new Date(i.bdate).getTime() : c, a = i.edate ? new Date(i.edate).getTime() : c;
                    c >= u && c <= a ? (C = i, e(i)) : o();
                } else v.umpBiz({
                    bizid: "636",
                    operation: "11",
                    result: "1",
                    message: "fail:no ppms data"
                }), o();
            }).catch(function(e) {
                e.code;
                var t = e.message;
                v.umpBiz({
                    bizid: "636",
                    operation: "11",
                    result: "1",
                    message: "fail:" + t
                }), o();
            });
        });
    },
    loadCouponData: o,
    couponsFilter: t,
    sortUseableCoupons: r,
    handleUseableCoupons: function(e) {
        var o = [];
        return (e = t(e)).forEach(function(e, t) {
            (e = n(e)).disabled = !1, e.isFilterShow = !0, e.useableCouponStatus = 3, e.ticketPurchase = {
                isGoodsLoaded: !1,
                isGoodsError: !1,
                requestNum: 0
            };
            var r = new Date().getTime(), i = r - e.createTime, c = i < 2592e5, u = e.endTime - r, a = u < 2592e5;
            e.newTimestamp = i, e.expiringTimestamp = u, 0 == e.couponKind || 1 != e.couponTypeNum && 2 != e.couponTypeNum && 3 != e.couponTypeNum || (e.isShowGoods = !0), 
            c ? (e.useableCouponStatus = 1, e.conerStyle = "col_red", e.conerStr = "新到") : a && (e.useableCouponStatus = 2, 
            e.conerStyle = "col_red", e.conerStr = "快过期", e.goodsNoWrap = [], e.goods = []), 
            e.canBeShare && o.push(Object.assign({}, e, {
                tabIndex: 1
            })), e.tabIndex = 0;
        }), {
            useable: r(e),
            social: o
        };
    },
    handleUsedCoupons: function(e) {
        var o = [], r = [];
        return (e = t(e)).forEach(function(e) {
            e = n(e), T[e.state] ? (e.tabIndex = 1, r.push(e)) : (e.tabIndex = 2, e.conerStyle = "col_grey", 
            e.conerStr = "已使用", e.useTime = parseFloat(e.useTime), o.push(e));
        }), o.sort(function(e, o) {
            return o.useTime - e.useTime;
        }), {
            used: o,
            social: r
        };
    },
    handleExpiredCoupons: function(e) {
        var o = [], r = [];
        return (e = t(e)).forEach(function(e) {
            e = n(e), T[e.state] ? (e.tabIndex = 1, r.push(e)) : (e.tabIndex = 3, e.conerStyle = "col_grey", 
            e.conerStr = "已过期", o.push(e));
        }), o.sort(function(e, o) {
            return o.endTime - e.endTime;
        }), {
            expired: o,
            social: r
        };
    },
    handleSocialCoupons: function(o) {
        var t = {
            2: [],
            10: [],
            11: [],
            12: [],
            13: [],
            14: [],
            15: []
        }, n = {
            10: {
                conerStyle: "col_yellow",
                conerStr: "赠送中"
            },
            11: {
                conerStyle: "col_yellow",
                conerStr: "共享中"
            },
            12: {
                conerStyle: "col_yellow",
                conerStr: "转让中"
            },
            13: {
                conerStyle: "col_grey",
                conerStr: "已赠送"
            },
            14: {
                conerStyle: "col_grey",
                conerStr: "已共享"
            },
            15: {
                conerStyle: "col_grey",
                conerStr: "已转让"
            }
        };
        return o.forEach(function(e) {
            n[e.state] && (e.conerStyle = n[e.state].conerStyle, e.conerStr = n[e.state].conerStr, 
            10 != e.state && 11 != e.state && 12 != e.state || (e.disabled = !1)), t[e.state].push(e);
        }), t[2].sort(function(e, o) {
            return o.createTime - e.createTime;
        }), t[10].sort(function(e, o) {
            var t = parseFloat(e.operateTime);
            return parseFloat(o.operateTime) - t;
        }), t[13].sort(function(e, o) {
            var t = parseFloat(e.completeTime);
            return parseFloat(o.completeTime) - t;
        }), [ 11, 12, 14, 15 ].forEach(function(e) {
            t[e].sort(function(e, o) {
                var t = parseFloat(e.createTime);
                return parseFloat(o.createTime) - t;
            });
        }), [].concat(e(t[2]), e(t[10]), e(t[12]), e(t[11]), e(t[13]), e(t[15]), e(t[14]));
    },
    queryQuanShare: c,
    queryQuanSharev2: u,
    createShareUrl: a,
    delCoupon: s,
    getCDKeyCouponShare: l,
    cancelCouponShare: p,
    receiveCouponShare: d,
    getExpiringGood: function(e, o, t) {
        return new y(function(n, r) {
            i(e, o, t).then(function(e) {
                var o = e.splice(0, 9), t = {};
                o.forEach(function(e) {
                    var o = e.price.toString() || "";
                    e.priceFormat = o.split(".");
                }), t.goodsNoWrap = o.slice(0, 7), t.goods = m(o, 3), t.isGoodsLoaded = !0, t.isGoodsError = !1, 
                n(t);
            }).catch(function(e) {
                r(e);
            });
        });
    },
    formatDate: f,
    handleCoupon: n
};