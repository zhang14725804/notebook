function e(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
    null === n && (n = ""), "object" == (void 0 === n ? "undefined" : f(n)) && (n = n.code + " - " + n.message), 
    y.umpBiz({
        bizid: j,
        operation: e,
        result: ~~t,
        message: n
    });
}

function t(e) {
    var t = {};
    if (!e || !e.length) return t;
    for (var n, o = 0; o < e.length; o++) if ((n = e[o]) && n.groupid) {
        var r = {};
        t[n.groupid] = r;
        var c = n.locations;
        if (c && c.length) for (var i, u = 0; u < c.length; u++) if (i = c[u]) {
            var a = i.plans;
            a && a.length ? r[i.locationid] = a : r[i.locationid] = [];
        }
    }
    return t;
}

function n() {
    return w().then(function() {
        return new p(function(t, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/activepersistent/jdbeans/signin_query",
                data: {
                    callback: "cjj"
                }
            }).then(function(r) {
                var c = r.body;
                if (0 == c.ret) t(c); else {
                    if (2 == c.ret) return v().then(function() {
                        n().then(t, o);
                    }).catch(function(e) {
                        o(e);
                    });
                    o({
                        code: c.ret,
                        message: c.retmsg
                    });
                }
                e(3, c.ret, c.retmsg);
            }, function(t) {
                o(t), e(3, 1, t);
            });
        });
    });
}

function o() {
    return w().then(function() {
        return new p(function(t, n) {
            wx.$.request.get({
                url: "https://wq.jd.com/userattribute/QueryUserGiftInfo",
                data: {
                    channel: 0,
                    querytype: 0
                }
            }).then(function(r) {
                var c = r.body;
                if (l.log("getGiftData --\x3e", c), e(4, c.retcode, c.msg), 0 == c.retcode) t(c.data || {}); else {
                    if (13 == c.retcode) return v().then(function() {
                        o().then(t, n);
                    }).catch(function(e) {
                        n(e);
                    });
                    n({
                        code: c.retcode,
                        message: c.msg
                    });
                }
            }, function(t) {
                n(t), e(4, 1, t);
            });
        });
    });
}

function r(t) {
    return w().then(function() {
        return new p(function(n, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/active/querybingolist",
                data: {
                    activelist: t.join(",")
                }
            }).then(function(c) {
                var i = c.body;
                if (l.log("getBingoList --\x3e", i), e(11, i.errorCode, i.errMsg), 0 == i.errorCode) n(i.result); else {
                    if (2 == i.errorCode) return v().then(function() {
                        return r(t).then(n);
                    }).catch(function(e) {
                        return o(e);
                    });
                    o({
                        code: i.errorCode,
                        message: i.errMsg
                    });
                }
            }).catch(function(t) {
                o(t), e(11, 1, t);
            });
        });
    });
}

function c(t) {
    return w().then(function() {
        return new p(function(n, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/active/active_draw",
                data: {
                    active: t.active,
                    level: t.level,
                    ext: "hj:x"
                }
            }).then(function(r) {
                var i = r.body;
                if (l.log("activeDrawData --\x3e", i), e(12, i.ret, i.retmsg), 0 == i.ret) n(i); else {
                    if (2 == i.errorCode) return v().then(function() {
                        return c(t).then(n);
                    }).catch(function(e) {
                        return o(e);
                    });
                    o({
                        code: i.ret,
                        message: i.retmsg
                    });
                }
            }).catch(function(t) {
                o(t), e(12, 1, t);
            });
        });
    });
}

function i(t) {
    return w().then(function() {
        return new p(function(n, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/user/info/QueryCanUActiveCouponBySku",
                data: {
                    skuid: t.join(","),
                    source: 5,
                    flag: 1
                }
            }).then(function(r) {
                var c = r.body;
                if (l.log("getActiveCoupon --\x3e", c), 0 == c.retcode) {
                    var u = {};
                    (c.data || []).forEach(function(e) {
                        var t = [], n = [];
                        e.useCoupon.concat(e.activeCoupon).forEach(function(e) {
                            if (3 != e.couponStyle && 0 != e.couponKind && (0 == e.couponType || 1 == e.couponType) && h.checkTime(e.startTime, e.endTime)) {
                                var o = {
                                    quota: e.couponQuota,
                                    discount: e.couponDiscount
                                };
                                0 == e.couponType ? t.push(o) : n.push(o);
                            }
                        }), t.sort(function(e, t) {
                            return t.discount - e.discount;
                        }), n.sort(function(e, t) {
                            return t.discount / t.quota - e.discount / e.quota;
                        });
                        var o = t.concat(n);
                        o.length && (u[e.skuId] = o);
                    }), n(u);
                } else {
                    if (13 == c.retcode || 102 == c.retcode) return v().then(function() {
                        i(t).then(n, o);
                    }).catch(function(e) {
                        o(e);
                    });
                    o({
                        code: c.retcode,
                        message: c.msg
                    });
                }
                e(9, c.retcode, c.msg);
            }, function(t) {
                o(t), e(9, 1, t);
            });
        });
    });
}

function u() {
    return w().then(function() {
        return new p(function(t, n) {
            wx.$.request.get({
                url: "https://wq.jd.com/user/info/GetUserBirthday"
            }).then(function(o) {
                var r = o.body;
                if (0 == r.errcode) t("1" == r.data.birthdayFlag); else {
                    if (102 == r.errcode) return v().then(function() {
                        u().then(t, n);
                    }).catch(function(e) {
                        n(e);
                    });
                    n({
                        code: r.errcode,
                        message: r.msg
                    });
                }
                e(29, r.errcode, r.msg);
            }).catch(function(t) {
                n(t), e(29, 1, t);
            });
        });
    });
}

function a() {
    return w().then(function() {
        return new p(function(t, n) {
            wx.$.request.get({
                url: "https://wq.jd.com/pinbind/TokenRedirectForWxApp",
                data: {
                    biz: "jdselect_plus"
                }
            }).then(function(o) {
                var r = o.body;
                if (0 == r.retcode && 0 == r.action) t(r.token); else {
                    if (13 == r.retcode) return v().then(function() {
                        a().then(t, n);
                    }).catch(function(e) {
                        n(e);
                    });
                    n({
                        code: r.retcode,
                        message: r.retmsg
                    });
                }
                e(32, r.retcode, r.retmsg);
            }).catch(function(t) {
                n(t), e(32, 1, t);
            });
        });
    });
}

function s() {
    return new p(function(e) {
        wx.$.request({
            url: "https://storage.jd.com/cubefile/recovery_recommendactive.json"
        }).then(function(t) {
            if (!t || !t.body || !t.body.data) return p.reject();
            e(t.body.data);
        }).catch(function(t) {
            return e({});
        });
    });
}

function d(t) {
    return w().then(function() {
        return new p(function(n, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/pingou_active/AddMidanChance",
                data: {
                    callback: "cjj",
                    platform: 4,
                    actives: t
                }
            }).then(function(t) {
                var r = t.body;
                if (0 == r.iRet) n(r.has_change_nums); else {
                    if (2 == r.iRet) return v().then(function() {
                        d().then(n, o);
                    }).catch(function(e) {
                        o(e);
                    });
                    o({
                        code: r.iRet,
                        message: r.sErrMsg
                    });
                }
                e(53, r.iRet, r.sErrMsg);
            }).catch(function(t) {
                console.log("cjj e", t), o(t), e(53, 1, t);
            });
        });
    });
}

function g() {
    return w().then(function() {
        return new p(function(t, n) {
            wx.$.request.get({
                url: "https://wq.jd.com/activet2/oppo/xqueryexemption",
                data: {
                    cjj: "1"
                }
            }).then(function(o) {
                var r = o.body, c = r.errcode, i = r.data, u = r.msg;
                if (0 == c && i) t(i); else {
                    if (2 == c) return v().then(function() {
                        g().then(t, n);
                    }).catch(function(e) {
                        n(e);
                    });
                    n({
                        code: c,
                        message: u
                    });
                }
                e(52, c, u);
            }).catch(function(t) {
                n(t), e(52, 1, t);
            });
        });
    });
}

var f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, m = require("../../common/utils.js"), h = require("./utils.js"), l = new (require("../../common/logger.js"))("HMMMMMMMMM 京东优选 - model.js"), p = require("../../libs/promise.min.js"), w = require("../../common/login/login.js").getLoginPromise, v = require("../../common/login/login.js").doLogin, y = require("../../common/fe_report/usability.js"), j = 648;

module.exports = {
    getCpcData: function(n, o) {
        var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, c = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null, i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {};
        return new p(function(u, a) {
            var s = n.join("|"), d = o.map(function(e) {
                return e + ":" + (r[e] || 1);
            }).join(","), g = {
                gids: s,
                pcs: d
            };
            c && (g.pretime = Math.floor(c / 1e3)), wx.$.request.get({
                url: "https://wqcoss.jd.com/mcoss/focusbi/show_new",
                data: g
            }).then(function(n) {
                var o = n.body;
                l.log("getCpcData --\x3e", s, d, o), 0 == o.errCode ? u(i.raw ? o.list || [] : t(o.list || [])) : a({
                    code: o.errCode,
                    message: o.msg
                }), e(1, o.errCode, o.msg);
            }, function(t) {
                a(t), e(1, 1, t);
            });
        });
    },
    getBrandData: function(t, n, o) {
        return new p(function(r, c) {
            wx.$.request.get({
                url: "https://wq.jd.com/mcoss/brandspecial/show",
                data: {
                    aid: t,
                    skuid: n,
                    pagesize: o
                }
            }).then(function(n) {
                var o = n.body;
                l.log("getBrandData --\x3e", t, o), 0 == o.errCode ? r(o.gs && o.gs[0] || {}) : c({
                    code: o.errCode,
                    message: ""
                }), e(2, o.errCode, "");
            }, function(t) {
                c(t), e(2, 1, t);
            });
        });
    },
    getSignStatus: n,
    getGiftData: o,
    getFreshmenData: function() {
        return w().then(function() {
            return new p(function(t, n) {
                wx.$.request.get({
                    url: "https://wq.jd.com/activetmp/dianzan/query188",
                    data: {
                        cjj: 1
                    }
                }).then(function(o) {
                    var r = o.body;
                    l.log("getFreshmenData --\x3e", r), 0 == r.ret ? t(r) : n({
                        code: r.ret,
                        message: r.retmsg
                    }), e(10, r.ret, r.retmsg);
                }).catch(function(t) {
                    n(t), e(10, 1, t);
                });
            });
        });
    },
    getBingoList: r,
    getEntryData: function(t, n) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r = {
            projectid: t,
            total: n
        };
        return o.interval && !isNaN(o.interval) && o.interval > 0 && (r.interval = o.interval), 
        new p(function(t, n) {
            wx.$.request.get({
                url: "https://wq.jd.com/mcoss/categoryentry/getentryv2",
                data: r
            }).then(function(o) {
                var r = o.body;
                l.log("getEntryData --\x3e", r), 0 == r.errcode ? t(r.data || []) : n({
                    code: r.errcode,
                    message: r.msg
                }), e(5, r.errcode, r.msg);
            }, function(t) {
                n(t), e(5, 1, t);
            });
        });
    },
    getSmartData: function(t) {
        return new p(function(n, o) {
            var r = ("" + t.id).split(";");
            wx.$.request.get({
                url: "https://wq.jd.com/mcoss/smart/pagshow",
                data: Object.assign({
                    id: "0",
                    offset: "0",
                    count: "0",
                    unshowskus: "",
                    venderids: "",
                    cgids: ""
                }, t)
            }).then(function(t) {
                var c = t.body;
                if (l.log("getSmartData --\x3e", c), 0 == c.errcode) {
                    var i = {};
                    (c.data || []).forEach(function(e) {
                        e && -1 != r.findIndex(function(t) {
                            return t == e.smartid;
                        }) && (i[e.smartid] = e.list || []);
                    }), n(i);
                } else o({
                    code: c.errcode,
                    message: c.msg
                });
                e(6, c.errcode, c.msg);
            }, function(t) {
                o(t), e(6, 1, t);
            });
        });
    },
    getShopInfo: function(t) {
        return new p(function(n, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/mshop/BatchGetShopInfoByVenderId",
                data: {
                    venderIds: t.join(",")
                }
            }).then(function(r) {
                var c = r.body;
                if (l.log("getShopInfo --\x3e", t, c), 0 == c.errcode) {
                    var i = {};
                    (c.data || []).forEach(function(e) {
                        if (e && 0 != e.shopId && e.shopInfo) {
                            var t = e.shopInfo, n = -1 == t.shopLogoUrl.indexOf("567cae97N2a380057.jpg") ? t.shopLogoUrl : "";
                            i[t.venderId] = {
                                name: t.shopName,
                                logo: m.getImg(n)
                            };
                        }
                    }), n(i);
                } else o({
                    code: c.errcode,
                    message: c.msg
                });
                e(7, c.errcode, c.msg);
            }, function(t) {
                o(t), e(7, 1, t);
            });
        });
    },
    getBrandName: function(e) {
        return new p(function(t, n) {
            wx.$.request.get({
                url: "https://wq.jd.com/mcoss/branddetail/getinfo",
                data: {
                    brandid: e.join(";")
                }
            }).then(function(e) {
                var o = e.body;
                if (l.log("getBrandName --\x3e", o), 0 == o.errcode) {
                    var r = {};
                    (o.data || []).forEach(function(e) {
                        e.brandId && (r[e.brandId] = e.enName || e.cnName || "");
                    }), t(r);
                } else n({
                    code: o.errcode,
                    message: o.msg
                });
            }, function(e) {
                n(e);
            });
        });
    },
    getReviewRate: function(e) {
        return e.length ? new p(function(t, n) {
            wx.$.request.get({
                url: "https://club.jd.com/clubservice/summary-m-" + e.join(",") + ".html",
                data: {}
            }).then(function(e) {
                var n = e.body;
                l.log("getReviewRate --\x3e", n);
                var o = {};
                (n.CommentsCount || []).forEach(function(e) {
                    e.SkuId && (o[e.SkuId] = (100 * e.GoodRate).toFixed(1).replace(".0", ""));
                }), t(o);
            }, function(e) {
                n(e);
            });
        }) : p.resolve({});
    },
    getFeedList: function(t) {
        return new p(function(n, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/shopgroup_api_feed/GetSkuFeedList",
                data: {
                    skuids: t.join(","),
                    pageno: 1,
                    pagesize: 1
                }
            }).then(function(t) {
                var r = t.body;
                if (l.log("getFeedList --\x3e", r), 0 == r.iRet) {
                    var c = {};
                    (r.feed_list || []).forEach(function(e) {
                        var t = e.shareid, n = 0 == e.contenttype ? e.commentcontent : e.firsttext;
                        e.skuid && t && n && (c[e.skuid] = {
                            shareId: t,
                            content: n,
                            portrait: m.getImg(e.headimgurl, 40),
                            nickname: e.nickname,
                            followers: e.followbuys
                        });
                    }), n(c);
                } else o({
                    code: r.iRet,
                    message: r.errmsg
                });
                e(8, r.iRet, r.errmsg);
            }, function(t) {
                o(t), e(8, 1, t);
            });
        });
    },
    getActiveCoupon: i,
    activeDraw: c,
    queryOldBring: function() {
        return new p(function(t, n) {
            wx.$.request.get({
                url: "https://wq.jd.com/activetmp/iphone/queryoldbring",
                data: {
                    cjj: 1
                }
            }).then(function(o) {
                var r = o.body;
                l.log("queryOldBring --\x3e", r), 0 == r.errcode ? t(r.data || {}) : n({
                    code: r.errcode,
                    message: r.msg
                }), e(26, r.errcode, r.msg);
            }, function(t) {
                n(t), e(26, 1, t);
            });
        });
    },
    getBookingTags: function(t) {
        return w().then(function() {
            return new p(function(n, o) {
                wx.$.request.get({
                    url: "https://wqcoss2.jd.com/mcoss/subscrtag/show",
                    data: {
                        projid: t
                    }
                }).then(function(t) {
                    var r = t.body;
                    0 == r.errcode ? (n(r.data), e(24, 0)) : (o({
                        code: r.errcode,
                        message: r.msg
                    }), e(24, r.errcode, r.msg));
                }).catch(function(t) {
                    o(t), e(24, 1, t);
                });
            });
        });
    },
    editBookingTags: function(t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
        return w().then(function() {
            return new p(function(r, c) {
                wx.$.request.get({
                    url: "https://wqcoss2.jd.com/mcoss/subscrtag/edit",
                    data: {
                        projid: t,
                        addtagid: n.join(","),
                        deltagid: o.join(","),
                        callback: "cjj"
                    }
                }).then(function(t) {
                    var n = t.body;
                    0 == n.errcode ? (r(), e(25, 0)) : (c({
                        code: n.errcode,
                        message: n.msg
                    }), e(25, 1));
                }).catch(function(t) {
                    c(t), e(25, 1, t);
                });
            });
        });
    },
    getBrandSale: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, n = arguments[1], o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
        return new p(function(r, c) {
            wx.$.request.get({
                url: "https://wq.jd.com/mcoss/brandspecial/show",
                data: {
                    aid: t,
                    sid: n,
                    filtermark: o
                }
            }).then(function(t) {
                var n = t.body;
                0 == n.errCode ? (r(n), e(27, 0)) : (c({
                    code: n.errCode,
                    message: "res body errCode != 0"
                }), e(27, 1));
            }).catch(function(t) {
                c(t), e(27, 1, t);
            });
        });
    },
    getWeatherLocation: function() {
        return new p(function(t, n) {
            wx.$.request.get({
                url: "https://wq.jd.com/weatherlocation/ShowWeather"
            }).then(function(o) {
                var r = o.body;
                0 == r.iRet ? t(r) : n({
                    code: r.iRet,
                    message: "res body iRet != 0"
                }), e(28, r.iRet, r.sErrMsg);
            }).catch(function(t) {
                n(t), e(28, 1, t);
            });
        });
    },
    getUserBirthday: u,
    getSearchKey: function(t) {
        return new p(function(n, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/mcoss/hiddenword/HiddenwordSearch",
                data: {
                    projectid: t,
                    total: 1
                }
            }).then(function(t) {
                var r = t.body;
                0 == r.errCode ? n(r) : o({
                    code: r.errCode,
                    message: r.msg
                }), e(30, r.errCode, r.msg);
            }).catch(function(t) {
                o(t), e(30, 1, t);
            });
        });
    },
    getPlusUserInfo: function() {
        return new p(function(t, n) {
            wx.$.request.get({
                url: "https://plus.m.jd.com/user/getPlusUserInfo/v1",
                data: {
                    contentType: "1_6",
                    callbackjp: "cjj",
                    appName: "jdyxcx"
                },
                channel: "http"
            }).then(function(o) {
                var r = o.body;
                r.success && r.result ? (t(r.result), e(31, 0, r.message)) : (n({
                    code: r.resultCode,
                    message: r.message
                }), e(31, 1, r.message));
            }).catch(function(t) {
                n(t), e(31, 1, t);
            });
        });
    },
    getToken: a,
    getPlusCouponTotalQuota: function() {
        return new p(function(t, n) {
            wx.$.request.get({
                url: "https://plus.m.jd.com/coupon/dayCouponsForExternal/v1",
                data: {
                    callbackjp: "cjj",
                    appName: "jdyxcx"
                }
            }).then(function(o) {
                var r = o.body, c = r.resultCode, i = r.message, u = r.result;
                "1000" == c && u ? t(u) : n({
                    code: c,
                    message: i
                }), "1000" == c || "0003" == c || "0004" == c || "0005" == c ? e(33, 0, i) : e(33, 1, i);
            }).catch(function(t) {
                n(t), e(33, 1, t);
            });
        });
    },
    getCarouselAdvs: function(t) {
        return new p(function(n, o) {
            wx.$.request.get({
                url: "https://x.jd.com/cpd",
                data: {
                    spread_type: "1",
                    ad_type: "8",
                    mobile_type: "3",
                    template: "0",
                    app_ad_ids: t
                }
            }).then(function(t) {
                var o = t.body;
                if ("object" !== (void 0 === o ? "undefined" : f(o))) return e(34, 1), p.reject("advs request error");
                n(o), e(34, 0);
            }).catch(function(t) {
                o(t), e(34, 1, t);
            });
        });
    },
    getFloorSort: function(t) {
        return new p(function(n, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/mcoss/floor/fsort",
                data: {
                    proid: t
                }
            }).then(function(t) {
                var r = t.body, c = r.retcode, i = r.pro, u = r.errmsg;
                0 == c && i ? n(i) : o({
                    code: c,
                    message: u
                }), e(35, c, u);
            }, function(t) {
                o(t), e(35, 1, t);
            });
        });
    },
    getPingouGoods: function(t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 15;
        return new p(function(o, r) {
            wx.$.request.get({
                url: "https://wqcoss.jd.com/mcoss/pingou/show",
                data: {
                    id: t,
                    count: n
                }
            }).then(function(t) {
                var n = t.body, c = n.errcode, i = n.data, u = n.msg;
                "0" == c && i && i.length ? o(i[0]) : r({
                    code: c,
                    message: u
                }), e(36, c, u);
            }, function(t) {
                r(t), e(36, 1, t);
            });
        });
    },
    getTuanMemberCount: function(t) {
        return new p(function(n, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/pingou_api/getpingoubatactiveinfo",
                data: {
                    skuids: t.join(",")
                }
            }).then(function(t) {
                var r = t.body, c = r.iRet, i = r.pingou_info, u = r.errmsg;
                0 == c && i ? n(i) : o({
                    code: c,
                    message: u
                }), e(37, c, u);
            }, function(t) {
                o(t), e(37, 1, t);
            });
        });
    },
    getTuanNews: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
        return new p(function(n, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/pingou_api/GetTips",
                data: {
                    sku_id: t
                }
            }).then(function(t) {
                var r = t.body, c = r.iRet, i = r.data, u = r.errmsg;
                0 == c && i ? n(i) : o({
                    code: c,
                    message: u
                }), e(38, c, u);
            }, function(t) {
                o(t), e(38, 1, t);
            });
        });
    },
    getSeckillGoods: function(t) {
        return new p(function(n, o) {
            wx.$.request.get({
                url: "https://wqcoss.jd.com/mcoss/seckill/show",
                data: {
                    actid: t,
                    pc: 5
                }
            }).then(function(t) {
                var r = t.body, c = r.errCode, i = r.data, u = r.msg;
                0 == c && i ? n(i) : o({
                    code: c,
                    message: u
                }), e(39, c, u);
            }, function(t) {
                o(t), e(39, 1, t);
            });
        });
    },
    getRecommendList: function(t) {
        return new p(function(t, n) {
            wx.$.request.get({
                url: "https://wq.jd.com/youhaohuo/GetRecommendList",
                data: {
                    size: 1
                }
            }).then(function(o) {
                var r = o.body, c = r.ret, i = r.data, u = r.msg;
                0 == c && i && i.list && i.list.length ? t(i.list[0]) : n({
                    code: c,
                    message: u
                }), e(40, c, u);
            }, function(t) {
                n(t), e(40, 1, t);
            });
        });
    },
    getWelfare: function(t) {
        return new p(function(t, n) {
            wx.$.request.get({
                url: "https://wq.jd.com/cube/activeaggre/RecommendActive",
                data: {
                    callback: "cjj"
                }
            }).then(function(n) {
                var o = n.body, r = o.ret, c = o.data, i = o.msg;
                0 == r && c && c.active_list.length ? t(c) : s().then(function(e) {
                    return t(e);
                }), e(41, r, i);
            }, function(n) {
                s().then(function(e) {
                    return t(e);
                }), e(41, 1, n);
            });
        });
    },
    getKeywordData: function(t, n, o) {
        return new p(function(r, c) {
            wx.$.request.get({
                url: "https://wq.jd.com/mcoss/keyword/keywordsearch",
                data: {
                    ruleid: t,
                    pi: n,
                    pc: o
                }
            }).then(function(t) {
                var n = t.body;
                l.log("getKeywordData --\x3e", n), 0 == n.errCode ? r(n.data || []) : c({
                    code: n.errcode,
                    message: n.msg
                }), e(42, n.errcode, n.msg);
            }, function(t) {
                c(t), e(42, 1, t);
            });
        });
    },
    getCsortData: function(t, n) {
        return new p(function(o, r) {
            wx.$.request.get({
                url: "https://wq.jd.com/mcoss/floor/csort",
                data: {
                    proid: t,
                    total: n
                }
            }).then(function(t) {
                var n = t.body;
                l.log("getCsortData --\x3e", n), 0 == n.retcode ? o(n.pro || []) : r({
                    code: n.retcode,
                    message: n.errmsg
                }), e(43, n.retcode, n.errmsg);
            }, function(t) {
                r(t), e(43, 1, t);
            });
        });
    },
    getRankInfoData: function(t, n, o) {
        return new p(function(r, c) {
            var i = {
                cateId: t + "",
                provinceId: n + "",
                cityId: o + "",
                source: "wx",
                time: "1DAY",
                rankId: "rank3001"
            };
            wx.$.request.get({
                url: "https://api.m.jd.com/api",
                data: {
                    functionId: "rankInfo",
                    client: "wxphb",
                    clientVersion: "1.0.0",
                    body: JSON.stringify(i)
                }
            }).then(function(t) {
                var n = t.body;
                l.log("getRankInfoData --\x3e", n), n.isSuccess ? r(n.result || []) : c({
                    code: n.code
                }), e(44, n.code);
            }, function(t) {
                c(t), e(44, 1, t);
            });
        });
    },
    getGroupTag: function(t, n) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
        return new p(function(r, c) {
            wx.$.request.get({
                url: "https://wq.jd.com/mcoss/grouptag/getgrouptag",
                data: {
                    topn: t,
                    projectid: n,
                    compensate: o
                }
            }).then(function(t) {
                var n = t.body;
                l.log("getGroupTag --\x3e", n), 0 == n.retcode ? r(n.tags || []) : c({
                    code: n.retcode,
                    message: n.errmsg
                }), e(45, n.retcode, n.errmsg);
            }, function(t) {
                c(t), e(45, 1, t);
            });
        });
    },
    getShopRecommend: function(t, n) {
        return new p(function(o, r) {
            wx.$.request.get({
                url: "https://wq.jd.com/mshop/QueryShopRecommendMain",
                data: {
                    pin: t,
                    p: 619132,
                    pi: "wq_indexV6",
                    ci: 2,
                    visitKey: n,
                    lim: 4,
                    lid: 0,
                    did: "10086119999"
                }
            }).then(function(t) {
                var n = t.body;
                l.log("getShopRecommend --\x3e", n), 0 == n.ret ? o(n || []) : r({
                    code: n.ret,
                    message: n.msg
                }), e(46, n.ret, n.msg);
            }, function(t) {
                r(t), e(46, 1, t);
            });
        });
    },
    getRecommendFeedList: function(t, n) {
        return new p(function(o, r) {
            wx.$.request.get({
                url: "https://wq.jd.com/contentcenter_feed/GetRecommendFeedList",
                data: {
                    positionid: t,
                    pagesize: n,
                    pageno: 1,
                    bi: 1,
                    channelid: 10009
                }
            }).then(function(t) {
                var n = t.body;
                l.log("getRecommendFeedList --\x3e", n), 0 == n.iRet ? o(n.feed_list || []) : r({
                    code: n.iRet,
                    message: n.errmsg
                }), e(48, n.iRet, n.errmsg);
            }, function(t) {
                r(t), e(48, 1, t);
            });
        });
    },
    getSkuInfo: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        return new p(function(n, o) {
            var r = t.join(",");
            wx.$.request.get({
                url: "https://yx.3.cn/service/info.action",
                data: {
                    ids: r
                }
            }).then(function(t) {
                var o = t.body;
                l.log("getSkuImg --\x3e", o), n(o), e(49, 0);
            }, function(t) {
                o(t), e(49, 1, t);
            });
        });
    },
    getActiveFeeds: function(t) {
        return new p(function(n, o) {
            wx.$.request.get({
                url: "https://wq.jd.com/shopgroup_api_feed/GetActvieFeeds",
                data: {
                    shareids: t.join(","),
                    source: "wxapp"
                }
            }).then(function(t) {
                var r = t.body, c = r.iRet, i = r.feed_list, u = r.errmsg;
                0 == c && i ? n(i) : o({
                    code: c,
                    message: u
                }), e(50, c, u);
            }, function(t) {
                o(t), e(50, 1, t);
            });
        });
    },
    getCaptainQuali: d,
    getEntryicon: function(t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        return new p(function(o, r) {
            wx.$.request.get({
                url: "https://wq.jd.com/mcoss/entryicon/show",
                data: {
                    pcs: t + ":" + n
                }
            }).then(function(t) {
                var n = t.body;
                l.log("getEntryicon --\x3e", n), 0 == n.errcode ? o(n.data || []) : r({
                    code: n.errcode,
                    message: n.msg
                }), e(51, n.errcode, n.msg);
            }, function(t) {
                r(t), e(51, 1, t);
            });
        });
    },
    getExemption: g
};