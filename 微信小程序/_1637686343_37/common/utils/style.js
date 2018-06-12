function e() {
    var e = t(r.windowWidth);
    return n || (n = Number.parseFloat(e / 750).toFixed(3));
}

function t(e) {
    if (0 == e) {
        var t = wx.getSystemInfoSync() || {};
        return 0 == t.windowWidth ? t.screenWidth ? t.screenWidth : 0 : t.windowWidth;
    }
    return e;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getPxByRpx = function() {
    for (var t = arguments.length, r = Array(t), n = 0; n < t; n++) r[n] = arguments[n];
    return r.reduce(function(t, r) {
        return t + Math.floor(r * e());
    }, 0);
}, exports.getRpxByPx = function(e) {
    return e / n;
};

var r = wx.getSystemInfoSync(), n = void 0;