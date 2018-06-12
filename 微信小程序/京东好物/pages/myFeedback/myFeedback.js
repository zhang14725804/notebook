var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../components/toast/toast.js")), e = require("../../utils/util.js"), t = require("../../utils/message_push.js"), i = require("../../utils/keplerReport.js").init(), n = getApp();

Page({
    data: {
        array: [ "功能意见", "界面意见", "您的新需求", "操作意见", "流量问题", "其他" ],
        index: 0,
        textareaVal: "",
        phone: "",
        isSubmit: !1
    },
    onLoad: function(a) {
        i.set({
            urlParam: a,
            title: "我的反馈",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        i.pv();
    },
    setTextareaVal: function(a) {
        this.setData({
            textareaVal: a.detail.value
        });
    },
    bindPhoneChange: function(a) {
        this.setData({
            phone: a.detail.value
        });
    },
    bindPickerChange: function(a) {
        this.setData({
            index: a.detail.value
        });
    },
    bindDateChange: function(a) {
        this.setData({
            date: a.detail.value
        });
    },
    modalTap: function(i) {
        var s = this;
        setTimeout(function() {
            if (s.data.textareaVal = s.data.textareaVal.replace(/(^\s*)|(\s*$)/g, ""), s.data.textareaVal || a.default.show({
                icon: a.default.icon.error,
                message: "请填写内容",
                pageObj: s
            }), !s.data.isSubmit && s.data.index >= 0 && s.data.textareaVal) {
                s.data.isSubmit = !0;
                var o = {
                    type: s.data.array[s.data.index],
                    content: s.data.textareaVal,
                    contact: s.data.phone,
                    client: "kepler-wx"
                };
                e.request({
                    data: o,
                    url: n.globalRequestUrl + "/m/index/doShowvote.json",
                    success: function() {
                        t.messagePush({
                            formId: i.detail.formId,
                            times: 1,
                            type: 40001
                        }), a.default.show({
                            icon: a.default.icon.success,
                            message: "提交成功",
                            pageObj: s,
                            complete: function() {
                                s.data.isSubmit = !1, wx.navigateBack();
                            }
                        });
                    },
                    fail: function() {
                        a.default.show({
                            icon: a.default.icon.error,
                            message: "提交失败",
                            pageObj: s,
                            complete: function() {
                                s.data.isSubmit = !1, wx.navigateBack();
                            }
                        });
                    }
                });
            }
        }, 50);
    }
});