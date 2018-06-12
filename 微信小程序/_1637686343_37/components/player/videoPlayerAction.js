Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    setTimeBias: function(e) {
        return {
            type: "TIME_BIAS",
            timeBias: e
        };
    },
    liveStatus: function(e) {
        return {
            type: "SET_LIVE_STATUS",
            liveStatus: e
        };
    },
    showTime: function(e) {
        return {
            type: "DISPLAY_TIME",
            time: e
        };
    },
    getLiveStream: function(e) {
        return {
            type: "GET_LIVE_STREAM",
            liveStreams: e
        };
    },
    getLiveInterfaceInfo: function(e) {
        return {
            type: "LIVE_INTERFACE_INFO",
            liveInterfaceInfo: e
        };
    }
};