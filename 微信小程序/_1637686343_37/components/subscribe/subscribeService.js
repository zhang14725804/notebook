function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    var t = Object.assign({}, {
        agent_type: n.default.agenttype
    }, e);
    return new a.default(function(e, n) {
        wx.request({
            url: o,
            data: t,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                var n = t.data;
                n && "A00000" === n.code ? e(n) : n && e(n);
            },
            fail: function(e) {
                n(e);
            }
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = e(require("../../common/login/constant")), a = e(require("../../common/polyfill/promise")), u = e(require("playSubService")), i = e(require("../../common/user/user")), c = "https://subscription.iqiyi.com/apis/watchlater/list.action", o = "https://subscription.iqiyi.com/apis/watchlater/savebatch.action", r = "https://subscription.iqiyi.com/apis/mbd/reg/deletebatch.action", s = "https://subscription.iqiyi.com/apis/mbd/reg/deletebatch.action";

exports.default = {
    getAllSubscribes: function(e) {
        var t = Object.assign({}, {
            agent_type: n.default.agenttype
        }, e);
        return new a.default(function(e, n) {
            wx.request({
                url: c,
                data: t,
                method: "GET",
                success: function(t) {
                    var a = t.data;
                    a && "A00000" === a.code ? e(a) : n(a);
                },
                fail: function(e) {
                    n(e);
                }
            });
        });
    },
    deleteSubscribe: function(e) {
        var t = Object.assign({}, {
            agent_type: n.default.agenttype
        }, e);
        return new a.default(function(e, n) {
            wx.request({
                url: r,
                data: t,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var n = t.data;
                    n && "A00000" === n.code ? e(n) : n && e(n);
                },
                fail: function(e) {
                    n(e);
                }
            });
        });
    },
    uploadSubscribes: t,
    batchDeleteSubscribe: function(e) {
        var t = Object.assign({}, {
            agent_type: n.default.agenttype
        }, e);
        return new a.default(function(e, n) {
            wx.request({
                url: s,
                data: t,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var n = t.data;
                    n && "A00000" === n.code ? e(n) : n && e(n);
                },
                fail: function(e) {
                    n(e);
                }
            });
        });
    },
    uploadAfterLogin: function(e) {
        var n = "", a = [];
        (u.default.get() || []).forEach(function(e, t) {
            1 == e.subType ? e.subKey = e.albumQipuId : 2 == e.subType && (e.subKey = e.sourceId), 
            7 == e.subType && (e.subKey = e.tvId);
            var n = e.subType + "@" + e.subKey + "@" + e.channelId;
            a.push(n);
        }), n = a.join(","), t({
            authcookie: e,
            ckuid: i.default.getAnonymousUid(),
            qidanKey: n
        });
    }
};