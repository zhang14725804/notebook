var t = void 0;

module.exports = {
    getRecoveryUrl: function(e) {
        if (1 == t && e) return "https://wqs.jd.com/item/jd.shtml?sku=" + e;
    },
    setStatus: function(e) {
        t = e;
    }
};