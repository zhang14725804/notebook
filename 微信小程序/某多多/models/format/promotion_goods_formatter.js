Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../common/std_format")), t = require("../../common/index"), a = {
    formatData: function(a) {
        if (a) return a.map(function(a) {
            switch (a.group_price ? a.group_price = e.default.price(a.group_price, 100) : a.group && a.group.price && (a.group_price = e.default.price(a.group.price, 100)), 
            a.normal_price = e.default.price(a.normal_price, 100), a.market_price = e.default.price(a.market_price, 100), 
            a.sales = e.default.sales(a.sales), a.hd_thumb_url = t.ImageUtil.cdnCompress(a.hd_thumb_url || a.hd_thumb_wm), 
            a.event_type) {
              case 12:
                a.tagTitle = "多件再减", a.tagClass = " multi-discount-tag";
                break;

              case 13:
                a.tagTitle = "抢免单", a.tagClass = " limit-free-tag";
                break;

              case 16:
                a.tagTitle = "限时折扣", a.tagClass = " limit-time-discount-tag";
                break;

              case 18:
                a.tagTitle = "限量折扣", a.tagClass = " limit-discount-tag";
            }
            if (a.display_name) a.imageTagTitle = a.display_name, a.tagClass = " multi-discount-tag"; else if (a.pick_num) a.imageTagTitle = "限时免单" + a.pick_num + "件", 
            a.tagClass = " limit-free-tag"; else if (a.init_quantity) {
                var i = Date.parse(new Date()) / 1e3;
                if (a.start_time > i) {
                    var r = new Date(1e3 * a.start_time).getHours();
                    a.imageTagTitle = r + "点限量" + a.init_quantity + "件", a.tagClass = " limit-discount-tag";
                } else a.imageTagTitle = "限量" + a.init_quantity + "件", a.tagClass = " limit-discount-tag";
            }
            return a.transData = {
                ad: a.ad,
                p_rec: a.p_rec,
                p_search: a.p_search
            }, a;
        }), a;
    }
};

exports.default = a;