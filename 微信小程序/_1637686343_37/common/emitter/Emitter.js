function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var s = e[n];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(t, s.key, s);
        }
    }
    return function(e, n, s) {
        return n && t(e.prototype, n), s && t(e, s), e;
    };
}(), n = function() {
    function n() {
        t(this, n);
    }
    return e(n, [ {
        key: "on",
        value: function(t, e) {
            return this._callbacks = this._callbacks || {}, (this._callbacks[t] = this._callbacks[t] || []).push(e), 
            this;
        }
    }, {
        key: "once",
        value: function(t, e) {
            function n() {
                s.off(t, n), e.apply(this, arguments);
            }
            var s = this;
            return this._callbacks = this._callbacks || {}, n.fn = e, this.on(t, n), this;
        }
    }, {
        key: "off",
        value: function(t, e) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, 
            this;
            var n = this._callbacks[t];
            if (!n) return this;
            if (1 == arguments.length) return delete this._callbacks[t], this;
            for (var s, a = 0; a < n.length; a++) if ((s = n[a]) === e || s.fn === e) {
                n.splice(a, 1);
                break;
            }
            return this;
        }
    }, {
        key: "emit",
        value: function(t) {
            this._callbacks = this._callbacks || {};
            var e = [].slice.call(arguments, 1), n = this._callbacks[t];
            if (n) for (var s = 0, a = (n = n.slice(0)).length; s < a; ++s) n[s].apply(this, e);
            return this;
        }
    }, {
        key: "listeners",
        value: function(t) {
            return this._callbacks = this._callbacks || {}, this._callbacks[t] || [];
        }
    }, {
        key: "hasListeners",
        value: function(t) {
            return !!this.listeners(t).length;
        }
    } ]), n;
}();

exports.default = n, n.prototype.addEventListener = n.prototype.on, n.prototype.removeEventListener = n.prototype.off;