var r = Object.assign || function(r) {
    for (var a = 1; a < arguments.length; a++) {
        var o = arguments[a];
        for (var t in o) Object.prototype.hasOwnProperty.call(o, t) && (r[t] = o[t]);
    }
    return r;
};

module.exports = {
    set: function(a) {
        this.commonParam = r({}, this.commonParam, a);
    },
    commonParam: {
        imCallback: null
    }
};