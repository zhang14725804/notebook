var e = require("../../../../bases/component.js"), t = require("../../../../libs/promise.min.js"), n = require("../../../../common/localStorage.js"), i = require("../../utils.js");

new e({
    behaviors: [ require("../common-behavior.js") ],
    properties: {
        config: {
            type: Array,
            observer: function(e) {
                this.configResolve && this.configResolve(e);
            }
        },
        freshmenData: {
            type: Object,
            observer: function(e) {
                this.freshmenDataResolve && this.freshmenDataResolve(e);
            }
        }
    },
    data: {
        floating: {},
        showFloating: !1
    },
    methods: {
        refresh: function() {
            var e = this;
            t.all([ this.getConfig(), this.getFreshmenData(), n.get("mall_floating_hide_util", null) ]).then(function(n) {
                var o = n[0], r = n[1], s = n[2];
                if (!(s && Date.now() < s)) {
                    if (!o.length) return t.reject("Get floating config error");
                    var a = 1 == r.isnew, l = null;
                    o.some(function(t) {
                        if (i.checkTime(t.begin, t.end)) return 2 == t.userType || 0 == t.userType && !a || 1 == t.userType && a ? (l = {
                            image: e.utils.getImg(t.imgUrl),
                            url: t.jumpUrl
                        }, !0) : void 0;
                    }), l && e.setData({
                        floating: l
                    });
                }
            }).catch(function(e) {
                return console.log("cjj e", e);
            });
        },
        getConfig: function() {
            var e = this;
            return new t(function(t) {
                e.configResolve = t;
            });
        },
        getFreshmenData: function() {
            var e = this;
            return new t(function(t) {
                e.freshmenDataResolve = t;
            });
        },
        imageLoaded: function() {
            this.setData({
                showFloating: !0
            });
        },
        hideFloating: function() {
            i.report("138067.17.1"), this.setData({
                showFloating: !1
            }), n.set("mall_floating_hide_util", new Date().setHours(24, 0, 0, 0));
        },
        gotoH5: function(e) {
            var t = e.currentTarget.dataset.url;
            this.$goto("/pages/h5/index", {
                url: t
            });
        }
    }
});