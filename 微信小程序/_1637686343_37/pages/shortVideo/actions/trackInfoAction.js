Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    trackParams: function() {
        return {
            type: "GET_TRACK_PARAM",
            pingback: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
        };
    },
    setCurrentVideoParams: function() {
        return {
            type: "SET_CURRENT_TRACK_PARAM",
            currentVideoPingback: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
        };
    }
};