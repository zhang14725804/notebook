var t = null;

module.exports = {
    setContext: function(n) {
        t = n;
    },
    getContext: function() {
        return t;
    },
    getVersion: function() {
        return "1.0.0";
    },
    destroyContext: function() {
        t = null;
    }
};