function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var o = e(require("../../common/url_util")), n = e(require("../../common/navigation"));

(0, require("../../common/index").PddPage)({
    onLoad: function(e) {
        var r = "/package_a/open_envelope/open_envelope?" + o.default.buildQuery(e);
        n.default.redirectForward(r);
    }
}, {
    pageName: "open_envelope_tmp"
});