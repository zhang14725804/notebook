function e(e) {
    if (e.uniqueKey) {
        var o = e.uniqueKey;
        if (n[o] && n[o].length) {
            var r = n[o].indexOf(e);
            if (-1 === r) console.info("已被清除的请求", e); else if (0 === r) n[o].shift(); else if (r > 0) {
                for (var c = 0; c < r; c++) n[o][c].cancel = !0;
                n[o] = n[o].slice(r, n[o].length);
            }
        }
    }
}

function o(e) {
    var o = "[none]";
    if (e.match(/^https:\/\/[^\/]+\/([^\?]*)/)) o = e.match(/^https:\/\/[^\/]+\/([^\?]*)/)[1]; else if (e.match(/^\/[^\/]+\//)) {
        var r = e.split("/");
        r.shift(), r.shift(), o = r.join("/");
    } else o = "[raw]" + e;
    return o;
}

function r(e, o) {
    if (!e || !o || !o.url) return !1;
    console.log("[errorLog 白名单检查]", o.url);
    return Object.keys(c).forEach(function(r) {
        if (-1 != o.url.indexOf(r)) {
            var n = c[r].codeField.toLocaleLowerCase();
            Object.keys(e).forEach(function(o) {
                if (o.toLocaleLowerCase() == n) {
                    var t = e[o];
                    Object.keys(c[r].ignoreCode).forEach(function(n) {
                        t == n && (console.log("[errorLog 白名单检查命中]", r, o, t), e = !0);
                    });
                }
            });
        }
    }), !1;
}

var n = {}, c = require("./errorlog_config.js").errorLogWhiteList, t = {};

t.url = "https://wq.jd.com/webmonitor/collect/biz.json", t.deviceurl = "https://wq.jd.com/webmonitor/collect/device.json", 
t.getData = function(e) {
    console.log("[errorLog getData]", e.url), e.errMsg = (e.errMsg || "").replace(/[,|]/g, " ");
    var r = o(e.url) || e.url;
    return console.log("[errorLog formatUrl]", r), {
        contents: [ 355, 1, encodeURIComponent(e.errCode || "null"), 0, encodeURIComponent(e.page || "unrealized"), encodeURIComponent(r), encodeURIComponent(e.errMsg || ""), encodeURIComponent(e.responseTime || NaN), encodeURIComponent(e.env) ].join("|")
    };
}, t.callback = {
    success: function(e) {
        console.log("errorLog");
    },
    fail: function(e) {
        console.error("errorLog fail", e);
    }
}, t.ignoreList = [ /biz\.json/, /log\.gif/, /fd\.3\.cn\/cesu/ ], t.needReport = function(e) {
    var o = !0;
    return t.ignoreList.forEach(function(r) {
        e.match(r) && (o = !1);
    }), o;
}, t.checkRes = function(e, o) {
    if (!r(e, o)) {
        var n, c;
        for (var t in e) {
            var i = t.toLocaleLowerCase();
            if ("errcode" == i || "ret" == i || "retcode" == i || "errid" == i || "ret_code" == i || "iret" == i) {
                var l = e[t];
                0 != l && null != l && (n = l);
            } else "errmsg" != i && "msg" != i || (c = e[t]);
            0 != e.errId && void 0 !== e.resultCode && 0 != e.resultCode && (n = e.resultCode);
        }
        if (n) return console.log("errorLog检查:发现错误标志", n, c), {
            errCode: n,
            errMsg: c
        };
        console.log("errorLog检查:未发现错误标志");
    }
}, t.getPage = function() {
    var e = getCurrentPages();
    return e.length ? e[e.length - 1].__route__ : "no page";
}, t.deviceInfo = "", t.reportDevice = function(e) {
    function o(e) {
        var o = [];
        return Object.keys(e).forEach(function(r) {
            o.push(encodeURIComponent(r) + ":" + encodeURIComponent(e[r]));
        }), o.join("|");
    }
    var r;
    wx.getSystemInfo({
        success: function(n) {
            console.log(n), r = n, wx.getNetworkType({
                success: function(n) {
                    r.networkType = n.networkType, delete r.errMsg, t.deviceInfo = o(r), console.log("上报设备信息", t.deviceInfo), 
                    e({
                        url: t.deviceurl,
                        callback: t.callback,
                        data: {
                            contents: t.deviceInfo
                        }
                    });
                },
                fail: function(e) {
                    console.error(e);
                }
            });
        },
        fail: function(e) {
            console.error(e);
        }
    });
}, exports.errorLog = t, exports.access = function(o, r) {
    if (console.log("--------------access----------------", o), o.uniqueKey) {
        var c = o.uniqueKey;
        n[c] || (n[c] = []), n[c].forEach(function(e) {
            console.log("***************************************", e), e.cancel = !0;
        }), n[c].push(o);
    }
    var t = {
        success: function(r, n) {
            if (e(o), o.cancel) return console.info("取消回调", o.url);
            o.callback.success(r, n);
        },
        fail: function(r) {
            if (e(o), o.cancel) return console.info("取消回调", o.url);
            o.callback.fail(r);
        }
    };
    return r(o.type, o.url, o.data || {}, t, o.priority, o.channel, o.opt);
};