function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var i = t(require("../../constants/ui/base64/ArrowsRight")), e = t(require("../../storage/classification_storage")), a = t(require("../../controller/formid_controller")), o = t(require("../../storage/ram_manager")), s = require("../../common/index"), r = t(require("../../libs/co/we-index")), n = t(require("../../libs/regenerator-runtime/runtime")), c = [ 1, 4, 12, 13, 14, 15, 16, 18, 1543, 743, 818, 1451, 590 ], l = "icon-category", d = {
    14: l + "-bag",
    15: l + "-furniture",
    4: l + "-baby",
    1: l + "-food",
    18: l + "-appliances",
    12: l + "-overseas",
    818: l + "-home",
    13: l + "-fruit",
    16: l + "-cosmetics",
    743: l + "-man",
    1543: l + "-recharge",
    590: l + "-recharge",
    1451: l + "-shoes",
    0: "icon-me-heart"
}, h = {
    cacheScrollInfo: {},
    classificationInfoDispatchId: null,
    detailListOffsetTop: [],
    data: {
        page: "classification",
        rootList: [],
        detailList: [],
        currentActiveIndex: 0,
        scrollTop: 0,
        arrowsRight: i.default,
        rootListClick: !1,
        showError: !1,
        isInBigSales: !1
    },
    reLoad: function() {
        this.setData({
            showError: !1
        }), this.loadPage();
    },
    onShareAppMessage: function() {
        return this.$generateShareContent({
            title: "拼多多-全部分类"
        });
    },
    loadPage: function() {
        this.initPageData();
        var t = e.default.getClassificationInfo();
        t ? this.showView(t) : this.$showLoading(), this.getClassificiationData(this), this.setData({
            isInBigSales: this.checkInBigSales()
        });
    },
    getClassificiationData: r.default.wrap(n.default.mark(function t(i) {
        var e, a, o;
        return n.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                return t.prev = 0, e = s.Request.requestDataWithUrl("GET", "operations", null, !0), 
                t.next = 4, s.Request.runMainRequestForPage(e, i);

              case 4:
                a = t.sent, o = i.formatClassificiation(a, {}), i.processClassficationInfo(o), t.next = 13;
                break;

              case 9:
                t.prev = 9, t.t0 = t.catch(0), this.$hideLoading(), this.setData({
                    showError: !0
                });

              case 13:
              case "end":
                return t.stop();
            }
        }, t, this, [ [ 0, 9 ] ]);
    })),
    formatClassificiation: function(t, i) {
        function e(t) {
            return (t || "").slice(0, 5);
        }
        if (s.DataUtil.isArray(t)) {
            var a = {
                rootList: [],
                detailList: []
            };
            return t.forEach(function(t, o) {
                var r = t.opt_id;
                if (r) {
                    var n = e(t.opt_name), l = r;
                    c.indexOf(l) < 0 && (l = 0), a.rootList.push({
                        key: [ "root", o ].join("-"),
                        optId: r,
                        optType: 1,
                        optName: n,
                        priority: parseInt(t.priority, 10),
                        isHightlight: 1 === parseInt(t.is_highlight, 10),
                        iconClass: d[l]
                    });
                    var h = t.children;
                    if (!s.DataUtil.isArray(h)) return;
                    a.detailList[o] = {
                        key: [ "detail", o ].join("-"),
                        optId: r,
                        optType: 1,
                        tabName: n,
                        cat: [],
                        priority: parseInt(t.priority, 10)
                    };
                    var f = [];
                    h.forEach(function(t) {
                        if (t.opt_id && t.opt_name && t.image_url) {
                            var i = t.opt_id;
                            f.push({
                                key: [ "child", i ].join("-"),
                                optId: i,
                                optType: 2,
                                optName: e(t.opt_name),
                                priority: parseInt(t.priority, 10),
                                isHightlight: 1 === parseInt(t.is_highlight, 10),
                                imgUrl: s.ImageUtil.cdnCompress(t.image_url, t.image_wm)
                            });
                        }
                    }), i.sort && a.detailList[o].cat.sort(function(t, i) {
                        return i.priority - t.priority;
                    });
                    var p = i.limitChildrenNum || 0;
                    p && (f = f.slice(0, parseInt(p, 10))), a.detailList[o].cat = f;
                }
            }), a;
        }
    },
    processClassficationInfo: function(t) {
        if (t) {
            if (t.errorCode) return this.$showToast(t.errorMsg), this.$hideLoading(), void this.setData({
                showError: 0 == this.data.rootList.length || 0 == this.data.detailList.length
            });
            this.showView(t), this.setData({
                animation: !0
            });
        }
    },
    showView: function(t) {
        this.$hideLoading(), this.setData({
            rootList: t.rootList,
            detailList: t.detailList,
            animation: !1,
            rootListClick: !0
        }), this.setDetailListOffsetTop(), this.scrollRootItemToMiddle(this.data.currentActiveIndex), 
        this.moveDetailListScroll();
    },
    initPageData: function() {
        this.initalDataObj ? this.setData(this.initalDataObj) : this.initalDataObj = JSON.parse(JSON.stringify(this.data)), 
        this.detailListOffsetTop = [];
    },
    forwardToCatgoods: function(t, i) {
        var a = void 0, o = void 0, r = void 0, n = t.currentTarget.dataset;
        if (n && (r = n.optPos)) {
            var c = r.split("-"), l = void 0, d = void 0;
            if (c && (l = parseInt(c[0]), d = parseInt(c[1])), !isNaN(l)) {
                var h = this.data.detailList, f = h[l];
                if (!isNaN(d) && h[l] && (f = h[l].cat[d]), f && (a = f.optId) && (o = f.optType)) {
                    this.$forward("catgoods", {
                        opt_id: a,
                        opt_type: o,
                        opt_g: 1,
                        opt_name: f.tabName || f.optName || ""
                    });
                    var p = e.default.getClassificationInfo(), u = {
                        op: "click",
                        event: "search_sub_opt_clk",
                        page_name: "search",
                        page_sn: 10031,
                        page_section: "opt",
                        page_element: "sub_opt",
                        idx: d,
                        element_id: a
                    };
                    p && p.rootList && (u.section_id = p.rootList[l].optId), i && (u.event = "search_opt_more_clk", 
                    u.page_element = "more_btn", u.idx = l), (0, s.TrackingRecord)(u);
                }
            }
        }
    },
    tapMore: function(t) {
        var i = t.detail.formId;
        this.uploadFormId(i, "opt_more_click", !1);
    },
    tapMoreToCatgoodsPage: function(t) {
        this.forwardToCatgoods(t, !0);
    },
    uploadFormId: function(t, i, e) {
        t && i && a.default.uploadFormIdToSH(t, e);
    },
    gotoCatgoodsPage: function(t) {
        this.forwardToCatgoods(t, !1);
    },
    setDetailListOffsetTop: function() {
        var t = this, i = this.data.detailList || [];
        i.forEach(function(e, a) {
            if (a >= 1) {
                var o = Math.ceil(i[a - 1].cat.length / 3) * s.Util.rpxToPx(176);
                o += s.Util.rpxToPx(72), o += s.Util.rpxToPx(30), t.detailListOffsetTop[a] = t.detailListOffsetTop[a - 1] + o;
            } else t.detailListOffsetTop[a] = 0;
        }), this.detailListClientHeight = s.SystemInfo.getWindowHeightSync() - s.Util.rpxToPx(86);
    },
    scroll: function(t) {
        if (this.data.rootListClick) this.setData({
            rootListClick: !1
        }); else {
            var i = this.data.detailList || [], e = t.detail;
            if (e) {
                var a = parseInt(e.scrollTop);
                if (!isNaN(a)) {
                    if (this.detailListOffsetTop[i.length - 1] + s.Util.rpxToPx(216) - this.detailListClientHeight < a) return void this.scrollRootItemToMiddle(i.length - 1, !0);
                    for (var o = a + this.detailListClientHeight, r = 0, n = (a + o) / 2, c = 99999, l = 0, d = 1; d < i.length; ++d) {
                        var h = this.detailListOffsetTop[d], f = (r + h) / 2;
                        if (!(r < o)) break;
                        if (f > a && f < o) {
                            var p = Math.abs(f - n);
                            p < c && (c = p, l = d - 1);
                        }
                        r = h;
                    }
                    this.scrollRootItemToMiddle(l, !0);
                }
            }
        }
    },
    moveDetailListScroll: function() {
        var t = this.data.currentActiveIndex, i = this.data.rootList[t], e = void 0;
        if (i && (e = i.optId), null != e) {
            if (this.data.scrollToViewId === "detail-" + e) return;
            this.setData({
                scrollToViewId: "detail-" + e
            });
        }
    },
    clickRootItem: function(t) {
        var i = t.currentTarget.dataset;
        if (i) {
            this.setData({
                rootListClick: !0
            });
            var a = parseInt(i.rootItemIndex);
            isNaN(a) || a === this.data.currentActiveIndex || this.scrollRootItemToMiddle(a), 
            this.moveDetailListScroll();
            var o = e.default.getClassificationInfo(), r = {
                op: "click",
                event: "search_opt_clk",
                page_name: "search",
                page_sn: 10031,
                page_section: "opt_list",
                page_element: "opt",
                idx: a
            };
            o && o.rootList && (r.element_id = o.rootList[a].optId), (0, s.TrackingRecord)(r);
        }
        var n = t.detail.formId;
        this.uploadFormId(n, "opt_list_click", !1);
    },
    onReady: function() {
        this.windowHeight = s.SystemInfo.getWindowHeightSync();
    },
    scrollRootItemToMiddle: function(t, i) {
        var e = this, a = 0, o = void 0;
        o = isNaN(t) ? this.data.currentActiveIndex : t, a = s.Util.rpxToPx(106) * o - Math.floor((this.windowHeight - s.Util.rpxToPx(114)) / 2), 
        i ? !this.cacheScrollInfo || isNaN(this.cacheScrollInfo.currentActiveIndex) || isNaN(this.cacheScrollInfo.rootListScrollTop) ? (this.cacheScrollInfo = {
            currentActiveIndex: o,
            rootListScrollTop: a < 0 ? 0 : a
        }, setTimeout(function() {
            e.setData(e.cacheScrollInfo), e.cacheScrollInfo = {};
        }, 330)) : this.cacheScrollInfo = {
            currentActiveIndex: o,
            rootListScrollTop: a < 0 ? 0 : a
        } : this.setData({
            currentActiveIndex: o,
            rootListScrollTop: a < 0 ? 0 : a
        });
    },
    gotoSearchResultPage: function() {
        this.$forward("search_result");
        var t = {
            op: "event",
            event: "search_view_onclick",
            page_name: "search",
            page_sn: 10031
        };
        (0, s.TrackingRecord)(t);
    },
    onLoad: function(t) {
        if (this.pvTracking(), t) {
            var i = parseInt(t.current_index || 0, 10);
            this.setData({
                currentActiveIndex: i
            });
        }
        this.loadPage();
    },
    checkInBigSales: function() {
        var t = parseInt(Date.now() + o.default.timeDiff, 10) / 1e3;
        return t > 1528387200 && t < 1529510399;
    },
    pvTracking: function(t) {
        var i = {
            op: "pv",
            page_name: "search",
            page_sn: 10031,
            page_url: "pages/classification/classification"
        };
        t && (i.is_back = 1), (0, s.TrackingRecord)(i), this.$firstTimeTrackRecord.pv = !0;
    },
    onShow: function() {
        o.default.isFromAppOnShow || this.$firstTimeTrackRecord.pv || this.pvTracking(!0);
    }
};

(0, s.PddPage)(h, {
    pageName: "classification",
    notUseCommonPV: !0,
    pageSn: 10031
});