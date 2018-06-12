function e(e, r, t) {
    this.success = function(e) {
        if (console.log("result", e), "string" == typeof e) try {
            e = e.replace(/(\:\s*\".*?)(\")(?=.*\")/g, "$1\\$2"), e = JSON.parse(e);
        } catch (e) {
            var o = {
                errCode: p.RET_HTTP_RESPONSE_ERROR,
                errMsg: s(p.RET_HTTP_RESPONSE_ERROR)
            };
            t(o);
        }
        if (0 != e.retcode) return e.errCode = p.RET_HTTP_RESPONSE_ERROR, e.errMsg = s(e.errCode), 
        void t(e);
        for (var a = e.data, i = a.searchm.Paragraph || [], n = [], c = 0, l = i.length; c < l; ++c) (C = i[c]).Content.warename = C.Content.warename.replace(/\<[^\>]*\>/g, ""), 
        C.imageurl = "http://img1" + C.wareid % 5 + ".360buyimg.com/n2/" + C.Content.imageurl, 
        C.dredisprice = (1 * C.dredisprice).toFixed(2), n.push(C);
        var d = {};
        if (d.itemList = n, r) {
            var u = [];
            if (a && a.searchm && "ObjExtAttrCollection" in a.searchm && ("" != a.searchm.ObjExtAttrCollection && (u = a.searchm.ObjExtAttrCollection), 
            [ "品牌", "价格", "颜色", "价位", "颜色分类" ].forEach(function(e) {
                u.map(function(r, t) {
                    r.expandsortname == e && u.splice(t, 1);
                });
            }), u = u.map(function(e) {
                var r = e.valueid.split(";").filter(function(e) {
                    return e;
                }), t = e.valuename.split(";").filter(function(e) {
                    return e;
                }), o = [];
                return r.forEach(function(e, r) {
                    o.push({
                        valueid: e,
                        valuename: t[r]
                    });
                }), {
                    expandsortname: e.expandsortname,
                    expandsortid: e.expandsortid,
                    sortorder: e.sortorder,
                    selected: [],
                    valueitem: o,
                    type: "ext",
                    isTap: !0
                };
            })), a && a.searchm && a.searchm.ObjB_TextCollection) {
                if ("brand" in a.searchm.ObjB_TextCollection && "" != a.searchm.ObjB_TextCollection.brand.value) {
                    var h = [];
                    a.searchm.ObjB_TextCollection.brand.value.split("|=|").filter(function(e) {
                        return e;
                    }).forEach(function(e, r) {
                        h.push({
                            valueid: "0000",
                            valuename: e
                        });
                    }), u.push({
                        expandsortname: "品牌",
                        expandsortid: "brand_0001",
                        sortorder: a.searchm.ObjB_TextCollection.brand.sortorder,
                        selected: [],
                        valueitem: h,
                        type: "brand",
                        isTap: !0
                    });
                }
                if ("exp_size" in a.searchm.ObjB_TextCollection && "" != a.searchm.ObjB_TextCollection.exp_size.value) {
                    var m = [];
                    a.searchm.ObjB_TextCollection.exp_size.value.split(";").filter(function(e) {
                        return e;
                    }).forEach(function(e, r) {
                        m.push({
                            valueid: "0000",
                            valuename: e
                        });
                    }), u.push({
                        expandsortname: "尺码/尺寸",
                        expandsortid: "exp_size_0001",
                        sortorder: a.searchm.ObjB_TextCollection.exp_size.sortorder,
                        selected: [],
                        valueitem: m,
                        type: "exp_size",
                        isTap: !0
                    });
                }
                if ("exp_color" in a.searchm.ObjB_TextCollection && "" != a.searchm.ObjB_TextCollection.exp_color.value) {
                    var f = [];
                    a.searchm.ObjB_TextCollection.exp_color.value.split(";").filter(function(e) {
                        return e;
                    }).forEach(function(e, r) {
                        f.push({
                            valueid: "0000",
                            valuename: e
                        });
                    }), u.push({
                        expandsortname: "颜色",
                        expandsortid: "exp_color_0001",
                        sortorder: a.searchm.ObjB_TextCollection.exp_color.sortorder,
                        selected: [],
                        valueitem: f,
                        type: "exp_color",
                        isTap: !0
                    });
                }
            }
            u.sort(function(e, r) {
                return e.sortorder - r.sortorder;
            });
            var _ = [], v = [], g = [], T = {}, E = {};
            a.searchm && a.searchm.ObjCollection && (_ = a.searchm.ObjCollection.cid2 || [], 
            v = a.searchm.ObjCollection.catid || []);
            for (var c = 0, l = _.length; c < l; ++c) T[(y = _[c]).Classification] = {
                id: y.Classification,
                name: y.Name,
                childs: []
            };
            for (var b = 0, l = v.length; b < l; ++b) {
                var C = v[b], R = C.Name;
                T[C.FClassification] && T[C.FClassification].childs.push({
                    id: C.Classification,
                    name: C.Name
                }), E[R] || (E[R] = C.Classification);
            }
            for (var c = 0, l = _.length; c < l; ++c) {
                var y = _[c], O = T[y.Classification];
                O && g.push(O);
            }
            d.comonList = u, d.cid2List = g, x = a.searchm.ObjC_NumberCollection.vender_id;
        }
        a.searchm.Head.Summary.Page && (d.pageIndex = a.searchm.Head.Summary.Page.PageIndex || "", 
        d.pageCount = a.searchm.Head.Summary.Page.PageCount || ""), d.resultCount = a.searchm.Head.Summary.OrgSkuCount || "";
        var j = {
            "京东物流": !0,
            "有货优先": !0,
            "货到付款": !0,
            "全球购商品": !0,
            "促销商品": !0
        };
        d.filter = j, d.pageIndex = a.searchm.Head.Summary.Page.PageIndex, d.pageCount = a.searchm.Head.Summary.Page.PageCount, 
        d.resultCount = a.searchm.Head.Summary.OrgSkuCount, d.isStock = "true", t("", d);
    }, this.fail = function(e) {
        t(c(e));
    };
}

function r(e) {
    this.success = function(r) {
        if ("string" == typeof r) try {
            r = r.replace(/(\:\s*\".*?)(\")(?=.*\")/g, "$1\\$2"), r = JSON.parse(r);
        } catch (r) {
            var t = {
                errCode: p.RET_HTTP_RESPONSE_ERROR,
                errMsg: s(p.RET_HTTP_RESPONSE_ERROR)
            };
            e(t);
        }
        if (0 != r.retcode) return r.errCode = p.RET_HTTP_RESPONSE_ERROR, r.errMsg = s(r.errCode), 
        void e(r);
        var o = {}, a = r.data, i = [];
        if (a && a.searchm && "ObjExtAttrCollection" in a.searchm && ("" != a.searchm.ObjExtAttrCollection && (i = a.searchm.ObjExtAttrCollection), 
        [ "品牌", "价格", "颜色", "价位", "颜色分类" ].forEach(function(e) {
            i.map(function(r, t) {
                r.expandsortname == e && i.splice(t, 1);
            });
        }), i = i.map(function(e) {
            var r = e.valueid.split(";").filter(function(e) {
                return e;
            }), t = e.valuename.split(";").filter(function(e) {
                return e;
            }), o = [];
            return r.forEach(function(e, r) {
                o.push({
                    valueid: e,
                    valuename: t[r]
                });
            }), {
                expandsortname: e.expandsortname,
                expandsortid: e.expandsortid,
                sortorder: e.sortorder,
                selected: [],
                valueitem: o,
                type: "ext",
                isTap: !0
            };
        })), a && a.searchm && a.searchm.ObjB_TextCollection) {
            if ("brand" in a.searchm.ObjB_TextCollection && "" != a.searchm.ObjB_TextCollection.brand.value) {
                var n = [];
                a.searchm.ObjB_TextCollection.brand.value.split("|=|").filter(function(e) {
                    return e;
                }).forEach(function(e, r) {
                    n.push({
                        valueid: "0000",
                        valuename: e
                    });
                }), i.push({
                    expandsortname: "品牌",
                    expandsortid: "brand_0001",
                    sortorder: a.searchm.ObjB_TextCollection.brand.sortorder,
                    selected: [],
                    valueitem: n,
                    type: "brand",
                    isTap: !0
                });
            }
            if ("exp_size" in a.searchm.ObjB_TextCollection && "" != a.searchm.ObjB_TextCollection.exp_size.value) {
                var c = [];
                a.searchm.ObjB_TextCollection.exp_size.value.split(";").filter(function(e) {
                    return e;
                }).forEach(function(e, r) {
                    c.push({
                        valueid: "0000",
                        valuename: e
                    });
                }), i.push({
                    expandsortname: "尺码/尺寸",
                    expandsortid: "exp_size_0001",
                    sortorder: a.searchm.ObjB_TextCollection.exp_size.sortorder,
                    selected: [],
                    valueitem: c,
                    type: "exp_size",
                    isTap: !0
                });
            }
            if ("exp_color" in a.searchm.ObjB_TextCollection && "" != a.searchm.ObjB_TextCollection.exp_color.value) {
                var l = [];
                a.searchm.ObjB_TextCollection.exp_color.value.split(";").filter(function(e) {
                    return e;
                }).forEach(function(e, r) {
                    l.push({
                        valueid: "0000",
                        valuename: e
                    });
                }), i.push({
                    expandsortname: "颜色",
                    expandsortid: "exp_color_0001",
                    sortorder: a.searchm.ObjB_TextCollection.exp_color.sortorder,
                    selected: [],
                    valueitem: l,
                    type: "exp_color",
                    isTap: !0
                });
            }
        }
        i.sort(function(e, r) {
            return e.sortorder - r.sortorder;
        });
        var d = [], u = [], h = [], m = {}, f = {};
        a.searchm && a.searchm.ObjCollection && (d = a.searchm.ObjCollection.cid2 || [], 
        u = a.searchm.ObjCollection.catid || []);
        for (var _ = 0, v = d.length; _ < v; ++_) m[(E = d[_]).Classification] = {
            id: E.Classification,
            name: E.Name,
            childs: []
        };
        for (var g = 0, v = u.length; g < v; ++g) {
            var x = u[g], T = x.Name;
            m[x.FClassification] && m[x.FClassification].childs.push({
                id: x.Classification,
                name: x.Name
            }), f[T] || (f[T] = x.Classification);
        }
        for (var _ = 0, v = d.length; _ < v; ++_) {
            var E = d[_], b = m[E.Classification];
            b && h.push(b);
        }
        o.comonList = i, o.cid2List = h, o.isStock = "true", e("", o);
    }, this.fail = function(r) {
        e(c(r));
    };
}

function t(e, r, o) {
    this.success = function(a) {
        var i = this;
        if ("string" == typeof a) try {
            a = a.replace(/(\:\s*\".*?)(\")(?=.*\")/g, "$1\\$2"), a = JSON.parse(a);
        } catch (e) {
            var n = {
                errCode: p.RET_HTTP_RESPONSE_ERROR,
                errMsg: s(p.RET_HTTP_RESPONSE_ERROR)
            };
            o(n);
        }
        if ("13" === a.errId) m.doLogin().then(function() {
            t(e, o);
        }).catch(function(e, r) {
            i.fail(r);
        }); else if (0 != a.errId) return a.errCode = p.RET_HTTP_RESPONSE_ERROR, a.errMsg = s(a.errId), 
        void o(a);
        if (a.cart && a.cart.venderCart) {
            for (var c, l = a.cart.venderCart || [], d = "", u = [], h = {}, f = !1, _ = 0, v = l.length; _ < v; _++) {
                if ((c = l[_]).mzsuits && c.mzsuits.length > 0) for (var g, x = 0, T = c.mzsuits.length; x < T; x++) g = c.mzsuits[x], 
                !d && g.promotion && g.promotion.pid == r && (d = g, f = function(r) {
                    var t = !1;
                    if (r.products && r.products.length) for (var o = 0, a = r.products.length; o < a; o++) if (r.products[o].mainSku.id === e) {
                        t = !0;
                        break;
                    }
                    return t;
                }(g));
                if (d) break;
            }
            d && (u = (d.manGiftSkus || []).filter(function(e) {
                return e && "2" === e.giftSelectState;
            })), h.giftSkus = u, h.isInCart = f, o("", h);
        } else o({
            errCode: 1,
            errMsg: "数据返回不完整"
        });
    }, this.fail = function(e) {
        o(c(e));
    };
}

function o(e) {
    this.success = function(r) {
        if ("string" == typeof r) try {
            r = r.replace(/(\:\s*\".*?)(\")(?=.*\")/g, "$1\\$2"), r = JSON.parse(r);
        } catch (r) {
            var t = {
                errCode: p.RET_HTTP_RESPONSE_ERROR,
                errMsg: s(p.RET_HTTP_RESPONSE_ERROR)
            };
            e(t);
        }
        if (0 != r.errId) return r.errCode = p.RET_HTTP_RESPONSE_ERROR, r.errMsg = s(r.errId), 
        void e(r);
        var o = r.cart;
        e("", o);
    }, this.fail = function(r) {
        e(c(r));
    };
}

function a(e, r, t) {
    e = e || "", r = r || [];
    var o = [], a = h.getUserAddressID(), n = {};
    e ? (o = [ e, "", "1", e, "13," + g + ",0", "", "", "", r.join("_") ], n = {
        type: 0,
        scene: 8,
        reg: 1,
        commlist: o.join(","),
        locationid: a
    }) : (r.forEach(function(e) {
        o.push([ e, "0", "1", e, "15," + g + ",0" ].join(","));
    }), n = {
        type: 1,
        scene: 0,
        action: 0,
        commlist: o.join("$"),
        locationid: a
    }), f.get("3c_shop", "").then(function(e) {
        var o = e.id || "";
        o && (n.shopid = o), d.get({
            url: "http://wqdeal1.jd.com/deal/mshopcart/addcmdy",
            data: n,
            callback: new i(r, t)
        });
    });
}

function i(e, r) {
    this.success = function(t) {
        var o = this;
        if ("string" == typeof t) try {
            t = t.replace(/(\:\s*\".*?)(\")(?=.*\")/g, "$1\\$2"), t = JSON.parse(t);
        } catch (e) {
            var i = {
                errCode: p.RET_HTTP_RESPONSE_ERROR,
                errMsg: s(p.RET_HTTP_RESPONSE_ERROR)
            };
            r(i);
        }
        var n = t.errId;
        "13" === n ? m.doLogin().then(function() {
            a(e, r);
        }).catch(function(e, r) {
            o.fail(r);
        }) : "0" === n ? r(null, !0) : r({
            errCode: n,
            errMsg: t.errMsg
        });
    }, this.fail = function(e) {
        r(c(e));
    };
}

function n(e) {
    this.success = function(r) {
        0 == r.errcode && 0 != r.data.length || e("getShopInfo error or no datas");
        var t = r.data[0];
        "0" == t.shopId ? e("default shop") : (t.venderId = x, e("", t));
    }, this.fail = function(r) {
        e(c(r));
    };
}

function s(e) {
    var r = "";
    switch (e) {
      case p.RET_HTTP_RESPONSE_ERROR:
        r = p.Text_RET_HTTP_RESPONSE_ERROR;
        break;

      case p.RET_WS_CONNECT_ERROR:
        r = p.Text_RET_WS_CONNECT_ERROR;
        break;

      case p.RET_WS_REQUEST_TIMEOUT:
        r = p.Text_RET_WS_REQUEST_TIMEOUT;
    }
    return r;
}

function c(e) {
    return "string" == typeof e ? {
        errCode: e,
        errMsg: s(e)
    } : e;
}

function l(e, r, t, o) {
    var a = {
        batchid: e,
        source: "mergecoupon",
        venderid: r,
        couponkind: t,
        t: Math.random()
    };
    u({
        url: "https://wq.jd.com/deal/mergeorder/mergecouponorder",
        method: "GET",
        data: a
    }).then(function(a) {
        var i = a.body;
        "13" === i.errId ? m.doLogin().then(function() {
            l(e, r, t, o);
        }).catch(function(e, r) {
            o(c(res));
        }) : o("", i);
    }).catch(function(e) {
        o(c(e));
    });
}

var d = require("../../common/http_json.js"), u = require("../../common/request/request.js"), p = require("../../common/http_constant"), h = require("../../common/user_info.js"), m = require("../../common/login/login.js"), f = require("../../common/localStorage.js"), _ = require("../../libs/promise.min.js"), v = (require("../../common/cookie-v2/cookie.js"), 
""), g = "", x = "", T = "", E = "https://wqsou.jd.com/search/searchcowxapp", b = "https://wq.jd.com/search/searchprwxapp", C = !1;

module.exports = {
    getSearchResult: function(r, t) {
        h.initUserData();
        var o = r.keyword || "", a = r.coupon_kind || "", i = r.coupon_shopid || "", n = r.page || 1, s = r.size || 20, c = r.isFirstLoad || !1, l = "";
        v = r.coupon_batch || "", g = r.activity_id || "", v || g || t({
            errCode: 1,
            errMsg: "缺少关键参数"
        });
        var u = "";
        r.sortType && ("sales" == r.sortType && (u = "sort_totalsales15_desc"), "price_desc" == r.sortType && (u = "sort_dredisprice_desc"), 
        "price_asc" == r.sortType && (u = "sort_dredisprice_asc"));
        var p = "";
        if (r.extendFields) {
            var m = [];
            r.extendFields.forEach(function(e) {
                if ("ext" == e.type) {
                    if (e.selected.length > 0) {
                        var t = [];
                        e.selected.map(function(e) {
                            t.push(e.valueid);
                        }), m.push(t.join("||") + "::" + e.expandsortid);
                    }
                } else "brand" == e.type ? (r.brand = [], e.selected.forEach(function(e) {
                    r.brand.push(e.valuename);
                })) : "exp_size" == e.type ? (r.sizes = [], e.selected.forEach(function(e) {
                    r.sizes.push(e.valuename);
                })) : "exp_color" == e.type && (r.colors = [], e.selected.forEach(function(e) {
                    r.colors.push(e.valuename);
                }));
            }), m.length > 0 && (p += "expand_name," + m.join("^^"));
        }
        var f = 0, _ = "", x = "";
        if (r.brand && (1 == r.brand.length && (x = x + "brand,," + r.brand + ";;"), r.brand.length > 1)) {
            for (var C = "[(]", R = 0; R < r.brand.length; R++) C = C + "brand,," + r.brand[R], 
            R == r.brand.length - 1 ? C += "[)]" : C += "[|]";
            x = C, f++;
        }
        var y = "";
        if (r.sizes && (1 == r.sizes.length && (y = y + "exp_size,," + r.sizes + ";;"), 
        r.sizes.length > 1)) {
            for (var O = "[(]", R = 0; R < r.sizes.length; R++) O = O + "exp_size,," + r.sizes[R], 
            R == r.sizes.length - 1 ? O += "[)]" : O += "[|]";
            y = O, f++;
        }
        var j = "";
        if (r.colors && (1 == r.colors.length && (j = j + "exp_color,," + r.colors + ";;"), 
        r.colors.length > 1)) {
            for (var S = "[(]", R = 0; R < r.colors.length; R++) S = S + "exp_color,," + r.colors[R], 
            R == r.colors.length - 1 ? S += "[)]" : S += "[|]";
            j = S, f++;
        }
        _ = f ? [ x, y, j ].filter(function(e) {
            return e;
        }).join("[+]") : x + y + j;
        var P = "";
        r.price && (P = "dredisprice," + r.price + ";");
        var N = "", z = void 0;
        if (r.service) for (r.service.indexOf("有货优先") > -1 ? (h.gUserData(), N = N + "redisstore," + h.getUserAddressID().split("_")[0] + ";") : "" != T && (z = "8"), 
        R = 0; R < r.service.length; R++) "京东物流" == r.service[R] && (N += "col_type,L0M0;"), 
        "京尊达" == r.service[R] && (N += "product_ext,b3v1;"), "货到付款" == r.service[R] && (N += "cod,L1M1;"), 
        "自营211" == r.service[R] && (N += "delivertime,1;"), "新品" == r.service[R] && (N += "product_ext,b26v1;"), 
        "全球购商品" == r.service[R] && (N += "product_ext,b11v1;"), "PLUS专享价" == r.service[R] && (N += "promotion_type,b4v1;"), 
        "促销商品" == r.service[R] && (N += "ptype,L0M0;"); else "" != T && (z = "8");
        var B = "";
        r.catid && (B = "catid,L" + r.catid.id + "M" + r.catid.id + ";");
        var I = {
            neverpop: "yes",
            datatype: 4,
            page: n,
            pagesize: s,
            key: o,
            ext_attr: "no",
            brand_col: "yes",
            price_col: "yes",
            color_col: "yes",
            size_col: "yes",
            sort_type: u,
            ext_attr_sort: "no",
            multi_suppliers: "yes",
            expression_key: _,
            filt_type: P + N + B + p,
            qp_exclude: z,
            rtapi: "no",
            multi_select: "yes"
        };
        v ? (I.coupon_aggregation = "yes", l = E, I.coupon_batch = v, a && (I.coupon_kind = a), 
        i && (I.coupon_shopid = i)) : (I.promotion_aggregation = "yes", l = b, I.activity_id = g), 
        d.get({
            url: l,
            data: I,
            callback: new e(o, c, t)
        });
    },
    getFilterData: function(e, t) {
        var o = e.coupon_batch || "", a = e.activity_id || "", i = {}, n = "";
        i = {
            coupon_aggregation: "yes",
            neverpop: "yes",
            datatype: 4,
            ext_attr: "yes",
            brand_col: "yes",
            price_col: "yes",
            color_col: "yes",
            size_col: "yes",
            ext_attr_sort: "yes",
            merge_sku: "yes",
            filt_type: "redisstore,19;",
            multi_suppliers: "yes",
            rtapi: "no"
        }, o ? (n = E, i.coupon_batch = o) : (n = b, i.activity_id = a), d.get({
            url: n,
            data: i,
            callback: new r(t)
        });
    },
    getCartview: function(e, r, o) {
        g = r || g;
        var a = {
            reg: 1,
            isnewyb: 1,
            locationid: h.getUserAddressID()
        };
        d.get({
            url: "http://wqdeal1.jd.com/deal/mshopcart/cartview",
            data: a,
            callback: new t(e, r, o)
        });
    },
    addCartSpec: function(e, r, t) {
        var a = [ e, "", "1", e, "1,0,0" ];
        C && (a[7] = "1"), r = r || [];
        var i = {
            scene: 0,
            action: 0,
            commlist: a.join(","),
            locationid: r.join("-")
        };
        f.get("3c_shop", "").then(function(e) {
            var r = e.id || "";
            r && (i.shopid = r), d.get({
                url: "http://wqdeal1.jd.com/deal/mshopcart/addcmdy",
                data: i,
                callback: new o(t)
            });
        });
    },
    hgAddCart: a,
    getShopInfo: function(e, r) {
        e && "0" != e ? d.get("https://wq.jd.com/mshop/BatchGetShopInfoByVenderId", {
            venderIds: e
        }, new n(r)) : r("no vender_id or vender_id eq 0");
    },
    getCouponInfo: function(e) {
        return u.get("https://wq.jd.com/activeapi/queryjdcouponbatchinfo", {
            batchids: e
        }).then(function(r) {
            var t = r.body;
            return 0 != t.errorCode ? _.reject({
                code: t.errorCode,
                message: t.errMsg
            }) : t.batch[e] && t.batch[e].length ? t.batch[e][0] : {};
        });
    },
    getCartData: l,
    seclectFun: function(e, r, t, o) {
        var a = {
            commlist: [ e, "", "0", e, r, t, "0" ],
            locationid: h.getUserAddressID(),
            type: 0,
            source: "mergecoupon",
            all: 0,
            t: Math.random()
        };
        u({
            url: "https://wq.jd.com/deal/mergeorder/checkcmdy",
            method: "GET",
            data: a
        }).then(function(e) {
            var r = e.body;
            o("", r);
        }).catch(function(e) {
            o(c(e));
        });
    },
    unSelectFun: function(e, r, t, o) {
        var a = {
            commlist: [ e, "", "0", e, r, t, "0" ],
            locationid: h.getUserAddressID(),
            type: 0,
            source: "mergecoupon",
            all: 0,
            t: Math.random()
        };
        u({
            url: "https://wq.jd.com/deal/mergeorder/uncheckcmdy",
            method: "GET",
            data: a
        }).then(function(e) {
            var r = e.body;
            o("", r);
        }).catch(function(e) {
            o(c(e));
        });
    },
    modifyNum: function(e, r, t, o, a) {
        var i = {
            commlist: [ e, "", r, e, t, o, "0" ],
            locationid: h.getUserAddressID(),
            type: 0,
            source: "mergecoupon",
            all: 0,
            t: Math.random()
        };
        u({
            url: "https://wq.jd.com/deal/mergeorder/modifycmdynum",
            method: "GET",
            data: i
        }).then(function(e) {
            var r = e.body;
            a("", r);
        }).catch(function(e) {
            a(c(e));
        });
    }
};