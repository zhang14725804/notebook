var t = require("../../bases/component.js"), e = require("../../common/navigator.js").goto, a = require("../../common/biz.js").getPPMS;

new t({
    properties: {
        bottom: {
            type: Number,
            value: 100
        },
        wxappPageUrl: String
    },
    data: {
        showModule: !1,
        fold: !0,
        showMask: !1,
        navSets: []
    },
    attached: function() {
        var t = this, e = this.properties.wxappPageUrl;
        e && a("30728").then(function(a) {
            if (a && a.length) {
                var o = null;
                a.some(function(t) {
                    if (t.pageName === e) return o = t, !0;
                }), o && o.navSets.length && (o.navSets.forEach(function(e) {
                    e.wxappImg = t.utils.getImg(e.wxappImg);
                }), t.setData({
                    showModule: !0,
                    navSets: o.navSets
                }));
            }
        }).catch(function(t) {
            return console.error(t);
        });
    },
    methods: {
        toggleStatus: function() {
            var t = this, e = this.data.fold, a = {
                fold: !e
            };
            e ? (this.setData({
                showMask: !0
            }), setTimeout(function() {
                t.setData(a);
            }, 100)) : (this.setData(a), setTimeout(function() {
                t.setData({
                    showMask: !1
                });
            }, 100));
        },
        navTo: function(t) {
            var a = this;
            setTimeout(function() {
                return a.toggleStatus();
            }, 500), e("/pages/h5/index", {
                url: t.currentTarget.dataset.tourl
            });
        }
    }
});