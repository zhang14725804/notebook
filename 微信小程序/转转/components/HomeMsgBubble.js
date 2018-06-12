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
            function r(o, s) {
                try {
                    var a = t[o](s), u = a.value;
                } catch (e) {
                    return void n(e);
                }
                if (!a.done) return Promise.resolve(u).then(function(e) {
                    r("next", e);
                }, function(e) {
                    r("throw", e);
                });
                e(u);
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
}), exports.default = void 0;

var _slicedToArray = function() {
    function e(e, t) {
        var n = [], r = !0, o = !1, s = void 0;
        try {
            for (var a, u = e[Symbol.iterator](); !(r = (a = u.next()).done) && (n.push(a.value), 
            !t || n.length !== t); r = !0) ;
        } catch (e) {
            o = !0, s = e;
        } finally {
            try {
                !r && u.return && u.return();
            } finally {
                if (o) throw s;
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
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _messages = require("./../store/messages.js"), _messages2 = _interopRequireDefault(_messages), HomeMsgBubble = function(e) {
    function t() {
        var e, n, r, o;
        _classCallCheck(this, t);
        for (var s = arguments.length, a = Array(s), u = 0; u < s; u++) a[u] = arguments[u];
        return n = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        r.props = {
            unreadMessage: {
                type: Number,
                twoWay: !0
            },
            showBubble: {
                type: Boolean,
                default: !1
            }
        }, r.data = {
            unreadMsgCount: 0,
            unreadCommentsCount: 0,
            queryInterval: 6e4,
            pauseConfig: {},
            isIphoneX: !1
        }, r.computed = {
            hints: function() {
                var e = [];
                return this.unreadMsgCount > 0 && e.push("私信" + this.unreadMsgCount), this.unreadCommentsCount > 0 && e.push("留言" + this.unreadCommentsCount), 
                e;
            },
            msg: function() {
                return this.unreadMessage = this.unreadCommentsCount + this.unreadMsgCount, this.hints.join("，");
            }
        }, r.methods = {}, r.events = {
            pageShow: function() {
                this.unreadCommentsCount = _messages2.default.localUnknownComCount, this.unreadMsgCount = _messages2.default.localUnknownOfflines.length, 
                this.pauseConfig = {
                    pause: !1
                }, this.intervalQuery(this.pauseConfig);
            },
            pageHide: function() {
                this.pauseConfig.pause = !0;
            }
        }, o = n, _possibleConstructorReturn(r, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "msgFilter",
        value: function(e) {
            return !e.msg_data || "push_notify" !== e.msg_data.sub_cmd || !e.msg_data.msg_data;
        }
    }, {
        key: "onLoad",
        value: function() {
            this.isIphoneX = this.$root.$parent.globalData.isIphoneX;
        }
    }, {
        key: "queryUnreads",
        value: function() {
            function e() {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e() {
                var t, n, r, o, s, a, u, i, l, c, f, p, h, m = this;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        if (this.$loginCenter.zzUserInfo.uid) {
                            e.next = 6;
                            break;
                        }
                        return e.next = 3, new Promise(function(e, t) {
                            m.$loginCenter.login(e);
                        });

                      case 3:
                        if (n = e.sent, 0 == n.code) {
                            e.next = 6;
                            break;
                        }
                        return e.abrupt("return");

                      case 6:
                        return r = this.$httpWithLogin({
                            url: "https://gr.zhuanzhuan.com/user_login",
                            data: {
                                uid: this.$loginCenter.zzUserInfo.uid,
                                source: 103,
                                pc_code: "weixin",
                                client_version: "1.0.0"
                            }
                        }), o = this.$httpWithLogin({
                            url: "https://app.zhuanzhuan.com/zz/transfer/getNewUnreadCommentsCount",
                            data: {},
                            method: "POST"
                        }), e.next = 10, r;

                      case 10:
                        if (s = e.sent, 2e5 == s.code) {
                            e.next = 13;
                            break;
                        }
                        return e.abrupt("return");

                      case 13:
                        return a = this.$httpWithLogin({
                            url: "https://gr.zhuanzhuan.com/msg_offline",
                            data: {
                                source: 103,
                                uid: this.$loginCenter.zzUserInfo.uid,
                                start_time: 0,
                                start_id: 0
                            }
                        }), e.next = 16, Promise.all([ o, a ]);

                      case 16:
                        u = e.sent, i = _slicedToArray(u, 2), l = i[0], c = i[1], f = parseInt(l.respData.count) - _messages2.default.localKnownComCount, 
                        f = Math.max(0, f), _messages2.default.localUnknownComCount = f, p = c.protocol_content.msgs.filter(this.msgFilter), 
                        (t = _messages2.default.localUnknownOfflines).push.apply(t, _toConsumableArray(p)), 
                        h = _messages2.default.localUnknownOfflines.length, this.unreadMsgCount = h, this.unreadCommentsCount = f, 
                        this.$apply();

                      case 29:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    }, {
        key: "intervalQuery",
        value: function() {
            function e(e) {
                return t.apply(this, arguments);
            }
            var t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
                var n;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                      case 0:
                        n = function(e) {
                            return new Promise(function(t, n) {
                                setTimeout(t, e);
                            });
                        };

                      case 1:
                        if (t.pause) {
                            e.next = 8;
                            break;
                        }
                        return e.next = 4, this.queryUnreads();

                      case 4:
                        return e.next = 6, n(this.queryInterval);

                      case 6:
                        e.next = 1;
                        break;

                      case 8:
                      case "end":
                        return e.stop();
                    }
                }, e, this);
            }));
            return e;
        }()
    } ]), t;
}(_wepy2.default.component);

exports.default = HomeMsgBubble;