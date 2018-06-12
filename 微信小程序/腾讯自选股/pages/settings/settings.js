(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    function b(a, b) {
        if (0 == a) return "0 KB";
        var c = Math.floor(Math.log(a) / 6.907755278982137);
        return parseFloat((a / Math.pow(1e3, c)).toFixed(b + 1 || 3)) + " " + [ "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ][c];
    }
    var c = require("../../utils/ppdog"), d = a(c), e = require("../../utils/regenerator-runtime"), f = a(e), g = require("../../utils/RequestApi"), h = getApp();
    Page({
        data: {
            currentSize: "",
            qq: ""
        },
        onLoad: function() {},
        onShow: function() {
            var a = this, c = this;
            getApp().Event.emit("tapTab", "settings"), this.setData({
                settings: {
                    colorType: h.settings.colorType
                }
            }), d.default.wx.getStorageInfo().then(function(c) {
                a.setData({
                    currentSize: b(c.currentSize, 1)
                });
            });
        },
        bindTapClearCache: function() {
            var a = this;
            d.default.wx.showModal({
                title: "",
                content: "确认要清除缓存吗",
                confirmColor: "#3083e3"
            }).then(function(c) {
                c.confirm && "false" != c.confirm && (d.default.wx.showToast({
                    title: "清除成功",
                    icon: "success",
                    duration: 1e3
                }), d.default.wx.clearStorage(), a.setData({
                    currentSize: b(0, 1)
                }), g.Request.getRemindList({}, !0));
            });
        },
        bindTapPushLog: function() {
            var a = function() {
                console.log("开始上传日志");
            };
            d.default.wx.showModal({
                title: "",
                content: "确认要上传日志吗",
                confirmColor: "#3083e3"
            }).then(function(b) {
                b.confirm && "false" != b.confirm && a();
            });
        }
    });
})();