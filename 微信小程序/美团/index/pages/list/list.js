var e = require("../../../utils/util.js");

Page({
    onLoad: function(t) {
        var i = "/mt/pages/list/list";
        "movie" === t.tag ? i = "/movie/pages/home/index" : "hotel" === t.tag && (i = "/hotel/pages/list/index"), 
        wx.redirectTo({
            url: e.formatUrl(i, t)
        });
    }
});