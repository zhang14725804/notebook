Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    assign: function(e) {
        if ("function" != typeof Object.assign) {
            if (null == e) throw new TypeError("Cannot convert undefined or null to object");
            e = Object(e);
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                if (null != r) for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
            }
            return e;
        }
        return Object.assign.apply(Object, arguments);
    }
};

exports.default = e;