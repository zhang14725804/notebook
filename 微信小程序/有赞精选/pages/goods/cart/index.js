!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 46 ], {
    287: function(t, e, o) {
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var s, i = a(o(14)), n = a(o(27)), d = a(o(98)), c = a(o(4)), r = a(o(2)), h = a(o(1)), u = getApp(), l = o(8), p = o(11), g = o(3), f = o(6), k = o(15), v = o(104), m = o(0), _ = "chosen_cart_goods";
        (0, h.default)((0, r.default)({}, l.Toast, l.Stepper, v, (s = {
            data: {
                fetched: !1,
                title: "",
                editMode: [],
                checkedAll: !1,
                shopCheckedAll: [],
                shopList: [],
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
                showCartPayDialog: !1,
                checkedGoodsListByShop: [],
                bindTips: "微信公众号搜索并关注“有赞精选” 可查看购物车更多商品"
            },
            onLoad: function() {
                var t = this;
                u.on("trade:order:create", function() {
                    t.fetchCart();
                }, this);
            },
            onShow: function() {
                m.page.show(), this.fetchCart();
            },
            onUnload: function() {
                this.setChosenGoodsByStorage();
            },
            onHide: function() {
                this.setChosenGoodsByStorage();
            },
            onPullDownRefresh: function() {
                this.fetchCart();
            },
            fetchCart: function() {
                var t = this;
                u.carmen({
                    api: "weapp.spotlight.cart/1.0.0/list",
                    success: function(e) {
                        t.parse(e), t.generateCheckedGoodsList(), t.setData({
                            "move.unique": null,
                            "move.translate": !1
                        });
                    },
                    complete: function() {
                        wx.stopPullDownRefresh(), t.setData({
                            fetched: !0
                        });
                    }
                });
            },
            setChosenGoodsByStorage: function() {
                var t = [];
                p(this.data.checkedGoodsList, function(e) {
                    var o = e.sku_id, a = e.kdt_id, s = e.goods_id;
                    return t.push(a + "-" + s + "-" + o);
                });
                try {
                    wx.setStorageSync(_, (0, c.default)(t));
                } catch (t) {
                    console.log("set cart_chosen_goods storage error: " + t.message);
                }
            },
            getChosenGoodsByStorage: function() {
                var t;
                try {
                    t = JSON.parse(wx.getStorageSync(_) || "[]");
                } catch (t) {
                    console.log("parse storage cart_chosen_goods error: " + t.message);
                }
                return t;
            },
            markCheckedGoods: function(t, e) {
                p(t, function(t) {
                    var o = t.split("-"), a = o[0], s = o[1], i = o[2];
                    p(e, function(t) {
                        t.kdt_id !== +a || p(t.goods_list, function(t) {
                            t.goods_id !== +s || t.sku_id !== +i || (t.checked = !0);
                        });
                    });
                });
            },
            parse: function(t) {
                var e = [], o = [], a = [], s = this.getChosenGoodsByStorage(), i = function(t) {
                    var e = t.goods_id, o = t.sku_id, a = t.limit_num, s = t.stock_num, i = t.attachment_url, n = t.pay_price, c = t.title, r = t.sku;
                    (0, d.default)(t, [ "goods_id", "sku_id", "limit_num", "stock_num", "attachment_url", "pay_price", "title", "sku" ]);
                    return g(t, {
                        title: c || "",
                        unique: [ e, o ].join("-"),
                        maxNum: a ? Math.min(a, s) : s,
                        attachmentUrl: f(i, "!180x180.jpg"),
                        payPriceStr: k(n).toYuan(),
                        skuStr: (r && JSON.parse(r) || []).map(function(t) {
                            return t.v;
                        }).join(", ")
                    });
                };
                this.markCheckedGoods(s, t), p(t, function(t) {
                    var s = t.goods_list, n = t.unavailable_goods_list;
                    (0, d.default)(t, [ "goods_list", "unavailable_goods_list" ]);
                    p(n, i), e.push.apply(e, n), p(s, i), o.push(!1), a.push(s.every(function(t) {
                        return t.checked;
                    }));
                }), this.setData({
                    checkedAll: a.every(function(t) {
                        return t;
                    }),
                    shopList: t,
                    unavailableGoodsList: e,
                    shopCheckedAll: a,
                    editMode: o
                });
            },
            toogleEditMode: function(t) {
                for (var e = t.currentTarget.dataset.shopItem, o = this.data.shopList, a = this.data.editMode, s = 0; s < o.length; s++) if (o[s].kdt_id == e.kdt_id) {
                    a[s] = !a[s];
                    break;
                }
                this.setData({
                    editMode: a,
                    "move.unique": null,
                    "move.translate": 0
                });
            },
            handleCheckedAllSingleShopTap: function(t) {
                for (var e = t.currentTarget.dataset.shopItem, o = this.data.shopList, a = this.data.shopCheckedAll, s = 0, i = 0; i < o.length && "break" !== function(t) {
                    if (o[t].kdt_id == e.kdt_id) return s = t, p(o[t].goods_list, function(e) {
                        e.checked = !a[t];
                    }), "break";
                }(i); i++) ;
                this.data.shopCheckedAll[s] = !this.data.shopCheckedAll[s], this.setData({
                    shopCheckedAll: a,
                    shopList: o
                }), this.generateCheckedGoodsList();
            },
            handleCheckedAllTap: function() {
                var t = !this.data.checkedAll, e = this.data.shopList, o = [];
                delete this.data.shopCheckedAll, p(e, function(e) {
                    p(e.goods_list, function(e) {
                        e.checked = t;
                    }), o.push(t);
                }), this.setData({
                    checkedAll: t,
                    shopCheckedAll: o,
                    shopList: e
                }), this.generateCheckedGoodsList();
            },
            handleCheckedGoodsTap: function(t) {
                for (var e = t.currentTarget.dataset.goodsItem, o = this.data.shopList, a = e.kdt_id, s = 0; s < o.length; s++) if (o[s].kdt_id == a) {
                    var i = o[s].goods_list, n = i.find(function(t) {
                        return t.unique === e.unique;
                    });
                    n && (n.checked = !n.checked);
                    var d = this.data.shopCheckedAll;
                    d[s] = i.every(function(t) {
                        return t.checked;
                    });
                    var c = d.every(function(t) {
                        return t;
                    });
                    this.setData({
                        shopCheckedAll: d,
                        checkedAll: c
                    });
                }
                this.setData({
                    shopList: o
                }), this.generateCheckedGoodsList();
            },
            handleZanStepperChange: function(t) {
                var e = t.componentId, o = t.stepper;
                this.updateGoodsNum(e, o);
            },
            updateGoodsNum: function(t, e) {
                var o = this, a = this.data.shopList;
                p(a, function(s) {
                    var i = s.goods_list;
                    t: for (var d, c = 0; c < i.length; c++) switch (d = function(s) {
                        var n = i[s];
                        return n.unique === t ? o.updatingGoodsNum ? {
                            v: void 0
                        } : (o.updatingGoodsNum = !0, u.carmen({
                            api: "weapp.spotlight.cart/1.0.0/update",
                            data: {
                                num: e,
                                goods_id: n.goods_id,
                                sku_id: n.sku_id,
                                kdt_id: n.kdt_id
                            },
                            success: function() {
                                n.num = e, o.setData({
                                    shopList: a
                                }), o.generateCheckedGoodsList();
                            },
                            complete: function() {
                                o.updatingGoodsNum = !1;
                            }
                        }), "break") : n ? void 0 : {
                            v: void 0
                        };
                    }(c)) {
                      case "break":
                        break t;

                      default:
                        if ("object" === (void 0 === d ? "undefined" : (0, n.default)(d))) return d.v;
                    }
                });
            },
            generateCheckedGoodsList: function() {
                var t = this.data.shopList, e = [];
                p(t, function(t) {
                    e = e.concat(t.goods_list);
                });
                var o = e.filter(function(t) {
                    return t.checked;
                }), a = 0;
                o.forEach(function(t) {
                    a += t.pay_price * t.num;
                }), this.setData({
                    checkedGoodsList: o,
                    totalPrice: a,
                    totalPriceStr: k(a).toYuan()
                });
            },
            deleteGoods: function() {
                var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], e = this, o = arguments[1];
                !!(2 < arguments.length && void 0 !== arguments[2]) && arguments[2];
                t.length && wx.showModal({
                    content: o,
                    showCancel: !0,
                    success: function(o) {
                        o.confirm && (wx.showToast({
                            title: "正在处理",
                            icon: "loading",
                            duration: 1e4,
                            mask: !0
                        }), u.carmen({
                            api: "weapp.spotlight.cart/1.0.0/delete",
                            method: "POST",
                            data: {
                                goods_list: (0, c.default)(t.map(function(t) {
                                    return {
                                        goods_id: t.goods_id,
                                        sku_id: t.sku_id,
                                        kdt_id: t.kdt_id
                                    };
                                }))
                            },
                            success: function() {
                                e.fetchCart();
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
                var e = this.data.shopList, o = [];
                p(e, function(t) {
                    o = o.concat(t.goods_list);
                });
                var a = t.currentTarget.dataset, s = a.goodsUnique, i = a.isUnavailableGoods, n = i ? this.data.unavailableGoodsList : o;
                "delete" === this.data.move.state && this.setData({
                    "move.state": null
                }), this.deleteGoods(n.filter(function(t) {
                    return t.unique === s;
                }), "确定要删除这个商品吗？", i);
            },
            handleDeleteMutliGoods: function() {
                var t = this.data.checkedGoodsList;
                this.deleteGoods(t, "确认将这 " + t.length + " 个商品删除吗？");
            },
            handleGoodsTouchStart: function(t) {
                if (!(this.data.editMode || 1 < t.changedTouches.length || this.data.move.translate)) {
                    var e = t.currentTarget.dataset.goodsUnique, o = t.changedTouches[0];
                    this.setData({
                        "move.unique": e,
                        "move.start": {
                            x: o.pageX,
                            y: o.pageY
                        }
                    });
                }
            },
            handleGoodsTouchEnd: function(t) {
                var e = Math.abs;
                if (!(this.data.editMode || 1 < t.changedTouches.length || this.data.move.translate)) {
                    var o = t.currentTarget.dataset.goodsUnique, a = t.changedTouches[0], s = this.data.move;
                    if (o === s.unique) {
                        var i = a.pageX - s.start.x, n = a.pageY - s.start.y;
                        0 > i && e(i) > e(n) ? this.setData({
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
                for (var t = this.data.checkedGoodsList, e = {}, o = 0; o < t.length; o++) {
                    var a = t[o], s = a.kdt_id;
                    if (e.hasOwnProperty(s)) e[s].goodsNum += a.num, e[s].totalPrice += a.num * a.pay_price, 
                    e[s].totalPriceStr = k(e[s].totalPrice).toYuan(), e[s].goodsList.push(a); else {
                        for (var n, d = {}, c = 0; c < this.data.shopList.length; c++) if ((n = this.data.shopList[c]).kdt_id === s) {
                            d = n;
                            break;
                        }
                        e[s] = {
                            goodsNum: a.num,
                            totalPrice: a.num * a.pay_price,
                            totalPriceStr: k(a.num * a.pay_price).toYuan(),
                            shop: d,
                            goodsList: [ a ]
                        };
                    }
                }
                if (1 < (0, i.default)(e).length) {
                    for (var r = [], h = (0, i.default)(e), u = 0; u < h.length; u++) r.push(e[h[u]]);
                    this.setData({
                        showCartPayDialog: !0,
                        checkedGoodsListByShop: r
                    });
                } else this.goBuy(t);
            },
            handleCartPayDialog: function() {
                this.setData({
                    showCartPayDialog: !this.data.showCartPayDialog
                });
            },
            handleShopBuy: function(t) {
                this.setData({
                    showCartPayDialog: !1,
                    checkedGoodsListByShop: []
                }), this.goBuy(t.currentTarget.dataset.goodsList);
            },
            goBuy: function(t) {
                var e = t.map(function(t) {
                    var e = "";
                    try {
                        e = t.messages ? JSON.parse(t.messages) : "";
                    } catch (t) {
                        console.log(t.message);
                    }
                    return {
                        activityAlias: "",
                        activityId: 0,
                        activityType: 0,
                        num: t.num,
                        price: t.pay_price,
                        skuId: t.sku_id,
                        goodsId: t.goods_id,
                        kdtId: t.kdt_id,
                        pageSource: t.dc_ps || "",
                        cartCreateTime: t.created || "",
                        cartUpdateTime: t.updated || "",
                        message: e
                    };
                }), o = u.db.set({
                    type: "goods",
                    goods_list: e
                });
                wx.navigateTo({
                    url: "/pages/trade/buy/index?orderFrom=cart&dbid=" + o
                });
            },
            catchTouch: function() {}
        }, s.onUnload = function() {
            u.off(null, null, this);
        }, s)));
    }
}, [ 287 ]);