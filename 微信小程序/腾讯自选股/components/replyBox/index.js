(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = require("../../utils/ppdog"), c = a(b), d = require("../../utils/regenerator-runtime"), e = a(d), f = require("../../utils/RequestApi");
    Component({
        properties: {
            replyText: {
                type: String,
                value: ""
            }
        },
        data: {
            id: "",
            path: "",
            symbol: null,
            name: "",
            type: null,
            touser: "",
            isIphoneX: !1,
            canEdit: !0,
            canReply: !0
        },
        methods: {
            init: function(a) {
                var b = a.id, c = a.topicId, d = a.topic, e = a.type, f = a.symbol, g = a.name, h = a.touser, i = getApp(), j = i.SystemInfo, k = i.device;
                try {
                    /iphone\sx/i.test(j.model) && this.setData({
                        isIphoneX: !0
                    });
                } catch (a) {}
                this.setData({
                    id: b || null,
                    path: "detail" == e ? "../" : "",
                    symbol: f || "",
                    name: g || "",
                    type: e,
                    touser: h || null,
                    canEdit: !0,
                    topicId: c || null,
                    topic: d || null
                });
            },
            rejectReplyToken: function() {
                this.setData({
                    canReply: !1
                });
            },
            bindTapInput: function() {
                var a = this.data, b = a.type, c = a.canEdit;
                if (!c) return void console.log("稍等");
                var d = this;
                d.setData({
                    canEdit: !1
                });
                var e = "detail" == b ? "xcx_postdetail_edit" : "xcx_post_edit";
                f.Request.reportData({
                    sop: e,
                    stockid: this.data.symbol
                }), "detail" == b ? this.data.canReply ? this.goEdit() : wx.showModal({
                    title: "提示",
                    content: "此用户设置了评论禁止回复",
                    confirmText: "我知道了",
                    showCancel: !1,
                    success: function() {}
                }) : this.goEdit();
            },
            goEdit: function() {
                var a = this;
                f.Request.getWxUserInfo().then(function(b) {
                    if (!b) return void a.setData({
                        canEdit: !0
                    });
                    var c = a.data, d = c.symbol, e = c.name, f = c.type, g = c.id, h = c.path, i = c.touser, j = c.topicId, k = c.topic, l = h + "../../pages/comment/edit/edit?id=" + g + "&type=" + f;
                    console.log("url", l), d && (l += "&symbol=" + d), e && (l += "&name=" + e), i && (l += "&touser=" + i), 
                    j && (l += "&topicId=" + j), k && (l += "&topic=" + k), a.setData({
                        canEdit: !0
                    }), wx.navigateTo({
                        url: l
                    });
                }).catch(function(a) {
                    console.log("err", a);
                });
            }
        }
    });
})();