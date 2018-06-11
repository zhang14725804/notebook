var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/url_util")), t = require("../../common/index");

(0, t.PddPage)({
    onLoad: function(r) {
        var a = "/package_a/lottery_list/lottery_list?" + e.default.buildQuery(r);
        t.Navigation.redirectForward(a);
    }
}, {
    pageName: "lottery_list_tmp",
    pageSn: 10057
});