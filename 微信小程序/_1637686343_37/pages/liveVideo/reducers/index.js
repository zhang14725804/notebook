function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../components/load/loadReducers")), i = e(require("../../../common/utils/util")), r = e(require("../../../components/videoLayout/videoLayoutReducer")), o = require("subscribeInfoReducer"), n = require("liveInfoReducer"), u = require("liveVideoReducer"), d = require("countdownReducer"), s = e(require("../../video/common/config"));

exports.default = {
    load: t.default,
    scrollBodyHeight: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, t = arguments[1];
        if ("INIT" === t.type && 0 === e) {
            var r = wx.getSystemInfoSync().windowHeight, o = s.default.videoHeightRpx;
            return o += t.share ? s.default.sharePpx : 0, r - i.default.getPxByRpx(o);
        }
        return e;
    },
    videoLayout: r.default,
    liveStreamInfo: n.liveStreamInfo,
    getLiveStatus: n.getLiveStatus,
    getLiveInterfaceInfo: n.getLiveInterfaceInfo,
    serverTimeBias: n.serverTimeBias,
    liveVideoInit: u.liveVideoInit,
    subscribeCount: o.subscribeCount,
    countdownTime: d.countdownTime,
    isSurportBtnShare: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return "INIT" == arguments[1].type ? !!wx.canIUse && wx.canIUse("button.open-type.share") : e;
    },
    showTennisLiveType: n.showTennisLiveType
};