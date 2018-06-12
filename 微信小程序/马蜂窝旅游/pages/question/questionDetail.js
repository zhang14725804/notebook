var t = getApp();

require("../../utils/image.js"), require("../../utils/mfw_stat.js");

Page({
    data: {
        answer: {},
        question: {},
        isIphoneX: ""
    },
    onLaunch: function(t) {},
    onLoad: function(e) {
        var n = this, a = t.getPageParameter(e, "id") || 0;
        n.setData({
            id: a,
            previewImgs: [],
            showBackhomeIcon: getCurrentPages().length < 2
        }), n.getAnswerData(a);
    },
    onReady: function() {},
    getQuestionInfo: function(e) {
        var n = this;
        t.request({
            url: "/qa/question/" + e,
            success: function(a) {
                t.log(e, "get mdd success"), n.setData({
                    question: a
                }), wx.setNavigationBarTitle({
                    title: a.title || ""
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
    onShow: function() {
        wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: "#ffffff"
        });
        var t = this;
        t.setData({
            from_app: wx.getStorageSync("__from_app")
        }), wx.getSystemInfo({
            success: function(e) {
                ~e.model.indexOf("iPhone X") && t.setData({
                    isIphoneX: !0
                });
            }
        });
    },
    getAnswerData: function(e) {
        var n = this;
        t.request({
            url: "/qa/answer/" + e,
            success: function(a) {
                if (t.log(e, "get mdd success"), n.setData({
                    answer: a
                }), a.content) {
                    for (var o, i = [], r = 0, s = a.content.length; r < s; r++) "image" == a.content[r].type && (o = a.content[r].content.url) && i.push(o);
                    n.setData({
                        previewImgs: i
                    });
                }
                wx.setNavigationBarTitle({
                    title: a.title || ""
                }), n.getQuestionInfo(a.question_id);
            },
            fail: function() {
                t.log("get mdd error");
            },
            complete: function() {
                t.log("get mdd complete");
            }
        });
    },
    bindImgPreview: function(t) {
        var e = this, n = t.currentTarget.dataset;
        n.url && wx.previewImage({
            current: n.url,
            urls: e.data.previewImgs
        });
    },
    toIndex: function() {
        var t = this.data.question.place.id;
        t ? wx.navigateTo({
            url: "../gonglve/mdd?mddid=" + t + "&_num=3"
        }) : wx.navigateTo({
            url: "../gonglve/index"
        });
    },
    onShareAppMessage: function() {
        var t = this;
        return {
            title: t.data.question.title + "一" + t.data.answer.author.name + "的回答",
            path: t.__route__ + "?id=" + t.data.id,
            imageUrl: t.data.previewImgs[0] || "https://p3-q.mafengwo.net/s11/M00/BC/B8/wKgBEFr7wfeAdetUAAH6eR7v1Wo750.png"
        };
    }
});