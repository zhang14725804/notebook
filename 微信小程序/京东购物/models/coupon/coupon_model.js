function e(t) {
    p.getLoginPromise().then(function() {
        l.get({
            url: "https://wq.jd.com/activepersistent/couponrecommend/couponrecommend",
            data: {
                _t: +new Date(),
                source: "x"
            }
        }).then(function(i) {
            var r = i.body;
            0 == r.ret ? (n(function(e, n) {
                e || (n = n.filter(function(e) {
                    if (2 != e.status) return !0;
                })), n = n.slice(0, 5), t && t(e, n);
            }, r = o(r.couponlist)), h.umpBiz({
                bizid: "635",
                operation: "3",
                result: "0",
                message: "ret: suc"
            })) : 2 == r.ret ? p.doLogin().then(function() {
                e(t);
            }).catch(function() {
                t && t({
                    errId: -1e3,
                    errMsg: w
                }, []);
            }) : (f.log("专属推荐券接口返回失败", r.ret), h.umpBiz({
                bizid: "635",
                operation: "3",
                result: r.ret,
                message: "ret: " + r.ret
            }), t && t({
                errId: r.ret,
                errMsg: r.retmsg
            }, []));
        }).catch(function(e, n) {
            f.log("请求专属推荐券接口fail", n), h.umpBiz({
                bizid: "635",
                operation: "3",
                result: e,
                message: "fail:" + n
            }), t && t({
                errId: -999,
                errMsg: v
            }, []);
        });
    }).catch(function(e) {
        t && t({
            errId: -1e3,
            errMsg: w
        }, []);
    });
}

function t(e, n, o, i) {
    if (!e || !n) return o && o({
        errId: -999,
        errMsg: y
    }, null), !1;
    p.getLoginPromise().then(function() {
        var r = 33;
        i && i.sceneid && (r = i.sceneid), l.get({
            url: "https://wq.jd.com/activeapi/obtainjdshopfreecouponv2",
            data: {
                hj: "x",
                scene: r,
                key: e,
                roleid: n,
                _t: +new Date()
            }
        }).then(function(i) {
            var r = i.body;
            999 == r.code ? (h.umpBiz({
                bizid: "635",
                operation: "1",
                result: "0",
                message: "ret: suc"
            }), o && o(null, r.code)) : 14 == r.code || 15 == r.code ? (h.umpBiz({
                bizid: "635",
                operation: "1",
                result: "0",
                message: "ret: suc"
            }), o && o(null, r.code)) : 1e3 == r.code ? p.doLogin().then(function() {
                t(e, n, o);
            }).catch(function(e, t) {
                o && o({
                    errId: e,
                    errMsg: w
                }, null);
            }) : ([ "3", "5", "6", "7", "8", "9", "10", "11", "12", "13", "16", "17", "18", "19", "21", "22", "23", "24", "25", "30", "31", "32", "34", "36", "37", "38", "39", "40", "41", "42", "43", "147", "163", "164", "1002" ].indexOf("" + r.code) >= 0 ? h.umpBiz({
                bizid: "635",
                operation: "1",
                result: "0",
                message: "ret: suc"
            }) : h.umpBiz({
                bizid: "635",
                operation: "1",
                result: r.code,
                message: "ret: " + r.code
            }), o && o(null, r.code));
        }).catch(function(e, t) {
            h.umpBiz({
                bizid: "635",
                operation: "1",
                result: e,
                message: "fail:" + t
            }), o && o({
                errId: -999,
                errMsg: q
            }, null);
        });
    }).catch(function(e, t) {
        o && o({
            errId: e,
            errMsg: w
        }, null);
    });
}

function n(e, t) {
    if (0 == t.length) return e && e(null, []), !1;
    p.getLoginPromise().then(function() {
        for (var o = [], i = {}, r = [], u = 0; u < t.length; u += z) {
            i = {
                rolekeys: "",
                _t: +new Date()
            }, r = [], t.slice(u, u + z).forEach(function(e) {
                r.push(e.roleid + ":" + e.key);
            }), i.rolekeys = r.join("|");
            var a = new d(function(e, t) {
                l.get({
                    url: "https://wq.jd.com/activeapi/queryjdshopfreecouponstatus",
                    data: i
                }).then(function(n) {
                    var o = n.body;
                    0 == o.errorCode ? (h.umpBiz({
                        bizid: "635",
                        operation: "11",
                        result: "0",
                        message: "ret: suc"
                    }), e(o.data)) : 1 == o.errorCode ? t({
                        ret: o.errorCode,
                        msg: o.errMsg
                    }) : (h.umpBiz({
                        bizid: "635",
                        operation: "11",
                        result: o.errorCode,
                        message: "ret: " + o.errorCode
                    }), e([]));
                }).catch(function(t, n) {
                    h.umpBiz({
                        bizid: "635",
                        operation: "11",
                        result: t,
                        message: "fail:" + n
                    }), e([]);
                });
            });
            o.push(a);
        }
        d.all(o).then(function(n) {
            var o = null;
            t.forEach(function(e) {
                for (var t = 0; t < n.length; t++) if (o = n[t][e.roleid]) {
                    999 == o.resultCode ? e.status = 0 : 14 == o.resultCode || 15 == o.resultCode ? e.status = 1 : e.status = 2;
                    break;
                }
            }), e && e(null, t);
        }).catch(function(o) {
            console.error("查询优惠券状态错误", o), 1 == o.ret ? p.doLogin().then(function() {
                n(e, t);
            }).catch(function(n, o) {
                e && e({
                    errId: n,
                    errMsg: o
                }, t);
            }) : e({
                errId: 999,
                errMsg: o
            }, t);
        });
    }).catch(function(n, o) {
        console.log("登陆失败", n, o), e && e({
            errId: n,
            errMsg: o
        }, t);
    });
}

function o(e, t) {
    var n = [], o = {}, i = null;
    return e.forEach(function(e) {
        if (e.strCategoryName = e.strCategoryName.replace(/"/g, ""), e.strCategoryName.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.strCategoryName)) return !1;
        if (e.strLimitStr.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.strLimitStr)) return !1;
        if (!e.strLimitStr) return !1;
        if (o[e.nBatchId]) return !1;
        if (o[e.nBatchId] = !0, (i = {
            roleid: e.ddActivityId,
            key: e.strEncryptedKey,
            quota: e.strQuota,
            batchid: e.nBatchId,
            discount: e.strDiscount,
            limitstr: e.strLimitStr,
            couponstyle: 1 * e.nCouponStyle,
            coupontype: 1 * e.nCouponType,
            couponkind: 1 * e.nCouponKind,
            categoryid: 1 * e.nCategoryId,
            categoryname: e.strCategoryName,
            userate: e.dwUseRate,
            shopid: e.nShopId,
            status: 0,
            rebatevalue: "",
            rebatequota: "",
            rebatetype: 1,
            couponpic: m.getImg(e.sPicUrl),
            begintime: e.ddBeginTime || "",
            endtime: e.ddEndTime || "",
            limittype: e.nLimitType
        }).limitstr || (0 == i.couponkind && 3 == couponkind.couponstyle ? i.limitstr = "折扣神券(限部分商品可用，特殊品类及特价商品除外)" : 0 == i.couponkind && 1 == i.coupontype ? i.limitstr = "适用于京东全品类商品(特殊商品除外)" : 0 == i.couponkind && 0 == i.coupontype ? i.limitstr = "适用于京东全品类商品(特殊商品除外)" : 2 == i.coupontype && (i.limitstr = "限京东自营商品运费(部分特殊商品运费除外)")), 
        e.discount_info || (i.couponstyle = 0), 3 == i.couponstyle) if (1 == e.discount_info.info.length) i.rebatevalue = (10 * e.discount_info.info[0].discount).toFixed(1), 
        i.rebatequota = e.discount_info.info[0].quota, "0" == i.rebatevalue.slice(-1) && (i.rebatevalue = parseInt(i.rebatevalue)); else {
            var r = e.discount_info.info.concat();
            r.sort(function(e, t) {
                return e.quota >= t.quota ? -1 : 1;
            }), r.forEach(function(e) {
                var t = (10 * e.discount).toFixed(1);
                "0" == t.slice(-1) && (t = parseInt(t)), i.rebatevalue += t + "/", i.rebatequota += e.quota + "/";
            }), i.rebatevalue = i.rebatevalue.slice(0, -1), i.rebatequota = i.rebatequota.slice(0, -1), 
            i.rebatetype = 2;
        }
        (!t || t && t(i)) && n.push(i);
    }), n;
}

function i(e) {
    var t = [], n = [], o = [];
    return e.forEach(function(e) {
        if (2 == e.status) return !1;
        e.userate ? t.push(e) : 0 == e.coupontype ? n.push(e) : 1 == e.coupontype && o.push(e);
    }), t.sort(function(e, t) {
        return 1 * e.userate >= 1 * t.userate ? -1 : 1;
    }), n.sort(function(e, t) {
        return 1 * e.discount >= 1 * t.discount ? -1 : 1;
    }), o.sort(function(e, t) {
        return e.discount / e.quota >= t.discount / t.quota ? -1 : 1;
    }), t.length >= 40 ? t.slice(0, 40) : (t = t.concat(n.slice(0, 40))).length >= 40 ? t.slice(0, 40) : (t = t.concat(o)).slice(0, 40);
}

function r(e) {
    for (var t = [], n = [], o = [], i = 0, r = e.length; i < r && !(t.length >= 40); i++) 0 != e[i].couponkind ? 0 != e[i].coupontype ? 1 != e[i].coupontype || o.push(e[i]) : n.push(e[i]) : t.push(e[i]);
    return t.length >= 40 ? t.slice(0, 40) : (n.sort(function(e, t) {
        return e.discount >= t.discount ? -1 : 1;
    }), (t = t.concat(n)).length >= 40 ? t.slice(0, 40) : (o.sort(function(e, t) {
        return e.discount / e.quota >= t.discount / t.quota ? -1 : 1;
    }), (t = t.concat(o)).slice(0, 40)));
}

function u(e) {
    for (var t = [], n = [], o = 0, i = e.length; o < i && !(t.length >= 20); o++) 0 != e[o].couponkind ? n.push(e[o]) : t.push(e[o]);
    return t.length >= 20 ? t.slice(0, 20) : (t = t.concat(n)).slice(0, 20);
}

function a(e, t) {
    if (t.discountInfo && 3 == t.couponStyle) if (e.couponstyle = 3, 1 == t.discountInfo.info.length) e.rebatevalue = (10 * t.discountInfo.info[0].discount).toFixed(1), 
    e.rebatequota = t.discountInfo.info[0].quota, "0" == e.rebatevalue.slice(-1) && (e.rebatevalue = parseInt(e.rebatevalue)); else {
        var n = t.discountInfo.info.concat();
        n.sort(function(e, t) {
            return e.quota >= t.quota ? -1 : 1;
        }), n.forEach(function(t) {
            var n = (10 * t.discount).toFixed(1);
            "0" == n.slice(-1) && (n = parseInt(n)), e.rebatevalue += n + "/", e.rebatequota += t.quota + "/";
        }), e.rebatevalue = e.rebatevalue.slice(0, -1), e.rebatequota = e.rebatequota.slice(0, -1), 
        e.rebatetype = 2;
    }
    return e;
}

function c(e) {
    var t = new RegExp("roleid=([^=&]+)"), n = new RegExp("key=([^=&]+)"), o = e.match(t), i = e.match(n);
    return o = o ? o[1] : null, i = i ? i[1] : null, {
        roleid: o,
        key: i
    };
}

function s(e) {
    return e = e.split(";")[0], {
        discount: e.split(",")[0] || 0,
        quota: e.split(",")[1] || 0
    };
}

var p = require("../../common/login/login.js"), d = require("../../libs/promise.min.js"), l = require("../../common/request/request.js"), m = require("../../common/fe_helper.js"), f = require("../../common/log.js"), g = require("../../common/cookie-v2/cookie.js"), h = require("../../common/fe_report/usability.js"), b = {
    food: "https://wqs.jd.com/wqactive/food_coupon_wxapp.json",
    clothes: "https://wqs.jd.com/wqactive/clothes_coupon_wxapp.json",
    digital: "https://wqs.jd.com/wqactive/digital_coupon_wxapp.json",
    home: "https://wqs.jd.com/wqactive/home_coupon_wxapp.json",
    mother: "https://wqs.jd.com/wqactive/mother_coupon_wxapp.json",
    others: "https://wqs.jd.com/wqactive/others_coupon_wxapp.json"
}, v = "查询失败", y = "参数错误", q = "领券失败", w = "未登录或者登录失效";

module.exports = {
    globalppms: function(e) {
        l.get({
            url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33664.jsonp",
            data: {
                _t: +new Date()
            }
        }).then(function(t) {
            var n = t.body, o = n.data ? n.data || [] : [], i = m.getServerTime();
            (o = (o || []).filter(function(e) {
                if (e.banner_begtime && e.banner_endtime) return !(new Date(e.banner_begtime).getTime() > i || new Date(e.banner_endtime).getTime() < i);
            })).forEach(function(e) {
                e.bannerpic = m.getImg(e.bannerpic);
            }), h.umpBiz({
                bizid: "635",
                operation: "12",
                result: "0",
                message: "ret: suc"
            }), e && e(null, o);
        }).catch(function(t, n) {
            h.umpBiz({
                bizid: "635",
                operation: "12",
                result: t,
                message: "fail:" + n
            }), e && e({
                errId: -999,
                errMsg: v
            }, []);
        });
    },
    findandtodayCoupon: function(e) {
        l.get({
            channel: "http",
            url: "https://wqs.jd.com/wqactive/ppms.output_wxapp.json",
            data: {
                _t: +new Date()
            }
        }).then(function(t) {
            var n = t.body, i = n.pagev31232 ? n.pagev31232.data || [] : [], p = [], d = [], l = n.hotv2_coupon || [], f = {}, g = m.getServerTime();
            i.forEach(function(e) {
                if (!e.freeCouponList && !e.couponList) return !1;
                if (e.begtime && e.endtime) {
                    if (new Date(e.begtime).getTime() > g) return !1;
                    if (new Date(e.endtime).getTime() < g) return !1;
                }
                (e.freeCouponList || []).forEach(function(e) {
                    if (e.begtime && e.endtime) {
                        if (new Date(e.begtime).getTime() > g) return !1;
                        if (new Date(e.endtime).getTime() < g) return !1;
                    }
                    if (e.constraintBeginTime && e.constraintEndTime) {
                        if (new Date(e.constraintBeginTime).getTime() > g) return !1;
                        if (new Date(e.constraintEndTime).getTime() < g) return !1;
                    }
                    if (e.limitStr.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.limitStr)) return !1;
                    if (e.ppms_itemName.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.ppms_itemName)) return !1;
                    if (f[e.batchId]) return !1;
                    f[e.batchId] = !0;
                    var t = c(e.freeCouponLink);
                    if (!t.roleid || !t.key) return !1;
                    e.coupic || (e.coupic = e.couponAggregationImageurl);
                    var n = {
                        roleid: t.roleid,
                        key: t.key,
                        quota: e.quota,
                        batchid: e.batchId,
                        discount: e.discount,
                        limitstr: e.limitStr || e.venderName || e.notes,
                        couponstyle: 0,
                        coupontype: 1 * e.couponType,
                        couponkind: 1 * e.couponKind,
                        couponpic: m.getImg(e.coupic),
                        status: 0,
                        rebatevalue: "",
                        rebatequota: "",
                        rebatetype: 1,
                        begintime: new Date(e.couponBeginTime).getTime(),
                        endtime: new Date(e.couponEndTime).getTime(),
                        limittype: e.limitType
                    };
                    n = a(n, e), p.push(n);
                }), (e.couponList || []).forEach(function(e) {
                    var t = [];
                    if (e.begtime && e.endtime) {
                        if (new Date(e.begtime).getTime() > g) return !1;
                        if (new Date(e.endtime).getTime() < g) return !1;
                    }
                    if (e.ConstraintTime && (t = e.ConstraintTime.split("-"))[0] && t[1]) {
                        if (new Date(t[0]).getTime() > g) return !1;
                        if (new Date(t[1]).getTime() < g) return !1;
                    }
                    if (e.prizeName.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.prizeName)) return !1;
                    if (e.ppms_itemName.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.ppms_itemName)) return !1;
                    if (f[e.batchId]) return !1;
                    f[e.batchId] = !0;
                    var n = s(e.DiscountQuota);
                    if (0 != e.couponType && 1 != e.couponType && 2 != e.couponType) return !1;
                    var o = {
                        activeid: e.activeId,
                        activelevel: e.activeLevel,
                        quota: n.quota,
                        batchid: e.batchId,
                        discount: n.discount,
                        limitstr: e.prizeName,
                        couponstyle: 0,
                        coupontype: 1 * e.couponType,
                        couponkind: 1 * e.couponKind,
                        couponpic: m.getImg(e.coupic),
                        status: 0,
                        rebatevalue: "",
                        rebatequota: "",
                        rebatetype: 1,
                        begintime: t[0] ? new Date(t[0]).getTime() : 0,
                        endtime: t[1] ? new Date(t[1]).getTime() : 0,
                        limittype: "1"
                    };
                    o = a(o, e), d.push(o);
                });
            }), p = r(p), d = u(d), l = o(l, function(e) {
                return 2 == e.coupontype || 0 == e.couponkind;
            }), f = null, n = null, h.umpBiz({
                bizid: "635",
                operation: "9",
                result: "0",
                message: "ret: suc"
            }), e(null, l, p, d);
        }).catch(function(t, n) {
            h.umpBiz({
                bizid: "635",
                operation: "9",
                result: t,
                message: "fail:" + n
            }), e && e({
                errId: -999,
                errMsg: v
            }, [], [], []);
        });
    },
    todaycoupon: function(e) {
        l.get({
            url: "https://wqs.jd.com/data/ppms/js/ppms.pagev31232.json",
            data: {
                _t: +new Date()
            }
        }).then(function(t) {
            var n = t.body, o = [], i = {}, r = m.getServerTime();
            n.data.forEach(function(e) {
                if (new Date(e.begtime).getTime() < r && r < new Date(e.endtime).getTime()) {
                    if (!e.freeCouponList) return !1;
                    e.freeCouponList.forEach(function(e) {
                        if (e.limitStr.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.limitStr)) return !1;
                        if (e.ppms_itemName.indexOf("移动硬盘") < 0 && /电信|联通|移动|电信卡|联通卡|移动卡|全球购/.test(e.ppms_itemName)) return !1;
                        if (i[e.batchId]) return !1;
                        i[e.batchId] = !0;
                        var t = c(e.freeCouponLink);
                        if (!t.roleid || !t.key) return !1;
                        o.push({
                            roleid: t.roleid,
                            key: t.key,
                            quota: e.quota,
                            batchid: e.batchId,
                            discount: e.discount,
                            limitstr: e.limitStr || e.venderName || e.notes,
                            couponstyle: 0,
                            coupontype: 1 * e.couponType,
                            couponkind: 1 * e.couponKind,
                            couponpic: m.getImg(e.coupic),
                            status: 0
                        });
                    });
                }
            }), console.log("_________today coupon", o.length), i = null, n = null, h.umpBiz({
                bizid: "635",
                operation: "2",
                result: "0",
                message: "ret: suc"
            }), e(null, o);
        }).catch(function(t, n) {
            h.umpBiz({
                bizid: "635",
                operation: "2",
                result: t,
                message: "fail:" + n
            }), e && e({
                errId: -999,
                errMsg: v
            }, []);
        });
    },
    findcoupon: function(e) {
        l.get({
            url: "https://wqs.jd.com/wqactive/hotv2_coupon.json",
            data: {
                _t: +new Date()
            }
        }).then(function(t) {
            var n = t.body;
            n = o(n, function(e) {
                return 2 == e.coupontype || 0 == e.couponkind;
            }), h.umpBiz({
                bizid: "635",
                operation: "5",
                result: "0",
                message: "ret: suc"
            }), e(null, n);
        }).catch(function(t, n) {
            h.umpBiz({
                bizid: "635",
                operation: "5",
                result: t,
                message: "fail:" + n
            }), e && e({
                errId: -999,
                errMsg: v
            }, []);
        });
    },
    customcoupon: e,
    morecoupon: function(e, t) {
        if (!b[e]) return t && t({
            errId: -999,
            errMsg: y
        }, []), !1;
        l.get({
            url: b[e],
            data: {
                _t: +new Date()
            }
        }).then(function(e) {
            var r = e.body;
            n(function(e, n) {
                e || (n = (n = n.filter(function(e) {
                    return 2 != e.status;
                })).slice(0, 40)), t && t(e, n);
            }, r = i(r = o(r))), h.umpBiz({
                bizid: "635",
                operation: "4",
                result: "0",
                message: "ret: suc"
            });
        }).catch(function(n, o) {
            f.log("更多好券接口fail", o), h.umpBiz({
                bizid: "635",
                operation: "4",
                result: n,
                message: "fail(" + e + "): " + o
            }), t && t({
                errId: -999,
                errMsg: v
            }, []);
        });
    },
    coupongoods: function(e, t, n, o) {
        if (!e || !t) return o && o({
            errId: -999,
            errMsg: y
        }, []), !1;
        l.get({
            url: "https://wq.jd.com/search/searchco",
            data: {
                datatype: 1,
                _t: +new Date(),
                coupon_batch: e,
                coupon_kind: t,
                coupon_shopid: n || 0,
                coupon_aggregation: "yes"
            }
        }).then(function(e) {
            var t = e.body;
            if (0 == t.retcode) {
                var n = [];
                t.data.searchm.Paragraph && t.data.searchm.Paragraph.forEach(function(e) {
                    n.push({
                        sku: e.wareid,
                        price: e.dredisprice,
                        name: e.Content.warename,
                        imgurl: m.getImg(e.Content.imageurl, 230)
                    });
                }), h.umpBiz({
                    bizid: "635",
                    operation: "8",
                    result: "0",
                    message: "ret: suc"
                }), o && o(null, n);
            } else h.umpBiz({
                bizid: "635",
                operation: "8",
                result: t.retcode,
                message: "ret: " + t.retcode
            }), o && o({
                errId: t.retcode,
                errMsg: t.errmsg
            }, []);
        }).catch(function(e, t) {
            h.umpBiz({
                bizid: "635",
                operation: "8",
                result: e,
                message: "fail:" + t
            }), o && o({
                errId: -999,
                errMsg: v
            }, []);
        });
    },
    queryCouponStatus: n,
    guessgoods: function(e) {
        l.get({
            url: "https://diviner.jd.com/diviner",
            data: {
                lid: 1,
                lim: 12,
                p: 630020,
                ec: "utf-8",
                _t: +new Date(),
                pin: g.getCookie("pin"),
                uuid: g.getCookie("visitkey") || -1
            }
        }).then(function(t) {
            var n = t.body;
            if (n.success) {
                var o = [];
                n.data && n.data.forEach(function(e) {
                    o.push({
                        sku: e.sku,
                        price: e.jp,
                        name: e.t,
                        imgurl: m.getImg(e.img, 230)
                    });
                }), e && e(null, o), h.umpBiz({
                    bizid: "635",
                    operation: "10",
                    result: "0",
                    message: "ret: suc"
                });
            } else h.umpBiz({
                bizid: "635",
                operation: "10",
                result: "1",
                message: "ret: " + n.error_msg
            }), e && e({
                errId: -1,
                errMsg: n.error_msg
            }, []);
        }).catch(function(t, n) {
            h.umpBiz({
                bizid: "635",
                operation: "10",
                result: t,
                message: "fail:" + n
            }), e && e({
                errId: -999,
                errMsg: v
            }, []);
        });
    },
    getcoupon: t
};

var z = 50;