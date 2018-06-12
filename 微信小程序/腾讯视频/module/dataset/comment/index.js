function e(e) {
    try {
        var n = [];
        (e.primaryFeed.comments || []).forEach(function(e) {
            var t = {
                userInfo: {}
            };
            t.content = e.content, t.userInfo.actorName = e.userInfo.actorName, n.push(t);
        });
        var t = {
            content: e.primaryFeed.content,
            user: {
                actorName: e.primaryFeed.user.actorName,
                faceImageUrl: e.primaryFeed.user.faceImageUrl
            }
        };
        t.comments = n, e.primaryFeed = t;
    } catch (e) {
        console.log(e);
    }
}

function n(e) {
    try {
        e.forEach(function(e, n, t) {
            var c = {
                commentCount: e.commentCount,
                comments: e.comments,
                content: e.content,
                dataKey: e.dataKey,
                feedId: e.feedId,
                hasMoreComments: e.hasMoreComments,
                likeCount: e.likeCount,
                tagLabel: e.tagLabel,
                user: {
                    actorName: e.user.actorName,
                    faceImageUrl: e.user.faceImageUrl
                }
            };
            t[n] = c;
        });
    } catch (e) {
        console.log(e);
    }
}

var t = require("../../request/request"), c = require("../../es6-promise");

module.exports = {
    comment: null,
    feedInfo: function(n) {
        return new c(function(c, o) {
            t.vaccess("feed_info", n).then(function(n) {
                n && 0 == n.errCode ? (e(n), c(n)) : o(n);
            }, function(e) {
                o(e);
            });
        });
    },
    list: function(e) {
        return new c(function(c, o) {
            t.vaccess("circle_list", {
                dataKey: e.dataKey || "",
                vid: e.vid || "",
                pageContext: e.pageContext || ""
            }).then(function(e) {
                e && 0 == e.errCode ? (n(e.feedList), c(e)) : o(e);
            }, function(e) {
                o(e);
            });
        });
    },
    add: function(e) {
        return new c(function(n, c) {
            t.vaccess("circle_pub", {
                dataKey: e.dataKey,
                content: e.content,
                title: e.title,
                vid: e.vid,
                seq: e.seq
            }).then(function(e) {
                e && 0 == e.errCode ? n(e) : c(e);
            }, function(e) {
                c(e);
            });
        });
    },
    del: function(e) {
        return new c(function(n, c) {
            t.vaccess("circle_del", {
                feedId: e.feedId,
                dataKey: e.dataKey,
                seq: e.seq
            }).then(function(e) {
                e && 0 == e.errCode ? n(e) : c(e);
            }, function(e) {
                c(e);
            });
        });
    },
    like: function(e) {
        return new c(function(n, c) {
            t.vaccess("circle_like", {
                feedId: e.feedId,
                likeFlag: e.likeFlag,
                seq: e.seq,
                dataKey: e.dataKey
            }).then(function(e) {
                e && 0 == e.errCode ? n(e) : c(e);
            }, function(e) {
                c(e);
            });
        });
    },
    tipOff: function(e) {
        return new c(function(n, c) {
            t.vaccess("circle_tipoff", {
                feedId: e.feedId,
                dataKey: e.dataKey,
                seq: e.seq
            }).then(function(e) {
                e && 0 == e.errCode ? n(e) : c(e);
            }, function(e) {
                c(e);
            });
        });
    }
};