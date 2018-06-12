!function(t) {
    function e(a) {
        if (n[a]) return n[a].exports;
        var i = global.installedModules[a] = n[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return t[a].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
    }
    t = Object.assign(require("../../../commons.js").modules, t);
    var n = {};
    n = global.installedModules = global.installedModules || {}, e.m = t, e.c = n, e.d = function(t, n, a) {
        e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: a
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var n = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(n, "a", n), n;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 156);
}({
    156: function(t, e, n) {
        var a, i = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
            }
            return t;
        }, o = (a = n(0)) && a.__esModule ? a : {
            default: a
        }, s = n(17), c = n(7), l = getApp();
        (0, o.default)({
            data: {
                alias: "",
                themeClass: l.themeClass,
                userId: l.globalData.token.userId,
                contentTitle: "",
                newCommentContent: "",
                commentList: [],
                page: 1,
                listLoading: !1,
                noMore: !1,
                total: 0,
                initLoad: !1,
                fetched: !1,
                isSubscription: !1,
                $running: !1,
                windowHeight: 0
            },
            onLoad: function(t) {
                var e = t.alias || "";
                this.setData({
                    alias: e,
                    windowHeight: l.getSystemInfoSync().windowHeight
                }), t.title ? (wx.setNavigationBarTitle({
                    title: t.title
                }), this.setData({
                    contentTitle: t.title
                })) : this.fetchContentTitle(), this.fetchCommentList();
            },
            onShow: function() {
                this.setData({
                    copyright: l.globalData.copyright,
                    is_big_shop: l.globalData.is_big_shop
                }), wx.getStorageSync(s.REFRESH_KEY) && (wx.removeStorageSync(s.REFRESH_KEY), this.fetchCommentList());
            },
            onPageScroll: function() {
                var t = this;
                this.$running || this.data.noMore || (this.$running = !0, setTimeout(function() {
                    t.checkPagination(), t.$running = !1;
                }, 400));
            },
            onShareAppMessage: function() {},
            checkPagination: function() {
                var t = this;
                wx.createSelectorQuery().in(this).select("#comment-list").boundingClientRect(function(e) {
                    e && e.bottom < t.data.windowHeight + 200 && t.fetchCommentList();
                }).exec();
            },
            fetchCommentList: function(t) {
                var e = this;
                !this.data.alias || this.data.noMore || this.data.listLoading || (this.setData({
                    listLoading: !0
                }), t && this.setData({
                    page: 1,
                    noMore: !1
                }), l.carmen({
                    method: "GET",
                    api: "youzan.owl.content.comment.user/1.0.0/list",
                    data: {
                        alias: this.data.alias,
                        page_num: this.data.page,
                        page_size: 20
                    },
                    success: function(n) {
                        e.setData({
                            noMore: e.data.commentList.length >= n.totalItems,
                            page: e.data.page + 1,
                            commentList: t ? e.parseCommentList(n.list || []) : e.data.commentList.concat(e.parseCommentList(n.list || []))
                        }), e.checkPagination();
                    },
                    fail: function() {
                        wx.showToast({
                            title: "获取我的评论列表失败",
                            icon: "none"
                        });
                    },
                    complete: function() {
                        e.setData({
                            listLoading: !1
                        });
                    }
                }));
            },
            fetchContentTitle: function() {
                var t = this;
                l.carmen({
                    method: "POST",
                    api: "youzan.owl.content.detail/1.0.0/get",
                    data: {
                        alias: this.data.alias
                    },
                    success: function(e) {
                        wx.setNavigationBarTitle({
                            title: e.title || ""
                        }), t.setData({
                            contentTitle: e.title
                        });
                    },
                    fail: function() {}
                });
            },
            parseCommentList: function(t) {
                var e = this;
                return t.map(function(t) {
                    t.replyComments && (t.replyComments = e.parseCommentList(t.replyComments));
                    var n = void 0;
                    return n = new Date(t.createAt).getFullYear() === new Date().getFullYear() ? (0, 
                    c.moment)(t.createAt, "MM月DD日 HH:mm") : (0, c.moment)(t.createAt, "YYYY年MM月DD日 HH:mm"), 
                    i({}, t, {
                        commentDateStr: n
                    });
                });
            },
            onDelComment: function(t) {
                var e = this;
                l.carmen({
                    method: "POST",
                    api: "youzan.owl.content.comment/1.0.0/delete",
                    data: {
                        alias: this.data.alias,
                        id: t.detail.id
                    },
                    success: function() {
                        e.setData({
                            commentList: e.data.commentList.filter(function(e) {
                                return e.id !== t.detail.id;
                            })
                        }), wx.showToast({
                            title: "删除成功",
                            icon: "success"
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "删除失败，请稍后再试",
                            icon: "none"
                        });
                    }
                });
            },
            onTextareaInput: function(t) {
                this.setData({
                    newCommentContent: t.detail.value
                });
            },
            onClickSubmit: function(t) {
                var e = this, n = t.detail.formId || "";
                this.submitFormId({
                    form_id: n,
                    page_url: this.route + "?alias=" + this.data.alias + "&title=" + this.data.contentTitle,
                    business_module: "contentCommentReply"
                }), this.data.newCommentContent.trim() && l.carmen({
                    method: "POST",
                    api: "youzan.owl.content.comment/1.0.0/create",
                    data: {
                        alias: this.data.alias,
                        comment_type: 2,
                        product_comment: this.data.newCommentContent
                    },
                    success: function() {
                        e.setData({
                            newCommentContent: "",
                            commentList: [],
                            page: 1,
                            noMore: !1
                        }), e.fetchCommentList(!0), wx.showToast({
                            title: "提交成功",
                            icon: "success"
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "提交失败，请稍后再试",
                            icon: "none"
                        });
                    }
                });
            },
            submitFormId: function(t, e, n) {
                l.carmen({
                    api: "wsc.weapp.formid/1.0.0/add",
                    data: t,
                    method: "GET",
                    success: function(t) {
                        e && e(t);
                    },
                    fail: function(t) {
                        n && n(t.msg, t);
                    }
                });
            }
        });
    }
});