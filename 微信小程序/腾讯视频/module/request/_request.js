function e(e) {
    return e >= 200 && e < 400;
}

var t = require("./parse-body"), n = require("../fns"), s = require("../../config/vaccess"), o = require("../log")("vaccess"), a = 9, c = "https://access.video.qq.com/tinyapp/{protocol}?vappid=65939066&vsecret=07c58e0c93150c4254a2a24131574b94cab6142ba4210efa&vversion_name=5.2.0.1234&vplatform=", r = "", d = function() {
    r = c + a;
};

d(), wx.getSystemInfo({
    success: function(e) {
        a = ~e.model.indexOf("iPhone") ? 5 : 3, d();
    }
});

var i = require("../es6-promise");

module.exports = {
    request: n.queue(function(n, s) {
        return s.success = function(s) {
            return s = s || function() {}, function(o) {
                if (o && e(o.statusCode) && o.data) try {
                    o.data = t(o.data);
                } catch (e) {}
                n(), s(o);
            };
        }(s.success), s.fail = function(e) {
            return e = e || function() {}, function(t) {
                n(), e(t);
            };
        }(s.fail), wx.request(s);
    }, 4),
    post: function(t, n, s) {
        var o = this;
        if ("function" == typeof n && (s = n, n = {}), n = n || {}, !s) return new i(function(s, a) {
            o.request({
                url: t,
                data: n.data,
                header: n.header,
                method: "POST",
                success: function(t) {
                    if (!e(t.statusCode)) return a(t);
                    s(t);
                },
                fail: function(e) {
                    a(e);
                },
                needLoginCase: n.needLoginCase,
                needlogin: n.needlogin,
                getBusicode: n.getBusicode
            });
        });
        this.request({
            url: t,
            data: n.data,
            header: n.header,
            method: "POST",
            success: function(t) {
                if (!e(t.statusCode)) return s(t);
                s(null, t);
            },
            fail: function(e) {
                s(e);
            },
            needLoginCase: n.needLoginCase,
            needlogin: n.needlogin,
            getBusicode: n.getBusicode
        });
    },
    get: function(t, n, s) {
        var o = this;
        if ("function" == typeof n && (s = n, n = {}), n = n || {}, !s) return new i(function(s, a) {
            o.request({
                url: t,
                data: n.data,
                header: n.header,
                method: "GET",
                success: function(t) {
                    if (!e(t.statusCode)) return a(t);
                    s(t);
                },
                fail: function(e) {
                    a(e);
                },
                needLoginCase: n.needLoginCase,
                needlogin: n.needlogin,
                getBusicode: n.getBusicode
            });
        });
        this.request({
            url: t,
            data: n.data,
            header: n.header,
            method: "GET",
            success: function(t) {
                if (!e(t.statusCode)) return s(t);
                s(null, t);
            },
            fail: function(e) {
                s(e);
            },
            needLoginCase: n.needLoginCase,
            needlogin: n.needlogin,
            getBusicode: n.getBusicode
        });
    },
    vaccess: function(t, n, a) {
        if (!s[t]) throw new Error("找不到名为" + t + "的接口配置，请到config/vaccess.js添加");
        var c = s[t], d = c.path, i = r.replace("{protocol}", t);
        return !0 === c.debugaccess ? i = i.replace("/access", "/debugaccess") : !1 === c.debugaccess && (i = i.replace("/debugaccess", "/access")), 
        d && (i = i.replace("/tinyapp/", "/" + d + "/")), "get" == c.method ? this.get(i, {
            data: n,
            header: a,
            needLoginCase: c.needLoginCase,
            needlogin: c.needlogin,
            getBusicode: c.getBusicode
        }).then(function(e) {
            if (0 != e.data.ret) throw e;
            return o(t + " result", e.data.data), e.data.data;
        }).catch(function(n) {
            var s = new Error("vaccess error");
            throw e(n.statusCode) ? s.code = "A." + n.data.ret : n.statusCode ? s.code = "H." + n.statusCode : s.code = "W." + (n ? n.errMsg : "unknown"), 
            s.body = n, o(t + " error", n), s;
        }) : this.post(i, {
            data: n,
            header: a,
            needLoginCase: c.needLoginCase,
            needlogin: c.needlogin,
            getBusicode: c.getBusicode
        }).then(function(e) {
            if (0 != e.data.ret) throw e;
            return e.data.data;
        }).catch(function(t) {
            var n = new Error("vaccess error");
            throw e(t.statusCode) ? n.code = "A." + t.data.ret : t.statusCode ? n.code = "H." + t.statusCode : n.code = "W." + (t ? t.errMsg : "unknown"), 
            n.body = t, n;
        });
    },
    switchHost: function(e) {
        switch (null == e && (e = c.indexOf("https://access") >= 0 ? "dev" : "product"), 
        e) {
          case "dev":
            c = c.replace("https://access", "https://debugaccess");
            break;

          case "product":
            c = c.replace("https://debugaccess", "https://access");
        }
        return d(), console.log("switchHost", e, c), c.indexOf("https://access") >= 0 ? "product" : "dev";
    }
}, setTimeout(function() {
    var e = getApp();
    e && e.global && "dev" == e.global.env_type && module.exports.switchHost("dev");
}, 0);