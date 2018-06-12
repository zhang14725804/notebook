function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a() {}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var d = e(require("report_manager")), t = e(require("Ptag_utils")), u = {
    setCurrentPageAndAddPv: d.default.setCurrentPageAndAddPv,
    addPtag: t.default.addPtag,
    addSearchPageExposure: d.default.addSearchPageExposure,
    addPtagExposure: d.default.addPtagExposure,
    guessyouLike: d.default.guessyouLikeReport,
    addSearchPagePv: d.default.addSearchPagePv,
    addDetailPagePv: d.default.addDetailPagePv,
    addOfflinePagePv: d.default.addOfflinePagePv,
    addSearchPageRelatedKWDPtag: t.default.addSearchPageRelatedKWDPtag,
    isWxapp: !0,
    getSource: function(e) {
        return [ d.default, t.default ][e];
    }
};

[ "tencentPv", "tencentClick", "shopSearch", "biRank", "eventClick", "userShare", "shDeviceId" ].forEach(function(e) {
    u[e] = a;
}), exports.default = u;