var e = require("../../components_618/constant"), i = require("../../../../bases/component.js"), t = require("../common-behavior.js"), o = require("../../../../common/localStorage.js"), n = require("../../utils.js");

new i({
    behaviors: [ t ],
    properties: {
        hideTime: {
            type: Number,
            observer: function(e) {
                this.onHide();
            }
        }
    },
    data: {
        hideModule: !0
    },
    methods: {
        refresh: function() {
            n.checkTime(e.SALE_BEGIN, e.SALE_END) && this.init();
        },
        init: function() {
            var e = this;
            -1 !== getApp().systemInfo.system.indexOf("Android") && o.get("mall_toptips_hide_util", null).then(function(i) {
                var t = void 0;
                i ? t = !0 : (t = !1, o.set("mall_toptips_hide_util", !0)), e.setData({
                    hideModule: t
                });
            }).catch(function(e) {
                console.log(e);
            });
        },
        onHide: function() {
            this.closeModule();
        },
        closeModule: function() {
            this.setData({
                hideModule: !0
            });
        }
    }
});