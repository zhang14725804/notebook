var e = require("../../page.js"), r = require("../../../common/fe_report/usability.js");

new e({
    onLoad: function(e) {
        r.umpBiz({
            bizid: "744",
            operation: 1,
            result: "1",
            message: "/pages/my/transfer/transfer"
        }), this.$goto("/pages/my_pages/transfer/transfer", e, "redirectTo");
    }
});