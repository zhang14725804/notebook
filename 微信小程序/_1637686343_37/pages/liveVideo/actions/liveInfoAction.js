Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    getLiveStream: function(e) {
        return {
            type: "GET_LIVE_STREAM",
            liveStreams: e
        };
    },
    liveStatus: function(e) {
        return {
            type: "SET_LIVE_STATUS",
            liveStatus: e
        };
    },
    getLiveInterfaceInfo: function(e) {
        return {
            type: "LIVE_INTERFACE_INFO",
            liveInterfaceInfo: e
        };
    },
    getTimeBias: function(e) {
        return {
            type: "TIME_BIAS",
            timeBias: e
        };
    },
    showCount: function(e) {
        return {
            type: "NEED_COUNT",
            needCount: e
        };
    },
    tennisLiveType: function(e) {
        return {
            type: "VIP_TYPE",
            vipType: e
        };
    }
};