function o() {
    if (!c.length) return !1;
    var o = c.concat([]);
    c = [], wx.request({
        url: "https://wq.jd.com/visit/addlog",
        data: t({
            id: new Date().getTime(),
            log: o
        }),
        header: {
            "Content-Type": "text/plain;charset=UTF-8",
            Cookie: r.getCookie()
        },
        method: "POST",
        success: function(o) {
            console.log(o), -2 == o.data.retcode && console.log("未登录"), void 0 === o.data.retcode && console.log("上报失败");
        },
        fail: function(o) {
            console.log("上报失败", o);
        }
    });
}

function e(o) {
    u = [], console.log("查询日志上报白名单"), wx.request({
        url: "https://wqs.jd.com/sinclude/update/wx/2017/1/xcxlogWhite.html",
        success: function(e) {
            console.log(e);
            var n = e.data;
            -2 == n.retcode && console.log("未登录"), n && "object" == (void 0 === n ? "undefined" : i(n)) && (u = n), 
            o();
        },
        fail: function(o) {
            console.error("获取白名单失败");
        }
    });
}

function n(o) {
    var e = r.getCookie("jdpin");
    for (var n in u) {
        if ("xcx_log_true" == u[n].jdpin) return !1;
        if (u[n] && u[n].jdpin && u[n].jdpin.split(",").indexOf(e) >= 0) return o(), !0;
    }
    return c.length > 1e3 && (c.length = 0), !1;
}

function t(o) {
    return Object.keys(o).map(function(e) {
        var n = null == o[e] ? "" : o[e];
        return n instanceof Array ? n.map(function(o) {
            return encodeURIComponent(e) + "=" + encodeURIComponent(o);
        }).join("&") : encodeURIComponent(e) + "=" + encodeURIComponent(n);
    }).join("&");
}

var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
}, r = require("./cookie-v2/cookie.js"), c = [], u = null, l = 0;

module.exports = {
    log: function() {
        var t = [];
        clearTimeout(l);
        for (var r = arguments.length, s = Array(r), f = 0; f < r; f++) s[f] = arguments[f];
        for (var a in s) "object" == i(s[a]) ? t.push(JSON.stringify(s[a])) : t.push(s[a]);
        c.push(t.join(" ")), console.log("=====", s), t = null, u ? n(function() {
            l = setTimeout(o, 3e3);
        }) : e(function() {
            n(function() {
                l = setTimeout(o, 3e3);
            });
        });
    }
};