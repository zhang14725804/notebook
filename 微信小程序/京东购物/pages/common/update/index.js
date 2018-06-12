var s = require("../../../bases/page.js");

require("../../../libs/promise.min.js");

new s({
    data: {
        sdkVersion: ""
    },
    onLoad: function(s) {
        var e = s.sdkVersion;
        e && this.setData({
            sdkVersion: e
        });
    },
    tapOnBtn: function() {
        wx.navigateBack();
    }
});