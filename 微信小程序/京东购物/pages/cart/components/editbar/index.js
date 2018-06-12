function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

function s(e, t) {
    var n = this, s = t.venderIndex, a = t.venderId, o = {};
    return this.rawData.venders.find(function(e) {
        return e.vid == a;
    }).list.forEach(function(t, r) {
        t.products.forEach(function(c) {
            Object.assign(o, i.apply(n, [ e, {
                itemId: t.itemId,
                venderIndex: s,
                itemIndex: r,
                venderId: a,
                skuId: c.mainSku.id
            } ]));
        }), t.suits && t.suits.forEach(function(t) {
            Object.assign(o, i.apply(n, [ e, {
                itemId: t.itemId,
                venderIndex: s,
                itemIndex: r,
                venderId: a,
                skuId: t.vSkuId
            } ]));
        });
    }), o;
}

function i(e, t) {
    var n = t.itemId, s = t.venderIndex, i = t.itemIndex, o = t.venderId, r = t.skuId, d = c.findItemById(n), l = c.findProductBy(n, r), u = {};
    if (d) {
        if (2 == d.polyType) u["venders[" + s + "].list[" + i + "].editChecked"] = e, l = d; else if (l.products) {
            var f = d.suits.findIndex(function(e) {
                return e.vSkuId == l.vSkuId;
            });
            -1 != f && (n = l.vSkuId, u["venders[" + s + "].list[" + i + "].suits[" + f + "].editChecked"] = e);
        } else {
            var h = d.products.findIndex(function(e) {
                return e.mainSku.id == l.mainSku.id;
            });
            -1 !== h && (n = r, u["venders[" + s + "].list[" + i + "].products[" + h + "].editChecked"] = e);
        }
        return e ? this.data.selections[n] = l : delete this.data.selections[n], a.apply(this, [ {
            mergeData: u,
            venderId: o,
            venderIndex: s,
            itemId: n,
            selected: e
        } ]);
    }
}

function a(e) {
    var t = this.data.selectionState.venders, n = e.mergeData, s = e.venderId, i = e.itemId, a = e.selected, o = e.venderIndex, r = t.list[s], c = {};
    return r.list[i] = a, r.state.select = Object.values(r.list).filter(function(e) {
        return e;
    }).length, r.state.unselect = r.state.total - r.state.select, c["venders[" + o + "].editChecked"] = r.state.total == r.state.select, 
    t.state.select = Object.values(t.list).filter(function(e) {
        return e.state.total == e.state.select;
    }).length, t.state.unselect = t.state.total - t.state.select, c["editor.checked"] = t.state.total == t.state.select, 
    Object.assign(c, n);
}

var o = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, n, s) {
        return n && e(t.prototype, n), s && e(t, s), t;
    };
}(), r = require("../../../component.js"), c = require("../../../../models/cart/model.js"), d = require("../../../../common/modal/modal.js"), l = {
    ALL: 1,
    VENDER: 2,
    PRODUCT: 3
}, u = l, f = [ function(e) {
    var t = this, n = {};
    return this.rawData.venders.forEach(function(i, a) {
        Object.assign(n, s.apply(t, [ e, {
            venderId: i.vid,
            venderIndex: a
        } ]));
    }), n;
}, s, i ], h = function(s) {
    function i() {
        e(this, i);
        var n = t(this, (i.__proto__ || Object.getPrototypeOf(i)).apply(this, arguments));
        return n.addFunc("removeSelections", n.removeSelections), n.addFunc("add2Favorite", n.add2Favorite), 
        n;
    }
    return n(i, r), o(i, [ {
        key: "defaultData",
        value: function() {
            return {
                selections: {},
                selectionState: {
                    venders: {
                        state: {
                            total: 0,
                            select: 0,
                            unselect: 0
                        },
                        list: {}
                    }
                },
                editor: {
                    editable: !1,
                    checked: !1
                }
            };
        }
    }, {
        key: "resetDefaultData",
        value: function() {
            this.data.selections = {}, this.data.selectionState = {
                venders: {
                    state: {
                        total: 0,
                        select: 0,
                        unselect: 0
                    },
                    list: {}
                }
            };
        }
    }, {
        key: "loadData",
        value: function(e) {
            this.resetDefaultData();
            var t = this.data.selectionState;
            this.rawData = e, t.venders.state.total = e.venders.length, e.venders.forEach(function(e) {
                e.list.forEach(function(n) {
                    !t.venders.list[e.vid] && (t.venders.list[e.vid] = {
                        state: {
                            total: 0,
                            select: 0,
                            unselect: 0
                        },
                        list: {}
                    });
                    var s = t.venders.list[e.vid], i = 1, a = 2 == n.polyType, o = !a && n.suits;
                    i = a ? 1 : o ? n.products.length + n.suits.length : n.products.length, s.state.total += i, 
                    n.products.forEach(function(e) {
                        var t = 2 == n.polyType ? n.itemId : e.mainSku.id;
                        !s.list[t] && (s.list[t] = {}), s.list[t] = 2 == n.polyType ? n.editChecked : e.editChecked;
                    }), n.suits && n.suits.forEach(function(e) {
                        var t = e.vSkuId;
                        !s.list[t] && (s.list[t] = {}), s.list[t] = e.editChecked;
                    });
                });
            });
        }
    }, {
        key: "select",
        value: function(e, t) {
            t = f[e -= 1].apply(this, [ !0, t ]), this.page.setData(t);
        }
    }, {
        key: "unselect",
        value: function(e, t) {
            t = f[e -= 1].apply(this, [ !1, t ]), this.page.setData(t);
        }
    }, {
        key: "onHide",
        value: function() {}
    }, {
        key: "removeSelections",
        value: function(e) {
            var t = this, n = this.data.selections, s = Object.values(n);
            if (!s.length) return this.toast.show({
                icon: this.toast.ICON.WARNING,
                content: "请选择要删除的商品"
            });
            d.show({
                title: "",
                content: "确认将已选中的" + s.length + "件商品删除吗？",
                maxHeight: "360",
                align: "center",
                showCancel: !0,
                cancelText: "取消",
                cancelColor: "#000",
                confirmText: "删除",
                confirmColor: "red",
                success: function() {
                    t.page.setLoadingState(1), c.rmvCmdy(s).then(t.page.render).then(t.page.renderVendersName).catch(function(e) {
                        t.page.setLoadingState(0), t.toast.show({
                            icon: t.toast.ICON.WARNING,
                            content: e.message
                        });
                    });
                }
            });
        }
    }, {
        key: "add2Favorite",
        value: function(e) {
            var t = this, n = this.data.selections, s = Object.values(n);
            if (!s.length) return this.toast.show({
                icon: this.toast.ICON.WARNING,
                content: "请选择要移至收藏的商品"
            });
            s.length && d.show({
                title: "",
                content: "确认将已选中的" + s.length + "件商品移至收藏？",
                maxHeight: "360",
                align: "center",
                showCancel: !0,
                cancelText: "取消",
                cancelColor: "#000",
                confirmText: "移至收藏",
                confirmColor: "red",
                success: function() {
                    t.page.setLoadingState(1), c.favorite(s).then(c.rmvCmdy).then(t.page.render).catch(function(e) {
                        t.page.setLoadingState(0), t.toast.show({
                            icon: t.toast.ICON.WARNING,
                            content: e.message
                        });
                    });
                }
            });
        }
    } ], [ {
        key: "OP",
        get: function() {
            return u;
        }
    }, {
        key: "OP_TYPE",
        get: function() {
            return l;
        }
    } ]), i;
}();

module.exports = h;