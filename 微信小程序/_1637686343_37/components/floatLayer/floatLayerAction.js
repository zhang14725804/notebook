Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    addFloatLayerTip: function(e, t) {
        return {
            type: "SHOW_ANIMATION",
            msg: e,
            tips: t
        };
    },
    hideFloatLayerTip: function(e) {
        return {
            type: "HIDE_ANIMATION",
            rightTime: e
        };
    }
};