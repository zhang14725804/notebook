function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var n, o = e(require("./plugins/network.js")), a = e(require("./plugins/passport/visitor.js")), r = e(require("./plugins/passport/user.js")), s = e(require("./plugins/router.js"));

require("./util/time.js");

var i = require("./util/util.js"), u = require("./util/conf.js"), c = require("./util/log.js"), g = (require("./util/xxtea.js"), 
require("./util/base64.js").Base64), f = require("./util/aes.js"), l = require("./util/digest.js").Digest, d = require("./user/visitor/util/visitor"), h = require("./user/visitor/util/util"), p = require("./user/milogin/util/util"), v = require("./util/tracker.js");

App((n = {
    isConnected: !0,
    networkType: "",
    shareTicket: null,
    path: "",
    scene: 0,
    appInfo: u.appInfo,
    conf: u.conf,
    _installedPlugins: [],
    onLaunch: function(e) {
        (e = e || {}).query && e.query.env && (this.conf.env = e.query.env);
        var t = this;
        t.storageData = {}, this.use(o.default), this.use(a.default), this.use(r.default), 
        this.use(s.default, {
            tabBarUrls: [ "pages/index/index", "pages/cate/index", "pages/discovery/index", "pages/mycart/index", "pages/my/index" ]
        }), wx.getStorage({
            key: "loginInfo",
            success: function(e) {
                t.storageData = e.data || {}, wx.getSystemInfo({
                    success: function(e) {
                        t.storageData.model = e.model, t.storageData.platform = e.platform, t.storageData.version = e.version, 
                        t.storageData.system = e.system, t.storageData.SDKVersion = e.SDKVersion;
                    }
                });
            }
        }), wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(e) {
            t.isConnected = e.isConnected;
        }), this.setMasid(e.query);
    },
    onShow: function(e) {
        var t = this;
        wx.getNetworkType({
            success: function(e) {
                var n = e.networkType;
                t.networkType = n, "none" == n && (t.isConnected = !1);
            }
        }), e && (e.shareTicket && (t.shareTicket = e.shareTicket), t.path = e.path || "", 
        t.scene = e.scene || 0), t.work && (t.work(), t.work = null);
    },
    navigateTo: function(e) {
        wx.navigateTo({
            url: e,
            fail: function() {
                wx.redirectTo({
                    url: e
                });
            }
        });
    },
    onHide: function() {
        this.scene = 0, this.path = "", this.shareTicket = null, wx.removeStorageSync("getWXUserInfoFail");
    },
    getShareInfo: function(e) {
        var t = this, n = t.shareTicket;
        t.shareTicket = null, wx.getShareInfo ? wx.getShareInfo({
            shareTicket: n,
            success: function(n) {
                e && e({
                    path: t.path,
                    iv: n.iv,
                    data: n.encryptedData
                });
            },
            fail: function(t) {
                t.errMsg && (/single chat is not supported/i.test(t.errMsg) || /invalid shareTicket/i.test(t.errMsg)) ? e && e(null) : e && e(!1);
            }
        }) : e(!1);
    },
    afterPost: function(e, t) {
        var n = this;
        return new Promise(function(o) {
            e.notNeedAuth ? o(t) : 10001002 == t.code || 10001008 == t.code ? (postErrorArr.push(e), 
            0 == postCount && n.login().then(function() {
                postErrorArr.forEach(function(e) {
                    n.$http.post(e).then(function(t) {
                        console.log(e), o(t);
                    });
                }), postErrorArr = [], postCount = 0;
            }), ++postCount) : 10001002 !== t.code && 10001008 !== t.code && o(t);
        });
    },
    use: function(e) {
        var t = this._installedPlugins;
        if (t.indexOf(e) > -1) return this;
        var n = function(e, t) {
            t = t || 0;
            for (var n = e.length - t, o = new Array(n); n--; ) o[n] = e[n + t];
            return o;
        }(arguments, 1);
        return n.unshift(this), "function" == typeof e.install ? e.install.apply(e, n) : "function" == typeof e && e.apply(null, n), 
        t.push(e), this;
    },
    getCookie: function(e) {
        var t = this;
        if (!(t.storageData.userInfo && t.storageData.userInfo && t.storageData.userInfo.signature && t.storageData.userInfo && t.storageData.userInfo.rawData)) {
            var n = wx.getStorageSync("userInfo");
            n && (t.storageData.userInfo = n.userInfo, t.storageData.userInfo.signature = n.signature, 
            t.storageData.userInfo.rawData = n.rawData);
        }
        var o = g.encode(t.storageData.userInfo ? t.storageData.userInfo.nickName : ""), a = g.encode(t.storageData.userInfo ? t.storageData.userInfo.rawData : ""), r = t.storageData.userInfo ? t.storageData.userInfo.signature : "", s = wx.getStorageSync("lat") || "", i = wx.getStorageSync("lng") || "", c = wx.getStorageSync("shareObject") || null, l = wx.getStorageSync("masid") || null, d = "";
        l && (new Date() - l.timestamp < 36e5 ? d = l.value : wx.removeStorageSync("masid"));
        var h = wx.getStorageSync("shareChannel") || "", p = t.storageData.platform || "", v = t.storageData.model || "", w = t.storageData.version || "", D = t.storageData.system || "", k = t.storageData.SDKVersion || "", m = t.storageData.userInfo ? t.storageData.userInfo.avatarUrl : "", x = t.storageData.user_token || "", I = f.aes(u.keyStr, (t.storageData.userId || t.storageData.vid) + "_" + new Date().getTime() + "_" + parseInt(1e3 * Math.random(), 10) + "_" + e), T = "client_id=" + u.client_id;
        return T += ";channel_id=" + (c ? "20115.00000" : u.channel_id), T += ";serviceToken=" + encodeURIComponent(t.storageData.serviceToken), 
        T += ";nickName=" + o, T += ";avatar=" + m, T += ";lat=" + s, T += ";lng=" + i, 
        T += ";share_user=" + (c && c.shopId || ""), T += ";share_channel=" + h, T += ";platform=" + p, 
        T += ";model=" + v, T += ";version=" + w, T += ";system=" + D, T += ";SDKVersion=" + k, 
        T += ";mishop_wx_version=" + u.mishop_wx_version, T += ";masid=" + d, T += ";user_token=" + x, 
        T += ";sign_token=" + I, T += ";rawData=" + a, T += ";signature=" + r;
    },
    doLogin: function() {
        var e = this, t = (arguments.length > 0 && void 0 !== arguments[0] && arguments[0], 
        function() {
            return new Promise(function(t) {
                e.$user.checkXmSession().then(function(n) {
                    switch (n) {
                      case 0:
                        if (!e.storageData.userId) return void t();
                        e.$user.checkVisitorIsUnbindXmAccount().then(function(n) {
                            n ? e.changeToVirtualAccount().then(function() {
                                t();
                            }) : t();
                        });
                        break;

                      case 1:
                      case 2:
                        e.$user.passportLogin().then(function() {
                            return t();
                        });
                    }
                }).catch(function(e) {
                    console.log(e);
                });
            });
        });
        return new Promise(function(n) {
            e.$http.checkSession().then(function(o) {
                o ? t().then(function() {
                    return n();
                }) : e.$http.wxLogin().then(t).then(function() {
                    return n();
                });
            });
        });
    },
    login: function() {
        var e = this;
        return new Promise(function(t) {
            e.$user.checkXmSession().then(function(n) {
                switch (n) {
                  case 0:
                    e.$user.checkVisitorIsUnbindXmAccount().then(function(n) {
                        n ? e.changeToVirtualAccount().then(function() {
                            t();
                        }) : t();
                    });
                    break;

                  case 1:
                  case 2:
                    e.$user.passportLogin().then(function() {
                        t();
                    });
                }
            }).catch(function(e) {
                console.log(e);
            });
        });
    },
    checkLogin: function(e) {
        var t = this;
        if (t.storageData.user_token && t.storageData.serviceToken && t.storageData.xm_open_id) if (t.storageData.userId) {
            var n = wx.getStorageSync("timestampOfChangeingVirtualAccount") || 0, o = new Date().getTime();
            t.request("user/checkvisitor", {}, function(a, r) {
                a && a.data && 1 == a.data.length && a.data[0].is_ever_bind && o - n > 12e4 ? t.changeToVirtualAccount() : e && e();
            }, !1, !0);
        } else e && e(); else t.ssoLogin(!1, function() {
            t.storageData.user_token && t.storageData.serviceToken ? e() : t.visitorRegister(e);
        });
    },
    changeToVirtualAccount: function() {
        this.storageData.serviceToken, this.storageData.xm_open_id, this.storageData.userId;
        this.storageData.userId = "", this.storageData.xm_open_id = "", this.storageData.serviceToken = "", 
        this.visitorRegister(function() {
            wx.setStorageSync("checkout:address", ""), wx.setStorageSync("timestampOfChangeingVirtualAccount", new Date().getTime());
            var e = getCurrentPages(), t = "/" + e[e.length - 1].route;
            wx.reLaunch({
                url: t
            });
        });
    },
    getSilencePage: function(e, t) {
        this.request("news/detail", {
            alias_key: e
        }, function(e, n) {
            t && t(e, n);
        }, !1, !0);
    },
    request: function(e, t, n, o, a) {
        var r = this;
        this.isConnected ? wx.getStorageSync("userInfo") ? this.json(u.apiUrl + e, t, function(e, t) {
            void 0 !== e && 0 == e.code ? n && n(e, t) : n && n({}, {
                desc: e.error,
                code: e.code,
                data: e.data
            });
        }, o, a) : wx.getUserInfo({
            withCredentials: !0,
            success: function(s) {
                wx.setStorageSync("userInfo", s), r.json(u.apiUrl + e, t, function(e, t) {
                    void 0 !== e && 0 == e.code ? n && n(e, t) : n && n({}, {
                        desc: e.error,
                        code: e.code,
                        data: e.data
                    });
                }, o, a);
            },
            fail: function(e) {
                wx.navigateTo({
                    url: "/pages/common/authorize/index"
                });
            }
        }) : wx.redirectTo({
            url: "/pages/common/network/index?networkType=" + this.networkType
        });
    },
    json: function(e, t, n, o, a) {
        var r = this;
        if ("{}" !== JSON.stringify(this.storageData)) {
            var s = this, i = s.getCookie(e);
            s.storageData.serviceToken || v.push({
                logCode: "wx#bid=3076643.7&page=milogin",
                clue: "openId:" + s.storageData.xm_open_id + "|uid:" + (s.storageData.userId || "") + "|vid:" + (s.storageData.vid || "") + "|url:" + e,
                analyse: "tap"
            }), wx.request({
                url: e,
                method: "POST",
                data: t,
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    cookie: i
                },
                success: function(r) {
                    if (200 == r.statusCode) {
                        if (10001002 == r.data.code || 10001008 == r.data.code) {
                            if (v.push({
                                logCode: "wx#bid=3076643.6&page=milogin",
                                clue: "openId:" + s.storageData.xm_open_id + "|uid:" + (s.storageData.userId || "") + "|vid:" + (s.storageData.vid || "") + "|url:" + e + "|serviceToken:" + s.storageData.serviceToken,
                                analyse: "tap"
                            }), /user\/loguser$/.test(e)) return void wx.navigateTo({
                                url: s.conf.loginPage
                            });
                            s.storageData.userId ? s.ssoLogin(!0, function() {
                                o ? wx.navigateTo({
                                    url: s.conf.loginPage
                                }) : s.json(e, t, n, !0, a);
                            }) : s.visitorRegister(function() {
                                o ? wx.navigateTo({
                                    url: s.conf.loginPage
                                }) : s.json(e, t, n, !0, a);
                            });
                        } else n && n(r.data);
                        c.send();
                    } else {
                        if (c.save({
                            err: r,
                            url: e
                        }), a) return;
                        wx.redirectTo({
                            url: "/pages/common/index"
                        });
                    }
                },
                fail: function(t) {
                    c.save({
                        err: t,
                        url: e
                    }), a || wx.redirectTo({
                        url: "/pages/common/index"
                    });
                }
            });
        } else this.ssoLogin(!1, function() {
            r.storageData.serviceToken ? r.json(e, t, n, o, a) : r.visitorRegister(function() {
                r.json(e, t, n, o, a);
            });
        });
    },
    wxLogin: function(e) {
        wx.login({
            success: function(t) {
                t.code ? wx.getUserInfo({
                    success: function(n) {
                        e(t, n);
                    },
                    fail: function(e) {
                        wx.navigateTo({
                            url: "/pages/common/authorize/index"
                        });
                    }
                }) : i.showTipsSwitchTab("用户授权失败", "/pages/index/index");
            },
            fail: function(e) {
                wx.navigateTo({
                    url: "/pages/common/authorize/index"
                });
            }
        });
    },
    ssoLogin: function(e, t) {
        var n = this, o = "/" + i.getCurrentPageUrlWithArgs();
        p.login(e, o, function(e) {
            if (e) return 20003 == e.code ? void (n.storageData.vToken ? n.visitorLogin(t) : n.visitorRegister(t)) : void i.showError("登录授权服务异常，请稍后再试或者下载小米商城App");
            t && t();
        });
    },
    visitorRegister: function(e) {
        var t = this;
        h.getWXCode(function(n) {
            h.getWXUserInfo(function(o) {
                var a = {
                    appPackage: t.appInfo.appPackage,
                    appId: t.appInfo.appid,
                    psid: t.appInfo.psid,
                    sid: t.appInfo.sid,
                    userInfo: o,
                    code: n
                };
                o.userInfo;
                d.register(a, function(n, o) {
                    if (o) return i.showError("登录授权服务异常，请稍后再试或者下载小米商城App"), void console.log(o.errMsg);
                    if ("ok" === n.result) {
                        var a = {
                            sid: t.appInfo.sid,
                            visitorPassToken: n.data.visitorPassToken,
                            visitorId: n.data.visitorId
                        }, r = n.data.wechatData || "{}", s = f.aes(u.keyStr, JSON.parse(r).openId);
                        d.login(a, function(n, o) {
                            o ? i.showError("登录授权服务异常，请稍后再试或者下载小米商城App") : "ok" === n.result && (t.storageData.xm_open_id = s, 
                            wx.setStorage({
                                key: "loginInfo",
                                data: t.storageData
                            }), e && e());
                        });
                    }
                });
            });
        });
    },
    visitorLogin: function(e) {
        var t = this, n = {
            sid: t.appInfo.sid,
            visitorPassToken: t.storageData.vToken,
            visitorId: t.storageData.vid
        };
        d.login(n, function(n, o) {
            if (o) return i.showError("登录授权服务异常，请稍后再试或者下载小米商城App"), void console.log(o.errMsg);
            "ok" === n.result && (t.storageData.vToken = n.data.visitorPassToken, t.storageData.serviceToken = n.data.serviceToken || n.data.mieshop_weixin_serviceToken, 
            t.storageData.vid = n.data.visitorId, wx.setStorage({
                key: "loginInfo",
                data: t.storageData
            }), e && e());
        });
    },
    makeCookieSign: function(e, t, n, o) {
        var a = [], r = "", s = [ "POST", e ];
        for (var i in t) a.push([ i, t[i] ]);
        for (var i in n) a.push([ i, n[i] ]);
        a.sort(function(e, t) {
            return e[0] <= t[0] ? -1 : 1;
        }), a.map(function(e, t) {
            s.push(e[0] + "=" + e[1]);
        }), s.push("BEYBuDbVZqYHzAVT+TAAAA=="), r = new l.SHA1().digest(s.join("&")), r = String.fromCharCode.apply(null, new Uint8Array(r)), 
        r = new f.Base64().encode(r, !0), o && (n.userInfo = encodeURIComponent(JSON.stringify(o))), 
        n._sign = r;
        var u = [];
        for (var i in n) u.push(i + "=" + n[i]);
        return t.cookie = u.join(";"), t;
    },
    getValueInArr: function(e, t) {
        for (var n = 0, o = e.length; n < o; n++) if (e[n].name == t) return e[n].value;
    },
    getUserInfo: function(e) {
        var t = this;
        this.storageData.userInfo ? "function" == typeof e && e(this.storageData.userInfo) : wx.getUserInfo({
            success: function(n) {
                t.storageData.userInfo = n.userInfo, "function" == typeof e && e(t.storageData.userInfo);
            }
        });
    },
    setMasid: function(e) {
        e && e.masid && wx.setStorageSync("masid", {
            value: e.masid,
            timestamp: new Date().getTime()
        });
    }
}, t(n, "use", function(e) {
    if (!e.installed) {
        var t = this._toArray(arguments, 1);
        return t.unshift(this), "function" == typeof e.install ? e.install.apply(e, t) : "function" == typeof e && e.apply(null, t), 
        e.installed = !0, this;
    }
}), t(n, "_toArray", function(e, t) {
    t = t || 0;
    for (var n = e.length - t, o = new Array(n); n--; ) o[n] = e[n + t];
    return o;
}), t(n, "loginProxy", function(e, t) {
    var n = this;
    this.request("webview/location", {
        url: e.url,
        login: e.login
    }, function(o, a) {
        if (a) switch (a.code) {
          case 10001005:
            i.showError("H5链接或登录链接不合法");
            break;

          case 10001006:
            i.showLoading(), n.doLogin().then(function(e) {
                (n.storageData.vid || "") && n.ssoLogin(!0, function() {
                    i.hideLoading();
                });
            });
            break;

          case 10001007:
            n.$router.navigateTo({
                url: "/pages/webview/index?url=" + encodeURIComponent(e.url)
            });
        } else p.getWXCode(function(e, n) {
            p.getWXUserInfo(function(n) {
                var a = n, r = {
                    sid: o.data.sid,
                    appid: "wx17ea87763491620f",
                    code: e,
                    userInfo: a
                };
                p.wxSnsLogin(r, function(n, r) {
                    if (0 === n.code) {
                        var s = n.data.wxSToken, i = {
                            code: e,
                            sid: o.data.sid,
                            appid: "wx17ea87763491620f",
                            callback: o.data.callback,
                            authType: o.data.authType,
                            wxSToken: s,
                            userInfo: a
                        };
                        p.tokenLogin(i, function(e, n) {
                            t && t(e, n);
                        });
                    }
                });
            });
        });
    });
}), n));