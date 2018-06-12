function e(e) {
    if (Array.isArray(e)) {
        for (var a = 0, t = Array(e.length); a < e.length; a++) t[a] = e[a];
        return t;
    }
    return Array.from(e);
}

function a(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var t = getApp(), r = require("../common/search-module")(), i = require("../common/error-module")(), s = require("../../utils/verify")(), n = require("../common/tel/index"), u = {
    248: "1536",
    481: "8922",
    249: "2407"
}, o = "", d = "", c = "", l = !1, f = !0, h = {}, y = {
    cateCode: "",
    cateId: "",
    dispCateId: "",
    cateIdParent: "",
    paramValue: "",
    cate: "",
    pageNum: 1,
    key: "",
    queryList: {},
    query: {},
    quanZhanQuery: {},
    zpCwHyCateCodes: "4,7,8",
    filterNavBufferData: [],
    nowIndex: -1,
    hasMore: !1,
    loadMore: !0,
    erscBrand: 5866,
    erscPrice: 1194,
    shouYeMenuData: [ {
        key: "sort1",
        val: "1",
        menuName: "时间最新",
        itemList: []
    }, {
        key: "sort2",
        val: "2",
        menuName: "距离最近",
        itemList: []
    } ],
    currCarLeiXing: {
        val: 0,
        valueId: 0
    },
    filterMenuName: [],
    erscarDefaultPrice: []
};

t.createPage([ {
    methodOptions: {
        e_bindFilterNavTap: {
            type: "filter"
        },
        e_tapFilterItem: {
            type: "filter"
        },
        e_goToDetail: {
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
        }
    },
    pageInfoKeys: [ "currInfoId", "resumeId", "currentCateCode", "dispCateName", "infoId", "key" ],
    data: {
        pageType: "list",
        pageName: "list",
        cate: "",
        filterNavData: [],
        list: [],
        nowIndex: "",
        searchParams: "",
        searchShow: !1,
        searchKey: "",
        cateCode: "",
        currFilter: "",
        isErrorShow: !1,
        isRedirect: !0,
        scrollTop: 0,
        animation: {},
        hasMore: !0,
        verifyLoad: !1,
        verifyPic: "",
        btnFlag: !0,
        verifyValue: "",
        verifyFocus: !0,
        currInfoId: "",
        currentCateCode: "",
        loaded: !1,
        showSearchResult: !1,
        searchResult: [],
        hotWords: [],
        searchWords: [],
        key: "",
        isSearchModuleShow: !0,
        isTelAlertShow: !1,
        telNum: "",
        telCountTime: 180,
        resumes: [],
        resumeId: null,
        applied: !1,
        cityId: "",
        dispCityId: "",
        originDispCateId: "",
        originDispLocalId: ""
    },
    _onLoad: function(e) {
        var a = this;
        console.log(t.globalData), "near" == e.type && (l = !0), h = {}, t.eventHandle.first("sou-click-complete", function(e) {
            console.log("sou-click-on"), a._setPageData(e), t.storage.setSync(t.constData.LIST_SOU_JUMP, !1), 
            a.initData(), h = e;
        }), this._setPageData(e);
    },
    _setPageData: function(e) {
        e = Object.assign({}, e, h), y.key = e.key ? decodeURIComponent(e.key) : "", y.cateId = e.cateId || 0, 
        y.dispCateId = e.dispCateId || 0, y.dispLocalId = e.dispLocalId || 0, y.cateCode = e.cateCode || 0, 
        y.cateIdParent = e.cateIdParent || "", y.value = decodeURIComponent(e.value || ""), 
        y.paramValue = e.paramValue || "", y.checkedCateId = e.checkedCateId || "", y.parentDispCateId = e.parentDispCateId || "", 
        e.cityId && this.setDataLazy({
            cityId: e.cityId
        }), e.dispCityId && this.setDataLazy({
            dispCityId: e.dispCityId
        });
    },
    initData: function() {
        var e = this;
        t.storage.setSync(t.constData.LIST_READY, !0);
        !(t.storage.getSync(t.constData.LIST_SOU_JUMP) || !1) && function() {
            t.storage.setSync(t.constData.LIST_READY, !1);
            y.key;
            e.pageReadyHandle();
        }();
    },
    _onShow: function() {
        wx.hideToast(), t.storage.setSync("pagetype", "");
    },
    pageReadyHandle: function() {
        var e = this;
        this.setCurrInitData(), !y.hasMore && t.toast("加载中", {
            duration: 1e4,
            icon: "loading"
        }), this.argumentsRevert();
        if (0 == y.cateCode) t.request(t.pathData.QUANZAHN_MENU_PATH, {
            key: y.key,
            dispCityId: d,
            dispLocalId: y.dispLocalId
        }).then(function(a) {
            a.error ? t.alert("网络异常,请稍后重试") : e.quanZhanMenuRequest(a);
        }); else {
            var a = {
                dispCityId: d,
                cateId: y.cateId,
                cateCode: y.cateCode,
                dispCateId: y.dispCateId,
                dispLocalId: y.dispLocalId
            };
            t.request(t.pathData.FILTER_PATH, a).then(function(a) {
                a.error ? t.alert("网络异常,请稍后重试") : e.menuRequest(a);
            });
        }
        this.setDataLazy({
            searchParams: {
                cateId: y.cateId,
                cateIdParent: y.cateIdParent,
                cateCode: y.cateCode,
                dispCateId: y.dispCateId,
                key: y.key,
                cityId: o,
                dispCityId: d,
                value: y.value,
                checkedCateId: y.checkedCateId
            },
            searchKey: y.key,
            isRedirect: !0
        });
    },
    setCurrInitData: function() {
        o = this.urlParams.cityId || t.globalData.cityId, d = this.urlParams.dispCityId || t.globalData.dispCityId, 
        c = t.getThirdKey();
    },
    e_searchTap: function(e) {
        function a() {
            return e.apply(this, arguments);
        }
        return a.toString = function() {
            return e.toString();
        }, a;
    }(function() {
        var e = !!y.key;
        e_searchTap(this.data.searchParams, !0, e);
    }),
    bindSwipeBottom: function(e) {
        return !!f && (f = !1, setTimeout(function() {
            f = !0;
        }, 1e3), y.hasMore ? (y.loadMore = !0, 1 != y.pageNum && void (0 == y.cateCode ? (y.quanZhanQuery.pageNum++, 
        y.hasMore && this.getListData(t.pathData.LIST_PATH, {
            param: JSON.stringify(y.quanZhanQuery)
        })) : (y.query.pageNum++, y.hasMore && this.getListData(t.pathData.LIST_PATH, {
            param: JSON.stringify(y.query)
        })))) : (t.toast("没有更多信息了", {
            duration: 1500,
            icon: "success"
        }), !1));
    },
    listPageScroll: function(e) {
        y.loadMore = !0, y.loadMore && (this.data.scrollTop = e.detail.scrollTop);
    },
    $e_bindFilterNavTap: t.throttle(10, function(e) {
        var a = e.currentTarget.dataset, r = this.data.currFilter;
        if (y.nowIndex = a.index, r = r == a.key ? "" : a.key, this.setDataLazy({
            currFilter: r,
            nowIndex: a.index
        }), 0 == y.cateCode) {
            var i = a.key;
            if (t.constData.QZ_SEARCH_SORT.indexOf(i) > -1) return y.queryList[t.constData.QZ_SEARCH_KEY] = a.val, 
            this.setDataLazy({
                currFilter: ""
            }), y.quanZhanQuery.pageNum = 1, y.loadMore = !1, y.quanZhanQuery.queryList = y.queryList, 
            void this.getListData(t.pathData.LIST_PATH, {
                param: JSON.stringify(y.quanZhanQuery)
            });
        }
    }),
    $e_tapFilterItem: function(e) {
        var a = e.currentTarget.dataset, r = y.nowIndex, i = y.filterNavBufferData, s = a.key;
        if ("1" == a.isleaf) return s == t.constData.JUMP_KEY && a.val ? void this.jumpToCateList(a.val) : (y.cateCode == t.constData.ERSCAR_CATECODE && (s == t.constData.ERSCAR_LEIXING_KEY || s == y.erscBrand || !s && 0 == r) && this.ersCarBrandPrice(a), 
        "sort" == s && a.val ? i[r].menuName = a.name.length > 2 ? a.name.substring(0, 2) + "..." : a.name : i[r].menuName = a.val ? a.name : y.filterMenuName[r], 
        y.quanZhanQuery.pageNum = 1, y.query.pageNum = 1, y.loadMore = !1, a.val ? y.queryList[this.data.currFilter] = a.val : delete y.queryList[this.data.currFilter], 
        "cate" !== this.data.currFilter && u[y.cateId] !== this.data.currFilter || (this.data.searchParams.checkedCateId = a.val || "0"), 
        this.setDataLazy({
            filterNavData: y.filterNavBufferData,
            currFilter: ""
        }), t.toast("加载中", {
            duration: 1e4,
            icon: "loading"
        }), "local" === s && (a.val ? y.query.dispLocalId = a.checkval : y.query.dispLocalId = this.data.originDispLocalId), 
        "cate" === s && (a.val ? y.query.dispCateId = a.checkval : y.query.dispCateId = this.data.originDispCateId), 
        void (0 == y.cateCode ? (y.quanZhanQuery.queryList = y.queryList, this.getListData(t.pathData.LIST_PATH, {
            param: JSON.stringify(y.quanZhanQuery)
        })) : (y.query.queryList = y.queryList, this.getListData(t.pathData.LIST_PATH, {
            param: JSON.stringify(y.query)
        }))));
    },
    filterBackTap: function() {
        this.setDataLazy({
            currFilter: ""
        });
    },
    filterMove: function() {
        console.log("touch move");
    },
    quanZhanMenuRequest: function(e) {
        y.filterNavBufferData = e.data, this.navInitDel(e.data), this.doDefaultMenu(e.data), 
        y.filterNavBufferData = y.filterNavBufferData.concat(y.shouYeMenuData), this.setDataLazy({
            currFilter: "",
            filterNavData: y.filterNavBufferData
        }), y.quanZhanQuery = {
            cityId: o,
            cateCode: y.cateCode,
            pageNum: y.pageNum,
            key: y.key,
            queryList: y.queryList,
            thirdKey: c
        }, y.loadMore = !1, this.getListData(t.pathData.LIST_PATH, {
            param: JSON.stringify(y.quanZhanQuery)
        });
    },
    menuRequest: function(e) {
        try {
            var a = e.data;
            y.filterNavBufferData = e.data, this.navInitDel(a), this.doDefaultMenu(a), l && (y.queryList = {
                sort: "2"
            }, y.filterNavBufferData[1].val = "", y.filterNavBufferData[1].menuName = "类型", 
            y.filterNavBufferData[3].val = "2", y.filterNavBufferData[3].menuName = "距离...", 
            l = !1), wx.hideToast(), this.setDataLazy({
                filterNavData: y.filterNavBufferData
            }), y.zpCwHyCateCodes.indexOf(y.cateCode) > -1 && (y.cateId = Number(y.cateIdParent) ? y.cateIdParent : y.cateId), 
            y.query = {
                cityId: o,
                cateCode: y.cateCode,
                cateId: y.cateId,
                dispCateId: y.dispCateId,
                dispLocalId: t.storage.getSync(t.constData.STORAGE_CITY_KEY).dispCityId,
                pageNum: y.pageNum,
                key: y.key,
                queryList: y.queryList,
                thirdKey: c
            }, this.getListData(t.pathData.LIST_PATH, {
                param: JSON.stringify(y.query)
            }), 4 == y.cateCode || 8 == y.cateCode ? this.setDataLazy({
                originDispCateId: y.parentDispCateId,
                originDispLocalId: y.query.dispLocalId
            }) : this.setDataLazy({
                originDispCateId: y.query.dispCateId,
                originDispLocalId: y.query.dispLocalId
            });
        } catch (e) {
            return t.alert("当前没有网络连接"), void this.setDataLazy({
                isErrorShow: !0
            });
        }
    },
    getListData: function(e, a) {
        var r = this;
        t.requestPost(e, a, {
            show: !0
        }).then(function(e) {
            e.error ? t.alert("网络异常,请稍后重试") : r.listRequest(e);
        });
    },
    listRequest: function(e) {
        var a = (e = e || {}).data || {};
        if (a.rstList = a.rstList || [], 0 != a.rstList.length) {
            y.hasMore = a.hasMore;
            var t = !0, r = !1, i = void 0;
            try {
                for (var s, n = a.rstList[Symbol.iterator](); !(t = (s = n.next()).done); t = !0) {
                    var u = s.value;
                    u.briefList && u.briefList.length > 0 && (u.briefList = [].concat(u.briefList).filter(function(e) {
                        return !!e;
                    }));
                }
            } catch (e) {
                r = !0, i = e;
            } finally {
                try {
                    !t && n.return && n.return();
                } finally {
                    if (r) throw i;
                }
            }
            this.setDataLazy({
                list: y.loadMore ? this.data.list.concat(a.rstList) : a.rstList,
                cateCode: y.cateCode,
                scrollTop: y.loadMore ? this.data.scrollTop : 0,
                isErrorShow: !1,
                hasMore: !y.hasMore,
                cate: a.cate
            }), y.pageNum++;
        } else this.setDataLazy({
            list: [],
            isErrorShow: !0,
            hasMore: !0
        });
    },
    _listSearchDeal: function() {
        y.query.key = this.data.key, y.pageNum = 1, y.query.pageNum = 1, y.loadMore = !1;
        var e = y.query.queryList ? y.query.queryList.cate : 0, r = e ? {
            cate: e
        } : {};
        u[y.cateId] && (r = a({}, u[y.cateId], this.data.searchParams.checkedCateId || "0")), 
        y.query.queryList = r, y.queryList = r, this._resetFilterMenu(), this.data.searchParams.value = this.subSearchValue(this.data.key), 
        this.setDataLazy({
            searchKey: this.data.key,
            isSearchModuleShow: !0,
            searchParams: this.data.searchParams,
            filterNavData: y.filterNavBufferData
        }), this.getListData(t.pathData.LIST_PATH, {
            param: JSON.stringify(y.query)
        });
    },
    subSearchValue: function() {
        return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/(.{7})(.+)(.{7})/, "$1...$3");
    },
    _resetFilterMenu: function() {
        var e = y.filterNavBufferData;
        for (var a in e) "cate" !== e[a].key && e[a].key !== u[y.cateId] && (e[a].menuName = y.filterMenuName[a], 
        e[a].menuName || "sort1" != e[a].key || (e[a].menuName = "时间最新"), e[a].menuName || "sort2" != e[a].key || (e[a].menuName = "距离最近"));
    },
    carBrandRequest: function(e) {
        for (var a = 0, r = y.filterNavBufferData.length; a < r; a++) if (y.filterNavBufferData[a].key != y.erscBrand) {
            if (y.filterNavBufferData[a].key == t.constData.ERSCAR_PRICE_KEY) {
                y.filterNavBufferData[a].menuName = "价格", y.filterNavBufferData[a].itemList = [ e.data[1].itemList ];
                break;
            }
        } else {
            if (e.data && !e.data[0]) {
                0 == y.currCarLeiXing.val && (y.filterNavBufferData[a].menuName = "品牌", y.filterNavBufferData[a].itemList = [ [] ]);
                continue;
            }
            y.filterNavBufferData[a].menuName = "品牌", y.filterNavBufferData[a].itemList = [ e.data[0].itemList ];
        }
        this.setDataLazy({
            filterNavData: y.filterNavBufferData
        });
    },
    doDefaultMenu: function(e) {
        this.navErrorDel(e), y.filterNavBufferData = e || [], y.filterNavBufferData = y.filterNavBufferData || [];
        for (var a = 0, t = y.filterNavBufferData.length; a < t; a++) {
            var r = y.filterNavBufferData[a];
            if (r.key || (r.key = "default" + a), r.val || u[y.cateId] === r.key || y.checkedCateId) for (var i = 0, s = r.itemList.length; i < s; i++) {
                var n = r.itemList[i];
                if ("cate" !== r.key && u[y.cateId] !== r.key || !y.checkedCateId && "0" !== y.checkedCateId) {
                    if (n.checkValue == r.val) {
                        y.queryList[r.key] = n.val, r.menuName = n.name;
                        break;
                    }
                } else if ("0" !== y.checkedCateId && y.checkedCateId === n.val) {
                    y.queryList[r.key] = n.val, r.menuName = n.name, console.log("menu name" + n.name + "  " + n.val + "  " + y.queryList[r.key]);
                    break;
                }
            }
            y.filterNavBufferData[a].itemList = [ y.filterNavBufferData[a].itemList ];
        }
    },
    navErrorDel: function(e) {
        for (var a in e) if (!e[a]) return wx.hideToast(), void this.setDataLazy({
            isErrorShow: !0
        });
    },
    navInitDel: function(e) {
        for (var a in e) y.filterNavBufferData[a].key == t.constData.ERSCAR_PRICE_KEY && (y.erscarDefaultPrice = y.filterNavBufferData[a].itemList), 
        y.filterMenuName.push(y.filterNavBufferData[a].menuName);
    },
    argumentsRevert: function() {
        y.pageNum = 1, y.queryList = {}, y.filterNavBufferData = [], y.filterMenuName = [];
    },
    jumpToCateList: function(e) {
        try {
            e = e ? JSON.parse(e) : {};
        } catch (a) {
            console.log("jumpToCateList error:"), console.error(a), e = {};
        }
        t.goto([ "/pages/list/list", {
            key: y.key,
            cateId: e.cateId,
            cateCode: e.cateCode,
            dispCateId: e.dispCateId
        } ]);
    },
    ersCarBrandPrice: function(e) {
        var a = this;
        if (e.key) e.key == t.constData.ERSCAR_LEIXING_KEY && (y.currCarLeiXing = {
            val: e.val,
            valueId: e.valueid
        }, delete y.queryList[y.erscBrand]), delete y.queryList[y.erscPrice], t.request(t.pathData.ERSCAR_BRAND_PRICE_PATH, {
            dispCityId: d,
            typeValue: y.currCarLeiXing.val,
            typeValueId: y.currCarLeiXing.valueId,
            brand: e.key == t.constData.ERSCAR_LEIXING_KEY ? 0 : e.val
        }).then(function(e) {
            e.error ? t.alert("网络异常,请稍后重试") : a.carBrandRequest(e);
        }); else {
            y.currCarLeiXing = {
                val: 0,
                valueId: 0
            }, delete y.queryList[y.erscBrand], delete y.queryList[y.erscPrice];
            var r = {
                data: {
                    data: [ null, {
                        itemList: y.erscarDefaultPrice
                    } ]
                }
            };
            this.carBrandRequest(r);
        }
    },
    $e_listItemTap: function(e) {
        var a = e.currentTarget.dataset;
        "list-btn" !== e.target.id && (t.goto(a.url + "&cateId=" + this.urlParams.cateId, !0), 
        a.adclickurl && (console.log(a.adclickurl), wx.request({
            url: a.adclickurl,
            header: {
                "content-type": "application/json"
            },
            success: function(e) {}
        })));
    },
    $e_goToDetail: function(e) {
        var a = e.currentTarget.dataset.url;
        t.goto(a, !0);
    },
    e_hideApply: function() {
        var a = this;
        this.data.resumes.forEach(function(e, t) {
            e.checked = !1, 0 === t && (e.checked = !0, a.data.resumeId = e.name, console.log("e_hideApply", a.data.resumeId));
        }), this.setDataLazy({
            showResumeList: !1,
            resumes: [].concat(e(this.data.resumes))
        });
    },
    $e_apply: t.throttle(1e3, function(e) {
        var a = this;
        this.pageData.infoId = e.target.dataset.infoid, this.pageData.catecode = e.target.dataset.catecode, 
        this.pageData.adclickurl = e.target.dataset.adclickurl, console.log("infoId:", this.pageData.infoId), 
        this.data.applied || t.eventHandle.emit("check-setting", function() {
            a.getResumeInfo().then(function(e) {
                if (e.error) return e.data.msg && t.alert("提示", e.data.msg), void a.e_hideApply();
                a.data.resumeId ? a.data.resumes.length ? a.setDataLazy({
                    showResumeList: !0
                }) : t.confirm("提示", "确定申请此职位？")().then(function(e) {
                    e && a.e_applyJob();
                }) : t.toastError("你还没有简历~");
            });
        });
    }),
    e_resumeRadioChange: function(a) {
        var t = this;
        this.data.resumeId = a.detail.value, this.data.resumes.forEach(function(e) {
            e.checked = !1, e.name === t.data.resumeId && (e.checked = !0);
        }), this.setDataLazy({
            resumes: [].concat(e(this.data.resumes))
        });
    },
    $e_applyJob: function() {
        var e = this;
        t.request("/resume/delivery", {
            infoId: this.pageData.infoId,
            resumeId: this.data.resumeId
        }).then(function(a) {
            e.setDataLazy({
                showResumeList: !1
            }), a.error ? a.data.msg && t.alert("投递失败", a.data.msg) : (e.setDataLazy({
                applied: !0,
                showResumeList: !1
            }), t.toast("投递成功"), 4 != e.pageData.catecode && 5 != e.pageData.catecode || e.pageData.adclickurl && wx.request({
                url: e.pageData.adclickurl,
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {}
            }));
        });
    },
    getResumeInfo: function() {
        var e = this;
        return new Promise(function(a) {
            e.data.resumes.length > 0 ? a({}) : t.request("/resume/trydelivery", {
                infoId: e.pageData.infoId
            }).then(function(t) {
                if (t.error) a(t); else {
                    if (e.data.resumeInfo = t.data, e.data.resumeId = t.data.resumeId, t.data.popData) {
                        var r = t.data.popData.map(function(e) {
                            return {
                                name: e.resumeId,
                                value: e.resumeName
                            };
                        });
                        r.length > 0 && (e.setDataLazy({
                            resumeId: r[0].name
                        }), r[0].checked = !0), e.setDataLazy({
                            resumes: r
                        });
                    }
                    setTimeout(function() {
                        a({});
                    }, 100);
                }
            });
        });
    }
}, s, i, r, n ]);