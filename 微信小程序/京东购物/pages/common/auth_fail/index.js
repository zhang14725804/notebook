function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var r = function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    return r.default = e, r;
}(require("../../../api/Ptag/Ptag_constants")), t = (e(require("../../../api/Ptag/Ptag_utils.js")), 
e(require("../../../api/Ptag/report_manager.js")));

new (require("../../page.js"))({
    onLoad: function() {
        t.default.setCurrentPageAndAddPv(r.PAGE_AUTH, {
            ptag: r.EXP_AUTH_FAILED
        });
    }
});