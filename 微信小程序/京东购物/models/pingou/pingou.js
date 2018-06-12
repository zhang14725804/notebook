function e() {
    return g.getUserAddressID() || "19_1607_4773_0";
}

function t(e, n, o) {
    return new h(function(a, r) {
        if (e) {
            var i = {
                client_id: 100,
                sku_id: e,
                tuan_id: o || 0,
                active_id: n || 0,
                orderId: 0,
                jointype: 0,
                platform: I,
                callback: "getTuanStatusCb"
            };
            f.getLoginPromise().then(function(n) {
                p.get({
                    url: w.getTuanStatus,
                    data: i
                }).then(function(n) {
                    var o = n.body;
                    n.header;
                    0 == o.iRet ? (a(o), c(7, 0, "success")) : 2 == o.iRet ? f.doLogin().then(function() {
                        t(e);
                    }).catch(function() {
                        r();
                    }) : (r({}), c(7, o.iRet, "fail:" + o.iRet));
                }).catch(function(e) {
                    var t = e.code, n = e.message;
                    r({
                        code: t,
                        message: n
                    }), c(7, t, "catch Error code:" + t + "message:" + n);
                });
            }).catch(function(e) {
                b.error(e);
            });
        } else r();
    });
}

function n(e) {
    return new h(function(t, o) {
        if (!e || !e.skuId) return o(), !1;
        var a = {
            client_id: 101,
            sku_id: e.skuId,
            nickname: e.nickname,
            tuan_id: e.tuanId,
            active_id: e.activeId,
            platform: I,
            callback: "getTuanInfoCb"
        };
        e.orderId && (a.orderId = e.orderId), f.getLoginPromise().then(function(r) {
            p.get({
                url: w.getTuanInfo,
                data: a
            }).then(function(a) {
                var r = a.body;
                a.header;
                b.debug("==>>_getTuanInfo", r), 9999 == r.iRet || 2 == r.iRet ? f.doLogin().then(function() {
                    n(e).then(t, o);
                }).catch(function() {
                    o();
                }) : 0 == r.iRet ? (t(r), c(9, 0, "success")) : (o(), c(9, r.iRet, "fail: " + r.iRet));
            }).catch(function(e) {
                var t = e.code, n = e.message;
                o(), c(9, t, "catch Error code:" + t + "message:" + n);
            });
        }).catch(function(e) {
            b.error(e);
        });
    });
}

function o(e) {
    return new h(function(t, n) {
        var a = {
            page_size: e.pageSize || 10,
            page_no: e.pageNo,
            pIndex: 0,
            type: e.type,
            sourceType: 1,
            platform: I,
            callback: "getMyPingouListCb"
        };
        f.getLoginPromise().then(function() {
            p.get({
                url: w.getMyPingouList,
                data: a
            }).then(function(a) {
                var r = a.body;
                a.header;
                0 == r.iRet ? (t(r), c(10, 0, "success")) : 2 == r.iRet ? f.doLogin().then(function() {
                    o(e);
                }).catch(function() {
                    n();
                }) : (n(), 10 != r.iRet && c(10, r.iRet, "fail:" + r.iRet));
            }).catch(function(e) {
                var t = e.code, o = e.message;
                n(), c(10, t, "catch Error code:" + t + "message:" + o);
            });
        }).catch(function(e) {
            n(), b.error(e);
        });
    });
}

function a(e, t) {
    return new h(function(n, o) {
        var r = {
            start_pos: ((e = e || 1) - 1) * (t = t || 20),
            nums: t,
            platform: I,
            callback: "getMyCentTuanListCb"
        };
        f.getLoginPromise().then(function() {
            p.get({
                url: w.getMyCentTuanList,
                data: r
            }).then(function(r) {
                var i = r.body;
                r.header;
                0 == i.iRet ? (c(25, 0, "success"), n(i)) : 2 == i.iRet ? f.doLogin().then(function() {
                    a(e, t);
                }).catch(function() {
                    o();
                }) : (10 != i.iRet && c(23, i.iRet, "fail: " + i.iRet), o());
            }).catch(function(e) {
                var t = e.code, n = e.message;
                o(), c(25, t, "catch Error code:" + t + "message:" + n);
            });
        });
    });
}

function c(e, t, n) {
    m.report(e, t, n, 586, !1);
}

function r(e) {
    return new h(function(t, n) {
        var o = {
            url: w.itemAddFav,
            data: {
                commId: e,
                callback: "addFav",
                t: Math.random() + ""
            }
        };
        f.getLoginPromise().then(function(a) {
            p.get(o).then(function(o) {
                var a = o.body;
                9999 == a.iRet ? f.doLogin().then(function() {
                    r(e).then(t, n);
                }).catch(function() {
                    n({
                        code: -1,
                        message: ""
                    });
                }) : 0 == a.iRet || 3 == a.iRet ? t(!0) : n(2 == a.iRet ? {
                    code: 2,
                    message: "收藏商品已达上限"
                } : {
                    code: a.iRet,
                    message: a.errMsg
                });
            }).catch(function() {
                n({
                    code: -1,
                    message: ""
                });
            });
        });
    });
}

function i(e) {
    return new h(function(t, n) {
        var o = {
            url: w.itemDelFav,
            data: {
                commId: e,
                callback: "cancelFav",
                t: Math.random() + ""
            }
        };
        f.getLoginPromise().then(function(a) {
            p.get(o).then(function(o) {
                var a = o.body;
                9999 == a.iRet ? f.doLogin().then(function() {
                    i(e).then(t, n);
                }).catch(function() {
                    n();
                }) : t(0 == a.iRet ? !1 : !0);
            }).catch(function() {
                n({
                    code: -1,
                    message: ""
                });
            });
        });
    });
}

function u(e) {
    return new h(function(t, n) {
        var o = {
            url: w.itemCheckFav,
            data: {
                commId: e.join(","),
                callback: "checkFav",
                t: Math.random() + ""
            }
        };
        f.getLoginPromise().then(function(a) {
            p.get(o).then(function(o) {
                var a = o.body;
                9999 == a.iRet ? f.doLogin().then(function() {
                    u(e).then(t, n);
                }).catch(function() {
                    n();
                }) : t(0 == a.iRet ? 1 == a.data[0].state ? !0 : !1 : !1);
            });
        });
    });
}

function s() {
    return new h(function(e, t) {
        y().then(function() {
            p({
                url: w.queryExtInfo
            }).then(function(n) {
                n.body && (0 == n.body.ret && (c(39, 0, "success"), e(n.body.status)), 2 == n.body.ret && f.doLogin().then(function() {
                    s();
                }).catch(function() {
                    t();
                }), n.body.ret < 0 && (c(39, 1, "errCode:" + n.body.ret + "errMsg:" + n.body.retmsg), 
                t(n.body.ret)));
            }).catch(function(e) {
                var n = e.code;
                c(39, n, "catch error code:" + n + "message:" + e.message), t();
            });
        }).catch(function(e) {
            b.error(e);
        });
    });
}

function d(e) {
    return new h(function(t, n) {
        y().then(function() {
            p({
                url: w.readyTuan,
                data: {
                    active: e
                }
            }).then(function(e) {
                e.body && (0 == e.body.ret && (c(40, 0, "success"), t(e.body.canStartTuan)), 2 == e.body.ret && f.doLogin().then(function() {
                    d();
                }).catch(function() {
                    n();
                }), e.body.ret < 0 && (c(40, 1, "errCode:" + e.body.ret), n(e.body.ret)));
            }).catch(function(e) {
                var t = e.code;
                c(40, t, "catch error code:" + t + "message:" + e.message), n();
            });
        }).catch(function(e) {
            b.error(e);
        });
    });
}

var f = require("../../common/login/login.js"), g = require("../../common/user_info.js"), h = require("../../libs/promise.min.js"), m = require("../../common/fe_report/usability.js"), p = require("../../common/request/request.js"), l = require("../../common/logger"), v = require("../../common/fe_helper.js"), b = new l("/model/pingou/pingou"), y = require("../../common/login/login.js").getLoginPromise, w = {
    adLink: "https://wq.jd.com/mcoss/focusbi/show_new",
    miaosha: "https://wq.jd.com/mcoss/seckill/pingou",
    pgTabSort: "https://wq.jd.com/mcoss/floor/fsort",
    recommendTuan: "https://wq.jd.com/pingou_active/QueryPopActivesEx",
    tuanNum: "https://wq.jd.com/pingou_core/GetBatTuanNum",
    getTuanPrice: "https://wq.jd.com/pingou_core/getskusprice",
    activeInfo: "https://wq.jd.com/pingou_core/getpingoubatactiveinfo_UTF8",
    getSibSkuList: "https://wq.jd.com/pingou_core/GetSameAttrSkuidList_UTF8",
    getTuiJianTuan: "https://wq.jd.com/pingou_core/GetTuiJianTuan",
    getItemDetail: "https://wqitem.jd.com/item/waview",
    getTuanStatus: "https://wq.jd.com/pingou_core/GetTuanStatus_UTF8",
    getStockInfo: "https://c0.3.cn/stock",
    getTuanInfo: "https://wq.jd.com/pingou_core/GetTuanInfo",
    getMyPingouList: "https://wq.jd.com/pingou_core/GetUserPingouActivityByPin",
    report2shopGroup: "https://wq.jd.com/shopgroup_api_feed/ShopgroupShare",
    setPintuan: "https://wq.jd.com/pingou_core/SetPinTuan_UTF8",
    uploadHeadUrl: "https://wq.jd.com/pingou_core/UploadHeadPortraitUrl_UTF8",
    skuInfo: "https://yx.3.cn/service/info.action",
    getTips: "https://wq.jd.com/pingou_active/GetTips",
    getNewerTuanInfo: "https://wq.jd.com/pingou_active/getpingoutype",
    autoTuanConfig: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev30066.jsonp",
    indexBannerConfig: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33006.jsonp",
    indexShowYfcjConfig: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33824.jsonp",
    bairentuanBannerConfig: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev31646.jsonp",
    ziyingBannerConfig: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev32532.jsonp",
    newerTuanConfig: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33036.jsonp",
    pingouData: "https://wqcoss.jd.com/mcoss/pingou/show",
    couponsInfo: "https://wq.jd.com/mjgj/fans/queryusegetcoupon",
    daRenTuan: "https://wq.jd.com/mcoss/seckill/pingou",
    hotTuan: "https://wq.jd.com/pingou_active/GetHotTuanInfo15",
    smartData: "https://wq.jd.com/mcoss/smart/pagshow",
    getMyCentTuanList: "https://wq.jd.com/pingou_active/BatGetSelfTuanLst",
    checkChat: "https://chat1.jd.com/api/checkChat",
    setFormId: "https://wq.jd.com/user/info/AddFormIdInfo",
    shareImgConfig: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev34114.jsonp",
    miandanPPMS: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev34042.jsonp",
    mandanRight: "https://wq.jd.com/pingou_active/querymiandanqx",
    channelInfo: "https://wq.jd.com/pingou_core/getpingoubatactiveinfo",
    virtualStock: "https://wq.jd.com/pingou_active/GetVirtualStockNum",
    itemAddFav: "https://wq.jd.com/fav/comm/FavCommAdd",
    itemDelFav: "https://wq.jd.com/fav/comm/FavCommDel",
    itemCheckFav: "https://wq.jd.com/fav/comm/FavManyCommQuery",
    getCurtainPpms: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev34030.jsonp",
    queryExtInfo: "https://wq.jd.com/activep2/util/queryextinfo",
    readyTuan: "https://wq.jd.com/activepersistent/pintuan/readytuan"
}, k = 5, I = 4;

module.exports = {
    getCouponsInfo: function(e) {
        var t = {
            sku: e.skuId,
            cid: e.category[2],
            popId: 3 == e.spAttr.isOverseaPurchase ? "8889" : e.isPop ? e.venderID : "8888",
            platform: "5",
            callback: "getCouponListCB",
            pin: encodeURIComponent(g.gUserData().pin),
            t: Math.random() + ""
        };
        e.isPop && (t.popId = e.venderID);
        var n = {
            url: w.couponsInfo,
            data: t
        };
        return new h(function(e, t) {
            p.get(n).then(function(n) {
                var o = n.body;
                if ("success" == o.msg) {
                    o.use_coupons = o.use_coupons.map(function(e) {
                        return e.isUse = !0, e.discount = parseInt(e.parValue, 10), e.quota = parseInt(e.quota, 10), 
                        e.couponType = e.type, e;
                    });
                    var a = o.coupons.concat(o.use_coupons), c = {};
                    a = (a = a.filter(function(e) {
                        return 0 != e.couponKind && !c[e.quota + "-" + e.discount] && (c[e.quota + "-" + e.discount] = !0, 
                        !0);
                    })).sort(function(e, t) {
                        return e.quota / e.discount - t.quota / t.discount;
                    }), e({
                        coupons: a
                    });
                } else t(o.msg || "data invalid");
            }).catch(function(e) {
                e.code;
                var n = e.message;
                t(n);
            });
        });
    },
    drawCoupons: function() {},
    getActiveInfo: function(e) {
        return new h(function(t, n) {
            if (e) {
                Array.isArray(e) && (e = e.join(","));
                var o = {
                    skuids: e,
                    callback: "getActiveInfoCb",
                    platform: I
                };
                p.get({
                    url: w.activeInfo,
                    data: o
                }).then(function(e) {
                    var o = e.body;
                    e.header, 0 == o.iRet ? o && o.pingou_info && o.pingou_info.length > 0 ? (t(o.pingou_info), 
                    c(2, 0, "success")) : n() : (n(), c(2, o.iRet, "getActiveInfo Error:" + o.iRet));
                }).catch(function(e) {
                    var t = e.code, o = e.message;
                    n(), c(2, t, "catch Error message:" + o);
                });
            } else n();
        });
    },
    getSibSkuList: function(e) {
        return new h(function(t, n) {
            if (e) {
                var o = {
                    sku_id: e,
                    callback: "getSibSkuListCb",
                    platform: I
                };
                p.get({
                    url: w.getSibSkuList,
                    data: o
                }).then(function(e) {
                    var o = e.body;
                    e.header, 0 == o.iRet ? (t(o.skuid_list), c(3, 0, "success")) : (n(), c(3, o.iRet, JSON.stringify(o)));
                }).catch(function(e) {
                    var t = e.code, o = e.message;
                    n(), c(3, t, "catch Error code:" + t + "message:" + o);
                });
            } else n();
        });
    },
    getTuanPrice: function(t) {
        return new h(function(n, o) {
            if (t) {
                var a = {
                    skuids: t,
                    origin: k,
                    source: "pingou",
                    area: e(),
                    businessId: "1000000001",
                    callback: "jsonpCBKD"
                };
                p.get({
                    url: w.getTuanPrice,
                    data: a
                }).then(function(e) {
                    var t = e.body;
                    e.header, t && t.length > 0 ? (n(t), c(4, 0, "success")) : (o(), c(4, 1, "fail:" + JSON.stringify(t)));
                }).catch(function(e) {
                    var t = e.code, n = e.message;
                    o(), c(4, t, "catch Error code:" + t + "message:" + n);
                });
            } else o();
        });
    },
    getRecommendTuan: function(e) {
        return new h(function(t, n) {
            if (e) {
                var o = {
                    sku_id: e,
                    callback: "getRecommendTuan",
                    platform: I
                };
                p.get({
                    url: w.getTuiJianTuan,
                    data: o
                }).then(function(e) {
                    var o = e.body;
                    e.header, 0 == o.iRet ? (t(o), c(5, 0, "success")) : (n(), c(5, o.iRet, "fail:" + o.iRet));
                }).catch(function(e) {
                    var t = e.code, o = e.message;
                    n(), c(5, t, "catch Error code:" + t + "message:" + o);
                });
            } else n();
        });
    },
    getItemDetail: function(t) {
        return b.info("==>>_getItemDetail", t), new h(function(n, o) {
            if (t) {
                var a = {
                    datatype: 1,
                    sku: t,
                    areaid: e(),
                    cgi_source: "pingou",
                    callback: "getItemDetailCb"
                };
                p.get({
                    url: w.getItemDetail,
                    data: a
                }).then(function(e) {
                    var t = e.body;
                    e.header, b.info("==>>_getItemDetail success", t), "" == t.errCode ? (n(t), c(6, 0, "success")) : (o(t.errCode), 
                    c(6, t.errCode, "fail:" + t.errCode));
                }).catch(function(e) {
                    var t = e.code, n = e.message;
                    b.info("==>>_getItemDetail fail", t), o(), c(6, t, "catch Error code:" + t + "message:" + n);
                });
            } else o();
        });
    },
    getTuanStatus: t,
    getStockInfo: function(t, n, o, a) {
        return new h(function(r, i) {
            var u = e();
            if (t && n && o) {
                var s = {
                    buyNum: a,
                    ch: 4,
                    cat: n,
                    skuId: t,
                    venderId: o,
                    extraParam: JSON.stringify({
                        originid: "3"
                    }),
                    area: u,
                    callback: "getStockInfoCb"
                };
                p.get({
                    url: w.getStockInfo,
                    data: s
                }).then(function(e) {
                    var t = e.body;
                    e.header, t && t.stock ? (c(8, 0, "success"), r(t.stock)) : (i(), c(8, 1, "fail:" + JSON.stringify(t)));
                }).catch(function(e) {
                    var t = e.code, n = e.message;
                    i(), c(8, t, "catch Error code:" + t + "message:" + n);
                });
            } else i();
        });
    },
    getTuanInfo: n,
    getMyPingouList: o,
    report2shopGroup: function(e) {
        return new h(function(t, n) {
            e ? (e.callback = "report2shopGroupCb", p.get({
                url: w.report2shopGroup,
                data: e
            }).then(function(e) {
                var n = e.body;
                e.header, t(n), c(12, 0, "success");
            }).catch(function(e) {
                var t = e.code, o = e.message;
                n(), c(12, t, "catch Error code:" + t + "message:" + o);
            })) : n();
        });
    },
    setPintuan: function(e) {
        return new h(function(t, n) {
            e.platform = I, e.callback = "setPintuanCb", p.get({
                url: w.setPintuan,
                data: e
            }).then(function(e) {
                var o = e.body;
                if (e.header, !o || "string" == typeof o) return c(11, 1, "fail: " + o || "business fail"), 
                n(), !1;
                c(11, 0, "success"), t(!0);
            }).catch(function(e) {
                var t = e.code;
                c(11, t, "catch Error code:" + t + "message:" + e.message || "ajax fail"), n();
            });
        });
    },
    uploadUserHeadPortrait: function(e) {
        return new h(function(t, n) {
            if (!e) return n(), !1;
            e.platform = I, e.callback = "uploadUserHeadCb", p.get({
                url: w.uploadHeadUrl,
                data: e
            }).then(function(e) {
                var o = e.body;
                if (e.header, !o || "string" == typeof o) return c(15, 1, "fail: " + JSON.stringify(o)), 
                n(), !1;
                c(15, 0, "success"), t(!0);
            }).catch(function(e) {
                var t = e.code;
                c(15, t, "catch Error code:" + t + "message:" + e.message), n();
            });
        });
    },
    getRecommendProducts: function(e) {
        return new h(function(t, n) {
            if (!e) return n(), !1;
            var o = e.pageNo || 1, a = e.pageSize || 10, r = {
                start_bank: a * (o - 1) + 1,
                end_bank: a * o,
                callback: "getRecommendProductsCb"
            };
            p.get({
                url: w.recommendTuan,
                data: r
            }).then(function(e) {
                var o = e.body;
                e.header, 0 == o.iRet ? (c(17, 0, "success"), t(o)) : (c(17, o.iRet, "fail: " + o.iRet), 
                n());
            }).catch(function(e) {
                var t = e.code;
                c(17, t, "catch Error code:" + t + "message:" + e.message), n();
            });
        });
    },
    getShopInfo: function(e) {
        return new h(function(t, n) {
            if (!e) return n(), !1;
            var o = {
                venderIds: e,
                callback: "getShopInfoCb"
            };
            p.get({
                url: w.getShopInfo,
                data: o
            }).then(function(e) {
                var o = e.body;
                if (e.header, !o || 0 != o.errcode) return n(), c(14, o.errcode, "fail: " + o.errcode), 
                !1;
                t(o), c(14, 0, "");
            }).catch(function(e) {
                var t = e.code, o = e.message;
                n(), c(14, t, "catch Error code:" + t + "message:" + o);
            });
        });
    },
    getTipsInfo: function(e, t) {
        return new h(function(n, o) {
            p.get({
                url: w.getTips,
                data: {
                    sku_id: e || 0,
                    callback: "getTipInfoCb"
                }
            }).then(function(e) {
                var a = e.body;
                e.header, 0 == a.iRet ? (1 == t && c(16, 0, "success"), n(a.data)) : (1 == t && c(16, a.iRet, "fail: " + a.iRet), 
                o());
            }).catch(function(e) {
                var n = e.code, a = e.message;
                1 == t && c(16, n, "catch Error code:" + n + "message:" + a), o();
            });
        });
    },
    getTuanPeopleNum: function(e) {
        return new h(function(t, n) {
            var o = {
                skuids: e.join(","),
                callback: "getTuanPeopleNumCb"
            };
            f.getLoginPromise().then(function(e) {
                p.get({
                    url: w.tuanNum,
                    data: o
                }).then(function(e) {
                    var o = e.body;
                    e.header, 0 == o.iRet ? (c(21, 0, "success"), t(o)) : (c(21, o.iRet, o.iRet), n());
                }).catch(function(e) {
                    var t = e.code;
                    c(21, t, "catch Error code:" + t + "message:" + e.message), n();
                });
            }).catch(function(e) {
                b.error(e);
            });
        });
    },
    getAdDetail: function(e) {
        return new h(function(t, n) {
            e ? (e.callback = "getAdDetailCb", p.get({
                url: w.adLink,
                data: e
            }).then(function(e) {
                var o = e.body;
                e.header, 0 == o.errCode ? (c(18, 0, "success"), t(o.list)) : (n(), c(18, o.errCode, "fail: " + o.errCode));
            }).catch(function(e) {
                var t = e.code, o = e.message;
                n(), c(18, t, "catch Error code:" + t + "message:" + o);
            })) : n();
        });
    },
    getMiaoshaSku: function(t) {
        return new h(function(n, o) {
            if (t && t.activeId) {
                var a = {
                    actid: t.activeId,
                    pi: t.pi || 1,
                    pc: t.pc || 20,
                    jdAddrId: e(),
                    cgid: t.cgid || "",
                    callback: "getMiaoshaSkuCb"
                };
                p.get({
                    url: w.miaosha,
                    data: a
                }).then(function(e) {
                    var a = e.body;
                    e.header, "0" == a.errCode ? c(19, 0, "success") : c(19, a.errCode, "errCode:" + a.errCode + "activeId:" + t.activeId), 
                    a && a.data && a.data.list && a.data.list.length > 0 ? n(a) : o();
                }).catch(function(e) {
                    var t = e.code, n = e.message;
                    o(), c(19, 1, "catch Error code:" + t + "message:" + n);
                });
            } else o();
        });
    },
    getSortData: function(e) {
        var t = "298";
        return e && e.proid && (t = e.proid), new h(function(e, n) {
            p.get({
                url: w.pgTabSort,
                data: {
                    proid: t,
                    callback: "getSortDataCb"
                }
            }).then(function(t) {
                var o = t.body;
                if (t.header, 0 == o.retcode && o.pro.length > 0) {
                    c(20, 0, "success");
                    var a = o.pro[0].floor;
                    e(a);
                } else c(20, o.retcode, "fail: " + o.retcode), n();
            }).catch(function(e) {
                var t = e.code, o = e.message;
                n(), c(20, t, "catch Error code:" + t + "message:" + o);
            });
        });
    },
    getSkuInfo: function(t) {
        return b.info("==>>_getSkuInfo"), new h(function(n, o) {
            if (t) {
                var a = {
                    area: e(),
                    u_source: "pingou"
                };
                Array.isArray(t) ? a.ids = t.join(",") : a.id = t, p.get({
                    url: w.skuInfo,
                    encoding: "GBK",
                    data: a
                }).then(function(e) {
                    var t = e.body;
                    e.header, b.info("==>>_getSkuInfo success", t), t ? (n(t), c(22, 0, "success")) : (o(), 
                    c(22, 1, "fail"));
                }).catch(function(e) {
                    var t = e.code, n = e.message;
                    b.info("==>>_getSkuInfo fail", t), o(), c(22, t, "catch Error code:" + t + "message:" + n);
                });
            } else o();
        });
    },
    getAutoTuanConfig: function() {
        return new h(function(e, t) {
            p({
                url: w.autoTuanConfig
            }).then(function(t) {
                var n = t.body, o = (t.header, n.data || []);
                e(o);
            }).catch(function(t) {
                t.code, t.message, e([]);
            });
        });
    },
    getIndexBannerConfig: function() {
        return new h(function(e, t) {
            p({
                url: w.indexBannerConfig
            }).then(function(t) {
                var n = t.body, o = (t.header, n.data || []);
                e(o);
            }).catch(function(t) {
                t.code, t.message, e([]);
            });
        });
    },
    getBairentuanBannerConfig: function() {
        return new h(function(e, t) {
            p({
                url: w.bairentuanBannerConfig
            }).then(function(t) {
                var n = t.body, o = (t.header, n.data || []);
                e(o);
            }).catch(function(t) {
                t.code, t.message, e([]);
            });
        });
    },
    getZiyingBannerConfig: function() {
        return new h(function(e, t) {
            p({
                url: w.ziyingBannerConfig
            }).then(function(t) {
                var n = t.body, o = (t.header, n.data || []);
                e(o);
            }).catch(function(t) {
                t.code, t.message, e([]);
            });
        });
    },
    getNewerTuanConfig: function() {
        return new h(function(e, t) {
            p({
                url: w.newerTuanConfig
            }).then(function(t) {
                var n = t.body, o = (t.header, n.data || []);
                e(o);
            }).catch(function(t) {
                t.code, t.message, e([]);
            });
        });
    },
    getNewerTuanInfo: function(e) {
        return new h(function(t, n) {
            p.get({
                url: w.getNewerTuanInfo,
                data: {
                    skuid: e,
                    callback: "getNewerTuanCb"
                }
            }).then(function(e) {
                var o = e.body;
                e.header, 0 == o.iRet ? (c(23, 0, "success"), t(o)) : (3 != o.iRet && c(23, o.iRet, "fail: " + o.iRet), 
                n());
            }).catch(function(e) {
                var t = e.code, o = e.message;
                n(), c(23, t, "catch Error code:" + t + "message:" + o);
            });
        });
    },
    getPingouSku: function(e) {
        return new h(function(t, n) {
            if (e && e.activeId) {
                var o = {
                    id: e.activeId,
                    offset: (e.pi - 1) * e.pc || 0,
                    count: e.pc || 20,
                    cgid: e.cgid || "",
                    unshowcgid: e.unshowcgid || "",
                    callback: "getPingouSkuCb"
                };
                p.get({
                    url: w.pingouData,
                    data: o
                }).then(function(o) {
                    var a = o.body;
                    if (o.header, "0" == a.errcode || "2002" == a.errcode || "4002" == a.errcode ? c(24, 0, "success") : c(24, a.errcode, "errCode:" + a.errcode + "activeId:" + e.activeId), 
                    a && a.data && a.data.length > 0) {
                        var r = [];
                        (a.data[0].list || []).forEach(function(e) {
                            if (e.dwRefPrice - e.dwRealTimePrice > 0) {
                                var t = [];
                                try {
                                    var n = e.sCopyWriting && e.sCopyWriting.trim();
                                    n && t.push(n);
                                    var o = e.sTag && e.sTag.trim();
                                    o && t.push(o);
                                } catch (e) {
                                    b.info(e);
                                }
                                var a = {
                                    skuUrl: e.sUrl,
                                    skuImg: v.getImg(e.sPicturesUrl || e.sBackUpPictures[0]),
                                    skuName: e.sProductName,
                                    skuPrice: e.dwRealTimePrice,
                                    skuPcPrice: e.dwRefPrice,
                                    skuId: e.ddwSkuId,
                                    cornerMark: e.sTag,
                                    desc: t,
                                    pps: v.getUrlParam("pps", e.sUrl)
                                };
                                a = Object.assign(e, a), r.push(a);
                            }
                        }), a.data[0].list = r, t(a);
                    } else "2002" == a.errcode || "4002" == a.errcode ? t(a) : n();
                }).catch(function(e) {
                    var t = e.code, o = e.message;
                    n(), c(24, t, "catch Error code:" + t + "message:" + o);
                });
            } else n();
        });
    },
    getMyCentTuanList: a,
    getDarenTuan: function(e) {
        return new h(function(t, n) {
            if (e && e.activeId) {
                var o = {
                    actid: e.activeId,
                    pi: e.pi || 0,
                    pc: e.pc || 20,
                    cgid: e.cgid || ""
                };
                p.get({
                    url: w.daRenTuan,
                    data: o,
                    cgiKey: e.cacheKey
                }).then(function(o) {
                    var a = o.body;
                    o.header, "0" == a.errCode ? c(26, 0, "success") : c(26, 1, "errCode:" + a.errCode + "activeId:" + e.activeId), 
                    a && a.data && a.data.list && a.data.list.length > 0 ? t(a) : n();
                }).catch(function(e) {
                    var t = e.code, o = e.message;
                    n(), c(26, 1, "catch Error code:" + t + "message:" + o);
                });
            } else n();
        });
    },
    getHotPin: function() {
        return new h(function(e, t) {
            var n = {
                callback: "jsonpCBKB"
            };
            p.get({
                url: w.hotTuan,
                data: n
            }).then(function(n) {
                var o = n.body;
                n.header, o && 2 == o.iRet ? f.login({
                    bj: !0
                }) : ("OK!" == o.errmsg ? c(19, 0, "success") : c(19, 1, "errCode:" + o.errCode), 
                o && o.data && o.data.length > 0 ? e(o) : t());
            }).catch(function(e) {
                var n = e.code, o = e.message;
                t(), c(19, 1, "catch Error code:" + n + "message:" + o);
            });
        });
    },
    getSmartData: function(e) {
        return new h(function(t, n) {
            if (e && e.activeId) {
                var o = {
                    id: e.activeId,
                    offset: e.offset || 0,
                    count: e.count || 20,
                    cgid: e.cgid || "",
                    unshowskus: e.unshowskus || "",
                    callback: "getSmartData"
                };
                p.get({
                    url: w.smartData,
                    data: o
                }).then(function(o) {
                    var a = o.body;
                    o.header, console.log(a), "0" == a.errcode ? (c(27, 0, "success"), t(a)) : (n(a), 
                    c(27, 1, "errCode:" + a.errcode + "activeId:" + e.activeId));
                }).catch(function(e) {
                    var t = e.code, o = e.message;
                    n(), c(27, 1, "catch Error code:" + t + "message:" + o);
                });
            } else n();
        });
    },
    getShowYfcjConfig: function() {
        return new h(function(e, t) {
            p({
                url: w.indexShowYfcjConfig
            }).then(function(t) {
                var n = t.body, o = (t.header, n.data || []);
                e(o);
            }).catch(function(t) {
                t.code, t.message, e([]);
            });
        });
    },
    checkServiceStatus: function(e) {
        var t = {
            url: w.checkChat,
            data: {
                pid: e,
                callback: "checkChat",
                t: Math.random() + ""
            }
        };
        return p.get(t).then(function(e) {
            return e.body.code;
        }).catch(function(e) {
            var t = e.code, n = e.message;
            return h.reject({
                code: t,
                message: n
            });
        });
    },
    setFormId: function(e) {
        return new h(function(t, n) {
            y().then(function() {
                p({
                    url: w.setFormId,
                    data: {
                        formId: e,
                        appId: getApp().appId,
                        businessType: "1",
                        callback: "jsonpCBKB"
                    }
                }).then(function(e) {
                    t(e.body && e.body.errcode);
                }).catch(function(e) {
                    var t = e.code, n = e.message;
                    return h.reject({
                        code: t,
                        message: n
                    });
                });
            }).catch(function(e, t) {
                return h.reject({
                    errcode: e,
                    errMsg: t
                });
            });
        });
    },
    getCurtainPpms: function(e) {
        return new h(function(e, t) {
            p({
                url: w.getCurtainPpms
            }).then(function(t) {
                var n = t.body, o = (t.header, n.data || []);
                e(o);
            }).catch(function(t) {
                t.code, t.message, e([]);
            });
        });
    },
    getMiandanConfig: function() {
        return new h(function(e, t) {
            p({
                url: w.miandanPPMS
            }).then(function(t) {
                var n = t.body, o = (t.header, n.data || []);
                e(o);
            }).catch(function(t) {
                t.code, t.message, e([]);
            });
        });
    },
    getMiandanInfo: function() {
        return new h(function(e, t) {
            f.doLogin().then(function() {
                p({
                    url: w.mandanRight,
                    data: {
                        platform: I,
                        callback: "maindanINfo"
                    }
                }).then(function(n) {
                    var o = n.body;
                    n.header, 0 == o.iRet ? e(o) : t(o);
                });
            }).catch(function() {
                t();
            });
        });
    },
    getVirtualStock: function(e) {
        return new h(function(t, n) {
            p({
                url: w.virtualStock,
                data: {
                    skuids: e,
                    callback: "virtualStock"
                }
            }).then(function(e) {
                var o = e.body;
                e.header, 0 == o.iRet ? t(o) : n();
            }).catch(function() {
                n();
            });
        });
    },
    itemAddFav: r,
    itemDelFav: i,
    itemCheckFav: u,
    getPpmsShareImg: function() {
        return new h(function(e, t) {
            p({
                url: w.shareImgConfig
            }).then(function(t) {
                var n = t.body, o = (t.header, n.data || []);
                e(o);
            }).catch(function(t) {
                t.code, t.message, e([]);
            });
        });
    },
    queryExtInfo: s,
    readyTuan: d
};