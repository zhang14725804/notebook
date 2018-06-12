Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {};

exports.default = {
    component: function(t, n) {
        var o = n.template || "";
        n.template = 0 === o.indexOf("#") ? "" : o, n.condition = n.condition || function() {
            return !1;
        }, e[t] = n;
    },
    getComponents: function() {
        return e;
    }
};