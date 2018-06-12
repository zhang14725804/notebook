(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../../utils/ppdog"), c = a(b), d = require("../../../utils/regenerator-runtime"), e = a(d), f = require("../../../utils/RequestApi"), g = require("../../../filter/zixunTimeFilter"), h = a(g);
    Page({
        data: {
            news: [],
            nodata: !1,
            showLoading: !1,
            ids: [],
            eventName: "ZxNews",
            loadData: "",
            idsChecked: 20
        },
        onLoad: function() {
            var a = this.selectComponent("#loadingOrMore");
            a.init({
                color: "white"
            }), a.changeLoadingAnimation("rotate"), this.getData();
        },
        onReady: function() {
            var a = getApp(), b = a.Event;
        },
        onShow: function() {
            this.getData(), getApp().Event.emit("tapTab", "news");
        },
        onHide: function() {},
        onPullDownRefresh: function() {
            this.getData(), wx.stopPullDownRefresh();
        },
        onUnload: function() {
            var a = getApp(), b = a.Event;
        },
        getData: function() {
            this.getNewsCon();
        },
        getMore: function() {
            var a = this, b = this.selectComponent("#loadingOrMore");
            b.changeLoadingAnimation("rotate");
            var c = this.data.ids.slice(this.data.idsChecked, this.data.idsChecked + 20);
            f.Request.getMoreZxNews(c).filter(h.default).then(function(b) {
                var c = a.data.news.concat(b.news);
                a.setData({
                    news: c,
                    idsChecked: a.data.idsChecked + 20
                }), a.setMoreStatus();
            }, function() {
                b.changeLoadingAnimation("fail");
            }).catch(function(a) {
                console.log(a);
            });
        },
        getNewsCon: function(a) {
            var b = this, c = this.selectComponent("#loadingOrMore");
            c.changeLoadingAnimation("rotate"), f.Request.getNewsIds().filter(h.default).then(function(a) {
                console.log("返回数据：", a);
                var c = a.news;
                if (c.length) {
                    var d = c.shift();
                    b.setData({
                        banner: d,
                        ids: a.ids,
                        news: c
                    }), b.setMoreStatus();
                }
                b.setData({
                    showLoading: !1
                }), wx.setStorage({
                    key: "stock_yaowen_v2_new",
                    data: a.ids
                });
            }, function() {
                b.setData({
                    nodata: !0
                });
            }).catch(function(a) {
                console.log(a);
            });
        },
        setMoreStatus: function() {
            var a = this.selectComponent("#loadingOrMore"), b = this.data, c = b.news, d = b.ids, e = b.idsChecked;
            e < d.length ? a.changeLoadingAnimation("more") : a.changeLoadingAnimation("noMore");
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