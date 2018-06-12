var t = getApp();

require("../../utils/mfw_stat.js");

Page({
    data: {
        page: {},
        list: [],
        answer: [],
        isIphoneX: ""
    },
    onLoad: function(e) {
        var a = this, n = t.getPageParameter(e, "id") || 0;
        a.setData({
            id: n,
            showBackhomeIcon: getCurrentPages().length < 2
        }), a.getQuestionInfo(e.id), a.getData(1, e.id);
    },
    onShow: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                ~e.model.indexOf("iPhone X") && t.setData({
                    isIphoneX: !0
                });
            }
        }), wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#ffffff"
        });
    },
    onReady: function() {},
    getQuestionInfo: function(e) {
        var a = this;
        t.request({
            url: "/qa/question/" + e,
            success: function(n) {
                t.log(e, "get mdd success"), a.setData({
                    answer: n
                }), wx.setNavigationBarTitle({
                    title: n.title || ""
                });
            },
            fail: function() {
                t.log("get mdd error");
            },
            complete: function() {
                t.log("get mdd complete");
            }
        });
    },
    getData: function(e, a) {
        var n = this;
        n.currNo !== e && (n.currNo = e, 1 == e && wx.showNavigationBarLoading(), e > 1 && n.setData({
            loadingmore: !0
        }), t.request({
            url: "/qa/answer/?jsondata=" + JSON.stringify({
                data_style: "question",
                filter_style: "question",
                filter: {
                    id: a
                },
                page: {
                    no: e,
                    num: 5
                }
            }),
            success: function(t) {
                n.setData({
                    page: t.page,
                    list: n.data.list.concat(t.list)
                });
            },
            fail: function() {
                1 === e && wx.showModal({
                    title: "",
                    content: "哎哟，加载失败了",
                    confirmText: "点击重试",
                    cancelText: "关闭",
                    confirmColor: "#ff9d00",
                    success: function(t) {
                        t.confirm && n.getData(e, id);
                    }
                });
            },
            complete: function() {
                wx.hideNavigationBarLoading(), n.currNo = void 0, n.setData({
                    loadingmore: !1
                });
            }
        }));
    },
    bindLoadmore: function(t) {
        var e = this;
        e.data.page.next && e.getData(e.data.page.no + 1, t.currentTarget.dataset.id);
    },
    gdClick: function(t) {
        this.data.answer.place.id;
        var e = t.currentTarget.dataset;
        wx.navigateTo({
            url: "questionDetail?id=" + e.id
        });
    },
    toIndex: function() {
        var t = this.data.answer.place.id;
        t ? wx.navigateTo({
            url: "../gonglve/mdd?mddid=" + t + "&_num=3"
        }) : wx.navigateTo({
            url: "../gonglve/index"
        });
    },
    onShareAppMessage: function() {
        var t = this;
        return {
            title: t.data.answer.title,
            path: t.__route__ + "?id=" + t.data.id,
            imageUrl: "https://p3-q.mafengwo.net/s11/M00/BC/B8/wKgBEFr7wfeAdetUAAH6eR7v1Wo750.png"
        };
    }
});