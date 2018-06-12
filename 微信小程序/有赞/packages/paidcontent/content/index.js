!function(t) {
    function e(n) {
        if (a[n]) return a[n].exports;
        var i = global.installedModules[n] = a[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
    }
    t = Object.assign(require("../../../commons.js").modules, t), t = Object.assign(require("../../../vendors.js").modules, t);
    var a = {};
    a = global.installedModules = global.installedModules || {}, e.m = t, e.c = a, e.d = function(t, a, n) {
        e.o(t, a) || Object.defineProperty(t, a, {
            configurable: !1,
            enumerable: !0,
            get: n
        });
    }, e.r = function(t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, e.n = function(t) {
        var a = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return e.d(a, "a", a), a;
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, e.p = "", e(e.s = 159);
}({
    159: function(t, e, a) {
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        var i = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var a = arguments[e];
                for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
            }
            return t;
        }, o = n(a(0)), s = n(a(57)), c = a(17), l = a(7), r = a(44), u = a(4), d = getApp();
        (0, o.default)({
            data: {
                alias: "",
                themeClass: d.themeClass,
                audioSrc: "",
                video: {
                    src: "",
                    poster: ""
                },
                isTry: !0,
                fetched: !1,
                contentData: {
                    hideTextWithLayer: !1,
                    hasColumn: !1,
                    picture: {},
                    column: {
                        alias: ""
                    }
                },
                userId: d.globalData.token.userId,
                commentList: [],
                allowPageScrollCheck: !0,
                needFix: !1,
                page: 1,
                listLoading: !1,
                noMore: !1,
                windowHeight: 0
            },
            onLoad: function(t) {
                var e = t.alias || "";
                this.setData({
                    alias: e
                }), this.fetchContentData(e), this.fetchCommentList(e), this.setData({
                    windowHeight: d.getSystemInfoSync().windowHeight
                });
            },
            onShow: function() {
                this.setData({
                    copyright: d.globalData.copyright,
                    is_big_shop: d.globalData.is_big_shop
                }), wx.getStorageSync(c.REFRESH_KEY) && (wx.removeStorageSync(c.REFRESH_KEY), this.fetchContentData(this.data.alias));
            },
            onPullDownRefresh: function() {
                this.fetchContentData(this.data.alias, !0);
            },
            onShareAppMessage: function() {
                var t = this.data.contentData || {};
                return u.page.processShareData({
                    title: t.title,
                    path: "packages/paidcontent/content/index?alias=" + this.data.alias,
                    imageUrl: t.picture.cover
                });
            },
            fetchContentData: function(t, e) {
                var a = this;
                if (!t) return wx.showToast({
                    title: "页面参数缺失，无法获取详情",
                    icon: "none"
                });
                d.carmen({
                    method: "POST",
                    api: "youzan.owl.content.detail/1.0.0/get",
                    query: {
                        alias: t
                    },
                    success: function(t) {
                        if (wx.setNavigationBarTitle({
                            title: t.title || ""
                        }), !t.alias) return wx.showToast({
                            title: "内容不存在",
                            icon: "none"
                        });
                        a.setData({
                            fetched: !0,
                            contentData: a.parseContentData(t)
                        }, a.initContentData.bind(a));
                    },
                    fail: function() {
                        wx.showToast({
                            title: "获取内容详情失败",
                            icon: "none"
                        });
                    },
                    complete: function() {
                        e && wx.stopPullDownRefresh();
                    }
                });
            },
            parseContentData: function(t) {
                var e, a = this, n = t.picture, o = n.picHeight, l = n.picWidth, u = t.audio, d = t.video, h = t.mediaType, m = t.isSubscription, p = t.isFree, f = t.hasFullContent, w = wx.getSystemInfoSync().windowWidth, g = m || Boolean(p);
                if (r.wxParse("richContent", "html", (g ? t.content : t.preview) || "", this), 2 === h && u) {
                    var v = g ? u.audioUrl : u.audioPreviewUrl || "";
                    v && s.default.getAudioInfo(v).then(function(t) {
                        var e = t.url;
                        a.setData({
                            audioSrc: e
                        });
                    });
                }
                if (3 === h && d) {
                    var C = {};
                    C.src = g ? d.videoUrl : d.videoPreviewUrl, C.poster = g ? d.videoCover : d.videoPreviewCover || d.videoCover, 
                    this.setData({
                        video: C
                    });
                }
                return i({}, t, {
                    isShowFullContent: g,
                    publishTime: (e = t.publishAt, (0, c.parseTime)(e, !0)),
                    column: i({}, t.column || {}),
                    hasColumn: !(!t.column || !t.column.alias),
                    price: (0, c.parsePrice)(t.price),
                    picture: i({}, t.picture, {
                        wrapperWidth: w,
                        height: l > w ? w * o / l : o,
                        width: l > w ? w : l
                    }),
                    hasPreview: !!t.preview,
                    hasFullContent: void 0 === f || f
                });
            },
            initContentData: function() {
                var t = this;
                this.data.contentData.isShowFullContent || wx.createSelectorQuery().in(this).select(".content-text").boundingClientRect(function(e) {
                    e && e.height > 140 && t.setData({
                        "contentData.hideTextWithLayer": !0
                    });
                }).exec();
            },
            audioUpdateTime: function() {},
            audioEnd: function() {
                this.data.contentData.isShowFullContent || this.buyModal("试听结束，购买后可获得完整音频");
            },
            audioEmpty: function() {
                this.buyModal("当前内容需要购买后才能收听哦");
            },
            videoEnd: function() {
                this.data.contentData.isShowFullContent || this.buyModal("试看结束，购买后可获得完整视频");
            },
            videoPlay: function() {
                this.data.contentData.isShowFullContent || this.data.video.src || (wx.createVideoContext("targetVideo").pause(), 
                this.buyModal("当前内容需要购买后才能观看哦"));
            },
            continueRead: function() {
                this.buyModal("购买后，才能查看图文详情哦");
            },
            buyModal: function(t) {
                var e = this;
                wx.showModal({
                    title: "",
                    content: t,
                    cancelText: "知道了",
                    confirmText: "去购买",
                    confirmColor: "#00cc00",
                    success: function(t) {
                        t.confirm && e.buyContent();
                    }
                });
            },
            buyContent: function() {
                var t = this.data.contentData, e = t.alias, a = t.hasColumn, n = t.sellerType, i = t.isShowFullContent, o = t.column, s = "";
                s = !i && a && 2 === n ? "/packages/paidcontent/pay/index?alias=" + o.alias + "&type=column" : "/packages/paidcontent/pay/index?alias=" + e + "&type=content", 
                wx.navigateTo({
                    url: s
                });
            },
            goToColumn: function() {
                var t = "";
                try {
                    t = this.data.contentData.column.alias;
                } catch (t) {
                    return;
                }
                wx.navigateTo({
                    url: "/packages/paidcontent/column/index?alias=" + t + "&from=" + this.data.alias
                });
            },
            onPageScroll: function() {
                var t = this, e = wx.createSelectorQuery().in(this);
                e.select(".comment-list__comments").boundingClientRect(function(e) {
                    e && (e.top < 40 ? t.setData({
                        needFix: !0
                    }) : t.setData({
                        needFix: !1
                    }));
                }).exec(), this.data.allowPageScrollCheck && (this.setData({
                    allowPageScrollCheck: !1
                }), setTimeout(function() {
                    t.setData({
                        allowPageScrollCheck: !0
                    }), e.select(".comment-list").boundingClientRect(function(e) {
                        e && e.bottom < t.data.windowHeight + 200 && t.fetchCommentList();
                    }).exec();
                }, 400));
            },
            fetchCommentList: function(t) {
                var e = this;
                this.data.listLoading || this.data.noMore || (this.setData({
                    listLoading: !0
                }), d.carmen({
                    method: "GET",
                    api: "youzan.owl.content.comment/1.0.0/list",
                    query: {
                        alias: t || this.data.alias,
                        page_size: 20,
                        page_num: this.data.page
                    },
                    success: function(t) {
                        e.setData({
                            noMore: e.data.commentList.length >= t.totalItems,
                            page: e.data.page + 1,
                            commentList: e.data.commentList.concat(e.parseCommentList(t.list || []))
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "获取评论列表失败",
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
            parseCommentList: function(t) {
                var e = this;
                return t.map(function(t) {
                    t.replyComments && (t.replyComments = e.parseCommentList(t.replyComments));
                    var a = void 0;
                    return a = new Date(t.createAt).getFullYear() === new Date().getFullYear() ? (0, 
                    l.moment)(t.createAt, "MM月DD日 HH:mm") : (0, l.moment)(t.createAt, "YYYY年MM月DD日 HH:mm"), 
                    i({}, t, {
                        commentDateStr: a
                    });
                });
            },
            onClickWriteComment: function() {
                this.data.contentData.isSubscription || this.data.contentData.isFree ? wx.navigateTo({
                    url: "/packages/paidcontent/write-comment/index?alias=" + this.data.alias + "&title=" + this.data.contentData.title
                }) : wx.showToast({
                    title: "请购买后留言",
                    icon: "none",
                    duration: 2e3
                });
            },
            onClickLike: function(t) {
                var e = this;
                d.carmen({
                    method: "POST",
                    api: "youzan.owl.content.comment/1.0.0/praise",
                    data: {
                        alias: this.data.alias,
                        id: t.detail.id,
                        is_praise: t.detail.isPraise ? 0 : 1
                    },
                    success: function() {
                        var a = t.detail;
                        a.praiseNum = a.isPraise ? a.praiseNum - 1 : a.praiseNum + 1, a.isPraise = !a.isPraise, 
                        e.setData({
                            commentList: e.data.commentList.map(function(t) {
                                return t.id === a.id ? Object.assign(t, a) : t.replyComments && t.replyComments.length > 0 ? (t.replyComments = t.replyComments.map(function(t) {
                                    return t.id === a.id ? Object.assign(t, a) : t;
                                }), t) : t;
                            })
                        });
                    },
                    fail: function() {
                        wx.showToast({
                            title: "点赞失败，请稍后再试",
                            icon: "none"
                        });
                    }
                });
            },
            onDelComment: function(t) {
                var e = this;
                d.carmen({
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
            }
        });
    }
});