var e = require("../../page.js"), o = require("../../../common/fe_report/usability.js");

new e({
    onLoad: function(e) {
        o.umpBiz({
            bizid: "744",
            operation: 1,
            result: "1",
            message: "/pages/my/coupon_share/coupon_share"
        }), this.$goto("/pages/my_pages/coupon_share/coupon_share", e, "redirectTo");
    }
});