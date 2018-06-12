function e(e, p, s, a) {
    t = p, s = s || "auto";
    var d = f(), m = i["v4138" == p ? "$xx" : "$xxf"](c[p], e, t, 1, d), v = "";
    m && (v = "encver=" + ("v4138" == p ? 2 : 300) + "&_qv_rmtv2=" + m), console.log("getinfo waiting");
    var y = "", h = "";
    return console.log("player.js fetch start", Date.now()), u.resolve().then(function() {
        return a.onBeforeGetinfo(e);
    }).then(function(e) {
        h = "object" == (void 0 === e ? "undefined" : n(e)) ? e : {}, (h = Object.keys(h).map(function(e, t) {
            return -1 != [ "auth_from", "auth_ext", "defnpayver", "spvideo", "spaudio" ].indexOf(e) ? e + "=" + h[e] : "";
        }).filter(function(e) {
            return e;
        }).join("&")) && (h = "&" + h), console.log("getinfo beforeGetinfoParam", h);
    }).then(function() {
        return new u(function(e, t) {
            wx.getNetworkType({
                success: function(t) {
                    y = {
                        "4g": 4,
                        "3g": 3,
                        "2g": 2,
                        wifi: 1
                    }[t && t.networkType] || 0, e();
                }
            });
        });
    }).then(function() {
        return console.log("https://h5vv.video.qq.com/getinfo?" + v + "&defn=" + s + "&platform=" + c[p] + "&otype=json&sdtfrom=" + p + "&_rnd=" + d + "&appVer=7&" + (l ? "dtype=3&" : "") + "vid=" + e + "&newnettype=" + y + h), 
        r("https://h5vv.video.qq.com/getinfo?" + v + "&defn=" + s + "&platform=" + c[p] + "&otype=json&sdtfrom=" + p + "&_rnd=" + d + "&appVer=7&" + (l ? "dtype=3&" : "") + "vid=" + e + "&newnettype=" + y + h, {
            needlogin: !0,
            needLoginCase: !0
        });
    }).catch(function() {
        return r("https://bkvv.video.qq.com/getinfo?" + v + "&defn=" + s + "&platform=" + c[p] + "&otype=json&sdtfrom=" + p + "&_rnd=" + d + "&appVer=7&" + (l ? "dtype=3&" : "") + "vid=" + e + "&newnettype=" + y + h, {
            needlogin: !0,
            needLoginCase: !0
        });
    }).catch(function() {
        var e = new Error(o[444]);
        throw e.em = 444, e.code = "G.444", e;
    }).then(function(e) {
        return e = e.data, console.log("getinfo result:", e), e;
    });
}

var t, n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, o = require("./getinfo-status"), r = require("../../../../lib-inject").request, i = require("../../../lib/algorithm/qvsec"), f = require("../../../lib/algorithm/fillTimeStamp"), u = require("../../../../lib-inject").Promise, l = "devtools" != wx.getSystemInfoSync().platform, c = require("../../../util/platform-config").APP_PLATFORM;

module.exports = function() {
    return e.apply(this, arguments).then(function(e) {
        if (e.em) {
            var t = new Error(o[e.em]);
            throw t.em = e.em, t.code = "G." + e.em, t;
        }
        return e;
    }).then(function(e) {
        var n = e.vl.vi[0], o = {
            duration: +n.td,
            dltype: e.dltype,
            fmid: e.fl.fi.filter(function(e) {
                return +e.sl;
            })[0].id,
            filesize: e.fl.fi.filter(function(e) {
                return +e.sl;
            })[0].fs,
            preview: e.preview,
            charge: n.ch,
            raw: e
        };
        return n.ch < 1 && (o.preview = e.preview, o.charged = n.ch), 3 == e.dltype ? (o.url = n.ul.ui.map(function(e) {
            return e.hls.pt ? e.url + e.hls.pt + "&platform=" + c[t] + "&sdtfrom=" + t : "";
        }), o.url = o.url.filter(function(e) {
            return e;
        })) : o.url = n.ul.ui.map(function(e) {
            return e.url + n.fn + "?vkey=" + n.fvkey + "&br=" + n.br + "&fmt=auto&level=" + n.level + "&platform=" + c[t] + "&sdtfrom=" + t;
        }), o;
    });
};