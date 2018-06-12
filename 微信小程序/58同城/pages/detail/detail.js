function a(a) {
    if (Array.isArray(a)) {
        for (var e = 0, t = Array(a.length); e < a.length; e++) t[e] = a[e];
        return t;
    }
    return Array.from(a);
}

function e(a, e, t) {
    return e in a ? Object.defineProperty(a, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[e] = t, a;
}

var t = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (a[o] = t[o]);
    }
    return a;
}, o = getApp(), i = require("../../utils/verify")(), r = require("../common/error-module")(), s = require("../common/tel/index"), n = [ 1036, 1069, 1089, 1090 ];

o.createPage([ {
    methodOptions: {
        e_chat: {
            type: "goto"
        },
        e_apply: {
            type: "apply"
        },
        e_applyJob: {
            type: "applyJob"
        },
        e_videoPlay: {
            type: "video"
        },
        e_videoClose: {
            type: "video"
        },
        e_striveRommate: {
            type: "rommate"
        },
        e_more: {
            type: "goto"
        }
    },
    pageInfoKeys: [ "currInfoId", "resumeId", "currentCateCode", "dispCateName", "infoId", "key" ],
    data: e({
        pageInfo: {},
        pageType: "detail",
        pageName: "detail",
        cate: "",
        title: "",
        btnFlag: !0,
        verifyLoad: !1,
        verifyPic: "",
        verifyValue: "",
        verifyFocus: !0,
        currInfoId: "",
        currentCateCode: "",
        detail: {
            currPicNum: 1,
            info: {},
            descTitle: "",
            loading: !1,
            isErrorShow: !1,
            largerPicShow: !0,
            isDog: !1
        },
        hideApplyButton: !1,
        resumes: [],
        resumeId: null,
        applied: !1,
        isTelAlertShow: !1,
        telNum: "",
        telCountTime: 180,
        videoSrc: "",
        videoShow: !1,
        rommateType: 1,
        userInfo: {},
        rommateList: [],
        isDog: !1,
        isIphoneX: !1,
        isShowLaunch: !1,
        launchApppro: "",
        scene: o.globalData.scene
    }, "cate", ""),
    _onLoad: function(a) {
        (a.hideApplyButton || 0 === [ "4", "5" ].filter(function(e) {
            return e === a.cateCode;
        }).length) && this.setDataLazy({
            hideApplyButton: !0
        }), a.dispCateName && "dog" === a.dispCateName && this.setDataLazy({
            detail: {
                isDog: !0
            }
        }), /iPhone X/i.test(wx.getSystemInfoSync().model) && this.setDataLazy({
            isIphoneX: !0
        }), console.log("app.weappEnv", o.weappEnv);
    },
    initData: function() {
        this.pageData.key;
    },
    onReady: function(a) {
        var i = this;
        this.videoContext = wx.createVideoContext("myVideo"), o.request(o.pathData.DETAIL_PATH, {
            infoId: this.data.infoId,
            dispCateName: this.data.dispCateName,
            dispLocalName: this.data.dispLocalName,
            cateCode: this.data.cateCode
        }, {
            show: !0
        }).then(function(a) {
            if (a.error) i.setDataLazy({
                isErrorShow: !0
            }); else {
                var o = a.data || {};
                i.data.title = o.title, o.paramMap.allocation && (o.paramMap.allocation = JSON.parse(o.paramMap.allocation), 
                o.paramMap.allocation = [].concat(o.paramMap.allocation).filter(function(a) {
                    return !!a;
                })), o.paramMap.location && (o.paramMap.location = JSON.parse(o.paramMap.location).join("-")), 
                o.locations && (o.locations = JSON.parse(o.locations).join("-")), o.paramMap.welfare && (o.paramMap.welfare = JSON.parse(o.paramMap.welfare)), 
                o.paramMap.trade && (o.paramMap.trade = JSON.parse(o.paramMap.trade).join("-")), 
                o.paramMap.roommates && (o.paramMap.roommates = JSON.parse(o.paramMap.roommates), 
                o.paramMap.roommates && o.paramMap.roommates.length && o.paramMap.roommates.filter(function(a, e) {
                    a.pic = "https://pic" + (Math.floor(7 * Math.random()) + 1) + ".58cdn.com.cn" + a.pic;
                })), o.paramMap.isroommate && (o.paramMap.isroommate = JSON.parse(o.paramMap.isroommate)), 
                i.defaultDescName(o.cateCode);
                var r = !1, s = "";
                "pinche" == i.data.dispCateName && "app_share" == i.data.from && n.indexOf(parseInt(i.data.scene)) > -1 && (r = !0, 
                s = i.getLaunPro(o), i.setLaunchShow(o.cate)), i.setDataLazy(e({
                    cate: o.cate,
                    detail: t({}, i.data.detail, {
                        currPicNum: 1,
                        info: o,
                        descTitle: i.data.descTitle,
                        loading: !0,
                        isErrorShow: !1,
                        largerPicShow: !0
                    }),
                    videoSrc: o.paramMap.video ? o.paramMap.video : "",
                    rommateList: o.paramMap.roommates ? o.paramMap.roommates : [],
                    rommateType: o.paramMap.isroommate ? 0 : 1,
                    launchApppro: s,
                    isShowLaunch: r
                }, "cate", o.cate)), console.log("video", i.data.videoSrc);
            }
        });
    },
    getLaunPro: function(a) {
        var e = "wbmain://jump/pinche/detail", t = this.data, o = t.cateCode, i = t.infoId, r = t.dispCateName, s = (t.dispLocalName, 
        a.cate || ""), n = a.listName || "bj";
        console.log(a);
        var d = {
            charge_url: "http://" + n + ".58.com/pinche/",
            countType: "1",
            data_url: "https://app.58.com/api/detail/pinche/v2",
            full_path: s,
            infoID: i,
            list_name: r,
            local_name: n,
            pagetype: "detail",
            title: "详情"
        };
        return e = e + "?pid=1537&wlsour=xcx&xcxcate=" + o + "&xcxsource=detail&params=", 
        e = "" + e + encodeURIComponent(JSON.stringify(d));
    },
    _onShow: function() {
        wx.setStorageSync("pagetype", "");
    },
    swipeChange: function(a) {
        this.data.detail.currPicNum = a.detail.current + 1, this.setDataLazy({
            detail: this.data.detail
        });
    },
    toLargerShow: function(a) {
        wx.previewImage({
            current: this.data.detail.info.pic[this.data.detail.currPicNum - 1],
            urls: this.data.detail.info.pic
        });
    },
    closeLargerPic: function() {
        this.data.detail.largerPicShow = !0, this.setDataLazy({
            detail: this.data.detail
        });
    },
    defaultDescName: function(a) {
        switch (a) {
          case 1:
          case 2:
          case 3:
            this.data.descTitle = "房屋配置及描述";
            break;

          case 4:
          case 5:
            this.data.descTitle = "职位简介";
            break;

          case 6:
            this.data.descTitle = "二手车车源描述";
            break;

          case 7:
            this.data.descTitle = "宠物信息描述";
            break;

          case 8:
            this.data.descTitle = "服务介绍";
            break;

          default:
            this.data.descTitle = "信息描述";
        }
    },
    onShareAppMessage: function() {
        var a = o.storage.getSync(o.constData.STORAGE_CITY_KEY);
        return console.log("/pages/index/index?pagetype=detail&infoId=" + this.pageData.infoId + "&dispCateName=" + this.pageData.dispCateName + "&dispLocalName=" + this.pageData.dispLocalName + "&cateCode=" + this.pageData.cateCode + "&cityName=" + a.cityName + "&dispCityId=" + a.dispCityId), 
        {
            title: this.data.title,
            desc: "",
            path: "/pages/index/index?pagetype=detail&infoId=" + this.pageData.infoId + "&dispCateName=" + this.pageData.dispCateName + "&dispLocalName=" + this.pageData.dispLocalName + "&cateCode=" + this.pageData.cateCode + "&cityName=" + a.cityName + "&dispCityId=" + a.dispCityId
        };
    },
    e_hideApply: function() {
        var e = this;
        this.data.resumes.forEach(function(a, t) {
            a.checked = !1, 0 === t && (a.checked = !0, e.data.resumeId = a.name, console.log("e_hideApply", e.data.resumeId));
        }), this.setDataLazy({
            showResumeList: !1,
            resumes: [].concat(a(this.data.resumes))
        });
    },
    $e_apply: o.throttle(1e3, function() {
        var a = this;
        this.data.applied || o.eventHandle.emit("check-setting", function() {
            a.getResumeInfo().then(function(e) {
                if (e.error) return e.data.msg && o.alert("提示", e.data.msg), void a.e_hideApply();
                a.data.resumeId ? a.data.resumes.length ? a.setDataLazy({
                    showResumeList: !0
                }) : o.confirm("提示", "确定申请此职位？")().then(function(e) {
                    e && a.e_applyJob();
                }) : o.toastError("你还没有简历~");
            });
        });
    }),
    e_resumeRadioChange: function(e) {
        var t = this;
        this.data.resumeId = e.detail.value, this.data.resumes.forEach(function(a) {
            a.checked = !1, a.name === t.data.resumeId && (a.checked = !0);
        }), this.setDataLazy({
            resumes: [].concat(a(this.data.resumes))
        });
    },
    $e_applyJob: function() {
        var a = this;
        o.request("/resume/delivery", {
            infoId: this.pageData.infoId,
            resumeId: this.data.resumeId
        }).then(function(e) {
            a.setDataLazy({
                showResumeList: !1
            }), e.error ? e.data.msg && o.alert("投递失败", e.data.msg) : (a.setDataLazy({
                applied: !0,
                showResumeList: !1
            }), o.toast("投递成功"));
        });
    },
    getResumeInfo: function() {
        var a = this;
        return console.log("this.pageData.infoId", this.pageData.infoId), new Promise(function(e) {
            a.data.resumes.length > 0 ? e({}) : o.request("/resume/trydelivery", {
                infoId: a.pageData.infoId
            }).then(function(t) {
                if (t.error) e(t); else {
                    if (a.data.resumeInfo = t.data, a.data.resumeId = t.data.resumeId, t.data.popData) {
                        var o = t.data.popData.map(function(a) {
                            return {
                                name: a.resumeId,
                                value: a.resumeName
                            };
                        });
                        o.length > 0 && (a.setDataLazy({
                            resumeId: o[0].name
                        }), o[0].checked = !0), a.setDataLazy({
                            resumes: o
                        });
                    }
                    setTimeout(function() {
                        e({});
                    }, 100);
                }
            });
        });
    },
    $e_chat: o.throttle(1e3, function(a) {
        var e = a.currentTarget.dataset.userId;
        if (this.data.userInfo.userId) this.goToChat(e); else {
            var t = this;
            this.getUserInfo(function() {
                t.goToChat(e);
            });
        }
    }),
    goToChat: function(a) {
        a !== this.data.userInfo.userId ? o.eventHandle.emit("check-setting", function() {
            o.eventHandle.emit("goto-chat", {
                userId: a
            });
        }) : o.toast("无法与自己聊天哦", {
            duration: 1e3
        });
    },
    $e_videoPlay: function() {
        o.goto([ "/pages/detail-video/detail-video", {
            videoSrc: this.data.videoSrc
        } ], !0);
    },
    $e_videoClose: function() {
        this.setDataLazy({
            videoShow: !1
        }), this.videoContext.pause();
    },
    $e_striveRommate: o.throttle(1e3, function(a) {
        var e = this, t = {
            formId: a.detail.formId,
            infoId: this.pageData.infoId,
            type: this.data.rommateType
        };
        o.eventHandle.emit("check-setting", function() {
            o.eventHandle.emit("check-ppu", function() {
                e.data.rommateType ? e.getRommate(t) : o.confirm("", "是否取消登记?")().then(function(a) {
                    a && e.getRommate(t);
                });
            });
        });
    }),
    getRommate: function(e) {
        var t = this;
        this.data.userInfo.userId || this.getUserInfo(), o.request(o.pathData.detail.STRIVE_ROMMATE, e).then(function(e) {
            var i = e.error ? e.data : e, r = t.data, s = r.rommateType, n = r.userInfo, d = r.rommateList;
            0 === i.code ? (s && (o.alert("登记成功，可以与正在找室友的用户聊一聊哦"), d = d.filter(function(a) {
                return n.userId === a.userId;
            }).length ? d : [ n ].concat(a(d))), s || (o.toast("取消成功", {
                duration: 1e3
            }), d = d.filter(function(a) {
                return n.userId !== a.userId;
            })), t.setDataLazy({
                rommateType: 1 === s ? 0 : 1,
                rommateList: d
            })) : 2 === i.code ? (o.toast("请勿重复登记", {
                duration: 1e3
            }), t.setDataLazy({
                rommateType: 0
            })) : o.toast("网络异常", {
                duration: 1e3
            });
        });
    },
    $e_rommateMore: function() {
        o.goto([ "/pages/rommate/rommate", {
            infoId: this.pageData.infoId
        } ], !0);
    },
    getUserInfo: function(a) {
        var e = this, t = o.storage.getSync(o.constData.PROFILE_KEY), i = o.storage.getSync(o.constData.PPU_KEY), r = i && i.match(/(?!=UID=)(\d+)(?!=&)/), s = r && r[0];
        t && s ? this.setUserInfo(t, s, a) : o.request("/user/profile").then(function(t) {
            if (!t.error) {
                if (!s) {
                    var i = o.storage.getSync(o.constData.PPU_KEY), r = i && i.match(/(?!=UID=)(\d+)(?!=&)/);
                    s = r && r[0];
                }
                e.setUserInfo(t.data, s, a);
            }
        });
    },
    setUserInfo: function(a, e, t) {
        var o = a;
        o.userId = parseInt(e), o.pic = "https://pic3.58cdn.com.cn" + o.pic, this.data.userInfo = o, 
        t && t();
    },
    setLaunchShow: function(a) {
        this.setCommonLog("58wxdiaoqi", "58wxdiaoqi_btnshow", a);
    },
    launchAppError: function(a) {
        wx.showToast({
            icon: "none",
            title: "没有发现app~安装一个呗~",
            duration: 2e3
        }), this.setCommonLog("58wxdiaoqi", "58wxdiaoqi_fail");
    },
    launchTap: function() {
        this.setCommonLog("58wxdiaoqi", "58wxdiaoqi_btnclick");
    },
    setCommonLog: function(a, e, t) {
        console.log(this.data.cate);
        var i = t || this.data.cate;
        o.doCommonClickLog({
            pagetype: a,
            cate: i
        }, e);
    },
    videoCancelBubble: function() {}
}, r, i, s ]);