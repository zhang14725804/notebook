Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = require("../../common/index"), a = {
    resourcePlaceTracking: function(a) {
        var r = a.op, o = a.pageName, t = a.pageSection, i = a.pageElement, d = a.activity, p = a.url, s = a.idx, c = a.pageElSn;
        "goods" == o && (o = "goods_detail"), "group" == o && (o = "group_detail");
        var n = {
            op: r,
            page_name: o,
            page_section: t,
            page_el_sn: c
        };
        if (i && (n.page_element = i), void 0 != s && (n.idx = s), d) n["refer_xcx_campaign_" + d] = 0; else {
            var u = e.UrlUtil.urlDraw(p), g = this.urlMapped(i, u);
            n.element_id = g;
        }
        (0, e.TrackingRecord)(n);
    },
    urlMapped: function(e, a) {
        var r = "";
        return "subject" == e ? r = a.subject_id : "subjects" == e ? r = a.subjects_id : "goods" == e ? r = a.goods_id : "catgoods" == e && (r = a.opt_id), 
        r;
    }
};

exports.default = a;