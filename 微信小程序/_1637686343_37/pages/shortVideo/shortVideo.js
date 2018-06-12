function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var i, r = t(require("../../common/user/user")), o = t(require("../../common/utils/util")), n = t(require("../../common/polyfill/promise")), s = t(require("../../common/pingback/click")), d = t(require("../../common/pingback/shortVideoTrack")), c = require("../../common/form/form"), l = require("../../components/player/VideoPlayer"), u = e(require("../../common/source/videoUtil")), h = t(require("../../components/videoLayout/videoLayout")), f = t(require("service/videoControl")), g = e(require("service/videoService")), v = t(require("../../components/history/playRecordService")), p = t(require("../../components/history/recordService")), m = t(require("../../common/pingback/pv")), y = t(require("service/bindVV")), T = t(require("common/config")), k = t(require("service/channelCache")), P = require("../../vendor/redux/redux"), b = t(require("../../vendor/redux-plugins/reduxTrunk")), _ = t(require("./reducers/index")), w = t(require("./actions/index")), I = {
    formatePlayRecord: function(e) {
        return e.tvTitle || "";
    },
    savePlayRecord: function(e) {
        var t = this.store.getState(), a = t.playInfo || {}, i = t.tmtsInfo || {};
        this.savePlayRecordTimeout(a, e, i);
    },
    savePlayRecordTimeout: function(e, t, a) {
        var i = this;
        this.notCanPlayRecord || (this.notCanPlayRecord = !0, this.saveRecordTimer = setTimeout(function() {
            i.notCanPlayRecord = !1, i.saveRecord(e, {}, {});
        }, 5e3)), !this.notCanPlayRecord_online && r.default.isLogin() && (this.notCanPlayRecord_online = !0, 
        this.saveRecordTimer_online = setTimeout(function() {
            i.notCanPlayRecord_online = !1, i.uploadRecord(i.currentTime, null);
        }, 12e4));
    },
    saveRecord: function(e, t, a) {
        var i = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], o = this.formatePlayRecord(e), n = t.playTime == t.duration ? this.currentTime : t.playTime;
        v.default.save({
            id: e.tvId,
            qipuId: e.tvId,
            aid: e.tvId,
            albumName: e.tvTitle || "",
            sourceName: e.tvTitle || "",
            playTime: i ? this.duration : n,
            duration: this.duration,
            content: o,
            imgUrl: e.thumbnail || e.videoUrl || "",
            date: Date.now(),
            type: "notfilm"
        }, r.default.isLogin());
    },
    getTmtsError: function(e, t) {
        var a = u.getError(e, t);
        return a.buttonclick = a.buttonclick = a.buttonclick || this.playNext, a;
    },
    uploadRecord: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1, t = arguments[1], a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
        if (r.default.getAuthcookie()) {
            var i = this.app.globalData.systemInfo, o = this.store.getState().playInfo, n = [], s = Date.now() / 1e3, d = a || o.tvId || "";
            if (d) {
                var c = {
                    terminalId: "32",
                    tvId: d,
                    addtime: s.toFixed ? s.toFixed(0) : s,
                    videoPlayTime: e.toFixed ? e.toFixed(0) : e
                };
                n.push(c), n = JSON.stringify(n);
                var l = {
                    version: i.version,
                    os: i.system.split(" ")[1] || "",
                    ua: i.model,
                    ckuid: r.default.getAnonymousUid(),
                    auth: r.default.getAuthcookie(),
                    upload_records: n
                };
                p.default.uploadRecord(l).then(function(e) {
                    "A00000" == e.code && t && t();
                }).catch(function(e) {});
            }
        }
    }
}, S = (i = {
    app: getApp(),
    onLoad: function(e) {
        var t = this;
        r.default.init();
        var a = (0, P.combineReducers)(_.default);
        this.store = (0, P.createStore)(a, (0, P.applyMiddleware)(b.default)), this.store.subscribe(function() {
            t.setData(t.store.getState());
        }), this.store.dispatch(w.default.initVideoLayout(!0)), this.setData({
            curpage: "wx_shortchannel",
            from: "notFilm"
        });
        this.loadPage(0), this.player = new l.Player(this), this.vvStorage = {
            aUid: r.default.getAnonymousUid(),
            uid: r.default.getUid(),
            asArg: r.default.getAS(),
            ve: r.default.getWeid()
        }, y.default.bind(this.player), this.bind(), this.initState(), this.clickPingback({
            block: "wx_shortchannel_1"
        });
    },
    bind: function() {
        var e = this;
        this.player.on("ended", function() {
            var t = e.store.getState();
            e.saveRecord(t.playInfo, {}, t.tmtsInfo, !0), e.playNext(!0);
        }), this.player.on("timeupdate", function(t) {
            var a = t.detail.currentTime;
            a > 0 && (e.currentTime = a, e.savePlayRecord(e.currentTime), e.player.firstRun || (e.player.firstRun = !0, 
            e.uploadRecord(-1, null)));
        }), this.player.on("pause", function(t) {
            var a = e.store.getState().setCurrentVideoParams.currentVideoPingback;
            e.hotFeedClickPingback(Object.assign({}, a, {
                rseat: 1
            })), e.currentTime > 0 && !e.switchPlayVideo.switch && e.uploadRecord(e.currentTime, null), 
            e.saveRecordTimer_online && (clearTimeout(e.saveRecordTimer_online), e.notCanPlayRecord_online = !1);
        }), this.player.on("play", function(t) {
            var a = e.store.getState().setCurrentVideoParams.currentVideoPingback;
            e.hotFeedClickPingback(Object.assign({}, a, {
                rseat: 0
            }));
        });
    },
    playVideo: function(e) {
        var t = this, a = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.player.firstRun = !1;
        var i = "";
        return this.store.getState().playInfo.tvId || (i = e.tvId), a ? this.uploadRecord(0, null, i) : this.currentTime && this.uploadRecord(this.currentTime, null, i), 
        this.resetVideos(), this.store.dispatch(w.default.showLoading()), this.changeCurrentVideo(e, e.tvId), 
        g.getVideoInfo(this.getPlayParam(e)).then(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return t.player.setUrl(e.src), t.duration = e.info.duration || "", t.store.dispatch(w.default.setRateList(e.info.vidl)), 
            t.store.dispatch(w.default.setVideoModel(!0)).then(function() {
                return e;
            });
        }).then(function(e) {
            if (t.store.dispatch(w.default.tmtsInfo(e)), t.canPlay()) {
                var a = 0;
                if (o.default.os.isAndroid && t.app.globalData.systemInfo.system) {
                    var i = /Android (\d)[\.]+/.exec(t.app.globalData.systemInfo.system);
                    i && i[1] && i[1] < 5 && (a = 300);
                }
                setTimeout(function() {
                    t.autoPlay(), t.store.dispatch(w.default.showVideo());
                }, a);
            }
        }).then(function() {
            t.player.emit("ready");
        }, function(a) {
            var i = t.store.getState();
            return t.showLayerBeforeStart(i.playInfo, a.info, a, e), n.default.reject();
        });
    },
    resetVideos: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.currentTime && (this.currentTime = 0);
        var t = this.store.getState().videos.pageNum;
        this.store.dispatch(w.default.resetVideos([], t, e)), this.store.dispatch(w.default.editPlayInfo({})), 
        this.player.pause();
    },
    showLayerBeforeStart: function(e) {
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        var t = arguments[2];
        arguments[3];
        this.data.fullScreen && this.player.context.exitFullScreen();
        var a = t.content || "";
        "anonymousLayer" != a && "vipckfail" != a || (t.content = "defaultTmtsErr"), this.store.dispatch(w.default.showError(this.getTmtsError(t, !1)));
    },
    playCurrentVideo: function(e) {
        var t = e.currentTarget.dataset.tvid || "", a = (this.store.getState().videos.videolist, 
        e.currentTarget.dataset || {});
        if (Object.keys(a).forEach(function(e) {
            a["r_" + e] = a[e], delete a[e];
        }), this.store.dispatch(w.default.setCurrentVideoParams({
            currentVideoPingback: a
        })), t) {
            this.switchPlayVideo.switch = !0;
            var i = this.getVideo(t);
            this.initVV(i, 1), this.playVideo(i);
        }
    },
    playNext: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this.switchPlayVideo(e);
    },
    switchPlayVideo: function(e) {
        this.switchPlayVideo.switch = !0;
        var t = this.store.getState().playInfo, a = this.store.getState().videos.videolist, i = a.findIndex(function(e, a) {
            return e.tvId == t.tvId;
        });
        if (i != a.length - 1) {
            var r = a[i + 1], o = {
                r_area: r.r_area,
                r_bkt: r.r_bkt,
                r_eventid: r.r_eventid,
                r_feedid: r.feedId,
                r_tvid: r.tvId,
                r_rank: r.r_rank
            };
            this.store.dispatch(w.default.setCurrentVideoParams({
                currentVideoPingback: o
            })), this.saveRecordTimer && (clearTimeout(this.saveRecordTimer), this.notCanPlayRecord = !1), 
            this.saveRecordTimer_online && (clearTimeout(this.saveRecordTimer_online), this.notCanPlayRecord_online = !1), 
            this.initVV(r, 5), this.playVideo(r, e);
        }
    },
    getVideo: function(e) {
        return this.store.getState().videos.videolist.find(function(t) {
            return t.tvId == e;
        }) || null;
    },
    getVideoIndex: function(e) {
        return this.store.getState().videos.videolist.findIndex(function(t) {
            return t.tvId == e;
        });
    },
    screenChangeHandle: function(e) {
        var t = e.detail.fullScreen || !1;
        this.setData({
            fullScreen: t
        });
        var a = this.store.getState().setCurrentVideoParams.currentVideoPingback;
        this.hotFeedClickPingback(Object.assign({}, a, {
            rseat: 3
        }));
    },
    loadPage: function(e) {
        var t = this, a = this.data.curpage;
        this.store.dispatch(w.default.setData(e, a));
        var i = {
            pageNum: 1,
            channelId: this.store.getState().channelInfos.curChannel.channelId,
            action: 1
        };
        this.store.dispatch(w.default.initCondition(i));
        var r = this.store.getState().searchConditions;
        this.getSearchData(r).then(function() {
            "complete" == t.store.getState().load && t.hotFeedPingback({
                rseat: "top_refresh",
                block: "O: 0281960040",
                t: 20
            });
        });
    },
    getSearchData: function(e) {
        this.store.dispatch(w.default.showLoad()), this.setData({
            showFeedToast: !1
        }), this.currentTime && this.player.pause(), this.feedTipTimer && clearTimeout(this.feedTipTimer), 
        this.feedTipShowTimer && clearTimeout(this.feedTipShowTimer);
        var t = Object.assign({}, e, {
            uid: r.default.getAnonymousUid(),
            ppuid: r.default.getUid()
        });
        return this.loadVideoPage(t);
    },
    loadVideoPage: function(e) {
        var t = this, a = this.store.getState().videos.totalCounts;
        return 1 == e.action && parseInt(a, 10) >= T.default.maxFeedCount ? (this.store.dispatch(w.default.nomoreLoad()), 
        this.showFeedToast(0), n.default.resolve()) : g.getVideoPage(e).then(function(a) {
            t.store.dispatch(w.default.completeLoad());
            var i = a.data && a.data.pingback ? a.data.pingback : {}, r = a.data && a.data.feeds ? a.data.feeds : [];
            return t.store.dispatch(w.default.trackParams({
                pingback: i,
                feeds: r
            })), r && r.length > 0 && t.pageDisplayPingback(), 2 == e.action && wx.stopPullDownRefresh(), 
            t.pageDataHandle(a);
        }).then(function(a) {
            var i = t.store.getState().videos.totalCounts || 0, r = a.results.length, o = T.default.maxFeedCount - i;
            if (parseInt(i + r, 10) >= T.default.maxFeedCount && (1 == e.action ? r >= o && a.results.splice(o) : 2 == e.action && t.store.dispatch(w.default.loadVideos(a, e, r))), 
            a.isEmpty) 1 == e.pageNum ? t.store.dispatch(w.default.firstErrorLoad()) : (t.showFeedToast(0), 
            t.store.dispatch(w.default.nomoreLoad())); else {
                t.showFeedToast(r), t.store.dispatch(w.default.loadVideos(a, e));
                var n = t.store.getState();
                k.default.save(n.channelInfos.curChannel.channelId, n.videos.videolist);
            }
        }).catch(function(a) {
            2 == e.action ? (wx.stopPullDownRefresh(), t.showFeedToast(0), t.store.dispatch(w.default.errorLoad())) : 1 == e.action && (1 == e.pageNum ? t.store.dispatch(w.default.firstErrorLoad()) : t.store.dispatch(w.default.errorLoad()));
        });
    },
    pageDataHandle: function(e) {
        var t = e.data && e.data.feeds || [];
        return t && t.length && t.forEach(function(t, a) {
            delete t.wallName, delete t.wallType, delete t.wallIcon, delete t.icon, delete t.snsTime, 
            delete t.originalDescription, delete t.description, delete t.videoPlayUrl, delete t.vote, 
            delete t.userIdentity, delete t.uvCount, delete t.wallUserCount, delete t.pubStr, 
            delete t.name, delete t.feedTitle, t.showVideo = !1;
            var i = e.data.pingback;
            i && (t.r_eventid = i.event_id || "", t.r_bkt = i.bkt || "", t.r_area = i.area || "", 
            t.r_rank = a);
        }), {
            isEmpty: !t.length,
            results: t || []
        };
    },
    showFeedToast: function(e) {
        var t = this;
        this.feedTipTimer = setTimeout(function() {
            t.setData({
                recommend: e,
                showFeedToast: !0
            }), t.feedTipShowTimer = setTimeout(function() {
                t.setData({
                    showFeedToast: !1
                });
            }, 2e3);
        }, 1e3);
    },
    changeCurrentVideo: function(e, t, a) {
        this.store.getState().videos.videolist;
        if (!a) {
            var i = this.getVideoIndex(t);
            this.setData({
                videoTop: i * (o.default.getPxByRpx(T.default.feedItemHeight) + o.default.getPxByRpx(T.default.feedBottomBarHeight)) + o.default.getPxByRpx(T.default.topNavBarHeight)
            });
        }
        e.showVideo = !0, this.store.dispatch(w.default.editPlayInfo(e)), this.store.dispatch(w.default.changeCurVideo(e, t));
    },
    switchChannel: function(e, t) {
        var a = e.currentTarget.dataset.tab;
        this.clickPingback({
            block: "wx_shortchannel_" + (a + 1)
        }), this.switchChannelHandle(a);
    },
    switchChannelHandle: function(e) {
        var t = this.store.getState(), a = t.searchConditions;
        if (t.channelInfos.channelTabIndex != e) {
            this.store.dispatch(w.default.switchChannel(e));
            var i = this.store.getState().channelInfos.curChannel;
            a.ctgName = i.cname, a.pageNum = 1, a.channelId = i.channelId, this.store.dispatch(w.default.changeCondition(a)), 
            this.resetVideos(!0);
            this.store.getState();
            var r = k.default.get(i.channelId);
            r && r.length ? this.store.dispatch(w.default.loadVideos({
                results: r
            }, a)) : (this.store.dispatch(w.default.loadVideos({
                results: []
            }, a)), this.getSearchData(this.store.getState().searchConditions));
        }
    },
    agreeOrCancel: function(e) {
        var t = e.currentTarget.dataset.tvid, a = this.getVideo(t), i = a.isAgree, o = a.agreeCount;
        if (isNaN(o) || (i ? (a.agreeCount = parseInt(a.agreeCount, 0) - 1, this.hotFeedClickPingback({
            r_tivid: t,
            r_feedid: e.currentTarget.dataset.feedid,
            r_eventid: e.currentTarget.dataset.eventid,
            r_bkt: e.currentTarget.dataset.bkt,
            r_area: e.currentTarget.dataset.area,
            r_rank: e.currentTarget.dataset.rank,
            rseat: 10
        })) : (a.agreeCount = parseInt(a.agreeCount, 0) + 1, this.hotFeedClickPingback({
            r_tivid: t,
            r_feedid: e.currentTarget.dataset.feedid,
            r_eventid: e.currentTarget.dataset.eventid,
            r_bkt: e.currentTarget.dataset.bkt,
            r_area: e.currentTarget.dataset.area,
            r_rank: e.currentTarget.dataset.rank,
            rseat: 9
        }))), a.isAgree = !i, this.changeCurrentVideo(a, t, !0), a.isAgree ? this.clickPingback({
            rseat: "wx_shortchannel_like"
        }) : this.clickPingback({
            rseat: "wx_shortchannel_dislike"
        }), r.default.isLogin()) {
            var n = {
                authcookie: r.default.getAuthcookie(),
                agree: a.isAgree ? 1 : 0,
                device_id: r.default.getAnonymousUid(),
                wallId: a.wallId,
                feedId: a.feedId,
                sourceType: a.sourceType || "",
                owner: a.uid
            };
            g.agreeOrCancel(n);
        }
    },
    initState: function(e) {
        this.store.dispatch(w.default.init({}));
    },
    initVV: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, a = this.store.getState().channelInfos.curChannel.channelId, i = this.getVfrm(t, a), r = this.vvStorage || {};
        y.default.init({
            c1: a,
            ht: 0,
            r: e.tvId || "",
            aid: e.tvId || "",
            rfr: "",
            purl: "wx_shortchannel",
            vfrm: i,
            u: r.aUid,
            pu: r.uid,
            as: r.asArg,
            ve: r.ve
        });
    },
    getVfrm: function(e, t) {
        return "0-4-" + ({
            0: 1,
            22: 2,
            25: 3,
            6: 4
        }["" + t] || 0) + "-" + e;
    },
    retryLoadPage: function() {
        var e = this.store.getState().searchConditions;
        this.store.dispatch(w.default.showLoad()), this.getSearchData(e);
    },
    goToPlayVideo: function(e) {
        var t = e.currentTarget.dataset.tvid, a = (e.currentTarget.dataset.feedslen, e.detail.formId), i = e.currentTarget.dataset.rseat || "";
        (0, c.collectFormIdMuti)(a, i), this.hotFeedClickPingback({
            r_tivid: t,
            r_feedid: e.currentTarget.dataset.feedid,
            r_eventid: e.currentTarget.dataset.eventid,
            r_bkt: e.currentTarget.dataset.bkt,
            r_area: e.currentTarget.dataset.area,
            r_rank: e.currentTarget.dataset.rank,
            rseat: 8
        }), this._playVideo({
            aid: t,
            qipuId: t,
            vid: "",
            type: "notfilm"
        });
    },
    _playVideo: function(e) {
        wx.navigateTo({
            url: "/pages/video/video?qipuId=" + e.qipuId + "&aid=" + e.aid + "&rfr=wx_shortchannel"
        });
    },
    clickPingback: function(e) {
        var t = {
            rpage: "wx_shortchannel"
        };
        e.rseat ? t.rseat = e.rseat : e.block && (t.block = e.block, t.type = 21), s.default.send(t);
    },
    hotFeedPingback: function(e) {
        var t = this.store.getState().trackParams.pingback || {};
        e.r_eventid = t.event_id, e.r_bkt = t.bkt, e.r_area = t.area, d.default.send(e);
    },
    hotFeedClickPingback: function(e) {
        e.t = 20, d.default.send(e);
    },
    pageDisplayPingback: function() {
        var e = this.store.getState().trackParams.feeds, t = this;
        e && e.length > 0 && e.forEach(function(e, a) {
            var i = e.feedId, r = e.tvId;
            t.hotFeedPingback({
                r_rank: a,
                r_feedid: i,
                r_vidlist: r,
                t: 21
            });
        });
    },
    getRrankParam: function(e) {
        var t = null;
        return t = void 0 !== e ? e : (this.store.getState().trackParams.feeds || []).length, 
        Array.apply(null, {
            length: t
        }).map(Number.call, Number).toString();
    },
    loadVideo: function(e) {
        return this.store.dispatch(w.default.loadVideoPage(e));
    },
    onShow: function(e) {
        d.default.enterPage(), m.default.send({
            rpage: "wx_shortchannel"
        }), this.onShow.run ? this.vvStorage = {
            aUid: r.default.getAnonymousUid(),
            uid: r.default.getUid(),
            asArg: r.default.getAS(),
            ve: r.default.getWeid()
        } : this.onShow.run = !0;
    },
    onHide: function() {
        var e = d.default.leavePage();
        this.saveRecordTimer && clearTimeout(this.saveRecordTimer), this.hotFeedPingback({
            rtime: e,
            t: 22
        }), this.saveRecordTimer_online && (clearTimeout(this.saveRecordTimer_online), this.notCanPlayRecord_online = !1), 
        this.app.globalData.videoPageReLoad = !0;
    },
    onReady: function() {
        console.log("shortvideo ready");
    },
    setNavigationTitle: function(e) {
        var t = this.store.getState().playInfo;
        t.sourceName, t.albumName, t.shortTitle;
    }
}, a(i, "retryLoadPage", function() {
    this.loadPage();
}), a(i, "getPlayParam", function(e) {
    return {
        qipuId: e.tvId,
        vid: "",
        rate: this.store.getState().videoControl.rate
    };
}), a(i, "autoPlay", function() {
    var e = this;
    this.saveRecordTimer && (clearTimeout(this.saveRecordTimer), this.notCanPlayRecord = !1), 
    this.saveRecordTimer_online && (clearTimeout(this.saveRecordTimer_online), this.notCanPlayRecord_online = !1), 
    setTimeout(function() {
        e.canPlay() && (e.switchPlayVideo.switch = !1, e.player.play());
    }, 1e3);
}), a(i, "onShareAppMessage", function(e) {
    if (o.default.isObject(e) && "button" == e.from) {
        this.hotFeedClickPingback({
            r_tivid: e.target.dataset.tvid,
            r_feedid: e.target.dataset.feedid,
            r_eventid: e.target.dataset.eventid,
            r_bkt: e.target.dataset.bkt,
            r_area: e.target.dataset.area,
            r_rank: e.target.dataset.rank,
            rseat: 11
        });
        var t = e.target.dataset.tvid, a = this.getVideo(t), i = a.thumbnail ? a.thumbnail.replace(/_[\d]+_[\d]+(.jpg|bmp|gif)$/, "_480_360$1") : "";
        return {
            title: "" + a.tvTitle || "热点",
            desc: "轻松追剧，悦享品质",
            path: "pages/video/video?qipuId=" + t + "&id=" + t + "&rfr=wx_shortchannel",
            imageUrl: i
        };
    }
    return {
        title: "热点",
        desc: "轻松追剧，悦享品质",
        path: "pages/shortVideo/shortVideo?rfr=wx_shortchannel"
    };
}), a(i, "onPullDownRefresh", function() {
    var e = this, t = this.store.getState().searchConditions, a = this.store.getState().videos, i = a.isEmpty, r = (a.pageNum, 
    this.store.getState().load);
    if ("firstError" != r && "show" != r) {
        if (t.pageNum++, i) return wx.stopPullDownRefresh(), this.showFeedToast(0), void this.store.dispatch(w.default.errorLoad());
        this.clickPingback({
            rseat: "wx_shortchannel_down"
        }), t.action = 2, this.store.dispatch(w.default.changeCondition(t)), this.resetVideos(), 
        this.getSearchData(this.store.getState().searchConditions).then(function() {
            e.hotFeedPingback({
                rseat: "top_refresh",
                block: "O: 0281960040",
                t: 20
            });
        });
    }
}), a(i, "onReachBottom", function(e) {
    var t = this, a = this.store.getState().searchConditions, i = this.store.getState().videos, r = (i.isEmpty, 
    i.pageNum, this.store.getState().load);
    "firstError" != r && "show" != r ? (a.pageNum++, this.clickPingback({
        rseat: "wx_shortchannel_up"
    }), a.action = 1, this.store.dispatch(w.default.changeCondition(a)), this.resetVideos(), 
    this.getSearchData(this.store.getState().searchConditions).then(function() {
        t.hotFeedPingback({
            rseat: "bottom_refresh",
            block: "O: 0281960040",
            t: 20
        });
    })) : wx.stopPullDownRefresh();
}), a(i, "shareVideoFormId", function(e) {
    var t = e.detail.formId, a = e.currentTarget.dataset.rseat || "";
    (0, c.collectFormIdMuti)(t, a);
}), i);

Page(Object.assign({}, I, S, l.videoPlayer, h.default, f.default));