var t = require("../../WechatAppPlayer/index"), e = require("../../module/dataset/history/index"), i = require("../../module/login"), o = require("../../module/cache"), a = require("../../module/es6-promise"), n = require("./player-ui-state"), s = require("./player-proxy"), r = require("../../module/boss")(), d = wx.getSystemInfoSync().system.match(/android/i), p = {};

wx.getSystemInfo({
    success: function(t) {
        p = t;
    }
});

module.exports = {
    data: {
        tvp: {
            posterImage: "",
            url: "",
            isad: !0,
            contentid: -1,
            reportUrl: "",
            state: "stop",
            iswifi: !0,
            preview: !1,
            context: 1,
            videoError: "",
            progressBaseTime: 0,
            progressSkipTime: 0,
            progressTime: 0,
            progressDuration: 0,
            unicom: !1,
            hidePlayer: !1,
            vipText: "",
            isvip: !1,
            canPayVip: d
        }
    },
    onNavigate: function(t) {
        var e = this, i = t.query.vid;
        i && setTimeout(function() {
            var o = a.defer(), n = e.$take("player-isvip"), s = a.defer();
            e.$put("player-videodetail-defer", s), e.$put("player-videocontext-defer", o), e.tvpSetVid(i, {
                query: a.resolve(t.query),
                videoContext: o.promise,
                videodetail: s.promise,
                isvip: n,
                recommend: decodeURIComponent(t.query.parentParams || ""),
                additional: t.query.additional || ""
            });
        }, 0);
    },
    onLoad: function() {
        var e = this;
        this.playerLoaded = !0;
        var i = this.$take("player-onnavigate-player");
        i && (this.video = i, this.__bindVideoEvent()), this.videoContext = wx.createVideoContext("tvp"), 
        this.playerVidDetailDefer = this.$take("player-videodetail-defer");
        var o = this.$take("player-videocontext-defer");
        o && o.resolve(this.videoContext), t.on("report", function(t) {
            e.$setData("tvp", {
                reportUrl: t.reportUrl
            });
        }), this.videoState = n({
            stop: {
                afterLeave: function() {
                    e.onTvpStart && e.onTvpStart();
                }
            },
            playing: {
                afterEnter: function(t) {
                    console.log("播放ui进入播放状态, 播放context:", {
                        context: e.data.tvp.context,
                        url: e.data.tvp.url[e.data.tvp.context]
                    }), "initialize" != t && "stop" != t && e.playVideoContext();
                },
                afterLeave: function() {
                    console.log("播放ui离开播放状态, 播放context:"), e.playVideoContext(-1);
                }
            },
            end: {
                beforeEnter: function() {
                    e.data.tvp.preview || e.onTvpPlayNext() || e.__destroyVideo();
                },
                afterEnter: function() {
                    e.$setData("tvp", {
                        url: ""
                    });
                }
            },
            error: {
                afterEnter: function() {
                    e.onTvpError && e.onTvpError(), e.$setData("tvp", {
                        url: ""
                    });
                }
            }
        }).onChange(function(t, i) {
            console.info("playerstatechange " + i + " => " + t), "initialize" != t && e.$setData("tvp", {
                state: t
            }), ("limit" == t && (5 == e.data.tvp.payStatus || 6 == e.data.tvp.payStatus) || "stop" == t && e.data.tvp.preview && e.data.tvp.iswifi || "end" == t && e.data.tvp.preview) && r.expose("pay-intro-btn");
        });
    },
    onUnload: function() {
        this.__destroyVideo();
    },
    onHide: function() {
        e.sync(), t.saveState(), this.tvpGoBackground();
    },
    onShow: function() {
        var e = this;
        this.tvpLeaveBackground(), t.restoreState(), this.goneVip && i.getVipInfo(function(t, i) {
            i.iStatus && (e.tvpSetVid(null), e.refresh());
        }), this.goneVip = !1;
    },
    tvpGoBackground: function() {
        this.videoState && "playing" == this.videoState.state && this.videoState.setState("background");
    },
    tvpLeaveBackground: function() {
        this.videoState && "background" == this.videoState.state && this.videoState.setState("playing");
    },
    __destroyVideo: function() {
        this.playVideoContext(-1), this.video && setTimeout(function() {
            e.sync();
        }, 300), this.video && this.video.stop(), this.video = null;
    },
    __bindVideoEvent: function() {
        var t = this;
        this.$setData("tvp", this.video.playData || {}), this.video.on("playdatachange", function() {
            console.log("playdatachange", t.video.playData), t.$setData("tvp", t.video.playData), 
            t.data.isShareOpen && !o.get("adtip_notfirst") && t.video.playData.isad && -1 != t.video.playData.progressSkipTime && (t.setData({
                showAdTips: !0
            }), o.set("adtip_notfirst", !0), setTimeout(function() {
                t.hideAdTips();
            }, 5e3));
        }), this.video.on("error", function(e) {
            t.$setData("tvp", {
                videoError: e.message + "(" + (e.code || "L") + ")"
            });
        }), this.video.on("plugin-hdlist-render", function(e) {
            t.$setData("tvp", {
                formats: e
            });
        }), this.video.on("plugin-danmu-data", function(e) {
            t.$setData("tvp", {
                DMIsOpen: e.DMIsOpen,
                useDanmu: e.useDanmu
            });
        }), this.video.on("plugin-layer", function(e, i) {
            console.log("on layer:", e), e && t.videoState.setState(e, {
                force: !0
            }), t.$setData("tvp", i);
        }), this.video.on("statechange", function(e) {
            if (e != t.videoState.state) switch (console.info("videostatechange " + t.videoState.state + " => " + e), 
            e) {
              case "ready":
                break;

              case "ended":
                t.videoState.setState("end");
                break;

              case "playing":
                t.videoState.setState("playing");
                break;

              case "error":
                t.videoState.setState("error");
            }
        });
    },
    __createVideo: function() {
        console.log("__createVideo start", Date.now());
        var t = s.apply(null, arguments);
        this.playerLoaded ? (this.video = t, this.__bindVideoEvent()) : this.$put("player-onnavigate-player", t);
    },
    playVideoContext: function(t) {
        console.log("playVideoContext", t, this.data.tvp.url), -1 == t ? (this.pauseByProgram = !0, 
        this.videoContext.pause(), this.feedsVideoContext && this.feedsVideoContext.pause()) : "feeds" == t ? (this.videoContext.pause(), 
        this.feedsVideoContext && this.feedsVideoContext.play()) : (this.videoContext.play(), 
        this.feedsVideoContext && this.feedsVideoContext.pause());
    },
    switchDefn: function(t) {
        var e = this;
        this.switchingDefn = t, this.waitSeek = a.resolve(this.currentTime), this.video.switchDefn(t).catch(function(t) {
            e.showToast({
                title: "切换失败了...\n" + t.code
            });
        }), o.set("userdefn", t, 2592e5, !0);
    },
    tvpSetVid: function(t) {
        var e = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = i.autoplay, n = i.isNextPlay, s = i.defn;
        console.log("tvpSetVid start", Date.now()), console.log("player.js tvpSetVid", arguments);
        var r = function() {
            if (t) {
                if (!i.videodetail) throw new Error("需要传入vid详情");
                e.__createVideo(t, {
                    detail: i.videodetail,
                    isvip: i.isvip || a.resolve(e.data.tvp.isvip),
                    videoContext: i.videoContext || a.resolve(e.videoContext),
                    pageQuery: i.query || a.resolve({})
                }, {
                    recommend: i.recommend || "",
                    additional: i.additional || "",
                    autoplay: o,
                    isNextPlay: n,
                    cid: i.cid,
                    defn: s
                });
            }
            o && e.video.start();
        };
        this.video ? t != this.video.vid && (this.videoState.setState("initialize"), this.__destroyVideo(), 
        clearTimeout(this.setVidTimer), this.setVidTimer = setTimeout(r, 180)) : r();
    },
    payVip: function(t) {
        if (d) {
            var e = t.currentTarget.dataset.aid;
            this.$route("vip?aid=V0$$4:" + e + "&vid=" + (this.data.currentVideo.vid || "") + "&cid=" + (this.data.cid || "")), 
            this.goneVip = !0;
        } else this.$route("vipflow");
    },
    tvpStartPlay: function() {
        console.log("player/index.js:", "startPlay", !!this.video);
        try {
            this.video.start();
        } catch (t) {}
    },
    tvpDisplay: function(t) {
        t || "hidden" == this.videoState.state ? t && "hidden" == this.videoState.state && this.videoState.setState(this.videoState.lastState, {
            force: !0
        }) : (this.videoState.setState("hidden"), this.$setData("feeds", {
            isPlayerHidden: !0
        }));
    },
    __onTvpError: function(t) {
        if (console.error("tvp err", t), -1 != +t.currentTarget.dataset.contentid && -1 == t.detail.errMsg.indexOf("updateVideoPlayer")) try {
            this.video.onContentError(0, new Error(t.detail.errMsg));
        } catch (t) {}
    },
    __onTvpPlay: function(t) {
        console.info("tvp play", t);
        try {
            this.video.onContentPlay(0);
        } catch (t) {}
    },
    __onTvpPause: function(t) {
        console.info("tvp pause", t), this.pauseByProgram = !1;
        try {
            this.video.onContentPause(0);
        } catch (t) {}
    },
    __onTvpTimeupdate: function(t) {
        var e = this;
        this.data.tvp.duration - t.detail.currentTime < 1 && (this.pauseByProgram = !0, 
        setTimeout(function() {
            e.pauseByProgram = !1;
        }, 500));
        try {
            this.$setData("tvp", {
                progressTime: Math.floor(t.detail.currentTime),
                state: this.data.tvp.state
            }), this.video.onContentTimeupdate(0, t.detail.currentTime);
        } catch (t) {}
    },
    __onTvpEnded: function(t) {
        console.info("tvp end", t);
        try {
            this.video.onContentEnd(0);
        } catch (t) {}
    },
    __onTvpSkip: function(t) {
        this.video.onContentSkip(0);
    },
    hideAdTips: function() {
        this.setData({
            showAdTips: !1
        });
    }
};