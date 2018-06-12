(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../../utils/ppdog"), c = a(b), d = require("../../../utils/regenerator-runtime"), e = a(d), f = require("../../../utils/RequestApi"), g = require("../../../filter/zixunTimeFilter"), h = a(g);
    Page({
        components: {
            loadingOrMore: {}
        },
        data: {
            id: null,
            specialData: [],
            nodata: !1,
            loading: !0
        },
        onShareAppMessage: function() {
            var a = this.data, b = a.id, c = a.specialData;
            return {
                title: "【专题】" + c.origtitle,
                path: "pages/information/topic/topic?id=" + b
            };
        },
        setTitle: function(a) {
            if (a) {
                wx.setNavigationBarTitle({
                    title: "资讯专题"
                });
            }
        },
        onLoad: function(a) {
            this.setTitle(), this.setData({
                id: a.id
            }), this.getSpecial();
        },
        onReady: function() {},
        onShow: function() {},
        onHide: function() {},
        onPullDownRefresh: function() {
            this.getNewsCon(!0);
        },
        onUnload: function() {},
        getSpecial: function() {
            var a = this;
            f.Request.getQQNewsSpecial(a.data.id).filter(h.default).then(function(b) {
                if (!b) {
                    throw "nodata";
                }
                a.setData({
                    specialData: b,
                    loading: !1
                });
            }).catch(function() {
                a.setData({
                    nodata: !0,
                    loading: !1
                }), console.log("nodta");
            });
        },
        goNews: function(a) {
            var b = a.currentTarget.dataset, c = b.id, d = b.source, e = b.time, f = b.timestamp, g = b.articletype;
            100 == g ? wx.navigateTo({
                url: "../topic/topic?id=" + c
            }) : wx.navigateTo({
                url: "../newsDetail/newsDetail?id=" + c + "&source=" + d + "&time=" + e + "&timestamp=" + f
            });
        }
    });
})();