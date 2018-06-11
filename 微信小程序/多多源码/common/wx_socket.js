function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var s = function() {
    function e(e, t) {
        for (var s = 0; s < t.length; s++) {
            var i = t[s];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, s, i) {
        return s && e(t.prototype, s), i && e(t, i), t;
    };
}(), i = require("./message"), n = (e(require("./logger")), e(require("../storage/user_storage"))), a = e(require("../common/user")), o = 0, r = new (function() {
    function e() {
        t(this, e), this.socketStatus = o, this.authStatus = o, this.reconnectTimes = 0, 
        this.uid = 0, this.heartbeatHandler = null, this.intervalHandler = null, this.requestId = 1, 
        this.toSendMsgList = [], this.sentMsgList = [], this.timeoutMsgList = [], this.isLogining = !1, 
        this.loginSuccessCallback = null, this.preTime = 0, this.unreadMsgHandler = null, 
        this.unReadMsgCount = 0;
    }
    return s(e, [ {
        key: "getUid",
        value: function() {
            return this.uid;
        }
    }, {
        key: "enableBubble",
        value: function() {
            var e = {
                cmd: "enable_bubble"
            };
            this.sendSocketMessage(e), this.reset();
        }
    }, {
        key: "disableBubble",
        value: function() {
            var e = {
                cmd: "disable_bubble"
            };
            this.sendSocketMessage(e), this.reset();
        }
    }, {
        key: "getUnreadMsgCount",
        value: function() {
            function e() {
                var e = {
                    cmd: "unread_msg_count"
                };
                s.sendSocketMessage(e), s.preTime = new Date().getTime();
            }
            var t = this;
            this.unreadMsgHandler && (clearTimeout(this.unreadMsgHandler), this.unreadMsgHandler = null);
            var s = this, i = new Date().getTime();
            Math.abs(i - this.preTime) > 2e3 ? e() : this.unreadMsgHandler = setTimeout(function() {
                t.unreadMsgHandler = null, e();
            }, 2e3);
        }
    }, {
        key: "reset",
        value: function() {
            this.reconnectTimes = 0;
        }
    }, {
        key: "auth",
        value: function() {
            var e = {
                cmd: "auth",
                token: n.default.getAccessToken()
            };
            e.request_id = ++this.requestId, e.version = 2;
            var t = JSON.stringify(e);
            this.socketTask ? this.socketTask.send({
                data: t
            }) : wx.sendSocketMessage({
                data: t
            });
        }
    }, {
        key: "doReconnect",
        value: function() {
            var e = this;
            setTimeout(function() {
                e.reconnectTimes > 3 ? i.Message.emit(i.KEYS.RECONNECT_ERROR) : (e.reconnectTimes += 1, 
                e.connectToSocket(e.loginSuccessCallback));
            }, 0);
        }
    }, {
        key: "connectToSocket",
        value: function(e) {
            if (this.isSocketValid() || this.isLogining) this.isSocketValid() ? "function" == typeof e && e() : this.loginSuccessCallback = e; else {
                this.isLogining = !0, this.loginSuccessCallback = e;
                var t = this;
                a.default.requireLogin(function() {
                    if (1 === t.socketStatus) t.auth(); else {
                        var e = "wss://ws.yangkeduo.com";
                        e += "?access_token=" + n.default.getAccessToken(), e += "&role=user&client=wxapp&enable_bubble=true";
                        var s = wx.connectSocket({
                            url: e,
                            success: function() {},
                            fail: function() {
                                t.isLogining = !1, t.doReconnect();
                            }
                        });
                        t.initSocketCallback(s);
                    }
                }, function() {
                    t.isLogining = !1;
                });
            }
        }
    }, {
        key: "initSocketCallback",
        value: function(e) {
            var t = this;
            t.socketTask = e;
            var s = function() {
                t.socketStatus = 1, i.Message.emit(i.KEYS.SOCKET_OPEN);
            }, a = function() {
                t.socketStatus = 2, t.isLogining = !1, t.doReconnect(), t.handleSocketError(), i.Message.emit(i.KEYS.SOCKET_ERROR);
            }, o = function() {
                t.socketStatus = 3, t.isLogining = !1, t.doReconnect(), i.Message.emit(i.KEYS.SOCKET_CLOSED);
            }, r = function(e) {
                var s = JSON.parse(e.data), a = s.response;
                switch (t.handleMsgRecieved(s.request_id), a) {
                  case "auth":
                    t.isLogining = !1, "ok" === s.result ? (t.authStatus = 1, t.uid = s.uid, t.reconnectTimes = 0, 
                    t.handleToSendMsgList(), t.heartbeat(), t.intervalHandler || t.checkTimeoutMsg(), 
                    "function" == typeof t.loginSuccessCallback && (t.loginSuccessCallback(), t.loginSuccessCallback = null), 
                    i.Message.emit(i.KEYS.AUTH_OK), t.getUnreadMsgCount()) : (n.default.clearUserLocalInfo(), 
                    t.authStatus = 2, t.doReconnect(), i.Message.emit(i.KEYS.AUTH_FAIL));
                    break;

                  case "broadcast":
                    i.Message.emit(i.KEYS.BUBBLE_MESSAGE, s);
                    break;

                  case "unread_msg_count":
                    if (wx.setTabBarBadge && "ok" === s.result) if (t.unReadMsgCount != s.count && (i.Message.emit(i.KEYS.UNREAD_MESSAGE_COUNT), 
                    t.unReadMsgCount = s.count), s.count > 0) {
                        var o = s.count.toString();
                        wx.setTabBarBadge({
                            index: 3,
                            text: o
                        });
                    } else wx.removeTabBarBadge({
                        index: 3
                    });
                    break;

                  case "mark_read":
                  case "push":
                  case "latest_conversations":
                    t.getUnreadMsgCount(), i.Message.emit(i.KEYS.CUSTOM_SERVICE_MESSAGE, s);
                    break;

                  default:
                    i.Message.emit(i.KEYS.CUSTOM_SERVICE_MESSAGE, s);
                }
            };
            e ? (e.onOpen(s), e.onError(a), e.onClose(o), e.onMessage(r)) : (wx.onSocketOpen(s), 
            wx.onSocketError(a), wx.onSocketClose(o), wx.onSocketMessage(r));
        }
    }, {
        key: "isSocketValid",
        value: function() {
            return 1 === this.socketStatus && 1 === this.authStatus;
        }
    }, {
        key: "sendSocketMessage",
        value: function(e, t) {
            if (!e.request_id || !this.resentMsg(e.request_id, t)) {
                e.request_id = ++this.requestId, e.version = 2;
                var s = JSON.stringify(e), i = {
                    requestId: e.request_id,
                    msg: s,
                    time: Date.now(),
                    timeoutCallback: t
                };
                this.sentMsgList.push(i), this.isSocketValid() ? this.socketTask ? this.socketTask.send({
                    data: s
                }) : wx.sendSocketMessage({
                    data: s
                }) : this.doReconnect();
            }
        }
    }, {
        key: "heartbeat",
        value: function() {
            var e = this;
            this.heartbeatHandler && clearTimeout(this.heartbeatHandler), this.heartbeatHandler = setTimeout(function() {
                e.heartbeatHandler = null;
                var t = {
                    cmd: "heartbeat"
                };
                e.sendSocketMessage(t), e.heartbeat();
            }, 3e4);
        }
    }, {
        key: "checkTimeoutMsg",
        value: function() {
            var e = this;
            this.intervalHandler && (clearInterval(this.intervalHandler), this.intervalHandler = null), 
            this.intervalHandler = setInterval(function() {
                for (var t = 0; t < e.sentMsgList.length; ++t) {
                    var s = e.sentMsgList[t];
                    if (Math.abs(Date.now() - s.time) > 15e3) {
                        e.timeoutMsgList.push(s), e.sentMsgList.splice(t, 1), e.sentMsgList = [], e.doReconnect();
                        break;
                    }
                }
            }, 1e3);
        }
    }, {
        key: "handleMsgRecieved",
        value: function(e) {
            for (var t = 0; t < this.sentMsgList.length; ++t) if (this.sentMsgList[t].requestId === e) {
                this.sentMsgList.splice(t, 1);
                break;
            }
            for (var s = 0; s < this.timeoutMsgList.length; ++s) if (this.timeoutMsgList[s].requestId === e) {
                this.timeoutMsgList.splice(s, 1);
                break;
            }
        }
    }, {
        key: "handleToSendMsgList",
        value: function() {
            for (var e = 0; e < this.toSendMsgList.length; ++e) this.sendSocketMessage(this.toSendMsgList[e]);
            this.toSendMsgList = [];
        }
    }, {
        key: "handleSocketError",
        value: function() {
            for (var e = 0; e < this.sentMsgList.length; ++e) {
                var t = this.sentMsgList[e];
                this.timeoutMsgList.push(t);
            }
            this.sentMsgList = [];
        }
    }, {
        key: "resentMsg",
        value: function(e, t) {
            for (var s = 0; s < this.timeoutMsgList.length; ++s) if (this.timeoutMsgList[s].requestId === e) {
                var i = this.timeoutMsgList[s];
                return this.isSocketValid() ? (i.timeoutCallback = t, i.time = Date.now(), this.sentMsgList.push(i), 
                this.timeoutMsgList.splice(s, 1), this.socketTask ? this.socketTask.send({
                    data: i.msg
                }) : wx.sendSocketMessage({
                    data: i.msg
                })) : this.connectToSocket(this.loginSuccessCallback), !0;
            }
            return !1;
        }
    } ]), e;
}())();

exports.default = r;