var t = require("../../components_618/constant"), e = require("../../../../bases/component.js"), n = require("../../model.js"), a = require("../../utils.js");

new e({
    properties: {
        gridSelectedConfig: {
            type: Object,
            observer: function(e) {
                a.checkTime(t.SALE_BEGIN, t.SALE_END) ? this.triggerEvent("componentLoad", this.is) : (this.MAX_NUM = e.total || "24", 
                this.loadEntryData(this.MAX_NUM));
            }
        }
    },
    data: {
        entries: []
    },
    methods: {
        loadEntryData: function(t) {
            var e = this;
            n.getEntryData(200, t).then(function(t) {
                var n = [];
                t.forEach(function(t) {
                    var a = t.list && t.list[0];
                    n.length < e.MAX_NUM && a && n.push({
                        id: t.id,
                        name: t.martname.split("|")[0],
                        desc: a.content.split("|")[0],
                        flag: a.content.split("|")[1],
                        image: e.utils.getImg(a.img, 160),
                        url: a.url,
                        tagID: t.martname.split("|")[1]
                    });
                }), n.length ? (n = n.slice(0, 9), e.setData({
                    entries: n
                }, function() {
                    e.triggerEvent("componentLoad", e.is);
                })) : e.loadPpmsData();
            }).catch(function(t) {
                t.code, t.message;
                e.loadPpmsData();
            });
        },
        loadPpmsData: function() {
            var t = this;
            this.biz.getPPMS(33210).then(function(e) {
                var n = e[0] && e[0].guanqu || [], i = [];
                n.sort(function(t, e) {
                    return t.sign - e.sign > 0 ? 1 : -1;
                }), n.forEach(function(e) {
                    var n = a.checkTime(e.startTime, e.endTime);
                    i.length < t.MAX_NUM && n && i.push({
                        id: e.ppmsItemId,
                        name: e.name,
                        desc: e.desc,
                        image: t.utils.getImg(e.img, 160),
                        url: e.url
                    });
                }), t.setData({
                    entries: i
                }, function() {
                    t.triggerEvent("componentLoad", t.is);
                });
            }).catch(function(e) {
                e.code, e.message;
                t.setData({
                    entries: null
                }, function() {
                    t.triggerEvent("componentLoad", t.is);
                });
            });
        },
        tapOnItem: function(t) {
            var e = t.currentTarget.dataset.url;
            e || (e = "https://wqs.jd.com/portal/wx/wallet/wallet_chanels.shtml?ptag=137889.6.2"), 
            this.$goto("/pages/h5/index", {
                url: e
            });
        }
    }
});