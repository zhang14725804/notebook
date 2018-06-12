function o(o, e) {
    var n = "string" == typeof o ? o.split(".") : [];
    return "object" === (void 0 === e ? "undefined" : t(e)) ? n.reduce(function(o, e) {
        return "object" === (void 0 === o ? "undefined" : t(o)) ? o[e] : {};
    }, e) : void 0;
}

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
    return typeof o;
} : function(o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
};

module.exports = {
    mergeSubArray: function(e, n) {
        return Array.isArray(n) && "string" == typeof e && n.reduce(function(n, r) {
            return r = "object" === (void 0 === r ? "undefined" : t(r)) ? r : {}, n.concat(o(e, r) || []);
        }, []) || [];
    },
    access: o
};