function e(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}

function t(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function i(e, t, i) {
    return t in e ? Object.defineProperty(e, t, {
        value: i,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = i, e;
}

var a = t(require("../../common/user/user")), o = t(require("../../common/utils/util")), r = t(require("../../common/polyfill/promise")), s = t(require("../../common/pingback/click")), n = t(require("../../common/pingback/block")), u = t(require("../../common/pingback/pingbackArgs")), l = require("../../components/player/VideoPlayer"), d = e(require("../../common/source/videoUtil")), c = t(require("../../components/videoLayout/videoLayout")), h = require("../../common/form/form"), p = e(require("../specialSubject/service/integralService")), f = e(require("service/videoService")), m = t(require("service/bindVV")), g = t(require("service/episode")), v = t(require("service/desc")), y = t(require("service/videoControl")), b = t(require("service/sourceEpisode")), T = t(require("service/sourceBestView")), I = t(require("service/hotDanceInfo")), k = (t(require("../../components/searchLayout/bind/bindUtil")), 
t(require("../../components/history/playRecordService"))), w = t(require("../../components/history/recordService")), _ = t(require("../../components/login/login")), S = t(require("../../components/comment/commentService")), V = t(require("../../components/subscribe/playSubService")), P = t(require("../../components/floatLayer/floatLayer")), R = t(require("../../components/mutiAccount/mutiAccount")), x = t(require("common/config")), q = require("common/commonService"), L = require("../../components/paopao/paopao"), A = t(require("../../components/player/acumulation")), C = t(require("../../components/homeLead/homeLead")), E = t(require("../../common/pingback/pv")), D = require("../../vendor/redux/redux"), N = t(require("../../vendor/redux-plugins/reduxTrunk")), M = t(require("./reducers/index")), U = t(require("./actions/index")), F = {
    getOptions: function(e) {
        var t = e.aid || "", i = a.default.getAuthcookie(), o = k.default.getRemoveRecordByAid(t, i, "aid") || null;
        return o && o.aid != o.id && "notfilm" != o.type ? (o.playTime >= o.duration && (o.playTime = 1), 
        i || (this.currentTime = o.playTime), {
            qipuId: o.qipuId,
            vid: o.vid,
            rfr: e.rfr || "",
            aid: o.aid || "",
            id: o.id
        }) : (this.currentTime = 1, e);
    },
    getNextVideoList: function() {
        var e = this.store.getState(), t = e.originPlayInfo.subType, i = e.videoList.videos;
        "album" == t && (i = o.default.storage.handleStorageMuti("get", "CUR_VIDEOLIST_VIDEOS") || e.videoList.videos);
        var a = this.getNextVideo(i, e.playInfo.qipuId);
        return a && "source" === e.originPlayInfo.subType && this.loadVideo(a.qipuId), a ? Object.assign({}, e.originPlayInfo, a) : a;
    },
    getNextRbView: function() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t = this.store.getState(), i = o.default.isObject(t.rbVideo) && o.default.isArray(t.rbVideo.videos) ? t.rbVideo.videos : [];
        this.getNextRbViewCount++;
        var a = this.getNextVideo(i, t.playInfo.qipuId);
        return this.isVideoLast(i, t.playInfo.qipuId) ? null : a || (e ? i[0] : null);
    },
    getNextRestView: function() {
        var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0], t = this.store.getState(), i = o.default.isObject(t.bestView) && o.default.isArray(t.bestView.videos) ? t.bestView.videos : [], a = this.getNextVideo(i, t.playInfo.qipuId);
        return this.isVideoLast(i, t.playInfo.qipuId) ? null : a || (e ? i[0] : null);
    },
    getNextVideo: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], t = arguments[1], i = o.default.isArray(e) && e.reduce(function(e, i) {
            return i.qipuId === t ? "current" : "current" === e ? i : e;
        }, null);
        return "current" === i ? null : i;
    },
    isCurrentVip: function(e) {
        return 1 == e.payMark;
    },
    checkAddShareAwards: function() {
        var e = this;
        if (!o.default.storage.handleStorageMuti("get", "SHARE_INTEGRAL")) return !1;
        var t = this.scoreAddParams("share_group");
        p.integralApi("score/add", t).then(function(t) {
            o.default.storage.handleStorageMuti("remove", "SHARE_INTEGRAL"), e.refreshIntegral(t, "share_group");
        }).catch(function() {});
    },
    isPurchaseVipVideo: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return d.is6minVideo(e) && 2 == t.payMark && "single" !== t.subType;
    },
    isTicketVipVideo: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return d.is6minVideo(e) && 3 == t.payMark && "single" !== t.subType;
    },
    loadMoreVideo: function() {
        var e = this, t = this.store.getState().episode.selectedTabIndex;
        return this.switchEpisode(t + 1).then(function() {
            return e.getNextVideoList();
        });
    },
    hasMore: function() {
        var e = this.store.getState(), t = e.playInfo.qipuId, i = e.videoList.videos || [];
        return i.length < e.videoList.total && i.slice(-1)[0].qipuId === t;
    },
    isVideoLast: function(e, t) {
        var i = e && e.length;
        return !(!e || !e[i - 1] || e[i - 1].qipuId != t);
    },
    scrollLeft: function() {
        var e = this.store.getState().playInfo;
        if ("source" === e.subType) this.store.dispatch(U.default.sourceScrollLeft(e.qipuId)); else if ("album" === e.subType) {
            var t = this.getactualPb();
            this.store.dispatch(U.default.pbScrollLeft(t));
        }
    },
    formatePlayRecord: function(e) {
        var t = e.sourceName || e.shortTitle, i = e.subType || "";
        if ("source" == i) if (e.isFeatureFilm) {
            var a = e.period + "";
            a && a.length >= 8 && (a = a.substring(4, 6) + "-" + a.substring(6) + "期"), t += a;
        } else t = e.shortTitle || e.videoName; else "single" == i && (t = e.shortTitle || e.videoName);
        return t;
    },
    getactualPb: function() {
        var e = this.store.getState(), t = e.playInfo, i = e.videoList.total, a = i - (e.videoList.videos && e.videoList.videos.length || i);
        return t.pd - a || 1;
    },
    savePlayRecord: function(e) {
        var t = this.store.getState(), i = t.playInfo || {}, a = t.tmtsInfo || {};
        this.savePlayRecordTimeout(i, e, a);
    },
    savePlayRecordTimeout: function(e, t, i) {
        var o = this;
        this.notCanPlayRecord || (this.notCanPlayRecord = !0, this.saveRecordTimer = setTimeout(function() {
            o.notCanPlayRecord = !1;
            var t = {};
            if (!o.savePlayRecordTimeout.remove) {
                o.savePlayRecordTimeout.remove = !0;
                var a = e.qipuId;
                (t = k.default.remove(a, "qipuId")) || (t = {
                    playTime: o.currentTime
                });
            }
            o.saveRecord(e, t, i);
        }, 5e3)), !this.notCanPlayRecord_online && a.default.isLogin() && (this.notCanPlayRecord_online = !0, 
        this.saveRecordTimer_online = setTimeout(function() {
            o.notCanPlayRecord_online = !1, o.uploadRecord(o.currentTime, null);
        }, 12e4));
    },
    saveRecord: function(e, t, i, o) {
        var r = this.formatePlayRecord(e), s = d.is6minVideo(i), n = this.duration || (s ? 360 : 0) || e.duration, u = (t.playTime == t.duration ? this.currentTime : t.playTime) || this.currentTime;
        u = u.toFixed ? u.toFixed(0) : u, k.default.save({
            id: e.qipuId,
            qipuId: e.qipuId,
            aid: e.sourceId || e.aid || e.qipuId,
            vid: e.vid,
            albumName: "single" != e.subType ? e.albumName : e.videoName || e.vn,
            sourceName: "single" != e.subType ? e.sourceName : e.videoName || e.vn,
            playTime: o ? n : u,
            duration: n,
            content: r,
            payMark: e.payMark,
            isExclusive: e.exclusive,
            isVip: e.isVip,
            imgUrl: e.imageUrl || e.albumImageUrl || "",
            date: Date.now(),
            type: "single" != e.subType ? "film" : "notfilm"
        }, a.default.isLogin());
    },
    loginSuccess: function() {
        var e = this.store.getState().playInfo.qipuId || "";
        this.loadPage({
            qipuId: e
        });
    },
    getTmtsError: function(e, t) {
        var i = d.getError(e, t);
        return i.buttonclick = i.buttonclick || this.playNext, i;
    },
    uploadRecord: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1, t = arguments[1];
        if (a.default.getAuthcookie()) {
            var i = this.app.globalData.systemInfo, o = this.store.getState().playInfo, r = [], s = Date.now() / 1e3, n = {
                terminalId: "32",
                tvId: o.qipuId || o.aid,
                addtime: s.toFixed ? s.toFixed(0) : s,
                videoPlayTime: e.toFixed ? e.toFixed(0) : e
            };
            r.push(n), r = JSON.stringify(r);
            var u = {
                version: i.version,
                os: "string" == typeof i.system ? i.system.split(" ")[1] : "",
                ua: i.model,
                ckuid: a.default.getAnonymousUid(),
                auth: a.default.getAuthcookie(),
                upload_records: r
            };
            w.default.uploadRecord(u).then(function(e) {
                "A00000" == e.code && t && t();
            }).catch(function(e) {});
        }
    },
    getRecord: function(e) {
        var t = this;
        if (!a.default.getAuthcookie()) return null;
        var i = this.store.getState().playInfo, o = {
            ckuid: a.default.getAnonymousUid(),
            auth: a.default.getAuthcookie(),
            tvId: i.qipuId
        };
        return new r.default(function(e, i) {
            w.default.getRecord(o).then(function(a) {
                if ("A00000" == a.code) {
                    var o = a.data.videoPlayTime || 0;
                    o && t.player.seek(o), e(o);
                } else i();
            }).catch(function(e) {
                i();
            });
        });
    },
    upvote: function(e) {
        var t = this, i = this.store.getState().videoComment, r = e.currentTarget.dataset, s = r.contentId, n = void 0 === s ? "" : s, u = r.agree, l = void 0 !== u && u, d = r.likes, c = void 0 === d ? 0 : d, h = c, p = o.default.storage.handleStorageMuti("get", "commentKeys") || [], f = l ? "wx_player_commentdislike" : "wx_player_commentlike";
        if (this.clickPingback({
            block: "wx_block_player_comment",
            rseat: f
        }), a.default.isLogin()) l ? (h = parseInt(c, 0) - 1, S.default.removeLikeComment(n).then(function(e) {
            t.store.dispatch(U.default.toggleCommentStatus(n, i, l, h));
        })) : (h = parseInt(c, 0) + 1, S.default.likeComment(n).then(function(e) {
            t.store.dispatch(U.default.toggleCommentStatus(n, i, l, h));
        })); else {
            if (l) {
                var m = p.indexOf(n);
                p.splice(m, 1), o.default.storage.handleStorageMuti("set", "commentKeys", p), h = parseInt(c, 0) - 1;
            } else h = parseInt(c, 0) + 1, p.push(n), p.length > 20 && p.splice(0, 1), o.default.storage.handleStorageMuti("set", "commentKeys", p);
            this.store.dispatch(U.default.toggleCommentStatus(n, i, l, h));
        }
    },
    shareInVideo: function(e) {
        var t = e.detail.formId, i = e.currentTarget.dataset.rseat || "";
        (0, h.collectFormIdMuti)(t, i);
    },
    saveSubscribe: function(e, t, o, r) {
        var s, n = this.formatePlayRecord(e), u = d.is6minVideo(o), l = this.duration || (u ? 360 : 0) || e.duration, c = (t.playTime == t.duration ? this.currentTime : t.playTime) || this.currentTime;
        c = c.toFixed ? c.toFixed(0) : c, V.default.save((s = {
            id: e.albumQipuId || e.tvid,
            qipuId: e.qipuId || e.tvid,
            tvId: e.tvid,
            albumQipuId: e.albumQipuId,
            channelId: e.cid,
            sourceId: e.sourceId,
            aid: e.sourceId || e.aid || e.qipuId,
            vid: e.vid,
            subType: this.checkVideoType(e.subType),
            subKey: e.aid
        }, i(s, "channelId", e.cid), i(s, "albumName", "single" != e.subType ? e.albumName : e.videoName || e.vn), 
        i(s, "sourceName", "single" != e.subType ? e.sourceName : e.videoName || e.vn), 
        i(s, "playTime", r ? l : c), i(s, "duration", l), i(s, "content", n), i(s, "imgUrl", e.albumImageUrl || e.imageUrl || ""), 
        i(s, "date", Date.now()), i(s, "type", "single" != e.subType ? "film" : "notfilm"), 
        i(s, "payMark", e.payMark), i(s, "exclusive", e.exclusive), i(s, "isVip", e.isVip), 
        i(s, "bossStatus", e.bossStatus), i(s, "videoDuration", e.duration), s), a.default.isLogin());
    },
    toHotDancePage: function(e) {
        this.clickPingback({
            block: "wx_block_player_rxbanner",
            rseat: "wx_player_rxbanner"
        });
        var t = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: "/" + t
        });
    }
}, O = {
    app: getApp(),
    onLoad: function(e) {
        var t = this;
        a.default.init(), A.default.init();
        var i = e || {};
        e = this.getOptions(e) || {};
        var o = (0, D.combineReducers)(M.default);
        this.store = (0, D.createStore)(o, (0, D.applyMiddleware)(N.default)), this.store.subscribe(function() {
            t.setData(t.store.getState());
        }), this.player = new l.Player(this), this.store.dispatch(U.default.initVideoLayout()), 
        this.setData({
            rfr: e.rfr || "",
            curpage: "wx_player",
            options: e,
            currentPages: C.default.currentPage(),
            originOptions: i
        }), this.seek.firstPlay = !1, this.vvStorage = {
            aUid: a.default.getAnonymousUid(),
            uid: a.default.getUid(),
            asArg: a.default.getAS(),
            ve: a.default.getWeid()
        }, m.default.bind(this.player), this.bind(), this.loadPage(e).then(this.scrollLeft), 
        this.app.emitter.on("hideMutiDialog", this.hideMutiDialog);
    },
    bind: function() {
        var e = this;
        this.player.on("refresh", function() {
            return e.retryLoadPage();
        }), this.player.on("ended", function() {
            var t = e.store.getState();
            e.showLayerWhenEnd(t.playInfo, t.tmtsInfo), e.saveRecord(t.playInfo, {}, t.tmtsInfo, !0);
        }), this.player.on("pause", function() {
            e.currentTime && !e.switchPlayVideo.switch && e.player.firstRun && e.uploadRecord(e.currentTime, null), 
            e.saveRecordTimer_online && (clearTimeout(e.saveRecordTimer_online), e.notCanPlayRecord_online = !1);
        }), this.player.on("timeupdate", function(t) {
            var i = t.detail.currentTime, o = e.store.getState().playInfo.albumQipuId;
            if (e.currentTime && !a.default.isLogin()) e.seek(); else if (a.default.isLogin() && i > 0 && (e.seek(), 
            218013601 == o && i > 0 && A.default.calcAcumulateTime(i, e, o), !e.player.firstRun)) {
                if (e.player.firstRun = !0, "single" == (0, q.getSubType)(e.store.getState().playInfo)) return void e.uploadRecord(-1, null);
                var r = e.getRecord(e.seek);
                r && r.then(function(t) {
                    e.uploadRecord(t, null);
                }, function(t) {
                    e.uploadRecord(-1, null);
                }).catch(function(e) {});
            }
            i > 0 && (e.currentTime = i, e.savePlayRecord(e.currentTime));
        });
    },
    rateWithDevice: function(e) {
        if (o.default.os.isAndroid) return e;
        var t;
        switch (o.default.storage.handleStorageMuti("get", "networkType")) {
          case "wifi":
            t = 4;
            break;

          case "4g":
            t = 2;
            break;

          default:
            t = 1;
        }
        return e != t && this.store.dispatch(U.default.setRate(t)), t;
    },
    iosActualRate: function(e) {
        var t = e.info || {}, i = e.rate, a = t && t.vd;
        if (i != a) this.store.dispatch(U.default.setRate(a)), this.store.dispatch(U.default.setRateList(e.info.vidl, !0, !1)); else {
            var o = this.store.getState().videoControl.rateList;
            this.store.dispatch(U.default.setRateList(e.info.vidl, !0, o[0].canPlay));
        }
    },
    showLayer: function(e) {
        var t = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "点击查看明细";
        this.store.dispatch(U.default.addFloatLayerTip(e, i)), setTimeout(function() {
            t.store.dispatch(U.default.hideFloatLayerTip(!0));
        }, 5e3);
    },
    refreshIntegral: function(e, t) {
        var i = e.data, a = o.default.isArray(i) && i[0] || {};
        if ("A0000" == a.code) {
            var r = "view_minutes" == t ? "观看视频达3分钟，获得" + a.score + "热血值" : "分享成功，获得" + a.score + "热血值";
            this.showLayer(r);
        }
    },
    scoreAddParams: function(e) {
        return {
            userId: a.default.getUid(),
            authCookie: a.default.getAuthcookie(),
            agentversion: this.app.globalData.agentversion,
            appver: this.app.globalData.agentversion,
            scoreType: 1,
            channelCode: e
        };
    },
    playVideo: function(e, t) {
        var i = this, a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        e.maCircleIds && e.maCircleIds.length > 2 && n.default.send({
            rpage: "wx_player",
            block: "wx_partstars"
        });
        var s = this.data.originPlayInfo.subType, u = this.store.getState().playInfo;
        return I.default.getHotDanceInfo().then(function(e) {
            e.Rx_ShowOn && e.valid_album_id == u.albumQipuId && n.default.send({
                rpage: "wx_player",
                block: "wx_block_player_rxbanner"
            }), i.store.dispatch(U.default.getHotDanceInfo(e));
        }), this.playVideo.first && (a ? this.player.pause() : (this.currentTime = 1, this.playVideo.first = !0)), 
        this.data.playInfo.albumQipuId && this.checkIsSubscribe(), this.initVV(e, t), this.store.dispatch(U.default.showLoading()), 
        "source" !== s && "album" !== s && this.getComments(), this.setNavigationTitle(u), 
        f.getVideoInfo(this.getPlayParam(e)).then(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return i.duration = e.info.duration, o.default.os.isAndroid ? i.store.dispatch(U.default.setRateList(e.info.vidl)) : i.iosActualRate(e), 
            i.store.dispatch(U.default.setVideoModel()).then(function() {
                return e;
            });
        }).then(function(e) {
            if (i.store.dispatch(U.default.tmtsInfo(e)), i.canPlay()) if (d.is6minVideo(e)) {
                i.store.dispatch(U.default.showLimit());
                var t = i.store.getState().videoControl || {};
                t.rate = 0, i.store.dispatch(U.default.changeRateState(t));
            } else i.store.dispatch(U.default.showVideo()), i.autoPlay(a);
            i.player.setUrl(e.src);
        }).then(function() {
            i.player.emit("ready");
        }, function(e) {
            var t = i.store.getState();
            return i.showLayerBeforeStart(t.playInfo, e.info, e), r.default.reject();
        });
    },
    getComments: function() {
        var e = this, t = this.store.getState().playInfo, i = t.tvid ? t.tvid : t.tvQipuId;
        S.default.getCommentSources(t.qipuId, i).then(function(t) {
            var i = t.comments, a = void 0 === i ? [] : i, o = t.inputBoxEnable, r = a.slice(0, 5);
            a.length > 0 ? (r.forEach(function(e, t) {
                e.likes = d.upvoteHandle(e.counterList.likes);
            }), e.setData({
                inputBoxEnable: o,
                isShowComment: !0
            }), e.store.dispatch(U.default.showComments(r)), n.default.send({
                rpage: "wx_player",
                block: "wx_block_player_comment"
            }), e.data.launchApp && n.default.send({
                rpage: "wx_player",
                block: "wx_block_player_allComments"
            })) : e.setData({
                isShowComment: !1
            });
        }).catch(function(t) {
            t && e.setData({
                isShowComment: !1
            });
        });
    },
    showLayerBeforeStart: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = arguments[2];
        this.isCurrentVip(e) ? a.default.isLogin() ? a.default.isVip() ? this.isPurchaseVipVideo(t, e) ? this.store.dispatch(U.default.showError(this.getTmtsError({
            content: "vipckPurchaseFail"
        }), !0)) : this.isTicketVipVideo(t, e) ? this.store.dispatch(U.default.showError(this.getTmtsError({
            content: "vipckTicketFail"
        }), !0)) : this.store.dispatch(U.default.showError(this.getTmtsError(i))) : this.store.dispatch(U.default.showError(d.getError({
            content: "vipckfail"
        }), !0)) : this.store.dispatch(U.default.showError(d.getError({
            content: "anonymousLayer"
        }))) : i.msg && "A02503" == i.msg.code ? this.isPurchaseVipVideo(t, e) ? this.store.dispatch(U.default.showError(this.getTmtsError({
            content: "vipckPurchaseFail"
        }), !0)) : this.isTicketVipVideo(t, e) && this.store.dispatch(U.default.showError(this.getTmtsError({
            content: "vipckTicketFail"
        }), !0)) : i.msg && "A02602" == i.msg.code ? 2 == e.payMark ? this.store.dispatch(U.default.showError(this.getTmtsError({
            content: "vipckPurchaseFail"
        }), !0)) : 3 == e.payMark ? this.store.dispatch(U.default.showError(this.getTmtsError({
            content: "vipckTicketFail"
        }), !0)) : e.payMark >= 4 && e.payMark <= 6 && this.store.dispatch(U.default.showError(this.getTmtsError({
            content: "miniLimit"
        }, {
            contentB: "小程序无法观看当前视频"
        }))) : this.store.dispatch(U.default.showError(this.getTmtsError(i)));
    },
    showLayerWhenEnd: function(e, t) {
        this.isPurchaseVipVideo(t, e) ? this.store.dispatch(U.default.showError(this.getTmtsError({
            content: "vipckPurchaseFail"
        }), !0)) : this.isTicketVipVideo(t, e) ? this.store.dispatch(U.default.showError(this.getTmtsError({
            content: "vipckTicketFail"
        }), !0)) : this.isCurrentVip(e) ? a.default.isLogin() ? a.default.isVip() ? this.playNext() : this.store.dispatch(U.default.showError(d.getError({
            content: "vipckfail"
        }), !0)) : this.store.dispatch(U.default.showError(d.getError({
            content: "anonymousLayer"
        }))) : this.playNext();
    },
    playNext: function() {
        var e = this, t = this.store.getState();
        (this.hasMore() ? this.loadMoreVideo() : r.default.resolve(this.getNextVideoList())).then(function(i) {
            return i || ("source" === t.playInfo.subType ? e.getNextRestView() : e.getNextRbView());
        }).then(function(t) {
            e.switchPlayVideo(t, !0);
        });
    },
    switchPlayVideo: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        this.switchPlayVideo.switch = !0, A.default.init(), t ? this.uploadRecord(0, null) : this.uploadRecord(this.currentTime, null), 
        this.player.firstRun = !1, this.seek.firstPlay = !1;
        var i = this.store.getState();
        if (!e) return this.currentTime = 0, void this.player.seek(0);
        this.saveRecordTimer && (clearTimeout(this.saveRecordTimer), this.notCanPlayRecord = !1), 
        this.saveRecordTimer_online && (clearTimeout(this.saveRecordTimer_online), this.notCanPlayRecord_online = !1), 
        e.issueTime && e.issueTime.length > 10 && (e.issueTime = e.issueTime.substring(0, 10)), 
        this.store.dispatch(U.default.setPlayInfo(e)), this.currentTime = 1, this.playVideo(e, t), 
        "album" == e.subType && i.episode && i.episode.isshow && this.openEpisode();
    },
    loadPage: function(e) {
        var t = this, i = e.qipuId;
        return this.loadTemplate(function() {
            return t.loadVideo(i);
        }).then(function(e) {
            return t.playVideo(e, !0);
        });
    },
    loadTemplate: function(e) {
        var t = this;
        return this.store.dispatch(U.default.showLoad()), e().then(function(e) {
            var i = e.aid ? e.aid : e.qipuId, a = {
                biz_id: "102",
                biz_params: {
                    biz_sub_id: "101",
                    biz_params: "aid=" + i + "&tvid=" + e.qipuId + "&ctype=0&pc=0",
                    biz_dynamic_params: "",
                    biz_extend_params: "screenMode=1&openType=",
                    biz_statistics: ""
                }
            }, r = "aid=" + i + "&tvid=" + e.qipuId, s = o.default.os.isAndroid ? r : a;
            return t.setData({
                pluginParams: o.default.string.schemaStr(s, "player", "472")
            }), t.store.dispatch(U.default.completeLoad()), o.default.storage.handleStorageMuti("set", "VIDEO_PAGE_URL", e.videoUrl), 
            1 == C.default.currentPage() && n.default.send({
                rpage: "wx_player",
                block: "wx_block_player_home"
            }), t.data.launchApp && n.default.send({
                rpage: "wx_player",
                block: "wx_block_player_launchApp"
            }), e;
        }, function() {
            return t.store.dispatch(U.default.errorLoad()), r.default.reject();
        });
    },
    initVV: function(e) {
        var t = e.cid, i = e.channelId, a = e.bossMixer, o = e.qipuId, r = e.aid, s = e.albumQipuId, n = e.albumId, u = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], l = this.getVfrm(u), d = this.vvStorage || {}, c = void 0 !== this.data.originOptions.vfm ? {
            vfm: this.data.originOptions.vfm
        } : {};
        m.default.init(Object.assign({
            c1: t || i || "",
            ht: a ? 1 : 0,
            r: o || "",
            aid: s || n || r || "",
            rfr: this.data.rfr || "",
            vfrm: l,
            u: d.aUid,
            pu: d.uid,
            as: d.asArg,
            ve: d.ve
        }, c));
    },
    getVfrm: function(e) {
        var t = this.store.getState().playInfo.subType, i = this.data.rfr || "", a = "0", o = "0";
        return e ? this.getVfrm.run ? (a = "single" != t ? "2" : "4", o = "2") : (this.getVfrm.run = !0, 
        a = "3", o = i && x.default.rpageMap["" + i] ? x.default.rpageMap["" + i] : "2") : (a = "1", 
        o = "2"), "0-" + o + "-0-" + a;
    },
    clickPingback: function(e) {
        s.default.send({
            rpage: "wx_player",
            block: e.block,
            rseat: e.rseat
        });
    },
    loadVideo: function(e) {
        return this.store.dispatch(U.default.loadVideoPage(e));
    },
    onShow: function(e) {
        var t = u.default.vfmInPath("pages/video/video");
        E.default.send(Object.assign({
            rpage: "wx_player"
        }, t));
        var i = this.app.globalData;
        this.setData({
            launchApp: 1036 == i.showScene
        }), this.onShow.run ? this.vvStorage = {
            aUid: a.default.getAnonymousUid(),
            uid: a.default.getUid(),
            asArg: a.default.getAS(),
            ve: a.default.getWeid()
        } : this.onShow.run = !0;
        var o = this.store.getState();
        if (o.playInfo && o.playInfo.qipuId && a.default.getAuthcookie()) {
            var r = o.playInfo.qipuId || "";
            a.default.getUid() ? i.videoPageReLoad && !i.showshare && this.loadPage({
                qipuId: r
            }) : this.getUserInfo({});
        }
        this.checkAddShareAwards();
    },
    onUnload: function() {
        o.default.storage.handleStorageMuti("remove", "CUR_VIDEOLIST_VIDEOS"), this.app.emitter.off("hideMutiDialog", this.hideMutiDialog);
    },
    launchAppError: function() {
        wx.navigateTo({
            url: "/subPackage/pages/clientGuide/clientGuide?rfr=wx_player"
        });
    },
    onHide: function() {
        this.saveRecordTimer && (clearTimeout(this.saveRecordTimer), this.notCanPlayRecord = !1), 
        this.saveRecordTimer_online && (clearTimeout(this.saveRecordTimer_online), this.notCanPlayRecord_online = !1);
    },
    onReady: function() {},
    setNavigationTitle: function(e) {
        var t = this.store.getState().playInfo, i = t.sourceName, a = t.albumName, o = t.shortTitle;
        "single" != t.subType ? wx.setNavigationBarTitle({
            title: i || a || o
        }) : wx.setNavigationBarTitle({
            title: o || i || a
        });
    },
    retryLoadPage: function() {
        this.loadPage(this.store.getState().playInfo);
    },
    playVideoAlbum: function(e) {
        var t = this.store.getState(), i = e.currentTarget.dataset.qipuId, a = t.rbVideo.videos.reduce(function(e, t) {
            return e || (t.qipuId === i ? t : e);
        }, null);
        this.switchPlayVideo(a);
    },
    getPlayParam: function(e) {
        return {
            qipuId: e.qipuId,
            vid: e.vid,
            rate: this.store.getState().videoControl.rate
        };
    },
    autoPlay: function(e) {
        var t = this;
        this.saveRecordTimer && (clearTimeout(this.saveRecordTimer), this.notCanPlayRecord = !1), 
        this.saveRecordTimer_online && (clearTimeout(this.saveRecordTimer_online), this.notCanPlayRecord_online = !1);
        var i = 1e3;
        if (o.default.os.isAndroid && this.app.globalData.systemInfo.system && !this.autoPlay.run) {
            var a = /Android (\d)[\.]+/.exec(this.app.globalData.systemInfo.system);
            this.autoPlay.run = !0, (a && a[1] && a[1] < 5 || -1 != this.app.globalData.systemInfo.model.indexOf("vivo")) && (i = 4e3);
        } else o.default.os.isAndroid && e && (i = 3e3);
        setTimeout(function() {
            t.canPlay() && (t.switchPlayVideo.switch = !1, t.player.play());
        }, i);
    },
    seek: function(e) {
        if ((!this.currentTime || this.currentTime <= 1) && (this.seek.firstPlay = !0), 
        !this.seek.firstPlay && this.currentTime > 1) {
            this.seek.firstPlay = !0;
            var t = this.store.getState().tmtsInfo || {};
            d.is6minVideo(t) && (this.currentTime = 0), this.player.seek(this.currentTime);
        }
    },
    screenChangeHandle: function() {},
    onShareAppMessage: function(e) {
        var t = this.store.getState().playInfo, i = t.qipuId, r = (t.shortTitle, t.vid), s = t.vt, n = t.desc, u = (t.albumName, 
        t.sourceName, t.sourceId), l = t.aid, d = t.imageUrl, c = t.albumQipuId, h = u || l;
        this.app.globalData.showshare = !0;
        var p = d ? d.replace(/_[\d]+_[\d]+(.jpg|bmp|gif)$/, "_480_360$1") : "";
        return {
            title: this.getShareTitle(t),
            desc: s || n || "轻松追剧，悦享品质",
            path: "/pages/video/video?qipuId=" + i + "&id=" + h + "&vid=" + r + "&rfr=wx_article",
            imageUrl: p || "",
            success: function(e) {
                a.default.isLogin() && 218013601 == c && o.default.storage.handleStorageMuti("set", "SHARE_INTEGRAL", !0);
            }
        };
    },
    getShareTitle: function(e) {
        var t = e.subType, i = (e.sourceName, e.albumName), a = e.shortTitle, o = e.isFeatureFilm, r = e.pd, s = e.videoName, n = "";
        switch (t) {
          case "source":
            n = o ? i + ":" + a : a;
            break;

          case "movie":
            n = a || i;
            break;

          case "album":
            n = i && r ? i + "第" + r + "集" : a;
            break;

          default:
            n = a || s;
        }
        return n || "爱奇艺视频";
    },
    onPullDownRefresh: function() {},
    containerTap: function() {
        var e = this.store.getState().videoControl;
        (void 0 === e ? {} : e).showRate && this.store.dispatch(U.default.switchRate());
    },
    goCircle: function(e) {
        (0, L.openPaopao)(e);
        var t = void 0 !== e.currentTarget.dataset.circleId ? "wx_stars3" : "wx_starup";
        this.clickPingback({
            block: "wx_partstars",
            rseat: t
        });
    },
    checkVideoType: function(e) {
        var t;
        switch (e) {
          case "album":
            t = 1;
            break;

          case "source":
            t = 2;
            break;

          case "movie":
            t = 7;
            break;

          case "live":
            t = 9;
            break;

          default:
            t = 1;
        }
        return t;
    },
    collectVideo: function(e) {
        var t = this, i = this.store.getState(), o = i.playInfo, r = i.tmtsInfo, s = o.albumQipuId, n = o.sourceId, u = o.tvid, l = f ? "wx_player_cancelcollection" : "wx_player_collection", d = e.detail.formId, c = e.currentTarget.dataset, p = (c.albumId, 
        c.channelId), f = c.isCollect, l = f ? "wx_player_cancelcollection" : "wx_player_collection", m = "", g = o.subType, v = this.checkVideoType(g), b = f ? "已取消收藏" : "收藏成功，可在“我的页面”查看";
        1 == v ? m = s : 2 == v && (m = n), 7 == v && (m = u);
        var T = f ? "https://subscription.iqiyi.com/dingyue/api/unsubscribe.action" : "https://subscription.iqiyi.com/dingyue/api/subscribe.action";
        this.clickPingback({
            block: "",
            rseat: l
        }), a.default.isLogin() ? y.default.collectAlbum(v, m, p, T).then(function(e) {
            e && (t.setData({
                isCollect: !f,
                toastTitle: b,
                showToast: !0
            }), setTimeout(function() {
                t.setData({
                    showToast: !1
                });
            }, 3e3));
        }).catch(function(e) {
            t.setData({
                toastTitle: "网络异常，请重试",
                showToast: !0
            }), setTimeout(function() {
                t.setData({
                    showToast: !1
                });
            }, 3e3);
        }) : (f ? V.default.remove(m) : this.saveSubscribe(o, {}, r, !0), this.setData({
            isCollect: !f,
            toastTitle: b,
            showToast: !0
        }), setTimeout(function() {
            t.setData({
                showToast: !1
            });
        }, 3e3), V.default.get()), (0, h.collectFormIdMuti)(d, l);
    },
    joinClient: function(e) {
        var t = e.currentTarget.dataset.launchType, i = "banner" == t ? "wx_block_player_launchApp" : "wx_block_player_allComments", a = "banner" == t ? "wx_player_launchApp" : "wx_player_allComments";
        this.clickPingback({
            block: i,
            rseat: a
        });
    },
    checkIsSubscribe: function() {
        var e = this, t = this.data.playInfo, i = t.cid, o = t.albumQipuId, r = t.tvid, s = t.sourceId, n = this.checkVideoType(t.subType);
        this.setData({
            videoType: n
        });
        var u = "";
        1 == n ? u = o : 2 == n && (u = s), 7 == n && (u = r);
        a.default.isLogin() ? y.default.collectAlbum(n, u, i, "https://subscription.iqiyi.com/dingyue/api/isSubscribed.action", !0).then(function(t) {
            t ? e.setData({
                isCollect: !0
            }) : e.setData({
                isCollect: !1
            });
        }, function(t) {
            (t.code = "A00001") && e.setData({
                isCollect: !1
            });
        }) : V.default.getIndex(t.albumQipuId) > -1 ? this.setData({
            isCollect: !0
        }) : this.setData({
            isCollect: !1
        });
    },
    hideMutiDialog: function() {
        this.setData({
            mutiDialogFlag: !1
        });
    }
};

Page(Object.assign({}, F, O, l.videoPlayer, g.default, v.default, c.default, y.default, b.default, T.default, _.default, C.default, P.default, R.default));