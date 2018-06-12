var e = require("../../../module/page"), r = require("../../../module/boss.js");

e("term", {
    data: {},
    onShow: function() {
        var e = getCurrentPages(), s = e[e.length - 1];
        this.boss = r({
            page_url: s.$name
        });
    }
});