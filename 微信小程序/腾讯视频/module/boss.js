function e(e) {
    switch (e) {
      case "click":
      case "expose":
      case "pageview":
      case "launch":
      case "show":
      case "hide":
        return {
            BossId: 4328,
            Pwd: "935617029"
        };

      case "cgi":
        return {
            BossId: 4326,
            Pwd: "315967365"
        };

      case "recommend":
        return {
            BossId: 4398,
            Pwd: "1708014290"
        };

      case "errorlog":
        return {
            BossId: 4875,
            Pwd: "151568626"
        };

      default:
        return {};
    }
}

function t() {
    return getCurrentPages && getCurrentPages().length ? getCurrentPages().slice(0).pop().$name : "";
}

function n() {
    if (!getCurrentPages || getCurrentPages().length <= 1) return "";
    var e = getCurrentPages().slice(0), t = e[e.length - 2], n = t && t.$name || "";
    return "index" != n && "channel" != n || !t.data.showSearch || (n = "search"), n;
}

function r() {
    var e, t, n, r, a = new Error().stack.split("\n")[4];
    if (a = a.substring(a.indexOf("at ") + 3), /\)$/.test(a)) {
        var o = a.match(/(\S+) (\[.+?\] )?\((.+?)\)/);
        null !== o && (n = o[1], e = (r = o[3].split(":"))[0], t = r[1]);
    } else e = (r = a.split(":"))[0], t = r[1], n = "unknown";
    return {
        filename: e,
        linenum: parseInt(t),
        func: n
    };
}

var a, o, c, i, l = require("./fns.js"), u = require("./login.js"), s = wx.getSystemInfoSync(), p = require("./globalData"), g = l.delegator(function(e) {
    clearTimeout(i), (c = {
        nick: ""
    }).nick = p.get("nickName") || "", e(c), i = setTimeout(function() {
        c = null;
    }, 500);
}), f = l.queue(function(e) {
    function t() {
        g(function(t) {
            i.network = a ? a.type : "", i.wx_version = s.version, i.platform = s.platform, 
            i.client_model = s.model, i.system = s.system || "", t && (i.nick = t.nick || "");
            var n = u.getReqHeader().Cookie;
            wx.request({
                method: "GET",
                url: "https://btrace.qq.com/kvcollect",
                header: {
                    cookie: n
                },
                data: i,
                complete: function() {
                    e();
                }
            });
        });
    }
    for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), c = 1; c < n; c++) r[c - 1] = arguments[c];
    var i = l.extend.apply(l, r);
    getApp().global.ptag && (i.ptag = getApp().global.ptag), getApp().global.scene && (i.scene = getApp().global.scene), 
    a ? t() : (clearTimeout(o), wx.getNetworkType({
        success: function(e) {
            a = {
                type: e.networkType
            }, o = setTimeout(function() {
                a = null;
            }, 500), t();
        }
    }));
});

module.exports = function(a) {
    function o() {
        return f.apply(null, arguments);
    }
    return a && "object" != l.type(a) && (console.error("[Boss] illegal conf param:", a), 
    a = {}), o.stat = function(r, o) {
        var c = {
            action_type: r
        };
        o && !0 === o.page_url && (o.page_url = t()), o && !0 === o.page_ref && (o.page_ref = n()), 
        f(e(r), c, a, o);
    }, o.expose = function(r, o) {
        var c = {
            action_type: "expose",
            module: r,
            page_url: t(),
            page_ref: n()
        };
        f(e("expose"), c, a, o);
    }, o.click = function(r, o) {
        var c = {
            action_type: "click",
            module: r,
            page_url: t(),
            page_ref: n()
        };
        f(e("click"), c, a, o);
    }, o.pv = function(r, o) {
        "object" == l.type(r) && (o = r, r = "");
        var c = {
            action_type: "pageview",
            module: r || t() || "",
            page_url: t(),
            page_ref: n()
        };
        f(e("pageview"), c, a, o);
    }, o.rcShow = function(n) {
        var r = {
            action_type: "show",
            page_url: t()
        };
        f(e("recommend"), r, a, n);
    }, o.rcClick = function(n) {
        var r = {
            action_type: "click",
            page_url: t()
        };
        f(e("recommend"), r, a, n);
    }, o.cgi = function(n) {
        if (n) {
            var r = {
                action_type: "cgi",
                page_url: t(),
                page_query: ""
            };
            f(e("cgi"), r, a, n);
        }
    }, o.errorlog = function(n) {
        var o = r(), c = {
            url: t(),
            utime: Date.now(),
            level: 4,
            filename: o.filename,
            line: o.linenum,
            func: o.func,
            log: n
        };
        f(e("errorlog"), c, a);
    }, o;
};