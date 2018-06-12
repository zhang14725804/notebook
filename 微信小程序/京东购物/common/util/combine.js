var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

module.exports = function(t) {
    for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), e = 1; e < n; e++) r[e - 1] = arguments[e];
    return r.forEach(function(n) {
        if ("object" !== (void 0 === n ? "undefined" : o(n))) throw new Error("组件的配置应当是个对象");
        for (var r in n) n.hasOwnProperty(r) && function() {
            var e = n[r];
            if ("object" === (void 0 === e ? "undefined" : o(e))) t[r] = t[r] || {}, t[r] = Object.assign({}, e, t[r]); else if ("function" == typeof e) {
                var f = t[r] ? t[r] : function() {};
                t[r] = function() {
                    f.apply(this, arguments), e.apply(this, arguments);
                };
            } else t[r] = t[r] || n[r];
        }();
    }), t;
};