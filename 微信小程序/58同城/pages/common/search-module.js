module.exports = function() {
    var t = "", e = 0, a = {}, s = !1, r = getApp();
    return {
        methodOptions: {
            e_searchTap: {
                type: "search"
            },
            e_submit: {
                type: "search"
            },
            e_backPrePage: {
                type: "search"
            }
        },
        _onReady: function() {
            var t = this;
            r.eventHandle.on("search-click", function() {
                t.$e_searchTap();
            });
        },
        $e_searchTap: function() {
            s = !1, this.setDataLazy({
                isSearchModuleShow: !1,
                showSearchResult: !1,
                key: "",
                currFilter: ""
            }), console.log(this.data.searchParams), this.onSearchShow(this.data.searchParams || {});
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
            this.data.key && this.setDataLazy({
                key: "",
                searchResult: []
            });
        },
        loadSugList: r.debounce(200, function(t) {
            var a = this, s = wx.getStorageSync(r.constData.STORAGE_PREFIX);
            s && s[t] && s[t].length ? this.setDataLazy({
                searchResult: s[t]
            }) : r.request(r.pathData.SUGGEST_URL, {
                dispCityId: e,
                key: t
            }).then(function(e) {
                if (e.error) r.alert("网络异常,请稍后重试"); else {
                    var i = e.data;
                    a.pushSugToStorage(i.key, i.list, s), t === i.key && a.setDataLazy({
                        searchResult: i.list
                    });
                }
            });
        }),
        pushSugToStorage: function(t, e, a) {
            (a = a || {})[t] = e, wx.setStorage({
                key: r.constData.STORAGE_PREFIX,
                data: a
            });
        },
        focus: function(t) {
            this.showSearchResult(!0);
        },
        blur: function(t) {
            t.detail.value || this.showSearchResult(!1);
        },
        $e_backPrePage: function() {
            this.setDataLazy({
                key: "",
                searchResult: [],
                isSearchModuleShow: !0
            });
        },
        cancel: function() {
            this.setDataLazy({
                searchResult: [],
                key: ""
            });
        },
        $e_submit: r.throttle(2e3, function() {
            var t = this.data, e = t.key, i = t.initSearchData;
            if (!(e = (e || "").trim())) {
                if (i && i.isDefault) return s = !0, void this.addToHistory(i);
                if (i && !i.key || !i) return void this.setDataLazy({
                    key: this.data.key
                });
                e = i.key;
            }
            s = !0;
            var o = this.setSearchFormatData({
                key: e,
                value: this.subSearchValue(e)
            });
            if (Object.keys(a).length > 0 && (o = this.setSearchFormatData(Object.assign({}, a, {
                key: this.data.key,
                value: this.subSearchValue(this.data.key)
            }))), 0 == o.cateCode) return this.getItemInfo(o.key, o), r.storage.setSync("listJump", !0), 
            void this.redirectTo(o);
            o.key && this.addToHistory(o);
        }),
        showSearchResult: function(t) {
            this.setDataLazy({
                showSearchResult: t
            });
        },
        tapSugItem: r.throttle(1e3, function(t) {
            var e = t.currentTarget.dataset.item;
            this.getItemInfo(e.searchName, {
                key: e.searchName,
                value: this.subSearchValue(e.dispName)
            }, !0);
        }),
        getItemInfo: function(t) {
            var a = this, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, i = arguments[2];
            r.request(r.pathData.ITEMINFO_URL, {
                dispCityId: e,
                key: t,
                cateCode: this.getItemInfoCateCode(i) || 0
            }).then(function(e) {
                if (e.error) r.alert("网络异常,请稍后重试"); else {
                    var i = e.data;
                    if (i) {
                        var o = a.setSearchFormatData(Object.assign({
                            key: t
                        }, s, i));
                        a.addToHistory(o);
                    }
                }
            });
        },
        getItemInfoCateCode: function(t) {
            var e = 0;
            return (-1 !== r.getPageRoute().indexOf("pages/cate-list/cate-list") && !t && 4 == this.urlParams.cateCode || -1 !== r.getPageRoute().indexOf("pages/list/ist")) && (e = this.urlParams.cateCode), 
            e;
        },
        setSearchFormatData: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return {
                cateId: parseInt(t.cateId) || 0,
                cateCode: parseInt(t.cateCode) || 0,
                dispCateId: parseInt(t.dispCateId) || 0,
                cateIdParent: parseInt(t.cateIdParent) || 0,
                key: t.key || t.searchName || "",
                value: t.value || t.dispName || "",
                dispLocalId: t.dispLocalId || 0,
                checkedCateId: t.checkedCateId || ""
            };
        },
        tapItem: function(t) {
            var e = t.currentTarget.dataset;
            this.addToHistory(this.setSearchFormatData(e.item), e.isHistory);
        },
        addToHistory: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            if (t.key) {
                var a = this.getSearchWordsFromStorage(), s = void 0;
                if (s = a.filter(function(e) {
                    return e.key !== t.key;
                }), e) {
                    var i = a.filter(function(e) {
                        return e.key === t.key;
                    });
                    t = i[0];
                }
                s.unshift(Object.assign({}, t, {
                    dispLocalId: 0
                })), s.length > r.constData.SEARCH_WORDS_MAX_NUMBER && s.pop(), this.setSearchWordsToStorage(s);
            }
            r.storage.getSync(r.constData.LIST_SOU_JUMP) ? r.storage.getSync(r.constData.LIST_READY) ? r.eventHandle.emit("sou-click-complete", t) : setTimeout(function() {
                r.eventHandle.emit("sou-click-complete", t);
            }, 800) : this.redirectTo(t);
        },
        redirectTo: function(t) {
            this.setDataLazy({
                searchResult: []
            });
            var i = r.getPageRoute(0);
            i.indexOf("list/list") >= 0 && 0 != a.cateCode && s ? this._listSearchDeal && this._listSearchDeal() : (i.indexOf("/index/index") >= 0 && this.setData({
                isSearchModuleShow: !0
            }), r.goto([ "../list/list", Object.assign({}, t, {
                cityId: this.urlParams.cityId || r.globalData.cityId,
                dispCityId: e,
                value: this.subSearchValue(t.key)
            }) ], !(0 == a.cateCode || i.indexOf("list/list") >= 0)));
        },
        subSearchValue: function() {
            return (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "").replace(/(.{7})(.+)(.{7})/, "$1...$3");
        },
        getSearchWordsFromStorage: function() {
            var t = wx.getStorageSync(r.constData.SEARCH_STORAGE_NAME) || [];
            return Array.isArray(t) || (t = [], this.setSearchWordsToStorage(t)), t;
        },
        setSearchWordsToStorage: function(t) {
            wx.setStorage({
                key: r.constData.SEARCH_STORAGE_NAME,
                data: t
            });
        },
        onSearchShow: function(s) {
            var i = this;
            s = s || {}, a = {}, e = r.globalData.dispCityId || this.urlParams.dispCityId, t = r.getThirdKey(), 
            Object.keys(s).length > 0 && (a = {
                cateId: s.cateId ? s.cateId : 0,
                cateIdParent: s.cateIdParent ? s.cateIdParent : 0,
                cateCode: s.cateCode ? s.cateCode : 0,
                dispCateId: s.dispCateId ? s.dispCateId : 0,
                checkedCateId: s.checkedCateId
            }), wx.setStorage({
                key: r.constData.STORAGE_PREFIX,
                data: {}
            });
            var o = this.getSearchWordsFromStorage();
            r.request(r.pathData.HOTWORDS_URL, {
                dispCityId: e
            }).then(function(t) {
                if (t.error) r.alert("网络异常,请稍后重试"); else {
                    var e = [];
                    !t.error && t.data && (e = t.data), i.setDataLazy({
                        hotWords: e,
                        searchWords: o
                    });
                }
            });
            s.cateCode && s.cateCode;
        }
    };
};