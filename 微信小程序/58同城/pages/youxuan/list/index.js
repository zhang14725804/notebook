function a(a) {
    if (Array.isArray(a)) {
        for (var t = 0, s = Array(a.length); t < a.length; t++) s[t] = a[t];
        return s;
    }
    return Array.from(a);
}

var t = Object.assign || function(a) {
    for (var t = 1; t < arguments.length; t++) {
        var s = arguments[t];
        for (var e in s) Object.prototype.hasOwnProperty.call(s, e) && (a[e] = s[e]);
    }
    return a;
}, s = getApp(), e = "1";

module.exports = {
    yxQuery: {},
    youxuanInit: function(a, t) {
        console.log("youxuan load"), e = this.data.pLine, this.yxList(null, !0, t);
    },
    yxList: s.debounce(100, function(e, i, o) {
        var r = this;
        i && (!o && (this.data.list = []), this.data.index = 0);
        var n = this.data.sort || "", h = s.pathData.youxuan.POST_LIST_PATH + "/" + n, d = s.pathData.youxuan.SUB_LIST_PATH + "/" + this.pageData.subId + "/" + n, u = e ? s.pathData.youxuan.LIST_MORE_PATH : this.pageData.subId ? d : h, y = {
            thirdKey: s.getThirdKey()
        };
        e ? (u = s.pathData.youxuan.LIST_MORE_PATH + "/" + this.data.type + "/" + (this.data.index || 0), 
        y = Object.assign(y, this.yxQuery)) : (this.gotoTop(), this.pageData.subId ? u = d : (Object.assign(y, t({}, this.urlParams.youxuan ? {} : {
            type: this.urlParams.type || 1
        }, {
            hasInfo: this.data.hasInfo
        })), u = h)), s.request(u, y, null, e ? "POST" : "GET").then(function(t) {
            if (r.setDataLazy({
                loading: !1,
                hasMore: !0,
                showEmptyInfo: !1
            }), i && (r.data.list = []), t.error) r.setDataLazy({
                list: [].concat(a(r.data.list)),
                index: 0,
                hasMore: !1,
                showEmptyInfo: !0,
                loading: !1
            }); else if (t.data) {
                var s = t.data, e = s.list, o = s.hasMore, n = s.request, h = s.index, d = s.type;
                d && r.resetNav(d), r.yxQuery = n, r.data.list = i ? [] : r.data.list || [], r.data.index = h, 
                r.data.type = d;
                var u = r.data.list.concat(e);
                r.setDataLazy({
                    list: u,
                    hasMore: o,
                    showEmptyInfo: 0 == u.length
                });
            }
        });
    }),
    imageLoaded: function(a) {
        var t = a.target.dataset.index;
        this.data.list[t] && (this.data.list[t].imageLoaded = !0), this.setDataLazy({
            list: this.data.list
        });
    },
    e_yxReachBottom: function() {
        console.log(".....load more"), !this.data.loading && this.data.hasMore && this.yxList(!0), 
        this.setDataLazy({
            loading: this.data.hasMore,
            hasMore: this.data.hasMore
        });
    }
};