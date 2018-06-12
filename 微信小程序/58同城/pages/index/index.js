function e(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

var t = require("../../utils/jumpHandle"), a = require("../common/youxuan/index"), i = require("../subscription/enums"), n = require("./config/headconfig"), r = {}, o = require("../common/search-module")(), s = getApp(), c = require("../../utils/verify")(), d = require("../common/tel/index");

s.storage.getSync(s.constData.PROFILE_KEY);

s.createPage([ {
    methodOptions: {
        e_goToMore: {
            type: "goto"
        },
        e_cityChange: {
            type: "city"
        },
        e_goToYouXuan: {
            type: "goto"
        },
        e_cityItem: {
            type: "city"
        },
        e_headLogin: {
            type: "goto"
        },
        e_weatherDetail: {
            type: "weather"
        },
        e_apply: {
            type: "apply"
        },
        e_applyJob: {
            type: "applyJob"
        },
        e_goToFriendFun: {
            type: "friend"
        }
    },
    pageInfoKeys: [ "currInfoId", "resumeId", "currentCateCode", "dispCateName", "infoId", "key" ],
    data: {
        showAndroidMask: !1,
        pageType: "index",
        pageName: "index",
        showSearchResult: !1,
        searchResult: [],
        hotWords: [],
        searchWords: [],
        key: "找工作 找房子 找服务",
        isSearchModuleShow: !0,
        pic: s.constData.HEAD_DEFAULT_IMG,
        name: "",
        yxList: [],
        quesList: [],
        youxuan: !0,
        currCity: "",
        currDispCityId: "",
        cityFilterShow: !0,
        scrollHeight: 0,
        hasMore: !1,
        toTopShow: !0,
        show: !0,
        verifyLoad: !1,
        verifyPic: "",
        btnFlag: !0,
        verifyValue: "",
        verifyFocus: !0,
        currInfoId: "",
        currentCateCode: "",
        initSearchData: {},
        telNum: "",
        telCountTime: 180,
        isTelAlertShow: !1,
        weatherBriefData: {},
        weatherShow: !1,
        weatherAlmanac: {},
        banners: [],
        bigbangObj: {},
        showBigbang: !1,
        unReadMsgCount: 0,
        imCount: 0,
        resumes: [],
        resumeId: null,
        applied: !1,
        isQB: !0,
        makeFriendsShow: !1,
        showAlertFriend: !0,
        friendsTipState: -1,
        scene: "",
        headconfig: n
    },
    $e_goToYouXuan: s.throttle(1e3, function(e) {
        var t = e.currentTarget.dataset.type, a = 10 === t ? "/pages/wenda/question/question" : "/pages/youxuan/youxuan";
        s.goto([ a, 10 === t ? {} : {
            youxuan: t
        } ], !0);
    }),
    $e_headLogin: function() {
        s.goto([ "/pages/user/user" ], !0), wx.switchTab({
            url: "/pages/user/user"
        });
    },
    loginChange: s.debounce(100, function() {
        var e = this;
        console.log("首页头像变化"), s.storage.removeSync(s.constData.PROFILE_KEY), s.userData.getProfile().then(function(t) {
            var a = t.name, i = t.pic;
            e.setDataLazy({
                name: a || "",
                pic: i ? "url(" + s.pathData.CDN_PIC + i + ")" : ""
            });
        });
    }),
    e_closeMask: function() {
        this.setDataLazy({
            showAndroidMask: !1
        });
    },
    _onLoad: function(e) {
        console.log(this.data.headconfig), this.setDataLazy({
            scene: e.scene
        }), r = e, s.storage.setSync("pagetype", e.pagetype), "friend" === e.pagetype && s.storage.setSync("friendPage", "friend"), 
        e.pagetype || (s._isJump = !1), e.cityName && e.dispCityId && (this.setDataLazy({
            currCity: decodeURIComponent(e.cityName),
            currDispCityId: e.dispCityId
        }), s.storage.setSync(s.constData.STORAGE_CITY_KEY, {
            cityId: e.cityId || "",
            cityName: decodeURIComponent(e.cityName),
            dispCityId: e.dispCityId
        }));
        var t = [ "user-login-success", "passport-login-success", "user-complete", "logout-success" ];
        s.eventHandle.offOn(t, this.loginChange), s.eventHandle.offOn(t.concat("subscription-change"), this.e_youXuanInit);
    },
    _onReady: function() {
        var e = this;
        if (s.getPPU() && !this.name && s.eventHandle.emit("user-login-success"), s._isJump) return !1;
        var t = s.getLocation();
        !this.urlParams.cityId && t && t.value && this.gpsReady(t.value), s.eventHandle.on("chat-receive-msg", function(t) {
            console.log("接收到新消息，条数为：", t), e.setDataLazy({
                unReadMsgCount: t
            });
        }), this.alertFriend();
        var a = new Date().toLocaleDateString().split("/").join("");
        s.storage.getSync("currentDateStr") == a ? this.setDataLazy({
            showAlertFriend: !1
        }) : s.storage.setSync("currentDateStr", a);
    },
    initData: function() {
        console.log("index initData"), -1 !== s.getPageRoute().indexOf("pages/index/index") && this.e_youXuanInit();
    },
    bindSwipeBottom: function() {
        this.yxReachBottom();
    },
    _onShow: function(e) {
        var a = this, i = s.storage.getSync(s.constData.SEARCH_STORAGE_NAME) || [];
        i.length ? this.setDataLazy({
            initSearchData: i[0]
        }) : this.getDefaultSearchWord();
        var n = s.storage.getSync(s.constData.STORAGE_USER_INFO_KEY) || {}, o = s.storage.getSync(s.constData.STORAGE_CITY_KEY);
        if (this.data.currDispCityId && this.data.currDispCityId != o.dispCityId && this.e_youXuanInit(), 
        o && o.cityName && o.dispCityId && this.setDataLazy({
            currCity: o && o.cityName || n.cityName,
            currDispCityId: o && o.dispCityId || n.dispCityId
        }), void 0 != (o && o.dispCityId || n.dispCityId) && this.weatherBrief(o && o.dispCityId || n.dispCityId), 
        s.eventHandle.first("location-ok", function(e) {
            var t = e.cityName, i = e.dispCityId;
            a.weatherBrief(i), a.setDataLazy({
                currCity: t,
                currDispCityId: i
            });
        }), s.storage.getSync("login-back") && (s.storage.setSync("pagetype", r.pagetype), 
        s.storage.removeSync("login-back")), s.storage.getSync("pagetype")) return s._isJump = !0, 
        t(r, s), setTimeout(function() {
            s.storage.setSync("pagetype", "");
        }, 1e3), console.log("index page jump"), s.eventHandle.offOn([ "login-success" ], this.initData), 
        void s.eventHandle.emit("check-login", this.initData);
        this.alertFriend(), s.storage.getSync("ppu") && this.getImCount();
        var c = new Date().toLocaleDateString().split("/").join("");
        s.storage.getSync("currentDateStr") == c ? this.setDataLazy({
            showAlertFriend: !1
        }) : s.storage.setSync("currentDateStr", c);
    },
    onHide: function() {},
    getDefaultSearchWord: function() {
        var e = this;
        s.request(s.pathData.index.GET_DEFAULT_SEARCH_PATH).then(function(t) {
            if (!t.error && (console.log("配置信息：", t.data), t.data && t.data.search)) {
                var a = t.data.search, i = "string" == typeof a ? JSON.parse(a) : a || [], n = e.assembleSearchData(i);
                e.setDataLazy({
                    initSearchData: n[0]
                }), (t.data.debug || t.data.friend) && e.setDataLazy({
                    makeFriendsShow: !0
                });
            }
        });
    },
    assembleSearchData: function(e) {
        return e.map(function(e) {
            return {
                cateId: e.ci,
                dispCateId: e.dci,
                cateCode: e.cc,
                cateIdParent: e.pdci,
                key: e.k,
                value: e.s,
                isDefault: !0
            };
        });
    },
    touchmove: function() {
        return !1;
    },
    addSearchLog: function() {
        console.log("search"), s.doLogClick({
            pageType: "58wxindex",
            pageName: "58wxindex",
            clickType: "searchclick",
            clickName: "e_searchclick",
            currentcid: this.data.currDispCityId
        }), s.eventHandle.emit("search-click", this.initData);
    },
    $e_cityChange: function() {
        s.doLogClick({
            pageType: "58wxindex",
            pageName: "58wxindex",
            clickType: "cityclick",
            clickName: "e_cityclick",
            currentcid: this.data.currDispCityId
        }), s.goto([ "/pages/city/city", {
            currCity: this.data.currCity,
            currDispCityId: this.data.currDispCityId
        } ], !0);
    },
    setCityStorage: function(e) {
        var t = s.storage.getSync(s.constData.STORAGE_CITY_KEY);
        t && (t.cityName = e.cityName || e.name), t && (t.cityId = e.cityId), t && (t.dispCityId = e.dispCityId), 
        s.storage.setSync(s.constData.STORAGE_CITY_KEY, t);
    },
    gpsReady: function(e) {
        var t = this;
        if (!e.error) {
            e = e || {};
            var a = s.storage.getSync(s.constData.STORAGE_USER_INFO_KEY) || {}, i = s.storage.getSync(s.constData.STORAGE_CITY_KEY);
            if (console.log("城市：" + i.cityName + "  " + a.cityName), 1 != (e.dispCityId || i && i.dispCityId || a.dispCityId) && this.weatherBrief(e.dispCityId || i && i.dispCityId || a.dispCityId), 
            s.globalData.gpsCityId = e.area || "", !this.data.currCity) return this.setDataLazy({
                currCity: e.cityName || i && i.cityName || a.cityName,
                currDispCityId: e.dispCityId || i && i.dispCityId || a.dispCityId
            }), void (e.cityName && (this.setCityStorage(e), s.setGlobalData(e)));
            s.eventHandle.emit("city-switch", function() {
                t.setDataLazy({
                    currCity: e.cityName,
                    currDispCityId: e.dispCityId
                }), t.setCityStorage(e), s.setGlobalData(e), s.toast("切换成功", {
                    duration: 1e3,
                    icon: "success"
                });
            }, e);
        }
    },
    filterScroll: function(e) {
        this.setDataLazy({
            cityFilterShow: !1
        });
    },
    moveToTop: function() {
        this.setDataLazy({
            showGoToTop: !1,
            scrollHeight: this.data.scrollHeight - 20
        });
    },
    weatherBrief: function(e) {
        var t = this;
        s.request("https://wxapp.58.com/weather/info", {
            cityId: e,
            openId: s.globalData.openId
        }).then(function(e) {
            try {
                var a = t.getWeatherIcon(e.data.weather.icon);
                e.data.weather.icontype = a;
            } catch (e) {}
            console.log(e), 0 == e.code && (s.doLogClick({
                pageType: "58wxindex",
                pageName: "58wxindex",
                clickType: "weathershow",
                clickName: "e_weathershow",
                currentcid: t.data.currDispCityId,
                number: 1
            }), t.setDataLazy({
                weatherBriefData: e.data.weather,
                weatherAlmanac: e.data.almanac,
                banners: e.data.banners || [],
                weatherShow: e.data.weather && !0
            }), t.isShowBigbang(e.data.shouye, e.data.banners)), (e.error || 1 == e.code) && (console.log("获取天气失败"), 
            t.setDataLazy({
                weatherBriefData: {},
                banners: [],
                weatherShow: !1,
                showBigbang: !1
            }));
        });
    },
    getWeatherIcon: function(e) {
        for (var t = [ [ 0, 30 ], [ 1, 2, 31 ], [ 3, 4, 5, 6, 7, 8, 9, 10, 19, 33 ], [ 13, 14, 15, 16, 17, 34 ], [ 18, 20, 29, 32, 35, 36, 45, 46 ] ], a = 0, i = 0; i < t.length; i++) if (t[i].indexOf(parseInt(e)) > -1) {
            a = i;
            break;
        }
        return [ "sun", "shadow", "rain", "snow", "sand" ][a];
    },
    isShowBigbang: function(e, t) {
        if (t && t.length > 0 && s.doLogClick({
            pageType: "58wxindex",
            pageName: "58wxindex",
            clickType: "bannershow",
            clickName: "e_bannershow",
            currentcid: this.data.currDispCityId,
            number: 1
        }), e) {
            var a = s.storage.getSync("showBigbang"), i = new Date().toLocaleDateString().split("/").join("") + e.url;
            a && a == i ? this.setDataLazy({
                showBigbang: !1
            }) : (s.doLogClick({
                pageType: "58wxindex",
                pageName: "58wxindex",
                clickType: "windowshow",
                clickName: "e_windowshow",
                currentcid: this.data.currDispCityId
            }), s.storage.setSync("showBigbang", i), this.setDataLazy({
                bigbangObj: e,
                showBigbang: e && !0
            }));
        }
    },
    getImCount: function() {
        var e = this;
        s.request(s.pathData.im.MSG_COUNT, {
            callback: "callback"
        }).then(function(t) {
            console.log("默契匹配msg", t);
            var a = t.data;
            e.setDataLazy({
                imCount: parseInt(a.substring(a.indexOf("data") + 6, a.indexOf(",")))
            });
        });
    },
    scrollContain: s.debounce(200, function(e) {
        e.detail.scrollTop > 50 ? this.setDataLazy({
            showGoToTop: !0
        }) : this.setDataLazy({
            showGoToTop: !1
        });
    }),
    $e_headIconTap: s.throttle(1e3, function(e) {
        var t = e.currentTarget.dataset;
        if ("tabbar" !== t.type) {
            if (s.doLogClick({
                pageType: "58wxindex",
                pageName: "58wxindex",
                clickType: t.clicktype,
                clickName: "e_" + t.clicktype,
                currentcid: this.data.currDispCityId,
                catename: t.catecode || "",
                id: t.index + 1
            }), t.logined) return s.hasUnionId() ? void s.goto(t.url, !0) : void s.eventHandle.emit("login", function() {
                s.goto(t.url, !0);
            }, !0);
            "4" !== t.catecode ? s.goto(t.url, !0) : this.getSubId();
        } else wx.switchTab({
            url: t.url
        });
    }),
    getSubId: function() {
        s.request(s.pathData.youxuan.GET_SUBID).then(function(e) {
            var t = e.error ? e.data : e;
            0 === t.code ? s.goto([ "/pages/youxuan/youxuan", {
                youxuan: i.subscribeTypeToYouXuanType[1],
                type: 1,
                subId: t.data,
                newEntrance: "1",
                sort: 1
            } ], !0) : s.goto([ "/pages/cate-list/cate-list", {
                cateCode: 4,
                cateId: 574
            } ], !0);
        });
    },
    e_listItemTap: function(e) {
        var t = e.currentTarget.dataset;
        console.log(t, s.getUrlParams(t.url));
        var a = s.getUrlParams(t.url);
        "list-btn" !== e.target.id ? (s.doLogClick({
            pageType: "58wxindex",
            pageName: "58wxindex",
            clickType: "likeclick",
            clickName: "e_likeclick",
            currentcid: this.data.currDispCityId,
            cateid: a.cateCode
        }), s.goto(t.url, !0)) : s.doLogClick({
            pageType: "58wxindex",
            pageName: "58wxindex",
            clickType: "likeopeclick",
            clickName: "e_likeopeclick",
            currentcid: this.data.currDispCityId,
            cateid: a.cateCode,
            operate: e.target.dataset.type
        });
    },
    onShareAppMessage: function() {
        return {
            title: "58同城小程序",
            desc: "",
            path: "/pages/index/index"
        };
    },
    $e_goToMore: function(e) {
        var t = e.currentTarget.dataset.url;
        s.goto(t, !0);
    },
    $e_weatherDetail: function(e) {
        s.goto("/pages/web-view-list/weather/weather", !0);
    },
    e_hideApply: function() {
        var t = this;
        this.data.resumes.forEach(function(e, a) {
            e.checked = !1, 0 === a && (e.checked = !0, t.data.resumeId = e.name, console.log("e_hideApply", t.data.resumeId));
        }), this.setDataLazy({
            showResumeList: !1,
            resumes: [].concat(e(this.data.resumes))
        });
    },
    $e_apply: s.throttle(1e3, function(e) {
        var t = this;
        this.pageData.infoId = e.target.dataset.infoid, console.log("infoId:", this.pageData.infoId), 
        this.data.applied || s.eventHandle.emit("check-setting", function() {
            t.getResumeInfo().then(function(e) {
                if (e.error) return e.data.msg && s.alert("提示", e.data.msg), void t.e_hideApply();
                t.data.resumeId ? t.data.resumes.length ? t.setDataLazy({
                    showResumeList: !0
                }) : s.confirm("提示", "确定申请此职位？")().then(function(e) {
                    e && t.e_applyJob();
                }) : s.toastError("你还没有简历~");
            });
        });
    }),
    e_resumeRadioChange: function(t) {
        var a = this;
        this.data.resumeId = t.detail.value, this.data.resumes.forEach(function(e) {
            e.checked = !1, e.name === a.data.resumeId && (e.checked = !0);
        }), this.setDataLazy({
            resumes: [].concat(e(this.data.resumes))
        });
    },
    $e_applyJob: function() {
        var e = this;
        s.request("/resume/delivery", {
            infoId: this.pageData.infoId,
            resumeId: this.data.resumeId
        }).then(function(t) {
            e.setDataLazy({
                showResumeList: !1
            }), t.error ? t.data.msg && s.alert("投递失败", t.data.msg) : (e.setDataLazy({
                applied: !0,
                showResumeList: !1
            }), s.toast("投递成功"));
        });
    },
    getResumeInfo: function() {
        var e = this;
        return console.log("this.pageData.infoId", this.pageData), new Promise(function(t) {
            e.data.resumes.length > 0 ? t({}) : s.request("/resume/trydelivery", {
                infoId: e.pageData.infoId
            }).then(function(a) {
                if (a.error) t(a); else {
                    if (e.data.resumeInfo = a.data, e.data.resumeId = a.data.resumeId, a.data.popData) {
                        var i = a.data.popData.map(function(e) {
                            return {
                                name: e.resumeId,
                                value: e.resumeName
                            };
                        });
                        i.length > 0 && (e.setDataLazy({
                            resumeId: i[0].name
                        }), i[0].checked = !0), e.setDataLazy({
                            resumes: i
                        });
                    }
                    setTimeout(function() {
                        t({});
                    }, 100);
                }
            });
        });
    },
    $e_goToFriendFun: function(e) {
        this.setDataLazy({
            showAlertFriend: !1
        }), 1 == e.target.dataset.state ? s.goto([ "/pages/friend/friend", {
            friendType: "push",
            friendPath: "chat"
        } ], !0) : 0 == e.target.dataset.state && s.goto([ "/pages/friend/friend", {
            friendType: "push",
            friendPath: "test"
        } ], !0);
    },
    alertFriend: function() {
        var e = this, t = new Date().toLocaleDateString().split("/").join("");
        s.storage.getSync("currentDateStr") != t && s.request(s.pathData.friend.LOVR_ALERT, {}).then(function(t) {
            console.log(t), 0 == t.code && (t.data > 0 ? (e.friendsTipState = 1, e.setDataLazy({
                friendsTipState: 1
            })) : 0 == t.data && e.setDataLazy({
                friendsTipState: 0
            })), t.error && e.setDataLazy({
                showAlertFriend: !1
            });
        });
    },
    e_alertClose: function() {
        this.setDataLazy({
            showAlertFriend: !1
        });
    },
    jumpType: function(e) {
        var t = e.url, a = e.pageType, i = e.appId;
        e.index;
        if (3 === a) {
            if (!wx.navigateToMiniProgram) return void s.alert("当前微信版本过低，无法跳转同城小程序，请升级到最新微信版本后重试。");
            wx.navigateToMiniProgram({
                appId: i,
                path: t,
                success: function(e) {
                    console.log("打开成功");
                }
            });
        } else if (2 === a) {
            var n = "/pages/web-view-list/ordinary/index?url=" + encodeURIComponent(t);
            s.goto([ n ], !0);
        } else s.goto([ t ], !0);
    },
    $e_bannerclick: function(e) {
        s.doLogClick({
            pageType: "58wxindex",
            pageName: "58wxindex",
            clickType: "bannerclick",
            clickName: "e_bannerclick",
            currentcid: this.data.currDispCityId,
            number: e.target.dataset.index
        }), this.jumpType(e.target.dataset);
    },
    e_bindchange: function(e) {
        var t = e.detail;
        s.doLogClick({
            pageType: "58wxindex",
            pageName: "58wxindex",
            clickType: "bannershow",
            clickName: "e_bannershow",
            currentcid: this.data.currDispCityId,
            number: t.current + 1
        });
    },
    e_bigbangClose: function() {
        s.doLogClick({
            pageType: "58wxindex",
            pageName: "58wxindex",
            clickType: "windowcloseclick",
            clickName: "e_windowcloseclick",
            currentcid: this.data.currDispCityId
        }), this.setDataLazy({
            showBigbang: !1
        });
    },
    e_bigbangClick: function(e) {
        s.doLogClick({
            pageType: "58wxindex",
            pageName: "58wxindex",
            clickType: "windowclick",
            clickName: "e_windowclick",
            currentcid: this.data.currDispCityId
        }), this.jumpType(e.target.dataset), this.setDataLazy({
            showBigbang: !1
        });
    }
}, o, c, d, a ]);