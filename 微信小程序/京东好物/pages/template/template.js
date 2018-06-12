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
        var e, s = new Date().getTime();
        if (!(s - this.data.sortTime < 500)) {
            var c = a.target.dataset.itemId, i = a.target.dataset.sort, r = a.target.dataset.title, h = this.data.searchtabdata.tab.list, d = h.findIndex(function(t) {
                return 1 == t.isSwitchIcon;
            });
            -1 != d && c == h[d].id && (i = h[d].sort = h[d].sort == h[d].upSort ? h[d].downSort : h[d].upSort);
            var n = {
                selectedId: c,
                sort: i,
                title: r
            };
            this.setData((e = {
                sortTime: s
            }, t(e, "searchtabdata.tab.selectedId", c), t(e, "searchtabdata.tab.list", h), e)), 
            this.switchSearchTab ? this.switchSearchTab(n) : console.warn("页面缺少switchSearchTab回调函数");
        }
    }
}, e = {
    _setFocus: function() {
        this.setData({
            "searchdata.bfocus": !0
        }), this.setFocus && this.setFocus();
    },
    _inputText: function(t) {
        this.setData({
            "searchdata.text": t.detail.value
        });
    },
    _search: function(a) {
        var e = this, s = this.data.searchdata.text;
        if (null != s || void 0 != s) {
            var c = {
                text: s
            };
            if (this.data.searchdata.hasTab) {
                var i, r = this.data.searchtabdata.tab.list, h = r.findIndex(function(t) {
                    return 1 == t.isSwitchIcon;
                });
                -1 != h && (r[h].sort = ""), this.setData((i = {
                    "searchdata.bfocus": !1
                }, t(i, "searchtabdata.tab.selectedId", e.data.searchtabdata.tab.list[0].id), t(i, "searchtabdata.tab.list", r), 
                i));
            } else this.setData({
                "searchdata.bfocus": !1
            });
            this.search ? this.search(c) : console.warn("页面缺少search回调函数");
        }
    },
    _cancel: function(t) {
        this.setData({
            "searchdata.bfocus": !1
        }), this.cancel && this.cancel();
    },
    _clearText: function() {
        this.setData({
            "searchdata.text": "",
            "searchdata.bfocus": !0
        });
    }
};

module.exports = {
    searchTab: a,
    search: e
};