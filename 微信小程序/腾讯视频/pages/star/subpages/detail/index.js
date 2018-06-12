var t = require("../../../../module/page"), a = require("../../../../module/request/request");

t("stardetail", {
    comps: [ require("../../../../comps/topbar/topbar")() ],
    data: {
        actorId: "",
        actorName: "",
        achievement: [],
        detailInfo: [],
        desc: "",
        faceImageUrl: "",
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
            path: "/pages/star/subpages/detail/index?actorId=" + this.data.actorId + "&share=1"
        };
    },
    onLoad: function(t) {
        t = t || {};
        var a = this;
        this.setData({
            actorId: t.actorId,
            isShareOpen: 1 == t.share
        });
        var e = wx.getStorageSync("actor_baseinfo"), s = [], r = [];
        e && e.list && e.list.length > 0 && e.actorId === t.actorId ? (e.list.forEach(function(t) {
            switch (t.key) {
              case "主要成就":
                s = t.value && t.value.split("\r");
                break;

              default:
                "简介" !== t.key && r.push({
                    itemKey: t.key,
                    itemValue: t.value || "不详"
                });
            }
        }), a.setData({
            status: {
                loading: !1,
                empty: !1,
                ret: 0
            },
            actorName: e.actorName,
            achievement: s,
            detailInfo: r,
            faceImageUrl: e.faceImageUrl,
            desc: e.desc
        }), wx.setNavigationBarTitle({
            title: e.actorName + " · 简介"
        })) : this.fetchStarDetail(t);
    },
    fetchStarDetail: function(t) {
        var e = this;
        t.actorId ? a.vaccess("star_home", {
            type: "fan_home_works_tab",
            dataKey: "starid=" + t.actorId,
            pageContext: ""
        }).then(function(t) {
            if (0 === t.errCode) {
                for (var a, s, r = t.selfInfo, i = r.kvItemList, o = [], c = 0, d = i.length; c < d; c++) if ("主要成就" === i[c].itemKey) {
                    var n = i[c].itemValue;
                    a = n && n.split("\r");
                } else "简介" !== i[c].itemKey ? o.push({
                    itemKey: i[c].itemKey,
                    itemValue: i[c].itemValue || "不详"
                }) : "简介" == i[c].itemKey && (s = i[c].itemValue);
                e.setData({
                    "status.loading": !1,
                    "status.empty": !1,
                    "status.ret": 0,
                    actorId: r.starInfo.actorId,
                    actorName: r.starInfo.actorName,
                    achievement: a,
                    detailInfo: o,
                    faceImageUrl: r.starInfo.faceImageUrl,
                    desc: s
                }), wx.setNavigationBarTitle({
                    title: r.starInfo.actorName + " · 简介"
                });
                var l = {
                    list: [],
                    actorId: r.starInfo.actorId,
                    actorName: r.starInfo.actorName,
                    faceImageUrl: r.starInfo.faceImageUrl,
                    desc: r.kvItemList[0].itemValue
                };
                r.kvItemList.forEach(function(t) {
                    l.list.push({
                        key: t.itemKey,
                        value: t.itemValue
                    });
                }), wx.setStorageSync("actor_baseinfo", l);
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
            });
        }) : e.setData({
            "status.loading": !1,
            "status.empty": !0,
            "status.ret": "invalid actorId"
        });
    },
    fetchStartDetailAgain: function() {
        this.fetchStarDetail({
            actorId: this.data.actorId
        });
    }
});