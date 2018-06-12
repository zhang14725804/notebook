function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = e(require("../../common/url_util")), r = e(require("../../common/navigation")), o = {
    onLoad: function(e) {
        var o = "/package_a/mall_page/mall_page?" + a.default.buildQuery(e);
        r.default.redirectForward(o);
    }
};

(0, require("../../common/index").PddPage)(o, {
    pageName: "mall_page",
    pageSn: 10039,
    notUseCommonPV: !0
});