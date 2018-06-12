function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = function() {
    function e(e, n) {
        for (var i = 0; i < n.length; i++) {
            var t = n[i];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(n, i, t) {
        return i && e(n.prototype, i), t && e(n, t), n;
    };
}(), i = require("../../../module/message");

require("../../../module/fns");

module.exports = function() {
    function t() {
        e(this, t), this._message = new i();
    }
    return n(t, [ {
        key: "set",
        value: function(e, n) {
            var i = e.video;
            if (i) {
                this.video = i;
                var t = this.index = e.index || 0, r = this.key = e.key || "";
                this._message.emit("change", {
                    video: i,
                    index: t,
                    key: r
                }, n);
            }
        }
    }, {
        key: "onChange",
        value: function(e) {
            this._message.on("change", e);
        }
    } ]), t;
}();