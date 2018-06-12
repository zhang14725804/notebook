function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../common/pingback/pv")), a = e(require("../../common/pingback/click")), i = e(require("../../common/user/user")), r = require("../../common/form/form"), o = e(require("../../components/searchLayout/searchLayout")), s = e(require("../../components/history/recordService")), c = require("../../vendor/redux/redux"), d = e(require("../../vendor/redux-plugins/reduxTrunk")), n = e(require("./reducers/index")), u = e(require("./actions/index")), l = e(require("../../common/utils/util")), h = {
    app: getApp(),
    onLoad: function() {
        var e = this;
        i.default.init();
        var t = (0, c.combineReducers)(n.default);
        this.store = (0, c.createStore)(t, (0, c.applyMiddleware)(d.default)), this.store.subscribe(function() {
            e.setData(e.store.getState());
        }), this.loadPage(), this.removePlay(), this.setData({
            keyword: "",
            rpage: "wx_home"
        }), this.loadSearchData().then(function(t) {
            var a = e.searchDataHandle(t), i = {
                page: "index"
            };
            e.store.dispatch(u.default.initSearchLayout(a.searchRecordData, a.hotquery, "", "", "", i));
        }, function() {
            var t = {
                page: "index"
            };
            e.store.dispatch(u.default.initSearchLayout({}, {}, "", "", "", t));
        });
    },
    loadPage: function() {
        var e = this, t = i.default.isLogin();
        this.store.dispatch(u.default.nomoreLoad()), t ? this.getRecordData().then(function(a) {
            e.store.dispatch(u.default.getIndexData(a, t));
        }) : this.store.dispatch(u.default.getIndexData([], t));
    },
    getRecordData: function() {
        var e = this.app.globalData.systemInfo, t = {
            version: e.version,
            os: e.system.split(" ")[1] || "",
            ua: e.model,
            ckuid: i.default.getAnonymousUid(),
            auth: i.default.getAuthcookie(),
            page_size: 5
        }, a = Object.assign({}, {
            page_num: 1
        }, t);
        return new Promise(function(e, t) {
            s.default.getAllRecord(a).then(function(t) {
                var a = [];
                "A00000" == t.code && (a = t.data && t.data.data), e(a);
            }).catch(function(t) {
                e([]);
            });
        });
    },
    reLoadSearchHistory: function() {
        var e = this.searchDataHandle({}), t = this.store.getState().searchLayout.searchHistory;
        t && t.list && (t.list = e.searchRecordData, this.store.dispatch(u.default.updateSearchState({
            searchHistory: t
        })));
    },
    onShow: function() {
        t.default.send({
            rpage: "wx_home"
        }), this.reLoadSearchHistory(), this.app.globalData.rfr = "", this.app.globalData.showshare = !1, 
        this.setData({
            swiperPlay: !0
        });
    },
    onHide: function() {
        this.hideSearchLayout(), this.onHide.run || (this.store.dispatch(u.default.removePlayRecord(!0)), 
        this.onHide.run = !0), this.setData({
            swiperPlay: !1
        });
    },
    clickPingback: function(e) {
        a.default.send({
            rpage: "wx_home",
            block: e.block,
            rseat: e.rseat
        });
    },
    swiperChange: function(e) {
        var t = this.store.getState().focus[e.detail.current], a = t.isPaidLive || t.isLive ? t.qipuId : t.tvid, i = t.customType || 1, r = t.customLink || "";
        this.store.dispatch(u.default.switchFocus(a, t.bgimg, i, r));
    },
    playVideo: function(e) {
        var t = e.currentTarget, a = t.dataset.qipuId, i = this.getPlayVideo(a), o = (t.dataset.block, 
        t.dataset.index, i.isPaidLive || i.isLive ? i.qipuId : i.tvid), s = t.dataset.imgType;
        "base" == s ? this.clickPingback({
            block: "wx_focus",
            rseat: "wx_bbroadcast"
        }) : "focus" == s && this.clickPingback({
            block: "wx_focus",
            rseat: "wx_sbroadcast"
        });
        var c = e.detail.formId, d = e.currentTarget.dataset.rseat || "";
        if ((0, r.collectFormIdMuti)(c, d), !o) return wx.showToast({
            icon: "none",
            title: "数据异常"
        }), !1;
        this._playVideo({
            aid: i.sourceId || i.albumId,
            qipuId: o,
            vid: i.vid,
            isLive: i.isPaidLive || i.isLive,
            customType: i.customType,
            customLink: i.customLink,
            type: "film"
        });
    },
    getPlayVideo: function(e) {
        var t = this.store.getState();
        return this.getVideoByQipuId(t.focus, e) || this.getTagsVideo(t.tags, e);
    },
    getTagsVideo: function(e, t) {
        var a = this;
        return e.reduce(function(e, i) {
            return e || a.getVideoByQipuId(i.showList, t);
        }, null);
    },
    getVideoByQipuId: function(e, t) {
        return e.reduce(function(e, a) {
            return a.qipuId === t ? a : e;
        }, null);
    },
    playRecord: function() {
        var e = this.store.getState().record;
        this.clickPingback({
            block: "",
            rseat: "wx_home_history"
        }), this._playVideo({
            qipuId: e.qipuId,
            aid: e.aid
        });
    },
    _playVideo: function(e) {
        this.store.dispatch(u.default.removePlayRecord(!0));
        var t = "";
        if (2 == e.customType) {
            if (e.customLink) {
                var a = e.customLink;
                a = "/" === a.slice(0, 1) ? a : "/" + a;
                var i = [ "pages/home/home", "pages/shortVideo/shortVideo", "pages/library/library", "pages/my/my", "pages/specialSubject/specialSubject" ].filter(function(e) {
                    return a.indexOf(e) > -1;
                });
                l.default.isArray(i) && i.length > 0 ? wx.switchTab({
                    url: a
                }) : wx.navigateTo({
                    url: a
                });
            }
        } else 3 == e.customType ? (t = "/subPackage/pages/webview/webview?webviewSrc=" + e.customLink, 
        wx.navigateTo({
            url: t
        })) : (t = e.isLive ? "/pages/liveVideo/liveVideo?qipuId=" + e.qipuId + "&aid=" + e.aid + "&rfr=wx_home" : "/pages/video/video?qipuId=" + e.qipuId + "&aid=" + e.aid + "&rfr=wx_home", 
        wx.navigateTo({
            url: t
        }));
    },
    removePlay: function() {
        var e = this;
        setTimeout(function() {
            e.store.dispatch(u.default.removePlayRecord());
        }, 5e3);
    },
    findMore: function(e) {
        var t = e.detail.formId, a = e.currentTarget.dataset.channelid || "", i = e.currentTarget.dataset.rseat || "";
        this.app.globalData.channel.channelId = a, this.app.globalData.rfr = "home", this.clickPingback({
            block: "",
            rseat: i
        }), wx.switchTab({
            url: "/pages/library/library"
        }), (0, r.collectFormIdMuti)(t, i);
    },
    onShareAppMessage: function() {
        return {
            title: "爱奇艺视频",
            desc: "轻松追剧，悦享品质",
            path: "/pages/home/home"
        };
    },
    handleLiveClick: function(e) {
        var t = e.currentTarget.dataset.qipuId, a = this.data.rpage || "", i = e.detail.formId, o = e.currentTarget.dataset.rseat || "";
        this.clickPingback({
            block: "wx_block_home_live",
            rseat: "wx_home_live"
        }), (0, r.collectFormIdMuti)(i, o), wx.navigateTo({
            url: "/pages/liveVideo/liveVideo?qipuId=" + t + "&rfr=" + a
        });
    },
    onPullDownRefresh: function() {},
    retryLoadPage: function() {
        this.loadPage(), this.removePlay();
    }
};

Page(Object.assign({}, h, o.default));