var t = getApp();

module.exports = {
    pageData: {},
    methodOptions: {},
    emptyData: function() {
        this.setDataLazy({
            yxList: [],
            quesList: [],
            loading: !0
        }), this.data.yxList = [], this.data.quesList = [], this.pageData = {
            allList: [],
            type: 0,
            index: 1,
            subId: "",
            hasMore: !1
        };
    },
    e_youXuanInit: t.debounce(500, function(t) {
        console.log("index e_youXuanInit"), this.emptyData(), this.requestYXList(!0, t);
    }),
    loadYXList: t.debounce(100, function(a) {
        var e = this;
        console.log("load index yx"), t.request("" + t.pathData.youxuan.YX_LIST, {
            thirdKey: t.getThirdKey(),
            type: this.pageData.type,
            subId: this.pageData.subId || "",
            index: this.pageData.index
        }).then(function(t) {
            if (a && e.emptyData(), t.data || 0 != t.code) {
                if (wx.hideToast(), !t.error) {
                    var i = t.data;
                    e.pageData = {
                        type: i.type,
                        index: i.index,
                        hasMore: i.hasMore
                    }, 1 === i.type && e.yxDataTransfer(i.rstList), e.data.yxList = e.data.yxList || [], 
                    "10" != i.type ? e.setDataLazy({
                        type: i.type,
                        yxList: e.data.yxList.concat(i.rstList),
                        hasMore: i.hasMore,
                        loading: !1
                    }) : e.setDataLazy({
                        type: i.type,
                        quesList: i.list || [],
                        hasMore: !0,
                        loading: !1
                    });
                }
            } else e.setDataLazy({
                hasMore: !0
            });
        });
    }),
    yxReachBottom: function() {
        if (!this.pageData.hasMore) return !1;
        this.pageData.index++;
        var t = this.pageData.allList.length, a = 10 * this.pageData.index - 10, e = 10 * this.pageData.index > t ? t : 10 * this.pageData.index;
        this.data.yxList = this.data.yxList.concat(this.pageData.allList.slice(a, e)), this.setDataLazy({
            index: this.pageData.index,
            yxList: this.data.yxList.concat(this.pageData.allList.slice(a, e)),
            hasMore: !(10 * this.pageData.index >= t)
        });
    },
    yxDataTransfer: function(t) {
        var a = !0, e = !1, i = void 0;
        try {
            for (var s, n = t[Symbol.iterator](); !(a = (s = n.next()).done); a = !0) {
                var r = s.value;
                r.briefList = [].concat(r.area);
                var o = r.priceUnit ? r.price + "" + r.priceUnit : r.price;
                r.briefList.push(o);
            }
        } catch (t) {
            e = !0, i = t;
        } finally {
            try {
                !a && n.return && n.return();
            } finally {
                if (e) throw i;
            }
        }
    },
    $e_tapToAnswer: function(a) {
        var e = a.currentTarget.dataset.questionId;
        t.goto([ "/pages/wenda/answer/answer", {
            questionId: e
        } ], !0);
    },
    requestYXList: t.debounce(100, function(a, e) {
        var i = this;
        console.log("load index yx"), t.request("https://wxapp.58.com/quick/ilist", {
            thirdKey: t.getThirdKey(),
            cityId: e || t.globalData.cityId
        }).then(function(e) {
            if (a && i.emptyData(), e.data || 0 != e.code) {
                if (wx.hideToast(), !e.error) {
                    var s = e.data;
                    i.pageData = {
                        hasMore: !(s.rstList.length < 10),
                        allList: s.rstList,
                        index: 1
                    }, s.rstList.length > 0 && t.doLogClick({
                        pageType: "58wxindex",
                        pageName: "58wxindex",
                        clickType: "likelistshow",
                        clickName: "e_likelistshow",
                        currentcid: i.data.currDispCityId,
                        cateid: s.rstList.length > 0 && i.pageData.allList[0].cateCode
                    }), i.setDataLazy({
                        yxList: i.data.yxList.concat(s.rstList.slice(0, 10)),
                        hasMore: !(s.rstList.length < 10),
                        index: 1,
                        loading: !1
                    });
                }
            } else i.setDataLazy({
                hasMore: !0
            });
        });
    })
};