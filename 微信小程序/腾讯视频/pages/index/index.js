var e = require("../../module/page"), t = require("../../module/request/request"), a = require("../../module/fns"), n = require("../../comps/channeltpl/mods/util"), o = require("../../comps/channeltpl/mods/format"), s = require("../../comps/channeltpl/index"), i = require("../../module/login"), c = require("../../module/recreport"), h = o.format, d = "page=-1", r = require("../../module/boss")({
    app: "tinyapp",
    module: "index"
}), u = require("../../module/guid"), m = u.getGuid(), g = "", l = 0;

e("index", a.extend({}, s, {
    data: {
        pageName: "index",
        modList: [],
        status: {
            loading: !0,
            ret: 0,
            seqNum: ""
        }
    },
    comps: [ require("../search/index.js")("index") ],
    onLoad: function() {
        this.fetch();
    },
    fetch: function(e) {
        function a(t) {
            l < 1 ? (l++, i.fetch(e)) : (i.setData({
                status: {
                    loading: !1,
                    ret: t && t.code || "无",
                    seqNum: t.seqNum || ""
                }
            }), e.complete && e.complete(), g = d);
            try {
                r.errorlog(t && t.code || "no err code");
            } catch (e) {}
        }
        var s = this, i = this;
        e = e || {}, t.vaccess("channel_data", {
            seqNum: m + "_" + +new Date() + "_" + u.s4(),
            channelId: 100101,
            modNum: 10,
            pageContext: g
        }).then(function(t) {
            try {
                if (t && 0 === t.status) {
                    g = t.pageContext, t.modList = t.modList || [], t.modList.length || (g = d);
                    var i = n.filter(t.modList);
                    h(i), o.formatHack(i), s.setData({
                        modList: s.data.modList.concat(i)
                    }), l = 0, s.setData({
                        status: {
                            loading: !1,
                            ret: 0,
                            seqNum: ""
                        }
                    }), e.complete && e.complete(), s.data.modList.forEach(function(e, t) {
                        s.modShow(e, t);
                    });
                } else a({
                    code: "B." + t.status,
                    seqNum: t.seqNum
                });
            } catch (e) {
                console.log("something error", e);
            }
        }, a).catch(a);
    },
    onReachBottom: function() {
        g !== d && this.data.modList.length && (this.setData({
            status: {
                loading: !0,
                ret: 0,
                seqNum: ""
            }
        }), this.fetch());
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
    onRefresh: function(e) {
        g = "", l = 0, this.setData({
            modList: [],
            status: {
                loading: !0,
                ret: 0,
                seqNum: ""
            }
        }), this.fetch(e);
    },
    onReady: function() {
        var e = this;
        this.$preLoad("/pages/hot/index"), this.$preLoad("/pages/channel/index"), this.$preLoad("/pages/user/index"), 
        this._unbindLoginChange = i.onLoginChange(function() {
            e.onRefresh();
        });
    },
    onUnload: function() {
        this._unbindLoginChange && this._unbindLoginChange(), this._unbindLoginChange = null;
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
    onChange: function(e) {
        var a = this, o = e.currentTarget.dataset.modidx, s = this.data.modList[o], i = s._change, c = i.changeSize;
        if (i.pageContext || (i.eachPageCnt = [ 0 ], i.focusCnt = 0, s.list.forEach(function(e) {
            1 == +e.pictype ? i.focusCnt++ : i.eachPageCnt[0]++;
        })), i.eachPageCnt.length >= i.changeTimes || i.pageContext === d) return this._changeShowItems(this.data.modList[o]);
        t.vaccess("label_sec", {
            seqNum: m + "_" + +new Date() + "_" + u.s4(),
            modNum: 1,
            pageContext: i.pageContext || "",
            channelId: 100101,
            dataKey: encodeURIComponent(s.cms_data.shake_datakey + "+shake_size=" + c),
            type: s.cms_data.shake_type
        }).then(function(e) {
            if (0 == +e.status) {
                e.modList = e.modList || [], e.modList.length && (e.modList[0].list = e.modList[0].list || []);
                var t = i.eachPageCnt.length;
                if ((1 !== t || 1 === t && 1 !== e.modList[0].list.length) && (e.modList[0].list = n.getEvenList(e.modList[0].list)), 
                !e.modList.length || !e.modList[0].list.length) return i.pageContext = d, a._changeShowItems(a.data.modList[o]);
                i.pageContext = e.pageContext;
                var c = e.modList;
                h(c), c[0].list.forEach(function(e) {
                    e._hide = !0;
                }), s.list = s.list.concat(c[0].list), a.setData({
                    modList: a.data.modList
                }), a.data.modList[o]._change.eachPageCnt.push(c[0].list.length);
            }
            a._changeShowItems(a.data.modList[o]), a.data.modList.forEach(function(e, t) {
                a.modShow(e, t);
            });
        }).catch(function(e) {
            console.log("onChange", e);
        });
    },
    _changeShowItems: function(e) {
        var t = e._change.eachPageCnt;
        e._change.curPage = e._change.curPage || 0, e._change.curPage++, e._change.curPage >= e._change.changeTimes && (e._change.curPage = 0);
        var a, n = e._change.curPage, o = e._change.focusCnt;
        t.forEach(function(e, t) {
            t < n && (o += e);
        }), a = o + t[n], e.list.forEach(function(e, t) {
            e._hide = !(t >= o && t < a);
        }), this.setData({
            modList: this.data.modList
        });
    },
    modShow: function(e, t) {
        if (!e._reported) {
            var a = this;
            e._reported = !0, e.list.forEach(function(n) {
                if (!n._reported && n._needRecreport) {
                    n._reported = !0;
                    try {
                        var o = c.fieldPick(n, e.meta.seq_num);
                        o.ztid = 100101, c.report.call(a, "show", {
                            recReportData: o
                        }, t || 0, "index_recommend");
                    } catch (e) {}
                }
            });
        }
    }
}));