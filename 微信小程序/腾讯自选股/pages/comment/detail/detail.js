(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b, c, d, e = require("../../../utils/ppdog"), f = a(e), g = require("../../../utils/regenerator-runtime"), h = a(g), i = require("../../../utils/RequestApi"), j = require("../../../filter/commentFilter"), k = a(j), l = require("../../../filter/navigateFilter"), m = a(l), n = {};
    Page({
        data: {
            detailData: {},
            nodata: !1,
            showLoading: !0,
            noReplyData: !0,
            likeAnimationData: {},
            replyid: null,
            directOpen: !1,
            replyText: "回复。。。",
            lastId: "",
            nomore: !1,
            deleteData: !1,
            isIphoneX: !1,
            canReply: !1
        },
        onShareAppMessage: function() {
            var a = this.data, b = a.replyid, c = a.stock_id, d = a.stock_name, e = a.topic, f = function(a, b) {
                return Math.round(Math.random() * (b - a) + a);
            }(10, 20) % 2, g = [ "分享股票圈帖子", "自在选股，轻松交流" ][f], h = !d && e ? "topic=" + e : "symbol=" + c + "&name=" + d;
            return {
                title: g,
                path: "pages/comment/detail/detail?source=share&commentId=" + b + "&" + h
            };
        },
        setTitle: function() {
            var a = this.data, b = a.stock_name, c = a.stock_id, d = a.topic;
            if (b) {
                var e = b + "(" + c.substr(2) + ")";
                wx.setNavigationBarTitle({
                    title: e
                });
            } else d && wx.setNavigationBarTitle({
                title: "{" + d + "}"
            });
        },
        onLoad: function(a) {
            var b = this, c = getApp(), d = getApp(), e = d.Event, g = d.SystemInfo, h = 30;
            f.default.wx.getSystemInfo().then(function(a) {
                g = a, /iphone\sx/i.test(g.model) && (h = 50, b.setData({
                    isIphoneX: !0
                }));
            });
            var j = g ? +g.windowHeight - h * g.pixelRatio / 2 + "px" : "1090rpx";
            this.setData({
                replyid: a.nid || a.commentId,
                directOpen: a.source && "share" == a.source || !1,
                stock_name: a.name || "",
                stock_id: a.symbol || null,
                topic: a.topic || null,
                height: j
            }), "list" != a.source && i.Request.reportData({
                sop: "xcx_from_cst",
                stockid: a.symbol
            }), e.on("newComment", this, this.newComment), e.on("stockClickStatusChange", this, this.stockClickStatusChange);
            var k = this.data, l = k.stock_name, m = k.stock_id, n = k.price, o = k.zdf;
            this.setTitle(), i.Request.getSendCommentTokenPlat(this.data.replyid).then(function(a) {
                if (-204 == a.data.code) {
                    b.setData({
                        canReply: !0
                    });
                    var c = p.selectComponent("#replyBox");
                    c.rejectReplyToken(!1);
                }
            });
            var p = this;
            setTimeout(function() {
                p.getLoadComponent();
                var a = p.selectComponent("#replyBox");
                a && a.init({
                    type: "detail",
                    id: p.data.replyid,
                    touser: "",
                    symbol: p.data.stock_id
                }), p.setData({
                    replyBox: a
                });
            }, 1e3);
        },
        onReady: function() {
            var a = getApp(), b = a.Event;
            this.updateCommentCon();
        },
        onPullDownRefresh: function() {
            this.getCommentList(!0), this.forcePullDown = !0, wx.stopPullDownRefresh();
        },
        onUnload: function() {
            var a = getApp(), e = a.Event;
            e.remove("newComment", this), e.remove("stockClickStatusChange", this), b && clearTimeout(b), 
            c && clearTimeout(c), d && clearTimeout(d), n = {};
        },
        getLoadComponent: function() {
            var a = this.data.loadingOrMore;
            return a || (a = this.selectComponent("#loadingOrMore"), a && (a.init({
                btn: "上拉加载更多"
            }), this.setData({
                loadingOrMore: a
            }), this.data.noReplyData ? a.changeLoadingAnimation("hide") : this.data.nomore ? a.changeLoadingAnimation("noMore") : a.changeLoadingAnimation("more"))), 
            a;
        },
        getCommentList: function(a) {
            var b = this, c = this, d = this.getLoadComponent();
            d && d.changeLoadingAnimation("rotate"), i.Request.commentListPlatContent(c.data.replyid, a, c.data.lastId).then(function(a) {
                return a;
            }).filter(k.default).then(function(d) {
                var e = b.getLoadComponent(), f = d.commentsData || [];
                if (0 < f.length) {
                    var g = f[f.length - 1];
                    a || !1 || (f = c.data.recomments.concat(f)), d.more_flag ? e && e.changeLoadingAnimation("more") : e && e.changeLoadingAnimation("noMore"), 
                    c.setData({
                        lastId: g.comment_id,
                        recomments: f,
                        noReplyData: !1,
                        nomore: !d.more_flag
                    });
                } else c.setData({
                    noReplyData: !0,
                    recomments: f
                });
                var h = wx.getStorageSync("clickStocks");
                h = h || {}, c.setData({
                    stocksStorage: h
                });
                var j = [], k = {};
                f.forEach(function(a) {
                    a.detailInfo.stocks.forEach(function(a) {
                        k[a] || (j.push(a), k[a] = !0);
                    });
                }), j.length && i.Request.getClickStatus(j, h).then(function(a) {
                    var b = wx.getStorageSync("clickStocks");
                    c.setData({
                        stocksStorage: b || {}
                    }), console.log("处理完成", a, c.data.stocksStorage);
                });
            }, function() {
                c.setData({
                    noReplyData: !0
                }), d && d.changeLoadingAnimation("hide");
            }).catch(function(a) {
                console.log(a), d && d.changeLoadingAnimation("fail");
            });
        },
        updateCommentCon: function() {
            var a = this, c = getApp(), d = this;
            i.Request.getCommentDetail(d.data.replyid).then(function(a) {
                return a;
            }).filter(k.default).then(function(c) {
                var e = c.commentsData[0];
                if (!e) return d.setData({
                    deleteData: !0,
                    showLoading: !1
                }), void wx.hideShareMenu();
                wx.showShareMenu({
                    withShareTicket: !0
                });
                var f = e.like_users;
                18 < f.length ? (e.realUsers = f.length, e.like_users[17] = {
                    type: "text",
                    text: "等" + f.length + "人赞"
                }, e.like_users.length = 18) : e.realUsers = !1, d.setData({
                    deleteData: !1,
                    detailData: e,
                    stock_id: e.stock_id,
                    showLoading: !1,
                    nodata: !1
                }), b && clearTimeout(b), b = setTimeout(function() {
                    var b = a.data.replyBox || a.selectComponent("#replyBox");
                    b.init({
                        type: "detail",
                        id: d.data.replyid,
                        touser: e.user_name,
                        symbol: e.stock_id
                    });
                }, 1e3);
                var g = wx.getStorageSync("clickStocks");
                g = g || {}, d.setData({
                    stocksStorage: g
                });
            }, function() {
                d.setData({
                    nodata: !0
                });
            }).catch(function(a) {
                console.log(a);
            }), this.getCommentList(!0);
        },
        getMore: function() {
            var a = this.getLoadComponent();
            a && a.changeLoadingAnimation("rotate"), this.getCommentList();
        },
        tolower: function() {
            this.data.nomore || this.getMore();
        },
        goHome: function() {
            wx.reLaunch({
                url: "../../index/index"
            });
        },
        goComment: function() {
            var a = this.data, b = a.stock_id, c = a.stock_name, d = "../comment?symbol=" + (b || this.data.detailData.stock_id) + "&name=" + c;
            wx.navigateTo({
                url: d
            });
        },
        tapStock: function(a) {
            var b = a.currentTarget.dataset, c = b.symbol, d = b.name, e = b.type;
            "source" == e && i.Request.reportData({
                sop: "xcx_postdetail_sd_click",
                stockid: c
            }), wx.navigateTo({
                url: "../../quote/quote?symbol=" + c + "&name=" + d
            });
        },
        tapTopic: function(a) {
            var b = a.currentTarget.dataset, c = b.topic, d = b.topicid, e = b.source;
        },
        taplike: function(a) {
            var b = this, c = a.currentTarget.dataset, d = c.likeid, e = c.nid, f = c.idx, g = c.isre;
            e && !0 !== n[e] && (n[e] = !0, i.Request.getWxUserInfo().then(function(a) {
                if (!a) return void (n[e] = !1);
                var c = d ? 0 : -1;
                if (b.createAnimation(e), g) {
                    var h = b.data.recomments, j = h[f];
                    d ? (j.like_id = "", j.like_num = +j.like_num - 1, b.setData({
                        recomments: h
                    })) : (j.like_id = "201703031106500052113529", j.like_num = +j.like_num + 1, b.setData({
                        recomments: h
                    }));
                } else {
                    var k = b.data.detailData;
                    d ? (k.like_id = "", k.like_num = +k.like_num - 1, k.like_users.forEach(function(a, b) {
                        1 == a.owner && k.like_users.splice(b, 1);
                    }), b.setData({
                        detailData: k
                    })) : (k.like_id = "201703031106500052113529", k.like_num = +k.like_num + 1, b.setData({
                        detailData: k
                    }));
                }
                i.Request.putRssLike(c, e, a).then(function(a) {
                    return a;
                }).then(function(c) {
                    if (n[e] = !1, g) {
                        var h = b.data.recomments, i = h[f];
                        d || (i.like_id = c), b.setData({
                            recomments: h
                        });
                    } else {
                        var j = b.data.detailData;
                        d || (j.like_id = c, j.like_users.unshift({
                            user_id: "lisaxiao",
                            owner: 1,
                            user_name: a.nickName,
                            user_image: a.avatarUrl
                        })), b.setData({
                            detailData: j
                        }), b.updateTimeline({
                            type: "like",
                            parent_id: e,
                            comment_id: e,
                            like_num: b.data.detailData.like_num,
                            like_id: b.data.detailData.like_id
                        });
                    }
                });
            }).catch(function() {}));
        },
        createAnimation: function(a) {
            var b = this.data.likeAnimationData, d = "" + a, e = wx.createAnimation({
                duration: 300,
                timingFunction: "ease",
                delay: 0
            });
            e.scale(1.5, 1.5).translateY(-5).step(), b[d] = e.export(), this.setData({
                likeAnimationData: b
            }), c = setTimeout(function() {
                e.scale(1, 1).translateY(0).step(), b[d] = e.export(), this.setData({
                    likeAnimationData: b
                });
            }.bind(this), 300);
        },
        tapComment: function(a) {
            var b = this, c = a.currentTarget.dataset.nid, e = this.data.replyBox || this.selectComponent("#replyBox"), f = b.data, g = f.replyid, h = f.detailData;
            d && clearTimeout(d), d = setTimeout(function() {
                e.init({
                    type: "detail",
                    id: g,
                    touser: h.user_name,
                    symbol: h.stock_id
                }), e.bindTapInput();
            }, 1e3);
        },
        binddel: function(a) {
            var b = this;
            wx.showModal({
                title: "提示",
                content: "确定删除吗？",
                success: function(c) {
                    if (c.confirm) {
                        i.Request.reportData({
                            sop: "xcx_mypost_delete",
                            stockid: b.data.stock_id
                        });
                        var d = a.currentTarget.dataset, e = d.nid, f = d.index, g = b.data, h = g.recomments, j = g.detailData, k = g.replyid;
                        if (h.splice(f, 1), j.comment_num = +j.comment_num - 1, b.setData({
                            recomments: h,
                            detailData: j
                        }), wx.showToast({
                            title: "删除成功",
                            icon: "success",
                            duration: 2e3
                        }), !e) return;
                        i.Request.deleteRssSubject(e).then(function(a) {
                            return b.updateTimeline({
                                type: "comment",
                                parent_id: k,
                                comment_num: j.comment_num
                            }), a;
                        }).then(function() {});
                    } else if (c.cancel) ;
                }
            });
        },
        stockClickStatusChange: function() {
            var a = wx.getStorageSync("clickStocks");
            this.setData({
                stocksStorage: a || {}
            });
        },
        newComment: function(a) {
            var b = a.post, c = a.fake_id, d = a.parent_id, e = a.root_id, f = a.comment_id, g = a.type, h = a.type2, i = this.data, j = i.recomments, k = i.detailData, l = j.length;
            if (b ? (j.unshift(b), k.comment_num = +k.comment_num + 1) : j.some(function(a) {
                return a.fake_id == c && (a.fake_id = null, a.comment_id = f, a.owner = !0, !0);
            }), this.setData({
                recomments: j,
                detailData: k
            }), 0 == l) {
                var m = this.getLoadComponent();
                m.changeLoadingAnimation("noMore"), this.setData({
                    nomore: !0
                });
            }
            !b && f && this.updateTimeline({
                type: "comment",
                parent_id: e || d,
                comment_num: this.data.detailData.comment_num
            });
        },
        updateTimeline: function(a) {
            var b = getApp(), c = b.Event;
            c.emit("updateTimeline", a || {});
        },
        previewImage: function(a) {
            var b = a.target.dataset, c = b.src, d = b.images, e = [];
            d[0].origin ? d.forEach(function(a) {
                e.push(a.origin);
            }) : e = d, wx.previewImage({
                current: c,
                urls: e
            });
        },
        replyDetailComment: function(a) {
            i.Request.reportData({
                sop: "xcx_postdetail_reply",
                stockid: this.data.stock_id
            });
            var b = a.currentTarget.dataset, c = b.nid, d = b.index, e = b.name, f = b.openid, g = b.rootid, h = b.content, j = this.data.detailData.stock_id, k = "../../../pages/comment/edit/edit?id=" + c + "&type=detail&type2=reply&symbol=" + j + "&name=" + this.data.stock_name + "&touser=" + e + "&toOpenid=" + f + "&rootid=" + g + "&content=" + h;
            wx.navigateTo({
                url: k
            });
        },
        tapOtherSource: function(a) {
            var b = a.target.dataset, c = b.type, d = b.src, e = b.user, g = b.nid, h = this.data, i = h.stock_id, j = h.stock_name;
            if (3 == c) {
                var k = g.split("_")[2];
                f.default.resolve({
                    url: "../../newsCon/newsCon?id=" + k + "&symbol=" + i + "&name=" + j
                }).filter(m.default).then(function() {});
            }
        },
        bindOpers: function() {}
    });
})();