var e = require("../../page.js"), o = require("../../../common/fe_report/usability.js");

new e({
    onLoad: function(e) {
        o.umpBiz({
            bizid: "744",
            operation: 1,
            result: "1",
            message: "/pages/my/account/account"
        }), this.$goto("/pages/my_pages/account/account", e, "redirectTo");
    }
});