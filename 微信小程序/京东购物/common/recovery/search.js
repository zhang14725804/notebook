var e = void 0;

module.exports = {
    getRecoveryUrl: function(t) {
        if (1 == e) return "https://wqs.jd.com/search/index.shtml?forcewqs=1&key=" + encodeURIComponent(t || "");
    },
    setStatus: function(t) {
        e = t;
    }
};