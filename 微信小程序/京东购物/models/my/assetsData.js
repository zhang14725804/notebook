function e(t) {
    y.info("transferDetail");
    var o = z.getCookie("wid"), r = z.getCookie("wq_skey");
    b.get({
        url: "https://wq.jd.com/pinbind/transferDetail",
        data: {
            wq_uin: o,
            wq_skey: r
        }
    }).then(function(o) {
        var r = o.body;
        o.header;
        {
            if (13 != r.retcode) return 0 != r.retcode ? (t({}), void v.umpBiz({
                bizid: "562",
                operation: 3,
                result: r.retcode,
                message: r.errmsg
            })) : void (0 == r.retcode && (t && t(r.retcode || 0, r), v.umpBiz({
                bizid: "562",
                operation: 3,
                result: 0,
                message: "ret:suc"
            })));
            B.doLogin().then(function() {
                e(t);
            }).catch(function(e) {
                t(e);
            });
        }
    }).catch(function(e) {
        var o = e.code, r = e.message;
        t && t(o, r), v.umpBiz({
            bizid: "562",
            operation: 3,
            result: 999,
            message: "ret:error" + r
        });
    });
}

function t(e, o) {
    var r = e.fromPin, n = e.toPin, i = e.bean, s = e.coupon;
    y.info("assetsTransfer"), b.get({
        url: "https://wq.jd.com/pinbind/assetsTransfer",
        data: {
            fromtype: "x",
            fromPin: r,
            toPin: n,
            bean: i,
            coupon: s
        }
    }).then(function(e) {
        var r = e.body;
        e.header;
        if (13 != r.retcode) {
            if (0 != r.retcode) {
                var n = {
                    33: "您登录的京东账号已经从其他微信账号转入过资产，资产转移失败。如需使用原微信登录账号内的资产，请退出当前账号并登录其他京东账号进行资产转移。",
                    32: "正式账号绑定了多个微信账号，请先解绑。",
                    31: "您的微信账号同时绑定了多个京东账号，请先解绑所有账号后，再重新登录一个京东账号进行资产转移。",
                    30: "您的默认账号已无可转移资产。",
                    53: "资产转移失败，请稍后再试。",
                    60: "您当前有未完成订单，请待订单完成后转移资产。",
                    61: "您当前账号有未提现余额，请咨询客服提现后再转移资产。",
                    62: "您当前账号有未使用的提货卡，请使用后再次转移。",
                    63: "您的微信账号中还有未使用的京券，请使用后再进行转移。",
                    34: "您的资产正在转移中。"
                };
                return n[r.retcode] ? void o(r.retcode, n[r.retcode]) : (o(r.retcode, "资产转移失败，请稍后再试！"), 
                void v.umpBiz({
                    bizid: "562",
                    operation: 2,
                    result: r.retcode,
                    message: r.errmsg
                }));
            }
            0 == r.retcode && (o && o(r.errcode || 0, r), v.umpBiz({
                bizid: "562",
                operation: 2,
                result: 0,
                message: "ret:suc"
            }));
        } else B.doLogin().then(function() {
            t(o);
        }).catch(function(e) {
            o(e);
        });
    }).catch(function(e) {
        var t = e.code, r = e.message;
        o && o(t), v.umpBiz({
            bizid: "562",
            operation: 2,
            result: 999,
            message: "ret:error" + r
        });
    });
}

function o(e) {
    b.get({
        url: "https://wq.jd.com/user/info/QueryWalletBalance",
        data: {}
    }).then(function(t) {
        var r = t.body;
        t.header;
        13 == r.retcode ? B.doLogin().then(function() {
            o(e);
        }).catch(function(t) {
            e(t);
        }) : 0 == r.retcode ? (v.umpBiz({
            bizid: "563",
            operation: 3,
            result: 0,
            message: "ret:suc"
        }), e && e(r.retcode || 0, r)) : (e && e(-1, r), v.umpBiz({
            bizid: "563",
            operation: 3,
            result: r.retcode,
            message: r.msg
        }));
    }).catch(function(t) {
        t.code;
        var o = t.message;
        v.umpBiz({
            bizid: "563",
            operation: 3,
            result: 999,
            message: "ret:fail" + o
        }), e(0, errMsg);
    });
}

function r() {
    return new w(function(e, t) {
        var o = {};
        B.getLoginPromise().then(function(n) {
            b.get({
                url: "https://wq.jd.com/bases/wuliudetail/notify",
                data: o
            }).then(function(o) {
                var n = o.body;
                o.header;
                13 == n.errCode ? B.doLogin().then(function() {
                    r();
                }).catch(function(e) {
                    t(e);
                }) : 0 == n.errCode ? (v.umpBiz({
                    bizid: "563",
                    operation: 24,
                    result: 0,
                    message: "ret:suc"
                }), e(n)) : (t(), v.umpBiz({
                    bizid: "563",
                    operation: 24,
                    result: n.errCode,
                    message: n.errMsg
                }));
            }).catch(function(e) {
                var o = e.code, r = e.message;
                t({
                    code: o,
                    message: r
                }), v.umpBiz({
                    bizid: "563",
                    operation: 24,
                    result: 999,
                    message: "ret:fail" + r
                });
            });
        }).catch(function(e) {
            y.error(e);
        });
    });
}

function n(e) {
    return new w(function(t, o) {
        var r = {};
        B.getLoginPromise().then(function(i) {
            b.get({
                url: "https://wq.jd.com/bases/orderlist/GetOrderSiteCount",
                data: r
            }).then(function(r) {
                var i = r.body;
                r.header;
                13 == i.ret_code ? B.doLogin().then(function() {
                    n(e);
                }).catch(function(e) {
                    o(e);
                }) : 0 == i.ret_code ? (v.umpBiz({
                    bizid: "563",
                    operation: 4,
                    result: 0,
                    message: "ret:suc"
                }), t(i)) : (e ? t({}) : o(), v.umpBiz({
                    bizid: "563",
                    operation: 4,
                    result: i.ret_code,
                    message: i.err_msg
                }));
            }).catch(function(r) {
                var n = r.code, i = r.message;
                e ? t({
                    code: n,
                    message: i
                }) : o({
                    code: n,
                    message: i
                }), v.umpBiz({
                    bizid: "563",
                    operation: 4,
                    result: 999,
                    message: "ret:fail" + i
                });
            });
        }).catch(function(e) {
            y.error(e);
        });
    });
}

function i(e) {
    return new w(function(t, o) {
        var r = {
            cp: 1,
            pageSize: 1,
            bgetInfo: 1
        };
        B.getLoginPromise().then(function(n) {
            b.get({
                url: "https://wq.jd.com/fav/comm/FavCommQuery",
                data: r
            }).then(function(r) {
                var n = r.body;
                r.header;
                0 == n.iRet ? (v.umpBiz({
                    bizid: "563",
                    operation: 5,
                    result: 0,
                    message: "ret:suc"
                }), t(n)) : 9999 == n.iRet ? B.doLogin().then(function() {
                    i(e);
                }).catch(function(e) {
                    o(e);
                }) : (e ? t({}) : o(), v.umpBiz({
                    bizid: "563",
                    operation: 5,
                    result: n.iRet,
                    message: n.errMsg
                }));
            }).catch(function(r) {
                var n = r.code, i = r.message;
                e ? t({
                    code: n,
                    message: i
                }) : o({
                    code: n,
                    message: i
                }), v.umpBiz({
                    bizid: "563",
                    operation: 5,
                    result: 999,
                    message: "ret:fail" + i
                });
            });
        }).catch(function(e) {
            y.error(e);
        });
    });
}

function s(e) {
    return new w(function(t, o) {
        var r = {
            cp: 1,
            pageSize: 1,
            callback: "loadShopListCbk",
            _: Math.round(2147483647 * Math.random())
        };
        B.getLoginPromise().then(function(n) {
            b.get({
                url: "https://wq.jd.com/fav/shop/QueryShopFavList",
                data: r
            }).then(function(r) {
                var n = r.body;
                r.header;
                9999 == n.iRet ? B.doLogin().then(function() {
                    s(e);
                }).catch(function(e) {
                    o(e);
                }) : 0 == n.iRet ? (v.umpBiz({
                    bizid: "563",
                    operation: 7,
                    result: 0,
                    message: "ret:suc"
                }), t(n)) : (e ? t({}) : o(), v.umpBiz({
                    bizid: "563",
                    operation: 7,
                    result: n.iRet,
                    message: n.errMsg
                }));
            }).catch(function(r) {
                var n = r.code, i = r.message;
                e ? t({
                    code: n,
                    message: i
                }) : o({
                    code: n,
                    message: i
                }), v.umpBiz({
                    bizid: "563",
                    operation: 7,
                    result: 999,
                    message: "ret:fail" + i
                });
            });
        }).catch(function(e) {
            y.error(e);
        });
    });
}

function a(e) {
    return new w(function(t, o) {
        var r = {};
        B.getLoginPromise().then(function(n) {
            b.get({
                url: "https://wq.jd.com/bases/favorite/dpfavnum",
                data: r
            }).then(function(r) {
                var n = r.body;
                r.header;
                0 == n.errCode ? (v.umpBiz({
                    bizid: "563",
                    operation: 8,
                    result: 0,
                    message: "ret:suc"
                }), t(n)) : 13 == n.errCode ? B.doLogin().then(function() {
                    a(e);
                }).catch(function(e) {
                    o(e);
                }) : (e ? t({}) : o(), v.umpBiz({
                    bizid: "563",
                    operation: 8,
                    result: n.errCode,
                    message: n.msg
                }));
            }).catch(function(r) {
                var n = r.code, i = r.message;
                e ? t({
                    code: n,
                    message: i
                }) : o({
                    code: n,
                    message: i
                }), v.umpBiz({
                    bizid: "563",
                    operation: 8,
                    result: 999,
                    message: "ret:fail" + i
                });
            });
        }).catch(function(e) {
            y.error(e);
        });
    });
}

function c(e) {
    return new w(function(t, o) {
        var r = {};
        B.getLoginPromise().then(function(n) {
            b.get({
                url: "https://wq.jd.com/bases/footprints/getcount",
                data: r
            }).then(function(r) {
                var n = r.body;
                r.header;
                0 == n.errcode ? (v.umpBiz({
                    bizid: "563",
                    operation: 9,
                    result: 0,
                    message: "ret:suc"
                }), t(n)) : 13 == n.errcode ? B.doLogin().then(function() {
                    c(e);
                }).catch(function(e) {
                    o(e);
                }) : (e ? t({}) : o(), v.umpBiz({
                    bizid: "563",
                    operation: 9,
                    result: n.errcode,
                    message: n.msg
                }));
            }).catch(function(r) {
                var n = r.code, i = r.message;
                e ? t({
                    code: n,
                    message: i
                }) : o({
                    code: n,
                    message: i
                }), v.umpBiz({
                    bizid: "563",
                    operation: 9,
                    result: 999,
                    message: "ret:fail" + i
                });
            });
        }).catch(function(e) {
            y.error(e);
        });
    });
}

function u() {
    return new w(function(e, t) {
        var o = {
            pagesize: 1,
            pagenum: 1,
            gettype: 1
        };
        B.getLoginPromise().then(function(r) {
            b.get({
                url: "https://wq.jd.com/activeapi/getjdgiftcards",
                data: o
            }).then(function(o) {
                var r = o.body;
                o.header;
                0 == r.ret ? (v.umpBiz({
                    bizid: "563",
                    operation: 15,
                    result: 0,
                    message: "ret:suc"
                }), e(r)) : 2 == r.ret ? B.doLogin().then(function() {
                    u();
                }).catch(function(e) {
                    t(e);
                }) : (t(), v.umpBiz({
                    bizid: "563",
                    operation: 15,
                    result: r.ret,
                    message: r.retmsg
                }));
            }).catch(function(e) {
                var o = e.code, r = e.message;
                t({
                    code: o,
                    message: r
                }), v.umpBiz({
                    bizid: "563",
                    operation: 15,
                    result: 999,
                    message: "ret:fail" + r
                });
            });
        }).catch(function(e) {
            y.error(e);
        });
    });
}

function d(e, t, o) {
    return new w(function(r, n) {
        var i = {
            pageNum: e,
            pageSize: t,
            validType: o,
            _t: Math.random()
        };
        B.getLoginPromise().then(function(s) {
            b.get({
                url: "https://wq.jd.com/user/info/GetGiftCardInfo",
                data: i
            }).then(function(i) {
                var s = i.body;
                i.header;
                (0 == s.errCode || 102 == s.errCode) && s.sumCount >= 0 ? (v.umpBiz({
                    bizid: "563",
                    operation: 22,
                    result: 0,
                    message: "ret:suc"
                }), r(s)) : 13 == s.errCode ? B.doLogin().then(function() {
                    d(e, t, o);
                }).catch(function(e) {
                    n(e);
                }) : (n(s.errCode), v.umpBiz({
                    bizid: "563",
                    operation: 22,
                    result: s.errCode,
                    message: s.errMsg
                }));
            }).catch(function(e) {
                var t = e.code, o = e.message;
                n({
                    code: t,
                    message: o
                }), v.umpBiz({
                    bizid: "563",
                    operation: 22,
                    result: 999,
                    message: "ret:fail" + o
                });
            });
        }).catch(function(e) {
            y.error(e);
        });
    });
}

function m(e) {
    return new w(function(t, o) {
        var r = {};
        B.getLoginPromise().then(function(n) {
            b.get({
                url: "https://wq.jd.com/bases/orderlist/GetCommentNum",
                data: r
            }).then(function(r) {
                var n = r.body;
                r.header;
                13 == n.ret_code ? B.doLogin().then(function() {
                    m(e);
                }).catch(function(e) {
                    o(e);
                }) : 0 == n.ret_code ? (v.umpBiz({
                    bizid: "563",
                    operation: 10,
                    result: 0,
                    message: "ret:suc"
                }), t(n)) : (e ? t({}) : o(), v.umpBiz({
                    bizid: "563",
                    operation: 10,
                    result: n.ret_code,
                    message: n.err_msg
                }));
            }).catch(function(r) {
                var n = r.code, i = r.message;
                e ? t({
                    code: n,
                    message: i
                }) : o({
                    code: n,
                    message: i
                }), v.umpBiz({
                    bizid: "563",
                    operation: 10,
                    result: 999,
                    message: "ret:fail" + i
                });
            });
        }).catch(function(e) {
            y.error(e);
        });
    });
}

function g() {
    return new w(function(e, t) {
        var o = {
            flag: 1
        };
        B.getLoginPromise().then(function(r) {
            b.get({
                url: "https://wq.jd.com/mjgj/column/GetUserShopBrowseRSize",
                data: o
            }).then(function(o) {
                var r = o.body;
                o.header;
                13 == r.retcode ? B.doLogin().then(function() {
                    g();
                }).catch(function(e) {
                    t(e);
                }) : 0 == r.retcode ? (v.umpBiz({
                    bizid: "563",
                    operation: 20,
                    result: 0,
                    message: "ret:suc"
                }), e(r)) : (t(), v.umpBiz({
                    bizid: "563",
                    operation: 20,
                    result: r.retcode,
                    message: r.errmsg
                }));
            }).catch(function(e) {
                var o = e.code, r = e.message;
                t({
                    code: o,
                    message: r
                }), v.umpBiz({
                    bizid: "563",
                    operation: 20,
                    result: 999,
                    message: "ret:fail" + r
                });
            });
        }).catch(function(e) {
            y.error(e);
        });
    });
}

function f() {
    var e = {};
    B.getLoginPromise().then(function(t) {
        b.get({
            url: "https://wq.jd.com/mjgj/column/ClickBrowse",
            data: e
        }).then(function(e) {
            var t = e.body;
            e.header;
            13 == t.retcode ? B.doLogin().then(function() {
                f();
            }).catch(function(e) {
                reject(e);
            }) : 0 == t.retcode ? (v.umpBiz({
                bizid: "563",
                operation: 19,
                result: 0,
                message: "ret:suc"
            }), resolve(t)) : (reject(), v.umpBiz({
                bizid: "563",
                operation: 19,
                result: t.retcode,
                message: t.errmsg
            }));
        }).catch(function(e) {
            var t = e.code, o = e.message;
            reject({
                code: t,
                message: o
            }), v.umpBiz({
                bizid: "563",
                operation: 19,
                result: 999,
                message: "ret:fail" + o
            });
        });
    }).catch(function(e) {
        y.error(e);
    });
}

function p() {
    return new w(function(e, t) {
        var o = {};
        B.getLoginPromise().then(function(r) {
            b.get({
                url: "https://wq.jd.com/user/info/QueryJDUserOtherPinAssets",
                data: o
            }).then(function(o) {
                var r = o.body;
                o.header;
                13 == r.errcode ? B.doLogin().then(function() {
                    p();
                }).catch(function(e) {
                    t(e);
                }) : 0 == r.errcode ? (v.umpBiz({
                    bizid: "563",
                    operation: 21,
                    result: 0,
                    message: "ret:suc"
                }), e(r)) : (t({
                    code: r.errcode
                }), v.umpBiz({
                    bizid: "563",
                    operation: 21,
                    result: r.errcode,
                    message: r.msg
                }));
            }).catch(function(e) {
                var o = e.code, r = e.message;
                t({
                    code: o,
                    message: r
                }), v.umpBiz({
                    bizid: "563",
                    operation: 21,
                    result: 999,
                    message: "ret:fail" + r
                });
            });
        }).catch(function(e) {
            y.error(e);
        });
    });
}

function h(e, t, o) {
    var r = {
        ext: "hj:x",
        active: e,
        level: t,
        t: new Date().getTime()
    };
    B.getLoginPromise().then(function(n) {
        b.get({
            url: "https://wq.jd.com/active/active_draw",
            data: r
        }).then(function(r) {
            var n = r.body;
            r.header;
            0 == n.ret || 5 == n.ret || 2 == n.ret || 147 == n.ret || 164 == n.ret || 16 == n.ret || 179 == n.ret || 185 == n.ret ? v.umpBiz({
                bizid: "601",
                operation: 11,
                result: 0,
                message: "ret:suc"
            }) : v.umpBiz({
                bizid: "601",
                operation: 11,
                result: n.ret,
                message: n.retmsg
            }), 0 == n.ret ? o(n) : 2 == n.ret ? B.doLogin().then(function() {
                h(e, t, o);
            }).catch(function(e) {
                o(n);
            }) : o(n);
        }).catch(function(e) {
            e.code;
            var t = e.message;
            o(body), v.umpBiz({
                bizid: "601",
                operation: 11,
                result: 999,
                message: "ret:fail" + t
            });
        });
    }).catch(function(e) {
        y.error(e);
    });
}

function l(e) {
    return new w(function(t, o) {
        var r = {
            pin: e,
            off: 1
        };
        B.getLoginPromise().then(function(n) {
            b({
                url: "https://wq.jd.com/activet2/oppo/queryexemption",
                params: r
            }).then(function(r) {
                var n = r.body;
                r.header;
                2 == n.errcode ? B.doLogin().then(function() {
                    l(e);
                }).catch(function(e) {
                    o(e);
                }) : 0 == n.errcode ? (v.umpBiz({
                    bizid: "563",
                    operation: 26,
                    result: 0,
                    message: "ret:suc"
                }), t(n)) : (o({
                    code: n.errcode
                }), v.umpBiz({
                    bizid: "563",
                    operation: 26,
                    result: n.errcode,
                    message: n.msg
                }));
            }).catch(function(e) {
                var t = e.code, r = e.message;
                o({
                    code: t,
                    message: r
                }), v.umpBiz({
                    bizid: "563",
                    operation: 26,
                    result: 999,
                    message: "ret:fail" + r
                });
            });
        }).catch(function(e) {
            y.error(e);
        });
    });
}

var z = require("../../common/cookie-v2/cookie.js"), b = require("../../common/request/request.js"), v = require("../../common/fe_report/usability.js"), B = require("../../common/login/login.js"), w = require("../../libs/promise.min.js"), y = new (require("../../common/logger.js"))("assetsinfo");

module.exports = {
    transferDetail: e,
    assetsTransfer: t,
    loadBalance: o,
    getOrderNum: n,
    getLogisticsInfo: r,
    getGoodsFavNum: i,
    getShopFavNum: s,
    showDpFavNum: a,
    showRecentNum: c,
    showCommentNum: m,
    getMyActivityConfig: function() {
        return new w(function(e, t) {
            b({
                url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33174.jsonp"
            }).then(function(t) {
                var o = t.body, r = (t.header, o.data || []);
                e(r);
            }).catch(function(e) {
                e.code, e.message, t();
            });
        });
    },
    verifyAuthUser: function() {
        return new w(function(e, t) {
            var o = {};
            B.getLoginPromise().then(function(r) {
                b.get({
                    url: "https://wq.jd.com/vipplus/VerifyAuthUser",
                    data: o
                }).then(function(o) {
                    var r = o.body;
                    o.header, 0 == r.retcode ? (v.umpBiz({
                        bizid: "563",
                        operation: 12,
                        result: 0,
                        message: "ret:suc"
                    }), e(r)) : (t(), v.umpBiz({
                        bizid: "563",
                        operation: 12,
                        result: r.retcode,
                        message: r.msg
                    }));
                }).catch(function(e) {
                    var o = e.code, r = e.message;
                    t({
                        code: o,
                        message: r
                    }), v.umpBiz({
                        bizid: "563",
                        operation: 12,
                        result: 999,
                        message: "ret:fail" + r
                    });
                });
            }).catch(function(e) {
                y.error(e);
            });
        });
    },
    getMyBindConfig: function() {
        return new w(function(e, t) {
            b({
                url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33176.jsonp"
            }).then(function(t) {
                var o = t.body, r = (t.header, o.data || []);
                e(r);
            }).catch(function(e) {
                e.code, e.message, t();
            });
        });
    },
    drawCoupon: h,
    getRedIcon: function(e, t) {
        return new w(function(o, r) {
            var n = {
                type: e
            };
            B.getLoginPromise().then(function(e) {
                b.get({
                    url: "https://wq.jd.com/user_redpoint/QueryUserRedPoint",
                    data: n
                }).then(function(e) {
                    var n = e.body;
                    e.header, 0 == n.iRet ? (v.umpBiz({
                        bizid: "563",
                        operation: 13,
                        result: 0,
                        message: "ret:suc"
                    }), o(n)) : (t ? o({}) : r(), v.umpBiz({
                        bizid: "563",
                        operation: 13,
                        result: n.iRet,
                        message: n.msg
                    }));
                }).catch(function(e) {
                    var n = e.code, i = e.message;
                    t ? o({
                        code: n,
                        message: i
                    }) : r({
                        code: n,
                        message: i
                    }), v.umpBiz({
                        bizid: "563",
                        operation: 13,
                        result: 999,
                        message: "ret:fail" + i
                    });
                });
            }).catch(function(e) {
                y.error(e);
            });
        });
    },
    removeRedIcon: function(e) {
        var t = {
            type: e
        };
        B.getLoginPromise().then(function(e) {
            b.get({
                url: "https://wq.jd.com/user_redpoint/ClearUserRedPoint",
                data: t
            }).then(function(e) {
                var t = e.body;
                e.header, 0 == t.iRet ? (v.umpBiz({
                    bizid: "563",
                    operation: 14,
                    result: 0,
                    message: "ret:suc"
                }), resolve(t)) : (reject(), v.umpBiz({
                    bizid: "563",
                    operation: 14,
                    result: t.iRet,
                    message: t.msg
                }));
            }).catch(function(e) {
                var t = e.code, o = e.message;
                reject({
                    code: t,
                    message: o
                }), v.umpBiz({
                    bizid: "563",
                    operation: 14,
                    result: 999,
                    message: "ret:fail" + o
                });
            });
        }).catch(function(e) {
            y.error(e);
        });
    },
    showJDECard: u,
    getVerifyAuthUrl: function() {
        return new w(function(e, t) {
            var o = {
                scene: "weixin",
                bussinessType: "535",
                rurl: "/pages/my/index/index"
            };
            B.getLoginPromise().then(function(r) {
                b.get({
                    url: "https://wq.jd.com/vipplus/LoginBrigdeAuthName",
                    data: o
                }).then(function(o) {
                    var r = o.body;
                    o.header, 0 == r.retcode ? (v.umpBiz({
                        bizid: "563",
                        operation: 18,
                        result: 0,
                        message: "ret:suc"
                    }), e(r)) : (t({
                        code: r.retcode
                    }), v.umpBiz({
                        bizid: "563",
                        operation: 18,
                        result: r.retcode,
                        message: r.msg
                    }));
                }).catch(function(e) {
                    var o = e.code, r = e.message;
                    t({
                        code: o,
                        message: r
                    }), v.umpBiz({
                        bizid: "563",
                        operation: 18,
                        result: 999,
                        message: "ret:fail" + r
                    });
                });
            }).catch(function(e) {
                y.error(e);
            });
        });
    },
    removeFootDot: f,
    getUserShopBrowseRSize: g,
    queryOtherPinAssets: p,
    getJDGiftCards: d,
    getBindGaryConfig: function() {
        return new w(function(e, t) {
            b({
                url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev30432.jsonp"
            }).then(function(t) {
                var o = t.body, r = (t.header, o.data || []);
                e(r);
            }).catch(function(e) {
                e.code, e.message, t();
            });
        });
    },
    getFreeTaskData: function() {
        return new w(function(e, t) {
            b({
                url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev34424.jsonp"
            }).then(function(t) {
                var o = t.body, r = (t.header, o.data || []);
                e(r);
            }).catch(function(e) {
                var o = e.code, r = e.message;
                t({
                    code: o,
                    message: r
                });
            });
        });
    },
    getFreeTaskNum: l,
    getPlusTips: function() {
        return new w(function(e, t) {
            b({
                url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33258.jsonp"
            }).then(function(t) {
                var o = t.body, r = (t.header, o.data || []);
                e(r);
            }).catch(function(e) {
                e.code;
                var o = e.message;
                t(o);
            });
        });
    }
};