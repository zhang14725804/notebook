getApp();

Page({
    data: {
        testValue: "ttttestValue"
    },
    onShow: function() {
        this._test(), console.log("tttttt onShow");
    },
    onLoad: function() {
        console.log("tttttt onLoad");
    },
    onReady: function() {
        console.log("tttttt onReady");
    },
    _test: function() {
        wx.login({
            success: function(t) {
                console.log("succ" + t);
            },
            fail: function(t) {
                console.log("fail");
            },
            complete: function(t) {
                console.log(t);
            }
        });
    }
});