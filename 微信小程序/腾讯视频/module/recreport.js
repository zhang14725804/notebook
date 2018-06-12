function e(e) {
    return o[e] || e || "";
}

function r(e, r) {
    var t = {};
    return o[e] && (t[o[e]] = r), t;
}

var t = require("./fns"), o = [ "", "vid", "cid", "lid", "pid" ], i = [ "report_type", "report_bucket", "report_alg", "report_reason", "rec_reason", "seqNum", "item_type", "item_id", "tag_id", "tag_type" ];

module.exports = {
    fieldPick: function(e, r) {
        var t = {};
        return i.forEach(function(r) {
            t[r] = e[r] || "";
        }), !t.seqNum && r && (t.seqNum = r), t;
    },
    fields: function() {
        return i.slice(0);
    },
    report: function(o, i, c, n, p) {
        function a(i) {
            var a = t.queryStringify(t.extend({
                rtype: e(i.item_type),
                bucketid: i.report_bucket || "",
                algid: i.report_alg || "",
                reasontype: i.report_type || "",
                reason: i.rec_reason || i.report_reason,
                seqnum: i.seqNum || "",
                mod_idx: c || 0,
                ztid: i.ztid || p || "",
                tag_id: i.tag_id || "",
                tag_type: i.tag_type || ""
            }, r(i.item_type, i.item_id)), "&", !0);
            return s.$core.boss["click" == o ? "rcClick" : "rcShow"]({
                reportKey: n || "",
                contentID: a
            }), "reportKey=" + (n || "") + "&" + a;
        }
        var s = this, u = "";
        try {
            i.recReportData && (u = a(i.recReportData)), "show" == o && i.recReportList && i.recReportList.forEach(a);
        } catch (e) {
            console.log(e);
        }
        return u;
    },
    reportParams: function(e, r, t) {
        return this.$core.boss["click" == e ? "rcClick" : "rcShow"]({
            reportKey: t || "",
            contentID: r
        }), "reportKey=" + (t || "") + "&" + r;
    }
};