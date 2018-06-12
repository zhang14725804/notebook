!function(t) {
    function e(o) {
        if (n[o]) return n[o].exports;
        var s = global.installedModules[o] = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(s.exports, s, s.exports, e), s.l = !0, s.exports;
    }
    t = Object.assign(require("../../../commons.js").modules, t), t = Object.assign(require("../../../vendors.js").modules, t);
    var n = {};
    n = global.installedModules = global.installedModules || {}, e.m = t, e.c = n, e.d = function(t, n, o) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: o
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(n, "a", n), n;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 108);
}({
    108: function(t, e, n) {
        function o(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function s(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e.default = t, e;
        }
        var a = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
            }
            return t;
        }, i = n(7), r = s(n(1)), c = s(n(8)), l = o(n(2)), u = o(n(0)), p = getApp(), d = {
            data: {
                theme: p.themeClass,
                core: "0",
                hasStore: !1,
                scrollPosition: 0,
                showPhoneTip: !1,
                loading: !1,
                tabs: {
                    list: [ {
                        id: "integral",
                        title: "积分记录"
                    }, {
                        id: "goods",
                        title: "兑换记录"
                    } ],
                    scroll: !1,
                    selectedId: "integral"
                },
                list: []
            },
            onLoad: function(t) {
                var e = this;
                t.tab && this.setData({
                    "tabs.selectedId": t.tab
                }), p.getPoints().then(function(t) {
                    return e.setData({
                        core: t.current_points
                    });
                }), p.globalData.hasToken ? this.init(t) : p.once("app:token:success", function() {
                    return e.init(t);
                });
            },
            init: function(t) {
                this.pageInfo = {
                    page_no: 1,
                    page_size: 20
                }, this.checkPhoneNumber(), this.fetchIsOpenStore(), this.fetchList(a({}, this.pageInfo));
            },
            checkPhoneNumber: function() {
                this.setData({
                    showPhoneTip: !p.getBuyerId()
                });
            },
            fetchIsOpenStore: function() {
                var t = this;
                p.request({
                    path: "wscump/integral/has_open.json",
                    success: function(e) {
                        t.setData({
                            hasStore: e.status || !1
                        });
                    }
                });
            },
            handleZanTabChange: function(t) {
                var e = t.selectedId;
                this.setData({
                    "tabs.selectedId": e
                }), this.setData({
                    list: []
                }), this.fetchList(a({}, this.pageInfo, {
                    page_no: 1
                })), this.pageInfo.page_no = 1;
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
                this.data.loading || this.isEnd || (this.pageInfo.page_no = this.pageInfo.page_no + 1, 
                this.fetchList(a({}, this.pageInfo)));
            },
            onScrollToTop: function() {
                this.setData({
                    scrollPosition: 0,
                    showToTopBtn: !1
                });
            },
            tapBindZanAccount: function() {
                this._upadateTitle(""), this.bindZanAccount();
            },
            fetchList: function(t) {
                var e = "integral" === this.data.tabs.selectedId ? "wscump/integral/user_points_list.json" : "wscump/integral/paid_list.json", n = this;
                this.setData({
                    loading: !0
                }), p.request({
                    path: e,
                    query: t,
                    success: function(t) {
                        var e = "integral" === n.data.tabs.selectedId ? t.record_list.map(function(t) {
                            return t.created_at = (0, i.moment)(1e3 * t.created_at, "YYYY-MM-DD HH:mm:ss"), 
                            t;
                        }) : function(t) {
                            return t.map(function(t) {
                                var e = 0 === t.consume_type ? t.img_url : 7 === t.group_type ? "https://img.yzcdn.cn/public_files/2016/08/17/09b7ba2ea3f7f3742ca9f77eadb29c1b.png" : "https://img.yzcdn.cn/public_files/2016/08/17/671ac11cef68942f99f3083221561a51.png";
                                return t.image = (0, l.default)(e, "!180x180.jpg"), t.originPrice = t.origin_unit_price ? .01 * t.origin_unit_price : "", 
                                t.count = t.num, t.price = 0 === t.consume_type && t.real_pay ? "¥" + t.real_pay / 100 + "+" + t.cost_points + "积分" : t.cost_points + "积分", 
                                t.url = 0 === t.consume_type ? "/packages/trade/order/result/index?orderNo=" + t.order_no : "/packages/user/coupon/detail/index?id=" + t.order_no + "&type=" + t.group_type + "&from=points-cash-list", 
                                t;
                            });
                        }(t);
                        e.length < n.pageInfo.page_size ? n.isEnd = !0 : n.isEnd = !1, n.setData({
                            list: n.data.list.concat(e),
                            loading: !1
                        });
                    },
                    fail: function(t) {
                        n.showZanToast(t.msg || "获取数据失败"), n.pageInfo.page_no = n.pageInfo.page_no - 1, 
                        n.setData({
                            loading: !1
                        });
                    }
                }).catch(function(t) {
                    console.log(t), n.showZanToast(t.msg || "获取数据失败"), n.setData({
                        loading: !1
                    });
                });
            },
            onZanAccountBinded: function() {}
        };
        (0, u.default)({}, r.Tab, r.Toast, c, d);
    }
});