function typeCheck() {
    var t = Array.prototype.slice.apply(arguments);
    return function(e, r, o) {
        var n = o.value;
        o.value = function() {
            var e = Array.prototype.slice.apply(arguments), r = void 0;
            return _check(e, t) && (r = n.call.apply(n, [ this ].concat(Array.prototype.slice.call(arguments)))), 
            r;
        };
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

exports.typeCheck = typeCheck;

var _toString = Object.prototype.toString, _isPlainObject = function(t) {
    return "[object Object]" === _toString.call(t);
}, _isRegExp = function(t) {
    return "[object RegExp]" === _toString.call(t);
}, _check = function(t, e) {
    for (var r = 0; r < t.length; r++) if (!/(any)/gi.test(e[r]) && !(_isPlainObject(t[r]) && /(object)/gi.test(e[r]) || _isRegExp(t[r]) && /(regexp)/gi.test(e[r]) || Array.isArray(t[r]) && /(array)/gi.test(e[r]))) {
        var o = _typeof(t[r]), n = new RegExp(o, "ig");
        if (!n.test(e[r])) return console.error(t[r] + "is not a " + e[r]), !1;
    }
    return !0;
};