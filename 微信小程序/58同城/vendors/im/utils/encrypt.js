var e = require("./base64"), r = function(r) {
    if (null == r || 0 == r.length) return "";
    var n = e.encode(r), t = 0, u = n.indexOf("=");
    -1 !== u && (t = n.length - u, n = n.substring(0, u)), n = (n += t).replace(/\+/g, "-").replace(/\//g, "_");
    var s = Math.floor(n.length / 2);
    return n.substring(s) + n.substring(0, s);
};

r.getVersion = function() {
    return "j1.0";
}, module.exports = r;