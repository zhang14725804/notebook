function e() {
    for (var e = "", t = 1; t <= 32; t++) e += Math.floor(16 * Math.random()).toString(16), 
    8 != t && 12 != t && 16 != t && 20 != t || (e += "-");
    var o = Date.parse(new Date());
    return o /= 1e3, e += "-" + o;
}

function t(t, o, n) {
    return void 0 != n ? (n = n.split("_")[0], o = Number(o + 1), n + "_" + o + "_" + t) : (n = f.hexMD5(e())) + "_" + o + "_" + t;
}

function o(e) {
    return "[object Array]" === Object.prototype.toString.call(e);
}

function n(e, t) {
    var n = [];
    return t.forEach(function(t) {
        var i = null;
        i = o(t) ? {
            key: t[0],
            value: o(e[t[1]]) ? e[t[1]].join(";") : e[t[1]] || "unknown"
        } : {
            key: t,
            value: o(e[t]) ? e[t].join(";") : e[t] || "unknown"
        }, n.push(i);
    }), n;
}

function i(e) {
    return new d(function(t, o) {
        e.method({
            complete: function(o) {
                var i = n(o, e.infos);
                t(i);
            }
        });
    });
}

function s() {
    return v.filter(function(e) {
        return e.method;
    }).map(function(e) {
        return i(e);
    });
}

function r(t) {
    var o = [ "brand", "model", "pixelRatio", "screenWidth", "screenHeight", "system", "platform" ];
    _ || (_ = e(), w.setCookie({
        data: {
            shshshfpa: {
                value: _,
                maxAge: 3153e3
            }
        }
    }));
    var n = t.reduce(function(e, t) {
        return o.indexOf(t.key) > -1 ? e + t.value + "," : e + "";
    }, "");
    C = f.hexMD5(n.substring(0, n.length - 1)), w.setCookie({
        data: {
            shshshfp: {
                value: C,
                maxAge: 3153e3
            }
        }
    });
}

function a(e) {
    var t = new Date();
    if (t.setHours(0, 0, 0, 0), t = t.getTime(), (w.getCookie("hf_time") || 0) < t) {
        var o = {
            browser_info: C,
            client_time: new Date().getTime(),
            period: 24,
            shshshfpa: _,
            whwswswws: x,
            msdk_version: "2.1.1",
            cookie_pin: b,
            visitkey: w.getCookie("visitkey"),
            wid: w.getCookie("wq_uin"),
            open_id: w.getCookie("open_id"),
            nickName: w.getCookie("nickName"),
            avatarUrl: w.getCookie("avatarUrl")
        };
        e.map(function(e) {
            o[e.key] = e.value;
        }), c({
            appname: "jdwebm_xcx",
            jdkey: "",
            whwswswws: x,
            businness: m,
            body: o
        }, "hf");
    }
}

function u() {
    if (y) {
        var e = Number(y.split("_")[1]);
        y = t(new Date().getTime(), e, y), w.setCookie({
            data: {
                shshshsID: {
                    value: escape(y),
                    maxAge: 1800
                }
            }
        });
    } else y = t(new Date().getTime(), 1), w.setCookie({
        data: {
            shshshsID: {
                value: escape(y),
                maxAge: 1800
            }
        }
    });
    var o = "function" == typeof getCurrentPages ? getCurrentPages() : [], n = o && o.length ? o[o.length - 1].route || o[o.length - 1].__route__ : "pages/index/index", i = {
        sid: y.split("_")[0],
        squence: y.split("_")[1],
        create_time: y.split("_")[2],
        shshshfpa: _,
        whwswswws: x,
        browser_info: C,
        page_name: "http://wq.jd.com/" + k + "/" + n,
        msdk_version: "2.1.1",
        cookie_pin: b,
        wid: w.getCookie("wq_uin")
    };
    c({
        appname: "jdwebm_pv",
        jdkey: "",
        whwswswws: x,
        businness: m,
        body: i
    }, "pv");
}

function h(e) {
    r(e), a(e), u();
}

function c(e, t) {
    var o = [ "成功", "无效的接口名称", "网络接收出错", "数据出错", "创建软指纹失败", "无效的软指纹", "空的软指纹" ], n = {
        url: "https://blackhole.m.jd.com/getinfo",
        data: {
            body: JSON.stringify(e)
        },
        method: "POST",
        priority: "REPORT"
    };
    p(n).then(function(e) {
        var n = e.body;
        e.header;
        0 == n.code && ("hf" == t && w.setCookie({
            data: {
                shshshfpb: {
                    value: n.whwswswws,
                    maxAge: 3153e3
                }
            }
        }), "hf" == t && w.setCookie({
            data: {
                hf_time: {
                    value: new Date().getTime(),
                    maxAge: 3153e3
                }
            }
        })), g.info(o[n.code]);
    }, function(e) {
        var t = e.code;
        e.message;
        g.error(t);
    });
}

var w = require("./cookie-v2/cookie.js"), f = require("../libs/md5.js"), p = require("./request/request.js"), d = require("../libs/promise.min.js"), g = new (require("./logger.js"))("jdwebm"), l = 2 == w.getCookie("wxapp_type"), m = l ? "wechat_pgxcx" : "wechat_xcx", k = l ? "wxpgapp" : "wxapp", v = [ {
    method: wx.getScreenBrightness,
    infos: [ [ "screenBrightness", "value" ] ]
}, {
    method: wx.getSystemInfo,
    infos: [ "brand", "model", "pixelRatio", "screenWidth", "screenHeight", "windowWidth", "windowHeight", "language", "version", "system", "platform", "fontSizeSetting", "SDKVersion" ]
}, {
    method: wx.getNetworkType,
    infos: [ "networkType" ]
} ], _ = w.getCookie("shshshfpa"), x = w.getCookie("shshshfpb"), b = w.getCookie("jdpin") || w.getCookie("pin"), y = w.getCookie("shshshsID"), C = void 0;

module.exports = function() {
    var e = s();
    d.all(e).then(function(e) {
        var t = [ {
            key: "bluetooth",
            value: ""
        } ], o = [ {
            key: "beacons",
            value: ""
        } ];
        h((e = e.concat(t, o)).reduce(function(e, t) {
            return e.concat(t);
        }, []));
    }).catch(function(e) {
        console.log(e);
    });
};