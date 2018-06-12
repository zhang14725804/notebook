var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

module.exports = function(t) {
    function e(o) {
        if (n[o]) return n[o].exports;
        var r = n[o] = {
            exports: {},
            id: o,
            loaded: !1
        };
        return t[o].call(r.exports, r, r.exports, e), r.loaded = !0, r.exports;
    }
    var n = {};
    return e.m = t, e.c = n, e.p = "", e(0);
}([ function(t, e, n) {
    var o = n(1), r = n(3);
    t.exports = {
        getVersion: function() {
            return "1.3.1";
        },
        subscribe: n(19),
        game: n(22),
        pcGame: n(25),
        goods: o,
        enterprise: r.fn.extend({}, o, {
            init: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return t.isEnterprise = !0, o.init(t);
            }
        })
    };
}, function(t, e, n) {
    function o() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        r.call(this, t);
    }
    var r = n(2), i = n(4), a = n(3);
    a.inherits(o, r), a.fn.extend(o.prototype, {
        launchPay: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
            if (!i._super.hasContext()) {
                r.prototype.launchPay.call(this, t, e);
                var n = this.callTime = Date.now();
                this.app = new i({
                    params: t,
                    opt: this.opt,
                    callback: function() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        this.opt.autoDestroy && (o.instance.destroy(), o.instance = null), this.callTime == n && e(t);
                    }.bind(this)
                });
            }
        }
    }), o.instance = null, t.exports = {
        init: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return null != o.instance ? o.instance : o.instance = new o(t);
        },
        get: function() {
            if (!o.instance) throw Error("goods not initalize");
            return o.instance;
        },
        destroy: function() {
            o.instance.destroy(), o.instance = null;
        }
    };
}, function(t, e, n) {
    function o() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        this.opt = t, this.params = null, this.callback = null, this.app = null;
    }
    var r = n(3);
    r.fn.extend(o.prototype, {
        launchPay: function(t, e) {
            if (this.params = t, !r.lang.isFunction(e)) throw Error("callback must be a function");
            this.callback = e;
        },
        destroy: function() {
            try {
                this.app && this.app.destroy && (this.app.destroy(), this.app = null), this.callback = null;
            } catch (t) {}
        }
    }), t.exports = o;
}, function(t, e) {
    var n = t.exports;
    n.fn = {
        getParams: function(t) {
            if (!t) return {};
            var e = t.replace(/.+?\?/, "").replace(/#.*/, "").split("&"), n = {};
            for (var o in e) {
                var r = e[o].split("=");
                2 === r.length && (n[r[0]] = r[1]);
            }
            return n;
        },
        each: function(t, e) {
            var o, r = 0, i = t.length;
            if (void 0 === i && n.lang.isObject(t)) {
                for (var a in t) if (!1 === e.call(t[a], t[a], a, t)) break;
            } else for (o = t[0]; r < i && !1 !== e.call(o, o, r, t); o = t[++r]) ;
            return t;
        },
        extend: function(t) {
            for (var e = 1; e <= arguments.length; e++) for (var n in arguments[e]) t[n] = arguments[e][n];
            return t;
        },
        formatFloat: function(t, e, n, o) {
            return o = ~~o ? ~~o : e + 1, intNumber = Math.round(t * Math.pow(10, o)), Math[n](intNumber / Math.pow(10, o - e)) / Math.pow(10, e);
        },
        uuid: function(t, e) {
            var n, o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), r = [];
            if (e = e || o.length, t) for (n = 0; n < t; n++) r[n] = o[0 | Math.random() * e]; else {
                var i;
                for (r[8] = r[13] = r[18] = r[23] = "-", r[14] = "4", n = 0; n < 36; n++) r[n] || (i = 0 | 16 * Math.random(), 
                r[n] = o[19 == n ? 3 & i | 8 : i]);
            }
            return r.join("");
        },
        emptyFun: function() {}
    }, n.lang = {
        is: function(t, e) {
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return void 0 !== e && null !== e && n === t;
        },
        isNumber: function(t) {
            return this.is("Number", t);
        },
        isString: function(t) {
            return this.is("String", t);
        },
        isFunction: function(t) {
            return this.is("Function", t);
        },
        isObject: function(t) {
            return this.is("Object", t);
        },
        isDocument: function(t) {
            return null != t && t.nodeType == t.DOCUMENT_NODE;
        },
        isWindow: function(t) {
            return null != t && t == t.window;
        },
        isPlainObject: function(t) {
            return n.lang.isObject(t) && !n.lang.isWindow(t) && Object.getPrototypeOf(t) == Object.prototype;
        },
        isArray: function(t) {
            return this.is("Array", t);
        }
    }, n.req = {
        serializeParam: function(t) {
            if (!t) return "";
            var e = [];
            for (var n in t) void 0 === t[n] && null == t[n] || e.push(n + "=" + t[n]);
            return e.join("&");
        }
    }, n.string = {
        escHTML: function(t, e) {
            var n = [ "&", "&amp;", "<", "&lt;", ">", "&gt;", " ", "&nbsp;", '"', "&quot;", "'", "&#39;", "\\r", "<br>", "\\n", "<br>" ];
            e && n.reverse();
            for (var o = 0, r = t; o < n.length; o += 2) r = r.replace(new RegExp(n[o], "g"), n[1 + o]);
            return r;
        },
        tmpl: function(t, e) {
            return "string" == typeof t ? t.replace(/\$([a-zA-Z0-9_\.]*)\$/g, function(t, o) {
                if (-1 !== o.indexOf(".")) {
                    o = o.split(/\./g);
                    var r = e;
                    return n.fn.each(o, function(t) {
                        r = r[t];
                    }), r || "";
                }
                return void 0 !== e[o] ? e[o] : "";
            }) : t;
        }
    }, n.tmpl = n.string.tmpl, n.inherits = function(t, e) {
        var n = function() {};
        n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t, t._super = e;
    };
}, function(t, e, n) {
    function o(t) {
        var e = this, n = t.params, o = void 0 === n ? {} : n, u = t.callback, p = void 0 === u ? function() {} : u, l = t.opt, f = void 0 === l ? {} : l;
        r.call(this, {
            params: o,
            callback: p,
            opt: f
        }), this.IFORMAT_PREFIX = "midaswechatpay." + (this.isEnterprise() ? "enterprise" : "goods"), 
        this.reportObj.setIformatPrefix(this.IFORMAT_PREFIX), this.payMod = new s(o);
        var d = this.payMod.checkGoodsParams();
        this.checkEnv(function() {
            d.status ? (e.report("goodsinfo.pv"), e.payMod.getGoodsInfo(function(t) {
                e.report("goodsinfo.status", {
                    httpCode: t.httpCode || "200",
                    resultMsg: t.msg
                }, {
                    resultCode: t.ret
                });
                var n = !1, o = {
                    ret: a.code.FAIL,
                    msg: a.msg[a.code.FAIL]
                };
                if (~~t.ret) o.ret = t.ret, o.msg = t.msg || a.msg[a.code.FAIL]; else if (t.info && t.info.channel && c.lang.isArray(t.info.channel)) try {
                    e.directPay(t.info.channel[0] && t.info.channel[0].name) ? n = !0 : (o.ret = a.code.FAIL, 
                    o.msg = a.msg.CHANNEL_NOT_SUPPORT);
                } catch (t) {
                    o.ret = a.code.FAIL, o.msg = t.message || "";
                }
                n || e.callback(new i(o).getResult());
            })) : e.paramsError(d.msg);
        });
    }
    var r = n(5), i = n(11), a = n(9), s = n(14), c = n(3);
    c.inherits(o, r), c.fn.extend(o.prototype, {
        isEnterprise: function() {
            return this.opt.isEnterprise;
        }
    }), t.exports = o;
}, function(t, e, n) {
    function o(t) {
        var e = t.params, n = t.callback, o = t.opt;
        if (this.params = e, this.opt = o, this.callback = n, this.env = {}, !a.lang.isFunction(this.callback)) throw new Error("callback must be a function");
        this.payMod = null, i.setContext(this), a.fn.extend(this.params, {
            env: ~~this.opt.env
        }), this.reportObj = new s(), this.payStartTime = new Date().getTime();
    }
    var r = n(6), i = n(8), a = n(3), s = n(13), c = n(9), u = n(11);
    o.hasContext = function() {
        return !!i.getContext();
    }, a.fn.extend(o.prototype, {
        checkEnv: function(t) {
            var e = this;
            wx.getSystemInfo({
                success: function(t) {
                    e.env = t || {};
                },
                complete: function() {
                    a.lang.isFunction(t) && t();
                }
            });
        },
        isEnterprise: function() {
            return !1;
        },
        getPlatform: function() {
            var t = this.env;
            return t.model ? t.model.indexOf("iPhone") > -1 ? "ios" : "android" : "";
        },
        getVersion: function() {
            var t = this.env;
            return t ? t.version || "" : "";
        },
        getPayStartTime: function() {
            return this.payStartTime;
        },
        report: function(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            this.reportObj.send(t, e, {
                3: this.params.openid,
                37: this.params.session_id,
                43: this.params.session_type,
                41: this.params.login_wx_appid,
                26: this.params.pf,
                7: n.resultCode || 0,
                19: this.params.service_code || "",
                24: this.params.appid || this.params.offer_id,
                50: this.getPlatform() + "_" + this.getVersion(),
                51: this.params.aid || ""
            });
        },
        getPayMod: function() {
            return this.payMod;
        },
        directPay: function(t) {
            var e = this;
            return t && r.hasOwnProperty(t) ? (this.report("directpay", {
                channel: t
            }), r[t](null, function(t) {
                try {
                    var n = new Date().getTime();
                    e.report("payduration", {
                        time: n - e.getPayStartTime()
                    });
                } catch (t) {}
                e.callback(t);
            }), !0) : (this.report("directpay.nosupport", {
                channel: t
            }), !1);
        },
        getBizAppid: function() {
            return 1 != this.opt.use_default_wxappid ? this.params.biz_appid || "1" : this.payMod.getDefaultBizAppid();
        },
        paramsError: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            setTimeout(function() {
                t.callback(new u({
                    ret: c.code.PARAMS_ERROR,
                    msg: e || c.msg[c.code.FAIL]
                }).getResult());
            }, 0);
        },
        showPayLoading: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 3;
            try {
                wx.showToast({
                    title: "支付中...",
                    icon: "loading",
                    duration: 1e3 * t
                });
            } catch (t) {}
        },
        hidePayLoading: function() {
            try {
                wx.hideToast();
            } catch (t) {}
        },
        destroy: function() {
            i.destroyContext(), this.callback = null, this.reportObj.destroy(), this.reportObj = null, 
            this.payMod = null;
        }
    }), t.exports = o;
}, function(t, e, n) {
    var o = n(7), r = n(12);
    t.exports = {
        wechat: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
            new o(t, e);
        },
        wechatapp: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
            new r(t, e);
        }
    };
}, function(t, e, n) {
    function o() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
        s.call(this, t, e), this.buy(this.params);
    }
    var r = n(8), i = n(9), a = n(3), s = n(10);
    a.inherits(o, s), a.fn.extend(o.prototype, {
        buy: function(t) {
            var e = this, n = {
                biz_appid: r.getContext().getBizAppid(),
                wx_direct_pay: 0,
                wx_publice_pay: 1,
                pay_method: "wechat"
            };
            t = a.fn.extend({}, n, t);
            var o = r.getContext().getPayMod();
            "1" == o.getPayParams().change_wx_openid && (t.change_wx_openid = "1"), o.save(t, function(n) {
                return e.handlerBuy(n, t);
            });
        },
        getChannelName: function() {
            return "wechat";
        },
        handlerBuy: function(t, e) {
            var n = this;
            if (~~t.ret) this.callback.call(null, this.constructResult(t)); else {
                var o = t.wx_info, a = (o.wx_sign_url, o.wx_appid, o.wx_time), s = o.wx_noncenum, c = o.wx_package, u = o.wx_signtype || "SHA1", p = o.wx_sign, l = !1;
                r.getContext().report("wechatpay.start.pv"), wx.requestPayment({
                    timeStamp: a,
                    nonceStr: s,
                    package: c,
                    signType: u,
                    paySign: p,
                    complete: function(t) {
                        t.errMsg = t.errMsg || "";
                        var e = t.errMsg.indexOf("cancel") > -1, o = l ? i.code.SUCCESS : i.code.FAIL;
                        !l && e && (o = i.code.CANCEL);
                        var a = i.msg[o];
                        r.getContext().report("wechatpay.status", {
                            ret: o,
                            channel: n.getChannelName()
                        }), n.callback.call(null, n.constructResult({
                            ret: o,
                            msg: a
                        }));
                    },
                    success: function(t) {
                        l = !0;
                    },
                    fail: function(t) {
                        l = !1;
                    }
                });
            }
        }
    }), t.exports = o;
}, function(t, e, n) {
    var o = null;
    t.exports = {
        setContext: function(t) {
            o = t;
        },
        getContext: function() {
            return o;
        },
        getVersion: function() {
            return "1.3.1";
        },
        destroyContext: function() {
            o = null;
        }
    };
}, function(t, e) {
    function n(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t;
    }
    var o, r = e.code = {
        SUCCESS: 0,
        FAIL: -1,
        CANCEL: -2,
        INTERFACENOTEXIST: -3,
        PARAMS_ERROR: 1e3
    };
    e.msg = (o = {}, n(o, r.SUCCESS, "支付成功"), n(o, r.FAIL, "支付失败"), n(o, r.CANCEL, "支付取消"), 
    n(o, r.PARAMS_ERROR, "参数错误"), n(o, r.INTERFACENOTEXIST, "接口不存在"), n(o, "CHANNEL_NOT_SUPPORT", "渠道不支持"), 
    o);
}, function(t, e, n) {
    function o() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
        if (this.params = t, this.callback = e, !r.lang.isFunction(this.callback)) throw new Error("callback must be a function");
    }
    var r = (n(8), n(3)), i = n(11);
    r.fn.extend(o.prototype, {
        buy: function(t) {},
        handlerBuy: function(t) {},
        getChannelName: function() {
            return "";
        },
        constructResult: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = new i(t);
            return r.fn.extend(e, {
                channel: this.getChannelName()
            }), n.setExtra(e), n.result;
        }
    }), o.ResultAdapter = i, t.exports = o;
}, function(t, e, n) {
    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    var r = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                Object.defineProperty(t, o.key, o);
            }
        }
        return function(e, n, o) {
            return n && t(e.prototype, n), o && t(e, o), e;
        };
    }(), i = n(3), a = function() {
        function t(e) {
            var n = e.ret, r = e.msg;
            o(this, t), this.result = {
                resultCode: n,
                resultMsg: r
            };
        }
        return r(t, [ {
            key: "setExtra",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                i.fn.extend(this.result, t);
            }
        }, {
            key: "getResult",
            value: function() {
                return this.result;
            }
        } ]), t;
    }();
    t.exports = a;
}, function(e, n, o) {
    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function i(e, n) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
    }
    function a(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
        e.prototype = Object.create(n && n.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
    }
    var s = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                Object.defineProperty(t, o.key, o);
            }
        }
        return function(e, n, o) {
            return n && t(e.prototype, n), o && t(e, o), e;
        };
    }(), c = o(8), u = o(9), p = o(3), l = o(10), f = function(t) {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1];
            r(this, e);
            var o = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
            return wx && wx.requestVirtualPayment ? o.buy(o.params) : (c.getContext().report("requestVirtualPayment.notexist"), 
            o.callback.call(null, o.constructResult({
                ret: u.code.INTERFACENOTEXIST,
                msg: u.msg[u.code.INTERFACENOTEXIST]
            }))), o;
        }
        return a(e, l), s(e, [ {
            key: "buy",
            value: function(t) {
                var e = this, n = c.getContext().getPayMod();
                if (n.needCurrencyType(this.getChannelName())) return c.getContext().paramsError("需要currency_type参数");
                var o = {
                    currency_type: n.getCurrencyType(),
                    pay_method: this.getChannelName()
                };
                t = p.fn.extend({}, o, t), "1" == n.getPayParams().change_wx_openid && (t.change_wx_openid = "1"), 
                n.save(t, function(n) {
                    return e.handlerBuy(n, t);
                });
            }
        }, {
            key: "getChannelName",
            value: function() {
                return "wechatapp";
            }
        }, {
            key: "handlerBuy",
            value: function(t, e) {
                var n = this;
                if (!~~t.ret && t.wechatapp_info) {
                    var o = !1, r = "", i = t.wechatapp_info;
                    wx && wx.requestVirtualPayment ? (i.price_level, i.orderid, i.orderid, i.desc, i.sign, 
                    c.getContext().report("wechatapp_pay.start.pv"), wx.requestVirtualPayment({
                        priceLevel: i.price_level,
                        businessOrderId: i.orderid,
                        outTradeNo: i.orderid,
                        desc: i.desc || "",
                        virtualPaySign: i.sign,
                        complete: function(t) {
                            t.errMsg = t.errMsg || "";
                            var e = (t.errMsg.indexOf("CANCEL"), o ? u.code.SUCCESS : void 0 !== t.errCode ? t.errCode : u.code.FAIL), i = r || u.msg[e];
                            c.getContext().report("wechatapp_pay.status", {
                                ret: e,
                                channel: n.getChannelName()
                            }), n.callback.call(null, n.constructResult({
                                ret: e,
                                msg: i
                            }));
                        },
                        success: function(t) {
                            o = !0;
                        },
                        fail: function(t) {
                            o = !1, r = t && t.errMsg;
                        }
                    })) : (c.getContext().report("requestVirtualPayment.notexist"), this.callback.call(null, this.constructResult({
                        ret: u.code.INTERFACENOTEXIST,
                        msg: u.msg[u.code.INTERFACENOTEXIST]
                    })));
                } else this.callback.call(null, this.constructResult(t));
            }
        } ]), e;
    }();
    e.exports = f;
}, function(t, e, n) {
    function o() {
        this.reportQueue = [], this.pid = 0, this.iformatPrefix = "", this.handleReportComplete = this.handleReportComplete.bind(this);
    }
    var r = n(3), i = n(8);
    r.fn.extend(o.prototype, {
        constructParams: function(t, e, n) {
            var o = {};
            r.fn.extend(o, {
                6: 10,
                7: 0,
                8: e ? r.req.serializeParam(e) : "",
                13: this.pid++,
                21: [ this.iformatPrefix, t ].join("."),
                31: "midas_wx_sdk_" + i.getVersion(),
                38: new Date().getTime()
            }), r.fn.extend(o, n);
            var a = [];
            r.fn.each(o, function(t, e) {
                a.push(e + "=" + encodeURIComponent(t));
            });
            var s = [];
            return "https://api.unipay.qq.com/v1/900/15499/log_data?num=1&record0=" + encodeURIComponent(a.join("|")) + s.join("") + "&rr" + Math.random();
        },
        doSend: function() {
            var t = this.reportQueue[0];
            wx.request({
                url: t,
                method: "GET",
                complete: this.handleReportComplete
            });
        },
        handleReportComplete: function() {
            this.reportQueue.shift(), this.reportQueue.length > 0 && this.doSend();
        },
        send: function(t, e) {
            var n = this, o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = this.constructParams(t, e, o);
            this.reportQueue.push(r), 1 == this.reportQueue.length && setTimeout(function() {
                n.doSend();
            }, 0);
        },
        destroy: function() {},
        setIformatPrefix: function(t) {
            this.iformatPrefix = t;
        }
    }), t.exports = o;
}, function(t, e, n) {
    function o(t) {
        i.call(this, t), this.initCgi(), this.processType = "bg", this.goodsInfo = null;
    }
    var r = n(3), i = n(15), a = n(8);
    r.inherits(o, i), r.fn.extend(o.prototype, {
        getMid: function() {
            return (this.params.goodstokenurl || "").split("/")[2];
        },
        getTokenId: function() {
            return r.fn.getParams(this.params.goodstokenurl).token_id;
        },
        getGoodsInfo: function(t) {
            this.cgi.mobileGoodsInfo(r.fn.extend({}, this.getInfoPublicParams(), {
                zoneid: this.getZoneid(),
                params: this.params.goodstokenurl
            }), t);
        },
        getZoneid: function() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).zoneid || this.params.zoneid || "1";
        },
        save: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], n = {
                token_id: this.getTokenId()
            };
            r.fn.extend(n, this.getSavePublicParams()), r.fn.extend(n, {
                zoneid: this.getZoneid(this.buyParams),
                buy_quantity: this.params.buy_quantity || ""
            }), r.fn.extend(n, t), n._params = this.params.goodstokenurl, this.doSave(n, e);
        },
        doSave: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
            a.getContext().report("startsave.pv"), this.cgi.mobileSaveGoods(t, function(t) {
                a.getContext().report("savestatus", {
                    httpCode: t.httpCode || "200",
                    resultMsg: t.msg
                }, {
                    resultCode: t.ret
                }), e(t);
            }, {
                method: "POST"
            });
        },
        checkGoodsParams: function() {
            var t = this, e = {
                status: !0,
                msg: ""
            }, n = this.checkPublicParams();
            return n.status ? (r.fn.each([ "goodstokenurl", "zoneid", "pf" ], function(n) {
                if (!t.params[n]) return e.status = !1, e.msg = n + "错误", !1;
                var o = t.params[n];
                "string" == typeof o && (t.params[n] = o);
            }), e) : n;
        }
    }), t.exports = o;
}, function(t, e, n) {
    function o(t) {
        this.params = t, this.params.extend = t.extend || "", this.session = new r({
            openid: t.openid,
            openkey: t.openkey || "no_key",
            sessionid: t.session_id || "hy_gameid",
            sessiontype: t.session_type || "wc_actoken"
        }), this.processType = "", this.cgi = null;
    }
    var r = n(16), i = n(17), a = (n(9), n(3));
    n(8), a.fn.extend(o.prototype, {
        getPayParams: function() {
            return this.params;
        },
        initCgi: function() {
            this.cgi = new i({
                pf: this.params.pf,
                pfkey: this.params.pfkey || "pfkey",
                appid: this.params.appid || this.params.offer_id,
                sandbox: ~~this.params.env,
                sessionObj: this.session
            });
        },
        getInfoPublicParams: function() {
            var t = {
                process_type: this.processType,
                page_type: "mall"
            };
            return this.params.login_wx_appid && a.fn.extend(t, {
                wx_appid: this.params.login_wx_appid
            }), t;
        },
        getSavePublicParams: function() {
            return {
                process_type: this.processType,
                page_type: "order",
                from_https: "1",
                from_h5: "1",
                extend: encodeURIComponent(this.params.extend || ""),
                provide_uin: this.params.provide_uin || "",
                wx_appid: this.params.login_wx_appid || ""
            };
        },
        getDefaultBizAppid: function() {
            return "";
        },
        save: function(t, e) {},
        checkPublicParams: function() {
            var t = this.params, e = "", n = {
                status: !0,
                msg: ""
            };
            return a.fn.each([ "offer_id", "openid" ], function(n) {
                if (!t[n]) return e = n + "错误", !1;
            }), e && (n.status = !1, n.msg = e), n;
        },
        getCurrencyType: function() {
            return this.params.currency_type || "";
        },
        needCurrencyType: function() {
            return "wechat_app" == (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") && !this.params.currency_type;
        }
    }), t.exports = o;
}, function(t, e, n) {
    var o = n(3), r = t.exports = function(t) {
        this.openid = t.openid, this.openkey = t.openkey, this.sessionid = t.sessionid, 
        this.sessiontype = t.sessiontype, this.sessionToken = this.openid + new Date().getTime();
    };
    o.fn.extend(r.prototype, {
        getSessionParam: function() {
            return {
                openid: encodeURIComponent(this.openid),
                openkey: encodeURIComponent(this.openkey),
                session_id: encodeURIComponent(this.sessionid),
                session_type: encodeURIComponent(this.sessiontype)
            };
        },
        addSessionParam: function(t) {
            return o.fn.addParam({
                openid: encodeURIComponent(this.openid),
                openkey: encodeURIComponent(this.openkey),
                sessionid: encodeURIComponent(this.sessionid),
                sessiontype: encodeURIComponent(this.sessiontype)
            }, t);
        },
        getUin: function() {
            return "";
        }
    });
}, function(t, e, n) {
    var o, r = void 0, i = r = n(3), a = (n(18), t.exports = function(t) {
        t = t || {}, this.pf = t.pf || "html5", this.pfkey = t.pfkey || "pfkey", this.appid = t.appid, 
        this.sandbox = ~~t.sandbox, this.sessionObj = t.sessionObj || null, this.mid = t.mid || "r", 
        this.domain = "api.unipay.qq.com", 1 == this.sandbox ? this.domain = "sandbox.api.unipay.qq.com" : 2 == this.sandbox && (this.domain = "dev.api.unipay.qq.com"), 
        this.domainq = this.sandbox ? "sandbox.api.unipay.qq.com" : "q.unipay.qq.com", this.sessionToken = t.sessionToken || i.fn.uuid() + new Date().getTime(), 
        t.extend && (this.extend = t.extend);
    });
    a.url = {}, a.url.mobileGoodsInfo = {
        url: "$domain$$params$&",
        https: !0
    }, a.url.mobileSaveGoods3 = {
        url: "$domain$$params$&",
        https: !0
    }, a.url.wechatAppProc = {
        url: "$domain$/v1/r/$appid$/wechatapp_proc?",
        https: !0
    }, a.url.jiefenPayGoods = {
        url: "https://m.jifen.qq.com/cgi-bin/pay_goods?",
        https: !0
    }, a.isEnterprise = !1, a.prototype = {
        setCrypto: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            o = t;
        },
        setEnv: function(t) {
            if (t && this.sandbox) switch (this.env = t, t) {
              case "dev":
                this.domain = "dev.api.unipay.qq.com";
                break;

              case "sandbox":
                this.domain = "sandbox.api.unipay.qq.com";
            }
        },
        restoreEnv: function() {
            this.sandbox && this.setEnv("sandbox");
        },
        set isSandbox(t) {
            this.sandbox = t, this.domain = this.sandbox ? "sandbox.api.unipay.qq.com" : "api.unipay.qq.com";
        },
        _getCgiUrl: function(t, e, n) {
            return e = e || {}, n = n || {}, i.tmpl(t.url, i.fn.extend({
                appid: this.appid,
                mid: this.mid || "r",
                domain: [ "https:", "//", n.domainq ? this.domainq : this.domain ].join("")
            }, e));
        },
        setSession: function(t) {
            this.sessionObj = t;
        },
        _getSessionParam: function() {
            return i.fn.extend({
                pf: this.pf,
                pfkey: this.pfkey,
                from_h5: 1,
                session_token: this.sessionToken,
                r: Math.random()
            }, this.sessionObj.getSessionParam());
        },
        request: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n = arguments[2], o = arguments[3];
            if (o = o || {}, wx) {
                r.fn.extend(e, {
                    webversion: "midaswxapp_1.3.1"
                });
                try {
                    o.disableLoading || wx.showToast({
                        title: "支付中",
                        icon: "loading",
                        duration: 5e3
                    });
                } catch (t) {}
                var i = !1, a = {
                    ret: -1
                };
                wx.request({
                    url: t,
                    method: o.method || "GET",
                    header: {
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: e,
                    success: function(t) {
                        i = !0;
                        var e = void 0;
                        t.statusCode >= 200 && t.statusCode <= 299 && (e = t.data), e || (e = {
                            ret: -9998,
                            httpCode: t.statusCode,
                            msg: "系统繁忙，请稍后再试！"
                        }), a = e;
                    },
                    fail: function() {
                        i = !1, a = {
                            ret: -9999,
                            msg: "请求超时！"
                        };
                    },
                    complete: function() {
                        try {
                            o.disableLoading || wx.hideToast();
                        } catch (t) {}
                        n(a);
                    }
                });
            }
        }
    };
    for (var s in a.url) !function(t) {
        a.prototype[t] = function(e, n) {
            var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            e = e || {};
            var r = {};
            i.fn.extend(r, this._getSessionParam()), i.fn.extend(r, e), this.request(this._getCgiUrl(a.url[t]), r, n, o);
        };
    }(s);
    a.prototype.mobileGoodsInfo = function(t, e, n) {
        t = t || {};
        var o = {};
        i.fn.extend(o, this._getSessionParam()), i.fn.extend(o, t);
        var r = t.params;
        delete t.params, r && /\/mobile_goods_info\?/.test(r) && (r = r.replace(/\/[a-z_]+\?/, "/wechatapp_proc?"), 
        this.request(this._getCgiUrl(a.url.mobileGoodsInfo, {
            params: r
        }), o, e, n));
    }, a.prototype.mobileSaveGoods = function(t, e, n) {
        t = t || {};
        var o = {
            biz_appid: this.sessionObj.appid || ""
        }, r = (t._url, t._mid, t._params);
        delete t._url, delete t._mid, delete t._params, i.fn.extend(o, this._getSessionParam()), 
        i.fn.extend(o, t), r && /\/mobile_goods_info\?/.test(r) && (r = r.replace(/\/[a-z_]+\?/, "/wechatapp_proc?"), 
        this.request(this._getCgiUrl(a.url.mobileSaveGoods3, {
            params: r
        }), o, e, n));
    };
}, function(t, e, n) {
    var o = n(3), r = function(t) {
        t = t || {}, this.opt = t, this.interval = null;
    };
    r.prototype.stop = function(t) {
        0 == t ? clearTimeout(this.interval) : 1 == t && clearInterval(this.interval), this.interval = null;
    }, e.CountDown = function(t) {
        if (t = t || {}, r.call(this, t), !(t.time && t.beforeCount && t.counting && t.countEnd)) throw Error("can not use countDown");
        t.beforeCount();
        var e = t.time, n = function() {
            if (this.interval) {
                if (t.counting(e), e <= 0) return this.stop(1), void t.countEnd();
                e--;
            }
        };
        n(), this.interval = setInterval(n.bind(this), 1e3);
    }, o.inherits(e.CountDown, r), e.Timeout = function(t) {
        (t = t || {}).time = t.time || 5, r.call(this, t), this.interval = setTimeout(function() {
            this.interval && (this.stop(0), t.timeUp && t.timeUp());
        }.bind(this), 1e3 * t.time);
    }, o.inherits(e.Timeout, r);
}, function(e, n, o) {
    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function i(e, n) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
    }
    function a(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
        e.prototype = Object.create(n && n.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
    }
    var s = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                Object.defineProperty(t, o.key, o);
            }
        }
        return function(e, n, o) {
            return n && t(e.prototype, n), o && t(e, o), e;
        };
    }(), c = function t(e, n, o) {
        null === e && (e = Function.prototype);
        var r = Object.getOwnPropertyDescriptor(e, n);
        if (void 0 === r) {
            var i = Object.getPrototypeOf(e);
            return null === i ? void 0 : t(i, n, o);
        }
        if ("value" in r) return r.value;
        var a = r.get;
        return void 0 !== a ? a.call(o) : void 0;
    }, u = o(2), p = o(20), l = function(t) {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return r(this, e), i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
        }
        return a(e, u), s(e, [ {
            key: "launchPay",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1];
                if (!p.hasContext()) {
                    c(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "launchPay", this).call(this, t, n);
                    var o = this.callTime = Date.now();
                    this.app = new p({
                        params: t,
                        opt: this.opt,
                        callback: function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this.opt.autoDestroy && (e.instance.destroy(), e.instance = null), this.callTime == o && n(t);
                        }.bind(this)
                    });
                }
            }
        } ]), e;
    }();
    l.instance = null, e.exports = {
        init: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return null != l.instance ? l.instance : l.instance = new l(t);
        },
        get: function() {
            if (!l.instance) throw Error("subscribe not initalize");
            return l.instance;
        },
        destroy: function() {
            l.instance.destroy(), l.instance = null;
        }
    };
}, function(e, n, o) {
    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function i(e, n) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
    }
    function a(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
        e.prototype = Object.create(n && n.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
    }
    var s = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                Object.defineProperty(t, o.key, o);
            }
        }
        return function(e, n, o) {
            return n && t(e.prototype, n), o && t(e, o), e;
        };
    }(), c = function t(e, n, o) {
        null === e && (e = Function.prototype);
        var r = Object.getOwnPropertyDescriptor(e, n);
        if (void 0 === r) {
            var i = Object.getPrototypeOf(e);
            return null === i ? void 0 : t(i, n, o);
        }
        if ("value" in r) return r.value;
        var a = r.get;
        return void 0 !== a ? a.call(o) : void 0;
    }, u = o(21), p = o(5), l = o(3), f = o(11), d = o(9), h = function(t) {
        function e(t) {
            var n = t.params, o = void 0 === n ? {} : n, a = t.callback, s = void 0 === a ? function() {} : a, c = t.opt, p = void 0 === c ? {} : c;
            r(this, e);
            var h = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, {
                params: o,
                callback: s,
                opt: p
            }));
            h.IFORMAT_PREFIX = "midaswechatpay.subscribe", h.reportObj.setIformatPrefix(h.IFORMAT_PREFIX), 
            h.payMod = new u(o);
            var m = h.payMod.checkSubscribeParams();
            return h.checkEnv(function() {
                h.payMod.checkSubscribeParams().status ? (h.report("monthinfo.pv"), h.payMod.getMonthInfo(function(t) {
                    h.report("monthinfo.status", {
                        httpCode: t.httpCode || "200",
                        resultMsg: t.msg
                    }, {
                        resultCode: t.ret
                    });
                    var e = !1, n = {
                        ret: d.code.FAIL,
                        msg: d.msg[d.code.FAIL]
                    };
                    if (~~t.ret) n.ret = t.ret, n.msg = t.msg || d.msg[d.code.FAIL]; else if (t.info && t.info.channel && l.lang.isArray(t.info.channel)) try {
                        h.directPay(t.info.channel[0] && t.info.channel[0].name) ? e = !0 : (n.ret = d.code.FAIL, 
                        n.msg = d.msg.CHANNEL_NOT_SUPPORT);
                    } catch (t) {
                        n.ret = d.code.FAIL, n.msg = t.message || "";
                    }
                    e || h.callback(new f(n).getResult());
                })) : setTimeout(function() {
                    h.callback(new f({
                        ret: d.code.PARAMS_ERROR,
                        msg: m.msg || d.msg[d.code.FAIL]
                    }).getResult());
                }, 0);
            }), h;
        }
        return a(e, p), s(e, [ {
            key: "destroy",
            value: function() {
                c(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "destroy", this).call(this);
            }
        } ]), e;
    }();
    e.exports = h;
}, function(e, n, o) {
    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function i(e, n) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
    }
    function a(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
        e.prototype = Object.create(n && n.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
    }
    var s, c = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                Object.defineProperty(t, o.key, o);
            }
        }
        return function(e, n, o) {
            return n && t(e.prototype, n), o && t(e, o), e;
        };
    }(), u = o(3), p = o(15), l = o(8), f = function(t) {
        t.prototype.checkSubscribeParams = function() {
            var t = this, e = {
                status: !0,
                msg: ""
            }, n = this.checkPublicParams();
            return n.status ? (u.fn.each([ "pf", "service_code" ], function(n) {
                if (!t.params[n]) return e.status = !1, e.msg = n + "错误", !1;
            }), e) : n;
        };
    }(s = function(t) {
        function e(t) {
            r(this, e);
            var n = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
            n.processType = "unimonth";
            var o = [];
            return n.params.aid && o.push("aid=" + n.params.aid), n.params.appremark = encodeURIComponent(o.join("&")), 
            n.account = n.params.account || "wechat", n.initCgi(), n;
        }
        return a(e, p), c(e, [ {
            key: "getProvideNoType",
            value: function() {
                return this.params.provide_uin ? "uin" : "wechatid";
            }
        }, {
            key: "getMonthInfo",
            value: function(t) {
                this.cgi.wechatAppProc(u.fn.extend({}, this.getInfoPublicParams(), {
                    service_code: this.params.service_code,
                    product_id: this.params.product_id,
                    buy_quantity: this.params.buy_quantity || "1",
                    provide_no_type: this.getProvideNoType()
                }), t);
            }
        }, {
            key: "getAutocoutFromExtend",
            value: function() {
                return !!this.params.extend && "1" == u.fn.getParams(this.params.extend).auto_cont;
            }
        }, {
            key: "save",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], n = {
                    buy_quantity: t.buy_quantity || this.params.buy_quantity || 1,
                    service_code: this.params.service_code,
                    product_id: t.product_id || this.params.product_id,
                    appremark: this.params.appremark || "",
                    provide_no_type: this.getProvideNoType(),
                    service_name: this.params.service_name || ""
                };
                u.fn.extend(n, this.getSavePublicParams()), u.fn.extend(n, t), ("1" == this.params.auto_cont || this.getAutocoutFromExtend()) && (n.auto_cont = "1"), 
                "wechatid" == this.getProvideNoType() && delete n.provide_uin, l.getContext().report("startsave.pv", {
                    serviceCode: n.service_code,
                    productId: n.product_id
                }), this.cgi.wechatAppProc(n, function(t) {
                    l.getContext().report("savestatus", {
                        httpCode: t.httpCode || "200",
                        resultMsg: t.msg
                    }, {
                        resultCode: t.ret
                    }), e(t);
                }, {
                    method: "POST"
                });
            }
        } ]), e;
    }()) || s;
    e.exports = f;
}, function(e, n, o) {
    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function i(e, n) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
    }
    function a(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
        e.prototype = Object.create(n && n.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
    }
    var s = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                Object.defineProperty(t, o.key, o);
            }
        }
        return function(e, n, o) {
            return n && t(e.prototype, n), o && t(e, o), e;
        };
    }(), c = function t(e, n, o) {
        null === e && (e = Function.prototype);
        var r = Object.getOwnPropertyDescriptor(e, n);
        if (void 0 === r) {
            var i = Object.getPrototypeOf(e);
            return null === i ? void 0 : t(i, n, o);
        }
        if ("value" in r) return r.value;
        var a = r.get;
        return void 0 !== a ? a.call(o) : void 0;
    }, u = o(2), p = o(23), l = function(t) {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return r(this, e), i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
        }
        return a(e, u), s(e, [ {
            key: "launchPay",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1];
                if (!p.hasContext()) {
                    c(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "launchPay", this).call(this, t, n);
                    var o = this.callTime = Date.now();
                    this.app = new p({
                        params: t,
                        opt: this.opt,
                        callback: function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this.opt.autoDestroy && (e.instance.destroy(), e.instance = null), this.callTime == o && n(t);
                        }.bind(this)
                    });
                }
            }
        } ]), e;
    }();
    l.instance = null, e.exports = {
        init: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return null != l.instance ? l.instance : l.instance = new l(t);
        },
        get: function() {
            if (!l.instance) throw Error("game not initalize");
            return l.instance;
        },
        destroy: function() {
            l.instance.destroy(), l.instance = null;
        }
    };
}, function(e, n, o) {
    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function i(e, n) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
    }
    function a(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
        e.prototype = Object.create(n && n.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
    }
    var s = o(5), c = o(11), u = o(9), p = o(24), l = o(3), f = function(t) {
        function e(t) {
            var n = t.params, o = void 0 === n ? {} : n, a = t.callback, s = void 0 === a ? function() {} : a, f = t.opt, d = void 0 === f ? {} : f;
            r(this, e);
            var h = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, {
                params: o,
                callback: s,
                opt: d
            }));
            h.IFORMAT_PREFIX = "midaswechatpay.game", h.reportObj.setIformatPrefix(h.IFORMAT_PREFIX), 
            h.payMod = new p(o);
            var m = h.payMod.checkGameParams();
            return h.checkEnv(function() {
                m.status ? (h.report("buypage.pv"), h.payMod.getBuyPage(function(t) {
                    h.report("buypage.status", {
                        httpCode: t.httpCode || "200",
                        resultMsg: t.msg
                    }, {
                        resultCode: t.ret
                    });
                    var e = !1, n = {
                        ret: u.code.FAIL,
                        msg: u.msg[u.code.FAIL]
                    };
                    if (~~t.ret) n.ret = t.ret, n.msg = t.msg || u.msg[u.code.FAIL]; else if (t.info && t.info.channel && l.lang.isArray(t.info.channel)) try {
                        h.directPay(t.info.channel[0] && t.info.channel[0].name) ? e = !0 : (n.ret = u.code.FAIL, 
                        n.msg = u.msg.CHANNEL_NOT_SUPPORT);
                    } catch (t) {
                        n.ret = u.code.FAIL, n.msg = t.message || "";
                    }
                    e || h.callback(new c(n).getResult());
                })) : h.paramsError(m.msg);
            }), h;
        }
        return a(e, s), e;
    }();
    e.exports = f;
}, function(e, n, o) {
    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function i(e, n) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
    }
    function a(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
        e.prototype = Object.create(n && n.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
    }
    function s() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [ "buy_quantity", "pf", "zoneid" ];
        return function(e) {
            e.prototype.checkGameParams = function() {
                var e = this, n = {
                    status: !0,
                    msg: ""
                }, o = this.checkPublicParams();
                return o.status ? (l.fn.each(t, function(t) {
                    if (!e.params[t]) return n.status = !1, n.msg = t + "错误", !1;
                    var o = e.params[t];
                    "string" == typeof o && (e.params[t] = o);
                }), n) : o;
            };
        };
    }
    var c, u, p = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                Object.defineProperty(t, o.key, o);
            }
        }
        return function(e, n, o) {
            return n && t(e.prototype, n), o && t(e, o), e;
        };
    }(), l = o(3), f = o(15), d = o(8), h = (c = s())(u = function(t) {
        function e(t) {
            r(this, e);
            var n = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
            return n.processType = "save", n.initCgi(), n;
        }
        return a(e, f), p(e, [ {
            key: "getBuyPage",
            value: function(t) {
                this.cgi.wechatAppProc(l.fn.extend({}, this.getInfoPublicParams(), {
                    zoneid: this.getZoneid(),
                    accounttype: "common",
                    buy_quantity: this.params.buy_quantity || "1"
                }), t);
            }
        }, {
            key: "getZoneid",
            value: function() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).zoneid || this.params.zoneid || "1";
            }
        }, {
            key: "save",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1], n = {};
                l.fn.extend(n, this.getSavePublicParams()), l.fn.extend(n, {
                    buy_quantity: t.buy_quantity || this.params.buy_quantity || "1",
                    zoneid: this.getZoneid(this.buyParams),
                    accounttype: t.accounttype || "common",
                    service_name: encodeURIComponent(this.params.service_name || ""),
                    discountid: this.params.discountid || ""
                }), l.fn.extend(n, t), this.doSave(n, e);
            }
        }, {
            key: "doSave",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments[1];
                d.getContext().report("startsave.pv"), this.cgi.wechatAppProc(t, function(t) {
                    d.getContext().report("savestatus", {
                        httpCode: t.httpCode || "200",
                        resultMsg: t.msg
                    }, {
                        resultCode: t.ret
                    }), e(t);
                }, {
                    method: "POST"
                });
            }
        } ]), e;
    }()) || u;
    h.decorators = {
        checkGameParams: s
    }, e.exports = h;
}, function(e, n, o) {
    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function i(e, n) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
    }
    function a(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
        e.prototype = Object.create(n && n.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
    }
    var s = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                Object.defineProperty(t, o.key, o);
            }
        }
        return function(e, n, o) {
            return n && t(e.prototype, n), o && t(e, o), e;
        };
    }(), c = function t(e, n, o) {
        null === e && (e = Function.prototype);
        var r = Object.getOwnPropertyDescriptor(e, n);
        if (void 0 === r) {
            var i = Object.getPrototypeOf(e);
            return null === i ? void 0 : t(i, n, o);
        }
        if ("value" in r) return r.value;
        var a = r.get;
        return void 0 !== a ? a.call(o) : void 0;
    }, u = o(2), p = o(26), l = function(t) {
        function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return r(this, e), i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
        }
        return a(e, u), s(e, [ {
            key: "launchPay",
            value: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, n = arguments[1];
                if (!p.hasContext()) {
                    c(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "launchPay", this).call(this, t, n);
                    var o = this.callTime = Date.now();
                    this.app = new p({
                        params: t,
                        opt: this.opt,
                        callback: function() {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this.opt.autoDestroy && (e.instance.destroy(), e.instance = null), this.callTime == o && n(t);
                        }.bind(this)
                    });
                }
            }
        } ]), e;
    }();
    l.instance = null, e.exports = {
        init: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return null != l.instance ? l.instance : l.instance = new l(t);
        },
        get: function() {
            if (!l.instance) throw Error("pcgame not initalize");
            return l.instance;
        },
        destroy: function() {
            l.instance.destroy(), l.instance = null;
        }
    };
}, function(e, n, o) {
    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function i(e, n) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
    }
    function a(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
        e.prototype = Object.create(n && n.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
    }
    var s = o(5), c = o(11), u = o(9), p = o(27), l = o(3), f = function(t) {
        function e(t) {
            var n = t.params, o = void 0 === n ? {} : n, a = t.callback, s = void 0 === a ? function() {} : a, f = t.opt, d = void 0 === f ? {} : f;
            r(this, e);
            var h = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, {
                params: o,
                callback: s,
                opt: d
            }));
            h.IFORMAT_PREFIX = "midaswechatpay.pcgame", h.reportObj.setIformatPrefix(h.IFORMAT_PREFIX), 
            h.payMod = new p(o);
            var m = h.payMod.checkGameParams();
            return h.checkEnv(function() {
                m.status ? (h.report("buypage.pv"), h.payMod.getBuyPage(function(t) {
                    h.report("buypage.status", {
                        httpCode: t.httpCode || "200",
                        resultMsg: t.msg
                    }, {
                        resultCode: t.ret
                    });
                    var e = !1, n = {
                        ret: u.code.FAIL,
                        msg: u.msg[u.code.FAIL]
                    };
                    if (~~t.ret) n.ret = t.ret, n.msg = t.msg || u.msg[u.code.FAIL]; else if (t.info && t.info.channel && l.lang.isArray(t.info.channel)) try {
                        h.directPay(t.info.channel[0] && t.info.channel[0].name) ? e = !0 : (n.ret = u.code.FAIL, 
                        n.msg = u.msg.CHANNEL_NOT_SUPPORT);
                    } catch (t) {
                        n.ret = u.code.FAIL, n.msg = t.message || "";
                    }
                    e || h.callback(new c(n).getResult());
                })) : h.paramsError(m.msg);
            }), h;
        }
        return a(e, s), e;
    }();
    e.exports = f;
}, function(e, n, o) {
    function r(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function i(e, n) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !n || "object" != (void 0 === n ? "undefined" : t(n)) && "function" != typeof n ? e : n;
    }
    function a(e, n) {
        if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === n ? "undefined" : t(n)));
        e.prototype = Object.create(n && n.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
    }
    var s, c, u = function() {
        function t(t, e) {
            for (var n = 0; n < e.length; n++) {
                var o = e[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                Object.defineProperty(t, o.key, o);
            }
        }
        return function(e, n, o) {
            return n && t(e.prototype, n), o && t(e, o), e;
        };
    }(), p = (o(3), o(8), o(24)), l = (s = p.decorators.checkGameParams([ "buy_quantity", "provide_uin" ]))(c = function(t) {
        function e(t) {
            r(this, e);
            var n = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
            return n.initCgi(), n;
        }
        return a(e, p), u(e, [ {
            key: "getZoneid",
            value: function() {
                return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).zoneid || this.params.zoneid || "1";
            }
        } ]), e;
    }()) || c;
    e.exports = l;
} ]);