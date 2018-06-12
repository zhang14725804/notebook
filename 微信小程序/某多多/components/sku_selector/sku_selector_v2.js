function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = require("../../common/index"), a = e(require("../../constants/goods")), u = e(require("../../storage/ram_manager")), s = e(require("../../controller/formid_controller")), l = {
    show: "sku-selector-main sku-selector-main-show",
    focus: "sku-selector-main sku-selector-main-focus",
    hide: "sku-selector-main " + (t.SystemInfo.getIpxJudgment() ? "fix-ipx-sku-selector-main-hide" : "sku-selector-main-hide")
}, r = {
    free: 0,
    selected: 1,
    disable: 2
}, o = [ "sku-spec-value", "sku-spec-value sku-spec-value-selected", "sku-spec-value sku-spec-value-disable" ], i = {
    enable: "sku-selector-reduce",
    disable: "sku-selector-reduce sku-selector-reduce-disable"
}, n = {
    enable: "sku-selector-increase",
    disable: "sku-selector-increase sku-selector-increase-disable"
}, d = {
    confirmSku: function(e) {
        var t = u.default.CPData.goodsNumber, a = d.allQuantityCount || 1e5;
        if (t < 1 && (u.default.CPData.goodsNumber = 1), t > a) return u.default.CPData.goodsNumber = a, 
        void u.default.CPPage.$showToast("很抱歉，该商品当前至多只能购买" + a + "份");
        var l = (d.sourceData || {}).pageName;
        if (e && e.detail && e.detail.formId) {
            var r = e.detail.formId, o = {
                scene: s.default.scene.common,
                form_id: r
            };
            "group" == l ? (o.child_scene = "group_sku_submit_clk", s.default.uploadFormIdToSH(r, !1)) : "goods" == l && (o.child_scene = "goods_sku_submit_clk", 
            e && e.detail && e.detail.formId && s.default.uploadFormIdToSH(e.detail.formId, !1));
        }
        d.skuTrackingRecord("click", "confirm_btn"), u.default.CPData.selectSku ? (d.hide({
            directHide: !0
        }), d.confirmOrder({
            skuId: u.default.CPData.selectSku,
            goodsNumber: u.default.CPData.goodsNumber,
            newUserAlertVisible: u.default.CPData.newUserAlertVisible
        })) : u.default.CPPage.$showToast(u.default.CPData.specDesc);
    },
    confirmOrder: function(e) {
        try {
            var a = e || {}, s = a.skuId, l = a.goodsNumber, r = a.newUserAlertVisible;
            l = l || 1;
            var o = u.default.CPData.goodsInfo;
            if (!o) return;
            var i = o.skus;
            if (!i) return;
            var n = void 0;
            if (1 === i.length) n = i[0]; else if (i.length > 1) for (var d = 0; d < i.length; ++d) if (i[d].skuId == s) {
                n = i[d];
                break;
            }
            if (null !== n) {
                var c = u.default.CPData.selectedGroup || o.groupTypes[1], f = c.groupId, g = c.requireNum, p = {
                    sku_id: n.skuId,
                    group_id: f,
                    goods_id: o.goodsId,
                    goods_number: l
                }, m = u.default.CPData.mallInfo || {};
                u.default.CPPage.transGoodsData = {
                    goodsId: o.goodsId,
                    preMallLogo: m.logo,
                    preMallName: m.mallName,
                    preGoodsName: o.goodsName,
                    prePrice: c.price,
                    preThumbUrl: u.default.CPData.currentSkuImg || o.thumbUrl
                };
                var k = u.default.CPPage.groupOrderId, y = u.default.CPData.selectedLocalGroupOrderId;
                y && (k = y);
                var P = u.default.CPPage.openNewGroup;
                !k || r || P || (p.group_order_id = k), u.default.CPPage.referPageElement && (p.refer_page_element = u.default.CPPage.referPageElement), 
                g && (p.group_num = g), u.default.CPPage.$urlQueryObj && u.default.CPPage.$urlQueryObj.duoduo_type && (p.duoduo_type = u.default.CPPage.$urlQueryObj.duoduo_type), 
                u.default.CPPage.$urlQueryObj && "scan_code" == u.default.CPPage.$urlQueryObj.share_form && (p.share_form = u.default.CPPage.$urlQueryObj.share_form), 
                u.default.CPPage.sourceChannel && (p.source_channel = u.default.CPPage.sourceChannel);
                var C = "/pages/order_checkout/order_checkout?" + t.UrlUtil.buildQuery(p);
                t.Navigation.forward(C);
            }
        } catch (e) {
            console.error(e);
        }
    },
    viewSkuImage: function(e) {
        var t = e.target.dataset, a = void 0;
        t && (a = t.url), a && d.previewImage(a);
    },
    goodsNumberFocus: function(e) {
        var t = parseInt(e.detail.height || 0);
        u.default.CPSetData({
            mainClass: l.focus,
            keyboardHeight: "transform:translateY(-" + t + "px);"
        });
    },
    goodsNumberBlur: function() {
        var e = u.default.CPData.goodsNumber, a = d.allQuantityCount || 1e5, s = u.default.CPData.selectSku, r = {};
        if (r.mainClass = l.show, r.keyboardHeight = "transform:translateY(0rpx);", s) {
            var o = d.skuInfos[s];
            a = d.getLimitQuantity(o.quantity, o.limitQuantity);
        }
        e < 1 && (u.default.CPData.goodsNumber = 1), e > a ? (r.goodsNumber = a, u.default.CPPage.$showToast("很抱歉，该商品当前至多只能购买" + a + "份")) : e < 1 ? r.goodsNumber = 1 : e >= 1 && e <= a && (r.goodsNumber = e), 
        r = t.ObjectUtil.assign(r, d.setGoodsNumberButton()), u.default.CPSetData(r), d.skuTrackingRecord("click", "input", {
            input_num: e,
            show_num: r.goodsNumber
        });
    },
    goodsNumberChange: function(e) {
        var t = parseInt(e.detail.value, 10);
        isNaN(t) && (t = 0), t = t || 0, u.default.CPData.goodsNumber = t;
    },
    updateGoodsNumber: function(e) {
        var a = e.currentTarget.dataset, s = {};
        if (a && a.delta) {
            var l = parseInt(a.delta);
            if (u.default.CPData.reduceDisable && l < 0) return;
            if (u.default.CPData.increaseDisable && l > 0) {
                var r = d.allQuantityCount || 1e5, o = u.default.CPData.selectSku;
                if (o) {
                    var i = d.skuInfos[o];
                    r = d.getLimitQuantity(i.quantity, i.limitQuantity);
                }
                return void u.default.CPPage.$showToast("很抱歉，该商品当前至多只能购买" + r + "份");
            }
            s.goodsNumber = u.default.CPData.goodsNumber += l, s = t.ObjectUtil.assign(s, d.setGoodsNumberButton()), 
            u.default.CPSetData(s), d.skuTrackingRecord("click", l > 0 ? "plus" : "minus", {
                input_num: l,
                show_num: s.goodsNumber
            });
        }
    },
    skuContainerDefaultClick: function() {},
    hideSkuSelector: function() {
        d.hide(), d.skuTrackingRecord("click", "close_btn");
    },
    skuTrackingRecord: function(e, a, u) {
        var s = d.sourceData || {}, l = {
            op: e,
            page_section: "sku_popup",
            goods_id: s.goodsId,
            event_type: s.eventType,
            has_local_group: s.hasLocalGroup,
            sku_num: s.skus.length
        };
        a && "click" === e && "goods" === s.pageName && (l.page_element = a, "confirm_btn" === a && (l.page_el_sn = 98781), 
        "close_btn" === a && (l.page_el_sn = 98782)), u && (l = t.ObjectUtil.assign(l, u)), 
        (0, t.TrackingRecord)(l);
    },
    selectSpec: function(e) {
        var t = e.currentTarget.dataset;
        if (t) {
            var a = parseInt(t.typeIndex), u = parseInt(t.valueIndex);
            if (d.styleTypeList && d.styleValueList && null != a && null != u) {
                var s = d.styleTypeList[a];
                if (d.styleValueList[s]) {
                    var l = d.styleValueList[s][u];
                    d.selectOneValue(s, l);
                }
            }
        }
    },
    previewImage: function(e, t) {
        t = t || [ e ], wx.previewImage({
            current: e,
            urls: t
        });
    },
    initData: function(e) {
        d.skuInfos = {}, d.styleTypeList = [], d.styleTypeIndex = {}, d.styleValueList = {}, 
        d.styleValueIndex = {}, d.styleHash = {}, d.hash = {}, d.skusByType = [], d.dataObj = {}, 
        d.allQuantityCount = 0, d.initSkuData(e);
    },
    initSkuData: function(e) {
        for (var s = e.skus, l = [], r = {}, o = [], i = [], n = 0; n < s.length; n++) {
            var c = s[n], f = c.skuId + "", g = {
                skuId: f,
                imgUrl: c.thumbUrl,
                style: d.collectStyles(c.specs, f),
                status: c.quantity <= 0 ? a.default.SkuStatus.Unavailable : a.default.SkuStatus.OnSale,
                quantity: c.quantity,
                limitQuantity: c.limitQuantity,
                normalPrice: c.normalPrice,
                groupPrice: c.groupPrice
            };
            e.discount && (g = t.ObjectUtil.assign(g, {
                discountNormalPrice: t.DataUtil.accDiv(Math.floor(t.DataUtil.accMul(c.normalPrice, e.discount)), 100),
                discountGroupPrice: t.DataUtil.accDiv(Math.floor(t.DataUtil.accMul(c.groupPrice, e.discount)), 100)
            })), g.status !== a.default.SkuStatus.Unavailable && l.push(f), d.skuInfos[f] = g, 
            i.push(d.getLimitQuantity(c.quantity, c.limitQuantity)), o.indexOf(c.thumbUrl) < 0 && o.push(c.thumbUrl);
        }
        if (d.allQuantityCount = i.sort(function(e, t) {
            return t - e;
        })[0], r.priceRange = e.priceRange, r.isGroupBuy = e.isGroupBuy, r.skusByType = d.skusByType, 
        r.price = d.getPrice(e.priceRange, e.isGroupBuy, u.default.CPData.selectSku), r.disCountPrice = d.getPrice(u.default.CPData.priceRange, u.default.CPData.isGroupBuy, r.selectSku, !0), 
        r.currentSkuImg = e.defaultImg, r.imgUrls = o, d.styleTypeList.forEach(function(e) {
            u.default.CPData.currentSelect[e] = null;
        }), d.selectOneSkuValue(), d.sourceData && d.sourceData.lastSelectSku) {
            var p = d.sourceData.lastSelectSku;
            for (var m in p) m && p[m] && d.selectOneValue(m, p[m], !0);
        }
        d.sourceData && d.sourceData.lastSelectGoodsNumber && (r.goodsNumber = d.sourceData.lastSelectGoodsNumber), 
        r.buttonStatus = d.updateSkuButtonStatus(), r.specDesc = d.setSpecdesc(), r = t.ObjectUtil.assign(r, d.setGoodsNumberButton()), 
        d.sourceData.orderLimit <= 1 ? r.showSelectorNumber = !1 : r.showSelectorNumber = !0, 
        u.default.CPSetData(r);
    },
    getPrice: function(e, a, s, l) {
        var r = u.default.CPData.goodsInfo, o = r && r.discount && l;
        o && (e = e.map(function(e) {
            return t.DataUtil.accDiv(Math.floor(t.DataUtil.accMul(e, r.discount)), 100);
        }));
        var i = e.join("-");
        return s && (i = a ? o ? d.skuInfos[s].discountGroupPrice : d.skuInfos[s].groupPrice : o ? d.skuInfos[s].discountNormalPrice : d.skuInfos[s].normalPrice), 
        i;
    },
    updateSkuButtonStatus: function() {
        for (var e = 0; e < u.default.CPData.buttonStatus.length; e++) for (var t = 0; t < u.default.CPData.buttonStatus[e].length; t++) if (u.default.CPData.buttonStatus[e][t] != r.selected) {
            var a = d.checkCanSelect(u.default.CPData.currentSelect, e, t);
            u.default.CPData.buttonStatus[e][t] = a ? r.free : r.disable;
        }
        return u.default.CPData.buttonStatus;
    },
    getLimitQuantity: function(e, t) {
        var a = d.sourceData.orderLimit;
        return a > e && e > 0 && (a = e), a > t && t > 0 && (a = t), a;
    },
    selectOneValue: function(e, a, s) {
        var l = d.styleTypeIndex[e], o = d.styleValueIndex[e][a], i = u.default.CPData.currentSelect, n = u.default.CPData.buttonStatus, c = {};
        if (n[l][o] !== r.disable) {
            if (i[e] !== a || s) {
                var f = d.styleValueIndex[e][i[e]];
                null != f && (n[l][f] = r.free), i[e] = a, n[l][o] = r.selected;
            } else i[e] = null, n[l][o] = r.free;
            c.currentSelect = i, c.buttonStatus = d.updateSkuButtonStatus();
            for (var g = [], p = 0; p < n.length; p++) for (var m = 0; m < n[p].length; m++) n[p][m] === r.selected && (g[p] = m);
            var k = d.hash[JSON.stringify(g)];
            if (null != k) {
                var y = d.skuInfos[k], P = u.default.CPData.goodsNumber;
                u.default.CPData.selectSku = k;
                for (var C in u.default.CPData.goodsInfo.skuCopyWritings) if (u.default.CPData.goodsInfo.skuCopyWritings[C].sku_id && u.default.CPData.goodsInfo.skuCopyWritings[C].sku_id == k) {
                    var b = u.default.CPData.goodsInfo.activityTime, D = t.TimeUtil.getPackagedTimeFromTimeBucket(1e3 * b, "HMS"), S = "";
                    S = b < 86400 ? D.hours + ":" + D.minutes + ":" + D.seconds : D.days + "天" + D.hours + "小时", 
                    c["goodsInfo.skuDisplayTitle"] = u.default.CPData.goodsInfo.skuCopyWritings[C].activity_copy_writing.replace("#time#", S), 
                    c["goodsInfo.skuNoFormatTitle"] = u.default.CPData.goodsInfo.skuCopyWritings[C].activity_copy_writing;
                    break;
                }
                c.selectSku = k, c.currentSkuImg = y.imgUrl, c.price = d.getPrice(u.default.CPData.priceRange, u.default.CPData.isGroupBuy, c.selectSku), 
                c.disCountPrice = d.getPrice(u.default.CPData.priceRange, u.default.CPData.isGroupBuy, c.selectSku, !0);
                var v = d.getLimitQuantity(y.quantity, y.limitQuantity) || 1;
                P > v && (u.default.CPPage.$showToast("很抱歉，该商品当前至多只能购买" + v + "份"), c.goodsNumber = v);
            } else {
                var h = u.default.CPData.goodsInfo.activityTime;
                if (h) {
                    var I = t.TimeUtil.getPackagedTimeFromTimeBucket(1e3 * h, "HMS"), T = "";
                    T = h < 86400 ? I.hours + ":" + I.minutes + ":" + I.seconds : I.days + "天" + I.hours + "小时", 
                    c["goodsInfo.skuDisplayTitle"] = u.default.CPData.goodsInfo.skuDefaultTitle.replace("#time#", T), 
                    c["goodsInfo.skuNoFormatTitle"] = u.default.CPData.goodsInfo.skuDefaultTitle;
                }
                if (c.selectSku = "", c.currentSkuImg = d.sourceData.defaultImg, c.price = d.getPrice(u.default.CPData.priceRange, u.default.CPData.isGroupBuy, c.selectSku), 
                c.disCountPrice = d.getPrice(u.default.CPData.priceRange, u.default.CPData.isGroupBuy, c.selectSku, !0), 
                g.length > 0) {
                    var _ = null;
                    for (var N in d.styleHash) {
                        for (var V = d.styleHash[N], L = !0, U = 0; U < g.length; U++) if (void 0 !== g[U] && g[U] !== V[U]) {
                            L = !1;
                            break;
                        }
                        if (L) {
                            _ = N;
                            break;
                        }
                    }
                    _ && d.skuInfos[_] && (c.currentSkuImg = d.skuInfos[_].imgUrl);
                }
            }
            c.buttonStatus = n, c.specDesc = d.setSpecdesc(), c = t.ObjectUtil.assign(c, d.setGoodsNumberButton()), 
            u.default.CPSetData(c);
        }
    },
    checkCanSelect: function(e, t, u) {
        var s = {}, l = d.styleTypeList[t];
        for (var r in e) s[r] = r != l ? e[r] : d.styleValueList[r][u];
        for (var o in d.skuInfos) if (d.skuInfos[o].status !== a.default.SkuStatus.Unavailable) {
            var i = !0, n = d.skuInfos[o].style;
            for (var c in n) if (null != s[c] && s[c] != n[c]) {
                i = !1;
                break;
            }
            if (i) return !0;
        }
        return !1;
    },
    collectStyles: function(e, t) {
        for (var a = [], s = [], l = 0; l < e.length; l++) {
            var o = e[l];
            a.push(o.spec_key), s.push(o.spec_value);
        }
        for (var i = {}, n = [], c = 0; c < a.length; c++) {
            var f = a[c] || "", g = s[c] || "";
            if (!(f.length <= 0 || g.length <= 0)) {
                if (i[f] = g, null == d.styleTypeIndex[f]) {
                    var p = d.styleTypeList.length;
                    d.styleTypeIndex[f] = p, d.styleTypeList[p] = f, u.default.CPData.buttonStatus[p] = [], 
                    d.styleValueList[f] = [], d.styleValueIndex[f] = {}, d.skusByType.push({
                        type: f,
                        values: []
                    });
                }
                if (null == d.styleValueIndex[f][g]) {
                    var m = d.styleTypeIndex[f], k = d.styleValueList[f].length;
                    d.styleValueIndex[f][g] = k, d.styleValueList[f][k] = g, d.skusByType[m].values.push(g), 
                    u.default.CPData.buttonStatus[m][k] = r.free;
                }
                n[d.styleTypeIndex[f]] = d.styleValueIndex[f][g];
            }
        }
        return d.styleHash[t] = n, d.hash[JSON.stringify(n)] = t, i;
    },
    selectOneSkuValue: function() {
        for (var e in d.styleTypeIndex) d.styleValueList && d.styleValueList[e] && 1 == d.styleValueList[e].length && d.selectOneValue(e, d.styleValueList[e][0], !0);
    },
    setSpecdesc: function() {
        var e = d.styleTypeList.length, t = u.default.CPData.currentSelect;
        if (!(e <= 0)) {
            for (var a = [], s = [], l = 0; l < e; l++) {
                var r = d.styleTypeList[l];
                t[r] ? s.push(t[r]) : a.push(r);
            }
            return a.length > 0 ? "请选择 " + a.join(" ") : "已选：" + s.join(" ");
        }
    },
    setGoodsNumberButton: function() {
        var e = u.default.CPData.goodsNumber, t = d.allQuantityCount || 1e5, a = u.default.CPData.selectSku, s = {};
        if (a) {
            var l = d.skuInfos[a];
            t = d.getLimitQuantity(l.quantity, l.limitQuantity);
        }
        return e <= 1 ? (s.reduceDisable = !0, s.reduceClass = i.disable) : (s.reduceDisable = !1, 
        s.reduceClass = i.enable), e >= t ? (s.increaseDisable = !0, s.increaseClass = n.disable) : (s.increaseDisable = !1, 
        s.increaseClass = n.enable), s;
    },
    show: function() {
        u.default.CPData.skuVisible || (u.default.CPPage.markScrollTop = u.default.CPPage.scrollTop, 
        u.default.CPSetData({
            skuVisible: !0
        }), setTimeout(function() {
            u.default.CPSetData({
                mainClass: l.show
            });
        }, 150), d.skuTrackingRecord("impr", null));
    },
    hide: function(e) {
        var t = !!(e = e || {}).directHide;
        u.default.CPData.skuVisible && (t ? u.default.CPSetData({
            skuVisible: !1,
            mainClass: l.hide,
            hideSkuActivityTitle: !1
        }, function() {
            wx.pageScrollTo && wx.pageScrollTo({
                scrollTop: u.default.CPPage.markScrollTop,
                duration: 0
            });
        }) : (u.default.CPSetData({
            mainClass: l.hide
        }), setTimeout(function() {
            u.default.CPSetData({
                skuVisible: !1,
                hideSkuActivityTitle: !1
            }, function() {
                wx.pageScrollTo && wx.pageScrollTo({
                    scrollTop: u.default.CPPage.markScrollTop,
                    duration: 0
                });
            });
        }, 150)));
    },
    initSkuStatus: {
        skuVisible: !1,
        hideSkuActivityTitle: !1,
        mainClass: l.hide,
        skusByType: [],
        selectSku: "",
        currentSelect: {},
        skuNum: 1,
        imgUrls: [],
        currentSkuImg: "",
        preloadSkuImg: "",
        price: 0,
        specDesc: "",
        goodsNumber: 1,
        increaseDisable: !1,
        reduceDisable: !0,
        increaseClass: n.enable,
        reduceClass: i.enable,
        skuButtonClass: o,
        buttonStatus: [],
        priceRange: "",
        isGroupBuy: !1
    },
    load: function(e) {
        u.default.CPData.priceRange = e.priceRange, d.sourceData = e, d.initData(e), d.show();
    }
};

exports.default = d;