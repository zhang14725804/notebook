function e(e) {
    -415 != e.errCode && (e.errMsg = e.errMsg || "", e.errMsg = e.errMsg.replace(/[,|]/g, " ").replace(/(\r\n|\r|\n)+/g, " "), 
    e.errMsg = encodeURIComponent(e.errMsg));
    var o = r(e.url) || e.url;
    return [ 355, 1, ~~e.errCode, 0, encodeURIComponent(e.page || "unrealized"), encodeURIComponent(o), e.errMsg, encodeURIComponent(e.responseTime || NaN), encodeURIComponent(e.env) ].join("|");
}

function r(e) {
    var r = "[none]";
    if (e.match(/^https:\/\/[^/]+\/([^?]*)/)) r = e.match(/^https:\/\/[^/]+\/([\S]*)/)[1]; else if (e.match(/^\/[^/]+\//)) {
        var o = e.split("/");
        o.shift(), o.shift(), r = o.join("/");
    } else r = "[raw]" + r;
    return r;
}

function o() {
    c || (c = getApp());
    var e = {};
    return e.brand = c.systemInfo.brand, e.model = c.systemInfo.model, e.SDKVersion = c.systemInfo.SDKVersion, 
    e.platform = c.systemInfo.platform, e.system = c.systemInfo.system, e.version = c.systemInfo.version, 
    e.appVersion = c.version, e.networkType = c.networkType, JSON.stringify(e);
}

function s(e) {
    var r = e.error;
    if (e.ump) {
        var s = e.ump, t = s.bizId, n = s.opId, i = s.errBizId, p = s.errOpId, d = s.reportHook, u = void 0;
        if (!r && t && n && "json" == e.dataType) {
            var c = void 0, f = void 0;
            if ("function" == typeof d) {
                var h = d(e.body) || {};
                if (c = h.code, f = h.message, void 0 === c) return void console.warn("无效的 ump.reportHook! url: " + e.url);
            } else {
                if (l.some(function(r) {
                    if (void 0 !== e.body[r]) return c = e.body[r], !0;
                }), void 0 === c) return void console.warn("未找到可用的返回码字段，请使用 ump.reportHook！url:  + task.url");
                0 != c && g.some(function(r) {
                    if (void 0 !== e.body[r]) return f = e.body[r], !0;
                });
            }
            if (0 == c) u = [ t, n, 0, 0, "" ].join("|"); else {
                var v = "msg=" + (f || "").replace(/[,|\r\n]/g, " ") + "&url=" + encodeURIComponent(e.url) + "&version=" + getApp().version;
                u = [ t, n, ~~c, 0, v ].join("|");
            }
        } else if (r && i && p) {
            var y = "msg=" + r.message.replace(/[,|\r\n]/g, " ") + "&url=" + encodeURIComponent(e.url) + "&version=" + getApp().version;
            u = [ i, p, ~~r.code, 0, y ].join("|");
        }
        if (u) return m.logs.push(u), void m.reportData();
    }
    if (r) {
        if (-415 == r.code) {
            var b = o(), M = "response content parse error. content: " + e.rawBody + "+" + r.message + "+" + b;
            return M = a.base64encode(encodeURIComponent(M)), {
                errCode: "-415",
                errMsg: M
            };
        }
        return {
            errCode: r.code,
            errMsg: r.message + (r.detail ? "(" + JSON.stringify(r.detail) + ")" : "")
        };
    }
}

function t(e) {
    var r = !0;
    return f.forEach(function(o) {
        e.match(o) && (r = !1);
    }), r;
}

function n() {
    var e = getCurrentPages();
    return e.length ? e[e.length - 1].route : "no page";
}

var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, p = require("../request/request.js"), a = require("../base64/base64.js"), d = require("../../libs/md5.js"), u = require("../fe_report/speed.js"), l = [ "errCode", "errcode", "retCode", "retcode", "ret", "errId", "iRet", "ret_code", "resultCode", "code" ], g = [ "errMsg", "errmsg", "retMsg", "retmsg", "msg" ], c = null, f = [ /biz\.json/, /log\.gif/, /fd\.3\.cn\/cesu/ ], m = {
    reportWsFailed: function(r) {
        var o = r.error, s = r.res, t = void 0, n = e({
            url: "http_ws",
            errCode: "-1",
            errMsg: ("websocket response parse failed, msg: " + o + ", response data: " + (t = "object" == (void 0 === s ? "undefined" : i(s)) ? JSON.stringify(s) : "" + s)).replace(/(\r\n|\r|\n)+/g, " "),
            responseTime: "-1",
            page: "http_ws",
            env: getApp().version
        });
        this.logs = this.logs || [], this.logs.push(n), this.reportData();
    },
    reportWsError: function(r) {
        var s = r.error, t = r.type;
        try {
            var p = o(), a = n(), u = void 0;
            u = "object" == (void 0 === s ? "undefined" : i(s)) ? JSON.stringify(s) : "" + s;
            var l = e({
                url: "http_ws",
                errCode: "-2",
                errMsg: ("timestamp: " + d.hexMD5(Date.now() + Math.random() + "") + "+" + u + "+" + t + "+" + p + "+" + a).replace(/(\r\n|\r|\n)+/g, " "),
                responseTime: "-1",
                page: "http_ws",
                env: getApp().version
            });
            this.logs = this.logs || [], this.logs.push(l), this.reportData();
        } catch (e) {
            console.error(e);
        }
    },
    report: function(r) {
        var o = this;
        if (this.logs = this.logs || [], r.responseList && r.responseList.length && r.responseList.forEach(function(r) {
            var t = s(r);
            if (t) {
                var i = e({
                    url: r.url,
                    errCode: t.errCode,
                    errMsg: t.errMsg,
                    responseTime: r.responseTime - r.requestTime,
                    page: n(),
                    env: getApp().version
                });
                o.logs.push(i);
            }
        }), t(r.url)) {
            var i = s(r);
            if (!i) return;
            var p = e({
                url: r.url,
                errCode: i.errCode,
                errMsg: i.errMsg,
                responseTime: r.responseTime - r.requestTime,
                page: n(),
                env: getApp().version
            });
            this.logs.push(p);
        }
        this.logs.length && this.reportData();
    },
    reportData: function() {
        var e = this;
        this.logs = this.logs || [], this.logs.length && (clearTimeout(this.reportTimeout), 
        this.reportTimeout = setTimeout(function() {
            var r = {
                url: "https://wq.jd.com/webmonitor/collect/biz.json",
                priority: "REPORT",
                data: {
                    contents: e.logs.join(","),
                    t: Math.random() + ""
                }
            };
            e.logs = [], p.post(r).then(function(e) {}).catch(function(e) {});
        }, 1e3));
    },
    reportSpeed: function(e) {
        var r = e.speedPageId, o = e.speedPointId, s = e.speedSamplingRate, t = void 0 === s ? .1 : s;
        if (e.speed.end = Date.now(), (r || o) && e.speed && !e.cached && !e.responseList.length) {
            var n = e.speed, i = n.start, p = n.httpPush, a = n.httpReq, d = n.httpReqSucc, l = n.jsonParse, g = n.wsPush, c = n.wsRequest, f = n.wsSendMsg, m = n.wsOnMsg, h = n.end, v = {};
            if (o) {
                if (!(Math.random() < t)) return;
                return v["s" + o] = h - i, u.reportAlone(1246, v), void console.log("接口测速上报：", JSON.stringify(v));
            }
            "http" == e.channel && d ? v = {
                s3: p - i,
                s4: a - i,
                s5: d - i,
                s6: h - i
            } : "socket" == e.channel && m && (v = {
                s11: g - i,
                s12: c - i,
                s13: f - i,
                s14: m - i,
                s15: h - i
            }), void 0 !== l && (v.s1 = l), u.reportAlone(r, v), console.log("接口详细测速上报：", JSON.stringify(v));
        }
    }
};

wx.JDReport = m, module.exports = {
    Report: m
};