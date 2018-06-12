function t(t) {
    for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) n[r - 1] = arguments[r];
    return function() {
        for (var e = this, r = arguments.length, o = Array(r), a = 0; a < r; a++) o[a] = arguments[a];
        t.call.apply(t, [ this ].concat(o)), n.forEach(function(t) {
            return t.call.apply(t, [ e ].concat(o));
        });
    };
}

function e(e, n) {
    for (var r = arguments.length, o = Array(r > 2 ? r - 2 : 0), a = 2; a < r; a++) o[a - 2] = arguments[a];
    e[n] = t.apply(void 0, [ e[n] ].concat(o));
}

var n = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
}, r = require("./constant.js"), o = (getApp(), wx.getSystemInfoSync() || {}), a = wx.getStorageSync("userId"), c = wx.getStorageSync("comeTime"), i = wx.getStorageSync("userCount"), u = wx.getStorageSync("currentTime"), s = wx.getStorageSync("subScenekey"), p = function(t) {
    var e = this.__route__, p = r.pointData[t], h = r.objInfoMap[e] || "特殊页面暂时没有埋点", g = 0 === e.indexOf("http") ? e : "http:" + e, d = new Date(), l = d.getHours(), m = d.getMinutes(), f = d.getSeconds(), v = String(Math.random()).slice(2, 8), S = void 0;
    a ? S = a : (S = ("" + parseFloat(+d + "" + (1e8 * Math.random() + "").substr(0, 8))).substr(0, 16), 
    wx.setStorageSync("userId", S));
    var y = void 0;
    c ? y = c : (y = Math.round(+d / 1e3), wx.setStorageSync("comeTime", y));
    var _ = 0;
    _ = i ? parseFloat(i) + 1 : 1, wx.setStorageSync("userCount", _);
    var w = 0;
    u ? w = u : wx.setStorageSync("currentTime", Math.round(+d / 1e3));
    var x = Math.round(d.getTime() / 1e3), b = (o.screenWidth || 0) + "x" + (o.screenHeight || 0), k = {
        idsite: 49,
        rec: 1,
        r: v,
        h: l,
        m: m,
        s: f,
        url: g = g + "?utm_source=" + encodeURIComponent("miniapp") + "&utm_medium=" + encodeURIComponent(p) + "&utm_term=" + encodeURIComponent(s),
        urlref: "miniapp",
        _id: S,
        _idts: y,
        _idvc: _,
        _idn: 1,
        _refts: x,
        _viewts: w,
        send_image: 1,
        ai_cookie: "",
        cookie: 0,
        res: b
    };
    0 == (arguments.length <= 1 ? 0 : arguments.length - 1) ? wx.request({
        url: "http://tk.aihuishou.com/piwik.php",
        data: n({
            action_name: h
        }, k)
    }) : wx.request({
        url: "http://tk.aihuishou.com/piwik.php",
        data: n({
            e_n: arguments.length <= 1 ? void 0 : arguments[1],
            e_a: arguments.length <= 2 ? void 0 : arguments[2],
            e_c: (arguments.length <= 3 ? void 0 : arguments[3]) || "basicInfo"
        }, k)
    });
}, h = {
    cbLaunch: function(t) {
        var e = p;
        p = function() {
            for (var n = arguments.length, r = Array(n), o = 0; o < n; o++) r[o] = arguments[o];
            e.call.apply(e, [ this, t.scene ].concat(r));
        };
    }
}, g = {
    cbLoad: function(t) {
        p.call(this);
    }
};

!function() {
    var t = App;
    App = function(n) {
        e(n, "onLaunch", h.cbLaunch), t(n);
    };
    var n = Page;
    Page = function(t) {
        e(t, "onLoad", g.cbLoad), t._piwik = p, n(t);
    };
}();