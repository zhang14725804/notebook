function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var r = function() {
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
}(), o = require("./plugin.js"), a = require("../http.js"), c = require("../socket.js"), i = {
    http: {
        handler: a,
        score: 1
    },
    socket: {
        handler: c,
        score: 1
    }
}, u = function(a) {
    function c() {
        return e(this, c), t(this, (c.__proto__ || Object.getPrototypeOf(c)).apply(this, arguments));
    }
    return n(c, o), r(c, null, [ {
        key: "init",
        value: function() {
            this.current = "socket";
        }
    }, {
        key: "request",
        value: function(e, t) {
            if (e.cached) return t();
            var n = this.getChannel();
            return e.callback = t, e.exchangeFn = this.retryChannel.bind(this), "socket" != this.current && e.id % 10 == 9 && (n = this.getChannelByType("socket")), 
            e.channel && (n = this.getChannelByType(e.channel)), n.push(e);
        }
    }, {
        key: "getChannel",
        value: function() {
            var e = this.current;
            return i.socket.score > .9 ? e = "socket" : i[this.current].score < .2 && (e = this.getAnotherType()), 
            this.current = e, this.getChannelByType(e);
        }
    }, {
        key: "getAnotherType",
        value: function() {
            return "socket" == (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.current) ? "http" : "socket";
        }
    }, {
        key: "getChannelByType",
        value: function(e) {
            return i[e].handler;
        }
    }, {
        key: "response",
        value: function(e, t) {
            t(), this.evaluateChannel(e);
        }
    }, {
        key: "evaluateChannel",
        value: function(e) {
            var t = e.code, n = e.channel;
            if (n) {
                var r = t ? 1 : 0;
                i[n].score = (i[n].score + r) / 2;
            }
        }
    }, {
        key: "retryChannel",
        value: function(e) {
            e.referChannel = e.channel;
            var t = this.getAnotherType(e.referChannel), n = this.getChannelByType(t);
            return this.evaluateChannel({
                code: e.code,
                channel: e.referChannel
            }), n.push(e);
        }
    } ]), c;
}();

u.init(), module.exports = {
    Dispatcher: u,
    setDebugChannel: function(e) {
        "http" == e ? i.socket.handler = a : i.http.handler = c, console.warn("setDebugChannel did call !!!");
    }
};