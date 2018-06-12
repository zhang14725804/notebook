function t(t) {
    for (var e = 0, a = t.length; e < a; ++e) {
        var r = t[e].data;
        if (r.score && (r.score = JSON.parse(r.score), r.score && (r.score = r.score.score.slice(0, 3)), 
        r.score || (r.score = "")), r.image_url_vertical ? r.image_url_vertical = r.image_url_vertical.replace(/(\/0)$/g, "/220") : r.image_url_vertical = "http://i.gtimg.cn/qqlive/images/20150608/pic_v.png", 
        r.imgtag) try {
            r.imgtag = JSON.parse(r.imgtag), r.imgtag.tag_2 && r.imgtag.tag_2.text && (r.imgtagUrl = n[r.imgtag.tag_2.text] && n[r.imgtag.tag_2.text]["2x"], 
            !r.imgtagUrl && (r.imgtagUrl = ""));
        } catch (t) {}
        t[e] = i([ "itemId", "data.image_url", "data.image_url_vertical", "data.imgtagUrl", "data.episode_updated", "data.publish_date", "data.score", "data.title" ].concat(o.fields().map(function(t) {
            return "data." + t;
        })), t[e]);
    }
    return t;
}

var e = require("../../module/page"), a = require("../../module/request/request"), n = require("../../module/dataset/marklabel/index"), i = require("../../module/dataset/field/index").filter, o = require("../../module/recreport"), r = require("../../module/guid"), s = r.getGuid();

e("channel", {
    comps: [ require("../../comps/topbar/topbar")() ],
    data: {
        pageName: "label",
        pageLabel: "",
        isShareOpen: !1,
        content: [],
        curId: "",
        status: {
            empty: !1,
            loading: !0,
            ret: 0
        },
        showtype: "v",
        option: {}
    },
    onShareAppMessage: function() {
        var t = this.data.option;
        return {
            title: t.metaname,
            desc: "腾讯视频不负好时光",
            path: "/pages/label/index?ptag=share&channelId=" + t.channelId + "&metaname=" + t.metaname + "&tagid=" + t.tagid + "&tagtype=" + t.tagtype + "&showtype=" + this.data.showtype
        };
    },
    onLoad: function(t) {
        this._channelId = t.channelId, this._showReportIndex = 0;
        var e = "";
        wx.getSystemInfo({
            success: function(t) {
                e = t, console.log(t);
            }
        });
        var a = this.$state && this.$state.firstShareOpen, n = t.metaname;
        e.windowWidth < 375 && (n = (n || "").split("·")[0]), a ? this.setData({
            isShareOpen: a,
            pageLabel: ""
        }) : wx.setNavigationBarTitle({
            title: t.metaname
        }), this.setData({
            curId: t.channelId,
            option: t,
            showtype: t.showtype || "v"
        }), this.loginData = {
            tryTimes: 0,
            pageContext: "",
            loadMore: !0
        }, this.fetch();
    },
    onPlay: function(t) {
        var e = t.currentTarget.dataset, a = e.index, n = e.id, i = "";
        try {
            var r = this.data.content[a], s = o.fieldPick(r, this._seqNum);
            s.ztid = this._channelId, i = o.report.call(this, "click", {
                recReportData: s
            }, 0, "channel_label_recommend");
        } finally {
            var l = 15 === n.length ? "cid=" + n : "vid=" + n;
            this.$route("play?" + l + "&parentParams=" + encodeURIComponent(i) + (this.data.isShareOpen ? "&firstshareopen=1" : ""));
        }
    },
    fetch: function(e) {
        function n(t) {
            i.loginData.tryTimes < 1 ? (i.loginData.tryTimes++, i.fetch(e)) : i.setData({
                status: {
                    empty: !e.notShowError,
                    loading: !1,
                    ret: t && t.code || "无"
                }
            });
        }
        e = e || {};
        var i = this;
        a.vaccess("label_sec", {
            seqNum: s + "_" + +new Date() + "_" + r.s4(),
            modNum: 1,
            pageContext: i.loginData.pageContext,
            channelId: i.data.option.channelId,
            dataKey: "source_key=" + i.data.option.channelId + "+tag_id=" + i.data.option.tagid + "+tag_type=" + i.data.option.tagtype,
            type: "personal_second_page_dery"
        }).then(function(a) {
            if (0 === a.status) {
                var r = a.modList && a.modList.length && a.modList[0] && a.modList[0].list || [], s = r.length, l = i.data.content.length;
                s ? (i.setData({
                    content: i.data.content.concat(t(r)),
                    status: {
                        empty: !1,
                        loading: !1,
                        ret: 0
                    }
                }), i.loginData.tryTimes = 0, i.loginData.pageContext = a.pageContext, i._seqNum = a.seqNum, 
                l || (i._showReportIndex = 9, o.report.call(i, "show", {
                    recReportList: r.slice(0, 9)
                }, 0, "channel_label_recommend", i._channelId))) : i.setData({
                    status: {
                        empty: !e.notShowError,
                        loading: !1,
                        ret: 0
                    }
                }), s < 24 && (i.loginData.loadMore = !1);
            } else n({
                code: "B." + a.status
            });
        }, function(t) {
            n(t), console.log("label_sec request reject");
        }).catch(function(t) {
            console.log("label_sec error:", t);
        });
    },
    onFetchAgain: function() {
        this.setData({
            status: {
                empty: !1,
                loading: !0,
                ret: 0
            }
        }), this.fetch();
    },
    onReachBottom: function() {
        if (this.data.content.length && this.loginData.loadMore) {
            var t = this.data.content.slice(this._showReportIndex);
            this._showReportIndex += t.length, this.setData({
                status: {
                    empty: !1,
                    loading: !0,
                    ret: 0
                }
            }), this.fetch({
                notShowError: !0
            }), t.length && o.report.call(this, "show", {
                recReportList: t
            }, 0, "channel_label_recommend", this._channelId);
        }
    }
});