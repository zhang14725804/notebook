var t = getApp();

module.exports = {
    initList: function(t) {
        return this.listParam = {
            questionid: t,
            index: 1
        }, this.getAnswerData();
    },
    getAnswerData: function() {
        var a = this;
        return this.setDataLazy({
            loadText: "正在加载中",
            loading: !0
        }), t.request(t.pathData.wenda.ANSWER_LIST_PATH, this.listParam).then(function(e) {
            if (e.error) t.alert("网络异常,请稍后重试"); else {
                var s = e.data;
                if (s.question && -1 !== s.code) {
                    var n = s.list ? s.list : [], r = s.hasMore ? "" : 1 == a.listParam.index & !n.length ? "暂无任何数据" : "没有更多数据了", i = a.clipAnswerList(n);
                    s.hasMore && a.listParam.index++, a.setDataLazy({
                        hasMore: s.hasMore,
                        answerList: a.data.answerList.concat(i),
                        loadText: r,
                        pageInfo: s.question,
                        hasConcerned: s.hasSubscribed,
                        loading: !1
                    });
                } else a.setDataLazy({
                    loadText: "网络加载缓慢，请稍后再试",
                    loading: !1
                });
            }
        });
    },
    clipAnswerList: function(t) {
        return t.length ? t.map(function(t) {
            return t.answerClip = t.answer.length > 100 ? t.answer.substring(0, 100) + "..." : t.answer, 
            t;
        }) : t;
    },
    e_reachBottom: function() {
        !this.data.loading && this.data.hasMore && this.getAnswerData();
    },
    $e_tapAnswer: function(t) {
        var a = t.currentTarget, e = a.dataset, s = a.offsetTop, n = this.data, r = n.unfoldObj, i = n.scrollPosition, o = {};
        r[e.answerId] ? (delete r[e.answerId], o.unfoldObj = r, s < i && (o.scrollTop = s)) : (r[e.answerId] = !0, 
        o.unfoldObj = r), this.setDataLazy(o);
    }
};