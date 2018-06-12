function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    var e = t.info, i = t.index, n = void 0 === i ? 0 : i;
    return e && e.focus ? e.focus[n] : {};
}

function i(t, e) {
    var i = e.isLogin, s = d.default.get() || [], a = e.records || [], o = [];
    if (s.forEach(function(t, e) {
        i ? a.forEach(function(e) {
            t.qipuId == e.tvId && (t.playTime = e.videoPlayTime, "film" == t.type && t.qipuId == e.tvId && o.push(t));
        }) : "film" == t.type && o.push(t);
    }), o = o[0] || {}, o.noshow = !1, !o.date) return {};
    var c = o.content || "";
    c.length > 10 && (c = c.substring(0, 10) + "...");
    var l = u.default.time.formatSecondOmit(o.playTime);
    return l = n(l, o), o.content = "上次观看:" + c + ",已看" + l, o.animation = r(), o.noshow ? {} : Object.assign({}, t, o);
}

function n(t, e) {
    if (t) {
        var i = t.split(":"), n = i.length;
        switch (2 == n && i[0] <= 0 && i[1] < 30 && (e.noshow = !0), n) {
          case 3:
            return i[0] + "时" + i[1] + "分" + i[2] + "秒";

          case 2:
            return i[0] + "分" + i[1] + "秒";

          case 1:
            return i[0] + "秒";
        }
    }
}

function s(t, e) {
    return t.animation = a(e), t;
}

function r() {
    var t = wx.createAnimation({
        duration: 1e3,
        timingFunction: "ease"
    });
    return t.translate3d(0, 0, 0).step(), t.export();
}

function a(t) {
    var e = t ? 0 : 1e3, i = wx.createAnimation({
        duration: e,
        timingFunction: "ease"
    });
    return i.translate3d(0, "100%", 0).step(), i.export();
}

function o(t) {
    if (t) {
        t.isVip, t.isExclusive;
        var e = t.isCoupon, i = (t.isQiyiProduced, t.isTrailer, t.isPaid);
        e && (t.isVip = !1, t.isExclusive = !1, t.isQiyiProduced = !1, t.isTrailer = !1), 
        i && (t.isVip = !1, t.isExclusive = !1, t.isQiyiProduced = !1, t.isTrailer = !1);
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var c = t(require("../../../components/load/loadReducers")), l = require("../../../components/searchLayout/searchLayoutReducer"), u = t(require("../../../common/utils/util")), d = t(require("../../../components/history/playRecordService")), m = t(require("../../../common/source/videoUtil")), h = t(require("../../../common/pingback/block"));

exports.default = {
    record: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
        switch (e.type) {
          case "SET":
            return i(t, e);

          case "REMOVE_PLAY_RECORD":
            return s(t, e.rightTime);

          default:
            return t;
        }
    },
    qipuId: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", i = arguments[1];
        switch (i.type) {
          case "SET":
            return (e(i).isPaidLive || e(i).isLive ? e(i).qipuId : e(i).tvid) || t;

          case "SWITCH_FOCUS":
            return i.qipuId;

          default:
            return t;
        }
    },
    bgImageUrl: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", i = arguments[1];
        switch (i.type) {
          case "SET":
            return e(i).bgimg || t;

          case "SWITCH_FOCUS":
            return i.bgImageUrl || t;

          default:
            return t;
        }
    },
    focus: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = arguments[1];
        return "SET" === e.type && e.info ? (e.info.focus || []).map(function(t, e) {
            1 == t.isPaidLive || 1 == t.isLive ? t.qipuId = void 0 === t.qipuId || null === t.qipuId ? "" : t.qipuId : t.tvid = void 0 === t.tvid || null === t.tvid ? "" : t.tvid;
            var i = m.default.getVideoTemplate(t), n = {};
            return "album" == i ? n = {
                qipuId: t.tvid,
                contentA: t.mainTitle,
                contentB: t.showContent,
                contentC: t.mainActors ? "主演：" + t.mainActors : "",
                contentD: t.focus
            } : "source" == i ? n = {
                qipuId: t.tvid,
                contentA: t.sourceName,
                contentB: t.updateStrategy || t.showContent,
                contentC: t.hosts ? "主持人：" + t.hosts : "",
                contentD: t.mainTitle
            } : "movie" == i ? n = {
                qipuId: t.tvid,
                contentA: t.mainTitle,
                contentB: t.directors ? "导演：" + t.directors : "",
                contentC: t.mainActors ? "主演：" + t.mainActors : "",
                contentD: t.focus,
                isMovie: !0
            } : "live" == i && (n = {
                qipuId: t.qipuId,
                contentA: t.mainTitle,
                contentB: "",
                contentC: t.focus,
                contentD: "直播时间：" + t.playTime
            }), t.index = e + 1, o(t), Object.assign({}, t, n, {
                block: "wx_focus"
            });
        }) : t;
    },
    tags: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = arguments[1];
        if ("SET" === e.type) {
            var i = e.info, n = i.channel_order || [ "live", "dianshiju", "dianying", "zongyi", "dongman" ], s = Object.assign({
                live: "直播",
                dianshiju: "电视剧",
                dianying: "电影",
                zongyi: "综艺",
                dongman: "动漫"
            }, i.channel_new_title);
            if (!e.info) return t;
            var r = i.tags.map(function(t) {
                return Object.assign({
                    listClass: "m-list_content",
                    listItemClass: "m-list_item",
                    itemPicClass: "m-list_item-pic"
                }, t);
            }), a = {
                live: {
                    title: s.live,
                    channelId: 151,
                    rseat: ""
                },
                dianshiju: {
                    title: s.dianshiju,
                    channelId: 2,
                    rseat: "wx_home_moredsj"
                },
                dianying: {
                    title: s.dianying,
                    channelId: 1,
                    rseat: "wx_home_moredy"
                },
                zongyi: {
                    title: s.zongyi,
                    channelId: 6,
                    rseat: "wx_home_morezy"
                },
                dongman: {
                    title: s.dongman,
                    channelId: 4,
                    rseat: "wx_home_moredm"
                }
            };
            n.forEach(function(t, e) {
                var n = i["" + t], s = t;
                n && n.length && ("dongman" == t && n.slice(0, 6), "live" == t ? (n = n.filter(function(t, e) {
                    return t.startTime = t.startTime ? u.default.time.format(new Date(t.startTime), "yyyy-MM-dd hh:mm") : "", 
                    ("LIVE_TYPE" == t.playStatus || "WAITING" == t.playStatus) && t.name;
                }), r.splice(e, 0, {
                    tagName: a[t].title,
                    listClass: "m-swiperList_live",
                    listItemClass: "m-swiperList_live_item",
                    itemPicClass: "m-swiperList_live_item-pic",
                    showList: n.slice(0, 10),
                    channelId: a[t].channelId,
                    rseat: a[t].rseat,
                    channelOrder: s
                }), h.default.send({
                    rpage: "wx_home",
                    block: "wx_block_home_live"
                })) : "zongyi" != t ? r.splice(e, 0, {
                    tagName: a[t].title,
                    listClass: "m-list_content",
                    listItemClass: "m-list_item",
                    itemPicClass: "m-list_item-pic",
                    showList: n,
                    channelId: a[t].channelId,
                    rseat: a[t].rseat,
                    channelOrder: s
                }) : r.splice(e, 0, {
                    tagName: a[t].title,
                    listClass: "m-list-horizontal_content",
                    listItemClass: "m-list-horizontal_item",
                    itemPicClass: "m-list-horizontal_item-pic",
                    showList: n,
                    channelId: a[t].channelId,
                    rseat: a[t].rseat,
                    channelOrder: s
                }));
            });
            var c = [];
            return r.forEach(function(t, e) {
                var i = t.showList, n = i && i.length || 0;
                ("live" == t.channelOrder ? n > 0 : n >= 6) && (i.map(function(t, e) {
                    o(t);
                }), c.push(t));
            }), c.forEach(function(t, e) {
                var i = e + 1;
                t.block = "wx_list" + i, t.index = i;
            }), c;
        }
        return t;
    },
    load: c.default,
    searchLayout: l.searchLayout,
    scrollBodyHeight: l.scrollBodyHeight,
    customType: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, i = arguments[1];
        switch (i.type) {
          case "SET":
            return e(i).customType || t;

          case "SWITCH_FOCUS":
            return i.customType || t;

          default:
            return t;
        }
    },
    customLink: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", i = arguments[1];
        switch (i.type) {
          case "SET":
            return e(i).customLink || t;

          case "SWITCH_FOCUS":
            return i.customLink || "";

          default:
            return t;
        }
    }
};