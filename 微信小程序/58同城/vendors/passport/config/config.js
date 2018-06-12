var t = Object.assign || function(t) {
    for (var r = 1; r < arguments.length; r++) {
        var n = arguments[r];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
};

module.exports = {
    set: function(r) {
        this.config = t({}, this.config, r);
    },
    config: {
        URL_PATH: ""
    }
};