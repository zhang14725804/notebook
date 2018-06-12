(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d);
    module.exports = {
        data: {},
        onLoad: function() {},
        onUnload: function() {},
        bannerTimer: null,
        methods: {
            showTip: function(a) {
                var b = this;
                a = a || "网络状况不佳，请稍后重试", this.setData({
                    showBanner: !0,
                    tip: a
                }), this.bannerTimer && clearTimeout(this.bannerTimer), this.bannerTimer = setTimeout(function() {
                    b.setData({
                        showBanner: !1
                    });
                }, 3e3);
            }
        }
    };
})();