var t = getApp(), e = [ {
    name: "全国",
    id: 1
}, {
    name: "乡镇",
    id: 2
} ], i = [ {
    id: "-1",
    defaultName: "选择省",
    name: "",
    checked: !0
}, {
    id: "-1",
    defaultName: "选择市",
    name: ""
}, {
    id: "-1",
    defaultName: "选择区/县",
    name: ""
}, {
    id: "-1",
    defaultName: "选择乡镇",
    name: ""
} ], a = require("./template/cityList"), s = require("./template/townList"), n = require("./template/townNav"), c = require("./template/townSearchList");

t.createPage([ {
    methodOptions: {
        e_cityItem: {
            type: "click"
        },
        e_cityNavChange: {
            type: "click"
        },
        e_townItem: {
            type: "click"
        }
    },
    data: {
        pageInfo: {},
        pageName: "city",
        pageType: "list",
        cityList: [],
        searchKey: "",
        currCity: "",
        citySouList: [],
        currDispCityId: "",
        cityNavList: e,
        navCheckedIndex: 0,
        townList: [],
        townDetailList: [],
        townNavList: i,
        scrollTop: 0
    },
    initData: function() {
        this.pageIndex = 1, this.pageNum = 50, this.location = t.storage.getSync(t.constData.STORAGE_GPS_LOCATION_KEY), 
        this.location.cityName && this.urlParams.currDispCityId && this.setDataLazy({
            currCity: this.location.cityName,
            currDispCityId: this.urlParams.currDispCityId
        }), this.getCityList();
    },
    e_scrollToBottom: function() {
        this.pageIndex++, 1 === this.data.navCheckedIndex && !this.data.searchKey || 0 === this.data.navCheckedIndex || 1 !== this.data.navCheckedIndex || this.setDataLazy({
            townList: this.getTownInfoByNum(this.searchTownList)
        });
    },
    e_resetTownScrollTop: function() {
        this.resetScrollTop(this.data.navCheckedIndex);
    },
    e_getScrollTop: function(t) {
        this.scrollTop = t.detail.scrollTop;
    },
    resetScrollTop: function(t) {
        var e = 0 === this.scrollTop ? -1 : 0;
        this.setDataLazy({
            scrollTop: 1 === t ? this.getTownListCheckedId() : e
        });
    },
    $e_cityNavChange: t.throttle(10, function(t) {
        var e = t.target.dataset.index;
        if (this.data.navCheckedIndex !== e && (this.resetScrollTop(e), this.setDataLazy({
            navCheckedIndex: e
        }), 1 === e)) {
            if (this.data.townDetailList.length) return;
            this.getTownList(), this.getTownListById();
        }
    }),
    e_changeCity: function() {
        this.location.cityName && this._citySwitchSucc({
            cityId: this.location.cityId,
            cityName: this.location.cityName,
            dispCityId: this.location.dispCityId
        });
    },
    e_cityInput: t.debounce(300, function(t) {
        var e = this;
        this.resetScrollTop(this.data.navCheckedIndex);
        var i = t.detail.value.trim();
        if (this.setDataLazy({
            searchKey: i
        }), 1 === this.data.navCheckedIndex) return this.setDataLazy({
            townList: []
        }), void setTimeout(function() {
            e.setTownSearchList(i);
        }, 500);
        this.setDataLazy({
            citySouList: []
        }), i && this.getCitySearchList(i);
    }, {
        firstRun: !0,
        lastRun: !0
    }),
    form_reset: function() {
        this.setDataLazy({
            searchKey: "",
            citySouList: [],
            townList: []
        });
    },
    getTownListCheckedId: function() {
        var t = this.data.townNavList.filter(function(t) {
            return !0 === t.checked;
        });
        return t.length && t[0].scrollTop || 0;
    },
    e_cityBtnCancle: function(e) {
        t.goto("/pages/index/index", !1);
    }
}, a, s, n, c ]);