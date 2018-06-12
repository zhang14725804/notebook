var t = require("../../module/helper").formatNum, e = require("./attend-model");

module.exports = function() {
    return {
        data: {
            introduction: {
                firstLine: "",
                secondLine: [],
                text: "",
                subhead: "",
                updateDetail: "",
                actorList: [],
                attended: !1,
                showHD: !1,
                renderred: !1
            }
        },
        initPlaydesc: function(a) {
            var i = this, n = a.videodetail, r = n.introductionMap[n.cid || n.lid || n.vid];
            this.setData({
                introduction: {
                    hideIntroduction: !(r.action && r.action.url),
                    renderred: !0,
                    firstLine: r.poster.firstLine,
                    secondLine: [ {
                        value: r.poster.rating ? r.poster.rating / 10 + "分" : null
                    } ].concat(r.detailInfo && r.detailInfo.filter(function(t) {
                        return ~[ "marklabel", "type", "total", "update0" ].indexOf(t.itemId);
                    }).map(function(t) {
                        var e = {};
                        return e.highlight = "marklabel" == t.itemId, t.itemValue ? e.value = t.itemValue : t.itemValues && (e.value = t.itemValues[0]), 
                        e;
                    })).concat([ {
                        value: t(r.poster.playCount)
                    } ]).filter(function(t) {
                        return t && t.value;
                    }),
                    text: r.text,
                    subhead: r.subhead,
                    updateDetail: isNaN(+n.videoDataMap[n.defaultVideoDataKey].updateDetail) ? n.videoDataMap[n.defaultVideoDataKey].updateDetail : "",
                    actorList: n.actorDataMap && n.actorDataMap.intro && n.actorDataMap.intro.actorInfoList
                }
            });
            var o = "";
            try {
                o = n.detailMoreInfo.expansionMap[n.cid || n.vid].attentItem.attentKey;
            } finally {}
            this.attendModel = e(o, r.poster).onChange(function(t) {
                i.$setData("introduction", {
                    attended: t
                });
            });
        },
        doAttend: function(t) {
            +t.currentTarget.dataset.action ? this.attendModel.add() : this.attendModel.remove();
        },
        doShare: function() {
            this.showToast({
                title: "点击右上角「···」\n分享给好友",
                timeout: 2e3
            });
        },
        onTapActorAvatar: function(t) {
            var e = t.currentTarget.dataset.actorId || "";
            e && this.$route("star?id=" + e);
        },
        selectHD: function(t) {
            "end" != this.videoState.state && (t.currentTarget.dataset.fname && !t.currentTarget.dataset.selected && (console.log("selectHD", t.currentTarget.dataset.fname), 
            this.changeDefn(t.currentTarget.dataset.fname)), this.$setData("introduction", {
                showHD: !this.data.introduction.showHD
            }));
        }
    };
};