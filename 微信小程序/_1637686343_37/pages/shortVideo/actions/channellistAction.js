function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

e(require("../../../common/polyfill/promise")), e(require("../../../components/load/loadActions"));

exports.default = {
    setData: function() {
        return {
            type: "SET",
            channelId: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            page: arguments[1]
        };
    },
    switchChannel: function() {
        return {
            type: "SWITCH_CHANNEL",
            channelTabIndex: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
        };
    },
    loadVideos: function(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
        return {
            type: "LOAD_VIDEOS",
            pageNum: t.pageNum,
            videolist: e.results,
            isEmpty: e.isEmpty,
            params: t,
            deleteCounts: n
        };
    },
    changeCondition: function(e) {
        return {
            type: "CHANGECONDITION",
            options: e
        };
    },
    initCondition: function() {
        return {
            type: "INIT_CONDITION",
            options: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
        };
    },
    resetVideos: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return {
            type: "RESET_VIDEOS",
            pageNum: arguments[1],
            videolist: e,
            flag: arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
        };
    },
    changeCurVideo: function(e, t) {
        return {
            type: "CHANGE_CUR_VIDEO",
            options: e,
            tvId: t
        };
    }
};