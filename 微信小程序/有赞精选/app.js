!function() {
    require("./common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 3 ], {
    168: function(e, t, a) {
        a(135), e.exports = a(229);
    },
    229: function(e, t, a) {
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        function s() {
            1 <= I ? (I--, this.login()) : wx.showModal({
                title: "网络错误",
                content: "登录失败"
            });
        }
        function n(e, t) {
            1 <= p ? (p--, this.getAccessToken(e)) : wx.showModal({
                title: "鉴权失败",
                content: t && t.code && "错误码：" + t.code || "网络错误"
            });
        }
        function r(e, t) {
            console.log("%c " + e + " >>> ", "background:#000; color:#bada55", t);
        }
        var l = o(a(4)), i = o(a(96)), c = o(a(3)), d = (o(a(97)), o(a(231))), u = o(a(232)), g = o(a(233)), f = o(a(0)), h = a(237);
        a(135);
        var b = "1.1.0", k = null, I = 3, p = 3;
        App((0, c.default)({}, i.default, {
            onLaunch: function() {
                k = this, this.db = u.default, this.carmen = (0, d.default)(this), this.storage = (0, 
                g.default)(this), this.globalData.refreshToken = wx.getStorageSync("refreshToken"), 
                this.globalData.userId = wx.getStorageSync("userId"), this.globalData.token = wx.getStorageSync("accessToken"), 
                this.globalData.buyerId = wx.getStorageSync("buyerId"), this.globalData.openId = wx.getStorageSync("openId"), 
                this.globalData.mobile = wx.getStorageSync("mobile"), r("refresh_token", (0, l.default)(this.globalData.refreshToken)), 
                r("accesss_token", (0, l.default)(this.globalData.token)), this.getWXUserInfo();
                var e = "hasOpenInThisVersion_" + b, t = wx.getStorageSync(e), a = wx.getStorageSync("nameAlias");
                r("name_alias", a), t && this.globalData.token && a ? this.checkWXSession() : (this.login(), 
                wx.setStorage({
                    key: e,
                    data: !0
                }));
            },
            onShow: function(e) {
                r("app show", e), this.setYzLoggerData(e), this.setLogv2BizInfo(), f.default.app.show(arguments[0]), 
                this.fetchAreaMapData();
            },
            setLogv2BizInfo: function() {
                var e = {};
                this.globalData.token && (e.token = this.globalData.token), this.globalData.userId && (e.userId = this.globalData.userId), 
                this.globalData.openId && (e.openId = this.globalData.openId), this.globalData.buyerId && (e.buyerId = this.globalData.buyerId), 
                this.globalData.mobile && (e.mobile = this.globalData.mobile), e.biz = "choice", 
                e.appId = this.getAppId(), f.default.setGlobalData(e);
            },
            setYzLoggerData: function(e) {
                this.logger = new h.yzLogger({
                    plat: {
                        yai: "choice"
                    },
                    user: {
                        li: this.globalData.userId
                    },
                    event: {
                        si: ""
                    }
                }), this.globalData.scene = e.scene, this.logger.addSessionParams({
                    appId: k.getAppId(),
                    scene: e.scene
                }, 525600), this.logger.appShow();
            },
            isDebug: function() {
                return !1;
            },
            checkWXSession: function() {
                var e = this;
                wx.checkSession({
                    success: function() {
                        r("check session", "登录态未过期"), e.needRefreshToken() ? e.refreshAccessToken() : e.getAddressList();
                    },
                    fail: function() {
                        r("check session", "登录态已过期"), e.login();
                    }
                });
            },
            login: function() {
                var e = this;
                try {
                    e.clearLoginDataInStorage();
                } catch (e) {}
                wx.login({
                    success: function(t) {
                        t.code ? (r("login", "获取用户登录态成功"), e.getAccessToken(t.code), e.getWXUserInfo()) : (s.call(e), 
                        r("login", t.errMsg));
                    },
                    fail: function(t) {
                        s.call(e), r("login", t);
                    }
                });
            },
            getWXUserInfo: function(e) {
                var t = this;
                wx.getUserInfo({
                    success: function(a) {
                        r("get user info", "获取用户信息成功"), t.globalData.userInfo = a.userInfo, "" == a.userInfo.nickName || void 0 === a.userInfo.nickName || (wx.setStorage({
                            key: "userInfo",
                            data: a.userInfo
                        }), e && e.success && e.success());
                    },
                    fail: function() {
                        r("get user info", "获取用户信息失败"), e && e.fail && e.fail();
                    }
                });
            },
            getAccessToken: function(e) {
                var t = this;
                wx.request({
                    url: "https://uic.youzan.com/sso/wx/getThirdAuthSessionKey",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        appId: this.getAppId(),
                        clientId: "147aaa10c1f67261c3",
                        clientSecret: "b0f1f0c5ef6eecf79cb958b706da1de4",
                        code: encodeURIComponent(e),
                        grantType: "yz_union"
                    },
                    method: "POST",
                    success: function(a) {
                        if (r("get access token", a.data), a.data && a.data.data) {
                            var o = a.data.data;
                            if (o.access_token && (t.globalData.token = o.access_token, wx.setStorage({
                                key: "accessToken",
                                data: t.globalData.token
                            }), t.trigger("onTokenRefresh"), t.getAddressList(), wx.setStorage({
                                key: "getTokenTime",
                                data: Date.now()
                            })), o.open_id && (t.globalData.openId = o.open_id, wx.setStorage({
                                key: "openId",
                                data: t.globalData.openId
                            })), o.mobile && (t.globalData.mobile = o.mobile, wx.setStorage({
                                key: "mobile",
                                data: t.globalData.mobile
                            })), o.refresh_token && (t.globalData.refreshToken = o.refresh_token, wx.setStorage({
                                key: "refreshToken",
                                data: t.globalData.refreshToken
                            })), o.user_id) {
                                var s = o.user_id;
                                t.globalData.userId = s, wx.setStorage({
                                    key: "userId",
                                    data: s
                                }), k.carmen({
                                    api: "weapp.spotlight.goods.share.count/1.0.0/add",
                                    data: {
                                        uid: s
                                    },
                                    method: "POST",
                                    success: function(e) {
                                        var t = e.uid_alias;
                                        wx.setStorage({
                                            key: "nameAlias",
                                            data: t
                                        });
                                    }
                                });
                            }
                            o.buyer_id ? (this.globalData.buyerId = o.buyer_id, wx.setStorage({
                                key: "buyerId",
                                data: this.globalData.buyerId
                            })) : t.getWXUserInfo({
                                success: function() {
                                    t.uploadWXUserInfo();
                                }
                            });
                            try {
                                t.logger.options.user.li = s;
                            } catch (e) {
                                console.error(e);
                            }
                            t.setLogv2BizInfo(), setTimeout(function() {
                                t.trigger("app:token:success", t.globalData.token);
                            }, 10);
                        } else n.call(t, e, a && a.data);
                    },
                    fail: function(a) {
                        n.call(t, e, a);
                    }
                });
            },
            refreshAccessToken: function() {
                var e = this;
                r("refresh access token", "开始刷新token"), wx.request({
                    url: "https://uic.youzan.com/sso/wx/refreshToken",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        clientId: "147aaa10c1f67261c3",
                        clientSecret: "b0f1f0c5ef6eecf79cb958b706da1de4",
                        grantType: "refresh_token",
                        refreshToken: e.globalData.refreshToken
                    },
                    method: "POST",
                    success: function(t) {
                        if (r("refresh access token", t.data), t.data && 200 == t.data.code && t.data.data) {
                            var a = t.data.data;
                            a.access_token && (e.globalData.token = a.access_token, wx.setStorage({
                                key: "accessToken",
                                data: e.globalData.token
                            }), e.trigger("onTokenRefresh"), wx.setStorage({
                                key: "getTokenTime",
                                data: Date.now()
                            }), e.getAddressList()), a.refresh_token && (e.globalData.refreshToken = a.refresh_token, 
                            wx.setStorage({
                                key: "refreshToken",
                                data: e.globalData.refreshToken
                            }));
                        } else e.login();
                    },
                    fail: function() {
                        e.login();
                    }
                });
            },
            uploadWXUserInfo: function() {
                var e = this;
                wx.request({
                    url: "https://uic.youzan.com/sso/wx/updateUserInfo",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        userId: e.getUserId(),
                        nickName: e.globalData.userInfo.nickName,
                        gender: e.globalData.userInfo.gender,
                        avatarUrl: e.globalData.userInfo.avatarUrl
                    },
                    method: "POST",
                    success: function(e) {
                        r("upload user info", e.data), e.data && 0 === e.data.code && r("upload user info", "更新用户信息成功");
                    },
                    fail: function() {}
                });
            },
            getAddressList: function() {
                var e = this;
                wx.request({
                    url: "https://carmen.youzan.com/gw/oauthentry/account.address/1.0.0/get?access_token=" + this.globalData.token + "&type=1",
                    method: "GET",
                    success: function(t) {
                        if (t.data.response) {
                            var a = t.data.response;
                            e.globalData.chooseAddress = !!(0 < a.length);
                        }
                    },
                    fail: function() {}
                });
            },
            setBuyerId: function(e) {
                this.globalData.buyerId = e, wx.setStorage({
                    key: "buyerId",
                    data: e
                });
            },
            getBuyerId: function() {
                return this.globalData.buyerId;
            },
            getUserId: function() {
                var e = this.getBuyerId();
                return console.log(e), null != e && "" != e ? e : this.globalData.userId;
            },
            needRefreshToken: function() {
                var e = Date.now(), t = wx.getStorageSync("getTokenTime");
                return !t || e - t > 2592e5;
            },
            isBindYouzanAccount: function() {
                var e = this.getBuyerId();
                return !(null == e || "" == e);
            },
            getMobile: function() {
                return this.globalData.mobile;
            },
            getOpenId: function() {
                return this.globalData.openId;
            },
            getToken: function() {
                return this.globalData.token;
            },
            getUserInfo: function() {
                var e = this.globalData.userInfo;
                return e || (e = wx.getStorageSync("userInfo"), this.globalData.userInfo = e), e;
            },
            setDefaultAddress: function(e) {
                this.setNewDefaultAddress(e, !1);
            },
            setNewDefaultAddress: function(e, t) {
                this.globalData.defaultAddress = e, wx.setStorageSync("defaultAddress", this.globalData.defaultAddress), 
                1 == t && k.trigger("refreshOrderAddress");
            },
            canChooseAddress: function() {
                return this.globalData.chooseAddress;
            },
            getDefaultAddress: function() {
                return this.globalData.defaultAddress ? this.globalData.defaultAddress : (this.globalData.defaultAddress = wx.getStorageSync("defaultAddress"), 
                this.globalData.defaultAddress);
            },
            getAppId: function() {
                return "wxf1fdc416d4ced1b3";
            },
            clearLoginDataInStorage: function() {
                wx.removeStorageSync("getTokenTime"), wx.removeStorageSync("openId"), wx.removeStorageSync("accessToken"), 
                wx.removeStorageSync("refreshToken"), wx.removeStorageSync("userId"), wx.removeStorageSync("hasOpenInThisVersion" + b);
            },
            globalData: {
                userInfo: null,
                token: null,
                refreshToken: null,
                userId: null,
                buyerId: null,
                chooseAddress: !1,
                db: {}
            },
            getSystemInfoSync: function() {
                return this.globalData.systemInfo || (this.globalData.systemInfo = wx.getSystemInfoSync()), 
                this.globalData.systemInfo;
            },
            fetchAreaMapData: function(e, t) {
                var a = wx.getStorageSync("trade:address:area-map");
                return a ? e && e(a) : void k.carmen({
                    api: "kdt.address.map/1.0.0/get",
                    success: function(t) {
                        var a = t.data || [], o = {};
                        o.province = a[0].Province, o.city = a[1].Citys, o.county = a[2].County, wx.setStorageSync("trade:address:area-map", o), 
                        e && e(o);
                    },
                    fail: function(e) {
                        t && t(e.msg);
                    }
                });
            }
        }));
    }
}, [ 168 ]);