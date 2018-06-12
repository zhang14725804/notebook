function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e) {
    return e == I || e == g ? "type_jd" : "-" == e[0] ? "type_multi" : "type_3rd";
}

function n(e) {
    return e.icon = t(e.popInfo.vid), delete e.popInfo.fbpVender, e;
}

function i(e) {
    var t = e.mainSku;
    return e.show_price = m(e.price).split(/\./), t.image = y.getImg(t.image, 150), 
    e.selectPromotion.length && (e.selectPromotion = u(e.selectPromotion)), e.showGifts = [], 
    e.showAttachments = [], e.gifts.skus.forEach(function(t) {
        t.image = y.getImg(t.image, 150), 1 == t.type && e.showAttachments.push(t), 2 == t.type && e.showGifts.push(t);
    }), e;
}

function u(e) {
    var t = {
        list: [],
        value: "",
        index: 0
    };
    return (e = e.filter(function(e) {
        return 1 != e.ptype && 4 != e.ptype;
    })).every(function(e, n) {
        return 1 != e.sstate || (t.value = e.pnote, t.index = n, !1);
    }), t.list = e.slice(0, e.length), t;
}

function c(e) {
    var t = [], n = 0, i = 0, u = 0;
    if ([ {
        name: "global",
        text: "京东全球购商品"
    }, {
        name: "otcdrug",
        text: "京东大药房药品"
    } ].forEach(function(c, r) {
        var o = e[c.name];
        o && 0 != o.chkMainSkuNum && (t.push({
            category: c.name,
            text: c.text,
            checkedNum: o.chkMainSkuNum,
            checkedSkuCount: o.checkedSkuCount,
            price: m(o.factPrice),
            checked: !1
        }), n += +o.chkMainSkuNum, i += +o.factPrice, u += +o.checkedSkuCount);
    }), t.length) {
        var c = e.chkMainSkuNum - n, r = e.checkedSkuCount - u;
        c && t.push({
            category: "other",
            text: "其它商品",
            checkedSkuCount: r,
            checkedNum: c,
            price: m(e.factPrice - i),
            checked: !1
        }), t[0].checked = !0;
    }
    return t;
}

function r(e) {
    var r = [], s = {}, k = "";
    return a(), Object.assign(s, {
        skuNum: e.cart.skuNumAndPrice.mainSkuCount,
        checked: e.cart.skuNumAndPrice.mainSkuNum == e.cart.skuNumAndPrice.chkMainSkuNum,
        checkedNum: e.cart.skuNumAndPrice.chkMainSkuNum,
        checkedSkuCount: e.cart.skuNumAndPrice.checkedSkuCount,
        price: m(e.cart.skuNumAndPrice.factPrice),
        cashback: m(e.cart.skuNumAndPrice.cashBack),
        total: m(+e.cart.skuNumAndPrice.factPrice + +e.cart.skuNumAndPrice.cashBack),
        details: c(e.cart.skuNumAndPrice)
    }), d(e.cart.skuNumAndPrice), v(e.cart), e.cart.venderCart.forEach(function(e) {
        var c = {
            icon: t((e = n(e)).popInfo.vid),
            vid: e.popInfo.vid,
            vname: e.popInfo.vname,
            list: [],
            checked: !1,
            editChecked: !1
        };
        e.sortedItems.forEach(function(e) {
            var t = {};
            t.itemId = e.itemId, t.polyType = e.polyType, Object.assign(t, e.polyItem), t.factPrice && (t.factPrice = m(t.factPrice)), 
            t.promoPrice && (t.promoPrice = m(t.promoPrice)), -1 == c.vid && Object.assign(c, {
                vid: e.itemId
            }), !_[c.vid] && (_[c.vid] = {}), 2 == t.polyType && (Object.assign(t, {
                editChecked: !1
            }), t.vSkuId && f({
                vid: c.vid,
                itemId: t.promotion.origPid,
                skuId: t.vSkuId
            })), t.suits && t.suits.forEach(function(e) {
                var n = _[c.vid];
                e.factPrice && (e.factPrice = m(e.factPrice)), e.promoPrice && (e.promoPrice = m(e.promoPrice)), 
                b.push(e.vSkuId), N[e.vSkuId] = Object.assign(e, {
                    itemId: t.itemId,
                    pid: t.itemId
                }), e.selectPromotion = u(e.selectPromotion), n && (n[e.itemId + "_" + e.vSkuId] = e), 
                C[t.itemId + "_" + e.vSkuId] = Object.assign(e, {
                    polyType: t.polyType,
                    editChecked: !1
                }), e.products.forEach(function(n) {
                    n = i(n), Object.assign(n, {
                        wxKey: t.polyType + "_" + e.vSkuId + "_" + n.mainSku.id,
                        itemId: e.vSkuId,
                        polyType: t.polyType
                    }), b.push(n.mainSku.id), j[n.mainSku.id] = n, A.push(n.mainSku.id);
                });
            }), t.products.forEach(function(e) {
                var n = _[c.vid];
                e = i(e), Object.assign(e, {
                    wxKey: t.polyType + "_" + t.itemId + "_" + e.mainSku.id,
                    itemId: t.itemId,
                    polyType: t.polyType
                }), 2 != t.polyType && Object.assign(e, {
                    editChecked: !1
                }), C[t.itemId + "_" + e.mainSku.id] = e, j[e.mainSku.id] = e, n && (n[t.itemId + "_" + (t.vSkuId || e.mainSku.id)] = e), 
                b.push(e.mainSku.id), 2 != t.polyType && A.push(e.mainSku.id);
            }), t.manGiftSkus && (t.manGiftSkus = t.manGiftSkus.map(function(e) {
                return e.image = y.getImg(e.image, 150), e.price = m(e.price), e.promoPrice = m(e.promoPrice).split(/\./), 
                e;
            })), N[t.itemId] = t, c.list.push(t);
        }), c.checked = o(c.vid), r.push(c), T.push({
            icon: c.icon,
            vid: c.vid,
            name: c.vname,
            list: c.list
        });
    }), +e.cart.skuNumAndPrice.mainSkuCount > P ? (P = e.cart.skuNumAndPrice.mainSkuCount, 
    k = "top") : P = e.cart.skuNumAndPrice.mainSkuCount, {
        scrollIntoView: k,
        venders: r,
        summary: s
    };
}

function o(e) {
    var t = _[e];
    if (!t) return !1;
    var n = Object.values(t), i = n.filter(function(e) {
        return 1 == e.checkType;
    });
    return n.length === i.length;
}

function a() {
    b = [], A = [], T = [];
}

function d(e) {
    S.setCookie({
        data: {
            mainSkuCount: e.mainSkuCount,
            cartNum: e.mainSkuNum
        },
        defaultExpires: !0
    });
}

function m() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments[1];
    return e = (e / 100).toFixed(2), t ? e.split(".") : e;
}

function s(e) {
    return N[e];
}

function k(e) {
    return C[e];
}

function p(e) {
    return j[e];
}

function f(e) {
    var t = e.clearAll, n = void 0 !== t && t, i = e.vid, u = e.itemId, c = e.skuId;
    if (n) _ = {}; else {
        var r = _[i];
        r && delete r[u + "_" + c];
    }
}

function l() {
    var e = [];
    for (var t in _) !function(t) {
        var n = Object.values(_[t]), i = [ t ];
        g != t && (n.forEach(function(e) {
            if (e.vSkuId) e.products.forEach(function(e) {
                var t = e.mainSku;
                i.push([ t.id, t.cid.split(/_/)[2], +t.oversea > 0 ? 1 : 0 ].join("_"));
            }); else {
                var t = e.mainSku;
                i.push([ t.id, t.cid.split(/_/)[2], +t.oversea > 0 ? 1 : 0 ].join("_"));
            }
        }), e.push(i.join(",")));
    }(t);
    return e.join("$");
}

function v(e) {
    var t = e.currentCount, n = e.maxCount;
    x = +n || 120, w = +t || 0;
}

var h = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), y = (new (require("../../common/logger.js"))("购物车data-store"), require("../../common/fe_helper.js")), S = require("../../common/cookie-v2/cookie.js"), I = 8888, g = 8899, P = 0, N = {}, C = {}, j = {}, b = [], A = [], _ = {}, T = [], x = 0, w = 0, O = function() {
    function t() {
        e(this, t);
    }
    return h(t, null, [ {
        key: "format",
        value: function(e) {
            return r(e);
        }
    }, {
        key: "findItemById",
        value: function(e) {
            return s(e);
        }
    }, {
        key: "findProductBy",
        value: function(e, t) {
            return k(e + "_" + t);
        }
    }, {
        key: "findProductBySkuId",
        value: function(e) {
            return p(e);
        }
    }, {
        key: "getAllSkuId",
        value: function() {
            return b;
        }
    }, {
        key: "getAllSkuIdIgnoreSuit",
        value: function() {
            return A;
        }
    }, {
        key: "removeProductsCache",
        value: function(e) {
            f(e);
        }
    }, {
        key: "getVenderCouponParams",
        value: function() {
            return l();
        }
    }, {
        key: "getVenders",
        value: function() {
            return T;
        }
    }, {
        key: "getSkuCategoryNum",
        value: function() {
            return {
                skuCateUpperLimit: x,
                currentSkuCateNum: w
            };
        }
    } ]), t;
}();

module.exports = O;