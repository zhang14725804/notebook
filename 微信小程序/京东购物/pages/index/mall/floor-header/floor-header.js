var e = require("../../components_618/constant"), t = require("../../../../bases/component.js"), r = require("../../../../libs/promise.min.js"), i = require("../../mall/common-behavior.js"), n = require("../../utils.js");

new t({
    behaviors: [ i ],
    properties: {
        zh: {
            type: String,
            value: ""
        },
        en: {
            type: String,
            value: ""
        },
        color: {
            type: String,
            value: "#333"
        },
        rd: {
            type: String,
            value: ""
        },
        bg: {
            type: String,
            value: ""
        },
        saleConfig: {
            type: Object,
            observer: function(e) {
                this.getPPMSDataResolve && this.getPPMSDataResolve(e);
            }
        }
    },
    data: {
        bg: ""
    },
    methods: {
        refresh: function() {
            n.checkTime(e.SALE_BEGIN, e.SALE_END) && this.init();
        },
        init: function() {
            var e = this;
            this.getPPMSData().then(function(t) {
                if (!t.data) return r.reject("floor-header get ppms data error");
                var i = {};
                t.data.fenwei.some(function(e) {
                    if (n.checkTime(e.beginTime, e.endTime)) return i = e, !0;
                }), e.setData({
                    bg: i.floorTitleBg || ""
                });
            }).catch(function(e) {
                console.log(e);
            });
        },
        getPPMSData: function() {
            var e = this;
            return new r(function(t, r) {
                e.getPPMSDataResolve = t;
            });
        },
        gotoUrl: function(e) {
            var t = "https://wqs.jd.com/portal/wx/category_indexv5.shtml?ptag=" + e.currentTarget.dataset.rd;
            this.$goto("/pages/h5/index", {
                url: t
            });
        }
    }
});