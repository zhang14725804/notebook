var t = require("../../module/page"), a = require("../../module/request/request");

t("star", {
    comps: [ require("../../comps/topbar/topbar")() ],
    data: {
        actorName: "",
        actorId: "",
        desc: "",
        faceImageUrl: "",
        arts: [],
        relativeStars: [],
        isShareOpen: !1,
        status: {
            loading: !0,
            empty: !1,
            ret: 0
        }
    },
    onShareAppMessage: function(t) {
        return {
            title: this.data.actorName,
            desc: this.data.desc,
            path: "/pages/star/index?id=" + this.data.actorId + "&share=1"
        };
    },
    onLoad: function(t) {
        this.fetch(t), this.setData({
            isShareOpen: 1 == t.share
        });
    },
    fetch: function(t) {
        var e = this, s = t.id || t.starid;
        s ? (this.setData({
            actorId: s,
            "status.loading": !0,
            "status.empty": !1,
            "status.ret": 0
        }), a.vaccess("star_home", {
            type: "fan_home_works_tab",
            dataKey: "starid=" + s,
            pageContext: ""
        }).then(function(t) {
            if (0 === t.errCode) {
                var a = t.selfInfo, s = [], r = {
                    list: []
                }, i = [ {
                    list: t.worksList,
                    title: t.worksTitle,
                    key: "works"
                }, {
                    list: t.movieList,
                    title: t.movieTitle,
                    key: "movie"
                }, {
                    list: t.tvList,
                    title: t.tvTitle,
                    key: "tv"
                }, {
                    list: t.mvList,
                    title: t.mvTitle,
                    cssType: "h",
                    key: "mv"
                }, {
                    list: t.artsList,
                    title: t.artsTitle,
                    key: "arts"
                }, {
                    list: t.joinArtsList,
                    title: t.joinArtsTitle,
                    cssType: "h",
                    key: "joinArts"
                } ];
                try {
                    i.forEach(function(t) {
                        var a = t.list && t.list.posterList || [], e = t.title || {}, r = e.action && e.action.url || "", i = {
                            list: [],
                            cssType: t.cssType
                        }, o = +e.subhead;
                        a.forEach(function(t) {
                            var a = {};
                            a.firstLine = t.firstLine, a.imageUrl = t.imageUrl, a.markLabel = {}, (t.markLabelList || []).forEach(function(t, e, s) {
                                var r = (t.primeText || "").replace(/\<font\W+color\=\'#[a-z0-9]*\'\>/, "").replace(/\<\/font\>/, "");
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
                                        text: r
                                    };
                                    break;

                                  case 3:
                                    a.markLabel.bottomRight = {
                                        text: r
                                    };
                                }
                            });
                            var e = t.action && t.action.url || "";
                            if ((e = e.split("?")).length > 1) for (var s = e[1], r = 0, c = (s = s.split("&")).length; r < c; r++) {
                                var n = s[r].split("=") || [];
                                switch (n[0]) {
                                  case "cid":
                                    a.cid = n[1];
                                    break;

                                  case "lid":
                                    a.lid = n[1];
                                    break;

                                  case "vid":
                                    a.vid = n[1];
                                }
                            }
                            a.cid || a.lid || a.vid ? i.list.push(a) : o--;
                        }), i.title = e.title, i.subhead = o, i.key = t.key;
                        var c = r.split("?");
                        if (c.length > 1) for (var n = c[1], l = 0, d = (n = n.split("&")).length; l < d; l++) if (/^dataKey/.test(n[l])) {
                            i.dataKey = decodeURIComponent(n[l].replace(/dataKey\=/, "")), i.type = "fantuan_tab_sub_page";
                            break;
                        }
                        s.push(i);
                    });
                } catch (t) {
                    console.error(t);
                }
                for (var o = t.starList && t.starList.starList || [], c = 0, n = o.length; c < n; c++) {
                    var l = {};
                    l.actorName = o[c].actorName, l.actorId = o[c].actorId, l.faceImageUrl = o[c].faceImageUrl, 
                    r.list.push(l);
                }
                r.title = t.starTitle.title, e.setData({
                    actorName: a.starInfo.actorName,
                    actorId: a.starInfo.actorId,
                    faceImageUrl: a.starInfo.faceImageUrl,
                    desc: a.kvItemList[0].itemValue,
                    arts: s,
                    relativeStars: r,
                    "status.loading": !1,
                    "status.empty": !1,
                    "status.ret": 0
                }), "star" == e.$curPageName() ? wx.setNavigationBarTitle({
                    title: a.starInfo.actorName
                }) : console.log("页面已变更");
                var d = {
                    list: [],
                    actorId: a.starInfo.actorId,
                    actorName: a.starInfo.actorName,
                    faceImageUrl: a.starInfo.faceImageUrl,
                    desc: a.kvItemList[0].itemValue
                };
                a.kvItemList.forEach(function(t) {
                    d.list.push({
                        key: t.itemKey,
                        value: t.itemValue
                    });
                }), wx.setStorageSync("actor_baseinfo", d);
            } else e.setData({
                "status.loading": !1,
                "status.empty": !0,
                "status.ret": t.errCode
            });
        }, function(t) {
            var a = t.body && t.body.data && t.body.data.msg || t && t.code || t, s = t && t.code || "";
            e.setData({
                "status.loading": !1,
                "status.empty": !0,
                "status.ret": a + s
            }), console.log("get star info error: ", t);
        }).catch(function(t) {
            console.error(t);
        })) : e.setData({
            "status.loading": !1,
            "status.empty": !0,
            "status.ret": "invalid actorId"
        });
    },
    fetchAgain: function() {
        this.fetch({
            id: this.data.actorId
        });
    },
    onTapIntro: function(t) {
        this.$route("star-detail?actorId=" + this.data.actorId);
    },
    onTapPoster: function(t) {
        var a = t.currentTarget.dataset, e = a.cid || "", s = a.lid || "", r = [ "vid=" + (a.vid || ""), "lid=" + s, "cid=" + e, "firstshareopen=" + (this.data.isShareOpen ? "1" : "") ];
        this.$redirect("play?" + r.join("&"));
    },
    onTapMorePoster: function(t) {
        var a, e = t.currentTarget.dataset, s = e.dataKey, r = e.type, i = e.key, o = e.cssType, c = e.title;
        a = [ "type=" + r, "dataKey=" + encodeURIComponent(s), "key=" + i, "actorName=" + this.data.actorName, "title=" + c, "cssType=" + o ].join("&"), 
        this.$route("star-work?" + a);
    },
    onTapRelativeStar: function(t) {
        t.currentTarget.dataset.actorId;
        this.updateActorInfo("");
    },
    updateActorInfo: function(t) {
        var a = t.currentTarget.dataset.actorid;
        this.setData({
            arts: []
        }), this.fetch({
            id: a
        });
    }
});