getApp().createPage([ {
    methodOptions: {},
    data: {
        jumpurl: "",
        pageType: "web-view",
        pageName: "ordinary"
    },
    _onLoad: function() {
        console.log(this.data.url);
        var a = decodeURIComponent(this.data.url);
        this.setDataLazy({
            jumpurl: a
        });
    }
} ]);