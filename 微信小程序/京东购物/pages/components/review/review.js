var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../api/Ptag/Ptag_utils.js")), e = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
    return e.default = t, e;
}(require("../../../api/Ptag/Ptag_constants")), r = require("../../../bases/component"), n = require("../../item/common/review_item/review_item.js"), o = require("../../item/api");

new r({
    properties: {
        skuId: String,
        venderId: String
    },
    data: {
        skuId: "",
        review: {}
    },
    ready: function() {
        var t = this, e = this.data.skuId;
        e && o.getComment(0, 0, e).then(function(e) {
            var r = e.productCommentSummary, o = [];
            e.comments[0] && o.push(n(e.comments[0])), e.comments[1] && o.push(n(e.comments[1]));
            var a = {
                total: r.CommentCount,
                totalStr: r.CommentCountStr,
                percent: (100 * r.GoodRate).toFixed(1).replace(".0", ""),
                detail: o,
                entries: [ {
                    name: "好评",
                    countStr: r.GoodCountStr
                }, {
                    name: "中评",
                    countStr: r.GeneralCountStr
                }, {
                    name: "差评",
                    countStr: r.PoorCountStr
                }, {
                    name: "晒单",
                    countStr: r.ShowCountStr
                } ]
            };
            t.setData({
                review: a
            });
        }).catch(function(t) {
            throw t;
        });
    },
    methods: {
        navigateTo: function(r) {
            var n = r.currentTarget.dataset, o = n.url, a = n.type, u = this.data, i = u.skuId, s = u.venderId;
            this.$goto(o, {
                sku: i,
                vender: s || "",
                type: a
            }, "navigateToByForce"), t.default.addPtag(e.VIEW_COMMENT);
        }
    }
});