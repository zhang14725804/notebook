function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    var s = r.default.save(e), c = [].concat(s), o = {
        searchHistory: {
            list: c = this.formatData(c, "history", 6),
            title: "搜索历史"
        }
    };
    t.dispatch(a.default.updateSearchState(o));
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = e(require("./searchLayoutAction")), r = e(require("../service/searchRecordService")), s = e(require("../../common/polyfill/promise")), c = (e(require("../../components/service/search")), 
e(require("../../common/source/videoUtil")), require("../../common/form/form")), o = e(require("../../common/utils/util"));

exports.default = {
    suggestCache: {},
    showSearchLayout: function(e) {
        var t = this, r = this.store.getState().searchLayout, s = e.currentTarget.dataset.rseat || "", o = e.detail.formId;
        (0, c.collectFormIdMuti)(o, s);
        var i = {
            search: Object.assign(r.search || {}, {
                keyword: ""
            }),
            fixed: !1,
            focus: !0,
            clearState: !1,
            showsearch: !1
        };
        s && this.clickPingback({
            block: "",
            rseat: "" + s
        }), this.store.dispatch(a.default.showHideSearchLayout(!0, "container-overflow-hidden", i)), 
        r.hotquery && r.hotquery.list && !r.hotquery.list.length && this.loadSearchData().then(function(e) {
            var r = t.searchDataHandle(e), s = {
                searchHistory: {
                    list: r.searchRecordData,
                    title: "搜索历史"
                },
                hotquery: {
                    list: r.hotquery,
                    title: "热门搜索"
                }
            };
            t.store.dispatch(a.default.updateSearchState(s));
        }, function() {});
    },
    hideSearchLayout: function() {
        var e = this.store.getState().searchLayout, t = this.store.getState().searchLayout.search, r = !1, s = {
            clearState: !0,
            focus: !1
        };
        "result" == (e.page || "") ? (r = !0, s.showcancel = !1, s.showResult = !0, s.fixed = !0, 
        s.clearState = !1, t.keyword = e.keyword, s.search = t) : (s.fixed = !1, wx.hideKeyboard()), 
        this.store.dispatch(a.default.showHideSearchLayout(r, "", s));
    },
    searchInputChange: function(e) {
        var t = e.detail.value || "", r = this.store.getState().searchLayout, s = {
            search: Object.assign({}, r.search)
        };
        if (t) {
            if (!t.trim()) return;
            s.clearState = !0, s.showsearch = !0, this.store.dispatch(a.default.updateSearchState(s)), 
            this.loadSuggest(t, {}, "", "");
        } else s.showsearch = !1, this.clearInput();
    },
    clearInput: function() {
        var e = this.store.getState().searchLayout, t = {
            search: Object.assign(e.search, {
                keyword: ""
            }),
            defaultSearch: !0,
            suggestSearch: !1,
            clearState: !1,
            showsearch: !1,
            focus: !0
        };
        this.store.dispatch(a.default.updateSearchState(t)), this.setData({
            keyword: ""
        });
    },
    clearSearchHistory: function(e) {
        var t = this, r = {
            searchHistory: {
                list: [],
                title: "搜索历史"
            }
        }, s = e.currentTarget.dataset.rseat || "", i = e.detail.formId;
        (0, c.collectFormIdMuti)(i, s), wx.showModal({
            title: "确认删除搜索历史",
            content: "",
            success: function(e) {
                e.confirm ? (o.default.storage.handleStorageMuti("set", "SEARCH_RECORD", []), t.store.dispatch(a.default.updateSearchState(r))) : e.cancel;
            }
        });
    },
    blurhandle: function(e) {
        var t = this.store.getState().searchLayout, r = e.detail.value || "", s = {
            search: Object.assign(t.search, {
                keyword: r
            })
        };
        this.store.dispatch(a.default.updateSearchState(s));
    },
    toSearchResult: function(e) {
        var t = this, a = e.detail.formId, r = e.currentTarget.dataset.rseat || "";
        (0, c.collectFormIdMuti)(a, r), setTimeout(function() {
            t.toSearchResultHandle.bind(t, e)();
        }, 50);
    },
    toSearchResultHandle: function(e) {
        var r = this, s = this.store.getState().searchLayout, c = s.page || "", o = e.detail.value || s.search.keyword || "", i = e.currentTarget.dataset.query || o, h = e.currentTarget.dataset.source || "", u = e.currentTarget.dataset.index || "", d = e.currentTarget.dataset.vfrm || "", n = e.currentTarget.dataset.key || "", l = e.currentTarget.dataset.defaultkey || "", f = e.currentTarget.dataset.rseat || "";
        if (h) {
            if (!i.trim()) {
                if (!l) return void wx.hideKeyboard();
                i = l;
            }
        } else if (o) {
            if (o && !o.trim()) return void wx.hideKeyboard();
        } else i = l;
        s.search.keyword = i, s.search.pageNum = 1, s.search.source = h, s.search.vfrm = d, 
        s.search.pos = u, t.bind(this)(i, this.store), f && this.clickPingback({
            block: "",
            rseat: "" + f
        }), "result" == c ? (this.store.dispatch(a.default.updateSearchState({
            overflow: "",
            showcancel: !1,
            clearState: !1,
            keyword: i,
            showResult: !0,
            fixed: !0,
            focus: !1,
            search: s.search
        })), this.store.dispatch(a.default.resetResults()), this.loadVideoPage(s.search), 
        this.setData({
            keyword: i
        })) : (this.store.dispatch(a.default.updateSearchState({
            search: s.search
        })), this.hideSearchLayout(), wx.navigateTo({
            url: "/subPackage/pages/searchResult/searchResult?query=" + i + "&rfr=" + r.data.rpage + "&vfrm=" + d + "&key=" + n + "&pos=" + u + "&source=" + h
        }));
    },
    inputFocus: function(e) {
        var t = this, r = (e.detail.value, this.store.getState().searchLayout), s = r.page || "", c = r.search.keyword || "", o = (r.suggest && r.suggest.length, 
        {
            focus: !0,
            showResult: !1,
            defaultSearch: !0,
            suggestSearch: !1
        });
        "result" == s ? (o.showcancel = !0, c ? (o.clearState = !0, o.defaultSearch = !1, 
        o.suggestSearch = !0, o.showsearch = !0, o.overflow = "container-overflow-hidden", 
        o.fixed = !1, this.loadSuggest(c, o, s, "focusevent")) : (r.hotquery && r.hotquery.list && !r.hotquery.list.length && this.loadSearchData().then(function(e) {
            var r = t.searchDataHandle(e), s = {
                searchHistory: {
                    list: r.searchRecordData,
                    title: "搜索历史"
                },
                hotquery: {
                    list: r.hotquery,
                    title: "热门搜索"
                }
            };
            t.store.dispatch(a.default.updateSearchState(s));
        }, function() {}), o.clearState = !1, this.store.dispatch(a.default.updateSearchState(o)), 
        this.store.dispatch(a.default.showHideSearchLayout(!0, "container-overflow-hidden", {
            fixed: !1,
            defaultSearch: !0,
            suggestSearch: !1
        })))) : this.store.dispatch(a.default.updateSearchState(o));
    },
    format: function(e, t) {
        return e.forEach(function(e, t) {
            e.key = encodeURIComponent(e.name), e.index = t + 1;
        }), e.slice(0, t);
    },
    formatData: function(e, t, a) {
        var r = {
            0: "one",
            1: "two",
            2: "three",
            3: "four",
            4: "five",
            5: "six"
        };
        return e && e.length && (e.map(function(a, s) {
            if ("hot" == t) a.name = a.query, a.source = t, a.vfrm = "2-3-0-1", a.itemClass = "search-layer-list-items-" + r["" + s], 
            a.key = decodeURIComponent(a.name), a.index = s + 1; else {
                var c = {};
                c.source = t, c.vfrm = "2-3-0-1", c.name = c.query = a, c.key = decodeURIComponent(a), 
                c.index = s + 1, e[s] = c;
            }
        }), a) ? e.slice(0, a) : e;
    },
    loadSuggest: function(e, t, r, s) {
        var c = this;
        if (this.suggestCache[e] && this.suggestCache[e].length) {
            var o = {
                defaultSearch: !1,
                suggestSearch: !0
            };
            "result" == r && s && this.store.dispatch(a.default.updateSearchState(t)), this.store.dispatch(a.default.showSuggestSearch(this.suggestCache[e])), 
            this.store.dispatch(a.default.updateSearchState(o));
        } else this.loadSuggestList(e).then(function(o) {
            var i = c.suggestDataHandle(o);
            "result" == r && s && c.store.dispatch(a.default.updateSearchState(t));
            var h = {
                defaultSearch: !1,
                suggestSearch: !0
            };
            i.length ? (c.suggestCache[e] = i, c.store.dispatch(a.default.showSuggestSearch(i))) : h = {
                defaultSearch: !0,
                suggestSearch: !1,
                suggest: []
            }, c.store.dispatch(a.default.updateSearchState(h));
        }, function() {
            var e = {
                defaultSearch: !0,
                suggestSearch: !1,
                suggest: []
            };
            "result" == r && s && (e = Object.assign({}, t, e)), c.store.dispatch(a.default.updateSearchState(e));
        });
    },
    suggestDataHandle: function(e) {
        var t = [];
        return e.data && e.data.length && ((t = e.data).map(function(e, t) {
            return e.source = "suggest", e.vfrm = "2-3-3-1", e;
        }), t = this.format(t, 10)), t;
    },
    searchDataHandle: function(e) {
        var t = o.default.storage.handleStorageMuti("get", "SEARCH_RECORD") || [], a = [];
        return t = this.formatData(t, "history", 6), !e.is_empty && e.data && e.data.length && (a = e.data, 
        a = this.formatData(a, "hot", 6)), {
            hotquery: a,
            searchRecordData: t
        };
    },
    loadSearchData: function() {
        return new s.default(function(e, t) {
            wx.request({
                url: "https://search.video.iqiyi.com/m",
                method: "GET",
                data: {
                    if: "hotQuery",
                    p: 0,
                    from: "weixin_mini_program"
                },
                success: function(a) {
                    var r = a.data;
                    r && r.data ? e(r) : t(a);
                },
                fail: t
            });
        });
    },
    loadSuggestList: function(e) {
        return new s.default(function(t, a) {
            wx.request({
                url: "https://suggest.video.iqiyi.com/",
                method: "GET",
                data: {
                    key: e,
                    ppuid: "",
                    uid: "",
                    platform: 31,
                    if: "mobile",
                    from: "weixin_mini_program"
                },
                success: function(e) {
                    var r = e.data;
                    r && r.data ? t(r) : a(e);
                },
                fail: a
            });
        });
    },
    getSearchRecords: function() {
        return r.default.getAll();
    },
    saveSearchRecord: t
};