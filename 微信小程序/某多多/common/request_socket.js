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
            var o = t[s];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, s, o) {
        return s && e(t.prototype, s), o && e(t, o), t;
    };
}(), o = e(require("../configs/app_config.js")), n = require("./message"), a = e(require("../constants/storage_keys")), i = e(require("../storage/user_storage")), c = e(require("../common/storage_util")), r = e(require("./system_info")), l = e(require("../constants/socket_cmd")), u = e(require("../storage/ram_manager")), d = e(require("./url_util")), h = [ "wss://ant1.pinduoduo.net/ws", "wss://ant2.pinduoduo.net/ws" ], f = 0, k = 1, g = new (function() {
    function e() {
        if (t(this, e), this.socketStatus = f, this.reconnectTimes = 0, this.connectTimes = 0, 
        this.timeoutTimes = 0, this.ctx = 1, this.heartbeatHandler = null, this.intervalHandler = null, 
        this.toSendMsgList = [], this.sentMsgList = [], r.default.getSDKVersionInt() >= 170) {
            this.checkTimeoutMsg();
            var s = this;
            n.Message.on(n.KEYS.USER_LOGIN_FINISHED, function() {
                null != i.default.getAccessToken() && (s.sendSession(), s.socketStatus = k);
            });
        }
    }
    return s(e, [ {
        key: "doReconnect",
        value: function() {
            var e = this, t = 1e3 * (Math.floor(5 * Math.random()) + 5);
            this.reconnectTimes < 3 ? setTimeout(function() {
                e.reconnectTimes++, e.connectToSocket();
            }, t) : c.default.setStorage(a.default.REQUEST_SOCKET_FAIL_DATE, Date.now());
        }
    }, {
        key: "closeSocket",
        value: function() {
            this.socketStatus = 4, this.socketTask && (this.socketTask.close(), this.socketTask = null), 
            this.handleSocketClose();
        }
    }, {
        key: "connectToSocket",
        value: function() {
            if (!(r.default.getSDKVersionInt() < 170 || Date.now() - c.default.getStorageSync(a.default.REQUEST_SOCKET_FAIL_DATE) < 36e5 || this.isSocketOpen())) {
                var e = this, t = i.default.getUserId() + this.connectTimes++, s = h[0];
                h[t % 2] && (s = h[t % 2]), this.socketStatus = k;
                var o = wx.connectSocket({
                    url: s,
                    header: {
                        "content-type": "application/json"
                    },
                    method: "POST",
                    success: function() {
                        e.heartbeat(), console.log("request socket connect------------------------success");
                    },
                    fail: function() {
                        console.log("request socket connect------------------------fail");
                    }
                });
                e.initSocketCallback(o);
            }
        }
    }, {
        key: "initSocketCallback",
        value: function(e) {
            if (e) {
                var t = this;
                t.socketTask = e;
                e && (e.onOpen(function() {
                    t.sendSession();
                }), e.onError(function() {
                    t.socketStatus = 3, t.closeSocket();
                }), e.onClose(function() {
                    t.socketStatus = 4, t.socketTask && (t.socketTask = null), t.doReconnect();
                }), e.onMessage(function(e) {
                    var s = JSON.parse(e.data);
                    t.timeoutTimes = 0, t.handleMsgRecieved(s), t.heartbeat();
                }));
            }
        }
    }, {
        key: "isSocketValid",
        value: function() {
            return 2 === this.socketStatus || this.socketStatus === k;
        }
    }, {
        key: "isSocketOpen",
        value: function() {
            return 2 === this.socketStatus && this.socketTask;
        }
    }, {
        key: "request",
        value: function(e) {
            var t = l.default[e.cmdId], s = e.restfulParam || "", o = e.url.split("?")[1] || " ", n = " ";
            if ("GET" == e.method) {
                var a = d.default.buildQuery(e.data);
                a && (a = "&" + a), o += a || " ";
            } else n = JSON.stringify(e.data) || " ";
            var i = s + (s ? "|" : "") + o + "|" + n, c = {
                cmd: t.cmdId,
                ctx: this.ctx++,
                payload: i
            };
            this.sendSocketMessage(c, function(t) {
                t || (t = {}), t.isSocket = !0, e.complete(t);
            });
        }
    }, {
        key: "sendSocketMessage",
        value: function(e, t) {
            var s = this, o = JSON.stringify(e), n = {
                ctx: e.ctx,
                time: Date.now(),
                param: e,
                complete: t
            };
            this.isSocketOpen() || 0 == e.cmd && this.socketTask ? this.socketTask.send({
                data: o,
                success: function() {
                    t && s.sentMsgList.push(n);
                },
                fail: function(e) {
                    n.complete && n.complete({
                        errMsg: "socket request:fail - " + JSON.stringify(e)
                    }), s.timeoutTimes++, s.timeoutTimes >= 3 && s.closeSocket();
                }
            }) : this.toSendMsgList.push(n);
        }
    }, {
        key: "sendSession",
        value: function() {
            var e = this, t = i.default.getUserId(), s = i.default.getAccessToken(), n = "";
            t && s && (n = "|6:" + s + "|7:" + t);
            var a = "0:" + o.default.version + n + "|8:2", c = {
                cmd: 0,
                ctx: this.ctx++,
                payload: a
            };
            this.socketTask && this.sendSocketMessage(c, function(t) {
                0 == t.statusCode ? (e.socketStatus = 2, e.timeoutTimes = 0, e.reconnectTimes = 0, 
                e.handleToSendMsgList(), console.log("request socket session------------------------success")) : (e.socketStatus = 5, 
                e.handleSocketClose("session fail"), console.log("request socket session------------------------fail"));
            });
        }
    }, {
        key: "heartbeat",
        value: function() {
            var e = this;
            this.heartbeatHandler && clearTimeout(this.heartbeatHandler), this.heartbeatHandler = setTimeout(function() {
                e.heartbeatHandler = null;
                var t = {
                    cmd: 1,
                    ctx: e.ctx++
                };
                e.sendSocketMessage(t), e.heartbeat();
            }, 45e3);
        }
    }, {
        key: "checkTimeoutMsg",
        value: function() {
            var e = this;
            this.intervalHandler && (clearInterval(this.intervalHandler), this.intervalHandler = null), 
            this.intervalHandler = setInterval(function() {
                var t = 1e4;
                "none" == u.default.networkType ? t = 0 : "2g" == u.default.networkType ? t = 15e3 : "4g" == u.default.networkType && (t = 5e3);
                for (var s = 0; s < e.sentMsgList.length; ++s) {
                    var o = e.sentMsgList[s];
                    Math.abs(Date.now() - o.time) > t && (e.sentMsgList.splice(s, 1), o.complete && o.complete({
                        errMsg: "socket request:fail timeout"
                    }), e.timeoutTimes++);
                }
                for (var n = 0; n < e.toSendMsgList.length; ++n) {
                    var a = e.toSendMsgList[n];
                    Math.abs(Date.now() - a.time) > t && (e.toSendMsgList.splice(n, 1), a.complete && a.complete({
                        errMsg: "socket request:fail timeout"
                    }), e.timeoutTimes++);
                }
                e.timeoutTimes >= 3 && e.closeSocket();
            }, 1e3);
        }
    }, {
        key: "handleMsgRecieved",
        value: function(e) {
            for (var t = 0; t < this.sentMsgList.length; ++t) {
                var s = this.sentMsgList[t];
                if (s.ctx === e.ctx) {
                    if (this.sentMsgList.splice(t, 1), e.payload) {
                        var o = e.payload.indexOf(","), n = e.payload.substring(0, o), a = e.payload.substring(o + 1);
                        n = this.handleStatusCode(n, s.param.cmd);
                        var i = void 0;
                        try {
                            i = JSON.parse(a);
                        } catch (e) {
                            i = a;
                        }
                        s.complete && s.complete({
                            errMsg: "socket request:ok",
                            statusCode: n,
                            data: i
                        });
                    } else s.complete && s.complete({
                        errMsg: "socket request:fail - no payload"
                    });
                    break;
                }
            }
        }
    }, {
        key: "handleStatusCode",
        value: function(e, t) {
            if ("701" == e) return "40001";
            if ("812" == e) u.default.noSocketRequest = !0; else if (("3" == e || "4" == e || "500" == e || "502" == e || "404" == e || "810" == e) && (u.default.socketReuqestBlockList[t] = !0, 
            "3" == e || "4" == e)) return "501";
            return e;
        }
    }, {
        key: "handleToSendMsgList",
        value: function() {
            for (var e = 0; e < this.toSendMsgList.length; ++e) this.sendSocketMessage(this.toSendMsgList[e].param, this.toSendMsgList[e].complete);
            this.toSendMsgList = [];
        }
    }, {
        key: "handleSocketClose",
        value: function(e) {
            var t = this.sentMsgList;
            this.sentMsgList = [];
            for (var s = 0; s < t.length; ++s) {
                var o = t[s];
                o.complete && o.complete({
                    errMsg: "socket request:fail - " + (e || "socket close")
                });
            }
            var n = this.toSendMsgList;
            this.toSendMsgList = [];
            for (var a = 0; a < n.length; ++a) {
                var i = n[a];
                i.complete && i.complete({
                    errMsg: "socket request:fail - " + (e || "socket close")
                });
            }
        }
    } ]), e;
}())();

exports.default = g;