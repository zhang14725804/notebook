Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.getUserWxInfo = function() {
    return new Promise(function(n, e) {
        wx.getUserInfo({
            success: function(e) {
                n(e);
            },
            fail: function(n) {
                e && e(n);
            }
        });
    });
}, exports.openUserSetting = function() {
    return new Promise(function(n, e) {
        wx.openSetting({
            success: function(e) {
                n(e);
            },
            fail: function(n) {
                e(n);
            }
        });
    });
}, exports.getImageInfo = function(n) {
    return new Promise(function(e, o) {
        wx.getImageInfo({
            src: n,
            success: function(n) {
                e(n);
            },
            fail: function(n) {
                o(n);
            }
        });
    });
}, exports.wxLogin = function() {
    return new Promise(function(n, e) {
        wx.login({
            success: function(e) {
                n(e);
            },
            fail: function(n) {
                e(n);
            }
        });
    });
}, exports.wxApiToPromise = function(n) {
    return new Promise(function(e, o) {
        wx[n]({
            success: function(n) {
                e(n);
            },
            fail: function(n) {
                o(n);
            }
        });
    });
};