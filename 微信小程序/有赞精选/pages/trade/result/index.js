!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 31 ], {
    303: function(e, t, a) {
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var r = o(a(4)), s = o(a(2)), d = o(a(7)), i = o(a(1)), n = a(304), c = a(305), h = a(6), u = a(0), f = a(3), l = a(8), p = a(15), g = a(162), _ = a(64), w = a(68), x = a(17), m = getApp(), v = a(106);
        (0, i.default)(f({}, l.Toast, w, {
            data: {
                kdtId: "",
                fetching: !0,
                order_no: "",
                order: {},
                express: {
                    isShow: !1,
                    data: {}
                },
                qrcode: {
                    show: !1
                },
                showExpress: !0,
                showSelfFetch: !1,
                showSelfFetchPopup: !1,
                step: 3,
                orderSelfFetchInfo: {},
                goodsShowInfo: {},
                realPay: "",
                stateStr: "",
                showGroupCollect: !0,
                isLeader: !1,
                leaderName: "",
                groupCollectServiceChosen: !1,
                isOrderResult: !0,
                grouponColletcionNum: 0,
                countdown: {},
                groupOn: {},
                miniCode: "",
                identifyCardNo: "",
                titleStr: "",
                supportChat: !1,
                chatBusinessId: "",
                phoneNum: ""
            },
            onLoad: function(e) {
                wx.showToast({
                    title: "数据加载中",
                    icon: "loading",
                    duration: 1e4
                });
                var t = e.dbid, a = m.db.get(t) || {}, o = a.order_no || e.order_no || e.orderNo, r = wx.getStorageSync("selectDetailModel"), s = a.kdtId || e.kdtId;
                this.setData({
                    order_no: o,
                    fetchAddress: r.city + r.area + r.address,
                    selfFetchPhoneNumber: r.tel,
                    kdtId: s
                }), this.fetchContactSupportStatus(s);
            },
            onShow: function() {
                u.page.show({
                    kdtId: this.data.kdtId,
                    id: this.data.kdtId
                }), this.fetchOrderData(this.data.order_no, this.data.kdtId), this.fetchWeappCode("/pages/venues/index2/index?" + x.encode("venues", {
                    id: 25,
                    type: 1
                })), this.setData({
                    copyright: m.globalData.copyright,
                    is_big_shop: m.globalData.is_big_shop
                });
            },
            onPullDownRefresh: function() {
                this.fetchOrderData(this.data.order_no, this.data.kdtId, !0);
            },
            fetchContactSupportStatus: function(e) {
                var t = this;
                e && v.fetchChatSupportStatus(e, function(e) {
                    t.setData((0, d.default)({}, e));
                });
            },
            showGoodsMessage: function(e) {
                var t = e.currentTarget.dataset.goodsid, a = e.currentTarget.dataset.skuid, o = this.data.order.items.find(function(e) {
                    return e.goods_id == t && e.sku_id == a;
                });
                if (o = (0, s.default)({}, o), !!(o = c.getMessagePageData(o))) {
                    var r = m.db.set(o);
                    wx.navigateTo({
                        url: "../goods_message/index?goods=" + r
                    });
                }
            },
            jumpToSafe: function(e) {
                var t = e.currentTarget.dataset || {}, a = t.safeno || "", o = t.itemid || "", r = this.data.order_no || "", s = this.data.kdtId, d = m.db.set({
                    safe_no: a,
                    item_id: o,
                    order_no: r,
                    kdt_id: s
                }), i = a ? "../safe/info/index" : "../safe/apply/index";
                wx.navigateTo({
                    url: i + "?dbid=" + d
                });
            },
            showExpressPage: function() {
                if (0 !== ((this.data.express.data || {}).trace_list || []).length) {
                    var e = this.data.order.items[0], t = m.db.set({
                        order_no: this.data.order.order_no,
                        goods_count: this.data.order.items.length,
                        image_url: h(e.image_url, "!100x100.jpg"),
                        kdt_id: this.data.kdtId
                    });
                    wx.navigateTo({
                        url: "/pages/trade/express/index?dbid=" + t
                    });
                }
            },
            handleContactPhoneService: function() {
                var e = this;
                wx.showModal({
                    title: this.data.phoneNum,
                    confirmText: "呼叫",
                    success: function(t) {
                        t.confirm && wx.makePhoneCall({
                            phoneNumber: e.data.phoneNum
                        });
                    }
                });
            },
            handleContactSelfFetchService: function() {
                var e = this;
                wx.showModal({
                    title: this.data.selfFetch.tel,
                    confirmText: "呼叫",
                    success: function(t) {
                        t.confirm && wx.makePhoneCall({
                            phoneNumber: e.data.selfFetch.tel
                        });
                    }
                });
            },
            fetchOrderData: function(e, t, a) {
                var o = this;
                n.fetchOrder(e, t, function(r) {
                    if (wx.hideToast(), a && wx.stopPullDownRefresh(), 0 != r.total_results) {
                        var s = r.trades[0];
                        if ("totuan" == s.order_state && o.initCountDown(s), "" == s.self_fetch ? o.setData({
                            showSelfFetch: !1,
                            showExpress: !0
                        }) : o.setData({
                            showSelfFetch: !0,
                            showExpress: !1,
                            selfFetch: JSON.parse(s.self_fetch)
                        }), void 0 != (s = c.getOrderData(s)).extra_info) {
                            var d = JSON.parse(s.extra_info), i = d.idCardNumber ? d.idCardNumber : "";
                            if ("" != i) {
                                var n = i.length;
                                i = i.substring(0, 7) + "*****" + i.substring(n - 5, n);
                            }
                            o.setData({
                                isLeader: d.groupIsHeader,
                                leaderName: d.groupHeaderName,
                                groupCollectServiceChosen: d.groupCollectServiceChosen,
                                identifyCardNo: i
                            });
                        }
                        if (void 0 != s.preferences) {
                            var h = s.preferences.order.groupOns, u = s.items[0].sku_id, f = null == h ? {} : {
                                isHead: h[u].is_head,
                                saveMoney: h[u].save_money / 100,
                                joinNum: h[u].join_num
                            };
                            o.setData({
                                groupOn: f,
                                isLeader: f.isHead,
                                grouponColletcionNum: parseInt(f.joinNum) - 1
                            });
                        }
                        o.setData({
                            order: s,
                            fetching: !1,
                            page_path: "/pages/trade/result/index?orderNo=" + e + "&num=" + s.num,
                            phoneNum: s.service_phone
                        });
                        var l = "", p = "";
                        "tosend" == o.data.order.order_state && o.data.showSelfFetch ? (l = "等待提货的订单", p = "商家已接单，等待提货") : "send" == o.data.order.order_state && o.data.showSelfFetch ? (l = "等待确认的订单", 
                        p = "买家已提货，等待确认") : 4 == o.data.order.activity_type && "totuan" == o.data.order.order_state ? (l = "待成团的订单", 
                        p = "买家已付款，等待成团") : 4 == o.data.order.activity_type && "tosend" == o.data.order.order_state ? (l = "等待商家发货的订单", 
                        p = "已成团，等待商家发货") : (l = o.data.order.state_str + "的订单", p = o.data.order.state_str), 
                        o.setData({
                            stateStr: p,
                            titleStr: l
                        }), wx.setNavigationBarTitle({
                            title: l
                        }), o.fetchExpressData(e, t), o.fetchSafeData(e, t), o.data.order.isVirtual && o.fetchVirtualCode(e), 
                        "1" == o.data.order.express_type && o.fetchSelfFetchOrderData();
                    }
                }, function() {
                    a ? wx.stopPullDownRefresh() : o.showZanToast("数据获取失败，下拉刷新下试试~");
                });
            },
            fetchExpressData: function(e, t) {
                var a = this, o = this.data.order.state, r = +this.data.order.express_type;
                6 > o || 1 == r || n.fetchExpress(e, t, function(e) {
                    var t = {};
                    try {
                        var o = e[0].distOrderDTOs, r = (void 0 === o ? [ {} ] : o)[0].expressInfo, s = void 0 === r ? {} : r, d = s.expressId, i = s.expressNo, n = void 0 === i ? "" : i, c = s.expressDetail, h = void 0 === c ? {} : c, u = h.expressStatus, f = void 0 === u ? "" : u, l = h.expressCompanyName, p = void 0 === l ? "" : l, g = h.expressProgressInfo, _ = void 0 === g ? "[]" : g;
                        if (!d) return;
                        t = {
                            expressProgressInfo: JSON.parse(_),
                            expressNo: n,
                            expressStatus: f,
                            expressCompanyName: p
                        };
                    } catch (e) {
                        console.error(e.message);
                    }
                    a.setData({
                        "express.isShow": !0,
                        "express.data": t
                    });
                });
            },
            fetchSafeData: function(e, t) {
                var a = this;
                n.fetchSafe(e, t, function(e) {
                    var t = c.parseSafeData(e, a.data.order);
                    a.setData({
                        order: t
                    });
                });
            },
            fetchVirtualCode: function(e) {
                var t = this, a = this.data.order.state;
                6 > a || 99 == a || n.fetchVirtualCode(e, function(e) {
                    if (1 === e.code) {
                        var a = e.data || {};
                        t.setData({
                            qrcode: {
                                show: !0,
                                image: a.qrcode_src
                            }
                        });
                    }
                });
            },
            fetchSelfFetchOrderData: function() {
                var e = this, t = {};
                t.orderNo = this.data.order_no, t.kdtId = this.data.kdtId, m.carmen({
                    api: "kdt.trade.bill/1.0.0/payResult",
                    data: {
                        orderParams: (0, r.default)(t)
                    },
                    success: function(t) {
                        if (200 === t.code) {
                            var a = t.data || {}, o = p(a.realPay).toYuan();
                            e.setData({
                                orderSelfFetchInfo: a.orderSelfFetchInfo,
                                goodsShowInfo: a.goodsShowInfo,
                                realPay: o
                            });
                        }
                    },
                    fail: function() {}
                });
            },
            showSelfFetchPopupTap: function() {
                "1" == this.data.order.express_type && this.fetchSelfFetchOrderData(), this.setData({
                    showSelfFetchPopup: !0
                });
            },
            hideSelfFetchPopupTap: function() {
                this.setData({
                    showSelfFetchPopup: !1
                });
            },
            onConfirmReceiveClick: function() {
                var e = this, t = this.data, a = t.order_no, o = t.kdtId;
                wx.showModal({
                    title: "确认收货",
                    content: "确认收货后，订单交易完成，钱款将立即到达商家账户。",
                    confirmText: "取消",
                    cancelText: "确认收货",
                    success: function(t) {
                        t.confirm || (wx.showToast({
                            icon: "loading",
                            duration: 1e4
                        }), g("confirmReceive", {
                            kdt_id: o,
                            order_no: a
                        }, {
                            success: function() {
                                wx.showToast({
                                    title: "确认收货成功",
                                    icon: "success",
                                    duration: 1e3
                                }), setTimeout(function() {
                                    e.onPullDownRefresh();
                                }, 1e3);
                            }
                        }));
                    }
                });
            },
            onPintuanDetailClick: function() {
                wx.navigateTo({
                    url: "/pages/ump/pintuan/detail/index?orderNo=" + this.data.order_no + "&groupAlias=" + this.data.order.alias + "&kdtId=" + this.data.kdtId
                });
            },
            onShareAppMessage: function() {
                return m.db.set({
                    order_no: this.data.order_no
                }), {
                    title: "送你一份0元购特权！",
                    desc: "0元开团",
                    imageUrl: "https://img.yzcdn.cn/public_files/2017/11/02/208b3ad69d3c881fed896953be91bdcb.png",
                    path: "/pages/venues/index2/index?id=25&alias=优质0元免单&type=1"
                };
            },
            onShareClick: function() {
                this.onShowShareDialog("order");
            },
            initCountDown: function(e) {
                var t = this;
                0 > e.group_left_time || new _(1e3 * e.group_left_time, {
                    onChange: function(e, a) {
                        t.setData({
                            countdown: a
                        });
                    },
                    onEnd: function() {
                        var e = m.db.set({
                            order_no: t.data.order_no
                        });
                        wx.redirectTo({
                            url: "/pages/trade/result/index?dbid=" + e
                        });
                    }
                });
            },
            fetchWeappCode: function(e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 100, a = this;
                m.carmen({
                    api: "weapp.spotlight.weappcode/1.0.0/get",
                    method: "GET",
                    data: {
                        page: e,
                        width: t,
                        type: 1
                    },
                    success: function(e) {
                        a.setData({
                            miniCode: e
                        });
                    },
                    fail: function() {},
                    complete: function() {}
                });
            },
            gotoGoodsDetail: function(e) {
                var t = e.currentTarget.dataset.item;
                wx.redirectTo({
                    url: "/pages/goods/detail/index?is_share=1&alias=" + t.goods_info.alias
                });
            }
        }));
    }
}, [ 303 ]);