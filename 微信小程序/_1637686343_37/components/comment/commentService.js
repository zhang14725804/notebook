function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    var t = {
        qypid: "02000021010000000000",
        business: "comment",
        tvid: e,
        is_iqiyi: !0,
        is_video_page: !0
    };
    return new o.default(function(e, n) {
        wx.request({
            url: "https://control-i.iqiyi.com/control/content_config",
            data: t,
            method: "GET",
            success: function(t) {
                var o = t.data;
                o && "A00000" == o.code ? e(o) : n(o);
            },
            fail: function(e) {
                n(e);
            }
        });
    });
}

function n(e, t) {
    var n = {
        tvid: e,
        uid: r.default.getUid(),
        sort: "hot",
        qitan_comment_type: 4,
        proxyUri: c.GETCOMMENT
    };
    return u.commonPostRequest({
        url: "" + i.default.OUTERHOST.PUB + c.PROXY,
        reqParams: n
    }).then(function(e) {
        return i.default.isObject(e) && (e.inputBoxEnable = !0), e;
    }).catch(function(e) {
        return o.default.reject(e);
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = e(require("../../common/polyfill/promise")), r = e(require("../../common/user/user")), i = e(require("../../common/utils/util")), u = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t.default = e, t;
}(require("../../common/serviceApi/serviceApi")), c = {
    AGREE: "feed/agree",
    GETCOMMENT: "qx_api/comment/get_video_comments",
    PROXY: "/h5/mina/proxy/feed/",
    LIKECOMMENT: "qx_api/comment/like",
    REMOVELIKEA: "qx_api/comment/remove_like"
};

exports.default = {
    getCommentSources: function(e, r) {
        return t(e).then(function(e) {
            if (e.data && e.data.contentDisplayEnable) {
                e.data.inputBoxEnable;
                return n(r);
            }
            return new o.default(function(e, t) {
                t({
                    error: "不展示评论"
                });
            });
        }).catch(function(e) {
            return new o.default(function(t, n) {
                n(e);
            });
        });
    },
    likeComment: function(e) {
        var t = {
            authcookie: r.default.getAuthcookie(),
            contentid: e,
            appid: 24,
            proxyUri: c.LIKECOMMENT
        };
        return u.commonPostRequest({
            url: "" + i.default.OUTERHOST.PUB + c.PROXY,
            reqParams: t
        }).then(function(e) {
            return e;
        }).catch(function(e) {
            return i.default.isObject(e) && e.code && ("B00004" == e.code ? x.showToast({
                icon: "none",
                title: "你点的太快了"
            }) : "string" == typeof e.code && -1 == e.code.indexOf("FEC") && wx.showToast({
                icon: "none",
                title: "已经喜欢过了"
            })), o.default.reject(e);
        });
    },
    removeLikeComment: function(e) {
        var t = {
            authcookie: r.default.getAuthcookie(),
            contentid: e,
            proxyUri: c.REMOVELIKEA
        };
        return u.commonPostRequest({
            url: "" + i.default.OUTERHOST.PUB + c.PROXY,
            reqParams: t
        }).then(function(e) {
            return e;
        }).catch(function(e) {
            return i.default.isObject(e) && e.code && ("B00004" == e.code ? x.showToast({
                icon: "none",
                title: "操作太频繁了"
            }) : "string" == typeof e.code && -1 == e.code.indexOf("FEC") && wx.showToast({
                icon: "none",
                title: "已经喜欢过了"
            })), o.default.reject(e);
        });
    }
};