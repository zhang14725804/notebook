module.exports = function(e, t, o) {
    for (var r = Object.keys(e), s = 0; s < r.length; s++) e[r[s]] && (t[r[s]] = e[r[s]]);
    o && o(e);
};