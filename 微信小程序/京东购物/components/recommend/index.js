var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../api/Ptag/Ptag_utils.js")), t = require("../../bases/component.js"), a = require("../../common/logger.js"), i = require("../../api/Ptag/report_manager"), s = require("../../common/fe_helper.js"), o = require("utils"), r = require("../../common/utils"), n = require("../../common/biz"), c = require("../../common/toast/toast"), d = new a("推荐/猜你喜欢组件"), g = require("../../behaviors/attributes"), u = getApp();

new t({
    behaviors: [ g ],
    properties: {
        options: {
            type: Object,
            value: {
                recommendId: "",
                skus: ""
            },
            observer: "_onOptionsChange"
        }
    },
    data: {
        recommend: {
            config: {
                loaded: !1,
                enable: !1
            }
        },
        list: [],
        curMoreIndex: -1,
        loading: !1
    },
    attached: function() {
        var e = this;
        this.hasLoadPageNum = 0, this.options = {}, this.hasAddCart = !1, o.getConfig().then(function(t) {
            Object.assign(e.data.recommend.config, t, {
                loaded: !0
            }), !+t.enable || +t.pageSize <= 0 || !t.reclist || t.reclist && 0 === t.reclist.length || (t.reclist.length > 1 ? e._onRecommendDataReady() : e._onOptionsChange({
                recommendId: t.reclist.pop().recid
            }));
        }).catch(function(e) {
            d.error(e);
        });
    },
    ready: function() {
        u.event.on("recommend:" + r.getPageUrl().route, this.getMoreData.bind(this));
    },
    onDetached: function() {
        u.event.off("recommend:" + r.getPageUrl().route);
    },
    methods: {
        _onRecommendDataReady: function() {
            this.triggerEvent("ready", {
                recList: this.data.recommend.config.reclist
            });
        },
        _onOptionsChange: function(e, t) {
            this.hasAddCart ? this.hasAddCart = !1 : (this.options = e || {}, this.getMoreData());
        },
        _render: function(e) {
            var t = this.data.recommend.config, a = t.title, s = t.enableAdd2Cart, o = t.markBtns, r = t.t, n = t.skus, c = t.expid, d = t.reqsig, g = t.cornerMark;
            this.setData({
                list: e,
                title: a,
                enableAdd2Cart: s,
                markBtns: o || [],
                cornerMark: g
            });
            var u = [], h = [];
            e.forEach(function(e) {
                h.push(e.source), u.push(e.sku);
            }), i.guessyouLikeReport({
                action: "0",
                t: r,
                expid: c,
                reqsig: d,
                source: h.join(","),
                skus: n,
                cskus: u.join(",")
            });
        },
        getMoreData: function() {
            var e = this, t = this.data.recommend.config, a = t.loaded, i = t.enable, r = t.enablePagin, n = t.pageCount, c = t.pageSize;
            if (!(!a || !this.options.recommendId || "0" == i || "1" == r && +n <= 0 || +c <= 0) && (0 == this.hasLoadPageNum || !this.data.loading && "1" == r && this.hasLoadPageNum < n)) {
                var g = {
                    pi: this.hasLoadPageNum + 1,
                    pc: +c + (r ? 0 : 10),
                    recpos: this.options.recommendId,
                    skus: this.options.skus && o.isCartPage() ? this.options.skus : ""
                };
                "1" == r && this._showLoading(!0), o.getRecommendList(g).then(function(t) {
                    Object.assign(e.data.recommend.config, {
                        t: s.getUrlParam("t", t.impr),
                        expid: o.getVParams("expid", t.impr),
                        reqsig: o.getVParams("reqsig", t.impr),
                        skus: g.skus,
                        recpos: g.recpos
                    }), e.hasLoadPageNum++, e._showLoading(!1);
                    var a = (e.data.list || []).concat(t.list).splice(0, +c * e.hasLoadPageNum);
                    e._render(a);
                }).catch(function(t) {
                    d.error(t), e._showLoading(!1);
                });
            }
        },
        gotoDetails: function(t) {
            var a = t.currentTarget.dataset, i = a.sku, s = a.cover, o = a.name, r = a.price, n = a.pps, c = a.index, d = a.source, g = a.clk, u = a.paicon, h = this.data.recommend.config, m = h.t, l = h.expid, p = h.reqsig, f = h.recpos;
            this._onClick(t), this._report({
                action: "1",
                t: m,
                csku: i,
                cskus: "",
                clk: g,
                expid: l,
                reqsig: p,
                index: String(c),
                source: String(d),
                operation: f
            }), this.data.recommend.config.rd && e.default.addPtag(this.data.recommend.config.rd), 
            this.$goto("6" == u ? "/pages/pingou/item/item" : "/pages/item/detail/detail", {
                name: o,
                sku: i,
                cover: s,
                price: r / 100,
                pps: n,
                ptag: this.data.recommend.config.rd || ""
            });
        },
        add2Cart: function(e) {
            var t = this, a = e.currentTarget.dataset, i = a.sku, s = a.index, o = a.source, r = a.clk, d = this.data.recommend.config, g = d.t, u = d.expid, h = d.reqsig, m = d.recpos, l = "gyl_sku_" + i;
            this.hasAddCart = !0, this._onClick(e), this._report({
                action: "1",
                t: g,
                csku: i,
                cskus: "",
                clk: r,
                expid: u,
                reqsig: h,
                index: String(s),
                source: String(o),
                operation: m
            }), wx.showLoading({
                title: "正在加入购物车…",
                mask: !0
            }), n.addCart({
                skuId: i,
                buyNum: 1
            }).then(function(a) {
                wx.hideLoading(), c.show({
                    icon: c.ICON.SUCCESS,
                    content: "成功加入购物车"
                }), t.triggerEvent("afteraddcart", Object.assign(e.detail, {
                    success: !0,
                    domId: l
                }));
            }).catch(function(a) {
                wx.hideLoading(), c.show({
                    icon: c.ICON.ERROR,
                    content: a,
                    duration: 2e3
                }), t.triggerEvent("afteraddcart", Object.assign(e.detail, {
                    success: !1,
                    domId: l
                }));
            });
        },
        onMoreBtnTap: function(t) {
            var a = t.currentTarget.dataset.index;
            this.data.recommend.config.morePtag && e.default.addPtag(this.data.recommend.config.morePtag), 
            this.setData({
                curMoreIndex: a
            });
        },
        onMoreMarkTap: function(t) {
            var a = t.target.dataset, i = a.type, s = a.ptag, r = t.currentTarget.dataset, n = r.sku, c = r.price, d = r.index, g = (c / 100).toFixed(2);
            switch (i) {
              case "similar":
                s && e.default.addPtag(s), this.$goto("/pages/h5/index", {
                    url: "https://wqs.jd.com/search/searchsimilar.shtml?sku=" + n + "&jp=" + g + "&ptag=" + s + "&sceneid=19"
                });
                break;

              case "dislike":
                s && e.default.addPtag(s), d >= this.data.list.length - 6 && this.getMoreData(), 
                this.data.list.splice(d, 1), o.setClsDoublePrice(this.data.list), this.setData({
                    list: this.data.list,
                    curMoreIndex: -1
                });
                break;

              case "close":
                this.setData({
                    curMoreIndex: -1
                });
            }
        },
        _report: function(e) {
            0 == e.source && delete e.clk, i.guessyouLikeReport(e);
        },
        _onClick: function(e) {
            this.triggerEvent("click", e);
        },
        _showSkuPanel: function(e) {},
        _showLoading: function(e) {
            this.data.loading != e && this.setData({
                loading: e
            });
        }
    }
});