var e = require("../../page.js"), a = require("../../../common/fe_report/usability.js");

new e({
    onLoad: function(e) {
        a.umpBiz({
            bizid: "744",
            operation: 1,
            result: "1",
            message: "/pages/my/balance/balance"
        }), this.$goto("/pages/my_pages/balance/balance", e, "redirectTo");
    }
});