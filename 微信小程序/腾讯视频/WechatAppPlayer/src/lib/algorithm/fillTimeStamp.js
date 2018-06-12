module.exports = function(r) {
    r = r || 10;
    var t = parseInt(+new Date()) + "";
    if (t.length === r) return t;
    if (t.length > r) return t.substring(0, r);
    for (var e = r - t.length; e > 0; ) t = "0" + t, e--;
    return t;
};