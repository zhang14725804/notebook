function e(o, n, s, c, u) {
    var f = {
        url: "",
        data: {},
        priority: "HIGH"
    }, h = !0;
    return n ? (f.url = n.indexOf("https:") < 0 ? "https:" + n : n, h = !1) : (ee = o, 
    f.url = K.ITEM_INFO, f.data = {
        sku: ee,
        callback: "skuInfoCB",
        cgi_source: "xcx",
        areaid: Z
    }, f.speedPointId = 1, c && (f.data.key = encodeURIComponent(c)), s || (f.data.datatype = "1")), 
    f.ump = {
        bizId: ae,
        opId: 1
    }, V.get(f).then(function(t) {
        I();
        var r = t.body;
        if (r.errCode && "20160304" == r.errCode) return Y.reject(W.GOODS_NOT_EXIST);
        if (r.redirectUrl && h) {
            var o = {
                datatype: "1",
                areaid: Z
            };
            return e("", L.createURL(r.redirectUrl.replace("&areaid=&", "&"), o));
        }
        if (r.huanUrl) return r.huanSku = A("sku", r.huanUrl), r.huanPrice = p(r.price && r.price.p ? r.price.p : "0.00"), 
        r;
        var n = null;
        try {
            n = a(r, h);
        } catch (e) {
            return Y.reject(W.GOODS_NOT_EXIST);
        }
        return i(r), n ? (setTimeout(function() {
            u && u.pps && w.setPPS(u.pps), w.addDetailPagePv("http://wq.jd.com/wxapp/pages/item/detail/detail", Q.skuId, Q.venderID, Q.canBuy ? U.EXP_VIEW_CAN_BUY : U.EXP_VIEW_CANNOT_BUY), 
            w.addPtagExposure(Q.canBuy ? U.EXP_VIEW_CAN_BUY : U.EXP_VIEW_CANNOT_BUY);
        }, 10), n) : {};
    }).then(function(e) {
        return e.buyingSpreeFlag ? d().then(function(e) {
            return e;
        }).catch(function(t) {
            return e;
        }) : e;
    }).then(function(e) {
        return r().then(function(t) {
            return e.urlConfig = t, re = z.checkURL(t), m(e.promov2 && e.promov2[0] || {}), 
            g(e.plusPromoInfo), l(e.bankpromo), e;
        }).catch(function(t) {
            return e.urlConfig = te, m(e.promov2 && e.promov2[0] || {}), g(e.plusPromoInfo), 
            l(e.bankpromo), e;
        });
    }).then(function(e) {
        return e.skuId ? t({
            skuId: e.skuId,
            imgTag: e.pTag,
            np: e.np,
            category: e.category
        }).then(function(t) {
            return e.postPromo = t, e;
        }).catch(function(t) {
            return e;
        }) : {};
    }).catch(function(e) {
        Y.reject(e);
    });
}

function t(e) {
    var t = e.skuId, r = e.imgTag, a = e.np, i = e.category, o = {
        url: K.ATMOSPHERE,
        data: {
            callback: "showPageData33274"
        },
        expire: "5m"
    };
    return V.get(o).then(function(e) {
        var o = e.body, n = "|" + i[0] + "|", s = "|" + i[1] + "|", c = "|" + i[2] + "|", u = "|" + t + "|", p = r ? "|" + r + "|" : "", d = H.getServerTime(), l = [], m = "", g = "", f = 0, h = 0, v = 0, k = "", y = 0;
        a.id && (m = a.c || "", g = a.id || "", f = a.t || 0, h = a.s || 0, v = a.e || 0, 
        y = a.p || 0);
        var I = o.data.filter(function(e) {
            return e && e.bannerimg && e.backcolor && e.textcolor && e.numcolor && e.numbackcolor && (e.category1 && e.category1.indexOf(n) >= 0 || e.category2 && e.category2.indexOf(s) >= 0 || e.category3 && e.category3.indexOf(c) >= 0 || e.sku && e.sku.indexOf(u) >= 0 || e.promoteid && "" != p && e.promoteid.indexOf(p) >= 0) && e.starttime && new Date(e.starttime).getTime() < d && e.endtime && new Date(e.endtime) > d;
        }), S = o.data.filter(function(e) {
            return e && e.bannerimg && e.backcolor && e.textcolor && e.numcolor && e.numbackcolor && e.matid && "" != g && e.matid.indexOf(g) >= 0 && e.activestage && e.activestage.indexOf(f) >= 0 && v && v > d;
        });
        if (S.length) {
            var P = parseInt(y).toFixed(2).split(".");
            P[1] = P[1] ? "." + P[1] : "";
            var _ = G.formatTime(new Date(parseInt(h))), b = _.split("."), N = x(new Date(parseInt(h))), T = G.formatTime(d), O = G.formatTime(new Date(d + 864e5));
            k = _ === T ? "今日" : _ === O ? "明天" : _.substr(0, 4) === T.substr(0, 4) ? b[1] + "月" + b[2] + "日" : b[0] + "年" + b[1] + "月" + b[2] + "日", 
            k += [ N.hour, N.min ].join(":"), S.length && (S[0].title = m, S[0].dcstarttime = h, 
            S[0].dcendtime = v, S[0].price = P, S[0].startTimeStr = k), l.push(S[0]);
        } else I.length && l.push(I[0]);
        return l.length ? l[0] : {};
    }).catch(function(e) {
        var t = e.code, r = e.message;
        return Y.reject({
            code: t,
            message: r
        });
    });
}

function r() {
    var e = {
        url: K.ITEM_CONFIG,
        data: {
            callback: "showPageData33270"
        },
        expire: "1d"
    };
    return V.get(e).then(function(e) {
        var t = e.body.data[0];
        return G.only(t, [ "isBlockShopURL", "isBlockBabelURL", "isBlockJShopURL" ]);
    }).catch(function(e) {
        var t = e.code, r = e.message;
        return Y.reject({
            code: t,
            message: r
        });
    });
}

function a(e, t) {
    (Q = new F()).suitPrice = {};
    var r = e.item;
    if (Q.canBuy = !0, Q.isPlus = 0 != e.plusMemberType, Q.tipsContent = "", Q.skuId = ee || e.skuId, 
    Q.isPop = r.isPop, Q.venderID = r.venderID, Q.skuName = e.skuName, Q.ad = e.AdvertCount.ad, 
    Q.newColorSize = r.newColorSize || [], Q.skuIdsArr = [], Q.skuProp = {}, Q.item = r, 
    Q.skuType = r.skuType, Q.originPrice = p(e.price.op ? e.price.op : "0.00"), Q.marketPrice = p(e.price.m ? e.price.m : "0.00"), 
    Q.price = p(e.price.p ? e.price.p : "0.00"), Q.skuPrice = e.price, Q.category = r.category || [], 
    Q.images = r.image, Q.spAttr = r.spAttr || {}, Q.description = r.description, Q.specification = e.specification, 
    Q.expAttr = e.expAttr, Q.feetype = e.feetype, Q.isZiying = !r.isPop, Q.pTag = e.pTag || "", 
    Q.np = e.price.np || {}, Q.plusFlag = e.plusFlag, Q.magicLevel = e.magicLevel, Q.promov2 = e.promov2, 
    Q.bankpromo = e.bankpromo, Q.yuyue = e.yuyue, Q.miao = e.miao, Q.allOverImg = e.allOverImg || 0, 
    Q.infoVideoId = e.infoVideoId || "", Q.mainVideoId = e.mainVideoId || "", Q.skuMark = r.skuMark && "string" == typeof r.skuMark ? JSON.parse(r.skuMark) : r.skuMark, 
    Q.plusPromoInfo = e.price.ext && JSON.parse(e.price.ext).PLUS || null, Q.brandId = r.brandId, 
    e.stock && e.stock.self_D && (Q.sfpShopName = e.stock.self_D.vender || ""), e.taxinfo) {
        var a = e.taxinfo;
        Q.globalInfo = {
            nationalFlag: H.getImg(a.nationImgMap && a.nationImgMap.m || ""),
            nation: a.nationName || "",
            tax: a.taxTxt && a.taxTxt.content || ""
        }, Q.taxTxt = a.taxTxt, Q.serviceIconList = a.serviceIconList, r.spAttr && "1" == r.spAttr.qqjx && (Q.serviceIconList = a.jingXuan && a.jingXuan.serviceList);
    }
    if (Q.isPingou = "1" == e.pingou, Q.extraPriceFlag = !0, e.promomiao && (Q.promomiao = e.promomiao, 
    Q.seckillFlag = !0, Q.extraPriceFlag = !1, Q.promomiao.jdPrice = p(Q.promomiao.jdPrice ? Q.promomiao.jdPrice : 0), 
    Q.promomiao.miaoShaPrice = p(Q.promomiao.miaoShaPrice ? Q.promomiao.miaoShaPrice : 0)), 
    e.price) {
        var i = Q.skuPrice;
        if (i.p && (Q.price = p(i.p), Q.originPrice = p(i.op), Q.marketPrice = p(i.m)), 
        i.tkp && (Q.specialPrice = p(i.tkp)), i.pp && (Q.plusPrice = p(i.pp)), i.tpp && (Q.trialPlusPrice = p(i.tpp)), 
        i.sp && (Q.samPrice = p(i.sp)), i.sfp && parseFloat(Q.price) > parseFloat(i.sfp) && (Q.sfpPrice = p(i.sfp)), 
        i.up) {
            var o = [];
            switch (o = i.up.split(","), Q.priorityPrice = "", o[0]) {
              case "tkp":
                Q.priorityPrice = "specialPrice";
                break;

              case "pp":
                Q.priorityPrice = "plusPrice";
                break;

              case "tpp":
                Q.priorityPrice = "trialPlusPrice";
                break;

              case "sp":
                Q.priorityPrice = "samPrice";
                break;

              case "sfp":
                Q.priorityPrice = "sfpPrice";
            }
        }
        i.np && (Q.promoNoticeFlag = !0, Q.np = i.np);
    }
    e.flashpurchase && 1 == e.flashpurchase.yn && (Q.flashpurchaseFlag = !0), "1" == Q.spAttr.YuShouNoWay && "1" == Q.spAttr.YuShou ? (Q.presellFlag = !0, 
    Q.extraPriceFlag = !1) : Q.skuMark && Q.skuMark.presale ? (Q.presellFlag = !0, Q.extraPriceFlag = !1) : "1" == Q.spAttr.YuShou ? (Q.subscribeFlag = !0, 
    Q.extraPriceFlag = !1) : ("1" == Q.spAttr.isKO || e.miao && "1" == e.miao.isKo) && (Q.buyingSpreeFlag = !0, 
    Q.extraPriceFlag = !1), e.stock || (Q.stock.isNeedReal = !0), "12632" == Q.category[1] && (Q.isOTC = !0), 
    Q.goodsFlag = {}, Q.spAttr && 1 == Q.spAttr.isZgtk ? Q.goodsFlag.clothes = "Zgtk" : Q.spAttr && 1 == Q.spAttr.isFzxp && (Q.goodsFlag.clothes = "Fzxp"), 
    Q.isZiying && "737" == Q.category[0] && (0 | Q.spAttr.isOverseaPurchase) <= 0 && (Q.goodsFlag.appliance = !0), 
    /^3[\d]{7}$/.test(Q.skuId) && (Q.goodsFlag.Ebook = !0), "13765" == Q.category[0] && (Q.goodsFlag.secondHand = !0);
    var n = e.stock, s = n && n.D && n.D.type, c = n && n.isJDexpress;
    (r.isPop && 1 == s || r.isPop && 0 == s && 1 == c) && (Q.goodsFlag.JDexpress = !0);
    var u = Q.spAttr;
    return "1" == u.pssx && "1000076153" == Q.venderID ? Q.skuNameFlag = "oneHour" : u && u.isOverseaPurchase && "0" != u.isOverseaPurchase ? 1 == u.isOverseaPurchase || 3 == u.isOverseaPurchase ? Q.skuNameFlag = "global_zy" : 2 != u.isOverseaPurchase && 4 != u.isOverseaPurchase || (Q.skuNameFlag = "global") : u && "1" == u.IsJDMarket ? Q.isZiying ? Q.skuNameFlag = "jdmarket_zy" : Q.skuNameFlag = "jdmarket" : "684711" == Q.venderID ? Q.skuNameFlag = "sam" : "603837" == Q.venderID ? Q.skuNameFlag = "sam_jdexpress" : Q.isZiying ? Q.skuNameFlag = "zy" : Q.goodsFlag.JDexpress && (Q.skuNameFlag = "jdexpress"), 
    n && n.venderType && "100" == n.venderType && (Q.skuNameFlag = "zy"), E(Q.item), 
    Q;
}

function i(e) {
    try {
        o(e.stock || Q.stock), c(e);
    } catch (e) {
        J.log(e);
    }
}

function o(e) {
    var t = [], r = void 0;
    if (Q.stock = e, "34" == e.StockState || "0" == e.StockState ? (Q.canBuy = !0, Q.tipsContent = "无货，或此商品不支持配送至该地址") : "36" == e.StockState ? (Q.canBuy = !0, 
    e.ArrivalDate ? (r = "预计" + e.ArrivalDate + "日后有货", Q.tipsContent = "") : (r = "商品到货后发货，现在可下单", 
    Q.tipsContent = "")) : (Q.canBuy = !0, Q.tipsContent = ""), n(e, t), e.promiseYX && ("service_noreturn" === e.promiseYX.iconCode ? s(t, e.promiseYX.showName, e.promiseMark, !1) : s(t, e.promiseYX.showName, e.promiseMark, !0)), 
    e.ir) for (var a = 0; a < e.ir.length; a++) "sendpay_zhun" != e.ir[a].iconCode && "special_ziti" != e.ir[a].iconCode && ("free_delivery_zhong" == e.ir[a].iconCode || "free_delivery" == e.ir[a].iconCode ? s(t, e.ir[a].iconSrc, e.ir[a].iconTip, !0, !0) : s(t, e.ir[a].iconSrc, e.ir[a].iconTip, !0, !1));
    if ("12632" == Q.category[1] && s(t, "药品提示", "请仔细阅读产品说明书或者在药师指导下购买和使用", !0), "12632" == Q.category[1] && Q.isZiying && (~JSON.stringify(t).indexOf("不支持7天无理由退货") || s(t, "不支持7天无理由退货", "不支持7天无理由退货", !1)), 
    Q.spAttr.SoldOversea) {
        var i = {
            1: {
                shortTitle: "可配送港澳",
                detail: "支持收货地址为香港及澳门"
            },
            2: {
                shortTitle: "可配送台湾",
                detail: "支持收货地址为台湾"
            },
            3: {
                shortTitle: "可配送港澳台",
                detail: "支持收货地址为港澳台"
            },
            4: {
                shortTitle: "可配送海外",
                detail: "支持收货地址为海外"
            },
            5: {
                shortTitle: "可配送港澳及海外",
                detail: "支持收货地址为香港、澳门及海外"
            },
            6: {
                shortTitle: "可配送台湾及海外",
                detail: "支持收货地址为台湾及海外"
            },
            7: {
                shortTitle: "可配送港澳台及海外",
                detail: "支持收货地址为香港、澳门、台湾及海外"
            }
        };
        i[Q.spAttr.SoldOversea] && s(t, i[Q.spAttr.SoldOversea].shortTitle, i[Q.spAttr.SoldOversea].detail, !0);
    }
    Q.service = t, Q.freight = {};
    var o = e.dcashDesc || "", c = "";
    if (e && e.wDispatch && "无货" !== b(e.StockStateName)) {
        var u = +e.sidDely, p = u >= 601 && u <= 649 ? "预计3-7天送达" : "预计5-20天送达";
        c = "从" + e.wDispatch + "发货，" + p;
    }
    e.serviceInfo && -1 !== e.serviceInfo.indexOf("有货（外地跨区调货）,需加收调货服务费") ? Q.freight.state = "有货（外地跨区调货）,需加收调货服务费" : e.serviceInfo && -1 !== e.serviceInfo.indexOf("有货（外地跨区调货）,暂免调货服务费") ? Q.freight.state = "有货（外地跨区调货）,暂免调货服务费" : e.serviceInfo && -1 !== e.serviceInfo.indexOf("跨区调货") ? Q.freight.state = "有货（外地跨区调货）" : Q.freight.state = "[" + b(e.StockStateName) + "]", 
    Q.subscribeFlag && Q.yuyue && Q.yuyue.state <= 3 && "[无货]" === Q.freight.state && (Q.freight.state = ""), 
    Q.freight.dcashDesc = b(o), Q.freight.serviceInfo = "36" == e.StockState ? r : b(e.promiseResult ? e.promiseResult.replace(/。$/gi, "") : "") + " " + c, 
    Q.freight.weightValue = e.weightValue, N();
}

function n(e, t) {
    try {
        var r = void 0, a = void 0;
        e.serviceInfo && (a = e.serviceInfo.replace(/<.*?>/gi, ""));
        var i = a.split(/,|，/), o = (i[0] || "").replace(/\s+/g, ""), n = i[1] || "";
        Q.venderID && (Q.venderName = (e.self_D || e.D || {
            vender: "京东"
        }).vender), Q.spAttr && ("1" == Q.spAttr.factoryShip ? (a = "由厂家或供应商提供和配送", r = "厂家供应商配送") : Q.spAttr.isOTC > 0 || ~o.indexOf("京东大药房") ? (a = "由 京东大药房 发货，并提供售后服务", 
        r = "京东大药房发货&售后") : "3" == Q.spAttr.isOverseaPurchase ? (a = "由 京东全球购 发货，并提供售后服务", 
        r = "京东全球购发货&售后") : "1" == Q.spAttr.isOverseaPurchase ? (a = a.replace(/京东提供/g, "京东全球购提供"), 
        r = "商家发货&京东全球购售后") : Q.spAttr.isExpByjd || ~o.indexOf("京东") ? (Q.venderId && !/^并| ?提供/.test(n) || (r = "京东发货&售后"), 
        ~n.indexOf(Q.venderName) && (r = "京东发货&商家售后")) : ~o.indexOf(Q.venderName) && (r = "商家发货&" + (~n.indexOf("京东") ? "京东" : "") + "售后")), 
        s(t, r = r || "发货&售后", b(a), !0);
    } catch (r) {
        e.serviceInfo && s(t, "发货&售后", b(e.serviceInfo), !0);
    }
}

function s(e, t, r, a, i) {
    var o = {};
    o.name = t, o.value = r, o.iconState = a, i ? e.unshift(o) : e.push(o);
}

function c(e) {
    var t = [], r = e.item, a = r.saleProp, i = void 0 === a ? {} : a, o = r.newColorSize, n = void 0 === o ? [] : o, s = e.item.salePropSeq, c = void 0 === s ? {} : s, p = [];
    if (n.length) {
        if (Q.skuProp.salePropArr) p = Q.skuProp.salePropArr, c = Q.skuProp.salePropSeq; else {
            for (var d in i) i.hasOwnProperty(d) && i[d] && p.push(d);
            p.sort();
            for (var l = [], m = "", g = "", f = [], h = 0, v = p.length; h < v; h++) f = (c[g = p[h]] || []).filter(function(e) {
                return (e || "").trim();
            }), c[g] = f, f.length ? ((m = i[g] || "").length > 2 && (m = m.replace(/^选择/, "").substr(0, 4)), 
            l.push(m)) : p[h] = "";
            p = p.filter(function(e) {
                return "" !== e;
            }), Q.skuProp.salePropArr = p, Q.skuProp.salePropSeq = c, Q.skuProp.propNameArr = l;
        }
        if (Q.skuProp.salePropArr && Q.skuProp.salePropArr.length) for (var k = Q.skuProp.salePropArr, y = Q.skuProp.propNameArr || [], I = 0, S = k.length; I < S; I++) {
            var P = {};
            P.name = k[I], P.text = y[I], P.value = c[k[I]] || [], P.current = u(k[I]), P.current && P.text && t.push(P);
        }
        Q.props = t;
    } else Q.skuIdsArr.push(Q.skuId);
}

function u(e) {
    if (e) {
        var t = Q.newColorSize;
        if (!t.length) return "";
        for (var r = 0, a = t.length; r < a; r++) if (t[r].skuId == Q.skuId) return t[r][e] || "";
    }
}

function p(e) {
    return (e = Number(e)) > 0 ? e.toFixed(2) : W.NO_PRICE;
}

function d() {
    var e = {
        skuId: Q.skuId,
        venderId: Q.venderID,
        cat: Q.category.join(","),
        area: Z,
        extraParam: '{"originid":"3"}',
        buyNum: "1",
        ch: "5",
        callback: "getStockCallback",
        t: Math.random() + ""
    }, t = {
        url: K.REAL_STOCK,
        data: e,
        encoding: "GBK"
    };
    return new Y(function(e, r) {
        V.get(t).then(function(t) {
            var a = t.body;
            a.stock ? (Q.stock = a.stock, o(a.stock), e(Q)) : r("Network Error data.stock false");
        }).catch(function(e) {
            var t = D(e.code, e.message);
            r(t);
        });
    });
}

function l(e) {
    if (e) {
        var t = {
            name: "满额返券",
            content: e.title
        }, r = re(e.actUrl);
        r && (t.actUrl = ~e.actUrl.indexOf("https") ? e.actUrl : "https:" + e.actUrl, t.id = r.id, 
        t.type = t.type, "Jshop" === t.type && (t.actUrl = t.actUrl.trim(), t.actUrl = t.actUrl.indexOf("?") > -1 ? t.actUrl + "&wxAppName=JD" : t.actUrl + "?wxAppName=JD")), 
        Q.promote && Array.isArray(Q.promote) || (Q.promote = []), Q.promote.push(t);
    }
}

function m(e, t) {
    function r(e) {
        switch (e) {
          case -1:
            return "未注册";

          case 50:
          case 59:
            return "注册";

          case 56:
            return "铜牌";

          case 60:
          case 61:
            return "银牌";

          case 62:
            return "金牌";

          case 63:
            return "钻石";

          case 64:
            return "经销商";

          case 110:
            return "VIP";

          case 66:
            return "京东员工";

          case 88:
          case 103:
          case 104:
          case 105:
            return "钻石";

          case 90:
            return "企业";

          case 5001:
          case 5002:
          case 5003:
          case 5004:
          case 5005:
            return "店铺VIP";

          case 6010:
            return "PLUS试用";

          case 6020:
            return "PLUS正式";

          default:
            return "未知";
        }
    }
    if (e.pis && e.pis.length) {
        var a = [];
        try {
            for (var i, o, n, s = e.pis, c = {
                1: "会员特价",
                3: "限购",
                4: "京豆优惠购",
                6: "赠券",
                7: "赠京豆",
                9: "限制",
                10: "赠品",
                11: "封顶",
                15: "满减",
                16: "满送",
                17: "加价购",
                18: "满赠",
                19: "多买优惠",
                20: "团购",
                23: "跨店铺满免",
                29: "赠品池",
                36: "跨店铺满折",
                60: "换购",
                80: "PLUS赠品"
            }, u = 0, p = !1, d = 0, l = s.length; d < l; d++) if (i = s[d], o = (i.pid || "").split("_"), 
            !~(n = (i.etg || "").split(",")).indexOf("11")) for (var m in i) if (f(m) && c[m]) {
                ~"15,16,17,18,19,23,36,60".indexOf(m) && u++;
                var g = {}, v = i.adurl, k = c[m], y = (i[m] || "").replace(/(\.00|\.0[^\d])/g, ""), I = ~y.indexOf("!@@!") ? y.split("!@@!") : [];
                if ("1" == m) {
                    if (I.length > 0) {
                        var S = ~n.indexOf("16"), P = 1 * I[0];
                        q.isLogin ? "1" == e.hit ? (y = "您享受" + r((~" 5001 5002 5003 5004 5005 ".indexOf(" " + P + " ") ? 1 * e.vl : ~" 6010 6020 ".indexOf(" " + P + " ") ? 1 * e.pl : 1 * e.jl) || P) + "会员" + (S ? "专享" : "") + "价：￥" + I[1], 
                        !S || 50 !== P && 59 !== P || (k = "新人专享", y = "您可享受新用户专享价：￥" + I[1])) : y = S ? "未知" : "成为" + r(P) + "会员可享受会员价，最低￥" + I[1] + "起" : y = S ? "请登录 确认是否可享受该优惠" : r(P) + "会员可享受会员价，最低￥" + I[1] + "起";
                    } else y = "未知";
                    ~y.indexOf("PLUS") && (y = "未知");
                } else if ("10" == m || "29" == m || "80" == m) {
                    if (!(y = function(e) {
                        if (!e) return !1;
                        try {
                            return JSON.parse(e.replace("\t", ""));
                        } catch (e) {
                            return !1;
                        }
                    }(I.length > 0 ? I[0] : y)) || !y.length) {
                        y = "未知";
                        break;
                    }
                    var _ = y.filter(function(e) {
                        return e && 2 === e.gt && e.num > 0;
                    });
                    if ("10" === m || "80" === m) _.length > 0 ? ("10" === m && i.customtag && JSON.parse(i.customtag)[2] ? g.name = "组套商品" : g.name = k, 
                    g.title = ("80" === m ? "PLUS会员购买即赠热销商品" : "购买即赠热销商品") + _.length + "件" + (I.length > 0 ? " " + I.slice(1).join("，") : "，赠完即止"), 
                    g.content = _) : y = "未知"; else {
                        var b = {}, N = 0;
                        if ((_ = _.filter(function(e) {
                            return e.pno;
                        })).length > 0) for (var T, O = 0, C = _.length; O < C; O++) b[(T = _[O]).pno] || (b[T.pno] = {
                            pno: T.pno,
                            poolName: T.poolName,
                            list: []
                        }, N++), b[T.pno].list.push(T);
                        if (y = "未知", N > 0) {
                            var A = [];
                            for (var D in b) b.hasOwnProperty(D) && A.push(b[D]);
                            Q.poolList = A;
                        }
                    }
                } else if ("15" == m || "23" == m || "36" == m) {
                    var x = new Date().getTime();
                    ~n.indexOf({
                        15: "4",
                        23: "9",
                        36: "14"
                    }[m]) && (k = {
                        15: "跨店铺满减",
                        23: "跨店铺满免",
                        36: "跨店铺满折"
                    }[m], y = 1e3 * i.st < x ? "【" + k + "进行中】" + y : h(new Date(1e3 * i.st), "mm月dd日hh:ii") + "该商品参加" + k + "活动，" + y);
                }
                for (var E = 0; E < n.length; E++) if (25 == n[E] || 26 == n[E] || 27 == n[E]) {
                    var F = new Date().getTime();
                    k = {
                        25: "跨自营/店铺满减",
                        26: "跨自营/店铺满免",
                        27: "跨自营/店铺满折"
                    }[n[E]], 1e3 * i.st < F ? (i.customtag && JSON.parse(i.customtag).mli && (k = JSON.parse(i.customtag).mli), 
                    y = "【" + k + "进行中】" + y) : y = h(new Date(1e3 * i.st), "mm月dd日hh:ii") + "该商品参加" + k + "活动，" + y, 
                    p = !0;
                    break;
                }
                if ("未知" !== y) {
                    if (g.name || (g.name = k, g.content = y), v || (g.sale = p), "15" == m || "23" == m || "36" == m) {
                        var w = re(v);
                        v && w && (g.type = w.type, g.id = w.id, "Jshop" === w.type ? g.adurl = v.indexOf("?") > -1 ? v.trim() + "&wxAppName=JD" : v.trim() + "?wxAppName=JD" : g.adurl = v);
                    }
                    g.activityId = o[0] || "", a.push(g);
                }
            }
            Q.count = u, Q.promote = a;
        } catch (e) {
            J.log(e);
        }
    }
}

function g(e) {
    var t = Q.promote || [];
    e && (e.limit_text && (t.push({
        name: "PLUS限购",
        content: e.limit_text
    }), t.forEach(function(e) {
        "限购" == e.name && (e.content = "非PLUS会员" + e.content);
    })), e.confine_text && -1 === t.findIndex(function(e) {
        return "限制" == e.name;
    }) && t.push({
        name: "PLUS限制",
        content: e.confine_text
    })), Q.promote = t;
}

function f(e) {
    if (null != e) {
        var t = /\d*/i;
        return e.match(t) == e;
    }
    return !1;
}

function h(e, t) {
    var r = [ "日", "一", "二", "三", "四", "五", "六" ], a = function(e, t) {
        for (var r = 0, a = t - (e + "").length; r < a; r++) e = "0" + e;
        return e + "";
    };
    return t.replace(/yyyy|YYYY/, e.getFullYear()).replace(/yy|YY/, a(e.getFullYear() % 100, 2)).replace(/mm|MM/, a(e.getMonth() + 1, 2)).replace(/m|M/g, e.getMonth() + 1).replace(/dd|DD/, a(e.getDate(), 2)).replace(/d|D/g, e.getDate()).replace(/hh|HH/, a(e.getHours(), 2)).replace(/h|H/g, e.getHours()).replace(/ii|II/, a(e.getMinutes(), 2)).replace(/i|I/g, e.getMinutes()).replace(/ss|SS/, a(e.getSeconds(), 2)).replace(/s|S/g, e.getSeconds()).replace(/w/g, e.getDay()).replace(/W/g, r[e.getDay()]);
}

function v(e, t) {
    e.split(/<br[^>]+>/gi).forEach(function(e) {
        if (e.indexOf("src") > 0) {
            var r = /<[img|IMG].*?src=["|'](.*?)["|']/gi, a = /src=['"]?([^'"]*)['"]?/i, i = e.match(r);
            if (i) for (var o = 0; o < i.length; o++) {
                var n = i[o].match(a);
                if (n[1]) {
                    var s = {};
                    s.type = "image", s.value = n[1], t.push(s);
                }
            }
        }
        var c = b(e).replace("　　", "");
        if (c) {
            var u = {};
            u.type = "string", u.value = k(c), t.push(u);
        }
    });
}

function k(e) {
    if (0 == e.length) return "";
    var t = e.replace(/&amp;/g, "&");
    return t = t.replace(/&lt;/g, "<"), t = t.replace(/&gt;/g, ">"), t = t.replace(/&nbsp;/g, " "), 
    t = t.replace(/&#39;/g, "'"), t = t.replace(/&quot;/g, '"'), t = t.replace(/&hellip;/g, "..."), 
    t = t.replace(/&ldquo;/g, '"'), t = t.replace(/&rdquo;/g, '"'), t = t.replace(/&cap;/g, "∩");
}

function y(e) {
    return e && (e.indexOf("//") >= 0 || e.indexOf("360buyimg") >= 0) ? e : "";
}

function I() {
    ce = [], ue = {}, pe = "", se = 0;
}

function S(e, t) {
    this.success = function(r) {
        var a = {};
        if (e == ie ? ((ce = P(r)) || (ce = _()), se++) : e == oe && (pe = b(r.afterSale), 
        ue = b(r.packList), se++), 2 == se && (a.afterSale = pe, a.packInfo = "string" == typeof ue ? ue : "", 
        a.specific = ce, se = 0, ne)) return ne = !1, t(null, a);
    }, this.fail = function(e) {
        J.log("specCallback Error:", e), ne && (ne = !1, D({
            err: e,
            cb: t
        }));
    };
}

function P(e) {
    var t = [];
    try {
        J.log("createSpecArray:", e);
        var r = /<[tr].*?>(.*?)tr>/gi, a = /([^>]*?)<\/th>/gi, i = /([^>]*?)<\/td>/gi, o = e.match(r), n = void 0;
        if (o) {
            for (var s = 0; s < o.length; s++) {
                var c = o[s].match(a);
                if (c && c[0]) n && t.push(n), (n = {}).content = [], n.title = c[0].replace("</th>", ""); else {
                    var u = o[s].match(i);
                    if (u) {
                        for (var p = [], d = 0; d < u.length; d++) p.push(u[d].replace("</td>", ""));
                        n.content.push(p);
                    }
                }
            }
            n && (t.push(n), n = null);
        }
    } catch (e) {
        J.log("createSpecArray Fail" + e);
    }
    return J.log("specArray-----\x3e", t), t;
}

function _() {
    var e = [], t = {};
    if (t = Q.expAttr ? Q.expAttr : Q.item.expandAttrDesc || {}) {
        var r = {};
        r.content = [], r.title = "";
        for (var a in t) {
            var i = [], o = "";
            o = (i = t[a] || []) instanceof Array ? i[0] : i;
            var n = [];
            n.push(a), n.push(o), r.content.push(n);
        }
        e.push(r);
    }
    return e;
}

function b(e) {
    return "string" == typeof e ? e.replace(/<[^>]+>/g, " ") : "";
}

function N() {
    var e = Q, t = e.spAttr, r = e.category;
    if (/^3\d{7}$/.test(Q.item.skuId)) return T();
    if (Q.item && "1" !== Q.item.warestatus) return T("抱歉，该商品已下柜");
    if ("暂无定价" === Q.price) return T();
    if (r && r.length > 2) {
        var a = r[0], i = r[2];
        if ("4938" === a && "9392" !== i || ~" 1195 13046 13121 13532 13680 5156 ".indexOf(" " + i + " ")) return T();
        if ("6980" == i) return T();
        if ("12274" == i) return T("抱歉，该商品暂不支持在此购买");
        if ("12856" == i) return T("抱歉，该商品暂不支持在此购买");
    }
    if (t) {
        if (t.isLOC > 1 || "1" === t.PinGou || "1" === t.HYKHSP || t.isPickingGoods > 0 || "1" === t.isFlimPrint || 1 * t.isWeChatStock > 0 && !(1 * t.isWeChatStock & 1)) return T();
        if ("1" === t.isSelfService || "2" === t.isSelfService || "5" === t.isSelfService || "1" == t.GiftsGoods || "1" == t.isJMa || "1" === t.isPackBox || "1" === t.isGiftCard) return T("抱歉，该商品不支持单独购买");
        if ("3" === t.LeaseType || "1" === t.fqy || "1" === t.Customize || "2" === t.Customize) return T();
    }
    if ("117761" == Q.venderID) return T();
    if ("591371" === Q.venderID || "198809" === Q.venderID) return T();
    if ("719574" === Q.venderID) return T("抱歉，该商品仅支持在京东APP上购买");
    if (Q.feetype && Q.feetype.datas) {
        if (Q.feetype.dis) return T("抱歉，合约机暂不支持在此购买");
        for (var o in Q.feetype.datas) if (Q.feetype.datas[o].feetypes[0].sku == Q.skuId && "100" == Q.feetype.datas[o].feetypes[0].ft) return void J.log("~~~ ft为100 非合约机商品");
        return T("抱歉，合约机暂不支持在此购买");
    }
}

function T(e) {
    Q.canBuy = !1, Q.tipsContent = e || "抱歉，该商品暂不支持在此购买";
}

function O(e) {
    return new Y(function(t, r) {
        Q.canBuy ? q.getLoginPromise().then(function() {
            var a = void 0, i = "";
            if (a = e.isRelated ? e.skuid : Q.skuId, C("choseShopId")) {
                var o = C("choseShopId").split("----");
                o && o[1] === a && (i = o[0]);
            }
            var n = [ a, i, e.buyNum || 1, e.isRelated ? "" : Q.skuId, (e.isRelated ? "4" : "1") + ",0,0" ];
            e.poolSkus && e.poolSkus.length > 0 && n.push(e.poolSkus.join("_"));
            var s = {
                scene: 2,
                reg: 1,
                type: 0,
                commlist: n.join(","),
                locationid: Z.split("_").slice(0, 3).join("-"),
                t: Math.random()
            };
            R.get("3c_shop", "").then(function(a) {
                var i = a.id || "";
                i && (s.shopid = i);
                var o = {
                    url: K.ADD_CART,
                    data: s,
                    ump: {
                        bizId: ae,
                        opId: 6
                    }
                };
                V.get(o).then(function(a) {
                    var i = a.body, o = i.errId, n = "";
                    if ("0" === o) {
                        var s = 1 * i.cart.mainSkuNum;
                        t(s), B.setCookie({
                            data: {
                                cartNum: {
                                    key: "cartNum",
                                    value: s,
                                    maxAge: 2592e6
                                }
                            }
                        });
                    } else "8968" === o ? n = "商品数量最大超过200" : "8969" === o ? n = "添加商品失败，已超出购物车最大容量！" : "13" === o ? q.doLogin().then(function() {
                        O(e);
                    }).catch(function(e, t) {
                        r("用户未登录(13)");
                    }) : n = "添加失败，请稍后再试";
                    n && r(n + "(" + o + ")");
                }).catch(function(e) {
                    e.code, e.message;
                });
            });
        }).catch(function(e, t) {
            r("用户未登录(13)");
        }) : r("can not add");
    });
}

function C(e) {
    return B.getCookie(e);
}

function A(e, t) {
    t || (t = window.location.href), e = e.replace(/[[]]/g, "\\$&");
    var r = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
    return r ? r[2] ? decodeURIComponent(r[2].replace(/\+/g, " ")) : "" : null;
}

function D(e, t) {
    var r = "";
    switch (t = t || '"Network Error"', e) {
      case M.RET_HTTP_RESPONSE_ERROR:
        r = M.Text_RET_HTTP_RESPONSE_ERROR;
        break;

      case M.RET_WS_CONNECT_ERROR:
        r = M.Text_RET_WS_CONNECT_ERROR;
        break;

      case M.RET_WS_REQUEST_TIMEOUT:
        r = M.Text_RET_WS_REQUEST_TIMEOUT;
        break;

      default:
        r = t;
    }
    return r;
}

function x(e) {
    var t = function(e) {
        return (e < 10 ? "0" : "") + e;
    };
    return {
        year: e.getFullYear(),
        month: t(e.getMonth() + 1),
        day: t(e.getDate()),
        hour: t(e.getHours()),
        min: t(e.getMinutes()),
        sec: t(e.getSeconds())
    };
}

function E(e) {
    var t = /(\[\S+\])?(\S+)/;
    e.Author && (e.AuthorArr = e.Author.match(t)), e.Editor && (e.EditerArr = e.Editer.match(t)), 
    e.Drawer && (e.DrawerArr = e.Drawer.match(t)), e.Photography && (e.PhotographyArr = e.Photography.match(t)), 
    e.Write && (e.WriteArr = e.Write.match(t));
}

var F = require("./item_bean").default, w = require("../../api/Ptag/report_manager"), R = require("../../common/localStorage.js"), j = require("../../common/user_info.js"), M = require("../../common/http_constant.js"), L = require("../../common/url_utils.js"), U = require("../../api/Ptag/Ptag_constants.js"), B = require("../../common/cookie-v2/cookie.js"), q = require("../../common/login/login.js"), G = require("../../common/utils.js"), z = require("./detail/detail_api.js"), H = require("../../common/fe_helper.js"), V = require("../../common/request/request.js"), Y = require("../../libs/promise.min.js"), J = new (require("../../common/logger.js"))("商详 model"), W = {
    NO_PRICE: "暂无定价",
    GOODS_NOT_EXIST: "该商品已被删除"
}, K = {
    ITEM_INFO: "https://wqitem.jd.com/item/waview",
    COUPON_INFO: "https://wq.jd.com/mjgj/fans/queryusegetcoupon",
    VENDER_INFO: "https://wq.jd.com/mshop/BatchGetShopInfoByVenderId",
    REAL_PRICE: "https://pe.3.cn/prices/pcpmgets",
    REAL_STOCK: "https://c.3.cn/stock",
    DETAIL_IMAGES: "https://wqsitem.jd.com/detail/%sku%_%descriptionId%.html",
    SPEC_INFO: "https://yx.3.cn/service/info.action",
    COMMENT_LIST: "https://wq.jd.com/commodity/comment/getcommentlist",
    MARKET_PRICE: "https://rms.shop.jd.com/json/vender/msAdsmyDynValue.action",
    SUIT_INFO: "https://c.3.cn/recommend",
    ADD_CART: "https://wq.jd.com/deal/mshopcart/addcmdy",
    SUIT_PRICE: "https://suit.3.cn/suit/suitprice",
    SAM_CARD_STATE: "https://wq.jd.com/samclubmember/getcardstate",
    GLOBAL_NOTICE: "https://hk.jd.com/notice/getInfo.do",
    ATMOSPHERE: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33274.jsonp",
    ITEM_CONFIG: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33270.jsonp",
    FOLD_COMMENT: "https://wq.jd.com/commodity/comment/getfoldcommentlist",
    PROMISE_INFO: "https://wq.jd.com/commodity/promise/get",
    GETSHOPLIST: "https://wq.jd.com/deal/locshop/getshoplist",
    CHANGELNGLAT: "https://wq.jd.com/deal/trademisc/getregioninfobylnglat",
    PROFIT_BELT: "https://ad.3.cn/wbs/mgets",
    SALE_ATM: "https://wq.360buyimg.com/data/ppms/js/ppms.pagev33978.jsonp"
}, X = j.getUserAddressDes(), Z = j.getUserAddressID(), $ = 0, Q = new F(), ee = 0, te = {
    isBlockShopURL: "false",
    isBlockBabelURL: "false",
    isBlockJShopURL: "false"
}, re = z.checkURL(te), ae = 760, ie = "1", oe = "2", ne = !0, se = 0, ce = void 0, ue = void 0, pe = void 0, de = [];

module.exports = {
    initItem: e,
    initAddress: function() {
        var e = j.getAddress();
        (e.areaId || e.addressId) && ($ = e.addressId, Z = e.areaId, X = e.addressName);
    },
    getRealPrice: function() {
        var e = {
            skuids: Q.skuId,
            origin: "5",
            area: Z,
            source: "wxsqitemsou",
            ext: "11",
            pin: encodeURIComponent(j.gUserData().pin),
            t: Math.random() + ""
        }, r = {
            url: K.REAL_PRICE,
            data: e
        };
        return new Y(function(e, a) {
            V.get(r).then(function(r) {
                var a = r.body, i = [];
                if (a[0].p && (Q.price = p(a[0].p), Q.originPrice = p(a[0].op), Q.marketPrice = p(a[0].m), 
                Q.skuPrice = a[0].p), a[0].tkp && (Q.specialPrice = p(a[0].tkp)), a[0].pp && (Q.plusPrice = p(a[0].pp)), 
                a[0].tpp && (Q.trialPlusPrice = p(a[0].tpp)), a[0].sp && (Q.samPrice = p(a[0].sp)), 
                a[0].up) switch (i = a[0].up.split(","), Q.priorityPrice = "", i[0]) {
                  case "tkp":
                    Q.priorityPrice = "specialPrice";
                    break;

                  case "pp":
                    Q.priorityPrice = "plusPrice";
                    break;

                  case "tpp":
                    Q.priorityPrice = "trialPlusPrice";
                    break;

                  case "sp":
                    Q.priorityPrice = "samPrice";
                }
                return a[0].np && (Q.promoNoticeFlag = !0, Q.np = a[0].np), t({
                    skuId: Q.skuId,
                    imgTag: Q.pTag,
                    np: a[0].np,
                    category: Q.category
                }).then(function(t) {
                    Q.postPromo = t, e(Q);
                }).catch(function(t) {
                    e(Q);
                });
            }).catch(function(e) {
                var t = D(e.code, e.message);
                a(t);
            });
        });
    },
    getRealStock: d,
    getSpecifySku: function(e, t) {
        var r = [], a = t || Q.newColorSize;
        if (a) for (var i = 0; i < a.length; i++) {
            var o = !1;
            for (var n in e) e[n] && a[i][n] != e[n] && (o = !0);
            o || r.push(a[i].skuId);
        }
        return r;
    },
    setAddrData: function(e, t, r, a) {
        Z == e && X == t && $ != r || (Z = e, X = t, $ = r, j.updateAddress({
            addressId: $,
            areaId: Z,
            areaName: X,
            addressName: a
        }));
    },
    getTicket: function() {
        var e = {
            sku: Q.skuId,
            cid: Q.category[2],
            popId: 3 == Q.spAttr.isOverseaPurchase ? "8889" : Q.isPop ? Q.venderID : "8888",
            platform: "5",
            callback: "getCouponListCB",
            pin: encodeURIComponent(j.gUserData().pin),
            t: Math.random() + ""
        };
        Q.isPop && (e.popId = Q.venderID);
        var t = {
            url: K.COUPON_INFO,
            data: e,
            ump: {
                bizId: ae,
                opId: 9
            }
        };
        return new Y(function(e, r) {
            V.get(t).then(function(t) {
                var a = t.body;
                if ("success" == a.msg) {
                    a.use_coupons = a.use_coupons.map(function(e) {
                        return e.isUse = !0, e.discount = parseInt(e.parValue, 10), e.quota = parseInt(e.quota, 10), 
                        e.couponType = e.type, e;
                    });
                    var i = a.coupons.concat(a.use_coupons), o = {}, n = {
                        coupons: i = (i = i.filter(function(e) {
                            return 0 != e.couponKind && !o[e.quota + "-" + e.discount] && (o[e.quota + "-" + e.discount] = !0, 
                            !0);
                        })).sort(function(e, t) {
                            return e.quota / e.discount - t.quota / t.discount;
                        })
                    }, c = /有效期(.*)至(.*)/, u = /有效期(\d+)天/, p = /(\d+)-(\d+)-(\d+)(.*)/, d = function(e) {
                        return e = e.replace(p, function(e, t, r, a, i) {
                            return [ t, parseInt(r), parseInt(a) ].join(".") + i;
                        });
                    };
                    i.map(function(e) {
                        c.test(e.timeDesc) ? e.timeDesc = e.timeDesc.replace(c, function(t, r, a, i) {
                            e.time = d(r) + " - " + d(a);
                        }) : u.test(e.timeDesc) && (e.timeDesc = e.timeDesc.replace(u, function(t, r) {
                            e.time = "自领取后" + r + "天内有效";
                        }));
                    });
                    var l = a.sku_info, m = Q.service || [];
                    if (l) {
                        var g = l.limitCouponDesc;
                        g && s(m, g, g, !1);
                    }
                    e({
                        ticket: n,
                        services: m
                    });
                } else r(a.msg || "data invalid");
            }).catch(function(e) {
                var t = D(e.code, e.message);
                r(t);
            });
        });
    },
    getAreaId: function() {
        return Z;
    },
    getAreaDesc: function() {
        return X;
    },
    getAdid: function() {
        return $;
    },
    getInfo: function(e, t, r) {
        var a = e || Q.skuId, i = r || "d" + a;
        t || (t = Q.skuType);
        var o = {
            url: K.DETAIL_IMAGES.replace("%sku%", a).replace("%descriptionId%", i),
            data: {},
            encoding: "GBK"
        };
        return new Y(function(e, r) {
            V.get(o).then(function(a) {
                var i = a.body;
                if ("2" === t || "3" === t) {
                    var o = t, n = {
                        productFeatures: "产品特色",
                        editerDesc: "编辑推荐",
                        contentDesc: "内容简介",
                        authorDesc: "作者简介",
                        image: "内页插图",
                        comments: "精彩书评",
                        catalogue: "目录",
                        bookAbstract: "精彩书摘",
                        introduction: "前言/序言"
                    }, s = {
                        productFeatures: "产品特色",
                        editerDesc: "编辑推荐",
                        contentDesc: "专辑介绍",
                        biography: "艺人介绍",
                        catalogue: "曲目",
                        comments: "精彩赏评",
                        image: "精彩剧照",
                        mvdColor: "色差"
                    };
                    if ("1" == i.success) {
                        var c = [], u = 2 == o ? n : s;
                        for (var p in u) if (i[p]) {
                            var d = {}, l = [];
                            if ("image" == p) {
                                d.title = u[p];
                                for (var m = i[p].split(";") || [], g = 0, f = m.length; g < f; g++) {
                                    var h = {};
                                    h.type = "image", h.value = m[g], l.push(h);
                                }
                                d.content = l, c.push(d);
                            } else if (i[p].indexOf("<p>") >= 0) {
                                var k = /<p>(.*?)<\/p>/gi, I = i[p].match(k);
                                if (I) {
                                    for (var S = 0; S < I.length; S++) v(I[S], l);
                                    l.length > 0 && (d.title = u[p], d.content = l, c.push(d));
                                }
                            } else v(i[p], l), d.title = u[p], d.content = l, c.push(d);
                        }
                        e(c);
                    } else r("该商品暂无商品详情");
                } else {
                    i && i.content ? i = (i = i.content).replace(/\\/gi, "").replace(/\n/gi, "").replace(/\r/gi, "") : r("没有图片");
                    var P = [], _ = /background-image:url\((.*?)\)/gi, b = i.match(_);
                    if (b) for (var N = 0; N < b.length; N++) if (b[N].indexOf("360buyimg")) {
                        var T = b[N].replace("background-image:url(", "").replace(")", "");
                        y(T) && P.push(T);
                    }
                    var O = /[(&lt;)<][img|IMG].*?src=["|'](.*?)["|']/gi, C = /src=['"]?([^'"]*)['"]?/i, A = i.match(O);
                    if (A) for (var D = 0; D < A.length; D++) {
                        var x = A[D].match(C);
                        y(x[1]) && P.push(x[1]);
                    }
                    P.length > 0 ? e(P) : r("没有图片");
                }
            }).catch(function(e) {
                var t = D(e.code, e.message);
                r(t);
            });
        });
    },
    getSpec: function(e, t, r) {
        if (2 == t || 3 == t) {
            var a = {}, i = [], o = {};
            o.content = [], o.title = 2 == Q.skuType ? "图书参数" : "音像参数";
            var n = {
                ISBN: "ISBN",
                ISSN: "ISSN",
                BookName: "营销书名",
                ForeignBookName: "外文书名",
                Language: "图书语言",
                Author: "作者",
                Editer: "编者",
                Proofreader: "校对",
                Remarker: "注释",
                Transfer: "译者",
                Drawer: "绘者",
                Publishers: "出版社",
                PublishNo: "出版社号",
                Series: "丛书名",
                Brand: "品牌",
                Package: "包装(装帧)",
                Pages: "页数",
                BatchNo: "版次",
                PublishTime: "出版时间",
                SizeAndHeight: "尺寸及重量",
                ChinaCatalog: "中国法分类号",
                Sheet: "印张",
                Papers: "用纸",
                Attachment: "附件",
                AttachmentNum: "附件数量",
                PackNum: "套装数量",
                Letters: "字数",
                KeyWords: "主题词",
                PickState: "捡货标记",
                Compile: "编纂",
                Photography: "摄影",
                Dictation: "口述",
                Read: "朗读",
                Finishing: "整理",
                Write: "书写",
                saleDate: "上架时间",
                Format: "开本"
            }, s = {
                Aka: "又名",
                Brand: "品牌",
                Foreignname: "外文名",
                ISBN: "ISBN",
                Mvd_Wxjz: "文像进字",
                Mvd_Gqyz: "国权音字",
                Mvd_wyjz: "文音进字",
                ISRC: "ISRC",
                Mvd_Dcz: "电出字",
                Mvd_Xcyg: "新出音管",
                Press: "出版社",
                Publishing_Company: "发行公司",
                Production_Company: "出品公司",
                Copyright: "版权提供",
                Actor: "演员",
                Director: "导演",
                Dub: "配音",
                Voiceover: "解说者",
                Screenwriter: "编剧",
                Producer: "监制",
                Singer: "演唱者",
                Performer: "演奏者",
                Authorsstr: "作词",
                Compose: "作曲",
                Command: "指挥",
                Orchestra: "知名乐团",
                Media: "介质",
                Soundtrack: "碟数",
                Number_Of_Discs: "碟片数",
                Episode: "集数",
                Record_Number: "唱片数量",
                Publication_Date: "出版日期",
                Release_Date: "投放市场的日期",
                ReleaseDate: "上映日期",
                Accessories: "附件",
                Included_Additional_Item: "附件数量",
                Set_The_Number_Of: "套装数量",
                Region: "区码",
                Length: "片长",
                Screen_Ratio: "屏幕比例",
                Audio_Encoding_Chinese: "音频格式",
                Quality_Description: "品质说明",
                Dregion: "地区",
                Language: "图书语言",
                Language_Dubbed: "配音语言",
                Language_Subtitled: "字幕语言",
                Version_Language: "版本语言",
                Language_Pronunciation: "发音语言",
                Menu_Language: "菜单语言",
                Platform: "操作系统",
                Minimum_System_Requirement_Description: "最低配置要求",
                Recommended_System_Description: "推荐配置要求",
                Online_Play_Description: "在线游戏",
                Awards: "获奖情况",
                Type_Keywords: "商品类型关键词",
                Keywords: "主题词",
                Readers: "读者对象",
                Number_Of_Players: "游戏人员数量",
                Mfg_Minimum: "最小年龄",
                Mfg_Maximum: "最大年龄",
                Compile: "编纂",
                Photography: "摄影",
                Dictation: "口述",
                Read: "朗读",
                Finishing: "整理",
                Write: "书写",
                Version: "产品评级（可链入搜索结果页）",
                Color: "厂牌（可链入搜索结果页）",
                Type: "录音模式",
                Format: "画面色彩",
                saleDate: "上架时间:"
            }, c = Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e);
            }, u = 2 == Q.skuType ? n : s;
            for (var p in u) {
                var d = [];
                if (Q.item && Q.item[p]) {
                    if (c(Q.item[p])) {
                        for (var l, m = [], g = 0, f = Q.item[p].length; g < f; g++) (l = Q.item[p][g].replace(/(^\s*)|(\s*$)/g, "")) && m.push(l);
                        if (m.length < 1) continue;
                        d.push(u[p]), d.push(m.join(","));
                    } else d.push(u[p]), d.push(Q.item[p]);
                    o.content.push(d);
                }
            }
            return i.push(o), a.afterSale = "", a.packInfo = "", a.specific = i, r(null, a);
        }
        ne = !0;
        var h = {
            k: Q.specification ? Q.specification : "g" + e,
            t: Math.random()
        }, v = new S(ie, r);
        wx.$request({
            url: K.SPEC_INFO,
            method: "GET",
            dataType: "html",
            encoding: "GBK",
            data: h
        }).then(function(e) {
            var t = e.body;
            v.success(t);
        }, function(e) {
            var t = e.code;
            e.message, v.fail(t);
        });
        var k = {
            k1: Q.skuId,
            t: Math.random()
        }, y = new S(oe, r), I = {
            url: K.SPEC_INFO,
            data: k,
            encoding: "GBK"
        };
        V.get(I).then(function(e) {
            y.success(e.body);
        }).catch(function(e) {
            var t = e.code;
            e.message, y.fail(t);
        });
    },
    getComment: function(e, t, r) {
        return new Y(function(a, i) {
            for (var o = 0; o < de.length; o++) if (de[o].skuId == r && de[o].type == e && de[o].page == t) {
                var n = de[o].data;
                if ("0" === n.errcode) {
                    de.length > 10 && de.pop();
                    var s = {};
                    s.skuId = r, s.type = e, s.page = t, s.data = n, de.unshift(s);
                    var c = {};
                    if ((n = n.result).productCommentSummary && n.comments) {
                        c.productCommentSummary = n.productCommentSummary;
                        for (var u = [], p = 0, d = n.comments.length; p < d; ++p) {
                            var l = n.comments[p];
                            l.content = k(l.content), u.push(l);
                        }
                        c.comments = u, n.hotCommentTagStatistics && (c.hotCommentTagStatistics = n.hotCommentTagStatistics), 
                        a(c);
                    } else J.log("commentCallback Error:" + n), i("评论拉取失败");
                } else J.log("commentCallback Error:" + n), i("评论拉取失败");
                return void J.log("~~getComment缓存命中 type:" + e + " page:" + t);
            }
            var m = {
                sku: r || Q.skuId,
                page: t + 1,
                pagesize: 10,
                score: e,
                sorttype: 5
            }, g = {
                url: K.COMMENT_LIST,
                data: m
            };
            V.get(g).then(function(o) {
                var n = o.body;
                if ("0" === n.errcode) {
                    de.length > 10 && de.pop();
                    var s = {};
                    s.skuId = r || Q.skuId, s.type = e, s.page = t, s.data = n, de.unshift(s);
                    var c = {};
                    if ((n = n.result).productCommentSummary && n.comments) {
                        c.productCommentSummary = n.productCommentSummary;
                        for (var u = [], p = 0, d = n.comments.length; p < d; ++p) {
                            var l = n.comments[p];
                            l.content = k(l.content), u.push(l);
                        }
                        c.comments = u, n.hotCommentTagStatistics && (c.hotCommentTagStatistics = n.hotCommentTagStatistics), 
                        a(c);
                    } else J.log("commentCallback Error:" + n), i("评论拉取失败");
                } else J.log("commentCallback Error:" + n), i("评论拉取失败");
            }).catch(function(e) {
                var t = D(e.code, e.message);
                i(t);
            });
        });
    },
    getMarketPrice: function(e) {
        return new Y(function(e, t) {
            if (1713 == Q.category[0]) {
                var r = {
                    title: "",
                    price: ""
                };
                parseFloat(Q.marketPrice) > 0 && (r.title = "定价", r.price = Q.marketPrice), e(r);
            } else if (6728 == Q.category[0] || 1315 == Q.category[0] || 11729 == Q.category[0] || 1672 == Q.category[0] || 1318 == Q.category[0] || 2615 == Q.category[1] || 5026 == Q.category[1] || 2599 == Q.category[1]) {
                var a = {
                    venderId: Q.venderID,
                    dynamicKey: "sjdpjqtxs",
                    t: Math.random()
                }, i = {
                    url: K.MARKET_PRICE,
                    data: a,
                    ecoding: "GBK"
                };
                V.get(i).then(function(t) {
                    var r = {
                        title: "",
                        price: ""
                    };
                    t.body.value && parseFloat(Q.marketPrice) > 0 && (r.title = "吊牌价", r.price = Q.marketPrice), 
                    e(r);
                }).catch(function(e) {
                    var r = D(e.code, e.message);
                    t(r);
                });
            } else e({});
        });
    },
    addCart: O,
    getCookie: C,
    getVenderInfo: function(e) {
        var t = K.VENDER_INFO, r = {
            venderIds: e
        };
        return new Y(function(e, a) {
            V.get(t, r).then(function(t) {
                var r = {}, i = t.body;
                if (0 != i.errcode) a(i.msg); else {
                    if (i.data && i.data.length > 0) {
                        var o = i.data[0].shopInfo;
                        "1" == o.isZy && (r.flag = "京东自营"), r.isZy = "1" == o.isZy, r.shopName = o.shopName, 
                        r.shopLogoUrl = H.getImg(o.shopLogoUrl), r.goodsNum = o.goodsNum, r.shopFansNum = o.shopFansNum, 
                        r.isDiamond = 0 != o.isDiamond, r.venderId = o.venderId, r.shopId = i.data[0].shopId, 
                        r.shopFansNum = Number(r.shopFansNum), r.shopFansNum < 1e4 ? r.shopFansNum = r.shopFansNum : r.shopFansNum <= 99999 ? r.shopFansNum = (r.shopFansNum / 1e4).toFixed(1) + "万" : r.shopFansNum = (r.shopFansNum / 1e4).toFixed(0) + "万", 
                        "1" != o.isZy && (+o.goodsSatisfaction >= +o.avgGoodsSatftion ? r.goodsScoreFlag = "高" : r.goodsScoreFlag = "低", 
                        +o.serviceSatisfaction >= +o.avgServiceSatftion ? r.serviceScoreFlag = "高" : r.serviceScoreFlag = "低", 
                        +o.effiSatisfaction >= +o.avgEffiSatftion ? r.effiScoreFlag = "高" : r.effiScoreFlag = "低", 
                        r.totalScore = Number(o.totalScore).toFixed(2), r.goodsScore = Number(o.goodsSatisfaction).toFixed(2), 
                        r.serviceScore = Number(o.serviceSatisfaction).toFixed(2), r.effiScore = Number(o.effiSatisfaction).toFixed(2)), 
                        r.categoryGoodShopCode = i.data[0].categoryGoodShopCode, r.commonGoodShopCodeconsole = i.data[0].commonGoodShopCode;
                    }
                    e(r);
                }
            }).catch(function(e) {
                var t = D(e.code, e.message);
                a(t);
            });
        });
    },
    getRelatedItem: function() {
        var e = {
            methods: "suitv2",
            channel: 4,
            sku: Q.skuId,
            cat: Q.category.slice(0, 3).join(","),
            area: Z
        }, t = {
            url: K.SUIT_INFO,
            encoding: "GBK",
            data: e,
            ump: {
                bizId: ae,
                opId: 8,
                reportHook: function(e) {
                    var t = 0;
                    return e && e.suit && 200 == e.suit.status && e.suit.data || (t = 1), {
                        code: t,
                        message: e.error_msg
                    };
                }
            }
        };
        return new Y(function(e, r) {
            V.get(t).then(function(t) {
                var a = t.body;
                if (a && a.suit && 200 == a.suit.status && a.suit.data) {
                    for (var i, o = Q.item, n = [], s = 0, c = o.newColorSize.length; s < c; s++) if ((i = o.newColorSize[s]).skuId == Q.skuId) for (var u = 1, p = Object.keys(o.saleProp).length; u < p; u++) n.push(i[u]);
                    var d = {
                        name: "优惠套装",
                        title: "",
                        content: []
                    }, l = [], m = 0, g = {
                        type: 0,
                        sku: Q.skuId,
                        name: o.skuName,
                        num: 1,
                        img: Q.images[0],
                        choose: n.join(" "),
                        link: "",
                        finalPrice: Q.price
                    }, f = a.suit.data.packList, h = {}, v = {}, k = {}, y = [], I = {}, S = {};
                    if (!f || !f.length) return r("该商品无优惠套装");
                    for (var P = 0, _ = f.length; P < _; P++) if (1 != (v = f[P]).suitType && (v.packPrice = v.packPrice || {}, 
                    k = {}, y = [], h = v.poolList, m = Math.max(m, v.baseSuitDiscount), k.reid = v.packId, 
                    k.price = v.packPromotionPrice.toFixed(2), k.dis = v.baseSuitDiscount.toFixed(2), 
                    k.mprice = (v.baseSuitDiscount + v.packPromotionPrice).toFixed(2), k.item = [ g ], 
                    !(k.dis <= 0 || k.price <= 0 || k.mprice <= 0))) {
                        y.push(v.packId), y.push(Q.skuId);
                        for (var b = h.length, N = 0; N < b; N++) if (1 == (I = h[N] || {}).selectState) {
                            var T = (I.colorList || []).filter(function(e) {
                                return e && e.skuId;
                            }), O = T.length;
                            if (!(O < 1)) {
                                S = T[0], y.push(S.skuId), S.imgUrl = "//img14.360buyimg.com/n4/" + S.skuPicUrl;
                                for (var C, A = [], D = 0, x = I.saleNames.length; D < x; D++) C = I.saleNames[D], 
                                A.push(S[C]);
                                k.item.push({
                                    type: 1,
                                    sku: S.skuId,
                                    link: "",
                                    name: S.skuName,
                                    choose: A.join(" "),
                                    img: S.imgUrl,
                                    num: I.num,
                                    finalPrice: S.finalPrice,
                                    canChoose: O > 1
                                });
                            }
                        }
                        k.cartid = y.join("_"), l.push(k);
                    }
                    l.length > 0 && (d.title = "最高省" + m.toFixed(2) + "元，共" + l.length + "款", d.content = l, 
                    Q.promote ? Q.promote.push(d) : Q.promote = [ d ]), e({
                        promote: Q.promote,
                        packs: a.suit.data
                    });
                } else r("suit data error");
            }).catch(function(e) {
                var t = D(e.code, e.message);
                r(t);
            });
        });
    },
    fetchSuitPrice: function(e) {
        var t = e.suitId, r = e.skuIds, a = [ t, r ].join(",");
        if (Q.suitPrice[a]) {
            var i = Q.suitPrice[a];
            return Y.resolve(i);
        }
        var o = {
            suitId: t,
            skuIds: r,
            origin: 4,
            webSite: 1,
            callback: "jdSuitprice",
            t: Math.random() + ""
        }, n = {
            url: K.SUIT_PRICE,
            data: o
        };
        return new Y(function(e, t) {
            V.get(n).then(function(t) {
                var r = t.body;
                t.header, Q.suitPrice[a] = r, e(r);
            }).catch(function(e) {
                var r = D(e.code, e.message);
                t(r);
            });
        });
    },
    foldComment: function(e, t, r) {
        var a = {
            sku: r || Q.skuId,
            page: t + 1,
            pagesize: 10,
            score: e
        }, i = {
            url: K.FOLD_COMMENT,
            data: a
        };
        return V.get(i).then(function(e) {
            return e.body.result;
        }).catch(function(e) {
            var t = D(e.code, e.message);
            return Y.reject(t);
        });
    },
    samCardState: function() {
        var e = {
            url: K.SAM_CARD_STATE,
            data: {}
        };
        return V.get(e).then(function(e) {
            var t = e.body, r = {};
            return 0 == t.retcode && (r.isBind = 1 == t.sam_is_bind, r.isCardMember = 1 == t.sam_card_status, 
            r.bindType = t.sam_binding_type), r;
        }).catch(function(e) {
            var t = e.code, r = e.message;
            return Y.reject({
                code: t,
                message: r
            });
        });
    },
    getGlobalNotice: function(e, t) {
        if (!e || !t) return Y.resolve([]);
        var r = {
            url: K.GLOBAL_NOTICE,
            data: {
                callback: "globalBuyNoticeCB",
                platform: "3",
                category: e,
                type: t
            }
        }, a = /<img\b.*?(?:>|\/>)/gi, i = /<img\b.*?src=["|'](.*?)["|']/;
        return V.get(r).then(function(e) {
            var t = e.body;
            if (t.notices && t.notices.length) {
                var r = [];
                return t.notices.forEach(function(e) {
                    var t = e.htmlNotice.match(a), o = [];
                    t && t.forEach(function(e) {
                        var t = i.exec(e);
                        t[1] && o.push(t[1]);
                    }), r.push(o);
                }), r;
            }
            return [];
        }).catch(function(e) {
            var t = e.code, r = e.message;
            return Y.reject({
                code: t,
                message: r
            });
        });
    },
    getShopList: function(e, t, r, a, i) {
        var o = {
            coords: e,
            venderid: t,
            shopgroupid: r,
            sku: a,
            locationid: i,
            loctype: arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
            num: "-1",
            callback: "getShopList"
        }, n = {
            url: K.GETSHOPLIST,
            data: o
        };
        return new Y(function(e, t) {
            V.get(n).then(function(t) {
                var r = t.body;
                e(r);
            }).catch(function(e) {
                e.code, e.message, t("接口错误");
            });
        });
    },
    changelaglat: function(e, t) {
        var r = {
            lng: e,
            lat: t
        }, a = {
            url: K.CHANGELNGLAT,
            data: r
        };
        return new Y(function(e, t) {
            V.get(a).then(function(t) {
                var r = t.body;
                e(r);
            }).catch(function(e) {
                e.code, e.message, t("接口错误");
            });
        });
    },
    getProfitBelt: function(e) {
        var t = e.skuId, r = e.cateId, a = e.venderId, i = e.isGlobal, o = e.isDQ, n = e.shopId, s = void 0 === n ? 0 : n, c = K.PROFIT_BELT, u = {
            callback: "profitBeltCb",
            search: t + "_" + o + "_" + i + "," + r + "," + a + "," + s,
            source: "wxapp"
        };
        return new Y(function(e, t) {
            V.get(c, u).then(function(t) {
                var r = t.body;
                r.length && r[0].result ? Q.profitBelt = r[0] : Q.profitBelt = {}, e(Q);
            }).catch(function(e) {
                var r = D(e.code, e.message);
                t(r);
            });
        });
    },
    saleAtmos: function() {
        var e = K.SALE_ATM;
        return new Y(function(t, r) {
            V.get(e).then(function(e) {
                e.body.data.length || t({});
                var r = void 0;
                r = e.body.data.map(function(e) {
                    var t = +new Date(e.endTime), r = +new Date(e.startTime), a = H.getServerTime();
                    if (t > a && r < a) {
                        var i = e.buyBtnColor.split(","), o = e.cartBtnColor.split(",");
                        return i.length > 1 && (e.buyBtnColor = "linear-gradient(to right," + i.join(",") + ");"), 
                        o.length > 1 && (e.cartBtnColor = "linear-gradient(to right," + o.join(",") + ");"), 
                        e;
                    }
                }), t(r);
            }).catch(function(e) {
                var t = D(e.code, e.message);
                r(t);
            });
        });
    }
};