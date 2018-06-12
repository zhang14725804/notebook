function e(e) {
    return e ? (e.cid && 11 == e.cid.length && !e.vid && (e.vid = e.cid, e.cid = ""), 
    e.cid = e.cid || "", e.vid = e.vid || "", e.lid = e.lid || "", e.doShare = e.doShare || "", 
    e.additional = e.additional || "", e.parentParams = decodeURIComponent(e.parentParams || ""), 
    e) : {};
}

function t(e) {
    if (e && e.q && !e.cid && !e.vid && !e.lid) {
        var t = decodeURIComponent(e.q).split("?"), i = t[0], a = t[1] || "";
        if (/\/play\.html$/.test(i)) return d.extend({}, e, d.queryParse(a));
        var o = i.match(/\/x\/cover\/\w\/(\w+)\.html$/);
        if (o) return e = d.extend({}, e, d.queryParse(a)), e.cid = o[1], e;
    }
    return e;
}

function i(e, t) {
    var i, a, o;
    return Object.keys(t).every(function(d) {
        var r = t[d].findIndex(e);
        return !r || (i = d, a = r.item, o = r.index, !1);
    }), a ? {
        key: i,
        video: a,
        index: o
    } : null;
}

var a = require("../../module/page"), o = require("../../module/es6-promise"), d = require("../../module/fns"), r = require("../../module/onview"), n = require("../../module/recreport"), l = require("../../module/boss")({
    app: "tinyapp",
    module: "play"
}), s = require("./model/videodatamap-model"), c = require("./model/coverdatamap-model"), u = require("./model/currentvideo-model"), v = require("../../module/dataset/history/index"), h = require("./data/detail"), p = require("./data/history"), y = require("./data/vip");

a("play", {
    comps: [ require("../../comps/player/index"), require("../../comps/toast/index")(), require("../../comps/topbar/topbar")(), require("../../comps/comment/index")(), require("../../comps/feeds/index")(), require("../../comps/recommend/index")(), require("../../comps/playdesc/index")(), require("../../comps/qqloginmodal/index.js")() ],
    fetchData: function(t) {
        var i = {};
        return (t = e(t)).cid && (i.cid = t.cid), t.vid && (i.vid = t.vid), t.lid && (i.lid = t.lid), 
        console.info("fetchdata start"), p(i).then(function(e) {
            if (console.log("play.js fetch start", Date.now()), e = e || [], t.cid) for (var a = 0; a < e.length; a++) if (e[a].cid == t.cid) {
                i.historyVid = e[a].vid;
                break;
            }
            return o.all([ h(i), y(i), e ]);
        });
    },
    onNavigate: function(e) {
        var i = this.fetchData(t(e.query));
        this.$put("player-isvip", i.then(function(e) {
            return e[1];
        })), this.$put("play-detail", i);
    },
    lastQuery: null,
    refresh: function() {
        this.onLoad();
    },
    onReady: function() {
        this._doShare && (this.doShare(), this._doShare = 0);
    },
    onLoad: function(a) {
        var d = this;
        a = t(a), this._doShare = a && a.doShare, console.log("play.js onload", a, Date.now()), 
        o.resolve().then(function() {
            return a = !a || a.target ? d.lastQuery : e(a), d.lastQuery = a, a;
        }).then(function(e) {
            return d.setData({
                pageError: !1
            }), wx.getSystemInfo({
                success: function(e) {
                    var t = e.system;
                    parseInt(t.replace(/^[a-zA-Z]*\s*/, "")) <= 8 && /ios/i.test(t) && d.setData({
                        modLayerAnimation: !0
                    });
                }
            }), e;
        }).then(function(e) {
            return d.currentVideoModel = new u(), d.currentVideoModel.onChange(function(t) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                d.setData({
                    currentVideo: t.video,
                    currentVideoKey: t.key
                }), d.tvpSetVid(t.video.vid, {
                    videodetail: o.resolve(t.video),
                    cid: d.data.cid || e.cid || "",
                    isvip: y(e),
                    recommend: d.lastQuery.parentParams,
                    additional: d.lastQuery.additional,
                    query: o.resolve(e),
                    autoplay: !1,
                    isPlayNext: i.isplaynext
                }), d.videoDataMapModel[t.key].locate(t.index);
            }), e;
        }).then(function(e) {
            return e.vid && d.playerVidDetailDefer && d.currentVideoModel.onChange(function(e) {
                d.playerVidDetailDefer.resolve(e.video);
            }, !0), e;
        }).then(function(e) {
            return d.$take("play-detail") || d.fetchData(e);
        }).then(function(e) {
            d.videoDataMapModel = {}, d.coverDataMapModel = {};
            var t = {
                history: e[2],
                isvip: e[1],
                videodetail: e[0]
            };
            if (console.log("isvip:", t.isvip), console.log("videodetail result", t.videodetail), 
            0 != t.videodetail.errCode) {
                var i = new Error("fetch video detail failed: ");
                throw i.code = "B." + (t.videodetail.msg || t.videodetail.errCode), i;
            }
            return t;
        }).then(function(e) {
            var t = e.videodetail, i = e.isvip;
            e.history;
            return Object.keys(t.videoDataMap || {}).forEach(function(e) {
                d.videoDataMapModel[e] = s(e, t.videoDataMap[e], {
                    isvip: i
                }).onChange(function(t) {
                    console.info("videoDataMapModel", e, "updated"), d.data.videoDataMap[e] = t, d.setData({
                        videoDataMap: d.data.videoDataMap
                    });
                });
            }), Object.keys(t.coverDataMap || {}).forEach(function(e) {
                d.coverDataMapModel[e] = c(e, t.coverDataMap[e]).onChange(function(t) {
                    console.info("coverDataMapModel", e, "updated"), d.data.coverDataMap[e] = t, d.setData({
                        coverDataMap: d.data.coverDataMap
                    });
                });
            }), e;
        }).then(function(e) {
            var t = e.videodetail, o = e.isvip, r = e.history;
            d.data_history = r, d.data_videodetail = t;
            var n = !0;
            d.currentVideoModel.onChange(function() {
                n && (n = !1, t.dataListDesc && t.dataListDesc.every(function(e) {
                    return 6 == e.listFlag ? (d.setData({
                        commentLayerKey: e.listKey
                    }), d.initComment({
                        dataKey: e.listKey,
                        vid: d.currentVideoModel.video.vid,
                        pageContext: ""
                    })) : 5 == e.listFlag ? d.initComment({
                        dataKey: e.listKey,
                        vid: d.currentVideoModel.video.vid,
                        pageContext: ""
                    }) : 3 == e.listFlag && d.initRecommend({
                        vid: d.currentVideoModel.video.vid,
                        cid: t.cid,
                        lid: a.lid
                    }), !0;
                }));
            });
            var l;
            if (a.vid && (l = i(a.vid, d.videoDataMapModel)) && (d.currentVideoModel.set({
                video: l.video,
                key: l.key,
                index: l.index
            }), console.info("route: play video from url", l)), !l && r) for (var s = 0; s < r.length; s++) if (r[s].cid == t.cid) {
                (l = i(r[s].vid, d.videoDataMapModel)) && (d.currentVideoModel.set({
                    video: l.video,
                    key: l.key,
                    index: l.index
                }), console.info("route: play video from history", l));
                break;
            }
            l || (d.currentVideoModel.set({
                key: t.defaultVideoDataKey,
                video: d.videoDataMapModel[t.defaultVideoDataKey].findNext(-1),
                index: 0
            }), console.info("route: play video from default", {
                key: t.defaultVideoDataKey,
                video: d.videoDataMapModel[t.defaultVideoDataKey].findNext(-1),
                index: 0
            }), a.layer && "episode" == a.layer && setTimeout(function() {
                d.layer(d.data.defaultVideoDataKey);
            }, 16)), d.setData({
                pageLoading: !1,
                cid: t.cid,
                lid: t.lid,
                defaultVideoDataKey: t.defaultVideoDataKey,
                isvip: o,
                dataListDesc: t.dataListDesc
            });
            var c = (t.introductionMap || {})[t.cid || t.lid || t.vid] || {
                poster: {}
            };
            return d.videotitle = c.poster.firstLine || "腾讯视频", d.videodesc = c.text || "腾讯视频不负好时光", 
            d.initPlaydesc({
                videodetail: t
            }), t;
        }).catch(function(e) {
            throw console.info("fetchdata error"), console.error(e.stack || e.message || e), 
            d.setData({
                pageError: e.code || !0,
                pageLoading: !1
            }), l.errorlog(e.stack), e;
        }).then(function(e) {
            return new o(function(e) {
                setTimeout(e, d.currentVideoModel.video ? 3e3 : 0);
            });
        }).then(function() {
            return d.loadAllVideo();
        });
        var r = this.$state && this.$state.firstShareOpen || a.firstshareopen;
        r && this.setData({
            isShareOpen: r
        });
    },
    onShareAppMessage: function() {
        var e = this;
        return this.tvpGoBackground(), {
            title: this.videotitle,
            desc: this.videodesc,
            path: "/pages/play/index?ptag=share&" + (this.data.cid ? "cid=" + this.data.cid + "&" : "") + "vid=" + this.data.currentVideo.vid,
            cacheKey: "v0023sk3zcp",
            complete: function() {
                e.tvpLeaveBackground();
            }
        };
    },
    data: {
        pageBgColor: "#212738",
        showLayer: null,
        layerShadow: !1,
        pageLoading: !0,
        isShareOpen: !1,
        currentVideo: {},
        currentVideoKey: "",
        videoDataMap: {},
        coverDataMap: {}
    },
    onLayerScrollBottom: function(e) {
        var t = e.currentTarget.dataset;
        1 == t.flag ? this.videoDataMapModel[t.key].nextPage() : 2 == t.flag && this.coverDataMapModel[t.key].nextPage();
    },
    onLayerScroll: function(e) {
        var t = e.detail.scrollTop;
        t > 0 ? this.setData({
            layerShadow: !0
        }) : this.setData({
            layerShadow: !1
        }), this._recommendShowReport(t, "recommends_all", 0);
    },
    onReachBottom: function(e) {
        this.onScrollToLower(e);
    },
    onScrollToLower: function(e) {
        this.data.commentLayerKey ? this.moreFeeds(e) : this.onCommentListScrollToLower(e);
    },
    _recommendShowReport: d.lock(function(e, t, i, a, o) {
        if (a = a || 0, this.data.recommend && this.data.recommend.list && this._recommendReportObj) {
            var d = this.data.recommend.list, l = this, s = l._recommendReportObj;
            o && (d = d.slice(0, o)), d.forEach(function(e, o) {
                r(t, {
                    name: i,
                    id: o,
                    top: a + 89 * o,
                    bottom: a + 89 * (o + 1),
                    clientHeight: -240
                }, function() {
                    n.reportParams.call(l, "show", "cid=" + e.cid + "&" + s.params, s.key);
                });
            }), setTimeout(e, 100);
        }
    }),
    layer: function(e) {
        var t = "string" == typeof e ? e : e.currentTarget.dataset.key;
        this.data.showLayer != t && (this.setData({
            showLayer: t || !1,
            layerScrollTop: t ? 0 : 1,
            layerShadow: !1
        }), console.info("showLayer", this.data.showLayer));
    },
    layerCount: 0,
    anyLayerShow: function() {
        this.layerCount++, console.log("layerCount", this.layerCount), this.tvpDisplay(!1);
    },
    anyLayerHide: function() {
        this.layerCount--, console.log("layerCount", this.layerCount), 0 == this.layerCount && this.tvpDisplay(!0);
    },
    changeVideo: function(e, t, i) {
        var a = this;
        console.info("changevideo dataset", e && e.currentTarget.dataset), this.layer("");
        var o, d, r = this.data.currentVideoKey;
        if (e) {
            var n = e.currentTarget.dataset.video;
            r = e.currentTarget.dataset.listkey;
            var l = this.videoDataMapModel[r].findIndex(n);
            l && (o = l.item, i = l.index);
        } else o = t, d = !0;
        o.vid != this.data.currentVideo.vid && (!o.vid || this.data.cid || this.data.vid ? (console.log("re init comment", o.vid), 
        setTimeout(function() {
            a.initComment({
                vid: o.vid,
                pageContext: ""
            });
        }, 300), this.videoDataMapModel[r].locate(i), this.currentVideoModel.set({
            key: r,
            index: i,
            video: o
        }, {
            isplaynext: d
        })) : this.$redirect("play?vid=" + o.vid));
    },
    loadAllVideo: function() {
        var e = this;
        if (this.data.defaultVideoDataKey) {
            var t = this.videoDataMapModel[this.data.defaultVideoDataKey];
            console.log("全部剧集", "开始加载");
            var a = t.nextPage(!0);
            a ? a && t.onChange(function() {
                var a = t.findIndex(e.data.currentVideo.vid);
                if (a && (console.log("全部剧集", "完成，当前index：", a.index), e.setData({
                    scrollIndex: a.index,
                    loadedAllVideo: !0
                })), !e.currentVideoModel.video) {
                    var o = e.data_history, d = !1;
                    if (o) for (var r = 0; r < o.length; r++) if (o[r].cid == e.data_videodetail.cid) {
                        (d = i(o[r].vid, e.videoDataMapModel)) && (e.currentVideoModel.set({
                            video: d.video,
                            key: d.key,
                            index: d.index
                        }), console.info("route: play video from history", d));
                        break;
                    }
                    d || e.currentVideoModel.set({
                        key: e.data.defaultVideoDataKey,
                        video: e.videoDataMapModel[e.data.defaultVideoDataKey].findNext(-1),
                        index: 0
                    });
                }
            }, !0) : this.setData({
                loadedAllVideo: !0
            });
        }
    },
    changePlay: function(e) {
        console.warn("changeplay");
        var t = e.currentTarget.dataset, i = t.cid;
        if (i) {
            var a = "";
            try {
                var o = this._recommendReportObj;
                t.recommend && o && (a = "cid=" + i + "&" + o.params, n.reportParams.call(this, "click", a, o.key));
            } finally {
                this.$redirect("play?cid=" + i + "&parentParams=" + encodeURIComponent(a) + (this.data.isShareOpen ? "&firstshareopen=1" : ""));
            }
        }
    },
    changeDefn: function(e) {
        this.switchDefn(e);
    },
    replay: function() {
        var e = this.data.currentVideo.vid;
        this.tvpSetVid(null), v.del({
            vid: e
        }), this.tvpSetVid(e, {
            cid: this.data.cid,
            videodetail: o.resolve(this.data.currentVideo),
            isvip: o.resolve(this.data.isvip),
            recommend: this.lastQuery.parentParams,
            additional: this.lastQuery.additional,
            autoplay: !0
        });
    },
    onTvpStart: function() {
        this.loadAllVideo();
    },
    onTvpPlayNext: function() {
        var e = this.videoDataMapModel[this.data.currentVideoKey], t = e.findIndex(this.currentVideoModel.video.vid).index, i = e.findNext(t);
        if (!i) return this.videoContext.exitFullScreen(), !1;
        this.changeVideo(null, i, t + 1);
    },
    anyClick: function() {
        this.hideAdTips();
    }
});