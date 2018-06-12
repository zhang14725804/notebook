module.exports = {
    formatNumber: function(t) {
        return (t = t.toString())[1] ? t : "0" + t;
    },
    formatTime: function(t) {
        var e = t.getFullYear(), r = t.getMonth() + 1, o = t.getDate(), n = t.getHours(), u = t.getMinutes(), m = t.getSeconds();
        return [ e, r, o ].map(this.formatNumber).join("/") + " " + [ n, u, m ].map(formatNumber).join(":");
    }
};