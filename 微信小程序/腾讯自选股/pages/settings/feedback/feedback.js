(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../../utils/ppdog"), c = a(b), d = require("../../../utils/regenerator-runtime"), e = a(d), f = require("../../../utils/RequestApi");
    Page({
        data: {
            inputVal: {
                content: "",
                user_wechat: "",
                email: "",
                phone: ""
            },
            qq: ""
        },
        formSubmit: function(a) {
            var b = this, d = a.detail.value, e = d.content, g = d.email;
            if ("" == e.trim()) return void c.default.wx.showModal({
                title: "",
                content: "反馈内容为空，请填写后提交",
                showCancel: !1
            });
            var h = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return "" == g || h.test(g) ? void (this.setData({
                loading: !0
            }), f.Request.postFeedback(a.detail.value).then(function() {
                b.setData({
                    loading: !1
                }), wx.showToast({
                    title: "提交成功",
                    icon: "success",
                    duration: 1e3
                }), setTimeout(function() {
                    b.setData({
                        inputVal: {
                            content: "",
                            user_wechat: "",
                            email: "",
                            phone: ""
                        }
                    });
                }, 1e3);
            }).catch(function(a) {
                "upper limit" == a ? (c.default.wx.showModal({
                    title: "",
                    content: "您今天的反馈数目已经达到上限，请明天再提",
                    showCancel: !1
                }), b.setData({
                    loading: !1
                })) : (b.setData({
                    loading: !1,
                    showBanner: !0
                }), setTimeout(function() {
                    b.setData({
                        showBanner: !1
                    });
                }, 3e3));
            })) : void c.default.wx.showModal({
                title: "",
                content: "邮箱格式不正确",
                showCancel: !1
            });
        },
        bindContentInput: function(a) {
            var b = a.detail.value;
            b = 300 <= b.length ? b.slice(0, 300) : b, this.setData({
                "inputVal.content": b
            });
        },
        bindWechatInput: function(a) {
            var b = a.detail.value.trim();
            this.setData({
                "inputVal.user_wechat": b
            });
        },
        bindEmailInput: function(a) {
            var b = a.detail.value.trim();
            this.setData({
                "inputVal.email": b
            });
        },
        bindPhoneInput: function(a) {
            var b = a.detail.value;
            b = 12 <= b.length ? b.slice(0, 12) : b, /^[0-9]*$/.test(b) || (b = this.data.inputVal.phone), 
            this.setData({
                "inputVal.phone": b
            });
        }
    });
})();