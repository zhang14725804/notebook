function e(e) {
    return Object.assign({
        type: "INIT_DATA"
    }, {
        liveInitVideo: e
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("../service/liveVideoService")), r = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/polyfill/promise"));

exports.default = {
    loadLiveVideoPage: function(n) {
        return function(u) {
            return t.getLiveVideoPage(n).then(function(t) {
                return u(e(t)), r.default.resolve(t);
            }).catch(function(e) {
                return r.default.reject(e);
            });
        };
    },
    changeVideoSubStatus: function(e, t, r) {
        return {
            type: "CHANGE_SUBSCRIBE",
            qipuId: e,
            subscribeSatus: t,
            area: r
        };
    },
    changeButtonStatus: function(e, t) {
        return {
            type: "CHANGE_BUTTON",
            qipuId: e,
            disabled: t
        };
    },
    init: function(e) {
        return Object.assign({
            type: "INIT"
        });
    }
};