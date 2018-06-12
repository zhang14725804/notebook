function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var i = 0; i < e.length; i++) {
            var n = e[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
    };
}(), i = function() {
    function i(e) {
        t(this, i), e = Object.assign({
            data: [],
            limit: 10
        }, e), this.rawData = e.data, this.limit = e.limit;
    }
    return e(i, [ {
        key: "group",
        value: function() {
            var t = [], e = [], i = this.rawData, n = this.limit, a = 0;
            return i.forEach(function(i, r) {
                var s = i.list;
                if (a >= n) e.push(i); else {
                    var l = n - a, u = Object.assign({}, i, {
                        list: s.slice(0, l)
                    });
                    a += u.list.length, t.push(u), a === n && e.push(Object.assign({}, i, {
                        list: s.slice(l, s.length)
                    }));
                }
            }), {
                head: t,
                last: e
            };
        }
    } ]), i;
}();

exports.default = i;