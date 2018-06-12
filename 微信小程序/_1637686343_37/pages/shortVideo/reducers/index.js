function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

e(require("../../../common/utils/util"));

var r = e(require("../../../components/load/loadReducers")), o = e(require("../../../components/videoLayout/videoLayoutReducer")), t = (e(require("../common/config")), 
e(require("tmtsInfoReducer"))), n = e(require("videoControlReducer")), u = e(require("playInfoReducer")), a = require("./channellistReducer"), i = require("./trackInfoReducer");

exports.default = {
    video: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = arguments[1];
        return "SET_URL" === r.type ? Object.assign({}, e, {
            url: r.url
        }) : e;
    },
    videoLayout: o.default,
    share: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], r = arguments[1];
        return r.share ? r.share : e;
    },
    load: r.default,
    tmtsInfo: t.default,
    isSurportBtnShare: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return "INIT" === arguments[1].type ? !!wx.canIUse && wx.canIUse("button.open-type.share") : e;
    },
    searchConditions: a.searchConditions,
    channelInfos: a.channelInfos,
    videos: a.videos,
    videoControl: n.default,
    playInfo: u.default,
    trackParams: i.trackParams,
    setCurrentVideoParams: i.setCurrentVideoParams
};