(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, c = require("../../../utils/ppdog"), d = a(c), e = require("../../../utils/regenerator-runtime"), f = a(e), g = "qfq", h = "solid", i = {
        secondArea: {
            display: "--hide"
        },
        fqType: g,
        barType: h
    };
    Page({
        data: {
            qq: ""
        },
        onLoad: function() {
            console.info("[kline] 初始化");
        },
        onReady: function() {
            var a = this;
            console.info("[kline] 渲染完成"), d.default.wx.getStorage({
                key: "user_action"
            }).then(function(b) {
                var c = b.data;
                c = c ? c : i, a.setData({
                    fqType: c.fqType || g,
                    barType: c.barType || h
                });
            }).catch(function() {
                a.setData({
                    fqType: g,
                    barType: h
                });
            });
        },
        bindFqTap: function(a) {
            a.target.dataset.type && (d.default.wx.getStorage({
                key: "user_action"
            }).then(function(c) {
                var e = c.data;
                e = e ? e : i;
                var f = b({}, e, {
                    fqType: a.target.dataset.type
                });
                d.default.wx.setStorage({
                    key: "user_action",
                    data: f
                }), getApp().userAction = f;
            }).catch(function() {
                var c = b({}, i, {
                    fqType: a.target.dataset.type
                });
                d.default.wx.setStorage({
                    key: "user_action",
                    data: c
                });
            }), this.setData({
                fqType: a.target.dataset.type
            }));
        },
        bindStyleTap: function(a) {
            a.target.dataset.type && (d.default.wx.getStorage({
                key: "user_action"
            }).then(function(c) {
                var e = c.data;
                e = e ? e : i;
                var f = b({}, e, {
                    barType: a.target.dataset.type
                });
                d.default.wx.setStorage({
                    key: "user_action",
                    data: f
                }), getApp().userAction = f;
            }).catch(function() {
                var c = b({}, i, {
                    barType: a.target.dataset.type
                });
                d.default.wx.setStorage({
                    key: "user_action",
                    data: c
                }), getApp().userAction = c;
            }), this.setData({
                barType: a.target.dataset.type
            }));
        }
    });
})();