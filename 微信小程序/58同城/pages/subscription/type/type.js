var t = getApp(), e = require("./data").typeList;

t.createPage({
    methodOptions: {
        e_gotoAddSubscription: {
            type: "goto"
        }
    },
    data: {
        pageName: "subscription-type",
        pageType: "list",
        typeList: e
    },
    initData: function() {},
    $e_gotoAddSubscription: function(e) {
        var i = e.currentTarget.dataset, a = i.pLine, p = i.code, o = i.type;
        t.goto([ "/pages/subscription/add/add", {
            pLine: a,
            code: p,
            type: o
        } ], !0);
    }
});