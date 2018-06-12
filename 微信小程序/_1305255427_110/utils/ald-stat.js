var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function() {
    function a(t) {
        var a = "";
        try {
            a = wx.getStorageSync("aldstat_uuid");
        } catch (t) {
            a = "uuid-getstoragesync";
        }
        if (!a) {
            a = "" + Date.now() + Math.floor(1e7 * Math.random());
            try {
                wx.setStorageSync("aldstat_uuid", a);
            } catch (t) {
                wx.setStorageSync("aldstat_uuid", "uuid-getstoragesync");
            }
            t.aldstat_is_first_open = !0;
        }
        return a;
    }
    function s() {
        wx.request({
            url: "https://" + l + ".aldwx.com/config/app.json",
            header: {
                AldStat: "MiniApp-Stat"
            },
            method: "GET",
            success: function(t) {
                if (200 === t.statusCode) for (var a in t.data) wx.setStorageSync(a, t.data[a]);
            }
        });
    }
    function e(t, a, s) {
        if (t[a]) {
            var e = t[a];
            t[a] = function(t) {
                s.call(this, t, a), e.call(this, t);
            };
        } else t[a] = function(t) {
            s.call(this, t, a);
        };
    }
    function n(t, a, s) {
        if (t[a]) {
            var e = t[a];
            t[a] = function(t) {
                var n = e.call(this, t);
                return s.call(this, [ t, n ], a), n;
            };
        } else t[a] = function(t) {
            s.call(this, t, a);
        };
    }
    function o(t) {
        this.app = t;
    }
    function r(t) {
        for (var a in t) return !1;
        return !0;
    }
    function _(t) {
        if ("string" != typeof t) return !1;
        var a = t.replace(/\s+/g, "_");
        return !/[~`!@/#+=\$%\^()&\*]+/g.test(a);
    }
    var i = "6.1.2", l = "log", d = require("./ald-stat-conf.js"), c = 0, u = 0, p = 0, h = 0, g = {}, f = function(t) {
        wx.getSetting && wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] && wx.getUserInfo({
                    withCredentials: !1,
                    success: function(a) {
                        t(a);
                    }
                });
            }
        });
    }, w = function(t, a, s) {
        void 0 === arguments[1] && (a = "GET"), void 0 === arguments[2] && (s = "d.html");
        var e = 0;
        !function n() {
            c += 1, t.rq_c = c, wx.request({
                url: "https://" + l + ".aldwx.com/" + s,
                data: t,
                header: {
                    AldStat: "MiniApp-Stat"
                },
                method: a,
                success: function() {},
                fail: function() {
                    e < 2 && (e++, t.retryTimes = e, n());
                }
            });
        }();
    }, v = function(t, s, e, n) {
        var o = {
            ak: d.app_key,
            uu: a(t),
            at: t.aldstat_access_token,
            st: Date.now(),
            tp: e,
            ev: s,
            v: i
        };
        n && (o.ct = n), t.aldstat_qr && (o.qr = t.aldstat_qr), w(o, "GET", "d.html");
    }, y = function(t, s, e, n) {
        void 0 === t.aldstat_showoption && (t.aldstat_showoption = {});
        var o = {
            ak: d.app_key,
            wsr: t.aldstat_showoption,
            uu: a(t),
            at: t.aldstat_access_token,
            st: Date.now(),
            tp: e,
            ev: s,
            nt: t.aldstat_network_type,
            pm: t.aldstat_phone_model,
            pr: t.aldstat_pixel_ratio,
            ww: t.aldstat_window_width,
            wh: t.aldstat_window_height,
            lang: t.aldstat_language,
            wv: t.aldstat_wechat_version,
            lat: t.aldstat_lat,
            lng: t.aldstat_lng,
            spd: t.aldstat_speed,
            v: i
        };
        n && (o.ct = n), t.aldstat_location_name && (o.ln = t.aldstat_location_name), t.aldstat_src && (o.sr = t.aldstat_src), 
        t.aldstat_qr && (o.qr = t.aldstat_qr), w(o, "GET", "d.html");
    };
    o.prototype.debug = function(t) {
        y(this.app, "debug", 0, t);
    }, o.prototype.warn = function(t) {
        y(this.app, "debug", 1, t);
    }, o.prototype.error = function(t) {
        v(this.app, "debug", 2, t);
    }, o.prototype.sendEvent = function(a, s) {
        if (!_(a)) return !1;
        if (a.length >= 255) return !1;
        if ("object" === (void 0 === s ? "undefined" : t(s))) {
            for (var e in s) {
                if (!_(e)) return !1;
                if ("object" == t(s[e])) return !1;
                if (!_(s[e])) return !1;
            }
            y(this.app, "event", a, JSON.stringify(s));
        } else if ("string" == typeof s && s.length <= 255) {
            if (_(s)) {
                var n = String(s);
                new Object()[n] = s, y(this.app, "event", a, s);
            }
        } else y(this.app, "event", a, !1);
    };
    var S = function() {
        var t = this;
        t.aldstat_duration += Date.now() - t.aldstat_showtime, b(t, "app", "unLaunch");
    }, m = function(t, a, s) {
        void 0 !== wx.getShareInfo ? wx.getShareInfo({
            shareTicket: a,
            success: function(a) {
                y(t, "event", "ald_share_" + s, JSON.stringify(a));
            },
            fail: function() {
                y(t, "event", "ald_share_" + s, "1");
            }
        }) : y(t, "event", "ald_share_" + s, "1");
    }, x = function(t) {
        s(), this.aldstat = new o(this);
        var e = "";
        try {
            e = wx.getStorageSync("aldstat_src");
        } catch (t) {
            e = "uuid-getstoragesync";
        }
        e && (this.aldstat_src = e);
        var n = a(this);
        this.aldstat_uuid = n, this.aldstat_timestamp = Date.now(), this.aldstat_showtime = Date.now(), 
        this.aldstat_duration = 0;
        var r = this;
        r.aldstat_error_count = 0, r.aldstat_page_count = 1, r.aldstat_first_page = 0, this.aldstat_showoption = void 0 !== t ? t : {};
        var _ = function() {
            wx.getSystemInfo({
                success: function(t) {
                    r.aldstat_vsdk_version = void 0 === t.SDKVersion ? "1.0.0" : t.SDKVersion, r.aldstat_phone_model = t.model, 
                    r.aldstat_pixel_ratio = t.pixelRatio, r.aldstat_window_width = t.windowWidth, r.aldstat_window_height = t.windowHeight, 
                    r.aldstat_language = t.language, r.aldstat_wechat_version = t.version, r.aldstat_sv = t.system, 
                    r.aldstat_wvv = t.platform;
                },
                complete: function() {
                    d.getLocation && l(), i();
                }
            });
        }, i = function() {
            f(function(t) {
                var a = "";
                try {
                    a = wx.getStorageSync("aldstat_uuid");
                } catch (t) {
                    a = "uuid-getstoragesync";
                }
                t.userInfo.uu = a, g = t, w(t.userInfo, "GET", "u.html");
            });
        }, l = function() {
            wx.getLocation({
                type: "wgs84",
                success: function(t) {
                    r.aldstat_lat = t.latitude, r.aldstat_lng = t.longitude, r.aldstat_speed = t.speed;
                }
            });
        };
        wx.getNetworkType({
            success: function(t) {
                r.aldstat_network_type = t.networkType;
            },
            complete: _
        });
        var c = "";
        try {
            c = wx.getStorageSync("app_session_key_create_launch_upload");
        } catch (t) {
            c = "";
        }
        c ? c > 0 && "number" == typeof c && (r.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random())) : r.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random()), 
        b(r, "app", "launch");
    }, k = function(t, a) {
        var s = this;
        void 0 === this.aldstat_error_count ? this.aldstat_error_count = 1 : this.aldstat_error_count++, 
        y(s, "event", "ald_error_message", JSON.stringify(t));
    }, b = function(t, s, e) {
        var n = "";
        try {
            n = wx.getStorageSync("app_" + e + "_upload");
        } catch (t) {
            n = "";
        }
        if ((n || "launch" === e) && !(n < 1 && "number" == typeof n)) {
            void 0 === t.aldstat_timestamp && (t.aldstat_timestamp = Date.now());
            var o = wx.getSystemInfoSync();
            t.aldstat_vsdk_version = void 0 === o.SDKVersion ? "1.0.0" : o.SDKVersion, t.aldstat_phone_model = o.model, 
            t.aldstat_pixel_ratio = o.pixelRatio, t.aldstat_window_width = o.windowWidth, t.aldstat_window_height = o.windowHeight, 
            t.aldstat_language = o.language, t.aldstat_sv = o.system, t.aldstat_wvv = o.platform;
            var r = {
                ak: d.app_key,
                waid: d.appid,
                wst: d.appsecret,
                uu: a(t),
                at: t.aldstat_access_token,
                wsr: t.aldstat_showoption,
                st: t.aldstat_timestamp,
                dr: t.aldstat_duration,
                et: Date.now(),
                pc: t.aldstat_page_count,
                fp: t.aldstat_first_page,
                lp: t.aldstat_last_page,
                life: e,
                ec: t.aldstat_error_count,
                nt: t.aldstat_network_type,
                pm: t.aldstat_phone_model,
                wsdk: t.aldstat_vsdk_version,
                pr: t.aldstat_pixel_ratio,
                ww: t.aldstat_window_width,
                wh: t.aldstat_window_height,
                lang: t.aldstat_language,
                wv: t.aldstat_wechat_version,
                lat: t.aldstat_lat,
                lng: t.aldstat_lng,
                spd: t.aldstat_speed,
                v: i,
                ev: s,
                sv: t.aldstat_sv,
                wvv: t.aldstat_wvv
            };
            "launch" === e ? u += 1 : "show" === e ? p += 1 : h += 1, r.la_c = u, r.as_c = p, 
            r.ah_c = h, t.page_share_count && "number" == typeof t.page_share_count && (r.sc = t.page_share_count), 
            t.aldstat_is_first_open && (r.ifo = "true"), t.aldstat_location_name && (r.ln = t.aldstat_location_name), 
            t.aldstat_src && (r.sr = t.aldstat_src), t.aldstat_qr && (r.qr = t.aldstat_qr), 
            t.ald_share_src && (r.usr = t.ald_share_src), w(r, "GET", "d.html");
        }
    }, q = function(t) {
        this.aldstat_showtime = Date.now(), this.aldstat_showoption = void 0 !== t ? t : {};
        var a = "";
        try {
            a = wx.getStorageSync("app_session_key_create_show_upload");
        } catch (t) {
            a = "";
        }
        a && a > 0 && "number" == typeof a && (this.aldstat_access_token = "" + Date.now() + Math.floor(1e7 * Math.random())), 
        b(this, "app", "show"), void 0 !== t && (void 0 !== t.shareTicket ? m(this, t.shareTicket, "click") : void 0 !== t.query && void 0 !== t.query.ald_share_src && m(this, "0", "click"));
    }, D = function(t, a) {
        var s = this;
        s.aldstat_is_first_open && (s.aldstat_is_first_open = !1), s.aldstat_duration = Date.now() - s.aldstat_showtime, 
        b(s, "app", "hide");
    }, T = function(t, a) {
        var s = getApp();
        I(s, this, "hide");
    }, A = function(t, a) {
        var s = getApp();
        I(s, this, "unload");
    }, M = function(t, a) {
        var s = "";
        try {
            s = wx.getStorageSync("aldstat_src");
        } catch (t) {
            s = "";
        }
        var e = getApp();
        if (wx.showShareMenu, s && (e.aldstat_src = s), !r(t)) {
            if (void 0 !== t.aldsrc) if (s) e.aldstat_qr = t.aldsrc; else {
                try {
                    wx.setStorageSync("aldstat_src", t.aldsrc);
                } catch (t) {}
                e.aldstat_src = t.aldsrc, e.aldstat_qr = t.aldsrc;
            }
            void 0 !== t.ald_share_src && (e.ald_share_src = t.ald_share_src), this.aldstat_page_args = JSON.stringify(t);
        }
        I(e, this, "load");
    }, I = function(t, s, e) {
        var n = "";
        try {
            n = wx.getStorageSync("page_" + e + "_upload");
        } catch (t) {
            n = "";
        }
        if ((n || "show" === e) && !(n < 1 && "number" == typeof n)) {
            s.aldstat_start_time = Date.now(), s.aldstat_error_count = 0, t.aldstat_page_count ? t.aldstat_page_count++ : t.aldstat_page_count = 1, 
            t.aldstat_first_page || (t.aldstat_first_page = s.__route__, s.aldstat_is_first_page = !0), 
            t.aldstat_last_page = s.__route__;
            var o = {
                uu: a(t),
                at: t.aldstat_access_token,
                wsr: t.aldstat_showoption,
                ak: d.app_key,
                ev: "page",
                st: s.aldstat_start_time,
                dr: Date.now() - s.aldstat_start_time,
                pp: s.__route__,
                life: e,
                sc: s.page_share_count,
                ec: s.aldstat_error_count,
                nt: t.aldstat_network_type,
                pm: t.aldstat_phone_model,
                pr: t.aldstat_pixel_ratio,
                ww: t.aldstat_window_width,
                wh: t.aldstat_window_height,
                lang: t.aldstat_language,
                wv: t.aldstat_wechat_version,
                lat: t.aldstat_lat,
                lng: t.aldstat_lng,
                spd: t.aldstat_speed,
                v: i,
                wsdk: t.aldstat_vsdk_version,
                sv: t.aldstat_sv,
                wvv: t.aldstat_wvv
            };
            s.aldstat_is_first_page && (o.ifp = "true"), t.aldstat_page_last_page && (o.lp = t.aldstat_page_last_page), 
            t.aldstat_location_name && (o.ln = t.aldstat_location_name), s.aldstat_page_args && (o.ag = s.aldstat_page_args), 
            t.aldstat_src && (o.sr = t.aldstat_src), t.aldstat_qr && (o.qr = t.aldstat_qr), 
            t.ald_share_src && (o.usr = t.ald_share_src), t.aldstat_page_last_page = s.__route__, 
            w(o, "GET", "d.html");
        }
    }, E = function(t, a) {
        var s = getApp();
        I(s, this, "show");
    }, G = function(t, a) {
        var s = getApp();
        y(s, "event", "ald_pulldownrefresh", 1);
    }, O = function(t, a) {
        var s = getApp();
        y(s, "event", "ald_reachbottom", 1);
    }, j = function(a, s) {
        var e = this, n = getApp();
        if (void 0 !== a && void 0 !== a[1]) {
            var o = "";
            try {
                o = wx.getStorageSync("aldstat_uuid");
            } catch (a) {
                o = "uuid-getstoragesync";
            }
            var r = "";
            try {
                r = wx.getStorageSync(o);
            } catch (a) {
                r = "p_share_count_getst";
            }
            var _ = "";
            if ("undefined" !== n.ald_share_src && n.ald_share_src) {
                for (var i = (_ = n.ald_share_src).split(","), l = !0, c = 0, u = i.length; c < u; c++) if (i[c].replace('"', "") == o) {
                    l = !1;
                    break;
                }
                i.length >= 3 && (l && i.shift(), _ = i.toString()), "" !== _ && l && (_ = _ + "," + o);
            } else try {
                _ = wx.getStorageSync("aldstat_uuid");
            } catch (a) {
                _ = "ald_share_src_getst";
            }
            if (a[1].path && "undefined" !== a[1].path || (d.defaultPath ? a[1].path = d.defaultPath : a[1].path = e.__route__), 
            -1 != a[1].path.indexOf("?") ? a[1].path += "&ald_share_src=" + _ : a[1].path += "?ald_share_src=" + _, 
            y(n, "event", "ald_share_chain", {
                path: n.aldstat_last_page,
                chain: _
            }), "" === r || void 0 === r) {
                try {
                    wx.setStorageSync(o, 1);
                } catch (a) {}
                r = 1, n.page_share_count = r;
            } else {
                r = parseInt(wx.getStorageSync(o)) + 1, n.page_share_count = r;
                try {
                    wx.setStorageSync(o, r);
                } catch (a) {}
            }
            f(function(t) {
                var a = "";
                try {
                    a = wx.getStorageSync("aldstat_uuid");
                } catch (t) {
                    a = "uuid-getstoragesync";
                }
                t.userInfo.uu = a, w(t.userInfo, "GET", "u.html");
            });
            a[1];
            void 0 === a[1].success && (a[1].success = function(t) {}), void 0 === a[1].fail && (a[1].fail = function(t) {});
            var p = a[1].fail, h = a[1].success;
            return a[1].success = function(a) {
                new Array();
                if ("object" === t(a.shareTickets)) for (var s = 0; s < a.shareTickets.length; s++) m(n, a.shareTickets[s], "user");
                y(n, "event", "ald_share_status", JSON.stringify(a)), h(a);
            }, a[1].fail = function(t) {
                y(n, "event", "ald_share_status", "fail"), p(t);
            }, a[1];
        }
    }, N = App;
    App = function(t) {
        e(t, "onLaunch", x), e(t, "onUnlaunch", S), e(t, "onShow", q), e(t, "onHide", D), 
        e(t, "onError", k), N(t);
    };
    var J = Page;
    Page = function(t) {
        e(t, "onLoad", M), e(t, "onUnload", A), e(t, "onShow", E), e(t, "onHide", T), e(t, "onReachBottom", O), 
        e(t, "onPullDownRefresh", G), void 0 !== t.onShareAppMessage && n(t, "onShareAppMessage", j), 
        J(t);
    };
}();