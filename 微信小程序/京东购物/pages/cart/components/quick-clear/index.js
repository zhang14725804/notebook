var t = require("../../../../bases/component"), e = require("../../../../behaviors/attributes"), a = require("../../../../common/logger"), o = require("../../../../api/Ptag/report_manager"), s = new a("购物车-快速清理"), n = require("api"), r = [], i = [], c = !1, u = !1;

new t({
    behaviors: [ e ],
    properties: {
        options: {
            type: Object,
            observer: "onShow"
        }
    },
    data: {
        loading: !0,
        hasError: !1,
        selections: {},
        groups: [],
        headerText: "",
        selectedNum: 0,
        removedCnt: 0,
        isTabPage: !1
    },
    attached: function() {},
    methods: {
        onShow: function(t) {
            if ((t = t || {
                show: !1
            }).stock) {
                var e = n.filterNoStock(t.stock);
                r = e.skus, i = e.params;
            }
            var a = this.helper.getPageUrl().route;
            this.data.isTabPage = "pages/cart/cart/index" === a, t.show && this.load();
        },
        load: function() {
            var t = this;
            this.setData({
                loading: 1
            }), u = !1, n.loadData({
                noStockSkusParams: i
            }).then(function(e) {
                t.data.groups = n.groupBy(e), t.data.groups.forEach(function(e) {
                    t.data.selections[e.key] = {};
                }), t.setData(Object.assign(t.data, {
                    hasError: 0,
                    loading: 0,
                    headerText: t.data.groups.header
                })), t.exposureReport();
            }).catch(function(e) {
                s.error(e), t.setData({
                    loading: 0,
                    hasError: 1
                });
            });
        },
        exposureReport: function() {
            var t = {
                noStock: "7014.29.15",
                oneYear: "7014.29.17",
                halfYear: "7014.29.19",
                oneMonth: "7014.29.21",
                inAMonth: "7014.29.22"
            };
            this.data.groups.map(function(t) {
                return t.key;
            }).forEach(function(e) {
                var a = t[e];
                o.addPtagExposure(a);
            });
        },
        getSelections: function(t) {
            var e = 0, a = 0, s = [], n = {
                noStock: "7014.29.14",
                oneYear: "7014.29.16",
                halfYear: "7014.29.18",
                oneMonth: "7014.29.20",
                inAMonth: "7014.29.23"
            };
            return Object.values(this.data.selections).forEach(function(t) {
                Object.entries(t).forEach(function(t) {
                    var e = t[0];
                    t[1] && (s.push(e), a++);
                });
            }), t && (e = Object.values(this.data.selections[t]).filter(function(t) {
                return t;
            }).length) && n[t] && o.addPtagExposure(n[t]), {
                groupLen: e,
                groupsLen: a,
                skus: s
            };
        },
        selectAll: function(t) {
            var e = t.currentTarget.dataset, a = e.selected, o = e.key, s = this.data.groups.find(function(t) {
                return t.key === o;
            }), n = this.data.groups.findIndex(function(t) {
                return t.key === o;
            }), r = this.data.selections[o], i = void 0, c = {};
            s.products.forEach(function(t) {
                var e = (4 == t.itemType ? t.suitId + "_" : "") + t.skuId;
                r[e] = !a;
            }), c["selections." + o] = r, i = this.getSelections(o), c["groups[" + n + "].selections"] = i.groupLen, 
            c.selectedNum = i.groupsLen, c["groups[" + n + "].selected"] = !a, this.setData(c);
        },
        select: function(t) {
            var e = t.currentTarget.dataset, a = e.selected, o = e.id, s = e.key, n = this.data.groups.find(function(t) {
                return t.key === s;
            }), r = this.data.groups.findIndex(function(t) {
                return t.key === s;
            }), i = {}, c = void 0;
            this.data.selections[s][o] = !a, i["selections." + s + "." + o] = !a, c = this.getSelections(s), 
            i["groups[" + r + "].selections"] = c.groupLen, i.selectedNum = c.groupsLen, i["groups[" + r + "].selected"] = c.groupLen == n.totalNum, 
            this.setData(i);
        },
        close: function(t) {
            Object.assign(t, {
                needRefresh: c
            }), this.triggerEvent("close", t), this.setData({
                groups: [],
                hasError: 0,
                loading: 0,
                selectedNum: 0
            }), c = !1, this.data.removedCnt = 0;
        },
        clearSelections: function() {
            var t = {
                headerText: "",
                selectedNum: 0
            };
            this.getSelections().skus.forEach(function(e) {
                var a = n.findById(e);
                a && (t["groups." + a.groupName + "." + a.skuId] = !1);
            }), this.setData(t);
        },
        refresh: function() {
            this.setData({
                loading: 1,
                hasError: 0
            }), this.load();
        },
        removeSelections: function(t) {
            var e = this, a = this.getSelections().skus, s = [];
            if (!a.length) return this.toast.show({
                icon: this.toast.ICON.WARNING,
                content: "请选择要删除的商品"
            });
            a.forEach(function(t) {
                var e = n.findById(t);
                !!e && "noStock" === e.groupName && n.getSkusFromRawData(e).forEach(function(t) {
                    var e = r.findIndex(function(e) {
                        return e == t;
                    });
                    r.splice(e, 1), i.splice(e, 1);
                });
            }), o.addPtagExposure("7014.29.24"), s = n.getRemoveParamsBySkus(a), n.remove(s).then(function(s) {
                e.data.groups = n.groupBy(s), e.data.selections = {}, e.data.groups.forEach(function(t) {
                    e.data.selections[t.key] = {};
                }), c = !0, e.toast.show({
                    icon: e.toast.ICON.SUCCESS,
                    content: 0 === e.data.groups.totalNum ? "删除成功" : "删除成功，可继续清理"
                }), o.addPtagExposure("7014.29.27"), 0 === e.data.groups.totalNum ? (e.close(Object.assign(t, {
                    clearAll: !0
                })), e.setData({
                    groups: [],
                    hasError: 0,
                    loading: 0,
                    selectedNum: 0
                })) : (e.data.removedCnt += a.length, e.setData(Object.assign(e.data, {
                    hasError: 0,
                    loading: 0,
                    selectedNum: 0,
                    headerText: "已清理" + e.data.removedCnt + "件商品，可继续清理"
                })));
            }).catch(function(t) {
                e.toast.show({
                    icon: e.toast.ICON.WARNING,
                    content: "删除失败，请稍后再试"
                });
            });
        },
        add2Favorite: function(t) {
            var e = this, a = this.getSelections().skus;
            if (!a.length) return this.toast.show({
                icon: this.toast.ICON.WARNING,
                content: "请选择要收藏的商品"
            });
            var r = n.getRemoveParamsBySkus(a), i = [];
            if (a.forEach(function(t) {
                var e = n.findById(t);
                n.getSkusFromRawData(e).forEach(function(t) {
                    i.push({
                        itemId: t
                    });
                });
            }), i.length > 40) return this.toast.show({
                icon: this.toast.ICON.WARNING,
                content: "一次收藏不能超过 40 个商品哦"
            });
            o.addPtagExposure("7014.29.25"), n.add2Favorite(i, r).then(function(s) {
                e.data.groups = n.groupBy(s), e.data.selections = {}, e.data.groups.forEach(function(t) {
                    e.data.selections[t.key] = {};
                }), c = !0, 0 !== e.data.groups.totalNum && e.toast.show({
                    icon: e.toast.ICON.SUCCESS,
                    content: 0 === e.data.groups.totalNum ? "移入收藏成功" : "移入收藏成功，可继续清理"
                }), o.addPtagExposure("7014.29.26"), 0 === e.data.groups.totalNum ? (e.close(Object.assign(t, {
                    clearAll: !0
                })), e.setData({
                    groups: [],
                    hasError: 0,
                    loading: 0,
                    selectedNum: 0
                })) : (e.data.removedCnt += a.length, e.setData(Object.assign(e.data, {
                    hasError: 0,
                    loading: 0,
                    selectedNum: 0,
                    headerText: "已清理" + e.data.removedCnt + "件商品，可继续清理"
                })));
            }).catch(function(t) {
                s.error(t), e.toast.show({
                    icon: e.toast.ICON.WARNING,
                    content: "收藏失败，请稍后再试"
                });
            });
        },
        noscroll: function() {}
    }
});