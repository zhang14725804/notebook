var t = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (t[s] = e[s]);
    }
    return t;
}, a = getApp();

a.createPage({
    methodOptions: {},
    data: {
        pageName: "operator-job",
        pageType: "operator",
        list: [],
        showSelect: !1,
        searchModel: {
            cateId: "",
            localId: "",
            industryName: ""
        },
        formData: {}
    },
    initData: function() {},
    _preList: null,
    e_showSelect: a.throttle(1e3, function(a) {
        if (!this.data.dataLoading) {
            this.setDataLazy({
                listData: []
            }), this.data.dataLoading = !0;
            var e = a.currentTarget.dataset, s = e.type, i = {
                showSelect: !0,
                listTitle: e.title,
                listName: s
            };
            switch (s) {
              case "city":
                this.showCityList(t({}, i));
                break;

              case "industry":
                this.showIndustryList(i);
            }
        }
    }),
    showCityList: function(e, s) {
        var i = this, r = function(a) {
            i.setDataLazy(t({}, e, {
                listData: a,
                dataLoading: !1
            }));
        };
        this.data.cityList ? r(this.data.cityList) : a.request(a.pathData.ACTIVITY_DOMAIN + "/wxa/wxsub/locallist", {
            thirdKey: a.getThirdKey()
        }).then(function(t) {
            if (t.error) a.alert("网络异常,请稍后重试"); else {
                var e = t.data.cityList || [];
                i.data.cityList = e.map(function(t) {
                    return {
                        other: t,
                        key: t.dispLocalId,
                        value: t.name
                    };
                }), s ? s(t.data) : r(i.data.cityList);
            }
        });
    },
    showIndustryList: function(t, e) {
        var s = this;
        this.setDataLazy({
            listData: []
        }), a.request(a.pathData.ACTIVITY_DOMAIN + (e ? "/wxa/wxsub/catelist" : "/wxa/wxsub/zplist"), {
            dispCateId: e
        }).then(function(a) {
            if (s.data.dataLoading = !1, a.error) errorCb(); else {
                a.data = a.data || [];
                var e = a.data.map(function(t) {
                    return {
                        other: t,
                        key: t.dispCateId,
                        value: t.name
                    };
                });
                s._industryList || (s._industryList = e), s.setDataLazy([ {
                    listData: e
                }, t ]);
            }
        });
    },
    e_listItemClick: function(a) {
        var e = this, s = {
            showSelect: !1
        }, i = a.currentTarget.dataset, r = i.key, d = i.name, o = i.value, h = i.other;
        this.data.formData[d] = r, this.data.formData[d + "_value"] = o, this.data.formData[d + "_other"] = h;
        switch (d) {
          case "city":
            if ("-1" === r.toString()) return;
            this.data.searchModel.localId = h.localId, this.data.searchModel.dispLocalId = h.dispLocalId;
            break;

          case "industry":
            if (!this._preList) return this.data.searchModel.preCateId = h.cateId, this.data.searchModel.preDispCateId = h.dispCateId, 
            e._preList = e.data.listData, e._preSelectData = {
                key: r,
                name: d,
                value: o,
                other: h
            }, this.showIndustryList({}, r);
            this.data.formData.industry = {
                data: [ this._preSelectData.other, h ]
            }, this.data.searchModel.cateId = h.cateId, this.data.searchModel.dispCateId = h.dispCateId, 
            this.data.searchModel.industryName = h.name;
        }
        this._preList = null, this._preSelectData = null, this.setDataLazy(t({}, s, {
            formData: t({}, this.data.formData)
        }));
    },
    e_listBack: function(t) {
        this.setDataLazy({
            listData: this._preList,
            showSelect: !!this._preList
        }), this._preList && (this._preList = null, this._preSelectData = null);
    },
    e_search: function() {
        this.data.searchModel.cateId && this.data.searchModel.localId ? a.goto([ "/pages/operators/job/list/list", this.data.searchModel ], !0) : a.alert("提示", "请选择行业以及城市");
    },
    onShareAppMessage: function() {
        return {
            title: "我该涨薪多少？点此查询>>",
            desc: "",
            path: "/pages/operators/job/job"
        };
    }
});