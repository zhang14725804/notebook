function e(e) {
    if (void 0 !== e) return Array.isArray(e) || (e = [ e ]), e.forEach(function(e, t) {
        e._index = t;
        var o = e.tagLabel && e.tagLabel.markImageUrl, n = e.user && e.user.faceImageUrl;
        o && (e.tagLabel.markImageUrl = o.replace(/http\:\/\//i, "https://")), n && (e.user.faceImageUrl = n.replace(/http\:\/\//i, "https://"));
    }), e;
}

var t = require("../../module/dataset/comment/index"), o = (require("../../module/fns"), 
require("../../module/boss")());

module.exports = function() {
    return {
        data: {
            comment: {
                likeList: [],
                pageBgColor: "",
                defaultInfo: {
                    userInfo: {
                        faceImageUrl: "https://i.gtimg.cn/qqlive/images/20150608/avatar.png"
                    }
                },
                pageData: {
                    modLayerAnimation: !1,
                    showSendBtn: !0,
                    isSmallPhone: !1
                },
                control: {
                    showList: !1,
                    showEdit: !1,
                    focusEdit: !1,
                    showReplyList: !1,
                    showScrollShadow: !1,
                    loading: !1,
                    loadingReply: !1
                },
                request: {
                    vid: "",
                    dataKey: "",
                    pageContext: ""
                },
                reply: {
                    pageContext: "",
                    feedId: "",
                    dataKey: "",
                    type: 0
                },
                response: {
                    reply: {},
                    feedList: [],
                    pageContext: "",
                    hasNextPage: !1,
                    coralSummaryInfo: {
                        commentCount: 0
                    }
                },
                form: {
                    stars: [ {
                        id: 0,
                        active: !1
                    }, {
                        id: 1,
                        active: !1
                    }, {
                        id: 2,
                        active: !1
                    }, {
                        id: 3,
                        active: !1
                    }, {
                        id: 4,
                        active: !1
                    } ],
                    placeholder: "",
                    content: "",
                    content2: "",
                    length: 0,
                    maxLength: 1e3,
                    focus: !1,
                    top: 20,
                    color: "#fff",
                    editHeight: "100%"
                }
            }
        },
        onHide: function() {
            wx.hideKeyboard();
        },
        onLoad: function() {
            var e = this;
            wx.getSystemInfo({
                success: function(t) {
                    var o = t.system;
                    parseInt(o.replace(/^[a-zA-Z]*\s*/, "")) <= 8 && /ios/i.test(o) && e.setData({
                        "comment.pageData.modLayerAnimation": !0
                    });
                }
            });
        },
        initComment: function(o) {
            var n = this;
            this.setData({
                "comment.request.vid": o.vid,
                "comment.request.dataKey": o.dataKey || this.data.comment.request.dataKey,
                "comment.request.pageContext": o.pageContext
            }), wx.getSystemInfo({
                success: function(e) {
                    e.model && e.model.toLowerCase();
                    var t = Math.round(9 * (e.windowWidth - 40) / 16 - 60);
                    n.setData({
                        "comment.pageData.isSmallPhone": !0
                    }), n.setData({
                        "comment.form.editHeight": e.windowHeight + "px",
                        "comment.form.textareaHeight": t + "px"
                    });
                }
            }), t.list(this.data.comment.request).then(function(t) {
                if (0 == t.errCode) {
                    var o = e(t.feedList || []), a = o.map(function(e) {
                        return {
                            likeCount: e.likeCount,
                            isLike: !1,
                            feedId: e.feedId
                        };
                    });
                    n.setData({
                        "comment.likeList": a,
                        "comment.request.pageContext": t.pageContext,
                        "comment.response.coralSummaryInfo": t.coralSummaryInfo,
                        "comment.response.hasNextPage": t.hasNextPage,
                        "comment.response.pageContext": t.pageContext,
                        "comment.response.feedList": o
                    });
                }
            });
        },
        onLikeComment: function(e) {
            var o = e.currentTarget.dataset, n = +o.index, a = (this.data.comment.response.feedList, 
            this.data.comment.likeList), m = o.likeFlag, s = a[n];
            void 0 === m || 0 == m ? (s.isLike = 1, s.likeCount += 1) : (s.isLike = 0, s.likeCount -= 1), 
            a[n].likeCount = Math.max(0, a[n].likeCount), this.setData({
                "comment.likeList": a
            }), t.like({
                feedId: o.feedId,
                dataKey: o.dataKey,
                seq: "",
                likeFlag: 1 == m ? 2 : 1
            });
        },
        onAddComment: function() {
            if (!this.onAddCommentPendding) {
                this.onAddCommentPendding = !0;
                var n = this.data.comment.form, a = n.content, m = n.maxLength, s = this, i = s.data.comment.response.feedList || [], c = s.data.comment.likeList || [], r = this.data.comment.request.vid, d = this.data.comment.request.dataKey;
                a.length > 0 && a.length <= m && (t.add({
                    dataKey: d,
                    title: "",
                    content: a,
                    vid: r,
                    seq: ""
                }).then(function(t) {
                    s.onAddCommentPendding = !1, t && 0 == t.errCode && (i.unshift(t.feed), i = e(i), 
                    c.unshift({
                        likeCount: 0,
                        isLike: !1,
                        feedId: t.feed.feedId
                    }), wx.showToast({
                        duration: 1e3,
                        title: "发表成功"
                    }), s.onHideCommentEdit(), s.clearCommentEdit(), s.setData({
                        "comment.form.content": "",
                        "comment.form.length": 0,
                        "comment.response.feedList": i,
                        "comment.likeList": c
                    }));
                }, function(e) {
                    var t = e && e.errCode || -1;
                    s.onAddCommentPendding = !1, wx.showModal({
                        title: "出错了，请稍候再试~(" + t + ")",
                        showCancel: !1,
                        success: function() {}
                    });
                }), o.expose("circle-pub", {
                    vid: r,
                    val2: d,
                    val3: a.length
                }));
            }
        },
        onDeleteComment: function(e) {
            var o = e.currentTarget.dataset, n = +o.index, a = this;
            wx.showModal({
                title: "确定删除该评论？",
                success: function(e) {
                    1 == e.confirm && t.del({
                        feedId: o.feedId,
                        dataKey: o.dataKey
                    }).then(function(e) {
                        a.data.comment.response.feedList.splice(n, 1);
                    }, function(e) {
                        wx.showModal({
                            title: "删除评论失败",
                            content: e,
                            showCancel: !1,
                            success: function() {}
                        });
                    });
                }
            });
        },
        onCommentStar: function(e) {
            for (var t = +e.currentTarget.dataset.index, o = this.data.comment.form.stars, n = 0, a = o.length; n < a; n++) o[n].active = n <= t ? 1 : 0;
            this.setData({
                "comment.form.stars": o
            });
        },
        onCommentInfo: function(e) {
            var o = e.currentTarget.dataset, n = o.dataKey, a = o.feedId;
            wx.showActionSheet({
                itemList: [ "举报" ],
                itemColor: "#ff0000",
                success: function(e) {
                    0 === e.tapIndex && t.tipOff({
                        dataKey: n,
                        feedId: a,
                        seq: ""
                    }).then(function(e) {
                        wx.showToast({
                            title: "举报成功"
                        });
                    }, function(e) {
                        wx.showToast({
                            title: "举报失败"
                        });
                    });
                }
            });
        },
        onShowCommentList: function() {
            this.setData({
                "comment.control.showList": !0
            });
        },
        onHideCommentList: function() {
            this.setData({
                "comment.control.showList": !1
            });
        },
        onShowCommentReplyList: function(e) {
            var o = this, n = e.currentTarget.dataset, a = n.idx, m = n.feedId, s = n.dataKey;
            this.data.comment.response.feedList[a];
            this.setData({
                "comment.control.showReplyList": !0,
                "comment.reply.feedId": m,
                "comment.reply.dataKey": s,
                "comment.reply.pageContext": ""
            }), t.feedInfo({
                pageContext: "",
                feedId: m,
                dataKey: s,
                type: 2
            }).then(function(e) {
                var t = e.primaryFeed;
                o.setData({
                    "comment.reply.pageContext": e.pageContext,
                    "comment.response.reply.feed": t,
                    "comment.response.reply.list": t.comments,
                    "comment.control.showReplyList": !0
                }), e.pageContext ? o._loadMoreReply(2) : o.setData({
                    "comment.reply.pageContext": "",
                    "comment.control.loadingReply": !1
                });
            });
        },
        _loadMoreReply: function(e) {
            var o = this;
            this.data.comment.reply.pageContext ? (this.setData({
                "comment.control.loadingReply": !0
            }), t.feedInfo({
                pageContext: o.data.comment.reply.pageContext,
                feedId: o.data.comment.reply.feedId,
                dataKey: o.data.comment.reply.dataKey,
                type: 2
            }).then(function(t) {
                var n = t.primaryFeed;
                if (n.content && t.pageContext) {
                    var a = o.data.comment.response.reply.list.concat(n.comments);
                    o.setData({
                        "comment.reply.pageContext": t.pageContext,
                        "comment.response.reply.feed": n,
                        "comment.response.reply.list": a,
                        "comment.control.loadingReply": !1
                    }), e > 0 && t.pageContext && o._loadMoreReply(--e);
                } else o.setData({
                    "comment.reply.pageContext": "",
                    "comment.control.loadingReply": !1
                });
            })) : o.setData({
                "comment.control.loadingReply": !1
            });
        },
        onHideCommentReplyList: function() {
            this.setData({
                "comment.control.showReplyList": !1,
                "comment.reply.pageContext": "",
                "comment.response.reply.feed": {},
                "comment.response.reply.list": []
            });
        },
        onCommentReplyListScroll: function(e) {
            e.detail.scrollTop > 0 ? this.setData({
                "comment.control.showScrollShadow": !0
            }) : this.setData({
                "comment.control.showScrollShadow": !1
            });
        },
        onCommentReplyListscrollToLower: function() {
            this._loadMoreReply(2);
        },
        onCommentListScrollToLower: function(o) {
            var n = this;
            this._fetch_comment_list_lock || this.data.comment.response.hasNextPage && (this._fetch_comment_list_lock = !0, 
            this.setData({
                "comment.control.loading": !0
            }), t.list(this.data.comment.request).then(function(t) {
                if (n._fetch_comment_list_lock = !1, 0 == t.errCode) {
                    var o = (n.data.comment.response.feedList || []).concat(t.feedList || []), a = n.data.comment.likeList, m = o.map(function(e, t) {
                        return {
                            likeCount: e.likeCount,
                            isLike: a[t] && a[t].isLike || !1,
                            feedId: e.feedId
                        };
                    });
                    n.setData({
                        "comment.likeList": m,
                        "comment.control.loading": !1,
                        "comment.response.coralSummaryInfo": t.coralSummaryInfo,
                        "comment.response.hasNextPage": t.hasNextPage,
                        "comment.response.pageContext": t.pageContext,
                        "comment.request.pageContext": t.pageContext,
                        "comment.response.feedList": e(o)
                    });
                }
            }, function(e) {
                n.setData({
                    "comment.control.loading": !1
                }), n._fetch_comment_list_lock = !1;
            }));
        },
        onCommentListScroll: function(e) {
            e.detail.scrollTop > 0 ? this.setData({
                "comment.control.showScrollShadow": !0
            }) : this.setData({
                "comment.control.showScrollShadow": !1
            });
        },
        onShowCommentEdit: function() {
            !this.data.comment.control.showEdit && this.anyLayerShow();
            var e = this.data.comment.form || {}, t = this;
            this.setData({
                "comment.form.content2": e.content || "",
                "comment.form.content": e.content || "",
                "comment.form.color": "#fff",
                "comment.form.length": e.length || 0,
                "comment.form.maxLength": e.maxLength || 0,
                "comment.form.placeholder": "我来说两句",
                "comment.control.showEdit": !0
            }), setTimeout(function() {
                t.setData({
                    "comment.control.focusEdit": !0
                });
            }, 500);
        },
        onHideCommentEdit: function() {
            this.data.comment.control.showEdit && this.anyLayerHide(), wx.hideKeyboard(), this.setData({
                "comment.form.placeholder": " ",
                "comment.control.focusEdit": !1,
                "comment.control.showEdit": !1,
                "comment.form.color": "transparent"
            });
        },
        clearCommentEdit: function() {
            this.setData({
                "comment.form.content2": "",
                "comment.form.content": "",
                "comment.form.length": 0
            });
        },
        onCommentEditChange: function(e) {
            var t = this, o = e.detail.value || "";
            o = o.trim(), clearTimeout(this._commentEditChangeTimer), this._commentEditChangeTimer = setTimeout(function() {
                t.setData({
                    "comment.form.content": o,
                    "comment.form.length": o.length
                });
            }, 100);
        }
    };
};