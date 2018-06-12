function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t = {
    _handleTabTap: function(t) {
        var e = t.currentTarget.dataset.itemId;
        this.setData(a({}, "tabData.tab.selectedId", e)), this.handleTabTap ? this.handleTabTap(t) : console.warn("页面缺少handleTabTap回调函数");
    },
    _handleUnfoldTabMenu: function(t) {
        var e = t.currentTarget.dataset.menuStatus;
        e = "close" == e ? "open" : "close", this.setData(a({}, "tabData.tab.menuStatus", e)), 
        this.handleUnfoldTabMenu && this.handleUnfoldTabMenu(t);
    },
    _handleUnfoldTabTap: function(t) {
        var e, n = t.target.dataset.itemId;
        this.setData((e = {}, a(e, "tabData.tab.selectedId", n), a(e, "tabData.tab.menuStatus", "close"), 
        e)), this.handleUnfoldTabTap ? this.handleUnfoldTabTap(t) : console.warn("页面缺少handleUnfoldTabTap回调函数");
    }
};

module.exports = {
    JKPTab: t
};