getApp();

var t = require("../../api/index.js"), a = require("../../utils/util.js");

Page({
    data: {
        hotKey: [],
        searchData: void 0,
        originalData: void 0,
        keyword: void 0,
        history: []
    },
    onShow: function() {
        var t = this;
        a.storage.get("history").then(function(a) {
            t.setData({
                history: a
            });
        });
    },
    onLoad: function(t) {
        this.getHot();
    },
    saveHot: function() {
        var t = this.data.history;
        t.push(this.data.keyword);
        var e = Array.from(new Set(t));
        this.setData({
            history: e
        }), a.storage.set("history", e);
    },
    onDelH: function(t) {
        var e = this.data.history, i = t.currentTarget.dataset.index;
        e.splice(i, 1), this.setData({
            history: e
        }), a.storage.set("history", e);
    },
    getHot: function() {
        var a = this;
        t.search.getHot().then(function(t) {
            t.data = t.data.slice(0, 6), a.setData({
                hotKey: t.data
            });
        });
    },
    onConfirm: function(t) {
        var a = t.detail.value;
        if ("" == a) return this.setData({
            searchData: !1
        }), wx.showToast({
            title: "请输入",
            duration: 2e3
        });
        this.setData({
            keyword: a
        }), this.serchNow(a), this.saveHot();
    },
    onTapHot: function(t) {
        this.data.keyword = t.currentTarget.dataset.data, this.setData({
            keyword: this.data.keyword,
            inputLen: this.data.keyword
        }), this.serchNow(this.data.keyword), this.saveHot();
    },
    serchNow: function(a) {
        var e = this;
        return wx.showLoading({
            title: "搜索中.."
        }), t.search.searchAll(a).then(function(t) {
            var i = t.data;
            for (var r in t.data) null != i[r] && (i[r] = i[r].slice(0, 3));
            e.setData({
                originalData: t.data,
                searchData: i,
                keyword: a
            }), wx.hideLoading();
        });
    },
    viewMore: function(t) {
        var a = t.currentTarget.dataset.name;
        wx.navigateTo({
            url: "./" + a + "/" + a + "?keyword=" + this.data.keyword
        });
    },
    onTapHosipital: function(t) {
        var a = t.currentTarget.dataset;
        wx.navigateTo({
            url: "../hospital/detail/detail?id=" + a.data.Id
        });
    },
    onTapDoctor: function(t) {
        var a = t.currentTarget.dataset.data;
        wx.navigateTo({
            url: "../doctor/detail/detail?id=" + a.Id
        });
    },
    onTapDiary: function(t) {
        wx.navigateTo({
            url: "../diary/list/list?baseid=" + t.detail.baseid + "&id=" + t.detail.id
        });
    },
    onTapKnow: function(t) {
        var a = t.currentTarget.dataset;
        wx.navigateTo({
            url: "../knowledge/detail/detail?id=" + a.id
        });
    },
    onTapRaiders: function(t) {
        var a = t.currentTarget.dataset;
        wx.navigateTo({
            url: "../raiders/detail/detail?id=" + a.id
        });
    },
    onTapqa: function(t) {
        var a = t.currentTarget.dataset;
        wx.navigateTo({
            url: "../question/detail/detail?id=" + a.id
        });
    },
    onInput: function(t) {
        this.setData({
            inputLen: t.detail.value
        });
    },
    onEmptyInput: function() {
        this.setData({
            keyword: "",
            inputLen: "",
            searchData: !1
        });
    },
    onShareAppMessage: function(t) {
        return {
            title: "美呗",
            path: "/pages/index/index"
        };
    }
});