function e(t, n) {
    l.info("accountChange：");
    var o = "function" == typeof getCurrentPages ? getCurrentPages() : [], i = o.length ? o[o.length - 1].route || o[o.length - 1].__route__ : "pages/index/index";
    b.get({
        url: "https://wq.jd.com/pinbind/switchAccount",
        data: {
            fromtype: "x",
            expectPin: h.base64encode(encodeURIComponent(t)),
            rurl: i,
            atk: 9
        }
    }).then(function(o) {
        var i = o.body;
        o.header;
        {
            if (13 != i.retcode) return 0 != i.retcode ? (n(i.retcode), void y.umpBiz({
                bizid: "558",
                operation: 4,
                result: i.retcode,
                message: i.errmsg
            })) : void (0 == i.retcode && z.getUserInfo(function(e, t) {
                0 == e ? (n && n(i.retcode || 0), y.umpBiz({
                    bizid: "558",
                    operation: 4,
                    result: "0",
                    message: "ret:suc"
                })) : n(-1);
            }));
            p.doLogin().then(function() {
                e(t, n);
            }).catch(function(e) {
                n(e);
            });
        }
    }).catch(function(e) {
        e.code;
        var t = e.message;
        n && n(-1, t), y.umpBiz({
            bizid: "558",
            operation: 4,
            result: 999,
            message: "ret:err" + t
        });
    });
}

function t(e, n) {
    l.log("judge:begin");
    var o = {
        phonenum: h.base64encode(e),
        _t: Math.round(2147483647 * Math.random())
    };
    p.getLoginPromise().then(function() {
        m.get("http://wq.jd.com/user/smsmsg/GetPinByMobile", o, {
            success: function(o) {
                if (l.log("judge:success" + JSON.stringify(o)), 1 == o.data.noLogin) return p.doLogin().then(function() {
                    t(e, n);
                }).catch(function(e, t) {
                    "function" == typeof n && n(-1, {});
                }), !1;
                0 == o.ret ? (1 == o.result ? 1 == o.data.BindType || 3 == o.data.BindType ? o.type = 1 : o.type = 2 : o.type = 3, 
                l.log("resultresult:" + (void 0 === n ? "undefined" : d(n))), "function" == typeof n && n(0, o), 
                y.umpBiz({
                    bizid: "601",
                    operation: 3,
                    result: 0,
                    message: "ret:suc"
                })) : ("function" == typeof n && n(-1, {}), y.umpBiz({
                    bizid: "601",
                    operation: 3,
                    result: o.ret,
                    message: o.msg
                }));
            },
            fail: function(e) {
                l.log("judge:error"), "function" == typeof n && n(-1, {}), y.umpBiz({
                    bizid: "601",
                    operation: 3,
                    result: 999,
                    message: "ret:fail" + e.message
                });
            }
        });
    }).catch(function(e, t) {
        l.log("judge:catch"), "function" == typeof n && n(-1, {});
    }), l.log("judge:end");
}

function n(e, t) {
    l.log("register:begin");
    var o = {
        fromtype: "x",
        _t: Math.round(2147483647 * Math.random())
    };
    Object.assign(o, e), p.getLoginPromise().then(function() {
        l.log("register"), m.get("http://wq.jd.com/pinbind/regBind", o, {
            success: function(o) {
                if (l.log("register:success" + JSON.stringify(o)), 13 == o.retcode) return p.doLogin().then(function() {
                    n(e, t);
                }).catch(function(e, n) {
                    "function" == typeof t && t(-1, {});
                }), !1;
                0 == o.retcode ? (o.tips = "注册成功了~", "function" == typeof t && t(0, o), y.umpBiz({
                    bizid: "601",
                    operation: 4,
                    result: 0,
                    message: "ret:suc"
                })) : (o.tips = P[o.retcode] || "注册失败", "function" == typeof t && t(0, o), P[o.retcode] ? y.umpBiz({
                    bizid: "601",
                    operation: 4,
                    result: 0,
                    message: "ret:suc"
                }) : y.umpBiz({
                    bizid: "601",
                    operation: 4,
                    result: o.retcode,
                    message: o.errmsg
                }));
            },
            fail: function(e) {
                l.log("register:error"), "function" == typeof t && t(-1, "注册失败"), y.umpBiz({
                    bizid: "601",
                    operation: 4,
                    result: 999,
                    message: "ret:fail" + e.message
                });
            }
        });
    }).catch(function(e, n) {
        l.log("register:catch"), "function" == typeof t && t(-1, "注册失败");
    }), l.log("register:end");
}

function o(e, t) {
    l.log("complete:begin");
    var n = {
        fromtype: "x",
        _t: Math.round(2147483647 * Math.random())
    };
    Object.assign(n, e), p.getLoginPromise().then(function() {
        l.log("complete"), m.get("http://wq.jd.com/pinbind/bindMobile", n, {
            success: function(n) {
                if (l.log("complete:success" + JSON.stringify(n)), 13 == n.retcode) return p.doLogin().then(function() {
                    o(e, t);
                }).catch(function(e, n) {
                    "function" == typeof t && t(-1, {});
                }), !1;
                0 == n.retcode ? (n.tips = "注册成功了~", "function" == typeof t && t(0, n), y.umpBiz({
                    bizid: "601",
                    operation: 5,
                    result: 0,
                    message: "ret:suc"
                })) : (n.tips = P[n.retcode] || "注册失败", "function" == typeof t && t(0, n), P[n.retcode] ? y.umpBiz({
                    bizid: "601",
                    operation: 5,
                    result: 0,
                    message: "ret:suc"
                }) : y.umpBiz({
                    bizid: "601",
                    operation: 5,
                    result: n.retcode,
                    message: n.errmsg
                }));
            },
            fail: function(e) {
                l.log("complete:error"), "function" == typeof t && t(-1, "注册失败"), y.umpBiz({
                    bizid: "601",
                    operation: 5,
                    result: 999,
                    message: "ret:fail" + e.message
                });
            }
        });
    }).catch(function(e, n) {
        l.log("complete:catch"), "function" == typeof t && t(-1, "注册失败");
    }), l.log("complete:end");
}

function i(e, t) {
    l.log("unbindtelandbind:begin");
    var n = {
        fromtype: "x",
        _t: Math.round(2147483647 * Math.random())
    };
    Object.assign(n, e), p.getLoginPromise().then(function() {
        l.log("register"), m.get("http://wq.jd.com/pinbind/UnbindMobileAndReg", n, {
            success: function(n) {
                if (l.log("unbindtelandbind:success" + JSON.stringify(n)), 13 == n.ret) return p.doLogin().then(function() {
                    i(e, t);
                }).catch(function(e, n) {
                    "function" == typeof t && t(-1, {});
                }), !1;
                0 == n.ret ? (n.tips = "解绑并重新关联成功了~", "function" == typeof t && t(0, n), y.umpBiz({
                    bizid: "601",
                    operation: 4,
                    result: 0,
                    message: "ret:suc"
                })) : (n.tips = P[n.ret] || "解绑并重新关联失败，请稍后再试", "function" == typeof t && t(0, n), 
                P[n.ret] ? y.umpBiz({
                    bizid: "601",
                    operation: 4,
                    result: 0,
                    message: "ret:suc"
                }) : y.umpBiz({
                    bizid: "601",
                    operation: 4,
                    result: n.ret,
                    message: n.errmsg
                }));
            },
            fail: function(e) {
                l.log("unbindtelandbind:error"), "function" == typeof t && t(-1, "解绑并重新关联失败，请稍后再试"), 
                y.umpBiz({
                    bizid: "601",
                    operation: 4,
                    result: 999,
                    message: "ret:fail" + e.message
                });
            }
        });
    }).catch(function(e, n) {
        l.log("unbindtelandbind:catch"), "function" == typeof t && t(-1, "解绑并重新关联失败，请稍后再试");
    }), l.log("unbindtelandbind:end");
}

function c(e, t) {
    l.log("login:begin"), p.getLoginPromise().then(function() {
        l.log("login:begintel");
        var n = {
            fromtype: "x",
            _t: Math.round(2147483647 * Math.random())
        };
        Object.assign(n, e), m.get("http://wq.jd.com/pinbind/loginBind", n, {
            success: function(n) {
                if (l.log("login:success" + JSON.stringify(n)), 13 == n.retcode) return p.doLogin().then(function() {
                    c(e, t);
                }).catch(function(e, n) {
                    "function" == typeof t && t(-1, {});
                }), !1;
                0 == n.retcode ? (n.tips = "登录成功了~", "function" == typeof t && t(0, n), y.umpBiz({
                    bizid: "601",
                    operation: 6,
                    result: 0,
                    message: "ret:suc"
                })) : (n.tips = P[n.retcode] || "登录失败", n.isUpdateCode = P[n.retcode] ? 1 : 0, "function" == typeof t && t(0, n), 
                P[n.retcode] ? y.umpBiz({
                    bizid: "601",
                    operation: 6,
                    result: 0,
                    message: "ret:suc"
                }) : y.umpBiz({
                    bizid: "601",
                    operation: 6,
                    result: n.retcode,
                    message: n.errmsg
                }));
            },
            fail: function(e) {
                l.log("login:error"), "function" == typeof t && t(-1, "登录失败"), y.umpBiz({
                    bizid: "601",
                    operation: 6,
                    result: 999,
                    message: "ret:fail" + e.message
                });
            }
        });
    }).catch(function(e, n) {
        l.log("login:catch"), "function" == typeof t && t(-1, "登录失败");
    }), l.log("login:end");
}

function r(e, t, n) {
    l.log("getMsgCode:begin");
    p.getLoginPromise().then(function() {
        var o = {
            mobile: h.base64encode(encodeURIComponent(e)),
            sceneid: 11110,
            _t: Math.random(),
            msgType: t
        };
        m.get("http://wq.jd.com/user/smsmsg/SendMobileMsg", o, {
            success: function(o) {
                if (l.log("getMsgCode:success" + JSON.stringify(o)), 13 == o.retcode) return p.doLogin().then(function() {
                    r(e, t, n);
                }).catch(function(e, t) {
                    "function" == typeof n && n(-1, {});
                }), !1;
                0 == o.retcode ? (o.tips = "获取验证码成功了~", "function" == typeof n && n(0, o), y.umpBiz({
                    bizid: "601",
                    operation: 8,
                    result: 0,
                    message: "ret:suc"
                })) : (o.tips = "获取验证码失败，请稍后再试", "function" == typeof n && n(-1, o), y.umpBiz({
                    bizid: "601",
                    operation: 8,
                    result: o.retcode,
                    message: o.msg
                }));
            },
            fail: function(e) {
                l.log("getMsgCode:error"), "function" == typeof n && n(-1, "获取失败，请稍候再试"), y.umpBiz({
                    bizid: "601",
                    operation: 8,
                    result: 999,
                    message: "ret:fail" + e.message
                });
            }
        });
    }).catch(function(e, t) {
        l.log("getMsgCode:catch"), "function" == typeof n && n(-1, "获取失败，请稍候再试");
    }), l.log("getImgCode:end");
}

function u(e) {
    var t = {
        source: 5
    };
    p.getLoginPromise().then(function(n) {
        b.get({
            url: "https://wq.jd.com/user/info/PwdIsActive",
            data: t
        }).then(function(t) {
            var n = t.body;
            t.header;
            0 == n.retcode ? y.umpBiz({
                bizid: "601",
                operation: 13,
                result: 0,
                message: "ret:suc"
            }) : y.umpBiz({
                bizid: "601",
                operation: 13,
                result: n.retcode,
                message: n.retcode
            }), 0 == n.retcode ? e(n) : 13 == n.retcode ? p.doLogin().then(function() {
                u(e);
            }).catch(function(t) {
                e(n);
            }) : e(n);
        }).catch(function(t) {
            t.code;
            var n = t.message;
            e(body), y.umpBiz({
                bizid: "601",
                operation: 13,
                result: 999,
                message: "ret:fail" + n
            });
        });
    }).catch(function(e) {
        l.error(e);
    });
}

function s(e) {
    var t = {};
    p.getLoginPromise().then(function(n) {
        b.get({
            url: "https://wq.jd.com/vipplus/VerifyAuthUser",
            data: t
        }).then(function(t) {
            var n = t.body;
            t.header;
            0 == n.retcode ? y.umpBiz({
                bizid: "601",
                operation: 14,
                result: 0,
                message: "ret:suc"
            }) : y.umpBiz({
                bizid: "601",
                operation: 14,
                result: n.retcode,
                message: n.retcode
            }), 0 == n.retcode ? e(n) : 13 == n.retcode ? p.doLogin().then(function() {
                s(e);
            }).catch(function(t) {
                e(n);
            }) : e(n);
        }).catch(function(t) {
            t.code;
            var n = t.message;
            e(body), y.umpBiz({
                bizid: "601",
                operation: 14,
                result: 999,
                message: "ret:fail" + n
            });
        });
    }).catch(function(e) {
        l.error(e);
    });
}

function a(e, t) {
    l.log("unbind:begin"), p.getLoginPromise().then(function() {
        var n = {
            fromtype: "x",
            _t: Math.round(2147483647 * Math.random())
        }, o = {
            0: "解除关联成功",
            2: "操作过于频繁，请稍后再试",
            40: "密码错误",
            52: "密码过于简单，请重置密码",
            100: "解除关联，请稍后再试",
            71: "为了您的账号安全，30天内不可解除账号关联，如有疑问请致电京东客服（400-606-5500转7）。"
        };
        Object.assign(n, e), m.get("http://wq.jd.com/pinbind/unbind", n, {
            success: function(n) {
                if (l.log("unbind:success" + JSON.stringify(n)), 13 == n.retcode) return p.doLogin().then(function() {
                    a(e, t);
                }).catch(function(e, n) {
                    "function" == typeof t && t(-1, {});
                }), !1;
                0 == n.retcode ? (n.tips = "解绑成功了~", "function" == typeof t && t(0, n), y.umpBiz({
                    bizid: "601",
                    operation: 12,
                    result: 0,
                    message: "ret:suc"
                })) : (n.tips = o[n.retcode] || "解绑失败了~", "function" == typeof t && t(0, n), P[n.retcode] ? y.umpBiz({
                    bizid: "601",
                    operation: 12,
                    result: 0,
                    message: "ret:suc"
                }) : y.umpBiz({
                    bizid: "601",
                    operation: 12,
                    result: n.retcode,
                    message: n.errmsg
                }));
            },
            fail: function(e) {
                l.log("unbind:error"), "function" == typeof t && t(-1, "解绑失败了~"), y.umpBiz({
                    bizid: "601",
                    operation: 12,
                    result: 999,
                    message: "ret:fail" + e.message
                });
            }
        });
    }).catch(function(e, n) {
        l.log("unbind:catch"), "function" == typeof t && t(-1, "解绑失败了~");
    }), l.log("unbind:end");
}

function g(e, t) {
    p.getLoginPromise().then(function() {
        var n = {
            sceneid: e.sceneid || 11110,
            _t: Math.round(2147483647 * Math.random())
        };
        m.get("//wq.jd.com/user/info/QueryJDUserInfo", n, {
            success: function(n) {
                if (l.log("unbind:success" + JSON.stringify(n)), 13 == n.retcode) return p.doLogin().then(function() {
                    g(e, t);
                }).catch(function(e, n) {
                    "function" == typeof t && t(-1, {});
                }), !1;
                0 == n.retcode ? (n.curpinType = 0 == n.definePin ? 1 : 1 == n.definePin ? 2 : 3, 
                2 == n.base.accountType && 2 == n.definePin && (n.accountType = 1), 2 == n.base.accountType && 1 == n.definePin && (n.accountType = 2), 
                1 == n.base.accountType && 1 == n.definePin && (n.accountType = 3), 3 == n.base.accountType && 1 == n.definePin && (n.accountType = 4), 
                3 == n.base.accountType && 0 == n.definePin && (n.accountType = 5), 0 == n.base.accountType && 0 == n.definePin && (n.accountType = 6), 
                "function" == typeof t && t(0, n)) : (n.tips = "获取信息失败了，请稍后再试~", "function" == typeof t && t(0, n));
            },
            fail: function(e) {
                l.log("unbind:error"), "function" == typeof t && t(-1, "获取信息失败了，请稍后再试~");
            }
        });
    }).catch(function(e, n) {
        l.log("unbind:catch"), "function" == typeof t && t(-1, "获取信息失败了，请稍后再试~");
    }), l.log("unbind:end");
}

function f(e, t) {
    l.log("getPhoneNum:begin"), p.getLoginPromise().then(function() {
        var n = {
            appid: "wx91d27dbf599dff74",
            _t: Math.round(2147483647 * Math.random())
        };
        Object.assign(n, e), m.get("https://wq.jd.com/mlogin/wxapp/GetPhoneNum", n, {
            success: function(n) {
                if (l.log("getPhoneNum:success" + JSON.stringify(n)), 13 == n.retCode) return p.doLogin().then(function() {
                    f(e, t);
                }).catch(function(e, n) {
                    "function" == typeof t && t(-1, {});
                }), !1;
                n.retCode, "function" == typeof t && t(0, n);
            },
            fail: function(e) {
                l.log("getPhoneNum:error"), "function" == typeof t && t(-1, "获取失败了~"), y.umpBiz({
                    bizid: "601",
                    operation: 12,
                    result: 999,
                    message: "ret:fail" + e.message
                });
            }
        });
    }).catch(function(e, n) {
        l.log("getPhoneNum:catch"), "function" == typeof t && t(-1, "获取失败了~");
    }), l.log("unbind:end");
}

var d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, p = require("../../common/login/login.js"), m = require("../../common/http_json.js"), l = new (require("../../common/logger.js"))("accountData"), h = require("../../common/base64/base64.js"), b = require("../../common/request/request"), y = require("../../common/fe_report/usability.js"), z = require("../../common/user_info"), B = require("../../libs/promise.min.js"), P = {
    2: "您的操作过于频繁，请稍后再试",
    21: "验证码不正确或已过期",
    32: "您的京东账号绑定了其他微信账号，请解除关联后再与当前账号关联",
    100: "关联失败，请稍后再试",
    20: "验证码错误，请重新输入",
    40: "您输入的账号或密码错误，请重新输入",
    41: "该京东账号已在其他微信账号上登录，请退出后重新登录。",
    42: "您设置的手机已绑定其他京东帐号,请使用已有京东账号直接登录，或更换设置手机号码",
    43: "您的微信账号已关联其他京东账号，请解除关联后，再绑定当前京东账号",
    50: "密码不符合规则，请重新设置，建议为6-20位字母和数字组合",
    51: "此手机无效，请重新输入",
    52: "您设置的密码过于简单，建议为6-20位字母和数字组合",
    53: "您的京东账号存在风险行为，请联系客服处理（400-606-5500转7)",
    70: "您的操作过于频繁，请五分钟后再试",
    90: "关联失败，请稍后再试",
    71: "30天内只可做一次解绑操作",
    2001: "您的账号因安全原因被暂时封锁，请将账号和联系方式发至shensu@jd.com，等候处理。"
};

module.exports = {
    judge: t,
    register: n,
    bind: c,
    login: p,
    getImgCode: function(e) {
        l.log("getImgCode:begin"), p.getLoginPromise().then(function() {
            m.get("http://wq.jd.com/user/smsmsg/GetPicCodeUrl?_t=" + Math.round(2147483647 * Math.random()), {}, {
                success: function(t) {
                    l.log("getImgCode:success" + JSON.stringify(t)), 0 == t.retcode ? ("function" == typeof e && e(0, t), 
                    y.umpBiz({
                        bizid: "601",
                        operation: 7,
                        result: 0,
                        message: "ret:suc"
                    })) : ("function" == typeof e && e(-1, {}), y.umpBiz({
                        bizid: "601",
                        operation: 7,
                        result: t.retcode,
                        message: t.msg
                    }));
                },
                fail: function(t) {
                    l.log("getImgCode:error"), "function" == typeof e && e(-1, {}), y.umpBiz({
                        bizid: "601",
                        operation: 7,
                        result: 999,
                        message: "ret:fail" + t.message
                    });
                }
            });
        }).catch(function(t, n) {
            l.log("getImgCode:catch"), "function" == typeof e && e(-1, {});
        }), l.log("getImgCode:end");
    },
    getMsgCode: r,
    getPinStatus: function(e) {
        var t = {
            _t: Math.random()
        };
        p.getLoginPromise().then(function() {
            m.get("http://wq.jd.com/pinbind/GetPinState", t, {
                success: function(t) {
                    if (l.log("getPinstatus:success" + JSON.stringify(t)), 13 == t.ret) return p.doLogin().then(function() {
                        getPinstatus(e);
                    }).catch(function(t, n) {
                        "function" == typeof e && e(-1, {});
                    }), !1;
                    0 == t.ret ? (t.type = 0 == t.state || 3 == t.state ? 1 : 0, "function" == typeof e && e(0, t), 
                    y.umpBiz({
                        bizid: "601",
                        operation: 9,
                        result: 0,
                        message: "ret:suc"
                    })) : ("function" == typeof e && e(0, t), y.umpBiz({
                        bizid: "601",
                        operation: 9,
                        result: t.ret,
                        message: t.msg
                    }));
                },
                fail: function(t) {
                    l.log("getPinstatus:error"), "function" == typeof e && e(-1, "获取失败，请稍候再试"), y.umpBiz({
                        bizid: "601",
                        operation: 9,
                        result: 999,
                        message: "ret:fail" + t.message
                    });
                }
            });
        }).catch(function(t, n) {
            l.log("getPinstatus:catch"), "function" == typeof e && e(-1, "获取失败，请稍候再试");
        });
    },
    complete: o,
    getImgDetail: function(e, t) {
        e = "https:" + e, p.getLoginPromise().then(function() {
            wx.downloadFile({
                url: e,
                success: function(e) {
                    "function" == typeof t && t(0, e), y.umpBiz({
                        bizid: "601",
                        operation: 10,
                        result: 0,
                        message: "ret:suc"
                    });
                },
                fail: function(e) {
                    "function" == typeof t && t(-1, "获取失败，请稍候再试"), y.umpBiz({
                        bizid: "601",
                        operation: 10,
                        result: 999,
                        message: "ret:fail" + e.errMsg || ""
                    });
                }
            });
        }).catch(function(e, n) {
            l.log("getPinstatus:catch"), "function" == typeof t && t(-1, "获取失败，请稍候再试");
        });
    },
    GetRsaKeyModulus: function() {
        return new B(function(e, t) {
            b.get({
                url: "https://wq.jd.com/pinbind/GetRsaKeyModulus"
            }).then(function(n) {
                var o = n.body;
                n.header, 0 == o.retcode ? (e(o), y.umpBiz({
                    bizid: "601",
                    operation: 1,
                    result: 0,
                    message: "ret:suc"
                })) : (t(), y.umpBiz({
                    bizid: "601",
                    operation: 1,
                    result: o.retcode,
                    message: o.msg
                }));
            }).catch(function(e) {
                e.code;
                var n = e.message;
                t(), y.umpBiz({
                    bizid: "601",
                    operation: 1,
                    result: 999,
                    message: "ret:fail" + n
                });
            });
        });
    },
    judgeIsCalled: function(e, t) {
        return new B(function(n, o) {
            b.get({
                url: "https://wq.jd.com/pinbind/pinRegCheckType",
                data: {
                    mobile: e,
                    index: t
                }
            }).then(function(e) {
                var t = e.body;
                e.header, 0 == t.retcode ? (n(t), y.umpBiz({
                    bizid: "601",
                    operation: 2,
                    result: 0,
                    message: "ret:suc"
                })) : (o(), y.umpBiz({
                    bizid: "601",
                    operation: 2,
                    result: t.retcode,
                    message: t.msg
                }));
            }).catch(function(e) {
                e.code;
                var t = e.message;
                o(), y.umpBiz({
                    bizid: "601",
                    operation: 2,
                    result: 999,
                    message: "ret:fail" + t
                });
            });
        });
    },
    changeAccount: e,
    unbindtelandbind: i,
    judgeAuth: s,
    judgePayPsw: u,
    authBrigde: function(e, t, n) {
        var o = {
            scene: "weixin",
            rurl: t || "/pages/my/index/index",
            bussinessType: n || 538
        };
        p.getLoginPromise().then(function(t) {
            b.get({
                url: "https://wq.jd.com/vipplus/LoginBrigdeAuthName",
                data: o
            }).then(function(t) {
                var n = t.body;
                t.header, 0 == n.retcode ? y.umpBiz({
                    bizid: "601",
                    operation: 15,
                    result: 0,
                    message: "ret:suc"
                }) : y.umpBiz({
                    bizid: "601",
                    operation: 15,
                    result: n.retcode,
                    message: n.retcode
                }), 0 == n.retcode ? e(n) : 13 == n.retcode ? p.doLogin().then(function() {
                    s(e);
                }).catch(function(t) {
                    e(n);
                }) : e(n);
            }).catch(function(t) {
                t.code;
                var n = t.message;
                e(body), y.umpBiz({
                    bizid: "601",
                    operation: 15,
                    result: 999,
                    message: "ret:fail" + n
                });
            });
        }).catch(function(e) {
            l.error(e);
        });
    },
    unbind: a,
    getCurPinInfo: g,
    getPhoneNum: f
};