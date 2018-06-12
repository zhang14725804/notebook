!function(e) {
    function t(i) {
        if (a[i]) return a[i].exports;
        var n = global.installedModules[i] = a[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
    }
    e = Object.assign(require("../../../../commons.js").modules, e), e = Object.assign(require("../../../../vendors.js").modules, e);
    var a = {};
    a = global.installedModules = global.installedModules || {}, t.m = e, t.c = a, t.d = function(e, a, i) {
        t.o(e, a) || Object.defineProperty(e, a, {
            configurable: !1,
            enumerable: !0,
            get: i
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
    }, t.p = "", t(t.s = 148);
}({
    145: function(e, t, a) {
        t.getGoodsIdForMemberCard = function(e) {
            try {
                var t = e.items[0];
                if (20 == t.goods_type) return t.goods_id;
            } catch (e) {}
            return null;
        };
    },
    146: function(e, t, a) {
        var i = getApp();
        e.exports = {
            cancel: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], a = arguments[2];
                i.carmen({
                    api: "kdt.trade.bill.cancel/1.0.0/get",
                    data: e,
                    success: function(e) {
                        e.is_success && t && t(e);
                    },
                    fail: function(e) {
                        a && a(e);
                    }
                });
            },
            fetchOrderList: function(e, t, a) {
                var n = "all" === e.pagetype;
                console.log(e), i.carmen({
                    api: "kdt.trade.buyer.search/1.0.0/get",
                    data: e,
                    config: {
                        noStoreId: !0,
                        skipKdtId: n,
                        skipShopInfo: n
                    },
                    success: function(e) {
                        t && t(e);
                    },
                    fail: function(e) {
                        a && a(e);
                    }
                });
            },
            fetchOrder: function(e, t) {
                var a = "all" === e.pagetype;
                i.carmen({
                    api: "kdt.trade.buyer.search/1.0.0/get",
                    data: {
                        order_no: e.order_no
                    },
                    config: {
                        skipKdtId: a,
                        skipShopInfo: a
                    },
                    success: function(e) {
                        t && t(e);
                    }
                });
            }
        };
    },
    147: function(e, t, a) {
        e.exports = {
            status: {
                all: "ALL",
                topay: "WAIT_BUYER_PAY",
                totuan: "WAIT_GROUP",
                tosend: "WAIT_SELLER_SEND_GOODS",
                send: "WAIT_BUYER_CONFIRM_GOODS",
                sign: "TRADE_BUYER_SIGNED"
            },
            btns: {
                topay: [ "cancel", "topay" ],
                tosend: [],
                send: [],
                sign: [],
                cancel: []
            },
            tab: {
                list: [ {
                    id: "all",
                    title: "全部"
                }, {
                    id: "topay",
                    title: "待付款"
                }, {
                    id: "tosend",
                    title: "待发货"
                }, {
                    id: "send",
                    title: "已发货"
                }, {
                    id: "sign",
                    title: "已完成"
                } ],
                selectedId: "all",
                scroll: !1
            },
            list: {
                all: {
                    list: [],
                    page: 1,
                    finished: !1
                },
                topay: {
                    list: [],
                    page: 1,
                    finished: !1
                },
                totuan: {
                    list: [],
                    page: 1,
                    finished: !1
                },
                tosend: {
                    list: [],
                    page: 1,
                    finished: !1
                },
                send: {
                    list: [],
                    page: 1,
                    finished: !1
                },
                sign: {
                    list: [],
                    page: 1,
                    finished: !1
                },
                safe: {
                    list: [],
                    page: 1,
                    finished: !1
                }
            }
        };
    },
    148: function(e, t, a) {
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var n = i(a(0)), r = i(a(3)), s = a(42), o = a(2), d = a(1), c = a(8), l = a(147), u = l.status, f = getApp(), p = a(146), h = a(145);
        (0, n.default)(d.Toast, d.Tab, c, {
            data: {
                type: "",
                pagetype: "single",
                themeClass: f.themeClass,
                tab: l.tab,
                list: l.list,
                bindTips: "",
                showBindPhoneNumber: !1,
                hideTab: !1,
                animation: {
                    order_no: "",
                    selectedId: "",
                    animationData: {}
                }
            },
            onLoad: function(e) {
                var t = e.pagetype || "single", a = e.type || "all", i = this.data.tab;
                i.selectedId = a, this.setData({
                    tab: i,
                    type: a,
                    pagetype: t,
                    bindTips: "找不到订单？绑定手机号试试",
                    hideTab: "safe" === a || "totuan" === a
                });
                var n = wx.createAnimation({
                    duration: 800,
                    timingFunction: "ease",
                    delay: 0
                });
                n.opacity(0).translateX("100%").step(), this.setData({
                    "animation.animationData": n.export()
                }), this.fetchMore();
            },
            onShow: function() {
                f.off("trade:order:paid", null, this);
                var e = !1;
                e = !f.getBuyerId(), this.setData({
                    copyright: f.globalData.copyright,
                    is_big_shop: f.globalData.is_big_shop,
                    showBindPhoneNumber: e
                });
            },
            onUnload: function() {
                f.off(null, null, this);
            },
            tapBindZanAccount: function() {
                this.bindZanAccount();
            },
            onZanAccountBinded: function() {
                this.onPullDownRefresh(), this.setData({
                    showBindPhoneNumber: !1
                });
            },
            onPullDownRefresh: function() {
                this.clearOrderList(this.data.tab.selectedId), this.fetchMore(!0);
            },
            onReorderClick: function() {},
            clearOrderList: function(e) {
                var t = this.data.list, a = t[e];
                a.list = [], a.page = 1, a.finished = !1, this.setData({
                    list: t
                });
            },
            handleZanTabChange: function(e) {
                var t = e.selectedId, a = this.data.tab;
                a.selectedId !== t && (this.clearOrderList(t), a.selectedId = t, this.setData({
                    tab: a
                }), this.fetchMore());
            },
            fetchMore: function(e) {
                var t = this, a = this.data.list, i = this.data.tab.selectedId, n = a[i], r = n.finished;
                if (!r) {
                    var s = {
                        use_has_next: !0,
                        order_mark: "wx_shop",
                        pagetype: this.data.pagetype,
                        order_state: u[i],
                        page_no: this.data.list[i].page
                    };
                    "safe" === i && (delete s.order_state, s.feedback = "safe"), p.fetchOrderList(s, function(i) {
                        e && wx.stopPullDownRefresh(), i.has_next || (r = !0), n.list = t.resolveOrderList(n.list, i.trades || []), 
                        n.page++, n.finished = r, t.setData({
                            list: a
                        });
                    }, function() {
                        e && wx.stopPullDownRefresh(), n.finished = !0, t.setData({
                            list: a
                        });
                    });
                }
            },
            resolveOrderList: function(e, t) {
                var a = this.parseData(t);
                return e.concat(a);
            },
            parseData: function(e) {
                var t = this;
                return e.map(function(e) {
                    var a = !1;
                    if (e.items.forEach(function(t) {
                        206 == t.goods_type && (e.specialOrderType = "unicashier"), t.image_url = o(t.image_url, "!200x200.jpg");
                        var i = "";
                        (t.sku || []).forEach(function(e) {
                            i += e.v + " ";
                        }), t.skuStr = i, a = a || t.is_visual > 0;
                    }), e.isVirtual = a, t.canLookOrderDetail(e)) {
                        var i = e.order_state, n = e.express_type, r = (l.btns || {})[e.order_state] || [];
                        r = r.slice(0), e.isAllowLaterReceive && r.push("laterReceive"), 1 != n ? "send" != i && "sign" != i || a || r.push("transport") : "send" != i || a || r.push("transport"), 
                        e.isAllowConfirmReceive && r.push("confirmReceive"), 10 == e.order_type && "topay" != e.order_state && "超时未付款" != e.close_state_str && "商家取消" != e.close_state_str && r.push("pintuanDetail"), 
                        "unicashier" === e.specialOrderType && (r = []), e.btns = r;
                    } else e.btns = [];
                    return e;
                });
            },
            onPintuanDetailClick: function(e) {
                var t = e.currentTarget.dataset.item;
                this.updateKdtId(t), r.default.navigate({
                    url: "/packages/ump/pintuan/detail/index?orderNo=" + t.order_no + "&groupAlias=" + t.items[0].alias
                });
            },
            onOrderItemClicked: function(e) {
                var t = e.currentTarget.dataset.item;
                if (this.canLookOrderDetail(t)) {
                    this.updateKdtId(t);
                    var a = "", i = f.db.set({
                        order_no: t.order_no,
                        type: "order"
                    });
                    this.listenOrderStateChange(t.order_no);
                    var n = h.getGoodsIdForMemberCard(t);
                    a = "unicashier" === t.specialOrderType ? "/packages/trade/order/unicashier-result/index?order_no=" + t.order_no : t.state < 5 ? "/pages/trade/buy/index?dbid=" + i : n ? "/packages/card/detail/index?goods_id=" + n : "/packages/trade/order/result/index?dbid=" + i, 
                    r.default.navigate({
                        url: a
                    });
                } else this.showDisableLookOrderReason(t.order_no);
            },
            canLookOrderDetail: function(e) {
                if (10 == e.order_type) return !0;
                if (h.getGoodsIdForMemberCard(e)) return !0;
                if ("unicashier" === e.specialOrderType) return !0;
                if (0 != e.order_type) return !1;
                if (0 != e.express_type && 1 != e.express_type && 2 != e.express_type) return !1;
                for (var t = !0, a = 0; a < e.items.length; a++) {
                    var i = e.items[a];
                    if (i.goods_info && -1 === [ 0, 2, 3 ].indexOf(i.goods_info.is_virtual)) {
                        t = !1;
                        break;
                    }
                }
                return t;
            },
            showDisableLookOrderReason: function(e) {
                wx.showModal({
                    title: "",
                    content: "暂不支持在小程序中查看本订单详情，你可以复制链接在浏览器中查看。",
                    cancelText: "知道了",
                    confirmText: "复制链接",
                    success: function(t) {
                        t.cancel || wx.setClipboardData({
                            data: "https://trade.koudaitong.com/trade/order/result?order_no=" + e + "&kdt_id=" + f.getKdtId(),
                            success: function() {
                                wx.showToast({
                                    title: "已复制"
                                });
                            }
                        });
                    }
                });
            },
            onCancelOrder: function(e) {
                var t = this, a = e.target.dataset.orderno, i = this.findOrderItem(a);
                i && this.updateKdtId(i), wx.showModal({
                    title: "提示",
                    content: "订单还未付款，确定要取消吗?",
                    confirmText: "再考虑下",
                    cancelText: "取消订单",
                    success: function(e) {
                        e.confirm || (wx.showToast({
                            icon: "loading",
                            duration: 1e4
                        }), p.cancel({
                            order_no: a,
                            pagetype: t.data.pagetype
                        }, function() {
                            t.refreshOrder(a), wx.showToast({
                                title: "取消成功",
                                icon: "success",
                                duration: 1e3
                            });
                        }, function(e) {
                            wx.hideToast(), t.showZanToast(e.msg || "网络抖了下，请稍候再试~");
                        }));
                    }
                });
            },
            onPayClick: function(e) {
                var t = e.currentTarget.dataset.item;
                if (this.canLookOrderDetail(t)) {
                    this.updateKdtId(t);
                    var a = t.order_no, i = f.db.set({
                        order_no: a,
                        isGrouponOrder: 10 == t.order_type,
                        type: "order"
                    });
                    r.default.navigate({
                        url: "/pages/trade/buy/index?dbid=" + i
                    }), this.listenOrderStateChange(a);
                } else this.showDisableLookOrderReason(t.order_no);
            },
            onConfirmReceiveClick: function(e) {
                var t = this, a = e.target.dataset.orderno, i = this.findOrderItem(a);
                i && this.updateKdtId(i), wx.showModal({
                    title: "确认收货",
                    content: "确认收货后，订单交易完成，钱款将立即到达商家账户。",
                    confirmText: "取消",
                    cancelText: "确认收货",
                    success: function(e) {
                        e.confirm || (wx.showToast({
                            icon: "loading",
                            duration: 1e4
                        }), s("confirmReceive", {
                            order_no: a,
                            pagetype: t.data.pagetype
                        }, {
                            success: function() {
                                wx.showToast({
                                    title: "确认收货成功",
                                    icon: "success",
                                    duration: 1e3
                                }), t.refreshOrder(a);
                            }
                        }));
                    }
                });
            },
            onLaterReceiveClick: function(e) {
                var t = this, a = e.target.dataset.orderno, i = this.findOrderItem(a);
                i && this.updateKdtId(i), wx.showModal({
                    title: "延长收货时间",
                    content: "每笔订单只能延长一次收货时间，如需多次延长请联系商家。",
                    confirmText: "取消",
                    cancelText: "确定延长",
                    success: function(e) {
                        e.confirm || (wx.showToast({
                            icon: "loading",
                            duration: 1e4
                        }), s("laterReceive", {
                            order_no: a,
                            pagetype: t.data.pagetype
                        }, {
                            success: function() {
                                wx.showToast({
                                    title: "延长收货成功",
                                    icon: "success",
                                    duration: 1e3
                                });
                            }
                        }));
                    }
                });
            },
            showOrderExpress: function(e) {
                var t = e.target.dataset.orderno, a = this.data.tab.selectedId, i = ((this.data.list[a] || {}).list || []).find(function(e) {
                    return e.order_no == t;
                });
                if (i) {
                    this.updateKdtId(i);
                    var n = f.db.set({
                        order_no: t,
                        goods_count: i.items.length,
                        image_url: i.items[0].image_url
                    });
                    r.default.navigate({
                        url: "/packages/trade/order/express/index?dbid=" + n
                    });
                }
            },
            listenOrderStateChange: function(e) {
                var t = this;
                f.on("trade:order:paid", function(a) {
                    a == e && t.refreshOrder(e);
                }, this);
            },
            refreshOrder: function(e) {
                var t = this, a = this.data.tab.selectedId, i = this.data.list, n = (i[a] || {}).list || [], r = n.findIndex(function(t) {
                    return t.order_no == e;
                });
                r < 0 || ("all" == a ? p.fetchOrder({
                    order_no: e,
                    pagetype: this.data.pagetype
                }, function(e) {
                    if (!(e.total_results < 1)) {
                        var a = e.trades, s = (a = t.parseData(a))[0];
                        n.splice(r, 1, s), t.setData({
                            list: i
                        });
                    }
                }) : this.showAnimation({
                    order_no: e,
                    selectedId: a
                }, function() {
                    n.splice(r, 1), t.setData({
                        "animation.order_no": "",
                        "animation.selectedId": "all",
                        list: i
                    });
                }));
            },
            showAnimation: function(e, t) {
                this.setData({
                    "animation.order_no": e.order_no,
                    "animation.selectedId": e.selectedId
                }), setTimeout(function() {
                    t();
                }, 1100);
            },
            updateKdtId: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                e.kdt_id && f.trigger("update:youzan:kdtId", e.kdt_id);
            },
            findOrderItem: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
                return t = t || this.data.tab.selectedId, ((this.data.list[t] || {}).list || []).find(function(t) {
                    return t.order_no == e;
                });
            }
        });
    }
});