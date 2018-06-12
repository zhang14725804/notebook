function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

var t = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, n, s) {
        return n && e(t.prototype, n), s && e(t, s), t;
    };
}(), n = require("../../libs/promise.min.js"), s = require("./queue.js"), i = require("./url.js"), o = require("./error.js"), r = require("../../common/utils"), a = {
    CLOSED: "CLOSED",
    CONNECTING: "CONNECTING",
    ACTIVE: "ACTIVE",
    RECONNECTING: "RECONNECTING"
}, c = !0, u = 1, l = function t(n) {
    e(this, t);
    var s = "function" == typeof getCurrentPages ? getCurrentPages() : [], i = s && s.length ? n.useCustomRoute && s[s.length - 1].customRoute || s[s.length - 1].route || s[s.length - 1].__route__ : "pages/index/index";
    return {
        TYPE: "GBK" == n.encoding ? 2 : 1,
        REQID: n.id,
        URI: n.socket_uri,
        METHOD: n.method || "GET",
        HEADER: Object.assign({
            referer: "http://wq.jd.com/wxapp/" + i
        }, n.header),
        BODY: n.data || ""
    };
}, h = function() {
    function h() {
        e(this, h);
    }
    return t(h, null, [ {
        key: "init",
        value: function() {
            this.queue = new s(this.request.bind(this), 40), this.setStatus(a.CLOSED), this.requestList = {}, 
            wx.onSocketOpen(this.onOpen.bind(this)), wx.onSocketMessage(this.onMessage.bind(this)), 
            wx.onSocketClose(this.onClose.bind(this)), wx.onSocketError(this.onError.bind(this)), 
            this.reConnect = r.throttle(this.reConnect.bind(this), 500);
        }
    }, {
        key: "request",
        value: function(e, t) {
            var n = this;
            if (e.speed.wsRequest || (e.speed.wsRequest = Date.now()), e.socket_uri = i.toSocketURI(e.url), 
            this.requestList[e.id] = {
                data: e,
                callback: t
            }, this.status !== a.ACTIVE) return this.connect();
            var s = new l(e);
            e.speed.wsSendMsg = Date.now(), wx.sendSocketMessage({
                data: JSON.stringify(s),
                fail: function(s) {
                    var i = JSON.stringify(s);
                    if (/not connected/.test(i) || /taskID not exist/.test(i) || /socket is closed/.test(i) || /webSocket is closed/.test(i) || /webSocket is not open/.test(i)) return n.reConnect("SOCKET_SEND_MSG_ERROR");
                    n.setStatus(a.CLOSED), delete n.requestList[e.id];
                    var r = new o({
                        code: o.NETWORK.SEND_MSG_ERROR.code,
                        message: o.NETWORK.SEND_MSG_ERROR.message,
                        detail: s
                    });
                    return t(r);
                }
            });
        }
    }, {
        key: "push",
        value: function(e) {
            e.channel = "socket", e.speed.wsPush = Date.now(), this.queue.push(e, this.handler.bind(this));
        }
    }, {
        key: "connect",
        value: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wss://wxa.jd.com/ws";
            if (this.status === a.CLOSED) return clearTimeout(this.pingTimer), clearTimeout(this.pongTimer), 
            this.setStatus(c ? a.CONNECTING : a.RECONNECTING), c = !1, this._promise = new n(function(n, s) {
                wx.connectSocket({
                    url: t,
                    success: function(e) {
                        n(e);
                    },
                    fail: function(t) {
                        if (/is connected/.test(JSON.stringify(t))) return e.setStatus(a.ACTIVE), n(t);
                        e.setStatus(a.CLOSED);
                        var i = {
                            code: o.NETWORK.CONNECT_ERROR.code,
                            message: o.NETWORK.CONNECT_ERROR.message,
                            detail: t
                        };
                        e.connectErrorHandler(i), e.exceptionReport("connect error", "SOCKET_CONNECT_ERROR"), 
                        s(t);
                    },
                    complete: function(e) {}
                });
            }), this._promise;
        }
    }, {
        key: "onOpen",
        value: function(e) {
            var t = this;
            u = 1, this.setStatus(a.ACTIVE);
            var n = Object.assign({}, this.requestList);
            this.requestList = {}, this.queue.workers.forEach(function(e) {
                var s = e.data, i = e.callback;
                n[s.id] && (i = n[s.id].callback, t.request(s, i));
            }), this.nextPing();
        }
    }, {
        key: "onMessage",
        value: function(e) {
            var t = void 0;
            try {
                "PONG" === e.data ? this.handlePongPacket() : t = JSON.parse(e.data);
            } catch (t) {
                return wx.JDReport.reportWsFailed({
                    error: t,
                    res: e
                }), console.log("socket data parse error", t);
            }
            if (t && this.requestList[t.REQID]) {
                var n = this.requestList[t.REQID], s = n.data, i = n.callback;
                s.speed.wsOnMsg = Date.now(), delete this.requestList[t.REQID];
                var r = {
                    body: t.BODY,
                    header: t.HEADER,
                    code: t.CODE
                };
                return 200 != t.CODE ? i(new o({
                    code: o.NETWORK.STATUS_CODE_ERROR.code,
                    message: o.NETWORK.STATUS_CODE_ERROR.message,
                    detail: t.CODE
                }), r) : i(null, r);
            }
        }
    }, {
        key: "onClose",
        value: function(e) {
            this.setStatus(a.CLOSED), console.log("socket close");
        }
    }, {
        key: "onError",
        value: function(e) {
            if (this.setStatus(a.CLOSED), u > 0) u--, this.reConnect("SOCKET_ON_ERROR"); else {
                var t = {
                    code: o.NETWORK.GATEWAY_ERROR.code,
                    message: o.NETWORK.GATEWAY_ERROR.message,
                    detail: e
                };
                this.connectErrorHandler(t);
            }
            this.exceptionReport(e, "SOCKET_ON_ERROR"), console.log("socket error: ", e);
        }
    }, {
        key: "handler",
        value: function(e, t, n) {
            try {
                if (e) return t.callback(e, n);
                var s = n.body, i = n.header;
                return t.callback(null, {
                    body: s,
                    header: i
                });
            } catch (e) {
                console.warn("handler", e);
            }
        }
    }, {
        key: "connectErrorHandler",
        value: function(e) {
            this.queue.workers.forEach(function(t, n) {
                var s = new o(e);
                "function" == typeof n && n(s);
            }), this.exceptionReport(e.detail, "SOCKET_SWITCH_CHANNEL");
        }
    }, {
        key: "reConnect",
        value: function(e) {
            this.setStatus(a.CLOSED), wx.closeSocket(), clearTimeout(this.pingTimer), clearTimeout(this.pongTimer), 
            setTimeout(this.connect.bind(this), 1e3);
            this.exceptionReport("socket reconnect", e);
        }
    }, {
        key: "setStatus",
        value: function(e) {
            this.status !== e && (this.status = e);
        }
    }, {
        key: "handlePongPacket",
        value: function() {
            this.nextPing();
        }
    }, {
        key: "nextPing",
        value: function() {
            clearTimeout(this.pingTimer), clearTimeout(this.pongTimer);
        }
    }, {
        key: "ping",
        value: function() {
            wx.sendSocketMessage({
                data: "PING"
            }), this.pongTimer = setTimeout(this.handlePongTimeout.bind(this), 1e4);
        }
    }, {
        key: "handlePongTimeout",
        value: function() {
            this.reConnect("SOCKET_TIMEOUT");
        }
    }, {
        key: "reset",
        value: function() {
            var e = this;
            return new n(function(t, n) {
                clearTimeout(e.pingTimer), clearTimeout(e.pongTimer), e.setStatus(a.CLOSED), wx.closeSocket(), 
                setTimeout(t, 1e3);
            });
        }
    }, {
        key: "exceptionReport",
        value: function(e, t) {
            t && wx.JDReport.reportWsError({
                error: e,
                type: t
            });
        }
    } ]), h;
}();

h.init(), module.exports = h;