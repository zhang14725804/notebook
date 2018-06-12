function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = e(require("../../libs/lodash.core.min.js")), t = e(require("../../utils/api.js")), i = require("../../utils/util.js"), n = getApp();

Page({
    data: {
        showAnimation: !1,
        ab_reservation: i.ABTEST.get("reservation"),
        reservationCity: "",
        reservationText: "",
        shopList: [],
        route: "pages/index/index",
        piwikSource: "",
        isGetModel: !1,
        isSupportMobile: !1,
        isGetMobileImg: !1,
        mobileType: [],
        lastIndex: -1,
        labelValue: "",
        mobileImg1: "",
        mobileImgUrl: "",
        mobileName: "",
        productId: "",
        showPopup: !1,
        phoneNumber: "",
        captchCode: "",
        contactName: "",
        userLogin: !1,
        tracking: {
            scene: "",
            from: "",
            activity_name: ""
        },
        selectBanner: 0,
        bannerItems: [],
        defaultBanner: [ {
            imgUrl: "../../resource/images/index/banner.png",
            url: ""
        } ],
        bannerUI: {
            defaultBannerShow: !1
        },
        category: [ {
            name: "手机回收",
            imgUrl: "https://aihuishou-internal.oss-cn-hangzhou.aliyuncs.com/miniapps/earth/icon_3.png",
            url: "/pages/category/category?categoryId=1"
        }, {
            name: "笔记本回收",
            imgUrl: "https://aihuishou-internal.oss-cn-hangzhou.aliyuncs.com/miniapps/earth/icon_1.png",
            url: "/pages/category/category?categoryId=5"
        }, {
            name: "平板回收",
            imgUrl: "https://aihuishou-internal.oss-cn-hangzhou.aliyuncs.com/miniapps/earth/icon_2.png",
            url: "/pages/category/category?categoryId=6"
        }, {
            name: "其他品类",
            imgUrl: "https://aihuishou-internal.oss-cn-hangzhou.aliyuncs.com/miniapps/earth/icon_4.png",
            url: "/pages/category/category?categoryId=3"
        } ],
        hotRecycle: [],
        defaultNavigator: "navigate",
        activityNavigator: "redirect",
        isFromActivity: !1,
        autoInModalImage: "../../resource/images/index/auto.png",
        couponImg: "../../resource/images/index/icon_couponcode.png",
        successIcon: "../../resource/images/index/success.png",
        title_img: "../../resource/images/index/title_img.png",
        cameraImage: "../../resource/images/index/icon-camera.png",
        iphoneImage: "../../resource/images/index/icon-iphone.png",
        iwatchImage: "../../resource/images/index/icon-iwatch.png",
        netbookImage: "../../resource/images/index/icon-netbook.png",
        ipadImage: "../../resource/images/index/iPad.png",
        activity_banner: {
            imgUrl: "",
            redirectUrl: ""
        },
        treeUrl: "../activity/public/public?url=" + encodeURIComponent("https://activity.aihuishou.com/planttrees/index.html#/index?utm_source=xqd_hl&utm_medium=miniprog&utm_campaign=treegrowth"),
        hasLogin: !1,
        isIphoneX: !1,
        topPrice: ""
    },
    baseData: {
        iphoneModelRegExp: /^.*<.*iphone.*>/i
    },
    pageData: {
        toastSuccessIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAk1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ROyVeAAAAMHRSTlMA+/fsfTTxrloVAuFOG9QkDwW4l4hnLQrlyr6OO3JjRNzbpMIfEqFBqG5JB9d0Kw62ZipOAAACSUlEQVR42u3Y646iQBCG4aJBERQFD6PCeD6Mo3P47v/qNmuyMqbcNobpYjNbz38TO93QL0VKKaWUUkop9R/aFivPWxUJ1WRucGZGVIsAF3OqwRAlsyVxA3xVkLB4jSsrkpWFuOaRqHEftf6BNEephi3YTcEUJCfqgjEJiUmW4EYkptcGNyMxTxMwnuD6Gz4Yr0VinptgvA6JWRgwZkFiOh6Y5jOJaXlg/AaJGXlgJk8kZgau3SMxAbhlQmKG4LoRiRmAm+5ISrwGl6ckJQvB9cfkDM8vLsxISpqDW8ck43Z+YUACyvxihiTAkl8BWf34/JrTPf9QfkWt2XtnXFt+pQNzTpYg+778enlkAy8HaJPWkV8tg4tuIp5fcXFdDj3h/Ipy9mPR/Gq0q9VrAG6VPLT9nFlI5VdWgHnkEY4r5leZD/wlKpJfB/zdu0B+LWAzdJ9fIawGMdmkm8r55cPuYFtN9A35hXv6Y7f5ZXDPJnWaXxtcMdZ3yv38eqVHjfBVuAvBLbcO8+vUxYUXEMV7cJMPh9OvD/+SD0f6rQDnNxxOv7Y5zvpby93WXFTLL7tGsF8HDXYu2PLkpl8t79YBk5x+HQ24WbX8qt74GEpOv578m1fTvfxy/Z15OAlOv5I3cG1w05ScKC9bu/yTGGfTHunp1ykEIzv9ivew28fkWAFGePoVWKNZwitKktMvfjXx/JLSMbc/3OS8NCvkl5sBnOmQrF6b5Zew5I3ll7BoyvJL2Gf45/rvUU2OoQ+zGWWklFJKKaWUUj/GL07nk4k3zSK9AAAAAElFTkSuQmCC",
        toastFailIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAflBMVEUAAAD+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v5yViGVAAAAKXRSTlMA+t3s5SQPBvfYvUksHBUK8dKyloltZc/JxqWQe1M3Hq+jmIBeQkA9NO32K2AAAAIOSURBVHja7NbZbsIwEIXh45QkFNoAZStt2dfz/i9YiQsQ8VDHM0itKn/3jmIntn8kSZIkSZIkSZL8YcvPzLnsc/lbzxi3eeYmUJs4nrXHirG8GEFpxIvoWeSOV0OoDHnlcsNgcg2FNWmYRMYbqxKRyhVvZIjDmk4PUXod1iCOY82sQIRixhqHOAPWTSs0Vk1ZN0CcLT3Pr2jo9ZmeLeIUT/RkORrJM3qeCkTqOnpaL2jgpUWP6yJaty3M44Sgk7B27S4U9n16+kcEHKVRe6gsxLko1m0BgfprzvGDufznqOUt+na4a0dfK4fAsqM5xh1jiqeHSTWg7wuiL/oGFYyKd/pGcn743guY9Tr0DeWCkO5Qu/KNvg/UfND3VuIhSvnh4Zcs8SgbcXkDn2kDk/APNiuk/LC3dGCLCYlSTeWtahc+ZCIOK7MJpUSR84MTKMVfNIELK8SeKJr8UDv02UD/AAVtotjyw54oj8wPTXJr0/1BiWLLD3uimPPDnij2/LAnij0/7IkSzo9/9wLf7ZoJDcBADMP4sx6GZdWsRDaFe9o8749g6xIGz3DqI0q+4qVhlIzjpYUkW8l2ltJwLZ8RJqk0WxGnsTzfMCi+WTT9JtV3m67bqLyxanvN6ju7vjOwuI1s+kKr89iuLbjEo1s8vMbje7zAgFc48BILXuPBi0x8lYsvs4mIiIiIiPzEA73Vp4SlD7MAAAAAAElFTkSuQmCC"
    },
    onLoad: function(e) {
        var a = this, i = this, o = e.weixinadinfo, s = 0;
        o && (console.log("广告信息", o), s = o.split(".")[0], this._piwik("miniapp/campaign", "aid_" + s));
        var r = "";
        e && e.from && (r = e.from, i.data.tracking.from = r), i.data.tracking.scene = getApp().globalData.scene;
        var c = wx.getStorageSync("from_activity");
        "" != c && (i.data.tracking.activity_name = c), wx.removeStorageSync("from"), n.saveCache("from", r), 
        this.setData({
            tracking: i.data.tracking
        }), n.aldstat.sendEvent("首页UV", n.getGuid(!1)), new n.WeToast();
        var d = getCurrentPages().length;
        "activity" == e.from && d > 1 && i.setData({
            isFromActivity: !0
        }), wx.getSystemInfo({
            success: function(e) {
                if (e.model && "string" == typeof e.model) {
                    var a = e.model;
                    a.includes("iPhone X") && i.setData({
                        isIphoneX: !0
                    }), i.baseData.iphoneModelRegExp.test(a) && (a = a.split("<")[1].split(">")[0]), 
                    console.log(a, "this model "), n.fetch(t.default.fetchMobileType, {
                        model: a
                    }, function(o, s, r) {
                        if (console.log(s.data, a), "success" === r && s.data) {
                            var c = {
                                name: s.data.productName,
                                id: s.data.idProduct
                            };
                            n.saveCache("mobileInfo", c), i.setData({
                                isSupportMobile: !0,
                                mobileName: s.data.productName,
                                labelValue: "检测到您的手机为",
                                productId: s.data.idProduct
                            }), i.setData({
                                isGetModel: !0
                            }), n.fetch(t.default.fetchProduct, {
                                productId: s.data.idProduct
                            }, function(e, a, t) {
                                if ("success" === t && a.data) {
                                    a.data.imgUrl && (i.setData({
                                        mobileName: a.data.name,
                                        mobileImg1: a.data.imgUrl,
                                        mobileImgUrl: encodeURIComponent(a.data.imgUrl),
                                        isGetMobileImg: !0,
                                        topPrice: a.data.topPrice
                                    }), c.name = a.data.name, c.imgUrl = a.data.imgUrl, n.saveCache("mobileInfo", c));
                                    var o = "currentDevice/" + a.data.name + ";currentDeviceprice/" + a.data.topPrice;
                                    i._piwik("miniapp/indexPage", o, "basicInfo"), n.aldstat.sendEvent("首页-本机机型", o.replace(/\//g, "_"));
                                }
                            });
                        } else i.setData({
                            labelValue: "检测到您的手机为",
                            isGetModel: !0
                        }), i.setData({
                            mobileName: e.model
                        });
                    });
                } else i.setData({
                    isGetModel: !1,
                    labelValue: "手机型号无法获取",
                    mobileName: "请10分钟后重新进入小程序，并在授权时点击确定"
                });
            },
            fail: function(e) {
                i.setData({
                    isGetModel: !1
                });
            }
        }), n.saveOpenId(), wx.getLocation({
            type: "wgs84",
            success: function(e) {
                n.saveCache("curLocation", {
                    code: e
                }), i.initResrevation(e.latitude, e.longitude);
            },
            fail: function(e) {
                n.saveCache("curLocation", {
                    code: ""
                });
            }
        }), wx.getStorage({
            key: "user-phone-info",
            success: function(e) {
                i.setData({
                    userLogin: !0
                });
            }
        }), n.fetch(t.default.fetchBanners, {}, function(e, a, t) {
            if (0 == a.code && a.data.length > 0) {
                var n = "";
                a.data.forEach(function(e) {
                    n = null == e.url ? "" : e.url.indexOf("pages") > 0 ? e.url : "../activity/template/template?url=" + encodeURIComponent(e.url), 
                    i.data.bannerItems.push({
                        imgUrl: e.imgUrl,
                        url: n,
                        name: e.name
                    });
                });
            } else i.data.bannerItems = i.data.defaultBanner, i.data.bannerUI.defaultBannerShow = !0;
            i.setData({
                "bannerUI.defaultBannerShow": i.data.bannerUI.defaultBannerShow,
                bannerItems: i.data.bannerItems
            });
        }), n.fetch(t.default.getIndexHotrecycle, {
            categoryId: 1,
            pageIndex: 0,
            pageSize: 4
        }, function(e, t, i) {
            0 == t.code && t.data && a.setData({
                hotRecycle: t.data
            });
        });
    },
    onShow: function() {
        var e = this;
        n.fetch(t.default.fetchUser, {}, function(a, t, i) {
            if (t.data) {
                var o = t.data, s = o.mobileLoginToken, r = o.mobile;
                n.saveCache("userLoginInfo", {
                    token: s,
                    mobile: r
                }), e.setData({
                    hasLogin: !0
                });
            } else console.log("未登录");
        });
    },
    handleBannerChange: function(e) {
        this.setData({
            selectBanner: e.detail.current
        });
    },
    handleTapClickThis: function(e) {
        this._piwik("miniapp/indexPage", "searchprice", "basicInfo"), n.aldstat.sendEvent("首页-本机估值按钮", {
            "页面来源": "首页"
        }), wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    onShareAppMessage: function(e) {
        "button" == e.from && (this._piwik("miniapp/indexPage", "shareprice", "basicInfo"), 
        n.aldstat.sendEvent("首页-告诉好友按钮", {
            "页面来源": "首页"
        }));
        var a = this.data, t = a.topPrice, i = a.mobileName;
        return i && i.length && "button" == e.from ? {
            title: "我的" + i + "能卖" + t + "元，不服来PK！",
            path: "/pages/index/index",
            imageUrl: "https://aihuishou-internal.oss-cn-hangzhou.aliyuncs.com/miniapps/earth/pk_share.png"
        } : {
            title: "爱回收手机回收",
            path: "/pages/index/index",
            imageUrl: "https://aihuishou-internal.oss-cn-hangzhou.aliyuncs.com/miniapps/earth/earth_share_banner.png"
        };
    },
    getPhoneNumber: function(e) {
        this._piwik("miniapp/indexPage", "tabmine", "basicInfo"), n.aldstat.sendEvent("首页-底部tab 我的按钮", {
            "页面来源": "首页"
        }), console.log(this.getPhoneSuccess), n.getPhoneNumber(e, this.getPhoneSuccess, this.getPhoneFailed);
    },
    getPhoneSuccess: function(e) {
        this.loginAutoFunc(e);
    },
    handleClickBanner: function(e) {
        var a = e.target.dataset.info;
        a.name.indexOf("moon") > -1 ? wx.navigateToMiniProgram({
            appId: "wx1d0bf756d8c83d75",
            path: a.url
        }) : wx.navigateTo({
            url: a.url
        });
    },
    loginAutoFunc: function(e) {
        var a = e.detail.encryptedData, i = e.detail.iv;
        n.post(t.default.getWeixinBindPhone, {
            encryptedData: a,
            iv: i
        }, function(e, a, t) {
            0 == a.code && (n.saveCache("user-phone-info", {
                phone: a.data.purePhoneNumber
            }), wx.navigateTo({
                url: "../usercenter/index"
            }));
        });
    },
    getPhoneFailed: function(e) {
        wx.navigateTo({
            url: "../usercenter/login"
        });
    },
    handleClickHeaderSearch: function(e) {
        this.handlePostFormId(e.detail.formId), this._piwik("miniapp/indexPage", "searchbar", "basicInfo"), 
        n.aldstat.sendEvent("首页-搜索", {
            "页面来源": "首页"
        }), wx.navigateTo({
            url: "../category/category"
        });
    },
    handleMainBtnClick: function(e) {
        this.handlePostFormId(e.detail.formId), this._piwik("miniapp/indexPage", "mainbtn", "basicInfo"), 
        n.aldstat.sendEvent("首页-免费估价cta", {
            "页面来源": "首页"
        }), wx.navigateTo({
            url: "../category/category?categoryId=1"
        });
    },
    handleCategoryClick: function(e) {
        this.handlePostFormId(e.detail.formId);
        var a = parseInt(e.target.dataset.index || 0);
        this._piwik("miniapp/indexPage", [ "navphone", "navnotebook", "navpad", "navothers" ][a], "basicInfo"), 
        n.aldstat.sendEvent([ "首页-手机回收", "首页-笔记本回收", "首页-平板回收", "首页-其他品类" ][a], {
            "页面来源": "首页"
        }), wx.navigateTo({
            url: e.target.dataset.url
        });
    },
    handleToMore: function() {
        wx.navigateTo({
            url: "/pages/category/category?categoryId=1"
        });
    },
    handleHotRecycleClick: function(e) {
        this.handlePostFormId(e.detail.formId);
        var a = e.target.dataset.item || {}, t = e.target.dataset.index || 0;
        this._piwik("miniapp/indexPage", "type/navhot;name/" + a.name + ";price/" + a.topPrice + ";id/" + a.id + ";position/" + (t + 1), "basicInfo"), 
        n.aldstat.sendEvent("首页-热门机型;name_" + a.name + ";price_" + a.topPrice + ";id_" + a.id + ";position_" + (t + 1)), 
        wx.navigateTo({
            url: e.target.dataset.url
        });
    },
    handlePostFormId: function(e) {
        n.request(t.default.uploadFormId, {
            formId: e
        }, "POST");
    },
    handleToMoon: function() {
        this._piwik("miniapp/indexPage", "tabactivity", "basicInfo"), n.aldstat.sendEvent("首页-底部tab 领福利按钮", {
            "页面来源": "首页"
        }), wx.navigateToMiniProgram({
            appId: "wx1d0bf756d8c83d75",
            success: function(e) {}
        });
    },
    handleToRedirect: function(e) {
        this._piwik("miniapp/indexPage", "tabhome", "basicInfo"), n.aldstat.sendEvent("首页-底部tab 主页按钮", {
            "页面来源": "首页"
        }), wx.redirectTo({
            url: "./index"
        });
    },
    handleToNavigate: function(e) {
        this._piwik("miniapp/indexPage", "tabmine", "basicInfo"), n.aldstat.sendEvent("首页-底部tab 我的按钮", {
            "页面来源": "首页"
        }), wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    handleClickSwiper: function() {
        this._piwik("miniapp/indexPage", "swiperads", "basicInfo"), n.aldstat.sendEvent("首页-广告位", {
            "页面来源": "首页"
        });
    },
    initResrevation: function(e, i) {
        var o = this, s = this.data.ab_reservation, r = wx.getStorageSync("choose_city"), c = this.getShop;
        n.request(t.default.searchCurrentCity, {
            location: e + "," + i
        }).then(function(d) {
            var l = d.result.ad_info.city;
            (l.includes("上海") || l.includes("北京")) && (s && "B" == s ? (o._piwik("miniapp/indexPage", "abt/store-appoint", "abtest"), 
            n.request(t.default.fetchAllCities).then(function(t) {
                var s = a.default.find(t.data, function(e) {
                    return l.includes(e.name);
                });
                r && r.id != s.id ? wx.showModal({
                    content: "定位到当前城市为" + s.name + "，是否为您切换城市?",
                    confirmColor: "#FFBB00",
                    success: function(a) {
                        a.confirm ? (c(e, i, s), n.saveCache("choose_city", s), o.setData({
                            reservationCity: s.name
                        }), setTimeout(function() {
                            o.setData({
                                showAnimation: !0
                            });
                        }, 0)) : a.cancel && ("北京" != r.name && "上海" != r.name || (c(e, i, r), o.setData({
                            reservationCity: r.name
                        }), setTimeout(function() {
                            o.setData({
                                showAnimation: !0
                            });
                        }, 0)));
                    }
                }) : (c(e, i, s), o.setData({
                    reservationCity: s.name
                }), setTimeout(function() {
                    o.setData({
                        showAnimation: !0
                    });
                }, 0));
            })) : o._piwik("miniapp/indexPage", "abt/store-noappoint", "abtest"));
        });
    },
    getShop: function(e, a, o) {
        var s = this, r = i.coordtransform.wgs84togcj02(a, e), c = i.coordtransform.gcj02tobd09(r[0], r[1]), d = "";
        n.request(t.default.fetchShops, {
            cityId: o.id
        }).then(function(e) {
            var a = e.data;
            a.forEach(function(e) {
                var a = (0, i.getDistance)(c[1], c[0], e.latitude, e.longitude);
                e.distance = a, a = a > 1 ? Math.floor(a) + "km" : Math.floor(1e3 * a) + "m", e.filterDistance = a;
            }), a.sort(function(e, a) {
                return e.distance - a.distance;
            }), a[0].distance > 3 ? (d = "当前城市共" + a.length + "家门店", s._piwik("miniapp/indexPage", "out3kmstoreappoint")) : (d = "距您最近的门店 " + a[0].filterDistance, 
            s._piwik("miniapp/indexPage", "in3kmstoreappoint")), s.setData({
                shopList: a,
                reservationText: d
            }), n.globalData.nowCityStore = a;
        });
    },
    handleReservation: function() {
        this.data.shopList[0].distance > 3 ? this._piwik("miniapp/indexPage", "out3kmstoreappointclick") : this._piwik("miniapp/indexPage", "in3kmstoreappointclick"), 
        wx.navigateTo({
            url: "../reservation/index"
        });
    }
});