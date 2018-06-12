Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = wx.getSystemInfoSync().system;

exports.default = {
    isAndroid: -1 !== e.indexOf("Android"),
    isIOS: -1 !== e.indexOf("iOS")
};