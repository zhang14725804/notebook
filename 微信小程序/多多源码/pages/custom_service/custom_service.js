var e = require("../../common/index"), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/url_util")), o = {
    onLoad: function(o) {
        var u = "/package_a/custom_service/custom_service?" + r.default.buildQuery(o);
        e.Navigation.redirectForward(u);
    }
};

(0, e.PddPage)(o, {
    pageName: "custom_service",
    pageSn: 10041,
    notUseCommonPV: !0
});