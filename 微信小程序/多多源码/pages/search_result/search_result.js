function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var r = e(require("../../common/url_util")), a = e(require("../../common/navigation")), u = {
    onLoad: function(e) {
        var u = "/package_a/search_result/search_result?" + r.default.buildQuery(e);
        a.default.redirectForward(u);
    }
};

(0, require("../../common/index").PddPage)(u, {
    pageName: "search_result",
    notUseCommonPV: !0
});