var o = getApp();

o.createPage({
    pageInfoKeys: [ "currInfoId" ],
    methodOptions: {
        callPhone: {
            type: "phone"
        }
    },
    data: {
        pageInfo: {},
        pageName: "user",
        pageType: "",
        fullScreenNum: 0
    },
    _onLoad: function(n) {
        console.log(o), console.log(this.urlParams), console.log(n), this.videoContext = wx.createVideoContext("myVideo");
    },
    initData: function() {
        console.log("initData"), console.log(this), console.log(this.data), console.log(this.data.loading);
    },
    _onShow: function() {},
    e_catchtapEvent: function(n) {
        console.log("goToResumeList"), o.goto("/pages/user/resume/resume", !0);
    },
    $e_doSomething: function() {},
    bindPlayFun: function() {
        console.log("bindPlayFun");
    },
    bindPauseFun: function() {
        console.log("bindPauseFun");
    },
    playBtn: function() {
        console.log("playBtn"), this.videoContext.play();
    },
    stopBtn: function() {
        console.log("stopBtn"), this.videoContext.pause();
    },
    fullScreenFun: function(n) {
        console.log(n), o.alert("1");
    }
});