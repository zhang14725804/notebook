function e() {
    var e = I.getUserAddressID();
    return (e = 3 === e.split(/_/).length ? e + "_0" : e).replace(/_/g, "-");
}

function r(e) {
    var r = "", t = "", o = [], n = [];
    return arguments.length > 1 && void 0 !== arguments[1] && arguments[1] || 1 == e.isFactory ? r = "不计重量" : e.weight && 0 != +e.weight && (r = (e.weight / 1e3).toFixed(3) + "kg"), 
    e.color && o.push(e.color), e.size && o.push(e.size), o.length && (t = "" + o.join("，")), 
    r && n.push(r), t && n.push(t), n.join("；");
}

function t() {
    var r = Date.now();
    return b({
        clearAll: !0
    }), g.get({
        url: "https://wq.jd.com/deal/mshopcart/cartview",
        data: {
            templete: 1,
            locationid: e()
        }
    }).then(function(e) {
        p.debug("请求用时", Date.now() - r);
        var o = e.body, n = 0 == o.errId, i = 8994 == o.errId, s = 13 == o.errId;
        return w().umpBiz({
            bizid: T,
            operation: A.LIST,
            result: o.errId,
            message: o.errId + "_" + o.errMsg
        }), n ? ((o = h(o)).venders.forEach(function(e) {
            e.list.forEach(function(e) {
                e.products.forEach(function(e) {
                    var r = e.mainSku, t = r.locType, o = r.lsId;
                    1 == t && !N.includes(o) && N.push(o);
                });
            });
        }), l.resolve(o)) : i ? l.resolve(h(k)) : s ? f.doLogin().then(t) : l.reject(new Error(o.errMsg || "哎呀，操作发生点意外，请重新试试 " + (o.errId || "")));
    }, function(e) {
        return w().umpBiz({
            bizid: T,
            operation: A.LIST,
            result: e.code,
            message: e.code + "_" + e.message
        }), l.reject(e);
    });
}

function o(e, r) {
    var t = 0;
    switch (e) {
      case "1":
        t = 1;
        break;

      case "2":
        t = 4;
        break;

      case "3":
        t = r.manGiftSkus ? r.manGiftSkus.length ? 10 : 9 : 11;
        break;

      case "4":
        t = 12, t = "cmdty" === r.__itemCate ? 13 : "canselectgift" === r.__itemCate ? 15 : "selectedgift" === r.__itemCate ? 16 : 13;
    }
    return t;
}

function n(e) {
    var r = [];
    return e.forEach(function(e) {
        var t = [];
        if (e.vSkuId && 2 != e.polyType) t.push(e.vSkuId, "", e.num, e.vSkuId, 4 == e.polyType ? 29 : 24, e.itemId, e.pid); else {
            var n = e.itemId, i = e.polyType, s = e.mainSku;
            t.push(2 == i ? n : s.id, "", e.num || 1, 2 == i ? n : s.id, o(i, e), 1 == i ? "" : n, e.pid || n), 
            t.push(e.listSelectGiftPoolGiftIds || ""), t.push(""), t.push(""), t.push(""), t.push(e.beanOrPlusPromoId || "");
        }
        r.push(t.join(","));
    }), r.join("$");
}

function i(r) {
    var t = n([ r ]);
    return g.get({
        url: "https://wq.jd.com/deal/mshopcart/modifycmdynum",
        data: {
            templete: 1,
            commlist: t,
            type: 0,
            locationid: e(),
            scene: 0,
            reg: 1
        }
    }).then(function(e) {
        var t = e.body, o = 0 == t.errId, n = (t.errId, 13 == t.errId);
        return o ? (w().umpBiz({
            bizid: T,
            operation: A.MODIFY_CMDY_NUM,
            result: t.errId,
            message: t.errId + "_" + t.errMsg
        }), l.resolve(h(t))) : n ? f.doLogin().then(function() {
            return i(r);
        }, function(e) {
            return p.error(e), l.reject(new Error("哎呀，操作发生点意外，请重新试试 " + (t.errId || "")));
        }) : (w().umpBiz({
            bizid: T,
            operation: A.MODIFY_CMDY_NUM,
            result: t.errId,
            message: t.errId + "_" + t.errMsg
        }), l.reject(new Error(t.errMsg || "哎呀，操作发生点意外，请重新试试 " + (t.errId || ""))));
    }, function(e) {
        return w().umpBiz({
            bizid: T,
            operation: A.MODIFY_CMDY_NUM,
            result: e.code,
            message: e.code + "_" + e.message
        }), l.reject(e);
    });
}

function s(r, t, o) {
    var i = "", u = {
        templete: 1,
        commlist: i,
        type: 0,
        all: "all" === t.type ? 1 : 0,
        locationid: e(),
        reg: 1
    };
    if ("all" === t.type) ; else if ("shop" === t.type) {
        var a = [], d = null;
        (d = t.venders.find(function(e) {
            return e.vid == t.venderId;
        })) && d.list.forEach(function(e) {
            2 == e.polyType ? a.push(Object.assign(e, {
                itemId: e.itemId,
                polyType: e.polyType,
                pid: 0
            })) : (e.products.forEach(function(r) {
                a.push(Object.assign(r, {
                    itemId: e.itemId,
                    polyType: e.polyType
                }));
            }), e.suits && e.suits.forEach(function(r) {
                a.push(Object.assign(r, {
                    polyType: e.polyType,
                    pid: 0
                }));
            }));
        }), i = n(a);
    } else "product" === t.type && (i = n([ t ]));
    return g.get({
        url: r,
        data: Object.assign(u, {
            commlist: i
        })
    }).then(function(e) {
        var n = e.body, i = 0 == n.errId, u = (n.errId, 13 == n.errId);
        return i ? (w().umpBiz({
            bizid: T,
            operation: o,
            result: A.SUCCESS,
            message: ""
        }), l.resolve(h(n))) : u ? f.doLogin().then(function() {
            return s(r, t);
        }, function(e) {
            return p.error(e), l.reject(new Error("哎呀，操作发生点意外，请重新试试 " + (n.errId || "")));
        }) : (w().umpBiz({
            bizid: T,
            operation: o,
            result: n.errId,
            message: n.errId + "_" + n.errMsg
        }), l.reject(new Error(n.errMsg || "哎呀，操作发生点意外，请重新试试 " + (n.errId || ""))));
    }, function(e) {
        return w().umpBiz({
            bizid: T,
            operation: o,
            result: e.code,
            message: e.code + "_" + e.message
        }), l.reject(e);
    });
}

function u(r, t) {
    var o = {
        url: "https://wq.jd.com/deal/mshopcart/replaceitems",
        data: {
            templete: 1,
            commlist: n([ r, t ]),
            type: B.SUIT == t.polyType ? O.VIRTUAL_SUIT : O.NORMAL_ITEM,
            locationid: e(),
            scene: 0,
            reg: I.gUserData().definePin
        }
    };
    return g.get(o).then(function(e) {
        var o = e.body, n = 0 == o.errId, i = 13 == o.errId;
        return n ? (o = Object.assign(h(o), {
            scrollIntoView: "top"
        }), w().umpBiz({
            bizid: T,
            operation: A.REPLACE_ITEMS,
            result: A.SUCCESS,
            message: ""
        }), l.resolve(o)) : i ? f.doLogin().then(function() {
            return u(r, t);
        }, function(e) {
            return p.error(e), l.reject(new Error("哎呀，操作发生点意外，请重新试试 " + (o.errId || "")));
        }) : (w().umpBiz({
            bizid: T,
            operation: A.REPLACE_ITEMS,
            result: o.errId,
            message: o.errId + "_" + o.errMsg
        }), l.reject(new Error(o.errMsg || "哎呀，操作发生点意外，请重新试试 " + (o.errId || ""))));
    }, function(e) {
        return w().umpBiz({
            bizid: T,
            operation: A.REPLACE_ITEMS,
            result: e.code,
            message: e.code + "_" + e.message
        }), l.reject(e);
    });
}

function a(r) {
    var t = "", o = void 0;
    Array.isArray(r) ? (o = r[0].__type || 0, t = n(r = r.map(function(e) {
        return e.__itemCate = 1 === o ? "selectedgift" : "cmdty", e;
    }))) : (o = r.__type || 0, r.__itemCate = 1 === o ? "selectedgift" : "cmdty", t = n([ r ]));
    var i = {
        templete: 1,
        commlist: t,
        type: o,
        checked: 0,
        locationid: e(),
        reg: 1,
        t: Math.random()
    };
    return g.get({
        url: "https://wq.jd.com/deal/mshopcart/rmvCmdy",
        data: i
    }).then(function(e) {
        var t = e.body, o = 8994 == t.errId, n = 0 == t.errId, i = 13 == t.errId;
        return o ? l.resolve(h(k)) : n ? (w().umpBiz({
            bizid: T,
            operation: A.REMOVE,
            result: A.SUCCESS,
            message: ""
        }), l.resolve(h(t))) : i ? f.doLogin().then(function() {
            return a(r);
        }, function(e) {
            return p.error(e), l.reject(new Error("哎呀，操作发生点意外，请重新试试 " + (t.errId || "")));
        }) : l.reject(new Error(t.errMsg || "哎呀，操作发生点意外，请重新试试 " + (t.errId || "")));
    }, function(e) {
        return w().umpBiz({
            bizid: T,
            operation: A.REMOVE,
            result: e.code,
            message: e.code + "_" + e.message
        }), l.reject(e);
    });
}

function d(r) {
    var t = {
        url: "https://wq.jd.com/deal/mshopcart/modifyCmdyPromo",
        data: {
            templete: 1,
            commlist: n([ r ]),
            type: 0,
            locationid: e(),
            scene: 0,
            reg: 1
        }
    };
    return g.get(t).then(function(e) {
        var t = e.body, o = 0 == t.errId, n = (t.errId, 13 == t.errId);
        return o ? (w().umpBiz({
            bizid: T,
            operation: A.MODIFY_CMDY_PROMO,
            result: A.SUCCESS,
            message: ""
        }), l.resolve(h(t))) : n ? f.doLogin().then(function() {
            return d(r);
        }, function(e) {
            return p.error(e), l.reject(new Error("哎呀，操作发生点意外，请重新试试 " + (t.errId || "")));
        }) : (w().umpBiz({
            bizid: T,
            operation: A.MODIFY_CMDY_PROMO,
            result: t.errId,
            message: t.errId + "_" + t.errMsg
        }), l.reject(new Error(t.errMsg || "哎呀，操作发生点意外，请重新试试 " + (t.errId || ""))));
    }, function(e) {
        return w().umpBiz({
            bizid: T,
            operation: A.MODIFY_CMDY_PROMO,
            result: e.code,
            message: e.code + "_" + e.message
        }), l.reject(e);
    });
}

function c() {
    var e = {
        margin: {},
        iou: {},
        balanceBeans: 0,
        flash: {}
    };
    return g.get({
        url: "https://wq.jd.com/deal/mshopcart/getcartassisit",
        data: {
            templete: 1
        }
    }).then(function(r) {
        var t = r.body, o = 0 == t.errId, n = 13 == t.errId;
        return o ? (w().umpBiz({
            bizid: T,
            operation: A.MARGIN,
            result: A.SUCCESS,
            message: t.errMsg
        }), t.marginItems && t.marginItems.length && t.marginItems.forEach(function(r) {
            r.skuId && r.margin && (e.margin[r.skuId] = r.margin);
        }), e.balanceBeans = +t.balanceBeans, D = e.balanceBeans, l.resolve(e)) : n ? f.doLogin().then(c) : void w().umpBiz({
            bizid: T,
            operation: A.MARGIN,
            result: err.code,
            message: err.message
        });
    }, function(r) {
        return w().umpBiz({
            bizid: T,
            operation: A.MARGIN,
            result: r.code,
            message: r.message
        }), l.resolve(e);
    });
}

function m() {
    return g.get({
        url: "https://wq.jd.com/deal/recvaddr/getrecvaddrlistV3",
        data: {}
    }).then(function(e) {
        var r = e.body, t = 0 == r.errCode;
        return 13 == r.errCode ? f.doLogin().then(m) : (t ? w().umpBiz({
            bizid: T,
            operation: A.ADDRESS_LIST,
            result: A.SUCCESS,
            message: ""
        }) : w().umpBiz({
            bizid: T,
            operation: A.ADDRESS_LIST,
            result: r.errCode,
            message: r.errCode + "_" + r.msg
        }), t ? l.resolve(r.list) : l.reject(r));
    }, function(e) {
        return w().umpBiz({
            bizid: T,
            operation: A.ADDRESS_LIST,
            result: e.code,
            message: e.code + "_" + e.message
        }), l.reject(e);
    });
}

var l = require("../../libs/promise.min.js"), p = new (require("../../common/logger.js"))("购物车Model"), g = require("../../common/request/request.js"), I = require("../../common/user_info.js"), f = require("../../common/login/login.js"), S = (require("../../common/cookie-v2/cookie.js"), 
require("../../common/request/util").formatJSON, require("data-store")), h = S.format, v = S.findItemById, C = S.findProductBy, y = S.getAllSkuId, _ = S.findProductBySkuId, E = S.getAllSkuIdIgnoreSuit, b = S.removeProductsCache, z = S.getVenderCouponParams, M = S.getVenders, j = S.getSkuCategoryNum, O = {
    NORMAL_ITEM: 0,
    GIFT_SUIT: 1,
    SERVICE_CONNTRACT: 2,
    VIRTUAL_SUIT: 3,
    GIFT_3C: 6,
    SERVICE_GIFT: 7
}, B = {
    SINGLE: 1,
    SUIT: 2,
    MF_SUIT: 3,
    MZ_SUIT: 4
}, k = {
    cart: {
        allChecked: 0,
        skuNumAndPrice: {
            cashBack: 0,
            factPrice: 0,
            chkMainSkuNum: 0,
            mainSkuNum: 0,
            mainSkuCount: 0
        },
        venderCart: []
    }
}, T = 616, A = {
    STOCK: 1,
    MARGIN: 2,
    YB_SERVICES: 3,
    LIST: 4,
    ADD_CMDY: 5,
    MODIFY_CMDY_NUM: 6,
    CHECK: 7,
    UNCHECK: 8,
    REPLACE_ITEMS: 9,
    REMOVE: 10,
    MODIFY_CMDY_PROMO: 11,
    VENINFOS: 12,
    SHOP_COUPON: 13,
    ADDRESS_LIST: 14,
    FAVORITE: 15,
    SUCCESS: 0,
    FAIL: 1
}, N = [], D = 0, w = function() {};

w = function() {
    var e = getCurrentPages().slice(0).pop().us;
    return w = function() {
        return e;
    }, e;
}, module.exports = {
    ACTIONS: O,
    addCmdy: function() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : O.NORMAL_ITEM, t = arguments[1], o = n(t = Array.isArray(t) ? t : [ t ]);
        return g.get({
            url: "https://wq.jd.com/deal/mshopcart/addCmdy",
            data: {
                templete: 1,
                commlist: o,
                type: r,
                locationid: e(),
                reg: 1,
                scene: 0
            }
        }).then(function(e) {
            var r = e.body, t = 0 == r.errId;
            return r.errId, r.errId, t ? (w().umpBiz({
                bizid: T,
                operation: A.ADD_CMDY,
                result: A.SUCCESS,
                message: ""
            }), l.resolve(h(r))) : (w().umpBiz({
                bizid: T,
                operation: A.ADD_CMDY,
                result: r.errId,
                message: r.errMsg
            }), l.reject(new Error(r.errMsg || "哎呀，操作发生点意外，请重新试试 " + (r.errId || ""))));
        }, function(e) {
            return w().umpBiz({
                bizid: T,
                operation: A.ADD_CMDY,
                result: e.code,
                message: e.code + "_" + e.message
            }), l.reject(e);
        });
    },
    getCartView: t,
    checkCmdy: function(e) {
        return s("https://wq.jd.com/deal/mshopcart/checkcmdy", e, A.CHECK);
    },
    uncheckCmdy: function(e) {
        return s("https://wq.jd.com/deal/mshopcart/uncheckcmdy", e, A.UNCHECK);
    },
    modifyCmdyNum: i,
    modifyCmdyPromo: d,
    rmvCmdy: a,
    getManGiftSkus: function(e) {
        var r = {
            canSelectedGiftNum: 1,
            manGiftSkus: []
        }, t = v(e);
        return t && t.manGiftSkus && (r.canSelectedGiftNum = t.canSelectedGiftNum, r.manGiftSkus = t.manGiftSkus), 
        r;
    },
    getGiftPool: function(e, r) {
        var t = [], o = v(r);
        return o && o.products && (t = o.products.filter(function(r) {
            return r.mainSku.id == e;
        })), t[0].gifts;
    },
    findItemById: v,
    findProductBy: C,
    getVendersName: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], r = {
            url: "https://wq.jd.com/deal/mshopcart/getveninfos",
            data: {
                vid: e.join(","),
                lsids: N.join(",")
            }
        };
        return e.length || N.length ? g.get(r).then(function(e) {
            var r = e.body, t = 0 == r.errId;
            return t ? w().umpBiz({
                bizid: T,
                operation: A.VENINFOS,
                result: A.SUCCESS,
                message: ""
            }) : w().umpBiz({
                bizid: T,
                operation: A.VENINFOS,
                result: r.errId,
                message: r.errId + "_" + r.errMsg
            }), l.resolve(t ? r : {
                venInfos: []
            });
        }, function(e) {
            return w().umpBiz({
                bizid: T,
                operation: A.VENINFOS,
                result: e.code,
                message: e.code + "_" + e.message
            }), l.resolve({
                venInfos: []
            });
        }) : l.resolve({
            venInfos: [],
            locShops: []
        });
    },
    getStock: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : y(), o = {
            url: "https://ss.jd.com/ss/areaStockState/mget",
            data: {
                area: e().replace(/-/g, ","),
                coord: I.getAddress().coordinateWithType,
                app: "wx_cart",
                skuNum: t.join(";"),
                ch: 4
            }
        }, n = [ 2, 8, 9, 52 ], i = {}, s = {};
        return t.length ? g.get(o).then(function(e) {
            var t = e.body;
            for (var o in t) !function(e) {
                var o = t[e], u = +o.c, a = _(e), d = -1 == [ 34 ].findIndex(function(e) {
                    return e == +o.a;
                });
                a && (a = a.mainSku, d && (d = -1 == u || u > 0 && +a.lowestBuy < u), s[e] = d ? u : 0, 
                i[e] = r(a, -1 != n.findIndex(function(e) {
                    return e == +o.e;
                })));
            }(o);
            return w().umpBiz({
                bizid: T,
                operation: A.STOCK,
                result: A.SUCCESS,
                message: ""
            }), l.resolve({
                spec: i,
                stock: s
            });
        }, function(e) {
            return w().umpBiz({
                bizid: T,
                operation: A.STOCK,
                result: e.code,
                message: e.message
            }), l.resolve({
                spec: {},
                stock: {}
            });
        }) : l.resolve({
            spec: i,
            stock: s
        });
    },
    getYbItems: function() {
        var r = {
            url: "https://wq.jd.com/deal/mshopcart/getybitems",
            data: {
                isnewyb: 1,
                locationid: e()
            }
        };
        return y().length ? g.get(r).then(function(e) {
            var r = e.body, t = 0 == r.errId, o = {};
            return t && r.platformInfos.forEach(function(e) {
                var r = "" + e.skuId, t = e.platformConfigVOs.filter(function(e) {
                    return 1 == e.selected;
                }), n = t.length;
                e.rSuitId && (r += "_" + e.rSuitId), n && (t = t.map(function(r) {
                    return Object.assign(r, {
                        brandName: e.brandName
                    });
                }), o[r] ? o[r].push(t[0]) : o[r] = [ t[0] ]);
            }), w().umpBiz({
                bizid: T,
                operation: A.YB_SERVICES,
                result: t ? A.SUCCESS : A.FAIL,
                message: t ? "" : "errId:" + r.errId
            }), l.resolve(o);
        }, function(e) {
            return w().umpBiz({
                bizid: T,
                operation: A.YB_SERVICES,
                result: e.code,
                message: e.message
            }), l.resolve({});
        }) : l.resolve({});
    },
    getAllSkuId: y,
    getAllSkuIdIgnoreSuit: E,
    findProductBySkuId: _,
    replaceProduct: u,
    favorite: function(e) {
        var r = {
            url: "https://wq.jd.com/fav/comm/FavCommBatchAdd",
            data: {}
        }, t = [];
        return e.forEach(function(e) {
            var r = e.itemId;
            e.polyType != B.MF_SUIT && e.polyType != B.MZ_SUIT || (r = e.vSkuId || e.mainSku.id), 
            t.push(r);
        }), Object.assign(r.data, {
            callback: "favorite",
            commId: t.join(",")
        }), g.get(r).then(function(r) {
            var t = r.body, o = 0 == t.iRet;
            return o ? w().umpBiz({
                bizid: T,
                operation: A.FAVORITE,
                result: A.SUCCESS,
                message: ""
            }) : w().umpBiz({
                bizid: T,
                operation: A.FAVORITE,
                result: t.iRet,
                message: t.iRet + "_" + t.errMsg
            }), o ? l.resolve(e) : l.reject(new Error("哎呀，收藏商品失败了，请稍后再试~"));
        }, function(e) {
            return w().umpBiz({
                bizid: T,
                operation: A.FAVORITE,
                result: e.code,
                message: e.code + "_" + e.message
            }), l.reject(e);
        });
    },
    removeProductsCache: b,
    queryCoupon: function() {
        var e = z();
        return e.length ? g.get({
            url: "https://wq.jd.com/deal/couponquery/querycoupon",
            data: {
                commlist: e
            }
        }).then(function(e) {
            var r = e.body, t = [];
            if (0 == r.errId) {
                w().umpBiz({
                    bizid: T,
                    operation: A.SHOP_COUPON,
                    result: A.SUCCESS,
                    message: ""
                });
                var o = r.venderCartV2, n = void 0 === o ? [] : o, i = r.coupoVo, s = r.venderCart;
                Array.isArray(s) ? t = s : Array.isArray(n) && n.forEach(function(e) {
                    var r = {
                        vid: e.vid,
                        coupoVo: []
                    };
                    e.couponSku.forEach(function(e) {
                        var t = i.find(function(r) {
                            var t = +r.couponid && r.couponid == e.couponid && 2 == r.couponDo, o = +r.batchId && r.batchId == e.batchId && 1 == r.couponDo;
                            return t || o;
                        });
                        t && r.coupoVo.push(Object.assign(t, {
                            skuidlist: e.skuidlist
                        }));
                    }), t.push(r);
                });
            } else w().umpBiz({
                bizid: T,
                operation: A.SHOP_COUPON,
                result: r.errId,
                message: r.errId + "_" + r.errMsg
            });
            return l.resolve(t);
        }, function(e) {
            return w().umpBiz({
                bizid: T,
                operation: A.SHOP_COUPON,
                result: e.code,
                message: e.code + "_" + e.message
            }), l.reject(e);
        }) : l.resolve([]);
    },
    getVenders: M,
    getBalanceBeans: function() {
        return D;
    },
    getAddressList: m,
    getSkuCategoryNum: j,
    getAssist: c
};