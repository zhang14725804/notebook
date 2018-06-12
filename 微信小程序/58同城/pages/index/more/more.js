var e = getApp();

e.createPage({
    methodOptions: {
        e_goTo: {
            type: "goto"
        }
    },
    data: {
        pageType: "more",
        pageName: "more",
        icons: [ {
            class: "icon_yixiang",
            cateCode: Math.random(),
            text: "意向登记",
            url: "/pages/service-seek/service-seek"
        }, {
            class: "icon_ask",
            cateCode: Math.random(),
            text: "58问答",
            url: "/pages/wenda/question/question"
        } ]
    },
    initData: function() {},
    $e_goTo: function(t) {
        var a = t.currentTarget.dataset.url;
        e.goto(a, !0);
    }
});