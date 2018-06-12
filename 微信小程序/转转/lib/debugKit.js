Object.defineProperty(exports, "__esModule", {
    value: !0
});

var debug = !1, ctxDependConsole = exports.ctxDependConsole = function() {
    var e = {};
    for (var o in console) "function" == typeof console[o] ? e[o] = debug ? console[o] : function() {} : e[o] = console[o];
    return e;
}();