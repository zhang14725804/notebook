function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t() {}

var n = function() {
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
}(), r = require("../../../WechatAppPlayer/src/lib/message"), a = require("../../../WechatAppPlayer/lib-inject").Promise;

module.exports = function() {
    function s(n, a) {
        e(this, s), this.destroyed = !1;
        var i = Object.keys(n);
        i.forEach(function(e) {
            !(n[e].to instanceof Array) && (n[e].to = []), !("function" == typeof n[e].beforeLeave) && (n[e].beforeLeave = t), 
            !("function" == typeof n[e].beforeEnter) && (n[e].beforeEnter = t), !("function" == typeof n[e].afterLeave) && (n[e].afterLeave = t), 
            !("function" == typeof n[e].afterEnter) && (n[e].afterEnter = t);
        }), this.message = new r(), this.states = n, this._state = i[0], this._laststate = "", 
        Object.defineProperties(this, {
            state: {
                get: function() {
                    return this._state;
                }
            },
            lastState: {
                get: function() {
                    return this._laststate;
                }
            }
        });
    }
    return n(s, null, [ {
        key: "create",
        value: function(e, t) {
            return new s(e, t);
        }
    } ]), n(s, [ {
        key: "setState",
        value: function(e, t) {
            var n = (t = t || {}).force || !1, r = t.silent || !1, a = this.states;
            if (n || ~a[this._state].to.indexOf(e)) {
                var s = this._state;
                if (r) this._laststate = this._state, this._state = e; else {
                    var i = !1;
                    if (n || (i = !1 === a[s].beforeLeave(e), i = !1 === a[e].beforeEnter(s) || !0 === i), 
                    i) return;
                    this._laststate = this._state, this._state = e, this.message.emit("change", e, s), 
                    a[s].afterLeave(e), a[e].afterEnter(s);
                }
                return 0 == a[e].to.length && (this.message.emit("end", e), this.message.off()), 
                this;
            }
        }
    }, {
        key: "getStatePromise",
        value: function(e) {
            var t = this;
            if ("function" != typeof e) {
                var n = e;
                e = function(e) {
                    return e == n;
                };
            }
            return new a(function(n, r) {
                var a = t.message.on("change", function(t) {
                    e(t) && (a(), n());
                });
                t.message.on("end", function(e) {
                    a(), r(new Error("state ended:" + e));
                }, !0);
            });
        }
    }, {
        key: "onChange",
        value: function(e) {
            return this.message.on("change", e), this;
        }
    } ]), s;
}();