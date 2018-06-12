Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.openPaopao = function(e) {
    var a = e.currentTarget.dataset.circleId, t = "pages/rankingList/rankingList";
    void 0 !== a && (t = "pages/circlePack/pages/circle/circle?wallid=" + a), wx.navigateToMiniProgram({
        appId: "wxba59214d98c13a15",
        path: t
    });
}, exports.filterPaopaoStar = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], a = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "icon", i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "name", r = [];
    return e.forEach(function(e, a) {
        e[t] && e[i] && r.push(e);
    }), !1 === a ? r : r.length > 10 ? r.slice(0, 10) : r;
};