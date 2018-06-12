!function() {
    function e(t) {
        t = t || "tr-" + n++, this.name = t, this.logCache = [], this.env = [], this.ext = {}, 
        this.isReady = e.isWxDataReady, e.loggerList && e.loggerList instanceof Array && e.loggerList.push(this);
    }
    var t = {
        jsVer: "1.1.0",
        jdaKey: "__jda",
        jddKey: "__jdd",
        jdvKey: "__jdv",
        customerInfoKey: "union_customerinfo",
        jdvTimeMS: 864e5,
        customerInfoTime: 86400,
        sessionTime: 1800,
        referKey: "__refer",
        md5Salt: "5YT%aC89$22OI@pQ",
        addr: function() {
            var e = "http://neptune.jd.com/log/m";
            try {
                var t = getApp();
                t && t.globalRequestUrl && (e = t.globalRequestUrl.replace(/\/*$/, "/neptune/log/m"));
            } catch (e) {}
            return e;
        }
    }, n = 0;
    e.loggerList = [], e.dependList = {
        sysinfo: 0,
        netType: 0,
        userinfo: 0
    }, e.isWxDataReady = !1, e.dataReady = function(t) {
        if (!e.isWxDataReady) {
            e.dependList[t] = 1;
            for (var n in e.dependList) if (!e.dependList[n]) return;
            e.isWxDataReady = !0;
            for (var n = 0, a = e.loggerList.length; n < a; n++) e.loggerList[n].ready();
            delete e.loggerList;
        }
    }, e.pr = e.prototype, e.pr.ready = function() {
        this.isReady = !0;
        for (var e = this.logCache.length, t = 0; t < e; t++) this.sendData.apply(this, this.logCache[t]);
    }, e.pr.sendData = function(n, a, r) {
        var i;
        (i = "pv" == a ? this.initPvData(r) : "cl" == a ? this.initClickData(r) : "cd" == a ? this.initShoppingData(r) : "od" == a ? this.initOrderData(r) : "sr" == a ? this.initPageUnloadData() : "ep" == a ? this.initExposureData(r) : r).tpc = n, 
        i.report_ts = e.now() / 1e3, i.token = e.md5(i.report_ts + t.md5Salt), i.data[0].typ = a, 
        this.request(i, "sr" == a || "cl" == a);
    }, e.pr.send = function(e, t, n) {
        this.isReady ? this.sendData.apply(this, arguments) : this.logCache.push(arguments);
    }, e.pr.request = function(n, a) {
        var r = !1;
        if (wx.request({
            url: t.addr() + "?std=" + n.std,
            data: n,
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log("requestDone", n), r = !0;
            }
        }), a) for (var i = e.now() + 100; e.now() < i || r; ) ;
    }, function(e) {
        function t(e) {
            return i(o(r(e), 8 * e.length));
        }
        function n(e) {
            for (var t, n = l ? "0123456789ABCDEF" : "0123456789abcdef", a = "", r = 0; r < e.length; r++) t = e.charCodeAt(r), 
            a += n.charAt(t >>> 4 & 15) + n.charAt(15 & t);
            return a;
        }
        function a(e) {
            for (var t, n, a = "", r = -1; ++r < e.length; ) t = e.charCodeAt(r), n = r + 1 < e.length ? e.charCodeAt(r + 1) : 0, 
            55296 <= t && t <= 56319 && 56320 <= n && n <= 57343 && (t = 65536 + ((1023 & t) << 10) + (1023 & n), 
            r++), t <= 127 ? a += String.fromCharCode(t) : t <= 2047 ? a += String.fromCharCode(192 | t >>> 6 & 31, 128 | 63 & t) : t <= 65535 ? a += String.fromCharCode(224 | t >>> 12 & 15, 128 | t >>> 6 & 63, 128 | 63 & t) : t <= 2097151 && (a += String.fromCharCode(240 | t >>> 18 & 7, 128 | t >>> 12 & 63, 128 | t >>> 6 & 63, 128 | 63 & t));
            return a;
        }
        function r(e) {
            var t, n = Array(e.length >> 2);
            for (t = 0; t < n.length; t++) n[t] = 0;
            for (t = 0; t < 8 * e.length; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
            return n;
        }
        function i(e) {
            for (var t = "", n = 0; n < 32 * e.length; n += 8) t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
            return t;
        }
        function o(e, t) {
            e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
            for (var n = 1732584193, a = -271733879, r = -1732584194, i = 271733878, o = 0; o < e.length; o += 16) {
                var s = n, f = a, l = r, h = i;
                a = d(a = d(a = d(a = d(a = u(a = u(a = u(a = u(a = c(a = c(a = c(a = c(a = p(a = p(a = p(a = p(a, r = p(r, i = p(i, n = p(n, a, r, i, e[o + 0], 7, -680876936), a, r, e[o + 1], 12, -389564586), n, a, e[o + 2], 17, 606105819), i, n, e[o + 3], 22, -1044525330), r = p(r, i = p(i, n = p(n, a, r, i, e[o + 4], 7, -176418897), a, r, e[o + 5], 12, 1200080426), n, a, e[o + 6], 17, -1473231341), i, n, e[o + 7], 22, -45705983), r = p(r, i = p(i, n = p(n, a, r, i, e[o + 8], 7, 1770035416), a, r, e[o + 9], 12, -1958414417), n, a, e[o + 10], 17, -42063), i, n, e[o + 11], 22, -1990404162), r = p(r, i = p(i, n = p(n, a, r, i, e[o + 12], 7, 1804603682), a, r, e[o + 13], 12, -40341101), n, a, e[o + 14], 17, -1502002290), i, n, e[o + 15], 22, 1236535329), r = c(r, i = c(i, n = c(n, a, r, i, e[o + 1], 5, -165796510), a, r, e[o + 6], 9, -1069501632), n, a, e[o + 11], 14, 643717713), i, n, e[o + 0], 20, -373897302), r = c(r, i = c(i, n = c(n, a, r, i, e[o + 5], 5, -701558691), a, r, e[o + 10], 9, 38016083), n, a, e[o + 15], 14, -660478335), i, n, e[o + 4], 20, -405537848), r = c(r, i = c(i, n = c(n, a, r, i, e[o + 9], 5, 568446438), a, r, e[o + 14], 9, -1019803690), n, a, e[o + 3], 14, -187363961), i, n, e[o + 8], 20, 1163531501), r = c(r, i = c(i, n = c(n, a, r, i, e[o + 13], 5, -1444681467), a, r, e[o + 2], 9, -51403784), n, a, e[o + 7], 14, 1735328473), i, n, e[o + 12], 20, -1926607734), r = u(r, i = u(i, n = u(n, a, r, i, e[o + 5], 4, -378558), a, r, e[o + 8], 11, -2022574463), n, a, e[o + 11], 16, 1839030562), i, n, e[o + 14], 23, -35309556), r = u(r, i = u(i, n = u(n, a, r, i, e[o + 1], 4, -1530992060), a, r, e[o + 4], 11, 1272893353), n, a, e[o + 7], 16, -155497632), i, n, e[o + 10], 23, -1094730640), r = u(r, i = u(i, n = u(n, a, r, i, e[o + 13], 4, 681279174), a, r, e[o + 0], 11, -358537222), n, a, e[o + 3], 16, -722521979), i, n, e[o + 6], 23, 76029189), r = u(r, i = u(i, n = u(n, a, r, i, e[o + 9], 4, -640364487), a, r, e[o + 12], 11, -421815835), n, a, e[o + 15], 16, 530742520), i, n, e[o + 2], 23, -995338651), r = d(r, i = d(i, n = d(n, a, r, i, e[o + 0], 6, -198630844), a, r, e[o + 7], 10, 1126891415), n, a, e[o + 14], 15, -1416354905), i, n, e[o + 5], 21, -57434055), r = d(r, i = d(i, n = d(n, a, r, i, e[o + 12], 6, 1700485571), a, r, e[o + 3], 10, -1894986606), n, a, e[o + 10], 15, -1051523), i, n, e[o + 1], 21, -2054922799), r = d(r, i = d(i, n = d(n, a, r, i, e[o + 8], 6, 1873313359), a, r, e[o + 15], 10, -30611744), n, a, e[o + 6], 15, -1560198380), i, n, e[o + 13], 21, 1309151649), r = d(r, i = d(i, n = d(n, a, r, i, e[o + 4], 6, -145523070), a, r, e[o + 11], 10, -1120210379), n, a, e[o + 2], 15, 718787259), i, n, e[o + 9], 21, -343485551), 
                n = v(n, s), a = v(a, f), r = v(r, l), i = v(i, h);
            }
            return Array(n, a, r, i);
        }
        function s(e, t, n, a, r, i) {
            return v(f(v(v(t, e), v(a, i)), r), n);
        }
        function p(e, t, n, a, r, i, o) {
            return s(t & n | ~t & a, e, t, r, i, o);
        }
        function c(e, t, n, a, r, i, o) {
            return s(t & a | n & ~a, e, t, r, i, o);
        }
        function u(e, t, n, a, r, i, o) {
            return s(t ^ n ^ a, e, t, r, i, o);
        }
        function d(e, t, n, a, r, i, o) {
            return s(n ^ (t | ~a), e, t, r, i, o);
        }
        function v(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
        }
        function f(e, t) {
            return e << t | e >>> 32 - t;
        }
        var l = 0;
        e.md5 = function(e) {
            return n(t(a(e)));
        };
    }(e), function(e) {
        e.now = function() {
            return new Date().getTime();
        }, e.getUUid = function() {
            return e.now() + "" + parseInt(2147483647 * Math.random());
        }, e.storage = {
            get: function(e) {
                var t = "";
                try {
                    t = wx.getStorageSync(e);
                } catch (e) {}
                return t;
            },
            set: function(e, t) {
                try {
                    wx.setStorageSync(e, t);
                } catch (e) {}
            },
            del: function(e, t, n, a) {}
        }, e.isObject = function(e) {
            return "[object Object]" == {}.toString.call(e);
        }, e.extend = function(t, n) {
            if (e.isObject(t) && e.isObject(n)) for (var a in n) t[a] = n[a];
        }, e.url = {
            joinParam: function(t) {
                if (e.isObject(t)) {
                    var n = [];
                    for (var a in t) n.push(a + "=" + t[a]);
                    return n.join("&");
                }
            }
        }, e.isWxEvent = function(t) {
            return !!(e.isObject(t) && t.type && t.target);
        };
    }(e);
    var a = e.storage.get, r = e.storage.set, i = e.isObject, o = e.extend, s = e.now, p = 0, c = p++, u = p++, d = p++, v = p++, f = p++, l = p++, h = p++, g = p++, m = p++, y = p++, x = p++, w = p++, D = p++, _ = p++, j = p++, C = p++, I = p++, R = p++, T = p++, S = p++, k = p++, P = p++, b = p++, A = p++, L = p++, U = p++;
    e.pr.getData = function(e) {
        for (var t = {}, n = 0, a = e.length; n < a; n++) {
            var r = e[n];
            t[r[0]] = this.env[r[1]] || "";
        }
        return t;
    };
    var K = function(e, n, a) {
        var r = (e || "").split(".");
        r.length > 1 ? a[m] = a[m] || 1 * r[1] + t.sessionTime < n : a[m] = !0;
    }, O = function(e, n, a) {
        var r = (e || "").split("|"), i = "", o = "", s = "", p = "", c = !1;
        r.length >= 6 && (n - r[5] <= t.jdvTimeMS ? (i = r[1], o = r[2], s = r[3], p = r[4]) : c = !0);
        var u = a[_], d = [];
        u && u.utm_source && (d.push(encodeURIComponent(u.utm_source)), d.push(encodeURIComponent(u.utm_campaign || "") || o), 
        d.push(encodeURIComponent(u.utm_medium || "") || s), d.push(encodeURIComponent(u.utm_term || "") || p), 
        c = !0);
        var v = d.length > 0 && (d[0] !== i || d[1] !== o || d[2] !== s) && "referral" !== d[2], f = "";
        return (a[m] || v) && (i = d[0] || i, o = d[1] || o, s = d[2] || s, p = d[3] || p), 
        (c || v || r.length < 5) && (f = [ 1, i || "direct", o || "-", s || "none", p || "-", n ].join("|")), 
        a[m] = a[m] || v, f;
    }, E = function(e, n, a) {
        var r = (e || "").split("."), i = 1;
        return r.length > 1 ? (a[m] = a[m] || 1 * r[1] + t.sessionTime < n, i = (a[m] ? 1 : 1 * r[0] + 1) || 1) : a[m] = !0, 
        a[l] = i, i + "." + n;
    }, W = function(t, n, a) {
        var r, i, o, s, p = (t || "").split("."), c = 1, l = 1;
        return p.length > 5 ? (c = p[0] || c, r = p[1] || e.getUUid(), i = p[2] || n, a[m] ? (o = p[4] || n, 
        s = n, l = 1 * p[5] + 1 || 1) : (o = p[3] || n, s = p[4] || n, l = 1 * p[5] || 1)) : (r = e.getUUid(), 
        i = o = s = n, l = 1), a[u] = r, a[d] = i, a[v] = o, a[f] = s, a[h] = l, [ c, r, i, o, s, l ].join(".");
    }, q = function(e, n, a) {
        var r = a[_], i = "", o = "";
        if (r && r.customerinfo) i = r.customerinfo, o = n; else {
            var s = e instanceof Array ? e : [];
            2 == s.length && n - s[1] < t.customerInfoTime && (i = s[0], o = s[1]);
        }
        return a[b] = i, i ? [ i, o ] : [];
    }, J = function(e) {
        var t = a("jdwcx") || a("jdzdm");
        t && (t.unionid && (e[k] = t.unionid), t.wxversion && (e[P] = t.wxversion));
    };
    e.pr.setupPageview = function() {
        var e = this.env, n = s(), i = parseInt(n / 1e3), o = a(t.jdaKey), p = a(t.jddKey), c = a(t.jdvKey);
        e[m] = !1, K(p, i, e);
        var u = O(c, n, e), d = E(p, i, e), v = W(o, i, e);
        u && r(t.jdvKey, u), r(t.jddKey, d), r(t.jdaKey, v);
        var f = q(a(t.customerInfoKey), i, e);
        r(t.customerInfoKey, f), e[g] = u || c, J(this.env);
        var l = getCurrentPages(), h = l.length;
        if (h > 0) {
            if (e[w] = l[h - 1].__route__, e[m]) e[R] = "", e[T] = ""; else {
                var y = a(t.referKey);
                e[R] = y[0], e[T] = y[1];
            }
            r(t.referKey, [ e[w], e[D] ]);
        }
    }, e.pr.initPvData = function(e) {
        this.pageLoadTime = s(), this.maxClickDeep = 0, e = e || {};
        var t = this.baseEnv(), n = [ [ "sku", A ], [ "shp", L ], [ "tit", x ], [ "ldt", U ] ], a = this.getData(n);
        return a.page_id = e.pageId || this.env[j] || "", a.pname = e.pname || this.env[C] || this.env[w] || "", 
        a.pparam = e.pparam || this.env[I] || this.env[D] || "", o(t.data[0], a), o(t.data[0].ext, e.ext), 
        t;
    }, e.pr.initClickData = function(t) {
        var n = this.baseEnv(), a = n.data[0];
        if (a.eid = t.eid || "", a.eparam = t.eparam || "", a.elevel = t.elevel || "", a.page_id = t.pageId || this.env[j] || "", 
        a.pname = t.pname || this.env[C] || this.env[w] || "", a.pparam = t.pparam || this.env[I] || this.env[D] || "", 
        a.tar = t.target || "", a.x = 0, a.y = 0, e.isWxEvent(t.event)) {
            var r = t.event;
            if (r.touches && r.touches.length > 0) {
                a.x = parseInt(r.touches[0].pageX);
                var i = parseInt(r.touches[0].pageY);
                a.y = i, i > this.maxClickDeep && (this.maxClickDeep = i);
            }
        }
        return o(a.ext, t.ext), n;
    }, e.pr.initExposureData = e.pr.initClickData, e.pr.initShoppingData = function(e) {
        var t = this.baseEnv(), n = t.data[0];
        return n.eid = e.eid || "", n.eparam = e.eparam || "", n.elevel = e.elevel || "", 
        n.page_id = e.pageId || this.env[j] || "", n.pname = e.pname || this.env[C] || this.env[w] || "", 
        n.pparam = e.pparam || this.env[I] || this.env[D] || "", n.sku_list = e.shoppingList ? JSON.stringify(e.shoppingList) : "", 
        o(n.ext, e.ext), t;
    }, e.pr.initOrderData = function(e) {
        var t = this.baseEnv(), n = t.data[0];
        return n.eid = e.eid || "", n.eparam = e.eparam || "", n.elevel = e.elevel || "", 
        n.page_id = e.pageId || this.env[j] || "", n.pname = e.pname || this.env[C] || this.env[w] || "", 
        n.pparam = e.pparam || this.env[I] || this.env[D] || "", n.sku_list = e.orderList ? JSON.stringify(e.orderList) : "", 
        n.order_total_fee = e.total || 0, n.sale_ord_id = e.orderid || "", o(n.ext, e.ext), 
        t;
    }, e.pr.initPageUnloadData = function() {
        var e = ((s() - this.pageLoadTime) / 1e3).toFixed(3), t = this.baseEnv(), n = t.data[0];
        return n.alive_seconds = e, n.click_deep = this.maxClickDeep, t;
    }, function() {
        e.wxDat = {};
        var t = e.wxDat;
        wx.getSystemInfo({
            success: function(e) {
                t.dvc = e.model, t.pixelRatio = (e.pixelRatio || "") + "", t.scr = parseInt(e.windowWidth) + "x" + parseInt(e.windowHeight), 
                t.lang = e.language, t.wxver = e.version;
            },
            complete: function() {
                e.dataReady("sysinfo");
            }
        }), wx.getNetworkType({
            success: function(e) {
                t.net = e.networkType;
            },
            complete: function() {
                e.dataReady("netType");
            }
        }), wx.login({
            success: function(n) {
                wx.getUserInfo({
                    success: function(e) {
                        var n = e.userInfo;
                        t.gender = n.gender, t.city = n.city, t.province = n.province, t.country = n.country, 
                        t.appid = n.appId, t.unionid = n.unionId, t.openid = n.openId;
                    },
                    complete: function() {
                        e.dataReady("userinfo");
                    }
                });
            },
            fail: function() {
                e.dataReady("userinfo");
            }
        });
    }(), e.pr.setData = function(t) {
        if (i(t)) {
            var n = {
                account: [ S ],
                siteId: [ c ],
                skuid: [ A ],
                shopid: [ L ],
                title: [ x ],
                loadtime: [ U ],
                urlParam: [ D, e.url.joinParam ],
                pageId: [ j ],
                pname: [ C ],
                pparam: [ I ]
            };
            for (var a in t) {
                var r = n[a];
                r ? this.env[r[0]] = r[1] ? r[1](t[a]) : t[a] : this.ext[a] = t[a];
            }
            this.env[_] = t.urlParam || {};
        }
    }, e.appDat = {}, e.setAppData = function(t) {
        for (var n in t) e.appDat[n] = t[n];
    }, e.pr.baseEnv = function() {
        var n = this.env, r = e.wxDat, i = {
            cli: "wx-app",
            std: n[c] || "WXAPP-JA2016-1",
            uuid: n[u] || "",
            scr: r.scr || "",
            dvc: r.dvc || "",
            lang: r.lang || "",
            appid: "",
            appkey: n[P] || "",
            openid: r.openid || "",
            unionid: n[k] || "",
            gender: r.gender || "",
            city: r.city || "",
            province: r.province || "",
            country: r.country || "",
            wxver: r.wxver || "",
            data: []
        }, s = [ [ "ctp", w ], [ "par", D ], [ "ref", R ], [ "rpr", T ], [ "seq", l ], [ "vts", h ], [ "pin", S ], [ "fst", d ], [ "pst", v ], [ "vct", f ] ], p = this.getData(s);
        return p.jsver = t.jsVer, p.net = r.net || "", p.lat = r.lat || "", p.lon = r.lon || "", 
        p.speed = r.speed || "", p.accuracy = r.accuracy || "", p.pixelRatio = r.pixelRatio || "", 
        p.jdv = n[g] || "", p.customerInfo = n[b] || "", p.unpl = a("unpl") || "", p.ext = {}, 
        o(p.ext, this.ext), o(p.ext, e.appDat), i.data.push(p), i;
    }, e.pr.exports = function() {
        var t = this;
        return {
            set: function(e) {
                t.setData(e), t.setupPageview(), t.env[y] = !0;
            },
            pv: function(n) {
                t.lastPvTime && e.now() - t.lastPvTime < 100 || (t.lastPvTime = e.now(), t.env[y] || t.setupPageview(), 
                t.send("wx_app.000000", "pv", n), t.env[y] = !1);
            },
            click: function(e) {
                t.send("wx_app.000001", "cl", e);
            },
            exposure: function(e) {
                t.send("wx_app.000005", "ep", e);
            },
            autoClick: function(e) {
                var n, a = e.target.dataset, r = e.currentTarget.dataset;
                if (a && a.eid ? n = a : r && r.eid && (n = r), n) {
                    var i = {
                        eid: n.eid,
                        elevel: n.elevel,
                        eparam: n.eparam,
                        pname: n.pname,
                        pparam: n.pparam,
                        target: n.target,
                        event: e
                    };
                    t.send("wx_app.000001", "cl", i);
                }
            },
            addToCart: function(e) {
                t.send("wx_app.000002", "cd", e);
            },
            order: function(e) {
                t.send("wx_app.000003", "od", e);
            },
            pageUnload: function() {
                t.send("wx_app.000004", "sr");
            }
        };
    }, module.exports = {
        init: function(t) {
            return new e(t).exports();
        },
        setAppData: function(t) {
            e.setAppData(t);
        }
    };
}();