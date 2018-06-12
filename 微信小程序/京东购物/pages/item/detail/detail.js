function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

function e(t) {
    var e = "";
    switch (t) {
      case 999:
        e = "领券成功。";
        break;

      case 3:
        e = "领券失败，为了保障您的账户安全，请前往微信-购物―个人中心―账号管理开启支付密码再领券。";
        break;

      case 5:
      case 6:
      case 7:
      case 8:
      case 11:
        e = "领券失败，该活动已结束。";
        break;

      case 9:
      case 10:
        e = "领券失败，该活动还未开始，请稍后再来。";
        break;

      case 12:
      case 13:
        e = "领券失败，您的等级有点低哦。";
        break;

      case 14:
      case 15:
        e = "领券失败，您已经领取过该券，请勿重复领取。";
        break;

      case 16:
      case 17:
        e = "领券失败，该券已被领完。";
        break;

      case 18:
      case 19:
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
      case 32:
      case 36:
      case 40:
      case 43:
      case 500:
        e = "领券失败，活动太火爆，请稍后再来。";
        break;

      case 34:
      case 37:
      case 38:
      case 39:
      case 41:
      case 42:
        e = "领券失败，您的账号类型不满足领取要求。";
        break;

      default:
        e = "领券失败，活动太火爆，请稍后再来。";
    }
    return e;
}

function a(t) {
    return t ? +new Date(t.replace(/-/g, "/")) / 1e3 : "";
}

function i(t) {
    var e = [];
    return "1" == t.spAttr.IsJX && e.push("JX"), "global" === t.skuNameFlag ? e.push("Global_POP") : "global_zy" === t.skuNameFlag ? e.push("Global_ZY") : "jdmarket" === t.skuNameFlag ? e.push("Market_POP") : "jdmarket_zy" === t.skuNameFlag ? e.push("Market_ZY") : "1" == t.spAttr.jzfp && t.isZiying ? e.push("Poverty_ZY") : "1" == t.spAttr.jzfp ? e.push("Poverty_POP") : "sam" === t.skuNameFlag ? e.push("Sam") : "sam_jdexpress" === t.skuNameFlag ? e.push("Sam_express") : "zy" == t.skuNameFlag || t.isZiying ? e.push("ZY") : "jdexpress" == t.skuNameFlag && e.push("JD_express"), 
    "1" === t.spAttr.isLOC && e.push("LOC"), t.isOTC && e.push("OTC"), e;
}

function s(t) {
    var e = [ t.price ], a = "";
    return t.extraPriceFlag && "plusPrice" === t.priorityPrice ? a = t.plusPrice : t.extraPriceFlag && "trialPlusPrice" === t.priorityPrice && (a = t.trialPlusPrice), 
    a && e.push({
        type: "plus",
        price: a
    }), e;
}

var o = require("../api.js"), n = require("./detail_api.js"), r = require("../../../models/coupon/coupon_model.js"), c = require("../../../common/fe_helper.js"), u = require("../../../common/toast/toast.js"), d = require("../../../common/img_loader/img_loader.js"), h = require("../../../bases/page.js"), l = require("../../../common/login/login.js"), p = require("../../../common/localStorage.js"), m = require("../../../common/utils.js"), g = require("../../../common/modal/modal"), f = require("../../../common/user_info.js"), v = require("../../../common/recovery/item.js"), S = new (require("../../../common/logger.js"))("商详 detail"), I = require("../../../api/reportGDT.js"), T = require("../../../api/Ptag/report_manager"), k = require("../../../api/Ptag/Ptag_utils").default, _ = require("../../../api/Ptag/Ptag_constants"), w = require("../../../libs/async.min.js"), E = require("../../../libs/moment.min.js"), P = require("../../../libs/promise.min.js"), A = require("../../../common/cookie-v2/cookie.js"), D = getApp(), x = 200;

new h({
    data: {
        info: {},
        slideImages: [],
        slideIdx: 0,
        priceMark: "￥",
        secPriceMark: "¥",
        secPrevPriceMark: "¥",
        discount: {},
        currentSelect: "",
        skuProps: [],
        coupons: [],
        giftQueryStr: "",
        plugGiftQueryStr: "",
        serviceQueryStr: "",
        address: "",
        areaId: "",
        seckill: {},
        isSeckillAtmo: !1,
        promoteAtoms: {},
        cart: {
            num: 0,
            add: 0,
            ani: {}
        },
        num: {
            value: 1,
            limit: 1,
            subEnabled: !1,
            addEnabled: !0
        },
        status: 0,
        panelShow: {
            sku: !0,
            coupon: !1,
            promote: !0
        },
        showHomeBtn: !1,
        neverBack: "",
        packs: [],
        favStatus: !1,
        customerService: {},
        samStatus: {},
        bottomBtn: [ {
            text: "加入购物车",
            method: "",
            enable: 1,
            style: ""
        }, {
            text: "立即购买",
            method: "",
            enable: 1,
            style: ""
        } ],
        xModal: {},
        isSpecialProcess: !1,
        specialProcess: {
            num: 0,
            countdown: {
                text: "",
                timer: [ 0, 0, 0, 0, 0, 0, 0, 0 ],
                show: !1
            },
            iconText: "",
            showTime: "",
            processText: "",
            type: 0
        },
        specialProcessStatus: {
            certifiction: -1,
            needCertifiction: !1,
            certifictionStatus: "",
            certifictionUrl: "",
            voiceCheck: 0,
            voiceCheckUrl: "",
            showStockStatus: !1
        },
        showGlobalInfoFlag: !1,
        showCouponLayerFlag: !1,
        nav_idx: 0,
        closeShareTip: "",
        infoVideo: {},
        cover: {
            flag: "",
            url: ""
        },
        easyBuyList: [],
        firstScreenMsg: {
            name: "",
            price: "",
            sku: "",
            cover: ""
        },
        shareOptions: {},
        scrollTop: 0,
        showLayer: !1,
        showAnswer: !1,
        beltAtmos: {},
        addressList: [],
        networkType: D.networkType,
        source: "",
        offlineHasShop: "",
        showApp: !1,
        skuId: "",
        saleAtmos: {},
        saleAtmosFir: !1,
        showShareLayerFlag: !1,
        wxSearchToken: "",
        wxSearchFlag: !1,
        shopFavStatus: !1,
        sfpArrowLeft: 0
    },
    onLoad: function(t) {
        var e = this, a = v.getRecoveryUrl(t.sku);
        if (a) this.$goto(a, "redirectTo"); else {
            wx.hideShareMenu(), console.log("商详入参: ", t), "app_pingou" === t.source && this.setData({
                source: "pingou"
            }), D.isAppShare && D.isAppShare.status && t.sku && t.sku === D.isAppShare.sku && this.setData({
                showApp: D.isAppShare.status,
                skuId: t.sku
            }), t.token && this.setData({
                wxSearchToken: t.token,
                wxSearchFlag: !0
            });
            var i = t.platform, s = t.gdt_vid, o = t.gaid, n = t.gsid;
            if (i && I.reportGDT(i, {
                gdt_vid: s,
                gaid: o,
                gsid: n
            }), t.isCouponSearch && (this.isCouponSearch = t.isCouponSearch), 1 == t.share ? this.$report("DETAIL_SHARE_FROM_TIMELINE") : 2 == t.share && this.$report("DETAIL_SHARE_FROM_FRIEND"), 
            wx.onNetworkStatusChange(function(t) {
                e.setData({
                    networkType: t.networkType
                });
            }), t.pps && (this.pps = t.pps), this.manualReportPV = !0, T.addPtagExposure(_.DETAIL_NAV_TAB_EXP), 
            this.drawCoupon = c.throttle(this.drawCoupon, 500), this.navigateTo = c.throttle(this.navigateTo, 1e3), 
            this.gotoCart = c.throttle(this.gotoCart, 1e3), this.addToCart = c.throttle(this.addToCart, 500), 
            this.buy = c.throttle(this.buy, 1e3), this.previewImage = c.throttle(this.previewImage, 1e3), 
            this.gotoSuitList = c.throttle(this.gotoSuitList, 1e3), this.changeSku = c.throttle(this.changeSku, 500), 
            this.scrollNav = c.throttle(this.scrollNav, 300), this.imageSizeInfo = {}, x = 200, 
            this.imgLoader = new d(this, this.imageOnLoad), t.sku) {
                var r = {
                    isPop: t.sku.length >= 10
                };
                t.name && (r.skuName = c.decode(t.name)), t.price && (r.price = t.price), this.action = t.action || "", 
                this.setData({
                    neverBack: t.neverBack || "",
                    info: r,
                    "num.value": t.num ? +t.num : 1,
                    slideImages: t.cover ? [ c.decode(t.cover) ] : [],
                    firstScreenMsg: t,
                    sku: t.sku
                }, function() {
                    t.name && t.price && t.cover && t.sku && wx.showShareMenu({
                        withShareTicket: !0
                    });
                }), this.render(t.sku, !1, !0, t.key), p.get("itemPromoteStatus", "show").then(function(t) {
                    e.setData({
                        "panelShow.promote": "show" == t
                    });
                }), p.get("item:closeShareTip", 1).then(function(t) {
                    e.setData({
                        closeShareTip: t
                    }), 1 == t && T.addPtagExposure(_.DETAIL_SHARE_TIP_EXP);
                });
            } else u.show({
                icon: u.ICON.WARNING,
                content: "参数错误",
                page: this
            });
            1 == getCurrentPages().length && (this.setData({
                showHomeBtn: !0
            }), T.addPtagExposure(_.EXP_VIEW_RETURN_HOME)), this.jumpLocation(t), D.event.on("updateItemDetailAddr", this.onAddrChange.bind(this)), 
            D.event.on("toggleFavStatus", this.toggleFavStatus.bind(this));
        }
    },
    onUnload: function() {
        D.event.off("updateItemDetailAddr"), D.event.off("addSuitUpdateCartNum"), clearTimeout(this.seckillTimeoutId);
    },
    onShow: function() {
        console.log("======detail onShow "), D.isAppShare && D.isAppShare.status && this.data.skuId && this.data.skuId === D.isAppShare.sku && this.setData({
            showApp: D.isAppShare.status
        }), o.initAddress(), this.initAddress(), this.checkCertifiction(), this.report(), 
        this.updateCartNum(), this.renderShopAddress();
    },
    jumpLocation: function(t) {
        var e = this;
        setTimeout(function() {
            t.cartlocation && e.pageScrollTo(".Address");
        }, 1e3);
    },
    renderShopAddress: function() {
        var t = A.getCookie("choseShopId");
        if (t) {
            var e = t.split("----");
            e && e[1] === this.data.sku && this.setData({
                offlineHasShop: !0
            });
        }
    },
    report: function() {
        if (this.data.info.skuId) {
            var t = this.data.info;
            this.pps && T.setPPS(this.pps), T.addDetailPagePv("http://wq.jd.com/wxapp/pages/item/detail/detail", t.skuId, t.venderID, t.canBuy ? _.EXP_VIEW_CAN_BUY : _.EXP_VIEW_CANNOT_BUY), 
            T.addPtagExposure(t.canBuy ? _.EXP_VIEW_CAN_BUY : _.EXP_VIEW_CANNOT_BUY);
        }
    },
    checkCertifiction: function() {
        var t = this;
        this.gotoCertifictionFlag && (this.gotoCertifictionFlag = !1, n.verifyAuth().then(function(e) {
            e.status;
            0 == e.retcode && t.render(t.data.info.skuId);
        })), this.gobackCertifictionFlag ? (this.gobackCertifictionFlag = !1, n.verifyAuth().then(function(e) {
            var a = e.status;
            e.retcode;
            if (1 == a) {
                var i = t.drawCouponEv;
                i && t.drawRealCoupon(i);
            } else u.show({
                icon: "WARNING",
                content: "未完成实名认证，领券失败",
                page: t
            });
        })) : this.gobackCheckPinFlag && (this.gobackCheckPinFlag = !1, n.queryPinStatus().then(function(e) {
            if (0 == e.defaultFlag) {
                var a = t.drawCouponEv;
                a && t.drawRealCoupon(a);
            }
        }));
    },
    onShareAppMessage: function(t) {
        var e = this.data.firstScreenMsg, a = e.name, i = e.price, s = e.sku, o = e.cover;
        return "button" == t.from && this.$report("DETAIL_SHARE_TO_FRIEND"), {
            title: "￥" + i + " | " + a,
            path: "/pages/item/detail/detail?" + c.querystring({
                sku: s,
                name: a,
                price: i,
                cover: o,
                share: 2
            }),
            imageUrl: o,
            complete: function(t) {
                this.setData({
                    showShareLayerFlag: !1
                });
            }.bind(this)
        };
    },
    gotoHomePage: function() {
        this.$report("VIEW_RETURN_HOME"), this.$goto("/pages/index/index");
    },
    checkFavStatus: function(t, e) {
        var a = this;
        l.getLoginPromise().then(function(i) {
            0 == i && n.itemCheckFav(t, e).then(function(t) {
                a.setData({
                    favStatus: t
                });
            }).catch(function(t) {});
        }).catch(function(t) {});
    },
    checkShopFavStatus: function(t) {
        var e = this, a = t.venderID, i = t.priorityPrice;
        t.sfpPrice && "sfpPrice" == i && n.shopCheckFav(a).then(function(t) {
            e.setData({
                shopFavStatus: t
            }), T.addPtagExposure(_.DETAIL_SHOP_Exposure);
        }).catch(function(t) {});
    },
    render: function(t, e, a, r) {
        var d = this;
        wx.showNavigationBarLoading(), this.us.prepare(this.us.OP_ITEM_MAIN), o.initItem(t, "", a, r, {
            pps: this.pps
        }).then(function(h) {
            var p = !1;
            if ((h.presellFlag || h.spAttr && h.spAttr.IsJX || h.category && "13314" === h.category[0] || h.category && "15294" === h.category[2]) && (p = !0), 
            !p || d.data.wxSearchFlag) {
                if (h.huanUrl) return a || (d.huanPrice = h.huanPrice || ""), d.render(h.huanSku, !1, !1, r), 
                a && wx.showModal({
                    title: "",
                    content: "由于您地址的变更，已为您切换为在该地址售卖的同款商品，请关注",
                    showCancel: !1,
                    confirmText: "知道了",
                    confirmColor: "#E93B3D"
                }), void d.us.report(d.us.OP_ITEM_MAIN, 0, null);
                var m = "" + (d.huanPrice || "");
                if (m && -1 === m.indexOf(".") && (m = (+m / 100).toFixed(2)), "603837" == h.venderID && m && m != h.price && wx.showModal({
                    title: "",
                    content: "因地址变化，当前商品价格已自动更新，请留意价格变动",
                    showCancel: !1,
                    confirmText: "知道了",
                    confirmColor: "#E93B3D"
                }), d.speedMark(4), d.us.report(d.us.OP_ITEM_MAIN, 0, null), h.images = (h.images || []).map(function(t) {
                    return c.getImg(t, 750).replace("img/", "n1/");
                }), !h.isPingou || h.isSeckill || "1" == d.data.neverBack || d.data.wxSearchFlag) {
                    d.checkFavStatus([ h.skuId ], h.venderID), d.checkShopFavStatus(h);
                    var g = n.checkURL(h.urlConfig);
                    if (n.checkServiceStatus(h.skuId).then(function(t) {
                        var e = {}, a = [ "https://wq.jd.com/mjgj/dongdong/goodsquery?skuid=" + h.skuId, "name=" + encodeURIComponent(h.skuName), "imgUrl=" + encodeURIComponent(h.images[0]), "price=" + h.price, "source=0", "entry=2" ].join("&");
                        1 == t ? (e.status = "online", e.url = a) : 3 == t && (e.status = "offline", e.url = a), 
                        d.setData({
                            customerService: e
                        });
                    }), h.infoVideoId && !h.isPop && d.infoVideoInit(h.infoVideoId), d.valueAdded(h), 
                    h.isZiying) {
                        var f = {
                            category: h.category,
                            isOverseaPurchase: h.spAttr.isOverseaPurchase,
                            brandId: h.brandId
                        };
                        d.easyBuyInfo(f);
                    }
                    if (a ? d.data.slideImages.length || d.setData({
                        slideImages: h.images
                    }) : d.setData({
                        slideImages: h.images,
                        slideIdx: 0
                    }), d.data.slideImages.length && d.imgLoader.load(h.images[0]), l.getLoginPromise().then(function(t) {
                        0 == t && o.samCardState().then(function(t) {
                            d.setData({
                                samStatus: t
                            });
                        }).catch(function(t) {
                            t.code;
                            var e = t.message;
                            u.show({
                                content: e || "获取山姆会员状态失败",
                                icon: u.ICON.WARNING,
                                page: d
                            });
                        });
                    }).catch(function(t) {}), h.poolList && h.poolList.forEach(function(t) {
                        t.list.forEach(function(t) {
                            t.img = c.getImg(t.mp, 150);
                        });
                    }), h.ad) {
                        var v = /<a(?:[\s]+|[\s]+[^<>]+[\s]+)href=["'\\]*([^<>"'\\]*)["'\\]*[^<>]*>([\d\D]*)<\/\s?a>/g, S = h.ad.match(v), I = [], k = [];
                        if (S && S.length) {
                            S.forEach(function(t) {
                                var e = h.ad.indexOf(t), a = e + t.length;
                                I.push(e, a);
                            }), I.push(h.ad.length), I.reduce(function(t, e, a, i) {
                                return k.push(h.ad.slice(t, e)), e;
                            }, 0);
                            var E = k.map(function(t) {
                                var e = v.exec(t);
                                if (!e) return {
                                    txt: t
                                };
                                var a = g(e[1]), i = e[1] && e[1].trim();
                                return "Jshop" === a.type && (i = i.indexOf("?") > -1 ? i + "&wxAppName=JD" : i + "?wxAppName=JD"), 
                                a ? (d.$report("EXP_DETAIL_NAME_AD"), {
                                    txt: e[2],
                                    url: i,
                                    type: a.type,
                                    id: a.id
                                }) : void 0;
                            });
                            h.ad = E;
                        } else h.ad = [ {
                            txt: h.ad
                        } ];
                    }
                    var P = !1, A = !1;
                    if (h.subscribeFlag || h.buyingSpreeFlag) P = !0, d.initSpecialAtmos(h); else {
                        var D = h.promomiao;
                        clearTimeout(d.seckillTimeoutId), D && D.serverTime >= D.intStartTime && D.serverTime < D.intEndTime ? (A = !0, 
                        d.initSeckillAtmos(D)) : delete h.promomiao;
                    }
                    d.initSaleAtmos(h.item.pTag), h.promote && h.promote.length && d.$report("EXP_DETAIL_PROMOTION"), 
                    ~" 12813 6321 13314 6324 12814 ".indexOf(" " + h.category[0] + " ") || ~" 9196 ".indexOf(" " + h.category[1] + " ") || (T.addPtagExposure(_.DETAIL_ANSWER_LIST_EXP), 
                    d.setData({
                        showAnswer: !0
                    }));
                    var x = d.data.firstScreenMsg;
                    x.sku = h.skuId, x.name = h.skuName, x.price = h.price, x.cover = h.images[0];
                    var y = {
                        sku: h.skuId,
                        name: h.skuName.trim(),
                        price: s(h),
                        cover: h.images[0],
                        service: h.service || [],
                        flags: i(h)
                    };
                    if (d.setData({
                        info: h,
                        firstScreenMsg: x,
                        shareOptions: y,
                        isSpecialProcess: P,
                        isSeckillProcess: A
                    }, function() {
                        wx.showShareMenu({
                            withShareTicket: !0
                        }), d.speedMark(5).speedReport();
                    }), d.setPriceMark(), d.updatePromote(), h.spAttr.LowestBuy) {
                        var C = parseInt(h.spAttr.LowestBuy) || 1;
                        d.setData({
                            "num.value": C,
                            "num.limit": C
                        });
                    }
                    d.calcSkuForEachProp(h.props), d.updateCurrentSelect(), d.setData({
                        serviceQueryStr: c.querystring({
                            d: JSON.stringify(h.service)
                        })
                    }), d.newColorSize || (d.newColorSize = h.newColorSize), h.serviceIconList && h.serviceIconList.length && T.addPtagExposure(_.DETAIL_GLOBAL_SERVICE_EXP), 
                    e || (w.auto({
                        update_coupon: d.updateCoupon.bind(d),
                        update_suit: d.updateSuit.bind(d),
                        update_discount: d.updateDiscount.bind(d),
                        update_stock: d.updateStock.bind(d),
                        get_profitBelt: d.initProfitBelt.bind(d)
                    }, function(t, e) {
                        "addToCart" == d.action && (d.action = "", d.addToCart());
                    }), wx.createSelectorQuery().select(".sfp_price_icon").boundingClientRect(function(t) {
                        t && d.setData({
                            sfpArrowLeft: t.left + t.width / 2 - 14
                        });
                    }).exec());
                } else {
                    var b = h.skuName, N = d.data.info.price, L = h.images, O = {
                        sku: t,
                        name: b,
                        price: N,
                        cover: L[0]
                    };
                    d.$goto("/pages/pingou/item/item", O, "redirectTo");
                }
            } else {
                var F = "https://wqitem.jd.com/item/view?sku=" + t;
                d.$goto("/pages/h5/index", {
                    url: F
                }, {
                    method: "redirectTo",
                    skipSwitchUrl: !0
                });
            }
        }).catch(function(t) {
            d.us.report(d.us.OP_ITEM_MAIN, 1, t), u.show({
                icon: u.ICON.WARNING,
                content: "对不起，该商品不存在",
                page: d
            }), setTimeout(wx.navigateBack, 800);
        }).then(function() {
            wx.hideNavigationBarLoading();
        });
    },
    lookLike: function() {
        var t = this.data.info, e = "https://wqs.jd.com/search/searchsimilar.shtml?sceneid=18&sku=" + t.skuId + "&jp=" + t.price;
        this.$report("DETAIL_LOOK_SIMILAR_BUTTON"), this.$goto("/pages/h5/index", {
            url: e
        });
    },
    stockNotice: function(t) {
        var e = "https://wqs.jd.com/item/arrival_notice.shtml?source=1&sku=" + this.data.info.skuId;
        this.$report("DETAIL_STOCK_NOTICE"), this.$goto("/pages/h5/index", {
            url: e
        });
    },
    easyBuyInfo: function(t) {
        var e = this;
        n.getEasyBuyInfo(t).then(function(t) {
            t.forEach(function(t) {
                t.icon = c.getImg(t.icon), t.link = "https:" + t.link, T.addPtagExposure(t.exposureRd);
            }), e.setData({
                easyBuyList: t
            });
        });
    },
    infoVideoInit: function(t) {
        var e = this;
        n.getDetailVideo(t).then(function(t) {
            e.setData({
                infoVideo: t
            });
        });
    },
    coverGotoH5: function() {
        var t = this, e = this.data.cover, a = e.url, i = e.flag;
        switch (i) {
          case "ebook":
            this.$report("DETAIL_EBOOK_PREVIEW");
            break;

          case "mainVideo":
            this.$report("DETAIL_MAIN_VIDEO");
            break;

          case "alloverimg":
            this.$report("DETAIL_ALLIMG");
        }
        a && "mainVideo" === i ? "wifi" != this.data.networkType ? wx.showModal({
            title: "",
            content: "商品介绍视频将帮助您更清晰了解商品，但也将耗费较多流量，建议在WIFI环境下查看。",
            confirmText: "确定",
            cancelText: "取消",
            confirmColor: "#E93B3D",
            success: function(e) {
                e.confirm && t.$goto("/pages/item/subPackages/video/video", {
                    url: a
                });
            }
        }) : this.$goto("/pages/item/subPackages/video/video", {
            url: a
        }) : a && this.$goto("/pages/h5/index", {
            url: a
        });
    },
    valueAdded: function(t) {
        var e = this;
        t.mainVideoId ? n.getDetailVideo(t.mainVideoId).then(function(t) {
            var a = t.url;
            a && (e.setData({
                "cover.flag": "mainVideo",
                "cover.url": a
            }), T.addPtagExposure(_.DETAIL_MAIN_VIDEO_EXP));
        }) : 1713 == t.category[0] && /(iPhone|iPad|iPod|iOS)/i.test(D.systemInfo.system) ? n.checkEbookStatus(t.skuId).then(function(t) {
            var a = t.url;
            a && (e.setData({
                "cover.flag": "ebook",
                "cover.url": a
            }), T.addPtagExposure(_.DETAIL_EBOOK_PREVIEW_EXP));
        }) : 878 == t.category[2] || 880 == t.category[2] ? n.getItemMedia(t.skuId).then(function(t) {
            var a = e.data.url;
            a && e.setData({
                "cover.flag": "3D",
                "cover.url": a
            });
        }) : 1 == t.allOverImg && n.getAlloverImg(t.skuId).then(function(t) {
            var a = t.url;
            a && (e.setData({
                "cover.flag": "alloverimg",
                "cover.url": a
            }), T.addPtagExposure(_.DETAIL_ALLIMG_EXP));
        });
    },
    initSpecialAtmos: function(t) {
        var e = this, i = void 0;
        i = (!t.item || "1" === t.item.warestatus) && !(0 == t.stock.StockState || 34 == t.stock.StockState);
        var s = {
            countdown: {}
        }, o = [], r = 0, u = 0, d = !0, h = parseInt(c.getServerTime() / 1e3);
        if (t.buyingSpreeFlag && t.miao) {
            var l = t.miao;
            l.startTime = +l.startTime, l.endTime = +l.endTime, l.serverTime = +l.serverTime;
            var p = l.startTime, m = l.endTime;
            h = l.serverTime, 0 == l.isKo && (l.state = 3), 0 == p || p > h ? l.state = 1 : m > h ? l.state = 2 : m > 0 && h > m && (l.state = 3), 
            1 == l.certifiction && n.verifyAuth().then(function(t) {
                var a = t.retcode, i = t.status, s = t.url, o = -1;
                0 == a && 2 == i ? o = 0 : 4 == a && (o = 1), e.setData({
                    "specialProcessStatus.certifiction": a,
                    "specialProcessStatus.needCertifiction": 1 != i,
                    "specialProcessStatus.certifictionStatus": o,
                    "specialProcessStatus.certifictionUrl": s || ""
                });
            }), x = 1;
        }
        if (t.subscribeFlag && t.yuyue) {
            var g = t.yuyue;
            if (t.buyingSpreeFlag && 0 != g.state && 1 != g.state && 2 != g.state ? (s.type = 3, 
            s.processText = "1.预约 2.抢购 3.发货", s.iconText = "1.部分商品预约成功后才有购买资格，预约成功后，请关注抢购时间及时抢购，资源有限，先抢先得！\n2.部分商品在预约期间抢购时间未定，我们会在商品抢购前通过Push通知提醒您，请在设置中选择允许通知，以免错过秒杀时间。\n3.对于预约成功享优惠的商品，抢购开始后，点击“立即抢购”进入结算页，可在结算页查看优惠，若抢购时间结束，优惠自动失效。\n4.查看预约商品请至“微信-发现-购物-个人中心-我的活动-预约”进行查看。\n5.如果提供赠品，赠品赠送规则顺序按照预约商品购买成功时间来计算，而不是预约成功时间。\n6.如您对活动有任何疑问，请联系客服咨询。") : (s.type = 1, 
            s.processText = "1.预约 2.秒杀 3.发货", s.iconText = "1.部分商品预约成功后才有购买资格，预约成功后，请关注秒杀时间及时秒杀，资源有限，先抢先得！\n 2.部分商品在预约期间秒杀时间未定，我们会在商品秒杀前通过Push通知提醒您，请在设置中选择允许通知，以免错过秒杀时间。\n3.对于预约成功享优惠的商品，秒杀开始后，点击“立即秒杀”进入结算页，可在结算页查看优惠，若秒杀时间结束，优惠自动失效。\n4.查看预约商品请至“京东购物-我的-预约”进行查看。\n5.如果提供赠品，赠品赠送规则顺序按照预约商品购买成功时间来计算，而不是预约成功时间。\n6.如您对活动有任何疑问，请联系客服咨询。"), 
            g.state > 1 && g.num >= 1 && (s.num = g.num), g.qiangEtime && g.qiangStime) {
                var f = E(g.qiangStime.replace(/-/g, "/")).format("YYYY.MM.DD HH:mm"), v = E(g.qiangEtime.replace(/-/g, "/")).format("YYYY.MM.DD HH:mm"), S = f.split("."), I = v.split(".");
                S[0] == I[0] && (S.shift(), I.shift(), f = S.join("."), v = I.join(".")), s.showTime = f + " - " + v;
            } else s.showTime = "敬请期待";
            switch (g.state) {
              case 0:
                s.countdown.text = "敬请期待", o = [ {}, {
                    text: "活动未开始",
                    enable: 0,
                    method: "",
                    style: "disabled_btn"
                } ], d = !1;
                break;

              case 1:
                s.countdown.text = "距预约开始还剩", s.countdown.show = !0, r = a(g.yueStime), o = [ {}, {
                    text: "活动未开始",
                    enable: 0,
                    method: "",
                    style: "disabled_btn"
                } ], d = !1;
                break;

              case 2:
                s.countdown.text = "距预约结束还剩", s.countdown.show = !0, r = a(g.yueEtime), o = [ {}, {
                    text: "立即预约",
                    enable: 1,
                    method: "subscribeItem",
                    style: ""
                } ], this.$report("EXP_DETAIL_SUBSCRIBE_BTN"), d = !1;
                break;

              case 3:
                if (r = a(g.qiangStime), t.miao && 1 == t.miao.state && t.miao.startTime < r) {
                    s.countdown.text = "距抢购开始还剩", s.countdown.show = !0, o = [ {}, {
                        text: "抢购未开始",
                        enable: 0,
                        style: "disabled_btn",
                        method: ""
                    } ];
                    break;
                }
                if (h > r) {
                    s.countdown.text = "距秒杀结束还剩", s.countdown.show = !0, r = a(g.qiangEtime), o = [ {}, {
                        text: "排队中",
                        enable: 0,
                        style: "disabled_btn",
                        method: ""
                    } ];
                    break;
                }
                s.countdown.text = "距秒杀开始还剩", s.countdown.show = !0, o = [ {}, {
                    text: "秒杀未开始",
                    enable: 0,
                    style: "disabled_btn",
                    method: ""
                } ], d = !1;
                break;

              case 4:
                if (r = a(g.qiangEtime), t.miao && 2 == t.miao.state) {
                    s.countdown.text = "距抢购结束还剩", s.countdown.show = !0, u = t.miao.endTime, o = [ {}, {
                        text: "立即抢购",
                        method: i ? "specialBuy" : "",
                        enable: i ? 1 : 0,
                        style: i ? "" : "disabled_btn"
                    } ], i || this.$report("EXP_DETAIL_BUYING_SPREE_STOCK"), this.$report("EXP_DETAIL_BUYING_SPREE_BTN");
                    break;
                }
                s.countdown.text = "距秒杀结束还剩", s.countdown.show = !0, o = [ {
                    text: "加入购物车",
                    method: i ? "addToCart" : "",
                    enable: i ? 1 : 0,
                    style: i ? "" : "disabled_btn"
                }, {
                    text: "立即秒杀",
                    method: i ? "buy" : "",
                    enable: i ? 1 : 0,
                    style: i ? "" : "disabled_btn"
                } ], this.$report("EXP_DETAIL_SUBSCRIBE_SECKILL_BTN");
                break;

              case 5:
                if (t.buyingSpreeFlag) {
                    s.countdown.text = "抢购已结束", s.countdown.show = !1, o = [ {}, {
                        text: "抢购已结束",
                        enable: 0,
                        style: "disabled_btn",
                        method: ""
                    } ], r = 0;
                    break;
                }
                s.countdown.text = "秒杀已结束", s.countdown.show = !1, r = 0, o = [ {}, {
                    text: "秒杀已结束",
                    enable: 0,
                    style: "disabled_btn",
                    method: ""
                } ];
            }
            "" === r && (s.countdown.text = "敬请期待", s.countdown.show = !1);
        } else if (t.buyingSpreeFlag && t.miao) {
            var T = t.miao;
            switch (s.type = 2, s.showTime = "", T.state) {
              case 1:
                T.startTime ? (s.countdown.text = "距抢购开始还剩", s.countdown.show = !0, r = T.startTime) : (s.countdown.text = "敬请期待", 
                s.countdown.show = !1), o = [ {}, {
                    text: "抢购未开始",
                    method: "",
                    enable: 0,
                    style: "disabled_btn"
                } ], d = !1;
                break;

              case 2:
                u = T.endTime, r = 0, s.countdown.show = !1, o = [ {}, {
                    text: "立即抢购",
                    method: i ? "specialBuy" : "",
                    enable: i ? 1 : 0,
                    style: i ? "" : "disabled_btn"
                } ], i || this.$report("EXP_DETAIL_BUYING_SPREE_STOCK"), this.$report("EXP_DETAIL_BUYING_SPREE_BTN");
                break;

              case 3:
                r = 0, s.countdown.show = !1, o = [ {}, {
                    text: "抢购已结束",
                    style: "disabled_btn",
                    enable: 0,
                    method: ""
                } ];
            }
        }
        (r || u) && this.countdown(r, h, u, "specialProcess.countdown.timer", function() {
            setTimeout(function() {
                e.render(e.data.info.skuId);
            }, 500);
        }), d || "无货，或此商品不支持配送至该地址" !== t.tipsContent || (t.tipsContent = ""), this.setData({
            specialProcess: s,
            bottomBtn: o,
            "specialProcessStatus.showStockStatus": d,
            "info.tipsContent": t.tipsContent
        });
    },
    countdown: function(e, a, i, s, o) {
        var n = this;
        if (i > 0 && i - a <= 0) return clearTimeout(this.countdownTimer), void (o && o());
        if (e > 0) {
            var r = [ 0, 0, 0, 0, 0, 0, 0, 0 ], c = e - a;
            if (!(c > 0)) return clearTimeout(this.countdownTimer), void (o && o());
            var u = c / 86400 % 99 | 0, d = c / 3600 % 24 | 0, h = c / 60 % 60 | 0, l = c % 60 | 0;
            r[0] = u / 10 | 0, r[1] = u % 10, r[2] = d / 10 | 0, r[3] = d % 10, r[4] = h / 10 | 0, 
            r[5] = h % 10, r[6] = l / 10 | 0, r[7] = l % 10, this.setData(t({}, s, r));
        }
        this.countdownTimer = setTimeout(function() {
            a++, n.countdown(e, a, i, s, o);
        }, 1e3);
    },
    certifiction: function(t) {
        var e = t.currentTarget.dataset, a = e.url, i = e.status;
        if (this.gotoCertifictionFlag = !0, 0 == i) this.$goto("/pages/h5/index", {
            url: a
        }); else {
            var s = {
                rurl: "/pages/item/detail/detail?sku=" + this.data.info.skuId
            };
            this.$goto("/pages/my_pages/account/account", s);
        }
    },
    subscribeItem: function() {
        var t = this;
        this.$report("DETAIL_SUBSCRIBE_BTN");
        var e = this.data.info.skuId;
        n.subscribeItem(e).then(function(e) {
            var a = void 0;
            switch (e.replyCode) {
              case "1":
              case "2":
              case "3":
              case "4":
              case "5":
                a = {
                    status: "fail",
                    show: !0,
                    title: e.replyMsg,
                    bd: [ "开抢时间：" + e.saleStartTime ],
                    confirmAction: "",
                    confirmText: "我知道了"
                };
                break;

              default:
                a = {
                    status: "success",
                    show: !0,
                    title: e.replyMsg,
                    bd: [ "开抢时间：" + e.saleStartTime ],
                    confirmAction: "gotoIndex",
                    cancelAction: "gotoMySubscribe",
                    cancelText: "我的预约",
                    confirmText: "继续逛逛"
                };
            }
            t.setData({
                xModal: a
            });
        }).catch(function(e) {
            var a = {
                status: "fail",
                show: !0,
                title: "预约失败，请重新预约",
                bd: [],
                confirmText: "我知道了"
            };
            t.setData({
                xModal: a
            });
        });
    },
    specialBuy: function(t) {
        var e = this.data.info, a = e.isPop, i = e.stock, s = void 0;
        i && i.D ? s = i && i.D && i.D.type : i && i.venderType && "100" == i.venderType ? s = 100 : a || (s = -1), 
        this.$report("DETAIL_BUYING_SPREE_BTN");
        var o = this.data.specialProcessStatus;
        if (o && 1 == o.voiceCheck) {
            var n = o.voiceCheckUrl;
            return void 0 !== s && (n = n.indexOf("?") > -1 ? n + "&venderType=" + s : n + "?venderType=" + s), 
            void this.$goto("/pages/h5/index", {
                url: n
            });
        }
        var r = {
            sku: this.data.info.skuId,
            num: this.data.num.value
        };
        void 0 !== s && (r.venderType = s), this.data.wxSearchFlag && this.data.wxSearchToken && (r.wxsst = this.data.wxSearchToken), 
        this.$goto("/pages/specialpay/qianggou/qianggou", r);
    },
    initPromoAtoms: function(t) {
        var e = t.postPromo || {};
        t.seckillFlag || t.presellFlag || t.subscribeFlag || t.buyingSpreeFlag || t.flashpurchaseFlag ? delete t.postPromo : e.bannerimg ? this.initPostPromoAtmos(e) : this.setData({
            saleAtmosFir: !0
        });
    },
    initSaleAtmos: function(t) {
        var e = this;
        o.saleAtmos().then(function(a) {
            var i = void 0;
            i = a.find(function(e) {
                if (e.pTag == t) return e.rightupImg = c.getImg(e.rightupImg), e.bannerImg = c.getImg(e.bannerImg), 
                e.beforeTitleTag = c.getImg(e.beforeTitleTag), e;
            }), e.setData({
                saleAtmos: i || {}
            });
        });
    },
    initPostPromoAtmos: function(t) {
        var e = void 0;
        e = t.matid ? 2 == t.activestage ? Math.ceil(t.dcendtime / 1e3) : Math.ceil(t.dcstarttime / 1e3) : Math.ceil(new Date(t.endtime).getTime() / 1e3), 
        t.bannerimg = c.getImg(t.bannerimg);
        var a = m.only(t, [ "bannerimg", "backcolor", "textcolor", "numcolor", "numbackcolor", "descword" ]);
        this.setData({
            "promoteAtoms.config": a
        }), this.promoServerTime = c.getServerTime() / 1e3 | 0, this.updatePromoAtomsTimer(e);
    },
    updatePromoAtomsTimer: function(t) {
        var e = this, a = [ 0, 0, 0, 0, 0, 0, 0 ], i = t - this.promoServerTime;
        if (!(i >= 0)) return clearTimeout(this.promoAtomsTimerId), void this.setData({
            "promoteAtoms.timer": [ 0, 0, 0, 0, 0, 0, 0 ]
        });
        var s = i / 86400 % 100 | 0, o = i / 3600 % 24 | 0, n = i / 60 % 60 | 0, r = i % 60 | 0;
        i / 86400 > 99 && (s = 99), a[0] = 0 | s, a[1] = o / 10 | 0, a[2] = o % 10, a[3] = n / 10 | 0, 
        a[4] = n % 10, a[5] = r / 10 | 0, a[6] = r % 10, this.setData({
            "promoteAtoms.timer": a
        }), this.promoAtomsTimerId = setTimeout(function() {
            e.promoServerTime += 1, e.updatePromoAtomsTimer(t);
        }, 1e3);
    },
    imageOnLoad: function(t, e) {
        var a = this.data.info;
        a.images && e.src == a.images[0] && this.setData({
            slideImages: this.data.info.images
        });
    },
    calcSkuForEachProp: function(e) {
        var a = this, i = this.data.skuProps.length ? this.data.skuProps : e, s = this.getCurrentSelect(i);
        Array.isArray(i) && (i.forEach(function(e) {
            var i = [];
            e.value.forEach(function(n) {
                var r = {};
                Object.assign(r, s, t({}, e.name, n));
                var c = o.getSpecifySku(r, a.newColorSize);
                i.push(c.join("|"));
            }), e.sku = i, S.log("^^^^^^ 商详-计算sku", e.name, e.text, i);
        }), this.setData({
            skuProps: i
        }));
    },
    checkPropSelect: function(t) {
        for (var e in t) if (!t[e]) return !1;
        return !0;
    },
    getCurrentSelect: function(t) {
        var e = {};
        return t || (t = this.data.skuProps), t.forEach(function(t) {
            e[t.name] = t.current;
        }), e;
    },
    updateCurrentSelect: function() {
        var t = [];
        this.data.skuProps.forEach(function(e) {
            e.current && e.value.length > 1 && t.push(e.current);
        }), t.push(this.data.num.value + "个"), this.setData({
            currentSelect: t.join("，")
        });
    },
    initSeckillAtmos: function(t) {
        var e = void 0, a = void 0;
        e = "暂无定价" !== t.miaoShaPrice ? (+t.miaoShaPrice).toFixed(2).split(".") : [ t.miaoShaPrice ], 
        a = "暂无定价" !== t.jdPrice ? (+t.jdPrice).toFixed(2) : t.jdPrice, this.setData({
            secPriceMark: /^\d/.test(e[0]) ? "¥" : "",
            secPrevPriceMark: /^\d/.test(a) ? "¥" : "",
            isSeckillAtmo: !0
        });
        var i = t.intEndTime;
        this.data.seckill = {
            price: e,
            prevPrice: a
        }, this.serverTime = t.serverTime, this.updateSeckillTimer(i);
    },
    updateSeckillTimer: function(t) {
        var e = this, a = t - this.serverTime, i = [ 0, 0, 0, 0, 0, 0 ];
        if (a > 0) {
            var s = a / 3600 % 100 | 0, o = a / 60 % 60 | 0, n = a % 60 | 0;
            i[0] = s / 10 | 0, i[1] = s % 10, i[2] = o / 10 | 0, i[3] = o % 10, i[4] = n / 10 | 0, 
            i[5] = n % 10;
        } else clearTimeout(this.seckillTimeoutId), this.render(this.data.info.skuId);
        var r = this.data.seckill;
        r.timer = i, this.setData({
            seckill: r
        }), this.seckillTimeoutId = setTimeout(function() {
            e.serverTime += 1, e.updateSeckillTimer(t);
        }, 1e3);
    },
    updateDiscount: function(t, e) {
        var a = this;
        o.getMarketPrice().then(function(t) {
            var e = a.data.info, i = {}, s = "";
            +t.price > +e.price && (s = (10 * e.price / t.price).toFixed(1)), s && s < 10 && (i = {
                desc: t.title,
                price: t.price,
                rate: s + "折"
            }), a.setData({
                discount: i
            });
        }).catch(function(t) {}).then(function() {
            e && e();
        });
    },
    updatePromote: function() {
        var t = this, e = this.data.info.promote, a = !1;
        e && e.length && (e.forEach(function(t, e) {
            "赠品" === t.name && (a = !0);
        }), e.forEach(function(e, i) {
            if ("赠品" === e.name || "PLUS赠品" === e.name || "组套商品" === e.name) {
                var s = e.content.map(function(t) {
                    return {
                        img: t.mp,
                        title: t.nm,
                        num: t.num
                    };
                }), o = {
                    hasGift: a,
                    name: e.name,
                    isPlus: !!t.data.info.isPlus
                };
                "赠品" === e.name || "组套商品" === e.name ? t.setData({
                    giftQueryStr: c.querystring({
                        d: JSON.stringify(s),
                        o: JSON.stringify(o)
                    })
                }) : "PLUS赠品" === e.name && t.setData({
                    plusGiftQueryStr: c.querystring({
                        d: JSON.stringify(s),
                        o: JSON.stringify(o)
                    })
                });
            } else ("满减" == e.name || "满折" == e.name || "多买优惠" == e.name || "满赠" == e.name || "加价购" == e.name || "满送" == e.name || "跨店铺满折" == e.name && !e.adurl || "跨店铺满减" == e.name && !e.adurl || "跨店铺满免" == e.name && !e.adurl) && (e.sale = !0);
        }), e.forEach(function(t) {
            var e = t.name;
            switch (e) {
              case "PLUS赠品":
                t.sortIdx = 1;
                break;

              case "赠品":
              case "组套商品":
                t.sortIdx = 2;
                break;

              case "PLUS限购":
                t.sortIdx = 3;
                break;

              case "限购":
                t.sortIdx = 4;
                break;

              case "限制":
              case "PLUS限制":
                t.sortIdx = 5;
                break;

              default:
                t.sortIdx = 6;
            }
            "PLUS限购" != e && "PLUS限制" != e && "PLUS赠品" != e || (t.showPlusStyle = !0);
        }), e.sort(function(t, e) {
            return t.sortIdx - e.sortIdx;
        }), this.setData({
            "info.promote": e || []
        }));
    },
    initAddress: function() {
        var t = f.getAddress(), e = t.addressName, a = t.areaId, i = t.addressId, s = f.getAddress().areaName;
        s = s.replace(/_/g, ""), this.setData({
            address: e || s,
            areaId: a,
            adid: i
        });
    },
    initAddressList: function() {
        var t = this;
        return this.data.addressList.length ? new P(function(t, e) {
            t(!0);
        }) : n.getAddressList().then(function(e) {
            t.setData({
                addressList: e.list
            });
        });
    },
    onAddrChange: function(t) {
        this.render(this.data.info.skuId, !1), this.initAddress();
    },
    setPriceMark: function() {
        this.setData({
            priceMark: /^\d/.test(this.data.info.price) ? "￥" : ""
        });
    },
    updateStock: function(t) {
        var e = this;
        if (!this.data.info.stock.isNeedReal) {
            this.doUpdateNum(this.data.num.value);
            var a = this.data.info.stock;
            return 0 != a.StockState && 34 != a.StockState || (T.addPtagExposure(_.DETAIL_LOOK_SIMILAR_BUTTON_EXP), 
            T.addPtagExposure(_.DETAIL_STOCK_NOTICE_EXP)), t && t();
        }
        o.getRealStock().then(function(t) {
            e.setData({
                "info.stock.rn": t.stock.rn,
                "info.canBuy": t.canBuy,
                "info.tipsContent": t.tipsContent,
                "info.freight": t.freight,
                "info.service": t.service,
                serviceQueryStr: c.querystring({
                    d: JSON.stringify(t.service)
                })
            }), e.doUpdateNum(e.data.num.value);
            var a = t.stock;
            0 != a.StockState && 34 != a.StockState || (T.addPtagExposure(_.DETAIL_LOOK_SIMILAR_BUTTON_EXP), 
            T.addPtagExposure(_.DETAIL_STOCK_NOTICE_EXP));
        }).catch(function(t) {}).then(function() {
            t && t();
        });
    },
    updateCoupon: function(t) {
        var e = this;
        o.getTicket().then(function(t) {
            var a = t.ticket, i = t.services, s = function(t, e) {
                var a = parseInt(t.quota), i = parseInt(e ? t.parValue : t.discount), s = void 0, o = void 0;
                0 === t.couponType ? (s = "bg_jing", o = "京券") : 1 === t.couponType ? (s = "bg_dong", 
                o = "东券") : 2 === t.couponType && (s = "bg_yun", o = "运费券"), 2 !== t.couponKind && 3 !== t.couponKind || (o = "店铺" + o);
                var n = t.couponstyle, r = t.time, c = void 0, u = void 0, d = void 0;
                return t.discountdesc && t.discountdesc.info && (t.discountdesc.info && t.discountdesc.info.length > 1 ? (c = [], 
                u = [], t.discountdesc.info.forEach(function(t) {
                    t.discount = (10 * Number(t.discount)).toFixed(1), c.push(t.discount), c.sort(function(t, e) {
                        return +t - +e;
                    });
                    var e = "满" + t.quota + "元" + t.discount + "折";
                    u.unshift(e);
                }), c = c.join("/") + "折", u = u.join("；") + "，最高减" + +t.discountdesc.high + "元", 
                d = c) : (c = "满" + t.discountdesc.info[0].quota + "元" + (10 * Number(t.discountdesc.info[0].discount)).toFixed(1) + "折", 
                u = "满" + t.discountdesc.info[0].quota + "元可用，最高减" + t.discountdesc.high + "元", 
                d = (10 * Number(t.discountdesc.info[0].discount)).toFixed(1) + "折"), T.addPtagExposure(_.EXP_DISCOUNT_COUPON)), 
                {
                    money: i,
                    limit: a,
                    time: r,
                    desc1: "满" + a + "元可用",
                    desc2: t.name,
                    key: t.key,
                    roleId: t.roleId,
                    didGet: e,
                    type: s,
                    typeName: o,
                    style: n,
                    descDiscount1: c,
                    descDiscount2: u,
                    descDiscount3: d
                };
            }, o = [], n = [];
            a.coupons.forEach(function(t) {
                t.isUse ? o.push(s(t, !0)) : n.push(s(t, !1));
            });
            var r = o.concat(n);
            r.length && T.addPtagExposure(_.EXP_DETAIL_COUPON_AREA), e.setData({
                coupons: r,
                "info.service": i,
                serviceQueryStr: c.querystring({
                    d: JSON.stringify(i)
                })
            });
        }).catch(function(t) {}).then(function() {
            t && t();
        });
    },
    updateSuit: function(t) {
        var e = this;
        o.getRelatedItem().then(function(t) {
            var a = t.promote, i = t.packs;
            e.setData({
                "info.promote": a || [],
                packs: i
            });
        }).catch(function(t) {}).then(function() {
            t && t();
        });
    },
    initProfitBelt: function(t) {
        var e = this, a = this.data.info, i = a.skuId, s = a.category[2] || 0, n = a.venderID || 0, r = a.spAttr, u = 0, d = 0;
        r && r.isOverseaPurchase && (u = 1 == r.isOverseaPurchase || 2 == r.isOverseaPurchase || 3 == r.isOverseaPurchase || 4 == r.isOverseaPurchase ? 2 : 1), 
        r && r.isCanUseDQ && (d = "0" === r.isCanUseDQ ? 1 : 2), this.setData({
            beltAtmos: {},
            saleAtmosFir: !1
        }), o.getProfitBelt({
            skuId: i,
            cateId: s,
            venderId: n,
            isGlobal: u,
            isDQ: d
        }).then(function(t) {
            var a = t.profitBelt, i = t.postPromo;
            if (a.result && a.result.start && a.result.end) {
                var s = c.getServerTime(), o = !(!i.dcstarttime || !i.dcendtime), n = !(!i.starttime || !i.endtime), r = a.result, u = parseInt(i.dcstarttime) || 0, d = parseInt(i.dcendtime) || 0;
                r.forecast = 1e3 * parseInt(r.forecast) || 0, r.start = 1e3 * parseInt(r.start) || 0, 
                r.end = 1e3 * parseInt(r.end) || 0;
                var h = r.start, l = r.end, p = !!(r.forecast < s && r.end > s && r.url), m = function() {
                    p ? (r.url = r.url.split(",")[0], this.setData({
                        "beltAtmos.banner": r.url,
                        "beltAtmos.show": !0
                    }), this.setData({
                        "info.promoNoticeFlag": !1
                    })) : n && this.initPromoAtoms(t);
                }.bind(e);
                o && h == u && l == d ? (p && (r.url = r.url.split(",")[0], e.setData({
                    "beltAtmos.banner": r.url,
                    "beltAtmos.show": !0
                })), e.initPromoAtoms(t)) : o && !p ? e.initPromoAtoms(t) : m();
            } else e.initPromoAtoms(t);
        }).catch(function(t) {}).then(function() {
            t && t();
        });
    },
    gotoSalesSearch: function(t) {
        if (!this.data.wxSearchFlag) {
            this.$report("DETAIL_PROMOTION_SEARCH");
            var e = t.currentTarget.dataset, a = e.pid, i = e.tips, s = e.name, o = 0;
            "满减" === s || "满折" === s || "多买优惠" === s || "跨店铺满折" === s || "跨店铺满减" === s || "跨店铺满免" === s ? o = 0 : "满赠" === s || "满送" === s ? o = 1 : "加价购" === s && (o = 2), 
            this.$goto("/pages/search/subPackages/sales/sales", {
                tips: i,
                actId: a,
                promoType: o,
                source: "detail"
            });
        }
    },
    gotoSearchList: function(t) {
        if (!this.data.wxSearchFlag) {
            var e = t.currentTarget.dataset.key;
            this.$goto("/pages/search/list/list", {
                key: e
            });
        }
    },
    gotoSuitList: function(t) {
        if (!this.data.wxSearchFlag) {
            var e = t.currentTarget.dataset.idx, a = this.data.info.promote[e].content, i = this.data.packs;
            a && (D.tempSuitListData = a, D.tempSuitPacksData = i, D.event.on("addSuitUpdateCartNum", this.addSuitUpdateCartNum.bind(this)), 
            this.$goto("/pages/item/subPackages/suit/suit", {
                wxSearchFlag: this.data.wxSearchFlag ? 1 : 0
            })), this.$report("DETAIL_SUIT"), k.addPtag(_.VIEW_SUIT);
        }
    },
    gotoExchange: function(t) {
        this.$report("DETAIL_EXCHANGE");
        var e = t.currentTarget.dataset.activityId, a = this.data, i = a.info, s = a.slideImages, o = i.skuId, n = s[0], r = i.skuName, u = c.querystring({
            activityId: e,
            skuId: o,
            img: n,
            name: r,
            wxSearchFlag: this.data.wxSearchFlag ? 1 : 0
        });
        this.$goto("/pages/cart/exchange/index?" + u);
    },
    addSuitUpdateCartNum: function(t) {
        this.setData({
            "cart.num": t
        });
    },
    onSwiperChange: function(t) {
        this.setData({
            slideIdx: t.detail.current
        });
    },
    changeSku: function(e) {
        var a = e.currentTarget, i = a.dataset, s = i.idx, o = i.sku, n = i.name, r = a.dataset.val;
        if (o) {
            var c = this.getCurrentSelect();
            r == c[n] && (r = ""), this.setData(t({}, "skuProps[" + s + "].current", r)), this.calcSkuForEachProp(), 
            this.updateCurrentSelect(), c = this.getCurrentSelect(), 1 == o.split("|").length && this.checkPropSelect(c) && o != this.data.info.skuId && this.render(o, !1, !1), 
            k.addPtag(_.VIEW_GOODS_PROPERTY);
        }
    },
    togglePanel: function(e) {
        var a = e.currentTarget.dataset.panel;
        if (this.setData(t({}, "panelShow." + a, !this.data.panelShow[a])), "promote" == a) {
            var i = this.data.panelShow[a] ? "show" : "hide";
            p.set("itemPromoteStatus", i);
        } else "coupon" == a && this.setData({
            showCouponLayerFlag: !0
        });
        var s = {
            sku: _.VIEW_FOLD_GOODS,
            promote: _.VIEW_FOLD_PROMOTIONS
        }[a];
        s && k.addPtag(s);
    },
    navigateTo: function(t) {
        var e = t.currentTarget.dataset.url;
        this.$goto(e, "navigateToByForce"), 0 == e.indexOf("/pages/item/subPackages/gift/gift") && this.$report("DETAIL_GIFT_PROMOTION");
    },
    add: function() {
        this.doUpdateNum(+this.data.num.value + 1), k.addPtag(_.VIEW_SELECT_COUNTS);
    },
    sub: function() {
        this.doUpdateNum(+this.data.num.value - 1), k.addPtag(_.VIEW_SELECT_COUNTS);
    },
    updateNum: function(t) {
        this.doUpdateNum(parseInt(t.detail.value) || 1, !0);
    },
    doUpdateNum: function(t, e) {
        var a = this.data.info.stock.rn, i = this.data.num.limit, s = x, o = "";
        a > 0 && (s = Math.min(s, a)), t < i ? (t = i, i > 1 && (o = "该商品最少需购买" + i + "件")) : t > s && (t = s, 
        o = s == x ? "单款最多可买" + x + "件" : "该商品最多可购买" + s + "件"), o && e && u.show({
            icon: u.ICON.WARNING,
            content: o,
            page: this
        }), this.setData({
            "num.value": "number" == typeof this.data.num.value ? t + "" : +t,
            "num.subEnabled": t > i,
            "num.addEnabled": t < s
        }), this.updateCurrentSelect();
    },
    drawCoupon: function(t) {
        var e = this, a = t.detail;
        if (!a.currentTarget.dataset.get) {
            var i = this;
            n.queryPinStatus().then(function(t) {
                1 == t.defaultFlag ? (1 != t.state && 2 != t.state && 4 != t.state || wx.showModal({
                    title: "",
                    content: "您正在领取京东优惠券，请先登录正式京东账号",
                    showCancel: !1,
                    confirmText: "去登录",
                    confirmColor: "#E93B3D",
                    success: function(t) {
                        if (t.confirm) {
                            var e = {
                                scendid: "521392394"
                            };
                            i.gobackCheckPinFlag = !0, i.drawCouponEv = a, i.$goto("/pages/my_pages/account/account", e);
                        }
                    }
                }), 3 == t.state && wx.showModal({
                    title: "",
                    content: "您需要切换为正式京东账号才能领取优惠券",
                    showCancel: !1,
                    confirmText: "去切换",
                    confirmColor: "#E93B3D",
                    success: function(e) {
                        if (e.confirm) {
                            var s = t.pinList.find(function(t) {
                                return 0 == t.defaultFlag;
                            }), o = s ? s.pin : "", n = "/pages/item/detail/detail?sku=" + i.data.info.skuId;
                            i.switchAccount(o, n, a);
                        }
                    }
                })) : e.drawRealCoupon(a);
            }).catch(function(t) {
                u.show({
                    content: t.message,
                    icon: "WARNING",
                    page: e
                });
            }), k.addPtag(_.VIEW_COUPON);
        }
    },
    switchAccount: function(t, e, a) {
        var i = this;
        n.switchPin(t, e).then(function(t) {
            i.drawRealCoupon(a);
        }).catch(function(t) {
            u.show({
                icon: "WARNING",
                content: "活动太火爆了，请稍后重试~",
                page: i
            });
        });
    },
    drawRealCoupon: function(a) {
        var i = this, s = a.currentTarget, o = s.dataset.key, c = s.dataset.roleid, d = s.dataset.type, h = s.dataset.index;
        this.data.coupons[h].didGet || r.getcoupon(o, c, function(s, o) {
            if (S.log(">>>>>> 领券中心 - getcoupon 领券接口调用完成", s, o), s) u.show({
                icon: u.ICON.WARNING,
                content: s.errMsg,
                duration: 2e3,
                page: i
            }), k.addPtag(_.DETAIL_COUPON_FAIL); else {
                if (999 != o && 14 != o && 15 != o || i.setData(t({}, "coupons[" + h + "].didGet", !0)), 
                34 == o) return void n.verifyAuth().then(function(t) {
                    if (0 == t.retcode) {
                        i.gobackCertifictionFlag = !0, i.drawCouponEv = a;
                        var e = t.url;
                        i.$goto("/pages/h5/index", {
                            url: e
                        });
                    } else u.show({
                        icon: "WARNING",
                        content: "活动太火爆了，请稍后再试~"
                    });
                });
                3 == d && k.addPtag(_.DETAIL_DISCOUNT_SUCC), k.addPtag(_.DETAIL_COUPON_SUCC), u.show({
                    icon: u.ICON.SUCCESS,
                    content: e(o),
                    page: i
                });
            }
        }, {
            sceneid: 2
        });
    },
    checkSku: function() {
        var t = this.getCurrentSelect();
        if (!this.checkPropSelect(t)) {
            var e = [];
            return this.data.skuProps.forEach(function(a) {
                t[a.name] || e.push(a.text.replace("选择", ""));
            }), u.show({
                icon: u.ICON.WARNING,
                content: "请选择`" + e.join("/") + "`",
                page: this
            }), !1;
        }
        return !0;
    },
    buy: function() {
        var t = encodeURIComponent(A.getCookie("wq_addr")), e = this.data.info.canBuy;
        if (this.data.isSpecialProcess && this.$report("DETAIL_SUBSCRIBE_SECKILL_BTN"), 
        e && this.checkSku()) {
            var a = A.getCookie("choseShopId");
            if (a) {
                var i = a.split("----");
                if (i && i[1] === this.data.info.skuId) {
                    var s = [ this.data.info.skuId, i[0], this.data.num.value || 1, this.data.info.skuId, "1,0,0" ];
                    return void this.$goto("/pages/pay/index/index", {
                        commlist: s.join(",")
                    });
                }
            }
            var o = [ this.data.info.skuId, "", this.data.num.value || 1, this.data.info.skuId, "1,0,0" ].join(",");
            if (this.data.info.isOTC && this.data.info.isZiying) return void this.$goto("/pages/h5/index", {
                url: "https://wqs.jd.com/order/s_confirm_otc.shtml?commlist=" + o + "&wq_addr=" + t
            });
            var n = this.data.info.poolList, r = this.data.info.spAttr, c = void 0;
            n && (c = n.map(function(t) {
                return t.list[t.selected || 0].sid;
            }));
            var u = {
                sku: this.data.info.skuId,
                num: this.data.num.value,
                zp: c ? c.join("_") : ""
            };
            r && r.isOverseaPurchase && 0 != r.isOverseaPurchase && (u.category = "global"), 
            r && 1 == r.isXnzt && (u.type = 3), this.data.wxSearchFlag && this.data.wxSearchToken && (u.wxsst = this.data.wxSearchToken), 
            this.$goto("/pages/pay/index/index", u), k.addPtag(_.VIEW_BUYING, {
                sku_id: this.data.info.skuId
            });
        }
    },
    addToCart: function(t) {
        var e = this;
        if (this.data.info.canBuy && this.checkSku()) {
            var a = this.data.info.poolList, i = void 0;
            a && (i = a.map(function(t) {
                return t.list[t.selected || 0].sid;
            })), this.us.prepare(this.us.OP_ITEM_ADD_CART), o.addCart({
                buyNum: this.data.num.value,
                poolSkus: i
            }).then(function(t) {
                e.us.report(e.us.OP_ITEM_ADD_CART, 0, null), u.show({
                    icon: u.ICON.SUCCESS,
                    content: "添加成功",
                    page: e
                }), e.updateCartNum(t, !0), e.isCouponSearch && D.event.emit("updateCouponCartNum");
            }).catch(function(t) {
                e.us.report(e.us.OP_ITEM_ADD_CART, 1, t), u.show({
                    icon: u.ICON.WARNING,
                    content: "string" == typeof t ? t : t.message || "网络错误",
                    page: e
                });
            }), k.addPtag(_.VIEW_ADD_TO_CART, {
                sku_id: this.data.info.skuId
            });
        }
    },
    updateCartNum: function(t, e) {
        var a = this;
        if (t || (t = o.getCookie("cartNum")), t && this.setData({
            "cart.num": t
        }), e) {
            var i = ~~this.data.num.value, s = this.data.cart, n = wx.createAnimation({
                duration: 666
            });
            n.opacity(1).translateY(-10).step().opacity(0).step(), s.add = i, s.ani = n.export(), 
            this.setData({
                cart: s
            }), setTimeout(function() {
                var t = wx.createAnimation({
                    duration: 0
                });
                t.opacity(0).translateY(0).step(), a.setData({
                    "cart.ani": t.export()
                });
            }, 1332);
        }
    },
    gotoPlus: function() {
        this.$goto("/pages/h5/index", {
            url: "https://plus.m.jd.com/index?s=wq"
        });
    },
    modalTip: function(t) {
        var e = t.currentTarget.dataset, a = e.type, i = e.content, s = "", o = "#3CC51F";
        switch (a) {
          case "openPlusTip":
            this.$report("DETAIL_OPEN_PLUS"), s = "请到“微信-发现-购物-个人中心”进行PLUS会员开通。";
            break;

          case "specialPriceTip":
            s = "近期浏览、关注过该商品或关联商品的用户，有可能被判定为该商品的优惠价专属用户。仅在商品展示“专属价”标签期间，用户能以低于京东价的专属价购买该商品。";
            break;

          case "samPriceTip":
            s = "山姆会员店是沃尔玛旗下的高端会员制商店，将山姆会员卡与京东账号绑定后，即可在山姆会员商店官方旗舰店享受会员价购买商品", o = "#E93B3D";
            break;

          case "subscribe":
            s = i, o = "#E9383D";
            break;

          case "samTip":
            this.$report("DETAIL_FOOTER_SAM_BUY"), s = "请到“微信-发现-购物-个人中心-账号管理-山姆会员”购买Sam's会籍或进行会员绑定。", 
            o = "#E9383D";
        }
        s && wx.showModal({
            title: "",
            content: s,
            showCancel: !1,
            confirmColor: o
        });
    },
    addFavShop: function(t) {
        var e = this, a = t.currentTarget.dataset.venderid;
        n.shopAddFav(a).then(function(t) {
            t ? (e.toast.show({
                content: "收藏店铺成功",
                icon: e.toast.ICON.SUCCESS
            }), e.setData({
                shopFavStatus: t
            }), k.addPtag(_.DETAIL_SHOP_CLICK)) : e.toast.show({
                content: "网络错误，请稍后重试",
                icon: e.toast.ICON.SUCCESS
            });
        }).catch(function(t) {
            e.toast.show({
                content: "网络错误，请稍后重试",
                icon: e.toast.ICON.SUCCESS
            });
        });
    },
    toggleFavStatus: function() {
        this.setData({
            shopFavStatus: !this.data.shopFavStatus
        });
    },
    subscribeInfoTip: function(t) {
        var e = t.currentTarget.dataset.content;
        e && g.show({
            title: "",
            content: e.replace("\n", "<br>"),
            align: "left",
            showCancel: !1,
            confirmText: "我知道了",
            confirmColor: "#E93B3D"
        });
    },
    taxInfoTip: function(t) {
        var e = this.data.info.taxTxt;
        e && g.show({
            title: e.title.replace(/：/g, ""),
            content: e.detail.replace("\r\n", "<br><br>"),
            align: "left",
            showCancel: !1,
            confirmText: "知道了",
            confirmColor: "#E93B3D"
        });
    },
    gotoCart: function() {
        this.$goto("/pages/cart/cart/cart"), k.addPtag(_.VIEW_GO_TO_CART);
    },
    gotoShop: function() {
        this.$report("DETAIL_FOOTER_SHOP");
        var t = this.data.info, e = t.venderID, a = t.skuId, i = t.category, s = "";
        s = i ? "https://wqshop.jd.com/mshop/gethomepage?venderid=" + e + "#/index?recItem=" + a + "_" + i[0] + "_" + i[1] + "_" + i[2] : "https://wqshop.jd.com/mshop/gethomepage?venderid=" + e, 
        this.$goto("/pages/h5/index", {
            url: s
        });
    },
    kissPoolListData: function(t) {
        if (!t) return this.data.info.poolList;
        this.setData({
            "info.poolList": t
        });
    },
    previewImage: function() {
        var t = this.data, e = t.slideImages, a = t.slideIdx, i = e.map(function(t) {
            return t.replace(/(\/)(?:s\d+x\d+_)?(jfs\/)/, "$1$2").replace("n1/", "img/");
        });
        i.length && wx.previewImage({
            current: i[a],
            urls: i
        });
    },
    favGoods: function(t) {
        "add" == t.currentTarget.dataset.type ? (this.$report("DETAIL_ITEM_FAV"), this.addFavGoods()) : (this.$report("DETAIL_ITEM_UNFAV"), 
        this.delFavGoods());
    },
    addFavGoods: function() {
        var t = this, e = this.data.info, a = e.skuId, i = e.category, s = (void 0 === i ? [] : i).join("_");
        n.itemAddFav(a, s).then(function(e) {
            t.setData({
                favStatus: e
            }), u.show({
                icon: u.ICON.SUCCESS,
                content: "收藏成功",
                page: t
            });
        }).catch(function(e) {
            var a = e.code;
            e.message;
            2 == a ? u.show({
                icon: u.ICON.WARNING,
                content: "您的收藏商品数量已达上限",
                page: t
            }) : u.show({
                icon: u.ICON.WARNING,
                content: "网络错误，请稍后重试",
                page: t
            });
        });
    },
    delFavGoods: function(t) {
        var e = this, a = this.data.info, i = a.skuId, s = a.venderID;
        n.itemDelFav(i, s).then(function(t) {
            e.setData({
                favStatus: t
            }), u.show({
                icon: u.ICON.SUCCESS,
                content: "取消收藏成功",
                page: e
            });
        }).catch(function(t) {
            u.show({
                icon: u.ICON.WARNING,
                content: "网络错误，请稍后重试",
                page: e
            });
        });
    },
    gotoAd: function(t) {
        var e = t.currentTarget.dataset, a = e.url, i = e.type, s = e.id, o = e.position, n = e.clickrd;
        this.data.wxSearchFlag && "customerService" !== o || (n && k.addPtag(n), "ad" == o ? (T.setChangeRef(!0), 
        this.$report("DETAIL_NAME_AD")) : "customerService" == o && this.$report("DETAIL_FOOTER_SERVICE"), 
        s ? "shop" == i ? this.$goto("/pages/h5/index", {
            url: a
        }) : this.$goto("/pages/item/detail/detail", {
            sku: s
        }) : this.$goto("/pages/h5/index", {
            url: a
        }));
    },
    modalConfirm: function(t) {
        "gotoIndex" == t.detail.action && this.$goto("/pages/index/index", "switchTab"), 
        this.setData({
            "xModal.show": !1
        });
    },
    modalCancel: function(t) {
        if ("gotoMySubscribe" == t.detail.action) {
            this.$goto("/pages/h5/index", {
                url: "https://wqs.jd.com/my/preorder/mypreorder_v1.shtml"
            });
        }
        this.setData({
            "xModal.show": !1
        });
    },
    modalClose: function() {
        this.setData({
            "xModal.show": !1
        });
    },
    switchAddress: function(t) {
        for (var e = t.detail, a = this.data.addressList, i = 0; i < a.length; i++) if (a[i].adid == e) {
            var s = a[i], o = [ s.provinceId, s.cityId, s.countyId, s.townId ].join("_"), n = s.addrfull, r = e;
            this.setData({
                address: n,
                areaId: o,
                adid: r
            }), this.render(this.data.info.skuId, !1);
        }
    },
    handleShareBtnClick: function() {
        this.data.closeShareTip && (p.set("item:closeShareTip", 0), this.$report("DETAIL_SHARE_TIP_CLOSE")), 
        this.setData({
            closeShareTip: 0,
            showShareLayerFlag: !0
        }), this.$report("DETAIL_SHARE_BTN");
    },
    doCloseShareTip: function() {
        this.data.closeShareTip && (p.set("item:closeShareTip", 0), this.$report("DETAIL_SHARE_TIP_CLOSE")), 
        this.setData({
            closeShareTip: 0
        });
    },
    showAddressLayer: function(t) {
        var e = this, a = function() {
            var t = o.getAreaId();
            this.$goto("/pages/item/subPackages/address/address", {
                addr_id_str: t
            }, "navigateToByForce");
        }.bind(this);
        this.initAddressList().then(function() {
            e.data.addressList.length ? (e.setData({
                showAddressLayerFlag: !0,
                showLayer: !0
            }), T.addPtagExposure(_.DETAIL_ADDRESS_LAYER_EXP)) : a();
        }).catch(function(t) {
            a();
        });
    },
    closeAddressLayer: function(t) {
        this.setData({
            showAddressLayerFlag: !1,
            showLayer: !1
        });
    },
    closeShareLayer: function(t) {
        this.setData({
            showShareLayerFlag: !1
        });
    },
    showGlobalInfoPanel: function(t) {
        this.$report("DETAIL_GLOBAL_SERVICE"), this.setData({
            showGlobalInfoFlag: !0,
            showLayer: !0
        });
    },
    closeGlobalInfoPanel: function(t) {
        this.setData({
            showGlobalInfoFlag: !1,
            showLayer: !1
        });
    },
    navTabClk: function(t) {
        var e = t.target.dataset.idx;
        switch (e) {
          case "0":
            this.pageScrollTo(".cover"), this.$report("DETAIL_NAV_TAB_GOODS");
            break;

          case "1":
            this.pageScrollTo(".Review"), this.$report("DETAIL_NAV_TAB_COMMENT");
            break;

          case "2":
            this.pageScrollTo(".Specific"), this.$report("DETAIL_NAV_TAB_DETAIL");
            break;

          case "3":
            this.pageScrollTo(".GuessYouLike"), this.$report("DETAIL_NAV_TAB_RECOMMEND");
        }
        this.setData({
            nav_idx: e
        });
    },
    onPageScroll: function(t) {
        this.scrollNav(), t.scrollTop > 1e3 && 1001 != this.data.scrollTop ? this.setData({
            scrollTop: 1001
        }) : t.scrollTop <= 1e3 && this.data.scrollTop && this.setData({
            scrollTop: 0
        });
    },
    scrollNav: function() {
        var t = this, e = this.data.wxSearchFlag;
        wx.createSelectorQuery().selectAll(".Jrolling").boundingClientRect(function(a) {
            a.length && e ? a[2] && a[2].top <= 45 ? "2" != t.data.nav_idx && t.setData({
                nav_idx: "2"
            }) : a[1] && a[1].top <= 45 ? "1" != t.data.nav_idx && t.setData({
                nav_idx: "1"
            }) : a[0] && a[0].top <= 45 && "0" != t.data.nav_idx && t.setData({
                nav_idx: "0"
            }) : a.length && (a[3] && a[3].top <= 45 ? "2" != t.data.nav_idx && t.setData({
                nav_idx: "2"
            }) : a[2] && a[2].top <= 45 ? "3" != t.data.nav_idx && t.setData({
                nav_idx: "3"
            }) : a[1] && a[1].top <= 45 ? "1" != t.data.nav_idx && t.setData({
                nav_idx: "1"
            }) : a[0] && a[0].top <= 45 && "0" != t.data.nav_idx && t.setData({
                nav_idx: "0"
            }));
        }).exec();
    },
    back2top: function() {
        this.setData({
            scrollTop: 0
        }), wx.pageScrollTo({
            scrollTop: 0
        });
    },
    pageScrollTo: function(t, e) {
        wx.createSelectorQuery().selectViewport().scrollOffset(function(e) {
            wx.createSelectorQuery().select(t).boundingClientRect(function(t) {
                wx.pageScrollTo({
                    scrollTop: t.top + e.scrollTop - 40,
                    duration: 0
                });
            }).exec();
        }).exec();
    },
    chooseShop: function(t) {
        var e = this.data.info, a = e.venderID, i = e.skuId, s = this.data.info.spAttr.locGroupId;
        a && i && s && this.$goto("/pages/item/subPackages/chooseShop/index?venderId=" + a + "&sku=" + i + "&locGroupId=" + s, "navigateToByForce");
    },
    goDrop: function() {
        if (this.data.info.category) {
            var t = this.data.info.category.join("_"), e = "https://wqs.jd.com/item/arrival_notice.shtml?sku=" + this.data.info.skuId + "&source=2&ptag=7001.1.91&category=" + t;
            this.$goto("/pages/h5/index", {
                url: e
            });
        }
    },
    closeCouponLayer: function() {
        this.setData({
            showCouponLayerFlag: !1
        });
    }
});