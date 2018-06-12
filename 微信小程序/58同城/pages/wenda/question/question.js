var t = getApp(), e = t.APP_DATA.questionTypes, a = require("./template/list/list");

t.createPage([ {
    _onLoad: function(t) {
        t.topic ? this.setDataLazy({
            cateIdChecked: t.topic
        }) : this.setDataLazy({
            cateIdChecked: "pline_dg"
        });
        for (var a = 0; a < e.length; a++) e[a].cateId == this.data.cateIdChecked && a > 5 && this.setDataLazy({
            scrollLeft: 750
        });
    },
    methodOptions: {
        e_TypesChange: {
            type: "switch"
        },
        e_tapToAnswer: {
            type: "goto"
        }
    },
    data: {
        scrollLeft: 0,
        pageType: "list",
        pageName: "question",
        tabList: e,
        quesList: [],
        hasMore: !0,
        loadText: "正在加载中",
        cateIdChecked: "",
        loading: !0
    },
    initData: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data.cateIdChecked;
        return this.initList(t);
    },
    $e_TypesChange: t.throttle(10, function(t) {
        var e = t.currentTarget.dataset.cateId;
        this.setDataLazy({
            cateIdChecked: e,
            quesList: []
        }), this.initData(e);
    }),
    onShareAppMessage: function() {
        return {
            title: "58问答",
            desc: "",
            path: "/pages/index/index?pagetype=wenda-question&topic=" + this.data.cateIdChecked
        };
    }
}, a ]);