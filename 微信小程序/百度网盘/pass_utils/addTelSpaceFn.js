Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.addTelSpace = function(t) {
    for (var e = t.split(" ").join(""), r = "", n = 0; n < e.length; n++) 2 == n || 6 == n || 10 == n || 14 == n || 18 == n ? r = r + e.charAt(n) + " " : r += e.charAt(n);
    return (" " == r.charAt(r.length - 1) || isNaN(r.charAt(r.length - 1))) && (r = r.substring(0, r.length - 1)), 
    r;
};