var e = {};

module.exports = {
    set: function(t, s) {
        e[t] = e[t] || {}, e[t].seektime = ~~s;
    },
    get: function(t) {
        return e[t] ? e[t].seektime : 0;
    }
};