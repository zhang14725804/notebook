function t(t, i) {
    var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "full", h = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0, d = {
        width: t,
        height: i
    };
    return wx.getSystemInfo({
        success: function(g) {
            var u = g.windowWidth;
            g.windowHeight;
            "fit" == e && h && (u -= h), "full" == e || t > u ? (d.width = u, d.height = d.width * i / t) : (d.width = t, 
            d.height = i);
        }
    }), d;
}

module.exports = {
    bindPage: function(i) {
        var e, h, d, g = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, u = {};
        for (h in g) (d = g[h]).url && (e = t(d.size.width, d.size.height, d.mode, d.fitgap), 
        u[h] = {
            url: d.url,
            width: e.width + "px",
            height: e.height + "px"
        });
        i.setData({
            imgAutoSizes: u
        }), i.bindImgAutoSize = function(d) {
            var g = d.currentTarget.dataset;
            g.url && (h = g.id || g.url, e = t(d.detail.width, d.detail.height, g.mode, g.fitgap), 
            u[h] = {
                url: g.url,
                width: e.width + "px",
                height: e.height + "px"
            }, i.setData({
                imgAutoSizes: u
            }));
        };
    }
};