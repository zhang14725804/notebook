function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    var u = {
        A00012: "需要前端请求广告mixer接口",
        A00015: "会员鉴权成功",
        A00000: "不请求广告直接播放"
    };
    e.data && u[e.data.ds] && (e.src = d.default.qs.addQueryParam(e.data.m3u, "qypid", t + "_31"), 
    e.status = e.data.ds);
}

function u(t, e) {
    return new o.default(function(u, r) {
        wx.request({
            url: t,
            data: e,
            method: "GET",
            success: u,
            fail: function(e) {
                console.log("tmts接口调用失败， url: , " + JSON.stringify(t) + " error: " + e), r(e);
            }
        });
    });
}

function r(t, e) {
    var u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = i.default.cmd5xtmts();
    u = Object.assign(u, r, {
        src: "02028001010000000000"
    });
    var n = "/tmts/" + t + "/" + e + "/?" + d.default.qs.stringify(u);
    return u.vf = i.default.cmd5x(n), u;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.auth = function(t, i) {
    var s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1, f = arguments[3];
    if (!t || !i) return o.default.reject({
        code: "A00001",
        data: {}
    });
    var l = {
        uid: a.default.getUid(),
        platForm: "h5",
        qyid: a.default.getAnonymousUid(),
        agenttype: d.default.os.isAndroid ? 236 : 237,
        ptid: d.default.os.isAndroid ? "02028001010000000000" : "02038001010000000000",
        type: n.default.videoFormat(),
        nolimit: f,
        k_ft1: 8,
        rate: s,
        p: a.default.getAuthcookie(),
        deviceid: a.default.getAnonymousUid(),
        codeflag: 1
    };
    return new o.default(function(n, a) {
        l = r(t, i, l);
        var d = "https://cache.m.iqiyi.com/tmts/" + t + "/" + i + "/";
        (function(t) {
            var e = 3;
            return function() {
                return new o.default(function(r, n) {
                    function i() {
                        u(d, t).then(function(t) {
                            r(t);
                        }, function(u) {
                            e ? i(t) : n(u), e--;
                        });
                    }
                    i();
                });
            };
        })(l)().then(function(u) {
            var r = u.data;
            r && "A00000" === r.code ? (e(t, r), n(r)) : a(r);
        }, function(t) {
            console.log("tmts接口调用失败， retry"), a(t);
        });
    });
};

var n = t(require("videoUtil")), i = t(require("../tmts/tmts")), a = t(require("../user/user")), d = t(require("../utils/util")), o = t(require("../polyfill/promise"));