Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.urlParse = exports.parse = exports.stringify = void 0;

var r = function() {
    function r(r, t) {
        var e = [], i = !0, s = !1, n = void 0;
        try {
            for (var a, o = r[Symbol.iterator](); !(i = (a = o.next()).done) && (e.push(a.value), 
            !t || e.length !== t); i = !0) ;
        } catch (r) {
            s = !0, n = r;
        } finally {
            try {
                !i && o.return && o.return();
            } finally {
                if (s) throw n;
            }
        }
        return e;
    }
    return function(t, e) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return r(t, e);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), t = require("./stringify"), e = require("./parse");

exports.stringify = t.stringify, exports.parse = e.parse;

exports.urlParse = function(i) {
    var s = i.split("#"), n = r(s, 2), a = n[0], o = n[1], u = a.split("?"), h = r(u, 2), f = h[0], p = h[1], l = void 0 === p ? "" : p;
    return {
        host: f,
        hostname: f.split(":")[0],
        hash: o,
        href: i,
        query: (0, e.parse)(l),
        getSearch: function() {
            var r = (0, t.stringify)(this.query);
            return r && "?" + r || "";
        },
        format: function() {
            var r = this.getSearch();
            return this.href = "" + this.host + r + (this.hash ? "#" + this.hash : ""), this.href;
        }
    };
};