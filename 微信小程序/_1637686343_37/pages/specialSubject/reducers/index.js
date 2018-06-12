function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

e(require("../../../components/load/loadReducers"));

var a = e(require("../../../components/videoLayout/videoLayoutReducer")), t = require("specialPageReducer"), o = e(require("../../../components/floatLayer/floatLayerReducer")), r = require("../../../components/player/videoPlayerReducer"), n = e(require("../../video/reducers/tmtsInfoReducer")), u = require("../../../components/paopao/paopaoReducer");

exports.default = {
    videoLayout: a.default,
    pageDataInit: t.pageDataInit,
    voteInfo: t.voteInfo,
    btnDisabled: t.btnDisabled,
    tmtsInfo: n.default,
    currentIntegral: t.currentIntegral,
    hideRules: t.hideRules,
    floatLayerAni: o.default,
    serverTimeBias: r.serverTimeBias,
    liveStatus: r.liveStatus,
    playInfo: t.playInfo,
    countdownTime: r.countdownTime,
    liveStreamInfo: r.liveStreamInfo,
    getLiveInterfaceInfo: r.getLiveInterfaceInfo,
    paopaoStarData: u.paopaoStarData
};