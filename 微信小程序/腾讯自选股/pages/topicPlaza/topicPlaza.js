(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d), f = require("../../utils/RequestApi"), g = !1;
    Page({
        data: {
            defaultImg: "http://mat1.gtimg.com/finance/images/stock/p/xcx/plazaList.png",
            topics: [],
            hasMore: 0,
            pageno: 0,
            nodata: !1
        },
        onLoad: function() {
            this.getTopics();
            var a = this.selectComponent("#loadingOrMore");
            a.init({
                btn: "上拉加载更多"
            }), a.changeLoadingAnimation("rotate");
        },
        onReady: function() {},
        onShow: function() {},
        onHide: function() {
            g = !1;
        },
        getTopics: function() {
            var a = this, b = 0 < arguments.length && arguments[0] !== void 0 ? arguments[0] : {}, c = b.more ? this.data.pageno : 0;
            f.Request.getTopicList({
                page: c
            }).then(function(d) {
                var e = a.selectComponent("#loadingOrMore");
                console.log(d, e), b.more && (d = a.data.topics.concat(d.data)), a.setData({
                    topics: d.data,
                    page: c++
                }), d.more_flag ? e.changeLoadingAnimation("more") : d.length ? e.changeLoadingAnimation("noMore") : e.changeLoadingAnimation("hide");
            }).catch(function() {
                a.setData({
                    nodata: !0
                });
            });
        },
        getMore: function() {
            var a = this.selectComponent("#loadingOrMore");
            a.changeLoadingAnimation("rotate"), this.getTopics({
                more: !0
            });
        },
        tolower: function() {
            this.data.nomore || this.getMore();
        },
        bindTapComment: function(a) {
            var b = a.currentTarget.dataset, c = b.tid, d = b.dataobj, e = d.topic, f = d.description;
            if (!1 == g) {
                wx.navigateTo({
                    url: "../comment/comment?topicId=" + c + "&topic=" + e + "&description=" + f
                }), g = !0;
            }
        }
    });
})();