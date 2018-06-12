!function(t) {
    function e(n) {
        if (o[n]) return o[n].exports;
        var a = global.installedModules[n] = o[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(a.exports, a, a.exports, e), a.l = !0, a.exports;
    }
    t = Object.assign(require("../../../../commons.js").modules, t), t = Object.assign(require("../../../../vendors.js").modules, t);
    var o = {};
    o = global.installedModules = global.installedModules || {}, e.m = t, e.c = o, e.d = function(t, o, n) {
        e.o(t, o) || Object.defineProperty(t, o, {
            configurable: !1,
            enumerable: !0,
            get: n
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
    }, e.p = "", e(e.s = 171);
}({
    168: function(t, e, o) {
        var n = getApp(), a = o(2), s = o(6);
        t.exports = {
            listName: "grouponGoodsList",
            params: {
                goods_source: "0",
                page: 1,
                page_size: 20,
                sort_rule: "2"
            },
            components: [ {
                skipFetch: !0,
                buy_btn_type: "0",
                grouponGoodsList: [],
                show_all_btn: 0,
                show_buy_btn: "1",
                show_groupon_num: "1",
                show_title: "1",
                size: "1",
                type: "groupon_weapp"
            } ],
            fetch: function(t) {
                var e = this;
                return new Promise(function(o, a) {
                    n.carmen({
                        api: "youzan.weapp.grouponlist/1.0.0/get",
                        query: Object.assign(e.params, t),
                        success: function(t) {
                            var n = e.format(t);
                            o(n);
                        },
                        fail: function(t) {
                            a(t);
                        }
                    });
                });
            },
            format: function(t) {
                return t.map(function(t) {
                    return {
                        alias: t.alias,
                        title: t.goodTitle,
                        groupNums: t.groupPersonNum,
                        conditionNum: t.conditionNum,
                        isEnd: !1,
                        goodsInfo: {
                            totalStock: t.totalStock
                        },
                        thumbUrl: a(t.imageUrl, "!730x0.jpg"),
                        minActivityPrice: s(t.grouponPrice).toYuan(),
                        minOriginPrice: s(t.price).toYuan()
                    };
                });
            }
        };
    },
    169: function(t, e, o) {
        var n = getApp(), a = o(6);
        t.exports = {
            listName: "list",
            params: {
                page_size: 20,
                page_no: 1,
                group_id: ""
            },
            components: [ {
                size: 3,
                title: 1,
                price: 1,
                buy_btn: 1,
                buy_btn_type: 1,
                size_type: 2,
                type: "goods_weapp",
                show_corner_mark: 0,
                show_sub_title: 0,
                goods: []
            } ],
            fetch: function(t) {
                return t.page_no = t.page, delete t.page, n.request({
                    path: "wscump/coupon/get_ticket_goods.json",
                    query: Object.assign(this.params, t)
                }).then(this.format);
            },
            format: function(t) {
                return t.map(function(t) {
                    return t.image_url = t && t.picture.length ? t.picture[0].url : "https://img.yzcdn.cn/upload_files/no_pic.png?imageView2/2/w/280/h/280/q/75/format/webp?imageView2/2/w/380/h/380/q/75/format/webp", 
                    t.price = a(t.price).toYuan(), t;
                });
            }
        };
    },
    170: function(t, e, o) {
        var n = getApp(), a = o(2);
        t.exports = {
            listName: "list",
            params: {
                alias: "",
                page_size: 20,
                page_no: 1
            },
            components: [ {
                size: 1,
                title: 1,
                price: 1,
                buy_btn: 1,
                buy_btn_type: 1,
                size_type: 0,
                type: "goods_weapp",
                show_corner_mark: 0,
                show_sub_title: 0,
                goods: []
            } ],
            fetch: function(t) {
                var e = this;
                return t.page_no = t.page, delete t.page, new Promise(function(o, a) {
                    n.carmen({
                        api: "weapp.wsc.tag.items/1.0.0/get",
                        query: Object.assign(e.params, t),
                        success: function(t) {
                            var n = t.items, a = void 0 === n ? [] : n;
                            o(e.format(a));
                        },
                        fail: function(t) {
                            a(t);
                        }
                    });
                });
            },
            format: function(t) {
                return t.map(function(t) {
                    return t.pic_url ? t.image_url = a(t.pic_url, "!300x300.jpg") : t.image_url = a("/upload_files/no_pic.png", "!300x300.jpg"), 
                    t;
                });
            }
        };
    },
    171: function(t, e, o) {
        var n, a = (n = o(0)) && n.__esModule ? n : {
            default: n
        }, s = getApp(), i = o(1), r = o(20), p = "group", u = "coupon", c = "groupon", l = {
            group: o(170),
            coupon: o(169),
            groupon: o(168)
        };
        (0, a.default)(i.Toast, r, {
            data: {
                themeClass: s.themeClass,
                pageType: "",
                fetching: !0,
                requestParams: {},
                loading: !1,
                nomore: !1,
                nodata: !1
            },
            onLoad: function(t) {
                var e = this, o = t.pageType || p;
                delete t.title, -1 === [ u, p, c ].indexOf(o) || o === p && !t.alias || o === u && !t.group_id ? wx.switchTab({
                    url: "/pages/home/dashboard/index"
                }) : (o === c && (t.component = JSON.parse(t.component || "{}"), t.hide_goodssold = +t.component.hide_goods_sold), 
                this.typeComponent = l[o], this.showShowcaseComponents(this.typeComponent.components, 3), 
                t.page = 1, this.setData({
                    fetching: !0
                }), this.fetchList(t).then(function() {
                    e.setData({
                        fetching: !1
                    });
                }));
            },
            fetchList: function(t) {
                var e = this;
                return this.setData({
                    loading: !0
                }), this.typeComponent.fetch(t).then(function(t) {
                    e.setDataList(t);
                }).catch(function(t) {
                    e.showZanToast(t.msg || "获取信息失败");
                }).then(function() {
                    return e.setData({
                        loading: !1
                    });
                });
            },
            setDataList: function(t) {
                var e = this.data.theme.feature[0] || {};
                e[this.typeComponent.listName] = (e[this.typeComponent.listName] || []).concat(t), 
                this.setData({
                    "theme.feature[0]": e,
                    loading: !1,
                    nomore: t.length < 8,
                    nodata: 0 === e[this.typeComponent.listName].length,
                    "theme.extra": {
                        showLoading: !(t.length < 8)
                    }
                });
            },
            onShow: function() {
                this.setData({
                    copyright: s.globalData.copyright,
                    is_big_shop: s.globalData.is_big_shop
                });
            },
            onReachBottom: function() {
                this.data.loading || this.data.nomore || this.data.nodata || this.fetchList({
                    page: (this.typeComponent.params.page || this.typeComponent.params.page_no) + 1
                });
            },
            showcaseHandleGoodsBuy: function(t) {
                var e = t.currentTarget.dataset.alias;
                e && this.showComponentSKU({
                    alias: e,
                    needFetch: !0,
                    btns: [ "cart", "buy" ]
                });
            }
        });
    }
});