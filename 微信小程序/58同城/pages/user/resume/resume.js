var e = getApp();

e.createPage({
    methodOptions: {
        e_goToDetail: {
            type: "goto"
        }
    },
    data: {
        pageType: "user",
        pageName: "user-resume",
        list: [],
        loading: !0,
        isRefreshOnLoginBack: !0
    },
    initData: function() {
        var t = this;
        e.eventHandle.emit("check-login", function() {
            e.request("/resume/list", null, {
                show: !0
            }).then(function(a) {
                t.setDataLazy({
                    loading: !1
                }), a.error ? e.alert("网络异常,请稍后重试") : (a.data.list = a.data.list || [], t.setDataLazy({
                    list: a.data.list
                }), t.data.listLength = a.data.list.length);
            });
        });
    },
    $e_goToDetail: function(t) {
        var a = t.currentTarget.dataset.resumeId;
        e.goto([ "/pages/user/resume/detail/detail", {
            resumeId: a
        } ], !0);
    }
});