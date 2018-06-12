function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function r(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, r) {
        for (var t = 0; t < r.length; t++) {
            var i = r[t];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(r, t, i) {
        return t && e(r.prototype, t), i && e(r, i), r;
    };
}();

exports.validateFuc = function(e, r) {
    var t = new u();
    return t.add(e, r), t.start();
};

var i = e(require("../../../common/user/user")), n = (function(e) {
    if (e && e.__esModule) return e;
    var r = {};
    if (null != e) for (var t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = e[t]);
    r.default = e;
}(require("../../../common/source/videoUtil")), e(require("../../../common/utils/util"))), a = {
    isUserLogin: function(e) {
        if (!i.default.isLogin()) return e;
    },
    isUserVip: function(e) {
        if (!i.default.isVip()) return e;
    },
    isCurrentVip: function(e, r, t, i) {
        u = null;
        if ("live" == t) var a = (r.data || {}).program, u = n.default.isObject(a) && 1 == a.payMark; else if ("video" == t) u = e.payMark ? 1 == e.payMark : e.isVip;
        if (!u) return i;
    },
    isTicketVip: function(e, r, t, i) {
        if ("live" == t) {
            var a = (r.data || {}).program;
            n.default.isObject(a) && a.payMark;
        } else if ("video" == t) e.payMark ? e.payMark : e.isVip;
    },
    isEmpty: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", r = arguments[1];
        if (!e) return r;
    },
    isPhoneNum: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", r = arguments[1];
        if (!/^\d{11}$/.test(e.trim())) return r;
    }
}, u = function() {
    function e() {
        r(this, e), this.init();
    }
    return t(e, [ {
        key: "init",
        value: function() {
            this.cache = [];
        }
    }, {
        key: "add",
        value: function(e, r) {
            for (var t, i = this, n = 0; t = r[n++]; ) !function(r) {
                var t = r.strategy.split(":"), n = r.errorMsg;
                i.cache.push(function() {
                    var r = t.shift();
                    return t.unshift(e), t.push(n), a[r].apply(null, t);
                });
            }(t);
        }
    }, {
        key: "start",
        value: function() {
            for (var e, r = 0; e = this.cache[r++]; ) {
                var t = e();
                if (t) return t;
            }
        }
    } ]), e;
}();