function t(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}

function e(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, r = e(require("../../common/pingback/pv")), a = e(require("../../common/user/user")), o = e(require("../../common/utils/util")), n = e(require("../../common/polyfill/promise")), s = e(require("../../common/pingback/click")), u = require("../../common/form/form"), d = require("../../components/player/VideoPlayer"), c = t(require("../../common/source/videoUtil")), l = e(require("../../components/videoLayout/videoLayout")), h = e(require("../../components/login/login")), f = e(require("../video/service/bindVV")), p = (e(require("../../components/searchLayout/bind/bindUtil")), 
e(require("../../common/login/index")), e(require("../../common/login/constant")), 
e(require("../video/common/config"))), v = t(require("../../common/form/subscribeService")), g = t(require("../../common/form/subscribeSession")), m = t(require("./service/liveBroadcast")), b = require("../../common/source/qiyiVideoSource"), S = require("../../common/source/videoConfig"), I = e(require("../../components/homeLead/homeLead")), y = e(require("../../components/mutiAccount/mutiAccount")), V = require("../../vendor/redux/redux"), T = e(require("../../vendor/redux-plugins/reduxTrunk")), q = e(require("./reducers/index")), L = e(require("./actions/index")), w = {
    app: getApp(),
    onLoad: function(t) {
        var e = this;
        a.default.init();
        var i = (0, V.combineReducers)(q.default);
        this.store = (0, V.createStore)(i, (0, V.applyMiddleware)(T.default)), this.store.subscribe(function() {
            e.setData(e.store.getState());
        }), this.player = new d.Player(this), this.setData({
            rfr: t.rfr || "",
            curpage: "wx_live",
            options: t,
            currentPages: I.default.currentPage()
        }), this.vvStorage = {
            aUid: a.default.getAnonymousUid(),
            uid: a.default.getUid(),
            asArg: a.default.getAS(),
            ve: a.default.getWeid()
        }, f.default.bind(this.player), this.bind();
        var r = t.qipuId;
        this.loadPage({
            qipuId: r
        }), this.store.dispatch(L.default.init({})), this.app.emitter.on("hideMutiDialog", this.hideMutiDialog);
    },
    onShow: function() {
        r.default.send({
            rpage: "wx_live"
        }), this.onShow.run ? this.vvStorage = {
            aUid: a.default.getAnonymousUid(),
            uid: a.default.getUid(),
            asArg: a.default.getAS(),
            ve: a.default.getWeid()
        } : this.onShow.run = !0;
        getCurrentPages();
        a.default.getAuthcookie() && !a.default.getUid() && this.getUserInfo({});
        var t = this.store.getState(), e = t.liveVideoInit.programInfo;
        if (!e) {
            return !1;
        }
        var i = t.serverTimeBias, o = new Date().getTime() - i, n = e.startTime, s = e.endTime, u = t.getLiveStatus, d = this.compareTime(o, n, s);
        u != d ? (1 == d && this.liveStatus(o, n, s), this.store.dispatch(L.default.liveStatus(d))) : 0 == u && this.initializeClock(n), 
        this.subscribeFlow();
    },
    onHide: function() {
        this.removeLiveArgs();
    },
    onUnload: function() {
        this.removeLiveArgs(), this.app.emitter.off("hideMutiDialog", this.hideMutiDialog);
    },
    retryLoadPage: function() {
        var t = this.data.options.qipuId;
        this.loadPage({
            qipuId: t
        });
    },
    removeLiveArgs: function() {
        clearInterval(this.timeinterval), clearInterval(this.countInterval);
    },
    compareTime: function(t, e, i) {
        return t < e ? 0 : t >= e && t < i ? 1 : 2;
    },
    loadPage: function(t) {
        var e = this, r = t.qipuId, a = this;
        this.loadTemplate(function() {
            return e.loadLiveVideo(r);
        }).then(function(t) {
            var n = t.programInfo, s = n.nowTime, u = n.startTime, d = n.endTime, c = new Date().getTime() - s;
            a.store.dispatch(L.default.getTimeBias(c)), a.isPanoFirst(n).then(function() {
                return a.liveStatus(s, u, d);
            }).then(function() {
                n.id, a.store.getState().getLiveStatus;
                e.player.emit("ready");
            }).catch(function(t) {
                n.id;
                var e = a.store.getState().getLiveStatus;
                "object" == (void 0 === e ? "undefined" : i(e)) && 0 == Object.keys(e).length && (e = a.compareTime(s, u, d), 
                a.store.dispatch(L.default.liveStatus(e)));
            }), a.subscribeFlow().then(function() {
                e.store.dispatch(L.default.completeLoad());
            }).catch(function(t) {
                (o.default.isObject(t) && "A00000" != t.code || t && void 0 === t.statusCode) && (g.clearThirdSession(), 
                e.retryCheckSubscribe(r));
            });
        }).catch(function(t) {});
    },
    subscribeFlow: function() {
        var t = this, e = this, i = this.store.getState().liveVideoInit.programInfo, r = i.nowTime, a = i.startTime, o = i.endTime, n = this.compareTime(r, a, o), s = i.id;
        return this.calculateCount(s, n), g.getOrSetThirdSession().then(function(e) {
            var i = t.getQipuList();
            return v.checkIfSubscribe(i, e);
        }).then(function(i) {
            var r = t.store.getState(), a = r.getLiveStatus, o = i.data, n = r.liveVideoInit.programInfo || {}, s = r.liveVideoInit.hot_lives || [];
            if (0 == a) {
                var u = o[0];
                n.subscribeStatus != u.isSubscribe && e.store.dispatch(L.default.changeVideoSubStatus(u.qipuId, u.isSubscribe, "program"));
            }
            s.length > 0 && s.forEach(function(t, i) {
                var r = o.find(function(e, i) {
                    return e.qipuId == t.id;
                });
                t.subscribeStatus != r.isSubscribe && e.store.dispatch(L.default.changeVideoSubStatus(r.qipuId, r.isSubscribe, "list"));
            });
        });
    },
    getQipuList: function() {
        var t = this.store.getState(), e = t.liveVideoInit.programInfo, i = t.liveVideoInit.hot_lives, r = [];
        return e && r.push(e.id), i && i.forEach(function(t, e) {
            r.push(t.id);
        }), r;
    },
    isPanoFirst: function(t) {
        var e = this;
        return new n.default(function(i, r) {
            return 2 == t.pano || 3 == t.pano || 4 == t.pano ? (e.store.dispatch(L.default.showError(e.getLiveError((0, 
            b.message)("miniLimit")))), r(!1)) : i(!0);
        });
    },
    loadLiveVideo: function(t) {
        return this.store.dispatch(L.default.loadLiveVideoPage(t));
    },
    loadTemplate: function(t) {
        var e = this;
        return this.store.dispatch(L.default.showLoad()), t().then(function(t) {
            return t;
        }, function() {
            return e.store.dispatch(L.default.errorLoad()), n.default.reject();
        });
    },
    clickPingback: function(t) {
        s.default.send({
            rpage: "wx_live",
            block: t.block,
            rseat: t.rseat
        });
    },
    subscribeSubmit: function(t) {
        this.clickPingback({
            block: "",
            rseat: "wx_player_book"
        });
        t.detail.formId;
        var e = t, i = t.currentTarget.dataset.subscribeDisabled, r = t.currentTarget.dataset.qipuId;
        if (i) return !1;
        this.store.dispatch(L.default.changeButtonStatus(r, !0)), this.subOrUnsubscribe(e);
    },
    subscribeType: function(t) {
        var e, i = t.toString().substr(-2);
        return "00" == i ? e = 1 : "11" == i ? e = 3 : "23" == i && (e = 2), e;
    },
    subOrUnsubscribe: function(t) {
        var e = this, i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], r = this, a = t.detail.formId;
        g.getOrSetThirdSession().then(function(n) {
            var s = t.currentTarget.dataset.subscribeStatus, u = t.currentTarget.dataset.subscribeArea, d = 0 == s ? 1 : 0, c = t.currentTarget.dataset.qipuId, l = r.subscribeType(c), h = r.data.options.aid, f = r.data.rfr;
            v.liveSubscribe({
                formid: a,
                key: n,
                qipuId: c,
                sendType: l,
                subscribeType: d,
                aid: h,
                rfr: f,
                area: u
            }).then(function(t) {
                var i = e.store.getState().subscribeCount;
                if (1 == d) {
                    "program" == u && e.store.dispatch(L.default.addCount(i + 1));
                    r = !0;
                } else if (0 == d) {
                    "program" == u && e.store.dispatch(L.default.minusCount(i - 1));
                    var r = !1;
                }
                e.store.dispatch(L.default.changeVideoSubStatus(c, r, u)), e.store.dispatch(L.default.changeButtonStatus(c, !1));
            }).catch(function(r) {
                if (e.store.dispatch(L.default.changeButtonStatus(c, !1)), i) return !1;
                (o.default.isObject(r) && "A00000" != r.code || r && void 0 === r.statusCode) && (g.clearThirdSession(), 
                e.retryLiveSubscribe(t, !0));
            });
        }).catch(function() {
            return n.default.reject();
        });
    },
    displayStream: function() {
        var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = arguments[1], r = this.store.getState().liveVideoInit.programInfo, o = {
            channelId: r.channelId,
            payMark: r.boss,
            qipuId: this.data.options.qipuId,
            aid: this.data.options.aid,
            hu: 0 == a.default.getVipType() ? -1 : 1,
            ra: e.bid
        };
        this.initVV(o, !0), void 0 !== i ? this.player.setUrl(i) : this.player.setUrl(e.url), 
        this.store.dispatch(L.default.setVideoModel()).then(function() {
            t.autoPlay();
        });
    },
    autoPlay: function() {
        var t = this, e = 1e3;
        o.default.os.isAndroid && (e = 3e3), setTimeout(function() {
            t.canPlay() && t.player.play();
        }, e);
    },
    chooseStreamFormat: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return t.sort(function(t, e) {
            return t.bid - e.bid;
        }), t;
    },
    chooseProperStream: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = t.find(function(t, e) {
            return 2 == t.bid;
        });
        return e || t[0];
    },
    initializeClock: function(t) {
        function e() {
            var e = o.default.time.countdownFormat(t, r);
            if (i.store.dispatch(L.default.showTime(e)), e.total <= 0) {
                clearInterval(i.timeinterval);
                var a = i.data.options.qipuId;
                i.loadPage({
                    qipuId: a
                });
            }
        }
        var i = this, r = this.store.getState().serverTimeBias;
        e(), this.timeinterval = setInterval(e, 1e3);
    },
    liveStatus: function(t, e, i) {
        var r = this, a = this, o = this.store.getState().liveVideoInit.programInfo, s = this.compareTime(t, e, i);
        if (this.store.dispatch(L.default.liveStatus(s)), 2 == s) return n.default.resolve(s);
        var u = {
            lc: o.channelId,
            lp: o.id
        };
        return m.getLiveSource(u).then(function(t) {
            t.data;
            var i = a.data.options.qipuId;
            r.store.dispatch(L.default.getLiveInterfaceInfo(t)), 0 == s ? r.initializeClock(e) : 1 == s && (r.setNavigationTitle(), 
            r.passBroadcast(t, i));
        }, function(t) {
            var e = a.store.getState().getLiveInterfaceInfo.data || {}, i = t.errorMessage || {};
            a.showLayerBeforeStart(e, {}, i);
        });
    },
    passBroadcast: function(t, e) {
        var i = t.data, r = this, a = i && i.streams, o = r.chooseStreamFormat(a);
        this.store.dispatch(L.default.getLiveStream(o));
        var n = r.chooseProperStream(o);
        0 == i.boss ? this.displayStream(n) : 2 == i.boss && m.getLiveAuthSource(n, e).then(function(t) {
            t.data && t.data.data, r.store.getState().getLiveInterfaceInfo.data;
            var e = n.url, i = t.header["Set-Cookie"], a = e + "&QY00001=" + r.getResHeaderParams(i, "QY00001") + "&t=" + t.data.data.t;
            r.displayStream(n, a);
        }).catch(function(t) {
            var e = r.store.getState().getLiveInterfaceInfo.data || {}, i = t.errorMessage || {};
            if (t && t.data) a = t.data; else var a = {};
            r.showLayerBeforeStart(e, a, i);
        });
    },
    isTennisVip: function(t) {
        var e = (t.program || {}).vipTypes;
        return o.default.isArray(e) && 1 == e[0];
    },
    showLayerBeforeStart: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        this.isPurchaseVipVideo(t, e) ? this.store.dispatch(L.default.showError(this.getLiveError({
            content: "vipckPurchaseFail"
        }, {
            contentA: "本直播为VIP付费直播",
            buttonText: "看看其他视频",
            buttonclick: S.goToIndex
        }), !0)) : this.isTicketVipVideo(t, e) ? this.store.dispatch(L.default.showError(this.getLiveError({
            content: "vipckTicketFail"
        }, {
            contentA: "本直播为VIP用券直播",
            buttonText: "看看其他视频",
            buttonclick: S.goToIndex
        }), !0)) : this.isCurrentVip(t) ? a.default.isLogin() ? a.default.isVip() ? this.store.dispatch(L.default.showError(this.getLiveError(i))) : a.default.isExpiredVip() ? this.store.dispatch(L.default.showError(this.getLiveError(i))) : this.store.dispatch(L.default.showError(c.getError({
            content: "vipckfail"
        }, {
            contentA: "本直播为VIP直播",
            contentB: "请开通VIP会员后观看"
        }), !0)) : this.store.dispatch(L.default.showError(c.getError({
            content: "anonymousLayer"
        }, {
            contentA: "本直播为VIP直播",
            contentB: "VIP用户请在登录后观看"
        }))) : this.isTennisVip(t) ? this.store.dispatch(L.default.showError(this.getLiveError((0, 
        b.message)("miniLimit")))) : i && "domestic" == i.content ? this.store.dispatch(L.default.showError(this.getLiveError({
            content: "domestic"
        }, {
            contentB: "您所在的地区暂时无法观看当前直播"
        }))) : this.store.dispatch(L.default.showError(this.getLiveError(i)));
    },
    loginSuccess: function() {
        var t = (this.store.getState().liveVideoInit.programInfo || {}).id;
        this.loadPage({
            qipuId: t
        });
    },
    isCurrentVip: function(t) {
        return t && t.program && 1 == t.program.payMark;
    },
    retryCheckSubscribe: function(t) {
        var e = this;
        this.subscribeFlow().then(function() {
            e.store.dispatch(L.default.completeLoad());
        }).catch(function() {});
    },
    retryLiveSubscribe: function(t, e) {
        this.subOrUnsubscribe(t, e);
    },
    getLiveError: function(t, e) {
        var i = c.getError(t, e);
        return i.buttonclick = i.buttonclick, i;
    },
    is6minVideo: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = {};
        return t.data && (e = t.data), e && e.prv && "1" == e.previewType || "1" == e.prv && "2" != e.previewType;
    },
    isPurchaseVipVideo: function(t, e) {
        return t.program && 2 == t.program.payMark || this.is6minVideo(e);
    },
    isTicketVipVideo: function(t, e) {
        return t.program && 3 == t.program.payMark || this.is6minVideo(e);
    },
    bind: function() {
        var t = this;
        this.player.on("refresh", function() {}), this.player.on("ended", function(e) {
            var i = t.data.options.qipuId;
            t.loadPage({
                qipuId: i
            });
        }), this.player.on("pause", function(t) {}), this.player.on("timeupdate", function(t) {}), 
        this.player.on("play", function(t) {});
    },
    getResHeaderParams: function(t, e) {
        var i, r = new RegExp("(.*)" + e + "=([^;]+);");
        return (i = t.match(r)) ? i[2] : "";
    },
    setNavigationTitle: function() {
        wx.setNavigationBarTitle({
            title: "正在直播"
        });
    },
    onShareAppMessage: function(t) {
        var e = this.store.getState(), i = e.getLiveStatus, r = e.liveVideoInit.programInfo;
        if (this.clickPingback({
            block: "",
            rseat: "wx_share"
        }), 1 == i) a = "正在直播：" + r.name; else var a = (0 == i ? "直播预约:" : "") + r.name;
        var o = this.data.options.aid || "", n = this.data.rfr || "", s = r.logo ? r.logo.replace(/_[\d]+_[\d]+(.jpg|bmp|gif)$/, "_480_360$1") : "";
        return {
            title: a,
            path: "/pages/liveVideo/liveVideo?qipuId=" + r.id + "&aid=" + o + "&rfr=" + n,
            imageUrl: s || ""
        };
    },
    onlineCount: function(t) {
        var e = this;
        v.refreshCount(t).then(function(i) {
            if ("string" == typeof i) {
                var r = new RegExp('(?:"' + t + '":)(\\d*)}'), a = i.match(r);
                e.store.dispatch(L.default.initCount(Number(a[1])));
            }
        }).catch(function() {
            e.store.dispatch(L.default.initCount("-"));
        });
    },
    refreshCount: function(t) {
        var e = this;
        this.countInterval = setInterval(function() {
            e.onlineCount(t);
        }, 6e5);
    },
    calculateCount: function(t, e) {
        0 == e ? this.store.dispatch(L.default.subscribeCount(t)) : (this.onlineCount(t), 
        1 == e && this.refreshCount(t));
    },
    jumpPage: function(t) {
        this.store.getState().getLiveStatus;
        var e = t.currentTarget.dataset.qipuId;
        5 == getCurrentPages().length ? wx.redirectTo({
            url: "/pages/liveVideo/liveVideo?qipuId=" + e + "&aid=&&rfr=wx_live"
        }) : wx.navigateTo({
            url: "/pages/liveVideo/liveVideo?qipuId=" + e + "&aid=&&rfr=wx_live"
        });
    },
    initVV: function(t) {
        var e = t.channelId, i = t.payMark, r = t.qipuId, a = t.aid, o = t.hu, n = t.ra, s = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], u = this.getVfrm(s), d = this.vvStorage || {};
        f.default.init({
            purl: "wx_live",
            c1: e || "",
            ht: i,
            r: r || "",
            aid: a || "",
            rfr: this.data.rfr || "",
            hu: o,
            ra: n,
            vfrm: u,
            u: d.aUid,
            pu: d.uid,
            as: d.asArg,
            ve: d.ve
        });
    },
    getVfrm: function(t) {
        var e = this.data.rfr || "", i = "0", r = "0";
        return r = e && p.default.rpageMap["" + e] ? p.default.rpageMap["" + e] : "7", i = t ? "3" : "1", 
        "0-" + r + "-0-" + i;
    },
    collectLiveShareForm: function(t) {
        var e = t.detail.formId, i = t.currentTarget.dataset.rseat || "";
        (0, u.collectFormIdMuti)(e, i);
    },
    hideMutiDialog: function() {
        this.setData({
            mutiDialogFlag: !1
        });
    }
};

Page(Object.assign({}, w, d.videoPlayer, l.default, h.default, I.default, y.default));