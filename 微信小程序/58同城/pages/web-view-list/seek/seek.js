getApp().createPage([ {
    methodOptions: {},
    data: {
        pageType: "web-view",
        pageName: "seek",
        cateid: ""
    },
    _onLoad: function(e) {
        this.setData({
            cateid: e.cateid
        });
    }
} ]);