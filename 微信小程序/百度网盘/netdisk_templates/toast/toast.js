var t = 0, a = function(a) {
    if (a || (a = wx.getCurrentViewPage()), !a.data.wetoast || !1 !== a.data.wetoast.show) {
        clearTimeout(t);
        var e = wx.createAnimation();
        e.opacity(0).step(), a.setData({
            "wetoast.toastAnimationData": e.export()
        }, function() {
            a.setData({
                "wetoast.show": !1
            }), a.setData({
                wetoast: {}
            });
        });
    }
};

wx.wetoast = function(e) {
    var o = wx.getCurrentViewPage();
    clearTimeout(t), o.setData({
        "wetoast.show": !0
    });
    var s = wx.createAnimation();
    s.opacity(1).step(), e.toastAnimationData = s.export(), o.setData({
        wetoast: e
    }), t = setTimeout(function() {
        a(o);
    }, e.duration || 800);
};