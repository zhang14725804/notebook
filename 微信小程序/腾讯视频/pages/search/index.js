var e = require("../../module/fns.js"), t = require("../../module/component.js"), r = [ "secondLine", "thirdLine", "fourthLine" ];

module.exports = t(function(t) {
    return {
        data: {
            showLayout: !0,
            showSearch: !1,
            showSearchResult: !0,
            searchLoading: !1,
            searchLoadingPos: "top",
            pageContext: "",
            keyWord: "",
            searchResults: [],
            searchScrollTop: 0,
            searchFilters: [],
            searchFilter: {},
            searchFilterToggleCursor: 0,
            searchFilterScrolls: {},
            worksScrollTop: 0,
            searchOpacity: 0
        },
        comps: [ require("../../comps/searchbar/index.js")() ],
        onLoad: function(e) {
            if ("true" === e.search && (this.onSearchShow(null, !1), e.searchkey)) {
                var t = decodeURIComponent(e.searchkey);
                this.setSearchInput(t), this.onSearch(t);
            }
        },
        onSearch: e.lock(function(t, s, a, i, o) {
            var c = this;
            if (/^[:：]/.test(s)) switch (s) {
              case ":egg":
              case "：egg":
                return f = !0, this.$route("egg"), t();
            }
            var h = (i = i || {}).pageContext || "", n = i.searchSession || "", u = !!h, l = e.queryStringify(i.filter || {}, "&", !0), d = s !== this.data.keyWord;
            this._needCorrect = a, d && this.searchFilterHide(), this.setData({
                showLayout: !1,
                searchLoading: !0,
                searchLoadingPos: h ? "bottom" : "top"
            });
            var f, g = this._onSearchAbort = function() {
                f || (f = !0, c.setData({
                    searchLoading: !1
                }), t());
            };
            (function() {
                this.$core.vaccess("search", {
                    channelId: "",
                    expansion: "",
                    filterValue: l,
                    isNeedCorrect: "undefined" == e.type(a) || a,
                    keyWord: s,
                    pageContext: h,
                    searchDatakey: "",
                    searchSession: n
                }).then(function(h) {
                    if (!f) {
                        if ((!h || h.errCode || !h.uiData) && !o) return t(), void c.onSearch(s, a, i, !0);
                        var n, d = h.pageContext, p = h.searchSession;
                        if (!h.uiData) return g();
                        if (!u && !l) {
                            var S = {}, m = h.filter ? h.filter.filterItemList || [] : [];
                            m.forEach(function(e) {
                                e.optionList.forEach(function(t) {
                                    t.isSelected && (S[e.fileterItemKey] = t.optionValue);
                                });
                            }), m.length && c.setData({
                                searchFiltersHead: [ m.shift() ],
                                searchFilters: m,
                                searchFilter: S,
                                searchFilterScrolls: {}
                            });
                        }
                        c._searchPageContext = d, c._searchSearchSession = p, h.uiData.length && (n = !0, 
                        h = h.uiData.map(function(t) {
                            switch (t.modId = t.groupId + ":" + t.lineId, t.itemType = t.item.itemType, t.item = JSON.parse(t.item.data), 
                            t.itemType) {
                              case 5:
                              case 15:
                                var s = t.item.poster, a = t.item.lineLabel;
                                s.lines = r.reduce(function(e, t, r) {
                                    return s[t] && e.push({
                                        idx: r,
                                        text: s[t]
                                    }), e;
                                }, []);
                                var i = s.lines.length;
                                if (i < 4 && a && a.length) {
                                    var o = a.map(function(e, t) {
                                        return {
                                            idx: 4 + t,
                                            text: e
                                        };
                                    }).slice(0, 4 - i);
                                    s.fourthLine ? s.lines.splice.apply(s.lines, [ -1, 0 ].concat(o)) : s.lines = s.lines.concat(o);
                                }
                                t.item.videoList && (t.item.videoList = t.item.videoList.map(function(e) {
                                    return {
                                        action: e.action,
                                        poster: {
                                            firstLine: e.poster.firstLine,
                                            markLabelList: e.poster.markLabelList
                                        }
                                    };
                                }));
                                break;

                              case 43:
                                t.item.lines;
                                var c = t.item.posterList;
                                c && c.forEach(function(t) {
                                    t.firstLine = e.hltext(t.firstLine);
                                });
                                break;

                              case 82:
                                break;

                              case 51:
                                var h = t.item && t.item.poster && t.item.poster.firstLine;
                                h && (t.item.poster.firstLine = e.hltext(h));
                            }
                            return 15 == t.itemType && (s.configstrs.hid ? (/^txvideo:/.test(t.item.action.url) && (t.item.action.url = "star?id=" + s.configstrs.hid), 
                            t.modType = "person") : t.modType = "other"), t;
                        })), !u && n && c.setData({
                            searchScrollTop: 1
                        }), console.log("[Search]", h), c.setData({
                            keyWord: s,
                            showLayout: !1,
                            searchResults: u ? c.data.searchResults.concat(h) : h
                        }), g(), !u && n && (setTimeout(function() {
                            c.setData({
                                searchScrollTop: 0
                            });
                        }, 100), setTimeout(function() {
                            c.setData({
                                searchScrollTop: 0
                            });
                        }, 200));
                    }
                }, function(e) {
                    console.error("[Search] search:fail", e), g();
                }).catch(function(e) {
                    console.error("[Search] search:error", e), g();
                });
            }).call(this), this.$core.boss.click("search");
        }),
        onHide: function() {
            setTimeout(function() {
                var e = this.$curPage().$name;
                switch (e) {
                  case "index":
                  case "channel":
                  case "user":
                    e != t && this.seachHide();
                }
            }.bind(this));
        },
        seachHide: function() {
            this.setData({
                showLayout: !0,
                showSearch: !1,
                searchResults: [],
                searchLoading: !1,
                searchOpacity: 0,
                searchFilters: [],
                searchFilter: {},
                searchFilterToggleCursor: 0
            }), this.searchbarRevert();
        },
        onSearchShow: function(e, t) {
            clearTimeout(this._searchAutofocusTimer), this.setData({
                showSearchResult: !0,
                "searchbar.autofocus": 0 != t,
                showSearch: !0
            }), this._searchAutofocusTimer = setTimeout(function() {
                this.setData({
                    "searchbar.autofocus": !1
                });
            }.bind(this), 5e3), setTimeout(function() {
                this.setData({
                    searchOpacity: 1
                });
            }.bind(this)), this.$core.stat(e), this.$core.boss.pv("search");
        },
        onSearchHide: function() {
            this.seachHide();
        },
        onSearchClear: function() {
            this._onSearchAbort && this._onSearchAbort(), this.setData({
                showLayout: !0,
                searchResults: [],
                searchFilters: [],
                searchFilter: {},
                searchFilterToggleCursor: 0
            });
        },
        onSearchCancel: function() {
            this.setData({
                showSearchResult: !1
            }), this.setData({
                searchOpacity: 0
            }), setTimeout(function() {
                this.onSearchHide();
            }.bind(this), 300);
        },
        onRoute: function(t) {
            var r = t.currentTarget.dataset, s = r.url;
            s && (1 == r.autopreview && (s = e.queryJoin(s, {
                autopreview: 1
            })), this.$route(s), this.$core.stat(t));
        },
        onSearchFilter: function(t) {
            this.$core.stat(t);
            var r = t.currentTarget.dataset.name, s = t.currentTarget.dataset.value, a = {};
            a[r] = s, a = e.extend({}, this.data.searchFilter, a), this.setData({
                searchFilter: a
            }), this.onSearch(this.data.keyWord, this._needCorrect, {
                filter: a
            });
        },
        onSearchFilterToggle: function(e) {
            this.setData({
                searchFilterToggleCursor: ++this.data.searchFilterToggleCursor
            }), this.$core.stat(e);
        },
        onSearchResultsTouch: function() {
            this.data.searchFilterToggleCursor % 2 && this.onSearchFilterToggle();
        },
        onSearchScrollButtom: function() {
            var e = this.data;
            !e.showLayout && e.searchResults.length && e.keyWord && this._searchPageContext && this._searchSearchSession && this.onSearch(e.keyWord, this._needCorrect, {
                pageContext: this._searchPageContext,
                searchSession: this._searchSearchSession
            });
        },
        onRouteStarPage: function(e) {
            var t = e.currentTarget.dataset.url;
            t && (this.$route(t), this.$core.stat(e));
        },
        searchFilterHide: function() {
            this.data.searchFilterToggleCursor % 2 && this.setData({
                searchFilterToggleCursor: ++this.data.searchFilterToggleCursor
            });
        }
    };
});