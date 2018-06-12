function _classCallCheck(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, a) {
        for (var t = 0; t < a.length; t++) {
            var n = a[t];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(a, t, n) {
        return t && e(a.prototype, t), n && e(a, n), a;
    };
}(), _operationKit = require("./../lib/operationKit.js"), PageCache = function() {
    function e() {
        _classCallCheck(this, e), this.pages = {};
    }
    return _createClass(e, [ {
        key: "cache",
        value: function(e, a) {
            this.pages[e] = {
                $data: (0, _operationKit.deepClone)(a.$data)
            };
        }
    }, {
        key: "restore",
        value: function(e, a) {
            if (!this.pages[e]) return void console.error("[pageCache] trying to restore a non-cached page:", e);
            Object.assign(a, this.pages[e].$data), a.$apply();
        }
    } ]), e;
}();

exports.default = new PageCache();