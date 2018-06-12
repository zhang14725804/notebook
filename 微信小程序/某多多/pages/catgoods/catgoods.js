function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var o = e(require("../../common/url_util")), a = e(require("../../common/navigation")), r = {
    onLoad: function(e) {
        var r = "/package_a/catgoods/catgoods?" + o.default.buildQuery(e);
        a.default.redirectForward(r);
    }
};

(0, require("../../common/index").PddPage)(r, {
    pageName: "catgoods",
    pageSn: 10028,
    notUseCommonPV: !0
});