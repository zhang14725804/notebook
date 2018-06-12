function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t() {
    return {
        type: "INIT",
        specialPageData: arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

e(require("../../../common/polyfill/promise"));

var n = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("../service/pageLoadService"));

e(require("../../../components/load/loadActions"));

exports.default = {
    loadSpecialPage: function(e) {
        return function(e) {
            return n.loadSpecialPage().then(function(n) {
                return n.data.rule = n.data.rule.replace(/\\n/g, "\n"), e(t(n.data)), n.data;
            });
        };
    },
    loadVoteData: function(e) {
        return {
            type: "INIT_VOTE",
            voteInfo: e
        };
    },
    changeBtnStatus: function(e) {
        return {
            type: "BTN_STATUS",
            btnDisabled: e
        };
    },
    changeVoteData: function(e) {
        return {
            type: "CHANGE_VOTE",
            voteInfo: e
        };
    },
    hideRules: function(e) {
        return {
            type: "SHOW_RULES",
            hideRules: e
        };
    },
    editPlayInfo: function(e) {
        return {
            type: "EDIT_PLAY_INFO",
            playInfo: e
        };
    },
    initData: t
};