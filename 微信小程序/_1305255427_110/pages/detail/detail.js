function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    for (var e, a = [], i = {}, r = t.length; r--; ) i[e = t[r]] || (i[e] = !0, a.push(e));
    return i = e = null, a;
}

function a(t, e) {
    for (var a, i = [], r = t.length; r--; ) a = t[r], -1 === e.indexOf("" + a) && i.push(a);
    return i;
}

function i(t, e) {
    for (var a = [], i = void 0, r = t.length; r--; ) i = t[r], -1 !== e.indexOf("" + i) && a.push(i);
    return a;
}

var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, s = t(require("../../utils/api.js")), o = t(require("../../utils/wxDiscode.js")), n = t(require("../../libs/lodash.core.min.js")), d = require("../../utils/util.js");

t(require("../../libs/es6-promise.min"));

"function" != typeof Array.prototype.indexOf && (Array.prototype.indexOf = function(t, e) {
    var a = -1, i = this.length;
    if ((e = +e || 0) < i) {
        e < 0 && (e += i) < 0 && (ifromIndex = 0);
        for (var r = e; r < i; r++) if (this[r] === t) {
            a = r;
            break;
        }
    }
    return a;
});

var c = getApp();

Page({
    data: {
        route: "pages/detail/detail",
        piwikSource: "",
        scrollTop: 0,
        isSelectRadioProperty: !1,
        CheckPropertyScroll: 0,
        windowHeight: 0,
        scrollHeight: 0,
        text: "Page detail",
        isFromCategory: !1,
        propertyList: [],
        radioPropertyList: [],
        checkboxPropertyList: [],
        diyPropertyList: [],
        skuPropertyValueIdList: {},
        basePropertyValueIdList: [],
        selectedPropertyValueList: {},
        propertyValueIdList: {},
        propertyNameIdList: {},
        propertyTipValueList: {},
        productInfo: {
            id: null,
            img: "",
            name: "",
            categoryId: ""
        },
        isShowSpeakerPopup: !1,
        isPalyingAudio: !1,
        speakerResNameText: "",
        isCheckedSpeaker: !1,
        isShowCameraPopup: !1,
        isShowCameraCheck: !1,
        isShowCameraRes: !1,
        cameraImgSrc: "",
        cameraResNameText: "",
        isCheckedCamera: !1,
        isShowCaptchPopup: !1,
        isImgCaptchError: !1,
        captchImgUrl: "",
        leftBarPercent: -135,
        rightBarPercent: -135,
        progressTime: 0,
        isAllowInquery: !1,
        isPausedDiyCheck: !1,
        puaseCheckText: "点击继续检测",
        curProgressPercent: 0,
        progressAllList: 0,
        progressCheckList: 0,
        imgCaptchText: "",
        tracking: {
            scene: "",
            from: ""
        },
        ui: {
            conflictPopup: {
                isShow: !1
            }
        },
        activity: {
            redPacketPushFormId: ""
        },
        radioValueIcon: "../../resource/images/detail/question-gray.png",
        radioNameIcon: "../../resource/images/detail/question-white.png"
    },
    baseData: {
        allPropertyConbinationLength: 0,
        allPropertyConbination: [],
        conflictedPropertyCombination: [],
        speakerAudioUrls: [ "https://sr.aihuishou.com/miniapps/audio/1.mp3", "https://sr.aihuishou.com/miniapps/audio/2.mp3", "https://sr.aihuishou.com/miniapps/audio/3.mp3" ],
        isFinishedPlayAudio: !1,
        indexArr: [],
        speakerLen: 2,
        toastSuccessIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAk1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ROyVeAAAAMHRSTlMA+/fsfTTxrloVAuFOG9QkDwW4l4hnLQrlyr6OO3JjRNzbpMIfEqFBqG5JB9d0Kw62ZipOAAACSUlEQVR42u3Y646iQBCG4aJBERQFD6PCeD6Mo3P47v/qNmuyMqbcNobpYjNbz38TO93QL0VKKaWUUkop9R/aFivPWxUJ1WRucGZGVIsAF3OqwRAlsyVxA3xVkLB4jSsrkpWFuOaRqHEftf6BNEephi3YTcEUJCfqgjEJiUmW4EYkptcGNyMxTxMwnuD6Gz4Yr0VinptgvA6JWRgwZkFiOh6Y5jOJaXlg/AaJGXlgJk8kZgau3SMxAbhlQmKG4LoRiRmAm+5ISrwGl6ckJQvB9cfkDM8vLsxISpqDW8ck43Z+YUACyvxihiTAkl8BWf34/JrTPf9QfkWt2XtnXFt+pQNzTpYg+778enlkAy8HaJPWkV8tg4tuIp5fcXFdDj3h/Ipy9mPR/Gq0q9VrAG6VPLT9nFlI5VdWgHnkEY4r5leZD/wlKpJfB/zdu0B+LWAzdJ9fIawGMdmkm8r55cPuYFtN9A35hXv6Y7f5ZXDPJnWaXxtcMdZ3yv38eqVHjfBVuAvBLbcO8+vUxYUXEMV7cJMPh9OvD/+SD0f6rQDnNxxOv7Y5zvpby93WXFTLL7tGsF8HDXYu2PLkpl8t79YBk5x+HQ24WbX8qt74GEpOv578m1fTvfxy/Z15OAlOv5I3cG1w05ScKC9bu/yTGGfTHunp1ykEIzv9ivew28fkWAFGePoVWKNZwitKktMvfjXx/JLSMbc/3OS8NCvkl5sBnOmQrF6b5Zew5I3ll7BoyvJL2Gf45/rvUU2OoQ+zGWWklFJKKaWUUj/GL07nk4k3zSK9AAAAAElFTkSuQmCC",
        toastFailIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAflBMVEUAAAD+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v5yViGVAAAAKXRSTlMA+t3s5SQPBvfYvUksHBUK8dKyloltZc/JxqWQe1M3Hq+jmIBeQkA9NO32K2AAAAIOSURBVHja7NbZbsIwEIXh45QkFNoAZStt2dfz/i9YiQsQ8VDHM0itKn/3jmIntn8kSZIkSZIkSZL8YcvPzLnsc/lbzxi3eeYmUJs4nrXHirG8GEFpxIvoWeSOV0OoDHnlcsNgcg2FNWmYRMYbqxKRyhVvZIjDmk4PUXod1iCOY82sQIRixhqHOAPWTSs0Vk1ZN0CcLT3Pr2jo9ZmeLeIUT/RkORrJM3qeCkTqOnpaL2jgpUWP6yJaty3M44Sgk7B27S4U9n16+kcEHKVRe6gsxLko1m0BgfprzvGDufznqOUt+na4a0dfK4fAsqM5xh1jiqeHSTWg7wuiL/oGFYyKd/pGcn743guY9Tr0DeWCkO5Qu/KNvg/UfND3VuIhSvnh4Zcs8SgbcXkDn2kDk/APNiuk/LC3dGCLCYlSTeWtahc+ZCIOK7MJpUSR84MTKMVfNIELK8SeKJr8UDv02UD/AAVtotjyw54oj8wPTXJr0/1BiWLLD3uimPPDnij2/LAnij0/7IkSzo9/9wLf7ZoJDcBADMP4sx6GZdWsRDaFe9o8749g6xIGz3DqI0q+4qVhlIzjpYUkW8l2ltJwLZ8RJqk0WxGnsTzfMCi+WTT9JtV3m67bqLyxanvN6ju7vjOwuI1s+kKr89iuLbjEo1s8vMbje7zAgFc48BILXuPBi0x8lYsvs4mIiIiIiPzEA73Vp4SlD7MAAAAAAElFTkSuQmCC",
        basePercent: 0,
        perItemPercent: 0,
        checkedDiyLength: 0,
        viewScale: 1,
        arrCheckedSkus: [],
        _arrCheckedSkus: []
    },
    onLoad: function(t) {
        console.log("options: ", t);
        var e = this, a = "";
        t && t.from && (a = t.from);
        var i = wx.getStorageSync("from_activity");
        if ("" != i && (e.data.tracking.activity_name = i), e.data.tracking.scene = getApp().globalData.scene, 
        e.data.tracking.from = a, this.setData({
            tracking: e.data.tracking
        }), new c.WeToast(), c.detailDiyData = {
            curIndex: 0,
            checkedDiyLength: 0,
            isPausedDiyCheck: !1,
            propertyNameIdList: {},
            diyPropertyList: [],
            diyPagesStatus: [],
            initDiyPagesStatus: function() {
                var t = this, e = t.diyPropertyList;
                2 === e.length ? t.diyPagesStatus = [ {
                    url: "../screenquestion/screenquestion",
                    isChecked: !1
                }, {
                    url: "../checkscreen/checkscreen",
                    isChecked: !1
                } ] : 1 === e.length && (/^触摸功能$/.test(e[0].name) ? t.diyPagesStatus = [ {
                    url: "../checkscreen/checkscreen",
                    isChecked: !1
                } ] : /^屏幕显示$/.test(e[0].name) && (t.diyPagesStatus = [ {
                    url: "../screenquestion/screenquestion",
                    isChecked: !1
                } ]));
            },
            navNextDiyProperty: function() {
                var t = this, a = t.diyPagesStatus;
                if (a[t.curIndex].isChecked) wx.navigateBack({
                    delta: 1
                }); else {
                    if (a[t.curIndex].isChecked = !0, ++t.curIndex, ++t.checkedDiyLength, t.curIndex < a.length) return wx.redirectTo({
                        url: a[t.curIndex].url,
                        fail: function(t) {}
                    }), !0;
                    wx.navigateBack({
                        delta: 1
                    }), t.isPausedDiyCheck = !1;
                    var i = e.data.radioPropertyList;
                    i[0].mixinStatus.isSelecting = !0, e.setData({
                        radioPropertyList: i
                    });
                }
            }
        }, "false" === t.isfromcategory && c.cache.mobileInfo && c.cache.mobileInfo.imgUrl) e.setData({
            productInfo: {
                id: c.cache.mobileInfo.id,
                img: c.cache.mobileInfo.imgUrl,
                name: c.cache.mobileInfo.name,
                categoryId: c.cache.mobileInfo.categoryId
            }
        }); else if ("true" === t.isfromcategory) {
            e.setData({
                isFromCategory: !0
            });
            var r = t.productId;
            c.fetch(s.default.fetchProduct, {
                productId: r
            }, function(a, i, r) {
                0 == i.code && "success" == r && (console.log(i.data.name), e.setData({
                    productInfo: {
                        id: t.productId,
                        img: decodeURIComponent(i.data.imgUrl),
                        name: i.data.name,
                        categoryId: t.categoryId
                    }
                }), wx.setNavigationBarTitle({
                    title: i.data.name
                }));
            });
        }
        c.saveCache("screen-show", ""), e.data.productInfo.id = t.productId, e.setData({
            productInfo: e.data.productInfo
        });
        e.Detailfetch(s.default.fetchPricePropertyNames, {
            productId: t.productId
        }, function(a, i) {
            e.setData({
                propertyList: i.data
            }), e.initPageData(i.data), e.Detailfetch(s.default.fetchSkus, {
                productId: t.productId
            }, function(t, a) {
                e.setData({
                    skuPropertyValueIdList: a.data
                });
            }), c.detailDiyData.initDiyPagesStatus(), e.data.radioPropertyList.length ? (e.setData({
                progressAllList: e.data.radioPropertyList.length
            }), e.data.isFromCategory ? e.baseData.perItemPercent = 100 / e.data.radioPropertyList.length : e.baseData.perItemPercent = 100 / (e.data.radioPropertyList.length + e.data.diyPropertyList.length + 2)) : e.setData({
                curProgressPercent: 100,
                isAllowInquery: !0
            }), setTimeout(function() {
                wx.hideLoading();
            }, 500);
        }), e.baseData.indexArr = d.util.randomArrIndex(e.baseData.speakerAudioUrls, e.baseData.speakerLen), 
        c.detailDiyData.initDiyPagesStatus(), c.screenTouchStatus = {
            isFinishedcheck: !1,
            isCheckedSuccess: !1
        }, wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    windowHeight: t.windowHeight
                });
            }
        }), e.initScrollviewHeight(-32);
    },
    onReady: function() {
        var t = this;
        t.data.isCheckedCamera || t.showCameraPopup();
        try {
            var e = wx.getSystemInfoSync().windowWidth;
            t.baseData.viewScale = 375 / e;
        } catch (t) {}
    },
    onShow: function() {
        var t = this, e = t.baseData.checkedDiyLength, a = (t.data.diyPropertyList, c.detailDiyData.checkedDiyLength), i = t.baseData.basePercent, r = t.baseData.perItemPercent;
        t.setData({
            propertyNameIdList: c.detailDiyData.propertyNameIdList,
            diyPropertyList: c.detailDiyData.diyPropertyList
        }), c.screenTouchStatus.isFinishedcheck && (c.screenTouchStatus.isCheckedSuccess ? t.detailToast(!0) : t.detailToast(!1), 
        c.screenTouchStatus.isFinishedcheck = !1), e < a && (t.setProgressCircle(i + r * (a - e)), 
        t.baseData.checkedDiyLength = a), t.setData({
            isPausedDiyCheck: c.detailDiyData.isPausedDiyCheck
        }), t.baseData.imgCaptchText = "";
    },
    onHide: function() {},
    onUnload: function() {},
    showDetailLoading: function(t) {
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            mask: !0,
            duration: 1500,
            fail: function(t) {}
        });
    },
    Detailfetch: function(t, e, a) {
        var i = c, r = c.calcAhsSign(e, "GET");
        this.showDetailLoading(), wx.request({
            url: t + "?appid=10001&token=" + i.getGuid() + "&timestamp=" + i.getTimestamp() + "&sign=" + r,
            data: e,
            header: {
                "Content-Type": "application/json"
            },
            success: function(t) {
                t.data, 0 === t.data.code || 0 === t.data.status ? a(null, t.data, "success") : 1003 === t.data.code ? a(null, t.data, "need-img-captch") : 1004 === t.data.code ? a(null, t.data, "img-captch-error") : a(null, t.data, "fail");
            },
            fail: function(t) {
                a(t);
            },
            complete: function() {}
        });
    },
    initPageData: function(t) {
        var e = this;
        n.default.forEach(t, function(t) {
            e.computePropertyType(t), e.data.radioPropertyList = e.sortRadioProperty(e.data.radioPropertyList);
            var a = {
                data: {
                    type: t.type,
                    id: t.id,
                    valueIdList: [],
                    selectedValue: {
                        id: null,
                        value: ""
                    },
                    preferredValue: {
                        id: null,
                        value: ""
                    }
                },
                props: {
                    isAutoCheck: !1,
                    isDIYCheck: !1,
                    isFunctionalCheck: !1
                },
                status: {
                    isSelected: !1,
                    isSelecting: !1,
                    isTipShow: !1
                }
            };
            t.isCheckboxProperty && n.default.forEach(t.values, function(t) {
                t.isPreferred && (a.data.selectedValue.id = t.id, a.data.selectedValue.value = t.value, 
                a.data.preferredValue.id = t.id, a.data.preferredValue.value = t.value);
            });
            var i = t.values, r = e.data.propertyValueIdList;
            n.default.forEach(i, function(e) {
                a.data.valueIdList.push(e.id), r[e.id] = {
                    data: {
                        propertyValueId: e.id,
                        propertyNameId: t.id,
                        propertyValueTipContent: o.default.wxmlParse(e.content),
                        statusClass: "",
                        type: t.type
                    },
                    props: {},
                    status: {
                        isSelected: !1,
                        isTipShow: !1,
                        isChecked: !1,
                        isDisabled: !1,
                        isDisabledPropertyClicked: !1
                    }
                };
            }), e.setData({
                propertyValueIdList: r
            }), e.data.propertyNameIdList[t.id] = a, e.setData({
                propertyNameIdList: e.data.propertyNameIdList
            });
        }), e.data.radioPropertyList.length > 0 && (e.data.isFromCategory && (e.data.radioPropertyList[0].mixinStatus.isSelecting = !0), 
        n.default.forEach(e.data.radioPropertyList, function(t) {
            314 === t.id && n.default.forEach(t.values, function(t) {
                t.value && (t.value = t.value.split("（")[0]);
            });
        }), e.setData({
            radioPropertyList: e.data.radioPropertyList
        }));
        var a = {
            data: {
                imgs: [],
                content: []
            },
            status: {
                isTipShow: !1
            }
        };
        e.setData({
            propertyTipValueList: a
        }), c.detailDiyData.propertyNameIdList = e.data.propertyNameIdList, c.detailDiyData.diyPropertyList = e.data.diyPropertyList;
    },
    initScrollviewHeight: function(t) {
        var e = this;
        e.setData({
            scrollHeight: e.data.windowHeight + t
        });
    },
    initPropertyValueId: function(t) {},
    initPropertyNameId: function(t) {},
    filterPropertyList: function(t) {
        var e = this.formatPropertyList(t);
        return e, e;
    },
    sortRadioProperty: function(t) {
        for (var e = [], a = 0, i = t.length; a < i; a++) 1 === t[a].type && e.push(t[a]);
        for (var r = 0, s = t.length; r < s; r++) 3 === t[r].type && e.push(t[r]);
        return e;
    },
    computePropertyType: function(t) {
        var e = this;
        !e.data.isFromCategory && e.isDIYProperty(t) ? (t.mixinStatus = {
            isSelecting: !1,
            isSelected: !1
        }, /^\s*屏幕显示\s*$/.test(t.name) ? (n.default.forEach(t.values, function(t, e) {
            if (t.content) {
                var a = t.content;
                a = o.default.strDiscode(a), t.content = o.default.wxmlParse(a);
            }
        }), e.data.diyPropertyList[0] = t) : /^\s*触摸功能\s*$/.test(t.name) && (e.data.diyPropertyList[1] = t), 
        e.setData({
            diyPropertyList: e.data.diyPropertyList
        })) : 2 === t.type ? (t.isCheckboxProperty = !0, e.data.checkboxPropertyList.push(t), 
        e.setData({
            checkboxPropertyList: e.data.checkboxPropertyList
        })) : (t.content = o.default.wxmlParse(t.content), t.mixinStatus = {
            isSelecting: !1,
            isSelected: !1,
            isTipShow: !1
        }, e.data.radioPropertyList.push(t), 1 === t.type && (n.default.forEach(t.values, function(t) {
            e.data.basePropertyValueIdList.push(t.id);
        }), e.setData({
            basePropertyValueIdList: e.data.basePropertyValueIdList
        }), e.baseData.allPropertyConbination++));
    },
    computeAllPropertyConbination: function() {
        var t = this, e = [ t.data.basePropertyValueIdList ];
        e = e.concat(t.getCombination(t.data.basePropertyValueIdList));
    },
    computeConflictedPropertyCombination: function() {},
    isDIYProperty: function(t) {
        return /^触摸功能|屏幕显示/.test(t.name);
    },
    computeStatusClass: function(t) {
        this.data.propertyNameIdList;
        var e = "";
        return t.status.isDisabled && (e += " disabled"), t.status.isSelected && (e += " selected"), 
        e;
    },
    changePropertyNameStatus: function(t, e) {
        var a = this;
        a.data.radioPropertyList[t].mixinStatus[e.name] = e.value, a.setData({
            radioPropertyList: a.data.radioPropertyList
        }, function() {
            !a.data.isAllowInquery && !a.data.isSelectRadioProperty && t >= a.data.progressCheckList && a.strollToNextProperty(t, ".property-item.property-item--radio");
        });
    },
    changePropertyValueStatus: function(t, e) {
        var a = this, i = a.data.propertyValueIdList;
        if (void 0 === i[t]) return !1;
        i[t].status[e.name] = e.value, i[t].data.statusClass = a.computeStatusClass(i[t]), 
        a.setData({
            propertyValueIdList: i
        });
    },
    foldCurrentProperty: function(t) {
        this.changePropertyNameStatus(t, {
            name: "isSelecting",
            value: !0
        });
    },
    expandNextProperty1: function(t) {
        var e = this;
        if (t < e.data.radioPropertyList.length - 1) {
            e.initScrollviewHeight(-32);
            var a = t + 1;
            e.setData({
                progressCheckList: a
            }), e.data.radioPropertyList[a].mixinStatus.isSelecting = !0;
            var i = e.data.radioPropertyList[a];
            if (1 == i.type) if (null === this.data.skuPropertyValueIdList) i.values.map(function(t) {
                return t.id;
            }).forEach(function(t) {
                var a = t.id;
                e.changePropertyValueStatus(a, {
                    name: "isDisabled",
                    value: !1
                });
            }); else {
                var r = e.checkSkuInfo();
                console.log("可选的skus:", r);
                var s = i.values.map(function(t) {
                    return t.id;
                });
                console.log("下次筛选的备选项:", s), s.forEach(function(t) {
                    var a = r.findIndex(function(e) {
                        return e == t;
                    }), i = t;
                    ~a ? e.changePropertyValueStatus(i, {
                        name: "isDisabled",
                        value: !1
                    }) : e.changePropertyValueStatus(i, {
                        name: "isDisabled",
                        value: !0
                    });
                });
            }
            e.setData({
                radioPropertyList: e.data.radioPropertyList
            }, function() {
                !e.data.isAllowInquery && !e.data.isSelectRadioProperty && a >= e.data.progressCheckList && e.strollToNextProperty(a, ".property-item.property-item--radio");
            });
        } else t + 1 === e.data.radioPropertyList.length && (e.setData({
            progressCheckList: e.data.radioPropertyList.length
        }), e.initScrollviewHeight(-88), e.strollToNextProperty(t + 1, ".property-item.property-item--radio"));
    },
    checkSkuInfo: function() {
        var t = this, a = this.baseData.arrCheckedSkus, r = [];
        return t.data.skuPropertyValueIdList.forEach(function(t) {
            i(a, t).length === a.length && (r = r.concat(t));
        }), r = e(r);
    },
    scrollToElementPosition: function(t, e) {
        var a = this, i = a.data.windowHeight;
        wx.createSelectorQuery().selectAll(e).boundingClientRect(function(e) {
            var r = 0;
            r = e.reduce(function(e, a, i) {
                return i <= t && (e += a.height + 32), e;
            }, 0), a.setData({
                scrollTop: r - i
            });
        }).exec();
    },
    strollToNextProperty: function(t, e) {
        var a = this, i = a.data.windowHeight;
        wx.createSelectorQuery().selectAll(e).boundingClientRect(function(e) {
            var r = 0;
            e[0].top;
            if (t < a.data.progressAllList) r = e.reduce(function(e, a, i) {
                return i <= t && (e += a.height + 32), e;
            }, 0), a.setData({
                scrollTop: r - i
            }); else if (t === a.data.progressAllList) {
                var s = e[1].top - e[0].top - e[0].height;
                n.default.forEach(e, function(t) {
                    r += t.height + s;
                }), a.setData({
                    scrollTop: r + 2 * s - 10
                });
            }
        }).exec();
    },
    renderEnabledPropertyList: function(t) {
        var e = this;
        n.default.forEach(t, function(t) {
            e.changePropertyValueStatus(t, {
                name: "isDisabled",
                value: !1
            });
        });
    },
    renderDisabledPropertyList: function(t) {
        var e = this;
        n.default.forEach(t, function(t) {
            e.changePropertyValueStatus(t, {
                name: "isDisabled",
                value: !0
            });
        });
    },
    updateselectedPropertyValueList: function(t, e) {
        var a = this;
        a.data.selectedPropertyValueList[e] = t, a.setData({
            selectedPropertyValueList: a.data.selectedPropertyValueList
        });
    },
    getNextProperty: function(t) {},
    getDisabledPropertyList: function(t) {
        return a(this.data.basePropertyValueIdList, t);
    },
    getEnabledPropertyList: function(t) {
        var a = this, r = t.data.propertyValueId, s = [ r ], o = a.data.skuPropertyValueIdList, d = a.data.selectedPropertyValueList, c = [], u = void 0;
        n.default.forEach(d, function(t) {
            t && c.push(t.data.propertyValueId);
        });
        for (var l = o.length; l--; ) u = o[l], i(c, u).length === c.length && (s = s.concat(u));
        return s = e(s), n.default.forEach(a.data.propertyNameIdList[t.data.propertyNameId].data.valueIdList, function(t) {
            t === r || a.data.propertyValueIdList[t].status.isDisabled || s.push("" + t);
        }), u = null, s;
    },
    getCombination: function(t) {
        for (var e = [], a = t.length, i = 0; i < a; i++) {
            e[i] = [];
            for (var r = 0; r < a; r++) t[i] !== t[r] && e[i].push(t[r]);
        }
        return e;
    },
    getSelectedPropertyValue: function() {
        var t = this, e = [];
        return n.default.forEach(t.data.propertyNameIdList, function(t) {
            void 0 !== t && e.push(t.data.selectedValue.id);
        }), e;
    },
    getConflictedName: function() {},
    getDIYCheckMethod: function(t) {
        return {
            "触摸功能": function(t) {
                wx.navigateTo({
                    url: "../checkscreen/checkscreen"
                });
            },
            "屏幕显示": function(t) {
                wx.navigateTo({
                    url: "../screenquestion/screenquestion"
                });
            }
        }[t];
    },
    changeSkuValue: function(t, e) {
        var a = this.baseData._arrCheckedSkus;
        t ? (void 0 !== e && a.splice(e), a.push(t)) : a.push(""), this.baseData._arrCheckedSkus = a, 
        this.baseData.arrCheckedSkus = a.filter(function(t) {
            return "" !== t;
        });
    },
    clearAfters: function(t) {
        var e = this, a = e.data.radioPropertyList.map(function(e, a) {
            return e.mixinStatus.isSelecting && a > t ? e.values.map(function(t) {
                return t.id;
            }) : [];
        });
        (a = a.reduce(function(t, e) {
            return e.length && (t = t.concat(e)), t;
        }, [])).forEach(function(t) {
            e.changePropertyValueStatus(t, {
                name: "isSelected",
                value: !1
            });
        }), e.data.checkboxPropertyList.reduce(function(t, e) {
            return t.concat(e.values);
        }, []).forEach(function(t) {
            e.changePropertyValueStatus(t.id, {
                name: "isSelected",
                value: !1
            });
        });
        var i = e.data.propertyNameIdList;
        Object.keys(i).forEach(function(t) {
            i[t].data.preferredValue && null !== i[t].data.preferredValue.id && (i[t].data.selectedValue = {
                id: i[t].data.preferredValue.id,
                value: i[t].data.preferredValue.value
            });
        }), e.setData({
            propertyNameIdList: i
        });
        var r = e.data.radioPropertyList;
        r.forEach(function(e, a) {
            e.mixinStatus.isSelecting && a > t && (e.mixinStatus.isSelecting = !1);
        }), e.setData({
            radioPropertyList: r
        });
    },
    handleOnTapRadioPropertyValueItem: function(t) {
        var e = this, a = e.data.propertyNameIdList, i = t.target.dataset.item, r = a[i.data.propertyNameId], s = t.target.dataset.nameIndex, o = t.target.dataset.text;
        t.target.dataset.name.values;
        s + 1 === e.data.progressAllList || (s < e.data.progressAllList && e.data.radioPropertyList[s + 1].mixinStatus.isSelecting ? (e.scrollToElementPosition(s + 1, ".property-item.property-item--radio"), 
        e.setData({
            isSelectRadioProperty: !0
        })) : e.setData({
            isSelectRadioProperty: !1
        })), e.clearAfters(s), i.status.isDisabled ? e.changePropertyValueStatus(i.data.propertyValueId, {
            name: "isSelected",
            value: !0
        }) : (1 == i.data.type ? e.changeSkuValue(i.data.propertyValueId, s) : e.changeSkuValue(void 0, s), 
        e.setProgressCircle(e.baseData.perItemPercent * (s + 1)), r.status.isSelected = !0, 
        r.data.selectedValue = {
            id: i.data.propertyValueId,
            value: o
        }, e.setData({
            propertyNameIdList: a
        }), c.detailDiyData.propertyNameIdList = a, n.default.forEach(r.data.valueIdList, function(t) {
            t === i.data.propertyValueId ? e.changePropertyValueStatus(i.data.propertyValueId, {
                name: "isSelected",
                value: !0
            }) : e.changePropertyValueStatus(t, {
                name: "isSelected",
                value: !1
            });
        }), e.foldCurrentProperty(s), e.expandNextProperty1(s));
    },
    handleOnTapRadioPropertyName: function(t) {
        var e = this, a = t.currentTarget.dataset.nameId, i = e.data.propertyNameIdList, r = i[a], s = t.currentTarget.dataset.nameIndex, o = e.data.radioPropertyList[s];
        r.status.isSelecting = !r.status.isSelecting, e.setData({
            propertyNameIdList: i
        }), c.detailDiyData.propertyNameIdList = i, e.changePropertyNameStatus(s, {
            name: "isSelecting",
            value: !o.mixinStatus.isSelecting
        });
    },
    handleOnTapCheckboxPropertyValueItem: function(t) {
        var e = this, a = e.data.propertyNameIdList, i = t.target.dataset.item, r = a[i.data.propertyNameId], s = t.target.dataset.text;
        i.status.isSelected ? r.data.selectedValue = {
            id: r.data.preferredValue.id,
            value: r.data.preferredValue.value
        } : r.data.selectedValue = {
            id: i.data.propertyValueId,
            value: s
        }, e.setData({
            propertyNameIdList: a
        }), c.detailDiyData.propertyNameIdList = a, e.changePropertyValueStatus(i.data.propertyValueId, {
            name: "isSelected",
            value: !i.status.isSelected
        });
    },
    catchTapTogglePropertyValueTip: function(t) {
        var e = this, a = t.target.dataset.item ? t.target.dataset.item : [], i = t.target.dataset.valueitem ? t.target.dataset.valueitem : [], r = e.data.propertyTipValueList;
        r.data.imgs = i.imgs, r.data.content = a.data.propertyValueTipContent, r.status.isTipShow = !r.status.isTipShow, 
        e.setData({
            propertyTipValueList: e.data.propertyTipValueList
        });
    },
    catchTapTogglePropertyNameTip: function(t) {
        var e = this, a = (t.target.dataset.index, t.target.dataset.item), i = e.data.propertyTipValueList;
        i.data.imgs = a.imgs, i.data.content = a.content, i.status.isTipShow = !i.status.isTipShow, 
        e.setData({
            propertyTipValueList: e.data.propertyTipValueList
        });
    },
    handleOnTapDIYCheck: function(t) {
        var e = this, a = t.currentTarget.dataset.name, i = t.currentTarget.dataset.options;
        c.detailDiyData.curIndex = t.currentTarget.dataset.index, e.getDIYCheckMethod(a)(i);
    },
    handleCatchTap: function() {},
    handleOnTapSunmitRedPacketPush: function(t) {
        var e = this, a = t.detail.formId;
        console.log("form 发生了submit事件，推送码为: ", a), wx.getSystemInfoSync().system.indexOf("iOS") < 0 && (e.data.activity.redPacketPushFormId = a), 
        e.handleOnTapSubmitInquiry();
    },
    handleOnTapSubmitInquiry: function() {
        var t = this, e = t.getSelectedPropertyValue();
        t.data.activity.redPacketPushFormId;
        console.log("在提交询价时formid: ", t.data.activity.redPacketPushFormId), c.post(s.default.postProductInquiry, {
            pricePropertyValues: e,
            productId: +t.data.productInfo.id,
            imgCaptcha: t.baseData.imgCaptchText,
            formId: t.data.activity.redPacketPushFormId
        }, function(a, i, r) {
            r && "success" !== r ? "need-img-captch" === r ? (t.setCaptchUrl(), t.setData({
                isShowCaptchPopup: !0
            })) : "img-captch-error" === r ? (t.setData({
                isImgCaptchError: !0
            }), t.setCaptchUrl()) : wx.navigateTo({
                url: "../nosku/nosku?name=" + t.data.productInfo.name
            }) : c.post(s.default.saveAppInspection, {
                productId: t.data.productInfo.id,
                testerName: "User miniapp",
                Key: 0,
                deviceInfo: {},
                otherInquiryUnits: e.toString(),
                uuid: c.getGuid(!1)
            }, function(e, a, r) {
                r && "success" !== r ? wx.navigateTo({
                    url: "../nosku/nosku?name=" + t.data.productInfo.name
                }) : (t.setData({
                    isShowCaptchPopup: !1
                }), wx.navigateTo({
                    url: "../inquiry/inquiry?inquiryKey=" + i.data.inquiryKey + "&uuid=" + a.data.uuid + "&categoryId=" + t.data.productInfo.categoryId
                }));
            });
        });
    },
    checkspeaker: function() {
        this.setData({
            isShowSpeakerPopup: !0
        });
    },
    palySpeakerAudio: function() {
        var t = this, e = t.baseData.speakerAudioUrls, a = t.baseData.indexArr, i = 0;
        t.data.isPalyingAudio || (t.setData({
            isPalyingAudio: !0
        }), t.baseData.isFinishedPlayAudio = !1, wx.playBackgroundAudio({
            dataUrl: e[a[i]],
            success: function(t) {
                ++i;
            },
            fail: function(t) {}
        }), wx.onBackgroundAudioStop(function() {
            t.baseData.isFinishedPlayAudio || wx.playBackgroundAudio({
                dataUrl: e[a[i]],
                success: function(e) {
                    ++i === a.length && (t.baseData.isFinishedPlayAudio = !0, t.setData({
                        isPalyingAudio: !1
                    }));
                },
                fail: function(t) {}
            });
        }));
    },
    finishedCheckSpeak: function(t) {
        function e() {
            "number" == typeof i && i > 0 && wx.navigateTo({
                url: c.detailDiyData.diyPagesStatus[0].url || ""
            });
        }
        var a = this, i = a.data.diyPropertyList.length, r = "", s = +t.currentTarget.dataset.type;
        a.baseData.isFinishedPlayAudio = !0, a.data.isCheckedSpeaker || a.setProgressCircle(a.baseData.basePercent + a.baseData.perItemPercent), 
        1 === s ? (r = "喇叭完好", a.detailToast(!0, e)) : 2 === s && (r = "喇叭异常", a.detailToast(!1, e)), 
        a.setData({
            isShowSpeakerPopup: !1,
            speakerResNameText: r,
            isCheckedSpeaker: !0,
            isPalyingAudio: !1
        });
    },
    showCameraPopup: function() {
        this.setData({
            isShowCameraPopup: !0,
            isShowCameraCheck: !0
        });
    },
    beginCheckCamera: function() {
        var t = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "camera" ],
            success: function(e) {
                e.tempFilePaths;
                t.setData({
                    isShowCameraRes: !0,
                    isShowCameraCheck: !1,
                    cameraImgSrc: e.tempFilePaths
                });
            }
        });
    },
    closeCameraPopup: function(t) {
        function e() {
            a.data.isCheckedSpeaker || a.checkspeaker();
        }
        var a = this, i = +t.currentTarget.dataset.type || -1, r = "";
        a.data.isCheckedCamera || a.setProgressCircle(a.baseData.basePercent + a.baseData.perItemPercent), 
        1 === i ? (r = "摄像头清晰", a.detailToast(!0, e)) : 2 === i && (r = "摄像头不清晰", a.detailToast(!1, e)), 
        a.setData({
            isShowCameraPopup: !1,
            isShowCameraCheck: !1,
            isShowCameraRes: !1,
            cameraResNameText: r,
            isCheckedCamera: !0
        });
    },
    stopBubble: function() {},
    setCaptchUrl: function() {
        var t = this;
        t.Detailfetch(s.default.fetchCaptchUrl, {}, function(e, a, i) {
            "success" !== i && i || t.setData({
                captchImgUrl: a.data
            });
        });
    },
    checkCaptchSubmit: function(t) {
        var e = this, a = t.detail.value.captch;
        "string" == typeof a && a.trim().length > 3 && (/^\d{4}$/.test(a) ? (e.baseData.imgCaptchText = a, 
        e.handleOnTapSubmitInquiry()) : e.setData({
            isImgCaptchError: !0
        }));
    },
    cancelImgError: function() {
        var t = this;
        t.data.isImgCaptchError && t.setData({
            isImgCaptchError: !1
        });
    },
    detailToast: function(t, e) {
        var a = this, i = "", s = "";
        "boolean" !== !(void 0 === t ? "undefined" : r(t)) && (e && (void 0 === e || r(e)), 
        t ? (i = "检测正常", s = a.baseData.toastSuccessIcon) : (i = "检测异常", s = a.baseData.toastFailIcon), 
        a.wetoast.toast({
            img: s,
            title: i,
            duration: 500,
            success: e,
            fail: function(t) {}
        }));
    },
    setProgressCircle: function(t) {
        var e = this;
        (t = Math.ceil(t)) > 100 && (t = 100), e.setData({
            curProgressPercent: t
        }), e.baseData.basePercent = t, 100 === t ? e.setData({
            isAllowInquery: !0
        }) : e.setData({
            isAllowInquery: !1
        });
    },
    continueCheckDiy: function() {
        var t = c.detailDiyData.checkedDiyLength, e = c.detailDiyData.diyPagesStatus;
        t < e.length && (c.detailDiyData.curIndex = t, wx.navigateTo({
            url: e[t].url,
            fail: function(t) {}
        }));
    }
});