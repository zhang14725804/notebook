function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function n() {
    try {
        var e = wx.getStorageSync(f);
        return "" === e ? null : e;
    } catch (e) {
        console.error("getStorageSync fail:", e);
    }
}

function i(e) {
    try {
        wx.setStorageSync(f, e);
    } catch (e) {
        console.error("setStorageSync fail:", e);
    }
}

function o() {
    try {
        return wx.getStorageSync(g) || null;
    } catch (e) {
        return console.error("[Login] Get qq session fail:", e), null;
    }
}

function t(e) {
    return !e || e.timestamp + 1e3 * (e.wxuser || e.qquser).accessTokenExpireTime - 18e5 < Date.now();
}

function r() {
    return console.log("setGuestMode"), h = {
        main_login: "wx",
        vuser: {
            ddwVuser: 0,
            vsessionKey: ""
        },
        wxuser: {
            accessToken: "",
            accessTokenExpireTime: 2100,
            refreshToken: "",
            wxOpenId: "guest",
            appId: l
        },
        isVip: !1
    };
}

function s(e, n, t) {
    function a(o) {
        return function(s) {
            var a = {};
            switch (o) {
              case "wx":
                a = {
                    TokenAppID: l,
                    TokenKeyType: 101,
                    TokenValueString: s.code
                };
                break;

              case "qq":
                a = {
                    TokenAppID: "100498506",
                    bMainLogin: !0,
                    TokenKeyType: 10,
                    TokenValue: s.ticket.split("").map(function(e) {
                        return e.charCodeAt(0);
                    }),
                    TokenID: s.openid
                };
            }
            p.all([ u.vaccess("new_login", {
                curLoginTokenList: [ a ],
                from: 0
            }) ]).then(function(t) {
                console.log("#{New Login}", t);
                var a = t[0];
                if (a && a.innerToken && a.innerToken.ddwVuser) {
                    var u = !!h && h.isVip, g = a.wxUserTokenInfo, p = a.qqUserTokenInfo, m = a.innerToken, w = h;
                    console.log("#{Login Set VIP}", u), h = {
                        main_login: o,
                        vuser: m,
                        wxuser: g && g.wxOpenId ? g : null,
                        qquser: p && p.qqUin ? p : null,
                        timestamp: Date.now(),
                        isVip: u
                    }, g && (g.wxNickName = null, g.wxFaceImageUrl = null, g.appId = l, isNaN(g.accessTokenExpireTime) && (g.accessTokenExpireTime = 7200), 
                    g.accessTokenExpireTime > m.dwExpireTime && (g.accessTokenExpireTime = m.dwExpireTime)), 
                    p && (p.appId = l, p.accessTokenExpireTime = m.dwExpireTime, p.openid = s.openid, 
                    p.accessToken = s.ticket), k = null, i(h);
                    try {
                        e(null, h);
                    } finally {
                        w && c(w) != c(h) && T.emit("login:change", h);
                    }
                } else if (console.error("new_login fail", t), n) {
                    var x = void 0;
                    try {
                        x = "new_login cgi fail:" + JSON.stringify(t), e(x, r());
                    } catch (n) {
                        e(x = "new_login cgi fail:" + t, r());
                    }
                } else f();
            }).catch(function(i) {
                if (console.error("new_login request catch error", i), n) if ("qq" == t) f("wx"); else {
                    var o = "new_login request catch error:" + JSON.stringify(i);
                    e(o, r()), T.emit("login", o);
                } else f();
            });
        };
    }
    var f = function(n) {
        setTimeout(function() {
            s(e, !0, n || t);
        }, 2e3);
    }, g = o();
    g && "qq" == t ? (console.log("#{Login} qq", g), a("qq")(g)) : wx.login({
        success: function(i) {
            console.log("#{Login} wx", i), i.code ? a("wx")(i) : (console.error("获取用户授权失败！" + i.errMsg), 
            n ? e(i.errMsg, r()) : f());
        },
        fail: function(n) {
            e("wx.login fail:" + n.errMsg);
        },
        complete: function() {}
    });
}

function c(e) {
    return (e = e.wxuser || e.qquser || {}).wxOpenId || e.qqUin;
}

var a = function() {
    function e(e, n) {
        for (var i = 0; i < n.length; i++) {
            var o = n[i];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(n, i, o) {
        return i && e(n.prototype, i), o && e(n, o), n;
    };
}(), u = require("./request/_request.js"), l = "wxa75efa648b60994b", f = "login_user", g = "qq_login_session", p = require("./es6-promise"), m = require("./globalData.js"), w = require("./message"), x = require("./fns"), T = new w(), h = null, q = !1, d = null, k = null, v = !1, I = null, y = {
    isExpire: function() {
        return !h || h.timestamp + 1e3 * (h.wxuser || h.qquser).accessTokenExpireTime < Date.now();
    },
    isBeingLogin: function() {
        return !!q;
    },
    onLoginChange: function(e) {
        return T.on("login:change", e);
    },
    onLoginEnd: function(e) {
        this.isBeingLogin() && d ? d.then(e, e) : h ? e && e() : T.on("login:end", x.once(e));
    },
    refreshLogin: function(e, i, o) {
        if (i && (v = !0), q) e && d.then(function(n) {
            return e(null, n);
        }).catch(function(n) {
            return e(n);
        }); else {
            var r = this;
            h || (h = n()) && (h.main_login = h.main_login && "undefined" != h.main_login ? h.main_login : "wx"), 
            q = !0, console.log("#{Login} ExpireTime is:" + (h ? Math.floor((h.timestamp + 1e3 * (h.wxuser || h.qquser).accessTokenExpireTime - Date.now()) / 6e4) : "null") + "min"), 
            (d = new p(function(e, n) {
                o || t(h) ? (console.log("#{Login} refresh login", o), s(function(i, o) {
                    i ? (n(i), q = !1) : v ? r.getVipInfo(function() {
                        v = !1, e(o), q = !1;
                    }) : (e(o), q = !1, r.getVipInfo(function() {}));
                }, !1, o)) : v ? (console.log("#{Login} waitForVip", h), !h.lastUpate || Date.now() - h.lastUpate > 6e4 ? r.getVipInfo(function() {
                    v = !1, e(h), q = !1;
                }) : (v = !1, e(h), q = !1)) : (e(h), q = !1, (!h.lastUpate || Date.now() - h.lastUpate > 6e4) && r.getVipInfo());
            })).then(function(e) {
                T.emit("login:end", null, e);
            }, function(e) {
                T.emit("login:end", e);
            }), e && d.then(function(n) {
                return e(null, n);
            }).catch(function(n) {
                return e(n);
            });
        }
    },
    getUserInfo: function(e, n, i) {
        !h || !n && this.isExpire() ? this.refreshLogin(e, i) : e(null, h);
    },
    getLoginInfo: function(e, n) {
        function i(n) {
            if (!n) return null;
            if ("wx" == n.main_login) {
                var i = n.wxuser;
                m.getWxUserInfo(function(o) {
                    e(null, {
                        type: n.main_login,
                        nickName: o.nickName,
                        avatarUrl: o.avatarUrl,
                        openid: i.wxOpenId,
                        isVip: n.isVip
                    });
                });
            } else if ("qq" == n.main_login) {
                var o = n.qquser;
                e(null, {
                    type: n.main_login,
                    nickName: o.qqNickName,
                    avatarUrl: o.qqFaceImageUrl,
                    uin: o.qqUin,
                    isVip: n.isVip
                });
            }
        }
        !h || this.isExpire() ? this.refreshLogin(function(n, o) {
            if (n) return e(n);
            i(o);
        }, n) : i(h);
    },
    getUserInfoSync: function() {
        return h;
    },
    getReqHeader: function() {
        return h ? (k || (k = {
            Cookie: "main_login=" + h.main_login + "; appid=" + l + "; vuserid=" + h.vuser.ddwVuser + "; vusession=" + h.vuser.vsessionKey + ("wx" == h.main_login ? "; openid=" + (h.wxuser || {}).wxOpenId + "; access_token=" + (h.wxuser || {}).accessToken : "; openid=" + ((h.qquser || {}).openid || "") + "; uin=" + (h.qquser || {}).qqUin + "; login_case=1")
        }), k) : {
            Cookie: ""
        };
    },
    getVipInfo: function(e, n) {
        if (e || (e = function() {}), h) {
            var i = this, o = function() {
                setTimeout(function() {
                    i.getVipInfo(e, !0);
                }, 2e3);
            };
            this.getUserInfo(function() {
                h.lastUpate = +Date.now(), u.vaccess("user_profile", {
                    iVersion: 0,
                    vecFields: [ "vipinfo" ]
                }, i.getReqHeader()).then(function(i) {
                    if (i && i.stVipInfo) {
                        if (h.isVip != (1 == i.stVipInfo.iStatus)) {
                            h.isVip = 1 == i.stVipInfo.iStatus;
                            try {
                                wx.setStorageSync(f, h);
                            } catch (e) {
                                console.error("setStorageSync fail:", e);
                            }
                        }
                        e(null, i.stVipInfo);
                    } else if (n) try {
                        e("getVipInfo fail, return:" + JSON.stringify(i));
                    } catch (n) {
                        e("getVipInfo fail, return:" + i);
                    } else o();
                }).catch(function(i) {
                    console.error("getVipInfo fail", i), n ? e("getVipInfo fail:" + JSON.stringify(i)) : o();
                });
            });
        } else e("not login");
    },
    clearCache: function() {
        h = null, k = null, i("");
    },
    setQQSession: function(e) {
        try {
            wx.setStorageSync(g, e);
        } catch (e) {
            console.error("[Login] Set qq session fail:", e);
        }
    },
    clearQQSession: function() {
        try {
            wx.removeStorageSync(g);
        } catch (e) {
            console.error("[Login] Remove qq session fail:", e);
        }
    },
    qqLogin: function(e) {
        wx.navigateToMiniProgram({
            appId: "wxc5df8e3b60d4b4a2",
            path: "pages/login",
            extraData: {
                uin: "",
                tickets: [ {
                    name: "access_token",
                    appid: "100498506",
                    domain: ""
                } ]
            },
            success: function(n) {
                e && e(null, n);
            },
            fail: function(n) {
                e && e(n);
            }
        });
    },
    getPayUser: function() {
        var e = this;
        return new p(function(n, i) {
            e.getUserInfo(function(e, o) {
                var t = o.main_login, r = o.wxuser, s = o.timestamp;
                if (e) return i(e);
                if ("wx" == t) return I = new V({
                    expireTime: r.accessTokenExpireTime,
                    openid: r.wxOpenId,
                    accessToken: r.accessToken,
                    timestamp: s
                }), n(I);
                if ("qq" == t) {
                    if (I || (I = new V()), !I.needRefresh()) return n(I);
                    I.refresh().then(function(e) {
                        n(I);
                    }).catch(function(e) {
                        i(e);
                    });
                }
            });
        });
    }
}, V = function() {
    function n() {
        var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = i.expireTime, t = i.openid, r = i.accessToken, s = i.timestamp;
        e(this, n), this.expireTime = o, this.openid = t, this.accessToken = r, this.timestamp = s;
    }
    return a(n, [ {
        key: "needRefresh",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1800;
            return !this.openid || !this.accessToken || !this.timestamp || !this.expireTime || this.timestamp + 1e3 * this.expireTime - 1e3 * e < Date.now();
        }
    }, {
        key: "refresh",
        value: function() {
            var e = this;
            return new p(function(n, i) {
                wx.login({
                    success: function(o) {
                        var t = o.code;
                        u.vaccess("new_login", {
                            curLoginTokenList: [ {
                                TokenAppID: l,
                                TokenKeyType: 101,
                                TokenValueString: t
                            } ],
                            from: 0
                        }).then(function(i) {
                            var o = i.wxUserTokenInfo, t = i.innerToken;
                            e.timestamp = Date.now(), e.expireTime = o.accessTokenExpireTime, isNaN(e.expireTime) && (e.expireTime = 7200), 
                            e.expireTime > t.dwExpireTime && (e.expireTime = t.dwExpireTime), e.openid = o.wxOpenId, 
                            e.accessToken = o.accessToken, n(e);
                        }).catch(function(e) {
                            i(e);
                        });
                    },
                    fail: function(e) {
                        i(e);
                    }
                });
            });
        }
    } ]), n;
}();

module.exports = y, setInterval(function() {
    t(h) && y.refreshLogin(function() {}, !0);
}, 6e5);