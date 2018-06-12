!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 12 ], {
    276: function(t, a, e) {
        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var s = o(e(7)), i = o(e(277)), n = o(e(1)), c = e(157), h = e(3), d = e(15), p = e(44), l = e(0), r = e(8), u = e(68), g = e(6), f = e(17), m = getApp(), k = e(106);
        (0, n.default)(h({}, u, r.Toast, i.default.component, {
            data: h({}, i.default.data, {
                once: !0,
                kdtId: "",
                isCheckSellNum: !0,
                is_collection: !1,
                shopName: null,
                icon: "",
                dataList: [],
                shopCert: [],
                page: 1,
                loading: !1,
                nomore: !1,
                nodata: !1,
                loadFail: !1,
                clickInterface: {
                    clickInterface: "refreshData"
                },
                icon_network_error: "../../../resources/icon/ic_network_error.png",
                miniCode: "",
                supportChat: !1,
                chatBusinessId: "",
                phoneNum: "",
                showGoPage: !1
            }),
            clicktab: function(t) {
                1 == t.currentTarget.dataset.itemIndex ? this.setData({
                    isCheckSellNum: !0
                }) : this.setData({
                    isCheckSellNum: !1
                }), this.refreshData();
            },
            onLoad: function(t) {
                var a = t.scene ? f.decode("home", t.scene) : {};
                this.setData({
                    kdtId: t.kdtId || a.kdtId
                }), this.fetchContactSupportStatus(this.data.kdtId), p(this);
                var e = this;
                m.on("onTokenRefresh", function() {
                    console.log("on Token refresh"), e.refreshData();
                }), m.getToken() && (this.getShopData(), this.getListData()), this.setThreshold();
                for (var o = m.logger.options.context.scene, s = [ 1007, 1008, 1047, 1048, 1049 ], i = 0; i < s.length; i++) +o === s[i] && this.setData({
                    showGoPage: !0
                });
            },
            onReachBottom: function() {
                this.handleScrollToLower();
            },
            onShow: function() {
                l.page.show({
                    kdtId: this.data.kdtId,
                    id: this.data.kdtId
                });
            },
            fetchContactSupportStatus: function(t) {
                var a = this;
                t && k.fetchChatSupportStatus(t, function(t) {
                    a.setData((0, s.default)({}, t));
                });
            },
            refreshData: function() {
                this.setData({
                    page: 1,
                    nomore: !1,
                    loadFail: !1,
                    loading: !0,
                    dataList: []
                }), this.getListData(), this.data.shopName || this.getShopData();
            },
            handleScrollToLower: function() {
                this.data.loading || this.data.nomore || this.data.nodata || this.getListData();
            },
            getListData: function() {
                var t = this, a = this, e = this.data.page;
                this.setData({
                    loading: !0
                });
                var o = this.data.isCheckSellNum ? "weapp.spotlight.shop.goods/1.0.0/popular" : "weapp.spotlight.shop.goods/1.0.0/latest";
                m.carmen({
                    api: o,
                    method: "GET",
                    data: {
                        kdt_id: this.data.kdtId,
                        page: e,
                        page_size: 6
                    },
                    success: function(e) {
                        if (e.items) {
                            var o = e.items, s = e.paginator.page * e.paginator.page_size >= e.paginator.total_count, i = a.data.dataList, n = a.data.page;
                            e.items.forEach(function(t) {
                                t.image_url = g(t.image_url, "!400x400.jpg"), t.price = d(t.price).toYuan(), i.push(t);
                            }), o = i, a.setData({
                                nomore: s,
                                page: n + 1,
                                dataList: o
                            }), a.fetchWeappCode("/pages/usercenter/shopSelection/shopSelection?" + f.encode("home", {
                                kdtId: t.data.kdtId
                            }));
                        } else e.data.error_response && (a.setData({
                            loading: !1
                        }), 0 == (i = a.data.dataList).length && a.setData({
                            loadFail: !0
                        }));
                    },
                    fail: function(e) {
                        console.log("load fail"), console.log(e), 0 == a.data.dataList.length && (t.data.once ? (t.refreshData(), 
                        a.setData({
                            once: !1
                        })) : a.setData({
                            loadFail: !0
                        }));
                    },
                    complete: function() {
                        wx.stopPullDownRefresh(), a.setData({
                            loading: !1
                        });
                    }
                });
            },
            getShopData: function() {
                var t = this;
                m.carmen({
                    api: " weapp.spotlight.shop/1.0.0/get",
                    method: "POST",
                    data: {
                        kdt_id: this.data.kdtId
                    },
                    success: function(a) {
                        a && (t.setBrower(t.data.kdtId), t.parseShopCert(a), t.setData({
                            is_collection: a.if_collected,
                            shopName: a.shop_name,
                            icon: a.logo,
                            phoneNum: a.notice_mobile
                        }));
                    },
                    fail: function() {
                        t.setData({
                            loadFail: !0
                        });
                    },
                    complete: function() {
                        wx.stopPullDownRefresh(), t.setData({
                            loading: !1
                        });
                    }
                });
            },
            setBrower: function(t) {
                m.carmen({
                    api: "mars.trade.save.view/1.0.0/records",
                    data: {
                        kdt_id: t
                    }
                });
            },
            onCollection: function() {
                var t = this, a = this.data.is_collection ? "weapp.spotlight.shop/1.0.0/uncollect" : "weapp.spotlight.shop/1.0.0/collect";
                m.carmen({
                    api: a,
                    method: "POST",
                    data: {
                        kdt_id: this.data.kdtId
                    },
                    success: function(e) {
                        e && t.setData({
                            is_collection: !t.data.is_collection
                        }), wx.showToast({
                            title: "weapp.spotlight.shop/1.0.0/collect" == a ? "收藏成功" : "取消收藏成功",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "weapp.spotlight.shop/1.0.0/collect" == a ? "收藏失败" : "取消收藏失败",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    complete: function() {}
                });
            },
            onGoodTap: function(t) {
                var a = t.currentTarget.dataset.alias, e = t.currentTarget.dataset.shopname;
                (0, c.navigateTo)({
                    url: "../../goods/detail/index?alias=" + a + "&teamName=" + e
                });
            },
            onShareAppMessage: function() {
                return {
                    title: "我发现一家好店，邀你一起看看",
                    desc: this.data.shopName,
                    path: "/pages/usercenter/shopSelection/shopSelection?kdtId=" + this.data.kdtId
                };
            },
            parseShopCert: function(t) {
                var a = [], e = parseInt(t.cert_type);
                1 === e ? a.push("网店") : 2 === e ? a.push("企业认证") : 3 === e ? a.push("个人认证") : 4 === e ? a.push("个人认证") : 6 === e ? a.push("旗舰店认证") : 7 === e ? a.push("专卖店认证") : 8 === e ? a.push("直营店认证") : 9 === e ? a.push("专营店认证") : 10 === e ? a.push("组织认证") : 11 === e && a.push("普通店认证"), 
                1 === t.secured_transactions && a.push("担保交易"), 1 === t.team_physical && a.push("线下门店"), 
                this.setData({
                    shopCert: a
                });
            },
            telephone: function() {
                wx.makePhoneCall({
                    phoneNumber: this.data.phoneNum
                });
            },
            fetchWeappCode: function(t) {
                var a = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 100, e = this;
                m.carmen({
                    api: "weapp.spotlight.weappcode/1.0.0/get",
                    method: "GET",
                    data: {
                        page: t,
                        width: a,
                        type: 1
                    },
                    success: function(t) {
                        e.setData({
                            miniCode: t
                        });
                    }
                });
            }
        }));
    }
}, [ 276 ]);