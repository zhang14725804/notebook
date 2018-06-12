function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var r = e(require("../../common/url_util")), o = e(require("../../common/navigation")), a = {
    onLoad: function(e) {
        var a = "/package_a/order/order?" + r.default.buildQuery(e);
        o.default.redirectForward(a);
    }
};

(0, require("../../common/index").PddPage)(a, {
    pageName: "order",
    pageSn: 10038,
    notUseCommonPV: !0
});