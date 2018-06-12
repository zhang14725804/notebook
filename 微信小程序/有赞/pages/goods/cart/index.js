!function(t) {
    function e(o) {
        if (a[o]) return a[o].exports;
        var n = global.installedModules[o] = a[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(n.exports, n, n.exports, e), n.l = !0, n.exports;
    }
    t = Object.assign(require("../../../commons.js").modules, t), t = Object.assign(require("../../../vendors.js").modules, t);
    var a = {};
    a = global.installedModules = global.installedModules || {}, e.m = t, e.c = a, e.d = function(t, a, o) {
        e.o(t, a) || Object.defineProperty(t, a, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var a = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(a, "a", a), a;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 227);
}({
    227: function(t, e, a) {
        function o(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            return e.default = t, e;
        }
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var i = n(a(0)), s = n(a(5)), d = n(a(2)), u = n(a(6)), r = n(a(3)), c = o(a(1)), l = o(a(4)), h = getApp();
        (0, i.default)(c.Toast, c.Stepper, {
            data: {
                youzanApp: h.globalData.isYouzanApp,
                themeClass: h.themeClass,
                fetched: !1,
                title: "",
                editMode: !1,
                checkedAll: !0,
                goodsList: [],
                unavailableGoodsList: [],
                checkedGoodsList: [],
                totalPrice: 0,
                totalPriceStr: "0.00",
                move: {
                    unique: null,
                    start: {
                        x: 0,
                        y: 0
                    },
                    translate: !1
                },
                bindTips: ""
            },
            onLoad: function() {
                var t = this;
                this.setData({
                    bindTips: "绑定手机号，保存购物车的商品"
                }), h.on("trade:order:create", function() {
                    t.fetchCart();
                }, this);
            },
            onShow: function() {
                this.fetchCart(), this.setData({
                    copyright: h.globalData.copyright,
                    is_big_shop: h.globalData.is_big_shop
                });
            },
            onPullDownRefresh: function() {
                this.fetchCart();
            },
            fetchCart: function() {
                var t = this;
                h.carmen({
                    api: "kdt.trade.cart/1.0.0/list",
                    success: function(e) {
                        e.data && (t.setData(t.parse(e.data[0])), t.generateCheckedGoodsList(), t.setData({
                            "move.unique": null,
                            "move.translate": !1,
                            checkedAll: t.data.goodsList.every(function(t) {
                                return t.checked;
                            })
                        }));
                    },
                    complete: function() {
                        wx.stopPullDownRefresh(), t.setData({
                            fetched: !0
                        });
                    }
                });
            },
            parse: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                t.checkedAll = !1, t.editMode = !1, t.goodsList = t.goods_list || [], t.unavailableGoodsList = t.unavailable_goods_list || [], 
                delete t.goods_list, delete t.unavailable_goods_list;
                var e = function(t) {
                    return function(e) {
                        e.title = e.title || "", e.unique = [ e.goods_id, e.sku_id ].join("-"), e.checked = t, 
                        e.maxNum = e.limit_num ? Math.min(e.limit_num, e.stock_num) : e.stock_num, e.attachmentUrl = (0, 
                        d.default)(e.attachment_url, "!180x180.jpg"), e.payPriceStr = (0, u.default)(e.pay_price).toYuan(), 
                        e.skuStr = (JSON.parse(e.sku) || []).map(function(t) {
                            return t.v;
                        }).join("，");
                    };
                };
                return (0, s.default)(t.goodsList, e(!0)), (0, s.default)(t.unavailableGoodsList, e(!1)), 
                t;
            },
            tapBindZanAccount: function() {
                this.bindZanAccount();
            },
            toogleEditMode: function() {
                this.setData({
                    editMode: !this.data.editMode,
                    "move.unique": null,
                    "move.translate": 0
                });
            },
            handleCheckedAllTap: function() {
                var t = !this.data.checkedAll, e = this.data.goodsList;
                (0, s.default)(e, function(e) {
                    e.checked = t;
                }), this.setData({
                    checkedAll: t,
                    goodsList: e
                }), this.generateCheckedGoodsList();
            },
            handleCheckedGoodsTap: function(t) {
                var e = t.currentTarget.dataset.goodsUnique, a = this.data.goodsList, o = a.find(function(t) {
                    return t.unique === e;
                });
                o && (o.checked = !o.checked), this.setData({
                    goodsList: a
                }), this.setData({
                    checkedAll: this.data.goodsList.every(function(t) {
                        return t.checked;
                    })
                }), this.generateCheckedGoodsList();
            },
            handleZanStepperChange: function(t) {
                var e = t.componentId, a = t.stepper;
                this.updateGoodsNum(e, a);
            },
            handleJumpToGoods: function(t) {
                if (!this.data.editMode) {
                    var e = t.currentTarget.dataset.alias;
                    r.default.navigate({
                        url: "/pages/goods/detail/index?alias=" + e
                    });
                }
            },
            updateGoodsNum: function(t, e) {
                var a = this, o = this.data.goodsList, n = o.find(function(e) {
                    return e.unique === t;
                });
                n && (this.updatingGoodsNum || (this.updatingGoodsNum = !0, h.carmen({
                    api: "kdt.trade.cart/1.0.0/update",
                    data: {
                        num: e,
                        goods_id: n.goods_id,
                        sku_id: n.sku_id,
                        kdt_id: h.getKdtId()
                    },
                    success: function() {
                        n.num = e, a.setData({
                            goodsList: o
                        }), a.generateCheckedGoodsList();
                    },
                    complete: function() {
                        a.updatingGoodsNum = !1;
                    }
                })));
            },
            generateCheckedGoodsList: function() {
                var t = this.data.goodsList.filter(function(t) {
                    return t.checked;
                }), e = 0;
                t.forEach(function(t) {
                    e += t.pay_price * t.num;
                }), this.setData({
                    checkedGoodsList: t,
                    totalPrice: e,
                    totalPriceStr: (0, u.default)(e).toYuan()
                });
            },
            deleteGoods: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = this, a = arguments[1], o = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                t.length && wx.showModal({
                    content: a,
                    showCancel: !0,
                    success: function(a) {
                        a.confirm && (wx.showToast({
                            title: "正在处理",
                            icon: "loading",
                            duration: 1e4,
                            mask: !0
                        }), h.carmen({
                            api: "kdt.trade.cart/1.0.0/delete",
                            method: "POST",
                            data: {
                                goods_list: JSON.stringify(t.map(function(t) {
                                    return {
                                        goods_id: t.goods_id,
                                        sku_id: t.sku_id,
                                        kdt_id: h.getKdtId()
                                    };
                                }))
                            },
                            success: function() {
                                var a = o ? "unavailableGoodsList" : "goodsList", n = e.data[a], i = t.map(function(t) {
                                    return t.unique;
                                }), s = n.filter(function(t) {
                                    return -1 === i.indexOf(t.unique);
                                });
                                e.setData(function(t, e, a) {
                                    return e in t ? Object.defineProperty(t, e, {
                                        value: a,
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0
                                    }) : t[e] = a, t;
                                }({}, "" + a, s)), e.generateCheckedGoodsList();
                            },
                            fail: function(t) {
                                e.showZanToast(t.msg);
                            },
                            complete: function() {
                                wx.hideToast();
                            }
                        }));
                    }
                });
            },
            handleDeleteSingleGoods: function(t) {
                var e = t.currentTarget.dataset, a = e.goodsUnique, o = e.isUnavailableGoods, n = o ? this.data.unavailableGoodsList : this.data.goodsList;
                "delete" === this.data.move.state && this.setData({
                    "move.state": null
                }), this.deleteGoods(n.filter(function(t) {
                    return t.unique === a;
                }), "确定要删除这个商品吗？", o);
            },
            handleDeleteMutliGoods: function() {
                var t = this.data.checkedGoodsList;
                this.deleteGoods(t, "确认将这 " + t.length + " 个商品删除吗？");
            },
            handleGoodsTouchStart: function(t) {
                if (!this.data.editMode && !(t.changedTouches.length > 1 || this.data.move.translate)) {
                    var e = t.currentTarget.dataset.goodsUnique, a = t.changedTouches[0];
                    this.setData({
                        "move.unique": e,
                        "move.start": {
                            x: a.pageX,
                            y: a.pageY
                        }
                    });
                }
            },
            handleGoodsTouchEnd: function(t) {
                if (!this.data.editMode && !(t.changedTouches.length > 1 || this.data.move.translate)) {
                    var e = t.currentTarget.dataset.goodsUnique, a = t.changedTouches[0], o = this.data.move;
                    if (e === o.unique) {
                        var n = a.pageX - o.start.x, i = a.pageY - o.start.y;
                        n < 0 && Math.abs(n) > Math.abs(i) ? this.setData({
                            "move.translate": !0
                        }) : this.setData({
                            "move.translate": !1
                        });
                    }
                }
            },
            handleContainerTouchStart: function(t) {
                var e = t.target.dataset.isDelete;
                this.data.move.translate && !e && this.setData({
                    "move.unique": null,
                    "move.translate": !1
                });
            },
            handleClearUnavailableGoods: function() {
                this.deleteGoods(this.data.unavailableGoodsList, "确认清空失效的商品吗？", !0);
            },
            handleBuy: function() {
                l.track({
                    act_name: "cartpage_buy"
                }), this.__yzLog__({
                    et: "click",
                    ei: "cartpage_buy",
                    en: "结算购物车"
                });
                var t = this.data.checkedGoodsList.map(function(t) {
                    var e = "";
                    try {
                        e = (JSON.parse(t.extra_attribute) || {}).bizData || "";
                    } catch (t) {
                        console.warn(t);
                    }
                    return {
                        activityAlias: "",
                        activityId: 0,
                        activityType: 0,
                        message: JSON.parse(t.messages),
                        num: t.num,
                        price: t.pay_price,
                        skuId: t.sku_id,
                        goodsId: t.goods_id,
                        kdtId: h.getKdtId(),
                        bizTracePointExt: e
                    };
                }), e = h.db.set({
                    type: "goods",
                    goods_list: t
                });
                r.default.navigate({
                    url: "/pages/trade/buy/index?orderFrom=cart&dbid=" + e
                });
            },
            goHomepage: function() {
                r.default.switchTab({
                    url: "/pages/home/dashboard/index"
                });
            },
            catchTouch: function() {},
            onUnload: function() {
                h.off(null, null, this);
            }
        });
    }
});