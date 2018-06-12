!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 15 ], {
    267: function(t, e, o) {
        function a(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var s = a(o(2)), i = a(o(4)), n = a(o(1)), r = o(65), l = o(0), c = getApp(), h = (0, 
        s.default)({}, {
            data: {
                windowHeight: 0,
                windowWidth: 0,
                clickInterface: {
                    helpPhoneCall: "helpPhoneCall"
                },
                showToast: !1,
                error_msg: ""
            },
            onLoad: function() {
                var t = this;
                wx.getSystemInfo({
                    success: function(e) {
                        t.setData({
                            windowHeight: e.windowHeight,
                            windowWidth: e.windowWidth
                        });
                    }
                }), this.getProblemList();
            },
            onShow: function() {
                l.page.show();
            },
            getProblemList: function() {
                r.showLoading();
                var t = this;
                wx.request({
                    url: "https://carmen.youzan.com/gw/oauthentry/weapp.problem/1.0.0/getproblemlist?access_token=" + c.getToken() + "&group=1",
                    method: "GET",
                    success: function(e) {
                        if (wx.hideToast(), e.data.response) {
                            var o = e.data.response;
                            if (o.data) {
                                var a = o.data;
                                if (a.list) {
                                    var s = a.list;
                                    (0, i.default)(s);
                                    t.setData({
                                        problemList: e.data.response.data.list
                                    });
                                }
                            }
                        } else {
                            var n = e.data.error_response.msg;
                            t.showToast(n);
                        }
                    },
                    fail: function() {
                        wx.hideToast(), wx.navigateBack();
                    }
                });
            },
            gotoProblemDetail: function(t) {
                var e = t.currentTarget.id, o = (this.data.problemList, this.data.problemList[e]), a = o.title, s = o.rich_info, n = (0, 
                i.default)(s), r = c.db.set(n);
                wx.navigateTo({
                    url: "../problemDetail/problemDetail?title=" + a + "&dbId=" + r
                });
            },
            helpPhoneCall: function() {
                wx.showModal({
                    title: "0571-89988550",
                    cancelText: "取消",
                    confirmText: "拨打",
                    cancelColor: "#333",
                    success: function(t) {
                        t.confirm && wx.makePhoneCall({
                            phoneNumber: "0571-89988550"
                        });
                    }
                });
            },
            showToast: function(t) {
                var e = this;
                this.setData({
                    showToast: !0,
                    error_msg: t
                }), setTimeout(function() {
                    e.setData({
                        showToast: !1,
                        error_msg: ""
                    }), wx.navigateBack();
                }, 1500);
            }
        });
        (0, n.default)(h);
    }
}, [ 267 ]);