getApp().createPage({
    methodOptions: {},
    data: {
        pageName: "detail-video",
        pageType: "video",
        videoSrc: "",
        windowWidth: 0,
        windowHeight: 0
    },
    _onLoad: function(o) {
        this.videoContext = wx.createVideoContext("myVideo"), console.log(this.urlParams), 
        this.setDataLazy({
            videoSrc: decodeURIComponent(this.urlParams.videoSrc),
            windowWidth: wx.getSystemInfoSync().windowWidth,
            windowHeight: wx.getSystemInfoSync().windowHeight
        });
    },
    initData: function() {
        console.log(this), console.log(this.data);
    },
    _onShow: function() {},
    $e_doSomething: function() {}
});