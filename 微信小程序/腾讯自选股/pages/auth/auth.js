(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d);
    Page({
        data: {},
        onLoad: function() {},
        onReady: function() {},
        onShow: function() {},
        onHide: function() {},
        onUnload: function() {
            var a = getApp(), b = a.Event;
        },
        onGotUserInfo: function() {
            setTimeout(function() {
                wx.navigateBack();
            }, 1e3);
        }
    });
})();