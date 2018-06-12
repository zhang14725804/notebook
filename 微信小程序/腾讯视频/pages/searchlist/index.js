var t = require("../../module/page"), e = require("../../module/fns");

t("searchlist", {
    data: {
        pageContext: "",
        hasNextPage: !1,
        loading: !1,
        loadingPos: "top",
        filter: [],
        list: [],
        loaded: !1,
        activeFilter: "",
        uiType: "",
        emptyTitle: "哎呀，服务器繁忙~",
        emptyText: ""
    },
    onLoad: function(t) {
        t.channelTitle && wx.setNavigationBarTitle({
            title: t.channelTitle
        }), this._rawQuery = e.extend({}, t), this._query = t, this.fetch = e.lock(this.fetch), 
        this.fetch(t);
    },
    onShareAppMessage: function() {
        var t = e.extend({}, this._rawQuery, {
            filterValue: this._query.filterValue || "",
            pageContext: "",
            ptag: "share"
        });
        return {
            title: this._rawQuery.channelTitle,
            desc: "腾讯视频·不负好时光",
            path: e.queryJoin("/pages/searchlist/index", t, !0)
        };
    },
    onRefresh: function() {
        this.fetch(this._query);
    },
    fetch: function(t, e, i) {
        function a() {
            t();
            var e = {
                emptyTitle: r ? "出了点小问题 (" + r + ")" : "",
                loaded: !0,
                loading: !1
            };
            !i && r && (e.list = []), s.setData(e);
        }
        if (!this.data.loading) {
            var s = this, r = "";
            this.setData({
                loading: !0,
                loadingPos: i ? "bottom" : "top"
            }), this.$core.vaccess("search_sec", e).then(function(t) {
                if (t && t.posterList) {
                    if (s._query.pageContext = t.pageContext, !i && t.filter && t.filter.filterItemList && t.filter.filterItemList.length) {
                        var e = t.filter.filterItemList[0], o = e.optionList, l = "";
                        o.some(function(t) {
                            if (t.isSelected) return l = t.optionValue, !0;
                        }), s._filterKey = e.fileterItemKey, s.setData({
                            activeFilter: l,
                            filter: o
                        });
                    }
                    i || s.setData({
                        uiType: t.uiType
                    }), s.setData({
                        hasNextPage: !!t.hasNextPage,
                        list: i ? s.data.list.concat(t.posterList) : t.posterList
                    });
                } else r = "获取接口数据失败, " + (t ? "Code:" + t.code : "");
                a();
            }, function(t) {
                r = t, a(), console.log("[Searchlist] Error", t);
            }).catch(function(t) {
                r = t, a(), console.log("[Searchlist] Error", t);
            });
        }
    },
    onFilter: function(t) {
        var e = t.currentTarget.dataset;
        e.value !== this.data.activeFilter && (this.setData({
            activeFilter: e.value
        }), this._query.filterValue = this._filterKey + "=" + e.value, this._query.pageContext = "", 
        this.fetch(this._query));
    },
    onRoute: function(t) {
        var e = t.currentTarget.dataset.url;
        e && (this.$route(e), this.$core.stat(t));
    },
    onReachBottom: function() {
        this._query.pageContext && this.data.list.length && this.data.hasNextPage && this.fetch(this._query, !0);
    }
});