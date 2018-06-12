function t() {
    return {
        status: {
            loading: !0,
            ret: 0,
            seqNum: ""
        },
        pageContext: "",
        tryTimes: 0,
        _isFetching: !1
    };
}

function e() {
    var e = {};
    return q.forEach(function(a) {
        e[a] = t();
    }), e;
}

function a() {
    var t = {};
    return q.forEach(function(e) {
        t[e] = [];
    }), t;
}

var n = require("../../module/page"), s = require("../../module/request/request"), i = (require("../../module/recreport"), 
require("../../module/fns")), o = require("../../comps/channeltpl/mods/util"), r = require("../../comps/channeltpl/mods/format"), c = r.format, h = require("./consts"), u = require("../../module/cache").session, d = require("../../module/guid"), l = d.getGuid(), g = require("../../comps/channeltpl/index"), f = "page=-1", m = require("../../module/boss")({
    app: "tinyapp",
    module: "channel"
}), p = require("../../module/login"), L = h.channelMap, q = h.channelIds, I = h.channelNav, v = e();

n("channel", i.extend({}, g, {
    comps: [ require("../search/index.js")("channel") ],
    data: {
        pageName: "channel",
        channelNav: I,
        modList: [],
        status: {
            loading: !0,
            ret: 0,
            seqNum: ""
        },
        subnav: L[q[0]].subnav,
        curId: q[0]
    },
    onLoad: function(t) {
        var e = this.curId;
        t && t.channelId && (e = t.channelId, ~q.indexOf(e) && this.setData({
            curId: e
        })), this.showCurChannel();
    },
    onReady: function() {
        function t(t, e) {
            setTimeout(function() {
                s.getLogicData()[e].length || v[e]._isFetching || s.$preLoad("/pages/channel/index?channelId=" + e);
            }, t);
        }
        function a(e) {
            e && e(), q.forEach(function(e, a) {
                t(i * (a + 1), e);
            });
        }
        var n = this, s = this, i = 150;
        a(), this._unbindLoginChange = p.onLoginChange(function() {
            v = e(), a(function() {
                var t = n.getLogicData();
                q.forEach(function(e, a) {
                    e !== n.data.curId && (t[e] = []);
                }), n.setLogicData(t);
            }), n.onRefresh();
        });
    },
    onUnload: function() {
        this._unbindLoginChange && this._unbindLoginChange(), this._unbindLoginChange = null;
    },
    onPreload: function(t) {
        this.fetch({
            id: t.query.channelId || this.data.curId,
            isPreload: !0
        });
    },
    showCurChannel: function() {
        var e = this, a = this.getLogicData()[this.data.curId];
        a && a.length ? (this.setData({
            status: v[this.data.curId],
            modList: a
        }), setTimeout(function() {
            e.data.modList.forEach(function(t, a) {
                e.modShow(e.data.curId, t, a);
            });
        }, 300)) : (v[this.data.curId] = t(), this.fetch());
    },
    onChangeNav: function(e) {
        var a = e.currentTarget.dataset.id;
        if (a != this.data.curId) {
            this.setData({
                curId: a
            });
            var n = this.getLogicData()[a], s = v[a];
            this.setData({
                modList: n || [],
                status: s.status
            }), n && n.length || (v[a] = t(), this.fetch());
        }
    },
    onChangeSub: function(t) {
        this.$route("list?" + t.currentTarget.dataset.queries + "&channelId=" + this.data.curId);
    },
    onReachBottom: function() {
        var t = this.data.curId, e = v[t], a = this.getLogicData()[t];
        if (e.pageContext !== f && a.length && !e._isFetching) {
            var n = {
                loading: !0,
                ret: 0,
                seqNum: ""
            };
            this.setData({
                status: n
            }), v[t].status = n, this.fetch();
        }
    },
    onPullDownRefresh: function() {
        this.data.modList.length && this.onRefresh({
            complete: function() {
                wx.stopPullDownRefresh();
            }
        });
    },
    onFetchAgain: function() {
        this.onRefresh();
    },
    onRefresh: function(t) {
        var e = v[this.data.curId];
        e.pageContext = "", e.tryTimes = 0;
        var a = {
            loading: !0,
            ret: 0,
            seqNum: ""
        };
        e.status = a, this.setData({
            modList: [],
            status: a
        }), this.fetch(t);
    },
    fetch: function(t) {
        function e(e) {
            if (u.tryTimes < 1) u.tryTimes++, !t.isPreload && n.fetch(t); else {
                var a = {
                    loading: !1,
                    ret: e && e.code || "无",
                    seqNum: e.seqNum || ""
                };
                !t.isPreload && n.setData({
                    status: a
                }), u.status = a, u.pageContext = f, t.complete && t.complete();
            }
            try {
                m.errorlog(e && e.code || "no err code");
            } catch (t) {}
        }
        var a = this, n = this, i = (t = t || {}).id || n.data.curId, h = this.getLogicData(), u = (h[i], 
        v[i]);
        u._isFetching = !0, s.vaccess("channel_data", {
            seqNum: l + "_" + +new Date() + "_" + d.s4(),
            channelId: i,
            modNum: 10,
            pageContext: u.pageContext
        }).then(function(n) {
            u._isFetching = !1;
            try {
                if (n && 0 === n.status) {
                    u.pageContext = n.pageContext, u.tryTimes = 0, n.modList = n.modList || [], n.modList.length || (u.pageContext = f);
                    var s = o.filter(n.modList);
                    c(s), r.formatHack(s);
                    var d = a.data.modList.concat(s), l = {
                        loading: !1,
                        ret: 0,
                        seqNum: ""
                    };
                    t.isPreload || a.setData({
                        modList: d,
                        status: l
                    }), u.status = l, h[i] = d, a.setLogicData(h), t.complete && t.complete(), t.isPreload || a.data.modList.forEach(function(t, e) {
                        a.modShow(i, t, e);
                    });
                } else e({
                    code: "B." + n.status,
                    seqNum: n.seqNum
                });
            } catch (t) {
                console.log("something error", t);
            }
        }, e).catch(e);
    },
    getLogicData: function() {
        return u.get("channel:data") || a();
    },
    setLogicData: function(t) {
        u.set("channel:data", t);
    },
    onShareAppMessage: function() {
        var t = "腾讯视频" + L[this.data.curId].name, e = "不负好时光";
        return this.data.showSearch && this.data.searchbar.word && (t = this.data.searchbar.word, 
        e = "腾讯视频不负好时光"), {
            title: t,
            desc: e,
            path: "/pages/channel/index?ptag=share&channelId=" + this.data.curId + "&search=" + this.data.showSearch + "&searchkey=" + encodeURIComponent(this.data.searchbar.word)
        };
    }
}));