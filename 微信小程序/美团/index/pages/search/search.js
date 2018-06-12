var r = require("../../../utils/util");

Page({
    onLoad: function(e) {
        wx.redirectTo({
            url: r.formatUrl("/search/pages/search/search", e)
        });
    }
});