(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../../utils/ppdog"), c = a(b), d = require("../../../utils/regenerator-runtime"), e = a(d), f = getApp();
    Page({
        data: {
            settings: {
                colorType: "hzld"
            }
        },
        onLoad: function() {
            console.info("[color setting] 初始化"), f.settings.colorType && this.setData({
                settings: {
                    colorType: f.settings.colorType
                }
            });
        },
        changeColor: function(a) {
            var b = this, d = a.currentTarget.dataset.colortype;
            c.default.wx.setStorage({
                key: "settings.colorType",
                data: d
            }).then(function() {
                b.setData({
                    settings: {
                        colorType: d
                    }
                }), f.settings.colorType = d;
            });
        }
    });
})();