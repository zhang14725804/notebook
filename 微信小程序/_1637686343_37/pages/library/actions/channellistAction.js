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
    setData: function(e) {
        return {
            type: "SET",
            channelId: e
        };
    },
    switchChannel: function() {
        return {
            type: "SWITCH_CHANNEL",
            channelTabIndex: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
        };
    },
    loadVideos: function(e, t) {
        return {
            type: "LOAD_VIDEOS",
            pageNum: t.pageNum,
            videolist: e.results,
            isFinal: e.isFinal,
            isEmpty: e.isEmpty
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
            pageNum: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
            videolist: e
        };
    },
    switchMode: function() {
        return {
            type: "SWITCH_MODE",
            modeIndex: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
        };
    },
    switchTag: function() {
        return {
            type: "SWITCH_TAG",
            tabIndex: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            tag: arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
        };
    }
};