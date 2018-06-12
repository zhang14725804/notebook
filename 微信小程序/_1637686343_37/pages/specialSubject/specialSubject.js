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

var i = e(require("../../common/pingback/pv")), a = e(require("../../common/user/user")), r = e(require("../../common/polyfill/promise")), o = e(require("../../common/utils/util")), s = e(require("../../components/searchLayout/bind/bindUtil")), n = e(require("../../common/pingback/click")), d = e(require("../../components/login/login")), c = t(require("service/voteService")), u = t(require("../video/service/videoService")), l = t(require("service/integralService")), h = require("../../components/player/VideoPlayer"), f = e(require("../../components/videoLayout/videoLayout")), p = t(require("../../common/source/videoUtil")), g = e(require("../../components/player/broadcastProcess")), v = require("../../components/paopao/paopao"), m = t(require("../../components/paopao/paopaoService")), y = e(require("../../components/player/acumulation")), V = e(require("../video/service/bindVV")), w = e(require("../../components/floatLayer/floatLayer")), b = require("../../common/form/form"), k = e(require("../../components/mutiAccount/mutiAccount")), S = require("../../vendor/redux/redux"), P = e(require("../../vendor/redux-plugins/reduxTrunk")), T = e(require("./reducers/index")), I = e(require("./actions/index")), A = {
    app: getApp(),
    onLoad: function(t) {
        var e = this;
        a.default.init(), y.default.init();
        var i = (0, S.combineReducers)(T.default);
        this.store = (0, S.createStore)(i, (0, S.applyMiddleware)(P.default)), this.store.subscribe(function() {
            e.setData(e.store.getState());
        }), this.player = new h.Player(this), this.selectedOid = "", this.curVideo = 0, 
        this.setData({
            curpage: "wx_dance",
            options: t,
            hasJoined: !1,
            selectedOid: "",
            btnDisabled: !1
        }), this.bind(), this.app.emitter.on("afterLogoutSuccess", this.logoutHandler), 
        this.app.emitter.on("afterLoginSuccess", this.loginHandler), this.setData({
            loginStatus: a.default.isLogin()
        }), this.loadPage(), this.lastAuthcookie = a.default.getAuthcookie(), this.checkLoginStatus = !0, 
        this.playingInfo = {}, this.vvStorage = {
            aUid: a.default.getAnonymousUid(),
            uid: a.default.getUid(),
            asArg: a.default.getAS(),
            ve: a.default.getWeid()
        }, V.default.bind(this.player);
        this.app.emitter.on("showMutiAfterWechatwx_dance", this.showMutiDialogByWechat), 
        this.app.emitter.on("hideMutiDialog", this.hideMutiDialog);
    },
    logoutHandler: function() {
        this.checkLoginStatus = !0, this.initVoteStatus(), this.setData({
            loginStatus: !1,
            currentIntegral: ""
        }), y.default.init();
    },
    loginHandler: function() {
        this.checkLoginStatus = !1, this.setData({
            loginStatus: !0,
            currentIntegral: ""
        });
    },
    initVV: function(t) {
        var e = t.cid, i = t.channelId, a = t.bossMixer, r = t.qipuId, o = t.albumId, s = (arguments.length > 1 && void 0 !== arguments[1] && arguments[1], 
        this.vvStorage || {});
        V.default.init({
            c1: e || i || "",
            ht: a ? 1 : 0,
            r: r || "",
            aid: o || "",
            rfr: this.data.rfr || "",
            vfrm: "",
            u: s.aUid,
            pu: s.uid,
            as: s.asArg,
            ve: s.ve,
            purl: "wx_dance"
        });
    },
    onShow: function() {
        var t = this;
        i.default.send({
            rpage: "wx_dance"
        }), !a.default.getAuthcookie() || a.default.getUid() || this.data.mutiDialogFlag || this.getUserInfo({}), 
        this.onShow.run ? (this.getScoreInfo().then(function() {
            t.checkAddShareAwards();
        }).catch(function() {
            t.checkAddShareAwards();
        }), !0 === this.checkLoginStatus && this.setData({
            loginStatus: a.default.isLogin()
        }), this.curAuthcookie = a.default.getAuthcookie(), this.curAuthcookie != this.lastAuthcookie && (this.lastAuthcookie = this.curAuthcookie, 
        this.initVoteStatus(), this.getTaskStatus()), this.formatLoadPageData(this.data.pageDataInit)) : this.onShow.run = !0;
    },
    onHide: function() {
        this.data.mutiDialogFlag && this.player.pause();
    },
    onUnload: function() {
        this.app.emitter.off("showMutiAfterWechatwx_dance", this.showMutiDialogByWechat), 
        this.app.emitter.off("afterLogoutSuccess", this.logoutHandler), this.app.emitter.off("afterLoginSuccess", this.loginHandler), 
        this.app.emitter.off("hideMutiDialog", this.hideMutiDialog);
    },
    initVoteStatus: function() {
        var t = this.data.pageDataInit.cards, e = [];
        o.default.isArray(t) && t.forEach(function(t) {
            e.push({
                hasJoined: !1,
                disabled: !1,
                selectedOid: {}
            });
        }), this.setData({
            btnStatus: e
        });
    },
    playNext: function() {
        this.curVideo = this.curVideo < this.playVideos.length - 1 ? ++this.curVideo : 0, 
        this.playVideo();
        var t = this.playVideos[this.curVideo];
        this.store.dispatch(I.default.editPlayInfo(t)), this.store.dispatch(I.default.showBeforePlayPic());
    },
    bind: function() {
        var t = this;
        this.player.on("ended", function(e) {
            y.default.init();
            var i = t.store.getState(), a = i.playInfo;
            if (t.isLiveVideo(a)) return !1;
            t.showLayerWhenEnd(a, i.tmtsInfo);
        }), this.player.on("timeupdate", function(e) {
            var i = e.detail.currentTime, a = t.playVideos[t.curVideo].albumId;
            1 == t.data.loginStatus && 218013601 == a && i > 0 && y.default.calcAcumulateTime(i, t, a);
        }), this.player.on("play", function(e) {
            t.data.mutiDialogFlag || t.store.dispatch(I.default.hideBeforePlayPic());
        });
    },
    filterVideoCards: function(t) {
        return this.filterCardFunc(t, 2).filterCard.forEach(function(e, i) {
            var a = [];
            a = o.default.isArray(e.videos) && e.videos.filter(function(t) {
                return t.imageUrl = t.imageUrl ? t.imageUrl : "/resource/images/list-livevideo-list-bg.png", 
                t.mainTitle;
            }), e.videos = a;
            var r = t.indexOf(e);
            r > -1 && t.splice(r, 1, e);
        }), t;
    },
    sortByOrder: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = o.default.isObject(t) && t.cards, i = [];
        return i = o.default.isArray(e) && e.sort(function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return parseInt(t.order) - parseInt(e.order);
        }), t.cards = i, t;
    },
    formatLoadPageData: function(t) {
        var e = this, i = o.default.isObject(t) ? t.cards : [], s = this.filterCardFunc(i, 4).filterCard;
        if (!o.default.isArray(s)) return r.default.resolve(t);
        var n = [];
        s.forEach(function(t) {
            n.push(t.voteId);
        });
        var d = {
            vids: n.join(",")
        };
        return a.default.isLogin() && (d.uid = a.default.getUid()), c.getVotes(d).then(function(t) {
            var a = e.data.btnStatus;
            return s.forEach(function(r, s) {
                var n = t.data, d = o.default.isArray(n) ? n[s] : {}, c = e.formatVoteData(d, r);
                r.voteData = c;
                var u = i.indexOf(r);
                u > -1 && i.splice(u, 1, r), a[u].selectedOid = c;
            }), e.setData({
                btnStatus: a
            }), t.cards = i, t;
        }).catch(function() {
            return t;
        });
    },
    isFirstView: function() {
        o.default.storage.handleStorageMuti("get", "SPECIAL_VIEWED") ? this.store.dispatch(I.default.showBeforePlayPic()) : (o.default.storage.handleStorageMuti("set", "SPECIAL_VIEWED", !0), 
        this.store.dispatch(I.default.hideRules(!1)), this.store.dispatch(I.default.hideVideo()), 
        this.setData({
            enableScroll: !1
        }), this.player.pause());
    },
    loadPage: function() {
        var t = this;
        this.loadTemplate().then(function(e) {
            t.setData({
                load: "complete"
            });
            var i = [];
            return (e = t.sortByOrder(e)).cards.forEach(function(t) {
                i.push({
                    hasJoined: !1,
                    disabled: !1,
                    selectedOid: {}
                }), 5 == t.type && (t.feeds = o.default.isArray(t.feeds) && t.feeds.filter(function(t, e) {
                    return !!t.description && o.default.isArray(t.picList) && t.picList.length > 0;
                })), 1 == t.type && o.default.isArray(t.videos) && t.videos.forEach(function(t) {});
            }), t.setData({
                btnStatus: i
            }), t.isFirstView(), t.formatLoadPageData(e);
        }).then(function(e) {
            var i = e.cards;
            t.filterCardFunc(i, 4).filterCard;
            t.getScoreInfo(), t.getTaskStatus(), t.videoCardInit(i).then(function() {}).catch(function() {}), 
            e.cards = t.filterVideoCards(i);
            var a = t.filterCardFunc(i, 6).filterCard || [];
            ("string" == typeof a[0].starCircleIds ? a[0].starCircleIds.split(",") : []).length > 2 && m.getPaopaoList().then(function(e) {
                var i = a[0].starCircleIds || "", r = e.atoken;
                m.getPaopaoBaseInfo(r, i).then(function(e) {
                    var i = (0, v.filterPaopaoStar)(e, !1);
                    t.store.dispatch(I.default.initPaopao(i));
                }, function() {});
            }).catch(function(t) {});
        }).catch(function(e) {
            t.setData({
                load: "error"
            });
        });
    },
    formatVoteData: function(t, e) {
        return t.childs = t.childs && o.default.isArray(t.childs) ? t.childs : [], t.childs.forEach(function(e) {
            e.options = o.default.isArray(e.options) ? e.options : [], e.options.forEach(function(e) {
                e.percentage = Math.floor(e.showNum / t.showJoinTimes * 100), 1 == e.todayHasJoined && (t.hasJoinedVoteData = !0);
            });
        }), t;
    },
    formatVideoData: function(t) {
        return t.videos = t.videos && o.default.isArray(t.videos) ? t.videos : [], t.videos.forEach(function(t) {
            t.imageUrl = t.imageUrl ? s.default.editePic(t.imageUrl, "_480_270") : "";
        }), t;
    },
    loadTemplate: function() {
        return this.setData({
            load: "nomore"
        }), this.store.dispatch(I.default.loadSpecialPage());
    },
    videoCardInit: function(t) {
        var e = this.filterCardFunc(t, 1).filterCard;
        if (this.formatVideoData(e[0]), e.length < 0) return !1;
        this.playVideos = o.default.isArray(e[0].videos) && e[0].videos || [];
        var i = o.default.isObject(this.playVideos[this.curVideo]) ? this.playVideos[this.curVideo] : {};
        return this.store.dispatch(I.default.editPlayInfo(i)), this.initVV(i), this.isLiveVideo(i) ? this.playLiveVideo(i, I.default) : this.playVideo();
    },
    isLiveVideo: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return !0 === t.isLive || !0 === t.isPaidLive;
    },
    playVideo: function() {
        var t = this, e = o.default.isObject(this.playVideos[this.curVideo]) ? this.playVideos[this.curVideo] : {}, i = e.qipuId, a = e.albumId;
        return i ? u.getVideoInfo({
            qipuId: i,
            albumId: a,
            rate: 2
        }).then(function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = t.store.getState().hideRules;
            return t.store.dispatch(I.default.setSubjectVideoModel(i)).then(function() {
                return e;
            });
        }).then(function(e) {
            t.store.dispatch(I.default.tmtsInfo(e)), t.canPlay() && (p.is6minVideo(e) ? (t.store.dispatch(I.default.hideBeforePlayPic()), 
            t.store.dispatch(I.default.showLimit())) : t.autoPlayVideo()), t.player.setUrl(e.src);
        }).then(function() {
            t.player.emit("ready");
        }, function(e) {
            var i = t.store.getState();
            return t.showVideoLayerBeforeStart(i.playInfo, e.info, e), r.default.reject();
        }) : r.default.resolve(!1);
    },
    openBannerLink: function(t) {
        var e = t.currentTarget.dataset, i = e.bannerType, a = e.bannerUrl;
        if (this.clickPingback({
            rseat: "wx_dance_banner"
        }), 0 == !!a) return !1;
        if (1 == i) {
            a = "/" === a.slice(0, 1) ? a : "/" + a;
            var r = [ "pages/home/home", "pages/shortVideo/shortVideo", "pages/library/library", "pages/my/my", "pages/specialSubject/specialSubject" ].filter(function(t) {
                return a.indexOf(t) > -1;
            });
            o.default.isArray(r) && r.length > 0 ? wx.switchTab({
                url: a
            }) : wx.navigateTo({
                url: a
            });
        } else 2 == i && wx.navigateTo({
            url: "/subPackage/pages/webview/webview?webviewSrc=" + a
        });
    },
    joinVote: function(t) {
        var e = this;
        if (this.clickPingback({
            rseat: "wx_dance_votecard"
        }), !a.default.isLogin()) return this.login(), !1;
        var i = {}, r = [], o = this.data.btnStatus || [], s = t.currentTarget.dataset.cardOrder, n = o[s].selectedOid || {}, d = n.childs[0].vcId, u = t.currentTarget.dataset.voteOid;
        t.currentTarget.dataset.voteIndex;
        r.push(u), i[d] = r;
        var h = {
            appid: 6,
            vid: n.voteid,
            authcookie: a.default.getAuthcookie(),
            options: JSON.stringify(i)
        };
        c.joinVote(h).then(function(t) {
            var i = o[s].selectedOid.childs[0].options, a = i.findIndex(function(t) {
                return t.oid == u;
            }), r = e.scoreAddParams("vote_topic");
            l.integralApi("score/add", r).then(function(t) {
                e.refreshIntegral(t, "vote_topic");
            }), i[a].showNum = i[a].showNum + 1, i[a].todayHasJoined = !0, n.childs[0].options = i, 
            n.showJoinTimes = n.showJoinTimes + 1, n.showJoinUsersCount = n.showJoinUsersCount + 1, 
            n.hasJoinedVoteData = !0, -1 != n.remainVotesToday && (n.remainVotesToday = n.remainVotesToday - 1 == -1 ? 0 : n.remainVotesToday - 1), 
            n = e.formatVoteData(n), o[s] = {
                hasJoined: !0,
                disabled: !1,
                selectedOid: n
            }, e.setData({
                btnStatus: o
            });
        }, function(t) {
            wx.showToast({
                icon: "none",
                title: t.msg || "投票失败，请重试"
            });
        });
    },
    clickPingback: function(t) {
        n.default.send({
            rpage: "wx_dance",
            block: t.block,
            rseat: t.rseat
        });
    },
    loginSuccess: function() {
        this.store.dispatch(I.default.hideVideo()), this.setData({
            loginStatus: !0
        }), this.loadPage();
    },
    filterCardFunc: function(t, e) {
        var i = [], a = -1;
        return i = o.default.isArray(t) && t.filter(function(t, i) {
            return t.type == e && (a = i), t.type == e;
        }), {
            filterCard: i,
            ind: a
        };
    },
    autoPlayVideo: function() {
        var t = this, e = 1e3;
        if (o.default.os.isAndroid && this.app.globalData.systemInfo.system && !this.autoPlay.run) {
            var i = /Android (\d)[\.]+/.exec(this.app.globalData.systemInfo.system);
            this.autoPlay.run = !0, (i && i[1] && i[1] < 5 || -1 != this.app.globalData.systemInfo.model.indexOf("vivo")) && (e = 3e3);
        } else o.default.os.isAndroid && (e = 2e3);
        setTimeout(function() {
            t.canPlay() && t.player.play();
        }, e);
    },
    gotoLogin: function() {
        this.clickPingback({
            rseat: "wx_dance_login"
        }), this.login();
    },
    sign: function() {
        var t = this;
        if (this.clickPingback({
            rseat: "wx_dance_register"
        }), !a.default.isLogin()) return this.login(), !1;
        var e = this.scoreAddParams("sign_dance_2");
        l.integralApi("score/add", e).then(function(e) {
            t.refreshIntegral(e, "sign_dance_2", !0);
        }).catch(function(t) {
            wx.showToast({
                icon: "none",
                title: "签到失败，请重试"
            });
        });
    },
    changeOptionData: function(t, e) {},
    onShareAppMessage: function(t) {
        if ("button" == t.from) {
            var e = "vote" == t.target.dataset.shareType ? "wx_dance_voteshare" : "wx_dance_share";
            this.clickPingback({
                rseat: e
            });
        }
        return {
            title: "做任务赢热血值，《热血街舞团》总决赛门票等你来抢！",
            imageUrl: "http://statics-web.iqiyi.com/h5/wechat/images/hxjwt_share.jpeg",
            path: "/pages/specialSubject/specialSubject",
            success: function(t) {
                a.default.isLogin() && o.default.storage.handleStorageMuti("set", "SHARE_FRIEND_INTEGRAL", !0);
            }
        };
    },
    refreshIntegral: function(t, e) {
        var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], a = t.data, r = o.default.isArray(a) && a[0] || {};
        if ("A0000" == r.code) {
            var s = this.scoreTextType(e, r.score);
            this.showLayer(s);
            var n = this.store.getState().pageDataInit || {}, d = o.default.isArray(n.cards) && n.cards || [], c = (this.filterCardFunc(d, 4).filterCard, 
            this.data, this.data[e]);
            if (o.default.isObject(c)) {
                var u = {
                    processCount: c.processCount + 1
                };
                u[e] = Object.assign({}, c, u);
                var l = this.data.currentIntegral + r.score;
                this.setData(Object.assign({}, u, {
                    currentIntegral: l
                }));
            }
        } else i && wx.showToast({
            icon: "none",
            title: r.message
        });
    },
    scoreTextType: function(t, e) {
        switch (t) {
          case "share_friend":
          case "share_group":
            return "分享成功，获得" + e + "热血值";

          case "sign_dance_2":
            return "签到成功，获得" + e + "热血值";

          case "vote_topic":
            return "投票成功，获得" + e + "热血值";

          case "view_minutes":
            return "观看视频达3分钟，获得" + e + "热血值";

          default:
            return "";
        }
    },
    checkAddShareAwards: function() {
        var t = this;
        if (!o.default.storage.handleStorageMuti("get", "SHARE_FRIEND_INTEGRAL")) return !1;
        var e = this.scoreAddParams("share_friend");
        l.integralApi("score/add", e).then(function(e) {
            o.default.storage.handleStorageMuti("remove", "SHARE_FRIEND_INTEGRAL"), t.refreshIntegral(e, "share_friend");
        }).catch(function() {});
    },
    getTaskParams: function() {
        return {
            userId: a.default.getUid(),
            authCookie: a.default.getAuthcookie(),
            agentversion: this.app.globalData.agentversion,
            appver: this.app.globalData.agentversion
        };
    },
    scoreAddParams: function(t) {
        return {
            userId: a.default.getUid(),
            authCookie: a.default.getAuthcookie(),
            agentversion: this.app.globalData.agentversion,
            appver: this.app.globalData.agentversion,
            scoreType: 1,
            channelCode: t
        };
    },
    getTaskStatus: function() {
        var t = this, e = this.getTaskParams();
        if (a.default.isLogin()) return l.integralApi("task/list", e).then(function(e) {
            var i = o.default.isArray(e.data) && e.data[0];
            o.default.isArray(i) && i.forEach(function(e) {
                var i = {}, a = {
                    processCount: e.processCount,
                    limitPerDay: e.limitPerDay
                };
                i[e.channelCode] = a, t.setData(i);
            });
        });
    },
    getScoreInfo: function() {
        var t = this, e = {
            userId: a.default.getUid(),
            authCookie: a.default.getAuthcookie(),
            agentversion: this.app.globalData.agentversion,
            appver: this.app.globalData.agentversion
        };
        return a.default.isLogin() ? l.integralApi("user/info", e).then(function(e) {
            var i = e.data, a = o.default.isArray(i) && i[0];
            return t.setData({
                currentIntegral: a.totalScore
            }), i;
        }).catch(function(t) {
            return t;
        }) : r.default.resolve(!0);
    },
    openPaopaoFeed: function(t) {
        var e = t.currentTarget.dataset.feedId, i = t.currentTarget.dataset.sourceType;
        this.clickPingback({
            rseat: "wx_dance_ppfeed"
        });
        var a = {
            PIC: 1,
            VIDEO: 8,
            LONGPIC: 9
        }, r = "";
        switch (i) {
          case a.PIC:
            r = "detail-normal";
            break;

          case a.VIDEO:
            r = "detail-video";
            break;

          case a.LONGPIC:
            r = "detail-long";
            break;

          default:
            r = "";
        }
        wx.navigateToMiniProgram({
            appId: "wxba59214d98c13a15",
            path: "pages/feedPack/pages/detail/" + r + "?feedid=" + e
        });
    },
    goCircle: function(t) {
        var e = t.currentTarget.dataset.clickRseat ? "wx_dance_pptitle" : "wx_dance_ppstar";
        this.clickPingback({
            rseat: e
        }), (0, v.openPaopao)(t);
    },
    closeDialog: function() {
        this.store.dispatch(I.default.hideRules(!0)), this.store.getState().videoLayout.videoFlowPlay || (this.store.dispatch(I.default.showVideo()), 
        this.player.play()), this.setData({
            enableScroll: !0
        });
    },
    showDialog: function(t) {
        this.store.dispatch(I.default.hideRules(!1)), this.store.dispatch(I.default.hideVideo()), 
        this.setData({
            enableScroll: !1
        }), this.player.pause();
    },
    showLayer: function(t) {
        var e = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "点击查看明细";
        this.store.dispatch(I.default.addFloatLayerTip(t, i)), setTimeout(function() {
            e.store.dispatch(I.default.hideFloatLayerTip(!0));
        }, 5e3);
    },
    naviToVideoPage: function(t) {
        var e = t.currentTarget.dataset.qipuId;
        this.clickPingback({
            rseat: "wx_dance_vedio"
        }), wx.navigateTo({
            url: "/pages/video/video?qipuId=" + e + "&rfr=wx_channel"
        });
    },
    showVideoLayerBeforeStart: function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = arguments[2];
        this.isCurrentVip(t) ? a.default.isLogin() ? a.default.isVip() ? this.isPurchaseVipVideo(e, t) ? this.store.dispatch(I.default.showError(this.getTmtsError({
            content: "vipckPurchaseFail"
        }), !0)) : this.isTicketVipVideo(e, t) ? this.store.dispatch(I.default.showError(this.getTmtsError({
            content: "vipckTicketFail"
        }, {
            buttonText: "看看其他视频"
        }), !0)) : this.store.dispatch(I.default.showError(this.getTmtsError(i))) : this.store.dispatch(I.default.showError(p.getError({
            content: "vipckfail"
        }), !0)) : this.store.dispatch(I.default.showError(p.getError({
            content: "anonymousLayer"
        }))) : i.msg && "A02503" == i.msg.code ? this.isPurchaseVipVideo(e, t) ? this.store.dispatch(I.default.showError(this.getTmtsError({
            content: "vipckPurchaseFail"
        }), !0)) : this.isTicketVipVideo(e, t) && this.store.dispatch(I.default.showError(this.getTmtsError({
            content: "vipckTicketFail"
        }, {
            buttonText: "看看其他视频"
        }), !0)) : i.msg && "A02602" == i.msg.code ? this.isPurchaseVipVideo(e, t) ? this.store.dispatch(I.default.showError(this.getTmtsError({
            content: "vipckPurchaseFail"
        }), !0)) : this.isTicketVipVideo(e, t) && this.store.dispatch(I.default.showError(this.getTmtsError({
            content: "vipckTicketFail"
        }, {
            buttonText: "看看其他视频"
        }), !0)) : this.store.dispatch(I.default.showError(this.getTmtsError(i)));
    },
    showLayerWhenEnd: function(t, e) {
        this.isPurchaseVipVideo(e, t) ? this.store.dispatch(I.default.showError(this.getTmtsError({
            content: "vipckPurchaseFail"
        }), !0)) : this.isTicketVipVideo(e, t) ? this.store.dispatch(I.default.showError(this.getTmtsError({
            content: "vipckTicketFail"
        }, {
            buttonText: "看看其他视频"
        }), !0)) : this.isCurrentVip(t) ? a.default.isLogin() ? a.default.isVip() ? this.playNext() : this.store.dispatch(I.default.showError(p.getError({
            content: "vipckfail"
        }), !0)) : this.store.dispatch(I.default.showError(p.getError({
            content: "anonymousLayer"
        }))) : this.playNext();
    },
    getTmtsError: function(t, e) {
        var i = p.getError(t, e);
        return i.buttonclick = i.buttonclick || this.playNext, i;
    },
    isCurrentVip: function(t) {
        return t.isVip;
    },
    isPurchaseVipVideo: function() {
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).isPaid;
    },
    isTicketVipVideo: function() {
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).isCoupon;
    },
    retryLoadPage: function() {
        this.loadPage();
    },
    getFormId: function(t) {
        var e = t.detail.formId, i = t.currentTarget.dataset.rseat || "";
        (0, b.collectFormIdMuti)(e, i);
    },
    switchMutiSuccess: function() {},
    showMutiDialogByWechat: function() {
        this.store.dispatch(I.default.hideVideo()), this.setData({
            enableScroll: !1
        }), this.player.pause();
    },
    hideMutiDialog: function() {
        this.store.dispatch(I.default.showVideo()), this.setData({
            enableScroll: !0,
            mutiDialogFlag: !1
        }), this.player.play();
    }
};

Page(Object.assign({}, A, d.default, f.default, g.default, h.videoPlayer, w.default, k.default));