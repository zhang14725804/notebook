function e(e) {
    var t = e.data, o = "";
    if (t) {
        "" == (o = t.ret || "") && void 0 !== t.s && (o = "o" == t.s ? 0 : -1);
        var r = t.data;
        r && (void 0 !== r.errCode && (o = r.errCode), void 0 !== r.status && (o = r.status), 
        void 0 !== r.cResult && (o = r.cResult));
    }
    return o;
}

function t() {
    n.request.apply(n, arguments);
}

var o = require("./_request"), r = require("../login"), s = require("../fns"), i = require("../boss.js")(), n = {
    request: function(t, o) {
        return function() {
            var r = Array.prototype.slice.call(arguments), s = r[0], n = new Date(), a = s.url;
            if (!/^https\:\/\/btrace.qq.com\/kvcollect/.test(a)) {
                var c = s.complete;
                s.complete = function(t) {
                    c && c.apply(o || this, t);
                    var r = new Date() - n, a = e(t);
                    i.cgi({
                        cgi: s.url.split("?")[0],
                        httpcode: t.statusCode || 555,
                        bizcode: a,
                        bizmsg: t.data && t.data.msg || t.errMsg || "",
                        delay: r,
                        req_data: "",
                        busicode: s.getBusicode && s.getBusicode(t) || 0
                    });
                };
            }
            return t.apply(o || this, r);
        };
    }(function(e) {
        ~e.url.indexOf("qq.com") && e.needlogin ? r.getUserInfo(function() {
            e.header = e.header || {}, e.header = s.extend(e.header, {
                Cookie: e.header.Cookie ? [ r.getReqHeader().Cookie, e.header.Cookie ].filter(function(e) {
                    return e;
                }).join("; ") : r.getReqHeader().Cookie
            });
            var t = r.getUserInfoSync();
            e.needLoginCase && t && "qq" == t.main_login && (e.url = s.queryJoin(e.url, {
                klong: 2
            })), o.request(e);
        }, "openid" == e.needlogin) : o.request(e);
    }, n),
    get: o.get,
    post: o.post,
    vaccess: o.vaccess,
    switchHost: o.switchHost
};

[ "get", "post", "vaccess", "switchHost" ].forEach(function(e) {
    t[e] = n[e].bind(n);
}), module.exports = t;