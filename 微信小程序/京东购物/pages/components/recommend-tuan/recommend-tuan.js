var t = require("../../../bases/component"), e = require("../../../models/pingou/pingou"), a = (require("../../../common/toast/toast.js"), 
require("../../../common/logger")), i = require("../../../common/fe_helper"), o = require("../../../libs/promise.min.js"), s = require("../../../common/cookie-v2/cookie"), n = new a("组件 hot-recommend");

new t({
    properties: {
        notShowPennyItem: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        listState: "init",
        list: [],
        storage: [],
        pageNumber: 0,
        isEnd: !1
    },
    ready: function() {
        this.getMoreGoods = i.throttle(this.getMoreGoods, 500), this.getHotGoods();
    },
    methods: {
        gotoDetail: function(t) {
            var e = t.currentTarget.dataset.idx, a = this.data.list[e], i = a.sku_id, o = a.imagePath, s = a.name;
            this.$goto("/pages/pingou/item/item", {
                cover: o,
                sku: i,
                name: s
            });
        },
        getHotGoods: function() {
            var t = this;
            this.data.pageNumber = this.data.pageNumber + 1, e.getRecommendProducts({
                pageNo: this.data.pageNumber
            }).then(function(a) {
                if (a && 0 != a.active_info.length) {
                    var s = a.active_info, r = s.map(function(t) {
                        return t.sku_id;
                    });
                    o.all([ e.getSkuInfo(r), e.getTuanPrice(r.join(",")) ]).then(function(e) {
                        e && (s = s.reduce(function(t, a) {
                            var o = Object.assign(a, e[1].filter(function(t) {
                                return t.id == a.sku_id;
                            })[0], e[0][a.sku_id]), s = o.name, n = o.tuan_capacity, r = o.imagePath, u = o.ptuan_count, d = o.op, h = o.bp, c = o.sku_id;
                            return r = i.getImg(r, 240), t.concat([ {
                                name: s,
                                tuan_capacity: n,
                                imagePath: r,
                                ptuan_count: u,
                                op: d,
                                bp: h,
                                sku_id: c
                            } ]);
                        }, [])), 1 == t.data.pageNumber && (t.data.storage = s), t.showGoodsList(s);
                    }).catch(function(e) {
                        t.showError(), n.error(e);
                    });
                }
            }).catch(function(e) {
                t.showError(), n.error(e);
            });
        },
        showGoodsList: function(t) {
            this.data.isEnd = 10 * this.data.pageNumber >= 100, this.data.pageNumber > 1 ? t = this.data.list.concat(t) : 1 == this.data.pageNumber && (t = t.slice(0, 4)), 
            this.data.list = t, this.setData({
                list: t,
                listState: this.data.isEnd ? "end" : "loading"
            });
        },
        getMoreGoods: function() {
            if (!this.data.isEnd) {
                if (0 != this.data.storage.length) {
                    var t = this.data.list.concat(this.data.storage.slice(4, 10));
                    return this.setData({
                        list: t
                    }), this.data.list = t, void (this.data.storage = []);
                }
                "error" == this.data.listState ? this.refreshGoods() : this.getHotGoods();
            }
        },
        refreshGoods: function() {
            this.setData({
                listState: "init"
            }), this.data.pageNumber = this.data.pageNumber - 1, this.getHotGoods();
        },
        showRefresh: function() {
            this.setData({
                listState: "error"
            });
        },
        toPingouIndex: function() {
            var t = 2 == s.getCookie("wxapp_type") ? "switchTab" : "navigateTo";
            this.$goto("/pages/pingou/index/index", t);
        },
        showError: function() {
            this.showRefresh();
        }
    }
});