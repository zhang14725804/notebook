function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./data_util")), r = e(require("./url_util")), n = e(require("../configs/app_config")), o = e(require("./object_util")), i = e(require("./system_info")), a = e(require("./request")), s = e(require("../storage/ram_manager")), d = e(require("../libs/co/we-index")), u = e(require("../libs/regenerator-runtime/runtime")), g = require("./message"), c = e(require("./logger_util")), f = e(require("../storage/user_storage")), l = e(require("./visitor_logger")), _ = {
    monitorLogArray: [],
    isMonitorSending: !1,
    failedMonitorLogs: [],
    trackLogArray: [],
    isTrackSending: !1,
    failedTrackLogs: [],
    addMsgObserver: function() {
        var e = this;
        g.Message.on(g.KEYS.MONITOR_FROM_REQUEST, function(t) {
            e.sendMonitor(t);
        }), g.Message.on(g.KEYS.SOCKET_OPEN, function(t) {
            t = o.default.assign({
                socket_type: "SOCKET_OPEN",
                record_type: "WEB_SOCKET"
            }, t), e.sendMonitor(t);
        }), g.Message.on(g.KEYS.SOCKET_ERROR, function(t) {
            t = o.default.assign({
                socket_type: "SOCKET_ERROR",
                record_type: "WEB_SOCKET"
            }, t), e.sendMonitor(t);
        }), g.Message.on(g.KEYS.SOCKET_CLOSED, function(t) {
            t = o.default.assign({
                socket_type: "SOCKET_CLOSED",
                record_type: "WEB_SOCKET"
            }, t), e.sendMonitor(t);
        }), g.Message.on(g.KEYS.AUTH_OK, function(t) {
            t = o.default.assign({
                auth_type: "AUTH_OK",
                record_type: "WEB_SOCKET"
            }, t), e.sendMonitor(t);
        }), g.Message.on(g.KEYS.UNDEFINED_EVENT_TYPE, function(t) {
            t = o.default.assign({
                event_type: "UNDEFINED",
                record_type: "EVENT_TYPE"
            }, t), e.sendMonitor(t);
        }), g.Message.on(g.KEYS.AUTH_FAIL, function(t) {
            t = o.default.assign({
                auth_type: "AUTH_FAIL",
                record_type: "WEB_SOCKET"
            }, t), e.sendMonitor(t);
        }), g.Message.on(g.KEYS.STORAGE_FAIL, function(t) {
            t = o.default.assign({
                record_type: "LOCAL_STORAGE"
            }, t), e.sendMonitor(t);
        }), g.Message.on(g.KEYS.ORDER_CHECKOUT_PAY, function(t) {
            "requestPayment:ok" !== t.errorMsg && (t = o.default.assign({
                record_type: "PAY_FAILED"
            }, t), e.sendMonitor(t));
        });
    },
    send: function(e, t) {
        if (e) {
            var o = this;
            (0, d.default)(u.default.mark(function i() {
                var d, g;
                return u.default.wrap(function(i) {
                    for (;;) switch (i.prev = i.next) {
                      case 0:
                        e = c.default.getData(e), s.default.openId && (e.openId = s.default.openId), d = r.default.buildQuery(e), 
                        (g = s.default.logginURL) || (g = n.default.logginURL), a.default.apiRequest("POST", g, d, !0, {
                            dontAddUidAndFlag: !0
                        }).then(function() {}, function() {
                            o.trackLogArray.push(e);
                        }), "function" == typeof t && t();

                      case 7:
                      case "end":
                        return i.stop();
                    }
                }, i, this);
            }));
        }
    },
    canReport: function(e) {
        var t = e.request_url || "", r = e.status || "FAILED";
        if (t.indexOf("p.gif") >= 0) return !1;
        if (t.indexOf("t.gif") >= 0 && "SUCCESS" == r) return !1;
        var n = s.default.blockLevel, o = !0;
        return -1 == n ? o = !1 : 0 == n ? o = !0 : 1 == n ? "WEB_SOCKET" == e.record_type && (o = !1) : 2 == n ? "WEB_SOCKET" != e.record_type && "PAGE_INIT_TIME" != e.record_type || (o = !1) : o = 3 == n ? "NETWORK_TIME" == e.record_type : 4 != n || ("NETWORK_TIME" == e.record_type ? "FAILED" == r : "WEB_SOCKET" != e.record_type), 
        o;
    },
    sendMonitor: function(e) {
        if (e && this.canReport(e)) {
            var r = i.default.getSystemInfoSync(), a = {
                screen_width: r.screenWidth,
                screen_height: r.screenHeight,
                dpr: r.pixelRatio,
                app_version: n.default.version,
                time: Date.now() + s.default.timeDiff,
                scene_id: s.default.sceneId,
                mobile_model: r.model,
                mobile_platform: r.platform,
                mobile_system: r.system,
                wx_version: r.version,
                sdk_version: r.SDKVersion || "sdk_version is empty",
                network_type: s.default.networkType,
                log_id: t.default.getLogId(),
                user_id: "LOCAL_STORAGE" == e.record_type ? "user_id is empty" : f.default.getUserId() || "user_id is empty",
                trace_id: "LOCAL_STORAGE" == e.record_type ? "trace_id is empty" : l.default.getVisitorLocalInfo().xcxTraceId || "trace_id is empty"
            };
            e = o.default.assign({}, a, e), this.monitorLogArray.push(e), this.monitorLogArray.length + this.failedMonitorLogs.length >= 10 && this.execSendMonitorLog();
        }
    },
    triggerSendMutiLog: function() {
        this.execSendTrackLog(), this.execSendMonitorLog();
    },
    execSendMonitorLog: function() {
        var e = this;
        try {
            var t = s.default.monitorUrl;
            if (e.isMonitorSending || !t) return;
            var n = e.monitorLogArray;
            if (e.failedMonitorLogs.length > 0 && (n = e.monitorLogArray.concat(e.failedMonitorLogs), 
            e.failedMonitorLogs = []), e.monitorLogArray = [], 0 == n.length) return;
            var o = n.map(function(e) {
                return r.default.buildQuery(e);
            }).join("\n");
            o.indexOf("t.gif") > 0 && (t += "?has_log_error=1"), e.isMonitorSending = !0, a.default.apiRequest("POST", t, o, !0).then(function() {
                e.isMonitorSending = !1, e.monitorLogArray.length + e.failedMonitorLogs.length >= 10 && e.execSendMonitorLog();
            }, function() {
                e.isMonitorSending = !1, e.failedMonitorLogs = n;
            });
        } catch (t) {
            e.isMonitorSending = !1, console.error(t);
        }
    },
    execSendTrackLog: function() {
        function e(e) {
            t.isTrackSending = !1, e ? t.trackLogArray.length > 0 && t.execSendTrackLog() : t.failedTrackLogs = o;
        }
        var t = this;
        if (!this.isTrackSending) {
            var o = this.trackLogArray.concat(this.failedTrackLogs);
            if (this.trackLogArray = [], this.failedTrackLogs = [], !(o.length <= 0)) {
                var i = o.map(function(e) {
                    return r.default.buildQuery(e);
                }).join("\n");
                t.isTrackSending = !0;
                var d = s.default.logginURL;
                d || (d = n.default.logginURL), a.default.apiRequest("POST", d, i, !0, {
                    dontAddUidAndFlag: !0
                }).then(function() {
                    return e(!0);
                }, function() {
                    return e(!1);
                });
            }
        }
    }
};

exports.default = _;