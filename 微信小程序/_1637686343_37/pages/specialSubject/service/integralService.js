function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : r, n = void 0 !== e ? Object.assign({}, t, e) : t, o = a.default.qs.getSign(n);
    n.sign = o;
    var i = Object.keys(n).map(function(e) {
        return e + "=" + encodeURIComponent(n[e]);
    }).join("&");
    return delete n.sign, i;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.integralApi = function(e, o) {
    var a = t(o);
    return new n.default(function(t, n) {
        wx.request({
            url: "" + i + e + "?" + a,
            method: "GET",
            success: function(e) {
                var o = e.data;
                o && "A00000" == o.code ? t(o) : n(o);
            },
            fail: function(e) {
                n(e);
            }
        });
    });
}, exports.jointParams = t, exports.lotteryApi = function(e, t) {
    var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : i;
    return new n.default(function(n, a) {
        wx.request({
            url: "" + o + e + "?" + t,
            method: "GET",
            success: function(e) {
                var t = e.data;
                t && "A00000" == t.code ? n(e) : a(t);
            },
            fail: function(e) {
                a(e);
            }
        });
    });
}, exports.executeApi = function(e, a, r) {
    var u = t(void 0, {
        task_code: e,
        timestamp: r,
        appKey: o.default.appKey
    });
    return new n.default(function(e, t) {
        wx.request({
            url: i + "task/execute?" + u,
            data: JSON.stringify(a),
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(n) {
                var o = n.data;
                o && "A00000" == o.code ? e(o) : t(o);
            },
            fail: function(e) {
                t(e);
            }
        });
    });
};

var n = e(require("../../../common/polyfill/promise")), o = e(require("../../../common/login/constant")), a = e(require("../../../common/utils/util")), i = "https://community.iqiyi.com/openApi/", r = {
    verticalCode: o.default.verticalCcode,
    typeCode: "point",
    agenttype: o.default.integralAgenttype,
    srcplatform: o.default.integralAgenttype,
    appKey: o.default.appKey
};

o.default.integralAgenttype, o.default.integralAgenttype, o.default.appKey;