var t = getApp(), e = require("./list/index");

t.createPage([ {
    methodOptions: {
        e_add: {
            type: "goto"
        },
        e_research: {
            type: "sort"
        },
        e_goToYouXuan: {
            type: "goto"
        },
        e_delete: {
            type: "delete"
        }
    },
    data: {
        pageName: "subscription",
        pageType: "list",
        scrollTop: 0,
        navActive: "1",
        navList: [ {
            id: "1",
            text: "招聘"
        }, {
            id: "2",
            text: "房产"
        } ],
        loading: !0
    },
    loaderWrapper: function() {
        var t = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).pLine;
        t && (this.initData(t), this.setDataLazy({
            navActive: t.toString()
        }));
    },
    _onLoad: function() {
        t.eventHandle.offOn("subscription-change", this.loaderWrapper);
    },
    initData: function() {
        return this.subscriptionInit();
    },
    $e_add: function(e) {
        var a = e.currentTarget.dataset.url;
        t.goto(a, !0);
    },
    $e_research: function(t) {
        var e = t.currentTarget.dataset.id;
        this.initData(e), this.setDataLazy({
            navActive: e.toString()
        });
    },
    onContainerScroll: t.debounce(200, function(t) {
        t.detail.scrollTop > 50 ? this.setDataLazy({
            showGoToTop: !0
        }) : this.setDataLazy({
            showGoToTop: !1
        });
    })
}, e ]);