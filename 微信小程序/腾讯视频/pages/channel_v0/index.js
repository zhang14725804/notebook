function t(t) {
    for (var e = [], a = 0, r = t.length; a < r; ++a) {
        var o = t[a], d = o.list.length;
        if (d % 2 && (o.list = o.list.slice(0, d - 1), d -= 1), d) {
            for (var c = 0; c < d; ++c) {
                var u = o.list[c].data;
                if (u.score && (u.score = JSON.parse(u.score), u.score && (u.score = u.score.score.slice(0, 3)), 
                u.score || (u.score = "")), u.image_url ? o.list[c].itemId && 15 === o.list[c].itemId && (u.image_url = u.image_url.replace(/(\/0)$/g, "/332")) : u.image_url = "http://i.gtimg.cn/qqlive/images/20150608/pic_h.png", 
                u.imgtag) try {
                    u.imgtag = JSON.parse(u.imgtag), u.imgtag.tag_2 && u.imgtag.tag_2.text && (u.imgtagUrl = i[u.imgtag.tag_2.text] && i[u.imgtag.tag_2.text]["2x"], 
                    !u.imgtagUrl && (u.imgtagUrl = ""));
                } catch (t) {}
                o.list[c] = n([ "itemId", "data.image_url", "data.imgtagUrl", "data.episode_updated", "data.score", "data.title", "data.sub_title", "data.publish_date" ].concat(s.fields().map(function(t) {
                    return "data." + t;
                })), o.list[c]);
            }
            e.push(o);
        }
    }
    return e;
}

var e = require("../../module/page"), a = require("../../module/request/request"), i = (require("../../module/message"), 
require("../../module/dataset/marklabel/index")), s = require("../../module/recreport"), n = require("../../module/dataset/field/index").filter, r = require("../../module/cache").session, o = require("../../module/guid"), d = o.getGuid(), c = {
    100113: {
        name: "电视剧",
        subnav: [ {
            name: "偶像爱情",
            queries: "itype=12&sort=18&iyear=1&feature=1"
        }, {
            name: "宫斗权谋",
            queries: "itype=12&sort=18&iyear=1&feature=2"
        }, {
            name: "玄幻史诗",
            queries: "itype=12&sort=18&iyear=1&feature=3"
        }, {
            name: "全部分类",
            queries: "itype=12&sort=18&iyear=1&feature=-1"
        } ]
    },
    100109: {
        name: "综艺",
        subnav: [ {
            name: "真人秀",
            queries: "itype=58&sort=4"
        }, {
            name: "自制",
            queries: "itype=67&sort=4"
        }, {
            name: "音乐",
            queries: "itype=69&sort=4"
        }, {
            name: "脱口秀",
            queries: "itype=22&sort=4"
        }, {
            name: "全部分类",
            queries: "sort=4"
        } ]
    },
    100173: {
        name: "电影",
        subnav: [ {
            name: "院线",
            queries: "itype=1&sort=18&iyear=11"
        }, {
            name: "科幻",
            queries: "itype=12&sort=18&iyear=11"
        }, {
            name: "爱情",
            queries: "itype=5&sort=18&iyear=11"
        }, {
            name: "喜剧",
            queries: "itype=3&sort=18&iyear=11"
        }, {
            name: "全部分类",
            queries: "itype=99&sort=18&iyear=11"
        } ]
    },
    100119: {
        name: "动漫",
        subnav: [ {
            name: "国漫",
            queries: "iarea=1&sort=18"
        }, {
            name: "日漫",
            queries: "iarea=2&sort=18"
        }, {
            name: "搞笑",
            queries: "itype=1&sort=18"
        }, {
            name: "推理",
            queries: "itype=14&sort=18"
        }, {
            name: "全部分类",
            queries: "sort=18"
        } ]
    }
}, u = {
    100113: {
        status: {
            empty: !1,
            loading: !0,
            ret: 0
        },
        loadMore: !0,
        pageContext: "",
        tryTimes: 0
    },
    100109: {
        status: {
            empty: !1,
            loading: !0,
            ret: 0
        },
        loadMore: !0,
        pageContext: "",
        tryTimes: 0
    },
    100173: {
        status: {
            empty: !1,
            loading: !0,
            ret: 0
        },
        loadMore: !0,
        pageContext: "",
        tryTimes: 0
    },
    100119: {
        status: {
            empty: !1,
            loading: !0,
            ret: 0
        },
        loadMore: !0,
        pageContext: "",
        tryTimes: 0
    }
};

e("channel", {
    comps: [ require("../search/index.js")("channel") ],
    data: {
        pageName: "channel",
        tabs: [ {
            name: c[100113].name,
            id: 100113
        }, {
            name: c[100109].name,
            id: 100109
        }, {
            name: c[100173].name,
            id: 100173
        }, {
            name: c[100119].name,
            id: 100119
        } ],
        content: {
            data: [],
            status: {
                empty: !1,
                loading: !0,
                ret: 0
            }
        },
        subnav: c[100113].subnav,
        curId: 100113
    },
    onLoad: function(t) {
        if (t && t.channelId) {
            var e = t.channelId;
            100113 != e && 100109 != e && 100173 != e && 100119 != e || this.setData({
                curId: t.channelId
            });
        }
        this.showInitedChannel();
    },
    onReady: function() {
        function t(t, a) {
            setTimeout(function() {
                e.getLogicData()[a].length || u[a]._isFetching || e.$preLoad("/pages/channel/index?channelId=" + a);
            }, t);
        }
        var e = this;
        [ "100109", "100173", "100119" ].forEach(function(e, a) {
            t(150 * (a + 1), e);
        });
    },
    showInitedChannel: function() {
        var t = this.getLogicData()[this.data.curId];
        t.length ? (this.partSetViewArr(t), this.modShow(this.data.curId, t[0]), t[0].list.length < 4 && this.modShow(this.data.curId, t[1], 1)) : this.fetch({
            isPartShow: !0
        });
    },
    onPreload: function(t) {
        this.fetch({
            id: t.query.channelId ? t.query.channelId : this.data.curId,
            isPreload: !0
        });
    },
    onChangeNav: function(t) {
        var e = t.currentTarget.dataset.id;
        if (e != this.data.curId) {
            var a = this.getLogicData()[e], i = u[e];
            this.setData({
                curId: e,
                content: {
                    data: a,
                    status: i.status
                },
                subnav: c[e].subnav
            }), i._isFetching || (a.length ? (this.modShow(e, a[0]), a[0].list.length < 4 && this.modShow(e, a[1], 1)) : (i.tryTimes = 0, 
            this.fetch({
                isPartShow: !0
            })));
        }
    },
    fetch: function(e) {
        function i(t) {
            h.tryTimes < 1 ? (h.tryTimes++, s.fetch(e)) : (h.status = {
                empty: !e.notShowError,
                loading: !1,
                ret: t && t.code || "无"
            }, e.isPreload || s.setData({
                content: {
                    data: c,
                    status: h.status
                }
            }));
        }
        var s = this, n = (e = e || {}).id || s.data.curId, r = this.getLogicData(), c = r[n], h = u[n];
        h._isFetching = !0, a.vaccess("channel_data", {
            seqNum: d + "_" + +new Date() + "_" + o.s4(),
            channelId: n,
            modNum: 10,
            pageContext: e.pageContext || h.pageContext
        }).then(function(a) {
            if (h._isFetching = !1, 0 === a.status) {
                a.modList = a.modList || [];
                var o = !(a.modList.length < 10);
                a.modList = t(a.modList), e.isPreload || c.length || !a.modList.length || setTimeout(function() {
                    s.modShow(n, a.modList[0]), a.modList[0].list.length < 4 && s.modShow(n, a.modList[1], 1);
                }, 50);
                var d = e.refresh ? a.modList : c.concat(a.modList);
                u[n] = h = {
                    status: {
                        empty: !1,
                        loading: !1,
                        ret: 0
                    },
                    pageContext: a.pageContext,
                    loadMore: o,
                    tryTimes: 0
                }, e.isPreload || (e.isPartShow ? s.partSetViewArr(d, h.status) : s.setData({
                    content: {
                        data: d,
                        status: h.status
                    }
                })), r[n] = d, s.setLogicData(r);
            } else i({
                code: "B." + a.status
            });
            e.complete && e.complete();
        }, function(t) {
            i(t), e.complete && e.complete(), console.log("channel_data from channel page, request reject");
        }).catch(function(t) {
            e.complete && e.complete(), console.log("channel_data error: ", t);
        });
    },
    onReachBottom: function() {
        var t = this, e = this.getLogicData()[this.data.curId], a = u[this.data.curId];
        if (a.loadMore && e.length) {
            var i = e.slice(0);
            a.status = {
                loading: !0,
                empty: !1,
                ret: 0
            }, this.setData({
                content: {
                    data: e,
                    status: a.status
                }
            }), this.fetch({
                notShowError: !0
            }), i.forEach(function(e, a) {
                t.modShow(t.data.curId, e, a);
            });
        }
    },
    onChangeSub: function(t) {
        this.$route("list?" + t.currentTarget.dataset.queries + "&channelId=" + this.data.curId);
    },
    onChangeLabel: function(t) {
        var e = t.currentTarget.dataset, a = [ "channelId=" + this.data.curId, "tagid=" + e.tagid, "tagtype=" + e.tagtype, "metaname=" + e.metaname ];
        this.$route("label?" + a.join("&"));
    },
    toPlayPage: function(t) {
        var e = t.currentTarget.dataset, a = this.data.content.data, i = e.id, n = "";
        try {
            var r = a[e.modidx], o = r.list[e.index], d = s.fieldPick(o, r.meta.seq_num);
            d.ztid = this.data.curId, n = s.report.call(this, "click", {
                recReportData: d
            }, e.modidx, "channel_recommend");
        } finally {
            var c = 15 === i.length ? "cid=" + i : "vid=" + i;
            this.$route("play?" + c + "&parentParams=" + encodeURIComponent(n) + (this.data.isShareOpen ? "&firstshareopen=1" : ""));
        }
    },
    onPullDownRefresh: function() {
        var t = this.getLogicData();
        t[this.data.curId] = [], this.setLogicData(t), u[this.data.curId] = {
            pageContext: "",
            loadMore: !0,
            status: {
                loading: !0,
                empty: !1,
                ret: 0
            }
        }, this.setData({
            content: {
                data: [],
                status: u[this.data.curId].status
            }
        }), this.fetch({
            refresh: !0,
            complete: function() {
                wx.stopPullDownRefresh();
            },
            isPartShow: !0
        });
    },
    onFetchAgain: function() {
        this.setData({
            content: {
                data: [],
                status: {
                    empty: !1,
                    loading: !0,
                    ret: 0
                }
            }
        }), this.fetch();
    },
    onShareAppMessage: function() {
        var t = "腾讯视频" + c[this.data.curId].name, e = "不负好时光";
        return this.data.showSearch && this.data.searchbar.word && (t = this.data.searchbar.word, 
        e = "腾讯视频不负好时光"), {
            title: t,
            desc: e,
            path: "/pages/channel/index?ptag=share&channelId=" + this.data.curId + "&search=" + this.data.showSearch + "&searchkey=" + encodeURIComponent(this.data.searchbar.word)
        };
    },
    modShow: function(t, e, a) {
        if (!e._reported) {
            var i = this;
            e._reported = !0, e.list.forEach(function(n) {
                var r = s.fieldPick(n, e.meta.seq_num);
                r.ztid = t, s.report.call(i, "show", {
                    recReportData: r
                }, a || 0, "channel_recommend");
            });
        }
    },
    onAwake: function() {
        this.setLogicData({
            100113: [],
            100109: [],
            100173: [],
            100119: []
        }), this.setData({
            content: {
                data: [],
                status: {
                    empty: !1,
                    loading: !0,
                    ret: 0
                }
            },
            subnav: c[100113].subnav,
            curId: 100113
        }), this.showInitedChannel();
    },
    partSetViewArr: function(t, e) {
        var a = this, i = t.length, s = t.slice(0, 2), n = e || this.data.content.status;
        this.setData({
            content: {
                data: s,
                status: n
            }
        }), i > 2 && setTimeout(function() {
            a.setData({
                content: {
                    data: t,
                    status: n
                }
            });
        }, 150);
    },
    getLogicData: function() {
        return r.get("channel:data") || {
            100113: [],
            100109: [],
            100173: [],
            100119: []
        };
    },
    setLogicData: function(t) {
        r.set("channel:data", t);
    }
});