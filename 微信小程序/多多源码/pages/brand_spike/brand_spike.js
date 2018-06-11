function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var r = e(require("../../common/url_util")), a = e(require("../../common/navigation")), n = {
    onLoad: function(e) {
        var n = "/package_a/brand_spike/brand_spike?" + r.default.buildQuery(e);
        a.default.redirectForward(n);
    }
};

(0, require("../../common/index").PddPage)(n, {
    pageName: "brand_spike",
    notUseCommonPV: !0
});