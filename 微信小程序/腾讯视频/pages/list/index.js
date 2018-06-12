function t(t, e) {
    for (var a = [], s = 0, n = t.length; s < n; ++s) {
        var c = t[s].fields;
        c.vertical_pic_url = c.vertical_pic_url && c.vertical_pic_url.replace(/(\.jpg)$/g, "_o.jpg"), 
        c.horizontal_pic_url = c.horizontal_pic_url && c.horizontal_pic_url.replace(/(\.jpg)$/g, "_b.jpg"), 
        c.score && (c.score = c.score.score.slice(0, 3)), c.leading_actor && c.leading_actor.length && (c.leading_actor = c.leading_actor.join(" "));
        try {
            var l = JSON.parse(5 === o ? c.iphone30_imgtag : c.aphone40_imgtag);
            l && l.tag_2 && l.tag_2.text && (c.imgtagUrl = r[l.tag_2.text] && r[l.tag_2.text]["2x"]), 
            c.episode = l && l.tag_3 && l.tag_3.text || "";
        } catch (t) {}
        100109 == e ? a.push(i([ "cover_id", "horizontal_pic_url", "current_brief", "leading_actor", "imgtagUrl", "episode", "title" ], c)) : a.push(i([ "cover_id", "vertical_pic_url", "imgtagUrl", "episode", "score", "title" ], c));
    }
    return a;
}

var e = require("../../module/page"), a = require("../../module/request/request"), r = require("../../module/dataset/marklabel/index"), i = require("../../module/dataset/field/index").filter, o = 0, s = 375, n = 625;

wx.getSystemInfo({
    complete: function(t) {
        s = t && t.windowWidth || s, n = t && t.windowHeight + 56 || n, o = t && t.model && ~t.model.indexOf("iPhone") ? 5 : 3;
    }
});

var c = {
    tab: {
        100113: {
            name: "电视剧",
            strPlatform: "7",
            strVersion: "10800",
            strIntfID: "app_tv",
            needParam: "playright=2&pagesize=30&type=2&sourcetype=1"
        },
        100109: {
            name: "综艺",
            strPlatform: "7",
            strVersion: "20100",
            strIntfID: "app_variety",
            needParam: "playright=2&pagesize=30&type=10&sourcetype=3&-c_col_cover_len=0"
        },
        100173: {
            name: "电影",
            strPlatform: "7",
            strVersion: "10800",
            strIntfID: "app_movie",
            needParam: "playright=2&pagesize=30&type=1&sourcetype=1"
        },
        100119: {
            name: "动漫",
            strPlatform: "7",
            strVersion: "10500",
            strIntfID: "cartoon",
            needParam: "playright=2&pagesize=30&type=3&sourcetype=1"
        }
    },
    width: {
        c2: 52,
        c3: 66,
        c4: 80
    },
    limitLen: 360
};

e("list", {
    comps: [],
    data: {
        pageName: "list",
        pageLabel: "",
        isShareOpen: !1,
        nav: [],
        content: [],
        navRecord: {
            offset: 0
        },
        errCode: 0,
        computeHeight: n,
        loading: !0,
        loadingMore: !1,
        scrollLeft: {}
    },
    onShareAppMessage: function() {
        var t = [];
        for (var e in this.data.navRecord) this.data.navRecord.hasOwnProperty(e) && ("offset" === e ? t.push("offset=0") : t.push(e + "=" + this.data.navRecord[e]));
        return {
            title: "腾讯视频" + c.tab[this.data.navRecord.channelId || "100113"].name,
            desc: "不负好时光",
            path: "/pages/list/index?ptag=share&" + t.join("&")
        };
    },
    onLoad: function(t) {
        if (t.channelId) {
            var e = "·" + c.tab[t.channelId].name, r = this.$state && this.$state.firstShareOpen;
            r ? this.setData({
                isShareOpen: r,
                pageLabel: e
            }) : wx.setNavigationBarTitle({
                title: "腾讯视频" + e
            }), this.logicData = {
                hasMore: !0,
                platInfo: c.tab[t.channelId],
                tryTimes: 0
            }, t.offset = 0, this.setData({
                navRecord: t
            });
            var i = this;
            a.vaccess("vlist_index", this.logicData.platInfo).then(function(e) {
                if (!e.cResult) {
                    i.setData({
                        nav: e.vecIndexItemList
                    });
                    var a = {};
                    for (var r in t) if (t.hasOwnProperty(r)) {
                        var o = e.vecIndexItemList.length;
                        i.setData({
                            computeHeight: n - 40 * o - 36
                        });
                        for (var l = 0; l < o; ++l) {
                            var d = e.vecIndexItemList[l];
                            if (d.strIndexItemKey === r) {
                                for (var h, g = 0, p = 0, f = d.vecOptionList.length; p < f; ++p) {
                                    var u = d.vecOptionList[p];
                                    if (h = c.width["c" + u.strOptionName.length] || 52, u.strOptionValue == t[r]) break;
                                    g += h;
                                }
                                a[r] = g + h > s ? g : 0;
                            }
                        }
                    }
                    i.setData({
                        scrollLeft: a
                    });
                }
            }, function() {
                console.log("vlist_index request reject");
            }).catch(function(t) {
                console.log("vlist_index", t);
            }), this.fetch(this.getQueries(this.data.navRecord).join("&"));
        } else console.log("无频道id");
    },
    onChangeNav: function(t) {
        var e = t.currentTarget.dataset, a = e.key, r = e.id;
        if (this.data.navRecord[a] != r && (this.data.navRecord[a] || "-1" != r)) {
            var i = this.data.navRecord;
            i[a] = r, i.offset = 0, this.setData({
                navRecord: i,
                content: [],
                loading: !0,
                loadingMore: !1,
                errCode: 0
            }), this.logicData.hasMore = !0, this.logicData.tryTimes = 0;
            var o = this.getQueries(i);
            this.fetch(o.join("&"));
        }
    },
    getQueries: function(t) {
        var e = [];
        for (var a in t) {
            var r = t[a];
            t.hasOwnProperty(a) && e.push(a + "=" + r);
        }
        return e.push(this.logicData.platInfo.needParam), e;
    },
    onReachBottom: function() {
        if (this.logicData.hasMore && this.data.content.length) {
            var t = this.data.navRecord;
            t.offset = t.offset + 30, this.setData({
                navRecord: t,
                loadingMore: !0,
                errCode: 0
            }), this.logicData.tryTimes = 0;
            var e = this.getQueries(t);
            this.fetch(e.join("&"), {
                isBottomLoad: !0
            });
        }
    },
    onFetchAgain: function() {
        this.setData({
            loading: !0,
            errCode: 0
        }), this.fetch(this.getQueries(this.data.navRecord).join("&"));
    },
    fetch: function(e, r, i) {
        function o(t) {
            s.logicData.tryTimes < 1 ? (s.logicData.tryTimes++, s.fetch(e, r, i)) : s.setData({
                loading: !1,
                loadingMore: !1,
                errCode: t.code || "无"
            });
        }
        var s = this;
        a.vaccess("vlist_data", {
            strPlatform: s.logicData.platInfo.strPlatform,
            strVersion: s.logicData.platInfo.strVersion,
            strIntfID: s.logicData.platInfo.strIntfID,
            strListParam: e || s.logicData.platInfo.needParam,
            vecUnionInfo: [ {
                Tid: 734,
                strAppKey: "8958b7cdd69e7918",
                strAppID: "20001083"
            } ]
        }).then(function(e) {
            if (0 === e.cResult) {
                if (e.strListValue.length) try {
                    e.strListValue = JSON.parse(e.strListValue);
                } catch (t) {
                    console.log(t);
                }
                if (e.strListValue && e.strListValue.errorno) o({
                    code: "B." + e.strListValue.errorno
                }); else {
                    var a = t(e.strListValue && e.strListValue.results || [], s.data.navRecord.channelId);
                    s.setData({
                        content: r && r.isBottomLoad ? s.data.content.concat(a) : a,
                        loading: !1
                    }), s.logicData.tryTimes = 0;
                    var i = s.data.navRecord.offset + 30;
                    (i >= e.iTotalVideo || i >= c.limitLen) && (s.setData({
                        loadingMore: !1
                    }), s.logicData.hasMore = !1);
                }
            } else o({
                code: "B." + e.cResult
            });
        }, function(t) {
            o(t), console.log("vlist_data request reject");
        }).catch(function(t) {
            console.log("vlist_data error:", t);
        });
    },
    onPlay: function(t) {
        var e = t.currentTarget.dataset, a = 15 === e.id.length ? "cid=" + e.id : "vid=" + e.id;
        this.$route("play?" + a + (this.data.isShareOpen ? "&firstshareopen=1" : ""));
    }
});