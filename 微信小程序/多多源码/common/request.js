function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = e(require("../constants/socket_cmd")), a = e(require("../configs/app_config")), n = e(require("../libs/es6-promise.min")), s = e(require("../storage/user_storage")), o = e(require("../configs/request_errors")), i = e(require("./data_util")), u = e(require("./object_util")), d = e(require("./url_util")), c = e(require("./system_info")), f = e(require("../storage/ram_manager")), l = (e(require("../libs/co/we-index")), 
e(require("../libs/regenerator-runtime/runtime")), require("./message")), g = e(require("../libs/md5.min")), m = e(require("./request_socket")), p = 10, q = [], y = {}, v = [], _ = 0, S = {}, k = {
    isMaxCountSet: !1,
    runMainRequestForPage: function(e, r) {
        var t = null;
        if (r && (t = r.$pageId), r && null !== t) {
            S[t] || (S[t] = {
                main: [],
                secondary: []
            });
            var a = S[t].main;
            e.pageName = r.$pageName, e.pageId = t, e.isSeconary = !1, a.push(e);
        }
        return this.runRequest(e);
    },
    runSecondaryRequestForPage: function(e, r) {
        var t = void 0;
        if (r && (t = r.$pageId), r && t) {
            S[t] || (S[t] = {
                main: [],
                secondary: []
            });
            var a = S[t].secondary;
            e.pageName = r.$pageName, e.pageId = t, e.isSeconary = !0, a.push(e);
        }
        return this.runRequest(e);
    },
    abortRequestInPage: function(e, r, t) {
        var a = e.$pageId;
        if (S[a]) {
            var n = [], s = [], o = [];
            if (S[a].main && (s = S[a].main), S[a].secondary && (o = S[a].secondary), r && (n = n.concat(s)), 
            t && (n = n.concat(o)), 0 != n.length) {
                for (var i = 0; i < q.length; i++) {
                    var u = q[i];
                    for (var d in n) {
                        var c = n[d].requestId;
                        if (u === c) {
                            delete q[i], delete y[c];
                            break;
                        }
                    }
                }
                if (q = q.filter(function(e) {
                    return !!e;
                }), wx.canIUse && wx.canIUse("requestTask.abort")) for (var f = 0; f < v.length; f++) {
                    var l = v[f];
                    for (var g in n) {
                        var m = n[g];
                        if (l === m.requestId && m.task && m.task.abort) {
                            m.task.abort();
                            break;
                        }
                    }
                }
                r && t ? (S[a].main = [], S[a].secondary = []) : r ? S[a].main = [] : S[a].secondary = [];
            }
        }
    },
    handleRequestError: function(e, r) {
        e.error_msg = o.default.errors[e.error_code] || e.error_msg, -1 == e.error_code ? wx.getNetworkType({
            complete: function(t) {
                "none" == t.networkType && (e.error_msg = "网络不太顺畅哦,请重新加载"), "function" == typeof r && r(e);
            }
        }) : "function" == typeof r && r(e);
    },
    isSuccess: function(e) {
        var r = !1;
        return e.statusCode && e.statusCode < 400 && (r = !0), r;
    },
    canRetry: function(e) {
        var r = !0, t = 0;
        return e && e.error_code && (t = e.error_code), "unknown" == f.default.networkType || "none" == f.default.networkType ? r = !1 : 40001 == t || 43504 == t || 406001 == t ? r = !1 : "request:fail abort" == e.error_msg && (r = !1), 
        r;
    },
    changeMaxCount: function() {
        var e = c.default.getSystemInfoSync().SDKVersion;
        p = e && 1 * e.split(".").join("") > 125 ? 10 : 5;
    },
    triggerNextRequestStep: function() {
        var e = this;
        if (this.isMaxCountSet || (this.changeMaxCount(), this.isMaxCountSet = !0), 0 !== q.length && !(v.length >= p)) {
            var t = q.shift(), a = y[t];
            if (t && a && a.reqConfig) {
                v.push(t);
                var n = a.reqConfig;
                s.default.getAccessToken() && (n.header.AccessToken = s.default.getAccessToken());
                var o = Date.now();
                n.complete = function(i) {
                    function u() {
                        v.splice(v.indexOf(t), 1), delete y[t], e.deleteRequestFromMainAndSecondaryMap(a), 
                        e.triggerNextRequestStep();
                    }
                    var d = n.url, c = void 0;
                    c = a.needResponseHeader ? i : i.data || {};
                    var g = e.isSuccess(i), m = c.error_code || i.statusCode || -1, p = Date.now(), q = p - o, S = 0;
                    n.data && (S = JSON.stringify(n.data).length);
                    var k = JSON.stringify(c).length, h = {
                        record_type: "NETWORK_TIME",
                        page_name: a.pageName || "",
                        begin_time: o,
                        end_time: p,
                        response_time: q,
                        status: g ? "SUCCESS" : "FAILED",
                        request_url: d,
                        code: m,
                        request_size: S,
                        response_size: k,
                        isRetry: a.retried ? 1 : 0,
                        is_token_invalid_retry: a.tryReLogin ? 1 : 0,
                        isSocket: i.isSocket ? 1 : 0
                    };
                    if (g || (h.error_msg = c.error_msg || i.errMsg || "unknown error"), e.markMonitor(h), 
                    g) "function" == typeof a.success && a.success(c), u(); else if ("object" !== (void 0 === c ? "undefined" : r(c)) && (c = {}), 
                    c.error_code = m, c.error_msg || (c.error_msg = "服务器开小差，出错了~"), !e.canRetry(c) || a.disableRetry || a.retried) e.handleRequestError(c, function(r) {
                        40001 != m && 406001 != m || o > f.default.autoLoginStartTime && s.default.clearUserLocalInfo(), 
                        40001 != m && 406001 != m || a.tryReLogin ? ("function" == typeof a.fail && a.fail(r), 
                        u()) : (_++, f.default.autoLoginStartTime = Date.now(), l.Message.emit(l.KEYS.REQUEST_TOKEN_INVALID, a), 
                        a.tryReLogin = !0, l.Message.on(l.KEYS.USER_LOGIN_FINISHED, function() {
                            if (--_ <= 0 && (f.default.autoLoginStartTime = 0), s.default.getAccessToken()) {
                                o = Date.now(), n.header.AccessToken = s.default.getAccessToken();
                                var t = e.sendRequest(n);
                                a.task = t;
                            } else "function" == typeof a.fail && a.fail(r), u();
                        }, !0));
                    }); else {
                        o = Date.now(), a.retried = !0;
                        var R = e.sendRequest(n, !0);
                        a.task = R;
                    }
                };
                var i = e.sendRequest(n);
                a.task = i;
            }
        }
    },
    sendRequest: function(e, r) {
        if (!(e.cmdId && t.default[e.cmdId] && m.default.isSocketValid()) || f.default.noSocketRequest || f.default.socketReuqestBlockList[e.cmdId] || !m.default.isSocketOpen() && r) return wx.request(e);
        m.default.request(e);
    },
    deleteRequestFromMainAndSecondaryMap: function(e) {
        if (e.pageName && void 0 !== e.pageId) {
            var r = [], t = [], a = -1, n = S[e.pageId];
            r = n.main, t = n.secondary;
            for (var s in r) if (r[s] === e) {
                a = s;
                break;
            }
            -1 != a && r.splice(a, 1), r.length <= 0 && l.Message.emit(l.KEYS.PAGE_MAIN_REQUEST_FINISHED, {
                pageId: e.pageId
            }), a = -1;
            for (var o in t) if (t[o] === e) {
                a = o;
                break;
            }
            -1 != a && t.splice(a, 1);
        }
    },
    buildRequest: function(e) {
        if (e.needUidAndFlag) {
            var r = e.reqConfig.url, t = r.split("?");
            r = t[0] + "?" + (t[1] ? t[1] + "&" : "") + d.default.buildQuery({
                pdduid: s.default.getUserId(),
                xcx: "20161201",
                xcx_version: a.default.version
            }), e.reqConfig.url = r;
        }
        var n = s.default.getAccessToken();
        if (n && (e.reqConfig.header.AccessToken = n), e.needGZToken && n) {
            var o = (0, g.default)(a.default.salt + s.default.getUserId() + n);
            e.reqConfig.header.GZToken = o;
        }
        var u = i.default.getLogId();
        e.requestId = u, q.push(u), y[u] = e, q.sort(function(e, r) {
            var t = y[e], a = y[r];
            return t && a ? t.isSeconary - a.isSeconary : 0;
        }), this.triggerNextRequestStep();
    },
    requestDataWithCmd: function(e, r) {
        var a = r || {}, n = a.params, s = a.restfulParam, o = a.urlParams, c = a.opts, f = t.default[e];
        if (f) {
            var l = f.method || "GET", g = i.default.formatByPos(f.uri, s);
            o && (g += "?" + d.default.buildQuery(o)), c = u.default.assign(c || {}, {
                cmdId: e,
                restfulParam: s
            });
            var m = !f.auth;
            return this.requestDataWithUrl(l, g, n, m, c);
        }
    },
    requestDataWithUrl: function(e, r, t, n, s) {
        s = s || {};
        var o = {};
        e = e || "GET";
        var d = {
            "Content-Type": "application/json;charset=UTF-8",
            "Cache-Control": "no-cache"
        };
        s && i.default.isObject(s.reqConfigHeader) && (d = u.default.assign(d, s.reqConfigHeader));
        var c = s.forceUseApiV2, f = s.forceUseApiGZ, l = s.forceUseApiMss, g = void 0;
        switch (!0) {
          case c:
            g = a.default.apiV3Domain;
            break;

          case f:
            g = a.default.apiGZDomain;
            break;

          case l:
            g = a.default.apiMssDomain;
            break;

          default:
            g = a.default.apiDomain;
        }
        var m = {
            url: 0 === r.indexOf("https://") || 0 === r.indexOf("http://") ? r : g + r,
            method: e,
            header: d
        };
        return t && (m.data = t), m.cmdId = s.cmdId, m.restfulParam = s.restfulParam, o.reqConfig = m, 
        o.isSeconary = !1, o.needAccessToken = !n, o.needUidAndFlag = !s.dontAddUidAndFlag, 
        o.needResponseHeader = !!s.needResponseHeader, o.needGZToken = !!s.needGZToken, 
        o.disableRetry = !!s.disableRetry, o;
    },
    apiRequest: function(e, r, t, a, n) {
        var s = this.requestDataWithUrl(e, r, t, a, n);
        return this.runRequest(s);
    },
    runRequest: function(e) {
        var r = this;
        return new n.default(function(t, a) {
            e.success = t, e.fail = a, e.needAccessToken && !s.default.getAccessToken() ? l.Message.emit(l.KEYS.REQUEST_NEED_LOGIN, e) : r.buildRequest(e);
        });
    },
    markMonitor: function(e) {
        l.Message.emit(l.KEYS.MONITOR_FROM_REQUEST, e);
    }
};

exports.default = k;