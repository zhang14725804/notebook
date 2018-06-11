function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, s) {
    return t in e ? Object.defineProperty(e, t, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = s, e;
}

var s = e(require("../../components/bubble/bubble")), a = require("../../constants/subjects"), i = require("../../common/index"), r = e(require("../../components/image_map/image_map")), o = e(require("../../components/subjects_spike/subjects_spike")), n = e(require("../../components/subjects_recommend/subjects_recommend")), c = e(require("../../constants/ui/base64/pull_down_triangle")), d = e(require("../../common/object_util")), u = e(require("../../storage/ram_manager")), l = e(require("../../configs/api")), p = (e(require("../../libs/es6-promise.min")), 
e(require("../../libs/co/we-index"))), b = e(require("../../libs/regenerator-runtime/runtime")), h = e(require("../../models/format/grid_item_goods")), f = e(require("../../common/gotop_util")), g = e(require("../../components/segment/segment.js")), _ = e(require("../../components/resource_place_config/resource_place_config")), m = e(require("../../components/quick_entry_forward_index/quick_entry_forward_index")), j = e(require("../../components/service_notice_land_page/service_notice_land_page")), I = e(require("../../components/deposit/deposit")), T = {
    1: "SmallMixinPromotion",
    2: "LargeMixinPromotion",
    3: "subejct-scroll",
    99: "image-map"
}, S = {
    mix: 10298,
    subejctPush: 10419
}, D = {
    setDataObject: {},
    winHeight: 0,
    cacheDataList: {},
    dispatchIds: {},
    listReqLock: {},
    spikeGoodsScrollLeftPoint: [],
    spikeTimeLineScrollLeft: [],
    renderListDataRepo: [],
    mixInfos: [],
    allGoodsListCache: [],
    segmentControl: null,
    data: {
        pageName: "subjects",
        isFirstEnter: !0,
        curTabIndex: 0,
        sortEnable: !1,
        subject: "",
        desc: "",
        subjectsId: "",
        topTab: [ {
            showError: !1,
            size: 20,
            showSortWrapper: !1,
            sortTypeIndex: 0,
            scrollTop: 0,
            lastScrollTop: 0,
            presetItem: !0
        } ],
        currentTab: {
            page: 0
        },
        $tabsData: [],
        pageLoading: !0,
        isShowBlackLoading: !1,
        isQuickBuyClick: !1,
        showCls: "show",
        current: 0,
        isShowWifiError: !1,
        bubble: {
            top: "104rpx"
        },
        sortTypeData: a.SortTypeData,
        firstEnter: !0,
        localGroupsMap: {},
        curTimeLineIndex: 0,
        timeLineScrollLeft: 0,
        cacheSpikeGoodsScrollLeft: 0,
        spikeGoodsScrollLeft: 0,
        Rpx270: i.Util.rpxToPx(270),
        Rpx180: i.Util.rpxToPx(180),
        Rpx196: i.Util.rpxToPx(196),
        Rpx171: i.Util.rpxToPx(171),
        timeLineLock: !1,
        showSpike: !1,
        showDayRec: !1,
        showHotBuyTitle: !1,
        pullDownTriangle: c.default,
        contentList: [],
        chargeHistoryList: [],
        routersList: [],
        localGroups: [],
        curRoutersIndex: 0,
        focus: !1,
        inputValue: "",
        goTopClass: !1,
        showShareBtn: !1,
        recSubjectId: "",
        clickEnable: !0
    },
    onShareAppMessage: function(e) {
        var t = this.data.curTabIndex, s = this.data.topTab[t].desc, a = "";
        return e && ("menu" == e.from ? a = "top_forward" : "subject-share-btn" == e.target.dataset.subRefer && (a = "subjects_share")), 
        this.$generateShareContent({
            title: s,
            queries: {
                subjects_id: this.$urlQueryObj.subjects_id,
                is_push: this.$urlQueryObj.is_push
            },
            referStr: a
        });
    },
    share: function() {
        (0, i.TrackingRecord)({
            op: "click",
            event: "share_btn_clk",
            page_name: "subjects",
            page_sn: 10046,
            page_element: "share_btn",
            subjects_id: this.$urlQueryObj.subjects_id
        });
    },
    onReady: function() {
        this.winHeight = i.SystemInfo.getWindowHeightSync(), this.winWidth = i.SystemInfo.getWindowWidthSync(), 
        this.$urlQueryObj && "lottery_share_success" === this.$urlQueryObj.from && this.$showToast("优惠券到账啦，买这些最划算~");
    },
    componentsAddRootFunc: function(e, t) {
        e && "function" == typeof t && (this[e] = t);
    },
    onLoad: function(e) {
        "21" === this.$urlQueryObj.subjects_id ? (this.pageSn = 10020, this.imprNestList = [], 
        T[3] = "subject-scroll-item-new") : T[3] = "subejct-scroll";
        var t = this, s = {
            tabsData: this.data.$tabsData,
            alignType: "align-gap"
        };
        this.segmentControl = new g.default(s, this), this.subjectsCollectionId = parseInt(this.$urlQueryObj.subjects_id, 10), 
        this.lastTabIndex = parseInt(this.$urlQueryObj.tab_index || 0, 10), this.lastTabIndex = this.lastTabIndex > 0 ? this.lastTabIndex : 0, 
        this.lastSortType = parseInt(this.$urlQueryObj.sort_type || 0, 10), this.setDataObject = {}, 
        this.subjectInfo = a.SubjectsSpikeInfo[e.subjects_id] || a.SubjectsSpikeInfo.default, 
        this.listIdList = {}, isNaN(this.subjectsCollectionId) || (this.setDataObject.sortEnable = !!this.subjectInfo.sortEnable), 
        e.xcx_scene && (this.setDataObject.xcxScene = e.xcx_scene), e.cid && (this.setDataObject.withCid = !0), 
        void 0 !== e.is_show_tip && (t.serviceNoticeControl = new j.default({
            page: t,
            ns: "serviceNoticeLandPage",
            opts: e
        })), this.pvTracking(), a.SubjectsSpikeInfo[this.subjectsCollectionId] && (this.setDataObject = d.default.assign(this.setDataObject, {
            quickEntranceIndex: this.subjectsCollectionId,
            title: a.SubjectsSpikeInfo[this.subjectsCollectionId].title,
            subTitle: a.SubjectsSpikeInfo[this.subjectsCollectionId].subTitle || "",
            spikeTitle: a.SubjectsSpikeInfo[this.subjectsCollectionId].spikeTitle || "",
            dayRecommandTitle: a.SubjectsSpikeInfo[this.subjectsCollectionId].dayRecommandTitle || "",
            recTitle: a.SubjectsSpikeInfo[this.subjectsCollectionId].recTitle || ""
        })), this.setDataObject = d.default.assign(this.setDataObject, {
            scrollViewWidth: i.SystemInfo.getWindowWidthSync(),
            subjectsId: e.subjects_id,
            withNoNavigationModel: !!e.with_no_navigation_model,
            curTabIndex: t.lastTabIndex
        }), this.data = d.default.assign(this.data, this.setDataObject), this.loadPage(), 
        t.resourcePlaceControl = new _.default({
            page: t,
            ns: "resourcePlaceConfig",
            resourcePlaceKey: "floating_subjects"
        }), t.quickEntryControl = new m.default({
            page: t,
            ns: "quickEntryControl"
        });
    },
    onUnload: function() {
        s.default.close(this), u.default.isSpecialOfferSubjects = !1;
    },
    reLoad: function() {
        this.$showLoading();
        var e = u.default.CPPage, s = e.data.curTabIndex || 0;
        e.setDataObject = {}, e.setDataObject = d.default.assign(e.setDataObject, t({}, "topTab[" + s + "].showError", !1)), 
        e.data.topTab[0].presetItem ? (0, p.default)(b.default.mark(function t() {
            return b.default.wrap(function(t) {
                for (;;) switch (t.prev = t.next) {
                  case 0:
                    return t.prev = 0, t.next = 3, [ e.requestTopTabsDetail(e), e.setSubjectsSpikeDetail(e), e.setSubjectsRecommendDetail(e) ];

                  case 3:
                    return t.next = 5, e.loadSubjectsGoodsDetail(e, 0, 0);

                  case 5:
                    e.$hideLoading(), t.next = 11;
                    break;

                  case 8:
                    t.prev = 8, t.t0 = t.catch(0), e.$hideLoading();

                  case 11:
                  case "end":
                    return t.stop();
                }
            }, t, this, [ [ 0, 8 ] ]);
        })) : e.changeTabIndex(s);
    },
    onShow: function() {
        19 == this.subjectsCollectionId && 0 === this.data.curTabIndex ? s.default.close(this) : s.default.init(this, !1, "", 1), 
        this.data.isFirstEnter && this.setData({
            isFirstEnter: !1
        }), u.default.isFromAppOnShow || this.$firstTimeTrackRecord.pv || this.pvTracking(!0), 
        this.setData({
            showShareBtn: !0
        });
    },
    pvTracking: function(e) {
        var t = {
            op: "pv",
            event: "subjects_show",
            page_name: "subjects",
            subjects_id: this.subjectsCollectionId,
            page_sn: this.pageSn || 10046,
            page_url: "pages/subjects/subjects"
        };
        e && (t.is_back = 1), (0, i.TrackingRecord)(t), this.$firstTimeTrackRecord.pv = !0;
    },
    onHide: function() {
        s.default.close(this);
    },
    timeLineScroll: function() {},
    switchSpikeTimeLine: function(e) {
        var t = parseInt(e.currentTarget.dataset.index, 10), s = this.spikeGoodsScrollLeftPoint || [];
        isNaN(t) || t === this.data.curTimeLineIndex || t < 0 || t >= s.length || (this.setData({
            timeLineLock: !0,
            curTimeLineIndex: t
        }), this.setData({
            spikeGoodsScrollLeft: s[t] || 0,
            timeLineScrollLeft: this.spikeTimeLineScrollLeft[t]
        }), this.setData({
            timeLineLock: !1
        }));
    },
    spikeGoodsScroll: function(e) {
        for (var t = this, s = parseInt(e.detail.scrollLeft, 10), a = this.data.Rpx196 - 17, i = this.spikeGoodsScrollLeftPoint || [], r = this.data.curTimeLineIndex, o = 1; o < i.length; o++) if (s + a >= i[o - 1] && s + a < i[o]) {
            r = o - 1;
            break;
        }
        s >= i[i.length - 1] - this.winWidth + 100 && (r = i.length - 1), this.data.timeLineLock ? this.data.cacheSpikeGoodsScrollLeft = s : this.data.curTimeLineIndex != r ? this.cacheScrollInfo ? this.cacheScrollInfo = {
            curTimeLineIndex: r,
            cacheSpikeGoodsScrollLeft: s,
            timeLineScrollLeft: this.spikeTimeLineScrollLeft[r - 1]
        } : (this.cacheScrollInfo = {
            curTimeLineIndex: r,
            cacheSpikeGoodsScrollLeft: s,
            timeLineScrollLeft: this.spikeTimeLineScrollLeft[r - 1]
        }, setTimeout(function() {
            t.setData(t.cacheScrollInfo), t.cacheScrollInfo = null;
        }, 330)) : this.data.cacheSpikeGoodsScrollLeft = s;
    },
    spikeGoodsScrollToLower: function() {
        this.setData({
            curTimeLineIndex: this.spikeGoodsScrollLeftPoint.length - 1
        });
    },
    generateSubjectsInfoAPI: function() {
        var e = this.subjectInfo;
        e.isSpecialOfferSubjects && !e.doubleSelect ? u.default.isSpecialOfferSubjects = !0 : u.default.isSpecialOfferSubjects = !1;
        var t = this.data.subjectsId, s = e.isGenTianType ? e.genTianId : t, a = e.hasSpecialUrl ? l.default[e.tabUrl] : l.default.promotionCollection;
        return e.isSpecialOfferSubjects ? a : i.DataUtil.formatByPos(a, s);
    },
    loadPage: function() {
        var e = this, t = e.lastTabIndex, s = e.lastSortType;
        e.$showLoading(), (0, p.default)(b.default.mark(function a() {
            var i;
            return b.default.wrap(function(a) {
                for (;;) switch (a.prev = a.next) {
                  case 0:
                    return a.next = 2, e.requestTopTabsDetail(e);

                  case 2:
                    return a.next = 4, [ e.setSubjectsRecommendDetail(e), e.loadSubjectsGoodsDetail(e, t, s) ];

                  case 4:
                    for (19 == e.subjectsCollectionId && 0 === t && (e.depositComp = new I.default({
                        page: e,
                        ns: "DepositComp"
                    }), e.setData({
                        depositHidden: !0
                    })), i = 1; i <= 4; i++) e.reqCatlistData(t + i);

                  case 6:
                  case "end":
                    return a.stop();
                }
            }, a, this);
        })), e.setSubjectsSpikeDetail(e);
    },
    requestTopTabsDetail: p.default.wrap(b.default.mark(function e(t) {
        var s, r, o, n, c, u;
        return b.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, s = this.data.subjectsId, r = a.SubjectsSpikeInfo[s] || a.SubjectsSpikeInfo.default, 
                o = r.tabCmdId, n = r.genTianId, c = void 0, c = r.hasSpecialUrl ? r.isGenTianType ? i.Request.requestDataWithCmd(o, {
                    restfulParam: n,
                    params: {
                        use_page: !0
                    }
                }) : i.Request.requestDataWithCmd(o) : i.Request.requestDataWithCmd(o, {
                    restfulParam: s
                }), e.next = 8, i.Request.runMainRequestForPage(c, t);

              case 8:
                return u = e.sent, 19 == s && (u.name = "充值中心", u.list[0].subject_id = 3771, u.list[0].subject = "流量套餐", 
                u.list[1].subject_id = 1174, u.list[2].subject_id = 3103), t.setDataObject = d.default.assign(t.setDataObject, {
                    subject: u.name,
                    desc: u.list[0].desc
                }), t.formatTopTabsData(u), t.$setTitle(u.name), t.$hideLoading(), e.abrupt("return", u);

              case 17:
                e.prev = 17, e.t0 = e.catch(0), t.$hideLoading(), console.error(e.t0), t.requestTagGoodsError({
                    tabIndex: 0,
                    sortTypeIndex: 0,
                    page: 1
                });

              case 22:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 17 ] ]);
    })),
    requestSubjectCollectionGoods: p.default.wrap(b.default.mark(function e(t, s, a, r) {
        var o, n;
        return b.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, o = i.Request.requestDataWithCmd(s, r ? {
                    restfulParam: r,
                    params: a
                } : {
                    params: a
                }), e.next = 4, i.Request.runMainRequestForPage(o, t);

              case 4:
                return n = e.sent, e.abrupt("return", n);

              case 8:
                e.prev = 8, e.t0 = e.catch(0), console.error(e.t0);

              case 11:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 8 ] ]);
    })),
    requestMixed: p.default.wrap(b.default.mark(function e(t, s, a, r) {
        var o, n, c, d;
        return b.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, !isNaN(s)) {
                    e.next = 3;
                    break;
                }
                return e.abrupt("return");

              case 3:
                return o = {}, o = 21 == this.data.subjectsId ? {
                    start_position: (a - 1) * r,
                    end_position: a * r - 1
                } : {
                    start_position: n = 1 == a ? 0 : a * r,
                    end_position: (a + 1) * r - 1
                }, c = i.Request.requestDataWithCmd(S.mix, {
                    restfulParam: s,
                    params: o
                }), e.next = 8, i.Request.runMainRequestForPage(c, t);

              case 8:
                return d = e.sent, e.abrupt("return", d);

              case 12:
                e.prev = 12, e.t0 = e.catch(0), console.error(e.t0);

              case 15:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 12 ] ]);
    })),
    formatTopTabsData: function(e) {
        var t = parseInt(this.$urlQueryObj.subjects_id, 10), s = "";
        12 !== t && 17 !== t || (s = e.rec_subject_id);
        var i = this, o = [];
        e.list.forEach(function(s, n) {
            var c = [], d = [], u = [], l = [], p = [];
            a.SortTypeData.forEach(function() {
                c.push([]), d.push(1), u.push(!1), l.push(!0), p.push(0);
            });
            var b = 21 == i.data.subjectsId ? s.subject_id || s.linked_promotion_id : s.subject_id;
            o.push({
                showError: !1,
                label: s.subject,
                subjectId: b,
                showFeatures: 109 == s.tab_id && 21 === t,
                tabId: s.tab_id,
                columnNum: parseInt(s.column_num, 10),
                mixInfo: s.mix,
                pages: d,
                size: 20,
                canLoadMore: l.concat([]),
                loadMoreVisible: u.concat([]),
                goodsNumber: p,
                showSortWrapper: !1,
                sortTypeIndex: 0,
                scrollTop: 0,
                lastScrollTop: 0,
                desc: s.desc,
                style: parseInt(s.style || 0)
            }), i.subjectInfo && i.subjectInfo.doubleSelect && (i.mixInfos[n] = r.default.formatMixInfo(s.mix, e.server_time, 21 == i.data.subjectsId)), 
            i.renderListDataRepo.push(c);
        }), 15 == i.setDataObject.subjectsId && i.mixInfos[0] && i.mixInfos[0][0] && 99 == i.mixInfos[0][0].type && 0 == i.mixInfos[0][0].position && i.mixInfos[0][0].value && i.mixInfos[0][0].value.picture_layers && i.mixInfos[0][0].value.picture_layers.length && (i.mixInfos[0][0].value.itemName = "image-map", 
        i.setData({
            contentList: [ i.mixInfos[0][0].value ]
        })), 19 == i.setDataObject.subjectsId && (e.list.unshift({
            subject: "话费快充",
            desc: "【话费快充】闪电充值，光速到账"
        }), o.unshift({
            showError: !1,
            pages: [ 1, 1, 1, 1, 1 ],
            size: 20,
            canLoadMore: [ !0, !0, !0, !0, !0 ],
            loadMoreVisible: [ !1, !1, !1, !1, !1 ],
            loadingVisible: [ !0, !1, !1, !1, !1 ],
            goodsNumber: [ 0, 0, 0, 0, 0 ],
            showSortWrapper: !1,
            sortTypeIndex: 0,
            scrollTop: 0,
            lastScrollTop: 0
        }), i.renderListDataRepo.unshift([ [], [], [], [], [] ]));
        var n = e.list.map(function(e) {
            return {
                title: e.subject
            };
        });
        this.segmentControl.refreshTabsData(n), this.segmentControl.updateSelectIndex(this.lastTabIndex), 
        this.setDataObject = d.default.assign(this.setDataObject, {
            topTab: o,
            specialStyle: parseInt(e.style || 0),
            getShowTabResult: !0,
            recSubjectId: s
        }, this.segmentControl.$data()), this.setData(this.setDataObject);
    },
    onPageScroll: function(e) {
        var t = this, s = parseInt(e.scrollTop);
        f.default.showGoTopBtn(s, this), this.updateScrollTop(s), this.data.clickEnable && this.setData({
            clickEnable: !1
        }), this.scrollHandler && (clearTimeout(this.scrollHandler), this.scrollHandler = null), 
        this.scrollHandler = setTimeout(function() {
            t.scrollHandler = null, t.setData({
                clickEnable: !0
            });
        }, 300);
    },
    getTabKey: function(e, t) {
        return [ e, t ].join("#");
    },
    onReachBottom: function() {
        var e = this.data.curTabIndex, t = this.data.topTab[e].sortTypeIndex;
        this.loadSubjectsGoodsDetail(this, e, t);
    },
    getListReqLockKey: function(e, t, s, a) {
        return [ e, t, s, a ].join("#");
    },
    setSubjectsRecommendDetail: p.default.wrap(b.default.mark(function e(t) {
        var s, r, o, c, d, u, l, p;
        return b.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, s = 1, r = 30, o = a.SubjectsSpikeInfo[t.$urlQueryObj.subjects_id] || {}, 
                c = o.recommendCmdId) {
                    e.next = 7;
                    break;
                }
                return t.setData({
                    getShowRecommendResult: !0
                }), e.abrupt("return");

              case 7:
                return e.next = 9, i.User.getUserProvinceId(t);

              case 9:
                return d = e.sent, u = i.Request.requestDataWithCmd(c, {
                    params: {
                        subject_id: t.data.recSubjectId,
                        page: s,
                        size: r,
                        province_id: d
                    }
                }), e.next = 13, i.Request.runSecondaryRequestForPage(u, t);

              case 13:
                return l = e.sent, (p = n.default.formatData(l)).dayRecGoodsList && p.dayRecGoodsList.length >= 3 && p.dayRecGoodsList.length <= 30 ? t.setData({
                    showDayRec: !0,
                    showHotBuyTitle: !0,
                    getShowRecommendResult: !0,
                    dayRecGoodslist: p.dayRecGoodsList || []
                }) : t.setData({
                    showDayRec: !1,
                    getShowRecommendResult: !0,
                    showHotBuyTitle: !0
                }), t.$hideLoading(), e.abrupt("return");

              case 20:
                e.prev = 20, e.t0 = e.catch(0), t.$hideLoading(), console.error(e.t0);

              case 24:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 20 ] ]);
    })),
    setSubjectsSpikeDetail: p.default.wrap(b.default.mark(function e(t) {
        var s, r, n, c, d, u, l;
        return b.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (e.prev = 0, s = a.SubjectsSpikeInfo[t.$urlQueryObj.subjects_id] || {}, r = s.spikeCmdId, 
                n = s.spikeRestfulParam, c = s.spikeType, r) {
                    e.next = 5;
                    break;
                }
                return t.setData({
                    getShowSpikeResult: !0
                }), e.abrupt("return");

              case 5:
                return d = void 0, d = n ? i.Request.requestDataWithCmd(r, {
                    restfulParam: n
                }) : c ? i.Request.requestDataWithCmd(r, {
                    params: {
                        type: c
                    }
                }) : i.Request.requestDataWithCmd(r), e.next = 9, i.Request.runSecondaryRequestForPage(d, t);

              case 9:
                if (u = e.sent, l = o.default.formatData(u), this.spikeGoodsScrollLeftPoint = [], 
                !l.goodsList || !l.goodsList.length) {
                    e.next = 16;
                    break;
                }
                l.goodsList.length > 5 ? (t.setData({
                    showSpike: !0,
                    getShowSpikeResult: !0,
                    spikeGoodsList: l.goodsList.slice(0, 5),
                    timelineList: (l.timelineList || []).slice(0, 5)
                }), t.secondShowSpike(l)) : t.setData({
                    showSpike: !0,
                    getShowSpikeResult: !0,
                    spikeGoodsList: l.goodsList || [],
                    timelineList: l.timelineList || []
                }), e.next = 18;
                break;

              case 16:
                return t.setData({
                    getShowSpikeResult: !0,
                    showSpike: !1
                }), e.abrupt("return");

              case 18:
                return t.$hideLoading(), e.abrupt("return");

              case 22:
                e.prev = 22, e.t0 = e.catch(0), t.$hideLoading(), console.error(e.t0);

              case 26:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 22 ] ]);
    })),
    secondShowSpike: function(e) {
        var t = this;
        this.secondShowSpikeHandler = setTimeout(function() {
            if (!t.firstRenderGoods) return clearTimeout(t.secondShowSpikeHandler), void t.secondShowSpike(e);
            t.setData({
                showSpike: !0,
                spikeGoodsList: e.goodsList,
                timelineList: e.timelineList || []
            }), t.setSpikeScrollLeftPoint();
        }, 50);
    },
    setSpikeScrollLeftPoint: function() {
        var e = this.data.timelineList || [], t = 0;
        this.spikeGoodsScrollLeftPoint[0] = 0, t += 12;
        for (var s = 0; s < e.length - 1; s++) {
            var a = e[s];
            t += a.len * this.data.Rpx196 + 12 * a.len, t += 17, this.spikeGoodsScrollLeftPoint[s + 1] = t - 23, 
            s < 2 ? this.spikeTimeLineScrollLeft[s] = 0 : s >= 2 && s <= e.length - 3 ? this.spikeTimeLineScrollLeft[s] = (s - 2) * this.data.Rpx171 : s > e.length - 3 && (this.spikeTimeLineScrollLeft[s] = (e.length - 4) * this.data.Rpx171);
        }
    },
    loadSubjectsGoodsDetail: p.default.wrap(b.default.mark(function e(s, o, n) {
        var c, d, u, p, f, g, _, m, j, I, T, D, x, k, L, v, y, w, R, C;
        return b.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (s.setDataObject = {}, o = o || 0, c = s.data.topTab[o], n = n || c.sortTypeIndex || 0, 
                d = a.SortTypeData[n].sortTypeName, u = s.subjectsCollectionId, p = c.pages[n] || 1, 
                f = c.size || 50, g = c.subjectId, _ = s.data.subjectsId, m = s.getListReqLockKey(o, n, p, f), 
                j = s.subjectInfo, !s.listReqLock[m]) {
                    e.next = 14;
                    break;
                }
                return e.abrupt("return");

              case 14:
                if (!(isNaN(g) && isNaN(u) || !d)) {
                    e.next = 16;
                    break;
                }
                return e.abrupt("return");

              case 16:
                if (!isNaN(c.tabId) || !isNaN(g)) {
                    e.next = 18;
                    break;
                }
                return e.abrupt("return");

              case 18:
                if (c.canLoadMore[n]) {
                    e.next = 21;
                    break;
                }
                return s.setData(t({}, "topTab[" + o + "].canRenderMore[" + n + "]", !1)), e.abrupt("return");

              case 21:
                if (I = {
                    params: {
                        size: f,
                        page: p
                    },
                    restfulParam: null
                }, T = j.goodsCmdId, s.subjectCollectionGoodsApi = l.default.subjectGoodsApi, s.listReqLock[m] = !0, 
                D = j.isGenTianType ? j.genTianId : _, x = j.isGenTianType || j.isSpecialOfferSubjects ? c.tabId : g, 
                x = j.doubleSelect ? g || x : x, !j.isGenTianType) {
                    e.next = 34;
                    break;
                }
                I.restfulParam = D, I.params.tab_id = x, 1 === parseInt(s.$urlQueryObj.is_push) && (I.params.is_push = 1, 
                s.$urlQueryObj.trans_info && (I.params.trans_info = s.$urlQueryObj.trans_info)), 
                e.next = 43;
                break;

              case 34:
                if (!j.isSpecialOfferSubjects) {
                    e.next = 39;
                    break;
                }
                I.params.tab_id = x, 1 === parseInt(s.$urlQueryObj.is_push) && (I.params.is_push = 1, 
                s.$urlQueryObj.trans_info && (I.params.trans_info = s.$urlQueryObj.trans_info)), 
                e.next = 43;
                break;

              case 39:
                return I.params.subject_id = x, e.next = 42, i.User.getUserProvinceId(s);

              case 42:
                I.params.province_id = e.sent;

              case 43:
                if (!j.doubleSelect) {
                    e.next = 49;
                    break;
                }
                if (!g) {
                    e.next = 49;
                    break;
                }
                return I.params.subject_id = x, e.next = 48, i.User.getUserProvinceId(s);

              case 48:
                I.params.province_id = e.sent;

              case 49:
                if (1 === parseInt(s.$urlQueryObj.is_push) && 10421 === T && (s.listIdList[x] || (s.listIdList[x] = "xcx_subject_rec_goods_" + i.DataUtil.getRandomString(6)), 
                s.$urlQueryObj.trans_info && (I.params.trans_info = s.$urlQueryObj.trans_info), 
                k = s.listIdList[x], I.params.list_id = k, T = S.subejctPush), e.prev = 50, L = [], 
                !j.isSpecialOfferSubjects) {
                    e.next = 58;
                    break;
                }
                return e.next = 55, [ s.requestSubjectCollectionGoods(s, T, I.params, I.restfulParam) ];

              case 55:
                L = e.sent, e.next = 61;
                break;

              case 58:
                return e.next = 60, [ s.requestSubjectCollectionGoods(s, T, I.params, I.restfulParam), s.requestMixed(s, g, p, f) ];

              case 60:
                L = e.sent;

              case 61:
                if (L[0]) {
                    e.next = 63;
                    break;
                }
                throw "error";

              case 63:
                return v = L[0] || {}, y = L[1] || [], j.doubleSelect || (s.mixInfos[o] = s.mixInfos[o] || [], 
                s.mixInfos[o] = s.mixInfos[o].concat(r.default.formatMixInfo(y, v.server_time, 21 == s.data.subjectsId)), 
                21 == s.data.subjectsId && (s.showGoods = s.showGoods || [], (!y.length || s.mixInfos[o].length >= 100) && (s.showGoods[o] = !0, 
                s.mixInfos[o] = s.mixInfos[o].slice(0, 100)))), w = v.goods_list || [], R = w.length <= 0, 
                C = w.map(function(e) {
                    "21" === s.data.subjectsId && (e.priceDiscount = Math.floor(100 * i.DataUtil.accDiv(e.group.price, e.market_price)) / 10);
                    var t = h.default.formatData(e);
                    return I.params.list_id && (t.listId = s.listIdList[x]), t;
                }), s.processSubjectsGoods({
                    sortTypeIndex: n,
                    tabIndex: o,
                    goodsList: C,
                    goodsNumber: v.size,
                    isLoadAll: R,
                    page: p,
                    size: f
                }), s.$hideLoading(), (w.length > 0 && w.length <= .8 * f || y.length > 0 && y.length <= 2) && s.loadSubjectsGoodsDetail(s, o, n), 
                e.abrupt("return", v);

              case 72:
                e.prev = 72, e.t0 = e.catch(50), s.$hideLoading(), console.error(e.t0), s.requestTagGoodsError({
                    tabIndex: o,
                    sortTypeIndex: n,
                    page: p,
                    lockKey: m
                });

              case 77:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 50, 72 ] ]);
    })),
    requestTagGoodsError: function(e) {
        this.$showToast("网络出错"), e.lockKey && (this.listReqLock[e.lockKey] = !1), 1 === e.page ? this.setData(t({}, "topTab[" + e.tabIndex + "].showError", !0)) : e.error_msg && this.setData(t({}, "topTab[0].showError", !0));
    },
    processSubjectsGoods: function(e) {
        var s, a = e.tabIndex, o = this.data.topTab[a], n = e.sortTypeIndex || 0, c = e.page || 1, u = e.size || 20, l = this.getListReqLockKey(a, n, c, u);
        this.listReqLock[l] = !1;
        var p = this.getTabKey(a, n), b = Array.isArray(this.allGoodsListCache[p]) ? this.allGoodsListCache[p] : [];
        this.allGoodsListCache[p] = b.concat(e.goodsList);
        var h = this.allGoodsListCache[p];
        h = i.DataUtil.objectArrayDuplicateRemove(h, "goodsId", function(e) {
            return 1 == e.isApp;
        });
        var f = this.mixInfos[a], g = "21" === this.data.subjectsId ? "gridItemV3" : void 0, _ = r.default.execMix(o, h, f, T, g);
        if (this.cacheDataList[p] = _, _.map(function(e, t) {
            e.position = t;
        }), this.data.curTabIndex === a) for (var m = 0; m < _.length; ++m) "image-map" === _[m].itemName && this.insertHotRect(_[m]);
        if (e.isLoadAll && 1 === c) {
            var j = "gridItemV1";
            1 === o.columnNum && (j = "SingleListItemV2"), "21" === this.data.subjectsId && (j = "gridItemV3");
            var I = r.default.filterMixGoods(this.mixInfos[a], j, T);
            this.cacheDataList[p] = I;
        } else if (e.isLoadAll) this.setData(t({}, "topTab[" + a + "].canLoadMore[" + n + "]", !e.isLoadAll)); else if (1 === o.columnNum || "21" === this.data.subjectsId) {
            var S = e.goodsList || [];
            21 != this.data.subjectsId || this.showGoods && this.showGoods[a] ? this.$requestLocalGroup(S) : this.$requestLocalGroup(S, !1);
        }
        this.cacheDataList[p] = r.default.listPositionAdjust(this.cacheDataList[p]), 1 === c && (this.setDataObject = d.default.assign(this.setDataObject, t({}, "topTab[" + a + "].canRenderMore[" + n + "]", this.cacheDataList[p].length > 8))), 
        this.setDataObject = d.default.assign(this.setDataObject, (s = {}, t(s, "topTab[" + a + "].showError", !1), 
        t(s, "topTab[" + a + "].pages[" + n + "]", c + 1), t(s, "topTab[" + a + "].loadMoreVisible[" + n + "]", !0), 
        t(s, "topTab[" + a + "].canLoadMore[" + n + "]", !e.isLoadAll), t(s, "topTab[" + a + "].goodsNumber[" + n + "]", e.goodsNumber || 0), 
        t(s, "topTab[" + a + "].showSortWrapper", !1), t(s, "topTab[" + a + "].sortTypeIndex", n), 
        t(s, "pageLoading", !1), t(s, "firstEnter", !1), s)), this.fillListData(a, n, 1 === c);
    },
    fillListData: function(e, s, a) {
        var i = this, r = this, o = this.getTabKey(e, s), n = this.cacheDataList[o] || [], c = [];
        this.renderListDataRepo && this.renderListDataRepo[e] && (c = this.renderListDataRepo[e][s] || []), 
        a && (c = []);
        var u = c.length;
        if (!(n.length <= 0)) if (21 == this.data.subjectsId && this.showGoods && !this.showGoods[e] && (n = n.filter(function(e) {
            return "subject-scroll-item-new" === e.itemName;
        })), n.length > u) {
            var l = c.length + (0 === u ? 8 : 20);
            c = n.slice(0, l), e === this.data.curTabIndex ? 0 === u ? (f.default.goTop(!0, 0), 
            c[0].picture_layers && c[0].picture_layers.length > 4 ? this.setDataObject.contentList = c.slice(0, 1) : this.setDataObject.contentList = c.slice(0, 2), 
            this.setData(this.setDataObject), this.firstRenderGoods = !0, this.secondRenderHandler = setTimeout(function() {
                i.setDataObject.contentList = c, i.setDataObject = d.default.assign(i.setDataObject, t({}, "topTab[" + e + "].canRenderMore[" + s + "]", !0)), 
                i.setData(i.setDataObject);
            }, 0)) : (this.setDataObject.contentList = c, this.setDataObject = d.default.assign(this.setDataObject, t({}, "topTab[" + e + "].canRenderMore[" + s + "]", !0)), 
            this.setData(this.setDataObject), this.firstRenderGoods = !0) : this.setData(this.setDataObject), 
            this.renderListDataRepo[e][s] = c, this.tryInitImprRect();
        } else this.loadSubjectsGoodsDetail(r, e, s);
    },
    getimprNestListTrackingParams: function(e, t) {
        var s = this.getCurrentIndex(), a = this.data.topTab[s];
        return {
            op: e,
            page_section: "nested_subject_list",
            subjects_id: this.subjectsCollectionId,
            subject_id: a.subjectId,
            type: 1,
            page_el_sn: 99358,
            page_element: "more",
            tab_id: a.tabId ? a.tabId : s,
            nested_subject_id: t.subjectId
        };
    },
    showButtonMore: function(e) {
        if (e && e.currentTarget) {
            var t = e.currentTarget.dataset, s = t.subjectId;
            if (!this.imprNestList[s]) {
                var a = this.getimprNestListTrackingParams("impr", t);
                console.log(s), (0, i.TrackingRecord)(a), this.imprNestList[s] = !0;
            }
        }
    },
    imprItems: function(e) {
        var t = this, s = this.data.contentList;
        21 == this.data.subjectsId && (s = s.filter(function(e) {
            return e.showItem && "subject-scroll-item-new" === e.itemName;
        })), e.forEach(function(e) {
            var a = t.getTracking("impr", "goods_list", e, s);
            a && a.forEach(function(e) {
                (0, i.TrackingRecord)(e);
            });
        });
    },
    showSortSelect: function() {
        var e = this.getCurrentIndex();
        (this.data.topTab[e] || {}).showSortWrapper ? this.setData(t({}, "topTab[" + e + "].showSortWrapper", !1)) : this.setData(t({}, "topTab[" + e + "].showSortWrapper", !0));
    },
    defaultClick: function() {},
    mapClick: function(e) {
        r.default.mapClick(e, this);
    },
    hideSortWrapper: function() {
        var e = this.getCurrentIndex();
        (this.data.topTab[e] || {}).showSortWrapper && this.setData(t({}, "topTab[" + e + "].showSortWrapper", !1));
    },
    selectSortType: function(e) {
        var s = this, a = parseInt(e.currentTarget.dataset.sortIndex, 10), r = this.getCurrentIndex(), o = this.data.topTab[r], n = e.currentTarget.dataset.sortName;
        if (this.setDataObject = {}, !isNaN(a)) {
            var c;
            if (this.setDataObject = d.default.assign(this.setDataObject, (c = {}, t(c, "topTab[" + r + "].showSortWrapper", !1), 
            t(c, "topTab[" + r + "].sortTypeIndex", a), c)), 1 === o.pages[a]) {
                var u = {
                    op: "click",
                    event: "sort_btn_clk",
                    page_name: "subjects",
                    page_sn: 10046,
                    page_section: "sort_btn_list",
                    page_element: "sort_btn",
                    subjects_id: this.subjectsCollectionId,
                    subject_id: o.subjectId,
                    sort_type: n
                };
                (0, i.TrackingRecord)(u), this.loadSubjectsGoodsDetail(s, r, a);
            } else this.renderListDataRepo && this.renderListDataRepo[r] && (this.setDataObject.contentList = this.renderListDataRepo[r][a], 
            this.setData(this.setDataObject));
        }
    },
    getCurrentIndex: function() {
        return this.data.curTabIndex;
    },
    tabScroll: function() {},
    didClickSegmentTab: function(e) {
        var t = parseInt(e.currentTarget.dataset.index, 10);
        if (t !== this.data.curTabIndex) if (this.secondRenderHandler && clearTimeout(this.secondRenderHandler), 
        this.secondShowSpikeHandler && clearTimeout(this.secondShowSpikeHandler), this.setDataObject = {}, 
        this.segmentControl.updateSelectIndex(t), this.changeTabIndex(t), 19 != this.subjectsCollectionId || 0 !== t) {
            var s = this.data.topTab[t] || {}, a = u.default.isSpecialOfferSubjects ? {
                subjects_id: this.subjectsCollectionId,
                tab_id: t
            } : {
                subjects_id: this.subjectsCollectionId,
                subject_id: s.subjectId
            };
            a.page_sn = 10046, a.page_el_sn = 99831, a.subject_id = s.subjectId, a.tab_id = s.tabId ? s.tabId : t, 
            a.op = "click", a.event = "subject_tab_clk", a.page_section = "subject_list", a.page_element = "subject", 
            (0, i.TrackingRecord)(a);
        } else (0, i.TrackingRecord)({
            page_name: "subjects",
            page_sn: 10046,
            op: "click",
            page_section: "subject_list",
            page_el_sn: 99382,
            page_element: "subject",
            subjects_id: this.subjectsCollectionId
        });
    },
    changeTabIndex: function(e) {
        var a = this;
        if (e = parseInt(e, 10), !isNaN(e)) {
            var i = this.data.topTab, r = this.data.curTabIndex;
            this.data.curTabIndex = e, this.setDataObject.curTabIndex = e, this.setDataObject = d.default.assign(this.setDataObject, this.segmentControl.$data()), 
            this.setData(this.setDataObject);
            var o = (i[e] || {}).sortTypeIndex || 0, n = this.getTabKey(e, o), c = 19 != a.data.subjectsId ? t({}, "topTab[" + e + "].loadMoreVisible[" + o + "]", !1) : t({
                contentList: []
            }, "topTab[" + e + "].loadMoreVisible[" + o + "]", !1);
            19 != a.data.subjectsId && (this.data.contentList = []), (19 != this.subjectsCollectionId || 19 == this.subjectsCollectionId && e > 0) && (c["topTab[" + e + "].canRenderMore[" + o + "]"] = this.cacheDataList[n] && this.cacheDataList[n].length > 8), 
            this.setData(c), (0, p.default)(b.default.mark(function t() {
                return b.default.wrap(function(t) {
                    for (;;) switch (t.prev = t.next) {
                      case 0:
                        if (t.prev = 0, !(19 == a.subjectsCollectionId && e > 0)) {
                            t.next = 10;
                            break;
                        }
                        return a.data.depositHidden && a.setData({
                            depositHidden: !1
                        }), t.next = 5, a.reqCatlistData(e - 1);

                      case 5:
                        0 === r && s.default.init(a, !1, "", 1), a.reqCatlistData(e - 2), a.reqCatlistData(e), 
                        t.next = 20;
                        break;

                      case 10:
                        if (19 != a.subjectsCollectionId || 0 !== e) {
                            t.next = 16;
                            break;
                        }
                        a.depositComp ? a.depositComp.getDepositInfo() : a.depositComp = new I.default({
                            page: a,
                            ns: "DepositComp"
                        }), a.setData({
                            depositHidden: !0
                        }), s.default.close(a), t.next = 20;
                        break;

                      case 16:
                        return t.next = 18, a.reqCatlistData(e);

                      case 18:
                        a.reqCatlistData(e - 1), a.reqCatlistData(e + 1);

                      case 20:
                        t.next = 25;
                        break;

                      case 22:
                        t.prev = 22, t.t0 = t.catch(0), console.error(t.t0);

                      case 25:
                      case "end":
                        return t.stop();
                    }
                }, t, this, [ [ 0, 22 ] ]);
            })), this.resetInitRect(), this.tryInitImprRect();
        }
    },
    reqCatlistData: p.default.wrap(b.default.mark(function e(s) {
        var a, i, r, o;
        return b.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                if (a = this, i = this.data.topTab, !(s < 0 || s >= i.length)) {
                    e.next = 4;
                    break;
                }
                return e.abrupt("return");

              case 4:
                if (e.prev = 4, r = i[s] || {}, o = r.sortTypeIndex || 0, 1 !== r.pages[o]) {
                    e.next = 12;
                    break;
                }
                return e.next = 10, this.loadSubjectsGoodsDetail(this, s, o);

              case 10:
                e.next = 13;
                break;

              case 12:
                s === this.data.curTabIndex && (this.renderListDataRepo[s][o].length > 8 && a.setData(t({}, "topTab[" + s + "].canLoadMore[" + o + "]", !0)), 
                this.renderListDataRepo[s][o] = this.renderListDataRepo[s][o].slice(0, 8), f.default.goTop(!0, 0), 
                a.renderListDataRepo[s][o][2] ? (a.renderListDataRepo[s][o][0].picture_layers && a.renderListDataRepo[s][o][0].picture_layers.length > 4 ? (a.setData({
                    contentList: a.renderListDataRepo[s][o].slice(0, 1)
                }), a.firstRenderGoods = !0) : (a.setData({
                    contentList: a.renderListDataRepo[s][o].slice(0, 2)
                }), a.firstRenderGoods = !0), a.secondRenderHandler = setTimeout(function() {
                    a.setData(t({
                        contentList: a.renderListDataRepo[s][o]
                    }, "topTab[" + s + "].loadMoreVisible[" + o + "]", !0));
                }, 0)) : (a.setData(t({
                    contentList: a.renderListDataRepo[s][o]
                }, "topTab[" + s + "].loadMoreVisible[" + o + "]", !0)), a.firstRenderGoods = !0));

              case 13:
                a.$hideLoading(), e.next = 19;
                break;

              case 16:
                e.prev = 16, e.t0 = e.catch(4), a.$hideLoading();

              case 19:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 4, 16 ] ]);
    })),
    forwardGoodsDetail: function(e, t) {
        var s = e.currentTarget.dataset, a = this.getCurrentIndex(), r = this.data.topTab[a];
        if (s) {
            var o = s.index || s.subIndex;
            o = parseInt(o);
            var n = s.goodsId;
            if (n) {
                var c = this.data.contentList[o] || {}, d = s.eventType, l = void 0, p = 99356;
                if (t) {
                    var b = s.subjectId;
                    this.transGoodsData = s.goodsItem || {}, this.transGoodsData.preloadImgUrl = this.transGoodsData.thumbUrl, 
                    this.transGoodsData.goodsId = this.transGoodsData.goods_id, p = 99829, l = {
                        op: "click",
                        event: "goods_clk",
                        page_name: "subjects",
                        page_section: "nested_subject_list",
                        page_element: "goods",
                        subjects_id: this.subjectsCollectionId,
                        subject_id: r.subjectId,
                        nested_subject_id: b,
                        list_id: c.listId,
                        page_sn: 10046,
                        page_el_sn: 99829,
                        goods_id: n,
                        idx: o,
                        event_type: d,
                        tab_id: r.tabId ? r.tabId : a,
                        sub_subject_id: b
                    };
                } else {
                    if ("spike_list" == s.refer) {
                        var h = this.data.spikeGoodsList[o] || {};
                        this.transGoodsData = h, this.transGoodsData.preloadImgUrl = h.thumbUrl;
                    } else if ("day_rec" == s.refer) {
                        var f = this.data.dayRecGoodslist[o] || {};
                        this.transGoodsData = f, this.transGoodsData.preloadImgUrl = f.thumbUrl;
                    } else {
                        var g = s.goodsItem || {};
                        this.transGoodsData = g;
                    }
                    if (l = {
                        op: "click",
                        subjects_id: this.subjectsCollectionId,
                        sort_type: r.sortTypeName,
                        idx: o,
                        goods_id: n,
                        page_section: s.refer || "goods_list",
                        page_name: "subjects",
                        list_id: c.listId,
                        page_sn: 10046,
                        page_el_sn: p,
                        page_element: "goods",
                        event_type: d,
                        subject_id: r.subjectId,
                        tab_id: r.tabId ? r.tabId : a
                    }, u.default.isSpecialOfferSubjects ? l.tab_id = a : l.subject_id = r.subjectId, 
                    "day_rec" === s.refer) p = 98980, l.page_el_sn = 98980, l.rec_goods_id = n, l.tab_id = r.tabId || a, 
                    l.rec_event_type = d, delete l.goods_id, delete l.page_section; else if (this.data.isQuickBuyClick) this.setData({
                        isQuickBuyClick: !1
                    }), l.event = "subject_btn_clk", l.page_section = "goods_list", l.page_element = "quick_buy_btn"; else if ("spike_list" === s.refer) {
                        var _ = e.currentTarget.dataset.startTime;
                        p = 99302, l.page_el_sn = 99302, l.start_time = _;
                    } else l.page_section = "goods_list", l.page_element = "goods", l.event = "subject_goods_clk";
                }
                var m = "/pages/goods/goods?" + i.UrlUtil.buildQuery({
                    goods_id: n,
                    subjects_id: this.subjectsCollectionId,
                    refer_page_el_sn: p
                });
                i.Navigation.forward(m), this.$urlQueryObj.is_push && (l.is_push = this.$urlQueryObj.is_push), 
                c.transData && (c.transData.ad && (l.ad = JSON.stringify(c.transData.ad)), c.transData.p_rec && (l.p_rec = JSON.stringify(c.transData.p_rec)), 
                c.transData.p_search && (l.p_search = JSON.stringify(c.transData.p_search))), this.$urlQueryObj.is_push && (l.is_push = this.$urlQueryObj.is_push), 
                (0, i.TrackingRecord)(l);
            }
        }
    },
    gotoGoodsDetail: function(e) {
        this.forwardGoodsDetail(e, !1), this.$uploadFormId(e);
    },
    gotoSubGoodsDetail: function(e) {
        this.forwardGoodsDetail(e, !0);
    },
    getTracking: function(e, t, s, a) {
        var i = this.getCurrentIndex(), r = this.data.topTab[i];
        if (a[s]) {
            var o = a[s] || {};
            if ("subject-scroll-item-new" === o.itemName) return [ {
                op: "impr",
                page_section: "nested_subject_list",
                subjects_id: this.subjectsCollectionId,
                subject_id: r.subjectId,
                page_el_sn: 98211,
                page_element: "module",
                tab_id: r.tabId ? r.tabId : i,
                sub_subject_id: o.subjectID
            }, {
                op: "impr",
                page_section: "nested_subject_list",
                subjects_id: this.subjectsCollectionId,
                subject_id: r.subjectId,
                page_el_sn: 97595,
                page_element: "brand_banner",
                tab_id: r.tabId ? r.tabId : i,
                sub_subject_id: o.subjectID
            } ];
            var n = {
                op: e,
                subjects_id: this.subjectsCollectionId,
                sort_type: r.sortTypeName,
                idx: s,
                goods_id: o.goodsId,
                page_section: t,
                list_id: o.listId,
                page_name: "subjects",
                page_sn: 10046,
                page_el_sn: 99356,
                page_element: "goods",
                event_type: o.eventType,
                tab_id: r.tabId ? r.tabId : i,
                subject_id: r.subjectId
            };
            if (this.$urlQueryObj.is_push && (n.is_push = this.$urlQueryObj.is_push), u.default.isSpecialOfferSubjects ? n.tab_id = i : n.subject_id = r.subjectId, 
            o.transData && (o.transData.ad && (n.ad = JSON.stringify(o.transData.ad)), o.transData.p_rec && (n.p_rec = JSON.stringify(o.transData.p_rec)), 
            o.transData.p_search && (n.p_search = JSON.stringify(o.transData.p_search))), this.$urlQueryObj.is_push && (n.is_push = this.$urlQueryObj.is_push), 
            "LargeMixinPromotion" == o.itemName || "SmallMixinPromotion" == o.itemName) {
                var c = o.subject_id;
                n.page_section = "nested_subject_list", n.page_el_sn = 99358, n.page_element = "more", 
                n.nested_subject_id = c, n.type = r.columnNum, delete n.sort_type, delete n.idx, 
                delete n.goods_id, delete n.list_id, delete n.event_type;
            }
            return [ n ];
        }
    },
    quickBuyClick: function() {
        this.data.isQuickBuyClick || this.setData({
            isQuickBuyClick: !0
        });
    },
    gotoSubject: function(e) {
        var t = e.currentTarget.dataset.subjectId, s = e.currentTarget.dataset.pageElSn || 99358, a = e.currentTarget.dataset.name;
        if (t) {
            var r = "/pages/subject/subject?" + i.UrlUtil.buildQuery({
                subject_id: t,
                refer_page_el_sn: s
            });
            i.Navigation.forward(r);
        }
        var o = this.getCurrentIndex(), n = this.data.topTab[o];
        if ("brand_banner" === a) (0, i.TrackingRecord)({
            op: "click",
            page_section: "nested_subject_list",
            page_element: "brand_banner",
            subjects_id: this.subjectsCollectionId,
            subject_id: n.subjectId,
            sub_subject_id: t,
            page_el_sn: s,
            tab_id: n.tabId ? n.tabId : o
        }); else if ("scroll-new-subitem" === a) {
            var c = e.currentTarget.dataset, d = this.getCurrentIndex(), u = this.data.topTab[d];
            if (c) {
                var l = c.index || c.subIndex;
                l = parseInt(l);
                var p = c.goodsId;
                if (p) {
                    var b = this.data.contentList[l] || {}, h = c.eventType;
                    this.transGoodsData = b.transData, (0, i.TrackingRecord)({
                        op: "click",
                        event: "goods_clk",
                        page_name: "subjects",
                        page_section: "nested_subject_list",
                        page_element: "goods",
                        subjects_id: this.subjectsCollectionId,
                        subject_id: u.subjectId,
                        nested_subject_id: t,
                        list_id: b.listId,
                        page_sn: 10046,
                        page_el_sn: 99829,
                        goods_id: p,
                        idx: l,
                        event_type: h,
                        tab_id: u.tabId ? u.tabId : d,
                        sub_subject_id: t
                    });
                }
            }
        } else (0, i.TrackingRecord)({
            op: "click",
            event: "more_click",
            page_name: "subjects",
            page_section: "nested_subject_list",
            page_element: "more",
            subjects_id: this.subjectsCollectionId,
            subject_id: n.subjectId,
            nested_subject_id: t,
            page_sn: 10046,
            page_el_sn: s,
            type: n.columnNum,
            tab_id: n.tabId ? n.tabId : o,
            sub_subject_id: t
        });
    },
    preventTouchMove: function() {},
    checkStorage: p.default.wrap(b.default.mark(function e(t) {
        var s, a, r, o;
        return b.default.wrap(function(e) {
            for (;;) switch (e.prev = e.next) {
              case 0:
                return e.prev = 0, s = !1, e.next = 4, i.StorageUtil.getStorage(t);

              case 4:
                return (a = e.sent) ? (r = new Date().setHours(0, 0, 0, 0), o = new Date(r).getTime(), 
                a <= o && (s = !0)) : s = !0, e.abrupt("return", s);

              case 9:
                e.prev = 9, e.t0 = e.catch(0), console.error(e.t0);

              case 12:
              case "end":
                return e.stop();
            }
        }, e, this, [ [ 0, 9 ] ]);
    }))
};

(0, i.PddPage)(D, {
    pageName: "subjects",
    pageSn: 10046,
    notUseCommonPV: !0
});