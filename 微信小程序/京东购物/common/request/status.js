function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), n = function() {
    function n() {
        t(this, n);
    }
    return e(n, null, [ {
        key: "init",
        value: function() {
            this.status = {
                currentChannel: "socket",
                httpQueue: {
                    total: 0,
                    requested: 0,
                    waiting: 0,
                    blocked: 0
                },
                socketQueue: {
                    total: 0,
                    requested: 0,
                    waiting: 0,
                    blocked: 0
                },
                lastError: null,
                socketStatus: {
                    onError: null,
                    onConnect: null
                }
            };
        }
    }, {
        key: "setCurrentChannel",
        value: function(t) {
            this.status.currentChannel !== t && (this.status.currentChannel = t);
        }
    }, {
        key: "setLastError",
        value: function(t) {
            this.status.lastError = t;
        }
    }, {
        key: "getStatus",
        value: function() {
            return this.status;
        }
    } ]), n;
}();

module.exports = n;