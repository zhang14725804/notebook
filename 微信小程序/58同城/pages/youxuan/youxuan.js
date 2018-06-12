function t(t) {
    if (Array.isArray(t)) {
        for (var e = 0, a = Array(t.length); e < t.length; e++) a[e] = t[e];
        return a;
    }
    return Array.from(t);
}

var e = getApp(), a = require("./list/index"), s = require("../../utils/verify")();

e.createPage([ {
    methodOptions: {
        e_resort: {
            type: "sort"
        },
        e_goToSubscription: {
            type: "goto"
        },
        e_listItemTap: {
            type: "goto"
        },
        e_apply: {
            type: "apply"
        },
        e_applyJob: {
            type: "applyJob"
        },
        e_goToCateList: {
            type: "goto"
        }
    },
    pageInfoKeys: [ "currInfoId", "resumeId", "currentCateCode", "dispCateName", "infoId", "key" ],
    data: {
        pageName: "youxuan",
        pageType: "list",
        hasMore: !0,
        scrollTop: 0,
        sort: "1",
        showGoToTop: !1,
        navList: [],
        list: [],
        index: 0,
        newEntrance: 0,
        resumes: [],
        resumeId: null,
        applied: !1
    },
    resetNav: function(t) {
        switch ((t || "").toString()) {
          case "1":
            this.setDataLazy({
                navList: [ {
                    id: "1",
                    text: "默认"
                }, {
                    id: "2",
                    text: "高薪资"
                }, {
                    id: "3",
                    text: "离我近"
                } ]
            });
            break;

          case "2":
            this.setDataLazy({
                navList: [ {
                    id: "1",
                    text: "默认"
                }, {
                    id: "2",
                    text: "租金最低"
                }, {
                    id: "3",
                    text: "距离最近"
                } ]
            });
            break;

          case "3":
            this.setDataLazy({
                navList: [ {
                    id: "1",
                    text: "默认"
                }, {
                    id: "2",
                    text: "总价",
                    symbol: "▲"
                }, {
                    id: "3",
                    text: "区域"
                }, {
                    id: "4",
                    text: "面积",
                    symbol: "▼"
                } ]
            });
        }
    },
    initDataWrapper: e.throttle(500, function() {
        console.log("youxuan event load"), this.youxuanInit(null, !0);
    }),
    _onLoad: function() {
        this.setDataLazy({
            newEntrance: this.urlParams.newEntrance
        });
        var t = [ "user-login-success", "passport-login-success", "user-complete", "logout-success", "subscription-change" ];
        e.eventHandle.offOn(t, this.initDataWrapper);
    },
    _onShow: function() {},
    initData: function() {
        this.youxuanInit();
    },
    gotoTop: function() {
        this.setDataLazy({
            scrollTop: this.data.scrollTop
        });
    },
    $e_goToCateList: function() {
        e.goto([ "/pages/cate-list/cate-list", {
            cateCode: 4,
            cateId: 574
        } ], !1);
    },
    resort: e.debounce(50, function(t) {
        console.log("resortresortresortresort");
        var e = t.currentTarget.dataset.sort;
        this.setDataLazy({
            loading: !0,
            sort: e,
            list: [],
            showEmptyInfo: !1,
            hasMore: !0
        }), this.data.sort = e, this.youxuanInit();
    }),
    onContainerScroll: e.debounce(200, function(t) {
        t.detail.scrollTop > 50 ? this.setDataLazy({
            showGoToTop: !0
        }) : this.setDataLazy({
            showGoToTop: !1
        });
    }),
    $e_listItemTap: e.throttle(1e3, function(t) {
        var a = t.currentTarget.dataset.url;
        "list-btn" !== t.target.id && e.goto(a, !0);
    }),
    $e_goToSubscription: function(t) {
        var a = function() {
            var a = t.currentTarget.dataset.url;
            "pages/subscription/subscription" === e.getPageRoute(1) ? wx.navigateBack() : e.goto(a, !0);
        };
        e.eventHandle.emit("check-setting", function() {
            a();
        });
    },
    xyReachTop: function() {
        this.setDataLazy({
            showGoToTop: !1
        });
    },
    e_hideApply: function() {
        var e = this;
        this.data.resumes.forEach(function(t, a) {
            t.checked = !1, 0 === a && (t.checked = !0, e.data.resumeId = t.name, console.log("e_hideApply", e.data.resumeId));
        }), this.setDataLazy({
            showResumeList: !1,
            resumes: [].concat(t(this.data.resumes))
        });
    },
    $e_apply: e.throttle(1e3, function(t) {
        var a = this;
        this.pageData.infoId = t.target.dataset.infoid, console.log("infoId:", this.pageData.infoId), 
        this.data.applied || e.eventHandle.emit("check-setting", function() {
            a.getResumeInfo().then(function(t) {
                if (t.error) return t.data.msg && e.alert("提示", t.data.msg), void a.e_hideApply();
                a.data.resumeId ? a.data.resumes.length ? a.setDataLazy({
                    showResumeList: !0
                }) : e.confirm("提示", "确定申请此职位？")().then(function(t) {
                    t && a.e_applyJob();
                }) : e.toastError("你还没有简历~");
            });
        });
    }),
    e_resumeRadioChange: function(e) {
        var a = this;
        this.data.resumeId = e.detail.value, this.data.resumes.forEach(function(t) {
            t.checked = !1, t.name === a.data.resumeId && (t.checked = !0);
        }), this.setDataLazy({
            resumes: [].concat(t(this.data.resumes))
        });
    },
    $e_applyJob: function() {
        var t = this;
        e.request("/resume/delivery", {
            infoId: this.pageData.infoId,
            resumeId: this.data.resumeId
        }).then(function(a) {
            t.setDataLazy({
                showResumeList: !1
            }), a.error ? a.data.msg && e.alert("投递失败", a.data.msg) : (t.setDataLazy({
                applied: !0,
                showResumeList: !1
            }), e.toast("投递成功"));
        });
    },
    getResumeInfo: function() {
        var t = this;
        return console.log("this.pageData.infoId", this.pageData), new Promise(function(a) {
            t.data.resumes.length > 0 ? a({}) : e.request("/resume/trydelivery", {
                infoId: t.pageData.infoId
            }).then(function(e) {
                if (e.error) a(e); else {
                    if (t.data.resumeInfo = e.data, t.data.resumeId = e.data.resumeId, e.data.popData) {
                        var s = e.data.popData.map(function(t) {
                            return {
                                name: t.resumeId,
                                value: t.resumeName
                            };
                        });
                        s.length > 0 && (t.setDataLazy({
                            resumeId: s[0].name
                        }), s[0].checked = !0), t.setDataLazy({
                            resumes: s
                        });
                    }
                    setTimeout(function() {
                        a({});
                    }, 100);
                }
            });
        });
    }
}, a, s ]);