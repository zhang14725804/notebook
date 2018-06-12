function i() {
    arguments.length > 0 && void 0 !== arguments[0] && arguments[0], arguments[1];
    return Object.assign({}, {
        isLogin: !1,
        userinfo: {},
        user: {}
    });
}

function e() {
    arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
    var i = arguments[1], e = i.options.data, t = i.options.wxdata, r = i.options.isLogin, s = n(e), o = {
        isLogin: !1,
        userinfo: {},
        user: {}
    };
    if (r) {
        o.isLogin = !0, o.userinfo = t, o.user.nickname = e.userinfo.nickname || "", o.user.phone = e.userinfo.phone || "", 
        o.user.uid = e.userinfo.uid || "", o.user.isVip = s;
        var u = e.userinfo.icon || "";
        return u = /^https/.test(u) ? u : u.replace(/http/, "https"), o.user.icon = u, s && (o.user.vipLevel = e.qiyi_vip_info.level), 
        o;
    }
    return o;
}

function n(i) {
    return i.qiyi_vip_info && 0 != i.qiyi_vip_info.type && 1 == i.qiyi_vip_info.status;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
    switch (t.type) {
      case "INIT_LOGIN_INFO":
        return i(n, t);

      case "CHANGE_LOGIN_INFO":
        return e(n, t);

      default:
        return n;
    }
};