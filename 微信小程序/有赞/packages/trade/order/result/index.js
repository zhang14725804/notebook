var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(e) {
    function t(o) {
        if (r[o]) return r[o].exports;
        var n = global.installedModules[o] = r[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
    }
    e = Object.assign(require("../../../../commons.js").modules, e), e = Object.assign(require("../../../../vendors.js").modules, e);
    var r = {};
    r = global.installedModules = global.installedModules || {}, t.m = e, t.c = r, t.d = function(e, r, o) {
        t.o(e, r) || Object.defineProperty(e, r, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, t.r = function(e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, t.n = function(e) {
        var r = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return t.d(r, "a", r), r;
    }, t.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, t.p = "", t(t.s = 144);
}({
    127: function(e, t, r) {
        e.exports = {
            getSteps: function(e, t, r) {
                var o = [];
                switch (e) {
                  case 3:
                  case 4:
                    o = t ? r ? [ {
                        done: !1,
                        current: !0,
                        text: "买家下单"
                    }, {
                        done: !1,
                        current: !1,
                        text: "已成团"
                    }, {
                        done: !1,
                        current: !1,
                        text: "商家接单"
                    }, {
                        done: !1,
                        current: !1,
                        text: "买家提货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ] : [ {
                        done: !1,
                        current: !0,
                        text: "买家下单"
                    }, {
                        done: !1,
                        current: !1,
                        text: "商家接单"
                    }, {
                        done: !1,
                        current: !1,
                        text: "买家提货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ] : r ? [ {
                        done: !1,
                        current: !1,
                        text: "买家付款"
                    }, {
                        done: !1,
                        current: !1,
                        text: "已成团"
                    }, {
                        done: !1,
                        current: !1,
                        text: "商家发货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ] : [ {
                        done: !1,
                        current: !1,
                        text: "买家付款"
                    }, {
                        done: !1,
                        current: !1,
                        text: "商家发货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ];
                    break;

                  case 50:
                    r && (o = [ {
                        done: !0,
                        current: !0,
                        text: "买家付款"
                    }, {
                        done: !1,
                        current: !1,
                        text: "已成团"
                    }, {
                        done: !1,
                        current: !1,
                        text: "商家发货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ]);
                    break;

                  case 5:
                    o = t ? r ? [ {
                        done: !0,
                        current: !1,
                        text: "买家下单"
                    }, {
                        done: !0,
                        current: !1,
                        text: "已成团"
                    }, {
                        done: !0,
                        current: !0,
                        text: "商家接单"
                    }, {
                        done: !1,
                        current: !1,
                        text: "买家提货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ] : [ {
                        done: !0,
                        current: !1,
                        text: "买家下单"
                    }, {
                        done: !0,
                        current: !0,
                        text: "商家接单"
                    }, {
                        done: !1,
                        current: !1,
                        text: "买家提货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ] : r ? [ {
                        done: !0,
                        current: !1,
                        text: "买家付款"
                    }, {
                        done: !0,
                        current: !0,
                        text: "已成团"
                    }, {
                        done: !1,
                        current: !1,
                        text: "商家发货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ] : [ {
                        done: !0,
                        current: !0,
                        text: "买家付款"
                    }, {
                        done: !1,
                        current: !1,
                        text: "商家发货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ];
                    break;

                  case 6:
                    o = t ? r ? [ {
                        done: !0,
                        current: !1,
                        text: "买家下单"
                    }, {
                        done: !0,
                        current: !1,
                        text: "已成团"
                    }, {
                        done: !0,
                        current: !1,
                        text: "商家接单"
                    }, {
                        done: !0,
                        current: !0,
                        text: "买家提货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ] : [ {
                        done: !0,
                        current: !1,
                        text: "买家下单"
                    }, {
                        done: !0,
                        current: !1,
                        text: "商家接单"
                    }, {
                        done: !0,
                        current: !0,
                        text: "买家提货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ] : r ? [ {
                        done: !0,
                        current: !1,
                        text: "买家付款"
                    }, {
                        done: !0,
                        current: !1,
                        text: "已成团"
                    }, {
                        done: !0,
                        current: !0,
                        text: "商家发货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ] : [ {
                        done: !0,
                        current: !1,
                        text: "买家付款"
                    }, {
                        done: !0,
                        current: !0,
                        text: "商家发货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ];
                    break;

                  case 8:
                  case 100:
                    o = t ? r ? [ {
                        done: !0,
                        current: !1,
                        text: "买家下单"
                    }, {
                        done: !0,
                        current: !1,
                        text: "已成团"
                    }, {
                        done: !0,
                        current: !1,
                        text: "商家接单"
                    }, {
                        done: !0,
                        current: !1,
                        text: "买家提货"
                    }, {
                        done: !0,
                        current: !0,
                        text: "交易完成"
                    } ] : [ {
                        done: !0,
                        current: !1,
                        text: "买家下单"
                    }, {
                        done: !0,
                        current: !1,
                        text: "商家接单"
                    }, {
                        done: !0,
                        current: !1,
                        text: "买家提货"
                    }, {
                        done: !0,
                        current: !0,
                        text: "交易完成"
                    } ] : r ? [ {
                        done: !0,
                        current: !1,
                        text: "买家付款"
                    }, {
                        done: !0,
                        current: !1,
                        text: "已成团"
                    }, {
                        done: !0,
                        current: !1,
                        text: "商家发货"
                    }, {
                        done: !0,
                        current: !0,
                        text: "交易完成"
                    } ] : [ {
                        done: !0,
                        current: !1,
                        text: "买家付款"
                    }, {
                        done: !0,
                        current: !1,
                        text: "商家发货"
                    }, {
                        done: !0,
                        current: !0,
                        text: "交易完成"
                    } ];
                    break;

                  default:
                    t && (o = r ? [ {
                        done: !1,
                        current: !1,
                        text: "买家下单"
                    }, {
                        done: !1,
                        current: !1,
                        text: "已成团"
                    }, {
                        done: !1,
                        current: !1,
                        text: "商家接单"
                    }, {
                        done: !1,
                        current: !1,
                        text: "买家提货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ] : [ {
                        done: !1,
                        current: !1,
                        text: "买家下单"
                    }, {
                        done: !1,
                        current: !1,
                        text: "商家接单"
                    }, {
                        done: !1,
                        current: !1,
                        text: "买家提货"
                    }, {
                        done: !1,
                        current: !1,
                        text: "交易完成"
                    } ]);
                }
                return o;
            }
        };
    },
    128: function(e, t, r) {
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t.default = e, t;
        }(r(127)), a = o(r(5)), s = o(r(6)), i = o(r(2));
        t.default = {
            getOrderData: function(e) {
                var t = !1;
                e.items.forEach(function(e) {
                    var r = e.goods_info || {};
                    t = t || r.is_virtual > 0;
                }), e.isVirtual = t;
                var r = e.state, o = n.getSteps(r, "" != e.self_fetch, 4 == e.activity_type);
                e.steps = o;
                var c = 0, d = 0;
                e.items.forEach(function(e) {
                    e.image_url = (0, i.default)(e.image_url, "!200x200.jpg");
                    var t = "";
                    e.sku.forEach(function(e) {
                        t += e.v + " ";
                    }), e.skuStr = t;
                    var r = [], o = {};
                    try {
                        o = JSON.parse(e.message);
                    } catch (e) {
                        o = {};
                    }
                    (0, a.default)(o, function(e, t) {
                        r.push({
                            name: t,
                            value: e
                        });
                    }), e.message = r, c += 100 * e.item_total_price, d += e.pointsPrice = e.goods_info.points_price;
                }), e.totalPriceStr = (0, s.default)(c).toYuan(), e.totalPointsStr = d, e.isFreePostage = 0 == parseFloat(e.postage);
                var u = e.preferences.order.coupons.money || {}, f = u.card || u.code || {};
                f.discountFee = (0, s.default)(f.used_value).toYuan(), e.couponData = f;
                var l = (e.preferences.order.reduce || [])[0] || {};
                return l.discountFee = (0, s.default)(l.discount_fee).toYuan(), e.reduceData = l, 
                e;
            },
            parseSafeData: function(e, t) {
                return (t.items || []).forEach(function(t) {
                    (0, a.default)(e, function(e, r) {
                        r == t.item_id && (t.safe = {
                            show: 1 == e.showType,
                            text: e.showText,
                            safe_no: e.safeNo
                        });
                    });
                }), t;
            },
            getMessagePageData: function(e) {
                return e.payPriceStr = e.pay_price, e.imgUrl = e.image_url, e;
            },
            desensitizationIdNo: function(e) {
                return e ? "" + e.slice(0, 6) + new Array(e.length - 9).join("*") + e.slice(-4) : "";
            }
        };
    },
    129: function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = getApp();
        t.default = {
            fetchOrder: function(e, t, r) {
                o.carmen({
                    api: "kdt.trade.buyer.search/1.0.0/get",
                    data: {
                        order_no: e
                    },
                    success: function(e) {
                        t && t(e);
                    },
                    fail: function(e) {
                        console.log("fail", e), r && r();
                    }
                });
            },
            fetchExpress: function(e, t) {
                o.carmen({
                    api: "kdt.logistics.trace/2.0.0/search",
                    data: {
                        tid: e
                    },
                    success: function(e) {
                        t && t(e);
                    }
                });
            },
            fetchSafe: function(e, t) {
                o.carmen({
                    api: "trade.safe.detail/1.0.0/getStateShowList",
                    data: {
                        order_no: e
                    },
                    success: function(e) {
                        return t && t(e);
                    }
                });
            },
            fetchVirtualCode: function(e, t) {
                o.carmen({
                    api: "kdt.trade.virtualcode/1.0.0/getqrcode",
                    data: {
                        order_no: e
                    },
                    success: function(e) {
                        t && t(e);
                    }
                });
            },
            fetchCustomService: function(e) {
                o.carmen({
                    api: "weapp.wsc.shop.returnaddress/1.0.0/get",
                    success: function(t) {
                        var r = "";
                        +t.show_notice_mobile && (t.notice_phone2 ? (r = t.notice_phone2, t.notice_phone1 && (r = t.notice_phone1 + "-" + r)) : t.notice_mobile && (r = t.notice_mobile)), 
                        e(r);
                    }
                });
            }
        };
    },
    144: function(t, r, o) {
        function n(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
            return t.default = e, t;
        }
        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var s = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
            return void 0 === t ? "undefined" : e(t);
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
        }, i = a(o(0)), c = a(o(3)), d = a(o(143)), u = a(o(129)), f = a(o(128)), l = a(o(2)), h = n(o(1)), p = a(o(6)), x = a(o(42)), m = a(o(15)), _ = n(o(8)), g = getApp();
        (0, i.default)(h.Toast, _, {
            data: {
                themeClass: g.themeClass,
                fetching: !0,
                userInfo: null,
                userInfoDeny: !1,
                shopName: "",
                order_no: "",
                order: {},
                express: {
                    isShow: !1,
                    data: {}
                },
                servicePhoneNumber: "",
                qrcode: {
                    show: !1
                },
                idCardNumber: "",
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
                page_path: "",
                kdt_id: "",
                im: {
                    isSetContact: !1,
                    businessId: ""
                },
                showDeliveryScope: !1,
                localDeliverySetting: {},
                hasFission: !1
            },
            onLoad: function(e) {
                var t = this;
                g.getLocalDelivery().then(function(e) {
                    t.setData({
                        localDeliverySetting: e
                    });
                }), wx.showToast({
                    title: "数据加载中",
                    icon: "loading",
                    duration: 1e4
                });
                var r = e.dbid, o = e.orderNo || e.order_no;
                if (r) {
                    o = (g.db.get(r) || {}).order_no;
                    var n = wx.getStorageSync("selectDetailModel");
                    this.setData({
                        order_no: o,
                        fetchAddress: n.city + n.area + n.address,
                        selfFetchPhoneNumber: n.tel
                    });
                } else o && this.setData({
                    order_no: o
                });
                g.request({
                    path: "/wscump/targeted-marketing/fission/get.json",
                    query: {
                        order_no: o
                    }
                }).then(function(e) {
                    t.setData({
                        hasFission: e
                    });
                }).catch(function(e) {});
            },
            onShow: function() {
                this.setData({
                    userInfoDeny: g.globalData.userInfoDeny,
                    userInfo: g.globalData.userInfo
                }), this.fetchOrderData(this.data.order_no), this.fetchCustomService(), this.fetchContactPermission(), 
                this.setData({
                    copyright: g.globalData.copyright,
                    is_big_shop: g.globalData.is_big_shop
                });
            },
            onPullDownRefresh: function() {
                this.fetchOrderData(this.data.order_no, !0), this.fetchCustomService();
            },
            showGoodsMessage: function(e) {
                var t = e.currentTarget.dataset.goodsid, r = e.currentTarget.dataset.skuid, o = this.data.order.items.find(function(e) {
                    return e.goods_id == t && e.sku_id == r;
                });
                if (o = Object.assign({}, o), o = f.default.getMessagePageData(o)) {
                    var n = g.db.set(o);
                    c.default.navigate({
                        url: "/packages/trade/goods-message/index?goods=" + n
                    });
                }
            },
            jumpToSafe: function(e) {
                var t = e.currentTarget.dataset || {}, r = t.safeno || "", o = t.itemid || "", n = this.data.order_no || "", a = g.db.set({
                    safe_no: r,
                    item_id: o,
                    order_no: n
                }), s = r ? "../safe/info/index" : "../safe/apply/index";
                c.default.navigate({
                    url: s + "?dbid=" + a
                });
            },
            showExpressPage: function() {
                var e = this.data.order.items[0], t = g.db.set({
                    order_no: this.data.order.order_no,
                    goods_count: this.data.order.items.length,
                    image_url: (0, l.default)(e.image_url, "!100x100.jpg")
                });
                c.default.navigate({
                    url: "/packages/trade/order/express/index?dbid=" + t
                });
            },
            handleContactPhoneService: function() {
                var e = this;
                wx.showModal({
                    title: this.data.servicePhoneNumber,
                    confirmText: "呼叫",
                    success: function(t) {
                        t.confirm && wx.makePhoneCall({
                            phoneNumber: e.data.servicePhoneNumber
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
            fetchVirtualCardInfo: function(e) {
                var t = this, r = this;
                g.carmen({
                    api: "youzan.trade.virtualticket.verify.user/3.0.0/get",
                    query: {
                        order_no: e
                    },
                    success: function(e) {
                        r.setData({
                            verifyTicket: e
                        });
                    },
                    fail: function(e) {
                        if (5e4 === e.code) return r.setData({
                            verifyTicket: {
                                hide: !0
                            }
                        });
                        t.showZanToast(e.message || e.msg || "获取核销码失败");
                    }
                });
            },
            fetchOrderData: function(e, t) {
                var r = this;
                u.default.fetchOrder(e, function(o) {
                    if (wx.hideToast(), t && wx.stopPullDownRefresh(), 0 != o.total_results) {
                        var n = o.trades[0];
                        if ("totuan" == n.order_state && r.initCountDown(n), "" != n.self_fetch ? r.setData({
                            showSelfFetch: !0,
                            showExpress: !1,
                            selfFetch: JSON.parse(n.self_fetch)
                        }) : r.setData({
                            showSelfFetch: !1,
                            showExpress: !0
                        }), n = f.default.getOrderData(n), r.setData({
                            order_no: n.order_no
                        }), 3 === n.items[0].is_visual && (r.setData({
                            customer: {
                                user_name: n.user_name,
                                telephone: n.tel
                            },
                            showCustomer: !0
                        }), r.fetchVirtualCardInfo(r.data.order_no)), 2 === n.items[0].is_visual && 31 != +n.items[0].goods_type && r.fetchVirtualCode(r.data.order_no), 
                        null != n.extra_info) {
                            var a = JSON.parse(n.extra_info);
                            r.setData({
                                isLeader: a.groupIsHeader,
                                idCardNumber: f.default.desensitizationIdNo(a.idCardNumber),
                                leaderName: a.groupHeaderName,
                                groupCollectServiceChosen: a.groupCollectServiceChosen
                            });
                        }
                        var i = "";
                        try {
                            "object" === s(n.items[0].shop_info) ? i = n.items[0].shop_info.shop_name : "string" == typeof n.items[0].shop_info && (i = JSON.parse(n.items[0].shop_info).shop_name);
                        } catch (e) {}
                        r.setData({
                            shopName: i
                        });
                        var c = !1;
                        if (n.user_name && 0 == +n.items[0].is_visual) {
                            var u = "";
                            c = !0, u = 0 == +n.express_type ? "快递发货" : 1 == +n.express_type ? "到店自提" : "同城配送", 
                            n.postageFee = n.postage, n.postageDes = u;
                        }
                        if (r.setData({
                            showExpressType: c
                        }), 2 == n.express_type) {
                            var l = n.delivery_time_display;
                            n.deliveryTimeDisplay = l;
                        }
                        if (n.preferences) {
                            var h = n.preferences.order.groupOns;
                            if (h) {
                                var p = h[(n.items[0] || {}).sku_id || ""] || {}, x = null == h ? {} : {
                                    isHead: p.is_head,
                                    saveMoney: (p.save_money || 0) / 100,
                                    joinNum: p.join_num || 0
                                };
                                r.setData({
                                    groupOn: x,
                                    isLeader: x.isHead,
                                    grouponColletcionNum: parseInt(x.joinNum, 10) - 1
                                });
                            }
                        }
                        var m = ((n.items || [])[0] || {}).title || "", _ = "kdt_id=" + g.getKdtId() + "&orderNo=" + e + "&num=" + n.num + "&title=" + (0, 
                        d.default)(m);
                        r.setData({
                            order: n,
                            fetching: !1,
                            page_path: "/packages/trade/order/result/index?" + _
                        });
                        var v = "", y = "";
                        "tosend" == r.data.order.order_state && r.data.showSelfFetch ? (v = "等待提货的订单", y = "商家已接单，等待提货") : "send" == r.data.order.order_state && r.data.showSelfFetch ? (v = "等待确认的订单", 
                        y = "买家已提货，等待确认") : 4 == r.data.order.activity_type && "totuan" == r.data.order.order_state ? (v = "待成团的订单", 
                        y = "买家已付款，等待成团") : 4 == r.data.order.activity_type && "tosend" == r.data.order.order_state ? (v = "等待商家发货的订单", 
                        y = "已成团，等待商家发货") : (v = r.data.order.state_str + "的订单", y = r.data.order.state_str), 
                        r.setData({
                            stateStr: y
                        }), wx.setNavigationBarTitle({
                            title: v
                        });
                        var D = r.data.order.state > 4 && 9 !== r.data.order.buy_way && r.data.order.pay_state ? "实付金额" : "应付金额";
                        r.setData({
                            paidAmountDesc: D
                        }), r.fetchExpressData(e), r.fetchSafeData(e), "1" == r.data.order.express_type && r.fetchSelfFetchOrderData();
                    }
                }, function() {
                    t ? wx.stopPullDownRefresh() : r.showZanToast("数据获取失败，下拉刷新下试试~");
                });
            },
            onExpressTap: function() {
                this.setData({
                    showDeliveryScope: !0
                });
            },
            onCloseLocalDeliveryTap: function() {
                this.setData({
                    showDeliveryScope: !1
                });
            },
            fetchExpressData: function(e) {
                var t = this;
                this.data.order.state < 6 || u.default.fetchExpress(e, function(e) {
                    var r = e.data;
                    r && r.packs && t.setData({
                        "express.isShow": !0,
                        "express.num": r.packs.length || 0,
                        "express.data": r.packs[0],
                        "express.data.trace": JSON.parse(r.packs[0].express.transit_info.data) || []
                    });
                });
            },
            fetchSafeData: function(e) {
                var t = this;
                u.default.fetchSafe(e, function(e) {
                    var r = f.default.parseSafeData(e, t.data.order);
                    t.setData({
                        order: r
                    });
                });
            },
            fetchCustomService: function() {
                var e = this;
                u.default.fetchCustomService(function(t) {
                    e.setData({
                        servicePhoneNumber: t
                    });
                });
            },
            fetchVirtualCode: function(e) {
                var t = this, r = this.data.order.state;
                r < 6 || 99 == r || u.default.fetchVirtualCode(e, function(e) {
                    if (1 === e.code) {
                        var r = e.data || {};
                        r.qrcode_src && t.setData({
                            qrcode: {
                                show: !0,
                                image: r.qrcode_src
                            }
                        });
                    }
                });
            },
            fetchSelfFetchOrderData: function() {
                var e = this, t = {};
                t.orderNo = this.data.order_no, t.kdtId = g.getKdtId(), g.carmen({
                    api: "kdt.trade.bill/1.0.0/payResult",
                    data: {
                        orderParams: JSON.stringify(t)
                    },
                    success: function(t) {
                        if (200 === t.code) {
                            var r = t.data || {}, o = (0, p.default)(r.realPay).toYuan();
                            e.setData({
                                orderSelfFetchInfo: r.orderSelfFetchInfo,
                                goodsShowInfo: r.goodsShowInfo,
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
                var e = this, t = this.data.order_no;
                wx.showModal({
                    title: "确认收货",
                    content: "确认收货后，订单交易完成，钱款将立即到达商家账户。",
                    confirmText: "取消",
                    cancelText: "确认收货",
                    success: function(r) {
                        r.confirm || (wx.showToast({
                            icon: "loading",
                            duration: 1e4
                        }), (0, x.default)("confirmReceive", {
                            order_no: t
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
                c.default.navigate({
                    url: "/packages/ump/pintuan/detail/index?orderNo=" + this.data.order_no + "&groupAlias=" + this.data.order.alias
                });
            },
            initCountDown: function(e) {
                var t = this;
                e.group_left_time < 0 || new m.default(1e3 * e.group_left_time, {
                    onChange: function(e, r) {
                        t.setData({
                            countdown: r
                        });
                    },
                    onEnd: function() {
                        var e = g.db.set({
                            order_no: t.data.order_no
                        });
                        wx.redirectTo({
                            url: "/packages/trade/order/result/index?dbid=" + e
                        });
                    }
                });
            },
            fetchContactPermission: function() {
                var e = this;
                g.getImData().then(function(t) {
                    e.setData({
                        "im.isSetContact": t.isSetContact && t.isWebImInOrder,
                        "im.businessId": t.businessId || ""
                    });
                });
            },
            fetchUserInfo: function() {
                var e = this;
                g.getUserInfo(function(t) {
                    e.setData({
                        userInfo: t.userInfo
                    }), g.updateYouzanUserInfo(t.userInfo);
                }, function() {
                    e.setData({
                        userInfoDeny: g.globalData.userInfoDeny
                    });
                });
            },
            goHomepage: function() {
                c.default.switchTab({
                    url: "/pages/home/dashboard/index"
                });
            }
        });
    }
});