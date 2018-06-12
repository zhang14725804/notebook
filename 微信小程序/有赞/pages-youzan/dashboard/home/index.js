!function(t) {
    function e(a) {
        if (o[a]) return o[a].exports;
        var n = global.installedModules[a] = o[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return t[a].call(n.exports, n, n.exports, e), n.l = !0, n.exports;
    }
    t = Object.assign(require("../../../commons.js").modules, t), t = Object.assign(require("../../../vendors.js").modules, t);
    var o = {};
    o = global.installedModules = global.installedModules || {}, e.m = t, e.c = o, e.d = function(t, o, a) {
        e.o(t, o) || Object.defineProperty(t, o, {
            configurable: !1,
            enumerable: !0,
            get: a
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var o = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(o, "a", o), o;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 347);
}({
    336: function(t, e, o) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = o(2), n = getApp();
        e.default = {
            fetchHistoryAndFormat: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = arguments[1], o = t.map(function(t, e) {
                    return {
                        kdtId: t,
                        goodsCount: 0 === e ? 9 : 3
                    };
                });
                n.carmen({
                    api: "weapp.wsc.shoprecommend/1.0.0/batch",
                    data: {
                        param: o
                    },
                    config: {
                        skipKdtId: !0,
                        skipShopInfo: !0
                    },
                    success: function(o) {
                        var n = [];
                        t.forEach(function(t) {
                            var i = o[t];
                            if (i) {
                                var r = [];
                                i.teamCertificate && "2" === i.teamCertType && r.push("企业认证"), i.isSecuredTransactions && r.push("担保交易"), 
                                i.teamPhysical && r.push("线下门店"), i.certData = r, i.shopLogo = a(i.shopLogo, "!200x200.jpg");
                                var s = i.recommendGoods || [];
                                i.recommendGoods = s.map(function(t) {
                                    return {
                                        goodsImg: a(t.goodsImg, "!300x0.jpg"),
                                        alias: t.alias
                                    };
                                }), n.push(i), e(n);
                            }
                        });
                    }
                });
            }
        };
    },
    347: function(t, e, o) {
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var n = a(o(0)), i = a(o(39)), r = a(o(336)), s = a(o(3)), u = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e.default = t, e;
        }(o(1)), d = o(4), c = getApp();
        (0, n.default)(u.Toast, {
            data: {
                fetched: !1,
                shopList: [],
                copyright: {},
                is_big_shop: !1
            },
            onLoad: function() {
                this.setData({
                    copyright: {
                        logo: i.default.common.yzLogo
                    }
                });
            },
            onShow: function() {
                0 === this.data.shopList.length && this.showZanToast({
                    title: "数据加载中",
                    icon: "loading"
                }), d.page.show(), this.fetchHomePageData();
            },
            onPullDownRefresh: function() {
                this.fetchHomePageData(), c.updateShopBaseData();
            },
            onShareAppMessage: function() {
                return {
                    title: "有赞"
                };
            },
            navigateToMars: function() {
                wx.switchTab({
                    url: "/pages-youzan/mars/index"
                });
            },
            fetchHomePageData: function() {
                var t = this;
                wx.getStorage({
                    key: "app:kdt_id",
                    success: function(e) {
                        var o = e.data, a = (void 0 === o ? {} : o).history || [];
                        0 !== a.length ? r.default.fetchHistoryAndFormat(a, function(e) {
                            t.setData({
                                fetched: !0,
                                shopList: e
                            }), wx.stopPullDownRefresh(), setTimeout(function() {
                                t.clearZanToast();
                            }, 500);
                        }) : t.setData({
                            fetched: !0
                        });
                    },
                    fail: function() {
                        t.setData({
                            fetched: !0
                        }), wx.stopPullDownRefresh(), t.clearZanToast();
                    }
                });
            },
            handleShopClick: function() {
                var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).currentTarget, e = (void 0 === t ? {} : t).dataset, o = (void 0 === e ? {} : e).kdtId;
                c.trigger("update:youzan:kdtId", o), this.log("to_shop_from_name", o, "点击店铺名进入店铺"), 
                s.default.navigate({
                    url: "/pages/home/dashboard/index"
                });
            },
            log: function(t, e, o) {
                d.track({
                    fm: "click",
                    ei: t,
                    en: o,
                    kdt_id: e
                }), c.logger && c.logger.log({
                    fm: "click",
                    ei: t,
                    en: o,
                    kdt_id: e
                });
            },
            handleGoodsClick: function() {
                var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).currentTarget, e = (void 0 === t ? {} : t).dataset, o = void 0 === e ? {} : e, a = o.kdtId, n = o.goodsAlias;
                c.trigger("update:youzan:kdtId", a), this.log("to_shop_form_img", a, "点击图片进入店铺"), 
                s.default.navigate({
                    url: "/pages/goods/detail/index?alias=" + n
                });
            }
        });
    }
});