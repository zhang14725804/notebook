var e = getApp(), t = require("./template/list/list");

e.createPage([ {
    methodOptions: {
        e_tapConcern: {
            type: "concern"
        },
        e_tapAnswer: {
            type: "goto"
        }
    },
    data: {
        pageType: "list",
        pageName: "answer",
        isRefreshOnLoginBack: !0,
        answerList: [],
        pageInfo: {},
        hasConcerned: !1,
        hasMore: !0,
        loadText: "正在加载中",
        unfoldObj: {},
        scrollTop: 0,
        scrollPosition: 0
    },
    initData: function() {
        return this.initList(this.urlParams.questionId);
    },
    $e_tapConcern: function(t) {
        var n = this, a = this.data.hasConcerned, s = this.urlParams.questionId;
        e.eventHandle.emit("check-login", function() {
            e.request(e.pathData.wenda.QUESTION_CONCERN_PATH, {
                questionid: s,
                subscribe: a ? 0 : 1
            }).then(function(t) {
                t.error ? e.alert("网络异常,请稍后重试") : n.setDataLazy({
                    hasConcerned: a ? 0 : 1
                });
            });
        });
    },
    getScrollHeight: function(e) {
        this.data.scrollPosition = e.detail.scrollTop;
    },
    onShareAppMessage: function() {
        return {
            title: "58问答",
            desc: "",
            path: "/pages/index/index?pagetype=wenda-answer&questionId=" + this.urlParams.questionId
        };
    }
}, t ]);