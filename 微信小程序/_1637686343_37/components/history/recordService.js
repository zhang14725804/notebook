function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../common/login/constant")), n = e(require("../../common/polyfill/promise")), a = "https://l-rcd.iqiyi.com/apis/mbd/download.action", o = "https://l-rcd.iqiyi.com/apis/mbd/upload.action", c = "https://l-rcd.iqiyi.com/apis/mbd/delete.action", i = "https://l-rcd.iqiyi.com/apis/qiyirc/getdetail";

exports.default = {
    getRecord: function(e) {
        var a = Object.assign({}, {
            agent_type: t.default.agenttype
        }, e);
        return new n.default(function(e, t) {
            wx.request({
                url: i,
                data: a,
                method: "GET",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var n = t.data;
                    n && "A00000" === n.code ? e(n) : n && e(n);
                },
                fail: function(e) {
                    t(e);
                }
            });
        });
    },
    getAllRecord: function(e) {
        var o = Object.assign({}, {
            agent_type: t.default.agenttype
        }, e);
        return new n.default(function(e, t) {
            wx.request({
                url: a,
                data: o,
                method: "GET",
                success: function(t) {
                    var n = t.data;
                    n && "A00000" === n.code ? e(n) : n && e(n);
                },
                fail: function(e) {
                    t(e);
                }
            });
        });
    },
    uploadRecord: function(e) {
        var a = Object.assign({}, {
            agent_type: t.default.agenttype
        }, e);
        return new n.default(function(e, t) {
            wx.request({
                url: o,
                data: a,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var n = t.data;
                    n && "A00000" === n.code ? e(n) : n && e(n);
                },
                fail: function(e) {
                    t(e);
                }
            });
        });
    },
    deleteRecord: function(e) {
        var a = Object.assign({}, {
            agent_type: t.default.agenttype
        }, e);
        return new n.default(function(e, t) {
            wx.request({
                url: c,
                data: a,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(t) {
                    var n = t.data;
                    n && "A00000" === n.code ? e(n) : n && e(n);
                },
                fail: function(e) {
                    t(e);
                }
            });
        });
    }
};