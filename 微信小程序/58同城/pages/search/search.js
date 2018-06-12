var t = getApp(), e = "", a = 1, s = {};

Page({
    methodOptions: {},
    data: {
        pageType: "list",
        pageName: "search",
        showSearchResult: !1,
        searchResult: [],
        hotWords: [],
        searchWords: [],
        key: ""
    },
    input: function(t) {
        var e = t.detail.value.trim();
        this.data.key !== e && ("" !== e ? (this.setDataLazy({
            key: e
        }), this.loadSugList(e)) : this.setDataLazy({
            searchResult: [],
            key: ""
        }));
    },
    btnReset: function(t) {
        console.log("reserxq"), this.setDataLazy({
            key: ""
        });
    },
    confirm: function(t) {
        this.submit();
    },
    loadSugList: function(e) {
        var s = this, o = wx.getStorageSync("SUG");
        o && o[e] ? this.setDataLazy({
            searchResult: o[e]
        }) : t.fetch("/sou/suggest", {
            dispCityId: a,
            key: e
        }, function(t, a) {
            var c = a.data.data;
            s.pushSugToStorage(c.key, c.list, o), t || e === c.key && s.setDataLazy({
                searchResult: c.list
            });
        });
    },
    pushSugToStorage: function(t, e, a) {
        (a = a || {})[t] = e, wx.setStorage({
            key: "SUG",
            data: a
        });
    },
    focus: function(t) {
        this.showSearchResult(!0);
    },
    blur: function(t) {
        t.detail.value || this.showSearchResult(!1);
    },
    backPrePage: function() {
        wx.navigateBack();
    },
    cancel: function() {
        console.log("cancel"), this.setDataLazy({
            searchResult: [],
            showSearchResult: !1,
            key: ""
        });
    },
    submit: function() {
        var t = {
            cateid: 0,
            catecode: 0,
            dispcateid: 0,
            key: this.data.key
        };
        Object.keys(s).length > 0 && (t = {
            key: this.data.key,
            cateid: s.cateid,
            catecode: s.catecode,
            dispcateid: s.dispcateid
        }), 0 != t.cateid ? t.key && this.addToHistory(t) : this.getItemInfo(t.key);
    },
    showSearchResult: function(t) {
        this.setDataLazy({
            showSearchResult: t
        });
    },
    tapSugItem: function(t) {
        var e = t.currentTarget.dataset.key;
        this.getItemInfo(e);
    },
    getItemInfo: function(e) {
        var s = this;
        t.fetch("/sou/click", {
            dispCityId: a,
            key: e
        }, function(t, a) {
            if (!t) {
                var o = a.data.data;
                s.addToHistory({
                    key: e,
                    cateid: o.cateId,
                    catecode: o.cateCode,
                    dispcateid: o.dispCateId,
                    dispLocalId: o.dispLocalId
                });
            }
        });
    },
    tapItem: function(t) {
        var e = t.currentTarget;
        this.addToHistory(e.dataset);
    },
    addToHistory: function(t) {
        var e = this.getSearchWordsFromStorage();
        (e = e.filter(function(e) {
            return e.key != t.key;
        })).unshift(t), e.length > 10 && e.pop(), this.setSearchWordsToStorage(e), this.redirectTo(t);
    },
    redirectTo: function(t) {
        var e = "../list/list?key=" + t.key + "&cateId=" + t.cateid + "&cateIdParent=" + t.cateIdParent + "&cateCode=" + t.catecode + "&dispCateId=" + t.dispcateid + "&dispLocalId=" + t.dispLocalId;
        wx.navigateTo({
            url: e
        });
    },
    getSearchWordsFromStorage: function() {
        var e = wx.getStorageSync(t.constData.SEARCH_STORAGE_NAME) || [];
        return Array.isArray(e) || (e = [], this.setSearchWordsToStorage(e)), e;
    },
    setSearchWordsToStorage: function(e) {
        wx.setStorage({
            key: t.constData.SEARCH_STORAGE_NAME,
            data: e
        });
    },
    onLoad: function(o) {
        var c = this;
        s = {}, a = t.globalData.dispCityId, e = t.getThirdKey(), Object.keys(o).length > 0 && (s = {
            cateid: o.cateId ? o.cateId : 0,
            cateIdParent: o.cateIdParent ? o.cateId : 0,
            catecode: o.cateCode ? o.cateCode : 0,
            dispcateid: o.dispCateId ? o.dispCateId : 0
        }), wx.setStorage({
            key: "SUG",
            data: {}
        });
        var i = this.getSearchWordsFromStorage();
        t.fetch("/sou/hotword", {
            dispcityId: a
        }, function(t, e) {
            var a = [];
            t || (a = e.data.data), c.setDataLazy({
                hotWords: a,
                searchWords: i
            });
        });
    },
    onShow: function() {
        wx.setStorageSync("pagetype", "");
    }
});