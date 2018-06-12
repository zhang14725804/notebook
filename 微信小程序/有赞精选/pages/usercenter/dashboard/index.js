!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 21 ], {
    270: function(t, n, e) {
        var o = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(e(1)), i = getApp(), a = e(3), c = e(45), r = e(8), s = e(0), u = e(104);
        (0, o.default)(a({}, r.Toast, c, u, {
            data: {
                userInfo: {},
                servicePhoneNumber: "",
                topay: 0,
                togroup: 0,
                tosend: 0,
                send: 0,
                cartCount: 0,
                isSetShoppingCart: !0,
                bindTips: "微信公众号搜索并关注“有赞精选”可查看更多订单",
                showBindPhoneNumber: !1,
                open1111Entry: !1
            },
            onLoad: function() {
                this.setData({
                    userInfo: i.globalData.userInfo,
                    open1111Entry: this.checkIsOpenEntry()
                });
            },
            onShow: function() {
                var t = this;
                s.page.show(), this.fetchBuyerCount(), this.intervalCount = 1, this.intervalTimer = setInterval(function() {
                    t.intervalCount || (clearInterval(t.intervalTimer), t.intervalTimer = null), t.intervalCount--, 
                    t.fetchBuyerCount();
                }, 2e3);
                var n = !1;
                n = !i.getBuyerId(), this.setData({
                    copyright: i.globalData.copyright,
                    is_big_shop: i.globalData.is_big_shop,
                    showBindPhoneNumber: n
                });
            },
            onHide: function() {
                clearInterval(this.intervalTimer), this.intervalTimer = null;
            },
            checkIsOpenEntry: function() {
                return [ "15685480181", "18667149539", "13767007480", "15906819964", "13680543450", "18814882034", "13646838132", "13588872423", "18815287577" ].includes(i.getMobile());
            },
            onPullDownRefresh: function() {
                this.fetchBuyerCount();
            },
            onMyAddressClick: function() {
                wx.chooseAddress({
                    success: function() {},
                    fail: function(t) {
                        0 < t.errMsg.indexOf("auth") && wx.navigateTo({
                            url: "/pages/trade/address/index?source=usercenter"
                        });
                    }
                });
            },
            onMyCouponClick: function() {
                wx.navigateTo({
                    url: "../promotion/my_coupon?title=我的优惠券"
                });
            },
            fetchBuyerCount: function() {
                var t = this;
                i.carmen({
                    api: "weapp.spotlight.order/1.0.0/count",
                    query: {
                        state: "topay,tosend,send,totuan"
                    },
                    success: function(n) {
                        var e = function(t) {
                            return 99 < t ? "99+" : t;
                        };
                        t.setData({
                            topay: e(n.statistics.topay),
                            tosend: e(n.statistics.tosend),
                            send: e(n.statistics.send),
                            togroup: e(n.statistics.totuan)
                        });
                    },
                    complete: function() {
                        wx.stopPullDownRefresh();
                    }
                });
            },
            jumpToCart: function() {
                wx.switchTab({
                    url: "/pages/goods/cart/index"
                });
            },
            handleMyTrackClick: function() {
                wx.navigateTo({
                    url: "../myTrack/myTrack"
                });
            },
            handleMyCollection: function() {
                wx.navigateTo({
                    url: "../myCollection/myCollection"
                });
            },
            handleMyTrack: function() {
                wx.navigateTo({
                    url: "../myTrack/myTrack"
                });
            },
            handleMyMsgList: function() {
                wx.navigateTo({
                    url: "../myMsgList/myMsgList"
                });
            },
            tapBindZanAccount: function() {
                this._upadateTitle(""), this.bindZanAccount();
            },
            onZanAccountBinded: function() {
                this.setData({
                    showBindPhoneNumber: !1
                }), this.fetchBuyerCount(), this.fetchCartCount();
            },
            gotoHelpCenter: function() {
                wx.navigateTo({
                    url: "../problemList/problemList"
                });
            },
            goto1111Preview: function() {
                wx.navigateTo({
                    url: "../../venues/index/index"
                });
            },
            connectService: function() {
                var t = this;
                1 == i.isBindYouzanAccount() ? this.enterConnectServiceView() : wx.showModal({
                    title: "联系客服请先登录有赞帐号哦~",
                    cancelText: "我知道了",
                    confirmText: "立即登录",
                    cancelColor: "#333",
                    success: function(n) {
                        n.confirm && t.bindZanAccount();
                    }
                });
            },
            enterConnectServiceView: function() {
                wx.navigateTo({
                    url: "../connectService/connectService"
                });
            },
            goToOperationView: function() {
                wx.navigateToMiniProgram({
                    appId: "wxff6f4f8dbe360cba",
                    path: "pages-youzan/shop/status/index"
                });
            }
        }));
    }
}, [ 270 ]);