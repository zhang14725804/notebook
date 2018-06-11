function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function a(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function o(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function e(e, t) {
        for (var a = 0; a < t.length; a++) {
            var o = t[a];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, a, o) {
        return a && e(t.prototype, a), o && e(t, o), t;
    };
}(), n = e(require("../../components/component")), i = e(require("../../models/format/grid_item_goods")), s = e(require("../../configs/api")), u = (e(require("../../libs/es6-promise.min")), 
e(require("../../libs/co/we-index"))), c = e(require("../../libs/regenerator-runtime/runtime")), l = require("../../common/index"), d = e(require("../../components/image_map/image_map")), f = "2742", g = {
    1: "SmallMixinPromotion",
    2: "LargeMixinPromotion",
    3: "subejct-scroll",
    99: "image-map"
}, p = function(e) {
    function p(e) {
        var o = e.page, r = e.ns;
        t(this, p);
        var n = a(this, (p.__proto__ || Object.getPrototypeOf(p)).call(this, o, r));
        return o && (n.page = o), n.naCacheGoodsList = [], n.naListId = "", n.subjectData = {
            size: 30,
            page: 1,
            subjectId: f
        }, n.naSize = 20, n.naPage = 1, n.setData({
            pageName: "new_arrivals",
            avatars: {
                one: "同城排行",
                two: "身边的人都在拼",
                icon: []
            },
            projects: {
                one: "精选专题",
                two: "你要的，都整理好了",
                icon: []
            },
            toTopCls: "",
            naPage: 1,
            noOrderText: "",
            isLoadingMore: !1,
            naList: [],
            lotteryGoodsList: [],
            localGroupsMap: {},
            showError: !1,
            isLoadAll: !1,
            templeName: "gridItemV2"
        }), n.getLotteryGoodsInfo(), n.getSubjectImgInfo(), n;
    }
    return o(p, n.default), r(p, [ {
        key: "getListId",
        value: function() {
            var e = this;
            e.naListId || (e.naListId = "xcx_new_arrivals_" + l.DataUtil.getRandomString(6));
        }
    }, {
        key: "getLotteryGoodsInfo",
        value: function() {
            var e = this;
            e.getLotterySubjectGoods = u.default.wrap(c.default.mark(function t() {
                var a, o, r, n, u, d, f, g, p, h;
                return c.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.prev = 0, t.next = 3, l.User.getUserProvinceId(this) || 1;

                      case 3:
                        return a = t.sent, o = this.subjectData, r = o.page, n = o.size, u = o.subjectId, 
                        d = l.DataUtil.formatByPos(s.default.subjectGoodsApi, u, r, n, a), f = l.Request.requestDataWithUrl("GET", d, null, !0), 
                        t.next = 9, l.Request.runMainRequestForPage(f, this.page);

                      case 9:
                        g = t.sent, p = g.goods_list || [], h = [], p.forEach(function(e) {
                            h.push(i.default.formatData(e));
                        }), e.setData({
                            lotteryGoodsList: h
                        }), t.next = 19;
                        break;

                      case 16:
                        t.prev = 16, t.t0 = t.catch(0), console.error(t.t0);

                      case 19:
                      case "end":
                        return t.stop();
                    }
                }, t, this, [ [ 0, 16 ] ]);
            }));
        }
    }, {
        key: "requestList",
        value: function(e) {
            var t = this, a = this.naPage, o = this.naSize, r = this.naListId, n = "v5/newlist?page=" + a + "&size=" + o + "&list_id=" + r;
            if (!this.data.isLoadingMore && !this.data.isLoadAll) {
                this.setData({
                    isLoadingMore: !0
                }), e && this.page.$showLoading();
                var s = l.Request.requestDataWithUrl("GET", n, null, !0);
                l.Request.runMainRequestForPage(s, this).then(function(e) {
                    t.page.$hideLoading(), t.setData({
                        isLoadingMore: !1
                    });
                    var a = l.DataUtil.isArray(e.goods_list) ? e.goods_list : [], n = t.naCacheGoodsList;
                    a.forEach(function(e) {
                        var t = i.default.formatData(e);
                        t.listId = r, n.push(t);
                    }), t.naCacheGoodsList = [].concat(n), t.naCacheGoodsList = l.DataUtil.objectArrayDuplicateRemove(t.naCacheGoodsList, "goodsId", function(e) {
                        return 1 == e.isApp;
                    });
                    var s = d.default.execMix(null, t.naCacheGoodsList, t.mixInfos, g, t.data.templeName);
                    t.mixGoodsData = d.default.listPositionAdjust(s);
                    var u = e && e.goods_list && e.goods_list.length;
                    0 == u ? t.setData({
                        isLoadAll: !0,
                        noOrderText: "没有更多的商品了..."
                    }) : u > 0 && u <= o / 2 ? (t.fillGoodsList(), t.naPage++, t.setData({
                        naPage: t.naPage
                    }), t.requestList()) : (t.fillGoodsList(), t.naPage++, t.setData({
                        naPage: t.naPage
                    }));
                }, function() {
                    t.page.$hideLoading(), t.setData({
                        showError: !0,
                        isLoadingMore: !1
                    });
                });
            }
        }
    }, {
        key: "fillGoodsList",
        value: function() {
            var e = this.mixGoodsData || [], t = this.data.naList || [], a = t.length;
            if (e.length > a) {
                var o = e.length - a, r = 20;
                o < 20 && o % 2 != 0 && !this.data.isLoadAll && (r = o - 1), t = e.slice(0, t.length + r), 
                this.setData({
                    naList: t
                });
                var n = t.slice(a);
                this.page.$requestLocalGroup(n), this.page.tryInitImprRect();
            }
        }
    }, {
        key: "onPageScroll",
        value: function() {}
    }, {
        key: "getSubjectImgInfo",
        value: function() {
            this.getSubSubjectImg = u.default.wrap(c.default.mark(function e(t) {
                var a, o, r;
                return c.default.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.prev = 0, a = l.DataUtil.formatByPos(s.default.getNewArrivalSubSubject), 
                        o = l.Request.requestDataWithUrl("GET", a, null, !0), e.next = 5, l.Request.runMainRequestForPage(o, this.page);

                      case 5:
                        if (!(r = e.sent).error_code) {
                            e.next = 9;
                            break;
                        }
                        return t.mixInfos = [], e.abrupt("return");

                      case 9:
                        t.mixInfos = d.default.formatMixInfo(r.mix) || [], e.next = 16;
                        break;

                      case 12:
                        e.prev = 12, e.t0 = e.catch(0), t.mixInfos = [], console.error(e.t0);

                      case 16:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 0, 12 ] ]);
            }));
        }
    }, {
        key: "mapClick",
        value: function(e) {
            d.default.mapClick(e, this);
        }
    }, {
        key: "gotoSubject",
        value: function(e) {
            var t = e.currentTarget.dataset.subjectId;
            t && l.Navigation.forward("/pages/subject/subject?subject_id=" + t), (0, l.TrackingRecord)({
                op: "click",
                event: "more_click",
                page_name: "new_arrivals",
                page_section: "nested_subject_list",
                page_element: "more",
                nested_subject_id: t
            });
        }
    } ]), p;
}();

exports.default = p;