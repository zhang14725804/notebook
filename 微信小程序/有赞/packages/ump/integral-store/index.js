!function(t) {
    function e(a) {
        if (o[a]) return o[a].exports;
        var s = global.installedModules[a] = o[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return t[a].call(s.exports, s, s.exports, e), s.l = !0, s.exports;
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
    }, e.p = "", e(e.s = 182);
}({
    182: function(t, e, o) {
        var a, s = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var o = arguments[e];
                for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
            }
            return t;
        }, i = (a = o(0)) && a.__esModule ? a : {
            default: a
        }, n = getApp(), r = (o(16), o(1)), c = o(2), l = o(4), p = {
            all: "",
            goods: 0,
            coupon: 1
        }, d = {
            data: {
                theme: n.themeClass,
                core: 0,
                loading: !1,
                tabs: {
                    list: [ {
                        id: "all",
                        title: "全部"
                    }, {
                        id: "goods",
                        title: "商品"
                    }, {
                        id: "coupon",
                        title: "优惠券"
                    } ],
                    scroll: !1,
                    selectedId: "all"
                },
                goods: []
            },
            onLoad: function(t) {
                var e = this;
                n.globalData.hasToken ? this.init(t) : n.once("app:token:success", function() {
                    return e.init(t);
                }), n.getPoints().then(function(t) {
                    return e.setData({
                        core: t.current_points
                    });
                }), wx.showShareMenu({
                    withShareTicket: !0
                });
            },
            init: function(t) {
                this.pageInfo = {
                    page_no: 1,
                    page_size: 20
                }, this.fetchGoodsList(this.pageInfo);
            },
            handleZanTabChange: function(t) {
                var e = t.selectedId;
                this.setData({
                    "tabs.selectedId": e
                }), this.setData({
                    goods: []
                }), this.fetchGoodsList(s({}, this.pageInfo, {
                    page_no: 1
                })), this.pageInfo.page_no = 1;
            },
            onShareAppMessage: function() {
                return l.page.processShareData({
                    title: "邀你来逛积分商城",
                    path: "packages/ump/integral-store/index"
                });
            },
            onScroll: function(t) {
                var e = t.detail.scrollTop;
                e > 130 && !this.data.isFixed ? this.setData({
                    isFixed: !0
                }) : e < 130 && this.data.isFixed && this.setData({
                    isFixed: !1
                }), e >= 1136 && !this.data.showToTopBtn ? this.setData({
                    showToTopBtn: !0
                }) : e < 1136 && this.data.showToTopBtn && this.setData({
                    showToTopBtn: !1
                });
            },
            onToLower: function(t) {
                this.data.loading || this.isEnd || (this.pageInfo.page_no++, this.fetchGoodsList(this.pageInfo));
            },
            onScrollToTop: function() {
                this.setData({
                    scrollPosition: 0,
                    showToTopBtn: !1
                });
            },
            fetchGoodsList: function(t) {
                var e = this;
                this.setData({
                    loading: !0
                }), n.request({
                    path: "wscump/integral/goods_list.json",
                    query: s({
                        goods_type: p[this.data.tabs.selectedId]
                    }, t),
                    success: function(o) {
                        e.setData({
                            loading: !1
                        }), Array.isArray(o) ? ((o = o.map(function(t) {
                            var e = 0 === t.goods_type ? Array.isArray(t.picture) && t.picture.length ? t.picture[0].url : "https://img.yzcdn.cn/upload_files/no_pic.png?imageView2/2/w/280/h/280/q/75/format/webp?imageView2/2/w/380/h/380/q/75/format/webp" : 7 === t.group_type ? "https://img.yzcdn.cn/public_files/2016/08/17/09b7ba2ea3f7f3742ca9f77eadb29c1b.png" : "https://img.yzcdn.cn/public_files/2016/08/17/671ac11cef68942f99f3083221561a51.png";
                            return t.image = c(e, "!180x180.jpg"), t.originPrice = .01 * t.price, t.price = 0 === t.goods_type && t.remain_price > 0 ? "¥" + t.remain_price / 100 + "+" + t.points_price + "积分" : t.points_price + "积分", 
                            t;
                        })).length < t.page_size && (e.isEnd = !0), e.setData({
                            goods: e.data.goods.concat(o)
                        }), e.checkShowTabs()) : e.showZanToast("数据异常");
                    },
                    fail: function() {
                        e.pageInfo.page_no = e.pageInfo.page_no - 1, e.setData({
                            loading: !1
                        });
                    }
                });
            },
            checkShowTabs: function() {
                if ("all" === this.data.tabs.selectedId && this.data.goods.length) {
                    for (var t = !1, e = this.data.goods, o = e[0].goods_type, a = 0; a < e.length; a++) if (e[a].goods_type !== o) {
                        t = !0;
                        break;
                    }
                    this.setData({
                        showTabs: t
                    });
                }
            }
        };
        (0, i.default)(r.Tab, r.Toast, d);
    }
});