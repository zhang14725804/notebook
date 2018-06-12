function e(e, t) {
    try {
        return JSON.parse(e);
    } catch (a) {
        return console.log("[Error] 非法JSON字符串:", e), t;
    }
}

function t(e) {
    return {
        poster: e.poster,
        bgcolor: e.bgcolor,
        playId: e.playId,
        liveId: e.liveId,
        posterMask: e.posterMask,
        posterBtnShow: e.posterBtnShow
    };
}

function a(t, a) {
    var r = this;
    return (t = t.filter(function(e) {
        if (!e.list) return !1;
        switch (e.type) {
          case y:
          case f:
            return e.list.length > 0;

          case v:
            return "live_mod" == e.modId || e.list.length > 1;

          case b:
            return e.list.length > 0;

          default:
            return !1;
        }
    })).forEach(function(t) {
        var o = t.list[0];
        t.list.forEach(function(a) {
            var r = a.data;
            t.type == b && a.cms_data && (a.data = a.cms_data, (r = a.data).image_url = r.pic_url ? r.pic_url : I), 
            !r.item_id && r.cid && (r.item_id = r.cid), r.score && (r.score = e(r.score), r.score && "object" == i(r.score) && (r.score = r.score.score.slice(0, 3)), 
            r.score || (r.score = "")), r.main_color ? (r.main_color = e(r.main_color, {}), 
            r.main_color.color3 ? r.bgColor = "rgb(" + r.main_color.color3.replace(/-/g, ",") + ")" : r.bgColor = _) : r.bgColor = _, 
            r.imgtag && (r.imgtag = e(r.imgtag, {}), r.imgtag.tag_2 && r.imgtag.tag_2.text && (r.imgtagUrl = n[r.imgtag.tag_2.text] && n[r.imgtag.tag_2.text]["2x"], 
            !r.imgtagUrl && (r.imgtagUrl = ""))), r.type = ("" + r.type).trim(), r.posterMask = !~[ "1", "2", "3" ].indexOf(r.type), 
            t.type == b && "2" == r.type && "" !== r.timelong && (r.episode_updated = r.timelong), 
            "" == r.sub_title && "" !== r.current_topic && (r.sub_title = r.current_topic), 
            "" == r.sub_title && "" !== r.subtitle && (r.sub_title = r.subtitle), ~x.indexOf(t.type) && r.subtitle && (r.sub_title = "观看" + r.subtitle), 
            t.type == b && r.stitle && (r.sub_title = r.stitle), r.image_url ? r.image_url.indexOf("vcover_hz_pic") > -1 ? p.system.indexOf("iOS") > -1 ? (r.image_url_small = r.image_url.replace(/(\/0)$/g, "/332"), 
            r.poster = r.image_url.replace(/(\/0)$/g, "/1920")) : (r.image_url_small = r.image_url.replace(/(\/0)$/g, "/120"), 
            r.poster = r.image_url.replace(/(\/0)$/g, "/498")) : (r.image_url_small = r.image_url, 
            r.poster = r.image_url) : (r.image_url = I, r.image_url_small = I, r.poster = I), 
            r.image_url_vertical && (p.system.indexOf("iOS") > -1 ? r.image_url_vertical_small = r.image_url_vertical.replace(/(\/0)$/g, "/220") : r.image_url_vertical_small = r.image_url_vertical.replace(/(\/0)$/g, "/130")), 
            t.type == b && a.data ? a.data = c([ "item_id", "image_url_small", "image_url_vertical_small", "imgtagUrl", "episode_updated", "score", "title", "sub_title", "bgColor", "poster", "type", "item_type", "report_bucket", "report_alg", "report_type", "rec_reason", "report_reason", "seqNum", "ztid", "tag_id", "tag_type" ], a.data) : a.data = c([ "item_id", "image_url", "image_url_small", "image_url_vertical_small", "imgtagUrl", "episode_updated", "title", "sub_title", "bgColor", "poster", "type", "pid", "item_type", "report_bucket", "report_alg", "report_type", "rec_reason", "report_reason", "seqNum", "ztid", "tag_id", "tag_type" ], a.data), 
            delete a.cms_data, delete a.itemBase, delete a.itemId, delete a.type;
        }), t.info = {}, t.meta && t.meta.title && (t.info.title = t.meta.title.replace(/\./g, "·")), 
        t.meta && t.meta.name_id && (t.info.name_id = t.meta.name_id), t.meta && t.meta.tag_id && (t.info.tag_id = t.meta.tag_id), 
        t.meta && t.meta.tag_type && (t.info.tag_type = t.meta.tag_type), t.type == b && (t.modId = h, 
        void 0 !== t.meta && void 0 !== t.meta.title || (t.info.title = "全网热播"), t.list = t.list.slice(0, 3)), 
        t.meta && !t.meta.name_id && Array.isArray(t.list) && t.list.length >= 3 && t.list.every(function(e) {
            return e.data && e.data.image_url_vertical_small;
        }) && (t.modId = h, t.list = t.list.slice(0, 3)), ~x.indexOf(t.type) && (t.modId = h, 
        t.list = t.list.slice(0, 3)), d.push(s.extend(function(e) {
            return {
                recReportData: r.recReportFieldPick(e, a),
                title: e.title,
                poster: e.poster,
                bgcolor: e.bgColor,
                playId: e.item_id,
                liveId: e.pid,
                posterMask: e.posterMask,
                posterBtnShow: !0
            };
        }(o.data), {
            recReportList: t.list.reduce(function(e, t, i) {
                return i && e.push(r.recReportFieldPick(t.data, a)), e;
            }, []),
            posterBtnShow: t.list.length < 2
        })), delete t.cms_data, delete t.meta, delete t.modType, delete t.type, delete t.modIndex;
    }), t;
}

var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = require("../../module/page"), o = require("../../module/request/request"), n = require("../../module/dataset/marklabel/index"), s = require("../../module/fns"), l = require("../../module/login"), c = require("../../module/dataset/field/index").filter, d = [], p = {}, g = require("../../module/recreport"), m = !1, u = require("../../module/boss")({
    app: "tinyapp",
    module: "index"
}), _ = "#252c35", h = "longvideo", y = "type_30002", f = "type_30038", x = [ y, f ], v = "type_30000", b = "type_30014", I = "https://i.gtimg.cn/qqlive/images/20150608/blank.png", w = "https://i.gtimg.cn/qqlive/images/tinyapp/logo_white.svg", C = "https://i.gtimg.cn/qqlive/images/tinyapp/icon_search.svg";

wx.getStorage({
    key: "cardAnimationDemo",
    success: function(e) {
        m = e.data;
    }
}), r("index", {
    data: {
        pageName: "index",
        pageContext: "",
        resultContent: [],
        swiperIndex: 1,
        swiperDuration: 500,
        maskColor: "rgba(255, 255, 255, 0.3)",
        icon_logo: w,
        icon_search: C,
        envType: "",
        headPoster: {
            poster: I,
            posterMask: !1,
            posterBtnShow: !1,
            bgcolor: _,
            playId: "",
            liveId: "",
            posterIndex: 0
        },
        response: {
            os: "",
            loading: !0,
            empty: !1,
            emptyTitle: "",
            emptyText: ""
        },
        ua: {}
    },
    comps: [ require("../search/index.js")("index") ],
    onLoad: function() {
        this.fetch = s.lock(this.fetch), this._currentIndex = 0, this._posterData = [];
        var e = this;
        d = [], wx.getSystemInfo({
            success: function(t) {
                (p = t).system.indexOf("Android") > -1 ? e.setData({
                    "response.os": "android"
                }) : p.system.indexOf("iOS") > -1 && e.setData({
                    "response.os": "ios"
                });
            }
        }), this.fetch();
    },
    onReady: function() {
        var e = this;
        this.$preLoad("/pages/hot/index"), this.$preLoad("/pages/channel/index"), this.$preLoad("/pages/user/index"), 
        this._unbindLoginChange = l.onLoginChange(function() {
            e.onRefresh();
        });
    },
    onUnload: function() {
        this._unbindLoginChange && this._unbindLoginChange(), this._unbindLoginChange = null;
    },
    onShow: function() {
        console.log("#{Index} onShow step1");
        var e = this, t = getApp();
        console.log("#{Index} onShow step2", t && t.global && t.global.env_type !== e.data.envType), 
        t && t.global && t.global.env_type !== e.data.envType && (console.log("👌 swtich"), 
        e.setData({
            envType: t.global.env_type
        }), e.onRefresh());
    },
    onRefresh: function() {
        this._fetching || (d = [], this._posterData = [], this.setData({
            icon_logo: w,
            icon_search: C,
            pageContext: "",
            resultContent: [],
            swiperIndex: 0,
            "response.loading": !0,
            "response.empty": !1,
            "response.emptyTitle": "",
            "response.emptyText": "",
            maskColor: "rgba(255, 255, 255, 0.3)"
        }), console.log("#{Index} onRefresh(" + this.$id + "):" + this._fetching), this.fetch());
    },
    fetch: function(e, i) {
        function r(t) {
            console.log("#{Index} Fetch data error: ", t);
            try {
                var a = t && t.code ? t.code : t || "";
                u.errorlog(a), n(a);
            } finally {
                s._fetching = !1, e();
            }
        }
        function n(e) {
            s.setData({
                "response.emptyTitle": "出了点小问题 (" + e + ")",
                "response.emptyText": "我们正在紧张地修复",
                "response.empty": !0,
                "response.loading": !1,
                maskColor: "transparent"
            }), i.complete && i.complete();
        }
        if (!this._inited) {
            this._fetching = !0, i = i || {};
            var s = this, l = !!this.data.pageContext;
            console.log("#{Index} Fetch data start 👌"), o.vaccess("channel_data", {
                channelId: "100222",
                modNum: 30,
                pageContext: this.data.pageContext
            }).then(function(r) {
                if (console.log("#{Index} Fetch data success", r && r.modList && r.modList.length > 0), 
                e(), r.modList && r.modList.length > 0) {
                    var o = a.call(s, r.modList, r.seqNum), c = 1 == s.data.swiperIndex;
                    if (!l && d.length) {
                        c && m ? s.setData({
                            swiperIndex: 0
                        }) : c && !m && (m = !0, wx.setStorage({
                            key: "cardAnimationDemo",
                            data: !0
                        }), setTimeout(function() {
                            s.setData({
                                swiperIndex: 0
                            });
                        }, 500));
                        var p = d[0];
                        s.$setData("headPoster", t(p)), s.recReport("show", p, 0);
                    }
                    s._posterData = d, s.setData({
                        resultContent: s.data.resultContent.concat(o),
                        pageContext: r.pageContext,
                        "response.loading": !1
                    });
                } else if (!l) return n("B." + r.status);
                i.complete && i.complete(), console.log("#{Index} Fetch done."), s._fetching = !1;
            }, r).catch(r);
        }
    },
    swiperChange: function(e) {
        var a = e.detail.current, i = 1 == this.data.swiperIndex, r = this._posterData[a];
        this._currentIndex = a, i || (m && e.detail.current > this._posterData.length - 3 && this._posterData.length < 30 && this.fetch(), 
        r && (this.$setData("headPoster", s.extend(t(r), {
            posterIndex: e.detail.current
        })), this.recReport("show", r, a)));
    },
    onPlayLive: function(e) {
        var t = e.currentTarget.dataset.pid;
        this.$route("live?pid=" + t);
    },
    onPlay: function(e) {
        var t = this, a = e.currentTarget.dataset.cid, i = "";
        if (!a) return console.log("[Error] 非法cid:" + a);
        try {
            var r = this._posterData[this._currentIndex];
            [ r.recReportData ].concat(r.recReportList || []).some(function(e) {
                if (e.item_id == a) return i = t.recReport("click", {
                    recReportData: e
                }, t._currentIndex), !0;
            });
        } finally {
            var o = "play?" + (15 == a.length ? "cid" : "vid") + "=" + a + "&parentParams=" + encodeURIComponent(i);
            console.log("[Play]", o), this.$route(o);
        }
    },
    onGoChannel: function(e) {
        var t = e.currentTarget.dataset;
        t.nameid ? this.$route("star?id=" + t.nameid) : t.tagid && this.$route("label?channelId=100222&tagid=" + t.tagid + "&tagtype=" + t.tagtype + "&metaname=" + t.metaname);
    },
    onShareAppMessage: function() {
        var e = "腾讯视频", t = "不负好时光";
        return this.data.showSearch && this.data.searchbar.word && (e = this.data.searchbar.word, 
        t = "腾讯视频不负好时光"), {
            title: e,
            desc: t,
            path: "/pages/index/index?ptag=share&search=" + this.data.showSearch + "&searchkey=" + encodeURIComponent(this.data.searchbar.word)
        };
    },
    recReportFieldPick: g.fieldPick,
    recReport: function(e, t, a) {
        return g.report.call(this, e, t, a, "index_recommend", "100222");
    },
    onAwake: function() {
        this.onRefresh();
    }
});