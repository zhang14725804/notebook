(function() {
    function a(a) {
        return a && a.__esModule ? a : {
            default: a
        };
    }
    var b = Object.assign || function(a) {
        for (var b, c = 1; c < arguments.length; c++) for (var d in b = arguments[c], b) Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        return a;
    }, c = require("../../utils/ppdog"), d = a(c), e = require("../../utils/regenerator-runtime"), f = a(e), g = require("../../utils/RequestApi"), h = require("../../filter/commentFilter"), i = a(h), j = require("../../filter/navigateFilter"), k = a(j), l = {}, m = !1, n = !1;
    Page({
        data: {
            commentsData: [],
            nodata: !1,
            replyText: "",
            firstLoading: !0,
            likeAnimationData: {},
            isIphoneX: !1,
            height: 1110,
            beginId: "",
            lastId: "",
            nomore: !1,
            longTapId: "",
            jbIndex: "",
            jbAnimationData: {},
            hasFade: {},
            scrollX: !1,
            scrollY: !0,
            topicFlag: !1,
            description: "　",
            topic_images: {
                detail_banner: "http://mat1.gtimg.com/finance/images/stock/p/xcx/detail_pic.png",
                list_big: "http://mat1.gtimg.com/finance/images/stock/p/xcx/list_big.png",
                list_small: "http://mat1.gtimg.com/finance/images/stock/p/xcx/list_small.png"
            },
            showTopic: !1
        },
        setTitle: function() {
            var a = this.data, b = a.name, c = a.symbol, d = a.topicFlag, e = a.topic;
            if (b && c) {
                var f = b + "(" + c.substr(2) + ")";
                wx.setNavigationBarTitle({
                    title: f
                });
            } else if (d) {
                wx.setNavigationBarTitle({
                    title: "{" + e + "}"
                });
            }
        },
        onLoad: function(a) {
            var c = getApp(), e = getApp(), f = e.Event, g = e.noticeData, h = getApp(), i = h.SystemInfo, j = h.device;
            i = i || j;
            var k = !1;
            d.default.wx.getSystemInfo().then(function(a) {
                a = a, /iphone\sx/i.test(a.model) && (k = !0);
            });
            var l = g && g.length ? 42 : 10, m = {
                topicFlag: a.topicId || !1,
                isIphoneX: k,
                height: +i.windowHeight - l * i.pixelRatio / 2
            };
            this.setData(b({}, m, a)), f.on("newSubject", this, this.newSubject), f.on("updateTimeline", this, this.updateTimeLine), 
            f.on("stockClickStatusChange", this, this.stockClickStatusChange);
            var n = this.data, o = n.name, p = n.symbol;
            this.setTitle(o, p);
        },
        onReady: function() {
            var a = getApp(), b = a.Event, c = a.noticeData;
            this.getCommentCon(!0);
            var d = this.selectComponent("#replyBox"), e = this.selectComponent("#loadingOrMore"), f = this.selectComponent("#notices");
            d.init({
                symbol: this.data.symbol,
                name: this.data.name,
                topicId: this.data.topicId,
                topic: this.data.topic,
                type: "timeline"
            }), e.init({
                btn: "上拉加载更多"
            }), e.changeLoadingAnimation("rotate"), c && c.length && f.init(c), this.setTitle();
        },
        onShow: function() {},
        onHide: function() {
            n = !1, this.setData({
                longTapId: ""
            });
        },
        onPullDownRefresh: function() {
            this.getCommentCon(!0), wx.stopPullDownRefresh();
        },
        onUnload: function() {
            var a = getApp(), b = a.Event;
            b.remove("newSubject", this), b.remove("updateTimeline", this), b.remove("stockClickStatusChange", this), 
            l = {};
        },
        getCommentCon: function(a) {
            var c = a || !1, e = getApp(), f = this, h = this.selectComponent("#loadingOrMore"), j = f.data.topicFlag ? f.data.topicId : f.data.symbol;
            g.Request.getCommentCon(j, 20, f.data.beginId, this.data.lastId, f.data.topicFlag).then(function(a) {
                return a;
            }).filter(i.default).then(function(a) {
                console.log("评论内容拉取,解析后：", a);
                var e = a.commentsData, i = e[0] ? e[0].id : "", j = i;
                d.default.wx.getStorage({
                    key: "comments_info"
                }).then(function(a) {
                    var b = a.data;
                    b[j] = i, d.default.wx.setStorage({
                        key: "comments_info",
                        data: b
                    });
                }).catch(function() {
                    var a = {};
                    a[j] = i, d.default.wx.setStorage({
                        key: "comments_info",
                        data: a
                    });
                });
                var k = e[e.length - 1];
                c || (e = f.data.commentsData.concat(e)), console.log(a), f.setData(b({}, a, {
                    firstLoading: !1,
                    commentsData: e,
                    beginId: i,
                    lastId: k && k.id || null,
                    nodata: !1,
                    nomore: !a.more_flag
                })), a.more_flag ? h.changeLoadingAnimation("more") : e.length ? h.changeLoadingAnimation("noMore") : h.changeLoadingAnimation("hide");
                var l = wx.getStorageSync("clickStocks");
                l = l || {}, f.setData({
                    stocksStorage: l
                });
                var m = [], n = {};
                e.forEach(function(a) {
                    a.detailInfo.stocks.forEach(function(a) {
                        n[a] || (m.push(a), n[a] = !0);
                    });
                }), m.length && g.Request.getClickStatus(m, l).then(function() {
                    var a = wx.getStorageSync("clickStocks");
                    f.setData({
                        stocksStorage: a || {}
                    });
                });
            }, function() {
                f.setData({
                    nodata: !c
                }), h.changeLoadingAnimation("hide");
            }).catch(function() {
                h.changeLoadingAnimation("fail");
            });
        },
        stockClickStatusChange: function() {
            var a = wx.getStorageSync("clickStocks");
            this.setData({
                stocksStorage: a || {}
            });
        },
        newSubject: function(a) {
            var b = a.post, c = a.fake_id, d = a.comment_id, e = this.data.commentsData;
            b ? e.unshift(b) : e.some(function(a) {
                return !(a.fake_id != c) && (a.fake_id = null, a.id = d, a.owner = !0, !0);
            }), this.setData({
                commentsData: e
            });
        },
        updateTimeLine: function(a) {
            if (a.parent_id) {
                var b = this.data.commentsData;
                b.some(function(b) {
                    return b.id == a.parent_id && ("comment" == a.type ? b.comment_cnt = a.comment_num : "like" == a.type && (b.like_num = a.like_num, 
                    b.like_id = a.like_id || ""), !0);
                }), this.setData({
                    commentsData: b
                });
            }
        },
        bindTapComment: function(a) {
            if (m) m = !1, this.bindTouchMove(); else if (!1 == m && !1 == n) {
                var b = a.currentTarget.dataset.nid;
                if (!b) return;
                var c = this.data, d = c.symbol, e = c.name, f = c.price, h = c.zdf, i = c.topicFlag, j = c.topic;
                g.Request.reportData({
                    sop: "xcx_postdetail_click",
                    stockid: d
                });
                var k = i ? "./detail/detail?nid=" + b + "&topic=" + j : "./detail/detail?nid=" + b + "&symbol=" + d + "&name=" + e + "&source=list&price=" + f + "&zdf=" + encodeURIComponent(h);
                wx.navigateTo({
                    url: k
                }), this.bindTouchMove(), n = !0;
            }
            m = !1;
        },
        bindLongTap: function(a) {
            var b = a.currentTarget.dataset.nid;
            b && (m = !0, this.setData({
                longTapId: b
            }));
        },
        bindTouchMove: function() {
            this.setData({
                longTapId: ""
            });
        },
        getMore: function() {
            var a = this.selectComponent("#loadingOrMore");
            a.changeLoadingAnimation("rotate"), this.getCommentCon();
        },
        tolower: function() {
            this.data.nomore || this.getMore();
        },
        tapStock: function(a) {
            var b = a.currentTarget.dataset, c = b.symbol, d = b.name;
            wx.navigateTo({
                url: "../quote/quote?symbol=" + c + "&name=" + d
            });
        },
        tapTopic: function(a) {
            var b = a.currentTarget.dataset, c = b.topic, d = b.topicid, e = b.source, f = "./comment?topicId=" + d + "&topic=" + c;
        },
        taplike: function(a) {
            var b = this, c = this, d = a.currentTarget.dataset, e = d.likeid, f = d.nid, h = d.idx;
            f && !0 !== l[f] && (l[f] = !0, g.Request.reportData({
                sop: "xcx_post_like_click",
                stockid: c.data.symbol
            }), g.Request.getWxUserInfo().then(function(a) {
                if (!a) return void (l[f] = !1);
                var d = e ? 0 : -1;
                if (c.createAnimation(f), e) {
                    var i = b.data.commentsData;
                    i[h].like_id = "", i[h].like_num -= 1, b.setData({
                        commentsData: i
                    });
                } else {
                    var j = b.data.commentsData;
                    j[h].like_id = "dsafdas", j[h].like_num += 1, b.setData({
                        commentsData: j
                    });
                }
                g.Request.putRssLike(d, f, a).then(function(a) {
                    return a;
                }).then(function(a) {
                    if (l[f] = !1, !e) {
                        var c = b.data.commentsData;
                        c[h].like_id = a, b.setData({
                            commentsData: c
                        });
                    }
                });
            }).catch(function(a) {
                console.log("eee", a, "not authrized!" == a);
            }));
        },
        binddel: function(a) {
            var b = this;
            wx.showModal({
                title: "提示",
                content: "确定删除吗？",
                success: function(c) {
                    if (c.confirm) {
                        var d = a.currentTarget.dataset, e = d.nid, f = d.idx;
                        g.Request.getWxUserInfo().then(function(a) {
                            if (a) {
                                var c = b.data.commentsData;
                                c.splice(f, 1), b.setData({
                                    commentsData: c
                                }), wx.showToast({
                                    title: "删除成功",
                                    icon: "success",
                                    duration: 2e3
                                }), e && g.Request.deleteRssSubject(e, a).then(function(a) {
                                    return a;
                                }).then(function() {});
                            }
                        });
                    } else if (c.cancel) ;
                }
            });
        },
        previewImage: function(a) {
            g.Request.reportData({
                sop: "xcx_postpic_click",
                stockid: this.data.symbol
            });
            var b = a.target.dataset, c = b.src, d = b.images, e = [];
            d[0].origin ? d.forEach(function(a) {
                e.push(a.origin);
            }) : e = d, wx.previewImage({
                current: c,
                urls: e
            });
        },
        createAnimation: function(a) {
            var b = this.data.likeAnimationData, c = "" + a, d = wx.createAnimation({
                duration: 300,
                timingFunction: "ease",
                delay: 0
            });
            d.scale(1.5, 1.5).translateY(-5).step(), b[c] = d.export(), this.setData({
                likeAnimationData: b
            }), setTimeout(function() {
                d.scale(1, 1).translateY(0).step(), b[c] = d.export(), this.setData({
                    likeAnimationData: b
                });
            }.bind(this), 300);
        },
        tapOtherSource: function(a) {
            var b = a.target.dataset, c = b.type, e = b.src, f = b.user, g = b.nid, h = this.data, i = h.symbol, j = h.name;
            if (3 == c) {
                var l = g.split("_")[2];
                d.default.resolve({
                    url: "../newsCon/newsCon?id=" + l + "&symbol=" + i + "&name=" + j
                }).filter(k.default).then(function() {});
            }
        },
        bindOpers: function() {},
        bindCommentJB: function(a) {
            var b = this, c = a.target.dataset, e = c.nid, f = c.index, h = this.data, i = h.commentsData, j = h.hasFade;
            this.setData({
                jbIndex: e,
                longTapId: ""
            });
            var k = wx.createAnimation({
                transformOrigin: "50% 50%",
                duration: 3e3,
                timingFunction: "ease-in-out",
                delay: 0
            });
            k.translateX(375).opacity(0).step({
                duration: 500
            }), k.height(0).step({
                duration: 500
            });
            var l = {};
            l[e] = k.export(), this.setData({
                jbAnimationData: l
            }), setTimeout(function() {
                j[e] = !0, b.setData({
                    hasFade: j
                });
            }, 500), g.Request.illegalReport(e).then(function(a) {
                console.log(a);
            }), d.default.wx.getStorage({
                key: "illegalReport"
            }).then(function(a) {
                var b = a.data;
                b[e] = !0, d.default.wx.setStorage({
                    key: "illegalReport",
                    data: b
                });
            }).catch(function() {
                var a = {};
                a[e] = !0, d.default.wx.setStorage({
                    key: "illegalReport",
                    data: a
                });
            });
        },
        goH5: function(a) {
            var b = a.currentTarget.dataset.url;
            wx.navigateTo({
                url: "../h5View/h5View?url=" + b
            });
        },
        goPlaza: function(a) {
            var b = a.currentTarget.dataset.source;
            wx.navigateTo({
                url: "../topicPlaza/topicPlaza"
            });
        }
    });
})();