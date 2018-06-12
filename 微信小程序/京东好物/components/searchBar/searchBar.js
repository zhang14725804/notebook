function a(a, t, s) {
    return t in a ? Object.defineProperty(a, t, {
        value: s,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = s, a;
}

var t = {
    _setFocus: function() {
        this.setData({
            "searchdata.bfocus": !0
        }), this.setFocus && this.setFocus();
    },
    _inputText: function(a) {
        this.setData({
            "searchdata.text": a.detail.value
        });
    },
    _search: function(t) {
        var s = this, e = this.data.searchdata.text;
        if (null != e || void 0 != e) {
            var c = {
                text: e
            };
            if (this.data.searchdata.hasTab) {
                var i, h = this.data.searchtabdata.tab.list, r = h.findIndex(function(a) {
                    return 1 == a.isSwitchIcon;
                });
                -1 != r && (h[r].sort = ""), this.setData((i = {
                    "searchdata.bfocus": !1
                }, a(i, "searchtabdata.tab.selectedId", s.data.searchtabdata.tab.list[0].id), a(i, "searchtabdata.tab.list", h), 
                i));
            } else this.setData({
                "searchdata.bfocus": !1
            });
            this.search ? this.search(c) : console.warn("页面缺少search回调函数");
        }
    },
    _cancel: function(a) {
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
    search: t
};