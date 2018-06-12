var t = getApp();

t.createPage([ {
    methodOptions: {},
    data: {
        pageName: "operator-job-list",
        pageType: "operator",
        list: [],
        hasMore: !0,
        salaryAvg: Math.round(3e3 * Math.random()) + 5e3,
        isIphoneX: !1
    },
    initData: function() {
        return this.setDataLazy({
            industryName: decodeURIComponent(this.urlParams.industryName) || ""
        }), /iPhone X/i.test(wx.getSystemInfoSync().model) && this.setDataLazy({
            isIphoneX: !0
        }), this.getAvgSalary().then(this.loadList);
    },
    e_showAll: function() {
        t.goto([ "/pages/list/list", {
            cateId: this.urlParams.cateId,
            dispCateId: this.urlParams.dispCateId,
            cateCode: 4,
            dispCityId: this.urlParams.dispLocalId,
            cityId: this.urlParams.localId,
            cateIdParent: this.urlParams.preCateId,
            preDispCateId: this.urlParams.preDispCateId
        } ], !0);
    },
    $e_listItemTap: function(a) {
        var e = a.currentTarget.dataset;
        t.goto(e.url + "&cateId=" + this.urlParams.cateId, !0);
    },
    getAvgSalary: function() {
        var a = this;
        return t.request(t.pathData.ACTIVITY_DOMAIN + "/wxa/demand/salary", {
            cateId: this.urlParams.cateId,
            localId: this.urlParams.localId
        }).then(function(t) {
            if (0 === t.code) {
                var e = t.data ? parseInt(t.data) : a.data.salaryAvg;
                a.setDataLazy({
                    salaryAvg: e
                }), a._priceRange = e + "_9999999", a._price = e + "_9999999", a._prePrice = "0_" + (e - 1);
            }
        });
    },
    loadList: function(a) {
        var e = this;
        return t.requestPost(t.pathData.LIST_PATH, {
            cityId: this.urlParams.localId,
            cateCode: 4,
            cateId: this.data.showEmptyInfo ? "574" : this.urlParams.cateId,
            dispCateId: this.urlParams.dispCateId,
            pageNum: 1,
            key: "",
            queryList: {
                5354: this._priceRange,
                cate: this.data.showEmptyInfo ? "574" : this.urlParams.cateId
            }
        }, {
            show: !0
        }).then(function(t) {
            if (t.error) e.data.showEmptyInfo || (e.data.showEmptyInfo = !0, e.loadList()); else {
                var a = e.dataTransfer(t);
                if (a.length < 35 && e._priceRange !== e._prePrice) e._priceRange = e._prePrice, 
                e.loadList(); else if (0 == a.length && 0 == e.data.list.length && !e.data.showEmptyInfo) return e._priceRange = e._price, 
                e.data.showEmptyInfo = !0, void e.loadList();
                e.data.showEmptyInfo = !1, e.setDataLazy({
                    list: e.data.list.concat(a)
                });
            }
        });
    },
    dataTransfer: function(t) {
        var a = (t = t || {}).data || {};
        a.rstList = a.rstList || [];
        var e = !0, r = !1, s = void 0;
        try {
            for (var i, o = a.rstList[Symbol.iterator](); !(e = (i = o.next()).done); e = !0) {
                var n = i.value;
                n.briefList && n.briefList.length > 0 && (n.briefList = [].concat(n.briefList).filter(function(t) {
                    return !!t;
                }));
            }
        } catch (t) {
            r = !0, s = t;
        } finally {
            try {
                !e && o.return && o.return();
            } finally {
                if (r) throw s;
            }
        }
        return a.rstList;
    },
    onShareAppMessage: function() {
        return {
            title: "我该涨薪多少？点此查询>>",
            desc: "",
            path: "/pages/operators/job/job"
        };
    }
}, require("../../../../utils/verify")(), require("../../../common/tel/index") ]);