function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var r = e(require("../../common/url_util")), a = e(require("../../common/navigation")), o = {
    onLoad: function(e) {
        var o = "/package_a/relative_recommend/relative_recommend?" + r.default.buildQuery(e);
        a.default.redirectForward(o);
    }
};

(0, require("../../common/index").PddPage)(o, {
    pageName: "relative_recommend",
    pageSn: 10080,
    notUseCommonPV: !0
});