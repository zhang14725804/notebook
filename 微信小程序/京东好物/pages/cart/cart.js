var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../components/toast/toast.js")), e = require("../../utils/util.js"), a = require("../../utils/keplerReport.js").init(), i = require("../../utils/message_push.js"), r = getApp();

Page({
    data: {
        pDir: "/kwxp",
        isLogined: !0,
        atLeastDefaultNum: -1,
        returnpage: "/pages/cart/cart",
        fromPageType: "switchTab",
        fromPageLevel: 1,
        isInEditMode: !1,
        objTextTemplate: {
            editTxt: "编辑",
            deleteTxt: "删除",
            completeTxt: "完成",
            noshoppingTxt: "无货",
            beginNumerTxt: "件起购"
        },
        objTextGift: {
            sureTxt: "确定",
            alreadyAdditionalBuyTxt: "已换购",
            alreadyGotTxt: "已领取",
            unitTxt: "件"
        },
        heightInfo: {
            boxMinHeight: "auto",
            boxMaxHeight: "auto"
        },
        objTextMain: {
            loginInfoTxt: "登录后可同步电脑与手机购物车",
            loginTxt: "登录",
            emptyTxt: "购物车空空如也,赶紧逛逛吧~",
            giftTxt: "[赠品] ",
            annexTxt: "[附件] ",
            giftBeanTxt: "[赠京豆] ",
            serviceTxt: "[服务] ",
            allCheckTxt: "全选",
            sumTxt: "合计:",
            allCountTxt: "总额:",
            minusTxt: "立减:",
            goCheckTxt: "去结算",
            noshoppingTxt: "无货",
            additionalBuyTxt: "换购",
            giftOnlyTxt: "赠品",
            deleteTxt: "删除"
        },
        objEditMode: {},
        isGiftWinShow: !1,
        toTopDisplay: "none",
        scrollTop: 0
    },
    onLoad: function(t) {
        this.setScreenInfo(), a.set({
            urlParam: t,
            title: "购物车",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        var t = this;
        wx.showLoading({
            title: "加载中"
        }), e.request({
            url: r.globalRequestUrl + t.data.pDir + "/cart/cart.json?ttt=" + new Date().getTime(),
            success: function(e) {
                t.injectData.call(t, e);
            },
            complete: function() {
                wx.hideLoading();
            },
            fail: function(t) {
                e.reportErr(encodeURIComponent("购物车onShow数据请求request失败，具体信息：") + t.errMsg);
            }
        }), a.pv();
    },
    injectData: function(t) {
        var e = this;
        if (t.desPin && "" != t.desPin) {
            if (this.setData({
                isLogined: !0
            }), !t.cart || !t.cart.Num || t.cart.Num <= 0) return this.setData({
                isCartEmpty: !0
            }), !1;
        } else if (this.setData({
            isLogined: !1
        }), !t.cart || !t.cart.Num || t.cart.Num <= 0) return this.setData({
            isCartEmpty: !1,
            vendors: [],
            Num: 0
        }), !1;
        t && t.cart && t.cart.vendors && this.replaceVendors(t.cart.vendors), this.shopCheckedStatus(), 
        this.renderMainData(t), setTimeout(function() {
            e.setData({
                selfFreightInfo: t && t.cart && t.cart.selfFreightInfo,
                limitBookNum: t && t.cart && t.cart.limitBookNum,
                limitNotBookNum: t && t.cart && t.cart.limitNotBookNum,
                cartYanBaoInfo: t && t.cartYanBaoInfo
            });
        }, 1e3);
    },
    replaceVendors: function(t) {
        this.data.vendors = t;
    },
    shopCheckedStatus: function(t) {
        var e, a = this;
        void 0 != a.data.vendors && (e = t ? a.data.vendors.map(function(e) {
            return e.vendorId == t && (e.checkedStatus = a.shopCheck(e.vendorId)), e;
        }) : a.data.vendors.map(function(t) {
            return t.checkedStatus = a.shopCheck(t.vendorId), t;
        }), this.data.newVendors = e);
    },
    shopCheck: function(t) {
        var e = {}, a = 0, i = 0;
        return this.data.vendors.filter(function(e) {
            return e.vendorId == t;
        })[0].sorted.forEach(function(t, r) {
            1 == t.itemType ? (a++, 1 == t.item.CheckType && i++, e[t.item.Id] = !1) : t.item.Skus.forEach(function(t, r) {
                a++, 1 == t.CheckType && i++, e[t.Id] = !1;
            });
        }), this.data.objEditMode = e, i == a ? "checked" : "";
    },
    renderMainData: function(t) {
        t && t.cart && !t.cart.Num && (this.data.newVendors = []), this.data.isLogined && this.setData({
            isCartEmpty: !(t && t.cart && t.cart.Num)
        }), this.setData({
            objEditMode: this.data.objEditMode,
            vendors: this.data.newVendors,
            Num: t && t.cart && t.cart.Num || 0,
            checkedWareNum: t && t.cart && t.cart.checkedWareNum || 0,
            PriceShow: t && t.cart && t.cart.PriceShow || 0,
            Price: t && t.cart && void 0 != t.cart.Price && t.cart.Price.toFixed(2),
            RePrice: t && t.cart && void 0 != t.cart.RePrice && t.cart.RePrice.toFixed(2)
        });
    },
    getDataSkuInfo: function(t) {
        var e = "";
        return this.data.vendors.filter(function(e) {
            return e.vendorId == t;
        })[0].sorted.forEach(function(t, a) {
            if (1 == t.itemType) {
                var i = t.item.Id + "@@" + t.item.Num;
                e = "" == e ? i : e + "@@@" + i;
            } else if (9 == t.itemType || 12 == t.itemType) {
                var r, n, o;
                r = t.item.Id, n = t.item.Num, o = 16 == t.item.SType ? 13 : t.item.SType, t.item.Skus.forEach(function(t, a) {
                    var i = r + "@@" + n + "@@" + o + "@@" + t.Id + "@@" + t.Num;
                    e = "" == e ? i : e + "@@@" + i;
                });
            }
        }), e;
    },
    changeSelected: function(t) {
        var e, a, i = t.currentTarget.dataset.info, n = JSON.parse(i), o = n.shopid, s = 6;
        "pure" == n.productType ? (e = n.skuid, a = n.skunum) : "suit" == n.productType && (e = n.suitId, 
        a = n.suitNum), n.isChecked && "checked" == n.isChecked || (s = 5);
        var c = r.globalRequestUrl + this.data.pDir + "/cart/check.json?wareId=" + e + "&num=" + a + "&checked=" + s;
        "suit" == n.productType && (c = this.appendSuit(c, n.sType, n.skuid, n.skunum)), 
        this.saveCheckInfo4Product(o, c);
    },
    selectGroup: function(t) {
        var e = this, a = 6, i = t.currentTarget.dataset.shopid, r = e.data.vendors.filter(function(t) {
            return t.vendorId == i;
        });
        r[0].checkedStatus && "checked" == r[0].checkedStatus || (a = 5), e.saveCheckInfo4Shop(i, a);
    },
    saveCheckInfo4Shop: function(t, a) {
        var i = this, n = i.getDataSkuInfo(t);
        wx.showLoading({
            title: "加载中"
        }), e.request({
            url: r.globalRequestUrl + i.data.pDir + "/cart/checkWares.json?wareInfos=" + n + "&checked=" + a,
            success: function(e) {
                e && i.checkProductRender(t, e);
            },
            complete: function() {
                wx.hideLoading();
            },
            fail: function(t) {
                e.reportErr(encodeURIComponent("saveCheckInfo4Shop执行失败，具体信息：") + t.errMsg);
            }
        });
    },
    saveCheckInfo4Product: function(t, a, i) {
        var r = this;
        wx.showLoading({
            title: "加载中"
        }), e.request({
            url: a,
            success: function(e) {
                e && (r.checkProductRender(t, e), i && i());
            },
            complete: function() {
                wx.hideLoading();
            },
            fail: function(t) {
                e.reportErr(encodeURIComponent("saveCheckInfo4Product执行失败，具体信息：") + t.errMsg);
            }
        });
    },
    checkInterface: function(t) {
        t && t.cart && "0" != t.cart.resultCode && wx.navigateTo({
            url: "../error/error?thisBarTitle=接口异常"
        });
    },
    checkProductRender: function(t, e) {
        var a = void 0;
        if (this.checkInterface(e), e && e.cart && e.cart.vendors) {
            a = e.cart.vendors;
            for (var i = 0; i < e.cart.vendors.length; i++) a[i].checkedStatus = this.data.vendors[i].checkedStatus;
        }
        this.replaceVendors(a), this.shopCheckedStatus(t), this.renderMainData(e);
    },
    checkLimitNum: function(t) {
        var e = t.currentTarget.dataset.info;
        if ((e = JSON.parse(e)).isLimited) return !1;
        this.subWareBybutton(e);
    },
    subWareBybutton: function(t) {
        var e = t.skunum, a = t.remainNumInt, i = void 0;
        i = parseInt(e) - 1, a = parseInt(a), i <= 0 || (i > a && a >= 0 && (i = a), this.modifyNum(i, t));
    },
    addWareBybutton: function(t) {
        var e = t.currentTarget.dataset.info, a = e = JSON.parse(e), i = a.skunum, r = a.limitSukNum, n = a.remainNumInt, o = void 0;
        o = parseInt(i) + 1, r = parseInt(r), n = parseInt(n), o > r || o > n && n >= 0 || this.modifyNum(o, e);
    },
    modifyWare: function(e) {
        var a = e.detail.value, i = e.currentTarget.dataset.info, r = i = JSON.parse(i), n = r.skunum, o = r.limitSukNum, s = r.remainNumInt, c = r.iatleastnum;
        if (n == a) return !1;
        a < c && (t.default.show({
            icon: t.default.icon.error,
            message: "商品限购，最少需要购买" + c + "件哦~",
            duration: 2e3,
            pageObj: this
        }), a = c), o = parseInt(o), s = parseInt(s), a > o && (t.default.show({
            icon: t.default.icon.error,
            message: "修改数量失败，请重试",
            duration: 2e3,
            pageObj: this
        }), a = o), a > s && s >= 0 && (a = s), a < 1 && (t.default.show({
            icon: t.default.icon.error,
            message: "修改数量失败，请重试",
            duration: 2e3,
            pageObj: this
        }), a = 1), this.modifyNum(a, i);
    },
    modifyNum: function(t, e) {
        var a = e.productType, i = e.skuid, n = e.shopid, o = void 0, s = void 0, c = void 0;
        if ("pure" == a) o = i, s = t; else if ("suit" == a) {
            var u = e.suitId, d = e.suitNum, l = e.sType;
            o = u, d = t;
        }
        c = r.globalRequestUrl + this.data.pDir + "/cart/modify.json?wareId=" + o + "&num=" + s, 
        "suit" == a && (c = this.appendSuit(c, l, i, d)), this.changeNum2Server(n, c);
    },
    changeNum2Server: function(t, a) {
        var i = this;
        wx.showLoading({
            title: "加载中"
        }), e.request({
            url: a,
            success: function(e) {
                e && (i.saveCartNum(e), i.checkProductRender(t, e));
            },
            complete: function() {
                wx.hideLoading();
            },
            fail: function(t) {
                e.reportErr(encodeURIComponent("changeNum2Server执行失败，具体信息：") + t.errMsg);
            }
        });
    },
    saveCartNum: function(t) {
        if (t && t.cartJson && t.cartJson.Num) {
            var e = t.cartJson.Num;
            e > 0 && (e > 99 && (e = "99+"), wx.setStorageSync("itemCartNum", e));
        } else wx.setStorageSync("itemCartNum", 0);
    },
    appendSuit: function(t, e, a, i) {
        return t && (e && (t += "&sType=" + e), a && (t += "&suitSkuId=" + a), i && (t += "&suitSkuNum=" + i)), 
        t;
    },
    submitFn: function(t) {
        i.messagePush({
            formId: t.detail.formId,
            times: 1,
            type: 10003
        }), this.pingClick("WShopCart_GoToSettle", "", "", "../pay/pay", t), wx.navigateTo({
            url: "/pages/pay/pay"
        });
    },
    toLogin: function() {
        e.globalLoginShow(this);
    },
    checkAllHandler: function(t) {
        var e = t.currentTarget.dataset.checktype, a = 0;
        e && ("all" == e ? a = 8 : "notall" == e && (a = 7), this.changeAndSaveAllChecked(a));
    },
    changeAndSaveAllChecked: function(t) {
        var a = this;
        wx.showLoading({
            title: "加载中"
        }), e.request({
            url: r.globalRequestUrl + a.data.pDir + "/cart/check.json?checked=" + t,
            success: function(t) {
                t && a.checkProductRender("", t);
            },
            complete: function() {
                wx.hideLoading();
            },
            fail: function(t) {
                e.reportErr(encodeURIComponent("changeAndSaveAllChecked执行失败，具体信息：") + t.errMsg);
            }
        });
    },
    gointoEdit: function(t) {
        t.currentTarget;
        var e = t.currentTarget.dataset.skuid, a = this.data.objEditMode;
        a[e] = !0, this.setData({
            objEditMode: a
        });
    },
    gobackMain: function(t) {
        t.currentTarget;
        var e = t.currentTarget.dataset.skuid, a = this.data.objEditMode;
        a[e] = !1, this.setData({
            objEditMode: a
        });
    },
    deleteItem: function(t) {
        var e, a, n = t.currentTarget.dataset.info, o = n = JSON.parse(n), s = o.productType, c = o.skuid, u = o.skunum, d = o.shopid, l = this;
        wx.showModal({
            content: "确认要删除此商品吗？",
            success: function(o) {
                if (o.confirm) {
                    if ("pure" == s) e = c, a = u; else if ("suit" == s) {
                        var h = n.suitId, f = n.suitNum, p = n.sType;
                        e = h, a = f;
                    }
                    var m = r.globalRequestUrl + l.data.pDir + "/cart/remove.json?wareId=" + e + "&num=" + a;
                    "suit" == s && (m = l.appendSuit(m, p, c, u)), l.changeNum2Server(d, m), i.messagePush({
                        formId: t.detail.formId,
                        times: 1,
                        type: 10005
                    });
                } else o.cancel;
            }
        });
    },
    beWareDetail: function(t) {
        var e = t.currentTarget.dataset.skuid, a = wx.getStorageSync("activityUrl");
        e && (a ? wx.redirectTo({
            url: "/pages/product/product?wareId=" + e
        }) : wx.navigateTo({
            url: "/pages/product/product?wareId=" + e
        }));
    },
    beMSearchPage: function(t) {
        for (var e = t.currentTarget.dataset.activityid, i = t.currentTarget.dataset.skuid, r = t.currentTarget.dataset.canselectpromotions, n = "", o = 0; o < r.length; o++) 1 == r[o].checkType && (n = r[o].title);
        a.click({
            eid: "WShop_GoTogether",
            elevel: "3",
            eparam: "",
            target: "/pages/piecelist/piecelist?activityId=" + e + "&skuId=" + i + "&promotionTitle=" + n,
            event: t
        }), e && i && wx.navigateTo({
            url: "/pages/piecelist/piecelist?activityId=" + e + "&skuId=" + i + "&promotionTitle=" + n
        });
    },
    showChooseGifts: function(t) {
        var a = t.currentTarget.dataset.id, i = r.globalRequestUrl + this.data.pDir + "/cart/getCartSelectGifts.json?promotionId=" + a, n = this;
        wx.showLoading({
            title: "加载中"
        }), e.request({
            url: i,
            success: function(t) {
                t && n.dealWithGiftData(t);
            },
            complete: function() {
                wx.hideLoading();
            },
            fail: function(t) {
                e.reportErr(encodeURIComponent("showChooseGifts执行失败，具体信息：") + t.errMsg);
            }
        });
    },
    dealWithGiftData: function(t) {
        this.setData({
            heightInfo: {
                boxMinHeight: 1 * this.data.screenHeight / 3 - 135 + "px",
                boxMaxHeight: 2 * this.data.screenHeight / 3 - 135 + "px"
            },
            giftData: t,
            isFreezed: !0,
            isGiftWinShow: !0
        });
    },
    deleteGifts: function(t) {
        var e, a = t.currentTarget.dataset.info, n = a = JSON.parse(a), o = n.giftid, s = n.giftnum, c = n.shopid, u = (n.vendorId, 
        n.suitId), d = n.suitNum, l = n.giftSType, h = this;
        wx.showModal({
            content: "确认要删除此商品吗？",
            success: function(a) {
                a.confirm ? (e = r.globalRequestUrl + h.data.pDir + "/cart/remove.json?wareId=" + u + "&num=" + d, 
                e = h.appendSuit(e, l, o, s), i.messagePush({
                    formId: t.detail.formId,
                    times: 1,
                    type: 10005
                }), h.changeNum2Server(c, e)) : a.cancel;
            }
        });
    },
    closeGiftBox: function() {
        this.setData({
            isGiftWinShow: !1
        });
    },
    selectGifts: function(e) {
        var a = this, i = a.data.giftData.suit, r = a.data.giftData.suit.giftList, n = e.currentTarget.dataset.gid, o = e.currentTarget.dataset.gnum, s = r.map(function(e) {
            if (e.id == n) if (e.checkType) "1" == e.checkType && (e.checkType = 0, i.selectedGiftSize = i.selectedGiftSize - o, 
            e.cls && "newSelect" != e.cls || (e.cls = "newCancel")); else {
                var r = i.selectedGiftSize + Number(o);
                if (1 == i.maxGiftNum) {
                    0 == i.selectedGiftSize ? i.selectedGiftSize = r : i.selectedGiftSize = r - 1;
                    var s = a.data.giftData.suit.giftList;
                    s.forEach(function(t) {
                        t.checkType && delete t.checkType;
                    }), a.setData({
                        "giftData.suit.giftList": s
                    }), e.checkType = 1, e.cls && "newCancel" != e.cls || (e.cls = "newSelect");
                } else if (r > i.maxGiftNum) {
                    var c = "";
                    2 == i.giftType ? c = "换购" : 4 == giftType && (c = "满赠"), t.default.show({
                        icon: t.default.icon.error,
                        message: "最多只能" + c + "件哦!",
                        duration: 2e3,
                        pageObj: a
                    });
                } else i.selectedGiftSize = r, e.checkType = 1, e.cls && "newCancel" != e.cls || (e.cls = "newSelect");
            }
            return e;
        });
        i.giftList = s, this.setData({
            "giftData.suit": i
        });
    },
    hideChooseGifts: function(t) {
        var e, a = this, i = a.data.giftData.suit, n = a.data.giftData.suit.giftList, o = "", s = "", c = !1;
        e = 13 == i.promotionAmount.sType ? "16" : "", n.forEach(function(t) {
            if ("1" == t.checkType) {
                a = i.suitId + "@@1@@" + e + "@@" + t.id + "@@1";
                o = "" == o ? a : o + "@@@" + a;
            }
            if ("newSelect" == t.cls && (delete t.cls, c = !0), "newCancel" == t.cls) {
                delete t.cls, c = !0;
                var a = i.suitId + "@@1@@" + e + "@@" + t.id + "@@1";
                s = "" == s ? a : s + "@@@" + a;
            }
        });
        var u;
        c ? (u = "" == o ? r.globalRequestUrl + a.data.pDir + "/cart/removeWares.json?wareInfos=" + s : r.globalRequestUrl + a.data.pDir + "/cart/addWares.json?wareInfos=" + o, 
        a.saveCheckInfo4Product("", u, function() {
            a.closeGiftBox();
        })) : a.closeGiftBox();
    },
    setScreenInfo: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    screenHeight: e.windowHeight
                });
            }
        });
    },
    listScroll: function(t) {
        t.detail.scrollTop > this.data.screenHeight && "none" == this.data.toTopDisplay && this.setData({
            toTopDisplay: "block"
        }), t.detail.scrollTop <= this.data.screenHeight && "block" == this.data.toTopDisplay && this.setData({
            toTopDisplay: "none"
        });
    },
    toTopTap: function(t) {
        this.setData({
            toTopDisplay: "none",
            scrollTop: .001 * Math.random()
        });
    },
    pingClick: function(t, e, i, r, n) {
        a.click({
            eid: t,
            elevel: e,
            eparam: i,
            pname: "",
            pparam: "",
            target: r,
            event: n
        });
    }
});