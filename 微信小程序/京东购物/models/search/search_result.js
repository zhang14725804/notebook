function e(e, t, r) {
    return t in e ? Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = r, e;
}

function t(e, t) {
    var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
    "object" == (void 0 === r ? "undefined" : f(r)) && (r = r.code + " - " + r.message), 
    b.umpBiz({
        bizid: O,
        operation: e,
        result: ~~t,
        message: r
    });
}

function r(e) {
    var t = e.price, r = e.extendFields, a = void 0 === r ? [] : r, n = [], i = void 0, o = void 0;
    return t && (t.replace(/^L(\d+)M(\d+)$/, function(e, t, r, a, n) {
        o = t, i = r;
    }), "-1" !== i && "-1" !== o && n.push("exprice_" + i + "-" + o)), a.map(function(e) {
        if (e.selected.length > 0) if ("brand" == e.type) {
            var t = e.selected.map(function(e) {
                return e.valuename;
            });
            n.push("exbrand_" + t.join("||"));
        } else if ("exp_size" == e.type) {
            var r = e.selected.map(function(e) {
                return e.valuename;
            });
            n.push("exsize_" + r.join("||"));
        } else if ("exp_color" == e.type) {
            var a = e.selected.map(function(e) {
                return e.valuename;
            });
            n.push("excolor_" + a.join("||"));
        } else if ("ext" == e.type) {
            var i = e.selected.map(function(e) {
                return e.valueid;
            });
            n.push(e.expandsortid + "_" + i.join("||"));
        }
    }), n.join("@");
}

function a(r, a, c, l, p, h) {
    var f = h.selectService, v = void 0 === f ? [] : f;
    h.isChangeKey;
    this.success = function(u) {
        function h(e) {
            if (b[C]) return C++, h(e);
            b[C] = e;
        }
        if (console.log("result", u), "string" == typeof u) try {
            u = u.replace(/(:\s*".*?)(")(?=.*")/g, "$1\\$2"), u = JSON.parse(u);
        } catch (e) {
            var f = {
                errCode: x.RET_HTTP_RESPONSE_ERROR,
                errMsg: d(x.RET_HTTP_RESPONSE_ERROR)
            };
            return l(f);
        }
        if (0 != u.retcode) return u.errCode = x.RET_HTTP_RESPONSE_ERROR, u.errMsg = d(u.errCode), 
        void l(u);
        /^\d{5,}$/.test(r) && s(u, r);
        var _ = u.data, g = _.searchm.Paragraph || [], y = [], b = [], E = [];
        _.adpos && (y = _.adpos.data || []).length > 0 && y.forEach(function(e) {
            e.wareid = e.sku_id, e.imageurl = e.image_url, e.commentcount = e.comment_num, e.Content = {}, 
            e.Content.warename = e.ad_title.replace(/<[^>]*>/g, ""), e.good = e.good_rate, e.dredisprice = "dredisprice" in e ? e.dredisprice : "0", 
            e.csid = _.adpos.csid, 0 == e.dredisprice && (e.dredisprice = "0.0"), e.type = "ad", 
            b[e.flow_order - 1] = e;
        });
        var C = 0;
        if (g.length > 0) {
            for (var j = 0, O = g.length; j < O; ++j) {
                var S = g[j];
                S.Content.warename = S.Content.warename.replace(/<[^>]*>/g, ""), S.imageurl = "http://img1" + S.wareid % 5 + ".360buyimg.com/n2/" + S.Content.imageurl, 
                S.dredisprice = (1 * S.dredisprice).toFixed(2), S.type = "sh", h(S);
            }
            y.length > 0 && y.map(function(e, t) {
                b.length > 0 && b.forEach(function(t, r) {
                    e.sku_id != t.wareid || t.hasOwnProperty("flow_order") || (e.flow_order >= r ? b.splice(e.flow_order - 1, 1, "") : e.flow_order < r && b.splice(r, 1, ""));
                });
            }), b = b.filter(function(e) {
                return e;
            });
        } else b = [];
        if (a && b.length >= 10) {
            var k = function(e) {
                var t = 0;
                if (!Array.isArray(e) || !e.length) return [];
                var r = new Map([ [ 2, "kk_activity" ], [ 3, "kk_coupon" ] ]), a = {
                    type: 3,
                    coupons: []
                }, n = e.filter(function(e) {
                    return 3 != e.type;
                });
                return (a.coupons.length ? n.concat([ a ]) : n).filter(function(e) {
                    return "2" != e.type || e.toUrl;
                }).map(function(e) {
                    var a = parseInt(e.type);
                    return Object.assign({}, e, {
                        isKingKong: !0,
                        img: "kk_" + t++,
                        type: r.get(a)
                    });
                }).reverse();
            }(_.keyad.data);
            E = E.concat(k);
        }
        var R = {};
        if (R.itemList = b, t(8, 0), a) {
            0 == b.length && t(9, 0), t(1, 0), T.addSearchPagePv("http://wq.jd.com/wxapp/pages/search/list/list", r, R.itemList.length > 0 ? "1" : "0", p);
            var I = [];
            if (_ && _.searchm && "ObjExtAttrCollection" in _.searchm && ("" != _.searchm.ObjExtAttrCollection && (I = _.searchm.ObjExtAttrCollection), 
            [ "品牌", "价格", "颜色", "价位", "颜色分类" ].forEach(function(e) {
                I.map(function(t, r) {
                    t.expandsortname == e && I.splice(r, 1);
                });
            }), I = I.map(function(e) {
                var t = e.valueid.split(";").filter(function(e) {
                    return e;
                }), r = e.valuename.split(";").filter(function(e) {
                    return e;
                }), a = [];
                return t.forEach(function(e, t) {
                    a.push({
                        valueid: e,
                        valuename: r[t]
                    });
                }), {
                    expandsortname: e.expandsortname,
                    expandsortid: e.expandsortid,
                    sortorder: e.sortorder,
                    selected: [],
                    valueitem: a,
                    type: "ext",
                    isTap: !1
                };
            })), _ && _.searchm && _.searchm.ObjB_TextCollection) {
                if ("brand" in _.searchm.ObjB_TextCollection) {
                    if ("" != _.searchm.ObjB_TextCollection.brand.value && !_.searchm.Head.Query.QueryProcessor.ExpressionKey) {
                        var B = [];
                        _.searchm.ObjB_TextCollection.brand.value.split("|=|").filter(function(e) {
                            return e;
                        }).forEach(function(e, t) {
                            B.push({
                                valueid: "0000",
                                valuename: e
                            });
                        }), I.push({
                            expandsortname: "品牌",
                            expandsortid: "brand_0001",
                            sortorder: _.searchm.ObjB_TextCollection.brand.sortorder,
                            selected: [],
                            valueitem: B,
                            type: "brand",
                            isTap: !1
                        });
                    }
                    if (_.searchm.Head.Query.QueryProcessor.ExpressionKey) {
                        var M = _.searchm.Head.Query.QueryProcessor.ExpressionKey.split(",,")[1];
                        I.push({
                            expandsortname: "品牌",
                            expandsortid: "brand_0001",
                            sortorder: _.searchm.ObjB_TextCollection.brand.sortorder,
                            selected: [],
                            valueitem: [ {
                                valueid: "0000",
                                valuename: M
                            } ],
                            type: "brand",
                            isTap: !0
                        });
                    }
                }
                if ("exp_size" in _.searchm.ObjB_TextCollection && "" != _.searchm.ObjB_TextCollection.exp_size.value) {
                    var H = [];
                    _.searchm.ObjB_TextCollection.exp_size.value.split(";").filter(function(e) {
                        return e;
                    }).forEach(function(e, t) {
                        H.push({
                            valueid: "0000",
                            valuename: e
                        });
                    }), I.push({
                        expandsortname: "尺码/尺寸",
                        expandsortid: "exp_size_0001",
                        sortorder: _.searchm.ObjB_TextCollection.exp_size.sortorder,
                        selected: [],
                        valueitem: H,
                        type: "exp_size",
                        isTap: !1
                    });
                }
                if ("exp_color" in _.searchm.ObjB_TextCollection && "" != _.searchm.ObjB_TextCollection.exp_color.value) {
                    var Q = [];
                    _.searchm.ObjB_TextCollection.exp_color.value.split(";").filter(function(e) {
                        return e;
                    }).forEach(function(e, t) {
                        Q.push({
                            valueid: "0000",
                            valuename: e
                        });
                    }), I.push({
                        expandsortname: "颜色",
                        expandsortid: "exp_color_0001",
                        sortorder: _.searchm.ObjB_TextCollection.exp_color.sortorder,
                        selected: [],
                        valueitem: Q,
                        type: "exp_color",
                        isTap: !1
                    });
                }
            }
            I.sort(function(e, t) {
                return e.sortorder - t.sortorder;
            });
            for (var z = _.searchm.ObjCollection.cid2, N = _.searchm.ObjCollection.catid, L = [], U = {}, K = {}, F = 0, D = z.length; F < D; ++F) {
                var G = z[F];
                U[G.Classification] = {
                    id: G.Classification,
                    name: G.Name,
                    childs: []
                };
            }
            for (var W = 0, $ = N.length; W < $; ++W) {
                var V = N[W], J = V.Name;
                U[V.FClassification] && U[V.FClassification].childs.push({
                    id: V.Classification,
                    name: V.Name
                }), K[J] || (K[J] = V.Classification);
            }
            for (var X = 0, Y = z.length; X < Y; ++X) {
                var Z = U[z[X].Classification];
                Z && L.push(Z);
            }
            R.comonList = I, R.cid2List = L;
            var ee = _.searchm.ObjC_NumberCollection.shop_list;
            if (P = [], ee.length > 0) for (var te = 0, re = ee.length; te < re; ++te) P.push(ee[te].vender_id); else _.searchm.ObjC_NumberCollection.vender_id && P.push(_.searchm.ObjC_NumberCollection.vender_id);
            var ae = _.searchm.Head.Query;
            if ("hidden" == ae.QueryProcessor.ExpandQueryStatus && 1 == ae.QueryProcessor.ShowHiddenInfo && (R.hiddenKey = ae.QueryProcessor.ExpandQuery), 
            "replace" == ae.QueryProcessor.ExpandQueryStatus && (R.replaceKey = ae.QueryProcessor.ExpandQuery), 
            "suggest" == ae.QueryProcessor.ExpandQueryStatus && (R.suggestKey = ae.QueryProcessor.ExpandQuery), 
            "true" == ae.isWordSearch) {
                var ne = ae.WordSearchInfo, ie = ne.showWordOne, oe = ne.showWordOther, se = oe && oe.split(";"), ce = se.length > 1 ? se.slice(1).slice(-2) : [];
                R.searchWordInfo = {
                    tags: ce,
                    recommand: ie
                };
            }
            var de = _.searchm.Head.Query.QueryProcessor.ExpressionKey;
            if (de) {
                var ue = de.split(",,"), le = m(ue, 2), pe = le[0], he = le[1];
                q = he, R.autoSelectedExpression = e({}, pe, he);
            }
        }
        for (var fe = {
            "京东物流": !0,
            "有货优先": !0,
            "货到付款": !0,
            "全球购商品": !0,
            "促销商品": !0
        }, me = 0, ve = _.searchm.ObjExist_Statistic.Delivertime.length; me < ve; me++) "1" == _.searchm.ObjExist_Statistic.Delivertime[me].type && (fe["自营211"] = !0);
        "1" == _.searchm.ObjExist_Statistic.HasVIPware && (fe["京尊达"] = !0), "1" == _.searchm.ObjExist_Statistic.HasPLUSware && (fe["PLUS专享价"] = !0), 
        "1" == _.searchm.ObjExist_Statistic.HasFZXPware && (fe["新品"] = !0), R.pageIndex = _.searchm.Head.Summary.Page.PageIndex, 
        R.pageCount = _.searchm.Head.Summary.Page.PageCount, R.resultCount = _.searchm.Head.Summary.OrgSkuCount, 
        R.IsSpecialStock = _.searchm.Head.Query.QueryProcessor.IsSpecialStock, R.isStock = "true", 
        R.priceInterval = _.searchm.Interval_Price;
        var _e = i(_, c), ge = _e.actInfoMap, ye = _e.filterActInfo;
        R.actInfoMap = ge;
        var xe = !1;
        v.length > 0 && (xe = v.indexOf(ye.actname) >= 0), (ye && "" != ye || xe) && (fe[ye.actname] = !0), 
        R.filter = fe, R.middleList = E, R.actIcon = ye || {}, w = _.searchm.Head.Query.QueryProcessor.IsStock, 
        A = u.data.adpos.csid;
        var be = r.match(/catid_str,,(\d+)/);
        if (be) {
            var Ee = n(_.searchm.ObjCollection, be[1]);
            Ee && (R.matchKey = Ee);
        }
        o(R.itemList, R.pageIndex, r, u.data, p), l("", R);
    }, this.fail = function(e) {
        t(8, 1, e), a && t(1, 1, e), l(u(e));
    };
}

function n() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1], r = "";
    return [ "cid1", "cid2", "catid" ].map(function(a) {
        Array.isArray(e[a]) && e[a].map(function(e) {
            t == e.Classification && (r = e.Name);
        });
    }), r;
}

function i(e, t) {
    I = "";
    var r = e, a = v.getServerTime(), n = [], i = [], o = {}, s = [];
    r && r.searchm && r.searchm.Head.Query && (r.searchm.Head.Query.HcCid2s && (n = r.searchm.Head.Query.HcCid2s.split(";")), 
    r.searchm.Head.Query.HcCid3s && (i = r.searchm.Head.Query.HcCid3s.split(";"))), 
    n = n.filter(function(e) {
        return e;
    }), i = i.filter(function(e) {
        return e;
    });
    for (var c = 0, d = t.length; c < d; ++c) {
        var u = t[c], l = !1;
        if (a >= u.beginTime && (0 == u.endTime || a <= u.endTime)) {
            if (u.cid2s.length > 0 && n.length > 0) for (var p = 0, h = n.length; p < h && p < 2; ++p) {
                var f = n[p];
                if (f && ~u.cid2s.indexOf(f)) {
                    o[u.actMark] = {
                        inAct: !0,
                        actCheck: 0,
                        actMark: u.actMark,
                        actid: u.actid,
                        actname: u.name,
                        logo1: u.logo1,
                        logo2: u.logo2,
                        rd: u.rd,
                        crd: u.crd,
                        mrd: u.mrd,
                        mcrd: u.mcrd,
                        qt: u.qt
                    }, s.push(o[u.actMark]), l = !0;
                    break;
                }
            }
            if (l) continue;
            if (u.catids.length > 0 && i.length > 0) for (var m = 0, _ = i.length; m < _ && m < 2; ++m) {
                var g = i[m];
                if (g && ~u.catids.indexOf(g)) {
                    o[u.actMark] = {
                        inAct: !0,
                        actCheck: 0,
                        actMark: u.actMark,
                        actid: u.actid,
                        actname: u.name,
                        logo1: u.logo1,
                        logo2: u.logo2,
                        rd: u.rd,
                        crd: u.crd,
                        mrd: u.mrd,
                        mcrd: u.mcrd,
                        qt: u.qt
                    }, s.push(o[u.actMark]), l = !0;
                    break;
                }
            }
            if (l) continue;
            0 == u.cid2s.length && 0 == u.catids.length && (o[u.actMark] = {
                inAct: !0,
                actCheck: 0,
                actMark: u.actMark,
                actid: u.actid,
                actname: u.name,
                logo1: u.logo1,
                logo2: u.logo2,
                rd: u.rd,
                crd: u.crd,
                mrd: u.mrd,
                mcrd: u.mcrd,
                qt: u.qt
            }, s.push(o[u.actMark]));
        }
    }
    return s.length > 0 && (s = s.sort(function(e, t) {
        return t.qt - e.qt;
    }), (I = s[0]).inActTime = !0), {
        actInfoMap: o,
        filterActInfo: I
    };
}

function o(e, t, r, a, n) {
    if (0 != e.length) {
        var i = [], o = [], s = [], c = [], d = [], u = [];
        e.forEach(function(e, t) {
            "ad" != e.type ? (i.push(e), o.push(e.wareid)) : (s.push(e), c.push(e.wareid), d.push(e.wareid + "|" + (t + 1)), 
            u.push(e.flow_order));
        });
        var l = {
            ss_exp_type: 1,
            search_kwd: encodeURIComponent(r),
            intenid: i[0].catid,
            actid: 1,
            exp_sku_list: o.join("_"),
            exp_sku_qtty: o.length,
            ad_sku_list: d.join(","),
            event_id: a.adpos.PosAdInfo.event_id || "",
            ss_page: t,
            csid: a.adpos.csid || "",
            ss_hccid1s: a.searchm.Head.Query.HcCid1s || "",
            ss_hccid2s: a.searchm.Head.Query.HcCid2s || "",
            ss_hccid3s: a.searchm.Head.Query.HcCid3s || "",
            sf: n
        }, p = Object.assign({}, l, {
            ss_exp_type: 2,
            exp_sku_list: c.join("_"),
            exp_sku_qtty: c.length,
            flow_order: u.join("_")
        });
        i.length > 0 && T.addSearchPageExposure(l), c.length > 0 && T.addSearchPageExposure(p);
    }
}

function s(e, t) {
    var r = e.data, a = r.searchm, n = a.Head.Summary, i = a.Paragraph;
    if (i.length > 0 && 1 == r.rewrite.hasSkuTop) {
        var o = i[0];
        o.wareid == t && (o.isFsku = !0), 0 == n.Page.PageSize && (n.Page = {
            PageCount: "1",
            PageIndex: "1",
            PageSize: "10"
        }), n.OrgSkuCount = parseInt(n.OrgSkuCount, 10) + 1, n.ResultCount = parseInt(n.ResultCount, 10) + 1;
    }
}

function c(e, t) {
    this.success = function(e) {
        if ("string" == typeof e) try {
            e = e.replace(/(:\s*".*?)(")(?=.*")/g, "$1\\$2"), e = JSON.parse(e);
        } catch (e) {
            var r = {
                errCode: x.RET_HTTP_RESPONSE_ERROR,
                errMsg: d(x.RET_HTTP_RESPONSE_ERROR)
            };
            return t(r);
        }
        if (0 != e.retcode) return e.errCode = x.RET_HTTP_RESPONSE_ERROR, e.errMsg = d(e.errCode), 
        void t(e);
        var a = {}, n = e.data || {}, i = [];
        if (n && n.searchm && "ObjExtAttrCollection" in n.searchm && ("" != n.searchm.ObjExtAttrCollection && (i = n.searchm.ObjExtAttrCollection), 
        [ "品牌", "价格", "颜色", "价位", "颜色分类" ].forEach(function(e) {
            i.map(function(t, r) {
                t.expandsortname == e && i.splice(r, 1);
            });
        }), i = i.map(function(e) {
            var t = e.valueid.split(";").filter(function(e) {
                return e;
            }), r = e.valuename.split(";").filter(function(e) {
                return e;
            }), a = [];
            return t.forEach(function(e, t) {
                a.push({
                    valueid: e,
                    valuename: r[t]
                });
            }), {
                expandsortname: e.expandsortname,
                expandsortid: e.expandsortid,
                sortorder: e.sortorder,
                selected: [],
                valueitem: a,
                type: "ext",
                isTap: !1
            };
        })), n && n.searchm && n.searchm.ObjB_TextCollection) {
            if ("brand" in n.searchm.ObjB_TextCollection && "" != n.searchm.ObjB_TextCollection.brand.value) {
                var o = [];
                n.searchm.ObjB_TextCollection.brand.value.split("|=|").filter(function(e) {
                    return e;
                }).forEach(function(e, t) {
                    o.push({
                        valueid: "0000",
                        valuename: e
                    });
                }), i.push({
                    expandsortname: "品牌",
                    expandsortid: "brand_0001",
                    sortorder: n.searchm.ObjB_TextCollection.brand.sortorder,
                    selected: [],
                    valueitem: o,
                    type: "brand",
                    isTap: !1
                });
            }
            if ("exp_size" in n.searchm.ObjB_TextCollection && "" != n.searchm.ObjB_TextCollection.exp_size.value) {
                var s = [];
                n.searchm.ObjB_TextCollection.exp_size.value.split(";").filter(function(e) {
                    return e;
                }).forEach(function(e, t) {
                    s.push({
                        valueid: "0000",
                        valuename: e
                    });
                }), i.push({
                    expandsortname: "尺码/尺寸",
                    expandsortid: "exp_size_0001",
                    sortorder: n.searchm.ObjB_TextCollection.exp_size.sortorder,
                    selected: [],
                    valueitem: s,
                    type: "exp_size",
                    isTap: !1
                });
            }
            if ("exp_color" in n.searchm.ObjB_TextCollection && "" != n.searchm.ObjB_TextCollection.exp_color.value) {
                var c = [];
                n.searchm.ObjB_TextCollection.exp_color.value.split(";").filter(function(e) {
                    return e;
                }).forEach(function(e, t) {
                    c.push({
                        valueid: "0000",
                        valuename: e
                    });
                }), i.push({
                    expandsortname: "颜色",
                    expandsortid: "exp_color_0001",
                    sortorder: n.searchm.ObjB_TextCollection.exp_color.sortorder,
                    selected: [],
                    valueitem: c,
                    type: "exp_color",
                    isTap: !1
                });
            }
        }
        i.sort(function(e, t) {
            return e.sortorder - t.sortorder;
        });
        for (var u = n.searchm.ObjCollection.cid2, l = n.searchm.ObjCollection.catid, p = [], h = {}, f = {}, m = 0, v = u.length; m < v; ++m) {
            var _ = u[m];
            h[_.Classification] = {
                id: _.Classification,
                name: _.Name,
                childs: []
            };
        }
        for (var g = 0, y = l.length; g < y; ++g) {
            var b = l[g], E = b.Name;
            h[b.FClassification] && h[b.FClassification].childs.push({
                id: b.Classification,
                name: b.Name
            }), f[E] || (f[E] = b.Classification);
        }
        for (var T = 0, C = u.length; T < C; ++T) {
            var j = h[u[T].Classification];
            j && p.push(j);
        }
        a.cid2List = p, a.comonList = i, t("", a);
    }, this.fail = function(e) {
        t(u(e));
    };
}

function d(e) {
    var t = "";
    switch (e) {
      case x.RET_HTTP_RESPONSE_ERROR:
        t = x.Text_RET_HTTP_RESPONSE_ERROR;
        break;

      case x.RET_WS_CONNECT_ERROR:
        t = x.Text_RET_WS_CONNECT_ERROR;
        break;

      case x.RET_WS_REQUEST_TIMEOUT:
        t = x.Text_RET_WS_REQUEST_TIMEOUT;
    }
    return t;
}

function u(e) {
    return "string" == typeof e ? {
        errCode: e,
        errMsg: d(e)
    } : e;
}

function l(e) {
    return new _(function(t, r) {
        var a = {
            source: "search_wxsq",
            callback: "profitBeltCb",
            search: e.join(";")
        };
        E({
            url: "https://ad.3.cn/wbs/mgets",
            method: "GET",
            data: a
        }).then(function(e) {
            var r = e.body;
            t(r);
        }).catch(function(e) {
            r(e);
        });
    });
}

function p(e) {
    var t = e.join(",");
    return new _(function(e, r) {
        E({
            url: "https://wq.jd.com/active/querybingolist",
            data: {
                activelist: t
            }
        }).then(function(t) {
            var r = t.body;
            e(r);
        }).catch(function(e) {
            r(e);
        });
    });
}

function h(e) {
    var t = e.join(",");
    return new _(function(e, r) {
        E({
            url: "https://wq.jd.com/active/queryprizesstatuslist",
            data: {
                activelist: t
            }
        }).then(function(t) {
            var r = t.body;
            e(r);
        }).catch(function(e) {
            r(e);
        });
    });
}

var f = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, m = function() {
    function e(e, t) {
        var r = [], a = !0, n = !1, i = void 0;
        try {
            for (var o, s = e[Symbol.iterator](); !(a = (o = s.next()).done) && (r.push(o.value), 
            !t || r.length !== t); a = !0) ;
        } catch (e) {
            n = !0, i = e;
        } finally {
            try {
                !a && s.return && s.return();
            } finally {
                if (n) throw i;
            }
        }
        return r;
    }
    return function(t, r) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, r);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), v = require("../../common/fe_helper"), _ = require("../../libs/promise.min.js"), g = require("../../common/http_json.js"), y = require("../../common/user_info.js"), x = require("../../common/http_constant"), b = require("../../common/fe_report/usability.js"), E = require("../../common/request/request.js"), T = require("../../api/Ptag/report_manager"), C = require("../../api/Ptag/Ptag_constants"), j = require("../../common/login/login.js"), O = 759, S = function(e) {
    return 0 == Object.keys(e).length ? "" : Object.entries(e).map(function(e) {
        var t = m(e, 2), r = t[0], a = t[1];
        return a.reduce(function(e, t, n, i) {
            return 1 == a.length ? r + ",," + t : n == i.length - 1 ? e + (r + ",,") + t + "[)]" : e + (r + ",,") + t + "[|]";
        }, "[(]");
    }).join("[+]");
}, k = function(e) {
    return 0 == Object.keys(e).length ? "" : "expand_name," + Object.entries(e).map(function(e) {
        var t = m(e, 2), r = t[0];
        return t[1].join("||") + "::" + r;
    }).join("^^") + ";";
}, w = "", P = [], R = "", I = void 0, A = void 0, B = void 0, q = "", M = !1, H = {
    sales: "sort_totalsales15_desc",
    price_asc: "sort_dredisprice_asc",
    price_desc: "sort_dredisprice_desc",
    winsdate_desc: "sort_winsdate_desc",
    commentcount_desc: "sort_commentcount_desc"
}, Q = {
    brand: "brand",
    exp_size: "exp_size",
    exp_color: "exp_color"
}, z = {
    "货到付款": "cod,L1M1;",
    "促销商品": "ptype,L0M0;",
    "自营211": "delivertime,1;",
    "京东物流": "col_type,L0M0;",
    "新品": "product_ext,b26v1;",
    "京尊达": "product_ext,b3v1;",
    "全球购商品": "product_ext,b11v1;",
    "PLUS专享价": "promotion_type,b4v1;"
}, N = {
    PRESENT: 1,
    NEW: 2,
    UNKNOW: 3
};

module.exports = {
    getSearchResult: function(e, t, n) {
        y.initUserData();
        var i = t.sf, o = t.page || 1, s = t.size || 10, c = t.activeInfo || {}, d = t.isFirstLoad || !1, u = t.isChangeKey || !1, l = void 0 === t.isAutoFix || t.isAutoFix;
        B = e;
        var p = t.sortType ? H[t.sortType] || "" : "", h = {}, m = {}, v = void 0;
        u && (q = ""), Array.isArray(t.extendFields) && t.extendFields.forEach(function(e) {
            !u && q && "brand" == e.type && e.selected.every(function(e) {
                return e.valuename != q;
            }) && !M && (M = !0), M && (v = 31);
            var t = Q[e.type];
            if (t && Array.isArray(e.selected) && e.selected.length > 0) return h[t] = e.selected.map(function(e) {
                return e.valuename;
            });
            if ("ext" == e.type && Array.isArray(e.selected) && e.selected.length > 0) {
                var r = e.selected.map(function(e) {
                    return e.valueid;
                });
                m[e.expandsortid] = r;
            }
        });
        var _ = "";
        if (t.service) {
            var x = !!Array.isArray(t.service) && t.service.indexOf("有货优先") > -1;
            if (x) {
                var b = y.getUserAddressID().split("_");
                _ = _ + "redisstore," + b[0] + ";";
            }
            x || "" == w || (v = "8");
            for (var T = 0; T < t.service.length; T++) !function(e) {
                var r = t.service[e];
                if (z[r] && (_ += z[r]), "object" != (void 0 === I ? "undefined" : f(I)) && Array.isArray(c)) {
                    var a = Date.now(), n = c.find(function(e) {
                        return e.name == r && a >= e.beginTime && a <= e.endTime;
                    }) || {};
                    n.actid && (_ += "ico,L" + n.actid + "M" + n.actid + ";");
                }
                "object" == (void 0 === I ? "undefined" : f(I)) && r == I.actname && (_ += "ico,L" + I.actid + "M" + I.actid + ";");
            }(T);
        } else "" != w && (v = "8");
        var C = "";
        t.catid && t.catid.id && (C = "catid,L" + t.catid.id + "M" + t.catid.id + ";");
        var j = "";
        t.price && (j = "dredisprice," + t.price + ";");
        var O = k(m), P = S(h), A = {
            key: B,
            page: o,
            datatype: 4,
            pagesize: s,
            sort_type: p,
            size_col: "yes",
            brand_col: "yes",
            color_col: "yes",
            multi_select: "yes",
            qp_disable: l ? "no" : "yes",
            qp_exclude: v,
            ev: r(t),
            expression_key: P,
            filt_type: j + _ + C + O
        };
        Object.keys(A).forEach(function(e) {
            (null == A[e] || void 0 === A[e] || "" == A[e]) && delete A[e];
        }), R || (R = g.getUniqueKey());
        var N = new a(e, d, c, n, i, {
            isChangeKey: u,
            selectService: t.service
        });
        E({
            url: "https://wqsou.jd.com/search/searchwxapp",
            data: A,
            uniqueKey: R,
            speedPointId: 3
        }).then(function(e) {
            var t = e.body;
            N.success(t);
        }).catch(function(e) {
            N.fail(e);
        });
    },
    relationalSearch: function(e, t) {
        var r = void 0;
        e && (r = {
            keyword: e,
            client: "sp",
            ver: "auto",
            pvid: y.gUserData().visitkey
        }), E({
            url: "https://qpsearch.jd.com/relationalSearch",
            method: "GET",
            data: r,
            dataType: "text"
        }).then(function(e) {
            var r = e.body, a = r.substring(0, r.indexOf("^^"));
            try {
                r = r.substring(r.indexOf("^^") + 2);
            } catch (e) {
                return;
            }
            var n = r.split("*");
            n.pop();
            var i = {};
            return i.data = n, i.version = a, T.addPtagExposure(C.EXP_SEARCH_RELATED_KWD), t("", i);
        }).catch(function(e) {
            t(u(e));
        });
    },
    getStock: function(e, r) {
        if (e) {
            for (var a = "", n = 0, i = e.length; n < i; ++n) a = a + e[n] + ",1;";
            a = a.substring(0, a.length - 1);
            for (var o = y.getUserAddressID().split("_"), s = "", c = 0, d = o.length; c < d; ++c) s = s + o[c] + ",";
            o.length > 3 ? s = s.substring(0, s.length - 1) : s += "0", E({
                url: "https://ss.3.cn/ss/areaStockState/mget",
                data: {
                    app: "search_wx",
                    ch: 4,
                    skuNum: a,
                    area: s
                },
                method: "GET"
            }).then(function(e) {
                var a = e.body;
                if (a) {
                    var n = {};
                    for (var i in a) {
                        var o = a[i], s = "";
                        s = "34" == o.a ? "无货" : 36 == o.a ? "预订" : o.c, n[i] = {
                            status: s,
                            d: o.d,
                            e: o.e
                        };
                    }
                    r("", n);
                } else t(4, 0);
                t(2, 0);
            }).catch(function(e) {
                t(2, 1, e), r(u(e));
            });
        }
    },
    getPrice: function(e, r) {
        if (e) {
            for (var a = "", n = 0, i = e.length; n < i; ++n) a = a + e[n] + ",";
            a = a.substring(0, a.length - 1);
            var o = y.getUserAddressID();
            E({
                url: "https://pe.3.cn/prices/pcpmgets",
                data: {
                    origin: "5",
                    skuids: a,
                    area: o,
                    source: "wxsqitemsou",
                    ext: 1
                },
                method: "GET"
            }).then(function(e) {
                var a = e.body;
                if (a) {
                    for (var n = {}, i = 0, o = a.length; i < o; ++i) {
                        var s = a[i];
                        n[s.id] = s;
                    }
                    r("", n);
                } else t(5, 0);
                t(3, 0);
            }).catch(function(e) {
                t(3, 1, e), r(u(e));
            });
        }
    },
    getComments: function(e, r) {
        if (e) {
            for (var a = "summary-m-", n = 0, i = e.length; n < i; ++n) a = a + e[n] + ",";
            a = a.substring(0, a.length - 1), E({
                url: "https://club.jd.com/clubservice/" + a + ".html",
                data: {},
                method: "GET"
            }).then(function(e) {
                var a = e.body.CommentsCount;
                0 == a.length && t(7, 0);
                for (var n = {}, i = 0, o = a.length; i < o; ++i) {
                    var s = a[i];
                    n[s.SkuId] = s.CommentCount + "_" + s.GoodRateShow + "%";
                }
                r("", n), t(6, 0);
            }).catch(function(e) {
                t(6, 1, e), r(u(e));
            });
        }
    },
    getShopThrough: function(e) {
        var t = {
            ad_type: 4,
            spread_type: 1,
            enc: "utf-8",
            ad_ids: "3761:1",
            mobile_type: 3,
            keyword: B,
            location_info: y.getUserAddressID().split("_").slice(0, 3).join("_"),
            csid: A
        };
        E({
            url: "https://x.jd.com/Search",
            method: "GET",
            data: t
        }).then(function(t) {
            var r = t.body;
            e("", r);
        }).catch(function(t) {
            e(u(t));
        });
    },
    getShopInfo: function(e) {
        if (0 == P.length || "0" == P) return e("no vender_id or vender_id eq 0");
        var t = {
            venderIds: P.join(",")
        };
        E({
            url: "https://wq.jd.com/mshop/BatchGetShopInfoByVenderId",
            method: "GET",
            data: t
        }).then(function(t) {
            var r = t.body;
            0 == r.errcode && 0 != r.data.length || e("getShopInfo error or no datas"), e("", {
                data: r.data,
                venderId: P.slice(0)
            }), P = [];
        }).catch(function(t) {
            e(u(t));
        });
    },
    getSearchLinkage: function(e, t, r) {
        var a = e, n = "";
        t.sortType && ("sales" == t.sortType && (n = "sort_totalsales15_desc"), "price_desc" == t.sortType && (n = "sort_dredisprice_desc"), 
        "price_asc" == t.sortType && (n = "sort_dredisprice_asc"));
        var i = "";
        if (t.extendFields) {
            var o = [];
            t.extendFields.forEach(function(e) {
                if ("ext" == e.type) {
                    if (e.selected.length > 0) {
                        var r = [];
                        e.selected.map(function(e) {
                            r.push(e.valueid);
                        }), o.push(r.join("||") + "::" + e.expandsortid);
                    }
                } else "brand" == e.type ? (t.brand = [], e.selected.forEach(function(e) {
                    t.brand.push(e.valuename);
                })) : "exp_size" == e.type ? (t.sizes = [], e.selected.forEach(function(e) {
                    t.sizes.push(e.valuename);
                })) : "exp_color" == e.type && (t.colors = [], e.selected.forEach(function(e) {
                    t.colors.push(e.valuename);
                }));
            }), o.length > 0 && (i += "expand_name," + o.join("^^"));
        }
        var s = 0, d = "", u = "";
        if (t.brand && (1 == t.brand.length && (u = u + "brand,," + t.brand + ";;"), t.brand.length > 1)) {
            for (var l = "[(]", p = 0; p < t.brand.length; p++) l = l + "brand,," + t.brand[p], 
            p == t.brand.length - 1 ? l += "[)]" : l += "[|]";
            u = l, s++;
        }
        var h = "";
        if (t.sizes && (1 == t.sizes.length && (h = h + "exp_size,," + t.sizes + ";;"), 
        t.sizes.length > 1)) {
            for (var m = "[(]", v = 0; v < t.sizes.length; v++) m = m + "exp_size,," + t.sizes[v], 
            v == t.sizes.length - 1 ? m += "[)]" : m += "[|]";
            h = m, s++;
        }
        var _ = "";
        if (t.colors && (1 == t.colors.length && (_ = _ + "exp_color,," + t.colors + ";;"), 
        t.colors.length > 1)) {
            for (var x = "[(]", b = 0; b < t.colors.length; b++) x = x + "exp_color,," + t.colors[b], 
            b == t.colors.length - 1 ? x += "[)]" : x += "[|]";
            _ = x, s++;
        }
        d = s ? [ u, h, _ ].filter(function(e) {
            return e;
        }).join("[+]") : u + h + _;
        var E = "";
        t.price && (E = "dredisprice," + t.price + ";");
        var T = "", C = void 0;
        if (t.service) {
            t.service.indexOf("有货优先") > -1 ? T = T + "redisstore," + y.getUserAddressID().split("_")[0] + ";" : "" != w && (C = "8");
            for (var j = 0; j < t.service.length; j++) "京东物流" == t.service[j] && (T += "col_type,L0M0;"), 
            "京尊达" == t.service[j] && (T += "product_ext,b3v1;"), "货到付款" == t.service[j] && (T += "cod,L1M1;"), 
            "自营211" == t.service[j] && (T += "delivertime,1;"), "新品" == t.service[j] && (T += "product_ext,b26v1;"), 
            "全球购商品" == t.service[j] && (T += "product_ext,b11v1;"), "PLUS专享价" == t.service[j] && (T += "promotion_type,b4v1;"), 
            "促销商品" == t.service[j] && (T += "ptype,L0M0;"), I && "" != I && "object" == (void 0 === I ? "undefined" : f(I)) && t.service[j] == I.actname && (T += "ico,L" + I.actid + "M" + I.actid + ";");
        } else "" != w && (C = "8");
        var O = "";
        t.catid && t.catid.id && (O = "catid,L" + t.catid.id + "M" + t.catid.id + ";");
        var S = {
            datatype: 4,
            key: a,
            sort_type: n,
            expression_key: d,
            filt_type: E + T + O + i,
            qp_exclude: C
        };
        C || delete S.qp_exclude, t.sortType || delete S.sort_type, t.brand || delete S.expression_key, 
        t.price || t.service || t.catid || "" != i || delete S.filt_type, g.get({
            url: "http://wqsou.jd.com/search/searchattr",
            data: S,
            callback: new c(e, r)
        });
    },
    getLocalStore: function(e, t) {
        var r = {
            skuinfo: e.join(",")
        };
        E({
            url: "https://wq.jd.com/bases/searchxg/promiserealtime",
            data: r,
            method: "GET"
        }).then(function(e) {
            var r = [];
            e.body.skuinfolist.forEach(function(e, t) {
                var a = e.skuid;
                e.flaglist.length > 0 && e.flaglist.map(function(e) {
                    1 == e.flag && r.push(a);
                });
            }), t("", r);
        }).catch(function(e) {
            t(u(e));
        });
    },
    getNewMcossTag: function(e, r) {
        var a = {
            sku: e.join(","),
            flagtype: 17,
            source: "wssearch"
        };
        E({
            url: "https://wq.jd.com/bases/panflag/get",
            data: a,
            method: "GET"
        }).then(function(e) {
            var a = {}, n = [];
            e.body.data.skuFlag.forEach(function(e, t) {
                switch (e.flagType) {
                  case "1":
                    a[e.skuId] = e;
                    break;

                  case "16":
                    n.push(e.skuId);
                }
            }), t(10, 0), r("", {
                pgouMap: a,
                seckillMap: n
            });
        }).catch(function(e) {
            t(10, 1, e), r(u(e));
        });
    },
    getYuYueTag: function(e, t) {
        var r = {
            sku: e.join(","),
            source: 1
        };
        E({
            url: "https://yushou.jd.com/youshouinfoList.action",
            data: r,
            method: "GET"
        }).then(function(e) {
            var r = e.body, a = {};
            for (var n in r) {
                var i = JSON.parse(r[n]);
                if (!i.error) {
                    1 == i.state || 2 == i.state ? a[n] = "预约" : 3 == i.state || 4 == i.state ? a[n] = "抢购" : a[n] = "预售";
                    try {
                        1 == i.ret.hideRealPrice && 2 == i.type && (a[n] += "|待发布");
                    } catch (e) {
                        console.log("");
                    }
                }
            }
            t("", a);
        }).catch(function(e) {
            t(u(e));
        });
    },
    getBeltDate: function(e) {
        return new _(function(t, r) {
            for (var a = [], n = [], i = 0, o = e.length; i < o; i++) {
                var s = e[i], c = s.wareid || "0_0_0", d = s.catid || 0, u = s.vender_id || 0, p = s.shop_id || 0;
                a.push(c + "," + d + "," + u + "," + p);
            }
            for (;a.length > 0; ) {
                var h = a.slice(0, 10);
                a = a.slice(10), n.push(l(h));
            }
            _.all(n).then(function(e) {
                t([].concat.apply([], e));
            }).catch(function(e) {
                t([]);
            });
        });
    },
    isNewUser: function() {
        return E.get({
            url: "https://wq.jd.com/userattribute/QueryIsNewUser"
        }).then(function(e) {
            var t = e.body, r = !(0 != t.retcode) && t.isNewUser == N.NEW;
            return _.resolve(r);
        }, function(e) {
            return _.reject(e);
        });
    },
    getPingouActive: function(e, t) {
        var r = {
            skuids: e.join(",")
        };
        E({
            url: "https://wq.jd.com/pingou_api/getpingoubatactiveinfo",
            data: r,
            method: "GET"
        }).then(function(e) {
            var r = e.body, a = {};
            0 == r.iRet && (r.pingou_info || []).map(function(e) {
                e.tuan_member_count > 0 && e.lefttime > 0 && (a[e.sku_id] = e.tuan_member_count);
            }), t("", a);
        }).catch(function(e) {
            t(u(e));
        });
    },
    getBatchQueryCoupon: function(e, t) {
        var r = {
            venderId: e.join(",")
        };
        E({
            url: "https://wq.jd.com/mshop/BatchQueryCoupon",
            method: "GET",
            data: r
        }).then(function(e) {
            var r = e.body, a = {};
            0 == r.errcode && r.data.map(function(e) {
                e.couponInfo.length > 0 && (a[e.venderId] = !0);
            }), t("", a);
        }).catch(function(e) {
            t(u(e));
        });
    },
    getMsgByVenderIds: function(e, t) {
        var r = {
            venderId: e.join(",")
        };
        E({
            url: "https://wq.jd.com/user/msgcenter/QueryMsgByVenderIds",
            method: "GET",
            data: r
        }).then(function(e) {
            var r = e.body, a = {};
            0 == r.iRet && r.data.map(function(e) {
                e.msgType && (a[e.venderId] = e.msgType);
            }), t("", a);
        }).catch(function(e) {
            t(u(e));
        });
    },
    getCouponStatus: function(e) {
        return new _(function(t, r) {
            var a = {
                errorCode: 0,
                errMsg: "",
                data: {}
            };
            if (!Array.isArray(e) || !e.length) return t(a);
            var n = [ h(e) ];
            j.isLogin() && n.push(p(e)), _.all(n).then(function(e) {
                var r = m(e, 2), n = r[0], i = r[1];
                if (!Array.isArray(n.result) || !n.result.length) return a.errorCode = n.retcode || 2, 
                a.errMsg = n.errmsg || "param error", void t(a);
                n.result.forEach(function(e) {
                    var t = [];
                    (e.prizes || []).forEach(function(r) {
                        var a = {
                            isBingo: !1,
                            level: r.Level,
                            name: r.PrizeName,
                            hourOver: r.HourBingos >= r.MaxHourBingos,
                            dayOver: r.DailyBingos >= r.MaxDailyBingos,
                            allOver: r.TotalBingos >= r.MaxBingos,
                            isValid: r.TotalBingos < r.MaxBingos
                        };
                        if (a.isOver = a.hourOver || a.dayOver || a.allOver, a.isCouponover = a.isOver, 
                        Array.isArray(i.result) && i.result.length) {
                            var n = i.result.find(function(t) {
                                return t.active == e.active;
                            }) || {};
                            a.isBingo = Array.isArray(n.bingos) && n.bingos.some(function(e) {
                                return e.level == r.Level;
                            });
                        }
                        t.push(a);
                    }), a.data[e.active] = {
                        active: e.active,
                        list: t
                    };
                }), t(a);
            });
        });
    },
    umpBiz: t
};