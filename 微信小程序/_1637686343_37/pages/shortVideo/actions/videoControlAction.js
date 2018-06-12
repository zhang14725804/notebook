Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    showShare: function() {
        return {
            type: "SHOW_SHARE"
        };
    },
    hideShare: function() {
        return {
            type: "HIDE_SHARE"
        };
    },
    switchRate: function() {
        return {
            type: "SWITCH_RATE"
        };
    },
    setRate: function(t) {
        return {
            type: "SET_RATE",
            rate: t
        };
    },
    setRateList: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return {
            type: "SET_RATE_LIST",
            rates: t.map(function(t) {
                return t.vd;
            }),
            flag: e
        };
    },
    changeRateState: function() {
        return {
            type: "CHANGE_RATE_STATE",
            options: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
        };
    }
};