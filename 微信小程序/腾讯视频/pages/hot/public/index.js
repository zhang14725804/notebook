function t(t) {
    return .5625 * t;
}

function o(t) {
    return t + 58;
}

function i(t, e) {
    return t.currentTarget.dataset[e];
}

function r(t) {
    var e = t.currentTarget.dataset, o = e.vid, i = e.cid, r = [];
    return i && r.push("cid=" + i), o && r.push("vid=" + o), "play?" + r.join("&");
}

var a, n = require("../../../WechatAppPlayer/index"), s = require("../../../module/login"), c = require("../../../module/globalData"), d = require("../modules/history"), h = require("../data/insert"), u = require("../../../module/fns"), p = require("../data/base64text"), l = require("../../../module/recreport"), v = require("../../../module/dataset/history/index.js"), f = 56, g = 48, y = wx.getSystemInfoSync().system.match(/ios/i);

switch (wx.getSystemInfoSync().platform) {
  case "devtools":
    a = y ? 5 : 3;
    break;

  case "android":
    a = 3;
    break;

  case "ios":
    a = 5;
    break;

  case "ipad":
    a = 4;
}

module.exports = function() {
    return {
        comps: [ require("../../../comps/toast/index")(), require("../../../comps/topbar/topbar")() ],
        data: {
            page: "",
            top: 0,
            tvpUrl: "",
            tvpReportUrl: "",
            isPlayerHidden: 1,
            isPlayerStop: 0,
            videoError: "",
            tvpState: "",
            content: [],
            response: {
                loading: !0,
                ret: 0
            },
            nav: [],
            curId: 0,
            tpltype: 2,
            count: 0,
            topTipShow: 0
        },
        onHide: function() {
            v.sync();
        },
        _onLoad: function(e) {
            var i = this;
            this.videoContext = wx.createVideoContext("tvp"), n.on("report", function(t) {
                console.log("onreport", t.reportUrl), i.setData({
                    tvpReportUrl: t.reportUrl
                });
            }), this.pageContext = this.pageContext || "", this.refreshContext = this.refreshContext || "", 
            this.hascurSetTitle = !1, this.curIdx = 0, this.hasNextPage = 1, this.windowWidth = 375, 
            this.playerHeight = t(this.windowWidth), this.boxHeight = 0;
            var r = this;
            wx.getSystemInfo({
                complete: function(e) {
                    r.windowWidth = e && e.windowWidth || r.windowWidth, r.playerHeight = t(r.windowWidth), 
                    r.boxHeight = o(r.playerHeight);
                }
            });
        },
        fetchDataAgain: function() {
            this.setData({
                response: {
                    loading: !0,
                    ret: 0
                }
            }), this.fetchData();
        },
        onUnload: function() {
            this.video && this.video.stop(), v.sync();
        },
        onReachBottom: function() {
            this.data.content.length && this.hasNextPage && (this.setData({
                response: u.extend({}, this.data.response, {
                    loading: !0
                })
            }), this.fetchData({
                isBottomLoad: 1
            }), this._onReachBottom && this._onReachBottom());
        },
        onPicClick: function(t) {
            this.hascurSetTitle = !1;
            var e = i(t, "vid");
            this.curIdx = ~~i(t, "index"), this.createVideo(e), this.setData({
                isPlayerStop: 0
            }), setTimeout(function() {
                v.sync();
            }, 300), this._feedsPicClick && this._feedsPicClick(t);
        },
        replay: function(t) {
            var e = i(t, "vid");
            v.del({
                vid: e
            }), this.onPicClick(t);
        },
        onTagClick: function(t) {
            var e = t.currentTarget.dataset, o = e.type, i = e.value, r = e.datakey, a = e.tagname, n = e.starid;
            1 == o ? this.$route("tag?datakey=" + r + "&_tagname=" + a) : 2 == o ? this.$route("star?id=" + n) : 3 == o ? this.$route("play?cid=" + i) : 4 == o && this.$route("vplus?qq=" + i + "&_tagname=" + a);
        },
        onCommentClick: function(t) {
            this.$route(r(t));
        },
        onShareClick: function(t) {
            this.$route(r(t) + "&doShare=1");
        },
        onRecClick: function(t) {
            this.$route(r(t));
        },
        createVideo: function(t) {
            function o(t) {
                var e = 0;
                return t.isShareOpen && (e += f), "hot" === t.page && (e += g), e;
            }
            function i(t, e) {
                v.add({
                    cid: "",
                    vid: e || "",
                    lid: "",
                    poster: null,
                    strTime: Math.floor(t),
                    uiDate: Math.floor(Date.now() / 1e3),
                    iHD: 0,
                    playFrom: a,
                    seriesText: "",
                    reportParam: "",
                    isAutoPlay: !0,
                    recordType: 0,
                    fromCtx: "",
                    totalTime: "",
                    totalWatchTime: 0,
                    showLocation: 1
                });
            }
            var r = this;
            t = t || "", this.video && this.video.stop(), this.setData({
                videoError: !1
            }), y || this.setData({
                tvpUrl: p
            });
            var u = "";
            "hot" === this.data.page && (u = this.videoFeedsReport(this.data.curId, this.data.content[this.curIdx], this.curIdx, "click"));
            var l = this, m = this.video = n(t, {
                from: "v4138",
                noad: !0,
                getReportParam: function(t) {
                    s.getUserInfo(function(e, o) {
                        t(null, {
                            ptag: c.get("ptag") || "",
                            isvip: o && o.isVip,
                            tpay: o && o.isVip ? 2 : 0,
                            hc_openid: o && o.wxuser && o.wxuser.wxOpenId || "",
                            hc_appid: o && o.wxuser && o.wxuser.appId || "",
                            nick: c.get("nickName") || "",
                            rmd: u,
                            additional: l.data.curId ? "channel_hot-" + l.data.curId : ""
                        });
                    });
                }
            });
            m.on("statechange", function(t, e, o) {
                switch (console.info("playerstatechange " + r.data.tvpState + " => " + t), r.data.tvpState) {
                  case "stop":
                    break;

                  case "error":
                    return;
                }
                switch (r.setData({
                    tvpState: t
                }), t) {
                  case "playing":
                    r.videoContext.play();
                    break;

                  case "error":
                    r.setData({
                        videoError: o
                    });

                  case "pause":
                  case "stop":
                    break;

                  case "ended":
                    r.videoContext.pause(), r.setData({
                        tvpUrl: ""
                    });
                }
            }), m.on("contentchange", function(t) {
                if (t.currentContent) {
                    var e = d.get(r.data.content[r.curIdx].vid);
                    r.setData({
                        tvpUrl: t.currentContent.url,
                        isPlayerHidden: 0,
                        top: r.curIdx * r.boxHeight + o(r.data)
                    }), e && t.currentContent.wait("start", function() {
                        r.videoContext.seek(e);
                    });
                }
            });
            var x = 0;
            m.on("videotimeupdate", function(t, e) {
                var o = r.data.content[r.curIdx], a = e - t < 1 ? 0 : t;
                d.set(o.vid, a);
                var n = o.insertNewLineProgress;
                n && -1 !== n && !o.hasInsert && .01 * n * e <= t && (o.hasInsert = 1, h.get({
                    datakey: o.insertNewLineDataKey
                }, {
                    complete: function(t) {
                        t.content.length && r.setData({
                            content: r.data.content.slice(0, r.curIdx + 1).concat(t.content, r.data.content.slice(r.curIdx + 1))
                        });
                    }
                })), 20 == x++ && (x = 0, i(t, o.vid));
            }), m.on("error", function(t) {
                r.setData({
                    videoError: t.message + "(" + (t.code || "L") + ")",
                    top: r.curIdx * r.boxHeight + o(r.data)
                }), console.log(e.stack);
            });
        },
        __onTvpPlay: function() {
            try {
                this.video && this.video.onContentPlay(), this.setData({
                    isPlayerStop: 0
                });
            } catch (t) {}
        },
        __onTvpPause: function() {
            this.video && this.video.onContentPause(), this.hascurSetTitle = 1, this.setData({
                isPlayerStop: 1
            });
        },
        __onTvpEnded: function() {
            var t = this;
            this.video && this.video.onContentEnd();
            var e = this.data.content.map(function(e, o) {
                return o === t.curIdx ? u.extend({}, e, {
                    playEnd: !0
                }) : e;
            });
            this.setData({
                isPlayerStop: 0,
                isPlayerHidden: 1,
                content: e
            }), wx.getNetworkType({
                success: function(e) {
                    "wifi" === e.networkType && t.curIdx + 1 < t.data.content.length && (t.curIdx++, 
                    t.createVideo(t.data.content[t.curIdx].vid), v.sync());
                }
            });
        },
        __onTvpTimeupdate: function(t) {
            try {
                this.video && this.video.onContentTimeupdate(null, t);
            } catch (t) {}
        },
        __onTvpError: function(t) {
            if (console.error("tvp err", t), -1 != +t.currentTarget.dataset.contentid && -1 == t.detail.errMsg.indexOf("updateVideoPlayer")) try {
                this.video.onContentError(0, new Error(t.detail.errMsg));
            } catch (t) {}
        },
        videoFeedsReport: function(t, e, o, i) {
            if ("show" === (i = i || "show")) {
                if (e._reported) return;
                e._reported = !0;
            }
            var r = this;
            try {
                var a = e.recInfo || {}, n = {
                    report_type: a.recReport.reasonType,
                    report_bucket: a.recReport.bucketId,
                    report_alg: a.recReport.algId,
                    report_reason: a.recReport.reason,
                    seqNum: a.seqnum,
                    item_type: a.rtype,
                    item_id: e.vid,
                    tag_id: a.tagid,
                    tag_type: a.tagtype,
                    ztid: t
                };
                return l.report.call(r, i, {
                    recReportData: n
                }, o || 0, "hot_recommend");
            } catch (t) {
                return console.log("hot_recommend", t), "";
            }
        }
    };
};