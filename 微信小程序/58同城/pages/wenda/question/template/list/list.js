var t = getApp();

module.exports = {
    initList: function(t) {
        return this.listParam = {
            topic: t,
            index: 1
        }, this.getQuesData();
    },
    getQuesData: function() {
        var a = this;
        return this.setDataLazy({
            loadText: "正在加载中",
            loading: !0
        }), t.request(t.pathData.wenda.QUESTION_LIST_PATH, this.listParam).then(function(t) {
            if (t.error) a.setDataLazy({
                loadText: "网络加载缓慢，请稍候再试",
                loading: !1
            }); else {
                var e = t.data, s = e.list ? e.list : [], i = e.hasMore ? "" : 1 != a.listParam.index || s.length ? "没有更多数据了" : "暂无任何数据";
                e.hasMore && a.listParam.index++, a.setDataLazy({
                    hasMore: e.hasMore,
                    quesList: a.data.quesList.concat(s),
                    loadText: i,
                    loading: !1
                });
            }
        });
    },
    e_reachBottom: function() {
        this.data.hasMore && !this.data.loading && this.getQuesData();
    },
    $e_tapToAnswer: function(a) {
        var e = a.currentTarget.dataset.questionId;
        t.goto([ "/pages/wenda/answer/answer", {
            questionId: e
        } ], !0);
    }
};