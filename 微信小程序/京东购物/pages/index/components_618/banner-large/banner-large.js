var e = require("../constant"), t = require("../../../../bases/component.js"), n = require("../../../../libs/promise.min.js"), i = require("../../mall/common-behavior.js"), r = require("../../utils.js"), a = require("../../model.js");

new t({
    behaviors: [ i ],
    properties: {
        indexName: {
            type: "String",
            observer: function(e) {
                this.getIndexNameResolve && this.getIndexNameResolve(e);
            }
        }
    },
    data: {
        banner: [],
        hideModule: !1,
        showImage: !1
    },
    created: function() {
        var e = this;
        this.getIndexName = new n(function(t) {
            e.getIndexNameResolve = t;
        });
    },
    methods: {
        refresh: function() {
            if (!r.checkTime(e.PREHEAT_BEGIN, e.PREHEAT_END)) return this.triggerEvent("componentLoad", this.is), 
            void (this.data.hideModule || this.setData({
                hideModule: !0
            }));
            this.init();
        },
        init: function() {
            var e = this;
            this.getIndexName.then(function(t) {
                var i = void 0;
                if ("mall" === t) i = 27606; else {
                    if ("wallet" !== t) return n.reject("get index name error");
                    i = 27609;
                }
                return a.getCpcData([ 10495 ], [ i ], {}, Date.now()).then(function(e) {
                    return e && e[10495] && e[10495][i] && e[10495][i][0] ? e[10495][i][0] : n.reject("get cpc data error");
                }).then(function(t) {
                    var n = t.sUrl, i = t.pps, r = t.material, a = t.userdata1, s = t.userdata2, o = e.utils.getImg(r), u = [ n, (a.includes("?") ? a : a + "?") + "&pps=" + i, (s.includes("?") ? s : s + "?") + "&pps=" + i ];
                    e.setData({
                        image: o,
                        banner: u
                    }, function() {
                        return e.triggerEvent("componentLoad", e.is);
                    });
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