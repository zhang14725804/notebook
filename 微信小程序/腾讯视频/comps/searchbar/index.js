function t(t, r) {
    return r = r || 2, (t || []).reduce(function(a, e, s) {
        return s % r == 0 && a.push({
            id: s,
            columns: [],
            last: s >= t.length - r
        }), a[a.length - 1].columns.push(e), a;
    }, []);
}

var r = require("../../module/fns.js"), a = require("../../module/component.js"), e = require("../../module/cache.js"), s = require("../../module/es6-promise.js");

module.exports = a("searchbar", function() {
    return {
        data: {
            hideSmart: !0,
            smartResults: [],
            rank: [],
            word: "",
            word2: "",
            history: [],
            histRows: [],
            autofocus: !0,
            isAndroid: !1,
            focus: !1,
            isFocus: !1
        },
        onLoad: function() {
            var t = this;
            wx.getSystemInfo({
                success: function(r) {
                    if (!/\bios\b/i.test(r.system)) {
                        t.$setData("searchbar", {
                            isAndroid: !0
                        });
                        var a, e = t._toSearch;
                        t._toSearch = function() {
                            var t = arguments, r = this;
                            a && clearTimeout(a), a = setTimeout(function() {
                                e.apply(r, t);
                            }, 100);
                        };
                    }
                }
            }), (this.$take("searchbar:prefetch") || this._fetchSearchRank()).then(function(r) {
                r && r.itemList && r.itemList.length && (e.set("search_rank", r, 6e5, !0), t.$setData("searchbar", {
                    rank: r.itemList
                }));
            }, function(t) {
                console.error("[Search] fetchSearchRank:fail", t);
            }).catch(function(t) {
                console.error("[Search] fetchSearchRank:error", t);
            });
        },
        onShow: function() {
            var r = wx.getStorageSync("searchbar_history");
            this.$setData("searchbar", {
                history: r || [],
                histRows: t(r || [])
            });
        },
        onSearchbarInput: function(t) {
            var r = this;
            t.detail.value && this.data.searchbar.word2 || this.$setData("searchbar", {
                word2: t.detail.value
            }), this.$setData("searchbar", {
                word: t.detail.value
            }), clearTimeout(this._searchbarSmartTimer), this._searchbarSmartTimer = setTimeout(function() {
                r.data.searchbar.word.trim() ? r.fetchSearchSmart() : r.$setData("searchbar", {
                    smartResults: []
                });
            }, 100);
        },
        onSearchbarFocus: function() {
            this.$setData("searchbar", {
                isFocus: !0
            }), this.data.searchbar.word.trim() ? this.fetchSearchSmart() : this.$setData("searchbar", {
                smartResults: []
            });
        },
        onSearchbarBlur: function() {
            this.$setData("searchbar", {
                isFocus: !1
            });
        },
        onSearchbarConfirm: function(t) {
            this.data.searchbar.word.trim() && this._toSearch(this.data.searchbar.word);
        },
        onSearchButtonClick: function() {
            this._toSearch(this.data.searchbar.word);
        },
        onSearchbarTrigger: function(t) {
            var r = t.currentTarget.dataset;
            this._toSearch(r.value, !r.correct, !0), this.$core.stat(t);
        },
        onSearchbarCancel: function() {
            this.onSearchCancel && this.onSearchCancel(), this.$core.boss.click("search_cancel");
        },
        onSearchbarClear: function() {
            this.$setData("searchbar", {
                focus: !1,
                word: "",
                word2: "",
                smartResults: []
            }), this.$setData("searchbar", {
                focus: !0
            }), this.onSearchClear && this.onSearchClear(), this.$core.boss.click("search_clear");
        },
        onSearchbarHistoryDel: function() {
            var t = this;
            wx.showModal({
                title: "确认删除搜索历史",
                content: "",
                success: function(r) {
                    r.confirm && (wx.setStorageSync("searchbar_history", null), t.$setData("searchbar", {
                        history: [],
                        histRows: []
                    }), t.$core.boss.click("search_history_clear"));
                }
            });
        },
        onSearchbarHistoryItemClick: function(t) {
            this._searchbarHistoryLongTap || this.onSearchbarTrigger(t);
        },
        onSearchbarHistoryItemDel: function(r) {
            var a = this, e = r.currentTarget.dataset.value;
            a._searchbarHistoryLongTap = !0;
            var s = setTimeout(function() {
                a._searchbarHistoryLongTap = !1;
            }, 5e3);
            wx.showModal({
                title: "确认删除该条搜索记录",
                content: "",
                success: function(r) {
                    if (clearTimeout(s), a._searchbarHistoryLongTap = !1, r.confirm) {
                        var c = a.data.searchbar.history.reduce(function(t, r) {
                            return r != e && t.push(r), t;
                        }, []);
                        wx.setStorageSync("searchbar_history", c), a.$setData("searchbar", {
                            history: c,
                            histRows: t(c)
                        });
                    }
                },
                fail: function() {
                    clearTimeout(s), a._searchbarHistoryLongTap = !1;
                }
            });
        },
        search: function() {
            this._toSearch.apply(this, arguments);
        },
        _toSearch: function(r, a, e) {
            if (r = (r || "").trim()) {
                var s = this.data.searchbar.history.reduce(function(t, a) {
                    return a !== r && t.push(a), t;
                }, []);
                s.unshift(r), s = s.slice(0, 8), this.$setData("searchbar", {
                    hideSmart: !0,
                    word: r,
                    word2: r
                }), e ? setTimeout(function() {
                    this.$setData("searchbar", {
                        history: s,
                        histRows: t(s)
                    });
                }.bind(this), 200) : this.$setData("searchbar", {
                    history: s,
                    histRows: t(s)
                }), wx.setStorageSync("searchbar_history", s), this.onSearch && this.onSearch(r, a);
            }
        },
        fetchSearchSmart: r.lock(function(t) {
            this.$core.vaccess("search_smart", {
                channelId: "",
                keyWord: this.data.searchbar.word.trim(),
                searchDatakey: ""
            }).then(function(a) {
                "string" == typeof a && (a = a.replace(/^data=/, ""), a = JSON.parse(a.replace(/\u0005/g, "\\u0005").replace(/\u0006/g, "\\u0006")).data), 
                a && a.smartItemList && a.smartItemList.length && this.setData({
                    showLayout: !0,
                    "searchbar.hideSmart": !1,
                    "searchbar.smartResults": a.smartItemList.map(function(t) {
                        return {
                            text: r.hltext(t.poster.firstLine),
                            poster: t.poster,
                            id: t.imageUiType + ":" + t.poster.firstLine
                        };
                    })
                }), setTimeout(t, 200);
            }.bind(this), function(r) {
                t(), console.error("[Search] fetchSearchSmart:fail", r);
            }).catch(function(r) {
                t(), console.error("[Search] fetchSearchSmart:error", r);
            });
        }),
        searchbarRevert: function() {
            this.$setData("searchbar", {
                hideSmart: !0,
                smartResults: [],
                word: "",
                word2: ""
            });
        },
        setSearchInput: function(t) {
            this.$setData("searchbar", {
                word2: t
            });
        },
        _fetchSearchRank: function() {
            var t = this;
            return new s(function(r, a) {
                e.get("search_rank", function(e, s) {
                    s ? r(s) : t.$core.vaccess("search_rank", {
                        channdlId: "",
                        searchDatakey: ""
                    }).then(r, a);
                });
            });
        }
    };
});