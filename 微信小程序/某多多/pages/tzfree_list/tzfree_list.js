var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/url_util")), r = require("../../common/index"), t = {
    onLoad: function(t) {
        var a = "/package_a/tzfree_list/tzfree_list?" + e.default.buildQuery(t);
        r.Navigation.redirectForward(a);
    }
};

(0, r.PddPage)(t, {
    pageName: "tzfree_list",
    pageSn: 10040,
    notUseCommonPV: !0
});