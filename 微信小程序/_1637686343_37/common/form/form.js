function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, i) {
    var r = {
        "3rd_session": e,
        formid: t,
        rseat: i,
        authcookie: o.default.getAuthcookie()
    };
    return new Promise(function(e, t) {
        wx.request({
            url: "https://wechat.if.iqiyi.com/apis/wechat/miniapp/collect_formid",
            data: r,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                e(t.data);
            },
            fail: function(e) {
                t(e);
            }
        });
    });
}

function i(e, o) {
    var u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 2;
    (0, r.getOrSetThirdSession)().then(function(c) {
        c && t(c, e, o).then(function(t) {
            n.default.isObject(t) && "A00000" != t.code && u > 0 && ((0, r.clearThirdSession)(), 
            i(e, o, u - 1));
        }).catch(function(e) {});
    }).catch(function(e) {});
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = t, exports.collectFormIdMuti = i;

var o = e(require("../user/user")), r = require("subscribeSession"), n = e(require("../utils/util"));