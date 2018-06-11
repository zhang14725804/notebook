function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, r.key, r);
        }
    }
    return function(e, n, r) {
        return n && t(e.prototype, n), r && t(e, r), e;
    };
}(), n = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("./util")), r = function() {
    function r(e) {
        t(this, r), this.handlerArr = [], this.handlerStatue = {}, this.context = e;
    }
    return e(r, [ {
        key: "triggerHandler",
        value: function(t) {
            if (!isNaN(this.handlerStatue[t]) && this.handlerStatue[t] > 0) {
                var e = this.handlerArr.shift();
                return "function" == typeof e && (e.apply(this.context, []), this.handlerStatue[t]--), 
                this;
            }
            if (!t) {
                var n = this.handlerArr.shift();
                "function" == typeof n && n.apply(this.context, []);
            }
            return this;
        }
    }, {
        key: "pushHandler",
        value: function(t, e) {
            var r = this.context;
            if ("string" == typeof t && "function" == typeof r[t] && this.handlerArr.push(r[t]), 
            "string" == typeof e && "function" == typeof r[e]) {
                if (isNaN(this.handlerStatue[e])) return r[e] = n.default.wrapFunc(n.default.bind(this.triggerHandler, this, e), r[e]), 
                void (this.handlerStatue[e] = 1);
                this.handlerStatue[e]++;
            }
        }
    } ]), r;
}();

exports.default = r;