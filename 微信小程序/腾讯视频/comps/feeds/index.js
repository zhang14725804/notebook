function e(e) {
    var t = "";
    try {
        t = e.poster.markLabelList.find(function(e) {
            return 3 == e.position;
        }).primeText;
    } catch (e) {}
    return e.videoData = e.videoData || {}, e.action = e.action || {}, {
        vid: e.videoData.vid,
        playEnd: e.endTime,
        videoData: {
            imageUrl: e.poster.imageUrl,
            title: e.videoData.title,
            duration: t
        },
        tagList: e.tagTexts && e.tagTexts.map(function(e) {
            var t = e.text && e.text.match(/>(.*)<\//)[1];
            return {
                url: e.action && e.action.url,
                avatar: e.imgUrl,
                text: t,
                value: t
            };
        }),
        feedbackDataKey: e.feedbackDataKey
    };
}

var t, a = require("../../module/request/request"), r = (require("../../module/recreport"), 
require("../../pages/hot/data/delete")), s = require("../../module/login"), o = require("../../module/globalData"), i = require("../../WechatAppPlayer/index"), n = require("../../module/dataset/history/index.js"), d = require("../../pages/hot/modules/history"), c = require("../../pages/hot/data/base64text"), f = wx.getSystemInfoSync(), u = .5625 * f.windowWidth + 58, l = f.system.match(/ios/i);

switch (f.platform) {
  case "devtools":
    t = l ? 5 : 3;
    break;

  case "android":
    t = 3;
    break;

  case "ios":
    t = 5;
    break;

  case "ipad":
    t = 4;
}

var h = ("" + Math.random()).substr(2);

module.exports = function() {
    return {
        data: {
            feeds: {}
        },
        initFeeds: function(t) {
            var r = this;
            this.feedsVideoContext = wx.createVideoContext("feedsplayer");
            var s = t.listTitle;
            this.$setData("feeds", {
                title: s,
                isPlayerHidden: 1
            }), a.vaccess("feedline_detail", {
                dataKey: t.listKey,
                guid: h
            }).then(function(a) {
                if (console.log("feeds", a), 0 != a.errCode) throw new Error("fetch feeds error");
                var s = a.data;
                r.$setData("feeds", {
                    content: s.map(e),
                    pageContext: a.pageContext,
                    hasNextPage: a.hasNextPage,
                    listKey: t.listKey
                });
            }).catch(function(e) {
                console.log("recommend error", e.stack);
            });
        },
        moreFeeds: function() {
            var t = this;
            this.data.feeds.hasNextPage && a.vaccess("feedline_detail", {
                dataKey: this.data.feeds.listKey,
                pageContext: this.data.feeds.pageContext,
                guid: h
            }).then(function(a) {
                if (console.log("feeds", a), 0 != a.errCode) throw new Error("fetch feeds error");
                var r = a.data;
                t.$setData("feeds", {
                    content: t.data.feeds.content.concat(r.map(e)),
                    pageContext: a.pageContext,
                    hasNextPage: a.hasNextPage
                });
            }).catch(function(e) {
                console.log("recommend error", e.stack);
            });
        },
        onFeedsDelete: function(e) {
            var t = this;
            console.log("onFeedsDelete", e.currentTarget.dataset), r.del({
                datakey: e.currentTarget.dataset.datakey
            }, function() {
                var a = e.currentTarget.dataset.index, r = t.data.feeds.isPlayerHidden;
                t.data.feeds.currentIndex == a && (t.feedsVideo && t.feedsVideo.stop(), t.playVideoContext(-1), 
                r = !0), t.$setData("feeds", {
                    content: t.data.feeds.content.filter(function(e, t) {
                        return t != a;
                    }),
                    isPlayerHidden: r
                }), t.showToast({
                    title: "会减少推荐该类型的视频",
                    timeout: 2e3
                });
            });
        },
        onFeedsPlayNext: function() {
            var e = this.data.feeds.content[this.data.feeds.currentIndex + 1];
            this.onPicClick({
                currentTarget: {
                    dataset: {
                        vid: e.vid,
                        index: this.data.feeds.currentIndex + 1
                    }
                }
            });
        },
        __onFeedEnded: function() {
            this.onFeedsPlayNext();
        },
        onPicClick: function(e) {
            var t = this, a = e.currentTarget.dataset.vid, r = e.currentTarget.dataset.index;
            this.createFeedsVideo(a, function() {
                t.$setData("feeds", {
                    top: 65 + r * u,
                    currentIndex: r,
                    isPlayerHidden: 0
                });
            });
        },
        onUnload: function() {
            this.playVideoContext(-1), this.feedsVideo && this.feedsVideo.stop(), this.$setData("feeds", {
                isPlayerHidden: 0
            });
        },
        onCommentClick: function(e) {
            var t = e.currentTarget.dataset.vid;
            this.$redirect("play?vid=" + t);
        },
        onShareClick: function(e) {
            var t = e.currentTarget.dataset.vid;
            this.$redirect("play?doShare=1&vid=" + t);
        },
        onTagClick: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$route(t);
        },
        createFeedsVideo: function(e, a) {
            function r(e, a) {
                n.add({
                    cid: "",
                    vid: a || "",
                    lid: "",
                    poster: null,
                    strTime: Math.floor(e),
                    uiDate: Math.floor(Date.now() / 1e3),
                    iHD: 0,
                    playFrom: t,
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
            var f = this;
            this.videoState.setState("end", {
                force: !0
            }), this.__destroyVideo(), e = e || "", this.feedsVideo && this.feedsVideo.stop(), 
            l || this.$setData("feeds", {
                feedsUrl: c
            });
            var u = this.feedsVideo = i(e, {
                from: "v4138",
                noad: !0,
                getReportParam: function(e) {
                    s.getUserInfo(function(t, a) {
                        e(null, {
                            ptag: o.get("ptag") || "",
                            isvip: a && a.isVip,
                            tpay: a && a.isVip ? 2 : 0,
                            hc_openid: a && a.wxuser && a.wxuser.wxOpenId || "",
                            hc_appid: a && a.wxuser && a.wxuser.appId || "",
                            nick: o.get("nickName") || ""
                        });
                    });
                }
            });
            u.on("error", function(e) {
                console.log(e.stack);
            }), u.on("statechange", function(e, t, a) {
                switch (console.info("playerstatechange " + f.data.feeds.feedsState + " => " + e), 
                f.data.feeds.feedsState) {
                  case "stop":
                    break;

                  case "error":
                    return;
                }
                switch (f.$setData("feeds", {
                    feedsState: e
                }), e) {
                  case "playing":
                    f.playVideoContext("feeds");
                    break;

                  case "error":
                    f.$setData("feeds", {
                        feedsState: a
                    });

                  case "pause":
                  case "stop":
                    break;

                  case "ended":
                    f.playVideoContext(-1), f.$setData("feeds", {
                        feedsUrl: ""
                    });
                }
            }), u.on("contentchange", function(t) {
                if (t.currentContent) {
                    var r = d.get(e);
                    f.$setData("feeds", {
                        feedsUrl: t.currentContent.url
                    }), a(), r && t.currentContent.wait("start", function() {
                        f.feedsVideoContext.seek(r);
                    });
                }
            });
            var h = 0;
            u.on("videotimeupdate", function(t, a) {
                var s = a - t < 1 ? 0 : t;
                d.set(e, s), 20 == h++ && (h = 0, r(t, e));
            }), u.on("error", function(e) {
                f.$setData("feeds", {
                    feedsError: e.message + "(" + (e.code || "L") + ")"
                }), a(e);
            });
        }
    };
};