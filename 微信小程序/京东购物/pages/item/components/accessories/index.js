var t = require("../../../../bases/component"), e = require("../../detail/detail_api"), s = require("../../../../api/Ptag/report_manager"), r = require("../../../../api/Ptag/Ptag_constants");

new t({
    properties: {
        skuId: String,
        category: Array
    },
    data: {
        accessories: [],
        enterText: ""
    },
    ready: function() {
        var t = this.data, e = t.skuId, s = t.category;
        this.init(e, s);
    },
    methods: {
        init: function(t, a) {
            var i = this;
            t && a && e.getAccessoriesList(a).then(function(t) {
                if (t.length) return t[0];
            }).then(function(o) {
                e.getAccessorieInfo(t, a).then(function(t) {
                    t.length < 4 || (i.setData({
                        accessories: t,
                        enterText: o && o.enterText || ""
                    }), t.accessories && t.accessories.length && s.addPtagExposure(r.DETAIL_ACCESSORIES_RECOMMEND_EXP));
                });
            });
        },
        gotoAccessoryTab: function(t) {
            var e = this.data, s = e.skuId, r = e.category, a = t.currentTarget.dataset.id, i = "https://wqs.jd.com/item/accessory.shtml?sku=" + s + "&category3=" + r[2] + "&accyCategoryId=" + a;
            this.$goto("/pages/h5/index", {
                url: i
            }), this.$report("DETAIL_ACCESSORIES_RECOMMEND_CATEGORY");
        },
        gotoAccessory: function() {
            var t = this.data, e = "https://wqs.jd.com/item/accessory.shtml?sku=" + t.skuId + "&category3=" + t.category[2];
            this.$goto("/pages/h5/index", {
                url: e
            }), this.$report("DETAIL_ACCESSORIES_RECOMMEND_ALL");
        }
    }
});