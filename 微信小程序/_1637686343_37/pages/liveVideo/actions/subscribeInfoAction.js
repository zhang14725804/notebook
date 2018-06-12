function e(e) {
    return Object.assign({
        type: "INIT_COUNT"
    }, {
        subscribeCount: e
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("../../../common/form/subscribeService"));

!function(e) {
    e && e.__esModule;
}(require("../../../common/polyfill/promise"));

exports.default = {
    changeLiveSubScribe: function(e, t) {
        return {
            type: "CHANGE_SUBSCRIBE",
            qipuId: e,
            subscribeSatus: t
        };
    },
    initSubscribeVideo: function(e) {
        return {
            type: "GET_VIDEO_INFO",
            options: e
        };
    },
    subscribeCount: function(n) {
        return function(u) {
            return t.getSubscribeData(n).then(function(t) {
                return u(e(t.data)), t;
            }).catch(function() {});
        };
    },
    addCount: function(e) {
        return Object.assign({
            type: "ADD_COUNT"
        }, {
            subscribeCount: e
        });
    },
    minusCount: function(e) {
        return Object.assign({
            type: "MINUS_COUNT"
        }, {
            subscribeCount: e
        });
    },
    initCount: e
};