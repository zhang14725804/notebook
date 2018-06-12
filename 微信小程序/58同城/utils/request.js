var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
}, t = require("./weappEnv").weappEnv.appCode, r = function(e) {
    return {
        "Content-Type": "application/x-www-form-urlencoded,application/json",
        scene: e.globalData.scene || "",
        appCode: t || "",
        thirdKey: e.globalData.thirdKey || e.getThirdKey() || "",
        cateCode: e.globalData.cateCode || ""
    };
}, n = [], a = {
    requestPost: function(e, t) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
        return this.request(e, t, r, "POST");
    },
    request: function(t, r) {
        var o = this, u = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "GET";
        delete (r = e({}, r)).__webviewId__;
        return new Promise(function(e) {
            var s = {
                key: Math.random(),
                run: function() {
                    var n = a.__request.call(o, t, r, u, i, function() {
                        a.__requestQueue(s.key);
                    });
                    e(n);
                },
                status: 0
            };
            n.push(s), a.__requestQueue();
        });
    },
    __consoleStatus: function() {
        return;
    },
    __removeRequestQueue: function(e) {
        e && function() {
            var t = function() {}, r = 0, a = !0, o = !1, u = void 0;
            try {
                for (var i, s = n[Symbol.iterator](); !(a = (i = s.next()).done); a = !0) {
                    var c = i.value;
                    if (e === c.key) {
                        t = function() {
                            n.splice(r, 1);
                        };
                        break;
                    }
                    r++;
                }
            } catch (e) {
                o = !0, u = e;
            } finally {
                try {
                    !a && s.return && s.return();
                } finally {
                    if (o) throw u;
                }
            }
            t();
        }();
    },
    __requestQueue: function(e) {
        a.__removeRequestQueue(e);
        n.length;
        var t = 0;
        a.__consoleStatus();
        var r = !0, o = !1, u = void 0;
        try {
            for (var i, s = n[Symbol.iterator](); !(r = (i = s.next()).done); r = !0) {
                var c = i.value;
                if (!c.status) {
                    if (t >= 4) return;
                    c.status = 1, c.run();
                }
                t++;
            }
        } catch (e) {
            o = !0, u = e;
        } finally {
            try {
                !r && s.return && s.return();
            } finally {
                if (o) throw u;
            }
        }
    },
    __requestComplete: function() {
        n.length > 0 && n.shift();
    },
    __request: function(e, n) {
        var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, o = this, u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "GET", i = arguments[4];
        n = n || {};
        var s = a && a.show;
        s && this.showLoading(a.content || "正在加载...");
        return function a() {
            var c = o.getUrlParams(e);
            e = /\?/.test(e) ? e.replace(/\?.*/, "") : e, n = Object.assign(c, n);
            var l = r(o);
            switch (o.getPPU() && (l.ppu = o.getPPU()), e = e.indexOf("//") >= 0 ? e : o.pathData.DOMAIN + e, 
            o.getThirdKey() && (n.thirdKey = o.getThirdKey()), n.appCode = t, u.toUpperCase()) {
              case "GET":
                e = o.urlConcat(e, n), n = {};
                break;

              case "POST":
                n.param || (n = {
                    param: JSON.stringify(n)
                });
            }
            return new Promise(function(t) {
                var r = setTimeout(function() {
                    o.alert("服务繁忙，请稍后重试"), t({
                        error: !0,
                        msg: "请求超时"
                    });
                }, 2e4);
                wx.request({
                    url: e,
                    data: n,
                    method: u,
                    header: l,
                    complete: function() {
                        clearTimeout(r), i && i();
                    },
                    success: function(r) {
                        if (e.indexOf("/log/") > 0) return t({
                            error: !1
                        });
                        r.data.code >= o.constData.CHECK_CODE_MINVALUE && "GET" == u ? o.eventHandle.emit("check-status-code", r, function() {
                            a().then(function(e) {
                                e.error, t.apply(t, arguments);
                            });
                        }) : 0 === r.data.code ? (t(r.data), s && o.hideLoading()) : (t({
                            data: r.data || {},
                            error: !0
                        }), s && o.hideLoading());
                    },
                    fail: function(e) {
                        t({
                            error: !0,
                            msg: e
                        }), console.error(e), o.alert("当前没有网络连接");
                    }
                });
            });
        }();
    }
};

module.exports = a;