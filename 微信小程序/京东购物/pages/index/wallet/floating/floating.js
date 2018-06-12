var t = require("../../../../bases/component.js"), i = require("../../utils.js"), e = require("../../../../common/utils.js");

new t({
    properties: {
        floatingConfig: {
            type: Object,
            value: null,
            observer: function(t, i) {
                this.init(t);
            }
        }
    },
    data: {
        floating: {},
        showFloating: !1
    },
    methods: {
        init: function(t) {
            if (t && t.image) {
                var i = t.image, e = t.link, n = t.rd, a = t.wxappLink;
                this.setData({
                    floating: {
                        image: this.utils.getImg(i),
                        link: e,
                        rd: n,
                        wxappLink: a
                    }
                });
            }
        },
        imageLoaded: function() {
            this.setData({
                showFloating: !0
            });
        },
        hideFloating: function() {
            i.report("137889.7.5"), this.setData({
                showFloating: !1
            });
        },
        gotoH5: function(t) {
            var i = t.currentTarget.dataset, n = i.link, a = i.wxappLink, s = i.rd;
            if (n) this.$goto("/pages/h5/index", {
                url: n
            }); else if (a) {
                var o = {}, r = null, l = e.querystr(a.split("?")[1]);
                l && l.query && (r = l.query), r && Object.keys(r).length && (o = r, a = a.split("?")[0]), 
                s && (o.ptag = s), this.$goto(a, o);
            }
        }
    }
});