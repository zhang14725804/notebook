!function(e) {
    function t(o) {
        if (a[o]) return a[o].exports;
        var n = global.installedModules[o] = a[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
    }
    e = Object.assign(require("../../../../commons.js").modules, e), e = Object.assign(require("../../../../vendors.js").modules, e);
    var a = {};
    a = global.installedModules = global.installedModules || {}, t.m = e, t.c = a, t.d = function(e, a, o) {
        t.o(e, a) || Object.defineProperty(e, a, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var a = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(a, "a", a), a;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 149);
}({
    149: function(e, t, a) {
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var n = o(a(0)), r = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
            return t.default = e, t;
        }(a(1)), s = o(a(2)), i = getApp(), c = {
            0: "未发货",
            1: "已发货"
        };
        (0, n.default)(r.Tab, {
            data: {
                fetching: !0,
                order_no: "",
                image_url: "",
                goods_count: 0,
                expressMap: {},
                expressList: [],
                selectedId: ""
            },
            onLoad: function(e) {
                var t = this, a = e.dbid;
                if (a) {
                    var o = i.db.get(a) || {};
                    this.setData({
                        order_no: o.order_no,
                        image_url: o.image_url,
                        goods_count: o.goods_count
                    });
                } else {
                    var n = e.orderNo;
                    this.setData({
                        order_no: n
                    }), this.fetchOrder();
                }
                i.carmen({
                    api: "kdt.logistics.trace/2.0.0/search",
                    data: {
                        tid: this.data.order_no
                    },
                    success: function(e) {
                        var a = {}, o = e.data.packs.map(function(e, t) {
                            return a[e.id] = {
                                trace: JSON.parse(e.express.transit_info.data) || [],
                                state: c[e.state],
                                express_no: e.express.express_no,
                                name: e.express.express_name
                            }, {
                                id: e.id,
                                title: "包裹" + (t + 1)
                            };
                        });
                        t.setData({
                            fetching: !1,
                            expressMap: a,
                            expressList: o,
                            selectedId: o[0] && o[0].id
                        });
                    },
                    fail: function(e) {
                        wx.showModal({
                            title: "哎呀出错了",
                            content: e.msg || "没有找到物流信息",
                            showCancel: !1,
                            confirmText: "返回",
                            success: function() {
                                wx.navigateBack();
                            }
                        });
                    }
                });
            },
            onShow: function() {
                this.setData({
                    copyright: i.globalData.copyright,
                    is_big_shop: i.globalData.is_big_shop
                });
            },
            navigateBack: function() {
                wx.navigateBack();
            },
            handleZanTabChange: function(e) {
                var t = e.selectedId;
                this.setData({
                    selectedId: t
                });
            },
            fetchOrder: function() {
                var e = this;
                wx.showToast({
                    title: "数据加载中",
                    icon: "loading",
                    duration: 1e4
                }), i.carmen({
                    api: "kdt.trade.buyer.search/1.0.0/get",
                    data: {
                        order_no: this.data.order_no
                    },
                    success: function(t) {
                        wx.hideToast();
                        var a = t.trades[0].items, o = a[0].goods_info.img_url, n = (0, s.default)(o, "!200x200.jpg");
                        e.setData({
                            image_url: n,
                            goods_count: a.length
                        });
                    },
                    fail: function(e) {
                        console.log("fail", e);
                    }
                });
            }
        });
    }
});