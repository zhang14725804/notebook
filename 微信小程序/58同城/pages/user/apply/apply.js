var a = getApp();

a.createPage({
    methodOptions: {
        e_goToDetail: {
            type: "goto"
        }
    },
    data: {
        pageName: "user-apply",
        pageType: "user",
        page: 1,
        list: [],
        hasMore: !1,
        showGoToTop: !1,
        scrollTop: 0,
        loading: !0,
        isRefreshOnLoginBack: !0
    },
    initData: function(t) {
        var o = this;
        t && this.data.page++, a.eventHandle.emit("check-login", function() {
            a.request("/resume/dlist", {
                page: o.data.page
            }, {
                show: !t
            }).then(function(t) {
                o.setDataLazy({
                    loading: !1
                }), t.error ? a.alert("网络异常,请稍后重试") : (o.setDataLazy({
                    hasMore: t.data.hasMore,
                    list: t.data.list
                }), o.data.listLength = t.data.list.length);
            });
        });
    },
    $e_goToDetail: function(t) {
        var o = t.currentTarget.dataset, e = o.infoId, s = o.dispCateName, i = o.dispLocalName, l = o.cateCode;
        o.infoDel ? a.toast("该职位已删除") : a.goto([ "/pages/detail/detail", {
            cateCode: l || 4,
            infoId: e,
            dispCateName: s,
            dispLocalName: i,
            hideApplyButton: 1
        } ], !0);
    },
    $e_scroll: a.debounce(200, function(a) {
        a.detail.scrollTop > 50 ? this.setDataLazy({
            showGoToTop: !0
        }) : this.setDataLazy({
            showGoToTop: !1
        });
    }),
    $e_goToTop: function() {
        this.setDataLazy({
            scrollTop: this.data.scrollTop
        });
    },
    e_scrollToBottom: function() {
        !this.data.loading && this.data.hasMore && this.initData(!0);
    },
    e_scrollToTop: function() {
        this.setDataLazy({
            showGoToTop: !1
        });
    }
});