Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    getLimitQuantity: function(e, t) {
        var r = parseInt(e.quantity, 10) || 0, i = parseInt(t.orderLimit, 10) || 0, u = parseInt(e.limitQuantity, 10) || 0, n = i;
        return n > r && r > 0 && (n = r), n > u && u > 0 && (n = u), n;
    },
    getSelectedSkuPrice: function(e, t) {
        return parseInt(e.customerNum || 0, 10) > 1 ? t && t.groupPrice ? t.groupPrice : "" : t.normalPrice;
    }
};