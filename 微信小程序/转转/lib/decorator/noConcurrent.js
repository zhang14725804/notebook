function _noConcurrentTplt(e, o, n, t) {
    var r = e.namespace, u = void 0 === r ? {} : r, c = e.mutexStore, a = void 0 === c ? "_noConCurrentLocks" : c, s = e.mutexId;
    u[a] = u[a] || {}, s = s || n;
    var l = t.value;
    t.value = function() {
        if (!u[a][s]) {
            u[a][s] = !0;
            var e = l.apply(this, arguments);
            return e instanceof Promise ? e.then(function() {
                u[a][s] = !1;
            }).catch(function(e) {
                u[a][s] = !1, console.error(n, e);
            }) : (console.error("noConcurrent decorator shall be used with async function, yet got sync usage:", n), 
            u[a][s] = !1), e;
        }
    };
}

function makeMutex(e) {
    var o = e.namespace, n = e.mutexId;
    return "object" !== (void 0 === o ? "undefined" : _typeof(o)) ? (console.error("[makeNoConcurrent] bad parameters, namespace shall be a global object shared by all mutex funcs, got:", o), 
    function() {}) : _noConcurrentTplt.bind(null, {
        namespace: o,
        mutexStore: "_noConCurrentLocksNS",
        mutexId: n
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

exports.makeMutex = makeMutex;

var noConcurrent = exports.noConcurrent = _noConcurrentTplt.bind(null, {
    mutexStore: "_noConCurrentLocks"
});