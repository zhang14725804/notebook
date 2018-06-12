function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../common/pingback/pv")), a = e(require("../../common/pingback/click")), i = e(require("../../common/user/user")), r = e(require("../../common/utils/util")), s = e(require("common/config")), n = e(require("service/commonSearchService")), o = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}(require("service/searchService")), d = e(require("../../components/searchLayout/searchLayout")), c = require("../../vendor/redux/redux"), h = e(require("../../vendor/redux-plugins/reduxTrunk")), u = e(require("./reducers/index")), l = e(require("./actions/index")), g = {
    app: getApp(),
    onLoad: function(e) {
        var t = this;
        i.default.init();
        var a = (0, c.combineReducers)(u.default);
        this.store = (0, c.createStore)(a, (0, c.applyMiddleware)(h.default)), this.store.subscribe(function() {
            t.setData(t.store.getState());
        });
        var r = e.channelId ? e.channelId : this.app.globalData.channel.channelId || "";
        this.setData({
            keyword: "",
            rpage: "wx_channel"
        }), this.loadPage(r), this.loadSearchData().then(function(e) {
            var a = t.searchDataHandle(e), i = {
                page: "channel"
            };
            t.store.dispatch(l.default.initSearchLayout(a.searchRecordData, a.hotquery, "", "", "", i));
        }, function() {
            var e = {
                page: "channel"
            };
            t.store.dispatch(l.default.initSearchLayout({}, {}, "", "", "", e));
        });
    },
    reLoadSearchHistory: function() {
        var e = this.searchDataHandle({}), t = this.store.getState().searchLayout.searchHistory;
        t && t.list && (t.list = e.searchRecordData, this.store.dispatch(l.default.updateSearchState({
            searchHistory: t
        })));
    },
    clearSearchHistory: function() {
        r.default.storage.handleStorageMuti("set", "SEARCH_RECORD", []);
    },
    loadPage: function(e) {
        this.store.dispatch(l.default.setData(e)), this.store.dispatch(l.default.initSearchLayout());
        var t = this.store.getState().channelInfos.curChannel, a = {
            pageNum: 1,
            pageSize: s.default.SEARCH_NUM,
            mode: t.modes.modelist[t.modes.modeTabIndex].id,
            ctgName: t.cname,
            isSource: t.issource,
            channelId: t.channelId
        };
        this.store.dispatch(l.default.initCondition(a));
        var i = this.store.getState().searchConditions;
        this.store.dispatch(l.default.showLoad()), this.getSearchData(i);
    },
    mapSeriesCategory: function(e) {
        return "喜剧" === e || "网络剧" === e || "美剧" === e ? e : "剧" === e.substr(-1) ? e.slice(0, -1) : e;
    },
    getSearchData: function(e) {
        var t = this;
        this.store.dispatch(l.default.showLoad());
        var a = e.pageSize, i = e.ctgName, r = e.channelId, s = (0, n.default)().getSearchListInstance({
            cid: e.channelId,
            searchNum: a,
            imgH: e.isSource
        });
        s.setStart(e.pageNum), s.setLimit(a), s.setCategory(i);
        var o = [], d = [];
        e.year ? (s.setYear(e.year), d.push(e.year)) : delete d[0], e.threeCategory && e.threeCategory.length > 0 ? (e.threeCategory.forEach(function(e) {
            if ("" == e) return !1;
            var a = 2 == r ? t.mapSeriesCategory(e) : e;
            o.push(a);
        }), s.setThreeCategory(o)) : s.setThreeCategory([]), e.vip ? (s.setPurchase(e.isPurchase), 
        d.push(PURCHASE[e.isPurchase])) : delete d[1], d && d.length && o.push(d.filter(function(e) {
            if (e && "" !== e) return !0;
        })), e.is_qiyi_produced && s.setIQiyiChupin(e.is_qiyi_produced), s.setSortKey(e.mode);
        var c = s.search();
        this.loadVideoPage(c, e, o);
    },
    loadVideoPage: function(e, t, a) {
        var i = this;
        o.getVideoList(e).then(function(e) {
            return i.store.dispatch(l.default.completeLoad()), i.pageDataHandle(e);
        }).then(function(t) {
            t.isEmpty ? i.store.dispatch(l.default.nomoreLoad()) : i.store.dispatch(l.default.loadVideos(t, e));
        }).catch(function(t) {
            1 == e.pageNum ? i.store.dispatch(l.default.firstErrorLoad()) : i.store.dispatch(l.default.errorLoad());
        });
    },
    pageDataHandle: function(e) {
        var t = e.results, a = e.docinfos;
        return Array.isArray(t) && t.length && Array.isArray(a) && a.length && t.forEach(function(e, i) {
            t[i].vid = a[i].albumDocInfo.videoinfos[0].vid, t[i].qipuId = a[i].albumDocInfo.videoinfos[0].tvId, 
            t[i].tvId = a[i].albumDocInfo.videoinfos[0].tvId;
        }), e;
    },
    switchChannel: function(e, t) {
        var a = 0, i = !1;
        if (e) a = e.currentTarget.dataset.tab, i = e.currentTarget.dataset.issource, this.clickPingback({
            block: "",
            rseat: a + 1
        }); else {
            var r = this.getSwitchIndex(t);
            a = r.index, i = r.isSource;
        }
        this.switchChannelHandle(a, i);
    },
    getSwitchIndex: function(e) {
        return [ {
            channelId: 2,
            index: 0
        }, {
            channelId: 1,
            index: 1
        }, {
            channelId: 6,
            index: 2,
            isSource: !0
        }, {
            channelId: 4,
            index: 3
        } ].find(function(t) {
            return t.channelId === e;
        });
    },
    switchChannelHandle: function(e, t) {
        var a = this.store.getState(), i = a.searchConditions;
        if (a.channelInfos.channelTabIndex != e) {
            this.store.dispatch(l.default.switchChannel(e, t));
            var r = this.store.getState().channelInfos.curChannel;
            i.ctgName = r.cname, i.mode = r.modes.modelist[r.modes.modeTabIndex].id, i.isSource = t, 
            i.pageNum = 1, i.channelId = r.channelId, i.year && delete i.year, i.threeCategory && (i.threeCategory = []), 
            i.is_qiyi_produced && delete i.is_qiyi_produced, 6 == r.channelId && r.tags.forEach(function(e, t) {
                var a = e.items[e.tabIndex];
                "type" == e.tag && /\u7231\u5947\u827a\u51fa\u54c1/.test(a) && (i.is_qiyi_produced = 1);
            }), this.store.dispatch(l.default.changeCondition(i)), this.store.dispatch(l.default.resetVideos()), 
            this.getSearchData(this.store.getState().searchConditions);
        }
    },
    switchMode: function(e) {
        var t = e.currentTarget.dataset.tab || 0, a = (e.currentTarget.dataset.name, this.store.getState().searchConditions);
        this.store.dispatch(l.default.switchMode(t));
        var i = this.store.getState().channelInfos.curChannel;
        a.mode = i.modes.modelist[i.modes.modeTabIndex].id, a.pageNum = 1, a.channelId = i.channelId, 
        this.store.dispatch(l.default.changeCondition(a)), this.store.dispatch(l.default.resetVideos()), 
        this.getSearchData(this.store.getState().searchConditions);
    },
    switchCategory: function(e) {
        var t = e.currentTarget.dataset.tab || 0, a = e.currentTarget.dataset.name || "", i = e.currentTarget.dataset.tag || "", r = this.store.getState().channelInfos.curChannel, n = this.store.getState().searchConditions;
        n.pageNum = 1, this.store.dispatch(l.default.switchTag(t, i)), "year" != i && (n.threeCategory = [], 
        r.tags.forEach(function(e, t) {
            var i = e.items[e.tabIndex];
            "year" != e.tag && (/\u5168\u90E8/.test(i) || ("version" == e.tag && ("TV版" == i && (i = "tv版"), 
            "OVA版" == i && (i = "ova版")), "type" != e.tag ? n.threeCategory.push(i) : /\u7231\u5947\u827a\u51fa\u54c1/.test(a) || n.threeCategory.push(i)), 
            /\u7231\u5947\u827a\u51fa\u54c1/.test(a) ? n.is_qiyi_produced = 1 : delete n.is_qiyi_produced);
        })), "year" == i && r.tags.forEach(function(e, t) {
            if ("year" == e.tag) {
                var a = e.items[e.tabIndex];
                n.year = s.default.YEAR_VALUE[a] || a;
            }
        }), this.store.dispatch(l.default.changeCondition(n)), this.store.dispatch(l.default.resetVideos()), 
        this.getSearchData(this.store.getState().searchConditions);
    },
    retryLoadPage: function() {
        var e = this.store.getState().searchConditions;
        this.store.dispatch(l.default.showLoad()), this.getSearchData(e);
    },
    onReachBottom: function(e) {
        var t = this.store.getState().searchConditions, a = this.store.getState().videos, i = a.isFinal, r = a.isEmpty, n = a.pageNum, o = this.store.getState().load;
        "error" != o && "nomore" != o && "firstError" != o && "show" != o && (t.pageNum++, 
        i || r || n == s.default.TOTLE_PAGE || (this.store.dispatch(l.default.changeCondition(t)), 
        this.getSearchData(this.store.getState().searchConditions)));
    },
    playVideo: function(e) {
        var t = e.currentTarget.dataset.qipuid, a = this.getPlayVideo(t);
        this._playVideo({
            aid: a.albumId || a.sourceId,
            qipuId: a.tvId,
            vid: a.vid,
            albumName: a.mainTitle || a.subTitle || "",
            sourceName: a.mainTitle || a.subTitle || "",
            type: "film"
        });
    },
    getPlayVideo: function(e) {
        var t = this.store.getState();
        return this.getVideoByQipuId(t.videos.videolist, e);
    },
    getVideoByQipuId: function(e, t) {
        return e.reduce(function(e, a) {
            return a.qipuId === t ? a : e;
        }, null);
    },
    _playVideo: function(e) {
        wx.navigateTo({
            url: "/pages/video/video?qipuId=" + e.qipuId + "&aid=" + e.aid + "&aid=" + e.aid + "&type=" + e.type + "&vid=" + e.vid + "&albumName=" + e.albumName + "&sourceName=" + e.sourceName + "&rfr=wx_channel"
        });
    },
    onShow: function() {
        t.default.send({
            rpage: "wx_channel"
        }), this.reLoadSearchHistory();
        var e = this.app.globalData.rfr, a = this.app.globalData.channel.channelId;
        "home" === e && this.onShow.exec && this.switchChannel(null, a);
    },
    onHide: function() {
        this.hideSearchLayout(), this.onShow.exec = !0;
    },
    clickPingback: function(e) {
        a.default.send({
            rpage: "wx_channel",
            block: e.block,
            rseat: e.rseat
        });
    },
    onShareAppMessage: function() {
        var e = this.store.getState().searchConditions;
        return {
            title: e.ctgName || "爱奇艺视频",
            desc: "轻松追剧，悦享品质",
            path: "/pages/library/library?channelId=" + e.channelId
        };
    },
    onPullDownRefresh: function() {}
};

Page(Object.assign({}, g, d.default));