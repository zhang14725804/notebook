(function() {
    function e(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    function t(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }
    var a = Object.assign || function(e) {
        for (var t, a = 1; a < arguments.length; a++) for (var r in t = arguments[a], t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        return e;
    }, r = function() {
        function e(e, t) {
            for (var a, r = 0; r < t.length; r++) a = t[r], a.enumerable = a.enumerable || !1, 
            a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a);
        }
        return function(t, a, r) {
            return a && e(t.prototype, a), r && e(t, r), t;
        };
    }(), n = require("./ppdog"), o = e(n), u = require("./regenerator-runtime"), i = e(u), d = require("../filter/response"), l = e(d), s = require("../filter/qtFilter"), p = e(s), f = require("../libs/sqtRequest"), c = e(f), m = require("../libs/ann-log/index"), g = e(m), h = require("./is"), k = e(h), y = require("./extend"), w = e(y), x = require("../libs/immutable"), q = e(x), v = require("./md5sign"), b = e(v), S = 1, L = "https://proxyplus.finance.qq.com", R = "https://proxyplus.finance.qq.com";
    3 == S;
    var _ = "https://proxy.finance.qq.com/ifzqgtimg/appstock/news", U = "https://proxyplus.finance.qq.com/group";
    3 == S;
    var I = "", D = q.default.Map(), C = function() {
        function e() {
            t(this, e), this.userinfo = null;
        }
        return r(e, [ {
            key: "auth",
            value: function() {
                var e = this;
                return o.default.co(i.default.mark(function t() {
                    var a, r, n;
                    return i.default.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            if (null !== e.userinfo) {
                                t.next = 18;
                                break;
                            }
                            return t.next = 3, o.default.wx.login();

                          case 3:
                            if (a = t.sent, r = a.code, n = a.openid, k.default.undef(n) || k.default.empty(n)) {
                                t.next = 11;
                                break;
                            }
                            return t.next = 8, e.getLogin({
                                openid: n
                            });

                          case 8:
                            e.userinfo = t.sent, t.next = 15;
                            break;

                          case 11:
                            if (k.default.undef(r) || k.default.empty(r)) {
                                t.next = 15;
                                break;
                            }
                            return t.next = 14, e.getLogin({
                                code: r
                            });

                          case 14:
                            e.userinfo = t.sent;

                          case 15:
                            g.default.log("UserInfo", e.userinfo), t.next = 22;
                            break;

                          case 18:
                            if (!e.userinfo.code || e.userinfo.sid) {
                                t.next = 22;
                                break;
                            }
                            return t.next = 21, e.getLogin({
                                code: e.userinfo.code
                            });

                          case 21:
                            e.userinfo = t.sent;

                          case 22:
                            return t.abrupt("return", e.userinfo);

                          case 23:
                          case "end":
                            return t.stop();
                        }
                    }, t, this);
                })).catch(function(e) {
                    g.default.error("UserInfo Error", e), getApp().Event.emit("operateStockNetworkError", {
                        err: e
                    });
                });
            }
        }, {
            key: "getLogin",
            value: function(e) {
                var t, a = e.code, r = e.openid, n = this;
                return t = a ? U + "/newstockgroup/commentPlat/miniUserInfo?code=" + a + "&appid=wx4ffb369b6881ee5e" : L + "/newstock/stockapp/Weixin/userInfo3?app=qb&openid=" + r, 
                o.default.wx.request({
                    url: t
                }).filter(l.default).then(function(e) {
                    var t = e.openid, a = e.sid;
                    return n.userinfo = {
                        openid: t,
                        sid: a
                    }, o.default.wx.setStorage({
                        key: "userinfo",
                        data: n.userinfo
                    }).complete(function() {
                        return n.userinfo;
                    });
                }).catch(function(e) {
                    if (g.default.error("getLogin Error", e), "string" == typeof e && 0 <= e.indexOf("get qq by openid failed")) {
                        throw "new user";
                    }
                    throw e;
                });
            }
        }, {
            key: "formatURL",
            value: function(e, t) {
                var a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}, r = arguments[3], n = 0 <= e.indexOf("?") ? "&" : "?", o = this.userinfo || t || {}, u = o.openid, i = o.sid, d = {
                    check: a && a.check || 8,
                    app: "plus",
                    appid: "wx4ffb369b6881ee5e",
                    token: "ry",
                    openid: u,
                    sid: i
                };
                d.sign = (0, b.default)(d, a, !0);
                var l = [];
                for (key in d) l.push(key + "=" + d[key]);
                var s = l.join("&"), p = L;
                r && r.sq ? p = U : r && r.special && (p = R);
                var f = "" + p + e + n + s;
                return f;
            }
        }, {
            key: "getList",
            value: function() {
                var e = this, t = require("../filter/stockListFilter");
                return this.auth().then(function(a) {
                    if ("string" == typeof a && "new user" == a) {
                        throw a;
                    }
                    var r = a.openid, n = a.uin, u = e.formatURL("/newstock/stockapp/zixuangu/stocklist", a, null, {
                        special: !0
                    });
                    return o.default.wx.request({
                        url: u
                    }).filter(l.default).filter(t).then(function(t) {
                        return e.setGid(I || t.onGid), D = D.mergeDeep(q.default.fromJS(t)), D;
                    }).catch(function(e) {
                        g.default.error("GetList Error", e), console.error("GetList Error", e);
                    });
                });
            }
        }, {
            key: "getListQtData",
            value: function() {
                var e = q.default.fromJS(getApp().config.ZSSymbols), t = D.getIn([ "stockListMap", I, "listData" ]).map(function(e) {
                    return e.get("Qtsymbol");
                }).concat(e);
                return c.default.get({
                    symbol: t.toArray(),
                    key: [ "Name", "Mkt", "Status", "Code", "Price", "Chg", "ChgRatio", "CS", "MktCap_H", "Open", "PrevClose" ]
                }).then(function(t) {
                    var a = D.getIn([ "stockListMap", I, "listData" ]).map(function(e) {
                        var a = e.get("Qtsymbol");
                        return t[a] ? e.merge(q.default.fromJS(t[a])) : e;
                    }), r = e.map(function(e) {
                        return t[e] ? q.default.fromJS(t[e]) : D.get("zsData").find(function(t) {
                            return t.get("Symbol") === e || "r_" + t.get("Symbol") === e;
                        });
                    });
                    return D = D.mergeIn([ "stockListMap", I, "listData" ], a).set("zsData", r), D.getIn([ "stockListMap", I ]).merge({
                        zsData: r
                    });
                });
            }
        }, {
            key: "getCacheListDataByGid",
            value: function() {
                var e = this;
                return o.default.co(i.default.mark(function t() {
                    var a, r;
                    return i.default.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            if (a = void 0, !(0 < D.size)) {
                                t.next = 8;
                                break;
                            }
                            return t.next = 4, e.getGid();

                          case 4:
                            r = t.sent, a = D.getIn([ "stockListMap", r ]), t.next = 11;
                            break;

                          case 8:
                            return t.next = 10, o.default.wx.getStorage({
                                key: "listData"
                            }).then(function(t) {
                                return D = q.default.fromJS(t.data), e.getGid().then(function(e) {
                                    return D.getIn([ "stockListMap", e ]);
                                });
                            }).catch(function() {
                                return e.getList().then(function(t) {
                                    return o.default.co(i.default.mark(function a() {
                                        var r;
                                        return i.default.wrap(function(a) {
                                            for (;;) switch (a.prev = a.next) {
                                              case 0:
                                                return a.next = 2, e.getGid();

                                              case 2:
                                                return r = a.sent, a.abrupt("return", t.getIn([ "stockListMap", r ]));

                                              case 4:
                                              case "end":
                                                return a.stop();
                                            }
                                        }, a, this);
                                    }));
                                });
                            });

                          case 10:
                            a = t.sent;

                          case 11:
                            return t.abrupt("return", a);

                          case 12:
                          case "end":
                            return t.stop();
                        }
                    }, t, this);
                })).catch(function(e) {
                    console.log(e);
                });
            }
        }, {
            key: "getGroups",
            value: function() {
                var e = this;
                return o.default.co(i.default.mark(function t() {
                    var a;
                    return i.default.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            if (a = void 0, !(0 < D.size)) {
                                t.next = 5;
                                break;
                            }
                            a = D.get("groups"), t.next = 8;
                            break;

                          case 5:
                            return t.next = 7, o.default.wx.getStorage({
                                key: "listData"
                            }).then(function(e) {
                                return e.data.groups;
                            }).catch(function() {
                                return e.getList().then(function(e) {
                                    return o.default.co(i.default.mark(function t() {
                                        return i.default.wrap(function(t) {
                                            for (;;) switch (t.prev = t.next) {
                                              case 0:
                                                return t.abrupt("return", e.get("groups"));

                                              case 1:
                                              case "end":
                                                return t.stop();
                                            }
                                        }, t, this);
                                    }));
                                });
                            });

                          case 7:
                            a = t.sent;

                          case 8:
                            return t.abrupt("return", {
                                onGid: I,
                                groups: a.toJS()
                            });

                          case 9:
                          case "end":
                            return t.stop();
                        }
                    }, t, this);
                })).catch(function(e) {
                    console.log(e);
                });
            }
        }, {
            key: "syncListData",
            value: function() {
                return o.default.wx.setStorage({
                    key: "listData",
                    data: D.toJS()
                });
            }
        }, {
            key: "hasStock",
            value: function(e) {
                var t = this;
                return o.default.co(i.default.mark(function a() {
                    var r, n;
                    return i.default.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            return a.next = 2, t.getCacheListDataByGid();

                          case 2:
                            return r = a.sent, n = r.get("listData").findIndex(function(t) {
                                return t.get("Symbol") === e;
                            }), a.abrupt("return", -1 !== n);

                          case 5:
                          case "end":
                            return a.stop();
                        }
                    }, a, this);
                }));
            }
        }, {
            key: "getStock",
            value: function(e) {
                var t = this;
                return o.default.co(i.default.mark(function a() {
                    var r;
                    return i.default.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            return a.next = 2, t.getCacheListDataByGid();

                          case 2:
                            return r = a.sent, a.abrupt("return", r.get("listData").find(function(t) {
                                return t.get("Symbol") === e;
                            }));

                          case 4:
                          case "end":
                            return a.stop();
                        }
                    }, a, this);
                }));
            }
        }, {
            key: "setGid",
            value: function(e) {
                return I != e && (o.default.wx.setStorage({
                    key: "GID",
                    data: e
                }), I = e), I;
            }
        }, {
            key: "getGid",
            value: function() {
                var e = this;
                return o.default.co(i.default.mark(function t() {
                    return i.default.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            if (!I) {
                                t.next = 4;
                                break;
                            }
                            return t.abrupt("return", I);

                          case 4:
                            return t.abrupt("return", o.default.wx.getStorage({
                                key: "GID"
                            }).then(function(e) {
                                return e.data;
                            }).catch(function() {
                                return e.getList().then(function() {
                                    return I;
                                });
                            }));

                          case 5:
                          case "end":
                            return t.stop();
                        }
                    }, t, this);
                }));
            }
        }, {
            key: "operationSeq",
            value: function(e) {
                var t = this;
                return o.default.co(i.default.mark(function r() {
                    var n, u, d, s, p;
                    return i.default.wrap(function(r) {
                        for (;;) switch (r.prev = r.next) {
                          case 0:
                            return r.next = 2, t.getGid();

                          case 2:
                            return n = r.sent, u = {
                                grpid: n,
                                timestamp: new Date().getTime()
                            }, r.next = 6, t.getCacheListDataByGid();

                          case 6:
                            return d = r.sent.get("listData"), r.t0 = q.default, r.next = 10, t.getGroups();

                          case 10:
                            return r.t1 = r.sent.groups, s = r.t0.fromJS.call(r.t0, r.t1), e = a({}, u, e), 
                            p = JSON.stringify([ e ]), r.abrupt("return", t.auth().then(function(a) {
                                var r = a.openid, n = a.token, u = a.uin, i = t.formatURL("/newstock/stockapp/Updstock/operseq?seq=" + encodeURI(p), a, null, {
                                    special: !0
                                });
                                return o.default.wx.request({
                                    url: i
                                }).filter(l.default).then(function(a) {
                                    var r, n = e, o = n.act, u = n.code, i = n.grpid, l = d.findIndex(function(e) {
                                        return e.get("Symbol") === u;
                                    }), p = s.findIndex(function(e) {
                                        return e.get("id") === i;
                                    });
                                    switch (o) {
                                      case "sa":
                                        r = d, -1 === l && (r = r.unshift(q.default.Map({
                                            Chg: "",
                                            ChgRatio: "",
                                            Code: u.substr(2),
                                            Delay: "",
                                            Market: u.substr(0, 2),
                                            Mkt: "",
                                            MktCap_AH: "",
                                            MktCap_H: "",
                                            Name: "--",
                                            Note: "",
                                            Open: "",
                                            PrevClose: "",
                                            Qtsymbol: "",
                                            Status: "",
                                            Symbol: u,
                                            Type: ""
                                        })));
                                        break;

                                      case "sd":
                                        r = d.delete(l);
                                        break;

                                      case "sp":
                                        r = d.splice(l, 1).unshift(d.get(l));
                                        break;

                                      case "ga":
                                        r = s;
                                        var f = e.grpid, c = a && a.IDMap[f].realID;
                                        c && (r = r.push(q.default.Map({
                                            id: c,
                                            name: e.grpname
                                        })));
                                        break;

                                      case "gu":
                                        r = s.setIn([ p, "name" ], e.grpname);
                                        break;

                                      case "gd":
                                        r = s.delete(p);
                                    }
                                    return t.getGid().then(function(e) {
                                        return /^s[a|d|p]$/.test(o) ? D = D.setIn([ "stockListMap", e, "listData" ], r) : /^g[a|u|d]$/.test(o) && (D = D.set("groups", r)), 
                                        t.syncListData().then(function() {
                                            return r;
                                        });
                                    });
                                }).catch(function(e) {
                                    g.default.error("operationSeq Error", i, e), getApp().Event.emit("operateStockNetworkError", {
                                        type: type,
                                        err: e
                                    });
                                });
                            }));

                          case 15:
                          case "end":
                            return r.stop();
                        }
                    }, r, this);
                }));
            }
        }, {
            key: "getSmartbox",
            value: function(e, t) {
                t = t || "all", e = function(e) {
                    var t, a = /[`~!@#$^&*()=|{}':;',\[\].<>\/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/, r = "";
                    for (t = 0; t < e.length; t++) r += e.substr(t, 1).replace(a, "");
                    return r;
                }(e);
                var a = this.formatURL("/smartboxgtimg/s3/?t=" + t + "&format=jsonp&q=" + e);
                return o.default.wx.request({
                    url: a
                }).then(function(e) {
                    var t = e.data.data, a = [];
                    return t.forEach(function(e) {
                        var t = e.split("~"), r = t[0] + t[1];
                        if (/GP|ZS/.test(t[4]) && "sh881637" != r) {
                            /us|hk/.test(t[0]) && (t[1] = t[1].toUpperCase());
                            var n = {
                                market: t[0],
                                code: t[1],
                                name: t[2],
                                pinyi: t[3],
                                type: t[4],
                                status: "",
                                wording: ""
                            };
                            a.push(n);
                        }
                    }), a;
                }).catch(function(e) {
                    g.default.error("GetSmartbox", a, e);
                });
            }
        }, {
            key: "postFeedback",
            value: function(e) {
                var t = this;
                return this.auth().then(function(a) {
                    var r = a.openid, n = a.token, u = a.uin, i = {
                        user_wechat: e.user_wechat,
                        email: e.email,
                        phone: e.phone,
                        advice: e.content
                    }, d = t.formatURL("/ifzqgtimg/appstock/support/advice/weixinXcx", a);
                    return o.default.wx.request({
                        url: d,
                        method: "POST",
                        data: i,
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    }).filter(l.default).then(function() {
                        return !0;
                    }).catch(function(e) {
                        return g.default.error("postFeedback", d, e), Promise.reject(e);
                    });
                });
            }
        }, {
            key: "getHqList",
            value: function() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "hs", t = this.formatURL("/ifzqgtimg/appstock/app/mkt" + e + "/index");
                return o.default.wx.request({
                    url: t
                }).filter(l.default).then(function(e) {
                    return e;
                }).catch(function(e) {
                    throw g.default.error("GetHqList", t, e), e;
                });
            }
        }, {
            key: "getHqRanking",
            value: function(e) {
                var t, a = e.mkt, r = e.type, n = e.order, u = e.bd_code, i = "0" == n ? "desc" : "asc";
                u ? "Hk" == a ? t = "/ifzqgtimg/appstock/app/mktHk/industry?t=" + u + "&l=100&p=1&o=zdf&s=" + i + "&r=47710" : t = "/ifzqgtimg/appstock/app/mkt" + a + "/industry?l=100&p=1&t=" + u + "&o=" + n : "Hs" == a ? t = "/ifzqgtimg/appstock/app/mktHs/rank?l=100&p=1&t=" + r + "&o=" + n : "Hk" == a ? "hk_industry_list" == r ? t = "/ifzqgtimg/appstock/app/mktHk/industrylist?l=100&p=1&&o=bd_zdf&s=" + i : t = "/ifzqgtimg/appstock/app/mktHk/rank?board=" + r + "&metric=123&order=" + i + "&l=50&p=1" : "Us" == a && (t = "/ifzqgtimg/appstock/app/mktUs/rank?lmt=50&order=" + i + "&p=1&m=" + r);
                var d = this.formatURL(t);
                return o.default.wx.request({
                    url: d
                }).filter(l.default).then(function(e) {
                    return {
                        res: e
                    };
                }).catch(function(e) {
                    throw g.default.error("GetHqRanking", t, e), e;
                });
            }
        }, {
            key: "_getQuoteURL",
            value: function(e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "minute", a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "qfq", r = arguments[3], n = "/ifzqgtimg/appstock/app/", o = e.slice(0, 2), u = "";
                if ("minute" === t) return u = "hk" === o ? "hkMinute" : "us" === o ? "UsMinute" : "minute", 
                [ n, u, "/query?code=", e, "&app=plus&r=", Math.random() ].join("");
                if ("fdays" === t) return u = "us" === o ? "dayus" : "day", [ n, u, "/query?code=", e, "&app=plus&r=", Math.random() ].join("");
                if (t.match(/^day|week|month/)) {
                    a = "no" === a ? "" : a, "us" === o && "hfq" === a && (a = "qfq");
                    var i = [ e, t, r || "", "", 320, a ].join(",");
                    return a ? [ n, o.match(/us|hk/) ? o : "", "fqkline/get?param=", i, "&app=plus&r=", Math.random() ].join("") : [ n, "kline/kline?param=", i, "&app=plus&r=", Math.random() ].join("");
                }
                return null;
            }
        }, {
            key: "getQuote",
            value: function(e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "minute", a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "qfq", r = arguments[3], n = this._getQuoteURL(e, t, a, r);
                return n = this.formatURL(n, null, null, {
                    special: !0
                }), null === n ? o.default.reject("null") : o.default.wx.request({
                    url: n
                }).filter(l.default).then(function(e) {
                    return e;
                }).catch(function(e) {
                    g.default.error("GetQuote", n, e);
                });
            }
        }, {
            key: "getMingxiData",
            value: function(e) {
                var t = this.formatURL("/ifzqgtimg/appstock/app/HsDealinfo/getMingxi?code=" + e + "&index=19");
                return o.default.wx.request({
                    url: t
                }).filter(l.default).then(function(e) {
                    return e;
                });
            }
        }, {
            key: "getRelatedNews",
            value: function(e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1, a = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 21, r = this.formatURL("/ifzqgtimg/appstock/news/info/search" + "?symbol=" + e + "&page=" + t + "&n=" + a + "&type=3", null, null, {
                    ip: !0
                });
                return o.default.wx.request({
                    url: r
                }).filter(l.default).then(function(e) {
                    return e;
                });
            }
        }, {
            key: "getNewsCon",
            value: function(e, t) {
                var a, r = e.substr(0, 2);
                return a = "6" == t ? "/appstock/news/newsContent/content?id=" + e : "ne" == r ? "/appstock/news/newsDetail/getNews?id=" + e : "/appstock/news/content/content?id=" + e, 
                a = "/ifzqgtimg" + a, a = this.formatURL(a, null, null, {
                    special: !0
                }), o.default.wx.request({
                    url: a
                }).filter(l.default).then(function(e) {
                    return e;
                }).catch(function(e) {
                    g.default.error("GetNewsCon", a, e);
                });
            }
        }, {
            key: "setRemind",
            value: function(e, t, a) {
                var r = this;
                return this.auth().then(function(n) {
                    var u = n.openid, i = n.uin, d = r.formatURL("/ifzqgtimg/other/tips/SetTips/set?symbol=" + e + "&high=" + t.upPrice + "&low=" + t.downPrice + "&updown=" + t.chgRatio + "&formId=" + a, n);
                    return o.default.wx.request({
                        url: d
                    }).filter(l.default).then(function(e) {
                        return e;
                    }).catch(function(e) {
                        return g.default.error("SetRemind", d, e), !1;
                    });
                });
            }
        }, {
            key: "removeRemind",
            value: function(e) {
                var t = this;
                return this.auth().then(function(a) {
                    var r = a.openid, n = a.uin, u = t.formatURL("/ifzqgtimg/other/tips/SetTips/set?symbol=" + e + "&high=0&low=0&updown=-1&formId=mockformid", a);
                    return o.default.wx.request({
                        url: u
                    }).filter(l.default).then(function(e) {
                        return e;
                    }).catch(function(e) {
                        return g.default.error("RemoveRemind", u, e), !1;
                    });
                });
            }
        }, {
            key: "getRemindList",
            value: function() {
                var e = this;
                return this.auth().then(function(t) {
                    var a = t.openid, r = t.uin, n = e.formatURL("/ifzqgtimg/other/tips/GetTips/symbolsWithTips", t);
                    return o.default.wx.request({
                        url: n
                    }).filter(l.default).then(function(e) {
                        return console.log("GetRemindList ok", e), e;
                    }).catch(function(e) {
                        g.default.error("GetRemindList fail", n, e);
                    });
                });
            }
        }, {
            key: "getRemind",
            value: function(e) {
                var t = this;
                return this.auth().then(function(a) {
                    var r = a.openid, n = a.uin, u = t.formatURL("/ifzqgtimg/other/tips/GetTips/tips?symbol=" + e, a);
                    return o.default.wx.request({
                        url: u
                    }).filter(l.default).then(function(e) {
                        return e;
                    }).catch(function(e) {
                        g.default.error("GetRemind", u, e);
                    });
                });
            }
        }, {
            key: "pushLog",
            value: function(e) {
                return this.auth().then(function(t) {
                    var a = t.uin, r = t.device_id, n = "https://arenyuanv.finance.qq.com/appstock/support/LogReport/programUpload", u = {
                        token: r,
                        uin: a,
                        data: JSON.stringify(e),
                        name: new Date().getTime()
                    };
                    return o.default.wx.request({
                        url: n,
                        method: "POST",
                        data: u,
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    }).filter(l.default).then(function(e) {
                        return e;
                    }).catch(function(e) {
                        g.default.error("postLog", n, e);
                    });
                });
            }
        }, {
            key: "reportData",
            value: function(e) {
                return e.sop ? this.auth().then(function(t) {
                    var r = t.sid, n = t.openid, u = a({}, {
                        fproduct_id: "1000602",
                        DS: Date.parse(new Date()),
                        Sop: e.sop,
                        sid: r,
                        openid: n
                    }, e), i = [];
                    for (key in u) void 0 != u[key] && i.push(key + "=" + u[key]);
                    var d = "https://fdc.tenpay.com/fdc/commonClick.do?" + i.join("&");
                    return o.default.wx.request({
                        url: d
                    }).filter(l.default).then(function(e) {
                        return e;
                    }).catch(function(e) {
                        g.default.error("reportData", d, e);
                    });
                }) : void 0;
            }
        }, {
            key: "getCommentCon",
            value: function(e, t, r, n, u) {
                var i = this;
                return this.auth().then(function(r) {
                    var d = r.uin, s = r.openid, p = Date.parse(new Date()), f = {
                        limit: t || 10,
                        begin: n || "",
                        _: p,
                        nickname: "default",
                        avatar_url: "default"
                    }, c = {}, m = u ? "topic_id" : "stock_id";
                    c[m] = e, f = a({}, f, c);
                    var h = u ? "/RssService2/topicDetail" : "/commentPlat/stockRssList", k = i.formatURL("/newstockgroup" + h, r, f, {
                        sq: !0
                    });
                    return o.default.wx.request({
                        url: k,
                        method: "POST",
                        data: f,
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    }).filter(l.default).then(function(e) {
                        return e;
                    }).catch(function(e) {
                        g.default.error("reportData", k, e);
                    });
                });
            }
        }, {
            key: "getCommentDetail",
            value: function(e) {
                var t = this;
                return this.auth().then(function(a) {
                    var r = a.uin, n = a.openid, u = {
                        openid: n,
                        subject_id: e,
                        nickname: "default",
                        avatar_url: "default"
                    }, i = t.formatURL("/newstockgroup/commentPlat/rssSubjectById", a, u, {
                        sq: !0
                    });
                    return o.default.wx.request({
                        url: i,
                        method: "POST",
                        data: u,
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    }).filter(l.default).then(function(e) {
                        return e;
                    }).catch(function(e) {
                        g.default.error("reportData", i, e);
                    });
                });
            }
        }, {
            key: "commentListPlatContent",
            value: function(e, t, a) {
                var r = this;
                return this.auth().then(function(n) {
                    var u = n.uin, i = n.openid, d = {
                        subject_id: e,
                        begin: t ? "" : a,
                        limit: 20,
                        nickname: "default",
                        avatar_url: "default"
                    }, s = r.formatURL("/newstockgroup/commentPlat/rssCommentListBySubjectId", n, d, {
                        sq: !0
                    });
                    return o.default.wx.request({
                        url: s,
                        method: "POST",
                        data: d,
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    }).filter(l.default).then(function(e) {
                        return e;
                    }).catch(function(e) {
                        g.default.error("reportData", s, e);
                    });
                });
            }
        }, {
            key: "putRssLike",
            value: function(e, t, a) {
                var r = this, n = this;
                return this.auth().then(function(n) {
                    var u = n.uin, i = n.openid, d = {
                        attitude: e,
                        publish_id: t,
                        nickname: a.nickName,
                        avatar_url: a.avatarUrl
                    }, s = r.formatURL("/newstockgroup/commentPlat/putRssLike", n, d, {
                        sq: !0
                    });
                    return o.default.wx.request({
                        url: s,
                        method: "POST",
                        data: d,
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    }).filter(l.default).then(function(e) {
                        return e;
                    }).catch(function(e) {
                        throw e;
                    });
                });
            }
        }, {
            key: "getSendCommentTokenPlat",
            value: function(e) {
                var t = this;
                return this.auth().then(function(a) {
                    return t.getWxUserInfo().then(function(r) {
                        if (r) {
                            var n = a.uin, u = a.openid;
                            data = {
                                openid: u,
                                parent_id: e,
                                nickname: r.nickName,
                                avatar_url: r.avatarUrl
                            };
                            var i = t.formatURL("/newstockgroup/commentPlat/getSendCommentTokenPlat", a, data, {
                                sq: !0
                            });
                            return o.default.wx.request({
                                url: i,
                                method: "POST",
                                data: data,
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                }
                            }).then(function(e) {
                                return e;
                            }).catch(function(e) {
                                g.default.error("reportData", i, e);
                            });
                        }
                    });
                });
            }
        }, {
            key: "postComment",
            value: function(e) {
                var t = this;
                return this.auth().then(function(r) {
                    return t.getWxUserInfo().then(function(n) {
                        if (n) {
                            var u = r.uin, i = r.openid, d = e.replyText, s = e.symbol, p = e.id, f = e.rootid, c = e.type, m = e.type2, h = e.image_list, k = e.imagesInfo, y = e.topic, w = e.topicId, x = {};
                            if ("detail" == c) x = {
                                openid: i,
                                content: d,
                                parent_id: p,
                                root_id: m && "reply" == m ? f : p,
                                attitude: 0,
                                nickname: n.nickName,
                                avatar_url: n.avatarUrl
                            }; else {
                                var q = {};
                                h && h.forEach(function(e, t) {
                                    q["image_" + (t + 1)] = e, q["image_" + (t + 1) + "_prop"] = k[t].width + "," + k[t].height;
                                });
                                var v = {
                                    openid: i,
                                    content: d,
                                    attitude: 0,
                                    avatar_url: n.avatarUrl,
                                    nickname: n.nickName,
                                    type: h && h.length ? 4 : 1
                                };
                                x = a({}, v, q);
                            }
                            s ? x.stock_id = s : y && w && (x.topics = w, x.stock_id = "");
                            var b = "detail" == c ? "putRssCommentPlat" : "putRssSubjectPlat", S = t.formatURL("/newstockgroup/commentPlat/" + b, r, x, {
                                sq: !0
                            });
                            return o.default.wx.request({
                                url: S,
                                method: "POST",
                                data: x,
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                }
                            }).filter(l.default).then(function(e) {
                                return e;
                            }).catch(function(e) {
                                g.default.error("reportData", S, e);
                            });
                        }
                    });
                });
            }
        }, {
            key: "deleteRssSubject",
            value: function(e) {
                var t = this, a = this;
                return this.auth().then(function(r) {
                    return a.getWxUserInfo().then(function(a) {
                        if (a) {
                            var n = r.uin, u = r.openid, i = {
                                openid: u,
                                subject_id: e,
                                avatar_url: a && a.avatarUrl,
                                nickname: a && a.nickName
                            }, d = t.formatURL("/newstockgroup/commentPlat/deleteRssSubject", r, i, {
                                sq: !0
                            });
                            return o.default.wx.request({
                                url: d,
                                method: "POST",
                                data: i,
                                header: {
                                    "content-type": "application/x-www-form-urlencoded"
                                }
                            }).filter(l.default).then(function(e) {
                                return e;
                            }).catch(function(e) {
                                g.default.error("reportData", d, e);
                            });
                        }
                    });
                });
            }
        }, {
            key: "checkStock",
            value: function(e) {
                var t = /[GP|GP\-A|GP\-B|SH|SZ|HK|ZS]/, r = e.substr(2), n = !0, o = e.substr(2).indexOf(".");
                -1 != o && (r = r.substr(0, o)), G.getSmartbox(r).then(function(r) {
                    n = r.length && r[0].type.match(t);
                    var o = {};
                    o[e] = n;
                    var u = wx.getStorageSync("clickStocks");
                    wx.setStorage({
                        key: "clickStocks",
                        data: a({}, u, o)
                    }), getApp().Event.emit("stockClickStatusChange");
                });
            }
        }, {
            key: "getClickStatus",
            value: function(e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, r = this, n = {};
                return o.default.co(i.default.mark(function o() {
                    var u;
                    return i.default.wrap(function(o) {
                        for (;;) switch (o.prev = o.next) {
                          case 0:
                            if (e) {
                                o.next = 2;
                                break;
                            }
                            return o.abrupt("return", !1);

                          case 2:
                            return u = {}, e.forEach(function(e) {
                                var a = !0, o = e.substr(0, 2);
                                "jj" == o || "nq" == o ? a = !1 : "us" != o || -1 == e.substr(2).indexOf(".") || n[e] ? void 0 == t[e] ? !n[e] && (n[e] = !0, 
                                r.checkStock(e)) : a = t[e] : (n[e] = !0, r.checkStock(e)), u[e] = a;
                            }), u.sh000001 = !0, wx.setStorage({
                                key: "clickStocks",
                                data: a({}, t, u)
                            }), o.abrupt("return", u);

                          case 7:
                          case "end":
                            return o.stop();
                        }
                    }, o, this);
                }));
            }
        }, {
            key: "getNewsIds",
            value: function() {
                return o.default.co(i.default.mark(function e() {
                    var t;
                    return i.default.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                          case 0:
                            return t = _ + "/yaowen/get?nkey=getQQNewsIndexAndItemsVerify&_columnId=stock_yaowen_v2_new&returnType=0,100", 
                            e.abrupt("return", o.default.wx.request({
                                url: t
                            }).filter(l.default).then(function(e) {
                                return e;
                            }).catch(function(e) {
                                g.default.error("reportData", t, e);
                            }));

                          case 2:
                          case "end":
                            return e.stop();
                        }
                    }, e, this);
                }));
            }
        }, {
            key: "getMoreZxNews",
            value: function(e) {
                return o.default.co(i.default.mark(function t() {
                    var a;
                    return i.default.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return a = _ + "/yaowen/get?nkey=getQQNewsListItemsVerify&returnType=0,1,100&ids=" + e.join(","), 
                            t.abrupt("return", o.default.wx.request({
                                url: a
                            }).filter(l.default).then(function(e) {
                                return e;
                            }).catch(function(e) {
                                g.default.error("reportData", a, e);
                            }));

                          case 2:
                          case "end":
                            return t.stop();
                        }
                    }, t, this);
                }));
            }
        }, {
            key: "getNewsContent",
            value: function(e) {
                return o.default.co(i.default.mark(function t() {
                    var a;
                    return i.default.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return a = _ + "/NewsOpenProxy/get?nkey=getQQNewsSimpleHtmlContentVerify&_columnId=stock_yaowen_v2_new&id=" + e + "&chlid=news_news_istock&returnType=0,100", 
                            t.abrupt("return", o.default.wx.request({
                                url: a
                            }).filter(l.default).then(function(e) {
                                return e;
                            }).catch(function(e) {
                                throw g.default.error("reportData", a, e), e;
                            }));

                          case 2:
                          case "end":
                            return t.stop();
                        }
                    }, t, this);
                }));
            }
        }, {
            key: "getQQNewsSpecial",
            value: function(e) {
                return o.default.co(i.default.mark(function t() {
                    var a;
                    return i.default.wrap(function(t) {
                        for (;;) switch (t.prev = t.next) {
                          case 0:
                            return a = _ + "/newsOpenProxy/get?nkey=getQQNewsSpecialListItemsVerify&_columnId=stock_yaowen_v2_new&returnType=0,1,100,102,6&id=" + e, 
                            t.abrupt("return", o.default.wx.request({
                                url: a
                            }).filter(l.default).then(function(e) {
                                return e;
                            }).catch(function(e) {
                                g.default.error("reportData", a, e);
                            }));

                          case 2:
                          case "end":
                            return t.stop();
                        }
                    }, t, this);
                }));
            }
        }, {
            key: "getNotice",
            value: function() {
                var e = this;
                return this.auth().then(function(t) {
                    var a = t.openid, r = {
                        openid: a,
                        check: 6
                    }, n = e.formatURL("/newstockgroup/RssService2/notify", t, r, {
                        sq: !0
                    });
                    return o.default.wx.request({
                        url: n,
                        method: "POST",
                        data: r,
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    }).filter(l.default).then(function(e) {
                        return e;
                    }).catch(function(e) {
                        g.default.error("reportData", n, e);
                    });
                });
            }
        }, {
            key: "illegalReport",
            value: function(e) {
                var t = this;
                return e ? this.auth().then(function(a) {
                    var r = a.openid, n = {
                        openid: r,
                        id: e
                    }, u = t.formatURL("/newstockgroup/CommentPlat/illegalReport", a, n, {
                        sq: !0
                    });
                    return o.default.wx.request({
                        url: u,
                        method: "POST",
                        data: n,
                        header: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    }).filter(l.default).then(function(e) {
                        return e;
                    }).catch(function(e) {
                        g.default.error("reportData", u, e);
                    });
                }) : void 0;
            }
        }, {
            key: "getTopicList",
            value: function() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = e.page || 0, a = {
                    begin: 10 * t,
                    limit: 10
                }, r = this.formatURL("/newstockgroup/RssService2/topicList", {}, a, {
                    sq: !0
                });
                return o.default.wx.request({
                    url: r,
                    method: "POST",
                    data: a,
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    }
                }).filter(l.default).then(function(e) {
                    return e;
                }).catch(function(e) {
                    g.default.error("reportData", r, e);
                });
            }
        }, {
            key: "getWxUserInfo",
            value: function() {
                var e = getApp();
                return e.userinfo ? e.userinfo : o.default.wx.getUserInfo().then(function(e) {
                    return e.userInfo.avatarUrl || (e.userInfo.avatarUrl = "http://mat1.gtimg.com/finance/images/stock/p/xcx/6bacbb862beefac2.png"), 
                    getApp().userInfo = e.userInfo, e.userInfo;
                }, function(e) {
                    "getUserInfo:fail scope unauthorized" == e.errMsg || "getUserInfo:fail:scope unauthorized" == e.errMsg ? setTimeout(function() {
                        wx.navigateTo({
                            url: "/pages/auth/auth"
                        });
                    }, 1e3) : ("getUserInfo:fail auth deny" == e.errMsg || "getUserInfo:fail:auth deny" == userError.errMsg) && wx.openSetting({
                        success: function() {}
                    });
                }).catch(function() {
                    throw "not authrized!";
                });
            }
        } ]), e;
    }(), P = null, G = function() {
        return null == P && (P = new C()), P;
    }();
    module.exports = {
        Request: G
    };
})();