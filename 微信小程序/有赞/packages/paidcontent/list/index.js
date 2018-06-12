!function(t) {
    function e(a) {
        if (n[a]) return n[a].exports;
        var i = global.installedModules[a] = n[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return t[a].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
    }
    t = Object.assign(require("../../../commons.js").modules, t);
    var n = {};
    n = global.installedModules = global.installedModules || {}, e.m = t, e.c = n, e.d = function(t, n, a) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: a
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
    }, e.p = "", e(e.s = 158);
}({
    158: function(t, e, n) {
        var a, i = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
            }
            return t;
        }, o = (a = n(0)) && a.__esModule ? a : {
            default: a
        }, s = function(t) {
            if (t && t.__esModule) return t;
            var e = {};
            if (null != t) for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e.default = t, e;
        }(n(1)), l = n(17), c = getApp(), u = {
            page: 1,
            list: [],
            noMore: !1,
            loading: !1,
            noData: !1,
            total: 0
        }, r = [ "column", "content" ];
        (0, o.default)(s.Tab, {
            data: {
                type: "",
                fetched: !1,
                $checkRunning: !1,
                windowHeight: 0,
                column: u,
                content: u,
                tab: {
                    list: [ {
                        id: "column",
                        title: "专栏"
                    }, {
                        id: "content",
                        title: "内容"
                    } ],
                    selectedId: "column",
                    height: 45
                }
            },
            onLoad: function(t) {
                var e = t.type, n = void 0 === e ? "" : e, a = "我购买的专栏、内容";
                n && r.indexOf(n) >= 0 && (this.setData({
                    type: n
                }), a = "column" === n ? "全部专栏" : "全部内容"), wx.setNavigationBarTitle({
                    title: a
                }), this.loadData();
            },
            onShow: function() {
                this.setData({
                    windowHeight: c.getSystemInfoSync().windowHeight,
                    copyright: c.globalData.copyright,
                    is_big_shop: c.globalData.is_big_shop
                });
            },
            onPullDownRefresh: function() {
                var t = {};
                this.isColumn() ? t.column = u : t.content = u, this.setData(t, this.loadData.bind(this, !0));
            },
            disableLoadCheck: function() {
                var t = this.data.tab.selectedId;
                return this.data.type && (t = this.data.type), this.$checkRunning || this.data[t].noMore || this.data[t].noData || this.data[t].loading;
            },
            onPageScroll: function() {
                var t = this;
                this.disableLoadCheck() || (this.$checkRunning = !0, setTimeout(function() {
                    t.checkPagination(t.isColumn()), t.$checkRunning = !1;
                }, 400));
            },
            loadData: function(t) {
                this.isColumn() ? this.fetchColumnList(t) : this.fetchContentList(t);
            },
            isColumn: function() {
                return this.data.type ? "column" === this.data.type : "column" === this.data.tab.selectedId;
            },
            checkPagination: function(t) {
                var e = this;
                wx.createSelectorQuery().in(this).select(t ? "#column-list" : "#content-list").boundingClientRect(function(t) {
                    t && t.bottom < e.data.windowHeight + 200 && e.loadData();
                }).exec();
            },
            fetchContentList: function(t) {
                var e = this, n = this.data.content, a = n.page, o = n.list;
                this.setData({
                    "content.loading": !0
                });
                var s = {
                    api: "youzan.owl.content.sub/1.0.0/search",
                    data: {
                        page_size: 15,
                        page: a
                    }
                };
                this.data.type && (s.api = "youzan.owl.content/1.0.0/search", s.data.status = 1, 
                s.data.alias = ""), c.carmen(i({
                    method: "POST"
                }, s, {
                    success: function(t) {
                        var n = {};
                        (t.list || []).length < 15 && (n.noMore = !0), 1 !== a || t && t.list && t.list.length || (n.noData = !0), 
                        e.setData({
                            content: i({}, e.data.content, n, {
                                page: a + 1,
                                list: o.concat(e.parseContentList(t.list || [])),
                                total: t.total
                            })
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: e.data.type ? "获取内容列表失败" : "获取已购买内容列表失败",
                            icon: "none"
                        });
                    },
                    complete: function() {
                        t && wx.stopPullDownRefresh(), e.setData({
                            fetched: !0,
                            "content.loading": !1
                        });
                    }
                }));
            },
            fetchColumnList: function(t) {
                var e = this, n = this.data.column, a = n.page, o = n.list;
                this.setData({
                    "column.loading": !0
                });
                var s = {
                    api: "youzan.owl.column.sub/1.0.0/search",
                    data: {
                        page_size: 15,
                        page: a
                    }
                };
                this.data.type && (s.api = "youzan.owl.column/1.0.0/search", s.data.status = 1), 
                c.carmen(i({
                    method: "POST"
                }, s, {
                    success: function(t) {
                        var n = {};
                        (t.list || []).length < 15 && (n.noMore = !0), 1 !== a || t && t.list && t.list.length || (n.noData = !0), 
                        e.setData({
                            column: i({}, e.data.column, n, {
                                page: a + 1,
                                list: o.concat(e.parseColumnList(t.list || [])),
                                total: t.total
                            })
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: e.data.type ? "获取专栏列表失败" : "获取已订阅专栏列表失败",
                            icon: "none"
                        });
                    },
                    complete: function() {
                        t && wx.stopPullDownRefresh(), e.setData({
                            fetched: !0,
                            "column.loading": !1
                        });
                    }
                }));
            },
            parseColumnList: function(t) {
                return t.map(function(t) {
                    return {
                        alias: t.alias || "",
                        title: t.title,
                        summary: t.summary,
                        picture: t.picture.cover || "",
                        count: t.contentsCount,
                        subCount: t.subscriptionsCount,
                        time: (0, l.parseTime)(t.publishAt),
                        buyTime: (0, l.parseTime)(t.subCreateTime, !0),
                        price: (0, l.parsePrice)(t.price)
                    };
                });
            },
            parseContentList: function(t) {
                var e = !this.data.type;
                return t.map(function(t) {
                    return {
                        alias: t.alias || "",
                        picture: t.picture.cover || "",
                        mediaType: +t.mediaType,
                        title: t.title,
                        columnTitle: t.columnTitle || "",
                        showFree: t.columnAlias && t.isFree && !e,
                        summary: t.summary,
                        count: t.subscriptionsCount,
                        subCount: t.subscriptionsCount,
                        time: (0, l.parseTime)(t.publishAt),
                        buyTime: (0, l.parseTime)(t.subCreateTime, !0),
                        price: (0, l.parsePrice)(t.price)
                    };
                });
            },
            handleZanTabChange: function(t) {
                var e = this, n = t.selectedId;
                this.setData({
                    "tab.selectedId": n
                }, function() {
                    e.disableLoadCheck() || e.loadData();
                });
            }
        });
    }
});