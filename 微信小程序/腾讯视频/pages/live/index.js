function t(t, e) {
    if (!t) return "";
    "string" == typeof t && (t = new Date(t.replace(/-/g, "/"))), e = e || "yyyy-MM-dd";
    var a = {
        "M+": t.getMonth() + 1,
        "d+": t.getDate(),
        "h+": t.getHours(),
        "m+": t.getMinutes(),
        "s+": t.getSeconds(),
        "q+": Math.floor((t.getMonth() + 3) / 3),
        S: t.getMilliseconds()
    };
    /(y+)/.test(e) && (e = e.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var n in a) new RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? a[n] : ("00" + a[n]).substr(("" + a[n]).length)));
    return e;
}

function e(t) {
    var e = new Date();
    e.setHours(0), e.setMinutes(0), e.setSeconds(0), e = e.getTime() / 1e3;
    var a = new Date(1e3 * t), n = Date.now() / 1e3 - t;
    if (t >= e) {
        var i = n / 3600, o = n / 60;
        return i < 1 ? o < 1 ? "刚刚" : parseInt(o) + "分钟前" : i < 24 ? parseInt(i) + "小时前" : a.toString().match(/(\d\d:\d\d):\d\d/)[1];
    }
    if (n < 172800 && t < e) return "昨天";
    if (n < 604800) return Math.floor(n / 86400) + "天前";
    var r = a.getMonth() + 1;
    r = r >= 10 ? r : "0" + r;
    var c = a.getDate();
    return c = c >= 10 ? c : "0" + c, [ a.getFullYear(), "-", r, "-", c ].join("");
}

var a, n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, i = require("../../module/page"), o = require("../../module/request/request"), r = (require("../../module/es6-promise"), 
require("../../module/fns"), require("../../module/boss")({
    app: "tinyapp",
    module: "play"
}), require("../../module/log")("vaccess")), c = require("../../WechatAppPlayer/index"), l = require("../../module/login"), s = (require("../../module/globalData"), 
require("../../module/dataset/history/index")), m = wx.getSystemInfoSync().system.match(/ios/i), d = require("../hot/data/base64text");

switch (wx.getSystemInfoSync().platform) {
  case "devtools":
    a = m ? 5 : 3;
    break;

  case "android":
    a = 3;
    break;

  case "ios":
    a = 5;
    break;

  case "ipad":
    a = 4;
}

var u;

l.getUserInfo(function() {
    l.getLoginInfo(function(t, e) {
        u = e;
    });
}), i("live", {
    comps: [ require("../../comps/toast/index")() ],
    refresh: function() {
        this.onLoad({
            pid: this.data.pid,
            pageError: ""
        });
    },
    onLoad: function(t) {
        var e = this, n = t.pid || t.id;
        this.setData({
            pid: n,
            pageLoading: !0
        }), this.videoContext = wx.createVideoContext("tvp"), wx.getNetworkType({
            success: function(t) {
                "wifi" != t.networkType && e.setData({
                    isWifi: !1
                });
            }
        }), s.add({
            pid: n || "",
            poster: null,
            strTime: 0,
            uiDate: Math.floor(Date.now() / 1e3),
            iHD: 0,
            playFrom: a,
            seriesText: "",
            reportParam: "",
            isAutoPlay: !0,
            recordType: 0,
            fromCtx: "",
            totalTime: "",
            totalWatchTime: 0,
            showLocation: 1
        }), this.initLivePoll(n).then(function(t) {
            if (1 == t.liveStatus ? e.data.commentKey ? e.initCommentList() : e.useFullscreenMode() : e.data.chatKey ? e.initChatList() : e.useFullscreenMode(), 
            2 == t.liveStatus) {
                var a = +e.data.sid;
                e.createPlayer(a, n);
            }
        }).catch(function(t) {});
    },
    createPlayer: function(t, e) {
        var a = this;
        this.video = c({
            sid: t,
            pid: e
        }, {
            from: "v4148"
        }), this.video.on("contentchange", function(t) {
            t.currentContent && (console.log("live contentchange", t.currentContent.url), a.setData({
                tvpUrl: t.currentContent.url
            }), a.data.isWifi && a.start());
        }), this.video.on("error", function(t) {
            console.log("直播错误", t);
        });
    },
    onUnload: function() {
        clearTimeout(this.livePollTimer), clearTimeout(this.chatPollTimer), this.livePollTimer = !1, 
        this.chatPollTimer = !1;
    },
    data: {
        sid: 0,
        tvpUrl: d,
        pageLoading: !1,
        pageError: "",
        commentKey: "",
        chatPageContext: "",
        chatFrontPageContext: "",
        chatlist: [],
        chatSticked: !0,
        onlineNumber: 0,
        liveStartTime: 0,
        liveStatus: 1,
        poster: "",
        sendtext: "",
        isWifi: !0
    },
    cantCancel: !1,
    cancelreply: function() {
        this.cantCancel || this.setData({
            focusinput: !1,
            focusnick: "",
            replying: !1
        });
    },
    reply: function(t) {
        var e = this, a = t.currentTarget.dataset.id || t.currentTarget.id.slice(4), n = t.currentTarget.dataset.nick;
        t.currentTarget.dataset.mine || (this.setData({
            focusinput: !0,
            focusnick: n,
            replying: a
        }), this.cantCancel = setTimeout(function() {
            clearTimeout(e.cantCancel), e.cantCancel = null;
        }, 300));
    },
    send: function(t) {
        var e = this;
        if ("object" == (void 0 === t ? "undefined" : n(t)) && t.detail && (t = t.detail.value), 
        "" != t.trim()) {
            var a = this.data.replying, i = this.data.focusnick;
            o.vaccess("post_comment", {
                commentKey: 1 == this.data.liveStatus ? this.data.commentKey : this.data.chatKey,
                commentId: a || "",
                postType: a ? 1 : 0,
                reportType: 0,
                content: t
            }).then(function(n) {
                if (0 != n.errCode) {
                    var o = new Error("发表失败");
                    throw o.code = "B." + n.errCode, o;
                }
                var r = n.commentList[0].commentId;
                if (a && 1 == e.data.liveStatus) {
                    var c = e.data.chatlist.filter(function(t) {
                        return a == t.commentId;
                    })[0];
                    c ? (c.replys = c.replys || [], c.replys.push({
                        commentId: r,
                        mine: !0,
                        nick: u.nickName ? u.nickName : "你",
                        avatar: u.avatarUrl ? u.avatarUrl : "http://i.gtimg.cn/qqlive/images/20161208/avatar.png",
                        content: t
                    })) : e.data.chatlist.every(function(e) {
                        return !e.replys || e.replys.every(function(n) {
                            return n.commentId != a || (e.replys.push({
                                commentId: r,
                                mine: !0,
                                parentNick: a ? i : "",
                                nick: u.nickName ? u.nickName : "你",
                                avatar: u.avatarUrl ? u.avatarUrl : "http://i.gtimg.cn/qqlive/images/20161208/avatar.png",
                                content: t
                            }), !1);
                        });
                    });
                } else e.data.chatlist.push({
                    commentId: r,
                    mine: !0,
                    parentNick: a ? i : "",
                    nick: u.nickName ? u.nickName : "你",
                    avatar: u.avatarUrl ? u.avatarUrl : "http://i.gtimg.cn/qqlive/images/20161208/avatar.png",
                    content: t
                });
                var l = {
                    sendtext: "",
                    chatlist: e.data.chatlist
                };
                a && 1 == e.data.liveStatus || (l.scrollTop = 1e5 + Math.random()), e.setData(l), 
                e.cancelreply();
            }).catch(function(t) {
                e.showToast({
                    title: "发表失败(" + (t.code || "unknown") + ")"
                });
            });
        } else this.showToast({
            title: "消息不能为空！"
        });
    },
    start: function() {
        var t = this;
        console.log("videoContext.play"), this.setData({
            isWifi: !0
        }), setTimeout(function() {
            t.videoContext.play();
        }, 500);
    },
    play: function(t) {
        var e = this.data.liveEndInfo;
        this.$route("play?cid=" + (e.cid || "") + "&vid=" + (e.vid || ""));
    },
    livePollTimer: null,
    initLivePoll: function(e) {
        var a = this;
        return o.vaccess("live_detail", {
            pid: e
        }).then(function(e) {
            !1 !== a.livePollTimer && (a.livePollTimer = setTimeout(function() {
                a.getLivePoll(e.pollDataKey);
            }, 2e3)), e.liveItemData = e.liveItemData || {}, wx.setNavigationBarTitle({
                title: e.liveItemData.title || "腾讯视频"
            }), e.liveBeforeInfo = e.liveBeforeInfo || {};
            var n = "";
            return e.liveProcessInfo && e.liveProcessInfo.moduleList && e.liveProcessInfo.moduleList.forEach(function(t) {
                2 == t.modType && (n = t.dataKey);
            }), a.setData({
                sid: +e.liveItemData.streamId,
                title: e.liveItemData.title,
                introduction: e.liveBeforeInfo.introduction,
                onlineNumber: e.onlineNumber,
                horizontalPosterImgUrl: e.liveItemData.horizontalPosterImgUrl || "",
                liveStatus: e.liveStatus,
                liveStartTime: t(new Date(1e3 * e.liveStartTime), "MM月dd日 hh:mm"),
                liveEndInfo: e.liveEndInfo || {},
                commentKey: e.liveBeforeInfo.commentKey,
                commentFilterKey: e.liveBeforeInfo.filterKey,
                chatKey: n,
                pageLoading: !1,
                pageError: null
            }), e;
        }).catch(function(t) {
            throw console.error(t.stack), a.setData({
                pageError: t.message,
                pageLoading: !1
            }), t;
        });
    },
    getLivePoll: function(e, a) {
        var n = this;
        return o.vaccess("live_poll", {
            pollDataKey: e,
            pollContext: a || ""
        }).then(function(a) {
            if (!1 !== n.livePollTimer && (n.livePollTimer = setTimeout(function() {
                n.getLivePoll(e, a.pollContext);
            }, 1e3 * Math.min(a.pollTimeOut, 5))), n.data.liveStatus != a.liveStatus) {
                if (r("liveStatus change", n.data.liveStatus, a.liveStatus), 2 == a.liveStatus) {
                    var i = +n.data.sid;
                    n.createPlayer(i, n.data.pid);
                } else n.setData({
                    tvpUrl: d
                });
                2 != a.liveStatus && n.videoContext.pause();
            }
            n.setData({
                onlineNumber: a.onlineNumber,
                liveStatus: a.liveStatus,
                liveStartTime: t(new Date(1e3 * a.liveStartTime), "MM月dd日 hh:mm")
            });
        }).catch(function(t) {
            !1 !== n.livePollTimer && (n.livePollTimer = setTimeout(function() {
                n.getLivePoll(e, a);
            }, 2e4));
        });
    },
    initCommentList: function() {
        var t = this;
        o.vaccess("comm_before_live", {
            commentKey: this.data.commentKey,
            filterKey: this.data.commentFilterKey,
            pageContext: this.data.chatPageContext || ""
        }).then(function(a) {
            var n = [];
            (a.commentList || []).forEach(function(t) {
                var a = t.userInfo || {};
                if (t.content) if ("0" != t.rootId) {
                    var i = n.filter(function(e) {
                        return e.commentId == t.rootId;
                    })[0];
                    if (i) {
                        i.replys = i.replys || [];
                        var o = i.replys.filter(function(e) {
                            return t.parentId == e.commentId;
                        })[0];
                        i.replys.push({
                            commentId: t.commentId,
                            content: t.content,
                            time: e(t.time),
                            nick: a.actorName,
                            avatar: a.faceImageUrl,
                            parentNick: o && o.nick
                        });
                    }
                } else n.push({
                    commentId: t.commentId,
                    content: t.content,
                    time: e(t.time),
                    nick: a.actorName,
                    avatar: a.faceImageUrl
                });
            }), t.setData({
                chatPageContext: t.data.chatPageContext,
                chatlist: n.reverse()
            });
        }).catch(function(t) {
            console.error(t);
        });
    },
    chatPollTimer: null,
    initChatList: function() {
        this.getChatList(!0);
    },
    getChatList: function(t) {
        var e = this;
        o.vaccess("comm_of_chatroom", {
            commentKey: this.data.chatKey,
            pageContext: this.data.chatPageContext || "lastid=0&firstid=0&delflag=1"
        }).then(function(a) {
            a.commentList = a.commentList || [], a.hasNextPage && (e.data.chatPageContext = a.pageContext, 
            !1 !== e.chatPollTimer && (e.chatPollTimer = setTimeout(function() {
                e.getChatList();
            }, 2e4))), a.commentList.reverse().forEach(function(t, a) {
                setTimeout(function() {
                    for (var a = 0; a < e.data.chatlist.length; a++) if (e.data.chatlist[a].commentId == t.commentId) return;
                    var n = t.userInfo || {};
                    for (e.data.chatlist.push({
                        commentId: t.commentId,
                        content: t.content,
                        nick: n.actorName,
                        avatar: n.faceImageUrl,
                        parentNick: t.extraParentInfo && t.extraParentInfo.nickname
                    }); e.data.chatlist.length > 360; ) e.data.chatlist.shift();
                    var i = {
                        chatlist: e.data.chatlist
                    };
                    e.data.chatSticked && (i.scrollTop = 1e5), console.log("chatList setter", i), e.setData(i);
                }, 500 * a);
            }), e.setData({
                chatPageContext: e.data.chatPageContext,
                chatFrontPageContext: e.data.chatFrontPageContext || a.commentList.length && a.pageContext
            }), t && a.commentList.length < 4 && e.reloadChatList(!1);
        }).catch(function(t) {
            console.error(t.stack || t), !1 !== e.chatPollTimer && (e.chatPollTimer = setTimeout(function() {
                e.getChatList();
            }, 2e4));
        });
    },
    fetchEnded: !1,
    reloadChatList: function() {
        var t = this;
        !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        if (!(this.data.loadingMore || this.fetchEnded || this.data.chatlist.length > 340)) {
            this.setData({
                loadingMore: !0
            });
            var e = this.data.chatlist && this.data.chatlist[0] && this.data.chatlist[0].commentId, a = Date.now();
            o.vaccess("comm_of_chatroom", {
                commentKey: this.data.chatKey,
                pageFlag: 1,
                pageContext: this.data.chatFrontPageContext
            }).then(function(n) {
                n.hasNextPage || (t.fetchEnded = !0), n.commentList = n.commentList || [], setTimeout(function() {
                    var a = {
                        chatFrontPageContext: n.pageContext,
                        chatlist: n.commentList.map(function(t) {
                            var e = t.userInfo || {};
                            return {
                                commentId: t.commentId,
                                content: t.content,
                                nick: e.actorName,
                                avatar: e.faceImageUrl,
                                parentNick: t.extraParentInfo && t.extraParentInfo.nickname
                            };
                        }).reverse().concat(t.data.chatlist)
                    };
                    e ? a.locateChat = "chat" + e : a.scrollTop = 1e5 + Math.random(), t.setData(a);
                }, Math.max(1500 - (Date.now() - a), 0)), t.setData({
                    loadingMore: !1
                });
            }).catch(function(e) {
                t.setData({
                    loadingMore: !1
                });
            });
        }
    },
    chatStickTimer: null,
    onChatScroll: function(t) {
        t.detail.deltaY > 0 && this.setData({
            chatSticked: !1
        });
    },
    onChatScrollToUpper: function() {
        console.log("scroll to upper"), this.reloadChatList();
    },
    onChatScrollToLower: function() {
        this.setData({
            chatSticked: !0
        });
    },
    onShareAppMessage: function() {
        return {
            title: this.data.title,
            path: "/pages/live/index?ptag=share&pid=" + this.data.pid,
            complete: function() {}
        };
    },
    __onTvpPlay: function() {
        this.video && this.video.onContentPlay();
    },
    __onTvpPause: function() {
        this.video && this.video.onContentPause();
    },
    __onTvpEnded: function() {
        this.video && this.video.onContentEnd();
    },
    __onTvpTimeupdate: function(t) {
        this.video && this.video.onContentTimeupdate(null, t);
    },
    __onTvpError: function(t) {
        -1 != +t.currentTarget.dataset.contentid && -1 == t.detail.errMsg.indexOf("updateVideoPlayer") && this.video && this.video.onContentError(null, t);
    },
    __onTvpFullscreenChange: function(t) {
        this._useFullscreenMode && 0 == t.detail.fullScreen && wx.navigateBack({});
    },
    useFullscreenMode: function() {}
});