var t = require("../../module/page"), e = (require("../../module/request/request"), 
require("../../WechatAppPlayer/index"));

t("review", {
    data: {
        pageName: "review",
        tvpUrl: "",
        tvpVideoError: "",
        tvpState: "",
        tvpIsAd: "",
        tvpReportUrl: "",
        response: {
            loading: !0,
            empty: !1,
            emptyTitle: "",
            emptyText: "",
            fetchEnd: !1,
            refresh: !1
        }
    },
    onLoad: function() {
        var t = this;
        this.fetch(), this.videoContext = wx.createVideoContext("tvp"), this.createVideo("s0352cccj3q"), 
        e.on("report", function(e) {
            t.setData({
                tvpReportUrl: e.reportUrl
            });
        });
    },
    fetch: function(t) {},
    createVideo: function(t) {
        var o = this;
        this.video && this.video.stop();
        var n = this.video = e(t, {
            from: "v4139"
        });
        n.on("statechange", function(t, e, n) {
            if (t != o.data.tvpState) {
                switch (console.info("playerstatechange " + o.data.tvpState + " => " + t), o.data.tvpState) {
                  case "stop":
                    break;

                  case "error":
                    return;
                }
                switch (o.setData({
                    tvpState: t
                }), t) {
                  case "playing":
                    o.videoContext.play();
                    break;

                  case "error":
                    o.setData({
                        tvpVideoError: n
                    });

                  case "pause":
                  case "stop":
                    break;

                  case "ended":
                    o.videoContext.pause();
                }
            }
        }), n.on("contentchange", function(t) {
            console.log("contentchange", t), o.setData({
                tvpUrl: t.currentContent.url,
                tvpIsAd: !!t.currentContent.isad
            });
        });
    },
    __onTvpPlay: function() {
        this.video && this.video.onContentPlay();
    },
    __onTvpPause: function() {
        this.video && this.video.onContentPause();
    },
    __onTvpEnded: function() {
        this.video && this.video.onContentEnd();
    },
    __onTvpTimeupdate: function() {
        this.video && this.video.onContentTimeupdate();
    },
    __onTvpError: function() {
        this.video && this.video.onContentError();
    }
});