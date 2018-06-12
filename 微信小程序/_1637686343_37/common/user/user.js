function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t;
    };
}(), i = e(require("../utils/util")), u = e(require("../login/session")), r = function() {
    function e() {
        t(this, e), this.init();
    }
    return n(e, [ {
        key: "init",
        value: function() {
            this.isNewUser = !1, this.anonymousUid = this.getAnonymousUid();
        }
    }, {
        key: "isVip",
        value: function() {
            var e = (u.default.Session.get(u.default.SESSION_INFO_KEY) || {}).qiyi_vip_info;
            return e && 0 != e.type && 1 == e.status;
        }
    }, {
        key: "isExpiredVip",
        value: function() {
            var e = (u.default.Session.get(u.default.SESSION_INFO_KEY) || {}).qiyi_vip_info;
            return e && 0 != e.type && 1 != e.status;
        }
    }, {
        key: "getUid",
        value: function() {
            return this.getUserInfo().uid || "";
        }
    }, {
        key: "getAnonymousUid",
        value: function() {
            var e = i.default.storage.handleStorageMuti("get", "USER_ANONYMOUS_ID"), t = wx.getSystemInfoSync();
            return e || (this.isNewUser = !0, e = i.default.md5(t.model + t.platform + t.version + t.system + Math.random() + 1 * new Date().getTime()), 
            i.default.storage.handleStorageMuti("set", "USER_ANONYMOUS_ID", e)), this.anonymousUid = e;
        }
    }, {
        key: "getDynamicUuid",
        value: function() {
            var e = wx.getSystemInfoSync();
            return i.default.md5(e.model + e.platform + e.version + e.system + Math.random() + 1 * new Date().getTime());
        }
    }, {
        key: "checkNewUser",
        value: function() {
            return this.isNewUser;
        }
    }, {
        key: "isLogin",
        value: function() {
            return !!u.default.Session.get(u.default.SESSION_INFO_KEY);
        }
    }, {
        key: "getAuthcookie",
        value: function() {
            return u.default.Session.get(u.default.SESSION_AUTH_KEY) || "";
        }
    }, {
        key: "getWeid",
        value: function() {
            var e = i.default.storage.handleStorageMuti("get", "WEID");
            if (!e) {
                var t = this.getAnonymousUid();
                e = i.default.md5(t + "weid" + 1 * new Date()), wx.setStorageSync("WEID", e);
            }
            return e;
        }
    }, {
        key: "getUserInfo",
        value: function() {
            return (u.default.Session.get(u.default.SESSION_INFO_KEY) || {}).userinfo || {};
        }
    }, {
        key: "getAS",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 31, t = this.getAnonymousUid(), n = this.getWeid();
            return i.default.md5("" + e + t + n + "ChEnYH0415dadrrEDFf2016");
        }
    }, {
        key: "getVipType",
        value: function() {
            var e = (u.default.Session.get(u.default.SESSION_INFO_KEY) || {}).qiyi_vip_info;
            return this.isVip() ? e.type : 0;
        }
    } ]), e;
}();

exports.default = new r();