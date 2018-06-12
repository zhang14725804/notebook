function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("constant")), u = e(require("../utils/util")), a = "weapp_session_auth_" + t.default.ACCESS_TOKEN, n = "weapp_session_info_" + t.default.ACCESS_TOKEN, o = "weapp_session_phonenumber_" + t.default.ACCESS_TOKEN, r = {
    get: function(e) {
        return u.default.storage.handleStorageMuti("get", e) || null;
    },
    set: function(e, t) {
        u.default.storage.handleStorageMuti("set", e, t);
    },
    clear: function() {
        u.default.storage.handleStorageMuti("remove", a), u.default.storage.handleStorageMuti("remove", n);
    }
};

module.exports = {
    Session: r,
    SESSION_AUTH_KEY: a,
    SESSION_INFO_KEY: n,
    SESSION_PHONE_NUMBER: o
};