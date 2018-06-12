var e = getApp(), a = {};

require("../../utils/mfw_stat.js");

Page({
    data: {
        search_focus: !0,
        search_keyword: ""
    },
    onLoad: function(e) {},
    onShow: function() {},
    onReady: function() {
        this.setData({
            search_bcancel: getCurrentPages().length > 1
        });
    },
    keywordInput: function(e) {
        this.setData({
            search_showclear: e.detail.value.length > 0
        }), this.autocomplete(e.detail.value);
    },
    keywordConfirm: function(a) {
        if (e.log(a.detail.value, "search confirm"), 0 === a.detail.value.indexOf("note:")) {
            var t = a.detail.value.replace(/note\:/, "");
            isNaN(t) || wx.navigateTo({
                url: "/pages/note/detail?id=" + t
            });
        }
    },
    bindSearchBlur: function(e) {
        wx.navigateBack();
    },
    bindSearchClear: function() {
        e.log("search clear"), this.setData({
            search_keyword: " "
        }), this.setData({
            search_keyword: "",
            search_showclear: !1,
            search_results: []
        });
    },
    searchResultClick: function(e) {
        var a = e.currentTarget.dataset;
        "1" == a.ismdd ? wx.navigateTo({
            url: "mdd?mddid=" + a.id
        }) : wx.navigateTo({
            url: "detail?id=" + a.id
        });
    },
    autocomplete: function(t) {
        var s = this;
        (t = t.trim()) !== s.searchingWord && (clearTimeout(s.searchTimeout), s.searchingWord = t, 
        t.length > 0 ? a[t] ? (e.log(t, "cache success"), s.setData({
            search_results: a[t],
            search_nodatatip: 0 == a[t].length,
            search_showloading: !1
        })) : s.searchTimeout = setTimeout(function() {
            s.setData({
                search_results: [],
                search_nodatatip: !1,
                search_showloading: !0
            }), e.request({
                url: "/gonglve/search/?jsondata=" + JSON.stringify({
                    filter: {
                        keyword: t
                    }
                }),
                success: function(r) {
                    a[t] = r.list, s.searchingWord == t ? (e.log(t, "search success"), s.setData({
                        search_results: a[t],
                        search_nodatatip: 0 == a[t].length
                    })) : e.log(t, "search success expired");
                },
                fail: function() {
                    e.log(t, "search error"), s.searchingWord == t && s.setData({
                        search_nodatatip: !0
                    });
                },
                complete: function() {
                    e.log(t, "search complete"), s.searchingWord == t && s.setData({
                        search_showloading: !1
                    });
                }
            });
        }, 300) : s.setData({
            search_results: [],
            search_nodatatip: !1,
            search_showloading: !1
        }));
    }
});