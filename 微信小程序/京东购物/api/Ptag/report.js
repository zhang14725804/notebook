function e(e, t) {
    var i = t || "", o = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"), u = i.substring(i.indexOf("?") + 1, i.length).match(o);
    return null != u ? u[2] : "";
}

function t(e) {
    var t = s.getCookie("__wga"), i = t ? t.split(".") : [], o = {}, u = i[0] && Date.now() - i[0] <= 18e5;
    o.now = Date.now(), o.now_session_time = u && i[1] ? i[1] : o.now, o.prev_session_time = i[2] ? u ? i[2] : i[1] ? i[1] : o.now : o.now, 
    o.first_session_time = i[3] ? i[3] : o.now, o.page_seq = u && i[4] ? 1 * i[4] + 1 : 1, 
    o.session_seq = i[5] ? u ? i[5] : 1 * i[5] + 1 : 1, i = o.now + "." + o.now_session_time + "." + o.prev_session_time + "." + o.first_session_time + "." + o.page_seq + "." + o.session_seq, 
    s.setCookie({
        data: {
            __wga: {
                value: i,
                maxAge: 3153e3,
                decode: !0
            }
        }
    });
}

function i(e, t) {
    var i = void 0, o = void 0, m = "", a = /PTAG[=,](\d+)\.(\d+)\.(\d+)\D?/gim.exec(e && "ptag=" + e || t);
    if (!(null == a || 4 != a.length || a[1] < 0 || a[2] < 0 || a[3] < 0)) {
        switch (i = a[1] % 1e5, o = a[1] + "." + a[2] + "." + a[3], !0) {
          case i >= 17001 && i < 2e4:
            m = "EA";
            break;

          case i >= 27001 && i < 3e4:
            m = "IA";
            break;

          case i >= 37001 && i < 4e4:
            m = "CT";
            break;

          case i >= 47001 && i < 5e4:
            m = "PD";
            break;

          default:
            m = "";
        }
        m && u(m, o);
    }
}

function o() {
    var e = getApp().scene || "", t = getApp().EA_PTAG || "", i = void 0, o = getApp().referrerInfo || {};
    if ([ 1020, 1035, 1043, "1020", "1035", "1043" ].indexOf(e) > -1) {
        var m = o.appId, a = void 0;
        a = m === c.appidMap.wxdzh ? 1 : m === c.appidMap.wxxzh ? 2 : m && m !== c.appidMap.wxdzh && m !== c.appidMap.wxxzh ? 3 : 0, 
        i = c.appSceneMap[e][a];
    } else if ([ 1036, "1036" ].indexOf(e) > -1) {
        var n = o.appId, s = void 0;
        s = n === c.appidMap.app ? 1 : n && n !== c.appidMap.app ? 2 : 0, i = c.shareCardRDList[s];
    } else i = e && c.SCENE_PTAG_MAP[e] || c.defaultEAPTAG;
    if (t && i && e) {
        var r = t.split("."), _ = i.split(".");
        i = r.length >= 3 && _.length >= 3 && r[0] === _[0] && r[1] === _[1] ? t : i;
    }
    e && i && u("EA", i);
}

function u(e, t) {
    function i(e, t) {
        var i = e + "." + t, o = {
            EA: /EA\.(\d+)\.(\d+)\.(\d+)(\D?)/gim,
            IA: /IA\.(\d+)\.(\d+)\.(\d+)(\D?)/gim,
            CT: /CT\.(\d+)\.(\d+)\.(\d+)(\D?)/gim,
            PD: /PD\.(\d+)\.(\d+)\.(\d+)(\D?)/gim,
            DAP: /DAP\.([^-]*)(-?)/gim,
            FOCUS: /FOCUS\.([^-]*)(-?)/gim,
            MART: /MART\.([^-]*)(-?)/gim,
            QZGDT: /QZGDT\.([^\.\-]+)(-?)/gim,
            QZZTC: /QZZTC\.([^\.\-]+)(-?)/gim,
            ADKEY: /ADKEY\.([^\.\-]+)(-?)/gim,
            UUID: /UUID\.([^\.\-]+)(-?)/gim,
            WDSTAG: /WDSTAG\.([^-]*)(-?)/gim,
            WQVERSION: /WQVERSION\.([^\.\-]+)(-?)/gim,
            GROUP: /GROUP\.([^\.\-]+)(-?)/gim,
            LOGID: /LOGID\.([^-]*)(-?)/gim,
            WQLOGID: /WQLOGID\.([^-]*)(-?)/gim
        }[e];
        o.test(m) ? m = "EA" == e || "IA" == e || "CT" == e || "PD" == e ? m.replace(o, i + "$4") : m.replace(o, i + "$2") : m += 0 == m.length ? i : "-" + i;
    }
    function o() {
        m = m.replace(/-?UUID\.-/g, "-").replace(/^-|-UUID\.$/g, "").replace(/-+/g, "-");
    }
    var u = "object" == (void 0 === e ? "undefined" : n(e)), m = s.getCookie("PPRD_P") || "";
    if (u) {
        for (var a in e) e.hasOwnProperty(a) && i(a, e[a]);
        o(), s.setCookie({
            data: {
                PPRD_P: {
                    value: m,
                    decode: !0,
                    maxAge: 259200
                }
            }
        });
    } else i(e, t), o(), s.setCookie({
        data: {
            PPRD_P: {
                value: m,
                decode: !0,
                maxAge: 259200
            }
        }
    });
}

function m(t, i) {
    function o(e) {
        var t = 1, i = 0, o = void 0;
        if (e) for (t = 0, o = e.length - 1; o >= 0; o--) t = 0 !== (i = 266338304 & (t = (t << 6 & 268435455) + (i = e.charCodeAt(o)) + (i << 14))) ? t ^ i >> 21 : t;
        return t;
    }
    function u() {
        return o(m.replace(/.*?(\w+\.\w+)$/, "$1"));
    }
    var m = r.getDomain(t), n = getApp().scene, _ = getApp().utmJdvProps || {}, c = p.SCENE_UTM_MAP[n] || {}, d = getApp().unionJdv, g = !("B" !== c.type || e("utm_source", t) || e("utm_campaign", t) || e("utm_medium", t) || e("utm_term", t)), l = "B" === c.type && _.platform && _.utm_source, f = "direct", h = void 0, q = (s.getCookie("__jdv") || "").split("|"), v = m.replace(/.*?(\w+\.\w+)$/, "$1"), w = i, y = void 0, A = 86400, D = 1 * new Date(), x = !1;
    q.length < 4 ? (y = [ h = u(), "direct", "-", "none", "-", D ].join("|"), s.setCookie({
        data: {
            __jdv: {
                value: y,
                decode: !0,
                maxAge: A
            }
        }
    }), q = [ h, "direct", "-", "none", "-" ]) : q.length > 4 && (h = q[0], f = q[1], 
    q[2], q[3], q[4], "direct" != f && ("direct" == ("A" === c.type ? c.utm_source : l ? _.utm_source : g ? c.utm_source : e("utm_source", t) || a("utm_source")) && (x = !0), 
    d && ("A" === c.type || "A" !== c.type && !l && g) && (x = !0)), g && _ && (_.utm_source || _.utm_campaign || _.utm_medium || _.utm_term) && !_.platform && (x = !0));
    var k = [], P = !1, b = "A" === c.type ? c.utm_source : l ? _.utm_source : g ? c.utm_source : e("utm_source", t) || a("utm_source");
    if (!x) if (b) {
        var C = "A" === c.type ? c.utm_campaign : l ? _.utm_campaign : g ? c.utm_campaign : e("utm_campaign", t) || a("utm_campaign"), I = "A" === c.type ? c.utm_medium : l ? _.utm_medium : g ? c.utm_medium : e("utm_medium", t) || a("utm_medium"), O = "A" === c.type ? c.utm_term : l ? _.utm_term : g ? c.utm_term : e("utm_term", t) || a("utm_term");
        k.push(b), k.push(C || "-"), k.push(I || "none"), k.push(O || "-"), P = !0;
    } else {
        var T = "baidu:wd,baidu:word,so.com:q,so.360.cn:q,360so.com:q,360sou.com:q,baidu:q1,m.baidu:word,m.baidu:w,wap.soso:key,m.so:q,page.yicha:key,sz.roboo:q,i.easou:q,wap.sogou:keyword,google:q,soso:w,sogou:query,youdao:q,ucweb:keyword,ucweb:word,114so:kw,yahoo:p,yahoo:q,live:q,msn:q,bing:q,aol:query,aol:q,daum:q,eniro:search_word,naver:query,pchome:q,images.google:q,lycos:query,ask:q,netscape:query,cnn:query,about:terms,mamma:q,voila:rdata,virgilio:qs,alice:qs,yandex:text,najdi:q,seznam:q,search:q,wp:szukaj,onet:qt,szukacz:q,yam:k,kvasir:q,ozu:q,terra:query,rambler:query".split(","), G = !0, E = w && w.split("/")[2];
        if (E && E.indexOf(v) < 0) {
            for (var M = 0; M < T.length; M++) {
                var S = T[M].split(":");
                if (E.indexOf(S[0].toLowerCase()) > -1 && w.indexOf((S[1] + "=").toLowerCase()) > -1) {
                    var U = e(S[1], w);
                    k.push(S[0]), k.push("-"), k.push("organic"), k.push(U || "not set"), G = !1;
                    break;
                }
            }
            G && (E.indexOf("zol.com.cn") > -1 ? (k.push("zol.com.cn"), k.push("-"), k.push("cpc"), 
            k.push("not set")) : (k.push(E), k.push("-"), k.push("referral"), k.push("-")));
        }
        P = k.length > 0 && q.length > 4 && (k[0] !== q[1] || k[1] !== q[2] || k[2] !== q[3]) && "referral" !== k[2];
    }
    P && (y = [ h = q[0] ? q[0] : u(), k[0] || "direct", k[1] || "-", k[2] || "none", k[3] || "-", D ].join("|"), 
    s.setCookie({
        data: {
            __jdv: {
                value: y,
                decode: !0,
                maxAge: A
            }
        }
    }));
}

function a(t, i) {
    var o = {
        17007: {
            utm_source: "direct",
            utm_medium: "weixin",
            utm_campaign: "t_1000072660_17007_001"
        },
        17003: {
            utm_source: "direct",
            utm_medium: "weixin",
            utm_campaign: "t_1000072661_17003_001"
        },
        17020: {
            utm_source: "direct",
            utm_medium: "weixin",
            utm_campaign: "t_1000072661_17003_001"
        },
        17005: {
            utm_source: "weixin",
            utm_medium: "weixin",
            utm_campaign: "t_1000072662_17005_001"
        },
        17048: {
            utm_source: "weixin",
            utm_medium: "weixin",
            utm_campaign: "t_1000072663_17048_001"
        },
        17012: {
            utm_source: "direct",
            utm_medium: "shouq",
            utm_campaign: "t_1000072675_17012_001"
        },
        17008: {
            utm_source: "direct",
            utm_medium: "shouq",
            utm_campaign: "t_1000072676_17008_001"
        },
        17006: {
            utm_source: "shouq",
            utm_medium: "shouq",
            utm_campaign: "t_1000072677_17006_001"
        },
        17064: {
            utm_source: "shouq",
            utm_medium: "shouq",
            utm_campaign: "t_1000072647_17064_001"
        },
        17036: {
            utm_source: "weixin",
            utm_medium: "weixin",
            utm_campaign: "t_1000072670_17036_001"
        },
        17060: {
            utm_source: "weixin",
            utm_medium: "weixin",
            utm_campaign: "t_1000072670_17036_001"
        },
        17027: {
            utm_source: "shouq",
            utm_medium: "shouq",
            utm_campaign: "t_1000072641_17027_001"
        },
        17050: {
            utm_source: "shouq",
            utm_medium: "shouq",
            utm_campaign: "t_1000072643_17050_001"
        }
    }, u = e("ptag", i) || e("PTAG", i), m = e("mp_channel", i), a = e("mp_sourceid", i), n = /(\d+)\.(\d+)\.(\d+)/gi, s = "";
    if (u) {
        var r = n.exec(u);
        r && r[1] && o[r[1]] && (s = o[r[1]][t] || "");
    } else (m || a) && (s = o[17064][t] || "");
    return s;
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, s = (function(e) {
    e && e.__esModule;
}(require("../APIs")), require("../../common/cookie-v2/cookie.js")), r = require("../../common/url_utils"), _ = require("../../common/http_json"), c = require("./Ptag_constants.js"), p = require("./Utm_constants"), d = "//wq.jd.com/mlogin/pvlog/set_visitkey_json?t=" + Math.random();

module.exports = {
    setReportCookies: function(e, u) {
        t(), m(e, u), i(null, e), o();
    },
    addPPRD_PWithLOGID: function() {
        u("LOGID", Date.now() + "." + Math.round(2147483647 * Math.random()));
    },
    setVisitKey: function(t, i) {
        function o(e) {
            return "" != e && /\d+/.test(e) && e > 4294967295;
        }
        function u(e) {
            s.setCookie({
                data: {
                    visitkey: {
                        value: e
                    }
                }
            });
        }
        r.getDomain(t);
        var m = "";
        return m = e("visitkey", t), o(m) ? (u(m), i(m)) : (m = s.getCookie("visitkey"), 
        o(m) ? i(m) : void _.get(d, {}, new function() {
            this.success = function(e) {
                console.log("response: " + e), (m = e ? e.visitkey : "") && u(m), i && i(m);
            }, this.fail = function(e) {
                i && i(null);
            };
        }()));
    }
};