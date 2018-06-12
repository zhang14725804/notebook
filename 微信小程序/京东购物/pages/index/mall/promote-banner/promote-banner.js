var e = require("../../../../bases/component.js"), t = require("../common-behavior.js"), r = require("../../../../libs/promise.min.js"), n = require("../../model.js");

new e({
    behaviors: [ t ],
    data: {
        banner: [],
        hideModule: !1,
        showImage: !1
    },
    methods: {
        refresh: function() {
            this.init();
        },
        init: function() {
            var e = this;
            n.getCpcData([ 10409 ], [ 27339 ], {}, Date.now()).then(function(e) {
                return e && e[10409] && e[10409][27339] && e[10409][27339][0] ? e[10409][27339][0] : r.reject("get cpc data error");
            }).then(function(t) {
                var n = t.sUrl, a = t.pps, i = t.material, s = t.userdata1, o = t.userdata2, u = t.userdata3, c = parseInt(t.promotion), d = e.utils.getImg(i);
                if (!d || isNaN(c) || c < 1 || c > 4) return r.reject("get cpc data error");
                var p = [ n, (s.includes("?") ? s : s + "?") + "&pps=" + a, (o.includes("?") ? o : o + "?") + "&pps=" + a, (u.includes("?") ? u : u + "?") + "&pps=" + a ];
                p = p.slice(0, c), e.setData({
                    image: d,
                    banner: p
                }, function() {
                    return e.triggerEvent("componentLoad", e.is);
                });
            }).catch(function(t) {
                e.setData({
                    hideModule: !0
                }), e.triggerEvent("componentLoad", e.is);
            });
        },
        tapOnItem: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        },
        onImgLoad: function(e) {
            this.setData({
                showImage: !0
            });
        }
    }
});