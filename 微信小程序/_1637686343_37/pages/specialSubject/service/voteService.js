Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getVotes = function(t) {
    return new e.default(function(e, o) {
        wx.request({
            url: "https://vote-i.iqiyi.com/eagle/outer/get_votes",
            method: "POST",
            data: t,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var n = t.data;
                n && "A00000" == n.code ? e(n) : o(n);
            },
            fail: function(e) {
                o(e);
            }
        });
    });
}, exports.joinVote = function(t) {
    return new e.default(function(e, o) {
        wx.request({
            url: "https://vote-i.iqiyi.com/eagle/outer/join_common_vote",
            method: "POST",
            data: t,
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var n = t.data;
                n && "A00000" == n.code ? e(n) : o(n);
            },
            fail: function(e) {
                o(e);
            }
        });
    });
};

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/polyfill/promise"));