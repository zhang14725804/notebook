function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t() {
    return i.default.Session.get(s);
}

function r() {
    return o.getWechatCode().then(function(e) {
        var t = e.data;
        return i.default.Session.set(s, t), t;
    }).catch(function(e) {});
}

function n() {
    return new Promise(function(e, t) {
        wx.checkSession({
            success: function() {
                e(!0);
            },
            fail: function(e) {
                t(e);
            }
        });
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getThirdSession = t, exports.clearThirdSession = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "USER_THIRD_SESSION_KEY";
    u.default.storage.handleStorageMuti("remove", e);
}, exports.setThirdSession = r, exports.checkThirdSession = n, exports.getOrSetThirdSession = function() {
    var e = t();
    return e ? n().then(function(t) {
        return e;
    }).catch(function() {
        return r();
    }) : r();
};

var i = e(require("../login/session")), o = (e(require("../login/index")), function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
    return t.default = e, t;
}(require("subscribeService"))), u = e(require("../utils/util")), s = "USER_THIRD_SESSION_KEY";