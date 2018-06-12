!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 41 ], {
    318: function(t, e, i) {
        var a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(i(1)), s = i(3), o = i(162), n = i(6), r = i(8), d = i(319), c = d.status, l = getApp(), u = i(320), f = i(0);
        (0, a.default)(s({}, r.Toast, r.Tab, {
            data: {
                tab: d.tab,
                list: d.list,
                bindTips: "",
                animation: {
                    order_no: "",
                    selectedId: "",
                    animationData: {}
                },
                showTab: !0
            },
            onLoad: function(t) {
                var e = t.type || "all", i = !1;
                "rights" == e ? (i = !1, wx.setNavigationBarTitle({
                    title: "退款/维权"
                })) : (i = !0, wx.setNavigationBarTitle({
                    title: "订单列表"
                }));
                var a = this.data.tab;
                a.selectedId = e, this.setData({
                    tab: a,
                    bindTips: "找不到订单？绑定手机号试试",
                    showTab: i
                });
                var s = wx.createAnimation({
                    duration: 800,
                    timingFunction: "ease",
                    delay: 0
                });
                s.opacity(0).translateX("100%").step(), this.setData({
                    "animation.animationData": s.export()
                }), this.fetchMore();
            },
            onShow: function() {
                f.page.show(), l.off("trade:order:paid", null, this), this.setData({
                    copyright: l.globalData.copyright,
                    is_big_shop: l.globalData.is_big_shop
                });
            },
            onUnload: function() {
                l.off(null, null, this);
            },
            onPullDownRefresh: function() {
                this.clearOrderList(this.data.tab.selectedId), this.fetchMore(!0);
            },
            clearOrderList: function(t) {
                var e = this.data.list, i = e[t];
                i.list = [], i.page = 1, i.finished = !1, this.setData({
                    list: e
                });
            },
            handleZanTabChange: function(t) {
                var e = t.selectedId, i = this.data.tab;
                i.selectedId === e || (this.clearOrderList(e), i.selectedId = e, this.setData({
                    tab: i
                }), this.fetchMore());
            },
            fetchMore: function(t) {
                var e = this, i = this.data.list, a = this.data.tab.selectedId, s = i[a], o = s.finished;
                o || u.fetchOrderList({
                    order_state: this.data.showTab ? c[a] : "",
                    order_type: this.data.showTab ? "" : "FEEDBACK",
                    order_mark: "weapp_spotlight",
                    page_no: this.data.list[a].page,
                    use_has_next: !0
                }, function(a) {
                    t && wx.stopPullDownRefresh(), a.has_next || (o = !0), s.list = e.resolveOrderList(s.list, a.trades || []), 
                    s.page++, s.finished = o, e.setData({
                        list: i
                    });
                }, function() {
                    t && wx.stopPullDownRefresh(), s.finished = !0, e.setData({
                        list: i
                    });
                });
            },
            resolveOrderList: function(t, e) {
                var i = this.parseData(e);
                return t.concat(i);
            },
            parseData: function(t) {
                return t.map(function(t) {
                    var e = !1;
                    t.items.forEach(function(t) {
                        t.image_url = n(t.image_url, "!200x200.jpg");
                        var i = "";
                        (t.sku || []).forEach(function(t) {
                            i += t.v + " ";
                        }), t.skuStr = i, e = e || 0 < t.is_visual;
                    }), t.isVirtual = e;
                    var i = t.order_state, a = t.express_type, s = (d.btns || {})[t.order_state] || [];
                    return s = s.slice(0), t.isAllowLaterReceive && s.push("laterReceive"), 1 == a || "send" != i && "sign" != i || e || s.push("transport"), 
                    t.isAllowConfirmReceive && s.push("confirmReceive"), 10 == t.order_type && "topay" != t.order_state && "超时未付款" != t.close_state_str && "商家取消" != t.close_state_str && s.push("pintuanDetail"), 
                    t.btns = s, t;
                });
            },
            onPintuanDetailClick: function(t) {
                var e = t.currentTarget.dataset.item;
                wx.navigateTo({
                    url: "/pages/ump/pintuan/detail/index?orderNo=" + e.order_no + "&groupAlias=" + e.items[0].alias + "&kdtId=" + e.kdt_id
                });
            },
            onOrderItemClicked: function(t) {
                var e = t.currentTarget.dataset.item;
                this.listenOrderStateChange(e.order_no);
                var i = "", a = e.items[0].item_id || "", s = e.order_no || "", o = e.kdt_id, n = e.kdt_id, r = "", d = e.items[0].id;
                if ("rights" == this.data.tab.selectedId) u.fetchSafe(s, n, function(t) {
                    i = t[d].safeNo;
                    var e = l.db.set({
                        safe_no: i,
                        item_id: a,
                        order_no: s,
                        kdt_id: n
                    });
                    wx.navigateTo({
                        url: "/pages/trade/safe/info/index?dbid=" + e
                    });
                }); else {
                    var c = l.db.set({
                        order_no: s,
                        type: "order",
                        kdtId: o
                    });
                    r = 5 > e.state ? "/pages/trade/buy/index?dbid=" + c : "/pages/trade/result/index?dbid=" + c, 
                    wx.navigateTo({
                        url: r
                    });
                }
            },
            canLookOrderDetail: function(t) {
                if (10 == t.order_type) return !0;
                if (0 != t.order_type) return !1;
                if (0 != t.express_type && 1 != t.express_type) return !1;
                for (var e, i = !0, a = 0; a < t.items.length; a++) {
                    if ((e = t.items[a]).goods_info && 2 != e.goods_info.is_virtual && 0 != e.goods_info.is_virtual) {
                        i = !1;
                        break;
                    }
                    if (10 == e.goods_type) {
                        i = !1;
                        break;
                    }
                }
                return i;
            },
            showDisableLookOrderReason: function(t) {
                wx.showModal({
                    title: "",
                    content: "暂不支持在小程序中查看本订单详情，你可以复制链接在浏览器中查看。",
                    cancelText: "知道了",
                    confirmText: "复制链接",
                    success: function(e) {
                        e.cancel || wx.setClipboardData({
                            data: "https://trade.koudaitong.com/trade/order/result?order_no=" + t + "&kdt_id=" + l.getKdtId(),
                            success: function() {
                                wx.showToast({
                                    title: "已复制"
                                });
                            }
                        });
                    }
                });
            },
            onCancelOrder: function(t) {
                var e = this, i = t.target.dataset.item;
                wx.showModal({
                    title: "提示",
                    content: "订单还未付款，确定要取消吗?",
                    confirmText: "再考虑下",
                    cancelText: "取消订单",
                    success: function(t) {
                        t.confirm || (wx.showToast({
                            icon: "loading",
                            duration: 1e4
                        }), u.cancel(i.order_no, i.kdt_id, function() {
                            e.refreshOrder(i.order_no), wx.showToast({
                                title: "取消成功",
                                icon: "success",
                                duration: 1e3
                            });
                        }, function(t) {
                            wx.hideToast(), e.showZanToast(t.msg || "网络抖了下，请稍候再试~");
                        }));
                    }
                });
            },
            onPayClick: function(t) {
                var e = t.currentTarget.dataset.item, i = e.order_no, a = l.db.set({
                    order_no: i,
                    isGrouponOrder: 10 == e.order_type,
                    type: "order",
                    kdtId: e.kdt_id
                });
                wx.navigateTo({
                    url: "/pages/trade/buy/index?dbid=" + a
                }), this.listenOrderStateChange(i);
            },
            onConfirmReceiveClick: function(t) {
                var e = this, i = t.target.dataset.orderno, a = this.data.tab.selectedId, s = ((this.data.list[a] || {}).list || []).find(function(t) {
                    return t.order_no == i;
                });
                s && wx.showModal({
                    title: "确认收货",
                    content: "确认收货后，订单交易完成，钱款将立即到达商家账户。",
                    confirmText: "取消",
                    cancelText: "确认收货",
                    success: function(t) {
                        t.confirm || (wx.showToast({
                            icon: "loading",
                            duration: 1e4
                        }), o("confirmReceive", {
                            order_no: i,
                            kdt_id: s.kdt_id
                        }, {
                            success: function() {
                                wx.showToast({
                                    title: "确认收货成功",
                                    icon: "success",
                                    duration: 1e3
                                }), e.refreshOrder(i);
                            }
                        }));
                    }
                });
            },
            onLaterReceiveClick: function(t) {
                var e = t.target.dataset.orderno, i = this.data.tab.selectedId, a = ((this.data.list[i] || {}).list || []).find(function(t) {
                    return t.order_no == e;
                });
                a && wx.showModal({
                    title: "延长收货时间",
                    content: "每笔订单只能延长一次收货时间，如需多次延长请联系商家。",
                    confirmText: "取消",
                    cancelText: "确定延长",
                    success: function(t) {
                        t.confirm || (wx.showToast({
                            icon: "loading",
                            duration: 1e3
                        }), o("laterReceive", {
                            order_no: e,
                            kdt_id: a.items[0].kdt_id
                        }, {
                            success: function() {
                                wx.showToast({
                                    title: "延长收货成功",
                                    icon: "success",
                                    duration: 1e3
                                });
                            },
                            fail: function(t) {
                                5e4 == t.code ? wx.showModal({
                                    title: "延长收货时间",
                                    content: t.msg,
                                    showCancel: !1,
                                    confirmText: "我知道了",
                                    confirmColor: "#ff4444"
                                }) : that.showToast(t.msg);
                            }
                        }));
                    }
                });
            },
            showOrderExpress: function(t) {
                var e = t.target.dataset.orderno, i = this.data.tab.selectedId, a = ((this.data.list[i] || {}).list || []).find(function(t) {
                    return t.order_no == e;
                });
                if (a) {
                    var s = l.db.set({
                        order_no: e,
                        goods_count: a.items.length,
                        image_url: a.items[0].image_url,
                        kdt_id: a.items[0].kdt_id
                    });
                    wx.navigateTo({
                        url: "/pages/trade/express/index?dbid=" + s
                    });
                }
            },
            listenOrderStateChange: function(t) {
                var e = this;
                l.on("trade:order:paid", function(i) {
                    i != t || e.refreshOrder(t);
                }, this);
            },
            refreshOrder: function(t) {
                var e = this, i = this.data.tab.selectedId, a = this.data.list, s = (a[i] || {}).list || [], o = s.findIndex(function(e) {
                    return e.order_no == t;
                });
                return 0 > o ? void 0 : "all" == i ? void u.fetchOrder(t, function(t) {
                    if (!(1 > t.total_results)) {
                        var i = t.trades, n = (i = e.parseData(i))[0];
                        s.splice(o, 1, n), e.setData({
                            list: a
                        });
                    }
                }) : void this.showAnimation({
                    order_no: t,
                    selectedId: i
                }, function() {
                    s.splice(o, 1), e.setData({
                        "animation.order_no": "",
                        "animation.selectedId": "all",
                        list: a
                    });
                });
            },
            showAnimation: function(t, e) {
                this.setData({
                    "animation.order_no": t.order_no,
                    "animation.selectedId": t.selectedId
                }), setTimeout(function() {
                    e();
                }, 1100);
            }
        }));
    }
}, [ 318 ]);