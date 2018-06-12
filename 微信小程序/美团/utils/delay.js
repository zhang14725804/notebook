var n = [], t = {
    _interval: null,
    _push: function(t) {
        n.push(t), this._delayInterval();
    },
    _handle: function() {
        0 === (n = n.filter(function(n, t) {
            return !n.checkFunction || "function" != typeof n.checkFunction || !n.checkFunction() || (n.callback(), 
            !1);
        })).length && this._interval && clearInterval(this._interval);
    },
    _delayInterval: function() {
        var n = this;
        this._interval && clearInterval(this._interval), this._interval = setInterval(function() {
            n._handle();
        }, 3e3);
    },
    add: function(n, t) {
        if (n && "function" == typeof n || (n = function() {
            return !0;
        }), t && "function" == typeof t) if (n()) t(); else {
            var e = {
                checkFunction: n,
                callback: t
            };
            this._push(e);
        }
    },
    emit: function() {
        this._handle();
    }
};

module.exports = t;