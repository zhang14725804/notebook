var t = require("../../../../module/page"), a = require("../../../../module/request/request");

t("starwork", {
    comps: [ require("../../../../comps/topbar/topbar")() ],
    data: {
        title: "",
        actorName: "",
        key: "",
        type: "",
        cssType: "",
        dataKey: "",
        pageContext: "",
        desc: "",
        status: {
            empty: !1,
            loading: !1,
            scrollLoading: !1,
            ret: 0
        },
        pagecontext: "",
        isShareOpen: !1,
        poster: {
            list: [],
            cssType: ""
        }
    },
    onReachBottom: function() {
        this.data.pageContext && !this.data.status.empty && (this.setData({
            "status.scrollLoading": !0
        }), this.fetchStarWork({
            more: !0,
            title: this.data.title,
            actorName: this.data.actorName,
            key: this.data.key,
            type: this.data.type,
            cssType: this.data.cssType,
            dataKey: this.data.dataKey,
            pageContext: this.data.pageContext
        }));
    },
    onShareAppMessage: function(t) {
        var a = [ "share=1", "title=" + this.data.title, "actorName=" + this.data.actorName, "key=" + this.data.key, "cssType=" + this.data.cssType, "type=" + this.data.type, "dataKey=" + this.data.dataKey, "pageContext=" ];
        return {
            title: this.data.actorName,
            desc: this.data.desc,
            path: "/pages/star/subpages/work/index?" + a.join("&")
        };
    },
    onLoad: function(t) {
        this.setData({
            isShareOpen: 1 == t.share
        }), this.fetchStarWork(t);
    },
    fetchStarWork: function(t) {
        var e = this;
        if (t.dataKey) {
            e.setData({
                actorName: t.actorName,
                title: t.title,
                key: t.key,
                type: t.type,
                cssType: t.cssType,
                dataKey: t.dataKey,
                pageContext: t.pageContext,
                "status.loading": !t.more,
                "status.empty": !1,
                "status.ret": 0
            });
            var s = t.key;
            a.vaccess("star_home", {
                type: t.type,
                dataKey: decodeURIComponent(t.dataKey),
                pageContext: this.data.pageContext || ""
            }).then(function(a) {
                if (0 == a.errCode) {
                    var i = {
                        list: a[s + "List"],
                        title: a[s + "Title"]
                    }, r = i.list && i.list.posterList || [], o = i.title || {}, c = o.action && o.action.url || "", d = {
                        list: [],
                        cssType: t.cssType || ""
                    };
                    r.forEach(function(t) {
                        var a = {};
                        a.firstLine = t.firstLine, a.imageUrl = t.imageUrl, a.markLabel = {}, (t.markLabelList || []).forEach(function(t, e, s) {
                            var i = (t.primeText || "").replace(/\<font\W+color\=\'#[a-z0-9]*\'\>/, "").replace(/\<\/font\>/, "");
                            switch (t.position) {
                              case 0:
                                break;

                              case 1:
                                a.markLabel.topRight = {
                                    markImageUrl: t.markImageUrl
                                };
                                break;

                              case 2:
                                a.markLabel.bottomLeft = {
                                    text: i
                                };
                                break;

                              case 3:
                                a.markLabel.bottomRight = {
                                    text: i
                                };
                            }
                        });
                        var e = t.action && t.action.url || "";
                        if ((e = e.split("?")).length > 1) for (var s = e[1], i = 0, r = (s = s.split("&")).length; i < r; i++) {
                            var o = s[i].split("=") || [];
                            switch (o[0]) {
                              case "cid":
                                a.cid = o[1];
                                break;

                              case "lid":
                                a.lid = o[1];
                                break;

                              case "vid":
                                a.vid = o[1];
                            }
                        }
                        (a.cid || a.lid || a.vid) && d.list.push(a);
                    });
                    var n = c.split("?");
                    if (n.length > 1) for (var p = n[1], l = 0, y = (p = p.split("&")).length; l < y; l++) if (/^dataKey/.test(p[l])) {
                        d.dataKey = decodeURIComponent(p[l].replace(/dataKey\=/, "")), d.type = "fantuan_tab_sub_page";
                        break;
                    }
                    var h = wx.getStorageSync("actor_baseinfo");
                    e.setData({
                        pageContext: a.pageContext,
                        "poster.list": e.data.poster.list.concat(d.list),
                        "poster.cssType": d.cssType,
                        desc: h.desc,
                        "status.scrollLoading": !1,
                        "status.loading": !1,
                        "status.empty": !1,
                        "status.ret": 0
                    }), wx.setNavigationBarTitle({
                        title: t.actorName ? t.actorName + (t.title ? " · " + t.title : "") : "腾讯视频"
                    });
                } else e.setData({
                    "status.loading": !1,
                    "status.empty": !0,
                    "status.ret": a.errCode
                });
            }, function(t) {
                var a = t.body && t.body.data && t.body.data.msg || t && t.code || t, s = t && t.code || "";
                e.setData({
                    "status.loading": !1,
                    "status.empty": !0,
                    "status.ret": a + s
                });
            }).catch(function(t) {
                console.error(t);
            });
        } else e.setData({
            "status.loading": !1,
            "status.empty": !0,
            "status.ret": "invalid datakey"
        });
    },
    fetchStarWorkAgain: function() {
        var t = this.data;
        this.fetchStarWork({
            actorName: t.actorName,
            title: t.title,
            key: t.key,
            type: t.type,
            cssType: t.cssType,
            dataKey: t.dataKey,
            pageContext: t.pageContext,
            more: !t.status.loading
        });
    },
    onTapWorkPoster: function(t) {
        var a = t.currentTarget.dataset, e = a.cid || "", s = a.lid || "", i = [ "vid=" + (a.vid || ""), "lid=" + s, "cid=" + e, "firstshareopen=" + (this.data.isShareOpen ? "1" : "") ];
        this.$redirect("play?" + i.join("&"));
    }
});