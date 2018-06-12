var t = require("../cache"), e = t.get("tvp_report") || {};

exports.get = function(t) {
    return e[t];
}, exports.set = function(r, n) {
    e[r] = n, t.set("tvp_report", e);
}, exports.del = function(r) {
    r ? delete e[r] : e = {}, t.set("tvp_report", e);
}, exports.getAll = function() {
    return Object.keys(e).map(function(t) {
        return e[t];
    });
};