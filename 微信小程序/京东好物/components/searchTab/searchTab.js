function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = {
    _switchSearchTab: function(a) {
        var e, r = new Date().getTime();
        if (!(r - this.data.sortTime < 500)) {
            var s = a.target.dataset.itemId, i = a.target.dataset.sort, c = a.target.dataset.title, o = this.data.searchtabdata.tab.list, d = o.findIndex(function(t) {
                return 1 == t.isSwitchIcon;
            });
            -1 != d && s == o[d].id && (i = o[d].sort = o[d].sort == o[d].upSort ? o[d].downSort : o[d].upSort);
            var n = {
                selectedId: s,
                sort: i,
                title: c
            };
            this.setData((e = {
                sortTime: r
            }, t(e, "searchtabdata.tab.selectedId", s), t(e, "searchtabdata.tab.list", o), e)), 
            this.switchSearchTab ? this.switchSearchTab(n) : console.warn("页面缺少switchSearchTab回调函数");
        }
    }
};

module.exports = {
    searchTab: a
};