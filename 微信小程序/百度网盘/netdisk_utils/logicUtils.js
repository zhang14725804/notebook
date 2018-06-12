Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.serverLogin = exports.checkBdAuthor = exports.confirmAuthor = void 0;

var e = require("./wxApiToPromise.js"), r = require("../netdiisk_requestapi/postLoginInfo.js"), t = require("../netdiisk_requestapi/updateUserInfo.js"), o = require("../netdisk_utils/storage.js"), s = require("../netdiisk_requestapi/reportUser.js"), i = (exports.confirmAuthor = function(e) {
    e.setData({
        "modelData.isShow": !0
    });
}, exports.checkBdAuthor = function() {
    wx.checkSession({
        success: function() {
            (0, t.updateUserInfo)().then(function(e) {
                0 === e.data.errno && ((0, s.reportUser)(), i());
            });
        },
        fail: function() {
            n();
        }
    });
}, function() {
    var e = wx.getCurrentViewPage().data.onLoadData;
    if ("sharedir" === e.to) {
        var r = "/pages/netdisk_sharedir/sharedir?to=sharedir";
        for (var t in e) "to" !== t && (r = r + "&" + t + "=" + e[t]);
        wx.navigateTo({
            url: r
        });
    }
}), n = exports.serverLogin = function() {
    (0, e.wxLogin)().then(function(e) {
        var t = e.code;
        (0, r.postLoginInfo)(t).then(function(e) {
            e && 0 === e.data.errno && ((0, o.setCookieToStorage)(e.header, [ "PANWX" ]), wx.setStorageSync("lsk", e.data.lsk), 
            wx.setStorageSync("uk", e.data.uk));
        });
    });
};