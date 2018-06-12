var t = require("../../module/page"), e = require("./public/index")(), a = require("../../module/fns"), n = require("./data/fetch-index"), o = require("./data/fetch-nav"), i = require("./data/delete"), s = require("./consts").pageSize, r = require("../../module/cache").session, c = require("../../module/recreport");

require("../../module/login"), require("../../module/dataset/field/index").filter;

t("hot", a.extend({}, e, {
    onLoad: function(t) {
        function e() {
            var t = this;
            this._firstContent && this._firstContent.length ? (this.setData({
                content: this._firstContent,
                response: this._firstResponse
            }), this.initRecReport()) : this.fetchData({
                suc: function(e) {
                    t.initRecReport();
                }
            });
        }
        var a = this;
        this.setData({
            page: "hot"
        }), this._preloadNav ? (this.setData({
            nav: this._preloadNav,
            curId: this._preloadNav[0].channelItemId,
            tpltype: this._preloadNav[0].channelUIMode
        }), e.apply(this)) : o.get({}, function(t, n) {
            a.setData({
                nav: n,
                curId: n[0].channelItemId,
                tpltype: n[0].channelUIMode
            }), e.apply(a);
        }), this._onLoad(), this.exposeReport();
    },
    onPreload: function() {
        var t = this;
        o.get({}, function(e, a) {
            a && a.length && (t.data.tpltype = a[0].channelUIMode, t._preloadNav = a, t.fetchData({
                isPreload: 1,
                curId: a[0].channelItemId
            }));
        });
    },
    onChangeNav: function(t) {
        function e() {
            var t = this;
            this.setData({
                curId: n,
                tpltype: o,
                response: {
                    loading: !0,
                    ret: 0
                },
                content: []
            }), this.pageContext = "", this.refreshContext = "", this.hasNextPage = 1, this.fetchData({
                suc: function(e) {
                    t.initRecReport();
                }
            });
        }
        var a = t.currentTarget.dataset, n = a.id;
        if (n != this.data.curId) {
            this.video && this.video.stop(), this.setData({
                isPlayerStop: 1,
                isPlayerHidden: 1
            });
            var o = a.type, i = {
                content: this.data.content || [],
                response: this.data.response,
                curId: this.data.curId,
                pageContext: this.pageContext,
                refreshContext: this.refreshContext,
                hasNextPage: this.hasNextPage
            }, s = r.get("hot:channel:data") || {};
            if (Object.keys(s).length) {
                var c = s[n];
                c ? (this.setData({
                    content: c.content,
                    response: c.response,
                    curId: n,
                    tpltype: o
                }), this.pageContext = c.pageContext, this.refreshContext = c.refreshContext, this.hasNextPage = c.hasNextPage, 
                this.initRecReport()) : e.apply(this);
            } else e.apply(this);
            s[i.curId] = i, r.set("hot:channel:data", s), this.clickReport(t), this.exposeReport();
        }
    },
    showTopTips: function(t) {
        var e = this;
        1 !== this.data.tpltype && t && (this.setData({
            count: t,
            topTipShow: 1
        }), setTimeout(function() {
            e.setData({
                topTipShow: 0
            });
        }, 1e3));
    },
    getFeeds: function(t) {
        var e = this;
        t = t || {}, n.feeds(a.extend({}, {
            pageContext: this.pageContext,
            refreshContext: this.refreshContext,
            channelId: t.curId || this.data.curId
        }, {
            refreshType: t.refreshType ? 1 : 0
        }), {
            suc: t.suc,
            fail: t.fail,
            complete: function(a) {
                if (t.complete) return t.complete();
                var n = a.content;
                t.isBottomLoad && (n = e.data.content.concat(n)), t.isPreload ? (e._firstContent = n, 
                e._firstResponse = a.response) : e.setData({
                    content: n,
                    response: a.response
                }), e.pageContext = a.pageContext, e.refreshContext = a.refreshContext, e.hasNextPage = a.hasNextPage && n.length <= s;
            }
        });
    },
    getChannel: function(t) {
        var e = this;
        t = t || {}, n.channel({
            pageContext: this.pageContext,
            channelId: t.curId || this.data.curId
        }, {
            suc: t.suc,
            fail: t.fail,
            complete: function(a) {
                if (t.complete) return t.complete();
                var n = a.content;
                t.isBottomLoad && (n = e.data.content.concat(n)), t.isPreload ? (e._firstContent = n, 
                e._firstResponse = a) : e.setData({
                    content: n,
                    response: a.response
                }), e.pageContext = a.pageContext, e.hasNextPage = a.hasNextPage;
            }
        });
    },
    fetchData: function(t) {
        this[1 === this.data.tpltype ? "getChannel" : "getFeeds"](t);
    },
    onPullDownRefresh: function() {
        var t = this;
        this.video && this.video.stop(), this.pageContext = "", this.setData({
            content: [],
            response: {
                loading: !0,
                ret: 0
            },
            isPlayerHidden: 1
        }), this.fetchData({
            suc: function(e) {
                t.showTopTips(e.content && e.content.length || 0), t.initRecReport();
            }
        }), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 100);
    },
    toPlayPage: function(t) {
        var e = t.currentTarget.dataset, a = this.data.content, n = e.id;
        try {
            var o = a[e.modidx];
            this.modVideoRecClick(this.data.curId, o, e.modidx, o.meta.seq_num);
        } finally {
            var i = 15 === n.length ? "cid=" + n : "vid=" + n;
            this.$route("play?" + i + "&parentParams=" + encodeURIComponent("") + (this.data.isShareOpen ? "&firstshareopen=1" : "") + "&additional=channel_hot-" + this.data.curId);
        }
        this.clickReport(t);
    },
    onDeleteClick: function(t) {
        var e = this;
        i.del({
            datakey: t.currentTarget.dataset.datakey
        }, function() {
            var a = t.currentTarget.dataset.index, n = e.data.isPlayerHidden;
            e.curIdx == a && (e.video && e.video.stop(), n = !0), e.setData({
                content: e.data.content.filter(function(t, e) {
                    return e != a;
                }),
                isPlayerHidden: n
            }), wx.showToast({
                title: "将为您减少该类型视频推荐",
                duration: 2e3
            });
        });
    },
    onAwake: function() {
        this.video && this.video.stop(), this.pageContext = "", this.setData({
            content: [],
            response: {
                loading: !0,
                ret: 0
            }
        }), this.fetchData({
            refreshType: 1
        });
    },
    onChangeLabel: function(t) {
        var e = t.currentTarget.dataset;
        if ("type_30014" !== e.type) {
            var a = [ "channelId=" + this.data.curId, "tagid=" + e.tagid, "tagtype=" + e.tagtype, "metaname=" + e.metaname, "showtype=h" ];
            this.$route("label?" + a.join("&"));
        }
    },
    onShareAppMessage: function() {
        return {
            title: "全网热播短视频",
            desc: "腾讯视频不负好时光",
            path: "/pages/hot/index?ptag=share"
        };
    },
    _feedsPicClick: function(t) {
        var e = t.currentTarget.dataset, a = this.data.content;
        try {
            var n = a[e.index];
            this.videoFeedsReport(this.data.curId, n, e.index, "click");
            var o = (t.currentTarget.dataset.stat || "").split(":");
            this.$core.boss.click(o[0], {
                additional: o[1]
            });
        } finally {}
    },
    _onReachBottom: function() {
        var t = this;
        try {
            1 === this.data.tpltype ? this.data.content.forEach(function(e, a) {
                t.modRecShow(t.data.curId, e, a);
            }) : 2 === this.data.tpltype && this.data.content.forEach(function(e, a) {
                t.videoFeedsReport(t.data.curId, e, a);
            });
        } catch (t) {}
    },
    initRecReport: function() {
        var t = this;
        setTimeout(function() {
            try {
                var e = t.data.content.length;
                1 === t.data.tpltype ? e && t.modRecShow(t.data.curId, t.data.content[0], 0) : 2 === t.data.tpltype && (e && t.videoFeedsReport(t.data.curId, t.data.content[0], 0), 
                e > 1 && t.videoFeedsReport(t.data.curId, t.data.content[1], 1));
            } catch (t) {}
        }, 100);
    },
    clickReport: function(t) {
        var e = t.currentTarget.dataset.stat.split(":");
        this.$core.boss.click(e[0], {
            additional: e[1]
        });
    },
    exposeReport: function() {
        this.$core.boss.pv("channel_hot", {
            additional: "channel_hot-" + this.data.curId
        });
    },
    modVideoRecClick: function(t, e, a, n) {
        try {
            var o = c.fieldPick(e, n);
            o.ztid = t, c.report.call(this, "click", {
                recReportData: o
            }, a || 0, "hot_recommend");
        } catch (t) {
            console.log("hot_recommend", t);
        }
    },
    modRecShow: function(t, e, a) {
        if (!e._reported) {
            var n = this;
            e._reported = !0, e.list.forEach(function(o) {
                if (!o._reported) {
                    o._reported = !0;
                    try {
                        var i = c.fieldPick(o, e.meta.seq_num);
                        i.ztid = t, c.report.call(n, "show", {
                            recReportData: i
                        }, a || 0, "hot_recommend");
                    } catch (t) {}
                }
            });
        }
    }
}));