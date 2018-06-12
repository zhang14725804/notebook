Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./model"));

exports.default = function() {
    return {
        state: {
            showModule: !1,
            fold: !0,
            showMask: !1,
            navSets: []
        },
        actions: {
            getPPmsData: function(t, n) {
                e.default.getPPMS("30728").then(function(e) {
                    if (e && e.length) {
                        var o = null;
                        e.some(function(e) {
                            if (e.pageName === t) return o = e, !0;
                        }), o && o.navSets.length && (o.navSets.forEach(function(e) {
                            e.wxappImg = wx.JD.img.getImgUrl(e.wxappImg);
                        }), n.setData({
                            showModule: !0,
                            navSets: o.navSets
                        }));
                    }
                }).catch(function(e) {
                    return console.error(e);
                });
            }
        }
    };
};