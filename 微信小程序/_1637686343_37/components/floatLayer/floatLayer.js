Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/pingback/click"));

exports.default = {
    goIntegralDetail: function(a) {
        var t = a.currentTarget.dataset;
        void 0 !== t.clickRpage && e.default.send({
            rpage: t.clickRpage,
            rseat: t.clickRseat
        }), wx.navigateTo({
            url: "/subPackage/pages/integral/detail/detail"
        });
    }
};