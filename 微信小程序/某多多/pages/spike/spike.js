function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var a = require("../../common/index"), i = t(require("../../constants/tracking/subjects")), s = t(require("../../storage/ram_manager")), o = t(require("../../models/format/spike_goods")), n = require("../../common/message"), r = (t(require("../../libs/es6-promise.min")), 
t(require("../../libs/co/we-index"))), d = t(require("../../libs/regenerator-runtime/runtime")), c = t(require("../../common/gotop_util")), l = t(require("../../controller/spike_controller")), u = t(require("../../components/quick_entry_forward_index/quick_entry_forward_index")), g = [ {
    dateName: "正在疯抢",
    datekey: "ongoing"
}, {
    dateName: "即将开抢",
    datekey: "future"
}, {
    dateName: "明日预告",
    datekey: "more"
} ], p = {
    isSettingRemind: !1,
    cacheGoodsList: [],
    loadingLock: {},
    tabTimes: [],
    goodsLastOneIndex: [],
    updateSecondTimer: null,
    globalSecond: 0,
    isOnHideStatus: !1,
    data: {
        currentTab: 0,
        dateTabItem: g,
        dateTabBorderId: g.length,
        pageName: "spike",
        topTabData: [],
        scrollTopValue: 0,
        isFirstEnter: !0,
        globalSecond: "00"
    },
    onShareAppMessage: function() {
        var t = this.$urlQueryObj.type || "SPIKE";
        return this.$generateShareContent({
            title: "限时秒杀",
            queries: {
                type: t
            }
        });
    },
    onLoad: function(t) {
        var a = this, i = parseInt(t.current_tab || 0, 10);
        this.setData({
            currentTab: i
        }), this.$hideLoading(), this.pvTracking(), this.initTopTabData(), this.getNotificationData(this, i), 
        this.getSpikeGoodsDate(this, i), this.spikeOff = n.Message.on(n.KEYS.WAIT_FOR_SPIKE_SHOW, function(t) {
            var i, s = a.checkGoodsData(t, "goodsId");
            if (s) {
                var o = s.tabIndex, n = s.timesIndex, r = s.goodsIndex;
                a.setData((i = {}, e(i, "topTabData[" + o + "].timeList[" + n + "].goodsList[" + r + "].buttonClass", "ts-remind-btn"), 
                e(i, "topTabData[" + o + "].timeList[" + n + "].goodsList[" + r + "].buttonType", "remind"), 
                i));
            }
        }), a.quickEntryControl = new u.default({
            page: a,
            ns: "quickEntryControl"
        });
    },
    onShow: function() {
        this.isOnHideStatus = !1, this.data.isFirstEnter && this.setData({
            isFirstEnter: !1
        }), s.default.isFromAppOnShow || this.$firstTimeTrackRecord.pv || this.pvTracking(!0);
    },
    initTopTabData: function() {
        var t = this.data.topTabData, e = this;
        g.forEach(function(a, i) {
            var s = {
                dateName: a.dateName,
                datekey: a.datekey,
                timeList: [],
                page: 1,
                size: 30,
                canLoadMore: !0,
                loadMoreVisible: !1,
                showError: !1
            };
            t[i] = s, e.tabTimes[i] = [], e.goodsLastOneIndex[i] = [];
        });
    },
    imprItems: function(t) {
        var e = this, i = e.data.currentTab || 0, s = e.data.topTabData[i];
        t.forEach(function(t) {
            var e = [];
            if (s && s.timeList && s.timeList.forEach(function(t) {
                e = e.concat(t.goodsList).concat(t.salesOut);
            }), t < e.length) {
                var o = e[t] || {}, n = !!o.goodsId, r = {
                    op: "impr",
                    page_section: "goods_list",
                    page_element: n ? "seckill" : "seckill_brand",
                    page_name: "seckill",
                    idx: t,
                    page_el_sn: n ? "99673" : "99406",
                    tab_idx: i,
                    goods_id: o.goodsId
                };
                n ? (r.is_onsale = "on" === o.spikeStatus ? 1 : 0, r.start_time = o.startTime) : r.spike_brand_id = o.id, 
                (0, a.TrackingRecord)(r);
            }
        });
    },
    clickDateTabItem: function(t) {
        var e = t.currentTarget.dataset || {}, i = parseInt(e.index, 10);
        this.setData({
            currentTab: i
        }), 0 === i && (this.data.topTabData[i].timeList = [], this.data.topTabData[i].page = 1, 
        this.data.topTabData[i].canLoadMore = !0, this.tabTimes[i] = null), this.data.topTabData[i] && 1 === this.data.topTabData[i].page && this.getSpikeGoodsDate(this, i), 
        this.delayScrollTop(300), (0, a.TrackingRecord)({
            op: "click",
            target_tab_idx: i,
            page_name: "seckill",
            page_section: "tab_list",
            page_el_sn: "99404",
            page_element: "tab"
        });
    },
    delayScrollTop: function(t) {
        setTimeout(function() {
            c.default.goTop(!0);
        }, t);
    },
    onPageScroll: function(t) {
        if (t) {
            var e = parseInt(t.scrollTop);
            c.default.showGoTopBtn(e, this);
        }
        var a = parseInt(t.scrollTop);
        this.updateScrollTop(a);
    },
    onReachBottom: function() {
        this.getSpikeGoodsDate(this, this.data.currentTab);
    },
    reLoad: function() {
        var t = this.data.currentTab;
        this.$showLoading(), this.setData(e({}, "topTabData[" + t + "].showError", !1)), 
        this.getSpikeGoodsDate(this, t);
    },
    onPullDownRefresh: function() {
        this.page = 1, this.loadSpikeGoodsDetail(this);
    },
    onReady: function() {
        wx.setNavigationBarTitle({
            title: "限时秒杀"
        }), this.$urlQueryObj && "lottery_share_success" === this.$urlQueryObj.from && this.$showToast("优惠券到账啦，买这些最划算~");
    },
    getSpikeGoodsDate: r.default.wrap(d.default.mark(function t(i, s) {
        var o, n, r, c, l, u, g, p, m;
        return d.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                if (o = i.data.topTabData[s] || {}, n = o.page || 1, r = o.size || 30, c = o.datekey, 
                l = [ c, n, r ].join("#"), t.prev = 5, c && o.canLoadMore && !i.loadingLock[l]) {
                    t.next = 8;
                    break;
                }
                return t.abrupt("return");

              case 8:
                return i.loadingLock[l] = !0, u = a.Request.requestDataWithCmd("10425", {
                    params: {
                        page: n,
                        size: r
                    },
                    restfulParam: c
                }), t.next = 12, a.Request.runMainRequestForPage(u, i);

              case 12:
                if (g = t.sent, isNaN(g.error_code) && !g.error_msg) {
                    t.next = 18;
                    break;
                }
                return i.$hideLoading(), i.setData(e({}, "tab[" + s + "].showError", !0)), i.loadingLock[l] = !1, 
                t.abrupt("return");

              case 18:
                p = g.items || [], m = i.formatSpikeData(g || {}, s, o), i.processSpikeGoodsData({
                    tabData: m,
                    tabIndex: s,
                    lockKey: l
                }), p.length <= 15 && i.getSpikeGoodsDate(i, s), i.$hideLoading(), i.tryInitImprRect(), 
                t.next = 32;
                break;

              case 26:
                t.prev = 26, t.t0 = t.catch(5), i.$hideLoading(), i.setData(e({}, "topTabData[" + s + "].showError", !0)), 
                i.loadingLock[l] = !1, console.error(t.t0);

              case 32:
              case "end":
                return t.stop();
            }
        }, t, this, [ [ 5, 26 ] ]);
    })),
    getNotificationData: r.default.wrap(d.default.mark(function t(e) {
        var i, s, o;
        return d.default.wrap(function(t) {
            for (;;) switch (t.prev = t.next) {
              case 0:
                return t.prev = 0, i = a.Request.requestDataWithCmd("10290"), t.next = 4, a.Request.runMainRequestForPage(i, e);

              case 4:
                s = t.sent, o = s.data, e.$hideLoading(), e.setData({
                    spikeNotificationArr: o
                }), t.next = 14;
                break;

              case 10:
                t.prev = 10, t.t0 = t.catch(0), e.$hideLoading(), console.error(t.t0);

              case 14:
              case "end":
                return t.stop();
            }
        }, t, this, [ [ 0, 10 ] ]);
    })),
    formatSpikeData: function(t, e, a) {
        var i = t.items || [], s = this.tabTimes[e] || [], n = this;
        if (t.times.length <= 0) return "timeNull";
        if (s.length <= 0 && ((s = o.default.formatTimeData(t.times, e)).forEach(function(t, i) {
            Array.isArray(a.timeList) || (a.timeList = []), a.timeList.push({
                timeDay: t.timeDay,
                timeLine: t.timeLine,
                title: t.title,
                timerText: t.timerText,
                timerNumObj: t.timerNumObj,
                isPast: t.isPast,
                time: t.time,
                spikeTitleIcon: t.spikeTitleIcon,
                canShow: !1,
                goodsList: [],
                salesOut: 0 === e ? [] : null
            }), n.goodsLastOneIndex[e][i] = {};
        }), n.globalSecond = s[0].timerNumObj.intSeconds, n.tabTimes[e] = s, clearInterval(n.updateSecondTimer), 
        n.updateSecondTimer = null), i.length <= 0) return {};
        for (var r = 0; r < i.length - 1; r++) 1 == i[r].type && 2 == i[r + 1].type ? i[r].data.isListLastOne = !0 : i[r].data.isListLastOne = !1;
        return i.forEach(function(t) {
            if (1 == t.type) {
                var i = o.default.formatGoodsData(t.data, s);
                i.tabIndex = e;
                var n = a.timeList[i.timesIndex];
                switch (!0) {
                  case i.isFarFuture:
                    e >= 2 && (a.canLoadMore = !1);
                    break;

                  case i.isForbidden:
                    break;

                  case i.isSalesOut:
                    !Array.isArray(n.salesOut) && (n.salesOut = []), n.salesOut.push(i);
                    break;

                  default:
                    !Array.isArray(n.goodsList) && (n.goodsList = []), n.goodsList.push(i);
                }
            } else {
                for (var r = 0; r < 3 && r < t.data.goods.length; r++) t.data.goods[r] = o.default.formatGoodsData(t.data.goods[r], s), 
                t.data.goods[r].tabIndex = e;
                var d = a.timeList[(t.data.goods[0] || {}).timesIndex];
                d && d.goodsList.push(t.data);
            }
        }), a.timeList.forEach(function(t, a) {
            t.goodsList.length <= 0 || [ "salesOut", "goodsList" ].forEach(function(i) {
                if (t[i] && Array.isArray(t[i]) && !(t[i].length <= 0)) {
                    t.canShow = !0;
                    var s = t[i][t[i].length - 1], o = n.goodsLastOneIndex[e][a][i];
                    o && (t[i][o].isListLastOne = !1), s && (s.isListLastOne = !0, n.goodsLastOneIndex[e][a][i] = t[i].length - 1);
                }
            });
        }), a;
    },
    processSpikeGoodsData: function(t) {
        var a = t.tabData, i = t.tabIndex, s = t.lockKey, o = this;
        if (this.loadingLock[s] = !1, !a || Object.keys(a).length < 1) this.setData(e({}, "topTabData[" + i + "].canLoadMore", !1)); else if ("timeNull" != a) {
            a.page++, null === this.updateSecondTimer && (this.updateSecondTimer = setInterval(function() {
                if (o.globalSecond--, o.globalSecond < 0) return o.globalSecond = 59, o.updateMinutesHours(o.globalSecond, 0), 
                o.updateMinutesHours(o.globalSecond, 1), void o.updateMinutesHours(o.globalSecond, 2);
                var t = o.globalSecond;
                t < 10 && (t = "0" + t), o.isOnHideStatus || o.setData({
                    globalSecond: t
                });
            }, 1e3));
            var n = this.globalSecond;
            n < 10 && (n = "0" + n), this.setData(e({
                globalSecond: n
            }, "topTabData[" + i + "]", a));
        } else this.setData(e({}, "topTabData[" + i + "].showError", !0));
    },
    updateMinutesHours: function(t, a) {
        for (var i, s = this.tabTimes[a] || [], o = this.data.topTabData[a], n = this, r = 0; r < s.length; r++) {
            var d = s[r];
            if (d.timerNumObj.intMinutes--, d.timerNumObj.intSeconds--, d.timerNumObj.intMinutes < 0 && o.timeList[r].canShow) {
                d.timerNumObj.intMinutes = 59, d.timerNumObj.intHours--;
                var c = d.timerNumObj.intHours;
                if (c < 0) return n.data.topTabData[a].timeList = [], n.data.topTabData[a].page = 1, 
                n.data.topTabData[a].canLoadMore = !0, n.tabTimes[a] = null, void n.getSpikeGoodsDate(n, a);
                c < 10 && (c = "0" + c), d.timerNumObj.intHours = c;
            }
            var l = d.timerNumObj.intMinutes;
            l < 10 && (l = "0" + l), d.timerNumObj.minutes = l, o.timeList[r].timerNumObj = d.timerNumObj;
        }
        this.setData((i = {}, e(i, "topTabData[" + a + "]", o), e(i, "globalSecond", t), 
        i));
    },
    forwardGoods: function(t, e) {
        var s = t.currentTarget.dataset, o = s.goodsId, n = s.quantity, r = s.currentCanBuy, d = s.current, c = s.goodsIndex;
        this.transGoodsData = s.transData || {}, this.transGoodsData.preloadImgUrl = this.transGoodsData.imgUrl;
        var l = "haitao" == this.$referPageName, u = "", g = "";
        if ("btn" == e) {
            if (u = l ? "haitao_seckill_btn_clk" : "seckill_btn_clk", r && o) {
                var p = a.ObjectUtil.assign({}, i.default.spikeBtnClickParams, {
                    page_element: "quick_buy_btn",
                    page_el_sn: "99676",
                    goods_id: o
                });
                g = "&page_el_sn=99676", p.event = u, p.idx = c, p.tab_idx = this.data.currentTab, 
                (0, a.TrackingRecord)(p);
            } else if (!d && o) {
                var m = a.ObjectUtil.assign({}, i.default.spikeBtnClickParams, {
                    page_element: "future_buy_btn",
                    page_el_sn: "99675",
                    goods_id: o
                });
                g = "&page_el_sn=99675", m.event = u, m.idx = c, m.tab_idx = this.data.currentTab, 
                (0, a.TrackingRecord)(m);
            } else if (!r && d && o && n) {
                var b = a.ObjectUtil.assign({}, i.default.spikeItemClickParams, {
                    page_element: n < 0 ? "seckill_no" : "seckill",
                    goods_id: o
                });
                b.event = u, b.idx = c, b.tab_idx = this.data.currentTab, (0, a.TrackingRecord)(b);
            }
        } else u = l ? "haitao_seckill_goods_clk" : "seckill_goods_clk", g = "&page_el_sn=99673", 
        (0, a.TrackingRecord)({
            op: "click",
            event: u,
            page_name: "seckill",
            page_section: "goods_list",
            page_el_sn: "99673",
            page_element: "seckill",
            goods_id: o,
            idx: c,
            tab_idx: this.data.currentTab
        });
        o && a.Navigation.forward("/pages/goods/goods?goods_id=" + o + g);
    },
    goodsItemClicked: function(t) {
        this.forwardGoods(t, "item");
    },
    brandGoodsClick: function(t) {
        var e = t.currentTarget.dataset;
        if (e) {
            var i = e.brandId, s = e.index, o = e.goodsId;
            this.$forward("brand_spike", {
                spike_brand_id: i,
                page_el_sn: "99405",
                page_sn: "10025",
                page_name: "seckill"
            }), (0, a.TrackingRecord)({
                op: "click",
                page_section: "goods_list",
                page_element: "spike_brand",
                page_el_sn: "99405",
                spike_brand_id: i,
                tab_idx: this.data.currentTab,
                idx: s,
                goods_id: o
            });
        }
    },
    brandClick: function(t) {
        var e = t.currentTarget.dataset, i = e && e.brandId;
        i && (this.$forward("brand_spike", {
            spike_brand_id: i,
            page_el_sn: "99406",
            page_sn: "10025",
            page_name: "seckill"
        }), (0, a.TrackingRecord)({
            op: "click",
            page_section: "goods_list",
            page_element: "spike_brand",
            page_el_sn: "99406",
            spike_brand_id: i,
            tab_idx: this.data.currentTab
        }));
    },
    onHide: function() {
        this.isOnHideStatus = !0;
    },
    onUnload: function() {
        clearInterval(this.updateSecondTimer), this.spikeOff();
    },
    pvTracking: function(t) {
        var e = {
            op: "pv",
            event: "seckill_show",
            page_url: "pages/spike/spike"
        };
        t && (e.is_back = 1), (0, a.TrackingRecord)(e), this.$firstTimeTrackRecord.pv = !0;
    },
    checkGoodsData: function(t, e) {
        var a = void 0;
        return ((this.data.topTabData || [])[this.data.currentTab].timeList || []).every(function(i) {
            if (i.isPast || i.goodsList.length <= 0) return !0;
            var s = !0;
            return (i.goodsList || []).every(function(i, o) {
                return t !== i[e] || (i.goodsIndex = o, a = i, s = !1, !1);
            }), s;
        }), a;
    },
    goodsRemindSetup: function(t) {
        var i = this, s = t.currentTarget && t.currentTarget.dataset, o = s.onlyKey, n = s.goodsId, r = s.goodsIndex, d = this.checkGoodsData(o, "onlyKey"), c = void 0;
        if (d) {
            var u, g = d.tabIndex, p = d.timesIndex, m = "remind" === s.buttonType ? "ts-coming-btn" : "ts-remind-btn", b = "remind" === s.buttonType ? "coming" : "remind";
            e(u = {}, "topTabData[" + g + "].timeList[" + p + "].goodsList[" + r + "].buttonClass", m), 
            e(u, "topTabData[" + g + "].timeList[" + p + "].goodsList[" + r + "].buttonType", b), 
            c = u;
        }
        l.default.goodsRemindSetup(t, d, i, c, function() {
            "coming" === s.buttonType ? (0, a.TrackingRecord)({
                op: "click",
                page_name: "seckill",
                page_section: "goods_list",
                page_element: "remind_me_btn",
                page_el_sn: "99678",
                tab_idx: i.data.currentTab,
                goods_id: n,
                idx: r
            }) : "remind" === s.buttonType && (0, a.TrackingRecord)({
                op: "click",
                page_name: "seckill",
                page_section: "goods_list",
                page_element: "cancel_remind_btn",
                page_el_sn: "99677",
                tab_idx: i.data.currentTab,
                goods_id: n,
                idx: r
            });
        }), "coming" !== s.buttonType && this.$uploadFormId(t, !0);
    },
    formClick: function() {}
};

(0, a.PddPage)(p, {
    pageName: "spike",
    pageSn: 10025,
    notUseCommonPV: !0
});