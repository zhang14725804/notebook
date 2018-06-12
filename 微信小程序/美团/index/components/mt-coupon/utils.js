function e(e) {
    var t = e.unionId, n = e.openId, o = getApp().globalData;
    t && (o.unionId = t, wx.setStorage({
        key: "unionId",
        data: t
    })), n && (o.openId = n, wx.setStorage({
        key: "openId",
        data: n
    }));
}

function t() {
    var e = getApp().globalData, t = e.openId, n = e.unionId;
    return t || (t = wx.getStorageSync("openId"), e.openId = t), n || (n = wx.getStorageSync("unionId"), 
    e.unionId = n), {
        openId: t,
        unionId: n
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.allIsNotEmpty = exports.isEmpty = exports.getFullUserInfo = exports.getUnionId = exports.getEncryptedData = exports.getOpenId = exports.getStorage = exports.getUserInfo = exports.authSetting = exports.request = exports.login = exports.promisify = exports.appId = void 0, 
exports.saveUnionIdAndOpenId = e, exports.getUnionIdAndOpenId = t, exports.formatDate = function(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "-";
    if (!e) return "";
    var n = new Date(e);
    return [ n.getFullYear(), n.getMonth() + 1, n.getDate() ].map(function(e) {
        return e > 9 ? e : "0" + e;
    }).join(t);
};

var n = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../utils/promise-6.1.0")), o = (exports.appId = "wxde8ac0a21135c07d", 
"https://qrcode.meituan.com"), r = exports.promisify = function(e) {
    return function(t) {
        for (var o = arguments.length, r = Array(o > 1 ? o - 1 : 0), u = 1; u < o; u++) r[u - 1] = arguments[u];
        return new n.default(function(n, o) {
            e.apply(void 0, [ Object.assign({}, t, {
                success: n,
                fail: o
            }) ].concat(r));
        });
    };
}, u = exports.login = function() {
    return new n.default(function(e, t) {
        wx.login({
            success: function(n) {
                var o = n.code, r = n.errMsg;
                o ? e(o) : t(new Error(r));
            },
            fail: t
        });
    });
}, a = exports.request = r(wx.request), i = exports.authSetting = function(e) {
    return new n.default(function(t, n) {
        wx.getSetting({
            success: function(n) {
                t(!!n.authSetting[e]);
            },
            fail: n
        });
    });
}, s = exports.getUserInfo = function() {
    return new n.default(function(e, t) {
        var n = getApp().globalData.fullUserInfo;
        n ? e(n) : i("scope.userInfo").then(function(n) {
            console.log("用户是否授权了个人信息：", n), n ? wx.getUserInfo({
                withCredentials: !0,
                success: function(t) {
                    getApp().globalData.fullUserInfo = t, e(t);
                },
                fail: t
            }) : t({
                errMsg: "getUserInfo:fail"
            });
        }).catch(t);
    });
}, p = (exports.getStorage = r(wx.getStorage), exports.getOpenId = function(e) {
    return a({
        url: o + "/api/xcx/getOpenId?js_code=" + e
    }).then(function(e) {
        return e.data;
    });
}), d = exports.getEncryptedData = function(e, t, n) {
    return a({
        method: "POST",
        url: o + "/brunch/applet/unionid",
        data: {
            iv: t,
            encryptedData: e,
            sessionKey: n
        }
    }).then(function(e) {
        return e.data;
    });
}, c = exports.getUnionId = function() {
    var e = t(), o = e.openId, r = e.unionId;
    return o && r ? n.default.resolve({
        openId: o,
        unionId: r
    }) : u().then(p).then(function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return e.data && e.data.unionid ? {
            openId: e.data.openid,
            unionId: e.data.unionid,
            sessionKey: e.data.sessionKey
        } : s().then(function(e) {
            return d(e.encryptedData, e.iv, e.sessionKey);
        });
    });
}, f = (exports.getFullUserInfo = function() {
    return c().then(function(e) {
        return e.nickName ? e : s().then(function(t) {
            return Object.assign(e, t.userInfo);
        });
    }).then(function(t) {
        return e(t), t;
    });
}, exports.isEmpty = function(e) {
    return null == e || 0 === e.length;
});

exports.allIsNotEmpty = function(e) {
    return e.every(function(e) {
        return !f(e);
    });
};