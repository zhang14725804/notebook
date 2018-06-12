var e = {
    show: function() {
        var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if ("string" == typeof t.title && "string" == typeof t.content) {
            var o = {
                title: t.title,
                content: t.content,
                freight: t.freight,
                freightRules: t.freightRules,
                taxInfo: t.taxInfo,
                goods: t.goods,
                cancelSkus: t.cancelSkus,
                showPromoPrice: t.showPromoPrice,
                sku: t.sku,
                checkGoodsCount: t.checkGoodsCount,
                maxHeight: t.maxHeight || "360",
                align: t.align || "",
                showCancel: t.showCancel || !1,
                cancelText: t.cancelText || "取消",
                cancelColor: t.cancelColor || "#000",
                confirmText: t.confirmText || "确定",
                confirmColor: t.confirmColor || "#3cc51f"
            }, c = getCurrentPages();
            this.page = c[c.length - 1], t.content && t.content.indexOf("<br>") > 0 && (o.content = t.content.split("<br>"), 
            o.content.forEach(function(e) {
                e.trim();
            }), o.isArray = !0), this.page.setData({
                modal: o
            }), this.page.modalConfirm = function() {
                e.hide(), t.success && "function" == typeof t.success && t.success.call(e.page), 
                t.complete && "function" == typeof t.complete && t.complete.call(e.page);
            }, this.page.modalCancel = function() {
                e.hide(), t.fail && "function" == typeof t.fail && t.fail.call(e.page), t.complete && "function" == typeof t.complete && t.complete.call(e.page);
            };
        }
    },
    hide: function() {
        this.page.setData({
            modal: {}
        });
    }
};

module.exports = e;