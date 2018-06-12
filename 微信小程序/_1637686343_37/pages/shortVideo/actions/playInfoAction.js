Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    editPlayInfo: function(e) {
        return {
            type: "EDIT_PLAY_INFO",
            playInfo: e
        };
    },
    initPlayInfo: function() {
        return {
            type: "INIT_PLAY_INFO",
            videoList: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
        };
    }
};