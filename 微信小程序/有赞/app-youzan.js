!function() {
    require("./common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 102 ], {
    105: function(e, t, a) {
        function l(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        var n = l(a(1)), u = l(a(151)), c = l(a(71)).default.weapp_youzan, o = (0, n.default)({}, u.default), i = u.default.globalData || {};
        i.isYouzanApp = !0, i.clientId = c.clientId, i.clientSecret = c.clientSecret, o.globalData = i, 
        App(o);
    }
}, [ 105 ]);