var t = require("../../../api/knowledge.js"), e = require("../../../api/fitlers.js");

Page(function(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}({
    data: {
        showProject: !1,
        showShort: !1,
        projects: null,
        sortData: [ {
            name: "全部知识",
            id: ""
        }, {
            name: "最新知识",
            id: "time"
        }, {
            name: "最热知识",
            id: "hot"
        } ],
        projectName: "全部项目",
        sortName: "全部知识",
        items: void 0,
        scrollTop: 0,
        filters: {
            active: 1,
            size: 20,
            parm: "",
            sname: "all"
        },
        hasmore: !1
    },
    scroll: function(t) {
        this.setData({
            scrollTop: t.detail.scrollTop
        });
    },
    onLoad: function(t) {
        this.data.filters.active = 1, this.requestData(), this.getProject(), wx.showLoading({
            title: "内容加载中"
        });
    },
    onLoadmore: function() {
        this.data.hasmore && (this.data.filters.active += 1, this.requestData());
    },
    onPullDownRefresh: function() {
        this.data.filters.active = 1, this.requestData();
    },
    onItemClick: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset;
        wx.navigateTo({
            url: "../../knowledge/detail/detail?id=" + e.id
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        this.onLoadmore();
    },
    onShareAppMessage: function() {},
    requestData: function() {
        var e = this;
        t.getList(this.data.filters).then(function(t) {
            var a = e.data.items;
            a = 1 == e.data.filters.active ? t.data.Data : a.concat(t.data.Data), e.setData({
                hasmore: t.data.HasMore,
                items: a
            }), wx.hideLoading();
        });
    },
    onTapMenu: function(t) {
        switch (this.closeProject(), t.currentTarget.dataset.type) {
          case "project":
            this.setData({
                showProject: !0,
                showShort: !1
            });
            break;

          case "sort":
            this.setData({
                showProject: !1,
                showShort: !0
            });
        }
    },
    getProject: function() {
        var t = this;
        e.getProject().then(function(e) {
            t.setData({
                projects: e.data
            });
        });
    },
    changeProject: function(t) {
        var e = t.detail.name, a = t.detail.SpellName, o = this.data.filters;
        o.sname = a, o.active = 1, this.setData({
            filters: o,
            projectName: e
        }), this.requestData();
    },
    changeSort: function(t) {
        var e = t.detail, a = this.data.filters;
        a.active = 1, a.parm = e.id;
        var o = e.name;
        this.setData({
            filters: a,
            sortName: o
        }), this.requestData();
    },
    closeSort: function() {
        closeProject();
    },
    closeProject: function() {
        this.setData({
            showProject: !1,
            showShort: !1
        });
    }
}, "onShareAppMessage", function(t) {
    return {
        title: "美呗",
        path: "/pages/knowledge/list/list"
    };
}));