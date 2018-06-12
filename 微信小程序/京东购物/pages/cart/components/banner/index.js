var e = require("../../../../bases/component.js"), t = require("../../../../common/logger.js"), r = require("../../../../behaviors/attributes"), a = (require("../../../../common/biz"), 
require("../../../../libs/moment.min"), require("../../../../common/fe_helper.js")), i = (require("../../../../common/utils"), 
require("../../../../api/Ptag/report_manager")), n = require("../../../../api/Ptag/Ptag_utils").default, s = require("api"), u = new t("购物车-banner广告位");

new e({
    behaviors: [ r ],
    data: {
        show: !1
    },
    cacheData: {},
    attached: function() {
        var e = this;
        this.cacheData = {}, s.getBanner().then(function(t) {
            t && (i.addPtagExposure("7014.18.40"), e.cacheData[t.ppmsItemId] = t, e.setData({
                show: !0,
                id: t.ppmsItemId,
                src: a.getImg(t.img_xcx)
            }));
        }).catch(function(e) {
            return u.error(e);
        });
    },
    methods: {
        onTapBanner: function(e) {
            var t = e.currentTarget.dataset.id, r = this.cacheData[t];
            if (r) {
                var a = /^https?:\/\//.test(r.url_xcx), i = /^pages/.test(r.url_xcx);
                if (n.addPtag("7014.18.41"), a) return r.url_xcx = r.url_xcx + (r.url_xcx.includes("?") ? "&" : "?") + "ptag=" + r.ptag, 
                this.$goto("/pages/h5/index", {
                    url: r.url_xcx
                });
                if (i) return r.ptag && n.addPtag(r.ptag), this.$goto("/" + r.url_xcx);
            }
        }
    }
});