function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function a(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function o(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function r(e, t) {
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

var n = function() {
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
}(), s = e(require("../index_component.js")), i = e(require("../../../libs/co/we-index")), d = e(require("../../../libs/regenerator-runtime/runtime")), l = e(require("../../../common/request.js")), c = e(require("../../../common/image_util.js")), u = e(require("../../../common/data_util.js")), p = e(require("../../../common/util.js")), g = e(require("../../../common/object_util.js")), f = e(require("../../../controller/config_controller")), h = e(require("../../../constants/groups")), _ = e(require("../../../common/gotop_util")), m = e(require("../../../controller/user_controller")), x = e(require("../../../storage/user_storage")), v = e(require("../index_special_goods")), I = e(require("../../../libs/anti_robot")), y = e(require("../../../storage/ram_manager")), b = e(require("../../../configs/api")), R = require("../../../constants/category_sort"), w = require("../../../common/index"), L = 20, k = {
    goods: "10250",
    groups: "10037",
    subjectGoods: "10421"
}, S = function(e) {
    function S(e) {
        a(this, S);
        var t = o(this, (S.__proto__ || Object.getPrototypeOf(S)).call(this, e));
        return t.indexRecOnly = !1, t.hasReqUserAuth = !1, t.pageSize = L, t.curImprIndex = -1, 
        t.tabsReqRunningArr = [], t.catgoodsStorage = [], t.pageIndex = 1, t.recPageIndex = 1, 
        t.lastIndex = 0, t.randomStr = u.default.getRandomString(6), t.scrollTopValue = 0, 
        t.localGroupsFlag = !1, t.page.gotoGoodsDetail = p.default.bind(t.gotoGoodsDetail, t), 
        t.anti = new I.default({
            serverTime: Date.parse(new Date())
        }), t.loadComponentData(), t;
    }
    return r(S, s.default), n(S, [ {
        key: "loadComponentData",
        value: function() {
            this.refreshSpecialGoods(), this.loadHomeTabGoodsList();
        }
    }, {
        key: "preLoadNextGoodsList",
        value: function() {
            var e = this;
            (0, i.default)(d.default.mark(function t() {
                return d.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        e.getTabReqGoodsList(1, e), e.getTabReqGoodsList(2, e), e.getTabReqGoodsList(3, e);

                      case 3:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            })).catch(function(e) {
                console.log(e);
            });
        }
    }, {
        key: "onReachBottom",
        value: function() {
            var e = this.data.tabStatus[this.data.curTabIndex] || {};
            e.canLoadMore || e.recCanLoadMore ? this.loadMore() : this.fillCatgoodsListData(this.data.curTabIndex, e);
        }
    }, {
        key: "loadMore",
        value: function() {
            if (!this.scrollToLowerlock) {
                this.scrollToLowerlock = !0;
                var e = this.data.curTabIndex, a = this, o = a.wsingle, r = y.default.sceneId, n = this.data.tabStatus[e] || {};
                if (n.canLoadMore) try {
                    if (0 === e) {
                        var s = {
                            column: 1,
                            page: a.pageIndex,
                            size: a.pageSize,
                            platform: 5
                        };
                        o ? (s.list_id = "xcx_index_wsingle_" + a.randomStr, a.wsingle = !0) : (s.list_id = "xcx_index_single_" + a.randomStr, 
                        a.wsingle = !1), a.getIndexReqGoodsList(-1, a.pageIndex, s, 1, a);
                    } else a.wsingle = !1, a.getTabReqGoodsList(e, a);
                } catch (e) {
                    console.error(e);
                } else {
                    if (0 === e && 1 === a.recPageIndex) {
                        var i = this.data.catgoodsList[e] || [], d = -1, l = !1;
                        i && (d = i.length - 1), this.indexRecOnly ? 1019 === r && o && (l = !0) : l = !0;
                        var c = {
                            isShowNext: l
                        };
                        c.lastSingleGoodsIndex = d, this.setData(c);
                    }
                    if (a.wsingle = !1, 0 === e && n.recCanLoadMore) {
                        var u = {
                            column: 2,
                            list_id: "xcx_index_goods_" + a.randomStr,
                            page: a.recPageIndex,
                            size: a.pageSize,
                            platform: 5
                        };
                        a.getIndexReqGoodsList(-2, this.recPageIndex, u, 2, a);
                    } else n.showNoMoreText = !0, this.setData(t({}, "tabStatus[" + e + "]", n));
                }
            }
        }
    }, {
        key: "onPageScroll",
        value: function(e) {
            var t = parseInt(e.scrollTop);
            this.page && _.default.showGoTopBtn(t, this.page), this.page.$requestLocalGroup();
        }
    }, {
        key: "gotoGoodsDetail",
        value: function(e) {
            var t = e.currentTarget.dataset.refer;
            0 !== this.data.curTabIndex || t ? "wsingle" === t ? this.forwardGoodDetail(e, "wsingle") : this.forwardGoodDetail(e, "main") : this.forwardGoodDetail(e, "rec"), 
            this.page.$uploadFormId(e);
        }
    }, {
        key: "forwardGoodDetail",
        value: function(e, t) {
            var a = e.currentTarget.dataset, o = a.goodsId, r = a.goodsItem, n = a.index, s = a.eventType;
            null != o && (this.page.transGoodsData = r, this.page.$forward("goods", {
                goods_id: o
            }));
            var i = !this.data.specialList || 0 === this.data.specialList.length, d = void 0, l = this.data.curTabIndex, c = {
                op: "click",
                event: "goods_clk",
                page_name: "index",
                page_section: "goods_list",
                goods_id: o,
                idx: n,
                page_element: "goods",
                page_el_sn: 99862
            };
            if (0 === l && this.data.catgoodsList && this.data.catgoodsList[l]) {
                var u = n;
                "rec" === t && (u += this.data.lastSingleGoodsIndex + 1), d = "gridItemV2" === (this.data.catgoodsList[l][u] || {}).template ? this.data.isSpikeGoods ? "99367_04" : i ? this.indexRecOnly ? "99367_03" : "99367_02" : "99367_01" : this.data.isSpikeGoods ? "99595_04" : i ? "99595_02" : "99595_01", 
                c.xcx_list_id = d;
            }
            if (r && r.listId && (c.list_id = r && r.listId), "subject" == t) {
                c.event = "subject_goods_clk", c.page_section = "subject", c.idx = a.subIndex;
                var p = this.data.homeOperations[l];
                c.section_id = p.opt_id;
            } else if ("main" == t) {
                if (l > 0) {
                    var g = this.data.homeOperations[l], f = g.children ? 1 : 2;
                    c.opt_type = f, c.opt_id = g.opt_id, c.page_section = "opt_goods_list", c.page_el_sn = 99740, 
                    void 0 != s && (c.event_type = s), r.ad && (c.ad = JSON.stringify(r.ad));
                }
            } else "rec" == t ? (c.page_section = "rec_list", c.rec_goods_id = o, c.idx = n, 
            void 0 != s && (c.rec_event_type = s), c.page_el_sn = 99366, delete c.goods_id) : "spike" === t ? (c.is_onsold = a.currentCanBuy, 
            c.page_element = "seckill") : "spike_goods_item" === t ? (c.is_onsold = a.currentCanBuy, 
            c.page_element = "seckill", c.page_section = "nested_goods_list") : "spike_btn" === t ? (c.page_element = "quick_buy_btn", 
            c.is_onsold = a.currentCanBuy) : "wsingle" === t ? (c.rec_goods_id = o, c.page_section = "single_list", 
            c.page_el_sn = 99366, void 0 != s && (c.rec_event_type = s)) : (c.event = "buy_clk", 
            c.page_element = "buy_btn");
            r && (r.ad && (c.ad = JSON.stringify(r.ad)), r.p_rec && (c.p_rec = JSON.stringify(r.p_rec)), 
            r.p_search && (c.p_search = JSON.stringify(r.p_search))), c.opt_id || this.data.catgoodsList && this.data.catgoodsList[l] && this.data.catgoodsList[l][n] && (c.event_type = this.data.catgoodsList[l][n].eventType), 
            (0, w.TrackingRecord)(c);
        }
    }, {
        key: "loadHomeTabGoodsList",
        value: function() {
            if (0 == this.data.curTabIndex) {
                var e = y.default.sceneId, t = this;
                (0, i.default)(d.default.mark(function a() {
                    var o, r, n, s, i;
                    return d.default.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            return a.prev = 0, a.next = 3, f.default.getConfig("index_rec_only");

                          case 3:
                            return o = a.sent, a.next = 6, f.default.getConfig("index_rec_only1019");

                          case 6:
                            if (r = a.sent, t.indexRecOnly = o, t.indexRecOnly1019 = r, 1019 !== e) {
                                a.next = 16;
                                break;
                            }
                            return a.next = 12, l.default.apiRequest("POST", b.default.getAbScene, {
                                busi_name: "wallet_entrance",
                                scene_ids: [ "wallet_entrance_0" ]
                            }, !1);

                          case 12:
                            (n = a.sent) && n.ab_map ? (s = n.ab_map.wallet_entrance_0, y.default.walletEntracne = s, 
                            1 !== s && r ? t.handleIndexRecOnlyData() : t.handleNotIndexRecOnly1019()) : r ? t.handleIndexRecOnlyData() : t.handleNotIndexRecOnly1019(), 
                            a.next = 17;
                            break;

                          case 16:
                            t.indexRecOnly ? t.handleIndexRecOnlyData() : (i = {
                                column: 1,
                                list_id: "xcx_index_single_" + t.randomStr,
                                page: t.pageIndex,
                                size: t.pageSize,
                                platform: 5
                            }, t.wsingle = !1, t.getIndexReqGoodsList(-1, t.pageIndex, i, 1, t));

                          case 17:
                            a.next = 23;
                            break;

                          case 19:
                            a.prev = 19, a.t0 = a.catch(0), console.log("========首页列表数据获取失败========"), console.error(a.t0);

                          case 23:
                          case "end":
                            return a.stop();
                        }
                    }, a, this, [ [ 0, 19 ] ]);
                }));
            }
        }
    }, {
        key: "handleIndexRecOnlyData",
        value: function() {
            var e = this, t = {
                column: 2,
                list_id: "xcx_index_goods_" + e.randomStr,
                page: e.recPageIndex,
                size: e.pageSize,
                platform: 5
            };
            e.wsingle = !1, e.getIndexReqGoodsList(-2, e.pageIndex, t, 2, e);
        }
    }, {
        key: "handleNotIndexRecOnly1019",
        value: function() {
            var e = this, t = {
                column: 1,
                list_id: "xcx_index_wsingle_" + e.randomStr,
                page: e.pageIndex,
                size: e.pageSize,
                platform: 5
            };
            e.wsingle = !0, e.getIndexReqGoodsList(-1, e.pageIndex, t, 1, e);
        }
    }, {
        key: "loadTargetTabGoodsList",
        value: function(e) {
            this.page.$showLoading();
            var t = this, a = this.data.homeOperations || [], o = function(e) {
                return (0, i.default)(d.default.mark(function o() {
                    var r;
                    return d.default.wrap(function(o) {
                        for (;;) switch (o.prev = o.next) {
                          case 0:
                            if (!(e >= 1 && e < a.length)) {
                                o.next = 17;
                                break;
                            }
                            if ((r = t.data.tabStatus)[e] && r[e].offset) {
                                o.next = 15;
                                break;
                            }
                            return o.prev = 3, o.next = 6, t.getTabReqGoodsList(e, t);

                          case 6:
                            t.page.$hideLoading(), o.next = 13;
                            break;

                          case 9:
                            o.prev = 9, o.t0 = o.catch(3), t.page.$hideLoading(), console.error(o.t0);

                          case 13:
                            o.next = 17;
                            break;

                          case 15:
                            t.page.$hideLoading(), setTimeout(function() {
                                _.default.goTop(!0, 0);
                            }, 100);

                          case 17:
                          case "end":
                            return o.stop();
                        }
                    }, o, this, [ [ 3, 9 ] ]);
                }));
            };
            o(e), o(e - 1), o(e + 1), e != this.lastIndex && this.page.resetInitRect(), this.page.tryInitImprRect(), 
            this.curImprIndex = 0 === e ? -1 : e, this.lastIndex = e;
        }
    }, {
        key: "getIndexReqGoodsList",
        value: function(e, t, a, o, r) {
            if (r.isReqRunning(e, t)) return null;
            r.addReqFlag(e, t);
            var n = this, s = n.wsingle;
            (0, i.default)(d.default.mark(function i() {
                var c, p, g, f, h;
                return d.default.wrap(function(i) {
                    for (;;) switch (i.prev = i.next) {
                      case 0:
                        if (i.prev = 0, c = u.default.generateAntiContent(n.anti), a = a || {}, a.anti_content = c, 
                        p = void 0, !s) {
                            i.next = 11;
                            break;
                        }
                        return i.next = 8, l.default.apiRequest("GET", b.default.getAlexaGoods, a, !1);

                      case 8:
                        p = i.sent, i.next = 15;
                        break;

                      case 11:
                        return g = l.default.requestDataWithCmd(k.goods, {
                            params: a
                        }), i.next = 14, l.default.runMainRequestForPage(g, r);

                      case 14:
                        p = i.sent;

                      case 15:
                        return f = (p.goods_list || []).length, h = p.goods_list || [], h = r.filterGoods(h, o) || [], 
                        r.processGoodsList({
                            rootOptId: e,
                            pageIndex: t,
                            curRawPageSize: f,
                            goodsList: h,
                            column: o
                        }), f <= L / 2 && r.loadMore(), n.anti.clearCache(), i.abrupt("return", h);

                      case 24:
                        i.prev = 24, i.t0 = i.catch(0), console.error(i.t0), r.requestTagGoodsError({
                            resIndex: 0,
                            rootOptId: e,
                            column: o,
                            pageIndex: t
                        });

                      case 28:
                      case "end":
                        return i.stop();
                    }
                }, i, this, [ [ 0, 24 ] ]);
            }));
        }
    }, {
        key: "getTabReqGoodsList",
        value: function(e, t) {
            var a = ((t.data.homeOperations || [])[e] || {}).opt_id, o = t.data.tabStatus[e] || {}, r = o.offset || 0, n = 0 == r ? 20 : 50, s = o.flip || "";
            if (null == a || -1 == a) return null;
            if (t.isReqRunning(a, r)) return null;
            t.addReqFlag(a, r);
            var c = {
                opt_type: 1,
                offset: r,
                size: n,
                sort_type: R.CategorySortTypes[0].api
            };
            return s && (c.flip = s), (0, i.default)(d.default.mark(function o() {
                var n, s, i, u, p;
                return d.default.wrap(function(o) {
                    for (;;) switch (o.prev = o.next) {
                      case 0:
                        return o.prev = 0, n = l.default.requestDataWithCmd(k.groups, {
                            restfulParam: a,
                            params: c
                        }), o.next = 4, l.default.runSecondaryRequestForPage(n, t);

                      case 4:
                        s = o.sent, i = s.goods_list || [], u = i.length || 0, p = s.opt_infos || [], i = i.map(function(e) {
                            return t.formatTagGoodsData(e);
                        }), p = p.map(function(e) {
                            return {
                                key: "optinfo-" + e.id,
                                optId: parseInt(e.id, 10) || 0,
                                optType: parseInt(1, 10) + 1,
                                optName: e.opt_name,
                                priority: e.priority
                            };
                        }), t.processGoodsList({
                            goodsList: i,
                            optInfos: p,
                            rootOptType: 1,
                            rootOptId: a,
                            offset: r,
                            flip: s.flip || "",
                            curRawGoodsListSize: i.length
                        }), u <= L / 2 && t.loadMore(), o.next = 18;
                        break;

                      case 14:
                        o.prev = 14, o.t0 = o.catch(0), console.error(o.t0), t.requestTagGoodsError({
                            resIndex: e,
                            rootOptId: a,
                            pageIndex: null,
                            offset: r
                        });

                      case 18:
                      case "end":
                        return o.stop();
                    }
                }, o, this, [ [ 0, 14 ] ]);
            }));
        }
    }, {
        key: "requestTagGoodsError",
        value: function(e) {
            this.removeReqFlag(e.rootOptId, null == e.pageIndex ? e.offset : e.pageIndex);
            var a = e.resIndex;
            this.page.$showToast("网络出错"), this.page.$hideLoading();
            var o = !1;
            null == e.pageIndex ? 0 === e.offset && (o = !0) : 1 === e.pageIndex && (o = !0), 
            o && this.setData(t({}, "tabStatus[" + a + "].showError", !0));
        }
    }, {
        key: "refreshSpecialGoods",
        value: function() {
            var e = this;
            (0, i.default)(d.default.mark(function t() {
                var a, o, r, n, s;
                return d.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        return t.next = 2, f.default.getConfig("index_rec_only");

                      case 2:
                        return a = t.sent, t.next = 5, w.User.getUserProvinceId(e);

                      case 5:
                        if (o = t.sent, e.indexRecOnly = a, !a) {
                            t.next = 9;
                            break;
                        }
                        return t.abrupt("return");

                      case 9:
                        r = "image_url", n = function() {
                            var t = l.default.requestDataWithCmd(k.subjectGoods, {
                                params: {
                                    subject_id: 1713,
                                    page: 1,
                                    size: 20,
                                    province_id: o
                                }
                            });
                            l.default.runSecondaryRequestForPage(t, e.page).then(function(t) {
                                if (t) {
                                    var a = v.default.processSpecialGoods(t.goods_list, r) || [];
                                    e.setData({
                                        specialList: a.slice(0, 2)
                                    });
                                }
                            });
                        }, s = function() {
                            if (null == x.default.getEgrp()) {
                                var t = m.default.reqUserAB();
                                t && t.then(function() {
                                    n();
                                }, function(t) {
                                    "获取用户信息失败" === t.error_msg && (e.hasReqUserAuth = !0);
                                });
                            } else n();
                        }, w.User.hasLogin() ? s() : e.hasReqUserAuth || s();

                      case 13:
                      case "end":
                        return t.stop();
                    }
                }, t, this);
            }));
        }
    }, {
        key: "getDiscount",
        value: function(e, t) {
            if (!e || !t) return 0;
            var a = Math.floor(e / t * 100) / 10;
            return a % 1 == 0 && 0 !== a && (a = a.toFixed(1)), a;
        }
    }, {
        key: "formatTagGoodsData",
        value: function(e) {
            var t = e.group || {}, a = parseInt(t.customer_num || e.customer_num || 0), o = t.price || e.price, r = {
                key: "goods-" + e.goods_id,
                goodsId: e.goods_id,
                imgUrl: c.default.cdnCompress(e.hd_thumb_url || e.thumb_url, e.hd_thumb_wm || e.thumb_wm),
                goodsName: e.goods_name,
                groupDesc: a + "人团",
                price: w.StdFormat.price(o, 100),
                marketPrice: w.StdFormat.price(e.market_price, 100),
                soldQuantity: w.StdFormat.sales(e.sales || e.cnt),
                customerNum: parseInt(a, 10),
                nationalFlag: e.country ? c.default.getCDNImgURL("nation/rect/" + e.country + ".png") : "",
                tag: parseInt(e.tag, 10),
                ad: e.ad,
                eventType: e.event_type
            }, n = [ "spike", "economical-brand", "go-shopping", "good-fruit", "brand-clean" ];
            return !isNaN(r.tag) && r.tag >= 0 && r.tag < n.length && (r.activityFlagClass = "activity-flag activity-flag-gap activity-flag-" + n[r.tag]), 
            r.allowance = this.getDiscount(r.price, r.marketPrice), r.transData = {
                goodsId: r.goodsId,
                preGroupPrice: parseInt(o, 10),
                preSinglePrice: parseInt(e.normal_price, 10),
                preMarketPrice: parseInt(e.market_price, 10),
                goodsName: r.goodsName,
                customerNum: r.customerNum,
                p_rec: e.p_rec,
                p_search: e.p_search,
                ad: e.ad,
                preloadImgUrl: r.imgUrl
            }, r;
        }
    }, {
        key: "processGoodsList",
        value: function(e) {
            this.removeReqFlag(e.rootOptId, null == e.pageIndex ? e.offset : e.pageIndex);
            var t = this.getIndexByOptId(e.rootOptId);
            Array.isArray(this.catgoodsStorage[t]) || (this.catgoodsStorage[t] = []), this.catgoodsStorage[t] = this.catgoodsStorage[t].concat(e.goodsList);
            var a = this.data.tabStatus[t] || {};
            if (!0 !== a.showError && (a.loadMoreVisible = !0, a.showError = !1), e.goodsList.length > 0 && (a.showError = !1), 
            0 === t) this.indexRecOnly && (a.canLoadMore = !1, a.recCanLoadMore = !0), this.columnOne = -1 === e.rootOptId ? this.columnOne + e.curRawPageSize : this.columnOne, 
            a.columnOne = this.columnOne, a.canLoadMore = -1 === e.rootOptId ? e.curRawPageSize > 0 : a.canLoadMore, 
            a.recCanLoadMore = -2 === e.rootOptId ? e.curRawPageSize > 0 : a.recCanLoadMore, 
            this.fillCatgoodsListData(0, a, 0 === this.pageIndex), this.pageIndex = -1 === e.rootOptId ? this.pageIndex + 1 : this.pageIndex, 
            this.recPageIndex = -2 === e.rootOptId ? this.recPageIndex + 1 : this.recPageIndex; else {
                a.canLoadMore = e.curRawGoodsListSize > 0, a.offset = a.offset || 0;
                var o = a.offset;
                a.offset += 0 == a.offset ? 20 : 50, a.flip = e.flip || "", this.fillCatgoodsListData(t, a, 0 === o);
            }
        }
    }, {
        key: "filterGoods",
        value: function(e, t) {
            var a = this;
            if (!e) return [];
            var o = [], r = this, n = r.wsingle;
            return e.forEach(function(e) {
                var s = !0;
                if (1 != e.is_app && (1 !== e.event_type && n || !n)) {
                    e.column = t, e.wsingle = n;
                    var i = a.formatGoods(e);
                    w.User.getShowPortalFreeTrialGoods() || i.eventType !== h.default.EventType.FREE_TRIAL || (s = !1), 
                    s && (i.transData = {
                        goodsId: i.goodsId,
                        preGroupPrice: i.preGroupPrice,
                        preSinglePrice: i.preSinglePrice,
                        preMarketPrice: i.preMarketPrice,
                        goodsName: i.goodsName,
                        customerNum: i.customerNum,
                        ad: i.ad,
                        p_rec: i.p_rec,
                        p_search: i.p_search
                    }, 2 === t ? (i.transData.listId = "xcx_index_goods_" + r.randomStr, i.transData.preloadImgUrl = i.imgUrl) : (i.transData.preloadImgUrl = i.thumbUrl, 
                    i.transData.listId = n ? "xcx_index_wsingle_" + r.randomStr : "xcx_index_single_" + r.randomStr), 
                    o.push(i));
                }
            }), o;
        }
    }, {
        key: "formatGoods",
        value: function(e) {
            var t = {};
            return t.goodsId = e.goods_id, t.normalPrice = w.StdFormat.price(parseInt(e.normal_price || 0), 100), 
            t.shortName = e.short_name || "", t.eventType = parseInt(e.event_type), t.isApp = parseInt(e.is_app || "0"), 
            t.goodsName = e.goods_name || "", t.thumbUrl = e.thumb_url || "", t.customerNum = e.group.customer_num, 
            t.price = w.StdFormat.price(parseInt(e.group.price || 0), 100), t.isFreeTrial = t.eventType === h.default.EventType.FREE_TRIAL, 
            t.soldQuantity = w.StdFormat.sales(parseInt(e.cnt || 0)), t.isCompleteLottery = [ h.default.EventType.LUCKY_DRAW, h.default.EventType.FREE_TRIAL, h.default.EventType.CAPITAL_GIFT_LOTTERY, h.default.EventType.DEPOSITE_GROUP ].indexOf(t.eventType) >= 0, 
            t.nationalFlag = e.country ? c.default.getCDNImgURL("nation/rect/" + e.country + ".png") : "", 
            t.visibleWidth = e.country ? this.data.visibleWidth - p.default.rpxToPx(42) : this.data.visibleWidth, 
            t.preMarketPrice = parseInt(e.market_price || 0, 10), t.preGroupPrice = parseInt(e.group.price || 0, 10), 
            t.preSinglePrice = parseInt(e.normal_price || 0, 10), t.hasMallCoupon = parseInt(e.has_mall_coupon || 0, 10), 
            t.ad = e.ad, t.p_rec = e.p_rec, 1 === e.column ? e.wsingle ? (t.template = "indexRecMiniGoodsItem", 
            t.imgUrl = c.default.cdnCompress(e.hd_thumb_url, e.hd_thumb_wm)) : (t.template = "indexRecGoodsItem", 
            t.imgUrl = c.default.cdnCompress(e.image_url, e.image_wm)) : (t.template = "gridItemV2", 
            t.imgUrl = c.default.cdnCompress(e.hd_thumb_url, e.hd_thumb_wm)), t;
        }
    }, {
        key: "fillCatgoodsListData",
        value: function(e, t, a) {
            var o = this.catgoodsStorage[e], r = this.data.catgoodsList[e] || [];
            a && (r = []);
            var n = r.length, s = this.wsingle, i = y.default.sceneId, d = !1;
            if (this.indexRecOnly ? 1019 === i && s && (d = !0) : d = !0, 0 === e && this.data.lastSingleGoodsIndex > 0 && r.length + 20 >= this.data.lastSingleGoodsIndex && this.page.setData({
                isShowNext: d
            }), o && o.length > n) {
                var l = void 0;
                if (l = 0 === n ? 10 : r.length + 20, r = o.slice(0, l), 0 == e && a) this.pageData["catgoodsList[" + e + "]"] = r; else {
                    var c = {};
                    if (c["catgoodsList[" + e + "]"] = r, t) {
                        var u = this.data.tabStatus[e] || {};
                        (u = g.default.assign(u, t)).showNoMoreText = !1, c["tabStatus[" + e + "]"] = u;
                    }
                    this.setData(c), e > 0 && this.page.clearLastImprList();
                }
                var p = r.slice(n);
                this.page.$requestLocalGroup(p);
            } else if (t) {
                var f = {};
                t.showNoMoreText = !0, f["tabStatus[" + e + "]"] = t, this.setData(f);
            }
            this.page.tryInitImprRect(), this.scrollToLowerlock = !1;
        }
    }, {
        key: "getIndexByOptId",
        value: function(e) {
            if (-1 == e || -2 == e) return 0;
            for (var t = null, a = this.data.homeOperations || [], o = 0, r = a.length; o < r; o++) if (a[o].opt_id == e) {
                t = o;
                break;
            }
            return t;
        }
    }, {
        key: "removeReqFlag",
        value: function(e, t) {
            var a = this.generateReqFlag(e, t), o = this.tabsReqRunningArr.indexOf(a);
            o >= 0 && this.tabsReqRunningArr.splice(o, 1);
        }
    }, {
        key: "isReqRunning",
        value: function(e, t) {
            var a = this.generateReqFlag(e, t);
            return this.tabsReqRunningArr.indexOf(a) >= 0;
        }
    }, {
        key: "addReqFlag",
        value: function(e, t) {
            var a = this.generateReqFlag(e, t);
            this.tabsReqRunningArr.push(a);
        }
    }, {
        key: "generateReqFlag",
        value: function(e, t) {
            return [ "req", e, t ].join("#");
        }
    } ]), S;
}();

exports.default = S;