var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, n = {
    scope: {},
    owns: function(e, n) {
        return Object.prototype.hasOwnProperty.call(e, n);
    }
};

n.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, n, t) {
    if (t.get || t.set) throw new TypeError("ES3 does not support getters and setters.");
    e != Array.prototype && e != Object.prototype && (e[n] = t.value);
}, n.getGlobal = function(e) {
    return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e;
}, n.global = n.getGlobal(void 0), n.polyfill = function(e, t, r, o) {
    if (t) {
        for (r = n.global, e = e.split("."), o = 0; o < e.length - 1; o++) {
            var i = e[o];
            i in r || (r[i] = {}), r = r[i];
        }
        (t = t(o = r[e = e[e.length - 1]])) != o && null != t && n.defineProperty(r, e, {
            configurable: !0,
            writable: !0,
            value: t
        });
    }
}, n.polyfill("Object.assign", function(e) {
    return e || function(e, t) {
        for (var r = 1; r < arguments.length; r++) {
            var o = arguments[r];
            if (o) for (var i in o) n.owns(o, i) && (e[i] = o[i]);
        }
        return e;
    };
}, "es6-impl", "es3"), n.findInternal = function(e, n, t) {
    e instanceof String && (e = String(e));
    for (var r = e.length, o = 0; o < r; o++) {
        var i = e[o];
        if (n.call(t, i, o, e)) return {
            i: o,
            v: i
        };
    }
    return {
        i: -1,
        v: void 0
    };
}, n.polyfill("Array.prototype.findIndex", function(e) {
    return e || function(e, t) {
        return n.findInternal(this, e, t).i;
    };
}, "es6-impl", "es3"), function(n, t) {
    if ("object" === ("undefined" == typeof exports ? "undefined" : e(exports)) && "object" === ("undefined" == typeof module ? "undefined" : e(module))) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        t = t();
        for (var r in t) ("object" === ("undefined" == typeof exports ? "undefined" : e(exports)) ? exports : n)[r] = t[r];
    }
}(void 0, function() {
    return function(e) {
        function n(r) {
            if (t[r]) return t[r].exports;
            var o = t[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return e[r].call(o.exports, o, o.exports, n), o.loaded = !0, o.exports;
        }
        var t = {};
        return n.m = e, n.c = t, n.p = "", n(0);
    }([ function(e, n, t) {
        var r = t(1), o = t(15);
        n = (f = t(3)).inherits;
        var i = f.each, s = f.extend, u = f.fnEmpty, c = f.urlConvert, a = f.toString, d = f.jsonHandler, f = t(11), l = t(22), _ = t(27), g = new f({}), f = t(31), h = t(10), p = t(25), m = t(17);
        t(8);
        var v = {
            name: "wechat",
            version: "0"
        };
        t(14).set("xcx");
        var y, x = new f({
            ack: function(e, n, t) {
                var r = e.valueType;
                "message" == r || "commandmsg" == r ? (e = b(e.value).map(function(e) {
                    var n = e.msg_list, t = n[0];
                    return {
                        sender_id: e.sender_id,
                        sender_source: e.sender_source,
                        to_id: t.to_id,
                        to_source: t.to_source,
                        msg_ids: n.map(function(e) {
                            return e.msg_id;
                        })
                    };
                }), _.ackMsgBatch(e, function() {
                    n();
                }, function() {
                    t();
                })) : t();
            }
        }), b = function(e) {
            if (!Array.isArray(e)) return [];
            var n = {};
            e.forEach(function(e) {
                "string" == typeof e.content && (e.content = d.parse(e.content));
                var t = e.sender_id + "@" + e.sender_source;
                n[t] ? n[t].push(e) : n[t] = [ e ];
            });
            var t = [];
            return i(n, function(e, n) {
                e = e.split("@"), t.push({
                    sender_id: e[0],
                    sender_source: e[1],
                    msg_list: n.sort(function(e, n) {
                        return e.msg_id - n.msg_id;
                    })
                });
            }), t;
        }, k = function(e) {
            l.clearAll(function() {
                e();
            }, function() {
                e();
            });
        };
        e.exports = n(r, {
            constructor: function(e) {
                r.call(this, v), y = h.get(), function(n) {
                    n.init(e), x.addEventListener(p.logout, function(e) {
                        n.stop(e);
                    }), x.addEventListener(p.connectchange, function(e, t) {
                        n.triggerEvent(p.connectchange, e, t);
                    }), x.addEventListener(p.msgReceived, function(e) {
                        var t = [];
                        if (e.forEach(function(e) {
                            if (e.sender_id != e.to_id || e.sender_source != e.to_source) {
                                var n = e.content;
                                n && (n.url = c(n.url + "")), _.isNeedShow(e) && ("audio" === e.show_type && (n.url = config_1["audio-converter"](n.url)), 
                                t.push(e));
                            }
                        }), 0 !== t.length) {
                            var r = {}, o = {};
                            t.forEach(function(e) {
                                if (y.user_id == e.sender_id && y.user_source == e.sender_source && e.options && e.options.sender_hide && "1" === a(e.options.sender_hide)) return !0;
                                var t = e.sender_id + "@" + e.sender_source, i = e.to_id + "@" + e.to_source, s = t === y.user_id + "@" + y.user_source;
                                if ((!(i = r[t = s ? i : t]) || i.msg_id < e.msg_id) && (r[t] = e), _.setLastMsg(t.split("@")[0], t.split("@")[1], r[t]), 
                                !n._isAddUnreadNum(e)) return !0;
                                s || (e = o[t], o[t] = e ? e + 1 : 1);
                            }), _.saveUnreadNum(o);
                            var s = [];
                            i(r, function(e, n) {
                                e = (t = e.split("@"))[0];
                                var t = t[1], r = "string" == typeof n.content ? d.parse(n.content) : n.content;
                                s.push({
                                    user: {
                                        user_id: e,
                                        user_source: t
                                    },
                                    msg: {
                                        content: r,
                                        send_time: n.send_time,
                                        msg_id: n.msg_id,
                                        msg_type: n.msg_type,
                                        client_only: n.options ? n.options.client_only : "0",
                                        options: n.options
                                    }
                                });
                            }), l.insert(s), e = b(t), n.triggerEvent(p.msgReceived, e);
                            for (var u = 0, f = e.length; u < f; u++) {
                                var g = e[u].sender_id, h = e[u].sender_source, m = n._filterReferMsg(g, h, e[u].msg_list);
                                m && _.setRefer(g, h, m);
                            }
                        }
                    }), _.addEventListener(p.unreadChanged, function(e) {
                        n.triggerEvent(p.unreadChanged, e);
                    }), _.addEventListener(p.referChanged, function(e) {
                        n.triggerEvent(p.referChanged, e);
                    }), l.addEventListener(p.sessionChanged, function(e) {
                        n.triggerEvent(p.sessionChanged, e);
                    });
                }(this);
            },
            init: function(e) {
                y && y.user_id + "@" + y.user_source != e.user_id + "@" + e.user_source && k(u), 
                e.client_version = "1.4.6.1", this._init(Object.assign({}, {
                    client_type: "weapp"
                }, e)), x.init(this.options.ws, this.options), y = h.get();
            },
            start: function() {
                var e = this;
                o(m.init.name, null, null, function() {
                    e.triggerEvent(p.login), x.start(), l.start(), g.start(), _.start();
                }, function(n) {
                    e.triggerEvent(p.imTokenExpired, n);
                });
            },
            stop: function(e) {
                x.stop(), l.stop(), g.stop(), _.stop(), this.triggerEvent(p.logout, e);
            },
            sendMsg: function(e) {
                var n = {
                    msg: null,
                    onSendMsgBegin: u,
                    onSendMsgSuccess: u,
                    onSendMsgFail: u
                };
                s(n, e), this._send(n);
            }
        });
    }, function(n, t, r) {
        var o = r(2), i = (t = r(3)).urlConvert, s = t.inherits, u = t.extend, c = t.fnEmpty, a = t.toString, d = t.isEmpty, f = t.each, l = t.jsonHandler, _ = r(4), g = r(5), h = r(8), p = r(10), m = new (r(11))({}), v = r(22), y = r(27), x = r(30), b = function(e) {
            for (var n = [], t = 0; t < e.length; t++) -1 < [ "text", "image", "audio", "location" ].indexOf(a(e[t].show_type)) && (e[t].refer && e[t].refer.invitation || n.push(e[t]));
            return n;
        }, k = function(e, n, t) {
            for (var r = null, o = 0; o < t.length; o++) if (-1 < [ "text", "image", "audio", "location" ].indexOf(a(t[o].show_type)) && t[o].refer && ("string" != typeof t[o].refer || -1 !== t[o].refer.indexOf("invitation")) && ("string" == typeof (r = t[o].refer) && (r = l.parse(r)), 
            r.invitation)) {
                "string" == typeof r.invitation && (r.invitation = l.parse(r.invitation)), t[o].sender_id === e && t[o].sender_source === n || (r.invitation.role = r.invitation.role && "2" === a(r.invitation.role) ? "1" : r.invitation.role && "1" === a(r.invitation.role) ? "2" : "", 
                r.invitation.refer_time = t[o].send_time);
                break;
            }
            return r;
        }, E = function(e, n) {
            var t = this, r = function() {
                var e = [], n = 0;
                return function(o, i) {
                    if (1 < ++n) return i(null);
                    t.getMsgRecords(o, function(n) {
                        if (0 === n.length) return i(null);
                        var t = k(o.user_id, o.user_source, n);
                        t && i({
                            refer: t,
                            user_id: o.user_id,
                            user_source: o.user_source
                        }), Array.prototype.push.apply(e, b(n)), !t && 5 > e.length ? (o.msg_id = n[n.length - 1].msg_id, 
                        r(o, i)) : !t && 5 <= e.length && i(null);
                    }, function() {
                        i(null);
                    });
                };
            }();
            r(e, n);
        }, w = function(e, n, t) {
            var r = k(e, n, t);
            r ? y.setRefer(e, n, r) : this.getRefer(e, n) || E.call(this, {
                user_id: e,
                user_source: n,
                msg_id: t[t.length - 1].msg_id,
                count: 20,
                option: -1
            }, function(e) {
                e && e.refer && y.setRefer(e.user_id, e.user_source, e.refer);
            });
        }, S = function(n) {
            var t = [], r = {}, o = n[i = _.checkUid(n).ebuidKey];
            if ("object" !== (void 0 === o ? "undefined" : e(o)) || isNaN(o.length)) t.push(n[i]), 
            r[n[i]] = {}, r[n[i]].key = i; else for (n = 0; n < o.length; n++) if (_.checkUid(o[n]).isHaveEbuid) {
                var i = _.checkUid(o[n]).ebuidKey, s = o[n][i];
                t.push(s), r[s] = {}, r[s].num = n, r[s].key = i;
            }
            return {
                uids: t,
                originObj: r
            };
        }, C = 0, A = {};
        n.exports = s(o, {
            constructor: function(e) {
                o.call(this), this.lasttime = 0, this.options = {
                    api: null,
                    ws: null,
                    user_id: null,
                    source: null,
                    im_token: null,
                    client_version: "1.4.6.1",
                    os_type: e.name,
                    os_version: e.version,
                    appid: "",
                    sdk_version: 4630,
                    getNewToken: function(e) {
                        e("token");
                    }
                };
            },
            _exchangeUid: function(n, t) {
                if (!_.checkUid(n).isHaveEbuid) return t();
                var r = S(n), o = r.originObj;
                this.exchangeXid(r.uids, function(r) {
                    f(r, function(t, r) {
                        var i = _.checkUid(n).ebuidKey, s = o[t].key;
                        "object" !== e(n[i]) || isNaN(n[i].length) ? n[s] = r : n[i][o[t].num][s] = r;
                    }), t();
                }, function() {
                    t();
                });
            },
            _filterReferMsg: function(e, n, t) {
                return k(e, n, t);
            },
            _isAddUnreadNum: function(e) {
                var n = !0;
                return ("tip" == e.show_type + "" || e.options && "1" == e.options.talk_list_order_ig + "") && (n = !1), 
                n;
            },
            _getNewToken: function(e) {
                var n = new Date().getTime(), t = n - this.lasttime;
                if (3e3 < t) this.lasttime = n, this.options.getNewToken(function(n) {
                    e(n);
                }); else {
                    var r = this;
                    setTimeout(function() {
                        r._getNewToken(e);
                    }, t - 3e3);
                }
            },
            _init: function(e) {
                u(this.options, e), h.appid = this.options.appid, (e = {
                    user_id: this.options.user_id,
                    source: this.options.source,
                    im_token: this.options.im_token,
                    client_version: this.options.client_version,
                    client_type: this.options.client_type,
                    os_type: this.options.os_type,
                    os_version: this.options.os_version,
                    appid: this.options.appid,
                    sdk_version: this.options.sdk_version,
                    device_id: this.options.device_id
                }).im_token || (e.im_token = "whatever", e.device_id = this.options.user_id);
                var n = this;
                g.init(this.options.api, e, function(e) {
                    switch (e.error_code) {
                      case 40002:
                      case 40012:
                      case 40013:
                        if (n.stop("ajax error code:" + e.error_code), 5 < ++C) break;
                        n._getNewToken(function(e) {
                            n.options.im_token + "" != e + "" && (n.options.im_token = e, n.init(n.options), 
                            n.start());
                        });
                        break;

                      default:
                        C = 0;
                    }
                }), p.set(this.options.user_id, this.options.source);
            },
            _send: function(e) {
                this._exchangeUid(e.msg, function() {
                    var n = e.msg, t = p.get(), r = {
                        sender_id: t.user_id,
                        sender_source: t.user_source,
                        to_id: n.to_id,
                        to_source: n.to_source,
                        msg_type: n.msg_type,
                        show_type: n.show_type,
                        content: u(!0, {}, n.content),
                        options: n.options,
                        show_in_app: n.show_in_app,
                        refer: u(!0, {}, n.refer)
                    };
                    e.onSendMsgBegin(), y.send(r, function(n) {
                        v.insert({
                            user: {
                                user_id: r.to_id,
                                user_source: r.to_source
                            },
                            msg: {
                                content: r.content,
                                send_time: n.send_time,
                                msg_id: n.msg_id,
                                msg_type: r.msg_type
                            }
                        }), e.onSendMsgSuccess(n);
                    }, function(n) {
                        e.onSendMsgFail(n);
                    });
                });
            },
            getMsgRecords: function(e, n, t) {
                var r = this, o = p.get();
                r._exchangeUid(e, function() {
                    y.getMsgRecords(e, function(t) {
                        if (0 === t.length) return n(t);
                        if ("-1" === a(e.option) && "10" === a(e.count)) if (e.msg_id) {
                            var s = k(e.user_id, e.user_source, t);
                            s && y.setRefer(e.user_id, e.user_source, s);
                        } else w.call(r, e.user_id, e.user_source, t);
                        r.getContact([ {
                            user_id: e.user_id,
                            user_source: e.user_source
                        }, {
                            user_id: o.user_id,
                            user_source: o.user_source
                        } ], function(e) {
                            t.forEach(function(n, t) {
                                n.sender_info = e[n.sender_id + "@" + n.sender_source], n.to_info = e[n.to_id + "@" + n.to_source], 
                                "image" === n.show_type && n.content && (n.content.url = i(n.content.url + "")), 
                                "audio" === n.show_type && (n.content.url = h["audio-converter"](n.content.url));
                            }), n(t);
                        });
                    }, t);
                });
            },
            start: c,
            stop: c,
            addSession: function(e) {
                var n = this, t = e.user;
                n._exchangeUid(t, function() {
                    n.getContact(t.user_id, t.user_source, function(e) {
                        m.addUser(e), v.insert({
                            user: {
                                user_id: e.user_id,
                                user_source: e.user_source
                            },
                            msg: null
                        });
                    });
                });
            },
            getContact: function() {
                var e = arguments;
                if (3 === e.length) {
                    var n = e[1], t = e[2], r = {
                        user_id: e[0]
                    };
                    this._exchangeUid(r, function() {
                        m.getUserinfo({
                            target_user_id: r.user_id,
                            target_user_source: n
                        }, function(e) {
                            t(e);
                        }, function(e) {
                            t(null);
                        });
                    });
                } else if (2 === e.length) {
                    var o = e[0], t = e[1], r = {
                        user_ids: o
                    };
                    this._exchangeUid(r, function() {
                        m.getUserinfos(r.user_ids, function(e) {
                            t(e);
                        }, function() {
                            t({});
                        });
                    });
                }
            },
            sendMsg: c,
            read: function(e, n) {
                var t = {
                    user_id: e
                };
                this._exchangeUid(t, function() {
                    var e, r = 0, o = setInterval(function() {
                        if (10 < ++r) return clearInterval(o);
                        (e = y.getLastMsg(t.user_id, n)) && e.msg_id && (clearInterval(o), y.setUnreadToZero(t.user_id, n, e.msg_id));
                    }, 100);
                });
            },
            getSessions: function(e, n, t) {
                v.getSessions(function(e, t) {
                    n(e, t);
                });
            },
            getCaptcha: function(e, n, t) {
                x.getCaptcha(e, n, t);
            },
            validateCaptcha: function(e, n, t) {
                x.validateCaptcha(e, n, t);
            },
            getAllUnreadAmount: function() {
                return y.getAllUnreadAmount();
            },
            getAllSessions: function() {
                return v.getAllSessions();
            },
            ackMsgRead: function(e, n, t) {
                var r = {
                    user_ids: e
                };
                this._exchangeUid(r, function() {
                    y.ackRead(r.user_ids, n, t);
                });
            },
            getRefer: function(e, n) {
                return y.getRefer(e, n);
            },
            setRefer: function(e, n, t) {
                var r = {
                    user_id: e
                };
                this._exchangeUid(r, function() {
                    return y.setRefer(r.user_id, n, t);
                });
            },
            exchangeXid: function(e, n, t) {
                for (var r = {}, o = [], i = 0; i < e.length; i++) if (_.checkUid(e[i]).isHaveEbuid) r[e[i]] = e[i]; else {
                    var s = A[e[i]];
                    d(s) ? (r[e[i]] = null, o.push(e[i])) : r[e[i]] = s;
                }
                if (0 == o.length) return n(r);
                m.exchangeXid(o, function(e) {
                    return d(e) || (u(!0, A, e), u(!0, r, e)), n(r);
                }, function() {
                    return t(r);
                });
            },
            getUnreceviedMsgNum: function(e, n) {
                y.getUnreceviedMsgNum(e, n);
            }
        });
    }, function(e, n) {
        (n = function() {
            this._events = {};
        }).prototype = {
            addEventListener: function(e, n) {
                var t = this._events[e];
                if (null != t) {
                    for (var r = !1, o = 0; o < t.length; o++) if (t[o] == n) {
                        r = !0;
                        break;
                    }
                    0 == r && t.push(n);
                } else (t = []).push(n);
                this._events[e] = t;
            },
            listen: function(e, n) {
                this.addEventListener(e, n);
            },
            removeEventListener: function(e, n) {
                if (null != (e = this._events[e])) for (var t = 0; t < e.length; t++) if (e[t] == n) {
                    e.splice(t, 1);
                    break;
                }
            },
            remove: function(e, n) {
                this.removeEventListener(e, n);
            },
            triggerEvent: function(e) {
                var n = this._events[e];
                if (null != n) for (var t = 0; t < n.length; t++) {
                    var r = n[t];
                    null != r && r.apply(null, Array.prototype.slice.call(arguments, 1));
                }
            }
        }, e.exports = n;
    }, function(n, t) {
        var r = function() {
            var e = {};
            return "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" ").forEach(function(n) {
                e["[object " + n + "]"] = n.toLowerCase();
            }), e;
        }(), o = function(n) {
            return null == n ? n + "" : "object" === (void 0 === n ? "undefined" : e(n)) || "function" == typeof n ? r[{}.toString.call(n)] || "object" : void 0 === n ? "undefined" : e(n);
        }, i = Array.isArray, s = function n() {
            var t, r, s, u, c, a = arguments[0] || {}, d = 1, f = arguments.length, l = !1;
            for ("boolean" == typeof a && (l = a, a = arguments[d] || {}, d++), "object" !== (void 0 === a ? "undefined" : e(a)) && "function" !== o(a) && (a = {}), 
            d === f && (a = this, d--); d < f; d++) if (null != (c = arguments[d])) for (u in c) t = a[u], 
            a !== (s = c[u]) && (l && s && ("object" === o(s) || (r = i(s))) ? (r ? (r = !1, 
            t = t && i(t) ? t : []) : t = t && "object" === o(t) ? t : {}, a[u] = n(l, t, s)) : void 0 !== s && (a[u] = s));
            return a;
        }, u = null;
        n.exports = {
            extend: s,
            each: function(e, n) {
                var t, r = 0;
                if (i(e)) for (t = e.length; r < t && !1 !== n.call(e[r], r, e[r]); r++) ; else for (r in e) if (!1 === n.call(e[r], r, e[r])) break;
                return e;
            },
            param: function(e) {
                var n, t = [], r = 1 < arguments.length && 0 == arguments[1] ? "false" : "true";
                for (n in e) {
                    var o = null == (o = e[n]) ? "" : o;
                    t[t.length] = "false" === r ? n + "=" + o : encodeURIComponent(n) + "=" + encodeURIComponent(o);
                }
                return t.join("&").replace(/%20/g, "+");
            },
            inherits: function(e, n, t) {
                var r;
                return "function" == typeof n ? (r = n, n = null) : r = n && n.hasOwnProperty("constructor") ? n.constructor : function() {
                    return e.apply(this, arguments);
                }, s(r, e, t || {}), r.__super__ = e.prototype, r.prototype = Object.create(e.prototype), 
                r.prototype._super = e, n && s(!0, r.prototype, n), r;
            },
            urlConvert: function(e) {
                if (!e || "string" != typeof e) return e;
                var n = e;
                return -1 < e.indexOf("https:") ? n = e.substr(6) : -1 < e.indexOf("http:") ? n = e.substr(5) : 0 === e.indexOf("//") && (n = e), 
                n;
            },
            fnEmpty: function() {},
            toString: function(e) {
                return e ? e.toString() : "";
            },
            onload: function(e) {
                "complete" === document.readyState ? e && e() : (u = setTimeout(function() {
                    u = null, e && e();
                }, 1e4), $(window).load(function() {
                    u && (clearTimeout(u), e && e());
                }));
            },
            isEmpty: function(e) {
                return "null" == e + "" || "undefined" == e + "" || "" === e;
            },
            jsonHandler: {
                parse: function(e) {
                    try {
                        e = JSON.parse(e);
                    } catch (n) {
                        e = {};
                    }
                    return e;
                },
                stringify: function(e) {
                    try {
                        e = JSON.stringify(e);
                    } catch (n) {
                        e = "";
                    }
                    return e;
                }
            }
        };
    }, function(e, n, t) {
        var r = [ "user_ids", "user_id", "to_id", "sender_id" ], o = t(3).jsonHandler;
        (n = function() {}).prototype.checkUid = function(e) {
            var n = {
                ebuidKey: "",
                isHaveEbuid: !1
            };
            if (-1 === (e = "string" == typeof e ? e : o.stringify(e)).indexOf("EP:")) return n;
            for (var t = 0; t < r.length; t++) if (-1 != e.indexOf(r[t])) {
                n.ebuidKey = r[t], n.isHaveEbuid = !0;
                break;
            }
            return n;
        }, e.exports = new n();
    }, function(e, n, t) {
        n = t(6), e.exports = n;
    }, function(e, n, t) {
        n = t(7), e.exports = new n();
    }, function(e, n, t) {
        n = t(3).inherits;
        var r = t(3).fnEmpty;
        e.exports = n(r, {
            constructor: function() {
                this.apiUrl = "", this.commonParams = {}, this.errorHandler = r;
            },
            init: function(e, n, t) {
                this.apiUrl = e, this.commonParams = n, this.errorHandler = t;
            },
            getApiUrl: function() {
                return this.apiUrl;
            },
            getCommonParams: function() {
                return this.commonParams;
            },
            getErrorHandler: function() {
                return this.errorHandler;
            }
        });
    }, function(e, n, t) {
        n = function() {}, n = t(9), e.exports = n;
    }, function(e, n) {
        e.exports = {
            prefix_name: "webim",
            storage_version: 11,
            appid: null,
            "audio-converter": function(e) {
                var n;
                return "string" == typeof e && -1 < e.indexOf("audioconvert.58.com") ? 0 === e.indexOf("http://audioconvert.58.com") ? n = e.replace("http", "https") : 0 === e.indexOf("//audioconvert.58.com") ? n = "https:" + e : 0 === e.indexOf("audioconvert.58.com") ? n = "https://" + e : 0 === e.indexOf("https://audioconvert.58.com") && (n = e) : n = "https://audioconvert.58.com/convert?amrurl=" + encodeURIComponent(e), 
                n;
            }
        };
    }, function(e, n) {
        var t = "", r = "";
        e.exports = {
            set: function(e, n) {
                t = e, r = n;
            },
            get: function() {
                return {
                    user_id: t,
                    user_source: r
                };
            }
        };
    }, function(e, n, t) {
        n = t(12), e.exports = n;
    }, function(e, n, t) {
        var r = t(13), o = (n = t(3)).inherits, i = n.param, s = n.extend, u = t(15), c = t(17), a = t(5), d = t(19);
        e.exports = o(r, {
            constructor: function() {
                r.call(this);
            },
            exchangeXid: function(e, n, t) {
                (o = s(!0, {}, a.getCommonParams())).targets = e.join(",");
                var r = i(o, !1), o = d(d(r) + o.appid);
                u(c.exchange_xid.name, {
                    targets: e.join(",")
                }, {
                    key: o
                }, function(e) {
                    n && n(e.result);
                }, function(e) {
                    t && t(null);
                });
            }
        });
    }, function(e, n, t) {
        var r = t(2);
        t(14);
        var o = (n = t(3)).fnEmpty, i = n.each, s = n.inherits, u = n.urlConvert, c = n.param, a = n.extend, d = t(15), f = t(17), l = t(5), _ = t(19), g = {};
        e.exports = s(r, {
            constructor: function() {
                r.call(this), this._users = {};
            },
            _convert: function(e) {
                return e && (e.avatar = u(e.avatar + "")), e;
            },
            start: o,
            stop: o,
            clearAll: o,
            addUser: function(e) {
                this._users[e.user_id + "@" + e.user_source] = e;
            },
            getUserinfo: function(e, n, t) {
                var r = e.target_user_id + "@" + e.target_user_source, o = this._users[r], i = this;
                if (o) return n(o);
                d(f.get_userinfo.name, e, null, function(e) {
                    e = i._convert(e), i._users[r] = e, n(e);
                }, t);
            },
            getUserinfos: function(e, n, t) {
                var r = {}, o = this, s = [];
                if (e.forEach(function(e) {
                    var n = e.user_id, t = n + "@" + (e = e.user_source);
                    o._users[t] ? r[t] = o._users[t] : s.push(n + ":" + e);
                }), 0 === s.length) n(r); else {
                    var u = Math.ceil(s.length / 50), c = 0;
                    for (e = 0; e < u; e++) {
                        var a = [], a = e === u - 1 ? s.slice(50 * e) : s.slice(50 * e, 50 * (e + 1));
                        d(f.get_userinfo_batch.name, null, {
                            ids: a
                        }, function(e) {
                            i(e, function(e, n) {
                                var t = e.split(":");
                                e = t[0], t = t[1], n = o._convert(n), r[e + "@" + t] = n, o._users[e + "@" + t] = n;
                            }), ++c === u && n && n(r);
                        }, t);
                    }
                }
            },
            exchangeXid: function(e, n, t) {
                (o = a(!0, {}, l.getCommonParams())).targets = e.join(",");
                var r = c(o, !1), o = _(_(r) + o.appid), i = e.join("@");
                if (g[i]) g[i].then(function(e) {
                    n && n(e.result);
                }, function(e) {
                    t && t(null);
                }); else {
                    var s = $.Deferred();
                    d(f.exchange_xid.name, {
                        targets: e.join(",")
                    }, {
                        key: o
                    }, function(e) {
                        delete g[i], n && n(e.result), s.resolve(e);
                    }, function(e) {
                        delete g[i], s.reject(e), t && t(null);
                    }), g[i] = s.promise();
                }
            }
        });
    }, function(e, n) {
        var t = "";
        e.exports = {
            get: function() {
                return t;
            },
            set: function(e) {
                t = e;
            }
        };
    }, function(e, n, t) {
        n = t(16), e.exports = n;
    }, function(e, n, t) {
        var r = t(17), o = t(5), i = t(18), s = t(21), u = (n = t(3)).extend, c = n.param, a = n.jsonHandler;
        e.exports = function(e, n, t, d, f) {
            if (!(_ = r[e])) return f("not found config.[api:" + e + "]");
            e = {}, "string" == typeof _ ? e.url = _ : e = _, e.method = e.method || "get";
            var l, _ = o.getCommonParams();
            "get" === e.method ? (l = u({}, _, n), e.sign && (l.content_sign = i(a.stringify(n)))) : "post" === e.method && (l = u({}, _), 
            e.sign && (l.content_sign = i(a.stringify(t)))), l = c(l), n = o.getApiUrl() + "/" + e.url + "?params=" + s(l) + "&version=" + s.getVersion(), 
            t = t ? s(a.stringify(t)) : "", wx.request({
                url: n,
                method: e.method,
                dataType: "json",
                data: t || {},
                success: function(e) {
                    switch ((e = e.data).error_code) {
                      case 0:
                        d && d(e.data);
                        break;

                      default:
                        o.getErrorHandler()(e), f && f(e);
                    }
                },
                fail: function(e) {
                    f && f(e);
                }
            });
        };
    }, function(e, n) {
        n = {
            init: {
                url: "user/init",
                method: "get"
            },
            get_userinfo: {
                url: "user/get_userinfo",
                method: "get"
            },
            get_userinfo_batch: {
                url: "user/get_user_info_batch",
                method: "post"
            },
            get_user_online_info: {
                url: "user/get_user_online_info",
                method: "get"
            },
            get_users_online_info: {
                url: "user/get_users_online_info",
                method: "get"
            },
            add_black_list: {
                url: "user/add_black_list",
                method: "get"
            },
            del_black_list: {
                url: "user/del_black_list",
                method: "get"
            },
            is_blacked: {
                url: "user/is_blacked",
                method: "get"
            },
            sendmsg: {
                url: "msg/sendmessage",
                method: "post",
                sign: !0
            },
            ack_msg_batch: {
                url: "msg/ack_msg_batch",
                method: "post"
            },
            ack_msg_read: {
                url: "msg/ack_msg_read",
                method: "post"
            },
            ack_msg_show: {
                url: "msg/ack_msg_show",
                method: "post"
            },
            get_session_list: {
                url: "msg/get_session_list",
                method: "get"
            },
            get_chat_records: {
                url: "msg/get_chat_records",
                method: "get"
            },
            get_unrecv_msgs: {
                url: "msg/get_unrecv_msgs",
                method: "get"
            },
            get_captcha: {
                url: "msg/get_captcha",
                method: "get"
            },
            validate_captcha: {
                url: "msg/validate_captcha",
                method: "get"
            },
            exchange_xid: {
                url: "common/js/exchange_xid",
                method: "post"
            },
            get_total_unread_msg_count: {
                url: "msg/get_total_unread_msg_count",
                method: "get"
            }
        };
        for (var t in n) n.hasOwnProperty(t) && (n[t].name = t);
        e.exports = n;
    }, function(e, n, t) {
        function r(e, n) {
            for (var t = "", r = 0, o = e.length; r < o; r++) t += e.charCodeAt(r) ^ n.charCodeAt(r);
            return t;
        }
        var o = t(19), i = t(20);
        e.exports = function(e) {
            var n = i.encode(e + "61e2e9e0d3e683bdfb96b66f60a07f31", !1), t = "", s = "", u = "", c = "";
            e = [];
            for (var a = 0, d = n.length; a < d; a++) a < d / 4 ? t += n.charAt(a) : a >= d / 4 && a < d / 4 * 2 ? s += n.charAt(a) : a >= d / 4 * 2 && a < d / 4 * 3 ? u += n.charAt(a) : c += n.charAt(a);
            for (e.push(t), e.push(s), e.push(u), e.push(c), n = [], t = 1; t < e.length; t++) n.push(r(e[0], e[t]));
            for (e = "", t = 0; t < n.length; t++) e += n[t];
            return o(e + "61e2e9e0d3e683bdfb96b66f60a07f31");
        };
    }, function(e, n) {
        function t(e, n, t, r, o, i) {
            return e = s(s(n, e), s(r, i)), s(e << o | e >>> 32 - o, t);
        }
        function r(e, n, r, o, i, s, u) {
            return t(n & r | ~n & o, e, n, i, s, u);
        }
        function o(e, n, r, o, i, s, u) {
            return t(n & o | r & ~o, e, n, i, s, u);
        }
        function i(e, n, r, o, i, s, u) {
            return t(r ^ (n | ~o), e, n, i, s, u);
        }
        function s(e, n) {
            var t = (65535 & e) + (65535 & n);
            return (e >> 16) + (n >> 16) + (t >> 16) << 16 | 65535 & t;
        }
        var u = 0;
        e.exports = function(e) {
            var n;
            n = "";
            for (var c, a, d = -1; ++d < e.length; ) c = e.charCodeAt(d), a = d + 1 < e.length ? e.charCodeAt(d + 1) : 0, 
            55296 <= c && 56319 >= c && 56320 <= a && 57343 >= a && (c = 65536 + ((1023 & c) << 10) + (1023 & a), 
            d++), 127 >= c ? n += String.fromCharCode(c) : 2047 >= c ? n += String.fromCharCode(192 | c >>> 6 & 31, 128 | 63 & c) : 65535 >= c ? n += String.fromCharCode(224 | c >>> 12 & 15, 128 | c >>> 6 & 63, 128 | 63 & c) : 2097151 >= c && (n += String.fromCharCode(240 | c >>> 18 & 7, 128 | c >>> 12 & 63, 128 | c >>> 6 & 63, 128 | 63 & c));
            for (e = Array(n.length >> 2), d = 0; d < e.length; d++) e[d] = 0;
            for (d = 0; d < 8 * n.length; d += 8) e[d >> 5] |= (255 & n.charCodeAt(d / 8)) << d % 32;
            e[(n = 8 * n.length) >> 5] |= 128 << n % 32, e[14 + (n + 64 >>> 9 << 4)] = n, n = 1732584193, 
            d = -271733879, c = -1732584194, a = 271733878;
            for (var f = 0; f < e.length; f += 16) {
                var l = n, _ = d, g = c, h = a;
                d = i(d = i(d = i(d = i(d = t((c = t((a = t((n = t((d = t((c = t((a = t((n = t((d = t((c = t((a = t((n = t((d = t((c = t((a = t((n = t((d = o(d = o(d = o(d = o(d = r(d = r(d = r(d = r(d, c = r(c, a = r(a, n = r(n, d, c, a, e[f + 0], 7, -680876936), d, c, e[f + 1], 12, -389564586), n, d, e[f + 2], 17, 606105819), a, n, e[f + 3], 22, -1044525330), c = r(c, a = r(a, n = r(n, d, c, a, e[f + 4], 7, -176418897), d, c, e[f + 5], 12, 1200080426), n, d, e[f + 6], 17, -1473231341), a, n, e[f + 7], 22, -45705983), c = r(c, a = r(a, n = r(n, d, c, a, e[f + 8], 7, 1770035416), d, c, e[f + 9], 12, -1958414417), n, d, e[f + 10], 17, -42063), a, n, e[f + 11], 22, -1990404162), c = r(c, a = r(a, n = r(n, d, c, a, e[f + 12], 7, 1804603682), d, c, e[f + 13], 12, -40341101), n, d, e[f + 14], 17, -1502002290), a, n, e[f + 15], 22, 1236535329), c = o(c, a = o(a, n = o(n, d, c, a, e[f + 1], 5, -165796510), d, c, e[f + 6], 9, -1069501632), n, d, e[f + 11], 14, 643717713), a, n, e[f + 0], 20, -373897302), c = o(c, a = o(a, n = o(n, d, c, a, e[f + 5], 5, -701558691), d, c, e[f + 10], 9, 38016083), n, d, e[f + 15], 14, -660478335), a, n, e[f + 4], 20, -405537848), c = o(c, a = o(a, n = o(n, d, c, a, e[f + 9], 5, 568446438), d, c, e[f + 14], 9, -1019803690), n, d, e[f + 3], 14, -187363961), a, n, e[f + 8], 20, 1163531501), c = o(c, a = o(a, n = o(n, d, c, a, e[f + 13], 5, -1444681467), d, c, e[f + 2], 9, -51403784), n, d, e[f + 7], 14, 1735328473), a, n, e[f + 12], 20, -1926607734)) ^ c ^ a, n, d, e[f + 5], 4, -378558)) ^ d ^ c, a, n, e[f + 8], 11, -2022574463)) ^ n ^ d, c, a, e[f + 11], 16, 1839030562)) ^ a ^ n, d, c, e[f + 14], 23, -35309556)) ^ c ^ a, n, d, e[f + 1], 4, -1530992060)) ^ d ^ c, a, n, e[f + 4], 11, 1272893353)) ^ n ^ d, c, a, e[f + 7], 16, -155497632)) ^ a ^ n, d, c, e[f + 10], 23, -1094730640)) ^ c ^ a, n, d, e[f + 13], 4, 681279174)) ^ d ^ c, a, n, e[f + 0], 11, -358537222)) ^ n ^ d, c, a, e[f + 3], 16, -722521979)) ^ a ^ n, d, c, e[f + 6], 23, 76029189)) ^ c ^ a, n, d, e[f + 9], 4, -640364487)) ^ d ^ c, a, n, e[f + 12], 11, -421815835)) ^ n ^ d, c, a, e[f + 15], 16, 530742520)) ^ a ^ n, d, c, e[f + 2], 23, -995338651), c = i(c, a = i(a, n = i(n, d, c, a, e[f + 0], 6, -198630844), d, c, e[f + 7], 10, 1126891415), n, d, e[f + 14], 15, -1416354905), a, n, e[f + 5], 21, -57434055), c = i(c, a = i(a, n = i(n, d, c, a, e[f + 12], 6, 1700485571), d, c, e[f + 3], 10, -1894986606), n, d, e[f + 10], 15, -1051523), a, n, e[f + 1], 21, -2054922799), c = i(c, a = i(a, n = i(n, d, c, a, e[f + 8], 6, 1873313359), d, c, e[f + 15], 10, -30611744), n, d, e[f + 6], 15, -1560198380), a, n, e[f + 13], 21, 1309151649), c = i(c, a = i(a, n = i(n, d, c, a, e[f + 4], 6, -145523070), d, c, e[f + 11], 10, -1120210379), n, d, e[f + 2], 15, 718787259), a, n, e[f + 9], 21, -343485551), 
                n = s(n, l), d = s(d, _), c = s(c, g), a = s(a, h);
            }
            for (e = [ n, d, c, a ], n = "", d = 0; d < 32 * e.length; d += 8) n += String.fromCharCode(e[d >> 5] >>> d % 32 & 255);
            for (e = n, n = u ? "0123456789ABCDEF" : "0123456789abcdef", d = "", a = 0; a < e.length; a++) c = e.charCodeAt(a), 
            d += n.charAt(c >>> 4 & 15) + n.charAt(15 & c);
            return d;
        };
    }, function(e, n) {
        !function() {
            for (var e = {}, n = 0; 64 > n; n++) e["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n)] = n;
        }();
        var t = String.fromCharCode, r = function(e) {
            if (2 > e.length) {
                var n = e.charCodeAt(0);
                return 128 > n ? e : 2048 > n ? t(192 | n >>> 6) + t(128 | 63 & n) : t(224 | n >>> 12 & 15) + t(128 | n >>> 6 & 63) + t(128 | 63 & n);
            }
            return n = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320), 
            t(240 | n >>> 18 & 7) + t(128 | n >>> 12 & 63) + t(128 | n >>> 6 & 63) + t(128 | 63 & n);
        }, o = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, i = function(e) {
            var n = [ 0, 2, 1 ][e.length % 3];
            return e = e.charCodeAt(0) << 16 | (1 < e.length ? e.charCodeAt(1) : 0) << 8 | (2 < e.length ? e.charCodeAt(2) : 0), 
            [ "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >>> 18), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >>> 12 & 63), 2 <= n ? "=" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e >>> 6 & 63), 1 <= n ? "=" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(63 & e) ].join("");
        };
        e.exports = {
            encode: function(e, n) {
                return n ? String(e).replace(o, r).replace(/[\s\S]{1,3}/g, i).replace(/[+\/]/g, function(e) {
                    return "+" == e ? "-" : "_";
                }).replace(/=/g, "") : String(e).replace(o, r).replace(/[\s\S]{1,3}/g, i);
            }
        };
    }, function(e, n, t) {
        var r = t(20);
        (n = function(e) {
            if (null == e || 0 == e.length) return "";
            var n = 0, t = (e = r.encode(e)).indexOf("=");
            return -1 !== t && (n = e.length - t, e = e.substring(0, t)), e = (e + n).replace(/\+/g, "-").replace(/\//g, "_"), 
            t = Math.floor(e.length / 2), n = e.substring(t), e = e.substring(0, t), n + e;
        }).getVersion = function() {
            return "j1.0";
        }, e.exports = n;
    }, function(e, n, t) {
        n = t(23), e.exports = n;
    }, function(e, n, t) {
        var r = t(24), o = (n = t(3)).inherits, i = n.each, s = t(17), u = t(15);
        e.exports = new (o(r, {
            constructor: function() {
                r.call(this);
            },
            _fetchSessions: function(e, n) {
                var t = this;
                u(s.get_session_list.name, e, null, function(e) {
                    var r = [], o = 1 == +e.have_more;
                    i(e.session_list, function(e, n) {
                        (e = t._convert(n)) && r.push(e);
                    }), n(r, o);
                }, function(e) {
                    n([], !0);
                });
            },
            insert: function(e, n) {
                this._insert(e, n);
            },
            getSessions: function(e) {
                var n = this;
                this._getSessions(this.sessions, function(t, r) {
                    n._insert(t, function() {
                        e(t, r);
                    });
                });
            },
            clearAll: function(e, n) {
                this.sessions = [], e && e();
            }
        }))();
    }, function(e, n, t) {
        var r = t(2), o = (n = t(3)).fnEmpty, i = n.each, s = n.inherits, u = n.extend, c = n.toString, a = n.jsonHandler, d = t(15), f = t(25), l = t(17), _ = t(10), g = {};
        e.exports = s(r, {
            constructor: function() {
                r.call(this), this.sessions = [];
            },
            _sortCompare: function(e, n) {
                return e.sort_time > n.sort_time ? -1 : 1;
            },
            _getPosition: function(e, n) {
                for (var t = 0; t < e.length; t++) {
                    var r = e[t];
                    if (r.user.user_id == n.user.user_id && r.user.user_source == n.user.user_source) return t;
                }
                return -1;
            },
            _insert: function(e, n) {
                e = Array.isArray(e) ? e : [ e ];
                var t = this, r = [], o = [], s = [], a = [];
                if (i(e, function(e, n) {
                    if (n.msg && n.msg.client_only && "1" === c(n.msg.client_only)) return !0;
                    if (n.msg ? n.sort_time = n.msg.send_time : null == n.sort_time && (n.sort_time = new Date().getTime()), 
                    -1 === (e = t._getPosition(t.sessions, n))) o.push(n), t.sessions.push(n), r.push(n); else {
                        var i = t.sessions[e];
                        (i.sort_time < n.sort_time || !i.msg && n.msg) && (o.push(n), i.sort_time = n.sort_time, 
                        i.msg = n.msg);
                    }
                    -1 !== e && n.msg && n.msg.options && "1" == n.msg.options.talk_list_order_ig + "" && s.push({
                        session: n,
                        pos: e
                    });
                }), 0 === o.length) return n && n(a);
                i(o, function(e, n) {
                    n.msg && n.msg.client_only && "1" === c(n.msg.client_only) || a.push(n);
                }), n && n(a);
                var d = u(!0, [], this.sessions);
                s.forEach(function(e) {
                    d.splice(e.pos, 1);
                }), d = d.sort(this._sortCompare), s.forEach(function(e) {
                    d.splice(e.pos, 0, e.session);
                }), this.sessions = d, this.triggerEvent(f.sessionChanged, this.getAllSessions()), 
                0 < r.length && this.triggerEvent(f.newSessionLoaded, f.MORE, r);
            },
            _getQueryParams: function(e) {
                for (var n, t = {
                    last_other_id: null,
                    last_other_source: null,
                    last_msg_id: null,
                    count: 10,
                    received_count: e.length
                }, r = 0; r < e.length; r++) {
                    var o = e[r];
                    n && n.msg && n.msg.msg_id ? o.msg && o.msg.msg_id && n.msg && n.msg.msg_id && n.msg.msg_id > o.msg.msg_id && (n = o) : n = o;
                }
                return n && n.msg && (t.last_other_id = n.user.user_id, t.last_other_source = n.user.user_source, 
                t.last_msg_id = n.msg.msg_id), t;
            },
            _convert: function(e) {
                if (e = e.msg_info, -1 === "1 2 3 7 8 9 13 14 15 16".split(" ").indexOf(c(e.msg_type)) || e.sender_id == e.to_id && e.sender_source == e.to_source) return null;
                var n = _.get();
                return n.user_id == e.sender_id && n.user_source == e.sender_source ? {
                    user: {
                        user_id: e.to_id,
                        user_source: e.to_source
                    },
                    msg: {
                        msg_id: e.msg_id,
                        content: a.parse(e.content),
                        send_time: e.send_time,
                        msg_type: e.msg_type
                    }
                } : n.user_id == e.to_id && n.user_source == e.to_source ? {
                    user: {
                        user_id: e.sender_id,
                        user_source: e.sender_source
                    },
                    msg: {
                        msg_id: e.msg_id,
                        content: a.parse(e.content),
                        send_time: e.send_time,
                        msg_type: e.msg_type
                    }
                } : null;
            },
            _fetchSessions: function(e, n) {
                var t = this, r = e.last_other_id + "@" + e.last_other_source + "@" + e.count + "@" + e.last_msg_id;
                if (g[r]) g[r].then(function(e, t) {
                    n(e, t);
                }, function() {
                    n([], !0);
                }); else {
                    var o = $.Deferred();
                    d(l.get_session_list.name, e, null, function(e) {
                        var s = [], u = 1 == +e.have_more;
                        i(e.session_list, function(e, n) {
                            (e = t._convert(n)) && s.push(e);
                        }), n(s, u), o.resolve(s, u), delete g[r];
                    }, function(e) {
                        n([], !0), o.reject([], !0), delete g[r];
                    }), g[r] = o.promise();
                }
            },
            _getSessions: function(e, n) {
                e = this._getQueryParams(e), this._fetchSessions(e, n);
            },
            start: o,
            stop: o,
            getSessions: o,
            clearAll: o,
            insert: o,
            getSession: function(e, n) {
                for (var t = 0; t < this.sessions.length; t++) {
                    var r = this.sessions[t] || {}, o = r.user || {};
                    if (o.user_id === e && o.user_source === n) return r;
                }
                return null;
            },
            getAllSessions: function() {
                return u(!0, [], this.sessions);
            }
        });
    }, function(e, n, t) {
        n = {
            login: null,
            logout: null,
            imTokenExpired: null,
            connectchange: null,
            msgReceived: null,
            contactOnlineStatusChanged: null,
            syncAppData: null,
            unreadChanged: null,
            referChanged: null,
            sessionChanged: null,
            newSessionLoaded: null,
            userChanged: null,
            falseNews: null,
            mainPageChanged: null,
            changed: null,
            FIRST: null,
            MORE: null
        }, n = t(26)(n), e.exports = n;
    }, function(e, n) {
        e.exports = function(e) {
            var n, t = {};
            if (!(e instanceof Object) || Array.isArray(e)) throw Error("keyMirror(...): Argument must be an object.");
            for (n in e) e.hasOwnProperty(n) && (t[n] = n);
            return t;
        };
    }, function(e, n, t) {
        n = t(28), e.exports = n;
    }, function(e, n, t) {
        var r = t(29), o = (n = t(3)).inherits, i = t(10), s = t(25), u = n.toString, c = n.each, a = n.jsonHandler, d = t(15), f = t(17), l = {};
        e.exports = new (o(r, {
            constructor: function() {
                r.call(this);
            },
            _getMsgRecordsRemote: function(e, n, t) {
                d(f.get_chat_records.name, e, null, function(e) {
                    e = e.msg_list, c(e, function(e, n) {
                        "string" == typeof n.content && (n.content = a.parse(n.content));
                    }), n && n(e);
                }, function() {
                    t && t();
                });
            },
            send: function(e, n, t) {
                this._send(e, n, t);
            },
            setUnreadToZero: function(e, n, t) {
                this._setUnreadToZero(e, n, t);
            },
            saveUnreadNum: function(e) {
                this._saveUnreadNum(e);
            },
            isNeedShow: function(e) {
                var n, t = i.get();
                if (e.options && e.options.show_in_app && 0 !== e.options.show_in_app.length) {
                    n = !1;
                    var r = e.options.show_in_app, o = config.appid.split("-")[0];
                    -1 !== r.findIndex(function(e) {
                        return e + "" == o + "";
                    }) && (n = !0);
                } else n = !0;
                return e.sender_id + "" == t.user_id + "" && e.sender_source + "" == t.user_source + "" && e.options && e.options.sender_hide && "1" === u(e.options.sender_hide) && (n = !1), 
                n;
            },
            setRefer: function(e, n, t) {
                var r = e + "@" + n, o = l[r];
                (!o || !o.invitation || o.invitation.id && u(o.invitation.id) !== u(t.invitation.id) && o.invitation.refer_time < t.invitation.refer_time) && (t = this._referToString(t), 
                l[r] = t, this.triggerEvent(s.referChanged, {
                    refer: t,
                    user_id: e,
                    user_source: n
                }));
            },
            getRefer: function(e, n) {
                return e = e + "@" + n, l[e] = this._referToString(l[e]), l[e] ? l[e] : null;
            }
        }))();
    }, function(n, t, r) {
        var o = r(2), i = (t = r(3)).fnEmpty, s = t.each, u = t.inherits, c = t.toString, a = t.jsonHandler, d = r(14), f = r(15), l = r(17), _ = r(10), g = r(25), h = {}, p = {};
        n.exports = u(o, {
            constructor: function() {
                o.call(this), this._unread = {};
            },
            _referToString: function(n) {
                if ("object" !== (void 0 === n ? "undefined" : e(n)) || !n || !n.invitation) return null;
                var t = n.invitation;
                return t.id = c(t.id), t.title = c(t.title), t.url = c(t.url), t.rootcateid = c(t.rootcateid), 
                t.cateid = c(t.cateid), t.role = c(t.role), t.scene = c(t.scene), n;
            },
            _send: function(e, n, t) {
                f(l.sendmsg.name, null, e, function(e) {
                    n(e);
                }, t);
            },
            _setUnreadToZero: function(e, n, t) {
                var r = _.get();
                t = this.getLastMsg(e, n).msg_id, this.ackShown({
                    sender_id: e,
                    sender_source: n,
                    msg_ids: [ t ],
                    to_id: r.user_id,
                    to_source: r.user_source
                }), e = [ e, n ].join("@"), this._unread[e] && (n = {}, n[e] = 0, this._unread[e] = 0, 
                this.triggerEvent(g.unreadChanged, n));
            },
            _saveUnreadNum: function(e) {
                var n = this, t = {};
                s(e, function(e, r) {
                    var o = r;
                    "xcx" != d.get() && (e = r.contact, o = r.num), r = (r = n._unread[e]) ? r + o : o, 
                    n._unread[e] = r, t[e] = r;
                }), n.triggerEvent(g.unreadChanged, t);
            },
            _getMsgRecordsRemote: function(e, n, t) {
                var r = e.chat_user_id + "@" + e.chat_user_source + "@" + e.count + "@" + e.last_min_msg_id;
                if (p[r]) p[r].then(function(e) {
                    n(e);
                }, t); else {
                    var o = $.Deferred();
                    f(l.get_chat_records.name, e, null, function(e) {
                        e = e.msg_list, s(e, function(e, n) {
                            "string" == typeof n.content && (n.content = a.parse(n.content));
                        }), n && n(e), o.resolve(e), delete p[r];
                    }, function() {
                        t && t(), o.reject(), delete p[r];
                    }), p[r] = o.promise();
                }
            },
            _getMsgFromLocal: function(e, n, t) {
                return !1;
            },
            start: i,
            stop: i,
            clearAll: i,
            send: i,
            setUnreadToZero: i,
            ackShown: function(e, n, t) {
                f(l.ack_msg_show.name, null, e, n, t);
            },
            ackRead: function(e, n, t) {
                f(l.ack_msg_read.name, e, n, t);
            },
            ackMsgBatch: function(e, n, t) {
                f(l.ack_msg_batch.name, null, e, n, function() {
                    f(l.ack_msg_batch.name, null, e, n, t);
                });
            },
            saveUnreadNum: i,
            getMsgRecords: function(e, n, t) {
                var r = this, o = function(e, n, t) {
                    if (!r._getMsgFromLocal(e, n, t)) {
                        if (-1 !== e.option) return n([]);
                        r._getMsgRecordsRemote({
                            chat_user_id: e.user_id,
                            chat_user_source: e.user_source,
                            count: e.count,
                            last_min_msg_id: e.msg_id ? e.msg_id : 0
                        }, function(e) {
                            n(e);
                        }, t);
                    }
                }, i = function(e, n, t) {
                    for (var o = (o = r.getLastMsg(e, n)) || t[0], i = 0; i < t.length; i++) t[i].msg_id > o.msg_id && (o = t[i]);
                    r.setLastMsg(e, n, o);
                }, s = function() {
                    var e = [];
                    return function(n, t, u) {
                        o(n, function(o) {
                            var c, a = o.length;
                            if (0 === o.length) return 0 < e.length && i(n.user_id, n.user_source, e), t(e);
                            if (-1 !== [ "web", "wap" ].indexOf("xcx")) {
                                c = [];
                                for (var d = 0, f = o.length; d < f; d++) {
                                    var l = o[d];
                                    r.isNeedShow(l) && c.push(l);
                                }
                            } else c = o.filter(function(e) {
                                return r.isNeedShow(e);
                            });
                            Array.prototype.push.apply(e, c), (c = e.length) >= n.count || o.length < n.count ? (i(n.user_id, n.user_source, e), 
                            t(e.slice(0, c >= n.count ? n.count : e.length))) : (n.msg_id = (1 == n.option ? o[0] : o[a - 1]).msg_id, 
                            s(n, t, u));
                        }, function(e) {
                            u && u(e);
                        });
                    };
                }();
                s(e, n, t);
            },
            getAllUnreadAmount: function() {
                return this._unread;
            },
            isNeedShow: i,
            getLastMsg: function(e, n) {
                return h[e + "@" + n];
            },
            setLastMsg: function(e, n, t) {
                h[e + "@" + n] = t;
            },
            getUnreceviedMsgNum: function(e, n) {
                f(l.get_total_unread_msg_count.name, null, null, function(n) {
                    e && e(parseInt(n));
                }, function(e) {
                    n && n(null);
                });
            }
        });
    }, function(e, n, t) {
        var r = t(15), o = t(17);
        e.exports = {
            getCaptcha: function(e, n, t) {
                r(o.get_captcha.name, e, null, n, t);
            },
            validateCaptcha: function(e, n, t) {
                r(o.validate_captcha.name, e, null, n, t);
            }
        };
    }, function(e, n, t) {
        n = t(32), e.exports = n;
    }, function(e, n, t) {
        var r = t(33), o = (n = t(3)).inherits, i = n.extend, s = t(25), u = t(34);
        e.exports = o(r, {
            constructor: function(e) {
                r.call(this), this._url = null, this._commonParams = {}, this._websocket = this._heartStamp = this._options = null, 
                function(n) {
                    var t = {
                        ack: function(e) {
                            e();
                        }
                    };
                    i(t, e), n._options = t;
                }(this);
            },
            start: function() {
                this.connect();
            },
            stop: function() {},
            connect: function() {
                var e = this;
                e.triggerEvent(s.connectchange, !0);
                var n = i({}, this._commonParams);
                this._websocket = u({
                    url: this._url,
                    method: "get",
                    getparams: n,
                    onError: function(n) {
                        setTimeout(function() {
                            e.connect();
                        }, 5e3);
                    },
                    onMessage: function(n) {
                        n.data.forEach(function(n) {
                            e.handleComet(n);
                        });
                    }
                }), this._websocket.connect();
            },
            onDisconnect: function(e) {
                this.triggerEvent(s.connectchange, !1, e);
            },
            onLogout: function(e) {
                this.triggerEvent(s.logout, e);
            }
        });
    }, function(e, n, t) {
        var r = t(2), o = (n = t(3)).inherits, i = n.fnEmpty, s = n.jsonHandler, u = t(25);
        e.exports = o(r, {
            constructor: function() {
                r.call(this);
            },
            handleComet: function(e, n, t) {
                var r = this;
                switch (e.valueType) {
                  case "message":
                    r._options.ack(e, function() {
                        for (var t = [], o = 0, i = e.value.length; o < i; o++) t.push(e.value[o]);
                        0 < t.length && r.triggerEvent(u.msgReceived, e.value), n && n();
                    }, function() {
                        r.onDisconnect("ack fail.token expired."), t && t();
                    });
                    break;

                  case "command":
                    switch (e.value[0].name) {
                      case "FORCEOFF":
                        r.onDisconnect("FORCEOFF"), r.storeForceOff();
                        break;

                      case "SYNCUSERDATA":
                        r.reconnect();
                        break;

                      case "TOKENEXPIRED":
                        r.onDisconnect("TOKENEXPIRED"), r.onLogout("TOKENEXPIRED");
                        break;

                      case "TOKENINVALID":
                        r.onDisconnect("TOKENINVALID"), r.onLogout("TOKENINVALID");
                    }
                    break;

                  case "commandmsg":
                    r._options.ack(e, function() {
                        for (var t = [], o = 0, i = e.value.length; o < i; o++) {
                            var c, a = e.value[o];
                            if (c = "string" == typeof a.content ? s.parse(a.content) : a.content, -1 !== [ "audio", "video" ].indexOf(c.data.call_type)) {
                                var d = "call_" + c.data.call_type;
                                t.push({
                                    msg_id: a.msg_id,
                                    msg_type: a.msg_type,
                                    send_time: a.send_time,
                                    sender_id: c.data.sender_id,
                                    sender_source: c.data.sender_source,
                                    show_type: d,
                                    to_id: a.to_id,
                                    to_source: a.to_source,
                                    content: {
                                        type: d
                                    }
                                });
                            }
                        }
                        0 < t.length && r.triggerEvent(u.msgReceived, t), n && n();
                    }, function() {
                        r.onDisconnect("ack fail.token expired."), t && t();
                    });
                }
            },
            reconnect: i,
            storeForceOff: i,
            init: function(e, n) {
                this._url = e, this._commonParams = n;
            }
        });
    }, function(e, n, t) {
        n = t(3);
        var r = t(21), o = n.param, i = n.jsonHandler;
        e.exports = function(e) {
            o(e.getparams);
            var n = e.postparams && i.stringify(e.postparams), t = e.url + "?version=" + r.getVersion();
            return n && (n = r(n)), {
                connect: function() {
                    wx.onSocketOpen(function(t) {
                        n.send({
                            data: r(i.stringify(e.getparams)),
                            success: function() {},
                            fail: function() {}
                        }), e.onOpen && e.onOpen(t);
                    }), wx.onSocketError(function(n) {
                        e.onError && e.onError(n);
                    }), wx.onSocketMessage(function(n) {
                        e.onMessage && e.onMessage(i.parse(n.data));
                    }), wx.onSocketClose(function(n) {
                        e.onClose && e.onClose(n);
                    });
                    var n = this;
                    !function n() {
                        wx.connectSocket({
                            url: t,
                            method: e.method,
                            fail: function(e) {
                                setTimeout(function() {
                                    n();
                                }, 5e3);
                            }
                        });
                    }();
                },
                send: function(e) {
                    wx.sendSocketMessage(e);
                },
                close: function() {
                    wx.closeSocket();
                }
            };
        };
    } ]);
});