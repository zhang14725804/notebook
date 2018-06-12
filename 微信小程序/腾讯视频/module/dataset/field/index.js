function t(n, r) {
    return n ? 1 === r.length ? n && n[r[0]] : t(n[r.shift()], r) : "";
}

module.exports = {
    filter: function(n, r) {
        var e = {};
        return n.forEach(function(n, i) {
            var f = [];
            ~n.indexOf(".") && (f = n.split("."));
            var u = f.length;
            u ? e[f[u - 1]] = t(r, f) : e[n] = r[n];
        }), e;
    }
};