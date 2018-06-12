function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

function e(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function n(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function o(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

function a(t) {
    var e = "";
    return "object" == (void 0 === t ? "undefined" : i(t)) ? e = t.message : "string" == typeof t && (e = t), 
    e;
}

var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, r = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(e, n, o) {
        return n && t(e.prototype, n), o && t(e, o), e;
    };
}(), u = require("../../component.js"), s = require("../../item/api.js"), c = require("../../../common/fe_helper.js"), l = require("../../../libs/promise.min.js"), h = getApp(), p = 1, f = {
    skuProps: [],
    numController: !0,
    info: {
        text: "",
        price: "",
        image: "",
        sku: 0,
        name: ""
    },
    num: {
        total: 1,
        add: !0,
        sub: !1
    },
    newColorSize: [],
    show: !1,
    others: null,
    pool: {},
    canBuy: !0,
    itemTip: ""
}, m = {
    color: "颜色",
    size: "尺寸",
    spec: "规格"
}, d = function(i) {
    function d() {
        e(this, d);
        var t = n(this, (d.__proto__ || Object.getPrototypeOf(d)).apply(this, arguments));
        return t.addFunc("_hideSkuPanel", t.hideSkuPanel), t.addFunc("_confirmSkuPanel", t.confirmSkuPanel), 
        t.addFunc("_changeSku", t.changeSku), t.addFunc("_addNum", t.addNum), t.addFunc("_subNum", t.subNum), 
        t.addFunc("_inputNum", t.inputNum), t;
    }
    return o(d, u), r(d, [ {
        key: "defaultData",
        value: function() {
            return f;
        }
    }, {
        key: "onLoad",
        value: function() {
            h.event.on("showSkuPanel", this.showSkuPanel.bind(this));
        }
    }, {
        key: "onUnload",
        value: function() {
            h.event.off("showSkuPanel");
        }
    }, {
        key: "showSkuPanel",
        value: function(t) {
            var e = this, n = t.sku, o = t.total, a = t.numController, i = t.price, r = t.lowNum, u = t.image, l = t.others;
            if (this.setData({
                numController: a,
                others: l,
                show: !0
            }), i && u && this.setData({
                "info.price": i.split("."),
                "info.image": u
            }), r && "0" != r && (p = +r), l.packList) {
                for (var h = l.fIndex, f = l.sIndex, d = l.suit, k = l.packList[h].poolList[f - 1], v = k.saleProp, y = k.saleNames, g = [], P = {}, S = {}, N = k.colorList.length - 1; N >= 0; N--) if (n == k.colorList[N].skuId) {
                    S = k.colorList[N], P = {
                        color: k.colorList[N].color || "",
                        size: k.colorList[N].size || "",
                        spec: k.colorList[N].spec || ""
                    };
                    break;
                }
                y.forEach(function(t) {
                    var e = {};
                    e.value = v[t], e.name = t, e.text = m[t], e.current = P[t], e.sale = !0, g.push(e);
                });
                var b = d.cartid.split("_"), I = b.shift();
                b[f] = S.skuId;
                var w = b.join(",");
                s.fetchSuitPrice({
                    suitId: I,
                    skuIds: w
                }).then(function(t) {
                    var n = {
                        price: t.suitSkuPriceList[f].finalPrice.toFixed(2).split("."),
                        image: c.getImg(S.skuPicUrl, 160),
                        text: [ P.color, P.size, P.spec ].join(" "),
                        name: S.skuName,
                        sku: S.skuId,
                        choose: ""
                    };
                    e.setData({
                        info: n,
                        skuProps: g,
                        show: !0,
                        pool: k
                    });
                }).catch(function(t) {
                    e.toast.show({
                        icon: e.toast.ICON.WARNING,
                        content: t.message || "网络错误，请稍后重试~"
                    });
                });
            } else this.getSkuInfo(n).then(function(t) {
                var a = {
                    sub: (o = +o || 1) > p,
                    add: o < 200,
                    total: o || 1
                };
                e.setData({
                    num: a
                });
                var i = e.calcSkuForEachProp(t.props), r = e.updateCurrentSelect(t.props).join(""), u = t.skuName, s = [];
                i.forEach(function(t) {
                    s.push(t.current);
                }), s = s.join(" ");
                var l = {
                    price: ("" + t.price).split("."),
                    image: c.getImg(t.image, 160),
                    text: r,
                    name: u,
                    sku: n,
                    choose: s
                };
                e.setData({
                    info: l,
                    skuProps: i
                });
            }).catch(function(t) {
                e.toast.show({
                    icon: e.toast.ICON.WARNING,
                    content: t.message || "网络错误，请稍后重试~"
                });
            });
        }
    }, {
        key: "getSkuInfo",
        value: function(t) {
            var e = this;
            return new l(function(n, o) {
                s.initItem(t).then(function(t) {
                    var o = {};
                    o.canBuy = t.canBuy, o.skuId = t.skuId, o.skuName = t.skuName, o.props = t.props, 
                    o.marketPrice = t.marketPrice, o.originPrice = t.originPrice, o.price = t.price, 
                    o.image = t.images[0], ("" + o.price).indexOf(".") < 0 && (o.price = parseFloat(o.price).toFixed(2)), 
                    e.data.newColorSize && !e.data.newColorSize.length && e.setData({
                        newColorSize: t.newColorSize
                    }), n(o);
                }).catch(function(t) {
                    o(t);
                });
            });
        }
    }, {
        key: "getCurrentSelect",
        value: function(t) {
            var e = {};
            return t || (t = this.data.skuProps), t.forEach(function(t) {
                e[t.name] = t.current;
            }), e;
        }
    }, {
        key: "calcSkuForEachProp",
        value: function(e) {
            var n = this.data, o = n.skuProps, a = n.newColorSize, i = o.length ? o : e, r = this.getCurrentSelect(i);
            return Array.isArray(i) && i.forEach(function(e) {
                var n = [];
                e.value.forEach(function(o) {
                    var i = {};
                    Object.assign(i, r, t({}, e.name, o));
                    var u = s.getSpecifySku(i, a);
                    n.push(u.join("|"));
                }), e.sku = n;
            }), i;
        }
    }, {
        key: "updateCurrentSelect",
        value: function(t) {
            var e = [];
            return (t = t || this.data.skuProps).forEach(function(t) {
                t.current && t.value.length >= 1 && e.push(t.current, " ");
            }), e.push(this.data.num.total + "个"), e;
        }
    }, {
        key: "hideSkuPanel",
        value: function() {
            this.setData({
                show: !1
            }), this.setData(f);
        }
    }, {
        key: "confirmSkuPanel",
        value: function() {
            if (this.data.canBuy) {
                var t = this.data.info, e = this.data.num.total, n = this.data.others, o = this.data.skuProps, a = this.getCurrentSelect(o);
                this.checkPropSelect(a) ? (this.emit("confirmSkuPanel", {
                    info: t,
                    num: e,
                    others: n
                }), this.hideSkuPanel()) : this.toast.show({
                    icon: this.toast.ICON.WARNING,
                    content: "您未完整选中规格参数"
                });
            }
        }
    }, {
        key: "changeSku",
        value: function(e) {
            var n = this, o = this.data.skuProps, i = e.currentTarget.dataset, r = i.i, u = i.idx, l = i.name, h = e.currentTarget.dataset.val;
            if (o[r].sku) {
                var p = o[r].sku[u];
                if (!p) return;
                var f = this.getCurrentSelect();
                h == f[l] && (h = ""), this.setData(t({}, "skuProps[" + r + "].current", h));
                var m = this.calcSkuForEachProp();
                this.setData({
                    skuProps: m
                }), this.updateCurrentSelect(), f = this.getCurrentSelect(), 1 == p.split("|").length && this.checkPropSelect(f) && p != this.data.info.sku && this.getSkuInfo(p).then(function(t) {
                    void 0 === t.canBuy || t.canBuy ? n.setData({
                        itemTip: "",
                        canBuy: !0
                    }) : n.setData({
                        itemTip: "无货，或此商品不支持配送至该地址",
                        canBuy: !1
                    });
                    var e = n.calcSkuForEachProp(t.props), o = n.updateCurrentSelect(t.props).join(""), a = t.skuName, i = [];
                    e.forEach(function(t) {
                        i.push(t.current);
                    }), i = i.join(" ");
                    var r = {
                        price: ("" + t.price).split("."),
                        image: c.getImg(t.image),
                        text: o,
                        name: a,
                        sku: p,
                        choose: i
                    };
                    n.setData({
                        info: r,
                        skuProps: e
                    });
                }).catch(function(t) {
                    n.toast.show({
                        icon: n.toast.ICON.WARNING,
                        content: a(t) || "网络错误~"
                    });
                });
            } else {
                var d = this.data, k = d.skuProps, v = d.others, y = k[r].value[u], g = v.suit, P = v.sIndex, S = {}, N = this.data.pool, b = N.saleNames, I = null, w = [];
                k[r].current = y, k.forEach(function(t) {
                    S[t.name] = t.current, w.push(t.current);
                }), w = w.join(" ");
                for (var C = N.colorList.length - 1; C >= 0; C--) for (var j = 0, x = b.length - 1; x >= 0; x--) S[b[x]] == N.colorList[C][b[x]] && ++j == b.length && (I = N.colorList[C]);
                if (!I) return;
                var O = g.cartid.split("_"), D = O.shift();
                O[P] = I.skuId;
                var F = O.join(",");
                s.fetchSuitPrice({
                    suitId: D,
                    skuIds: F
                }).then(function(t) {
                    var e = t.suitSkuPriceList[P].finalPrice, o = {
                        price: t.packPromotionPrice.toFixed(2),
                        dis: t.packOriginalPrice.toFixed(2),
                        mprice: t.suitDiscount.toFixed(2)
                    }, a = {
                        price: e.toFixed(2).split("."),
                        image: c.getImg(I.skuPicUrl, 160),
                        text: [ S.color, S.size, S.spec ].join(" "),
                        name: I.skuName,
                        sku: I.skuId,
                        choose: w
                    };
                    g.suitPrice = o, n.setData({
                        info: a,
                        skuProps: k,
                        "others.suit": g
                    });
                }).catch(function(t) {
                    n.toast.show({
                        icon: n.toast.ICON.WARNING,
                        content: t.message || "网络错误，请稍后重试~"
                    });
                });
            }
        }
    }, {
        key: "checkPropSelect",
        value: function(t) {
            for (var e in t) if (!t[e]) return !1;
            return !0;
        }
    }, {
        key: "addNum",
        value: function(t) {
            var e = this.data.num.total;
            this.updateNum(+e + 1);
        }
    }, {
        key: "subNum",
        value: function(t) {
            var e = this.data.num.total;
            this.updateNum(+e - 1);
        }
    }, {
        key: "inputNum",
        value: function(t) {
            var e = t.detail.value;
            this.updateNum(parseInt(e) || 1);
        }
    }, {
        key: "updateNum",
        value: function(t) {
            var e = Math.min(200, 999), n = "", o = this.data.num, a = o.add, i = o.sub;
            t <= p ? (t = p, i = !1, p > 1 && (n = "该商品最少需购买" + p + "件")) : t >= e ? (t = e, 
            a = !1, n = 200 == e ? "单款最多可买200件" : "该商品最多可购买" + e + "件") : (a = !0, i = !0), 
            n && this.toast.show({
                icon: this.toast.ICON.WARNING,
                content: n
            }), this.setData({
                "num.total": t,
                "num.add": a,
                "num.sub": i
            });
        }
    } ]), d;
}();

module.exports = d;