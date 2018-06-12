Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    showComments: function(e) {
        return {
            type: "SHOW_COMMENTS",
            comments: e
        };
    },
    toggleCommentStatus: function(e, t, n, o, s) {
        return {
            type: "TOGGLE_COMMENT_STATUS",
            contentId: e,
            comments: t,
            isAgree: n,
            likes: o,
            addTime: s
        };
    }
};