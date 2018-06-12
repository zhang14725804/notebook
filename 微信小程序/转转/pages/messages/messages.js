function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _toConsumableArray(e) {
    if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
    }
    return Array.from(e);
}

function _asyncToGenerator(e) {
    return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
            function r(a, i) {
                try {
                    var o = t[a](i), s = o.value;
                } catch (e) {
                    return void n(e);
                }
                if (!o.done) return Promise.resolve(s).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(s);
            }
            return r("next");
        });
    };
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _slicedToArray = function() {
    function e(e, t) {
        var n = [], r = !0, a = !1, i = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(r = (o = s.next()).done) && (n.push(o.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            a = !0, i = e;
        } finally {
            try {
                !r && s.return && s.return();
            } finally {
                if (a) throw i;
            }
        }
        return n;
    }
    return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), _createClass = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _handleImg = require("./../../lib/handleImg.js"), _handleImg2 = _interopRequireDefault(_handleImg), _funcKit = require("./../../lib/funcKit.js"), _messages = require("./../../store/messages.js"), _messages2 = _interopRequireDefault(_messages), _wxPromise = require("./../../lib/wxPromise.js"), _PageFrame = require("./../../components/common/PageFrame.js"), _PageFrame2 = _interopRequireDefault(_PageFrame), _Guide4GZH = require("./../../components/common/Guide4GZH.js"), _Guide4GZH2 = _interopRequireDefault(_Guide4GZH), _TipBar = require("./../../components/common/TipBar.js"), _TipBar2 = _interopRequireDefault(_TipBar), _operationKit = require("./../../lib/operationKit.js"), Messages = function(e) {
    function t() {
        var e, n, r, a;
        _classCallCheck(this, t);
        for (var i = arguments.length, o = Array(i), s = 0; s < i; s++) o[s] = arguments[s];
        return n = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(o))), 
        r.config = {
            navigationBarTitleText: "消息中心",
            enablePullDownRefresh: !0,
            backgroundTextStyle: "dark",
            backgroundColor: "#f1f3f6"
        }, r.components = {
            PageFrame: _PageFrame2.default,
            Guide4GZH: _Guide4GZH2.default,
            TipBar: _TipBar2.default
        }, r.data = {
            commentsEntry: {
                icon: "../../images/messages/comments.png",
                title: "留言",
                content: "",
                unreadCount: 0
            },
            contacts: [],
            contactsLoaded: !1,
            contactsLoadFailed: !1,
            queryInterval: 6e4,
            pauseConfig: {
                pause: !1
            },
            pxPerRpx: 1,
            slideDelete: {
                msgId: "",
                readyWidth: 120,
                lastX: "",
                deltaX: 0,
                ending: !1,
                reverting: !1
            },
            stackedOfflines: [],
            osType: ""
        }, r.computed = {
            slideWidth: function() {
                var e = this.slideDelete.readyWidth * this.pxPerRpx, t = this.slideDelete.deltaX, n = void 0;
                return this.slideDelete.reverting ? (n = t < 0 ? -e : -Math.max(e - t, 0), this.slideDelete.ending && (n = 0)) : (n = t > 0 ? 0 : -Math.min(-t, e), 
                this.slideDelete.ending && (n = -e)), n;
            }
        }, r.methods = {
            clickGZHGuide: function() {
                this.$wxPromise.navigateTo({
                    url: "/subPages/other/guide4GZH/guide4GZH?channel=D"
                }), this.$log("click-message-broadcast");
            },
            onCommentsEntry: function() {
                _wxPromise.wxPromise.navigateTo({
                    url: "/subPages/message/comments/comments"
                }), this.$log("MESSAGES-CLICK-COMMENT");
            },
            onContactTap: function(e, t) {
                _wxPromise.wxPromise.navigateTo({
                    url: "/subPages/message/chat/chat?userId=" + e + "&infoId=" + t
                });
                var n = !0, r = !1, a = void 0;
                try {
                    for (var i, o = this.contacts[Symbol.iterator](); !(n = (i = o.next()).done); n = !0) {
                        var s = i.value;
                        s.uid == e && (s.unreadCount = 0);
                    }
                } catch (e) {
                    r = !0, a = e;
                } finally {
                    try {
                        !n && o.return && o.return();
                    } finally {
                        if (r) throw a;
                    }
                }
                this.$log("MESSAGES-CLICK-CAHT");
            },
            onContactTouchStart: function(e) {
                0 == this.slideWidth && (this.slideDelete.msgId = e.currentTarget.dataset.msgId), 
                this.slideDelete.reverting = this.slideWidth < 0, this.slideDelete.lastX = e.touches[0].clientX, 
                this.slideDelete.deltaX = 0, this.slideDelete.ending = !1;
            },
            onContactTouchMove: function(e) {
                var t = e.touches[0].clientX, n = this.slideDelete.lastX;
                this.slideDelete.lastX = t, this.slideDelete.deltaX += t - n;
            },
            onContactTouchEnd: function(e) {
                (this.slideDelete.reverting || 0 != this.slideWidth) && (this.slideDelete.ending = !0);
            },
            onHomeTouchStart: function(e) {
                this.slideDelete.deltaX = 0;
            },
            onContactDelete: function(e) {
                this.contacts = this.contacts.filter(function(t) {
                    return t.msgId != e;
                });
            },
            stopPropagation: function(e) {}
        }, r.events = {}, a = n, _possibleConstructorReturn(r, a);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "pullComments",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, n, r, a, i, o;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return t = this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getNewUnreadCommentsCount",
                            data: {},
                            method: "POST"
                        }), n = this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getNewLastComment",
                            data: {
                                uid: this.$loginCenter.zzUserInfo.uid
                            },
                            method: "POST"
                        }), e.next = 4, Promise.all([ t, n ]);

                      case 4:
                        r = e.sent, a = _slicedToArray(r, 2), i = a[0], o = a[1], this.commentsEntry.unreadCount = parseInt(i.respData.count), 
                        _messages2.default.localKnownComCount = this.commentsEntry.unreadCount, _messages2.default.localReadComCount = 0, 
                        this.commentsEntry.content = void 0 != o.respData.comment ? o.respData.nickName + "：" + o.respData.comment : "还没收到过留言哦", 
                        this.$apply();

                      case 13:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "mergeContactMsgs",
        value: function(e, t, n) {
            function r(e, t) {
                var n = [], r = !0, i = !1, o = void 0;
                try {
                    for (var s, u = t[Symbol.iterator](); !(r = (s = u.next()).done); r = !0) {
                        var c = s.value, l = !1, d = !0, h = !1, f = void 0;
                        try {
                            for (var m, p = e[Symbol.iterator](); !(d = (m = p.next()).done); d = !0) {
                                var g = m.value;
                                if (g.uid == c.uid) {
                                    a(g, c), l = !0;
                                    break;
                                }
                            }
                        } catch (e) {
                            h = !0, f = e;
                        } finally {
                            try {
                                !d && p.return && p.return();
                            } finally {
                                if (h) throw f;
                            }
                        }
                        if (!l) {
                            var y = !1, v = !0, _ = !1, b = void 0;
                            try {
                                for (var C, w = n[Symbol.iterator](); !(v = (C = w.next()).done); v = !0) {
                                    var x = C.value;
                                    if (x.uid == c.uid) {
                                        a(x, c), y = !0;
                                        break;
                                    }
                                }
                            } catch (e) {
                                _ = !0, b = e;
                            } finally {
                                try {
                                    !v && w.return && w.return();
                                } finally {
                                    if (_) throw b;
                                }
                            }
                            !y && n.push(c);
                        }
                    }
                } catch (e) {
                    i = !0, o = e;
                } finally {
                    try {
                        !r && u.return && u.return();
                    } finally {
                        if (i) throw o;
                    }
                }
                e.push.apply(e, n);
            }
            function a(e, t) {
                var n = e.timestamp > t.timestamp ? e : t, r = n == t ? e : t;
                Object.assign(e, n, {
                    unreadCount: e.unreadCount + t.unreadCount,
                    infoId: n.infoId || r.infoId
                });
            }
            var i = e.map(function(e) {
                return {
                    type: "chat",
                    msgNote: "",
                    msgId: e.msg_id,
                    timestamp: parseInt(1e3 * e.msg_timestamp),
                    datetime: (0, _funcKit.semanticTime)(1e3 * e.msg_timestamp),
                    uid: e.uid,
                    content: e.msg_content.text || (e.msg_content.capimg ? "[图片消息]" : "[非文本消息]"),
                    infoId: e.msg_content.userdata && e.msg_content.userdata.sid || "",
                    nickname: "",
                    avatar: "",
                    userLabels: "",
                    goodImg: "",
                    unreadCount: 0
                };
            }), o = n.map(function(e) {
                return {
                    type: "order",
                    msgNote: "[订单消息]",
                    msgId: e.msgId,
                    timestamp: parseInt(e.timestamp),
                    datetime: (0, _funcKit.semanticTime)(e.timestamp),
                    uid: e.uid,
                    content: e.status,
                    orderId: e.orderId,
                    infoId: "",
                    nickname: e.nickName,
                    avatar: e.portrait,
                    userLabels: e.userLabels,
                    goodImg: _handleImg2.default.handleSingle(e.pic),
                    unreadCount: 0
                };
            }), s = this.$loginCenter.zzUserInfo.uid, u = !0, c = !1, l = void 0;
            try {
                for (var d, h = t[Symbol.iterator](); !(u = (d = h.next()).done); u = !0) {
                    var f = d.value;
                    "push_notify" == f.msg_data.sub_cmd ? function(e) {
                        var t = !0, n = !1, r = void 0;
                        try {
                            for (var a, i = o[Symbol.iterator](); !(t = (a = i.next()).done); t = !0) {
                                var s = a.value;
                                if (s.msgId == e) return void ++s.unreadCount;
                            }
                        } catch (e) {
                            n = !0, r = e;
                        } finally {
                            try {
                                !t && i.return && i.return();
                            } finally {
                                if (n) throw r;
                            }
                        }
                    }(f.msg_data.msgid) : "tmp_notify" == f.msg_data.sub_cmd && function(e) {
                        var t = !0, n = !1, r = void 0;
                        try {
                            for (var a, o = i[Symbol.iterator](); !(t = (a = o.next()).done); t = !0) {
                                var s = a.value;
                                if (s.uid == e) return void ++s.unreadCount;
                            }
                        } catch (e) {
                            n = !0, r = e;
                        } finally {
                            try {
                                !t && o.return && o.return();
                            } finally {
                                if (n) throw r;
                            }
                        }
                    }(f.msg_data.from_uid == s ? f.msg_data.to_uid : f.msg_data.from_uid);
                }
            } catch (e) {
                c = !0, l = e;
            } finally {
                try {
                    !u && h.return && h.return();
                } finally {
                    if (c) throw l;
                }
            }
            return r(i, o), r(i, this.contacts), i.sort(function(e, t) {
                return t.timestamp - e.timestamp;
            }), i;
        }
    }, {
        key: "pullContacts",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, n, r, a, i, o, s, u, c, l, d, h, f, m, p, g, y, v, _, b;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, this.$httpWithLogin({
                            url: "https://gr.zhuanzhuan.com/user_login",
                            data: {
                                uid: this.$loginCenter.zzUserInfo.uid,
                                source: 103,
                                pc_code: "weixin",
                                client_version: "1.0.0"
                            }
                        });

                      case 2:
                        if (t = e.sent, 2e5 == t.code) {
                            e.next = 5;
                            break;
                        }
                        return e.abrupt("return");

                      case 5:
                        return n = this.$httpWithLogin({
                            url: "https://gr.zhuanzhuan.com/getlastcontacts",
                            data: {
                                pagenum: 1,
                                pagesize: 40,
                                source: 103,
                                uid: this.$loginCenter.zzUserInfo.uid
                            }
                        }), r = this.$httpWithLogin({
                            url: "https://gr.zhuanzhuan.com/msg_offline",
                            data: {
                                source: 103,
                                uid: this.$loginCenter.zzUserInfo.uid,
                                start_time: 0,
                                start_id: 0
                            }
                        }), a = this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getOrderMsg",
                            data: {
                                pageNum: 1,
                                pageSize: 60
                            }
                        }), e.next = 10, Promise.all([ n, r, a ]);

                      case 10:
                        if (i = e.sent, o = _slicedToArray(i, 3), s = o[0], u = o[1], c = o[2], 2e5 == s.code && 2e5 == u.code && 0 == c.respCode) {
                            e.next = 17;
                            break;
                        }
                        return e.abrupt("return");

                      case 17:
                        return l = u.protocol_content.msgs.concat(this.stackedOfflines), this.stackedOfflines = [], 
                        d = this.mergeContactMsgs(s.protocol_content.contact_infos, l, c.respData), this.contacts = d, 
                        this.contactsLoaded = !0, this.$apply(), h = this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getNickNameAndPhoto",
                            data: {
                                userids: d.map(function(e) {
                                    return e.uid;
                                }).join(",")
                            },
                            method: "POST"
                        }), f = this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/batchgetinfopics",
                            data: {
                                infoIds: d.filter(function(e) {
                                    return !!e.infoId;
                                }).map(function(e) {
                                    return e.infoId;
                                }).join(",")
                            },
                            method: "POST"
                        }), e.next = 27, Promise.all([ h, f ]);

                      case 27:
                        m = e.sent, p = _slicedToArray(m, 2), g = p[0], y = p[1];
                        for (v in g.respData) for (_ = 0; _ < d.length; ++_) d[_].uid == v && (b = g.respData[v], 
                        Object.assign(d[_], {
                            nickname: b.nickName,
                            avatar: b.portrait,
                            relationship: b.relationship,
                            userLabels: (0, _funcKit.semanticUserLabels)(b.userLabels)
                        }));
                        return y.respData.list.forEach(function(e, t) {
                            var n = !0, r = !1, a = void 0;
                            try {
                                for (var i, o = d[Symbol.iterator](); !(n = (i = o.next()).done); n = !0) {
                                    var s = i.value;
                                    s.infoId == e.infoId && (s.goodImg = _handleImg2.default.handleSingle(e.pic));
                                }
                            } catch (e) {
                                r = !0, a = e;
                            } finally {
                                try {
                                    !n && o.return && o.return();
                                } finally {
                                    if (r) throw a;
                                }
                            }
                        }), this.contacts = d, this.contactsLoaded = !0, this.$apply(), e.abrupt("return", "ok");

                      case 37:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "pullData",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                var n, r, a, i, o, s = this;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.next = 2, new Promise(function(e, t) {
                            s.$loginCenter.login(e);
                        });

                      case 2:
                        if (n = e.sent, 0 == n.code) {
                            e.next = 7;
                            break;
                        }
                        return this.contactsLoadFailed = !0, this.$apply(), e.abrupt("return");

                      case 7:
                        if (t.pause) {
                            e.next = 30;
                            break;
                        }
                        return e.prev = 8, this.contactsLoadFailed = !1, this.$apply(), e.next = 13, Promise.all([ this.pullComments(), this.pullContacts() ]);

                      case 13:
                        r = e.sent, a = _slicedToArray(r, 2), i = a[0], o = a[1], this.contactsLoadFailed = "ok" != o, 
                        this.$apply(), e.next = 26;
                        break;

                      case 21:
                        e.prev = 21, e.t0 = e.catch(8), console.log("[messages.vue] error when pull data:", e.t0), 
                        this.contactsLoadFailed = !0, this.$apply();

                      case 26:
                        return e.next = 28, (0, _operationKit.delay)(this.queryInterval);

                      case 28:
                        e.next = 7;
                        break;

                      case 30:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 8, 21 ] ]);
            }));
            return e;
        }()
    }, {
        key: "showGZHGuideBroadcast",
        value: function(e) {
            this.$invoke("TipBar", "open", {
                icon: "https://img.58cdn.com.cn/zhuanzhuan/zzwa/main/GZH_guide/broadcast.png",
                content: "关注转转公众号，不错过任何咨询和回复>>"
            });
        }
    }, {
        key: "onLoad",
        value: function() {
            var e = this;
            wx.getSystemInfo({
                success: function(t) {
                    e.osType = t.system.toLowerCase().includes("ios") ? "ios" : "android", e.$apply();
                }
            }), this.$invoke("Guide4GZH", "requestGZHGuide", "D").then(function(t) {
                t.mainTitle && e.showGZHGuideBroadcast(t.mainTitle);
            }), this.$log("VIEW");
        }
    }, {
        key: "onShow",
        value: function() {
            var e;
            this.refreshPage(), this.commentsEntry.unreadCount = Math.max(this.commentsEntry.unreadCount - _messages2.default.localReadComCount, 0), 
            (e = this.stackedOfflines).push.apply(e, _toConsumableArray(_messages2.default.localUnknownOfflines)), 
            _messages2.default.localUnknownOfflines = [], _messages2.default.localKnownComCount += _messages2.default.localUnknownComCount, 
            _messages2.default.localUnknownComCount = 0;
        }
    }, {
        key: "onHide",
        value: function() {
            this.pauseConfig.pause = !0;
        }
    }, {
        key: "onReady",
        value: function() {
            var e = wx.getSystemInfoSync();
            this.pxPerRpx = e.windowWidth / 750;
        }
    }, {
        key: "refreshPage",
        value: function() {
            this.pauseConfig.pause = !0, this.pauseConfig = {
                pause: !1
            }, this.pullData(this.pauseConfig);
        }
    }, {
        key: "onPullDownRefresh",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        return e.prev = 0, e.next = 3, Promise.all([ this.refreshPage(), (0, _operationKit.delay)(500) ]);

                      case 3:
                        e.next = 8;
                        break;

                      case 5:
                        e.prev = 5, e.t0 = e.catch(0), console.error(e.t0);

                      case 8:
                        wx.stopPullDownRefresh();

                      case 9:
                      case "end":
                        return e.stop();
                    }
                }, e, this, [ [ 0, 5 ] ]);
            }));
            return e;
        }()
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Messages, "pages/messages/messages"));