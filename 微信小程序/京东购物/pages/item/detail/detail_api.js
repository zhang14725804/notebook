function e() {
    var r = {
        callback: "verifyAuth"
    }, c = {
        url: l.VERIFY_AUTH_USER,
        data: r
    };
    return n(c).then(function(r) {
        var n = r.body;
        return -1 == n.retcode ? o.reject({
            message: "系统错误"
        }) : 13 == n.retcode ? s.doLogin().then(function() {
            return e();
        }) : 1 != n.status && 0 == n.retcode || 4 == n.retcode ? t().then(function(e) {
            return 0 == e.retcode && (n.url = "https:" + e.redirect), o.resolve(n);
        }) : o.resolve(n);
    }).catch(function(e) {
        return o.reject(e);
    });
}

function t() {
    var e = {
        scene: "weixin",
        bussinessType: "535",
        rurl: "/pages/item/detail/detail"
    }, t = {
        url: l.VERIFYAUTHURL,
        data: e
    };
    return n(t).then(function(e) {
        var t = e.body;
        e.header;
        return 0 == t.retcode ? o.resolve(t) : o.reject({
            code: t.retcode
        });
    }).catch(function(e) {
        var t = e.code, r = e.message;
        return o.reject({
            code: t,
            message: r
        });
    });
}

function r(e, t) {
    var c = {
        expectPin: d.base64encode(encodeURIComponent(e)),
        fromtype: "x",
        sceneid: "521392394",
        atk: 9,
        rurl: t
    }, a = {
        url: l.SWITCH_PIN,
        data: c
    };
    return n(a).then(function(e) {
        var t = e.body;
        return 13 == t.retcode ? s.doLogin().then(function() {
            r();
        }) : 0 == t.retcode ? o.resolve({
            code: 0,
            message: "切换成功"
        }) : o.reject({
            code: t.retcode,
            message: t.errmsg
        });
    }).catch(function(e) {
        var t = e.code, r = e.message;
        return o.reject({
            code: t,
            message: r
        });
    });
}

var o = require("../../../libs/promise.min.js"), n = require("../../../common/request/request.js"), c = require("../../../common/fe_helper.js"), a = require("../../../common/cookie-v2/cookie.js"), s = require("../../../common/login/login.js"), i = require("../../../common/utils.js"), d = require("../../../common/base64/base64"), u = require("../constant").REObj, l = {
    ITEM_ADD_FAV: "https://wq.jd.com/fav/comm/FavCommAdd",
    ITEM_DEL_FAV: "https://wq.jd.com/fav/comm/FavCommDel",
    ITEM_CHECK_FAV: "https://wq.jd.com/fav/comm/FavManyCommQuery",
    SHOP_CHECK_FAV: "https://wq.jd.com/fav/shop/QueryOneShopFav",
    SHOP_ADD_FAV: "https://wq.jd.com/fav/shop/AddShopFav",
    SHOP_DEL_FAV: "https://wq.jd.com/fav/shop/DelShopFav",
    CHECK_SERVICE_STATUS: "https://chat1.jd.com/api/checkChat",
    GUESS_YOU_LIKE: "https://wq.jd.com/mcoss/reclike/getrecinfo",
    SUBSCRIBE_ITEM: "https://wq.jd.com/bases/yuyue/item",
    VERIFY_AUTH_USER: "https://wq.jd.com/vipplus/VerifyAuthUser",
    VERIFYAUTHURL: "https://wq.jd.com/vipplus/LoginBrigdeAuthName",
    QUERY_PIN_STATUS: "https://wq.jd.com/pinbind/QueryPinStatus",
    SWITCH_PIN: "https://wq.jd.com/pinbind/switchAccount",
    ANSWER_LIST: "https://wq.jd.com/questionanswer/GetSkuQuestionListWeChat",
    CATEGORY_LIST: "https://wq.jd.com/commodity/peijian/categorylist",
    ADDRESS_LIST: "https://wq.jd.com/deal/recvaddr/getrecvaddrlistV3"
}, m = 760, h = [ {
    regs: u.PCDetail,
    type: "item"
}, {
    regs: u.MDetail,
    type: "item"
}, {
    regs: u.WQDetail,
    type: "item"
} ], f = getApp().appId;

module.exports = {
    itemAddFav: function(e, t) {
        function r() {
            var r = {
                url: l.ITEM_ADD_FAV,
                data: {
                    commId: e,
                    category: t,
                    callback: "addFav",
                    t: Math.random() + ""
                },
                ump: {
                    bizId: m,
                    opId: 4
                }
            };
            return n.get(r).then(function(e) {
                var t = e.body;
                return 0 == t.iRet || 3 == t.iRet || 2 == t.iRet && o.reject({
                    code: 2,
                    message: "收藏商品已达上限"
                });
            }).catch(function(e) {
                var t = e.code, r = e.message;
                o.reject({
                    code: t,
                    message: r
                });
            });
        }
        return s.isLogin() ? r() : s.afterLogin(r);
    },
    itemDelFav: function(e, t) {
        var r = {
            url: l.ITEM_DEL_FAV,
            data: {
                commId: e,
                shopId: t,
                callback: "cancelFav",
                t: Math.random() + ""
            },
            ump: {
                bizId: m,
                opId: 5
            }
        };
        return n.get(r).then(function(e) {
            return 0 != e.body.iRet;
        }).catch(function(e) {
            var t = e.code, r = e.message;
            o.reject({
                code: t,
                message: r
            });
        });
    },
    itemCheckFav: function(e, t) {
        var r = {
            url: l.ITEM_CHECK_FAV,
            data: {
                commId: e.join(","),
                shopId: t,
                callback: "checkFav",
                t: Math.random() + ""
            }
        };
        return n.get(r).then(function(e) {
            var t = e.body;
            return 0 == t.iRet && 1 == t.data[0].state;
        }).catch(function(e) {
            var t = e.code, r = e.message;
            return o.reject({
                code: t,
                message: r
            });
        });
    },
    shopCheckFav: function(e) {
        if (!e || "0" == e) return o.resolve(!1);
        var t = {
            url: l.SHOP_CHECK_FAV,
            data: {
                venderId: e,
                callback: "checkFavShop",
                t: Math.random() + ""
            }
        };
        return n.get(t).then(function(e) {
            var t = e.body;
            return 0 == t.iRet && 1 == t.state;
        }).catch(function(e) {
            var t = e.code, r = e.message;
            return o.reject({
                code: t,
                message: r
            });
        });
    },
    shopAddFav: function(e) {
        function t() {
            var t = {
                url: l.SHOP_ADD_FAV,
                data: {
                    venderId: e,
                    callback: "addShopFav",
                    t: Math.random() + ""
                }
            };
            return n.get(t).then(function(e) {
                return 0 == e.body.iRet;
            }).catch(function(e) {
                var t = e.code, r = e.message;
                return o.reject({
                    code: t,
                    message: r
                });
            });
        }
        return s.isLogin() ? t() : s.doLogin(t);
    },
    shopDelFav: function(e) {
        var t = {
            url: l.SHOP_DEL_FAV,
            data: {
                venderId: e,
                callback: "delShopFav",
                t: Math.random() + ""
            }
        };
        return n.get(t).then(function(e) {
            var t = e.body;
            return 0 != t.iRet && 20 != t.iRet;
        }).catch(function(e) {
            var t = e.code, r = e.message;
            return o.reject({
                code: t,
                message: r
            });
        });
    },
    checkServiceStatus: function(e) {
        var t = {
            url: l.CHECK_SERVICE_STATUS,
            data: {
                pid: e,
                callback: "checkChat",
                t: Math.random() + ""
            }
        };
        return n.get(t).then(function(e) {
            return e.body.code;
        }).catch(function(e) {
            var t = e.code, r = e.message;
            return o.reject({
                code: t,
                message: r
            });
        });
    },
    checkURL: function(e) {
        return h.push({
            regs: u.wqUrls,
            type: "shop"
        }), "false" == e.isBlockBabelURL && h.push({
            regs: u.babelUrls,
            type: "babel"
        }), "false" == e.isBlockJShopURL && h.push({
            regs: u.JshopUrls,
            type: "Jshop"
        }), function(e) {
            var t = !0, r = !1, o = void 0;
            try {
                for (var n, c = h[Symbol.iterator](); !(t = (n = c.next()).done); t = !0) {
                    var a = n.value, s = !0, i = !1, d = void 0;
                    try {
                        for (var u, l = a.regs[Symbol.iterator](); !(s = (u = l.next()).done); s = !0) {
                            var m = u.value.exec(e);
                            if (m) return {
                                type: a.type,
                                id: m[1]
                            };
                        }
                    } catch (e) {
                        i = !0, d = e;
                    } finally {
                        try {
                            !s && l.return && l.return();
                        } finally {
                            if (i) throw d;
                        }
                    }
                }
            } catch (e) {
                r = !0, o = e;
            } finally {
                try {
                    !t && c.return && c.return();
                } finally {
                    if (r) throw o;
                }
            }
            return !1;
        };
    },
    guessYouLike: function(e, t, r) {
        var s = a.getCookie("open_id") || "", d = {
            url: l.GUESS_YOU_LIKE,
            data: {
                recpos: t ? "10251" : "10250",
                pc: 30,
                hi: s,
                sku: e,
                c1: r[0],
                c2: r[1],
                c3: r[2],
                callback: "guessYouLike",
                t: Math.random() + ""
            },
            ump: {
                bizId: m,
                opId: 7,
                reportHook: function(e) {
                    return {
                        code: e.success ? 0 : 1,
                        message: e.error_msg
                    };
                }
            }
        };
        return n.get(d).then(function(e) {
            var t = e.body;
            if (!0 === t.success && t.data && t.data.length) {
                var r = "1", o = t.data.map(function(e) {
                    return e.skuName = e.t, e.price = parseFloat(e.jp / 100).toFixed(2), e.showPrice = e.price.split("."), 
                    e.isPingou = 6 == e.paicon, e.img = c.getImg(e.img, 250), e;
                }), n = {
                    type: "more"
                };
                return o.length >= 30 && (o.pop(), o.push(n)), o.length <= 3 && (r = "2"), {
                    list: i.chunk(i.chunk(o, 3), 2),
                    style: r,
                    impr: t.impr
                };
            }
            return [];
        }).catch(function(e) {
            var t = e.code, r = e.message;
            o.reject({
                code: t,
                message: r
            });
        });
    },
    subscribeItem: function(e) {
        var t = {
            dataType: 1,
            appid: f,
            skuId: e
        }, r = {
            url: l.SUBSCRIBE_ITEM,
            data: t,
            ump: {
                bizId: m,
                opId: 10
            }
        };
        return n(r).then(function(e) {
            var t = e.body;
            if (t.retCode) return o.reject({
                message: t.retMsg
            });
            if (t.list.length) {
                var r = t.list[0];
                return o.resolve(r);
            }
        }).catch(function(e) {
            o.reject(e);
        });
    },
    verifyAuth: e,
    verifyAuthUrl: t,
    queryPinStatus: function() {
        var e = {
            source: 2
        }, t = {
            url: l.QUERY_PIN_STATUS,
            data: e
        };
        return s.getLoginPromise().then(function(e) {
            return n(t).then(function(e) {
                var t = e.body;
                return e.header, 0 == t.errcode ? o.resolve(t) : 13 == t.errcode ? (s.doLogin(), 
                o.reject({
                    code: t.errcode,
                    message: "活动太火爆了，请稍后重试~"
                })) : o.reject({
                    code: t.errcode,
                    message: t.errmsg
                });
            }).catch(function(e) {
                var t = e.code, r = e.message;
                return o.reject({
                    code: t,
                    message: r
                });
            });
        }).catch(function(e) {
            return o.reject({
                code: e,
                message: "活动太火爆了，请稍后重试~"
            });
        });
    },
    switchPin: r,
    getAnswerList: function(e) {
        var t = {
            callback: "askAnswerCB",
            productId: e,
            t: Math.random() + ""
        }, r = {
            url: l.ANSWER_LIST,
            data: t
        };
        return n(r).then(function(e) {
            var t = e.body;
            if (console.log("问答列表限制"), console.log(t), 0 == t.resultCode) {
                var r = t.result && t.result.questionList || [];
                return r = r.slice(0, 2), r = r.map(function(e) {
                    return i.only(e, "content answerCount");
                }), o.resolve(r);
            }
            return o.resolve([]);
        }).catch(function(e) {
            var t = e.code, r = e.message;
            return o.reject({
                code: t,
                message: r
            });
        });
    },
    getAddressList: function() {
        var e = {
            url: l.ADDRESS_LIST,
            data: {
                callback: "detailAddressCallback"
            },
            ump: {
                bizId: m,
                opId: 11
            }
        };
        return new o(function(t, r) {
            n(e).then(function(e) {
                var o = e.body;
                0 != o.errCode ? r({
                    code: o.errCode,
                    message: o.msg
                }) : t(o);
            }).catch(function(e) {
                o.reject(e);
            });
        });
    },
    getEasyBuyInfo: function(e) {
        var t = e.category || [];
        if (t.length) {
            var r = t[0], c = t[1], a = t[2];
            return n({
                url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33252.jsonp"
            }).then(function(t) {
                var n = [];
                return t.body.data.forEach(function(t) {
                    var o = "" === t.cid1s && "" === t.cid2s && "" === t.cid3s && "" === t.brandId;
                    if ((~t.cid1s.indexOf(r) || ~t.cid2s.indexOf(c) || ~t.cid3s.indexOf(a) || o) && (t.brandId && ~t.brandId.indexOf(e.brandId) || !t.brandId) && "isOverseaPurchase" === t.specMark && (!t.specMarkVal || ~t.specMarkVal.indexOf(e.isOverseaPurchase))) {
                        var s = i.only(t, [ "cid1s", "cid2s", "cid3s", "icon", "describe", "describeColor", "background", "link", "exposureRd", "clickRd" ]);
                        n.push(s);
                    }
                }), o.resolve(n);
            }).catch(function(e) {
                return o.reject(e);
            });
        }
    },
    getAccessorieInfo: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        if (e && t.length) {
            var r = {
                sku: e,
                source: "item",
                cat: t[2],
                callback: "categoryCB",
                t: Math.random() + ""
            };
            return n({
                url: "https://wq.jd.com/commodity/peijian/categorylist",
                data: r
            }).then(function(e) {
                var t = e.body;
                if (0 == t.errcode) {
                    var r = t.data, n = [];
                    return r && r.category && Array.isArray(r.category) && (r.category = r.category.filter(function(e) {
                        return e.itemLogoUrl && e.name;
                    }), r.category.forEach(function(e) {
                        e.itemLogoUrl = c.getImg(e.itemLogoUrl);
                        var t = i.only(e, [ "itemLogoUrl", "name", "id", "thirdCatId", "thirdCatName" ]);
                        n.push(t);
                    })), o.resolve(n);
                }
                return o.reject({
                    code: t.errcode,
                    message: t.msg
                });
            }).catch(function(e) {
                console.error("err", e);
            });
        }
    },
    getAlloverImg: function(e) {
        return n({
            url: "https://wq.jd.com/commodity/extension/alloverimg",
            data: {
                skuid: e
            }
        }).then(function(t) {
            var r = t.body;
            if (0 == r.errcode) {
                var n = "https://wqs.jd.com/item/panorama.shtml?skuId=" + e;
                return o.resolve({
                    url: n
                });
            }
            return o.reject({
                code: r.errcode,
                message: r.errmsg
            });
        }).catch(function(e) {
            return o.reject(e);
        });
    },
    getDetailVideo: function(e) {
        if (e) return n({
            url: "https://wq.jd.com/commodity/extension/getplayurl",
            data: {
                vid: e,
                type: "1",
                callback: "callback"
            }
        }).then(function(e) {
            var t = e.body;
            if (0 == t.errcode) {
                var r = {
                    low: 1,
                    high: 2,
                    yuanhua: 3
                }, n = {};
                if (Array.isArray(t.result.data)) {
                    var c = t.result.data.filter(function(e) {
                        return e && e.main_url;
                    }).sort(function(e, t) {
                        return r[e.sharpness] - r[t.sharpness];
                    })[0], a = t.result.imageUrls[0], s = c.main_url;
                    n = {
                        cover: a = ~a.indexOf("https:") ? a : a.replace("http:", "https:"),
                        url: s = ~s.indexOf("https:") ? s : s.replace("http:", "https:")
                    };
                }
                return o.resolve(n);
            }
        }).catch(function(e) {
            return o.reject(e);
        });
    },
    getItemMedia: function(e) {
        return n({
            url: "https://wq.jd.com/commodity/extension/get3dimage",
            data: {
                sku: e,
                callback: "mediaCallback"
            }
        }).then(function(e) {
            var t = e.body;
            return 0 == t.errcode && 2 == t.data.videoType ? o.resolve({
                url: t.data.videoPath
            }) : o.reject({
                code: t.errcode,
                message: t.errmsg
            });
        }).catch(function(e) {
            return o.reject(e);
        });
    },
    checkEbookStatus: function(e) {
        if (e) return n({
            url: "https://gw-e.jd.com/forBookCode/forBookCode_getBathEbookIdForJs.action",
            data: {
                bookCode: e,
                callback: "eBookUrlCB"
            }
        }).then(function(e) {
            var t = e.body;
            if (1 == t.code && t.info && t.info.length) {
                var r = t.info[0].ebookId;
                if (r) {
                    var n = "https://e-m.jd.com/ebook/read/" + r + "-0-1.html?sid=&source=wxsq";
                    return o.resolve({
                        url: n
                    });
                }
            }
            return o.resolve({});
        }).catch(function(e) {
            return o.resolve(e);
        });
    },
    getAccessoriesList: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        if (e.length) {
            var t = "|" + e[0] + "|", r = "|" + e[1] + "|", c = "|" + e[2] + "|";
            return n({
                url: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33316.jsonp"
            }).then(function(e) {
                var n = [];
                return e.body.data.forEach(function(e) {
                    if (e.cid1s && ~e.cid1s.indexOf(t) || e.cid2s && ~e.cid2s.indexOf(r) || e.cid3s && ~e.cid3s.indexOf(c)) {
                        var o = i.only(e, [ "cid1s", "cid2s", "cid3s", "enterText", "title" ]);
                        n.push(o);
                    }
                }), o.resolve(n);
            }).catch(function(e) {
                return o.reject(e);
            });
        }
    }
};