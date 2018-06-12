!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 19 ], {
    279: function(t, s, a) {
        var i = function(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }(a(1)), e = getApp();
        (0, i.default)({
            data: {
                msgList: [],
                currentPage: 0,
                finishFetch: !1,
                isFetching: !1
            },
            onLoad: function() {
                this.fetchMyMsgList();
            },
            onReachBottom: function() {
                this.data.finishFetch || this.fetchMyMsgList();
            },
            fetchMyMsgList: function() {
                var t = this;
                this.data.finishFetch || (this.setData({
                    isFetching: !0
                }), e.carmen({
                    api: "weapp.spotlight.business.msg/1.0.0/list",
                    method: "GET",
                    data: {
                        page: this.data.currentPage + 1,
                        size: 20,
                        fans_id: wx.getStorageSync("userId")
                    },
                    success: function(s) {
                        t.setData({
                            isFetching: !1
                        }), t.setData({
                            currentPage: s.paginator.page
                        }), s.paginator.page, t.data.msgList.length === s.paginator.totalCount && t.setData({
                            finishFetch: !0
                        }), t.setData({
                            msgList: t.data.msgList.concat(s.items)
                        });
                    },
                    fail: function(s) {
                        t.setData({
                            isFetching: !1
                        }), console.log("[fetchMyMsgList]" + s.msg);
                    }
                }));
            }
        });
    }
}, [ 279 ]);