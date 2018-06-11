Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    sysInfo: null,
    getSystemInfoSync: function() {
        var t = this.sysInfo;
        if (!t) try {
            t = wx.getSystemInfoSync(), this.sysInfo = t;
        } catch (n) {
            t = {};
        }
        return t;
    },
    getWindowWidthSync: function() {
        return this.getSystemInfoSync().windowWidth || wx.getSystemInfoSync().windowWidth;
    },
    getWindowHeightSync: function() {
        var t = wx.getSystemInfoSync(), n = void 0;
        return t && (n = t.windowHeight), n;
    },
    getSDKVersionInt: function() {
        var t = this.getSystemInfoSync().SDKVersion;
        return !!t && 1 * t.split(".").join("");
    },
    getIpxJudgment: function() {
        return this.sysInfo || (this.sysInfo = this.getSystemInfoSync()), this.sysInfo.model.indexOf("iPhone X") > -1;
    }
};

exports.default = t;