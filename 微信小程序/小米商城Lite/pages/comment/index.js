var t = require("../../util/util.js"), a = require("../../util/tracker.js"), e = getApp();

Page({
    data: {
        id: "",
        page_current: 0,
        page_total: 0,
        show_page: 5,
        windowHeight: 0,
        loading: !1,
        comments: [],
        noLoadMore: !1
    },
    onShow: function() {
        a.push();
    },
    onLoad: function(a) {
        var o = this;
        e.doLogin().then(function(n) {
            t.showLoading(), wx.getSystemInfo({
                success: function(t) {
                    o.setData({
                        windowHeight: t.windowHeight
                    });
                }
            }), e.request("product/commentList", {
                product_id: a.id
            }, function(e, n) {
                if (t.hideLoading(), n) o.data.noLoadMore = !0; else {
                    var r = e.data;
                    o.setData({
                        id: a.id,
                        page_current: r.page_current,
                        page_total: r.page_total,
                        show_page: r.show_page,
                        comments: r.comments
                    });
                }
            });
        });
    },
    load: function() {
        var a = this;
        !a.data.noLoadMore && !a.data.loading && a.data.page_current < a.data.show_page && (a.setData({
            loading: !0
        }), e.request("product/commentList", {
            product_id: a.data.id,
            page_index: a.data.page_current + 1
        }, function(e, o) {
            if (o) t.showError("服务异常请稍后再试,或下载小米商城APP"); else {
                var n = e.data;
                a.setData({
                    loading: !1,
                    page_current: n.page_current,
                    comments: a.data.comments.concat(n.comments)
                });
            }
        }));
    },
    viewImage: function(a) {
        var e = a.currentTarget.dataset, o = e.current, n = e.urls;
        wx.previewImage({
            current: t.formatUrl(o),
            urls: n.map(t.formatUrl)
        });
    }
});