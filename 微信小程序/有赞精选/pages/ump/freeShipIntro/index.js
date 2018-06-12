!function() {
    require("./../../../common.js"), wx.webpackJsonp.apply(null, arguments);
}([ 27 ], {
    286: function() {
        getApp(), Page({
            data: {
                desc: ""
            },
            onLoad: function(n) {
                this.setData({
                    desc: n.desc
                });
            },
            onReachBottom: function() {}
        });
    }
}, [ 286 ]);