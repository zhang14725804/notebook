wx.getCurrentViewPage = function() {
    var t = getCurrentPages() || [];
    return t[t.length - 1];
};

var t = Object.create(null);

wx.setPageData = function(e) {
    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    t[e] || (t[e] = {}), "function" == typeof n ? t[e].update = n : t[e].data = n;
}, wx.getPageData = function(e) {
    var n = t[e] || {};
    return {
        query: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", e = n.data;
            return t && "*" !== t ? String(t).split(".").reduce(function(t, e) {
                return t ? t[e] : t;
            }, e) : e;
        },
        update: function(t) {
            t && n.update && n.update(t);
        }
    };
};