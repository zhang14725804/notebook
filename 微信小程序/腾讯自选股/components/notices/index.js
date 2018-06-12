(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d);
    Component({
        properties: {},
        data: {
            noticeList: [],
            indicatorDots: !1,
            autoplay: !0,
            interval: 5e3,
            duration: 1e3,
            vertical: !0,
            circular: !0,
            noNotice: !0
        },
        methods: {
            init: function() {
                var a = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : [], b = getApp(), c = b.noticeData, d = c;
                this.setData({
                    noticeList: d,
                    noNotice: d && d.length ? !1 : !0
                });
            },
            goDetail: function(a) {
                console.log(a.currentTarget.dataset);
                var b = a.currentTarget.dataset, c = b.content, d = b.type, e = b.posttype, f = b.postcontent, g = b.inner;
                if (g) {
                    for (var h = getCurrentPages().pop(), j = h.route.split("/").length - 1, k = [], l = 0; l < j; l++) k.push("../");
                    var i = "" + k.join("") + c;
                    wx.navigateTo({
                        url: i
                    });
                } else 2 == d ? wx.navigateTo({
                    url: "../h5View/h5View?url=" + c
                }) : wx.navigateTo({
                    url: "./detail/detail?nid=" + c
                });
            }
        }
    });
})();