function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, r = Array(t.length); e < t.length; e++) r[e] = t[e];
        return r;
    }
    return Array.from(t);
}

function e(t) {
    var r = this, n = t.noStockSkusParams, o = {
        url: "https://wqdeal1.jd.com/deal/mshopcart/getclearcart",
        timeout: 3e3,
        data: {
            templete: 0,
            commlist: n.join("$")
        }
    };
    return c.get(o).then(function(t) {
        var o = t.body, u = 0 == o.errId, i = 13 == o.errId;
        return u ? s.resolve(o.clearcart) : i ? p.doLogin().then(e.bind(r, {
            noStockSkusParams: n
        })) : s.reject(o);
    }, function(t) {
        return s.reject(t);
    });
}

function r(t) {
    var e = (4 == t.itemType ? t.suitId + "_" : "") + t.skuId;
    return t.imgUrl = m.getImg(t.imgUrl, 67), t.id = e, t.wxKey = e, delete t.name, 
    delete t.timestamp, t;
}

function n() {
    var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
    if (!e.length) throw Error("params skus is empty");
    var r = {
        url: "https://wqdeal1.jd.com/deal/mshopcart/removeclearcart",
        data: {
            templete: 0,
            commlist: e.join("$")
        }
    };
    return c.get(r).then(function(r) {
        var o = r.body, u = 0 == o.errId, i = 13 == o.errId;
        return u ? s.resolve(o.clearcart) : i ? p.doLogin().then(n.bind(t, e)) : s.reject(o);
    }, function(t) {
        return s.reject(t);
    });
}

function o(t) {
    return h[t];
}

function u() {
    var t = [], e = [];
    return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []).forEach(function(r) {
        var n = o(r);
        if (n) {
            var u = i(n);
            e.push(u), "noStock" == n.groupName && t.push(n);
        } else f.error(r, " 未找到");
    }), e = e.concat(a(t));
}

function i(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = [ 1 == t.itemType ? t.skuId : t.suitId, "", "", "", t.itemType, "", "" ], n = 4 == t.itemType, o = "noStock" == t.groupName;
    return n ? r.push("suitType:" + t.virtualSuit) : r.push(""), r = r.join(","), r += (n ? "@@" : "") + "noStock:" + (e ? 1 : o ? 2 : 0);
}

function a() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = [];
    return Object.values(h).forEach(function(r) {
        "noStock" == r.groupName && (!t.length || t.find(function(t) {
            return t.id !== r.id;
        })) && e.push(i(r, !0));
    }), e;
}

var s = require("../../../../libs/promise.min"), c = (require("../../../../common/biz"), 
require("../../../../common/request/request")), m = (require("../../../../libs/moment.min"), 
require("../../../../common/fe_helper")), d = (require("../../../../common/utils"), 
require("../../../../common/logger")), l = require("../../../../models/cart/model"), p = require("../../../../common/login/login"), f = new d("购物车-快速清理 api"), h = {}, v = {};

module.exports = {
    loadData: e,
    groupBy: function(e) {
        h = {};
        var n = [], o = [ "noStock", "oneYear", "halfYear", "oneMonth", "inAMonth" ], u = {
            noStock: "无货商品",
            oneYear: "一年前加车商品",
            halfYear: "半年前加车商品",
            oneMonth: "一个月前加车商品",
            inAMonth: "一个月内加车商品"
        };
        n.totalNum = 0, o.forEach(function(o) {
            var i = e[o];
            if (i && +i.totalNum) {
                !v[o] && (v[o] = {}), Object.assign(v[o], i);
                var a = [], s = 0;
                i.suits.forEach(function(t) {
                    s += t.products.length - 1, t.products.forEach(function(e, r) {
                        0 === r && a.push({
                            timestamp: t.timestamp,
                            itemType: t.itemType,
                            suitId: t.vskuId || t.promoId,
                            skuId: e.skuId,
                            imgUrl: e.imgUrl,
                            virtualSuit: t.vskuId ? 1 : 0
                        });
                    });
                }), i.totalNum -= s, delete i.suits;
                var c = [].concat(t(i.products), a).sort(function(t, e) {
                    return +t.timestamp - +e.timestamp;
                }).map(function(t) {
                    return t.groupName = o, t = r(t), h[t.wxKey] = t, t;
                });
                i.products = c, n.push(Object.assign(i, {
                    title: u[o] || "",
                    key: o,
                    selected: !1
                })), n.totalNum += +i.totalNum;
            }
        });
        var i = l.getSkuCategoryNum(), a = i.skuCateUpperLimit, s = i.currentSkuCateNum;
        return n.header = s >= a ? "购物车已满，清理部分商品后才可继续加车" : s >= 80 ? "购物车快要满了，建议及时清理购物车" : "购物车快速清理", 
        n;
    },
    findById: o,
    remove: n,
    getRemoveParamsBySkus: function() {
        return u(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []);
    },
    getSkusFromRawData: function(t) {
        var e = 4 == t.itemType, r = (!!e && t.virtualSuit, []), n = e ? v[t.groupName].suits : v[t.groupName].products;
        if (e) {
            var o = n.find(function(e) {
                return e.vskuId == t.suitId || e.promoId == t.suitId;
            });
            o && (r = o.products.map(function(t) {
                return t.skuId;
            }));
        } else (t = n.find(function(e) {
            return e.skuId == t.skuId;
        })) && (r = [ t.skuId ]);
        return r;
    },
    filterNoStock: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = [], r = [];
        for (var n in t) t.hasOwnProperty(n) && 0 == t[n] && (e.push(n), r.push([ n, "", 1, n, "", "", 0 ].join(",")));
        return {
            skus: e,
            params: r
        };
    },
    add2Favorite: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = arguments[1];
        return l.favorite(t).then(function(t) {
            return n(e);
        });
    }
};