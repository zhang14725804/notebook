function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

var r = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var o = r[t];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(r, t, o) {
        return t && e(r.prototype, t), o && e(r, o), r;
    };
}(), t = require("../../libs/async.min.js"), o = require("./util.js"), n = require("./error.js"), i = 6e3, a = {
    RETRY: 0,
    HIGH: 10,
    NORMAL: 20,
    REPORT: 30
}, u = function() {
    function u(r) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 5;
        arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        e(this, u), this._request = r, this._queue = t.priorityQueue(this.worker.bind(this), o);
    }
    return r(u, [ {
        key: "push",
        value: function(e, r, t) {
            return e.uniKey && this._queue.remove(this.testUniKey(e.uniKey)), t = t || e.priority || "NORMAL", 
            t = a[t] || a.NORMAL, this._queue.push(e, t, this.callback(e, r));
        }
    }, {
        key: "worker",
        value: function(e, r) {
            e.requestTime = Date.now(), t.timeout(this._request, e.timeout || i)(e, r);
        }
    }, {
        key: "callback",
        value: function(e, r) {
            var t = this;
            return function(o) {
                var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                e.responseTime = Date.now();
                var a = i.code, u = i.body, s = i.header;
                if (e.code = a, e.rawBody = u, e.resHeader = s, !o) {
                    var c = t.formatBody(e);
                    return e.body = c, r(e.error, e, {
                        code: a,
                        body: c,
                        header: s
                    });
                }
                if ("ETIMEDOUT" == o.code && (o = new n({
                    code: n.NETWORK.TIMEOUT_ERROR.code,
                    message: n.NETWORK.TIMEOUT_ERROR.message,
                    detail: o.code
                })), e.responseList.push({
                    url: e.url,
                    code: a,
                    rawBody: e.rawBody,
                    resHeader: e.resHeader,
                    requestTime: e.requestTime,
                    responseTime: e.responseTime,
                    channel: e.channel,
                    error: o
                }), 302 == a && s && s.Location && /jd\.com\//.test(s.Location)) {
                    e.referrer = e.url;
                    var d = s.Location.trim().replace(/^(http:)?\/\//, "https://");
                    return e.url = d, t.push(e, r, "RETRY");
                }
                if ("REPORT" !== e.priority) {
                    if (o.code != n.NETWORK.CONNECT_ERROR.code && o.code != n.NETWORK.GATEWAY_ERROR.code || (e.retryNum = 0), 
                    e.retryNum) return e.retryNum -= 1, t.push(e, r, "RETRY");
                    if (e.exchangeFlag) return e.exchangeFlag = !1, e.exchangeFn(e);
                } else if (e.exchangeFlag) return e.exchangeFlag = !1, e.exchangeFn(e);
                return e.responseList.pop(), e.error = o, r(o, e);
            };
        }
    }, {
        key: "testUniKey",
        value: function(e) {
            return function(r) {
                var t = r.data;
                r.priority;
                return t.uniKey == e;
            };
        }
    }, {
        key: "formatBody",
        value: function(e) {
            switch (e.dataType) {
              case "json":
                -1 != e.url.indexOf("/recovery") && "string" == typeof e.rawBody && (e.rawBody = e.rawBody.replace(/<!--recovery.*?-->/, ""));
                var r = o.formatJSON(e.rawBody), t = r.error, i = r.data, a = r.timeSpent;
                return void 0 !== a && (e.speed.jsonParse = a), t ? void (e.error = new n({
                    code: n.JSON_ERROR.code,
                    message: n.JSON_ERROR.message,
                    detail: t
                })) : i;

              case "text":
              default:
                return e.rawBody;
            }
        }
    }, {
        key: "workers",
        get: function() {
            return this._queue.workersList();
        }
    } ]), u;
}();

module.exports = u, module.exports.PRIORITY = a;