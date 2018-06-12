Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    originPlayInfo: function(e) {
        return {
            type: "SET_ORIGIN_PLAY_INFO",
            originPlayInfo: e
        };
    },
    setPlayInfo: function(e) {
        return {
            type: "SET_PLAY_INFO",
            playInfo: e
        };
    },
    editPlayInfo: function(e) {
        return {
            type: "EDIT_PLAY_INFO",
            playInfo: e
        };
    }
};