var r = {};

module.exports = {
    addEventListener: function(e, l) {
        var n = r[e];
        if (null != n) {
            for (var t = !1, a = 0; a < n.length; a++) if (n[a] == l) {
                t = !0;
                break;
            }
            0 == t && n.push(l);
        } else (n = new Array()).push(l);
        r[e] = n;
    },
    triggerEvent: function(e) {
        var l = r[e];
        if (null != l) for (var n = 0; n < l.length; n++) {
            var t = l[n];
            null != t && t.apply(null, Array.prototype.slice.call(arguments, 1));
        }
    }
};