function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), n = require("./queue.js"), r = require("./url.js"), a = require("./error.js"), u = function() {
    function u() {
        e(this, u);
    }
    return t(u, null, [ {
        key: "init",
        value: function() {
            this.queue = new n(this.request.bind(this), 10, 6666);
        }
    }, {
        key: "request",
        value: function(e, t) {
            var n = e.url, u = e.data, o = e.header, i = e.method, s = void 0 === i ? "GET" : i, c = e.dataType, d = void 0 === c ? "json" : c;
            if ("GBK" == e.encoding || r.checkSpacialDomain(n)) {
                var l = new a({
                    code: a.SPECIAL_DOMAIN.code,
                    message: a.SPECIAL_DOMAIN.message,
                    detail: n
                });
                return t(l, e.body);
            }
            e.http_uri = n, e.speed.httpReq = Date.now(), wx.request({
                url: e.http_uri,
                data: u,
                header: o,
                method: s,
                dataType: d,
                success: function(n) {
                    var r = n.data, u = n.statusCode, o = n.header;
                    e.speed.httpReqSucc = Date.now();
                    var i = {
                        code: u,
                        body: r,
                        header: o
                    };
                    if (200 !== u) {
                        var s = new a({
                            code: a.NETWORK.STATUS_CODE_ERROR.code,
                            message: a.NETWORK.STATUS_CODE_ERROR.message,
                            detail: u
                        });
                        return t(s, i);
                    }
                    return t(null, i);
                },
                fail: function(e) {
                    var n = new a({
                        code: a.NETWORK.REQUEST_ERROR.code,
                        message: a.NETWORK.REQUEST_ERROR.message,
                        detail: e
                    });
                    return t(n);
                }
            });
        }
    }, {
        key: "push",
        value: function(e) {
            e.channel = "http", e.speed.httpPush = Date.now(), this.queue.push(e, this.getHandler.bind(this));
        }
    }, {
        key: "getHandler",
        value: function(e, t, n) {
            try {
                if (e) return t.callback(e, n);
                var r = n.body, a = n.header;
                return t.callback(null, {
                    body: r,
                    header: a
                });
            } catch (e) {
                console.warn("handler", e);
            }
        }
    }, {
        key: "getURI",
        value: function(e) {
            return "GBK" == e.encoding ? r.toGBKURI(e.url) : r.toProxyURI(e.url);
        }
    } ]), u;
}();

u.init(), module.exports = u;